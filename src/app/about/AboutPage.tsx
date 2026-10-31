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
        <div className="eyebrow">Our Story</div>
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
            <div className="eyebrow">The Team</div>
            <h2 id="founders-heading">{t('about.founders.heading')}</h2>
            <p className="lead">{t('about.founders.description')}</p>
          </div>

          <div className="columns columns-3">
            {founders.map((f) => {
              const firstName = f.name.split(' ')[0]?.toLowerCase() || 'founder';
              const imageExtension =
                firstName === 'maxwell' || firstName === 'marek' || firstName === 'petras' ? 'jpg' : 'svg';
              const imageSrc = `/images/founders/${firstName}.${imageExtension}`;
              const founderKey = firstName;

              return (
                <div key={f.name} className="person">
                  <div className={`person-photo person-photo-${firstName}`}>
                    <Image
                      src={imageSrc}
                      alt={f.alt}
                      fill
                      sizes="(min-width: 768px) 33vw, 40vw"
                      className="object-cover"
                    />
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
