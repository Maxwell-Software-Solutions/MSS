import type { ReactElement } from 'react';

import type { ContactFormStatus } from './useContactForm';

interface ContactStatusMessageProps {
  status: ContactFormStatus;
  error: string;
}

export default function ContactStatusMessage({ status, error }: ContactStatusMessageProps): ReactElement | null {
  if (status === 'sent') {
    return (
      <div
        role="status"
        className="mt-6 flex items-start gap-3 rounded-2xl border border-emerald-200/60 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-200"
      >
        <span className="mt-0.5 inline-flex h-2.5 w-2.5 flex-shrink-0 rounded-full bg-emerald-500" />
        Thanks! We’ll get back to you soon.
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div
        role="alert"
        className="mt-6 flex items-start gap-3 rounded-2xl border border-red-200/70 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-200"
      >
        <span className="mt-0.5 inline-flex h-2.5 w-2.5 flex-shrink-0 rounded-full bg-red-500" />
        Sorry—{error || 'something went wrong'}.
      </div>
    );
  }

  return null;
}
