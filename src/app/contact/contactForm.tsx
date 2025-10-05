'use client';

import React, { useState } from 'react';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  description: string;
};

export default function ContactForm({ onSubmit }: { onSubmit?: (data: FormData) => void }): React.ReactElement {
  const [form, setForm] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    description: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(): Record<string, string> {
    const e: Record<string, string> = {};
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = 'Email is invalid';
    if (!form.description.trim()) e.description = 'Description is required';
    return e;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  }

  function handleSubmit(e: React.FormEvent): void {
    e.preventDefault();
    const eObj = validate();
    setErrors(eObj);
    if (Object.keys(eObj).length === 0) {
      if (onSubmit) onSubmit(form);
    }
  }

  return (
    <form onSubmit={handleSubmit} aria-label="contact-form" className="max-w-2xl mx-auto">
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
            className="w-full rounded-md border border-foreground/10 px-3 py-2 placeholder:opacity-60 focus:outline-none focus:ring-2 focus:ring-foreground/20"
          />
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
            className="inline-flex items-center justify-center rounded-md px-6 py-3 bg-foreground text-background font-medium hover:opacity-95"
          >
            Send
          </button>
        </div>
      </div>
    </form>
  );
}
