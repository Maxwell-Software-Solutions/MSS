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
    <footer className="border-t border-black/10 bg-white/95 text-sm text-slate-600 backdrop-blur-sm dark:border-white/10 dark:bg-slate-950/80 dark:text-slate-300">
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

            <dl className="grid gap-4 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                  Email
                </dt>
                <dd>
                  <a
                    className="mt-1 block break-words text-slate-700 transition hover:text-[color:var(--accent)] dark:text-slate-200"
                    href={CONTACT_EMAIL_MAILTO}
                  >
                    {CONTACT_EMAIL}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                  Phone
                </dt>
                <dd>
                  <a
                    className="mt-1 block text-slate-700 transition hover:text-[color:var(--accent)] dark:text-slate-200"
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

            <div className="mt-6 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
                Connect
              </p>
              <ul className="flex flex-wrap gap-3 text-sm">
                {socialLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="transition hover:text-[color:var(--accent)]"
                    >
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
