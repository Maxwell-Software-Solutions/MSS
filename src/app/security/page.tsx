import type { Metadata } from 'next';
import type { ReactElement } from 'react';

export const metadata: Metadata = {
  title: 'Security Policy — Maxwell Software Solutions',
  description: 'Security practices, incident response approach, and contact details for Maxwell Software Solutions.',
  alternates: {
    canonical: '/security',
  },
};

const effectiveDate = '6 October 2025';
const securityEmail = 'security@maxwellsoftwaresolutions.com';

export default function SecurityPage(): ReactElement {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12 text-slate-700 dark:text-slate-200 sm:px-10">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[color:var(--accent)]">Security Policy</p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          Security at Maxwell Software Solutions
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Effective date: {effectiveDate}</p>
        <p className="max-w-2xl text-base leading-relaxed">
          We take a defence-in-depth approach appropriate for a consultancy that handles minimal personal data. This
          page summarises the safeguards we employ to protect client information and our own infrastructure.
        </p>
      </header>

      <section className="mt-12 space-y-10">
        <article className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Our security practices</h2>
          <ul className="list-disc space-y-3 pl-5">
            <li>
              <strong>Least privilege &amp; access control:</strong> administrative access is limited to designated
              personnel, multi-factor authentication is required, and we review access rights on a regular schedule.
            </li>
            <li>
              <strong>Encryption in transit:</strong> all Site traffic is served over TLS, and we rely on secure email
              providers for communications with clients and partners.
            </li>
            <li>
              <strong>Secure development practices:</strong> we use version control, peer review, automated dependency
              monitoring, and a vulnerability patching cadence aligned to severity.
            </li>
            <li>
              <strong>Backups &amp; availability:</strong> our hosting providers supply managed backups and uptime
              controls appropriate for a marketing and informational site.
            </li>
            <li>
              <strong>Logging &amp; monitoring:</strong> we maintain baseline application and edge logging, with
              alerting on anomalous traffic where our providers make it available.
            </li>
            <li>
              <strong>Third-party risk:</strong> vendors and sub-processors (hosting, email, analytics) are assessed for
              security and data protection commitments prior to onboarding.
            </li>
          </ul>
        </article>

        <article className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Incident response</h2>
          <ul className="list-disc space-y-3 pl-5">
            <li>
              <strong>Triage &amp; containment:</strong> on detection, we contain the incident, investigate scope, and
              determine root cause.
            </li>
            <li>
              <strong>Notification:</strong> if a personal-data breach occurs, we assess risk and notify the competent
              authority and affected individuals without undue delay in line with GDPR obligations (within 72 hours
              where required). Learn more at{' '}
              <a
                className="text-[color:var(--accent)] underline-offset-4 hover:underline"
                href="https://gdpr-info.eu/art-33-gdpr/"
                target="_blank"
                rel="noreferrer"
              >
                GDPR Article 33
              </a>
              .
            </li>
            <li>
              <strong>Post-incident review:</strong> we document lessons learned and track remediation to completion.
            </li>
          </ul>
        </article>

        <article className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Data minimisation</h2>
          <p>
            We collect the smallest amount of personal data needed to respond to enquiries and deliver services. Data is
            retained only as long as necessary for those purposes, after which it is deleted or anonymised.
          </p>
        </article>

        <article className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Responsible disclosure</h2>
          <p>
            If you believe you have found a security vulnerability on our Site, email{' '}
            <a
              className="text-[color:var(--accent)] underline-offset-4 hover:underline"
              href={`mailto:${securityEmail}`}
            >
              {securityEmail}
            </a>{' '}
            (PGP optional). Please:
          </p>
          <ul className="list-disc space-y-3 pl-5">
            <li>Do not access data that is not yours, degrade our service, or violate laws.</li>
            <li>Give us reasonable time to investigate and remediate before public disclosure.</li>
            <li>
              Provide enough detail to reproduce the issue. We will acknowledge valid reports and keep you updated.
            </li>
          </ul>
        </article>

        <article className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Sub-processors</h2>
          <p>The following providers support the delivery of our Site and services:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>Hosting / CDN:</strong> Vercel (primary hosting) and Cloudflare (edge caching).
            </li>
            <li>
              <strong>Email &amp; contact:</strong> Google Workspace.
            </li>
            <li>
              <strong>Analytics (consent-based):</strong> Plausible.
            </li>
          </ul>
        </article>

        <article className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            What to do next (internal checklist)
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            The following actions ensure ongoing compliance and clarity for visitors:
          </p>
          <ul className="list-disc space-y-3 pl-5">
            <li>Confirm public-facing entity details (legal name, registration number, and registered address).</li>
            <li>Launch dedicated inboxes (privacy@, legal@, security@) and route to responsible owners.</li>
            <li>
              Implement a consent-based cookie banner that blocks non-essential cookies until accepted and includes a
              visible “Cookie settings” link in the footer. Guidance:{' '}
              <a
                className="text-[color:var(--accent)] underline-offset-4 hover:underline"
                href="https://gdpr.eu/cookies/"
                target="_blank"
                rel="noreferrer"
              >
                GDPR.eu
              </a>
              .
            </li>
            <li>Document data hosting regions and sub-processor responsibilities on this page.</li>
            <li>Verify the lead supervisory authority reference if serving EU markets beyond Lithuania.</li>
          </ul>
        </article>
      </section>
    </main>
  );
}
