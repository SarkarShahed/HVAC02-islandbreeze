import React, { useEffect, useRef } from 'react';
import HvacPricingEstimator from './HvacPricingEstimator';
import { Phone, CalendarDays } from 'lucide-react';
import { motion } from 'motion/react';
import gsap from 'gsap';

interface CounterItemProps {
  endVal: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  useComma?: boolean;
  label: string;
  delay?: number;
}

const CounterItem: React.FC<CounterItemProps> = ({
  endVal,
  suffix = '',
  prefix = '',
  decimals = 0,
  useComma = false,
  label,
  delay = 0.2,
}) => {
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const obj = { val: 0 };
    if (!numRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: endVal,
        duration: 2.5,
        ease: 'expo.out',
        delay: delay,
        onUpdate: () => {
          if (!numRef.current) return;
          let formatted = obj.val.toFixed(decimals);
          if (useComma) {
            const parts = formatted.split('.');
            parts[0] = parseInt(parts[0], 10).toLocaleString('en-US');
            formatted = parts.join('.');
          }
          numRef.current.textContent = `${prefix}${formatted}${suffix}`;
        },
      });
    }, numRef);

    return () => ctx.revert();
  }, [endVal, suffix, prefix, decimals, useComma, delay]);

  return (
    <div className="flex flex-col">
      <span ref={numRef} className="font-nohemi font-bold text-xl sm:text-2xl text-white tracking-tight">
        {prefix}0{suffix}
      </span>
      <span className="text-[10px] sm:text-[11px] font-subheading uppercase tracking-wider text-white/70 mt-1 whitespace-nowrap">
        {label}
      </span>
    </div>
  );
};

export const HeroSlider: React.FC = () => {
  return (
    <section
      id="hero-section"
      className="relative w-full max-w-[100vw] min-h-screen bg-[#121417] px-2.5 sm:px-5 lg:px-6 pt-[100px] sm:pt-[110px] lg:pt-[120px] pb-[50px] flex flex-col justify-between overflow-x-hidden border-0 outline-none"
    >
      {/* Immersive Background with Subtle Zoom Entrance */}
      <div className="absolute inset-0 z-0 overflow-hidden border-0 outline-none">
        <div className="absolute inset-0 bg-black/55 z-10" />
        <motion.img
          initial={{ scale: 1.06, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          src="/Mechanic_carrying_tool_kit_standing_2K_20260920233538.jpeg"
          alt="Island Breeze AC expert carrying professional tool kit"
          className="w-full h-full object-cover object-[70%_center] sm:object-center select-none pointer-events-none border-0 outline-none"
          referrerPolicy="no-referrer"
          loading="eager"
          decoding="async"
        />
      </div>

      {/* BOTTOM ROW: Split Grid Layout */}
      <div className="relative z-20 w-full mt-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start justify-items-stretch lg:justify-items-start lg:items-end pb-2 sm:pb-4 lg:pb-6">
        
        {/* Left Column: Headline, Discover Action, & GSAP Animated Counters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col items-start text-left space-y-4 lg:space-y-5 w-full"
        >
          <div className="space-y-2.5 w-full">
            <p className="text-[11px] sm:text-xs font-subheading uppercase tracking-[0.22em] text-[#FE552F] font-bold">
              Island Breeze will put your mind at ease
            </p>
            <h1 className="font-nohemi font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[54px] text-white leading-[1.1] tracking-tight capitalize">
              Save up to $2,000 off<br />a new AC Unit
            </h1>
            <p className="text-sm sm:text-base font-body text-white/90 mt-2 max-w-lg">
              Summer is coming — Get a Free Quote Now!
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3.5 w-full">
            <a
              href="#estimator-pricing-anchor"
              className="bg-[#ECEDEF] text-[#121417] hover:bg-white hover:text-[#121417] pl-6 pr-2 py-2 rounded-none text-xs font-nohemi font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-md active:scale-98 flex items-center justify-between sm:justify-start gap-3"
            >
              <span>Get Free Quote</span>
              <span className="w-7 h-7 rounded-none bg-[#121417] text-white flex items-center justify-center shrink-0">
                <CalendarDays className="w-3.5 h-3.5" />
              </span>
            </a>

            <a
              href="tel:6233353958"
              className="bg-transparent text-white hover:bg-white/10 border border-white/20 pl-6 pr-2 py-2 rounded-none text-xs font-nohemi font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer active:scale-98 flex items-center justify-between sm:justify-start gap-3"
            >
              <span>Call (623) 335-3958</span>
              <span className="w-7 h-7 rounded-none bg-white text-[#121417] flex items-center justify-center shrink-0">
                <Phone className="w-3.5 h-3.5" />
              </span>
            </a>
          </div>

          {/* GSAP Clean Number Counter */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 pt-3 border-t border-white/15 w-full lg:max-w-[480px] mt-1 sm:mt-2">
            <CounterItem endVal={658} useComma suffix="+" label="Google reviews" delay={0.1} />
            <CounterItem endVal={5.0} decimals={1} suffix="★" label="Avg. rating" delay={0.2} />
            <CounterItem endVal={1} suffix=" Day" label="Response" delay={0.3} />
            <CounterItem endVal={15} suffix="+" label="Years serving Phoenix" delay={0.4} />
          </div>
        </motion.div>

        {/* Right Column: Dynamic Hvac Pricing Estimator Card - placed at the bottom */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.0, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 w-full max-w-full lg:max-w-md ml-0 lg:ml-auto relative self-end mt-auto translate-y-0 mb-0"
        >
          <HvacPricingEstimator />
        </motion.div>

      </div>
    </section>
  );
};

