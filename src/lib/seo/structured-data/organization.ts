import { SITE_CONFIG, SERVICES } from '../data';
import type { Organization } from './types';

/**
 * Enhanced Organization schema from central data
 *
 * Includes contact point, social links, and full Vilnius address information.
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
      '@type': 'PostalAddress' as const,
      ...(SITE_CONFIG.address.streetAddress ? { streetAddress: SITE_CONFIG.address.streetAddress } : {}),
      ...(SITE_CONFIG.address.locality ? { addressLocality: SITE_CONFIG.address.locality } : {}),
      ...(SITE_CONFIG.address.region ? { addressRegion: SITE_CONFIG.address.region } : {}),
      ...(SITE_CONFIG.address.postalCode ? { postalCode: SITE_CONFIG.address.postalCode } : {}),
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

/**
 * LocalBusiness schema for Vilnius address and local SEO
 *
 * Improves eligibility for Google's local pack and Maps results.
 * Signals geographic relevance to Lithuanian and EU search audiences.
 *
 * @returns LocalBusiness schema object for JSON-LD
 */
export function generateLocalBusinessSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_CONFIG.url}/#localbusiness`,
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/logo.svg`,
    image: `${SITE_CONFIG.url}/opengraph-image`,
    description: SITE_CONFIG.description,
    email: SITE_CONFIG.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE_CONFIG.address.streetAddress,
      addressLocality: SITE_CONFIG.address.locality,
      addressRegion: SITE_CONFIG.address.region,
      postalCode: SITE_CONFIG.address.postalCode,
      addressCountry: SITE_CONFIG.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 54.6872,
      longitude: 25.2797,
    },
    areaServed: [
      { '@type': 'City', name: 'Vilnius' },
      { '@type': 'Country', name: 'Lithuania' },
      { '@type': 'Continent', name: 'Europe' },
    ],
    priceRange: '$$$',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Software Engineering Services',
      itemListElement: SERVICES.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.name,
          description: service.description,
        },
      })),
    },
    sameAs: [SITE_CONFIG.social.linkedin, SITE_CONFIG.social.github],
  };
}
