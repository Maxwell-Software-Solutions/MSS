import type { FormEvent, ReactElement } from 'react';

import ContactStatusMessage from './ContactStatusMessage';
import { CONTACT_FORM_HONEYPOT_FIELD } from './contact.constants';
import type { ContactFormStatus } from './useContactForm';

interface ContactFormCardProps {
  status: ContactFormStatus;
  error: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
}

export default function ContactFormCard({ status, error, onSubmit }: ContactFormCardProps): ReactElement {
  return (
    <form
      onSubmit={onSubmit}
      className="shadow-soft rounded-3xl border border-black/5 bg-white/85 p-8 backdrop-blur-xl transition dark:border-white/10 dark:bg-slate-900/75"
    >
      <div className="space-y-6">
        <label className="block">
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Full name</span>
          <input
            name="name"
            placeholder="Your name"
            required
            autoComplete="name"
            className="mt-2 block w-full rounded-2xl border border-slate-200 bg-white/95 px-4 py-3 text-base text-slate-900 shadow-[0_1px_2px_rgba(15,23,42,0.08)] transition focus:border-[color:var(--accent)] focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:ring-offset-2 focus:ring-offset-white dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-100 dark:focus:ring-offset-slate-900"
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Email address</span>
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            autoComplete="email"
            className="mt-2 block w-full rounded-2xl border border-slate-200 bg-white/95 px-4 py-3 text-base text-slate-900 shadow-[0_1px_2px_rgba(15,23,42,0.08)] transition focus:border-[color:var(--accent)] focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:ring-offset-2 focus:ring-offset-white dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-100 dark:focus:ring-offset-slate-900"
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">How can we help?</span>
          <textarea
            name="message"
            placeholder="Tell us about your goals, challenges, and timeline."
            required
            rows={5}
            className="mt-2 block w-full rounded-2xl border border-slate-200 bg-white/95 px-4 py-3 text-base text-slate-900 shadow-[0_1px_2px_rgba(15,23,42,0.08)] transition focus:border-[color:var(--accent)] focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:ring-offset-2 focus:ring-offset-white dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-100 dark:focus:ring-offset-slate-900"
          />
        </label>

        <div aria-hidden={true} className="sr-only absolute left-0 top-auto h-0 w-0 overflow-hidden">
          <label htmlFor={CONTACT_FORM_HONEYPOT_FIELD}>Company</label>
          <input
            id={CONTACT_FORM_HONEYPOT_FIELD}
            name={CONTACT_FORM_HONEYPOT_FIELD}
            type="text"
            tabIndex={-1}
            autoComplete="off"
            className="h-0 w-0 border-0 p-0"
          />
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          disabled={status === 'sending'}
          className="btn btn-accent w-full justify-center gap-2 text-base shadow-soft transition disabled:cursor-not-allowed disabled:opacity-70 disabled:shadow-none sm:w-auto"
        >
          {status === 'sending' ? 'Sending…' : 'Send message'}
        </button>

        <p className="text-xs text-slate-500 dark:text-slate-400">
          We respect your privacy and keep information confidential.
        </p>
      </div>

      <ContactStatusMessage status={status} error={error} />
    </form>
  );
}
