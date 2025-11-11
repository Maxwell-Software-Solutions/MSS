import type { ReactElement, ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
  maxWidth?: '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl';
  className?: string;
}

const widthClasses = {
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
};

/**
 * Unified page container component for consistent max-width and padding
 * Consolidates repeated container patterns across pages
 */
export function PageContainer({ children, maxWidth = '4xl', className = '' }: PageContainerProps): ReactElement {
  return (
    <main className={`mx-auto ${widthClasses[maxWidth]} px-6 py-12 sm:px-10 ${className}`.trim()}>{children}</main>
  );
}

export default PageContainer;
