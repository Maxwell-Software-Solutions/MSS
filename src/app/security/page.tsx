import type { ReactElement } from 'react';

export default function SecurityPage(): ReactElement {
  return (
    <div className="max-w-3xl mx-auto px-6 sm:px-10 py-12">
      <h1 className="text-3xl sm:text-4xl font-bold">Security</h1>
      <p className="mt-4 text-foreground/80">
        Outline data handling practices, access controls, and responsible disclosure policy.
      </p>
    </div>
  );
}
