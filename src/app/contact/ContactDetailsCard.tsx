import type { ReactElement } from 'react';

import { CONTACT_EMAIL, CONTACT_EMAIL_MAILTO, CONTACT_PHONE, CONTACT_PHONE_TEL } from './contact.constants';
import { NeuroCard } from '@/app/components/ui';

export default function ContactDetailsCard(): ReactElement {
  return (
    <NeuroCard as="aside">
      <h2 className="text-xl">Prefer a direct line?</h2>
      <p className="mt-3 text-[0.9375rem] leading-relaxed text-secondary">
        Our team monitors messages around the clock. Drop us a note with your preferred contact method and the right
        specialist will be in touch.
      </p>

      <div className="mt-8 space-y-6 border-t border-border pt-6 text-sm">
        <div>
          <span className="text-sm text-muted">Phone</span>
          <a
            className="mt-1 block text-base font-medium text-foreground transition hover:text-accent"
            href={CONTACT_PHONE_TEL}
          >
            {CONTACT_PHONE}
          </a>
        </div>

        <div>
          <span className="text-sm text-muted">Email</span>
          <a
            className="mt-1 block break-words text-base font-medium text-foreground transition hover:text-accent"
            href={CONTACT_EMAIL_MAILTO}
          >
            {CONTACT_EMAIL}
          </a>
        </div>

        <div>
          <span className="text-sm text-muted">Hours</span>
          <p className="mt-1 text-base text-foreground">Monday – Friday, 8am – 6pm CT</p>
        </div>
      </div>
    </NeuroCard>
  );
}
