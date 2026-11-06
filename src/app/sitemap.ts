import type { MetadataRoute } from 'next';
import { SITE_CONFIG, PAGES, BLOG_POSTS } from '@/lib/seo/data';
import { CANONICAL_BASE_URL } from '@/lib/seo/url';

/**
 * Dynamic sitemap generated from central data registry
 *
 * Next.js automatically converts this to XML and serves at /sitemap.xml
 * All URLs, dates, and priorities are calculated from the central data,
 * ensuring the sitemap stays in sync without manual updates.
 *
 * @returns Sitemap entries for all pages and blog posts
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
      caseStudies: 0.8,
      servicesPackages: 0.8,
      startASprint: 0.7,
      codeAudit: 0.8,
      fractionalCTO: 0.8,
      hireDeveloper: 0.8,
      documentCrossCheckLt: 0.8,
      listCompareLt: 0.7,
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
      caseStudies: 'monthly',
      servicesPackages: 'monthly',
      startASprint: 'monthly',
      codeAudit: 'monthly',
      fractionalCTO: 'monthly',
      hireDeveloper: 'monthly',
      documentCrossCheckLt: 'monthly',
      listCompareLt: 'monthly',
      contact: 'monthly',
      consultingProcess: 'monthly',
      founders: 'monthly',
      privacy: 'yearly',
      security: 'yearly',
      terms: 'yearly',
    };

    return {
      url: `${baseUrl}${page.canonical}`,
      // A page that records its own modified date uses it; the rest report the time of the request
      lastModified: page.modifiedTime ? new Date(page.modifiedTime) : now,
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

  // Combine all entries
  return [...staticPages, ...blogPosts];
}
