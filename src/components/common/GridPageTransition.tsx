import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const GridPageTransition: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const colsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  // 12 Columns Array
  const columns = Array.from({ length: 12 });

  useEffect(() => {
    // Custom Event Listener for dynamic route / page transitions
    const handleTriggerTransition = (e: Event) => {
      const customEvent = e as CustomEvent;
      const onCompleteCallback = customEvent.detail?.onComplete;

      setIsAnimating(true);
      if (containerRef.current) {
        containerRef.current.style.display = 'block';
        containerRef.current.style.pointerEvents = 'all';
      }

      const cols = colsRef.current.filter(Boolean);
      if (cols.length === 0) {
        if (onCompleteCallback) onCompleteCallback();
        setIsAnimating(false);
        return;
      }

      const tl = gsap.timeline();

      // Wipe 12 columns down smoothly
      tl.set(cols, { transformOrigin: 'bottom', scaleY: 0 })
        .to(cols, {
          scaleY: 1,
          stagger: {
            amount: 0.25,
            from: 'edges',
            ease: 'sine.inOut',
          },
          duration: 0.55,
          ease: 'power3.inOut',
          force3D: true,
        })
        .add(() => {
          if (onCompleteCallback) onCompleteCallback();
        })
        .set(cols, { transformOrigin: 'top' })
        .to(cols, {
          scaleY: 0,
          stagger: {
            amount: 0.25,
            from: 'center',
            ease: 'sine.inOut',
          },
          duration: 0.6,
          ease: 'power3.inOut',
          force3D: true,
        })
        .add(() => {
          setIsAnimating(false);
          if (containerRef.current) {
            containerRef.current.style.pointerEvents = 'none';
            containerRef.current.style.display = 'none';
          }
        });
    };

    window.addEventListener('trigger-12grid-transition', handleTriggerTransition);

    // Global interceptor for inner links to trigger the 12-grid sweep smoothly
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        // Prevent default harsh jump and do smooth 12-grid transition sweep
        e.preventDefault();
        const element = document.querySelector(href);
        
        window.dispatchEvent(
          new CustomEvent('trigger-12grid-transition', {
            detail: {
              onComplete: () => {
                if (element) {
                  const lenis = (window as unknown as { lenisInstance?: any }).lenisInstance;
                  if (lenis) {
                    lenis.scrollTo(element as HTMLElement, { offset: -40, immediate: true });
                  } else {
                    element.scrollIntoView({ behavior: 'auto' });
                  }
                }
              },
            },
          })
        );
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      window.removeEventListener('trigger-12grid-transition', handleTriggerTransition);
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ display: isAnimating ? 'block' : 'none' }}
      className={`fixed inset-0 z-[99999] pointer-events-none overflow-hidden ${
        isAnimating ? 'pointer-events-auto' : 'hidden'
      }`}
      aria-hidden={!isAnimating}
    >
      {/* 12 Columns Grid overlay in Color #2934CE */}
      <div className="w-full h-full grid grid-cols-12 gap-0 relative">
        {columns.map((_, idx) => (
          <div
            key={idx}
            ref={(el) => {
              colsRef.current[idx] = el;
            }}
            className="h-full bg-[#2934ce] transform-gpu scale-y-0 origin-top"
            style={{
              willChange: 'transform',
            }}
          />
        ))}
      </div>
    </div>
  );
};
