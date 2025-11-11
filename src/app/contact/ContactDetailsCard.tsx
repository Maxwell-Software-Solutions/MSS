import type { ReactElement } from 'react';

import { CONTACT_EMAIL, CONTACT_EMAIL_MAILTO, CONTACT_PHONE, CONTACT_PHONE_TEL } from './contact.constants';

export default function ContactDetailsCard(): ReactElement {
  return (
    <aside className="relative overflow-hidden rounded-3xl border bg-card/95 p-8 shadow-soft backdrop-blur-xl neuro-card">
      <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,var(--accent)_0%,rgba(139,107,0,0.35)_100%)]" />
      <h2 className="text-lg font-semibold text-foreground">Prefer a direct line?</h2>
      <p className="mt-3 text-sm leading-relaxed text-foreground/70">
        Our team monitors messages around the clock. Drop us a note with your preferred contact method and the right
        specialist will be in touch.
      </p>

      <div className="mt-8 space-y-6 text-sm">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[color:var(--accent)]">
            Phone
          </span>
          <a
            className="mt-2 block text-base font-medium text-foreground transition hover:text-[color:var(--accent)]"
            href={CONTACT_PHONE_TEL}
          >
            {CONTACT_PHONE}
          </a>
        </div>

        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[color:var(--accent)]">
            Email
          </span>
          <a
            className="mt-2 block break-words text-sm font-medium text-foreground transition hover:text-[color:var(--accent)] sm:text-base"
            href={CONTACT_EMAIL_MAILTO}
          >
            {CONTACT_EMAIL}
          </a>
        </div>

        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[color:var(--accent)]">
            Hours
          </span>
          <p className="mt-2 text-base text-foreground/70">Monday – Friday, 8am – 6pm CT</p>
        </div>
      </div>
    </aside>
  );
}
