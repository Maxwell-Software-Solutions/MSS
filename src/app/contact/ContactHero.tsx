'use client';
import type { ReactElement } from 'react';
import { useLanguage } from '@/lib/LanguageContext';

export default function ContactHero(): ReactElement {
  const { t } = useLanguage();

  return (
    <>
      <p className="text-xs font-semibold uppercase tracking-[0.35em]" style={{ color: 'var(--color-text)' }}>
        {t('contactPage.eyebrow')}
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl" style={{ color: 'var(--color-text)' }}>
        {t('contactPage.title')}
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
        {t('contactPage.subtitle')}
      </p>
    </>
  );
}
