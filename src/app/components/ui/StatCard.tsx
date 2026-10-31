import type { ReactElement } from 'react';

interface StatCardProps {
  value: string;
  label: string;
  className?: string;
}

/** A metric: large light figure over a quiet label. Sits inside a `.stats` row. */
export function StatCard({ value, label, className = '' }: StatCardProps): ReactElement {
  return (
    <div className={`stat ${className}`.trim()}>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default StatCard;
