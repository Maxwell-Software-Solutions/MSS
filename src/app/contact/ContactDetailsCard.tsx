import type { ReactElement } from 'react';

import { CONTACT_EMAIL, CONTACT_EMAIL_MAILTO, CONTACT_PHONE, CONTACT_PHONE_TEL } from './contact.constants';

export default function ContactDetailsCard(): ReactElement {
  return (
    <aside className="relative overflow-hidden rounded-3xl border border-black/5 bg-white/60 p-8 shadow-soft backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/60">
      <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,var(--accent)_0%,rgba(139,107,0,0.35)_100%)]" />
      <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Prefer a direct line?</h2>
      <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        Our team monitors messages around the clock. Drop us a note with your preferred contact method and the right
        specialist will be in touch.
      </p>

      <div className="mt-8 space-y-6 text-sm">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[color:var(--accent)]">
            Phone
          </span>
          <a
            className="mt-2 block text-base font-medium text-slate-900 transition hover:text-[color:var(--accent)] dark:text-slate-100"
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
            className="mt-2 block break-words text-sm font-medium text-slate-900 transition hover:text-[color:var(--accent)] dark:text-slate-100 sm:text-base"
            href={CONTACT_EMAIL_MAILTO}
          >
            {CONTACT_EMAIL}
          </a>
        </div>

        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[color:var(--accent)]">
            Hours
          </span>
          <p className="mt-2 text-base text-slate-600 dark:text-slate-300">Monday – Friday, 8am – 6pm CT</p>
        </div>
      </div>
    </aside>
  );
}
