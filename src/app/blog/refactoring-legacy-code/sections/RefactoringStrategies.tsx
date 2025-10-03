import type { ReactElement } from 'react';

export default function RefactoringStrategies(): ReactElement {
  return (
    <section id="refactoring-strategies" className="mb-16">
      <h2 className="text-3xl font-bold mb-8">Proven Refactoring Strategies for Legacy Code</h2>
      <div className="space-y-8">
        <div>
          <h3 className="text-2xl font-semibold mb-4">1. Strangler Fig Pattern</h3>
          <p className="text-lg text-foreground/70 mb-4">
            Gradually replace legacy components with new implementations to minimize risk and validate improvements incrementally.
          </p>
        </div>
      </div>
    </section>
  );
}
