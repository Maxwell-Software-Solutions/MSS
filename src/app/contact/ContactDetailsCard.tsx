'use client';
import type { ReactElement } from 'react';

import { CONTACT_EMAIL, CONTACT_EMAIL_MAILTO, CONTACT_PHONE, CONTACT_PHONE_TEL } from './contact.constants';
import ScheduleCallButton from '@/app/components/ScheduleCallButton';
import { useHydratedTranslation } from '@/lib/useHydratedTranslation';

export default function ContactDetailsCard(): ReactElement {
  const ht = useHydratedTranslation();

  return (
    <aside className="contact-aside">
      <h2>Prefer a direct line?</h2>
      <p className="measure mt-4 text-secondary">
        {ht(
          'contactPage.direct.body',
          'Drop us a note with your preferred contact method and the right specialist will be in touch.',
        )}
      </p>

      <div className="page-actions">
        <ScheduleCallButton />
      </div>

      <div className="rows block-gap">
        <div>
          <span className="text-sm text-muted">Phone</span>
          <a className="contact-link" href={CONTACT_PHONE_TEL}>
            {CONTACT_PHONE}
          </a>
        </div>

        <div>
          <span className="text-sm text-muted">Email</span>
          <a className="contact-link break-words" href={CONTACT_EMAIL_MAILTO}>
            {CONTACT_EMAIL}
          </a>
        </div>

        <div>
          <span className="text-sm text-muted">Hours</span>
          <p className="mt-1 text-foreground">{ht('contactPage.hours', 'Mon–Fri, 9:00–17:00 (Vilnius time)')}</p>
        </div>
      </div>
    </aside>
  );
}
