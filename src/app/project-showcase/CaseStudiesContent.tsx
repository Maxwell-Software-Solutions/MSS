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
];

export default function CaseStudiesContent(): ReactElement {
  const { t } = useLanguage();

  return (
    <div className="container section" data-reveal>
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{t('caseStudies.title')}</h1>
      <p className="mt-3 lead max-w-2xl">{t('caseStudies.subtitle')}</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" data-reveal>
        {studies.map((c) => (
          <Link
            key={c.slug}
            href={`/project-showcase/${c.slug}`}
            className="card shadow-soft block overflow-hidden group transition-all hover:border-accent/80 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            aria-label={`View case study: ${t(`caseStudies.${c.translationKey}.title`)}`}
          >
            <div className="relative h-36 bg-background/80">
              <Image
                src={c.image}
                alt=""
                fill
                unoptimized
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover group-hover:scale-[1.02] transition-transform"
                role="presentation"
              />
            </div>
            <div className="p-5">
              <div className="text-xs text-foreground/70 mb-1 font-medium uppercase tracking-wider">
                {t(`caseStudies.${c.translationKey}.meta`)}
              </div>
              <h2 className="text-lg font-semibold group-hover:text-accent transition-colors">
                {t(`caseStudies.${c.translationKey}.title`)}
              </h2>
              <p className="mt-2 text-sm text-foreground/85 leading-relaxed">
                {t(`caseStudies.${c.translationKey}.summary`)}
              </p>
              <span
                className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-accent group-hover:gap-2 transition-all"
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
