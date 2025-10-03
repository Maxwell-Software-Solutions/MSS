'use client';

import { useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollEffects(): null {
  const pathname = usePathname();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const rafIdRef = useRef<number>(0);
  const lastScrollY = useRef<number>(0);
  const ticking = useRef<boolean>(false);

  const updateParallax = useCallback(() => {
    // Use more efficient querySelector and reduce DOM queries
    const parallaxEls = document.querySelectorAll<HTMLElement>('[data-parallax]');
    const viewportH = window.innerHeight || document.documentElement.clientHeight;

    for (let i = 0; i < parallaxEls.length; i++) {
      const el = parallaxEls[i];
      if (!el) continue;
      const speedAttr = el.getAttribute('data-parallax');
      const speed = speedAttr ? Number(speedAttr) : 0.15;
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const delta = center - viewportH / 2;
      const maxShift = 24;
      const y = Math.max(-maxShift, Math.min(maxShift, ((-delta * speed) / viewportH) * 2 * maxShift));
      el.style.setProperty('--y', `${y.toFixed(2)}px`);
    }

    ticking.current = false;
  }, []);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    lastScrollY.current = scrollY;

    if (!ticking.current) {
      ticking.current = true;
      rafIdRef.current = window.requestAnimationFrame(() => updateParallax());
    }
  }, [updateParallax]);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Clean up previous effects
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
    }

    // Wait for DOM to be ready
    const initEffects = (): void => {
      // Reveal on intersect
      const revealEls = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          }
        },
        { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
      );

      revealEls.forEach((el) => observer.observe(el));
      observerRef.current = observer;

      if (reduceMotion) {
        return;
      }

      // Use passive scroll listener for better performance
      window.addEventListener('scroll', handleScroll, { passive: true });
    };

    // Small delay to ensure DOM is ready after navigation
    const timeoutId = setTimeout(initEffects, 100);

    return () => {
      clearTimeout(timeoutId);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname, handleScroll]); // Re-run when pathname changes

  return null;
}
