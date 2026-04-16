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
    <div
      className={`glass-card p-6 text-center border-[rgba(124,58,237,0.15)] shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.07)] hover:-translate-y-1 hover:border-[rgba(124,58,237,0.3)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.6),0_0_24px_rgba(124,58,237,0.12),inset_0_1px_0_rgba(255,255,255,0.1)] transition-all duration-300 ${className}`.trim()}
    >
      <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
        {value}
      </div>
      <div className="muted text-sm mt-2">{label}</div>
    </div>
  );
}

export default StatCard;
