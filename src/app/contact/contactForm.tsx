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
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<SubmissionState>('idle');
  const [serverMessage, setServerMessage] = useState<string>('');

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
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setStatus('submitting');
    setServerMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      let payload: { success?: boolean; message?: string } = {};
      try {
        payload = await response.json();
      } catch {}

      if (!response.ok || !payload.success) {
        const message = payload.message || 'We could not send your message. Please try again later.';
        setStatus('error');
        setServerMessage(message);
        return;
      }

      setForm(EMPTY_FORM);
      setStatus('success');
      setServerMessage('Thanks! We will get back to you shortly.');
    } catch {
      setStatus('error');
      setServerMessage('We could not send your message. Please try again later.');
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
            disabled={status === 'submitting'}
            className="inline-flex items-center justify-center rounded-md px-6 py-3 bg-foreground text-background font-medium hover:opacity-95 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === 'submitting' ? 'Sending…' : 'Send'}
          </button>
        </div>

        <div aria-live="polite" className="min-h-[1.5rem] text-sm">
          {status === 'success' && <span className="text-emerald-600">{serverMessage}</span>}
          {status === 'error' && <span className="text-red-600">{serverMessage}</span>}
        </div>
      </div>
    </form>
  );
}
