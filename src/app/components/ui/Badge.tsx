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
    accent: 'bg-accent/20 text-accent',
    neutral: 'bg-foreground/10 text-foreground',
    success: 'bg-green-500/20 text-green-600 dark:text-green-400',
    warning: 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400',
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
  };

  return (
    <span className={`${variantClasses[variant]} ${sizeClasses[size]} rounded-full ${className}`.trim()}>
      {children}
    </span>
  );
}

export default Badge;
