import React from 'react';
import TeamCard from '../components/TeamCard';

export const metadata = { title: 'Founders' };

const founders = [
  {
    name: 'Maxwell Archer',
    title: 'Founder & Principal Engineer',
    bio: 'Drives product vision and leads strategic architecture decisions with a focus on reliability and maintainability.',
  },
  {
    name: 'Petras Rolinskij',
    title: 'Co‑Founder & Engineering Lead',
    bio: 'Specializes in scalable systems, domain modeling, and enabling rapid iteration through strong foundations.',
  },
  {
    name: 'Marek Wolosewicz',
    title: 'Co‑Founder & Platform Lead',
    bio: 'Owns platform quality, performance, and developer experience; champions testing and observability.',
  },
] as const;

export default function FoundersPage(): React.ReactElement {
  return (
    <div className="min-h-screen py-24 px-6 sm:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center" data-reveal>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Founders</h1>
          <p className="mt-4 text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            Meet the core team guiding technical direction, product quality, and sustainable velocity.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3" data-reveal>
          {founders.map((f) => (
            <TeamCard key={f.name} {...f} />
          ))}
        </div>
      </div>
    </div>
  );
}
