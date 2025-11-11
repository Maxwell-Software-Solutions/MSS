import type { ReactElement, ReactNode } from 'react';

interface FeatureCardProps {
  icon?: ReactNode;
  title: string;
  description: string;
  className?: string;
}

/**
 * FeatureCard component - consolidates repeated feature/capability card patterns
 * Common pattern: icon, title, description in a card layout
 */
export function FeatureCard({ icon, title, description, className = '' }: FeatureCardProps): ReactElement {
  return (
    <div className={`card p-6 shadow-soft flex flex-col ${className}`.trim()}>
      {icon && (
        <div className="text-2xl mb-4" aria-hidden="true">
          {icon}
        </div>
      )}
      <h3 className="font-semibold text-lg tracking-tight">{title}</h3>
      <p className="mt-3 text-sm text-foreground/80 leading-relaxed">{description}</p>
    </div>
  );
}

export default FeatureCard;
