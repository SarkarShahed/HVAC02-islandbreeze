import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Calendar, ArrowRight, ArrowLeft, ChevronRight, PhoneCall, Facebook, Instagram, Youtube, Store, Star, Plus } from 'lucide-react';
import gsap from 'gsap';
import { QUICK_LINKS } from '../../config/navigation';

interface NavItemConfig {
  id: string;
  name: string;
  href: string;
}

export const Navbar: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<'services' | 'areas' | 'about' | null>(null);
  const [mobileSubScreen, setMobileSubScreen] = useState<'main' | 'services' | 'areas' | 'about'>('main');
  const megaMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeMegaMenu && megaMenuRef.current) {
      // Hardware-accelerated slide-down transform animation using GSAP with zero layout thrashing
      gsap.fromTo(
        megaMenuRef.current,
        {
          y: -18,
          scaleY: 0.95,
          opacity: 0,
          transformOrigin: 'top right',
        },
        {
          y: 0,
          scaleY: 1,
          opacity: 1,
          duration: 0.3,
          ease: 'power3.out',
          force3D: true,
        }
      );
    }
  }, [activeMegaMenu]);

  // Mega Menu Data for Services
  const servicesMegaMenu = [
    {
      category: 'Air Conditioning',
      items: [
        { name: 'AC Repair Phoenix', href: '#major-services-slider-section' },
        { name: 'AC Installation Phoenix', href: '#major-services-slider-section' },
        { name: 'AC Maintenance Phoenix', href: '#major-services-slider-section' },
        { name: 'Ductless AC Phoenix', href: '#major-services-slider-section' }
      ]
    },
    {
      category: 'Heating',
      items: [
        { name: 'Furnace Repair Phoenix', href: '#major-services-slider-section' },
        { name: 'Furnace Installation Phoenix', href: '#major-services-slider-section' },
        { name: 'Furnace Maintenance Phoenix', href: '#major-services-slider-section' }
      ]
    },
    {
      category: 'Other Services',
      items: [
        { name: 'Commercial HVAC Phoenix', href: '#major-services-slider-section' },
        { name: 'Water Heater Repair Phoenix', href: '#major-services-slider-section' },
        { name: 'Air Duct Cleaning Phoenix', href: '#major-services-slider-section' },
        { name: 'Water Heater Install Phoenix', href: '#major-services-slider-section' },
        { name: 'Dryer Vent Cleaning Phoenix', href: '#major-services-slider-section' },
        { name: 'Indoor Air Quality Phoenix', href: '#major-services-slider-section' },
        { name: 'Water Heater Service Phoenix', href: '#major-services-slider-section' }
      ]
    }
  ];

  // Mega Menu Data for Areas We Serve
  const areasMegaMenu = [
    {
      category: 'Scottsdale',
      items: [
        { name: 'HVAC Service Scottsdale', href: '#geomap' },
        { name: 'Furnace Repair Scottsdale', href: '#geomap' },
        { name: 'Furnace Maintenance Scottsdale', href: '#geomap' },
        { name: 'Furnace Installation Scottsdale', href: '#geomap' },
        { name: 'AC Repair Scottsdale', href: '#geomap' },
        { name: 'AC Maintenance Scottsdale', href: '#geomap' },
        { name: 'AC Installation Scottsdale', href: '#geomap' }
      ]
    },
    {
      category: 'Tempe',
      items: [
        { name: 'HVAC Service Tempe', href: '#geomap' },
        { name: 'Furnace Repair Tempe', href: '#geomap' },
        { name: 'Furnace Maintenance Tempe', href: '#geomap' },
        { name: 'Furnace Installation Tempe', href: '#geomap' },
        { name: 'AC Repair Tempe', href: '#geomap' },
        { name: 'AC Maintenance Tempe', href: '#geomap' },
        { name: 'AC Installation Tempe', href: '#geomap' }
      ]
    },
    {
      category: 'Glendale',
      items: [
        { name: 'HVAC Service Glendale', href: '#geomap' },
        { name: 'Furnace Repair Glendale', href: '#geomap' },
        { name: 'Furnace Maintenance Glendale', href: '#geomap' },
        { name: 'Furnace Installation Glendale', href: '#geomap' },
        { name: 'AC Maintenance Glendale', href: '#geomap' },
        { name: 'AC Repair Glendale', href: '#geomap' },
        { name: 'AC Installation Glendale', href: '#geomap' }
      ]
    }
  ];

  // Mega Menu Data for About Us
  const aboutMegaMenu = [
    {
      category: 'About Us',
      items: [
        { name: 'FAQ', href: '#faqs' },
        { name: 'Blog', href: '#blog-section' }
      ]
    }
  ];

  // Search Database
  const searchItems = [
    { name: 'Live GeoMap & Route Dispatch (Directions)', targetId: 'geomap' },
    { name: 'Air Conditioning Repair & Installs', targetId: 'major-services-slider-section' },
    { name: 'High Efficiency Heat Pumps', targetId: 'major-services-slider-section' },
    { name: 'Ductless Mini-Split Air Handlers', targetId: 'major-services-slider-section' },
    { name: 'Indoor Air Quality Checkups & Filtration', targetId: 'major-services-slider-section' },
    { name: 'Smart Programmable Thermostats', targetId: 'major-services-slider-section' },
    { name: 'Duct Sealing & Aeroseal Repair', targetId: 'major-services-slider-section' },
    { name: 'Commercial & Light Commercial HVAC', targetId: 'major-services-slider-section' },
    { name: 'Precision Heating & Furnaces', targetId: 'major-services-slider-section' },
    { name: 'Latest Climate Guides & Articles', targetId: 'blog-section' },
  ];

  const filteredSearch = searchItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const navItems: NavItemConfig[] = QUICK_LINKS.map(link => ({
    id: link.id || `nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`,
    name: link.label,
    href: link.href
  }));

  const handleNavClick = (href: string, id?: string) => {
    if (id === 'nav-services') {
      setActiveMegaMenu(prev => (prev === 'services' ? null : 'services'));
      setMobileSubScreen(prev => (prev === 'services' ? 'main' : 'services'));
      return;
    }
    if (id === 'nav-areas') {
      setActiveMegaMenu(prev => (prev === 'areas' ? null : 'areas'));
      setMobileSubScreen(prev => (prev === 'areas' ? 'main' : 'areas'));
      return;
    }
    if (id === 'nav-about') {
      setActiveMegaMenu(prev => (prev === 'about' ? null : 'about'));
      setMobileSubScreen(prev => (prev === 'about' ? 'main' : 'about'));
      return;
    }
    setActiveMegaMenu(null);
    setMobileSubScreen('main');
    const targetId = href.startsWith('#') ? href.substring(1) : href;
    const element = document.getElementById(targetId);
    if (element) {
      window.dispatchEvent(
        new CustomEvent('trigger-12grid-transition', {
          detail: {
            onComplete: () => {
              const lenis = (window as unknown as { lenisInstance?: any }).lenisInstance;
              if (lenis) {
                lenis.scrollTo(element, { offset: -40, immediate: true });
              } else {
                element.scrollIntoView({ behavior: 'auto' });
              }
            },
          },
        })
      );
    }
    setMobileMenuOpen(false);
  };

  const handleDropdownItemClick = (href: string) => {
    setActiveMegaMenu(null);
    setMobileSubScreen('main');
    setMobileMenuOpen(false);
    const targetId = href.startsWith('#') ? href.substring(1) : href;
    const element = document.getElementById(targetId);
    if (element) {
      window.dispatchEvent(
        new CustomEvent('trigger-12grid-transition', {
          detail: {
            onComplete: () => {
              const lenis = (window as unknown as { lenisInstance?: any }).lenisInstance;
              if (lenis) {
                lenis.scrollTo(element, { offset: -40, immediate: true });
              } else {
                element.scrollIntoView({ behavior: 'auto' });
              }
            },
          },
        })
      );
    }
  };

  return (
    <>
      {/* Standalone Fixed Top Utility Bar with mix-blend-mode: difference */}
      <div
        id="navbar-top-utility-bar"
        className="fixed top-[8px] right-[10px] z-[70] hidden lg:flex items-center justify-end gap-3 pb-1 px-1 text-[10.5px] font-['Delight'] font-semibold text-white uppercase tracking-wider mix-blend-difference pointer-events-auto select-none"
        style={{ mixBlendMode: 'difference' }}
      >
        {/* Left side: See Specials, Get Financing, Location, Read Reviews, HVAC License */}
        <div className="flex items-center gap-2.5 text-white">
          <a
            href="#major-services-slider-section"
            className="text-white hover:opacity-75 transition-opacity cursor-pointer"
          >
            SERVICES
          </a>
          <span className="text-white">•</span>
          <a
            href="#specials"
            className="text-white hover:opacity-75 transition-opacity cursor-pointer"
          >
            SEE SPECIALS
          </a>
          <span className="text-white">•</span>
          <a
            href="#finance"
            className="text-white hover:opacity-75 transition-opacity cursor-pointer"
          >
            GET FINANCING
          </a>
          <span className="text-white">•</span>
          <a
            href="#service-area-globe-section"
            className="text-white hover:opacity-75 transition-opacity cursor-pointer"
          >
            LOCATION
          </a>
          <span className="text-white">•</span>
          <a
            href="#testimonials"
            className="text-white hover:opacity-75 transition-opacity cursor-pointer"
          >
            READ REVIEWS
          </a>
          <span className="text-white">•</span>
          <span className="text-white font-normal tracking-wide">
            AZ LICENSE: #ROC 327760
          </span>
        </div>

        {/* Right side: Social & reviews icons */}
        <div className="flex items-center gap-1.5 ml-2">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            title="Facebook"
            className="w-5 h-5 rounded-none border border-white hover:opacity-75 text-white flex items-center justify-center transition-opacity cursor-pointer"
          >
            <Facebook className="w-2.5 h-2.5 text-white" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            title="Instagram"
            className="w-5 h-5 rounded-none border border-white hover:opacity-75 text-white flex items-center justify-center transition-opacity cursor-pointer"
          >
            <Instagram className="w-2.5 h-2.5 text-white" />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            title="YouTube"
            className="w-5 h-5 rounded-none border border-white hover:opacity-75 text-white flex items-center justify-center transition-opacity cursor-pointer"
          >
            <Youtube className="w-2.5 h-2.5 text-white" />
          </a>
          <a
            href="https://yelp.com"
            target="_blank"
            rel="noopener noreferrer"
            title="Yelp Reviews"
            className="w-5 h-5 rounded-none border border-white hover:opacity-75 text-white flex items-center justify-center transition-opacity cursor-pointer"
          >
            <Store className="w-2.5 h-2.5 text-white" />
          </a>
          <a
            href="#testimonials"
            title="5-Star Rated"
            className="w-5 h-5 rounded-none border border-white hover:opacity-75 text-white flex items-center justify-center transition-opacity cursor-pointer"
          >
            <Star className="w-2.5 h-2.5 fill-current text-white" />
          </a>
        </div>
      </div>

      {/* Main Transparent Navbar floating over screen with top space 10px, left/right space 10px */}
      <nav
        id="main-navbar"
        className="fixed top-[10px] left-[10px] right-[10px] z-[60] flex items-center lg:items-end justify-between pointer-events-auto"
      >
        {/* div 1: Logo Wrapper */}
        <div className="flex-1 lg:flex-none flex items-center justify-start shrink-0">
          <div 
            onClick={() => handleNavClick('#hero-section')}
            className="flex items-center select-none cursor-pointer group"
          >
            <div className="flex items-center gap-2">
              <img
                src="/Island-Breeze-Air-Conditioning-and-Heating-LLC-logo-150.webp"
                alt="Island Breeze AC Logo"
                className="h-14 sm:h-16 lg:h-[75px] w-auto max-w-[190px] sm:max-w-[230px] lg:max-w-[280px] object-contain transition-transform duration-200 group-hover:scale-105 filter drop-shadow-md border-0 outline-none"
                loading="eager"
                decoding="async"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
                style={{ border: 'none', outline: 'none' }}
              />
            </div>
          </div>
        </div>

        {/* div 2: Desktop Header Container with Navigation Menu */}
        <div className="hidden lg:flex flex-col items-end ml-auto select-none pt-[22px]">
          {/* Navigation Menu Bar + Action Buttons */}
          <div className="flex items-stretch shadow-xl rounded-none overflow-hidden">
            {/* White Nav Links Bar */}
            <div className="flex items-stretch h-[45px] bg-white select-none rounded-none overflow-hidden">
              {/* Nav items */}
              {navItems.map((item) => {
                const hasMega = item.id === 'nav-services' || item.id === 'nav-areas' || item.id === 'nav-about';
                const isActive = (item.id === 'nav-services' && activeMegaMenu === 'services') ||
                                 (item.id === 'nav-areas' && activeMegaMenu === 'areas') ||
                                 (item.id === 'nav-about' && activeMegaMenu === 'about');
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavClick(item.href, item.id)}
                    className={`px-3.5 text-[10px] font-['Nohemi'] font-bold uppercase tracking-[0.05em] transition-colors flex items-center gap-1.5 cursor-pointer border-r border-black/5 rounded-none ${
                      isActive
                        ? 'bg-[#2934ce] text-white'
                        : 'text-[#121417] hover:text-[#1E24E6] hover:bg-neutral-50'
                    }`}
                  >
                    <span>{item.name}</span>
                    {hasMega && (
                      <Plus className={`w-3 h-3 transition-transform duration-200 ${isActive ? 'rotate-45' : ''}`} />
                    )}
                  </button>
                );
              })}

              {/* Quick Search Trigger inside white bar */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="px-3 text-[#121417]/70 hover:text-[#1E24E6] hover:bg-neutral-50 transition-colors flex items-center cursor-pointer rounded-none"
                title="Search Site"
              >
                <Search className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>

            {/* Right Side Action Buttons */}
            <div className="flex items-stretch h-[45px] overflow-hidden rounded-none">
              {/* 1. Electric Royal Blue CALL TODAY Block */}
              <a
                id="navbar-call-today"
                href="tel:6233353958"
                className="flex items-center justify-center gap-2 px-3.5 bg-[#2934ce] hover:bg-[#181DC4] text-white transition-colors duration-150 cursor-pointer select-none group min-w-[132px] rounded-none"
                title="Call Today (623) 335-3958"
              >
                <div className="w-6 h-6 rounded-none bg-white/20 flex items-center justify-center shrink-0 group-hover:bg-white/30 transition-colors">
                  <PhoneCall className="w-3.5 h-3.5 text-white stroke-[2.4]" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-['Delight'] font-semibold text-[8px] uppercase tracking-[0.06em] text-white/95 leading-tight">
                    CALL TODAY
                  </span>
                  <span className="font-['Nohemi'] font-bold text-[12.5px] text-white tracking-tight leading-none mt-0.5 whitespace-nowrap group-hover:scale-[1.01] transition-transform">
                    (623) 335-3958
                  </span>
                </div>
              </a>

              {/* 2. Deep Jet Black BOOK ONLINE Block */}
              <button
                id="navbar-book-online"
                type="button"
                onClick={() => handleNavClick('#hero-section')}
                className="flex items-center justify-center gap-1.5 px-4 bg-[#000000] hover:bg-[#121417] text-white transition-colors duration-150 cursor-pointer select-none group min-w-[110px] rounded-none"
              >
                <Calendar className="w-3.5 h-3.5 text-white stroke-[2.2] group-hover:scale-110 transition-transform" />
                <span className="font-['Nohemi'] font-bold text-[11.5px] uppercase tracking-[0.06em] text-white whitespace-nowrap group-hover:scale-[1.01] transition-transform">
                  BOOK ONLINE
                </span>
              </button>
            </div>
          </div>

          {/* Slide-Down Mega Menu Panel (50vh max height, solid #2934ce, white text, no borders) */}
          {activeMegaMenu && (
            <div
              ref={megaMenuRef}
              className="absolute top-[72px] right-0 w-[92vw] max-w-5xl bg-[#2934ce] text-white p-6 rounded-none shadow-2xl border-none max-h-[50vh] overflow-y-auto mega-menu-scrollbar z-50 origin-top-right [will-change:transform,opacity]"
            >
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/20">
                <span className="font-['Nohemi'] font-bold text-sm sm:text-base uppercase tracking-wider text-white">
                  {activeMegaMenu === 'services' ? 'HVAC Services Directory' : 
                   activeMegaMenu === 'areas' ? 'Areas We Serve' : 
                   'About Us Directory'}
                </span>
                <button
                  type="button"
                  onClick={() => setActiveMegaMenu(null)}
                  className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white text-[11px] font-['Delight'] uppercase transition-colors rounded-none cursor-pointer border-none"
                >
                  Close [✕]
                </button>
              </div>

              {activeMegaMenu === 'services' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {servicesMegaMenu.map((group, idx) => (
                    <div key={idx} className="space-y-2">
                      <h4 className="font-['Nohemi'] font-bold text-xs tracking-wider text-white uppercase pb-1 border-b border-white/15">
                        {group.category}
                      </h4>
                      <ul className="space-y-1.5">
                        {group.items.map((subItem, sIdx) => (
                          <li key={sIdx}>
                            <button
                              type="button"
                              onClick={() => {
                                handleDropdownItemClick(subItem.href);
                              }}
                              className="text-[11.5px] font-['Delight'] text-white/80 hover:text-white hover:translate-x-1 transition-all text-left cursor-pointer bg-transparent border-none p-0 flex items-center gap-1.5"
                            >
                              <span className="text-white/60">▪</span> {subItem.name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {activeMegaMenu === 'areas' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {areasMegaMenu.map((group, idx) => (
                    <div key={idx} className="space-y-2">
                      <h4 className="font-['Nohemi'] font-bold text-xs tracking-wider text-white uppercase pb-1 border-b border-white/15">
                        {group.category}
                      </h4>
                      <ul className="space-y-1.5">
                        {group.items.map((subItem, sIdx) => (
                          <li key={sIdx}>
                            <button
                              type="button"
                              onClick={() => {
                                handleDropdownItemClick(subItem.href);
                              }}
                              className="text-[11.5px] font-['Delight'] text-white/80 hover:text-white hover:translate-x-1 transition-all text-left cursor-pointer bg-transparent border-none p-0 flex items-center gap-1.5"
                            >
                              <span className="text-white/60">▪</span> {subItem.name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {activeMegaMenu === 'about' && (
                <div className="grid grid-cols-1 gap-6">
                  {aboutMegaMenu.map((group, idx) => (
                    <div key={idx} className="space-y-2">
                      <h4 className="font-['Nohemi'] font-bold text-xs tracking-wider text-white uppercase pb-1 border-b border-white/15">
                        {group.category}
                      </h4>
                      <ul className="space-y-2">
                        {group.items.map((subItem, sIdx) => (
                          <li key={sIdx}>
                            <button
                              type="button"
                              onClick={() => {
                                handleDropdownItemClick(subItem.href);
                              }}
                              className="text-[11.5px] font-['Delight'] text-white/80 hover:text-white hover:translate-x-1 transition-all text-left cursor-pointer bg-transparent border-none p-0 flex items-center gap-1.5"
                            >
                              <span className="text-white/60">▪</span> {subItem.name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* div 3: Mobile Compact Menu trigger */}
        <div className="lg:hidden flex flex-1 justify-end items-center gap-2 h-[45px]">
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            className="w-[45px] h-[45px] min-w-[45px] bg-[#121417]/90 backdrop-blur-md rounded-none border border-white/10 text-white flex items-center justify-center p-0 cursor-pointer hover:bg-[#121417] transition-colors"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="h-[45px] px-5 bg-[#121417]/90 backdrop-blur-md rounded-none border border-white/10 text-[10px] font-['Nohemi'] font-bold text-white uppercase tracking-widest flex items-center justify-center cursor-pointer hover:bg-[#121417] transition-colors"
          >
            MENU
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col justify-between p-5 sm:p-6 lg:hidden animate-fadeIn">
          {/* Header Bar with Back Button / Logo & Close */}
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3.5 shrink-0">
            {mobileSubScreen !== 'main' ? (
              <button
                type="button"
                onClick={() => setMobileSubScreen('main')}
                className="flex items-center gap-2 text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 px-3 py-1.5 rounded-lg text-xs font-['Nohemi'] font-bold uppercase tracking-wider cursor-pointer transition-colors"
              >
                <ArrowLeft className="w-4 h-4 text-[#FE552F]" />
                <span>BACK TO MENU</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <img
                  src="/Island-Breeze-Air-Conditioning-and-Heating-LLC-logo-150.webp"
                  alt="Island Breeze AC Logo"
                  className="h-10 w-auto object-contain"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <span className="font-['Nohemi'] font-bold text-base tracking-tighter text-white">
                  ISLAND BREEZE <span className="text-[#FE552F]">AC</span>
                </span>
              </div>
            )}

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setMobileSubScreen('main');
              }}
              className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white cursor-pointer hover:bg-zinc-800 transition-colors"
              aria-label="Close Mobile Menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* MAIN MENU SCREEN */}
          {mobileSubScreen === 'main' && (
            <div className="space-y-4 flex flex-col items-start w-full overflow-y-auto max-h-[62vh] py-3 pr-1">
              {navItems.map((item) => {
                const isServices = item.id === 'nav-services';
                const isAreas = item.id === 'nav-areas';
                const isAbout = item.id === 'nav-about';
                const hasSubscreen = isServices || isAreas || isAbout;

                return (
                  <div key={item.id} className="w-full border-b border-zinc-800/80 pb-3.5">
                    <div className="flex items-center justify-between w-full">
                      <button
                        type="button"
                        onClick={() => {
                          if (isServices) {
                            setMobileSubScreen('services');
                          } else if (isAreas) {
                            setMobileSubScreen('areas');
                          } else if (isAbout) {
                            setMobileSubScreen('about');
                          } else {
                            handleNavClick(item.href, item.id);
                          }
                        }}
                        className="font-nohemi font-bold text-2xl text-white uppercase flex items-center gap-2 cursor-pointer text-left hover:text-[#FE552F] transition-colors"
                      >
                        <span>{item.name}</span>
                      </button>

                      {hasSubscreen && (
                        <button
                          type="button"
                          onClick={() => {
                            if (isServices) setMobileSubScreen('services');
                            if (isAreas) setMobileSubScreen('areas');
                            if (isAbout) setMobileSubScreen('about');
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2934ce] hover:bg-[#1f28aa] text-white text-[11px] font-['Nohemi'] font-bold rounded-lg uppercase tracking-wider cursor-pointer border border-white/10 transition-colors"
                        >
                          <span>VIEW ALL</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* DEDICATED SEPARATE SUB-SCREEN: ALL SERVICES */}
          {mobileSubScreen === 'services' && (
            <div className="flex-1 flex flex-col w-full overflow-hidden my-2">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-3 shrink-0">
                <div>
                  <h3 className="font-['Nohemi'] font-bold text-lg text-white uppercase tracking-wider flex items-center gap-2">
                    <span>ALL HVAC SERVICES</span>
                  </h3>
                  <p className="font-['Delight'] text-xs text-zinc-400 mt-0.5">
                    Select any climate service to jump directly to details
                  </p>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto space-y-4 pr-1 py-1">
                {servicesMegaMenu.map((group, idx) => (
                  <div key={idx} className="bg-[#181C20] rounded-xl p-4 border border-zinc-800 space-y-2.5">
                    <h4 className="font-['Nohemi'] font-bold text-sm text-white uppercase tracking-wider pb-1.5 border-b border-zinc-800/80">
                      {group.category}
                    </h4>
                    <div className="grid grid-cols-1 gap-2">
                      {group.items.map((subItem, sIdx) => (
                        <button
                          key={sIdx}
                          type="button"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setMobileSubScreen('main');
                            handleNavClick(subItem.href);
                          }}
                          className="text-xs font-['Delight'] text-zinc-200 hover:text-white bg-zinc-900/80 hover:bg-[#2934ce] p-2.5 rounded-lg border border-zinc-800/60 transition-colors text-left flex items-center justify-between cursor-pointer"
                        >
                          <span>{subItem.name}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DEDICATED SEPARATE SUB-SCREEN: AREAS WE SERVE */}
          {mobileSubScreen === 'areas' && (
            <div className="flex-1 flex flex-col w-full overflow-hidden my-2">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-3 shrink-0">
                <div>
                  <h3 className="font-['Nohemi'] font-bold text-lg text-white uppercase tracking-wider flex items-center gap-2">
                    <span>AREAS WE SERVE</span>
                  </h3>
                  <p className="font-['Delight'] text-xs text-zinc-400 mt-0.5">
                    Select a service area to view regional details
                  </p>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto space-y-4 pr-1 py-1">
                {areasMegaMenu.map((group, idx) => (
                  <div key={idx} className="bg-[#181C20] rounded-xl p-4 border border-zinc-800 space-y-2.5">
                    <h4 className="font-['Nohemi'] font-bold text-sm text-white uppercase tracking-wider pb-1.5 border-b border-zinc-800/80">
                      {group.category}
                    </h4>
                    <div className="grid grid-cols-1 gap-2">
                      {group.items.map((subItem, sIdx) => (
                        <button
                          key={sIdx}
                          type="button"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setMobileSubScreen('main');
                            handleNavClick(subItem.href);
                          }}
                          className="text-xs font-['Delight'] text-zinc-200 hover:text-white bg-zinc-900/80 hover:bg-[#2934ce] p-2.5 rounded-lg border border-zinc-800/60 transition-colors text-left flex items-center justify-between cursor-pointer"
                        >
                          <span>{subItem.name}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DEDICATED SEPARATE SUB-SCREEN: ABOUT US */}
          {mobileSubScreen === 'about' && (
            <div className="flex-1 flex flex-col w-full overflow-hidden my-2">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-3 shrink-0">
                <div>
                  <h3 className="font-['Nohemi'] font-bold text-lg text-white uppercase tracking-wider flex items-center gap-2">
                    <span>ABOUT ISLAND BREEZE AC</span>
                  </h3>
                  <p className="font-['Delight'] text-xs text-zinc-400 mt-0.5">
                    Serving Phoenix, AZ & Surrounding Metro • AZ ROC #327760
                  </p>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto space-y-4 pr-1 py-1">
                {aboutMegaMenu.map((group, idx) => (
                  <div key={idx} className="bg-[#181C20] rounded-xl p-4 border border-zinc-800 space-y-2.5">
                    <h4 className="font-['Nohemi'] font-bold text-sm text-white uppercase tracking-wider pb-1.5 border-b border-zinc-800/80">
                      {group.category}
                    </h4>
                    <div className="grid grid-cols-1 gap-2">
                      {group.items.map((subItem, sIdx) => (
                        <button
                          key={sIdx}
                          type="button"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setMobileSubScreen('main');
                            handleNavClick(subItem.href);
                          }}
                          className="text-xs font-['Delight'] text-zinc-200 hover:text-white bg-zinc-900/80 hover:bg-[#2934ce] p-2.5 rounded-lg border border-zinc-800/60 transition-colors text-left flex items-center justify-between cursor-pointer"
                        >
                          <span>{subItem.name}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* BOTTOM FIXED CALL / BOOK CTA BUTTONS */}
          <div className="border-t border-zinc-800 pt-3.5 flex flex-col gap-2 shrink-0">
            <a
              href="tel:6233353958"
              onClick={() => {
                setMobileMenuOpen(false);
                setMobileSubScreen('main');
              }}
              className="w-full py-2.5 flex flex-col items-center justify-center bg-[#1E24E6] hover:bg-[#181DC4] text-white transition-colors select-none cursor-pointer rounded-lg"
            >
              <span className="font-['Delight'] font-semibold text-[10px] uppercase tracking-wider text-white/95">
                CALL TODAY
              </span>
              <span className="font-['Nohemi'] font-bold text-[18px] text-white tracking-tight leading-none mt-0.5">
                (623) 335-3958
              </span>
            </a>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setMobileSubScreen('main');
                handleNavClick('#hero-section');
              }}
              className="w-full h-11 flex items-center justify-center bg-[#000000] hover:bg-zinc-900 text-white font-['Nohemi'] font-bold text-[13px] uppercase tracking-wider border border-zinc-800 transition-colors select-none cursor-pointer rounded-lg"
            >
              BOOK ONLINE NOW
            </button>
          </div>
        </div>
      )}

      {/* Dynamic Interactive Search Dialog Screen */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24 sm:pt-32 px-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-xl bg-[#1A1D21] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl p-5 relative">
            
            {/* Header / Input */}
            <div className="flex items-center gap-3 border-b border-zinc-800 pb-3">
              <Search className="w-5 h-5 text-zinc-400" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search climate services..."
                className="flex-1 bg-transparent border-0 focus:outline-none focus:ring-0 text-white placeholder-zinc-500 font-body text-sm"
              />
              <button
                type="button"
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery('');
                }}
                className="p-1 text-zinc-500 hover:text-white rounded-full bg-zinc-900 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Match Listings */}
            <div className="mt-4 max-h-[300px] overflow-y-auto space-y-2 pr-1">
              <span className="text-[10px] font-subheading font-bold uppercase tracking-wider text-zinc-500 block text-left mb-1">
                {filteredSearch.length > 0 ? 'INSTANT SERVICE RECOMMENDATIONS' : 'NO MATCHES FOUND'}
              </span>
              {filteredSearch.map((item, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery('');
                    document.getElementById(item.targetId)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full text-left p-3 rounded-lg bg-[#121417]/80 hover:bg-white/10 hover:border-white/20 border border-transparent text-sm font-subheading font-semibold text-zinc-200 hover:text-white flex items-center justify-between transition-all duration-200 cursor-pointer"
                >
                  <span>{item.name}</span>
                  <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-white" />
                </button>
              ))}
            </div>

            {/* Quick Helper Banner */}
            <div className="mt-4 pt-3.5 border-t border-zinc-800 text-left text-[11px] text-zinc-500 flex items-center justify-between">
              <span>Press <kbd className="bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded text-zinc-400">ESC</kbd> to close</span>
              <span>24/7 Priority Support Ready</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
