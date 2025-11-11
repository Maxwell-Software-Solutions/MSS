import type { ReactElement, ReactNode } from 'react';
import Link from 'next/link';

interface TermsContentProps {
  legalEmail: string;
}

interface TermsSectionProps {
  number: number;
  title: string;
  children: ReactNode;
}

function TermsSection({ number, title, children }: TermsSectionProps): ReactElement {
  return (
    <article className="space-y-3">
      <h2 className="flex items-baseline gap-3 text-xl font-semibold text-slate-900 dark:text-slate-100">
        <span className="text-sm font-bold text-[color:var(--accent)]">{number}.</span>
        {title}
      </h2>
      {children}
    </article>
  );
}

export function TermsContent({ legalEmail }: TermsContentProps): ReactElement {
  return (
    <section className="mt-12 space-y-10">
      <TermsSection number={1} title="Who we are & scope">
        <p>
          Maxwell Software Solutions operates the Site to share information about our software quality audits, testing
          strategy, refactoring, and observability services. By accessing or using the Site, you agree to these Terms.
          Site content is provided for general informational purposes and does not amend any signed agreements between
          you and us.
        </p>
      </TermsSection>

      <TermsSection number={2} title="Acceptable use">
        <p>
          You agree not to misuse the Site, including attempting unauthorised access, probing or scanning for
          vulnerabilities, scraping without permission, or interfering with the Site&apos;s operation or security
          controls.
        </p>
      </TermsSection>

      <TermsSection number={3} title="Intellectual property">
        <p>
          All Site content&mdash;including text, graphics, logos, case study formats, and layout&mdash;is owned by
          Maxwell Software Solutions or our licensors and is protected by applicable intellectual property laws. You may
          link to public pages and share brief excerpts with attribution, but you may not republish, redistribute, or
          commercially reuse Site materials without our prior written permission.
        </p>
      </TermsSection>

      <TermsSection number={4} title="Third-party links">
        <p>
          The Site may include links to third-party websites or tools. We do not control and are not responsible for the
          content, policies, or practices of those third parties. Access linked resources at your own discretion.
        </p>
      </TermsSection>

      <TermsSection number={5} title="Privacy & cookies">
        <p>
          Your use of the Site is also governed by our{' '}
          <Link className="text-[color:var(--accent)] underline-offset-4 hover:underline" href="/privacy">
            Privacy Policy
          </Link>{' '}
          and the cookie practices described there. Please review that policy to understand how we collect and use
          personal data.
        </p>
      </TermsSection>

      <TermsSection number={6} title="Disclaimers">
        <p>
          The Site is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. To the fullest extent
          permitted by law, we disclaim all warranties, whether express, implied, or statutory&mdash;including
          merchantability, fitness for a particular purpose, accuracy, and non-infringement. Information on the Site is
          general in nature and does not constitute tailored advice.
        </p>
      </TermsSection>

      <TermsSection number={7} title="Limitation of liability">
        <p>
          To the maximum extent permitted by law, Maxwell Software Solutions is not liable for any indirect, incidental,
          consequential, special, or punitive damages, or for lost profits, lost data, or business interruption arising
          from Site use. Our total aggregate liability for claims related to Site use is limited to €100. This
          limitation does not apply to liability that cannot be excluded by law.
        </p>
      </TermsSection>

      <TermsSection number={8} title="Changes">
        <p>
          We may modify these Terms at any time. When changes occur, we will update the effective date above and, for
          material changes, provide a prominent notice on the Site.
        </p>
      </TermsSection>

      <TermsSection number={9} title="Governing law & venue">
        <p>
          These Terms are governed by the laws of the Republic of Lithuania. Disputes arising from or relating to the
          Site will be resolved by the competent courts of Vilnius, except where mandatory law provides otherwise for EU
          consumer users.
        </p>
      </TermsSection>

      <TermsSection number={10} title="Contact">
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
      </TermsSection>
    </section>
  );
}

export default TermsContent;
