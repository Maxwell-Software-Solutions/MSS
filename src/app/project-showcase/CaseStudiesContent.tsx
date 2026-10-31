'use client';

import type { ReactElement } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/LanguageContext';
import { LineIcon } from '@/app/components/ui';

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
    <>
      <header className="wrap page-head">
        <h1>{t('caseStudies.title')}</h1>
        <p className="lead">{t('caseStudies.subtitle')}</p>
      </header>

      <div className="section">
        <div className="wrap columns columns-3">
          {studies.map((c) => (
            <Link
              key={c.slug}
              href={`/project-showcase/${c.slug}`}
              className="work"
              aria-label={`View case study: ${t(`caseStudies.${c.translationKey}.title`)}`}
            >
              <div className="art">
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
              <div className="work-meta">{t(`caseStudies.${c.translationKey}.meta`)}</div>
              <h2>{t(`caseStudies.${c.translationKey}.title`)}</h2>
              <p>{t(`caseStudies.${c.translationKey}.summary`)}</p>
              <span className="more" aria-hidden="true">
                View study
                <LineIcon name="arrow" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
