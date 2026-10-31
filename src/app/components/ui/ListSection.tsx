import type { ReactElement, ReactNode } from 'react';

interface ListSectionProps {
  title: string;
  items: ReactNode[];
  className?: string;
  listClassName?: string;
}

/** A titled bullet list in a long-form page; spacing and type come from `.prose-flow`. */
export function ListSection({ title, items, className = '', listClassName = '' }: ListSectionProps): ReactElement {
  return (
    <article className={className}>
      <h2>{title}</h2>
      <ul className={listClassName}>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </article>
  );
}

export default ListSection;
