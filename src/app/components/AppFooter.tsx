import type { ReactElement } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { CONTACT_EMAIL, CONTACT_EMAIL_MAILTO, CONTACT_PHONE, CONTACT_PHONE_TEL } from '../contact/contact.constants';

const primaryLinks = [
  { href: '/services', label: 'Services' },
  { href: '/project-showcase', label: 'Project showcase' },
  { href: '/consulting-process', label: 'Consulting process' },
  { href: '/blog', label: 'Insights & articles' },
];

const resourceLinks = [
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
  { href: '/security', label: 'Security' },
];

const socialLinks = [
  { href: 'https://www.linkedin.com/company/maxwell-software-solutions', label: 'LinkedIn' },
  { href: 'https://github.com/Maxwell-Software-Solutions', label: 'GitHub' },
];

export default function SiteFooter(): ReactElement {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-black/10 header-glass text-sm text-slate-600 dark:border-white/10 dark:bg-slate-950/80 dark:text-slate-300">
      <div className="mx-auto max-w-6xl px-6 py-12 sm:px-10 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.7fr)_repeat(2,minmax(0,1fr))]">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Image
                src="/logo-simple.svg"
                alt="Maxwell Software Solutions"
                width={200}
                height={42}
                className="h-8 w-auto opacity-90"
              />
              <span className="text-xs uppercase tracking-[0.35em] text-[color:var(--accent)]">
                Crafting reliable software
              </span>
            </div>

            <p className="max-w-xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              We help engineering leaders modernise legacy systems, accelerate delivery, and build teams that ship with
              confidence.
            </p>

            <dl className="grid">
              <div className="pb-3 rounded-lg bg-accent/5 light:bg-accent/10">
                <dt className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--accent)]">Email</dt>
                <dd>
                  <a
                    className="mt-1 block break-words text-foreground/90 font-medium transition hover:text-[color:var(--accent)]"
                    href={CONTACT_EMAIL_MAILTO}
                  >
                    {CONTACT_EMAIL}
                  </a>
                </dd>
              </div>
              <div className="pb-3 rounded-lg bg-accent/5 light:bg-accent/10">
                <dt className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--accent)]">Phone</dt>
                <dd>
                  <a
                    className="mt-1 block text-foreground/90 font-medium transition hover:text-[color:var(--accent)]"
                    href={CONTACT_PHONE_TEL}
                  >
                    {CONTACT_PHONE}
                  </a>
                </dd>
              </div>

              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                  Hours
                </dt>
                <dd className="mt-1 text-slate-600 dark:text-slate-300">Monday – Friday, 8am – 6pm CT</dd>
              </div>
            </dl>
          </div>

          <nav aria-label="Company" className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
              Company
            </p>
            <ul className="space-y-2 text-sm">
              {primaryLinks.map((link) => (
                <li key={link.href}>
                  <Link className="transition hover:text-[color:var(--accent)]" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Resources" className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
              Resources
            </p>
            <ul className="space-y-2 text-sm">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link className="transition hover:text-[color:var(--accent)]" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
                Connect
              </p>
              <ul className="flex flex-col gap-2 text-sm">
                {socialLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 transition hover:text-[color:var(--accent)]"
                    >
                      {link.label === 'LinkedIn' && (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      )}
                      {link.label === 'GitHub' && (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            fillRule="evenodd"
                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-black/10 pt-6 text-xs text-slate-500 dark:border-white/10 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} Maxwell Software Solutions. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            {resourceLinks.map((link) => (
              <Link key={link.href} className="transition hover:text-[color:var(--accent)]" href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
