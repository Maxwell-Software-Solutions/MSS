import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Founders — Maxwell Software Solutions',
  description:
    'Meet the founders driving engineering strategy, design, and platform quality at Maxwell Software Solutions.',
  alternates: {
    canonical: '/founders',
  },
  // Noindex: page contains placeholder content (photos pending) — re-enable once content is complete
  robots: {
    index: false,
    follow: true,
  },
};

const founders = [
  {
    name: 'Maxwell Archer',
    title: 'Founder & Principal Engineer',
    bio: 'Drives product vision and leads strategic architecture decisions with a focus on reliability and maintainability. With extensive experience in building scalable systems, Maxwell ensures that every technical decision aligns with long-term business objectives while maintaining code quality and team velocity.',
    imagePosition: 'right' as const,
  },
  {
    name: 'Petras Rolinskij',
    title: 'Co‑Founder & Engineering Lead',
    bio: 'Specializes in scalable systems, domain modeling, and enabling rapid iteration through strong foundations. Petras brings deep expertise in designing robust architectures that support growth while maintaining flexibility. His approach emphasizes clean abstractions and pragmatic solutions that empower development teams.',
    imagePosition: 'left' as const,
  },
  {
    name: 'Marek Wolosewicz',
    title: 'Co‑Founder & Platform Lead',
    bio: 'Owns platform quality, performance, and developer experience; champions testing and observability. Marek focuses on creating reliable, performant systems with comprehensive monitoring and testing frameworks. His commitment to developer experience ensures teams can iterate quickly without sacrificing stability.',
    imagePosition: 'right' as const,
  },
] as const;

export default function FoundersPage(): React.ReactElement {
  return (
    <>
      <header className="wrap page-head">
        <h1>Founders</h1>
        <p className="lead">Meet the core team guiding technical direction, product quality, and sustainable velocity.</p>
      </header>

      <div className="section">
        <div className="wrap study-list">
          {founders.map((founder) => (
            <div key={founder.name} className="study split">
              <div>
                <h2>{founder.name}</h2>
                <p className="person-role mt-3 text-base">{founder.title}</p>
                <p className="measure mt-4 text-secondary">{founder.bio}</p>
              </div>
              <div
                role="img"
                aria-label={`${founder.name} — ${founder.title}`}
                className="person-pending"
              >
                Photo Pending
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
