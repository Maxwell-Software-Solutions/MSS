/**
 * Organization structured data (JSON-LD) for the site
 */
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Maxwell Software Solutions',
  alternateName: 'Maxwell',
  url: 'https://maxwell-software.com',
  logo: 'https://maxwell-software.com/logo.svg',
  description:
    'Modern web experiences with AI-driven edits. Engineering excellence through test-driven development, clean architecture, and continuous delivery.',
  foundingDate: '2024',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Service',
    email: 'contact@maxwell-software.com',
    availableLanguage: ['English', 'Lithuanian'],
  },
  sameAs: [
    'https://www.linkedin.com/company/maxwell-software-solutions',
    'https://github.com/Maxwell-Software-Solutions',
  ],
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'LT',
  },
};

/**
 * Generate Article structured data for blog posts
 */
export function generateArticleSchema(article: {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  imageUrl?: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      '@type': 'Person',
      name: article.authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Maxwell Software Solutions',
      logo: {
        '@type': 'ImageObject',
        url: 'https://maxwell-software.com/logo.svg',
      },
    },
    image: article.imageUrl || 'https://maxwell-software.com/logo.svg',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url,
    },
  };
}

/**
 * Generate Breadcrumb structured data
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
