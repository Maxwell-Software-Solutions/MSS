import type { ReactElement } from 'react';

interface ArticleStructuredDataProps {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  imageUrl?: string;
}

export default function ArticleStructuredData({
  title,
  description,
  datePublished,
  dateModified,
  author = 'Maxwell Software Solutions',
  imageUrl = 'https://www.maxwellsoftwaresolutions.com/logo.svg',
}: ArticleStructuredDataProps): ReactElement {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Organization',
      name: author,
      url: 'https://www.maxwellsoftwaresolutions.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Maxwell Software Solutions',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.maxwellsoftwaresolutions.com/logo.svg',
      },
    },
    image: imageUrl,
    mainEntityOfPage: {
      '@type': 'WebPage',
    },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />;
}
