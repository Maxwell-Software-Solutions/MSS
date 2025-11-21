# P0-3: Expanded Structured Data (Schema.org)

**Priority**: P0 Critical  
**Effort**: 3-4 hours  
**Maintainability**: ⭐⭐⭐⭐⭐

## Overview

Expand structured data (JSON-LD) beyond basic Organization schema to include:

- **WebSite** schema with search action
- **ProfessionalService** schema for service offerings
- **BreadcrumbList** for navigation hierarchy
- **Article** schema enhancements for blog posts
- Reusable atomic components for schema generation

## Architecture

```
Central Data (data.ts)
    ↓
Schema Generators (structured-data/*.ts)
    ↓
Atomic Components (<StructuredData />)
    ↓
Page-level injection
```

**Key Principle**: All schemas generated from central data registry, ensuring consistency and eliminating duplication.

---

## Implementation

### 1. Restructure Schema Organization

**Directory structure**:

```
src/lib/
  seo/
    data.ts (existing - central data)
    utils.ts (existing - metadata utilities)
    structured-data/
      index.ts (exports all schemas)
      organization.ts
      website.ts
      professional-service.ts
      breadcrumb.ts
      article.ts
      types.ts (TypeScript types for all schemas)
```

---

### 2. Schema Type Definitions

**File**: `src/lib/seo/structured-data/types.ts`

```typescript
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
```

---

### 3. Organization Schema (Enhanced)

**File**: `src/lib/seo/structured-data/organization.ts`

```typescript
import { SITE_CONFIG } from '../data';
import type { Organization } from './types';

/**
 * Enhanced Organization schema from central data
 * Includes contact point, social links, address
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
```

---

### 4. WebSite Schema with Search

**File**: `src/lib/seo/structured-data/website.ts`

```typescript
import { SITE_CONFIG } from '../data';
import type { WebSite } from './types';

/**
 * WebSite schema with search action
 * Enables Google search box in SERP
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
```

**Note**: This enables the Google Search Console "Sitelinks Search Box" feature, allowing users to search your site directly from Google results.

---

### 5. ProfessionalService Schema

**File**: `src/lib/seo/structured-data/professional-service.ts`

```typescript
import { SITE_CONFIG, SERVICES } from '../data';
import type { ProfessionalService } from './types';

/**
 * ProfessionalService schema for service offerings
 * Helps Google understand your business type
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
```

---

### 6. Breadcrumb Schema Generator

**File**: `src/lib/seo/structured-data/breadcrumb.ts`

```typescript
import { SITE_CONFIG } from '../data';
import type { BreadcrumbList } from './types';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * Generate BreadcrumbList schema from path items
 * Improves navigation understanding for search engines
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
 * Example: "/blog/solid-principles" → [Home, Blog, SOLID Principles]
 */
export function breadcrumbsFromPath(pathname: string, titleMap: Record<string, string> = {}): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean);

  const items: BreadcrumbItem[] = [{ name: 'Home', url: '/' }];

  let currentPath = '';
  segments.forEach((segment, index) => {
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
```

**Usage**:

```typescript
// In blog post page
const breadcrumbs = breadcrumbsFromPath('/blog/solid-principles', {
  'solid-principles': 'SOLID Principles: The Foundation of Clean Code',
});
const schema = generateBreadcrumbSchema(breadcrumbs);
```

---

### 7. Article Schema Generator

**File**: `src/lib/seo/structured-data/article.ts`

```typescript
import { SITE_CONFIG, BLOG_POSTS } from '../data';
import type { Article } from './types';
import { generateOrganizationSchema } from './organization';

/**
 * Generate Article schema for blog posts
 * Enhances search result appearance with rich snippets
 */
export function generateArticleSchema(slug: string): Article {
  const post = BLOG_POSTS[slug];
  if (!post) throw new Error(`Blog post not found: ${slug}`);

  const organization = generateOrganizationSchema();

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: `${SITE_CONFIG.url}${post.canonical}/opengraph-image`,
    datePublished: post.publishedTime,
    dateModified: post.modifiedTime || post.publishedTime,
    author: {
      '@type': 'Organization',
      name: post.author,
      url: SITE_CONFIG.url,
    },
    publisher: organization,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_CONFIG.url}${post.canonical}`,
    },
    articleSection: post.section,
    keywords: post.tags,
  };
}
```

---

### 8. Central Schema Export

**File**: `src/lib/seo/structured-data/index.ts`

```typescript
/**
 * Central export for all structured data schemas
 * Import from here to access any schema generator
 */

export { generateOrganizationSchema } from './organization';

export { generateWebSiteSchema } from './website';

export { generateProfessionalServiceSchema } from './professional-service';

export { generateBreadcrumbSchema, breadcrumbsFromPath, type BreadcrumbItem } from './breadcrumb';

export { generateArticleSchema } from './article';

export type * from './types';
```

---

### 9. Atomic Schema Component

**File**: `src/app/components/StructuredData.tsx` (UPDATE existing)

```typescript
import type { ReactElement } from 'react';

interface StructuredDataProps {
  schema: object | object[]; // Support single or multiple schemas
}

/**
 * Atomic component for injecting JSON-LD structured data
 * Accepts single schema or array of schemas
 */
export default function StructuredData({ schema }: StructuredDataProps): ReactElement {
  const schemas = Array.isArray(schema) ? schema : [schema];

  return (
    <>
      {schemas.map((s, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
    </>
  );
}
```

---

### 10. Usage in Pages

#### Root Layout (Homepage):

```typescript
// src/app/layout.tsx
import StructuredData from '@/app/components/StructuredData';
import { generateOrganizationSchema, generateWebSiteSchema } from '@/lib/seo/structured-data';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebSiteSchema();

  return (
    <html lang="en">
      <body>
        {/* Inject multiple schemas */}
        <StructuredData schema={[organizationSchema, websiteSchema]} />

        {children}
      </body>
    </html>
  );
}
```

#### Services Page:

```typescript
// src/app/services/page.tsx
import StructuredData from '@/app/components/StructuredData';
import { generateProfessionalServiceSchema, generateBreadcrumbSchema } from '@/lib/seo/structured-data';

export default function ServicesPage() {
  const serviceSchema = generateProfessionalServiceSchema();
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
  ]);

  return (
    <>
      <StructuredData schema={[serviceSchema, breadcrumbSchema]} />
      <ServicesContent />
    </>
  );
}
```

#### Blog Post:

```typescript
// src/app/blog/[slug]/page.tsx
import StructuredData from '@/app/components/StructuredData';
import { generateArticleSchema, generateBreadcrumbSchema, breadcrumbsFromPath } from '@/lib/seo/structured-data';
import { BLOG_POSTS } from '@/lib/seo/data';

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = BLOG_POSTS[params.slug];
  const articleSchema = generateArticleSchema(params.slug);
  const breadcrumbSchema = generateBreadcrumbSchema(
    breadcrumbsFromPath(`/blog/${params.slug}`, {
      [params.slug]: post.title,
    })
  );

  return (
    <>
      <StructuredData schema={[articleSchema, breadcrumbSchema]} />
      <article>
        <h1>{post.title}</h1>
        {/* ... */}
      </article>
    </>
  );
}
```

---

## Testing & Validation

### Google Rich Results Test:

1. Visit [Rich Results Test](https://search.google.com/test/rich-results)
2. Enter your page URL or paste HTML
3. Verify schemas are detected and valid

### Schema.org Validator:

1. Visit [Schema Markup Validator](https://validator.schema.org/)
2. Paste JSON-LD or URL
3. Check for errors/warnings

### Local Testing:

```bash
pnpm dev
# View page source, search for:
<script type="application/ld+json">
```

---

## Benefits

✅ **DRY**: All schemas generated from central data  
✅ **Type-Safe**: TypeScript prevents schema errors  
✅ **Atomic**: Reusable `<StructuredData />` component  
✅ **Maintainable**: Update data once, schemas update everywhere  
✅ **Comprehensive**: Organization, WebSite, Service, Article, Breadcrumb  
✅ **Search-Optimized**: Enables rich snippets, sitelinks search box

---

## Expected SERP Features

After implementation, you may see:

- **Sitelinks Search Box**: Search your site from Google results
- **Rich Snippets**: Article cards with publish date, author
- **Breadcrumb Navigation**: In search results
- **Organization Panel**: Knowledge graph on branded searches
- **Service Listings**: Structured service offerings

---

## Migration Checklist

- [ ] Create `src/lib/seo/structured-data/` directory
- [ ] Implement all schema generators (organization, website, service, breadcrumb, article)
- [ ] Update `src/app/components/StructuredData.tsx` to accept arrays
- [ ] Update `src/app/layout.tsx` with Organization + WebSite schemas
- [ ] Add ProfessionalService schema to `/services` page
- [ ] Add Article + Breadcrumb schemas to blog posts
- [ ] Test with Google Rich Results Test
- [ ] Validate with Schema.org validator
- [ ] Monitor Google Search Console for rich result indexing

---

## Next Steps

1. Implement central data layer (00-central-data-management.md)
2. Create all schema generators in `src/lib/seo/structured-data/`
3. Update existing `ArticleStructuredData` component to use new generator
4. Add breadcrumbs to all pages
5. Submit sitemap to Google Search Console
6. Monitor rich result appearance (2-4 weeks post-deployment)
