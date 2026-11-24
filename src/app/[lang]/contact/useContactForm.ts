import axios from 'axios';
import { useCallback, useState } from 'react';
import type { FormEvent } from 'react';
import { trackFormSubmit } from '@/lib/analytics';

import { CONTACT_FORM_HONEYPOT_FIELD } from './contact.constants';

export type ContactFormStatus = 'idle' | 'sending' | 'sent' | 'error';

export interface UseContactFormResult {
  status: ContactFormStatus;
  error: string;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
}

export function useContactForm(): UseContactFormResult {
  const [status, setStatus] = useState<ContactFormStatus>('idle');
  const [error, setError] = useState<string>('');

  const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setStatus('sending');
    setError('');

    const form = new FormData(event.currentTarget);
    const honeypotValue = String(form.get(CONTACT_FORM_HONEYPOT_FIELD) || '').trim();

    if (honeypotValue.length > 0) {
      setStatus('sent');
      return;
    }

    const body = new URLSearchParams({
      token: process.env.NEXT_PUBLIC_SHARED_TOKEN || '',
      name: String(form.get('name') || ''),
      email: String(form.get('email') || ''),
      message: String(form.get('message') || ''),
    });

    try {
      await axios.post(process.env.NEXT_PUBLIC_APPS_SCRIPT_URL!, body);
      setStatus('sent');
      trackFormSubmit('contact', true);
    } catch (err: unknown) {
      setStatus('error');
      trackFormSubmit('contact', false);

      if (axios.isAxiosError(err)) {
        const payload = err.response?.data;

        if (typeof payload === 'string') {
          try {
            const parsed = JSON.parse(payload);
            setError(typeof parsed?.error === 'string' ? parsed.error : 'Submission failed');
            return;
          } catch {
            setError(payload || 'Submission failed');
            return;
          }
        }

        if (payload && typeof payload === 'object' && 'error' in payload) {
          const message = (payload as { error?: string }).error;
          setError(message || 'Submission failed');
          return;
        }

        if (err.message) {
          setError(err.message);
          return;
        }
      }

      if (err instanceof Error && err.message) {
        setError(err.message);
        return;
      }

      setError('Submission failed');
    }
  }, []);

  return {
    status,
    error,
    handleSubmit,
  };
}
