import Link from 'next/link';
import type { ReactElement } from 'react';

const effectiveDate = '6 October 2025';
const privacyEmail = 'privacy@maxwellsoftwaresolutions.com';

export default function PrivacyPage(): ReactElement {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12 text-slate-700 dark:text-slate-200 sm:px-10">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[color:var(--accent)]">
          Privacy Policy (GDPR)
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          Maxwell Software Solutions Privacy Policy
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Effective date: {effectiveDate}</p>
        <p className="max-w-2xl text-base leading-relaxed">
          Maxwell Software Solutions (“we”, “us”, “our”) provides software quality audits, testing strategy,
          refactoring, and observability services. This policy explains how we handle personal data in line with the
          General Data Protection Regulation (GDPR).
        </p>
      </header>

      <section className="mt-12 space-y-8">
        <article className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Summary</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              We collect only the information needed to respond to enquiries, deliver services, and improve our site.
            </li>
            <li>
              You have GDPR rights to access, correct, delete, and object to the processing of your personal data.
            </li>
            <li>We never sell your personal data.</li>
          </ul>
        </article>

        <article className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Data we collect</h2>
          <ul className="list-disc space-y-3 pl-5">
            <li>
              <strong>Contact data:</strong> name, work email, company, and message details when you request an audit or
              contact us.
            </li>
            <li>
              <strong>Usage data:</strong> basic analytics such as page views, referrers, and device type. We rely on
              strictly necessary cookies and, with your consent, analytics cookies. See “Cookies &amp; analytics” below.
            </li>
            <li>
              <strong>Client engagement data (B2B):</strong> statements of work, project notes, and invoices retained
              only to meet contractual and legal obligations.
            </li>
          </ul>
        </article>

        <article className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            Why we process your data (lawful bases)
          </h2>
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
        </article>

        <article className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Cookies &amp; analytics</h2>
          <p>
            We use essential cookies that are required for core site functionality. We ask for opt-in consent before
            setting any non-essential (e.g., analytics) cookies and provide controls to decline or adjust your choices.
            No non-essential cookies are set until you accept.
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
            “Cookie settings” link in our footer.
          </p>
        </article>

        <article className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Data sharing</h2>
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
        </article>

        <article className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">International transfers</h2>
          <p>
            When personal data leaves the European Economic Area, we use appropriate safeguards such as Standard
            Contractual Clauses and assess transfer risk to maintain equivalent protection.
          </p>
        </article>

        <article className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Data retention</h2>
          <ul className="list-disc space-y-3 pl-5">
            <li>
              <strong>Contact enquiries:</strong> typically retained for up to 12 months after our last interaction.
            </li>
            <li>
              <strong>Client records:</strong> retained for the contract term plus mandatory legal retention periods
              (e.g., accounting).
            </li>
            <li>
              <strong>Analytics:</strong> aggregated or pseudonymised metrics retained only as long as necessary for
              insights.
            </li>
          </ul>
        </article>

        <article className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Your rights</h2>
          <p>
            Under the GDPR you may request access, correction, erasure, portability, and restriction or objection to
            processing. You may also withdraw consent at any time.
          </p>
          <p>
            To exercise your rights or ask questions, email{' '}
            <a
              className="text-[color:var(--accent)] underline-offset-4 hover:underline"
              href={`mailto:${privacyEmail}`}
            >
              {privacyEmail}
            </a>
            .
          </p>
          <p>
            If we cannot resolve your concerns, you may contact Lithuania’s supervisory authority, the{' '}
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
        </article>

        <article className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Security</h2>
          <p>
            We apply encryption in transit, access controls, and least-privilege principles to protect personal data.
            Learn more about our technical and organisational measures on our{' '}
            <Link className="text-[color:var(--accent)] underline-offset-4 hover:underline" href="/security">
              Security page
            </Link>
            .
          </p>
        </article>

        <article className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Controller details</h2>
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
        </article>

        <article className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Updates</h2>
          <p>
            We may update this policy in response to legal, technical, or business changes. When we do, we will revise
            the effective date above and, for material updates, provide notice on this site.
          </p>
        </article>
      </section>
    </main>
  );
}
