import type { ReactElement, ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  shadow?: boolean;
  hover?: boolean;
}

/**
 * Unified Card component - consolidates repeated card patterns across the app
 * Uses neumorphic design from globals.css with .card class
 */
export function Card({
  children,
  className = '',
  padding = 'md',
  shadow = true,
  hover = false,
}: CardProps): ReactElement {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-5',
    lg: 'p-6',
  };

  const baseClasses = 'card';
  const shadowClass = shadow ? 'shadow-soft' : '';
  const hoverClass = hover ? 'transition-all hover:border-accent/80 hover:shadow-lg' : '';

  return (
    <div className={`${baseClasses} ${paddingClasses[padding]} ${shadowClass} ${hoverClass} ${className}`.trim()}>
      {children}
    </div>
  );
}

export default Card;
