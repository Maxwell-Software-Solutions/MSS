'use client';
import type { ReactElement } from 'react';
import { useLanguage } from '@/lib/LanguageContext';

export default function ContactHero(): ReactElement {
  const { t } = useLanguage();

  return (
    <>
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-700 dark:text-slate-300">
        {t('contactPage.eyebrow')}
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
        {t('contactPage.title')}
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300">
        {t('contactPage.subtitle')}
      </p>
    </>
  );
}
