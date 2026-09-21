import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const paragraphText =
  "Do you need HVAC services in Phoenix, Gilbert, Mesa, Peoria, Surprise or the nearby areas in Arizona? Island Breeze Air Conditioning & Heating is here to make you feel as cool and comfortable as possible inside your house when it’s hot outside. As a fireman-owned and operated HVAC company, we understand how to respond quickly to service requests from our customers. Whether you need an air conditioner installation or AC repair, we’re ready to help. Our NATE-certified technicians are trained on the newest HVAC technologies and offer those to our customers. Our goals are to provide energy-efficient products, exceptional customer care and reliable assistance when you need it most. Experience the Island Breeze difference.";

export const WelcomeSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);
  wordsRef.current = [];

  const addToWordsRef = (el: HTMLSpanElement | null) => {
    if (el && !wordsRef.current.includes(el)) {
      wordsRef.current.push(el);
    }
  };

  const words = paragraphText.split(' ');

  useEffect(() => {
    if (!containerRef.current || wordsRef.current.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.set(wordsRef.current, { opacity: 0.18, color: '#71717a' });

      gsap.to(wordsRef.current, {
        opacity: 1,
        color: '#121417',
        stagger: 0.03,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'bottom 45%',
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });

      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [words.length]);

  return (
    <section
      id="about-us"
      className="w-full max-w-[100vw] min-h-[120vh] bg-[#FFFFFF] text-[#121417] pt-0 px-0 pb-0 border-b border-zinc-200 overflow-hidden flex flex-col justify-center"
    >
      <div
        ref={containerRef}
        className="w-full bg-[#FFFFFF] rounded-none px-[20px] py-6 sm:py-10 lg:py-14 border-0 shadow-none flex flex-col justify-center gap-8 lg:gap-10 my-auto"
      >
        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-[#ECEDEF]">
          <div className="space-y-3 max-w-3xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-[#ECEDEF] text-[#121417] text-xs font-['Delight'] font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#121417]" />
              <span>Phoenix, Arizona • Firefighter-Owned & Operated</span>
            </div>
            
            <h2 className="font-['Nohemi'] font-bold text-3xl sm:text-5xl lg:text-[60px] text-[#121417] capitalize tracking-tight leading-[1.05] text-left">
              Welcome to Island Breeze AC — Your HVAC Experts in Phoenix, AZ
            </h2>
          </div>

          <div className="flex items-center gap-3 shrink-0 self-start">
            <a
              href="#estimate"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-none bg-[#121417] hover:bg-[#ECEDEF] hover:text-[#121417] text-[#FFFFFF] border border-[#121417] font-['Nohemi'] font-bold text-xs uppercase tracking-wider transition-colors"
            >
              <span>Get Estimate</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Cinematic Scroll-Driven Animated Content */}
        <div className="w-full py-4 lg:py-6 text-left">
          <p className="w-full max-w-[1200px] font-['Delight'] font-normal text-lg sm:text-2xl lg:text-3xl leading-relaxed sm:leading-[1.7] lg:leading-[1.8] tracking-normal text-zinc-400 select-none">
            {words.map((word, index) => {
              const isAccent =
                word.toLowerCase().includes('people-centric') ||
                word.toLowerCase().includes('phoenix') ||
                word.toLowerCase().includes('ny') ||
                word.toLowerCase().includes('family-like');

              return (
                <span
                  key={index}
                  ref={addToWordsRef}
                  className={`inline-block mr-[0.3em] transform-gpu will-change-[opacity,color] ${
                    isAccent ? 'font-medium' : ''
                  }`}
                >
                  {word}
                </span>
              );
            })}
          </p>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
