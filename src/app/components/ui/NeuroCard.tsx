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
      className={`rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.07)] p-8 transition-all duration-300 neuro-card ${className}`.trim()}
    >
      {children}
    </Component>
  );
}

export default NeuroCard;
