/**
 * Type definitions for Schema.org structured data
 * Ensures type safety across all schema generators
 */

export interface SchemaBase {
  '@context': 'https://schema.org';
  '@type': string;
}

export interface Organization extends SchemaBase {
  '@type': 'Organization';
  '@id'?: string;
  name: string;
  url: string;
  logo?: string;
  description?: string;
  foundingDate?: string;
  email?: string;
  telephone?: string;
  address?: {
    '@type': 'PostalAddress';
    addressCountry: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    streetAddress?: string;
  };
  sameAs?: string[];
  contactPoint?: ContactPoint[];
}

export interface ContactPoint {
  '@type': 'ContactPoint';
  contactType: string;
  email?: string;
  availableLanguage?: string[];
}

export interface WebSite extends SchemaBase {
  '@type': 'WebSite';
  name: string;
  url: string;
  potentialAction?: SearchAction;
}

export interface SearchAction {
  '@type': 'SearchAction';
  target: {
    '@type': 'EntryPoint';
    urlTemplate: string;
  };
  'query-input': string;
}

export interface ProfessionalService extends SchemaBase {
  '@type': 'ProfessionalService';
  '@id'?: string;
  name: string;
  image?: string;
  description?: string;
  address?: Organization['address'];
  areaServed?: string;
  priceRange?: string;
  serviceType?: string[];
  hasOfferCatalog?: OfferCatalog;
}

export interface OfferCatalog {
  '@type': 'OfferCatalog';
  name: string;
  itemListElement: Offer[];
}

export interface Offer {
  '@type': 'Offer';
  itemOffered: Service;
}

export interface Service {
  '@type': 'Service';
  name: string;
  description: string;
}

export interface BreadcrumbList extends SchemaBase {
  '@type': 'BreadcrumbList';
  itemListElement: ListItem[];
}

export interface ListItem {
  '@type': 'ListItem';
  position: number;
  name: string;
  item: string;
}

export interface Article extends SchemaBase {
  '@type': 'Article';
  headline: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author: Organization | Person;
  publisher?: Organization;
  mainEntityOfPage?: {
    '@type': 'WebPage';
    '@id': string;
  };
  articleSection?: string;
  keywords?: string[];
}

export interface Person {
  '@type': 'Person';
  name: string;
  url?: string;
}
