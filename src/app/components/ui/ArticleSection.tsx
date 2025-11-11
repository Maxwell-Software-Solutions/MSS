import type { ReactElement, ReactNode } from 'react';

interface ArticleSectionProps {
  id?: string;
  title: string;
  children: ReactNode;
  className?: string;
}

/**
 * Unified article section component for blog posts and long-form content
 * Provides consistent spacing and heading styles
 */
export function ArticleSection({ id, title, children, className = '' }: ArticleSectionProps): ReactElement {
  return (
    <article id={id} className={`space-y-4 ${className}`.trim()}>
      <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{title}</h2>
      {children}
    </article>
  );
}

export default ArticleSection;
