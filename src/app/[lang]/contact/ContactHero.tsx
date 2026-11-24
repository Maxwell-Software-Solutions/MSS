'use client';
import type { ReactElement } from 'react';
import { useLanguage } from '@/lib/LanguageContext';

export default function ContactHero(): ReactElement {
  const { t } = useLanguage();

  return (
    <>
      <p className="eyebrow">{t('contactPage.eyebrow')}</p>
      <h1>{t('contactPage.title')}</h1>
      <p className="lead">{t('contactPage.subtitle')}</p>
    </>
  );
}
