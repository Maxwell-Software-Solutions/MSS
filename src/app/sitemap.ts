import type { MetadataRoute } from 'next';
import { SITE_CONFIG, PAGES, BLOG_POSTS, PROJECTS } from '@/lib/seo/data';
import { CANONICAL_BASE_URL } from '@/lib/seo/url';

/**
 * Dynamic sitemap generated from central data registry
 *
 * Next.js automatically converts this to XML and serves at /sitemap.xml
 * All URLs, dates, and priorities are calculated from the central data,
 * ensuring the sitemap stays in sync without manual updates.
 *
 * @returns Sitemap entries for all pages, blog posts, and projects
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = CANONICAL_BASE_URL ?? SITE_CONFIG.url;
  const now = new Date();

  // Static pages from PAGES registry
  const staticPages = Object.entries(PAGES).map(([key, page]) => {
    // Assign priority based on page importance
    const priorityMap: Record<string, number> = {
      home: 1.0,
      services: 0.9,
      about: 0.8,
      blog: 0.8,
      projectShowcase: 0.7,
      contact: 0.7,
      consultingProcess: 0.6,
      founders: 0.6,
      privacy: 0.3,
      security: 0.3,
      terms: 0.3,
    };

    // Assign changefreq based on content type
    const changefreqMap: Record<string, MetadataRoute.Sitemap[number]['changeFrequency']> = {
      home: 'weekly',
      services: 'monthly',
      about: 'monthly',
      blog: 'weekly',
      projectShowcase: 'monthly',
      contact: 'monthly',
      consultingProcess: 'monthly',
      founders: 'monthly',
      privacy: 'yearly',
      security: 'yearly',
      terms: 'yearly',
    };

    return {
      url: `${baseUrl}${page.canonical}`,
      lastModified: now,
      changeFrequency: changefreqMap[key] || 'monthly',
      priority: priorityMap[key] || 0.5,
    };
  });

  // Blog posts from BLOG_POSTS registry
  const blogPosts = Object.values(BLOG_POSTS).map((post) => ({
    url: `${baseUrl}${post.canonical}`,
    // Use actual publish/modified dates from data
    lastModified: new Date(post.modifiedTime || post.publishedTime),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Project showcases from PROJECTS registry
  const projects = Object.values(PROJECTS).map((project) => ({
    url: `${baseUrl}/project-showcase/${project.slug}`,
    lastModified: new Date(project.publishedDate),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Combine all entries
  return [...staticPages, ...blogPosts, ...projects];
}
