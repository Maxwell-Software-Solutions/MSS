// app/contact/page.tsx
'use client';

import { useState, type ReactNode } from 'react';

export default function ContactForm(): ReactNode {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState<string>('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setStatus('sending');
    setError('');

    const form = new FormData(e.currentTarget);

    // IMPORTANT: Use URLSearchParams and DO NOT set headers -> simple POST, no preflight/CORS
    const body = new URLSearchParams({
      token: process.env.NEXT_PUBLIC_SHARED_TOKEN || '',
      name: String(form.get('name') || ''),
      email: String(form.get('email') || ''),
      message: String(form.get('message') || ''),
    });

    const res = await fetch(process.env.NEXT_PUBLIC_APPS_SCRIPT_URL!, {
      method: 'POST',
      body,
    });

    // Apps Script returns JSON text; read and parse safely

    if (res.ok) {
      setStatus('sent');
    } else {
      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = {};
      }

      setStatus('error');
      setError(data.error || 'Submission failed');
    }
  }

  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Contact us</h1>

      <form onSubmit={onSubmit} className="space-y-3">
        <input name="name" placeholder="Your name" required className="border rounded w-full p-2" />
        <input name="email" type="email" placeholder="you@example.com" required className="border rounded w-full p-2" />
        <textarea
          name="message"
          placeholder="How can we help?"
          required
          className="border rounded w-full p-2 min-h-[120px]"
        />
        <button disabled={status === 'sending'} className="border rounded px-4 py-2">
          {status === 'sending' ? 'Sending…' : 'Send'}
        </button>

        {status === 'sent' && <p className="text-green-600">Thanks! We’ll get back to you soon.</p>}
        {status === 'error' && <p className="text-red-600">Sorry—{error || 'something went wrong'}.</p>}
      </form>
    </main>
  );
}
