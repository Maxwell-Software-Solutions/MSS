import type { ReactElement } from 'react';

export default function TestimonialsSection(): ReactElement {
  return (
    <section className="border-t border-border" aria-labelledby="testimonials-heading">
      <div className="max-w-6xl mx-auto px-6 py-20 sm:px-10 sm:py-24" data-reveal>
        <h2 id="testimonials-heading" className="text-3xl font-semibold tracking-tight sm:text-4xl">
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
            <figure key={t.author} className="flex flex-col justify-between border-t border-border-strong pt-6">
              <blockquote className="text-[0.9375rem] leading-relaxed text-foreground">“{t.quote}”</blockquote>
              <figcaption className="mt-5 text-sm font-medium text-muted">{t.author}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
