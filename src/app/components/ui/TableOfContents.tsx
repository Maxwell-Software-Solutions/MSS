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

/** In-page navigation for long articles: plain links under a quiet heading. */
export function TableOfContents({
  items,
  title = 'Table of Contents',
  columns = 2,
}: TableOfContentsProps): ReactElement {
  return (
    <section className="toc">
      <h2>{title}</h2>
      <ul className={columns === 2 ? 'toc-columns' : undefined}>
        {items.map((item) => (
          <li key={item.href}>
            <a href={item.href}>• {item.label}</a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default TableOfContents;
