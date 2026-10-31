'use client';

import type { ReactElement } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/LanguageContext';

const studies = [
  {
    slug: 'retail-platform',
    translationKey: 'retail',
    image: '/images/case-studies/retail-platform.svg',
  },
  {
    slug: 'fintech-api',
    translationKey: 'fintech',
    image: '/images/case-studies/fintech-api.svg',
  },
  {
    slug: 'saas-migration',
    translationKey: 'saas',
    image: '/images/case-studies/saas-migration.svg',
  },
  {
    slug: 'healthcare-platform',
    translationKey: 'healthcare',
    image: '/images/case-studies/healthcare-platform.svg',
  },
  {
    slug: 'edtech-startup',
    translationKey: 'edtech',
    image: '/images/case-studies/edtech-startup.svg',
  },
  {
    slug: 'iot-platform',
    translationKey: 'iot',
    image: '/images/case-studies/iot-platform.svg',
  },
];

export default function CaseStudiesContent(): ReactElement {
  const { t } = useLanguage();

  return (
    <div className="wrap py-16 sm:py-24" data-reveal>
      <h1>{t('caseStudies.title')}</h1>
      <p className="mt-3 lead max-w-2xl">{t('caseStudies.subtitle')}</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" data-reveal>
        {studies.map((c) => (
          <Link
            key={c.slug}
            href={`/project-showcase/${c.slug}`}
            className="card block overflow-hidden group transition-colors hover:border-border-strong"
            aria-label={`View case study: ${t(`caseStudies.${c.translationKey}.title`)}`}
          >
            <div className="relative aspect-[3/1] border-b border-border bg-wash">
              <Image
                src={c.image}
                alt=""
                fill
                unoptimized
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
                role="presentation"
              />
            </div>
            <div className="p-5">
              <div className="mb-1 text-sm text-muted">
                {t(`caseStudies.${c.translationKey}.meta`)}
              </div>
              <h2 className="text-lg group-hover:text-accent transition-colors">
                {t(`caseStudies.${c.translationKey}.title`)}
              </h2>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-secondary">
                {t(`caseStudies.${c.translationKey}.summary`)}
              </p>
              <span
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent transition-all group-hover:gap-2"
                aria-hidden="true"
              >
                View study
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
