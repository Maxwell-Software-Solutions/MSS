import type { ReactElement } from 'react';

export default function LogoStrip(): ReactElement {
  const logos = ['Acme', 'Nimbus', 'Helios', 'Orbit', 'Vertex', 'Lumina'];
  return (
    <div className="container section" data-reveal>
      <div className="eyebrow text-center">Trusted by teams</div>
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center justify-items-center opacity-80">
        {logos.map((name) => (
          <div key={name} className="text-sm sm:text-base muted">
            {name}
          </div>
        ))}
      </div>
    </div>
  );
}
