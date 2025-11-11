import type { ReactElement } from 'react';
import { ArticleSection, ListSection } from '@/app/components/ui';

interface SecurityContentProps {
  securityEmail: string;
}

export function SecurityContent({ securityEmail }: SecurityContentProps): ReactElement {
  return (
    <section className="mt-12 space-y-10">
      <ListSection
        title="Our security practices"
        items={[
          <>
            <strong>Least privilege &amp; access control:</strong> administrative access is limited to designated
            personnel, multi-factor authentication is required, and we review access rights on a regular schedule.
          </>,
          <>
            <strong>Encryption in transit:</strong> all Site traffic is served over TLS, and we rely on secure email
            providers for communications with clients and partners.
          </>,
          <>
            <strong>Secure development practices:</strong> we use version control, peer review, automated dependency
            monitoring, and a vulnerability patching cadence aligned to severity.
          </>,
          <>
            <strong>Backups &amp; availability:</strong> our hosting providers supply managed backups and uptime
            controls appropriate for a marketing and informational site.
          </>,
          <>
            <strong>Logging &amp; monitoring:</strong> we maintain baseline application and edge logging, with alerting
            on anomalous traffic where our providers make it available.
          </>,
          <>
            <strong>Third-party risk:</strong> vendors and sub-processors (hosting, email, analytics) are assessed for
            security and data protection commitments prior to onboarding.
          </>,
        ]}
      />

      <ListSection
        title="Incident response"
        items={[
          <>
            <strong>Triage &amp; containment:</strong> on detection, we contain the incident, investigate scope, and
            determine root cause.
          </>,
          <>
            <strong>Notification:</strong> if a personal-data breach occurs, we assess risk and notify the competent
            authority and affected individuals without undue delay in line with GDPR obligations (within 72 hours where
            required). Learn more at{' '}
            <a
              className="text-[color:var(--accent)] underline-offset-4 hover:underline"
              href="https://gdpr-info.eu/art-33-gdpr/"
              target="_blank"
              rel="noreferrer"
            >
              GDPR Article 33
            </a>
            .
          </>,
          <>
            <strong>Post-incident review:</strong> we document lessons learned and track remediation to completion.
          </>,
        ]}
      />

      <ArticleSection title="Data minimisation">
        <p>
          We collect the smallest amount of personal data needed to respond to enquiries and deliver services. Data is
          retained only as long as necessary for those purposes, after which it is deleted or anonymised.
        </p>
      </ArticleSection>

      <ArticleSection title="Responsible disclosure">
        <p>
          If you believe you have found a security vulnerability on our Site, email{' '}
          <a className="text-[color:var(--accent)] underline-offset-4 hover:underline" href={`mailto:${securityEmail}`}>
            {securityEmail}
          </a>{' '}
          (PGP optional). Please:
        </p>
        <ul className="list-disc space-y-3 pl-5">
          <li>Do not access data that is not yours, degrade our service, or violate laws.</li>
          <li>Give us reasonable time to investigate and remediate before public disclosure.</li>
          <li>Provide enough detail to reproduce the issue. We will acknowledge valid reports and keep you updated.</li>
        </ul>
      </ArticleSection>

      <ArticleSection title="Sub-processors">
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
      </ArticleSection>

      <ArticleSection title="What to do next (internal checklist)">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          The following actions ensure ongoing compliance and clarity for visitors:
        </p>
        <ul className="list-disc space-y-3 pl-5">
          <li>Confirm public-facing entity details (legal name, registration number, and registered address).</li>
          <li>Launch dedicated inboxes (privacy@, legal@, security@) and route to responsible owners.</li>
          <li>
            Implement a consent-based cookie banner that blocks non-essential cookies until accepted and includes a
            visible &ldquo;Cookie settings&rdquo; link in the footer. Guidance:{' '}
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
      </ArticleSection>
    </section>
  );
}

export default SecurityContent;
