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
        className="mt-6 flex items-start gap-3 rounded-2xl border border-accent/20 bg-card/50 px-4 py-3 text-sm text-accent"
      >
        <span className="mt-0.5 inline-flex h-2.5 w-2.5 flex-shrink-0 rounded-full bg-accent" />
        Thanks! We’ll get back to you soon.
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div
        role="alert"
        className="mt-6 flex items-start gap-3 rounded-2xl border border-foreground/20 bg-card/50 px-4 py-3 text-sm text-foreground"
      >
        <span className="mt-0.5 inline-flex h-2.5 w-2.5 flex-shrink-0 rounded-full bg-foreground/60" />
        Sorry—{error || 'something went wrong'}.
      </div>
    );
  }

  return null;
}
