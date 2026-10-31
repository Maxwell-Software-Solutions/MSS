import type { ReactElement, ReactNode } from 'react';

interface FeatureCardProps {
  icon?: ReactNode;
  title: string;
  description: string;
  className?: string;
}

/** A capability or value proposition: icon, title, one short paragraph. No box; space separates it. */
export function FeatureCard({ icon, title, description, className = '' }: FeatureCardProps): ReactElement {
  return (
    <div className={`item ${className}`.trim()}>
      {icon}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default FeatureCard;
