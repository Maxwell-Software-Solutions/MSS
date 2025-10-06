// app/contact/page.tsx
'use client';

import axios from 'axios';
import { useState, type ReactNode } from 'react';

import { CONTACT_EMAIL, CONTACT_EMAIL_MAILTO, CONTACT_PHONE, CONTACT_PHONE_TEL } from './contact.constants';

const HONEYPOT_FIELD_NAME = 'company';

export default function ContactForm(): ReactElement {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState<string>('');
  // Debugging: capture a ref to the root element and log its DOM snapshot on client mount
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      const root = rootRef.current;
      if (!root) return;
      // Log a compact snapshot to help compare server HTML vs client DOM
      // eslint-disable-next-line no-console
      console.log('[ContactForm] client DOM snapshot (first 2 children):', {
        firstChildTag: root.firstElementChild?.tagName,
        secondChildTag: root.firstElementChild?.nextElementSibling?.tagName,
        innerStart: root.innerHTML?.slice?.(0, 300),
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('[ContactForm] debug snapshot failed', e);
    }
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setStatus('sending');
    setError('');

    const form = new FormData(e.currentTarget);

    const honeypotValue = String(form.get(HONEYPOT_FIELD_NAME) || '').trim();
    if (honeypotValue.length > 0) {
      setStatus('sent');
      return;
    }

    // IMPORTANT: Keep URLSearchParams and default headers -> simple POST, no preflight/CORS
    const body = new URLSearchParams({
      token: process.env.NEXT_PUBLIC_SHARED_TOKEN || '',
      name: String(form.get('name') || ''),
      email: String(form.get('email') || ''),
      message: String(form.get('message') || ''),
    });

    try {
      await axios.post(process.env.NEXT_PUBLIC_APPS_SCRIPT_URL!, body);
      setStatus('sent');
    } catch (err: unknown) {
      setStatus('error');

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
  }

  return (
  <div ref={rootRef} role="region" aria-label="Contact form" className="relative isolate min-h-[70vh] overflow-hidden bg-slate-950/5 py-16 sm:py-20">
  <div aria-hidden={true} className="pointer-events-none absolute inset-0 -z-10">
        <div className="mx-auto h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle_at_center,var(--accent)_0%,transparent_70%)] opacity-20 blur-3xl" />
      </div>

      <div className="mx-auto max-w-5xl px-6 sm:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[color:var(--accent)]">
          We&apos;d love to hear from you
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          Let&apos;s build something remarkable together
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300">
          Share a few details about your project and our consultants will reach back within one business day.
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)]">
          <form
            onSubmit={onSubmit}
            className="shadow-soft rounded-3xl border border-black/5 bg-white/85 p-8 backdrop-blur-xl transition dark:border-white/10 dark:bg-slate-900/75"
          >
            <div className="space-y-6">
              <label className="block">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Full name</span>
                <input
                  name="name"
                  placeholder="Your name"
                  required
                  autoComplete="name"
                  className="mt-2 block w-full rounded-2xl border border-slate-200 bg-white/95 px-4 py-3 text-base text-slate-900 shadow-[0_1px_2px_rgba(15,23,42,0.08)] transition focus:border-[color:var(--accent)] focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:ring-offset-2 focus:ring-offset-white dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-100 dark:focus:ring-offset-slate-900"
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Email address</span>
                <input
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                  className="mt-2 block w-full rounded-2xl border border-slate-200 bg-white/95 px-4 py-3 text-base text-slate-900 shadow-[0_1px_2px_rgba(15,23,42,0.08)] transition focus:border-[color:var(--accent)] focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:ring-offset-2 focus:ring-offset-white dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-100 dark:focus:ring-offset-slate-900"
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">How can we help?</span>
                <textarea
                  name="message"
                  placeholder="Tell us about your goals, challenges, and timeline."
                  required
                  rows={5}
                  className="mt-2 block w-full rounded-2xl border border-slate-200 bg-white/95 px-4 py-3 text-base text-slate-900 shadow-[0_1px_2px_rgba(15,23,42,0.08)] transition focus:border-[color:var(--accent)] focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:ring-offset-2 focus:ring-offset-white dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-100 dark:focus:ring-offset-slate-900"
                />
              </label>

              <div aria-hidden={true} className="sr-only absolute left-0 top-auto h-0 w-0 overflow-hidden">
                <label htmlFor={HONEYPOT_FIELD_NAME}>Company</label>
                <input
                  id={HONEYPOT_FIELD_NAME}
                  name={HONEYPOT_FIELD_NAME}
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  className="h-0 w-0 border-0 p-0"
                />
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                disabled={status === 'sending'}
                className="btn btn-accent w-full justify-center gap-2 text-base shadow-soft transition disabled:cursor-not-allowed disabled:opacity-70 disabled:shadow-none sm:w-auto"
              >
                {status === 'sending' ? 'Sending…' : 'Send message'}
              </button>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                We respect your privacy and keep information confidential.
              </p>
            </div>

            {status === 'sent' && (
              <div
                role="status"
                className="mt-6 flex items-start gap-3 rounded-2xl border border-emerald-200/60 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-200"
              >
                <span className="mt-0.5 inline-flex h-2.5 w-2.5 flex-shrink-0 rounded-full bg-emerald-500" />
                Thanks! We’ll get back to you soon.
              </div>
            )}
            {status === 'error' && (
              <div
                role="alert"
                className="mt-6 flex items-start gap-3 rounded-2xl border border-red-200/70 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-200"
              >
                <span className="mt-0.5 inline-flex h-2.5 w-2.5 flex-shrink-0 rounded-full bg-red-500" />
                Sorry—{error || 'something went wrong'}.
              </div>
            )}
          </form>

          <aside className="relative overflow-hidden rounded-3xl border border-black/5 bg-white/60 p-8 shadow-soft backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/60">
            <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,var(--accent)_0%,rgba(139,107,0,0.35)_100%)]" />
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Prefer a direct line?</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Our team monitors messages around the clock. Drop us a note with your preferred contact method and the
              right specialist will be in touch.
            </p>

            <div className="mt-8 space-y-6 text-sm">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[color:var(--accent)]">
                  Phone
                </span>
                <a
                  className="mt-2 block text-base font-medium text-slate-900 transition hover:text-[color:var(--accent)] dark:text-slate-100"
                  href={CONTACT_PHONE_TEL}
                >
                  {CONTACT_PHONE}
                </a>
              </div>

              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[color:var(--accent)]">
                  Email
                </span>
                <a
                  className="mt-2 block break-words text-sm font-medium text-slate-900 transition hover:text-[color:var(--accent)] dark:text-slate-100 sm:text-base"
                  href={CONTACT_EMAIL_MAILTO}
                >
                  {CONTACT_EMAIL}
                </a>
              </div>

              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[color:var(--accent)]">
                  Hours
                </span>
                <p className="mt-2 text-base text-slate-600 dark:text-slate-300">Monday – Friday, 8am – 6pm CT</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
  </div>
  );
}
