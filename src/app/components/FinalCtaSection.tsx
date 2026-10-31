import type { ReactElement } from 'react';
import { ButtonLink } from './ui';

export default function FinalCtaSection(): ReactElement {
  return (
    <section className="band" aria-labelledby="final-cta-heading">
      <div className="wrap band-split">
        <h2 id="final-cta-heading">Make quality your velocity advantage.</h2>
        <p>Audit first or targeted uplift—either way, we de-risk the roadmap and unlock faster, safer iteration.</p>
        <div className="band-actions">
          <ButtonLink href="/contact" variant="accent" size="lg">
            Begin assessment
          </ButtonLink>
          <ButtonLink href="/services" variant="ghost" size="lg">
            View services overview
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
