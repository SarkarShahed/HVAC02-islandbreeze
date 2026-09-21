import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ArrowUpRight, ShieldCheck } from 'lucide-react';

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  location: string;
  category: 'all' | 'ac-heat-pump' | 'heating' | 'emergency' | 'maintenance';
  categoryLabel: string;
  rating: number;
  date: string;
  title: string;
  review: string;
  systemInstalled?: string;
  metric?: string;
  avatar: string;
  platform: 'Google' | 'Yelp' | 'Angi';
}

const testimonialsData: Testimonial[] = [
  {
    id: 't-1',
    author: 'Yo Ipitydafool',
    role: 'Homeowner',
    location: 'Phoenix, AZ',
    category: 'maintenance',
    categoryLabel: 'Peak Protection Program',
    rating: 5,
    date: 'September 13, 2026',
    title: 'AC blowing ice cold again — highly recommend',
    review:
      'Called at 7AM Saturday and was out same day at 5PM. Replaced dead capacitor and burnt contact terminal — AC blowing ice cold again. Highly recommend the Peak Protection Program.',
    metric: 'Same-Day Repair',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    platform: 'Google',
  },
  {
    id: 't-2',
    author: 'Lynn Behlendorf',
    role: 'Homeowner',
    location: 'Phoenix, AZ',
    category: 'ac-heat-pump',
    categoryLabel: 'Outstanding Service',
    rating: 5,
    date: 'August 26, 2026',
    title: 'Most professional contractor I\'ve ever worked with',
    review:
      "The owner Darrel was the most professional contractor I've ever worked with. On time, respectful, and went the extra mile. Outstanding service.",
    metric: 'Highly Professional',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    platform: 'Google',
  },
  {
    id: 't-3',
    author: 'Patrick Betancourt',
    role: 'Homeowner',
    location: 'Phoenix, AZ',
    category: 'emergency',
    categoryLabel: 'Emergency Cooling',
    rating: 5,
    date: 'August 24, 2026',
    title: 'Won me over as a customer for life',
    review:
      'AC went out while I was on vacation. Tyler got parts ordered and fixed in 2 days — another company said 5-7 days. Won me over as a customer for life.',
    metric: '2-Day Fast Parts & Fix',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    platform: 'Google',
  },
  {
    id: 't-4',
    author: 'Sophia Chen',
    role: 'Boutique Hotel Manager',
    location: 'Downtown Phoenix',
    category: 'ac-heat-pump',
    categoryLabel: 'Ductless Mini-Split',
    rating: 5,
    date: '1 month ago',
    title: 'Flawless 8-zone multi-split installation',
    review:
      'We retrofitted our historic boutique office with an 8-zone multi-split system. Their team hid all refrigerant lines behind architectural moldings. Each room now controls its own microclimate with zero duct loss. Impeccable craftsmanship and clean execution.',
    systemInstalled: 'Mitsubishi Hyper-Heating Diamond Multi-Zone',
    metric: '8 Independent Zones',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    platform: 'Google',
  },
  {
    id: 't-5',
    author: 'Robert Sterling',
    role: 'Homeowner',
    location: 'Gilbert, AZ',
    category: 'maintenance',
    categoryLabel: 'Annual Tune-Up & IAQ',
    rating: 5,
    date: '2 months ago',
    title: 'Thorough inspection and IAQ filter upgrade',
    review:
      'I appreciate technical rigor. Most contractors just guess unit tonnage. These technicians ran proper load calculations, installed whole-home MERV 13 filtration, and balanced static pressure. Air quality and dust levels improved dramatically.',
    metric: 'MERV 13 Air Purification',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
    platform: 'Google',
  },
  {
    id: 't-6',
    author: 'Clara Montrose',
    role: 'Homeowner',
    location: 'Mesa, AZ',
    category: 'emergency',
    categoryLabel: 'Emergency AC Repair',
    rating: 5,
    date: '2 months ago',
    title: 'Saved our family from the desert heat',
    review:
      'Our blower motor died with family visiting on a holiday weekend. The on-call technician arrived within an hour, diagnosed the blown capacitor and seized bearings, replaced both from his truck inventory, and performed a complimentary safety combustion check before leaving.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    platform: 'Google',
  },
  {
    id: 't-7',
    author: 'Jameson Thorne',
    role: 'Homeowner',
    location: 'Peoria, AZ',
    category: 'ac-heat-pump',
    categoryLabel: 'Custom Home HVAC',
    rating: 5,
    date: '3 months ago',
    title: 'The only climate contractor I trust on my property',
    review:
      'We collaborate with them on all our custom upgrades. They integrate modern slot diffusers, concealed ductwork, and smart home automation seamlessly. Their fabricators build custom plenums that fit tighter tolerances than anyone else.',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80',
    platform: 'Google',
  },
  {
    id: 't-8',
    author: 'Hannah & Greg Paulson',
    role: 'Homeowners',
    location: 'Surprise, AZ',
    category: 'maintenance',
    categoryLabel: 'Maintenance VIP Plan',
    rating: 5,
    date: '3 months ago',
    title: 'Their seasonal tune-ups extended our system life past 15 years',
    review:
      'We have been on their annual maintenance agreement for 7 years. They flush our condensate line, treat for biological growth, lubricate motors, and check refrigerant charge every spring and fall. Our utility bills stay predictable, and we have never experienced an unplanned breakdown.',
    metric: '15+ Year Unit Longevity',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    platform: 'Google',
  },
  {
    id: 't-9',
    author: 'Victor Barone',
    role: 'Business Owner',
    location: 'Glendale, AZ',
    category: 'heating',
    categoryLabel: 'Commercial Ventilation',
    rating: 5,
    date: '4 months ago',
    title: 'Balanced our ventilation and commercial climate seamlessly',
    review:
      'Our facility was previously pulling negative pressure, causing drafty tables and swinging doors. Their technicians installed a dedicated makeup air unit with heat recovery. Temperature is stable and energy consumption dropped 22%.',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
    platform: 'Google',
  },
  {
    id: 't-10',
    author: 'Rebecca Martinez',
    role: 'Homeowner',
    location: 'Scottsdale, AZ',
    category: 'maintenance',
    categoryLabel: 'Whole-Home IAQ & Dehumidifier',
    rating: 5,
    date: '4 months ago',
    title: 'Eliminated summer humidity and dust allergies completely',
    review:
      'Arizona summers can feel heavy even indoors. They installed an ultra-efficient central dehumidifier paired with an electrostatic air purifier. Our indoor relative humidity stays strictly at 45%, and the air smells as crisp as mountain breeze.',
    metric: 'Constant 45% RH Control',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    platform: 'Google',
  },
  {
    id: 't-11',
    author: 'Kevin O\'Connor',
    role: 'Facility Operations Manager',
    location: 'Chandler, AZ',
    category: 'emergency',
    categoryLabel: 'Critical HVAC Dispatch',
    rating: 5,
    date: '5 months ago',
    title: 'Emergency server room cooling restored in under 40 minutes',
    review:
      'When our primary cleanroom server cooling unit threw an emergency high-pressure lock, Island Breeze’s emergency dispatch rerouted portable DX chillers within 40 minutes while their certified technician rebuilt the expansion valve.',
    metric: 'Zero Server Downtime',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    platform: 'Google',
  },
  {
    id: 't-12',
    author: 'Danielle Scott',
    role: 'Homeowner',
    location: 'Avondale, AZ',
    category: 'ac-heat-pump',
    categoryLabel: 'Dual-Fuel Inverter System',
    rating: 5,
    date: '5 months ago',
    title: 'Whisper-quiet comfort and 40% reduction in utility bills',
    review:
      'We replaced two aging 10 SEER rooftop units with side-discharge variable-speed inverter heat pumps. You literally cannot hear them running from 5 feet away. Our electric bills dropped dramatically even during peak July heat.',
    systemInstalled: 'Bosch Premium IDS 2.0 Inverter Heat Pump',
    metric: '40% Lower Electric Bills',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    platform: 'Google',
  },
];

const categoryTabs = [
  { id: 'all', label: 'All Reviews' },
  { id: 'ac-heat-pump', label: 'AC & Heat Pumps' },
  { id: 'heating', label: 'Heating & Furnaces' },
  { id: 'emergency', label: '24/7 Emergency' },
  { id: 'maintenance', label: 'Maintenance & IAQ' },
];

export const TestimonialsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [showAll, setShowAll] = useState<boolean>(false);

  const filteredTestimonials = useMemo(() => {
    if (activeTab === 'all') return testimonialsData;
    return testimonialsData.filter((item) => item.category === activeTab);
  }, [activeTab]);

  // Default view caps at 8 review cards
  const displayedTestimonials = useMemo(() => {
    if (showAll) return filteredTestimonials;
    return filteredTestimonials.slice(0, 8);
  }, [filteredTestimonials, showAll]);

  const hasMore = filteredTestimonials.length > 8;

  return (
    <section
      id="testimonials"
      data-section="reviews"
      className="w-full max-w-[100vw] bg-[#ECEDEF] pt-[100px] md:pt-[128px] pb-20 md:pb-28 lg:pb-32 px-[20px] border-none rounded-none text-[#121417] scroll-mt-16 select-none"
    >
      <div className="w-full max-w-[100vw] mx-auto">
        {/* Section Header */}
        <div className="w-full max-w-[100vw] flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-16">
          <div className="max-w-2xl text-left">
            {/* Minimalist Top Tag */}
            <div className="inline-block px-3 py-1 bg-[#121417] text-white text-[12px] font-['Delight'] font-medium uppercase tracking-widest rounded-[8px] border-none mb-4">
              Verified Client Feedback
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-['Nohemi'] font-bold text-[#121417] tracking-tight leading-[1.12] mb-4 text-left">
              Real Stories. Measured Comfort.
            </h2>

            <p className="text-zinc-600 font-['Delight'] font-normal text-base md:text-lg leading-relaxed text-left">
              Read transparent feedback from over 658+ Phoenix homeowners who trust Island Breeze.
            </p>
          </div>

          {/* Rating Summary Block (8px rounded corners) */}
          <div className="bg-white p-6 rounded-[8px] border-none shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex items-center gap-6 shrink-0 self-start md:self-auto">
            <div className="flex flex-col text-left">
              <span className="font-['Nohemi'] font-bold text-4xl text-[#121417] leading-none">
                5.0
              </span>
              <span className="font-['Delight'] font-normal text-xs text-zinc-500 mt-1">out of 5.0</span>
            </div>

            <div className="h-10 w-[1px] bg-zinc-200" />

            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1 text-[#22C55E]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#22C55E] stroke-[#22C55E]" />
                ))}
              </div>
              <span className="font-['Delight'] font-medium text-xs text-zinc-600 mt-1">
                658 Reviews on Google
              </span>
            </div>
          </div>
        </div>

        {/* Filter Navigation Tabs (8px rounded corners) */}
        <div className="w-full max-w-[100vw] flex flex-wrap items-center gap-2 mb-10 pb-2">
          {categoryTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id);
                  setShowAll(false);
                }}
                className={`px-4 py-2 text-sm font-['Delight'] transition-colors rounded-[8px] border-none cursor-pointer ${
                  isActive
                    ? 'bg-[#121417] text-white font-medium'
                    : 'bg-white text-zinc-700 hover:bg-zinc-200 font-normal'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Masonry-Style Grid Container (Columns layout with break-inside-avoid) */}
        <div className="w-full max-w-[100vw] columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          <AnimatePresence mode="popLayout">
            {displayedTestimonials.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                  e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
                }}
                className="group relative overflow-hidden break-inside-avoid bg-white p-7 rounded-[8px] border-none shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(41,52,206,0.12)] transition-all flex flex-col justify-between"
              >
                {/* Base Grid Pattern Hover Effect using #2934ce */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, rgba(41, 52, 206, 0.16) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(41, 52, 206, 0.16) 1px, transparent 1px)
                    `,
                    backgroundSize: '22px 22px',
                  }}
                />

                {/* Interactive Spotlight on #2934ce grid */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-0"
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, rgba(41, 52, 206, 0.45) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(41, 52, 206, 0.45) 1px, transparent 1px)
                    `,
                    backgroundSize: '22px 22px',
                    maskImage: 'radial-gradient(160px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), black, transparent)',
                    WebkitMaskImage: 'radial-gradient(160px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), black, transparent)',
                  }}
                />

                {/* Soft ambient glow in #2934ce centered at cursor */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                  style={{
                    background: 'radial-gradient(220px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(41, 52, 206, 0.08), transparent 80%)',
                  }}
                />

                <div className="relative z-10 text-left">
                  {/* Card Header: Service Tag & Star Rating */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-2.5 py-0.5 bg-[#ECEDEF] text-[#121417] text-[11px] font-['Delight'] font-medium uppercase tracking-wider rounded-[8px] border-none group-hover:bg-[#2934ce]/10 group-hover:text-[#2934ce] transition-colors">
                      {item.categoryLabel}
                    </span>

                    <div className="flex items-center gap-0.5 text-[#22C55E]">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#22C55E] stroke-[#22C55E]" />
                      ))}
                    </div>
                  </div>

                  {/* Review Headline */}
                  <h3 className="font-['Delight'] font-medium text-lg text-[#121417] leading-snug mb-3">
                    "{item.title}"
                  </h3>

                  {/* Review Body */}
                  <p className="font-['Delight'] font-normal text-zinc-600 text-[14.5px] leading-relaxed mb-5">
                    {item.review}
                  </p>

                  {/* Highlights (if any) */}
                  {item.metric && (
                    <div className="mb-5 inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-['Delight'] font-medium rounded-[8px] border-none">
                      <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
                      <span>{item.metric}</span>
                    </div>
                  )}

                  {item.systemInstalled && (
                    <div className="mb-5 text-xs text-zinc-500 font-['Delight'] font-normal">
                      <span className="text-zinc-400">Equipment:</span> {item.systemInstalled}
                    </div>
                  )}
                </div>

                {/* Card Footer: User Info */}
                <div className="relative z-10 pt-4 border-t border-zinc-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.avatar}
                      alt={item.author}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                      className="w-10 h-10 rounded-[8px] object-cover shrink-0 bg-zinc-200"
                    />
                    <div className="text-left">
                      {/* Name */}
                      <h4 className="font-['Delight'] font-medium text-sm text-[#121417] leading-tight">
                        {item.author}
                      </h4>
                      {/* Role & Location */}
                      <p className="font-['Delight'] font-normal text-xs text-zinc-500">
                        {item.role} · {item.location}
                      </p>
                    </div>
                  </div>

                  <span className="text-[11px] font-['Delight'] font-normal text-zinc-400">
                    {item.platform}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* See More / Show Less Button */}
        {hasMore && (
          <div className="w-full flex justify-center items-center mt-12 md:mt-16">
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="group inline-flex items-center gap-3 px-8 py-3.5 bg-[#121417] hover:bg-[#2934ce] text-white font-['Nohemi'] font-bold text-xs uppercase tracking-wider rounded-[8px] shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <span>{showAll ? 'Show Less Reviews' : `See More Reviews (${filteredTestimonials.length - 8} more)`}</span>
              <span className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center transition-transform group-hover:translate-y-0.5">
                <ArrowUpRight className={`w-3.5 h-3.5 transition-transform duration-300 ${showAll ? 'rotate-[225deg]' : 'rotate-45'}`} />
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
