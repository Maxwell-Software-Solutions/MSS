import type { ReactElement } from 'react';
import { ButtonLink } from './ui';

export default function FinalCtaSection(): ReactElement {
  return (
    <section className="border-t border-border" aria-labelledby="final-cta-heading">
      <div className="max-w-6xl mx-auto px-6 py-16 sm:px-10 sm:py-24" data-reveal>
        <div className="band px-8 py-12 sm:px-12 sm:py-16 md:flex md:items-end md:justify-between md:gap-12">
          <div className="max-w-2xl">
            <h2 id="final-cta-heading" className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Make quality your velocity advantage.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-secondary">
              Audit first or targeted uplift—either way, we de-risk the roadmap and unlock faster, safer iteration.
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row md:mt-0 md:shrink-0">
            <ButtonLink href="/contact" variant="accent" size="md">
              Begin assessment
            </ButtonLink>
            <ButtonLink href="/services" variant="ghost" size="md">
              View services overview
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
