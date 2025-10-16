import type { ReactElement } from 'react';
import { founders } from './founders-data';
import FounderCard from './FounderCard';

export default function AboutPage(): ReactElement {
  return (
    <div className="max-w-5xl mx-auto px-6 sm:px-10 py-12">
      <h1 className="text-3xl sm:text-4xl font-bold">About Maxwell Software Solutions</h1>
      <div className="mt-6 space-y-5 text-foreground/85 leading-relaxed">
        <p className="text-lg">
          Maxwell Software Solutions focuses on code quality and reliability. We believe correctness and simplicity
          enable speed.
        </p>
        <p>
          We partner with engineering teams to modernize legacy systems, accelerate delivery pipelines, and build
          sustainable practices that scale. Our approach combines technical rigor with pragmatic outcomes.
        </p>
        <div className="mt-8 p-6 rounded-xl border border-accent/30 bg-accent/5">
          <h2 className="text-lg font-semibold mb-4 text-accent">Our Core Principles</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-accent text-xl" aria-hidden="true">✓</span>
              <div>
                <strong className="font-semibold">Correctness over cleverness:</strong>
                <span className="text-foreground/75"> Simple, maintainable solutions that work reliably.</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent text-xl" aria-hidden="true">✓</span>
              <div>
                <strong className="font-semibold">Observability as a feature:</strong>
                <span className="text-foreground/75"> Systems should reveal their state and behavior clearly.</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent text-xl" aria-hidden="true">✓</span>
              <div>
                <strong className="font-semibold">Automation and reproducibility:</strong>
                <span className="text-foreground/75"> Eliminate manual toil and enable consistent outcomes.</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <section className="mt-16" aria-labelledby="founders-heading">
        <h2 id="founders-heading" className="text-3xl font-semibold tracking-tight">
          Meet Our Founders
        </h2>
        <p className="mt-4 text-base text-foreground/75 max-w-2xl leading-relaxed">
          A compact senior core blending deep engineering rigor, product design clarity, and outcome-focused strategy.
          Each founder brings decades of hands-on experience shipping reliable software at scale.
        </p>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {founders.map((f) => (
            <FounderCard key={f.name} f={f} />
          ))}
        </div>
      </section>
    </div>
  );
}
