import type { ReactElement, ReactNode } from 'react';

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  meta?: ReactNode;
  className?: string;
}

/** Heading block of a long-form page. */
export function PageHeader({ eyebrow, title, subtitle, meta, className = '' }: PageHeaderProps): ReactElement {
  return (
    <header className={`article-head ${className}`.trim()}>
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <h1>{title}</h1>
      {meta && <div className="article-meta">{meta}</div>}
      {subtitle && <p className="lead mt-5">{subtitle}</p>}
    </header>
  );
}

export default PageHeader;
