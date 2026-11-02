import type { ReactNode } from 'react';
import Link from 'next/link';

const TOKEN = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)\s]+\))/g;
const LINK = /^\[([^\]]+)\]\(([^)\s]+)\)$/;

function renderLink(label: string, href: string, key: number): ReactNode {
  if (href.startsWith('/')) {
    return (
      <Link key={key} className="link" href={href}>
        {label}
      </Link>
    );
  }
  if (href.startsWith('https://')) {
    return (
      <a key={key} className="link" href={href} target="_blank" rel="noopener noreferrer">
        {label}
      </a>
    );
  }
  if (href.startsWith('#') || href.startsWith('mailto:')) {
    return (
      <a key={key} className="link" href={href}>
        {label}
      </a>
    );
  }
  // Any other scheme is not a link we publish: show the words only
  return label;
}

/** Turns the small inline markup of the legal texts into React nodes. Plain text stays plain text. */
export function renderInline(text: string): ReactNode[] {
  return text
    .split(TOKEN)
    .filter((part) => part !== '')
    .map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
        return <code key={index}>{part.slice(1, -1)}</code>;
      }
      const link = LINK.exec(part);
      if (link?.[1] && link[2]) {
        return renderLink(link[1], link[2], index);
      }
      return part;
    });
}
