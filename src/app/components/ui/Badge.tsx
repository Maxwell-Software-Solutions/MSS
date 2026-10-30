import type { ReactElement } from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'accent' | 'neutral' | 'success' | 'warning';
  size?: 'sm' | 'md';
  className?: string;
}

/**
 * Badge component - consolidates repeated tag/badge patterns (e.g., blog category badges)
 * Used for tags, labels, and status indicators
 */
export function Badge({ children, variant = 'accent', size = 'sm', className = '' }: BadgeProps): ReactElement {
  const variantClasses = {
    accent: 'border-accent/30 bg-accent/10 text-accent',
    neutral: 'border-border bg-wash text-secondary',
    success: 'border-success/30 bg-success/10 text-success',
    warning: 'border-warning/30 bg-warning/10 text-warning',
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  return (
    <span
      className={`inline-flex items-center rounded-md border font-medium ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim()}
    >
      {children}
    </span>
  );
}

export default Badge;
