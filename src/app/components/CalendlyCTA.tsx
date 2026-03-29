'use client';

import type { ReactElement } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { trackCTAClick } from '@/lib/analytics';

const CALENDLY_URL = 'https://calendly.com/maxwellsoftwaresolutions/discovery';

export default function CalendlyCTA(): ReactElement {
  const { t } = useLanguage();

  return (
    <div className="mt-5 sm:mt-6 flex justify-center px-4">
      <a
        href={CALENDLY_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackCTAClick('hero_calendly')}
        className="inline-flex items-center gap-2.5 rounded-xl border-2 border-accent bg-accent/10 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold text-accent shadow-soft transition-all duration-200 hover:bg-accent hover:text-background hover:shadow-[0_0_24px_rgba(var(--accent-rgb),0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 min-h-[48px]"
        aria-label={t('hero.calendly.aria')}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="shrink-0"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        {t('hero.calendly.cta')}
      </a>
    </div>
  );
}
