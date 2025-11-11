import type { ReactElement } from 'react';

interface StatCardProps {
  value: string;
  label: string;
  className?: string;
}

/**
 * StatCard component - consolidates repeated stats/metrics card patterns
 * Used for displaying key metrics and statistics
 */
export function StatCard({ value, label, className = '' }: StatCardProps): ReactElement {
  return (
    <div className={`card shadow-soft p-4 sm:p-5 text-center ${className}`.trim()}>
      <div className="text-xl sm:text-2xl font-semibold">{value}</div>
      <div className="muted text-sm">{label}</div>
    </div>
  );
}

export default StatCard;
