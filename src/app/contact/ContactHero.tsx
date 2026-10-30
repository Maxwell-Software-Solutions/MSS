'use client';
import type { ReactElement } from 'react';
import { useLanguage } from '@/lib/LanguageContext';

export default function ContactHero(): ReactElement {
  const { t } = useLanguage();

  return (
    <>
      <p className="eyebrow">{t('contactPage.eyebrow')}</p>
      <h1 className="mt-3 max-w-3xl">{t('contactPage.title')}</h1>
      <p className="lead mt-5 max-w-2xl">{t('contactPage.subtitle')}</p>
    </>
  );
}
