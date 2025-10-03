export interface FounderInfo {
  name: string;
  role: string;
  bio: string;
  alt: string;
  gradient: string;
}

export const founders: FounderInfo[] = [
  {
    name: 'Maxwell Archer',
    role: 'Software Engineer & SEO',
    bio: 'Sculpts sustainable velocity: clarity, automation, measurable quality signals—and removing drag.',
    alt: 'Cartoon illustration of Maxwell Archer',
    gradient: 'from-indigo-600 via-sky-500 to-cyan-400',
  },
  {
    name: 'Petras Rolinskij',
    role: 'Design Director',
    bio: 'Shapes interfaces where aesthetic precision amplifies conversion and user trust.',
    alt: 'Cartoon illustration of Petras Rolinskij',
    gradient: 'from-fuchsia-600 via-pink-500 to-rose-400',
  },
  {
    name: 'Marek Wolosewicz',
    role: 'Managing Director',
    bio: 'Turns reliability & speed into strategic leverage—aligning engineering bets with growth.',
    alt: 'Cartoon illustration of Marek Wolosewicz',
    gradient: 'from-amber-500 via-orange-500 to-red-400',
  },
];

// Static image mapping removed in favor of generated Avatar components.
