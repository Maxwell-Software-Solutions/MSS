'use client';
import type { ReactElement } from 'react';
import Image from 'next/image';
import { founders } from './founders-data';
import { useLanguage } from '@/lib/LanguageContext';
import { CheckIcon } from '@/app/components/ui';

export default function AboutPage(): ReactElement {
  const { t } = useLanguage();

  return (
    <>
      <header className="wrap page-head">
        <div className="eyebrow">{t('about.eyebrow')}</div>
        <h1>{t('about.title')}</h1>
        <p className="lead">{t('about.intro')}</p>
        <p>{t('about.description')}</p>
      </header>

      <section className="section" aria-labelledby="principles-heading">
        <div className="wrap split">
          <h2 id="principles-heading">{t('about.principles.heading')}</h2>
          <ul className="checks rows">
            <li>
              <CheckIcon />
              <div>
                <strong className="font-medium text-foreground">{t('about.principles.correctness.title')}</strong>
                <span> {t('about.principles.correctness.body')}</span>
              </div>
            </li>
            <li>
              <CheckIcon />
              <div>
                <strong className="font-medium text-foreground">{t('about.principles.observability.title')}</strong>
                <span> {t('about.principles.observability.body')}</span>
              </div>
            </li>
            <li>
              <CheckIcon />
              <div>
                <strong className="font-medium text-foreground">{t('about.principles.automation.title')}</strong>
                <span> {t('about.principles.automation.body')}</span>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section className="section section-tone" aria-labelledby="founders-heading">
        <div className="wrap">
          <div className="section-head section-head-split">
            <div className="eyebrow">{t('about.team.eyebrow')}</div>
            <h2 id="founders-heading">{t('about.founders.heading')}</h2>
            <p className="lead">{t('about.founders.description')}</p>
          </div>

          <div className="columns columns-3">
            {founders.map((f) => {
              const firstName = f.name.split(' ')[0]?.toLowerCase() || 'founder';
              const initials = f.name
                .split(' ')
                .map((word) => word.charAt(0))
                .join('');
              const founderKey = firstName;

              return (
                <div key={f.name} className="person">
                  <div className={`person-photo person-photo-${firstName}`}>
                    {f.photo ? (
                      <Image
                        src={f.photo}
                        alt={f.alt}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 40vw"
                        className="object-cover"
                      />
                    ) : (
                      <span className="person-monogram" aria-hidden="true">
                        {initials}
                      </span>
                    )}
                  </div>
                  <div>
                    <h3>{t(`about.founder.${founderKey}.name`)}</h3>
                    <p className="person-role">{t(`about.founder.${founderKey}.role`)}</p>
                    <p className="person-bio">{t(`about.founder.${founderKey}.bio`)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
