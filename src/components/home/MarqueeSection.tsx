import { motion } from 'motion/react';
import { Trophy, BadgeCheck, Coins, Clock, Star, Receipt } from 'lucide-react';

const marqueeItems = [
  { icon: Trophy, title: "Firefighter owned", sub: "Est. Phoenix, AZ" },
  { icon: BadgeCheck, title: "NATE certified techs", sub: "Factory trained" },
  { icon: Coins, title: "Price match guarantee", sub: "Beat any written quote" },
  { icon: Clock, title: "Same-day service", sub: "After-hours available" },
  { icon: Star, title: "5.0-star rated", sub: "658 Google reviews" },
  { icon: Receipt, title: "No surprise fees", sub: "Upfront pricing always" },
];

export const MarqueeSection = () => {
  const items = [...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems];

  return (
    <section id="specials" className="w-full bg-theme-main py-8 border-b border-theme-secondary overflow-hidden flex items-center relative select-none">
      {/* Gradient masks for smooth fade on edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-theme-main to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-theme-main to-transparent z-10 pointer-events-none" />

      {/* Infinite marquee ticker track with Motion */}
      <div className="flex w-full overflow-hidden">
        <motion.div
          className="flex items-center gap-4 md:gap-6 shrink-0"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 60,
              ease: 'linear',
            },
          }}
        >
          {items.map((item, idx) => (
            <div 
              key={idx} 
              className="flex items-center gap-4 bg-theme-third border-none shadow-none rounded-[24px] p-4 md:px-6 min-w-[280px] md:min-w-[320px] shrink-0 hover:bg-theme-third/90 transition-colors duration-300 cursor-default"
            >
              <div className="w-12 h-12 rounded-full bg-theme-fourth/10 flex items-center justify-center shrink-0 border border-theme-fourth/20">
                <item.icon size={22} className="text-theme-fourth" />
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-subheading font-medium text-theme-main text-[15px] leading-tight mb-1">
                  {item.title}
                </span>
                <span className="font-body text-theme-main/70 text-[13px] leading-none">
                  {item.sub}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
