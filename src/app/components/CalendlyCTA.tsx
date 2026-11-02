'use client';

import type { ReactElement } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { trackCTAClick } from '@/lib/analytics';

import { BOOKING_URL as CALENDLY_URL } from '@/lib/booking';

export default function CalendlyCTA(): ReactElement {
  const { t } = useLanguage();

  return (
    <div className="hero-calendly mt-3 flex">
      <a
        href={CALENDLY_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackCTAClick('hero_calendly')}
        className="btn-text rounded-md"
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
