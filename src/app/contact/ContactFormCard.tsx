import type { FormEvent, ReactElement } from 'react';

import ButtonPrimary from '@/app/components/ButtonPrimary';
import ContactStatusMessage from './ContactStatusMessage';
import { CONTACT_FORM_HONEYPOT_FIELD } from './contact.constants';
import type { ContactFormStatus } from './useContactForm';
import { NeuroCard } from '@/app/components/ui';

interface ContactFormCardProps {
  status: ContactFormStatus;
  error: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
}

export default function ContactFormCard({ status, error, onSubmit }: ContactFormCardProps): ReactElement {
  return (
    <NeuroCard as="div" className="p-0">
      <form onSubmit={onSubmit}>
        <div className="space-y-6">
          <label className="block">
            <span className="text-sm font-semibold text-foreground/90">Full name</span>
            <input
              name="name"
              placeholder="Your name"
              required
              autoComplete="name"
              className="neuro-input mt-2 block w-full text-base text-foreground placeholder:text-foreground/40"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-foreground/90">Email address</span>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              autoComplete="email"
              className="neuro-input mt-2 block w-full text-base text-foreground placeholder:text-foreground/40"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-foreground/90">How can we help?</span>
            <textarea
              name="message"
              placeholder="Tell us about your goals, challenges, and timeline."
              required
              rows={5}
              className="neuro-input mt-2 block w-full text-base text-foreground placeholder:text-foreground/40"
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
          <ButtonPrimary
            disabled={status === 'sending'}
            loading={status === 'sending'}
            type="submit"
            className="w-full justify-center sm:w-auto"
          >
            Send message
          </ButtonPrimary>

          <p className="text-xs text-foreground/75">We respect your privacy and keep information confidential.</p>
        </div>

        <div aria-live="polite" aria-atomic="true">
          <ContactStatusMessage status={status} error={error} />
        </div>
      </form>
    </NeuroCard>
  );
}
