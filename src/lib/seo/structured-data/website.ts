import { SITE_CONFIG } from '../data';
import type { WebSite } from './types';

/**
 * WebSite schema: the site's name and address. No SearchAction: the site has no search, so one would point
 * search engines at a results page that does not exist.
 *
 * @returns WebSite schema object for JSON-LD
 */
export function generateWebSiteSchema(): WebSite {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
  };
}
