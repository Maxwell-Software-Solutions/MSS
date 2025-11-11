import type { ReactElement } from 'react';
import Link from 'next/link';
import { ArticleSection, ListSection } from '@/app/components/ui';

interface PrivacyContentProps {
  privacyEmail: string;
}

export function PrivacyContent({ privacyEmail }: PrivacyContentProps): ReactElement {
  return (
    <section className="mt-12 space-y-8">
      <ListSection
        title="Summary"
        items={[
          'We collect only the information needed to respond to enquiries, deliver services, and improve our site.',
          'You have GDPR rights to access, correct, delete, and object to the processing of your personal data.',
          'We never sell your personal data.',
        ]}
        listClassName="space-y-2"
      />

      <ListSection
        title="Data we collect"
        items={[
          <>
            <strong>Contact data:</strong> name, work email, company, and message details when you request an audit or
            contact us.
          </>,
          <>
            <strong>Usage data:</strong> basic analytics such as page views, referrers, and device type. We rely on
            strictly necessary cookies and, with your consent, analytics cookies. See &ldquo;Cookies &amp;
            analytics&rdquo; below.
          </>,
          <>
            <strong>Client engagement data (B2B):</strong> statements of work, project notes, and invoices retained only
            to meet contractual and legal obligations.
          </>,
        ]}
      />

      <ArticleSection title="Why we process your data (lawful bases)">
        <p>
          We process personal data only when a lawful basis under{' '}
          <a
            className="text-[color:var(--accent)] underline-offset-4 hover:underline"
            href="https://gdpr-info.eu/art-6-gdpr/"
            target="_blank"
            rel="noreferrer"
          >
            GDPR Article 6
          </a>{' '}
          applies:
        </p>
        <ul className="list-disc space-y-3 pl-5">
          <li>
            <strong>Contract:</strong> to provide proposals, statements of work, and deliver the services you request.
          </li>
          <li>
            <strong>Legitimate interests:</strong> to secure our site, prevent abuse, and understand aggregated usage
            while balancing these interests against your rights.
          </li>
          <li>
            <strong>Consent:</strong> for non-essential cookies or analytics. You can withdraw consent at any time.
          </li>
        </ul>
      </ArticleSection>

      <ArticleSection title="Cookies & analytics">
        <p>
          We use essential cookies that are required for core site functionality. We ask for opt-in consent before
          setting any non-essential (e.g., analytics) cookies and provide controls to decline or adjust your choices. No
          non-essential cookies are set until you accept.
        </p>
        <p>
          For more on the GDPR and cookies, see{' '}
          <a
            className="text-[color:var(--accent)] underline-offset-4 hover:underline"
            href="https://gdpr.eu/cookies/"
            target="_blank"
            rel="noreferrer"
          >
            GDPR.eu
          </a>
          .
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Your choices: manage cookie preferences through the banner on your first visit and at any time via the
          &ldquo;Cookie settings&rdquo; link in our footer.
        </p>
      </ArticleSection>

      <ArticleSection title="Data sharing">
        <ul className="list-disc space-y-3 pl-5">
          <li>
            <strong>Service providers (sub-processors):</strong> hosting, email, analytics, and error monitoring
            partners that process data under confidentiality and data processing agreements.
          </li>
          <li>
            <strong>Legal compliance:</strong> when required to comply with the law or to protect rights, safety, and
            security.
          </li>
        </ul>
        <p>We do not rent or sell personal data.</p>
      </ArticleSection>

      <ArticleSection title="International transfers">
        <p>
          When personal data leaves the European Economic Area, we use appropriate safeguards such as Standard
          Contractual Clauses and assess transfer risk to maintain equivalent protection.
        </p>
      </ArticleSection>

      <ListSection
        title="Data retention"
        items={[
          <>
            <strong>Contact enquiries:</strong> typically retained for up to 12 months after our last interaction.
          </>,
          <>
            <strong>Client records:</strong> retained for the contract term plus mandatory legal retention periods
            (e.g., accounting).
          </>,
          <>
            <strong>Analytics:</strong> aggregated or pseudonymised metrics retained only as long as necessary for
            insights.
          </>,
        ]}
      />

      <ArticleSection title="Your rights">
        <p>
          Under the GDPR you may request access, correction, erasure, portability, and restriction or objection to
          processing. You may also withdraw consent at any time.
        </p>
        <p>
          To exercise your rights or ask questions, email{' '}
          <a className="text-[color:var(--accent)] underline-offset-4 hover:underline" href={`mailto:${privacyEmail}`}>
            {privacyEmail}
          </a>
          .
        </p>
        <p>
          If we cannot resolve your concerns, you may contact Lithuania&apos;s supervisory authority, the{' '}
          <a
            className="text-[color:var(--accent)] underline-offset-4 hover:underline"
            href="https://vdai.lrv.lt/en/"
            target="_blank"
            rel="noreferrer"
          >
            State Data Protection Inspectorate (VDAI)
          </a>
          .
        </p>
      </ArticleSection>

      <ArticleSection title="Security">
        <p>
          We apply encryption in transit, access controls, and least-privilege principles to protect personal data.
          Learn more about our technical and organisational measures on our{' '}
          <Link className="text-[color:var(--accent)] underline-offset-4 hover:underline" href="/security">
            Security page
          </Link>
          .
        </p>
      </ArticleSection>

      <ArticleSection title="Controller details">
        <dl className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
              Legal entity
            </dt>
            <dd className="mt-1">Maxwell Software Solutions, MB</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
              Company number
            </dt>
            <dd className="mt-1">Details available upon request.</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
              Email
            </dt>
            <dd className="mt-1">
              <a
                className="text-[color:var(--accent)] underline-offset-4 hover:underline"
                href={`mailto:${privacyEmail}`}
              >
                {privacyEmail}
              </a>
            </dd>
          </div>
        </dl>
      </ArticleSection>

      <ArticleSection title="Updates">
        <p>
          We may update this policy in response to legal, technical, or business changes. When we do, we will revise the
          effective date above and, for material updates, provide notice on this site.
        </p>
      </ArticleSection>
    </section>
  );
}

export default PrivacyContent;
