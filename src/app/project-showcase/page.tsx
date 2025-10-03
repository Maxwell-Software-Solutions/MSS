import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Case Studies — Maxwell Software Solutions',
  description: 'Real results from code quality and reliability engagements.',
};

const studies = [
  {
    slug: 'retail-platform',
    title: 'Retail platform — escaped defects down 58%',
    summary: 'Stabilized CI, added SLOs, refactored brittle modules.',
    image: '/images/case-studies/retail-platform.svg',
    meta: 'E‑commerce · Node/Next · 6 months',
  },
  {
    slug: 'fintech-api',
    title: 'Fintech API — coverage up 32%',
    summary: 'Contract + golden tests, faster incident resolution.',
    image: '/images/case-studies/fintech-api.svg',
    meta: 'Fintech · Go/TypeScript · 3 months',
  },
  {
    slug: 'saas-migration',
    title: 'SaaS migration — MTTR down 45%',
    summary: 'Observability, SLOs, and automated runbooks.',
    image: '/images/case-studies/saas-migration.svg',
    meta: 'B2B SaaS · Kubernetes · 4 months',
  },
];

export default function CaseStudiesIndex(): ReactElement {
  return (
    <div className="container section" data-reveal>
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Case studies</h1>
      <p className="mt-3 lead max-w-2xl">
        Selected results across industries. Each study includes context, actions, and measurable outcomes.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" data-reveal>
        {studies.map((c) => (
          <Link
            key={c.slug}
            href={`/project-showcase/${c.slug}`}
            className="card shadow-soft block overflow-hidden group"
          >
            <div className="relative h-36">
              <Image
                src={c.image}
                alt={c.title}
                fill
                unoptimized
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover group-hover:scale-[1.02] transition-transform"
              />
            </div>
            <div className="p-5">
              <div className="text-xs text-foreground/60 mb-1">{c.meta}</div>
              <h2 className="text-lg font-semibold group-hover:text-accent transition-colors">{c.title}</h2>
              <p className="mt-2 text-sm text-foreground/80">{c.summary}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
