import { SITE_CONFIG } from '../data';
import type { WebSite } from './types';

/**
 * WebSite schema with search action
 * 
 * Enables the Google "Sitelinks Search Box" feature, allowing users
 * to search your site directly from Google search results.
 * 
 * @returns WebSite schema object for JSON-LD
 */
export function generateWebSiteSchema(): WebSite {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_CONFIG.url}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}
