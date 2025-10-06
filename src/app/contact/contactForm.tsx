'use client';

import React, { useState } from 'react';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  description: string;
};

type SubmissionState = 'idle' | 'submitting' | 'success' | 'error';

const EMPTY_FORM: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  description: '',
};

export default function ContactForm(): React.ReactElement {
  const appsScriptUrl = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL;
  const sharedToken = process.env.NEXT_PUBLIC_SHARED_TOKEN;
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<SubmissionState>('idle');
  const [serverMessage, setServerMessage] = useState<string>('');
  const hasConfigError = !appsScriptUrl || !sharedToken;

  function validate(): Record<string, string> {
    const validationErrors: Record<string, string> = {};
    const firstName = form.firstName.trim();
    const lastName = form.lastName.trim();
    if (!firstName && !lastName) validationErrors.firstName = 'Name is required';
    if (!form.email.trim()) validationErrors.email = 'Email is required';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) validationErrors.email = 'Email is invalid';
    if (!form.description.trim()) validationErrors.description = 'Description is required';
    return validationErrors;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    if (status !== 'idle') {
      setStatus('idle');
      setServerMessage('');
    }
  }

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();

    if (!appsScriptUrl || !sharedToken) {
      setServerMessage('Contact form is temporarily unavailable. Please reach out at hello@maxwell.software.');
      setStatus('error');
      return;
    }

    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setStatus('submitting');
    setServerMessage('');

    const payload = (Object.entries(form) as Array<[keyof FormData, string]>).reduce<FormData>(
      (acc, [key, value]) => {
        acc[key] = value.trim();
        return acc;
      },
      { ...EMPTY_FORM }
    );

    try {
      const fullName = [payload.firstName, payload.lastName].filter(Boolean).join(' ');
      const requestBody = {
        token: sharedToken,
        name: fullName || payload.email,
        email: payload.email,
        message: payload.description,
        ...(payload.phone ? { phone: payload.phone } : {}),
      };

      const response = await fetch(appsScriptUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const contentType = response.headers.get('content-type') ?? '';
      let responseMessage = '';

      if (contentType.includes('application/json')) {
        try {
          const json = await response.json();
          responseMessage = typeof json?.message === 'string' ? json.message : '';
        } catch (jsonError) {
          console.warn('Unable to parse JSON response from contact submission', jsonError);
        }
      } else {
        const textResponse = await response.text();
        responseMessage = textResponse.trim();
      }

      if (!response.ok) {
        setServerMessage(responseMessage || 'We were unable to send your message. Please try again later.');
        setStatus('error');
        return;
      }

      setStatus('success');
      setServerMessage(responseMessage || "Thanks for reaching out! We'll be in touch soon.");
      setForm(EMPTY_FORM);
    } catch (error) {
      console.error('Contact form submission failed', error);
      setServerMessage('An unexpected error occurred. Please try again.');
      setStatus('error');
    }
  }

  return (
    <form onSubmit={handleSubmit} aria-label="contact-form" className="max-w-2xl mx-auto" noValidate>
      <div className="grid grid-cols-1 gap-6">
        <div className="flex flex-col">
          <label htmlFor="firstName" className="mb-2 text-sm font-medium text-foreground/90">
            First name
          </label>
          <input
            id="firstName"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            aria-invalid={!!errors.firstName}
            aria-describedby={errors.firstName ? 'firstName-error' : undefined}
            className="w-full rounded-md border border-foreground/10 px-3 py-2 placeholder:opacity-60 focus:outline-none focus:ring-2 focus:ring-foreground/20"
          />
          {errors.firstName && (
            <p id="firstName-error" role="alert" className="mt-2 text-sm text-red-600">
              {errors.firstName}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="lastName" className="mb-2 text-sm font-medium text-foreground/90">
            Last name
          </label>
          <input
            id="lastName"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            className="w-full rounded-md border border-foreground/10 px-3 py-2 placeholder:opacity-60 focus:outline-none focus:ring-2 focus:ring-foreground/20"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="mb-2 text-sm font-medium text-foreground/90">
            Email <span className="text-red-600">*</span>
          </label>
          <input
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className="w-full rounded-md border border-foreground/10 px-3 py-2 placeholder:opacity-60 focus:outline-none focus:ring-2 focus:ring-foreground/20"
          />
          {errors.email && (
            <p id="email-error" role="alert" className="mt-2 text-sm text-red-600">
              {errors.email}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="phone" className="mb-2 text-sm font-medium text-foreground/90">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full rounded-md border border-foreground/10 px-3 py-2 placeholder:opacity-60 focus:outline-none focus:ring-2 focus:ring-foreground/20"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="description" className="mb-2 text-sm font-medium text-foreground/90">
            Description <span className="text-red-600">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            aria-invalid={!!errors.description}
            aria-describedby={errors.description ? 'description-error' : undefined}
            rows={6}
            className="w-full rounded-md border border-foreground/10 px-3 py-2 placeholder:opacity-60 focus:outline-none focus:ring-2 focus:ring-foreground/20"
          />
          {errors.description && (
            <p id="description-error" role="alert" className="mt-2 text-sm text-red-600">
              {errors.description}
            </p>
          )}
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={status === 'submitting' || hasConfigError}
            className="inline-flex items-center justify-center rounded-md px-6 py-3 bg-foreground text-background font-medium hover:opacity-95 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === 'submitting' ? 'Sending…' : hasConfigError ? 'Temporarily unavailable' : 'Send'}
          </button>
        </div>

        <div aria-live="polite" className="min-h-[1.5rem] text-sm">
          {status === 'success' && <span className="text-emerald-600">{serverMessage}</span>}
          {status === 'error' && <span className="text-red-600">{serverMessage}</span>}
          {status === 'idle' && hasConfigError && (
            <span className="text-red-600">
              Our form is offline right now. Please email{' '}
              <a className="underline" href="mailto:hello@maxwell.software">
                hello@maxwell.software
              </a>
              .
            </span>
          )}
        </div>
      </div>
    </form>
  );
}
