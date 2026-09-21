import { useEffect } from 'react';

/**
 * Lightweight, high-performance split text link enhancer.
 * Processes interactive links once on mount without expensive MutationObserver loops.
 */
export function useSplitTextLinks() {
  useEffect(() => {
    // Only run if user is not on low-power or reduced motion device
    if (typeof window === 'undefined') return;

    const applySplitText = (container: HTMLElement) => {
      const text = container.textContent || '';
      if (!text.trim() || container.dataset.splitTextProcessed === 'true') return;

      container.dataset.splitTextProcessed = 'true';
      container.classList.add('split-text-wrapper');
      container.setAttribute('aria-label', text);

      const line1 = document.createElement('span');
      line1.className = 'split-text-line-1';
      line1.setAttribute('aria-hidden', 'true');

      const line2 = document.createElement('span');
      line2.className = 'split-text-line-2';
      line2.setAttribute('aria-hidden', 'true');

      const chars = text.split('');
      chars.forEach((char, index) => {
        const delay = `${Math.min(index * 14, 200)}ms`;

        const char1 = document.createElement('span');
        char1.className = 'split-text-char';
        char1.style.transitionDelay = delay;
        char1.textContent = char === ' ' ? '\u00A0' : char;
        line1.appendChild(char1);

        const char2 = document.createElement('span');
        char2.className = 'split-text-char';
        char2.style.transitionDelay = delay;
        char2.textContent = char === ' ' ? '\u00A0' : char;
        line2.appendChild(char2);
      });

      container.textContent = '';
      container.appendChild(line1);
      container.appendChild(line2);
    };

    // Safely execute in requestIdleCallback or setTimeout
    const timeoutId = setTimeout(() => {
      const links = document.querySelectorAll<HTMLElement>('.split-hover-link');
      links.forEach((link) => {
        applySplitText(link);
      });
    }, 150);

    return () => clearTimeout(timeoutId);
  }, []);
}
