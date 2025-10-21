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

export default function CaseStudiesIndex(): ReactElement {
  const { t } = useLanguage();
  
  return (
    <div className="container section" data-reveal>
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{t('caseStudies.title')}</h1>
      <p className="mt-3 lead max-w-2xl">
        {t('caseStudies.subtitle')}
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" data-reveal>
        {studies.map((c) => (
          <Link
            key={c.slug}
            href={`/project-showcase/${c.slug}`}
            className="card shadow-soft block overflow-hidden group"
          >
            <div className="relative h-36">
              <Image
                src={c.image}
                alt={t(`caseStudies.${c.translationKey}.title`)}
                fill
                unoptimized
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover group-hover:scale-[1.02] transition-transform"
              />
            </div>
            <div className="p-5">
              <div className="text-xs text-foreground/60 mb-1">{t(`caseStudies.${c.translationKey}.meta`)}</div>
              <h2 className="text-lg font-semibold group-hover:text-accent transition-colors">
                {t(`caseStudies.${c.translationKey}.title`)}
              </h2>
              <p className="mt-2 text-sm text-foreground/80">{t(`caseStudies.${c.translationKey}.summary`)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
