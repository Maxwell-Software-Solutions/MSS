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
    <section className="mb-12 bg-foreground/5 rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className={`grid ${gridClass} gap-4`.trim()}>
        <ul className="space-y-2 text-foreground/70">
          {items.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="hover:text-accent transition-colors">
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
