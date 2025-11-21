import { SITE_CONFIG } from '../data';
import type { BreadcrumbList } from './types';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * Generate BreadcrumbList schema from path items
 * 
 * Improves navigation understanding for search engines and
 * displays breadcrumb trails in search results.
 * 
 * @param items - Array of breadcrumb items (name + URL)
 * @returns BreadcrumbList schema object for JSON-LD
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]): BreadcrumbList {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_CONFIG.url}${item.url}`,
    })),
  };
}

/**
 * Helper: Generate breadcrumbs from URL path
 * 
 * Automatically creates breadcrumb items from a URL path.
 * Supports custom title mapping for pretty names.
 * 
 * @param pathname - URL pathname (e.g., "/blog/solid-principles")
 * @param titleMap - Optional mapping of slugs to display names
 * @returns Array of breadcrumb items
 * 
 * @example
 * ```typescript
 * const breadcrumbs = breadcrumbsFromPath('/blog/solid-principles', {
 *   'solid-principles': 'SOLID Principles: The Foundation of Clean Code'
 * });
 * // Returns: [
 * //   { name: 'Home', url: '/' },
 * //   { name: 'Blog', url: '/blog' },
 * //   { name: 'SOLID Principles: The Foundation of Clean Code', url: '/blog/solid-principles' }
 * // ]
 * ```
 */
export function breadcrumbsFromPath(pathname: string, titleMap: Record<string, string> = {}): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean);

  const items: BreadcrumbItem[] = [{ name: 'Home', url: '/' }];

  let currentPath = '';
  segments.forEach((segment) => {
    currentPath += `/${segment}`;
    const name =
      titleMap[segment] ||
      segment
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    items.push({
      name,
      url: currentPath,
    });
  });

  return items;
}
