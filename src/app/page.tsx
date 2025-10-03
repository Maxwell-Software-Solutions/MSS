import type { ReactElement } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import DeferredClient from './components/DeferredClient';
import Link from 'next/link';
// Use client wrapper for ParticleField (avoids ssr:false dynamic inside server component)
import HeroFieldWrapper from './components/HeroFieldWrapper';
import DeferredSections from './components/DeferredSections';

// Dynamically import non-critical components
const ClientLogos = dynamic(() => import('@/app/components/ClientLogos'), {
  loading: () => <div className="h-20 bg-gray-100 animate-pulse rounded" />,
  ssr: true,
});
// Code-split non-critical sections (improves initial bundle & TTI)

export default function Home(): ReactElement {
  return (
    <main className="min-h-screen font-sans" id="main-content">
      <section className="relative hero-gradient section overflow-hidden">
        {/* Decorative background layers */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -top-1/3 left-1/2 -translate-x-1/2 w-[120rem] h-[120rem] bg-accent/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 -left-1/4 w-[60rem] h-[60rem] bg-accent/10 rounded-full blur-2xl" />
        </div>
        <div className="container relative">
          <div className="text-center max-w-4xl mx-auto" data-reveal>
            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight leading-[1.05]">Build with confidence.</h1>
            <p className="mt-6 text-xl sm:text-2xl text-foreground/70 leading-snug">
              Ship reliable software through code quality audits, testing strategy, refactoring, and observability.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <a href="/contact" className="btn btn-accent px-8 py-3 text-base sm:text-lg shadow-soft">
                Request a code audit
              </a>
              <a href="/services" className="btn btn-ghost px-8 py-3 text-base sm:text-lg">
                Explore services
              </a>
            </div>
            <p className="mt-6 text-xs uppercase tracking-[0.25em] text-foreground/50 font-medium">
              QUALITY • RELIABILITY • VELOCITY
            </p>
          </div>
          <HeroFieldWrapper />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3" data-reveal>
            <div className="card shadow-soft p-5 text-center">
              <div className="text-2xl font-semibold">-60%</div>
              <div className="muted text-sm">Escaped defects</div>
            </div>
            <div className="card shadow-soft p-5 text-center">
              <div className="text-2xl font-semibold">+35%</div>
              <div className="muted text-sm">Test coverage</div>
            </div>
            <div className="card shadow-soft p-5 text-center">
              <div className="text-2xl font-semibold">-45%</div>
              <div className="muted text-sm">MTTR</div>
            </div>
          </div>
          {/* Value propositions */}
          <div
            className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4"
            data-reveal
            aria-label="Key value propositions"
          >
            {[
              {
                title: 'Independent insight',
                body: 'Objective code quality audits that uncover structural risk, hidden complexity, and testing blind spots.',
              },
              {
                title: 'Faster iteration',
                body: 'Refactoring & architecture guidance that reduces cycle time and improves developer confidence.',
              },
              {
                title: 'Reliability focus',
                body: 'Observability patterns, failure-mode analysis, and guardrails that harden production systems.',
              },
              {
                title: 'Measurable outcomes',
                body: 'We align on baselines, instrument improvements, and report tangible engineering impact.',
              },
            ].map((v) => (
              <div key={v.title} className="card p-5 shadow-soft h-full flex flex-col">
                {/* Promote to h2 to establish correct hierarchy before any h3 usage */}
                <h2 className="font-semibold text-lg tracking-tight">{v.title}</h2>
                <p className="mt-2 text-sm text-foreground/80 leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <DeferredClient
        fallback={<div className="h-20 bg-gray-100 animate-pulse rounded" aria-hidden="true" />}
        minHeight="5rem"
      >
        <ClientLogos />
      </DeferredClient>
      {/* Full-bleed banner */}
      <section>
        <div className="container" data-reveal>
          <div className="full-image">
            <Image
              src="/images/banner-fullbleed.svg"
              alt="Abstract full-bleed banner"
              width={2400}
              height={640}
              sizes="(min-width: 1024px) 1024px, 100vw"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Capabilities overview */}
      <section
        className="px-6 sm:px-10 py-20 border-t border-foreground/10 bg-background/50"
        aria-labelledby="capabilities-heading"
      >
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <h2 id="capabilities-heading" className="text-3xl sm:text-4xl font-semibold tracking-tight">
              Capabilities
            </h2>
            <p className="mt-4 text-foreground/80 leading-relaxed">
              Deep focus on software quality, sustainable velocity, and operational excellence. We embed alongside your
              team to reduce risk and accelerate delivery.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" data-reveal>
            {[
              {
                icon: '🧪',
                title: 'Testing Strategy',
                body: 'Layered test architectures, mutation & coverage analysis, flakiness reduction.',
              },
              {
                icon: '📦',
                title: 'Refactoring',
                body: 'Modularization, domain boundaries, incremental strangler patterns.',
              },
              {
                icon: '🔍',
                title: 'Observability',
                body: 'SLO design, trace-driven diagnostics, proactive error budgets.',
              },
              {
                icon: '🛡️',
                title: 'Reliability',
                body: 'Chaos rehearsal, failure mode reviews, incident response hardening.',
              },
            ].map((c) => (
              <div key={c.title} className="card p-6 shadow-soft flex flex-col" aria-label={c.title}>
                <div className="text-2xl" aria-hidden="true">
                  {c.icon}
                </div>
                <h3 className="mt-3 font-medium tracking-tight">{c.title}</h3>
                <p className="mt-2 text-sm text-foreground/75 leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="px-6 sm:px-10 py-16 border-t border-foreground/10">
        <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-semibold">About</h2>
            <p className="mt-3 text-foreground/80">
              This is a clean starting point. Ask for layout, color, or content changes and I’ll implement them
              immediately.
            </p>
          </div>
          <div className="rounded-lg border border-foreground/10 p-4">
            <p className="text-sm text-foreground/70">
              Tip: say something like “Make the hero background a subtle gradient and add a CTA button that links to
              /contact”.
            </p>
          </div>
        </div>
      </section>

      {/* Process timeline */}
      <section
        className="px-6 sm:px-10 py-20 border-t border-foreground/10 bg-background/30"
        aria-labelledby="process-heading"
      >
        <div className="max-w-6xl mx-auto" data-reveal>
          <h2 id="process-heading" className="text-3xl sm:text-4xl font-semibold tracking-tight">
            How engagements work
          </h2>
          <ol className="mt-10 relative border-s border-foreground/15 pl-8 space-y-10">
            {[
              {
                step: '01',
                title: 'Technical discovery',
                body: 'Architecture & repository review, quality baselining, risk surfacing, metric capture.',
              },
              {
                step: '02',
                title: 'Roadmap alignment',
                body: 'Define target outcomes, select focus areas, establish success criteria.',
              },
              {
                step: '03',
                title: 'Enable & uplift',
                body: 'Refactoring spikes, test harness improvements, observability instrumentation.',
              },
              {
                step: '04',
                title: 'Measurement & handoff',
                body: 'Quantify impact, transfer knowledge, create sustaining playbooks.',
              },
            ].map((s, idx) => (
              <li key={s.step} className="group">
                <div
                  className="absolute -left-[13px] mt-1 w-6 h-6 rounded-full border bg-background group-hover:bg-accent/10 transition"
                  aria-hidden="true"
                />
                <div className="flex flex-col gap-1">
                  <span className="text-xs tracking-wide font-mono text-foreground/60">{s.step}</span>
                  <h3 className="font-medium tracking-tight text-lg">{s.title}</h3>
                  <p className="text-sm text-foreground/75 leading-relaxed max-w-prose">{s.body}</p>
                </div>
                {idx < 3 && (
                  <div
                    className="absolute left-[-1px] top-8 bottom-0 border-s border-dashed border-foreground/15"
                    aria-hidden="true"
                  />
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="projects" className="hairline">
        <div className="container section">
          <div className="eyebrow">Selected work</div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Case studies</h2>
          <p className="mt-3 text-foreground/70 max-w-2xl text-sm">
            Real engagements with measurable outcomes. Each links to a concise deep‑dive.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" data-reveal>
            {[
              {
                slug: 'retail-platform',
                title: 'Retail platform',
                meta: 'E‑commerce · 6 mo',
                outcome: 'Escaped defects down 58%',
                metrics: ['-58% defects', '+28% deploys', '+12 CSAT'],
                image: '/images/case-studies/retail-platform.svg',
              },
              {
                slug: 'fintech-api',
                title: 'Fintech API',
                meta: 'Fintech · 3 mo',
                outcome: 'Coverage up 32%',
                metrics: ['+32% coverage', '-24% incidents', '-18% p99'],
                image: '/images/case-studies/fintech-api.svg',
              },
              {
                slug: 'saas-migration',
                title: 'SaaS migration',
                meta: 'B2B SaaS · 4 mo',
                outcome: 'MTTR down 45%',
                metrics: ['-45% MTTR', '-60% noise', '4/4 SLOs'],
                image: '/images/case-studies/saas-migration.svg',
              },
            ].map((c) => (
              <Link
                key={c.slug}
                href={`/project-showcase/${c.slug}`}
                className="group card shadow-soft overflow-hidden flex flex-col"
                aria-label={`${c.title} case study`}
              >
                <div className="relative h-32 overflow-hidden">
                  <Image
                    src={c.image}
                    alt={c.title}
                    fill
                    unoptimized
                    sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                    className="object-cover group-hover:scale-[1.03] transition-transform"
                  />
                </div>
                <div className="p-5 flex flex-col grow">
                  <div className="text-xs text-foreground/50 mb-1 flex items-center gap-2">
                    <span>{c.meta}</span>
                    <span className="h-1 w-1 rounded-full bg-foreground/30" />
                    <span className="text-accent font-medium">{c.outcome}</span>
                  </div>
                  <h3 className="font-semibold tracking-tight group-hover:text-accent transition-colors">{c.title}</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {c.metrics.map((m) => (
                      <span
                        key={m}
                        className="text-[11px] font-medium px-2 py-1 rounded-md bg-foreground/5 border border-foreground/10 text-foreground/60"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                  <span className="mt-auto pt-4 text-xs text-accent/80 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    View study
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className="opacity-70"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/project-showcase" className="btn btn-ghost">
              Browse all case studies
            </Link>
          </div>
        </div>
      </section>

      <section id="contact" className="px-6 sm:px-10 py-16 border-t border-foreground/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold">Contact</h2>
          <p className="mt-3 text-foreground/80">
            Tell me what you want here (form, links, social icons), and I’ll add it.
          </p>
          <div className="mt-8 max-w-xl">
            <div className="card p-6 shadow-soft">
              <h3 className="font-medium tracking-tight">Start the conversation</h3>
              <p className="mt-2 text-sm text-foreground/75 leading-relaxed">
                Outline your current challenges and desired outcomes. You will receive a rapid response with an initial
                diagnostic perspective and next-step options.
              </p>
              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <a href="/contact" className="btn btn-accent">
                  Request intro call
                </a>
                <a href="/services" className="btn btn-ghost">
                  View detailed services
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <DeferredSections />
    </main>
  );
}
