import type { ReactElement } from 'react';
import { Alert } from '@/app/components/ui';
import type { ContactFormStatus } from './useContactForm';

interface ContactStatusMessageProps {
  status: ContactFormStatus;
  error: string;
}

export default function ContactStatusMessage({ status, error }: ContactStatusMessageProps): ReactElement | null {
  if (status === 'sent') {
    return (
      <div role="status" className="mt-6">
        <Alert variant="success" icon="✓">
          Thanks! We&apos;ll get back to you soon.
        </Alert>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div role="alert" className="mt-6">
        <Alert variant="error" icon="✕">
          Sorry—{error || 'something went wrong'}.
        </Alert>
      </div>
    );
  }

  return null;
}
