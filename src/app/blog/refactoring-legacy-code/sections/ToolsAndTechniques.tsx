import type { ReactElement } from 'react';

export default function ToolsAndTechniques(): ReactElement {
  return (
    <section id="tools-and-techniques" className="mb-16">
      <h2 className="text-3xl font-bold mb-8">Essential Tools and Techniques for Code Refactoring</h2>
      <p className="text-foreground/70">SonarQube, ESLint, automated tests, extraction & modularization.</p>
    </section>
  );
}
