import type { ReactElement } from 'react';
import { founders } from './founders-data';
import FounderCard from './FounderCard';

export default function AboutPage(): ReactElement {
  return (
    <div className="max-w-5xl mx-auto px-6 sm:px-10 py-12">
      <h1 className="text-3xl sm:text-4xl font-bold">About</h1>
      <div className="mt-4 space-y-4 text-foreground/85">
        <p>
          Maxwell Software Solutions focuses on code quality and reliability. We believe correctness and simplicity
          enable speed.
        </p>
        <ul className="list-disc list-inside">
          <li>Correctness over cleverness</li>
          <li>Observability as a feature</li>
          <li>Automation and reproducibility</li>
        </ul>
      </div>
      <section className="mt-16" aria-labelledby="founders-heading">
        <h2 id="founders-heading" className="text-3xl font-semibold tracking-tight">
          Founders
        </h2>
        <p className="mt-4 text-base text-foreground/70 max-w-2xl">
          A compact senior core blending deep engineering rigor, product design clarity, and outcome-focused strategy.
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
