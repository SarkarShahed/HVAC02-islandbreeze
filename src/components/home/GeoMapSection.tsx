import React, { useState, useEffect, useRef, useCallback } from 'react';
import { setOptions, importLibrary } from '@googlemaps/js-api-loader';
import {
  Car,
  Footprints,
  Train,
  Bike,
  Crosshair,
  Layers,
  Compass,
  PhoneCall,
  Navigation,
  ChevronsRight,
  X,
  Plus,
  GripVertical,
  CheckCircle2,
  Send,
  MapPin,
  Radio,
  ChevronDown,
  GalleryVerticalEnd,
  Minus
} from 'lucide-react';

declare global {
  interface Window {
    google: any;
  }
}

// Recommended American dispatch hubs and extensive location dataset
interface PresetLocation {
  name: string;
  query: string;
  lat: number;
  lng: number;
  tag: string;
}

const PRESET_HUBS: PresetLocation[] = [
  { name: 'Phoenix Central HQ (AZ)', query: '809 E Fairmount Ave, Phoenix, AZ 85014', lat: 33.4831, lng: -112.0645, tag: 'Regional HQ' },
  { name: 'Scottsdale Rapid Unit (AZ)', query: 'Scottsdale, AZ', lat: 33.4942, lng: -111.9261, tag: 'Active Dispatch' },
  { name: 'Mesa Fleet Base (AZ)', query: 'Mesa, AZ', lat: 33.4152, lng: -111.8315, tag: 'East Valley Fleet' },
  { name: 'Peoria Express Unit (AZ)', query: 'Peoria, AZ', lat: 33.5806, lng: -112.2374, tag: 'West Valley Fleet' },
  { name: 'Gilbert Service Hub (AZ)', query: 'Gilbert, AZ', lat: 33.3528, lng: -111.7890, tag: 'Residential Fleet' },
  { name: 'Glendale Rapid Station (AZ)', query: 'Glendale, AZ', lat: 33.5387, lng: -112.1860, tag: '24/7 Dispatch' },
  { name: 'Surprise North Base (AZ)', query: 'Surprise, AZ', lat: 33.6292, lng: -112.3679, tag: 'Northwest Hub' },
  { name: 'Tempe Central Station (AZ)', query: 'Tempe, AZ', lat: 33.4255, lng: -111.9400, tag: 'Metro Dispatch' }
];

// Rich searchable database of local Arizona cities and areas
const US_CITIES_DATABASE: { name: string; state: string; lat: number; lng: number }[] = [
  { name: 'Phoenix', state: 'AZ', lat: 33.4484, lng: -112.0740 },
  { name: 'Scottsdale', state: 'AZ', lat: 33.4942, lng: -111.9261 },
  { name: 'Mesa', state: 'AZ', lat: 33.4152, lng: -111.8315 },
  { name: 'Peoria', state: 'AZ', lat: 33.5806, lng: -112.2374 },
  { name: 'Gilbert', state: 'AZ', lat: 33.3528, lng: -111.7890 },
  { name: 'Glendale', state: 'AZ', lat: 33.5387, lng: -112.1860 },
  { name: 'Surprise', state: 'AZ', lat: 33.6292, lng: -112.3679 },
  { name: 'Tempe', state: 'AZ', lat: 33.4255, lng: -111.9400 },
  { name: 'Chandler', state: 'AZ', lat: 33.3062, lng: -111.8413 },
  { name: 'Paradise Valley', state: 'AZ', lat: 33.5312, lng: -111.9426 },
  { name: 'Goodyear', state: 'AZ', lat: 33.4353, lng: -112.3582 },
  { name: 'Avondale', state: 'AZ', lat: 33.4356, lng: -112.3496 }
];

interface RouteOption {
  id: string;
  durationText: string;
  durationSeconds: number;
  distanceText: string;
  distanceMeters: number;
  etaText: string;
  summary: string;
  badge?: string;
  trafficStatus: string;
  steps: any[];
  overviewPolyline?: string;
  routeIndex: number;
}

export const GeoMapSection: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [googleMap, setGoogleMap] = useState<any>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // Travel Mode
  const [travelMode, setTravelMode] = useState<'DRIVING' | 'WALKING' | 'TRANSIT' | 'BICYCLING'>('DRIVING');

  // Locations - Default to Phoenix Central HQ (AZ)
  const [originText, setOriginText] = useState('Phoenix Central HQ (AZ)');
  const [destinationText, setDestinationText] = useState('Scottsdale Rapid Unit (AZ)');
  const [originCoords, setOriginCoords] = useState<{ lat: number; lng: number } | null>({ lat: 33.4831, lng: -112.0645 });
  const [destinationCoords, setDestinationCoords] = useState<{ lat: number; lng: number } | null>({ lat: 33.4942, lng: -111.9261 });
  const [intermediateStops, setIntermediateStops] = useState<string[]>([]);
  const [showAddStop, setShowAddStop] = useState(false);
  const [newStopText, setNewStopText] = useState('');

  // Dropdown states
  const [departTime, setDepartTime] = useState<'now' | 'depart_at' | 'arrive_by'>('now');
  const [avoidOptions, setAvoidOptions] = useState<{ tolls: boolean; highways: boolean; ferries: boolean }>({
    tolls: false,
    highways: false,
    ferries: false
  });
  const [showAvoidDropdown, setShowAvoidDropdown] = useState(false);
  const [showDepartDropdown, setShowDepartDropdown] = useState(false);
  const [showPreferDrivingBanner, setShowPreferDrivingBanner] = useState(true);

  // Routes calculated
  const [routes, setRoutes] = useState<RouteOption[]>([]);
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(0);
  const [isLoadingRoutes, setIsLoadingRoutes] = useState(false);

  // Map view controls
  const [mapTypeId, setMapTypeId] = useState<string>('hybrid');
  const [is3DMode, setIs3DMode] = useState(false);

  // UI Drawer / Modals
  const [isCardCollapsed, setIsCardCollapsed] = useState(false);
  const [isStepsDrawerOpen, setIsStepsDrawerOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [locationSuccessMsg, setLocationSuccessMsg] = useState<string | null>(null);

  // Contact Form inside modal
  const [bookingFormData, setBookingFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    serviceType: 'Emergency AC Repair (Fastest Dispatch)',
    notes: '',
    preferredDate: 'Today (Immediate)',
    status: 'idle' as 'idle' | 'submitting' | 'success'
  });

  // Handle Booking form submit
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingFormData(prev => ({ ...prev, status: 'submitting' }));
    setTimeout(() => {
      setBookingFormData(prev => ({ ...prev, status: 'success' }));
    }, 1200);
  };

  // Google Maps Initialization
  useEffect(() => {
    const initMap = async () => {
      try {
        const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';
        if (!apiKey || apiKey === 'YOUR_API_KEY') {
          console.warn('Google Maps API key is missing or invalid.');
          setIsMapLoaded(false);
          return;
        }

        (setOptions as any)({
          apiKey,
          version: 'beta',
          libraries: ['maps', 'routes', 'places', 'marker', 'geometry']
        });

        const { Map } = await (importLibrary as any)('maps');

        if (mapRef.current) {
          const mapInstance = new Map(mapRef.current, {
            center: { lat: 33.4831, lng: -112.0645 },
            zoom: 12,
            mapId: 'f56549a759080b06',
            mapTypeId: 'hybrid',
            tilt: 45,
            heading: 0,
            disableDefaultUI: true,
            zoomControl: true,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            backgroundColor: '#121417',
            gestureHandling: 'greedy'
          });

          setGoogleMap(mapInstance);
          setIsMapLoaded(true);
        }
      } catch (error) {
        console.error('Error loading Google Maps:', error);
        setIsMapLoaded(false);
      }
    };

    initMap();
  }, []);

  // Sync Map Type
  useEffect(() => {
    if (googleMap) {
      googleMap.setMapTypeId(mapTypeId);
      if (mapTypeId === 'hybrid') {
        googleMap.setTilt(45);
      } else {
        googleMap.setTilt(0);
      }
    }
  }, [googleMap, mapTypeId]);

  // Route Calculation Function
  const calculateRoutes = useCallback(async () => {
    if (!googleMap || !originCoords || !destinationCoords) return;

    setIsLoadingRoutes(true);
    try {
      const directionsService = new window.google.maps.DirectionsService();
      
      const request: any = {
        origin: originCoords,
        destination: destinationCoords,
        travelMode: travelMode as any,
        provideRouteAlternatives: true,
        avoidTolls: avoidOptions.tolls,
        avoidHighways: avoidOptions.highways,
        avoidFerries: avoidOptions.ferries,
      };

      if (intermediateStops.length > 0) {
        request.waypoints = intermediateStops.map(stop => ({ location: stop, stopover: true }));
      }

      directionsService.route(request, (result: any, status: any) => {
        setIsLoadingRoutes(false);
        if (status === 'OK' && result) {
          const formattedRoutes = result.routes.map((route: any, index: number) => ({
            id: `route-${index}`,
            durationText: route.legs[0].duration?.text || '0 min',
            durationSeconds: route.legs[0].duration?.value || 0,
            distanceText: route.legs[0].distance?.text || '0 mi',
            distanceMeters: route.legs[0].distance?.value || 0,
            etaText: `ETA: ${new Date(Date.now() + (route.legs[0].duration?.value || 0) * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
            summary: route.summary || 'Fastest Route',
            badge: index === 0 ? 'Fastest' : index === 1 ? 'Eco-Friendly' : undefined,
            trafficStatus: 'Typical traffic',
            steps: route.legs[0].steps,
            overviewPolyline: route.overview_polyline,
            routeIndex: index
          }));

          setRoutes(formattedRoutes);
          setSelectedRouteIndex(0);

          // Render first route on map
          renderRouteOnMap(result, 0);
        }
      });
    } catch (err) {
      console.error('Route calculation error:', err);
      setIsLoadingRoutes(false);
    }
  }, [googleMap, originCoords, destinationCoords, travelMode, avoidOptions, intermediateStops]);

  // Initial Calculation
  useEffect(() => {
    if (isMapLoaded && googleMap) {
      calculateRoutes();
    }
  }, [isMapLoaded, googleMap, calculateRoutes]);

  // Render Logic
  const directionsRendererRef = useRef<any>(null);
  const renderRouteOnMap = (result: any, routeIndex: number) => {
    if (!googleMap) return;

    if (directionsRendererRef.current) {
      directionsRendererRef.current.setMap(null);
    }

    const renderer = new window.google.maps.DirectionsRenderer({
      map: googleMap,
      directions: result,
      routeIndex: routeIndex,
      polylineOptions: {
        strokeColor: '#FE552F',
        strokeWeight: 6,
        strokeOpacity: 0.9,
      },
      suppressMarkers: false,
    });

    directionsRendererRef.current = renderer;

    // Zoom to fit
    const bounds = result.routes[routeIndex].bounds;
    googleMap.fitBounds(bounds);
  };

  // Switch Selected Route
  const handleSelectRoute = (index: number) => {
    setSelectedRouteIndex(index);
    if (directionsRendererRef.current) {
      directionsRendererRef.current.setRouteIndex(index);
    }
  };

  // User Location Detection
  const handleDetectUserLocation = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setOriginCoords({ lat, lng });
          setOriginText('Current Location (Detected)');
          setIsLocating(false);
          setLocationSuccessMsg('Coordinate detected successfully');
          setTimeout(() => setLocationSuccessMsg(null), 3000);
          
          if (googleMap) {
            googleMap.panTo({ lat, lng });
            googleMap.setZoom(15);
          }
        },
        () => {
          setIsLocating(false);
          alert('Error: The Geolocation service failed.');
        }
      );
    } else {
      setIsLocating(false);
      alert('Error: Your browser doesn\'t support geolocation.');
    }
  };

  const activeRoute = routes[selectedRouteIndex];

  return (
    <section
      id="service-area-globe-section"
      className="relative w-full min-h-screen bg-[#0F1216] text-white py-12 md:py-20 px-3 sm:px-6 lg:px-8 overflow-hidden font-['Delight']"
    >
      <div id="geomap" className="absolute -top-20 opacity-0 pointer-events-none" />
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#121417] via-[#0D1013] to-[#121417] pointer-events-none" />

      {/* Section Header */}
      <div className="relative z-10 max-w-7xl mx-auto mb-6 sm:mb-8 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-['Nohemi'] font-bold text-white tracking-tight">
            HVAC Service in Phoenix & Surrounding Areas
          </h2>
          <p className="text-white/70 text-sm sm:text-base max-w-2xl mt-2">
            Track real-time technician routes, calculate precise travel ETAs from our regional climate control hubs, and verify on-demand AC and heating dispatch coverage for your property.
          </p>
        </div>

        {/* Quick Actions Header */}
        <div className="flex items-center gap-3 self-center sm:self-auto">
          <button
            onClick={handleDetectUserLocation}
            disabled={isLocating}
            style={{ borderStyle: 'none', borderRadius: '0px' }}
            className="h-10 px-4 rounded-none bg-white/10 hover:bg-[#FE552F] text-white border-none flex items-center gap-2 text-xs sm:text-sm font-['Delight'] transition-all shadow-lg cursor-pointer active:scale-95 disabled:opacity-50"
          >
            <Crosshair className={`w-4 h-4 ${isLocating ? 'animate-spin text-[#FE552F]' : ''}`} />
            <span>{isLocating ? 'Locating Coordinate...' : 'Detect My Location'}</span>
          </button>

          <button
            onClick={() => {
              setBookingFormData(prev => ({
                ...prev,
                address: `${originText} to ${destinationText}`,
                notes: `Route: ${activeRoute?.durationText || 'Fastest'} (${activeRoute?.distanceText || '0 mi'})`
              }));
              setIsContactModalOpen(true);
            }}
            style={{ borderStyle: 'none', borderRadius: '0px' }}
            className="h-10 px-5 rounded-none bg-[#2934ce] hover:bg-[#1e27a7] text-white font-['Nohemi'] font-bold flex items-center gap-2 text-xs sm:text-sm transition-all shadow-lg shadow-[#2934ce]/30 cursor-pointer active:scale-95 border-none"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Contact & Dispatch</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Map Stage */}
      <div className="relative z-10 max-w-7xl mx-auto h-[680px] sm:h-[740px] md:h-[800px] rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-[#1A1F26]">
        {/* Real Google Map Canvas */}
        <div
          ref={mapRef}
          className="w-full h-full"
          style={{ minHeight: '100%', width: '100%' }}
        />

        {/* Top-Left Floating Directions Card (Exact 1:1 Apple/Google Glass UI with Expand/Collapse) */}
        <div className={`absolute top-2.5 left-2.5 sm:top-4 sm:left-4 z-30 w-[calc(100%-20px)] sm:w-full max-w-[320px] xs:max-w-[340px] sm:max-w-[380px] flex flex-col rounded-2xl sm:rounded-3xl bg-[#181C20]/95 backdrop-blur-2xl border border-white/15 text-white shadow-2xl overflow-hidden pointer-events-auto transition-all duration-300 ease-in-out ${
          isCardCollapsed ? 'max-h-[64px] sm:max-h-[68px]' : 'max-h-[calc(100%-20px)]'
        }`}>
          {/* Card Header: Directions & Expand/Collapse Toggle & Reset & Modes */}
          <div className={`p-4 sm:p-5 pb-3 ${isCardCollapsed ? 'border-b-0' : 'border-b border-white/10'}`}>
            <div className={`flex items-center justify-between ${isCardCollapsed ? 'mb-0' : 'mb-3'}`}>
              <h3 className="text-xl sm:text-2xl font-['Nohemi'] font-bold text-white tracking-tight flex items-center gap-2">
                <span>Directions</span>
                {isCardCollapsed && (
                  <span className="text-xs font-['Delight'] font-normal text-white/50 uppercase tracking-wider">
                    (Collapsed)
                  </span>
                )}
              </h3>
              <div className="flex items-center gap-1.5">
                {/* Expand / Collapse Button */}
                <button
                  type="button"
                  onClick={() => setIsCardCollapsed(!isCardCollapsed)}
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-all cursor-pointer active:scale-95"
                  title={isCardCollapsed ? "Expand Directions" : "Collapse Directions"}
                >
                  {isCardCollapsed ? (
                    <GalleryVerticalEnd className="w-4 h-4 text-white" />
                  ) : (
                    <Minus className="w-4 h-4 text-white" />
                  )}
                </button>
              </div>
            </div>

            {/* Travel Mode Pills */}
            {!isCardCollapsed && (
              <div className="grid grid-cols-4 gap-1 p-1 bg-black/40 rounded-lg border border-white/10">
                <button
                  onClick={() => setTravelMode('DRIVING')}
                  className={`flex items-center justify-center py-2 rounded-lg transition-all cursor-pointer ${
                    travelMode === 'DRIVING'
                      ? 'bg-white/20 text-white shadow-md'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                  title="Driving"
                >
                  <Car className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setTravelMode('WALKING')}
                  className={`flex items-center justify-center py-2 rounded-lg transition-all cursor-pointer ${
                    travelMode === 'WALKING'
                      ? 'bg-white/20 text-white shadow-md'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                  title="Walking"
                >
                  <Footprints className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setTravelMode('TRANSIT')}
                  className={`flex items-center justify-center py-2 rounded-lg transition-all cursor-pointer ${
                    travelMode === 'TRANSIT'
                      ? 'bg-white/20 text-white shadow-md'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                  title="Transit"
                >
                  <Train className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setTravelMode('BICYCLING')}
                  className={`flex items-center justify-center py-2 rounded-lg transition-all cursor-pointer ${
                    travelMode === 'BICYCLING'
                      ? 'bg-white/20 text-white shadow-md'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                  title="Bicycling"
                >
                  <Bike className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Scrollable Content Inside Card */}
          {!isCardCollapsed && (
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-5 pt-4 space-y-5 sm:space-y-6">
              {/* Origin & Destination Inputs (Visuals) */}
              <div className="space-y-4">
                {/* Origin */}
                <div className="relative flex items-center gap-3 sm:gap-4">
                  <div className="absolute left-[13px] top-[44px] bottom-[-20px] w-[2px] bg-gradient-to-b from-[#FE552F] to-white/10" />
                  <div className="w-7 h-7 rounded-full border-[2.5px] border-[#FE552F] bg-white/5 flex-shrink-0 z-10" />
                  <div className="flex-1">
                    <label className="block text-[10px] font-bold text-white/40 uppercase tracking-widest px-1 mb-1.5">From Origin</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={originText}
                        onChange={(e) => setOriginText(e.target.value)}
                        className="w-full h-11 sm:h-12 bg-white/5 hover:bg-white/10 border border-white/10 focus:border-[#FE552F] rounded-xl px-4 text-xs sm:text-sm text-white placeholder-white/30 transition-all outline-none"
                        placeholder="Search starting point..."
                      />
                      <button
                        onClick={handleDetectUserLocation}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-white/10 hover:bg-[#FE552F] text-white/70 hover:text-white flex items-center justify-center transition-all cursor-pointer"
                      >
                        <Crosshair className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Intermediate Stops */}
                {intermediateStops.map((stop, idx) => (
                  <div key={idx} className="relative flex items-center gap-3 sm:gap-4">
                    <div className="absolute left-[13px] top-0 bottom-0 w-[2px] bg-white/10" />
                    <div className="w-7 h-7 rounded-full border-[2.5px] border-white/20 bg-[#121417] flex-shrink-0 z-10 flex items-center justify-center">
                      <GripVertical className="w-3 h-3 text-white/30" />
                    </div>
                    <div className="flex-1">
                      <div className="relative group">
                        <input
                          type="text"
                          value={stop}
                          readOnly
                          className="w-full h-11 sm:h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-xs sm:text-sm text-white transition-all cursor-default"
                        />
                        <button
                          onClick={() => setIntermediateStops(prev => prev.filter((_, i) => i !== idx))}
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-white/10 hover:bg-red-500/20 text-white/70 hover:text-red-400 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add Stop Input */}
                {showAddStop ? (
                  <div className="relative flex items-center gap-3 sm:gap-4">
                    <div className="absolute left-[13px] top-0 bottom-0 w-[2px] bg-white/10" />
                    <div className="w-7 h-7 rounded-full border-[2.5px] border-white/20 bg-[#121417] flex-shrink-0 z-10 flex items-center justify-center">
                      <Plus className="w-3 h-3 text-white/50" />
                    </div>
                    <div className="flex-1">
                      <input
                        autoFocus
                        type="text"
                        value={newStopText}
                        onChange={(e) => setNewStopText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && newStopText) {
                            setIntermediateStops(prev => [...prev, newStopText]);
                            setNewStopText('');
                            setShowAddStop(false);
                          }
                        }}
                        className="w-full h-11 sm:h-12 bg-white/10 border border-white/30 rounded-xl px-4 text-xs sm:text-sm text-white outline-none"
                        placeholder="Type address..."
                      />
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowAddStop(true)}
                    className="ml-[44px] text-[11px] font-bold text-[#FE552F] hover:text-[#ff7455] flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>ADD STOP</span>
                  </button>
                )}

                {/* Destination */}
                <div className="relative flex items-center gap-3 sm:gap-4">
                  <div className="absolute left-[13px] top-[-20px] h-[20px] w-[2px] bg-white/10" />
                  <div className="w-7 h-7 bg-white rounded-full flex-shrink-0 z-10 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.4)]">
                    <Navigation className="w-3.5 h-3.5 text-[#2934ce] fill-[#2934ce]" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-[10px] font-bold text-white/40 uppercase tracking-widest px-1 mb-1.5">To Destination</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={destinationText}
                        onChange={(e) => setDestinationText(e.target.value)}
                        className="w-full h-11 sm:h-12 bg-white/5 hover:bg-white/10 border border-white/10 focus:border-[#2934ce] rounded-xl px-4 text-xs sm:text-sm text-white placeholder-white/30 transition-all outline-none"
                        placeholder="Search destination..."
                      />
                      <button
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-white/10 hover:bg-[#2934ce] text-white/70 hover:text-white flex items-center justify-center transition-all cursor-pointer"
                      >
                        <Layers className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Advanced Settings & Calculated Routes Result */}
              <div className="space-y-5">
                {/* Advanced Quick Settings Toggle */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                  <div className="relative">
                    <button
                      onClick={() => setShowDepartDropdown(!showDepartDropdown)}
                      className="whitespace-nowrap px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] sm:text-xs text-white/80 flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <span className="opacity-50 font-bold uppercase tracking-tighter">Depart:</span>
                      <span className="font-bold text-white">{departTime === 'now' ? 'Now' : departTime === 'arrive_by' ? 'Arrive By' : 'Depart At'}</span>
                      <ChevronDown className={`w-3 h-3 transition-transform ${showDepartDropdown ? 'rotate-180' : ''}`} />
                    </button>
                    {showDepartDropdown && (
                      <div className="absolute top-full left-0 mt-2 w-48 bg-[#1A1F26] border border-white/15 rounded-xl shadow-2xl z-50 overflow-hidden animate-slideUp">
                        {['now', 'depart_at', 'arrive_by'].map((time) => (
                          <button
                            key={time}
                            onClick={() => {
                              setDepartTime(time as any);
                              setShowDepartDropdown(false);
                            }}
                            className="w-full px-4 py-3 text-left text-xs text-white hover:bg-[#2934ce] transition-colors capitalize"
                          >
                            {time.replace('_', ' ')}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="relative">
                    <button
                      onClick={() => setShowAvoidDropdown(!showAvoidDropdown)}
                      className="whitespace-nowrap px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] sm:text-xs text-white/80 flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <span className="opacity-50 font-bold uppercase tracking-tighter">Avoid:</span>
                      <span className="font-bold text-white">
                        {Object.entries(avoidOptions).filter(([_, v]) => v).length || 'None'}
                      </span>
                      <ChevronDown className={`w-3 h-3 transition-transform ${showAvoidDropdown ? 'rotate-180' : ''}`} />
                    </button>
                    {showAvoidDropdown && (
                      <div className="absolute top-full left-0 mt-2 w-48 bg-[#1A1F26] border border-white/15 rounded-xl shadow-2xl z-50 p-2 space-y-1 animate-slideUp">
                        {Object.entries(avoidOptions).map(([key, val]) => (
                          <button
                            key={key}
                            onClick={() => setAvoidOptions(prev => ({ ...prev, [key]: !val }))}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors ${
                              val ? 'bg-[#FE552F]/20 text-[#FE552F]' : 'text-white/60 hover:bg-white/5 hover:text-white'
                            }`}
                          >
                            <span className="capitalize">{key}</span>
                            {val && <CheckCircle2 className="w-3 h-3" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Route Result List */}
                <div className="space-y-3">
                  {isLoadingRoutes ? (
                    <div className="py-12 flex flex-col items-center justify-center gap-3">
                      <div className="w-8 h-8 border-3 border-white/10 border-t-[#FE552F] rounded-full animate-spin" />
                      <p className="text-xs font-['Delight'] text-white/40 uppercase tracking-widest font-bold">Solving Route Optimization...</p>
                    </div>
                  ) : routes.length > 0 ? (
                    routes.map((route, idx) => (
                      <button
                        key={route.id}
                        onClick={() => handleSelectRoute(idx)}
                        className={`w-full text-left p-4 rounded-2xl border transition-all relative group cursor-pointer ${
                          selectedRouteIndex === idx
                            ? 'bg-white/10 border-[#FE552F] shadow-lg shadow-[#FE552F]/10'
                            : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/[0.08]'
                        }`}
                      >
                        {route.badge && (
                          <span className={`absolute -top-2.5 right-4 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider shadow-sm z-10 ${
                            route.badge === 'Fastest' ? 'bg-[#FE552F] text-white' : 'bg-emerald-500 text-white'
                          }`}>
                            {route.badge}
                          </span>
                        )}
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex flex-col">
                            <span className={`text-xl sm:text-2xl font-['Nohemi'] font-bold leading-none ${selectedRouteIndex === idx ? 'text-white' : 'text-white/80'}`}>
                              {route.durationText}
                            </span>
                            <span className="text-[10px] font-['Delight'] text-white/50 mt-1 uppercase tracking-wider font-bold">
                              {route.distanceText} • {route.etaText}
                            </span>
                          </div>
                          {selectedRouteIndex === idx && (
                            <div className="w-6 h-6 rounded-full bg-[#FE552F] flex items-center justify-center">
                              <CheckCircle2 className="w-4 h-4 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <p className={`text-xs font-['Delight'] line-clamp-1 ${selectedRouteIndex === idx ? 'text-white/70' : 'text-white/40'}`}>
                            {route.summary} via {route.trafficStatus}
                          </p>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="py-10 text-center space-y-3 bg-white/5 rounded-2xl border border-white/10">
                      <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center mx-auto">
                        <Compass className="w-5 h-5 text-white/20" />
                      </div>
                      <p className="text-xs text-white/40 font-bold tracking-wider px-6">ENTER VALID ADDRESSES TO VIEW OPTIMIZED DISPATCH ROUTES</p>
                    </div>
                  )}
                </div>

                {/* Driving Preference Banner (Visual Apple Design) */}
                {showPreferDrivingBanner && (
                  <div className="relative p-4 rounded-2xl bg-[#FE552F]/10 border border-[#FE552F]/20 overflow-hidden group">
                    <button
                      onClick={() => setShowPreferDrivingBanner(false)}
                      className="absolute right-2 top-2 w-6 h-6 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#FE552F] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#FE552F]/20">
                        <Car className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-sm font-['Nohemi'] font-bold text-white mb-0.5">Prefer Regional Dispatch?</h4>
                        <p className="text-[11px] text-white/60 leading-relaxed">Most HVAC calls require standard vehicle dispatch for heavy equipment transport.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Quick Action: GO */}
              <div className="pt-2 sticky bottom-0 bg-transparent pb-1">
                <button
                  onClick={() => setIsStepsDrawerOpen(true)}
                  disabled={!activeRoute}
                  className="w-full h-11 sm:h-12 rounded-2xl bg-[#2934ce] hover:bg-[#1e27a7] disabled:bg-white/5 disabled:text-white/20 text-white font-['Nohemi'] font-bold text-lg sm:text-xl flex items-center justify-center gap-3 transition-all cursor-pointer active:scale-[0.98] group relative overflow-hidden disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  <Navigation className="w-5 h-5 sm:w-6 sm:h-6 fill-white" />
                  <span>START DISPATCH</span>
                  <ChevronsRight className="w-5 h-5 opacity-50 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Map Overlays: Map Style, 3D Toggle, Hub Points, Legend */}
        <div className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 z-20 flex flex-col gap-2.5 sm:gap-4 pointer-events-auto">
          {/* Map Type & 3D Stack */}
          <div className="flex flex-col rounded-xl sm:rounded-2xl bg-[#181C20]/90 backdrop-blur-xl border border-white/15 overflow-hidden shadow-2xl">
            <button
              onClick={() => setMapTypeId(mapTypeId === 'roadmap' ? 'hybrid' : 'roadmap')}
              className={`p-2.5 sm:p-3.5 hover:bg-white/10 text-white/70 hover:text-white transition-all flex flex-col items-center gap-1 group cursor-pointer ${mapTypeId === 'hybrid' ? 'text-[#FE552F]' : ''}`}
              title="Toggle View Mode"
            >
              <Layers className={`w-5 h-5 sm:w-6 sm:h-6 ${mapTypeId === 'hybrid' ? 'text-[#FE552F]' : ''}`} />
              <span className="text-[8px] font-black uppercase tracking-tighter opacity-50 group-hover:opacity-100">Style</span>
            </button>
            <div className="h-[1px] w-full bg-white/10" />
            <button
              onClick={() => setIs3DMode(!is3DMode)}
              className={`p-2.5 sm:p-3.5 hover:bg-white/10 text-white/70 hover:text-white transition-all flex flex-col items-center gap-1 group cursor-pointer ${is3DMode ? 'text-[#FE552F]' : ''}`}
              title="Toggle 3D Buildings"
            >
              <div className="relative">
                <Layers className={`w-5 h-5 sm:w-6 sm:h-6 transform rotate-45 ${is3DMode ? 'text-[#FE552F]' : ''}`} />
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[9px] font-bold text-white leading-none">3D</span>
              </div>
              <span className="text-[8px] font-black uppercase tracking-tighter opacity-50 group-hover:opacity-100">Tilt</span>
            </button>
          </div>

          {/* Location Legend / Active Hubs */}
          <div className="hidden sm:flex flex-col p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-[#181C20]/90 backdrop-blur-xl border border-white/15 shadow-2xl w-full max-w-[160px] sm:max-w-[200px]">
            <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Radio className="w-3 h-3 text-[#FE552F] animate-pulse" />
              Live Hubs
            </h4>
            <div className="space-y-3">
              {PRESET_HUBS.slice(0, 4).map((hub, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDestinationText(hub.name);
                    setDestinationCoords({ lat: hub.lat, lng: hub.lng });
                    if (googleMap) {
                      googleMap.panTo({ lat: hub.lat, lng: hub.lng });
                      googleMap.setZoom(14);
                    }
                  }}
                  className="flex flex-col text-left group cursor-pointer"
                >
                  <span className="text-[11px] sm:text-xs font-['Nohemi'] font-bold text-white group-hover:text-[#FE552F] transition-colors truncate">{hub.name}</span>
                  <span className="text-[9px] font-['Delight'] text-white/30 uppercase tracking-tight">{hub.tag}</span>
                </button>
              ))}
            </div>
            <button className="mt-4 pt-3 border-t border-white/10 text-[9px] font-black text-white/40 hover:text-white uppercase tracking-widest transition-colors cursor-pointer">
              View All 12 Hubs
            </button>
          </div>
        </div>

        {/* Bottom Floating Status Information */}
        <div className="absolute bottom-2.5 left-2.5 sm:bottom-6 sm:left-1/2 sm:-translate-x-1/2 z-20 flex items-center gap-2.5 sm:gap-4 pointer-events-none">
          <div className="bg-[#181C20]/90 backdrop-blur-2xl px-4 py-2 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl border border-white/15 flex items-center gap-4 sm:gap-6 shadow-2xl pointer-events-auto">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 animate-pulse" />
              <div className="flex flex-col">
                <span className="text-[9px] sm:text-[10px] font-black text-white uppercase tracking-widest leading-none">System Status</span>
                <span className="text-[11px] sm:text-xs font-bold text-white/60">Fleet Operational</span>
              </div>
            </div>
            <div className="h-6 sm:h-8 w-[1px] bg-white/10" />
            <div className="flex flex-col">
              <span className="text-[9px] sm:text-[10px] font-black text-white uppercase tracking-widest leading-none">Live Dispatching</span>
              <span className="text-[11px] sm:text-xs font-bold text-white/60">42 Units Active</span>
            </div>
          </div>

          <button
            onClick={() => {
              if (googleMap) {
                googleMap.panTo({ lat: 33.4831, lng: -112.0645 });
                googleMap.setZoom(12);
                googleMap.setHeading(0);
                googleMap.setTilt(45);
              }
            }}
            className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-[#FE552F] hover:bg-[#ff7455] text-white flex items-center justify-center shadow-2xl shadow-[#FE552F]/30 transition-all cursor-pointer active:scale-95 pointer-events-auto"
            title="Recenter Map"
          >
            <Compass className="w-5 h-5 sm:w-7 sm:h-7 animate-in fade-in duration-500" />
          </button>
        </div>

        {/* Detailed Turn-by-Turn Steps Modal / Drawer (Bottom up mobile, Right-side desktop) */}
        {isStepsDrawerOpen && (
          <div className="fixed inset-0 z-[80] flex items-end sm:items-stretch sm:justify-end pointer-events-none">
            <div 
              className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto" 
              onClick={() => setIsStepsDrawerOpen(false)}
            />
            <div className="relative w-full max-w-full sm:max-w-md h-[85vh] sm:h-full bg-[#181C20] border-t sm:border-t-0 sm:border-l border-white/15 shadow-2xl flex flex-col pointer-events-auto animate-slideUp sm:animate-slideInRight">
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-['Nohemi'] font-bold text-white">Route Steps</h3>
                  <p className="text-xs text-white/40 uppercase tracking-widest font-bold mt-1">Optimization ID: BREEZE-042</p>
                </div>
                <button
                  onClick={() => setIsStepsDrawerOpen(false)}
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
                {activeRoute?.steps ? (
                  activeRoute.steps.map((step: any, idx: number) => (
                    <div key={idx} className="flex gap-4 group">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-[#FE552F] transition-colors">
                          <span className="text-xs font-black text-white">{idx + 1}</span>
                        </div>
                        {idx !== activeRoute.steps.length - 1 && <div className="flex-1 w-[1px] bg-white/10" />}
                      </div>
                      <div className="pb-8 flex-1">
                        <div 
                          className="text-sm font-['Delight'] text-white/90 leading-relaxed step-instruction"
                          dangerouslySetInnerHTML={{ __html: step.instructions }}
                        />
                        <div className="mt-2 flex items-center gap-3">
                          <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">{step.distance.text}</span>
                          <span className="w-1 h-1 rounded-full bg-white/10" />
                          <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">{step.duration.text}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40">
                    <Navigation className="w-12 h-12" />
                    <p className="text-sm font-bold uppercase tracking-widest">No Active Route Data Found</p>
                  </div>
                )}
              </div>

              <div className="p-6 bg-black/20 border-t border-white/10">
                <button
                   onClick={() => setIsContactModalOpen(true)}
                   className="w-full h-14 bg-[#FE552F] hover:bg-[#ff7455] text-white font-['Nohemi'] font-bold rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-[#FE552F]/20 cursor-pointer"
                >
                  <PhoneCall className="w-5 h-5" />
                  <span>CONFIRM DISPATCH UNIT</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Global Contact & Dispatch Confirmation Modal (Centered) */}
      {isContactModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#181C20] rounded-3xl border border-white/15 overflow-hidden shadow-2xl relative animate-fadeIn">
            {/* Modal Header */}
            <div className="px-6 py-5 bg-[#2934ce] border-b border-white/10 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-['Nohemi'] font-bold text-white flex items-center gap-2">
                  <PhoneCall className="w-5 h-5" />
                  Request Emergency Dispatch
                </h3>
                <p className="text-blue-100/70 text-xs font-['Delight'] mt-0.5">
                  Priority routing for Phoenix metro residents
                </p>
              </div>
              <button
                onClick={() => setIsContactModalOpen(false)}
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {bookingFormData.status === 'success' ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-2 border border-emerald-500/30">
                    <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                  </div>
                  <h4 className="text-2xl font-['Nohemi'] font-bold text-white">Dispatch Request Logged!</h4>
                  <p className="text-white/60 text-sm font-['Delight'] max-w-xs mx-auto">
                    A certified Island Breeze AC technician will contact you at <span className="text-white">{bookingFormData.phone}</span> within 15 minutes.
                  </p>
                  <button
                    onClick={() => {
                      setIsContactModalOpen(false);
                      setBookingFormData({ ...bookingFormData, status: 'idle' });
                    }}
                    className="mt-6 px-8 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-all border border-white/10"
                  >
                    Got it
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest px-1">Full Name</label>
                      <input
                        required
                        type="text"
                        value={bookingFormData.name}
                        onChange={(e) => setBookingFormData({ ...bookingFormData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full h-11 bg-white/5 border border-white/10 rounded-xl px-4 text-sm text-white focus:outline-none focus:border-[#FE552F] transition-colors"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest px-1">Phone Number</label>
                      <input
                        required
                        type="tel"
                        value={bookingFormData.phone}
                        onChange={(e) => setBookingFormData({ ...bookingFormData, phone: e.target.value })}
                        placeholder="(623) 335-3958"
                        className="w-full h-11 bg-white/5 border border-white/10 rounded-xl px-4 text-sm text-white focus:outline-none focus:border-[#FE552F] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest px-1">Service Address</label>
                    <input
                      required
                      type="text"
                      value={bookingFormData.address}
                      onChange={(e) => setBookingFormData({ ...bookingFormData, address: e.target.value })}
                      placeholder="Street address, City, State"
                      className="w-full h-11 bg-white/5 border border-white/10 rounded-xl px-4 text-sm text-white focus:outline-none focus:border-[#FE552F] transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest px-1">Additional Notes</label>
                    <textarea
                      rows={2}
                      value={bookingFormData.notes}
                      onChange={(e) => setBookingFormData({ ...bookingFormData, notes: e.target.value })}
                      placeholder="e.g. AC unit is freezing up, noise from attic..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-[#FE552F] transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between gap-3">
                    <a
                      href="tel:6233353958"
                      className="h-11 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-['Delight'] text-xs flex items-center gap-2 border border-white/20"
                    >
                      <PhoneCall className="w-4 h-4 text-emerald-400" />
                      <span>Call Live: (623) 335-3958</span>
                    </a>

                    <button
                      type="submit"
                      disabled={bookingFormData.status === 'submitting'}
                      className="flex-1 h-11 bg-[#FE552F] hover:bg-[#e04521] text-white font-['Nohemi'] font-bold rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 shadow-lg shadow-[#FE552F]/20 cursor-pointer"
                    >
                      {bookingFormData.status === 'submitting' ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                      <span>{bookingFormData.status === 'submitting' ? 'Transmitting...' : 'Send Request'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Floating Success Notification for Detection */}
      {locationSuccessMsg && (
        <div className="fixed bottom-10 right-10 z-[110] bg-[#121417] border border-emerald-500/30 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-slideInRight">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <span className="text-sm font-['Nohemi'] font-bold text-white">{locationSuccessMsg}</span>
        </div>
      )}
    </section>
  );
};
