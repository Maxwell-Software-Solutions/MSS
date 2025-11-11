import type { ReactElement, ReactNode } from 'react';

interface NeuroCardProps {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'aside' | 'article';
}

/**
 * NeuroCard component - consolidates neumorphic card pattern used in contact forms and other areas
 * Provides consistent rounded-3xl, backdrop-blur, neuro-card styling
 */
export function NeuroCard({ children, className = '', as: Component = 'div' }: NeuroCardProps): ReactElement {
  return (
    <Component
      className={`shadow-soft rounded-3xl border bg-card/95 p-8 backdrop-blur-xl transition neuro-card ${className}`.trim()}
    >
      {children}
    </Component>
  );
}

export default NeuroCard;
