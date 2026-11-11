export interface FounderInfo {
  name: string;
  role: string;
  bio: string;
  alt: string;
  gradient: string;
  /** Portrait under /public. Without one, the card shows the founder's initials until a photo is added. */
  photo?: string;
}

export const founders: FounderInfo[] = [
  {
    name: 'Mantas Brasiunas',
    role: 'Founder & AI Engineering Lead',
    bio: 'Builds AI agents and AI products on a long software engineering background, including years of work for Sage.',
    alt: 'Professional photo of Mantas Brasiunas',
    gradient: 'from-neutral-800 via-neutral-600 to-neutral-400',
  },
];

// Static image mapping removed in favor of generated Avatar components.
