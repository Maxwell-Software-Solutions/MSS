import { SITE_CONFIG, SERVICES } from '../data';
import type { ProfessionalService } from './types';

/**
 * ProfessionalService schema for service offerings
 *
 * Helps Google understand your business type and the services you offer.
 * Includes offer catalog with all service descriptions from central data.
 *
 * @returns ProfessionalService schema object for JSON-LD
 */
export function generateProfessionalServiceSchema(): ProfessionalService {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_CONFIG.url}/#service`,
    name: SITE_CONFIG.name,
    image: `${SITE_CONFIG.url}/logo.svg`,
    description: SITE_CONFIG.description,
    address: {
      '@type': 'PostalAddress',
      addressCountry: SITE_CONFIG.address.country,
    },
    areaServed: 'Worldwide',
    priceRange: '$$$',
    serviceType: SERVICES.map((s) => s.name),
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
  };
}
