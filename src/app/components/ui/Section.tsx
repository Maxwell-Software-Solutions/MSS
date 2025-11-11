import type { ReactElement, ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  maxWidth?: '4xl' | '6xl' | '7xl' | 'full';
  padding?: 'sm' | 'md' | 'lg';
  id?: string;
  'aria-labelledby'?: string;
}

/**
 * Unified Section component - consolidates repeated section wrapper patterns
 * Provides consistent max-width containers and padding across pages
 */
export function Section({
  children,
  className = '',
  maxWidth = '6xl',
  padding = 'md',
  id,
  'aria-labelledby': ariaLabelledby,
}: SectionProps): ReactElement {
  const maxWidthClasses = {
    '4xl': 'max-w-4xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
    full: 'w-full',
  };

  const paddingClasses = {
    sm: 'px-6 sm:px-10 py-12',
    md: 'px-6 sm:px-10 py-16',
    lg: 'px-6 sm:px-10 py-20',
  };

  return (
    <section id={id} className={`${paddingClasses[padding]} ${className}`.trim()} aria-labelledby={ariaLabelledby}>
      <div className={`${maxWidthClasses[maxWidth]} mx-auto`}>{children}</div>
    </section>
  );
}

export default Section;
