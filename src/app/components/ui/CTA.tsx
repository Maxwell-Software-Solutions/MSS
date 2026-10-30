import type { ReactElement } from 'react';
import { ButtonLink } from './ButtonLink';

interface CTAProps {
  title: string;
  body: string;
  primary: { href: string; label: string; ariaLabel?: string };
  secondary?: { href: string; label: string; ariaLabel?: string };
}

export function CTA({ title, body, primary, secondary }: CTAProps): ReactElement {
  return (
    <section className="mt-16">
      <div className="band px-8 py-12 sm:px-12 sm:py-14 lg:flex lg:items-end lg:justify-between lg:gap-12">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
          <p className="mt-4 text-lg leading-relaxed text-secondary">{body}</p>
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:shrink-0">
          <ButtonLink href={primary.href} variant="accent" size="lg" aria-label={primary.ariaLabel || primary.label}>
            {primary.label}
          </ButtonLink>
          {secondary && (
            <ButtonLink
              href={secondary.href}
              variant="ghost"
              size="lg"
              aria-label={secondary.ariaLabel || secondary.label}
            >
              {secondary.label}
            </ButtonLink>
          )}
        </div>
      </div>
    </section>
  );
}

export default CTA;
