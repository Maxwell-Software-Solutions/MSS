import type { ReactElement } from 'react';

export default function CommonPitfalls(): ReactElement {
  return (
    <section id="common-pitfalls" className="mb-16">
      <h2 className="text-3xl font-bold mb-8">Common Pitfalls and How to Avoid Them</h2>
      <p className="text-foreground/70">Avoid big bang rewrites; ensure tests first; tie work to business value.</p>
    </section>
  );
}
