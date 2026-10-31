import type { ReactElement } from 'react';
import { ButtonLink } from './ButtonLink';

interface CTAProps {
  title: string;
  body: string;
  primary: { href: string; label: string; ariaLabel?: string };
  secondary?: { href: string; label: string; ariaLabel?: string };
}

/** The closing call to action of a page: full width, near-black, the counterpart of the hero. */
export function CTA({ title, body, primary, secondary }: CTAProps): ReactElement {
  return (
    <section className="band">
      <div className="wrap band-split">
        <h2>{title}</h2>
        <p>{body}</p>
        <div className="band-actions">
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
