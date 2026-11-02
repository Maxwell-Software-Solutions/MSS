'use client';

import { useEffect } from 'react';

const PHONE_WITH_MOTION = '(max-width: 767px) and (prefers-reduced-motion: no-preference)';

/**
 * On phones that allow motion, each block of the home page's story (services to contact) rises into
 * place the first time it scrolls into view. Only blocks still below the screen are held back, and
 * nothing is hidden anywhere else, so a still screen or a failed script shows everything.
 */
export function useReveal(): void {
  useEffect(() => {
    const query = window.matchMedia?.(PHONE_WITH_MOTION);
    const main = document.querySelector('main');
    if (!query?.matches || !main || typeof IntersectionObserver !== 'function') return undefined;

    const blocks: HTMLElement[] = [];
    for (const section of Array.from(main.children)) {
      if (section.classList.contains('section')) blocks.push(...Array.from(section.querySelectorAll<HTMLElement>(':scope > .wrap > *')));
      if (section.id === 'contact') break;
    }

    const pending = new Set<HTMLElement>();
    const settle = (el: HTMLElement): void => {
      el.classList.remove('reveal-in');
      el.style.removeProperty('transition-delay');
    };
    const observer = new IntersectionObserver(
      (entries) => {
        let order = 0;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          observer.unobserve(el);
          pending.delete(el);
          el.style.transitionDelay = `${Math.min(order++, 3) * 90}ms`;
          el.classList.add('reveal-in');
          el.classList.remove('reveal-pending');
          el.addEventListener('transitionend', () => settle(el), { once: true });
        }
      },
      { rootMargin: '0px 0px -8% 0px' }
    );

    for (const el of blocks) {
      if (el.getBoundingClientRect().top < window.innerHeight) continue;
      el.classList.add('reveal-pending');
      pending.add(el);
      observer.observe(el);
    }

    const showAll = (): void => {
      observer.disconnect();
      for (const el of pending) el.classList.remove('reveal-pending');
      pending.clear();
    };
    query.addEventListener?.('change', showAll);
    return () => {
      query.removeEventListener?.('change', showAll);
      showAll();
    };
  }, []);
}
