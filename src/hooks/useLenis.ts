import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '../lib/gsap';

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // Use completely native mobile momentum scroll on touch devices to avoid layout fights/snap loops
    if (isTouch) {
      return;
    }

    // Initialize Lenis ONLY on non-touch (desktop) devices for premium smooth scrolling
    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.1,
      syncTouch: false,
    });

    lenisRef.current = lenis;
    (window as unknown as { lenisInstance?: Lenis }).lenisInstance = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    // High performance RAF ticker integration with GSAP
    const updateRaf = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateRaf);
    gsap.ticker.lagSmoothing(0); // Prevents frame drops and jitter during inertia scrolling

    return () => {
      gsap.ticker.remove(updateRaf);
      lenis.destroy();
      lenisRef.current = null;
      delete (window as unknown as { lenisInstance?: Lenis }).lenisInstance;
    };
  }, []);

  return lenisRef;
}
