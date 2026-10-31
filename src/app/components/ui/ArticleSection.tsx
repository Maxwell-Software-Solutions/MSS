import type { ReactElement, ReactNode } from 'react';

interface ArticleSectionProps {
  id?: string;
  title: string;
  children: ReactNode;
  className?: string;
}

/** A titled part of a long-form page; spacing and type come from `.prose-flow`. */
export function ArticleSection({ id, title, children, className = '' }: ArticleSectionProps): ReactElement {
  return (
    <article id={id} className={`scroll-mt-24 ${className}`.trim()}>
      <h2>{title}</h2>
      {children}
    </article>
  );
}

export default ArticleSection;
