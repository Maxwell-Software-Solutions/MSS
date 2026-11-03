'use client';
import type { ReactElement } from 'react';
import Link from 'next/link';

import BrandLogo from './BrandLogo';
import CookieSettingsButton from './legal/CookieSettingsButton';
import { CONTACT_EMAIL, CONTACT_EMAIL_MAILTO, CONTACT_PHONE, CONTACT_PHONE_TEL } from '../contact/contact.constants';
import { useLanguage } from '@/lib/LanguageContext';
import { COMPANY } from '@/lib/legal/company';

const primaryLinks = [
  { href: '/services', label: 'Services' },
  { href: '/case-studies', label: 'Case studies' },
  { href: '/consulting-process', label: 'Consulting process' },
  { href: '/blog', label: 'Insights & articles' },
];

const resourceLinks = [
  { href: '/privacy', labelKey: 'footer.privacy' },
  { href: '/terms', labelKey: 'footer.terms' },
  { href: '/security', labelKey: 'footer.security' },
];

const socialLinks = [
  { href: 'https://www.linkedin.com/company/maxwell-software-solutions', label: 'LinkedIn' },
  { href: 'https://github.com/Maxwell-Software-Solutions', label: 'GitHub' },
];

// Below desktop every link is a 44px row, so a thumb hits the one it means
const linkClass =
  'inline-flex min-h-11 min-w-11 items-center text-secondary transition-colors hover:text-foreground lg:min-h-0 lg:min-w-0';

export default function SiteFooter(): ReactElement {
  const { t } = useLanguage();
  // Use a fixed year or suppress hydration warning since year changes are acceptable
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-wash text-sm text-secondary" role="contentinfo">
      <div className="mx-auto max-w-6xl px-6 py-14 sm:px-10 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.7fr)_repeat(2,minmax(0,1fr))]">
          <div>
            <BrandLogo className="h-9 w-auto text-foreground" label="Maxwell Software Solutions" />

            <p className="mt-5 text-base font-medium text-foreground">{t('footer.tagline')}</p>

            <p className="mt-2 max-w-md text-base leading-relaxed lg:text-sm">{t('footer.description')}</p>

            <dl className="mt-8 grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <dt className="text-muted">Email</dt>
                <dd className="mt-1">
                  <a
                    className="inline-flex min-h-11 items-center break-words font-medium text-foreground hover:text-accent lg:min-h-0"
                    href={CONTACT_EMAIL_MAILTO}
                  >
                    {CONTACT_EMAIL}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-muted">Phone</dt>
                <dd className="mt-1">
                  <a
                    className="inline-flex min-h-11 items-center font-medium text-foreground hover:text-accent lg:min-h-0"
                    href={CONTACT_PHONE_TEL}
                  >
                    {CONTACT_PHONE}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-muted">Hours</dt>
                <dd className="mt-1 text-foreground">{t('footer.hours')}</dd>
              </div>
            </dl>
          </div>

          <nav aria-label="Company">
            <p className="font-medium text-foreground">Company</p>
            <ul className="mt-2 lg:mt-4 lg:space-y-3">
              {primaryLinks.map((link) => (
                <li key={link.href}>
                  <Link className={linkClass} href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Resources">
            <p className="font-medium text-foreground">Resources</p>
            <ul className="mt-2 lg:mt-4 lg:space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link className={linkClass} href={link.href}>
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <p className="font-medium text-foreground">Connect</p>
              <ul className="mt-2 flex flex-col lg:mt-4 lg:gap-3">
                {socialLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className={`gap-2 ${linkClass}`}
                    >
                      {link.label === 'LinkedIn' && (
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      )}
                      {link.label === 'GitHub' && (
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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

        <div className="mt-12 border-t border-border pt-6 text-sm text-muted lg:text-xs">
          {/* Who runs the site: legal name, company code, seat and e-mail, in the visitor's language */}
          <address className="not-italic" aria-label={t('footer.legal.heading')}>
            <p className="font-medium text-foreground">{COMPANY.registerName}</p>
            <dl className="mt-2 flex flex-wrap gap-x-6 gap-y-1">
              <div className="flex flex-wrap items-center gap-x-1.5">
                <dt>{t('footer.legal.code')}:</dt>
                <dd className="text-foreground">
                  {COMPANY.code}, {t('footer.legal.register')}
                </dd>
              </div>
              <div className="flex flex-wrap items-center gap-x-1.5">
                <dt>{t('footer.legal.office')}:</dt>
                <dd className="text-foreground">
                  {COMPANY.street}, {COMPANY.city}, {t('footer.legal.country')}
                </dd>
              </div>
              <div className="flex flex-wrap items-center gap-x-1.5">
                <dt>{t('footer.legal.email')}:</dt>
                <dd>
                  <a
                    className="inline-flex min-h-11 items-center break-words text-foreground hover:text-accent lg:min-h-0"
                    href={CONTACT_EMAIL_MAILTO}
                  >
                    {CONTACT_EMAIL}
                  </a>
                </dd>
              </div>
            </dl>
          </address>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p suppressHydrationWarning>© {currentYear} Maxwell Software Solutions. All rights reserved.</p>
            <div className="flex flex-wrap gap-x-5">
              {resourceLinks.map((link) => (
                <Link
                  key={link.href}
                  className="inline-flex min-h-11 min-w-11 items-center transition-colors hover:text-foreground lg:min-h-0 lg:min-w-0"
                  href={link.href}
                >
                  {t(link.labelKey)}
                </Link>
              ))}
              <CookieSettingsButton
                label={t('footer.cookieSettings')}
                unavailable={t('footer.cookieUnavailable')}
                className="inline-flex min-h-11 min-w-11 items-center transition-colors hover:text-foreground lg:min-h-0 lg:min-w-0"
                statusClassName="block w-full text-xs"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
