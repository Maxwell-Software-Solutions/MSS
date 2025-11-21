# P1-1: Dynamic Sitemap Generation

**Priority**: P1 High  
**Effort**: 2-3 hours  
**Maintainability**: ⭐⭐⭐⭐⭐

## Overview

Replace static `public/sitemap.xml` with **dynamic Next.js sitemap** (`src/app/sitemap.ts`) that auto-generates from the central data registry. This ensures the sitemap always stays in sync with your content without manual updates.

## Current Issues

❌ Manual maintenance of `public/sitemap.xml`  
❌ Hardcoded `lastmod` dates  
❌ Risk of forgetting to add new pages  
❌ Duplicate data (URLs defined in both routing and sitemap)

## Architecture

```
Central Data Registry (data.ts)
    ↓
Dynamic Sitemap Generator (sitemap.ts)
    ↓
Next.js Auto-builds XML
    ↓
Served at /sitemap.xml
```

**Key Principle**: URLs, dates, priorities calculated from central data. Zero manual XML editing.

---

## Implementation

### 1. Create Dynamic Sitemap

**File**: `src/app/sitemap.ts`

```typescript
import type { MetadataRoute } from 'next';
import { SITE_CONFIG, PAGES, BLOG_POSTS, PROJECTS } from '@/lib/seo/data';

/**
 * Dynamic sitemap generated from central data registry
 * Next.js automatically converts this to XML at /sitemap.xml
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;
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
```

---

### 2. Delete Static Sitemap

```bash
# Remove the old static sitemap
rm public/sitemap.xml
```

**Why**: Next.js will now serve the dynamic sitemap at `/sitemap.xml` automatically. Having both would cause conflicts.

---

### 3. Update robots.txt Reference

**File**: `public/robots.txt`

```txt
User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/
Crawl-delay: 0.5

User-agent: Googlebot
Disallow: /api/
Crawl-delay: 0

User-agent: Bingbot
Disallow: /api/
Crawl-delay: 1

# Dynamic sitemap (Next.js serves from sitemap.ts)
Sitemap: https://maxwell-software.com/sitemap.xml
```

**No change needed** — URL remains `/sitemap.xml`, but now it's dynamically generated.

---

### 4. Test Dynamic Sitemap

**Development**:

```bash
pnpm dev
# Visit http://localhost:3000/sitemap.xml
```

**Expected XML output**:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://maxwell-software.com/</loc>
    <lastmod>2025-11-21T12:00:00.000Z</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://maxwell-software.com/services</loc>
    <lastmod>2025-11-21T12:00:00.000Z</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://maxwell-software.com/blog/solid-principles</loc>
    <lastmod>2024-12-19T00:00:00.000Z</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <!-- ... all pages auto-generated from data -->
</urlset>
```

---

### 5. Advanced: Multi-Sitemap for Large Sites

If you grow beyond 50,000 URLs (unlikely for most sites), split into multiple sitemaps:

**File**: `src/app/sitemap.ts` (sitemap index)

```typescript
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://maxwell-software.com/sitemap/static.xml',
      lastModified: new Date(),
    },
    {
      url: 'https://maxwell-software.com/sitemap/blog.xml',
      lastModified: new Date(),
    },
    {
      url: 'https://maxwell-software.com/sitemap/projects.xml',
      lastModified: new Date(),
    },
  ];
}
```

**File**: `src/app/sitemap/static/route.ts`

```typescript
import { PAGES } from '@/lib/seo/data';

export async function GET() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${Object.values(PAGES)
    .map(
      (page) => `
  <url>
    <loc>https://maxwell-software.com${page.canonical}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>`
    )
    .join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
```

**Note**: Only needed for massive sites. Start with single sitemap.

---

## Benefits

✅ **Zero Maintenance**: Add page to data registry → sitemap auto-updates  
✅ **Accurate Dates**: Uses actual publish/modified dates from data  
✅ **Type-Safe**: TypeScript prevents URL typos  
✅ **DRY**: No duplicate URL definitions  
✅ **Smart Priorities**: Auto-assigns based on content type  
✅ **Build-Time Generation**: Sitemap compiled at build, not runtime

---

## Enhanced Features

### 1. Add Images to Sitemap (Optional)

```typescript
// In sitemap.ts
const blogPostsWithImages = Object.values(BLOG_POSTS).map((post) => ({
  url: `${baseUrl}${post.canonical}`,
  lastModified: new Date(post.modifiedTime || post.publishedTime),
  changeFrequency: 'monthly' as const,
  priority: 0.7,
  images: [`${baseUrl}${post.canonical}/opengraph-image`], // NEW
}));
```

**Result**: Google indexes your OG images for image search.

---

### 2. Exclude Pages Conditionally

```typescript
// Exclude pages with noindex
const publicPages = Object.entries(PAGES)
  .filter(([key, page]) => {
    // Don't include draft/private pages
    return !page.noindex;
  })
  .map(([key, page]) => ({
    // ... sitemap entry
  }));
```

---

### 3. Add Alternate Languages (i18n)

```typescript
const homePage = {
  url: `${baseUrl}/`,
  lastModified: now,
  alternates: {
    languages: {
      en: `${baseUrl}/en`,
      lt: `${baseUrl}/lt`,
    },
  },
};
```

---

## Validation

### Google Search Console:

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Navigate to **Sitemaps** (left sidebar)
3. Submit `https://maxwell-software.com/sitemap.xml`
4. Google will crawl and report coverage

### XML Sitemap Validator:

1. Visit [XML Sitemap Validator](https://www.xml-sitemaps.com/validate-xml-sitemap.html)
2. Enter `https://maxwell-software.com/sitemap.xml`
3. Check for errors

### Manual Inspection:

```bash
curl https://maxwell-software.com/sitemap.xml
```

---

## Automatic Updates

**When you add a new blog post**:

```typescript
// In src/lib/seo/data.ts
export const BLOG_POSTS = {
  // ... existing posts
  'new-post-slug': {
    slug: 'new-post-slug',
    title: 'My New Post',
    // ... metadata
    publishedTime: '2025-11-22T00:00:00.000Z',
  },
};
```

**Next build**:

```bash
pnpm build
```

✅ Sitemap automatically includes new post  
✅ No XML editing required  
✅ Correct priority/changefreq assigned  
✅ Accurate publish date from data

---

## Migration Checklist

- [ ] Implement central data layer (`src/lib/seo/data.ts`)
- [ ] Create `src/app/sitemap.ts` with dynamic generation
- [ ] Delete `public/sitemap.xml`
- [ ] Test locally: visit `/sitemap.xml`
- [ ] Verify XML structure and URLs
- [ ] Deploy to production
- [ ] Submit to Google Search Console
- [ ] Monitor indexing status (1-2 weeks)

---

## Performance

- **Build Time**: Sitemap generated once during `next build`
- **Runtime**: Served as static XML from `.next/` directory
- **CDN**: Cached by Vercel/CDN like any static asset
- **Impact**: Zero — no performance overhead

---

## Next Steps

1. Implement dynamic sitemap
2. Delete static `public/sitemap.xml`
3. Submit to Google Search Console
4. Set up automatic resubmission on deploy (optional):

```bash
# .github/workflows/sitemap-ping.yml
name: Ping Sitemap
on:
  push:
    branches: [main]
jobs:
  ping:
    runs-on: ubuntu-latest
    steps:
      - name: Ping Google
        run: |
          curl "https://www.google.com/ping?sitemap=https://maxwell-software.com/sitemap.xml"
      - name: Ping Bing
        run: |
          curl "https://www.bing.com/ping?sitemap=https://maxwell-software.com/sitemap.xml"
```

This notifies search engines immediately when your sitemap updates.
