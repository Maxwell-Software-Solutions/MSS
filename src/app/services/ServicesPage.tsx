'use client';
import type { ReactElement } from 'react';
import Link from 'next/link';
import { aiServices, services, type ServiceItem } from './services-data';
import { processSteps } from './process-data';
import ServiceCard from '@/app/components/ui/ServiceCard';
import ProcessTimeline from '@/app/components/ui/ProcessTimeline';
import { useHydratedTranslation } from '@/lib/useHydratedTranslation';

export default function ServicesPage(): ReactElement {
  const ht = useHydratedTranslation();

  const cards = (list: ServiceItem[]): ReactElement[] =>
    list.map((s) => (
      <ServiceCard
        key={s.key}
        title={ht(`services.${s.key}.title`, s.title)}
        summary={ht(`services.${s.key}.body`, s.body)}
        imageAlt={s.alt}
        meta={ht(`services.${s.key}.tagline`, s.tagline)}
        tone={s.featured ? 'accent' : 'default'}
      />
    ));

  const steps = processSteps.map((p) => ({
    title: ht(`services.process.${p.title.toLowerCase()}.title`, p.title),
    desc: ht(`services.process.${p.title.toLowerCase()}.body`, p.text),
  }));

  return (
    <>
      <header className="wrap page-head">
        <div className="eyebrow" suppressHydrationWarning>
          {ht('services.hero.eyebrow', 'Services')}
        </div>
        <h1 suppressHydrationWarning>{ht('services.hero.title', 'AI services, built on solid engineering')}</h1>
        <p className="lead" suppressHydrationWarning>
          {ht(
            'services.hero.subtitle',
            'We help companies adopt AI, build AI agents and launch AI products, with the testing, monitoring and safe rollout that production needs.'
          )}
        </p>
        <p suppressHydrationWarning>
          {ht(
            'services.hero.description',
            'Every engagement starts from a business problem, not a model. We find where AI pays off, prove it with a working prototype, and take it into production inside your systems.'
          )}
        </p>
        <p suppressHydrationWarning>
          {ht('services.hero.note', 'Start with one use case, prove its value, then expand.')}
        </p>
      </header>

      <section aria-labelledby="ai-services-heading" className="section">
        <div className="wrap">
          <div className="section-head section-head-split">
            <h2 id="ai-services-heading" suppressHydrationWarning>
              {ht('services.ai.heading', 'AI services')}
            </h2>
            <p className="lead" suppressHydrationWarning>
              {ht(
                'services.ai.description',
                'Four ways to put AI to work, from the first strategy session to agents and products in daily use.'
              )}
            </p>
          </div>

          <div className="columns columns-2" suppressHydrationWarning>
            {cards(aiServices)}
          </div>
        </div>
      </section>

      <section aria-labelledby="services-heading" className="section">
        <div className="wrap">
          <div className="section-head section-head-split">
            <h2 id="services-heading" suppressHydrationWarning>
              {ht('services.heading', 'The engineering foundation')}
            </h2>
            <p className="lead" suppressHydrationWarning>
              {ht(
                'services.description',
                'AI features are still software. These services make them production-grade with audits, tests and evaluations, monitoring and safe rollout, and they stand on their own for any codebase.'
              )}
            </p>
          </div>

          <div className="columns columns-3" suppressHydrationWarning>
            {cards(services)}
          </div>
        </div>
      </section>

      <section aria-labelledby="process-heading" className="section section-tone">
        <div className="wrap">
          <div className="section-head section-head-split">
            <h2 id="process-heading" suppressHydrationWarning>
              {ht('services.process.heading', 'Our process')}
            </h2>
            <p className="lead" suppressHydrationWarning>
              {ht(
                'services.process.description',
                'A clear sequence from first question to a running system: find the value, prove it, build it properly and keep it working.'
              )}
            </p>
          </div>
          <ProcessTimeline steps={steps} />
        </div>
      </section>

      <section className="band" suppressHydrationWarning>
        <div className="wrap band-split">
          <h2 suppressHydrationWarning>{ht('services.cta.title', 'Book a discovery call')}</h2>
          <p suppressHydrationWarning>
            {ht(
              'services.cta.body',
              'Tell us about the process or product you have in mind. In one short call we look at fit, goals and the fastest path to a working result. No obligation.'
            )}
          </p>
          <div className="band-actions">
            <Link href="/contact" className="btn btn-accent btn-lg">
              {ht('services.cta.primary', 'Book a discovery call')}
            </Link>
            <Link href="/case-studies" className="btn btn-lg">
              {ht('services.cta.secondary', 'See case studies')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
