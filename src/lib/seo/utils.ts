/**
 * SEO Utility Functions
 * 
 * Helper functions for generating Next.js metadata objects from central data registry.
 * Provides type-safe metadata generation with error handling and validation.
 * 
 * @module seo/utils
 */

import type { Metadata } from 'next';
import {
  SITE_CONFIG,
  PAGES,
  BLOG_POSTS,
  PROJECTS,
  isValidPageKey,
  isValidBlogSlug,
  isValidProjectSlug,
  type BlogPostMeta,
  type ProjectMeta,
} from './data';

// ============================================================================
// Error Classes
// ============================================================================

/**
 * Custom error for SEO data not found scenarios
 */
export class SEODataNotFoundError extends Error {
  constructor(type: 'page' | 'blog' | 'project', identifier: string) {
    super(`${type} not found in SEO registry: "${identifier}"`);
    this.name = 'SEODataNotFoundError';
  }
}

// ============================================================================
// Metadata Generation Functions
// ============================================================================

/**
 * Generate Next.js Metadata object from page key
 * 
 * @param pageKey - Key from PAGES registry
 * @returns Next.js Metadata object
 * @throws {SEODataNotFoundError} If page key doesn't exist
 * 
 * @example
 * ```ts
 * // In page.tsx
 * export const metadata = generateMetadata('about');
 * ```
 */
export function generateMetadata(pageKey: string): Metadata {
  if (!isValidPageKey(pageKey)) {
    throw new SEODataNotFoundError('page', pageKey);
  }

  const page = PAGES[pageKey]!;

  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    alternates: {
      canonical: page.canonical,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      type: page.ogType || 'website',
      url: `${SITE_CONFIG.url}${page.canonical}`,
      siteName: SITE_CONFIG.name,
      locale: SITE_CONFIG.locale,
      ...(page.publishedTime ? { publishedTime: page.publishedTime } : {}),
      ...(page.modifiedTime ? { modifiedTime: page.modifiedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
    },
  };
}

/**
 * Generate blog post metadata with article-specific fields
 * 
 * @param slug - Blog post slug
 * @returns Next.js Metadata object with article schema
 * @throws {SEODataNotFoundError} If blog post doesn't exist
 * 
 * @example
 * ```ts
 * // In blog/[slug]/page.tsx
 * export async function generateMetadata({ params }: { params: { slug: string } }) {
 *   return generateBlogMetadata(params.slug);
 * }
 * ```
 */
export function generateBlogMetadata(slug: string): Metadata {
  if (!isValidBlogSlug(slug)) {
    throw new SEODataNotFoundError('blog', slug);
  }

  const post = BLOG_POSTS[slug]!;

  return {
    title: `${post.title} — ${SITE_CONFIG.name}`,
    description: post.description,
    keywords: post.keywords,
    authors: [{ name: post.author, url: SITE_CONFIG.url }],
    alternates: {
      canonical: post.canonical,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.publishedTime,
      modifiedTime: post.modifiedTime || post.publishedTime,
      authors: [post.author],
      section: post.section,
      tags: post.tags,
      url: `${SITE_CONFIG.url}${post.canonical}`,
      siteName: SITE_CONFIG.name,
      locale: SITE_CONFIG.locale,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  };
}

/**
 * Generate project showcase metadata
 * 
 * @param slug - Project slug
 * @returns Next.js Metadata object
 * @throws {SEODataNotFoundError} If project doesn't exist
 * 
 * @example
 * ```ts
 * // In project-showcase/[slug]/page.tsx
 * export async function generateMetadata({ params }: { params: { slug: string } }) {
 *   return generateProjectMetadata(params.slug);
 * }
 * ```
 */
export function generateProjectMetadata(slug: string): Metadata {
  if (!isValidProjectSlug(slug)) {
    throw new SEODataNotFoundError('project', slug);
  }

  const project = PROJECTS[slug]!;

  return {
    title: `${project.title} — Case Study | ${SITE_CONFIG.name}`,
    description: project.description,
    keywords: [...project.technologies, project.industry, 'case study', 'success story'],
    alternates: {
      canonical: `/project-showcase/${slug}`,
    },
    openGraph: {
      title: project.title,
      description: project.description,
      type: 'article',
      url: `${SITE_CONFIG.url}/project-showcase/${slug}`,
      siteName: SITE_CONFIG.name,
      locale: SITE_CONFIG.locale,
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description,
    },
  };
}

// ============================================================================
// Data Retrieval Functions
// ============================================================================

/**
 * Get all blog post slugs for sitemap/static path generation
 * 
 * @returns Array of all blog post slugs
 * 
 * @example
 * ```ts
 * // For generateStaticParams
 * export function generateStaticParams() {
 *   return getAllBlogSlugs().map(slug => ({ slug }));
 * }
 * ```
 */
export function getAllBlogSlugs(): string[] {
  return Object.keys(BLOG_POSTS);
}

/**
 * Get all project slugs for sitemap/static path generation
 * 
 * @returns Array of all project slugs
 */
export function getAllProjectSlugs(): string[] {
  return Object.keys(PROJECTS);
}

/**
 * Get all blog posts sorted by publication date (newest first)
 * 
 * @returns Array of blog post metadata sorted by date
 */
export function getAllBlogPosts(): BlogPostMeta[] {
  return Object.values(BLOG_POSTS).sort(
    (a, b) => new Date(b.publishedTime).getTime() - new Date(a.publishedTime).getTime()
  );
}

/**
 * Get all projects sorted by publication date (newest first)
 * 
 * @returns Array of project metadata sorted by date
 */
export function getAllProjects(): ProjectMeta[] {
  return Object.values(PROJECTS).sort(
    (a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  );
}

/**
 * Get blog posts by category
 * 
 * @param category - Category to filter by
 * @returns Array of blog posts in the specified category
 */
export function getPostsByCategory(category: string): BlogPostMeta[] {
  return getAllBlogPosts().filter((post) => post.category === category);
}

/**
 * Get blog posts by tag
 * 
 * @param tag - Tag to filter by
 * @returns Array of blog posts with the specified tag
 */
export function getPostsByTag(tag: string): BlogPostMeta[] {
  return getAllBlogPosts().filter((post) => post.tags?.includes(tag));
}

// ============================================================================
// Related Content Functions
// ============================================================================

/**
 * Scoring algorithm for content relevance
 */
interface ScoredContent<T> {
  item: T;
  score: number;
}

/**
 * Calculate relevance score between two blog posts
 * 
 * @param current - Current blog post
 * @param candidate - Candidate related post
 * @returns Relevance score (higher = more related)
 */
function calculatePostRelevance(current: BlogPostMeta, candidate: BlogPostMeta): number {
  let score = 0;

  // Same category is highly relevant
  if (candidate.category === current.category) {
    score += 10;
  }

  // Count matching tags
  if (current.tags && candidate.tags) {
    const matchingTags = candidate.tags.filter((tag) => current.tags?.includes(tag));
    score += matchingTags.length * 5;
  }

  // Keywords overlap (bonus points)
  const currentKeywords = new Set(current.keywords.map((k) => k.toLowerCase()));
  const matchingKeywords = candidate.keywords.filter((k) =>
    currentKeywords.has(k.toLowerCase())
  );
  score += matchingKeywords.length * 2;

  return score;
}

/**
 * Get related blog posts based on tags, category, and keywords
 * 
 * Uses scoring algorithm:
 * - Same category: +10 points
 * - Matching tag: +5 points per tag
 * - Matching keyword: +2 points per keyword
 * 
 * @param currentSlug - Current blog post slug
 * @param limit - Maximum number of related posts to return (default: 3)
 * @returns Array of related blog posts sorted by relevance
 * 
 * @example
 * ```ts
 * const relatedPosts = getRelatedPosts('solid-principles', 3);
 * ```
 */
export function getRelatedPosts(currentSlug: string, limit = 3): BlogPostMeta[] {
  if (!isValidBlogSlug(currentSlug)) {
    console.warn(`Invalid blog slug for related posts: ${currentSlug}`);
    return [];
  }

  const current = BLOG_POSTS[currentSlug]!;
  const allPosts = Object.values(BLOG_POSTS).filter((post) => post.slug !== currentSlug);

  // Score each post by relevance
  const scored: ScoredContent<BlogPostMeta>[] = allPosts.map((post) => ({
    item: post,
    score: calculatePostRelevance(current, post),
  }));

  // Sort by score (descending) and return top N
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.item);
}

/**
 * Get related projects based on technologies and industry
 * 
 * @param currentSlug - Current project slug
 * @param limit - Maximum number of related projects (default: 2)
 * @returns Array of related projects sorted by relevance
 */
export function getRelatedProjects(currentSlug: string, limit = 2): ProjectMeta[] {
  if (!isValidProjectSlug(currentSlug)) {
    console.warn(`Invalid project slug for related projects: ${currentSlug}`);
    return [];
  }

  const current = PROJECTS[currentSlug]!;
  const allProjects = Object.values(PROJECTS).filter((proj) => proj.slug !== currentSlug);

  // Score by technology and industry overlap
  const scored: ScoredContent<ProjectMeta>[] = allProjects.map((project) => {
    let score = 0;

    // Same industry
    if (project.industry === current.industry) {
      score += 10;
    }

    // Matching technologies
    const matchingTech = project.technologies.filter((tech) =>
      current.technologies.includes(tech)
    );
    score += matchingTech.length * 5;

    return { item: project, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.item);
}

// ============================================================================
// Validation Functions
// ============================================================================

/**
 * Validate all SEO data for consistency
 * Useful for build-time validation
 * 
 * @returns Validation result with any errors found
 */
export function validateSEOData(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Validate blog posts
  Object.entries(BLOG_POSTS).forEach(([key, post]) => {
    if (post.slug !== key) {
      errors.push(`Blog post key mismatch: "${key}" !== "${post.slug}"`);
    }
    if (post.description.length > 160) {
      errors.push(`Blog post "${key}" description too long: ${post.description.length} chars`);
    }
    if (!post.publishedTime) {
      errors.push(`Blog post "${key}" missing publishedTime`);
    }
  });

  // Validate projects
  Object.entries(PROJECTS).forEach(([key, project]) => {
    if (project.slug !== key) {
      errors.push(`Project key mismatch: "${key}" !== "${project.slug}"`);
    }
    if (project.description.length > 160) {
      errors.push(`Project "${key}" description too long: ${project.description.length} chars`);
    }
  });

  // Validate pages
  Object.entries(PAGES).forEach(([key, page]) => {
    if (page.description.length > 160) {
      errors.push(`Page "${key}" description too long: ${page.description.length} chars`);
    }
    if (!page.canonical.startsWith('/')) {
      errors.push(`Page "${key}" canonical must start with /: "${page.canonical}"`);
    }
  });

  return {
    valid: errors.length === 0,
    errors,
  };
}
