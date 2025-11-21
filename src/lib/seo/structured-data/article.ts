import { SITE_CONFIG, BLOG_POSTS } from '../data';
import type { Article, Organization } from './types';
import { generateOrganizationSchema } from './organization';

/**
 * Generate Article schema for blog posts
 * 
 * Enhances search result appearance with rich snippets including
 * publish date, author, article section, and keywords.
 * 
 * @param slug - Blog post slug (e.g., "solid-principles")
 * @returns Article schema object for JSON-LD
 * @throws Error if blog post not found in central registry
 * 
 * @example
 * ```typescript
 * const schema = generateArticleSchema('solid-principles');
 * ```
 */
export function generateArticleSchema(slug: string): Article {
  const post = BLOG_POSTS[slug];
  if (!post) {
    throw new Error(`Blog post not found: ${slug}`);
  }

  const organization = generateOrganizationSchema();

  const schema: Article = {
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
    } as Organization,
    publisher: organization,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_CONFIG.url}${post.canonical}`,
    },
  };

  // Add optional fields if they exist
  if (post.section) {
    schema.articleSection = post.section;
  }
  if (post.tags) {
    schema.keywords = post.tags;
  }

  return schema;
}
