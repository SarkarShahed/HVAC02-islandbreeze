import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Calendar, Clock, X, BookOpen, ChevronRight } from 'lucide-react';

interface BlogPost {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  content: string[];
  date: string;
  readTime: string;
  image: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    category: 'Technology',
    title: 'The Future of Home Climate: Inverter Heat Pumps',
    excerpt: 'Why variable-speed inverter heat pumps are quickly replacing traditional central air conditioning units in the Valley.',
    date: 'Sep 15, 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop',
    content: [
      'For decades, standard air conditioners have operated on a simple on-and-off mechanism. When your home gets warm, the system runs at 100% capacity until the thermostat is satisfied, then shuts down completely. This cyclical operation consumes an enormous amount of surge electrical power and creates noticeable temperature swings.',
      'Enter the variable-speed inverter heat pump. Instead of turning on and off, inverter compressors automatically scale their operating speed anywhere from 10% to 100% capacity. This is like cruise control for your home\'s climate, matching the heat load of the house with micro-adjustments.',
      'Key Benefits of Inverter Systems in Arizona:',
      '• Unmatched Efficiency: Slashing starting amperage spikes results in up to a 40% reduction in seasonal electrical bills.',
      '• Whisper-Quiet Sound Profile: Because the system rarely needs to run at full power, operational decibel levels hover around 45 dB (similar to quiet library chatter).',
      '• Continuous Zoned Dehumidification: Slower, continuous air cycles extract maximum moisture from the air, creating a healthier, more balanced home environment.',
      'Upgrading to a variable-speed inverter system qualifies for federal Energy Efficient Home Improvement Tax Credits (Section 25C), refunding up to $2,000 on qualifying heat pump installations.'
    ]
  },
  {
    id: '2',
    category: 'Smart Home',
    title: 'Unlocking Efficiency: Smart Thermostat Routines',
    excerpt: 'Maximize comfort and slash your electric bills up to 25% with optimized smart automated scheduling.',
    date: 'Sep 12, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?q=80&w=800&auto=format&fit=crop',
    content: [
      'Simply buying a Nest, Ecobee, or Honeywell thermostat doesn\'t automatically guarantee lower utility bills. True savings come from designing clever temperature routines that sync with your personal schedule and local peak-utility hour rates.',
      'How to Optimize Your Thermostat Schedule:',
      '1. Leverage Geofencing: Enable location-based triggers so your HVAC automatically enters ECO mode the minute your smartphone leaves a 1-mile radius of your house.',
      '2. Pre-Cool Strategically: In extreme climates, pre-cool your home by 2-3 degrees right before peak-rate utility hours begin. When peak rates hit, set your thermostat 3 degrees higher to avoid high-capacity cooling when electricity is most expensive.',
      '3. Sleep Calibration: Sleep science suggests human bodies rest best at cooler temperatures (65°F to 68°F). Automate your thermostat to descend to this range 30 minutes before bed, and climb back up to 73°F just before your morning alarm.',
      'By taking these small automated steps, you will prolong your HVAC system\'s lifespan by reducing compressor wear and tear.'
    ]
  },
  {
    id: '3',
    category: 'Air Quality',
    title: 'Silent Killers: Understanding Indoor Air Pollutants',
    excerpt: 'From volatile organic compounds to micro-dust, discover how HEPA filtration saves your lungs.',
    date: 'Sep 08, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop',
    content: [
      'We spend nearly 90% of our lives indoors, yet indoor air is often 2 to 5 times more polluted than outdoor air. Dust, pet dander, mold spores, and volatile organic compounds (VOCs) from household cleaners accumulate over time, aggravating asthma, allergies, and fatigue.',
      'The HEPA Standard Explained:',
      'High-Efficiency Particulate Air (HEPA) filters are mathematically engineered to trap 99.97% of airborne particles as small as 0.3 microns. To put that in perspective, a human hair is about 70 microns wide. HEPA filters catch micro-pollutants that pass directly through cheap fiberglass filters.',
      'Adding UV-C Germicidal Scrubbers:',
      'While filters trap physical particles, UV-C light targets biological contaminants. Placing a UV germicidal lamp directly inside your air return chamber neutralizes viruses, bacteria, and mold spores by destroying their cellular DNA as air flows past.',
      'Consider testing your indoor air quality annually to pinpoint exact VOC concentrations and particulate levels.'
    ]
  },
  {
    id: '4',
    category: 'Maintenance',
    title: 'Preparing Your Heating For Desert Winter Nights',
    excerpt: 'Don\'t get caught cold. Our essential 7-point pre-season heating audit and checklist.',
    date: 'Aug 29, 2026',
    readTime: '3 min read',
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=800&auto=format&fit=crop',
    content: [
      'While the desert is famous for its sizzling summer afternoons, winter nights can plunge into the freezing 30s. Turning on your furnace for the first time in a year can trigger dusty burning smells or, worse, safety failures.',
      'Our Essential Winter HVAC Checklist:',
      '• Inspect the Heat Exchanger: Over time, minor rust or expansion cycles can cause microscopic cracks in your furnace\'s heat exchanger. This is a critical safety issue that can leak dangerous carbon monoxide into your home\'s breathing air.',
      '• Calibrate Ignition Systems: Check the hot surface igniter or pilot assembly for carbon buildup, which causes ignition delays and system lockouts.',
      '• Change Air Filters: A dirty filter restricts airflow, forcing your furnace to run hotter and trigger the high-limit switch, leading to premature shutdowns.',
      'A professional heating tune-up ensures reliable, safe performance all winter long, keeping your family warm and energy bills low.'
    ]
  },
  {
    id: '5',
    category: 'Ductwork',
    title: 'Aerosol Duct Sealing vs Traditional Methods',
    excerpt: 'How computer-controlled pressure sealing patches leaks that manual tape can never reach.',
    date: 'Aug 22, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?q=80&w=800&auto=format&fit=crop',
    content: [
      'The average home loses 20% to 30% of its conditioned air through cracks, loose joints, and gaps in its ductwork. This means you are paying to heat or cool your attic. Traditional duct sealing involves crawling through tight spaces and painting duct mastic over visible seams.',
      'The Aerosol Sealing Revolution:',
      'Modern computer-controlled aerosol sealing takes a completely different approach. The entire duct system is first sealed off at all register locations and pressurized. A specialized computer monitors leakage rates in real-time.',
      'Next, a fine aerosolized sealant is suspended inside the pressurized ducts. As the escaping air forces its way through tiny, hidden cracks, the adhesive sealant particles collide and stick to the edges of the leak, building up a durable, airtight seal from the inside out.',
      'Aerosol sealing can seal leaks up to 5/8 of an inch wide, reducing overall duct leakage by up to 90% in just a few hours.'
    ]
  },
  {
    id: '6',
    category: 'Commercial',
    title: 'Light Commercial HVAC Systems: Scaling Comfort',
    excerpt: 'Managing complex zone requirements and preventative maintenance cycles for small businesses.',
    date: 'Aug 15, 2026',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop',
    content: [
      'Commercial climate control requires a unique set of engineering considerations compared to residential buildings. Office spaces, clinics, and retail stores have high occupancy fluctuations, heat-generating computers, and heavy ventilation mandates.',
      'The Power of Package Rooftop Units:',
      'Most light commercial properties rely on Rooftop Units (RTUs). By housing the compressor, evaporator, condenser, and heating source within a single weatherproof exterior cabinet on the roof, businesses save valuable indoor square footage and isolate operational noise.',
      'Implementing Zoned Control Systems:',
      'A Variable Air Volume (VAV) system dynamically directs air to specific areas based on thermal demand. For example, a south-facing conference room with 20 people will receive focused cooling, while a shaded, empty storage area remains at a standard holding temperature.',
      'Partnering with a licensed commercial HVAC contractor for scheduled preventative maintenance cycles protects your capital equipment investments and avoids costly business downtime.'
    ]
  }
];

const CATEGORIES = ['All', 'Technology', 'Smart Home', 'Air Quality', 'Maintenance', 'Ductwork', 'Commercial'];

export const BlogSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Filter 6 high quality posts based on the category
  const filteredPosts = activeCategory === 'All'
    ? BLOG_POSTS
    : BLOG_POSTS.filter(post => post.category === activeCategory);

  return (
    <section
      id="blog-section"
      className="relative w-full max-w-[100vw] min-h-screen bg-[#121417] text-[#FFFFFF] py-12 md:py-16 px-[20px] flex flex-col justify-between overflow-hidden select-none border-t border-zinc-800"
    >
      <div className="w-full h-full mx-auto flex flex-col justify-between gap-6 md:gap-8">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1 text-left">
            <span className="text-[11px] font-subheading font-medium uppercase tracking-[0.2em] text-zinc-400">
              NEWS & ESSENTIALS
            </span>
            <h2 className="font-nohemi font-bold text-3xl md:text-[48px] capitalize text-[#FFFFFF] leading-none tracking-tight">
              Latest Articles & Insights
            </h2>
          </div>

          {/* Dynamic Filter Controls (Design System Secondary Pill Styling) */}
          <div className="flex flex-wrap gap-1.5 max-w-full overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 text-xs font-subheading font-medium rounded-full transition-all duration-300 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-white text-[#121417]'
                    : 'bg-[#ECEDEF]/10 text-[#ECEDEF] hover:bg-[#ECEDEF]/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 6 High-Quality Cards Grid - Tall, Premium Proportions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-6 md:mt-8 pr-1">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                onClick={() => setSelectedPost(post)}
                className="group flex flex-col bg-[#1A1D21] border border-zinc-800 rounded-[12px] overflow-hidden cursor-pointer hover:border-zinc-500 hover:shadow-lg transition-all duration-300 min-h-[460px] md:min-h-[500px] justify-between"
              >
                {/* Image Container with Zoom effect */}
                <div className="relative aspect-[3/2] w-full overflow-hidden bg-zinc-950">
                  <img
                    src={post.image}
                    alt={post.title}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Category Chip Overlaid */}
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 text-[10px] font-subheading font-medium tracking-wider uppercase bg-[#121417]/90 text-white border border-zinc-800 rounded-full">
                    {post.category}
                  </span>
                  
                  {/* Hover Overlay Arrow */}
                  <div className="absolute top-3 right-3 w-7 h-7 bg-[#ECEDEF] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-[-4px] group-hover:translate-y-0 transition-all duration-300 shadow-md">
                    <ArrowUpRight className="w-4 h-4 text-[#121417]" />
                  </div>
                </div>

                {/* Text Context (Compact & highly scannable to prevent spillover) */}
                <div className="p-4 flex-1 flex flex-col justify-between gap-2 text-left">
                  <div className="space-y-1.5">
                    {/* Date / Read Time Row */}
                    <div className="flex items-center gap-3 text-[11px] text-[#ECEDEF]/60 font-body">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-zinc-400" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-zinc-400" />
                        {post.readTime}
                      </span>
                    </div>

                    {/* Post Title */}
                    <h3 className="font-nohemi font-bold text-base md:text-lg text-[#FFFFFF] line-clamp-2 leading-snug group-hover:text-zinc-300 transition-colors duration-200">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="font-body text-xs md:text-sm text-[#ECEDEF]/70 line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Footer Action Link */}
                  <div className="flex items-center gap-1 text-[11px] font-subheading font-medium uppercase tracking-wider text-white pt-2 border-t border-zinc-800/60 mt-1">
                    <span>Read Article</span>
                    <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>

      {/* Dynamic Pop-up Reading Modal Drawer for full article content */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            key="blog-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#121417]/95 z-50 flex items-center justify-center p-4 md:p-6 backdrop-blur-md"
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              key="blog-modal-content"
              initial={{ scale: 0.95, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 30, opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="bg-[#1A1D21] border border-zinc-800 rounded-[16px] overflow-hidden max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#121417]/85 hover:bg-[#ECEDEF] hover:text-[#121417] border border-zinc-800 text-[#FFFFFF] flex items-center justify-center transition-all z-10 cursor-pointer shadow-lg"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Body Scroll */}
              <div className="overflow-y-auto flex-1 scrollbar-none">
                {/* Hero Banner inside reading modal */}
                <div className="relative aspect-video w-full bg-zinc-950">
                  <img
                    src={selectedPost.image}
                    alt={selectedPost.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1D21] via-[#1A1D21]/30 to-transparent" />
                  
                  {/* Category badge & metadata */}
                  <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center gap-3">
                    <span className="px-3 py-1 text-xs font-subheading font-medium tracking-wider uppercase bg-white text-[#121417] rounded-full">
                      {selectedPost.category}
                    </span>
                    <div className="flex items-center gap-2 text-xs text-white bg-[#121417]/80 backdrop-blur-xs px-2.5 py-1 rounded-full border border-zinc-800">
                      <Calendar className="w-3 h-3 text-zinc-400" />
                      <span>{selectedPost.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white bg-[#121417]/80 backdrop-blur-xs px-2.5 py-1 rounded-full border border-zinc-800">
                      <Clock className="w-3 h-3 text-zinc-400" />
                      <span>{selectedPost.readTime}</span>
                    </div>
                  </div>
                </div>

                {/* Article Content */}
                <div className="p-6 md:p-8 space-y-5 text-left">
                  <h3 className="font-nohemi font-bold text-2xl md:text-3xl text-[#FFFFFF] leading-tight tracking-tight">
                    {selectedPost.title}
                  </h3>

                  <div className="h-[1px] bg-zinc-800 my-4" />

                  <div className="space-y-4 font-body text-zinc-300 text-sm md:text-base leading-relaxed">
                    {selectedPost.content.map((paragraph, idx) => {
                      if (paragraph.startsWith('•') || paragraph.startsWith('1.') || paragraph.startsWith('2.') || paragraph.startsWith('3.')) {
                        return (
                          <div key={idx} className="pl-3 py-1.5 border-l-2 border-zinc-500 bg-[#121417]/30 text-zinc-200">
                            {paragraph}
                          </div>
                        );
                      }
                      if (paragraph.endsWith(':')) {
                        return (
                          <h4 key={idx} className="font-nohemi font-bold text-base text-[#FFFFFF] pt-2">
                            {paragraph}
                          </h4>
                        );
                      }
                      return (
                        <p key={idx}>
                          {paragraph}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Sticky Modal footer */}
              <div className="p-4 bg-[#121417] border-t border-zinc-800 flex justify-between items-center text-xs text-zinc-400">
                <span className="flex items-center gap-1.5 font-subheading">
                  <BookOpen className="w-4 h-4 text-zinc-400" /> Enjoyed reading?
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedPost(null)}
                  className="px-4 py-2 bg-[#ECEDEF] hover:bg-white text-[#121417] font-subheading font-medium rounded-full cursor-pointer transition-all"
                >
                  Close Reader
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
