# P2-2: Canonical URL Enforcement & Redirects

**Priority**: P2 Medium  
**Effort**: 1 hour  
**Maintainability**: ⭐⭐⭐⭐⭐

## Overview

Implement **canonical URL enforcement** to prevent duplicate content issues:

- Force `www` to non-`www` (or vice versa)
- Enforce HTTPS
- Trailing slash normalization
- Lowercase URL enforcement
- Prevent parameter-based duplicates

## Why This Matters

**Duplicate Content Problems**:

- `https://www.maxwell-software.com` vs `https://maxwell-software.com` (same content, different URLs)
- `https://maxwell-software.com/services` vs `https://maxwell-software.com/services/` (trailing slash)
- `https://maxwell-software.com/Services` vs `https://maxwell-software.com/services` (case difference)

**SEO Impact**: Search engines may:

- Split PageRank between duplicates
- Index wrong version
- Show inconsistent URLs in results
- Penalize for duplicate content

**Solution**: Server-side redirects (301 permanent) to enforce canonical version.

---

## Architecture

```
User Request
    ↓
Next.js Middleware (URL normalization)
    ↓
301 Redirect (if needed)
    ↓
Canonical Version
```

**Key Principle**: All URLs normalized at the edge before rendering. No duplicate content possible.

---

## Implementation

### 1. Next.js Redirects Configuration

**File**: `next.config.ts` (UPDATE)

```typescript
import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV === 'development';

const config: NextConfig = {
  // ... existing config

  /**
   * Canonical URL enforcement via 301 redirects
   * Prevents duplicate content from www/non-www, trailing slashes, etc.
   */
  async redirects() {
    return [
      // 1. Enforce non-www (www.maxwell-software.com → maxwell-software.com)
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.maxwell-software.com',
          },
        ],
        destination: 'https://maxwell-software.com/:path*',
        permanent: true, // 301 redirect
      },

      // 2. Trailing slash normalization (remove trailing slashes)
      {
        source: '/:path+/',
        destination: '/:path+',
        permanent: true,
      },

      // 3. Legacy URL redirects (if you've changed structure)
      // Example: Old blog structure
      // {
      //   source: '/articles/:slug',
      //   destination: '/blog/:slug',
      //   permanent: true,
      // },

      // 4. Case-insensitive redirects (handled by middleware below)
    ];
  },

  /**
   * Header configuration for canonical enforcement
   */
  async headers() {
    return [
      // ... existing headers

      // Link header for canonical (backup to meta tag)
      {
        source: '/:path*',
        headers: [
          {
            key: 'Link',
            value: '<https://maxwell-software.com/:path*>; rel="canonical"',
          },
        ],
      },
    ];
  },
};

export default config;
```

---

### 2. Middleware for Advanced Normalization

**File**: `src/middleware.ts` (CREATE)

```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware for URL normalization
 * Runs on every request before rendering
 */
export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // 1. Lowercase enforcement
  if (pathname !== pathname.toLowerCase()) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.toLowerCase();
    return NextResponse.redirect(url, 301);
  }

  // 2. Remove duplicate slashes
  if (pathname.includes('//')) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/\/+/g, '/');
    return NextResponse.redirect(url, 301);
  }

  // 3. Remove common parameter duplicates (optional)
  // Example: Remove utm_* from canonical
  const params = new URLSearchParams(search);
  const hasUTM = Array.from(params.keys()).some((key) => key.startsWith('utm_'));

  if (hasUTM && !pathname.startsWith('/api/')) {
    // Keep UTM for tracking, but don't make it canonical
    // (This is handled by canonical meta tag, not redirect)
    // No action needed here
  }

  // 4. Allow request to proceed
  return NextResponse.next();
}

/**
 * Configure which paths middleware runs on
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, robots.txt, sitemap.xml (static files)
     * - /images/ (public images)
     */
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|images/).*)',
  ],
};
```

---

### 3. Canonical Meta Tags (Defense in Depth)

Already implemented via metadata, but ensure it's correct:

**File**: `src/app/page.tsx`

```typescript
import { generateMetadata } from '@/lib/seo/utils';

// This generates:
// <link rel="canonical" href="https://maxwell-software.com/" />
export const metadata = generateMetadata('home');
```

**Verify** in all page.tsx files that canonical URLs:

- Use absolute URLs (include domain)
- Use lowercase
- No trailing slash (unless directory)
- Use HTTPS

---

### 4. Sitemap Consistency

**File**: `src/app/sitemap.ts`

Ensure all URLs match canonical format:

```typescript
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://maxwell-software.com'; // No www, https

  return [
    {
      url: `${baseUrl}/`, // Root with slash
      // ...
    },
    {
      url: `${baseUrl}/services`, // No trailing slash
      // ...
    },
  ];
}
```

---

## Testing Canonical Enforcement

### 1. Test WWW → Non-WWW

```bash
# Should redirect 301
curl -I https://www.maxwell-software.com
# Look for:
# HTTP/2 301
# location: https://maxwell-software.com/
```

### 2. Test Trailing Slash

```bash
# Should redirect 301
curl -I https://maxwell-software.com/services/
# Look for:
# HTTP/2 301
# location: https://maxwell-software.com/services
```

### 3. Test Case Normalization

```bash
# Should redirect 301
curl -I https://maxwell-software.com/Services
# Look for:
# HTTP/2 301
# location: https://maxwell-software.com/services
```

### 4. Test Canonical Meta Tag

```bash
# View page source
curl https://maxwell-software.com/services | grep canonical
# Should show:
# <link rel="canonical" href="https://maxwell-software.com/services" />
```

---

## Advanced: Canonical with Parameters

For pages with query parameters (e.g., `/blog?page=2`):

**Option 1**: Different pages are unique → use canonical with params

```typescript
// In blog index page
export const metadata = {
  alternates: {
    canonical: '/blog?page=2', // Include page param
  },
};
```

**Option 2**: Ignore pagination in canonical (consolidate signals)

```typescript
// In blog index page
export const metadata = {
  alternates: {
    canonical: '/blog', // All pages point to /blog
  },
};

// Add rel="next" and rel="prev" for pagination
<link rel="prev" href="/blog?page=1" />
<link rel="next" href="/blog?page=3" />
```

---

## robots.txt Enhancement

**File**: `public/robots.txt`

```txt
User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /*?utm_* # Ignore UTM parameters
Crawl-delay: 0.5

# Sitemap (canonical URL)
Sitemap: https://maxwell-software.com/sitemap.xml
```

---

## Benefits

✅ **No Duplicate Content**: One canonical URL per page  
✅ **Consolidated PageRank**: All link equity flows to one URL  
✅ **Consistent Branding**: Always show same domain format  
✅ **Better Indexing**: Search engines index correct version  
✅ **Clean Analytics**: No split traffic between duplicates

---

## Common Pitfalls to Avoid

❌ **Chain Redirects**: Don't redirect A→B→C (bad for SEO)  
✅ **Direct Redirects**: Always redirect A→C in one hop

❌ **302 Temporary**: Don't use temporary redirects for canonical  
✅ **301 Permanent**: Use permanent redirects to pass PageRank

❌ **Case-Sensitive**: Don't allow /Services and /services  
✅ **Lowercase**: Enforce lowercase URLs universally

❌ **Mixed Signals**: Don't have canonical tag pointing to different URL than actual  
✅ **Consistency**: Ensure canonical tag, sitemap, redirects all agree

---

## Monitoring

### Google Search Console:

1. Navigate to **Coverage** report
2. Check for "Duplicate, submitted URL not selected as canonical"
3. Should decrease after implementation

### Screaming Frog SEO Spider:

```bash
# Crawl your site
# Check for:
# - Multiple URLs for same content
# - Redirect chains
# - Canonical inconsistencies
```

---

## Migration Checklist

- [ ] Add redirects to `next.config.ts` (www → non-www)
- [ ] Create `src/middleware.ts` for lowercase enforcement
- [ ] Test www redirect: `curl -I https://www.maxwell-software.com`
- [ ] Test trailing slash: `curl -I https://maxwell-software.com/services/`
- [ ] Test case: `curl -I https://maxwell-software.com/Services`
- [ ] Verify canonical tags on all pages
- [ ] Update sitemap with consistent URLs
- [ ] Monitor Google Search Console for duplicate issues
- [ ] Check analytics for traffic consolidation

---

## Expected Impact

| Metric                     | Before | After   |
| -------------------------- | ------ | ------- |
| **Duplicate URLs Indexed** | 30-50  | 0       |
| **Canonical Errors (GSC)** | 10-20  | 0       |
| **PageRank Consolidation** | Split  | Unified |
| **Indexing Efficiency**    | 60-70% | 95-100% |

**Timeline**: 2-4 weeks for search engines to re-crawl and consolidate.

---

## Next Steps

1. Implement redirects in `next.config.ts`
2. Create `src/middleware.ts` for case normalization
3. Test all redirect scenarios
4. Deploy to production
5. Submit updated sitemap to GSC
6. Monitor coverage report for 2-4 weeks
7. Verify traffic consolidation in analytics

---

## Additional Resources

- [Google: Consolidate Duplicate URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Next.js Redirects Documentation](https://nextjs.org/docs/app/api-reference/next-config-js/redirects)
- [Next.js Middleware Documentation](https://nextjs.org/docs/app/building-your-application/routing/middleware)
