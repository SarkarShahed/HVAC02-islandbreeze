import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Step {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
}

const steps: Step[] = [
  {
    id: 'step-1',
    number: '01',
    title: 'Call or book online',
    description:
      'Our local dispatch line and online scheduling are available 24/7. After-hours line is always open to confirm your appointment immediately.',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=800&q=80',
    tags: ['After-Hours Open', 'Online Booking', 'Instant Confirmation'],
  },
  {
    id: 'step-2',
    number: '02',
    title: 'NATE-certified tech arrives',
    description:
      'Our licensed, background-checked technician arrives on time, fully uniformed, and equipped to diagnose any heating or cooling challenge.',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
    tags: ['NATE Certified', 'Uniformed Technicians', 'On-Time Arrival'],
  },
  {
    id: 'step-3',
    number: '03',
    title: 'Fixed with upfront pricing',
    description:
      'We diagnose the issue and explain your options with flat-rate quotes. You approve the cost before any repairs begin — no surprise invoices.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    tags: ['Upfront Pricing', 'Approval First', 'Zero Surprise Invoices'],
  },
];

export const HowItWorksSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Auto-advance loop every 5 seconds
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section
      id="how-it-works"
      className="w-full max-w-[100vw] min-h-auto lg:min-h-[850px] py-12 sm:py-16 lg:py-[60px] px-4 sm:px-6 lg:px-[20px] bg-white flex flex-col justify-center items-center font-['Rinter'] border-0"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10 max-w-2xl px-2">
          <h2 className="text-[28px] sm:text-[38px] lg:text-[48px] font-bold capitalize tracking-tight text-[#121417] font-['SF_Pro'] mb-2 leading-tight">
            How It Works
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-500 font-medium">
            No surprise invoices. No upselling. Just honest HVAC service.
          </p>
        </div>

        {/* 3-Column Layout Container with Auto-slider */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="w-full bg-[#FBFBFC] rounded-2xl md:rounded-none border border-gray-100 md:border-0 overflow-hidden shadow-sm relative group"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200/70 items-stretch">
            {steps.map((step, index) => {
              const isActive = activeStep === index;

              return (
                <div
                  key={step.id}
                  onClick={() => setActiveStep(index)}
                  className={`relative p-6 sm:p-8 lg:p-10 transition-all duration-500 cursor-pointer flex flex-col justify-between border-0 rounded-none min-h-auto md:min-h-[640px] lg:min-h-[690px] ${
                    isActive
                      ? 'bg-[#2934ce] text-white shadow-xl border-l-0 z-10'
                      : 'hover:bg-gray-100/60 bg-[#FBFBFC] text-[#121417]'
                  }`}
                >
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      {/* Step Number */}
                      <span
                        className={`text-4xl sm:text-5xl font-light block mb-5 font-['SF_Pro'] transition-colors duration-500 ${
                          isActive ? 'text-white/60 font-normal' : 'text-gray-300'
                        }`}
                      >
                        {step.number}
                      </span>

                      {/* Step Title */}
                      <h3
                        className={`text-xl sm:text-2xl font-medium tracking-tight mb-4 font-['SF_Pro'] transition-colors duration-500 ${
                          isActive ? 'text-white font-bold' : 'text-[#121417] hover:text-black'
                        }`}
                      >
                        {step.title}
                      </h3>

                      {/* Active Expanded Content with Ultra-Smooth Ease */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="space-y-5 overflow-hidden"
                          >
                            <p className="text-sm sm:text-base text-white/90 leading-relaxed font-normal pt-1">
                              {step.description}
                            </p>

                            {/* Image Card with increased height */}
                            <div className="relative w-full h-52 sm:h-60 md:h-64 rounded-none overflow-hidden border-0 shadow-inner group">
                              <img
                                src={step.image}
                                alt={step.title}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#2934ce]/60 via-transparent to-transparent opacity-80" />
                            </div>

                            {/* Bullet Tags */}
                            <div className="pt-2 text-xs text-white/80 font-medium tracking-wide flex flex-wrap items-center gap-1.5">
                              {step.tags.join(' • ')}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
