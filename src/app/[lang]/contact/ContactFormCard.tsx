import type { FormEvent, ReactElement } from 'react';
import Link from 'next/link';

import ButtonPrimary from '@/app/components/ButtonPrimary';
import ContactStatusMessage from './ContactStatusMessage';
import { CONTACT_FORM_HONEYPOT_FIELD } from './contact.constants';
import type { ContactFormStatus } from './useContactForm';
import { useLanguage } from '@/lib/LanguageContext';

interface ContactFormCardProps {
  status: ContactFormStatus;
  error: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
}

export default function ContactFormCard({ status, error, onSubmit }: ContactFormCardProps): ReactElement {
  const { t } = useLanguage();

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-stack">
          <label className="block">
            <span className="form-label">{t('contactForm.name.label')}</span>
            <input
              name="name"
              placeholder={t('contactForm.name.placeholder')}
              required
              autoComplete="name"
              className="field"
            />
          </label>

          <label className="block">
            <span className="form-label">{t('contactForm.email.label')}</span>
            <input
              name="email"
              type="email"
              placeholder={t('contactForm.email.placeholder')}
              required
              autoComplete="email"
              className="field"
            />
          </label>

          <label className="block">
            <span className="form-label">{t('contactForm.message.label')}</span>
            <textarea
              name="message"
              placeholder={t('contactForm.message.placeholder')}
              required
              rows={5}
              className="field"
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

        <div className="page-actions">
          <ButtonPrimary
            disabled={status === 'sending'}
            loading={status === 'sending'}
            type="submit"
            className="w-full justify-center sm:w-auto"
          >
            {t('contactForm.submit')}
          </ButtonPrimary>

          <p className="form-note">
            {t('contactForm.privacy')}{' '}
            <Link className="link" href="/privacy">
              {t('contactForm.privacy.link')}
            </Link>
          </p>
        </div>

        <div aria-live="polite" aria-atomic="true">
          <ContactStatusMessage status={status} error={error} />
        </div>
      </form>
    </div>
  );
}
