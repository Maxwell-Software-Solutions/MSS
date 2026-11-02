'use client';

import type { ReactElement } from 'react';
import { ButtonLink } from './ui';
import { useLanguage } from '@/lib/LanguageContext';

export default function FinalCtaSection(): ReactElement {
  const { t } = useLanguage();

  return (
    <section className="band" aria-labelledby="final-cta-heading">
      <div className="wrap band-split">
        <h2 id="final-cta-heading">{t('finalCta.heading')}</h2>
        <p>{t('finalCta.body')}</p>
        <div className="band-actions">
          <ButtonLink href="/contact" variant="accent" size="lg">
            {t('finalCta.primary')}
          </ButtonLink>
          <ButtonLink href="/services" variant="ghost" size="lg">
            {t('finalCta.secondary')}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
