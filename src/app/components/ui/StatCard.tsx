import type { ReactElement } from 'react';

interface StatCardProps {
  value: string;
  label: string;
  className?: string;
}

/**
 * StatCard component - a metric cell: large tabular figure over a quiet label.
 * Sits inside a `.ruled` grid so neighbouring metrics share hairlines.
 */
export function StatCard({ value, label, className = '' }: StatCardProps): ReactElement {
  return (
    <div className={`p-6 sm:p-7 ${className}`.trim()}>
      <div className="text-3xl font-semibold tracking-tight tabular-nums sm:text-4xl">{value}</div>
      <div className="mt-2 text-sm text-muted">{label}</div>
    </div>
  );
}

export default StatCard;
