import type { ReactElement } from 'react';

interface TocItem {
  href: string;
  label: string;
}

interface TableOfContentsProps {
  items: TocItem[];
  title?: string;
  columns?: 1 | 2;
}

/**
 * Unified table of contents component for blog posts
 * Provides consistent navigation for long-form content
 */
export function TableOfContents({
  items,
  title = 'Table of Contents',
  columns = 2,
}: TableOfContentsProps): ReactElement {
  const gridClass = columns === 2 ? 'md:grid-cols-2' : '';

  return (
    <section className="mb-12 rounded-xl border border-border bg-wash p-6">
      <h2 className="mb-4 text-xl font-semibold tracking-tight">{title}</h2>
      <div className={`grid ${gridClass} gap-4`.trim()}>
        <ul className="space-y-2 text-secondary">
          {items.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="transition-colors hover:text-accent">
                • {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default TableOfContents;
