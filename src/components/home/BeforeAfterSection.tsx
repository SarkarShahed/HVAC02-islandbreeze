import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ArrowLeftRight, CheckCircle2, CalendarDays } from 'lucide-react';
import { gsap } from 'gsap';

interface HvacServiceOption {
  id: string;
  code: string;
  name: string;
  category: string;
  specs: { label: string; value: string }[];
  pillLabel: string;
  beforeTitle: string;
  afterTitle: string;
  beforeImg: string;
  afterImg: string;
  thumbImg: string;
  buttonText: string;
  highlights: string;
}

const hvacServices: HvacServiceOption[] = [
  {
    id: 'ac-replacement',
    code: 'HVAC-01 // ARCHITECTURAL',
    name: 'Condenser & AC Overhaul',
    category: 'RESIDENTIAL CLIMATE ENGINEERING',
    specs: [
      { label: 'CAPACITY', value: '4.0 TON' },
      { label: 'EFFICIENCY', value: '18.5 SEER2' },
      { label: 'WARRANTY', value: '10-YEAR' },
    ],
    pillLabel: 'AC REPLACEMENT',
    beforeTitle: 'BEFORE: Rusted 12-Year Old Coil & Motor',
    afterTitle: 'AFTER: Ultra-Quiet Inverter Heat Pump',
    beforeImg: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=900&q=70',
    afterImg: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=900&q=70',
    thumbImg: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=250&q=70',
    buttonText: 'SCHEDULE AC REPLACEMENT',
    highlights: 'Eliminates thermal variation, slashes electrical consumption by up to 38%, operating silently under 56 dBA.',
  },
  {
    id: 'duct-sanitization',
    code: 'HVAC-02 // PURITY',
    name: 'Air Duct Sanitization & Sealing',
    category: 'INDOOR AIR QUALITY & PRECISION FLOW',
    specs: [
      { label: 'AIRFLOW GAIN', value: '+35%' },
      { label: 'FILTRATION', value: '99.97% HEPA' },
      { label: 'SEAL LEAKAGE', value: '<2%' },
    ],
    pillLabel: 'DUCT RESTORATION',
    beforeTitle: 'BEFORE: Dust-Clogged & Leaking Ducts',
    afterTitle: 'AFTER: Aeroseal Coated & Sanitized',
    beforeImg: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=70',
    afterImg: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=70',
    thumbImg: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=250&q=70',
    buttonText: 'BOOK DUCT RESTORATION',
    highlights: 'Microbial decontamination, microscopic particulate removal, and calibrated aerodynamic balancing.',
  },
  {
    id: 'furnace-upgrade',
    code: 'HVAC-03 // THERMAL',
    name: 'Furnace & Heating Modernization',
    category: 'HYBRID & MODULATING HEATING SYSTEMS',
    specs: [
      { label: 'RATING', value: '98% AFUE' },
      { label: 'BLOWER', value: 'VARIABLE ECM' },
      { label: 'IGNITION', value: 'ELECTRONIC' },
    ],
    pillLabel: 'FURNACE UPGRADE',
    beforeTitle: 'BEFORE: Cracked Heat Exchanger',
    afterTitle: 'AFTER: Two-Stage Modulating Furnace',
    beforeImg: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=70',
    afterImg: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=900&q=70',
    thumbImg: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=250&q=70',
    buttonText: 'UPGRADE MY HEATING',
    highlights: 'Balanced radiant warmth, hermetically sealed combustion safety, and integrated acoustic dampening.',
  },
  {
    id: 'smart-zoning',
    code: 'HVAC-04 // INTELLIGENCE',
    name: 'Smart Zoning & Climate Controls',
    category: 'INTELLIGENT ARCHITECTURAL AUTOMATION',
    specs: [
      { label: 'ZONES', value: '4 DAMPERS' },
      { label: 'CONNECT', value: 'WI-FI 6 + APP' },
      { label: 'SAVINGS', value: 'UP TO 28%' },
    ],
    pillLabel: 'SMART ZONING',
    beforeTitle: 'BEFORE: Inaccurate Mercury Dial Wall Unit',
    afterTitle: 'AFTER: Color Smart Display with Remote Sensors',
    beforeImg: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=900&q=70',
    afterImg: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=900&q=70',
    thumbImg: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=250&q=70',
    buttonText: 'INSTALL SMART ZONING',
    highlights: 'Per-room microclimate autonomy managed seamlessly through bespoke sensory controls.',
  },
];

export const BeforeAfterSection: React.FC = () => {
  const [selectedServiceIndex, setSelectedServiceIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const clippedLayerRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<SVGLineElement | null>(null);
  const shadowLineRef = useRef<SVGLineElement | null>(null);
  const handleRef = useRef<HTMLDivElement | null>(null);
  const microRingRef = useRef<HTMLDivElement | null>(null);

  const current = hvacServices[selectedServiceIndex] || hvacServices[0];

  const physics = useRef({
    targetX: 0.5,
    currentX: 0.5,
    handleScale: 1,
    ringOpacity: 0,
    isDragging: false,
  });

  // Smooth responsive ticker: percentage-based clip-path and handle positioning
  useEffect(() => {
    const p = physics.current;

    const tick = () => {
      // Linear lerp for silky smooth slider motion
      p.currentX += (p.targetX - p.currentX) * 0.35;
      const pct = (p.currentX * 100).toFixed(2);

      if (clippedLayerRef.current) {
        clippedLayerRef.current.style.clipPath = `polygon(0 0, ${pct}% 0, ${pct}% 100%, 0 100%)`;
      }

      if (lineRef.current) {
        lineRef.current.setAttribute('x1', `${pct}%`);
        lineRef.current.setAttribute('x2', `${pct}%`);
      }

      if (shadowLineRef.current) {
        shadowLineRef.current.setAttribute('x1', `${pct}%`);
        shadowLineRef.current.setAttribute('x2', `${pct}%`);
      }

      if (handleRef.current) {
        handleRef.current.style.left = `${pct}%`;
        handleRef.current.style.transform = `translate(-50%, -50%) scale(${p.handleScale.toFixed(3)})`;
      }

      if (microRingRef.current) {
        microRingRef.current.style.opacity = p.ringOpacity.toFixed(2);
      }
    };

    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  const handleDragStart = useCallback((clientX: number) => {
    const p = physics.current;
    p.isDragging = true;

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const norm = Math.max(0.01, Math.min(0.99, (clientX - rect.left) / rect.width));
      p.targetX = norm;
    }

    gsap.to(p, {
      handleScale: 1.1,
      ringOpacity: 1,
      duration: 0.22,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  }, []);

  const handleDragMove = useCallback((clientX: number) => {
    const p = physics.current;
    if (!p.isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const norm = Math.max(0.01, Math.min(0.99, (clientX - rect.left) / rect.width));
    p.targetX = norm;
  }, []);

  const handleDragEnd = useCallback(() => {
    const p = physics.current;
    if (!p.isDragging) return;
    p.isDragging = false;

    gsap.to(p, {
      handleScale: 1,
      ringOpacity: 0,
      duration: 0.3,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  }, []);

  // Global mouse/touch release
  useEffect(() => {
    const onUp = () => handleDragEnd();
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchend', onUp);
    };
  }, [handleDragEnd]);

  // Clean transition when user switches HVAC service
  const handleSelectService = (index: number) => {
    setSelectedServiceIndex(index);
    const p = physics.current;

    gsap.fromTo(
      p,
      { handleScale: 1.1 },
      {
        handleScale: 1,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: 'auto',
      }
    );
  };

  return (
    <section
      id="before-after"
      className="relative w-full max-w-[100vw] h-screen min-h-[600px] lg:h-[100vh] bg-[#121417] text-white overflow-hidden flex flex-col justify-between select-none"
    >
      {/* WHOLE SCREEN FULL-BLEED BEFORE & AFTER COMPARISON SLIDER */}
      <div
        ref={containerRef}
        onMouseDown={(e) => handleDragStart(e.clientX)}
        onMouseMove={(e) => handleDragMove(e.clientX)}
        onMouseUp={handleDragEnd}
        onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
        onTouchEnd={handleDragEnd}
        className="absolute inset-0 w-full h-full overflow-hidden cursor-ew-resize select-none"
      >
        {/* BASE LAYER: AFTER IMAGE (Fills entire viewport) */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <img
            src={current.afterImg}
            alt={current.afterTitle}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-center transition-opacity duration-500"
          />
          {/* Subtle cinematic gradient overlays for pristine readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#121417]/90 via-black/30 to-[#121417]/60 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#121417]/75 via-transparent to-[#121417]/40 pointer-events-none" />
        </div>

        {/* CLIPPED LAYER: BEFORE IMAGE WITH PERCENTAGE POLYGON CLIP */}
        <div
          ref={clippedLayerRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
          style={{ clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' }}
        >
          <img
            src={current.beforeImg}
            alt={current.beforeTitle}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-center grayscale-[25%] contrast-105 brightness-90 transition-opacity duration-500"
          />
          {/* Darkening & vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#121417]/90 via-black/35 to-[#121417]/60 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#121417]/75 via-transparent to-[#121417]/40 pointer-events-none" />
        </div>

        {/* ULTRA-LUXURY CRISP HAIRLINE DIVIDER LINE */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible">
          {/* Soft micro-shadow behind hairline */}
          <line
            ref={shadowLineRef}
            x1="50%"
            y1="0%"
            x2="50%"
            y2="100%"
            stroke="rgba(0,0,0,0.5)"
            strokeWidth="3"
            strokeLinecap="square"
          />
          {/* Sharp luxury white hairline */}
          <line
            ref={lineRef}
            x1="50%"
            y1="0%"
            x2="50%"
            y2="100%"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinecap="square"
          />
        </svg>

        {/* ULTRA-LUXURY PRECISION HANDLE */}
        <div
          ref={handleRef}
          className="absolute top-1/2 pointer-events-auto cursor-ew-resize z-30 select-none group"
          style={{
            left: '50%',
            transform: 'translate(-50%, -50%)',
            willChange: 'left, transform',
          }}
        >
          {/* Hairline expansion ring on active interaction */}
          <div
            ref={microRingRef}
            className="absolute inset-0 -m-2 rounded-full border border-white/40 pointer-events-none transition-opacity duration-200"
            style={{ opacity: 0 }}
          />

          {/* Luxury dual-tier dial: Frosted obsidian outer chassis */}
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#121417]/90 backdrop-blur-2xl border border-white/25 shadow-[0_12px_36px_rgba(0,0,0,0.85)] flex items-center justify-center transition-colors group-hover:border-white/50">
            {/* Center pure white disc */}
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-[#121417] flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.3)] transition-transform group-hover:scale-105 group-active:scale-95">
              <ArrowLeftRight className="w-4 h-4 text-[#121417] stroke-[2.2]" />
            </div>
          </div>
        </div>
      </div>

      {/* TOP-LEFT INFORMATION HEADER & SERVICE DETAILS OVERLAY */}
      <div className="relative z-30 p-3 sm:p-6 md:p-10 max-w-2xl pointer-events-none">
        <div className="pointer-events-auto bg-white/90 backdrop-blur-[25px] p-4 sm:p-7 rounded-xl sm:rounded-2xl border border-white/50 space-y-2 sm:space-y-4 text-[#121417] shadow-xl">
          {/* Service Display Name */}
          <h1 className="text-xl sm:text-3xl md:text-5xl font-bold text-[#121417] tracking-tight font-['Nohemi'] capitalize leading-tight">
            {current.name}
          </h1>

          {/* Highlights */}
          <p className="text-[11px] sm:text-sm text-[#121417]/85 font-['Delight'] font-normal leading-relaxed line-clamp-2 sm:line-clamp-none">
            {current.highlights}
          </p>

          {/* Architectural Specs Row */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-1 text-[10px] sm:text-xs font-['Delight'] font-medium text-[#121417] uppercase border-0">
            {current.specs.map((spec, i) => (
              <React.Fragment key={spec.label}>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#121417]" />
                  <span className="text-[#121417]/60">{spec.label}:</span>
                  <span className="font-semibold text-[#121417] tracking-wide">{spec.value}</span>
                </div>
                {i < current.specs.length - 1 && (
                  <span className="text-[#121417]/30 hidden sm:inline">•</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM-CENTER FLOATING GLASS CARD & CALL TO ACTION */}
      <div className="relative z-30 flex flex-col items-center justify-end pb-6 sm:pb-8 px-4 pointer-events-auto">
        {/* Floating Frosted Glass Card for HVAC Services */}
        <div className="w-[95vw] max-w-xl bg-white/85 backdrop-blur-[25px] rounded-2xl p-3.5 sm:p-4 border border-white/40 text-[#121417] flex flex-col items-center">
          {/* 4 Circular Service Selector Badges */}
          <div className="grid grid-cols-4 gap-3 sm:gap-6 w-full items-center justify-items-center">
            {hvacServices.map((service, index) => {
              const isSelected = selectedServiceIndex === index;
              return (
                <button
                  key={service.id}
                  onClick={() => handleSelectService(index)}
                  className="flex flex-col items-center group cursor-pointer transition-transform duration-200 border-0"
                >
                  <div
                    className={`relative w-11 h-11 sm:w-14 sm:h-14 rounded-full overflow-hidden transition-all p-0.5 border ${
                      isSelected
                        ? 'border-2 border-[#2934ce] scale-105'
                        : 'border-black/15 opacity-75 group-hover:opacity-100 group-hover:border-black/35'
                    }`}
                  >
                    <img
                      src={service.thumbImg}
                      alt={service.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover rounded-full"
                    />
                    {isSelected && (
                      <div className="absolute inset-0 bg-[#2934ce]/20 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#2934ce]" />
                      </div>
                    )}
                  </div>
                  <span
                    className={`text-[9px] sm:text-[10px] font-['Delight'] font-medium tracking-wider uppercase mt-1.5 text-center leading-tight line-clamp-1 max-w-[65px] sm:max-w-[85px] ${
                      isSelected ? 'text-[#2934ce] font-semibold' : 'text-[#121417]/70 group-hover:text-[#121417]'
                    }`}
                  >
                    {service.pillLabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Button with requested #2934ce background color */}
        <button
          type="button"
          onClick={() => document.getElementById('hvac-dynamic-pricing-estimator')?.scrollIntoView({ behavior: 'smooth' })}
          className="mt-3.5 px-6 py-2.5 sm:px-7 sm:py-3 bg-[#2934ce] hover:bg-[#1f28aa] text-white text-[11px] sm:text-xs font-bold tracking-[0.14em] uppercase rounded-full transition-all active:scale-[0.98] flex items-center justify-center gap-2.5 cursor-pointer border border-[#2934ce]/20 shadow-lg select-none group"
        >
          <span>Schedule Appointment</span>
          <CalendarDays className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white shrink-0 transition-transform group-hover:scale-110" />
        </button>
      </div>
    </section>
  );
};
