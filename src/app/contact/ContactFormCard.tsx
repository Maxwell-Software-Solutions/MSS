import type { FormEvent, ReactElement } from 'react';

import ButtonPrimary from '@/app/components/ButtonPrimary';
import ContactStatusMessage from './ContactStatusMessage';
import { CONTACT_FORM_HONEYPOT_FIELD } from './contact.constants';
import type { ContactFormStatus } from './useContactForm';
import { NeuroCard } from '@/app/components/ui';
import { useLanguage } from '@/lib/LanguageContext';

interface ContactFormCardProps {
  status: ContactFormStatus;
  error: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
}

export default function ContactFormCard({ status, error, onSubmit }: ContactFormCardProps): ReactElement {
  const { t } = useLanguage();

  return (
    <NeuroCard as="div" className="p-0">
      <form onSubmit={onSubmit}>
        <div className="space-y-5">
          <label className="block">
            <span className="text-sm font-semibold text-foreground/90">{t('contactForm.name.label')}</span>
            <input
              name="name"
              placeholder={t('contactForm.name.placeholder')}
              required
              autoComplete="name"
              className="neuro-input mt-2 block w-full text-base text-foreground placeholder:text-foreground/40"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-foreground/90">{t('contactForm.email.label')}</span>
            <input
              name="email"
              type="email"
              placeholder={t('contactForm.email.placeholder')}
              required
              autoComplete="email"
              className="neuro-input mt-2 block w-full text-base text-foreground placeholder:text-foreground/40"
            />
          </label>

          <div className="grid gap-5 sm:grid-cols-3">
            <label className="block">
              <span className="text-sm font-semibold text-foreground/90">{t('contactForm.service.label')}</span>
              <select
                name="service"
                defaultValue=""
                className="neuro-input mt-2 block w-full cursor-pointer text-base text-foreground appearance-none bg-[right_0.75rem_center] bg-no-repeat"
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23888' d='M6 8L1 3h10z'/%3E%3C/svg%3E\")", paddingRight: '2.5rem' }}
                aria-label={t('contactForm.service.label')}
              >
                <option value="" disabled>{t('contactForm.service.placeholder')}</option>
                <option value="code-health-audit">{t('contactForm.service.codeHealthAudit')}</option>
                <option value="sprint-in-a-box">{t('contactForm.service.sprintInABox')}</option>
                <option value="engineering-partner-retainer">{t('contactForm.service.engineeringPartnerRetainer')}</option>
                <option value="cicd-accelerator">{t('contactForm.service.cicdAccelerator')}</option>
                <option value="fractional-cto">{t('contactForm.service.fractionalCTO')}</option>
                <option value="something-else">{t('contactForm.service.somethingElse')}</option>
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-foreground/90">{t('contactForm.budget.label')}</span>
              <select
                name="budget"
                defaultValue=""
                className="neuro-input mt-2 block w-full cursor-pointer text-base text-foreground appearance-none bg-[right_0.75rem_center] bg-no-repeat"
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23888' d='M6 8L1 3h10z'/%3E%3C/svg%3E\")", paddingRight: '2.5rem' }}
                aria-label={t('contactForm.budget.label')}
              >
                <option value="" disabled>{t('contactForm.budget.placeholder')}</option>
                <option value="under-5k">{t('contactForm.budget.under5k')}</option>
                <option value="5k-15k">{t('contactForm.budget.5kTo15k')}</option>
                <option value="15k-50k">{t('contactForm.budget.15kTo50k')}</option>
                <option value="50k-plus">{t('contactForm.budget.50kPlus')}</option>
                <option value="prefer-not-to-say">{t('contactForm.budget.preferNotToSay')}</option>
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-foreground/90">{t('contactForm.timeline.label')}</span>
              <select
                name="timeline"
                defaultValue=""
                className="neuro-input mt-2 block w-full cursor-pointer text-base text-foreground appearance-none bg-[right_0.75rem_center] bg-no-repeat"
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23888' d='M6 8L1 3h10z'/%3E%3C/svg%3E\")", paddingRight: '2.5rem' }}
                aria-label={t('contactForm.timeline.label')}
              >
                <option value="" disabled>{t('contactForm.timeline.placeholder')}</option>
                <option value="asap">{t('contactForm.timeline.asap')}</option>
                <option value="1-3-months">{t('contactForm.timeline.1to3months')}</option>
                <option value="3-6-months">{t('contactForm.timeline.3to6months')}</option>
                <option value="exploring">{t('contactForm.timeline.justExploring')}</option>
              </select>
            </label>
          </div>

          <label className="block">
            <span className="text-sm font-semibold text-foreground/90">{t('contactForm.message.label')}</span>
            <textarea
              name="message"
              placeholder={t('contactForm.message.placeholder')}
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
            {t('contactForm.submit')}
          </ButtonPrimary>

          <p className="text-xs text-foreground/75">{t('contactForm.privacy')}</p>
        </div>

        <div aria-live="polite" aria-atomic="true">
          <ContactStatusMessage status={status} error={error} />
        </div>
      </form>
    </NeuroCard>
  );
}
