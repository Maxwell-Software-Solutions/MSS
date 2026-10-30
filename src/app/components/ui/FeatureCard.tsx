import type { ReactElement, ReactNode } from 'react';

interface FeatureCardProps {
  icon?: ReactNode;
  title: string;
  description: string;
  className?: string;
}

/**
 * FeatureCard component - a flat cell for capability and value-proposition grids.
 * Place it inside a `.ruled` grid (shared hairlines) or give the wrapper its own border.
 */
export function FeatureCard({ icon, title, description, className = '' }: FeatureCardProps): ReactElement {
  return (
    <div className={`flex flex-col p-6 sm:p-7 ${className}`.trim()}>
      {icon && (
        <div
          className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-wash text-lg grayscale"
          aria-hidden="true"
        >
          {icon}
        </div>
      )}
      <h3 className="text-base font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 text-[0.9375rem] leading-relaxed text-secondary">{description}</p>
    </div>
  );
}

export default FeatureCard;
