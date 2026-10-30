import type { ReactElement, ReactNode } from 'react';

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  meta?: ReactNode;
  className?: string;
}

/**
 * Unified page header component for consistent page titles
 * Consolidates repeated header patterns across pages
 */
export function PageHeader({ eyebrow, title, subtitle, meta, className = '' }: PageHeaderProps): ReactElement {
  return (
    <header className={`space-y-3 ${className}`.trim()}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h1 className="text-3xl sm:text-4xl">{title}</h1>
      {meta && <div className="text-sm text-muted">{meta}</div>}
      {subtitle && <p className="max-w-2xl text-base leading-relaxed text-secondary">{subtitle}</p>}
    </header>
  );
}

export default PageHeader;
