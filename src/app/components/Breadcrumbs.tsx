import Link from 'next/link';
import { generateBreadcrumbSchema, breadcrumbsFromPath } from '@/lib/seo/structured-data';
import StructuredData from './StructuredData';

interface BreadcrumbsProps {
  pathname: string;
  titleMap?: Record<string, string>;
}

/**
 * Renders breadcrumbs UI + injects BreadcrumbList schema
 *
 * Provides both visual navigation and structured data for search engines.
 * Automatically generates breadcrumb items from URL path.
 *
 * @param pathname - Current page path (e.g., "/blog/solid-principles")
 * @param titleMap - Optional mapping of slugs to readable titles
 *
 * @example
 * ```tsx
 * <Breadcrumbs
 *   pathname="/blog/solid-principles"
 *   titleMap={{ 'solid-principles': 'SOLID Principles' }}
 * />
 * ```
 */
export default function Breadcrumbs({ pathname, titleMap }: BreadcrumbsProps) {
  const items = breadcrumbsFromPath(pathname, titleMap);
  const schema = generateBreadcrumbSchema(items);

  return (
    <>
      <StructuredData schema={schema} />

      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          {items.map((item, index) => (
            <li key={item.url} className="flex items-center gap-2">
              {index > 0 && <span>/</span>}
              {index === items.length - 1 ? (
                <span style={{ color: 'var(--color-text)' }}>{item.name}</span>
              ) : (
                <Link
                  href={item.url}
                  className="transition-colors hover:text-[var(--color-accent)]"
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
