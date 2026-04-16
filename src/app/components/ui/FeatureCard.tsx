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
    <div
      className={`glass-card p-6 flex flex-col hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.1)] transition-all duration-300 ${className}`.trim()}
    >
      {icon && (
        <div
          className="mb-4 inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-violet-600/20 to-indigo-600/10 border border-violet-500/20 p-2.5 text-xl w-fit"
          aria-hidden="true"
        >
          {icon}
        </div>
      )}
      <h3 className="font-semibold text-lg tracking-tight">{title}</h3>
      <p className="mt-3 text-sm text-foreground/80 leading-relaxed">{description}</p>
    </div>
  );
}

export default FeatureCard;
