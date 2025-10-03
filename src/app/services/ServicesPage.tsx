import type { ReactElement } from 'react';
import { services } from './services-data';
import { processSteps } from './process-data';
import ServiceCard from '@/app/components/ui/ServiceCard';
import ProcessTimeline from '@/app/components/ui/ProcessTimeline';
import CTA from '@/app/components/ui/CTA';

// Premium Services & Process page implementation.
// Applies: unified spacing rhythm, typography clamps, consistent cards, guided timeline, CTA band.
export default function ServicesPage(): ReactElement {
  const mappedServices = services.map((s) => ({
    key: s.key,
    title: s.title,
    summary: s.body,
    imageAlt: s.alt,
    meta: s.tagline,
    tone: s.featured ? 'accent' : 'default',
  }));
  const steps = processSteps.map((p) => ({ title: p.title, desc: p.text }));

  return (
    <div className="font-sans bg-[--page-bg] text-neutral-900 dark:text-neutral-50 [--card:#ffffff] dark:[--card:#0f172a] [--muted:#64748b] dark:[--muted:#94a3b8] [--border:rgba(2,6,23,0.08)] dark:[--border:rgba(255,255,255,0.12)]">
      {/* Hero */}
      <header className="max-w-7xl mx-auto px-6 md:px-8 pt-16 pb-4">
        <p className="tracking-wide text-[13px] text-slate-500 dark:text-slate-400 mb-3">Expert partnership</p>
        <h1 className="font-semibold leading-[1.1] max-w-3xl text-[clamp(36px,3.6vw,56px)]">Services & Process</h1>
        <p className="mt-6 max-w-3xl text-base md:text-lg leading-[1.6] text-[--muted]">
          We help teams ship correct, maintainable, and observable software with measurable improvements.
        </p>
        <p className="mt-4 max-w-3xl text-base leading-[1.6] text-[--muted]">
          Focused engagements amplify engineering effectiveness: faster iteration, observable systems, and measurable
          reliability gains.
        </p>
        <p className="mt-3 max-w-2xl text-sm text-[--muted]">
          Start lightweight—prove value quickly, expand impact deliberately.
        </p>
      </header>

      {/* Services Section */}
      <section aria-labelledby="services-heading" className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col gap-6 md:gap-8">
          <div>
            <h2
              id="services-heading"
              className="text-[clamp(22px,2.2vw,28px)] font-semibold leading-[1.25] tracking-tight max-w-3xl"
            >
              Service Capabilities
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed max-w-3xl text-[--muted]">
              High-leverage interventions that reduce risk, accelerate delivery, and raise engineering throughput.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 auto-rows-fr gap-6 md:gap-8">
            {mappedServices.map((svc) => (
              <ServiceCard
                key={svc.key}
                title={svc.title}
                summary={svc.summary}
                imageAlt={svc.imageAlt}
                meta={svc.meta}
                tone={svc.tone as 'default' | 'accent'}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section aria-labelledby="process-heading" className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col gap-6 md:gap-8">
          <div>
            <h2
              id="process-heading"
              className="text-[clamp(22px,2.2vw,28px)] font-semibold leading-[1.25] tracking-tight max-w-3xl"
            >
              Consulting Process
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed max-w-3xl text-[--muted]">
              A guided, outcome-focused sequence—surface risk early, create leverage, and institutionalize improvements.
            </p>
          </div>
          <ProcessTimeline steps={steps} />
        </div>
      </section>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 pb-20">
        <CTA
          title="Book a discovery call"
          body="Explore fit, clarify goals, and identify the fastest path to measurable impact. No obligation, high signal."
          primary={{ href: '/contact', label: 'Book a discovery call' }}
          secondary={{ href: '/project-showcase', label: 'See case studies' }}
        />
      </div>
    </div>
  );
}
