import type { ReactElement } from 'react';
import { ButtonLink } from './ui';

export default function FinalCtaSection(): ReactElement {
  return (
    <section
      className="px-6 sm:px-10 py-24 neuro-section-border bg-gradient-to-b from-background to-background/50"
      aria-labelledby="final-cta-heading"
    >
      <div className="max-w-5xl mx-auto text-center" data-reveal>
        <h2 id="final-cta-heading" className="text-3xl sm:text-5xl font-semibold tracking-tight">
          Make quality your velocity advantage.
        </h2>
        <p className="mt-6 text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
          Audit first or targeted uplift—either way, we de-risk the roadmap and unlock faster, safer iteration.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <ButtonLink href="/contact" variant="accent" size="md">
            Begin assessment
          </ButtonLink>
          <ButtonLink href="/services" variant="ghost" size="md">
            View services overview
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
