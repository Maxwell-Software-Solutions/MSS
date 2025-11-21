import { SITE_CONFIG } from '../data';
import type { Organization } from './types';

/**
 * Enhanced Organization schema from central data
 * 
 * Includes contact point, social links, and address information.
 * Used as the primary organization identifier across all pages.
 * 
 * @returns Organization schema object for JSON-LD
 */
export function generateOrganizationSchema(): Organization {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_CONFIG.url}/#organization`,
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/logo.svg`,
    description: SITE_CONFIG.description,
    foundingDate: SITE_CONFIG.foundingDate,
    email: SITE_CONFIG.email,
    address: {
      '@type': 'PostalAddress',
      addressCountry: SITE_CONFIG.address.country,
    },
    sameAs: [SITE_CONFIG.social.linkedin, SITE_CONFIG.social.github],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: SITE_CONFIG.email,
        availableLanguage: ['English', 'Lithuanian'],
      },
    ],
  };
}
