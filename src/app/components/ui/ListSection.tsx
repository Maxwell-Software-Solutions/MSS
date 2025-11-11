import type { ReactElement, ReactNode } from 'react';

interface ListSectionProps {
  title: string;
  items: ReactNode[];
  className?: string;
  listClassName?: string;
}

/**
 * Unified list section component for bullet-point content
 * Used in policy pages, documentation, and feature lists
 */
export function ListSection({ title, items, className = '', listClassName = '' }: ListSectionProps): ReactElement {
  return (
    <article className={`space-y-4 ${className}`.trim()}>
      <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{title}</h2>
      <ul className={`list-disc space-y-3 pl-5 ${listClassName}`.trim()}>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </article>
  );
}

export default ListSection;
