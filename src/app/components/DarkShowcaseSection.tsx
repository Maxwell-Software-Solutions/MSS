import type { ReactElement } from 'react';

export default function DarkShowcaseSection(): ReactElement {
  return (
    <section className="border-t border-border bg-wash" aria-labelledby="showcase-heading">
      <div className="max-w-6xl mx-auto px-6 py-20 sm:px-10 sm:py-24">
        <div className="max-w-3xl" data-reveal>
          <h2 id="showcase-heading" className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Engineering leverage, not headcount.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-secondary">
            We focus on multiplier work—reducing defect surfaces, shrinking lead time to change, and embedding patterns
            that keep systems adaptable as complexity scales.
          </p>
        </div>
        <div className="ruled mt-12 grid-cols-1 md:grid-cols-3" data-reveal>
          {[
            { title: 'Architecture clarity', body: 'Surface hidden dependencies & simplify coupling.' },
            { title: 'Confidence metrics', body: 'Meaningful coverage + mutation + failure trend insight.' },
            { title: 'Operational readiness', body: 'Proactive SLOs, trace probes & incident rehearsal.' },
          ].map((f) => (
            <div key={f.title} className="flex flex-col p-6 sm:p-7">
              <h3 className="text-base font-semibold tracking-tight">{f.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-secondary">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
