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
 * Flat surface with a hairline border (the .card class in globals.css)
 */
export function Card({ children, className = '', padding = 'md', hover = false }: CardProps): ReactElement {
  const paddingClasses = {
    sm: 'p-4 sm:p-5',
    md: 'p-6',
    lg: 'p-8',
  };

  const hoverClass = hover ? 'card-interactive' : '';

  return <div className={`card ${paddingClasses[padding]} ${hoverClass} ${className}`.trim()}>{children}</div>;
}

export default Card;
