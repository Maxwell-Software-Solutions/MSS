import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Founders — Maxwell Software Solutions',
  description:
    'Meet the founders driving engineering strategy, design, and platform quality at Maxwell Software Solutions.',
  alternates: {
    canonical: '/founders',
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
    <div className="min-h-screen px-6 sm:px-10 py-16 sm:py-20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center" data-reveal>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Founders</h1>
          <p className="mt-4 text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            Meet the core team guiding technical direction, product quality, and sustainable velocity.
          </p>
        </div>

        <div className="space-y-12 sm:space-y-16" data-reveal>
          {founders.map((founder) => (
            <div
              key={founder.name}
              className="neuro-card shadow-soft rounded-3xl border bg-card/95 backdrop-blur-xl transition hover:shadow-lg"
            >
              <div
                className={`grid grid-cols-1 ${
                  founder.imagePosition === 'right' ? 'lg:grid-cols-[1.5fr_1fr]' : 'lg:grid-cols-[1fr_1.5fr]'
                } gap-0`}
              >
                {/* Description Section */}
                <div
                  className={`flex flex-col justify-center p-8 sm:p-12 ${
                    founder.imagePosition === 'right' ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">{founder.name}</h2>
                      <p className="text-xl text-foreground/80 font-medium">{founder.title}</p>
                    </div>
                    <p className="text-base sm:text-lg text-foreground/75 leading-relaxed">{founder.bio}</p>
                  </div>
                </div>

                {/* Image Section */}
                <div
                  className={`flex items-center justify-center p-8 sm:p-12 ${
                    founder.imagePosition === 'right' ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div
                    role="img"
                    aria-label={`${founder.name} — ${founder.title}`}
                    className="w-full max-w-sm aspect-square rounded-3xl shadow-soft bg-foreground/5 flex items-center justify-center text-sm font-medium uppercase text-foreground/70 neuro-card"
                  >
                    Photo Pending
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
