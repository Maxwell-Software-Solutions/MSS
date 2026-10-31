'use client';

import type { ReactElement } from 'react';
import Link from 'next/link';
import { useHydratedTranslation } from '@/lib/useHydratedTranslation';
import { BOOKING_URL } from '@/lib/booking';
import { CheckIcon, ExternalIcon } from '@/app/components/ui';

export default function HireDeveloperPage(): ReactElement {
  const ht = useHydratedTranslation();

  const reasons = [
    {
      title: ht('hireDev.reason1.title', 'Start in days, not months'),
      body: ht('hireDev.reason1.body', 'Skip the 3-month hiring pipeline. Our senior engineers are available to start within 1-2 weeks of signing.'),
    },
    {
      title: ht('hireDev.reason2.title', 'Senior-level from day one'),
      body: ht('hireDev.reason2.body', 'No juniors, no ramp-up. Every engineer has 5+ years of production experience and a track record of shipping.'),
    },
    {
      title: ht('hireDev.reason3.title', 'No recruitment fees'),
      body: ht('hireDev.reason3.body', 'Hiring agencies charge 20-30% of annual salary. With us, you pay for engineering output — not a finder\'s fee.'),
    },
    {
      title: ht('hireDev.reason4.title', 'Flexible commitment'),
      body: ht('hireDev.reason4.body', 'Scale up or down month-to-month. No long-term lock-in. Pause or stop when the project is done.'),
    },
  ];

  const techStack = [
    'React', 'Next.js', 'Node.js', 'TypeScript', 'AWS', 'Docker', 'CI/CD', 'PostgreSQL',
  ];

  const engagements = [
    {
      name: ht('hireDev.engagement1.name', 'Sprint-in-a-Box'),
      price: ht('hireDev.engagement1.price', '€4,800'),
      period: ht('hireDev.engagement1.period', 'fixed price'),
      description: ht('hireDev.engagement1.desc', 'A focused 2-week delivery sprint. Ideal for MVPs, proof-of-concepts, or shipping a specific feature fast.'),
      href: '/start-a-sprint',
    },
    {
      name: ht('hireDev.engagement2.name', 'Engineering Partner Retainer'),
      price: ht('hireDev.engagement2.price', '€3,500–€6,500'),
      period: ht('hireDev.engagement2.period', '/month'),
      description: ht('hireDev.engagement2.desc', 'A dedicated senior engineer, 3-5 days per week. Ongoing delivery, code review, architecture guidance, and async access.'),
      href: '/contact',
    },
  ];

  return (
    <>
      <header className="wrap page-head">
        <div className="eyebrow" suppressHydrationWarning>
          {ht('hireDev.eyebrow', 'Hire a Developer')}
        </div>
        <h1 suppressHydrationWarning>Hire a Senior Developer — Without the 3-Month Wait</h1>
        <p className="lead" suppressHydrationWarning>
          {ht(
            'hireDev.subheadline',
            'Outsource development to senior engineers in Lithuania and Europe. Start shipping production-ready code in days — not months.'
          )}
        </p>

        <div className="page-actions">
          <Link
            href={BOOKING_URL}
            className="btn btn-accent btn-lg"
            target="_blank"
            rel="noopener noreferrer"
            suppressHydrationWarning
          >
            {ht('hireDev.cta.primary', 'Book a discovery call')}
            <ExternalIcon />
          </Link>
          <Link href="/services/packages" className="btn btn-lg" suppressHydrationWarning>
            {ht('hireDev.cta.compare', 'Compare all packages')}
          </Link>
        </div>

        <div className="assurances">
          {[
            ht('hireDev.trust.start', 'Start in 1-2 weeks'),
            ht('hireDev.trust.senior', '5+ years experience'),
            ht('hireDev.trust.flex', 'No long-term contract'),
          ].map((item, i) => (
            <span key={i} suppressHydrationWarning>
              <CheckIcon />
              {item}
            </span>
          ))}
        </div>
      </header>

      <section aria-labelledby="reasons-heading" className="section">
        <div className="wrap">
          <h2 id="reasons-heading" className="section-head" suppressHydrationWarning>
            {ht('hireDev.reasons.heading', 'Why outsource to MSS')}
          </h2>
          <div className="columns columns-2" suppressHydrationWarning>
            {reasons.map((item, i) => (
              <div key={i} className="item">
                <h3>{item.title}</h3>
                <p className="measure">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="stack-heading" className="section section-tone">
        <div className="wrap split">
          <div>
            <h2 id="stack-heading" suppressHydrationWarning>
              {ht('hireDev.stack.heading', 'Tech stack')}
            </h2>
            <p className="lead" suppressHydrationWarning>
              {ht('hireDev.stack.body', 'Our engineers specialise in the modern web stack. If your project uses these technologies, we can hit the ground running.')}
            </p>
          </div>
          <div className="tag-list" suppressHydrationWarning>
            {techStack.map((tech) => (
              <span key={tech} className="tag">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="engagements-heading" className="section">
        <div className="wrap">
          <h2 id="engagements-heading" className="section-head" suppressHydrationWarning>
            {ht('hireDev.engagements.heading', 'Engagement models')}
          </h2>
          <div className="tiers tiers-2" suppressHydrationWarning>
            {engagements.map((eng) => (
              <div key={eng.name} className="tier">
                <div className="tier-name">
                  <h3>{eng.name}</h3>
                </div>
                <div className="price">{eng.price}</div>
                {eng.period && <div className="price-period">{eng.period}</div>}
                <p className="tier-for measure mb-6 flex-1 text-base">{eng.description}</p>
                <Link href={eng.href} className="btn" suppressHydrationWarning>
                  {ht('hireDev.engagements.cta', 'Learn more')}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap band-split">
          <h2 suppressHydrationWarning>Ship faster with senior engineers.</h2>
          <p suppressHydrationWarning>
            {ht(
              'hireDev.bottomcta.body',
              'No recruitment fees. No ramp-up. Production-ready code from senior engineers who have shipped before.'
            )}
          </p>
          <Link
            href={BOOKING_URL}
            className="btn btn-accent btn-lg"
            target="_blank"
            rel="noopener noreferrer"
            suppressHydrationWarning
          >
            {ht('hireDev.bottomcta.cta', 'Book a discovery call')}
            <ExternalIcon />
          </Link>
        </div>
      </section>
    </>
  );
}
