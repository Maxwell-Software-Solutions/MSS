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
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[color:var(--accent)]">{eyebrow}</p>
      )}
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">{title}</h1>
      {meta && <div className="text-sm text-slate-500 dark:text-slate-400">{meta}</div>}
      {subtitle && <p className="max-w-2xl text-base leading-relaxed">{subtitle}</p>}
    </header>
  );
}

export default PageHeader;
