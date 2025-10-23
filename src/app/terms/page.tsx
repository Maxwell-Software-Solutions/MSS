import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactElement } from 'react';

export const metadata: Metadata = {
  title: 'Terms of Service — Maxwell Software Solutions',
  description: 'The conditions that govern use of the Maxwell Software Solutions website and related content.',
  alternates: {
    canonical: '/terms',
  },
};

const effectiveDate = '6 October 2025';
const legalEmail = 'legal@maxwellsoftwaresolutions.com';

export default function TermsPage(): ReactElement {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12 text-slate-700 dark:text-slate-200 sm:px-10">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[color:var(--accent)]">Terms of Service</p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          Maxwell Software Solutions Terms of Service
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Effective date: {effectiveDate}</p>
        <p className="max-w-2xl text-base leading-relaxed">
          These Terms govern your use of maxwellsoftwaresolutions.com and related pages (collectively, the “Site”) and
          describe the conditions under which you may submit information through the Site. If we work together under a
          separate proposal or statement of work (SOW), that contract governs the services. These Site Terms cover
          website use only.
        </p>
      </header>

      <section className="mt-12 space-y-10">
        <article className="space-y-3">
          <h2 className="flex items-baseline gap-3 text-xl font-semibold text-slate-900 dark:text-slate-100">
            <span className="text-sm font-bold text-[color:var(--accent)]">1.</span>
            Who we are &amp; scope
          </h2>
          <p>
            Maxwell Software Solutions operates the Site to share information about our software quality audits, testing
            strategy, refactoring, and observability services. By accessing or using the Site, you agree to these Terms.
            Site content is provided for general informational purposes and does not amend any signed agreements between
            you and us.
          </p>
        </article>

        <article className="space-y-3">
          <h2 className="flex items-baseline gap-3 text-xl font-semibold text-slate-900 dark:text-slate-100">
            <span className="text-sm font-bold text-[color:var(--accent)]">2.</span>
            Acceptable use
          </h2>
          <p>
            You agree not to misuse the Site, including attempting unauthorised access, probing or scanning for
            vulnerabilities, scraping without permission, or interfering with the Site’s operation or security controls.
          </p>
        </article>

        <article className="space-y-3">
          <h2 className="flex items-baseline gap-3 text-xl font-semibold text-slate-900 dark:text-slate-100">
            <span className="text-sm font-bold text-[color:var(--accent)]">3.</span>
            Intellectual property
          </h2>
          <p>
            All Site content—including text, graphics, logos, case study formats, and layout—is owned by Maxwell
            Software Solutions or our licensors and is protected by applicable intellectual property laws. You may link
            to public pages and share brief excerpts with attribution, but you may not republish, redistribute, or
            commercially reuse Site materials without our prior written permission.
          </p>
        </article>

        <article className="space-y-3">
          <h2 className="flex items-baseline gap-3 text-xl font-semibold text-slate-900 dark:text-slate-100">
            <span className="text-sm font-bold text-[color:var(--accent)]">4.</span>
            Third-party links
          </h2>
          <p>
            The Site may include links to third-party websites or tools. We do not control and are not responsible for
            the content, policies, or practices of those third parties. Access linked resources at your own discretion.
          </p>
        </article>

        <article className="space-y-3">
          <h2 className="flex items-baseline gap-3 text-xl font-semibold text-slate-900 dark:text-slate-100">
            <span className="text-sm font-bold text-[color:var(--accent)]">5.</span>
            Privacy &amp; cookies
          </h2>
          <p>
            Your use of the Site is also governed by our{' '}
            <Link className="text-[color:var(--accent)] underline-offset-4 hover:underline" href="/privacy">
              Privacy Policy
            </Link>{' '}
            and the cookie practices described there. Please review that policy to understand how we collect and use
            personal data.
          </p>
        </article>

        <article className="space-y-3">
          <h2 className="flex items-baseline gap-3 text-xl font-semibold text-slate-900 dark:text-slate-100">
            <span className="text-sm font-bold text-[color:var(--accent)]">6.</span>
            Disclaimers
          </h2>
          <p>
            The Site is provided on an “as is” and “as available” basis. To the fullest extent permitted by law, we
            disclaim all warranties, whether express, implied, or statutory—including merchantability, fitness for a
            particular purpose, accuracy, and non-infringement. Information on the Site is general in nature and does
            not constitute tailored advice.
          </p>
        </article>

        <article className="space-y-3">
          <h2 className="flex items-baseline gap-3 text-xl font-semibold text-slate-900 dark:text-slate-100">
            <span className="text-sm font-bold text-[color:var(--accent)]">7.</span>
            Limitation of liability
          </h2>
          <p>
            To the maximum extent permitted by law, Maxwell Software Solutions is not liable for any indirect,
            incidental, consequential, special, or punitive damages, or for lost profits, lost data, or business
            interruption arising from Site use. Our total aggregate liability for claims related to Site use is limited
            to €100. This limitation does not apply to liability that cannot be excluded by law.
          </p>
        </article>

        <article className="space-y-3">
          <h2 className="flex items-baseline gap-3 text-xl font-semibold text-slate-900 dark:text-slate-100">
            <span className="text-sm font-bold text-[color:var(--accent)]">8.</span>
            Changes
          </h2>
          <p>
            We may modify these Terms at any time. When changes occur, we will update the effective date above and, for
            material changes, provide a prominent notice on the Site.
          </p>
        </article>

        <article className="space-y-3">
          <h2 className="flex items-baseline gap-3 text-xl font-semibold text-slate-900 dark:text-slate-100">
            <span className="text-sm font-bold text-[color:var(--accent)]">9.</span>
            Governing law &amp; venue
          </h2>
          <p>
            These Terms are governed by the laws of the Republic of Lithuania. Disputes arising from or relating to the
            Site will be resolved by the competent courts of Vilnius, except where mandatory law provides otherwise for
            EU consumer users.
          </p>
        </article>

        <article className="space-y-3">
          <h2 className="flex items-baseline gap-3 text-xl font-semibold text-slate-900 dark:text-slate-100">
            <span className="text-sm font-bold text-[color:var(--accent)]">10.</span>
            Contact
          </h2>
          <p>If you have questions about these Terms or the Site, contact us at:</p>
          <dl className="space-y-2">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                Email
              </dt>
              <dd>
                <a
                  className="text-[color:var(--accent)] underline-offset-4 hover:underline"
                  href={`mailto:${legalEmail}`}
                >
                  {legalEmail}
                </a>
              </dd>
            </div>
          </dl>
        </article>
      </section>
    </main>
  );
}
