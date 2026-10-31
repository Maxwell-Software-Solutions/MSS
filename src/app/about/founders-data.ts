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
    alt: 'Professional photo of Maxwell Archer',
    gradient: 'from-neutral-800 via-neutral-600 to-neutral-400',
  },
  {
    name: 'Petras Rolinskij',
    role: 'Design Director',
    bio: 'Shapes interfaces where aesthetic precision amplifies conversion and user trust.',
    alt: 'Professional photo of Petras Rolinskij',
    gradient: 'from-neutral-800 via-neutral-600 to-neutral-400',
  },
  {
    name: 'Marek Wolosewicz',
    role: 'Managing Director',
    bio: 'Turns reliability & speed into strategic leverage—aligning engineering bets with growth.',
    alt: 'Professional photo of Marek Wolosewicz',
    gradient: 'from-neutral-800 via-neutral-600 to-neutral-400',
  },
];

// Static image mapping removed in favor of generated Avatar components.
