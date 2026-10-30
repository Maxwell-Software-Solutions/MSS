import type { ReactElement, ReactNode } from 'react';

interface NeuroCardProps {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'aside' | 'article';
}

/**
 * NeuroCard component - the panel used around the contact form and details.
 * (Name kept for existing imports.) Flat surface, hairline border, no shadow.
 */
export function NeuroCard({ children, className = '', as: Component = 'div' }: NeuroCardProps): ReactElement {
  return <Component className={`card p-6 sm:p-8 ${className}`.trim()}>{children}</Component>;
}

export default NeuroCard;
