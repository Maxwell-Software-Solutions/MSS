'use client';
import type { ReactElement } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import CTA from '@/app/components/ui/CTA';
import RealAiWork from '@/app/components/RealAiWork';

export default function CaseStudiesPage(): ReactElement {
  const { t } = useLanguage();

  return (
    <>
      <header className="wrap page-head">
        <div className="eyebrow">{t('nav.caseStudies')}</div>
        <h1>{t('realWork.heading')}</h1>
        <p className="lead">
          <span className="copy-long">{t('realWork.lead')}</span>
          <span className="copy-short">{t('realWork.lead.short')}</span>
        </p>
      </header>

      <RealAiWork variant="page" />

      <CTA
        title={t('finalCta.heading')}
        body={t('finalCta.body')}
        primary={{ href: '/contact', label: t('finalCta.primary') }}
        secondary={{ href: '/services', label: t('finalCta.secondary') }}
      />
    </>
  );
}
