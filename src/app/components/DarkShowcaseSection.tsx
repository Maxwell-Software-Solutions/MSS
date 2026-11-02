'use client';

import type { ReactElement } from 'react';
import { useLanguage } from '@/lib/LanguageContext';

/** AI agents: what they do, and how people stay in control of them. */
export default function DarkShowcaseSection(): ReactElement {
  const { t } = useLanguage();

  return (
    <section className="section section-tone" aria-labelledby="showcase-heading">
      <div className="wrap">
        <div className="section-head section-head-split">
          <h2 id="showcase-heading">{t('showcase.heading')}</h2>
          <p className="lead">
            <span className="copy-long">{t('showcase.description')}</span>
            <span className="copy-short">{t('showcase.description.short')}</span>
          </p>
        </div>
        <div className="columns columns-3 home-points">
          {['connected', 'control', 'measured'].map((key) => (
            <div key={key} className="item">
              <h3>{t(`showcase.${key}.title`)}</h3>
              <p>{t(`showcase.${key}.body`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
