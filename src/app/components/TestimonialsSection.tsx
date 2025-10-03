import type { ReactElement } from 'react';

export default function TestimonialsSection(): ReactElement {
  return (
    <section className="px-6 sm:px-10 py-20 border-t border-foreground/10" aria-labelledby="testimonials-heading">
      <div className="max-w-6xl mx-auto" data-reveal>
        <h2 id="testimonials-heading" className="text-3xl sm:text-4xl font-semibold tracking-tight">
          Client perspective
        </h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {[
            {
              quote:
                'They reduced build flakiness and restructured our test pyramid—deployment confidence went up immediately.',
              author: 'VP Engineering, SaaS Platform',
            },
            {
              quote: 'Our critical path refactor shipped 6 weeks earlier with their architectural guidance.',
              author: 'Director of Engineering, FinTech',
            },
            {
              quote: 'Actionable audit, crisp patterns, and measurable reliability improvements across services.',
              author: 'Principal Engineer, Retail',
            },
          ].map((t) => (
            <figure key={t.author} className="card shadow-soft p-6 flex flex-col justify-between">
              <blockquote className="text-sm leading-relaxed text-foreground/80">“{t.quote}”</blockquote>
              <figcaption className="mt-4 text-xs font-medium uppercase tracking-wide text-foreground/60">
                {t.author}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
