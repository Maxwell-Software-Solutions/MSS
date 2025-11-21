# P0-1: Open Graph Image Generation (Dynamic)

**Priority**: P0 Critical  
**Effort**: 3-4 hours  
**Maintainability**: ⭐⭐⭐⭐⭐

## Overview

Generate **dynamic Open Graph images** using Next.js `ImageResponse` API, pulling data from the central SEO data registry. This approach eliminates the need for static image files and ensures consistency with metadata.

## Architecture

```
Central Data (data.ts)
    ↓
OG Image Generator (opengraph-image.tsx)
    ↓
Dynamic PNG (1200x630)
```

**Key Principle**: OG images are **generated from the same data source** as page metadata, ensuring they never drift out of sync.

---

## Implementation

### 1. Root OG Image (Homepage)

**File**: `src/app/opengraph-image.tsx`

```typescript
import { ImageResponse } from 'next/og';
import { SITE_CONFIG } from '@/lib/seo/data';

export const runtime = 'edge';
export const alt = `${SITE_CONFIG.name} — ${SITE_CONFIG.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * Generates root Open Graph image dynamically
 * Data source: SITE_CONFIG from central registry
 */
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px',
          position: 'relative',
        }}
      >
        {/* Decorative accent circle */}
        <div
          style={{
            position: 'absolute',
            top: '-10%',
            right: '-10%',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(184, 134, 11, 0.15) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            zIndex: 1,
          }}
        >
          {/* Company name */}
          <h1
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: '#B8860B',
              margin: 0,
              marginBottom: 24,
              letterSpacing: '-0.02em',
            }}
          >
            {SITE_CONFIG.name}
          </h1>

          {/* Tagline */}
          <p
            style={{
              fontSize: 36,
              fontWeight: 400,
              color: '#ffffff',
              margin: 0,
              maxWidth: '900px',
              lineHeight: 1.4,
            }}
          >
            {SITE_CONFIG.title}
          </p>

          {/* Subtle separator */}
          <div
            style={{
              width: '120px',
              height: '2px',
              background: '#B8860B',
              marginTop: 32,
              marginBottom: 32,
            }}
          />

          {/* Core values */}
          <p
            style={{
              fontSize: 20,
              fontWeight: 400,
              color: '#999999',
              margin: 0,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Quality • Reliability • Excellence
          </p>
        </div>
      </div>
    ),
    { ...size }
  );
}
```

**Result**: `https://maxwell-software.com/opengraph-image` auto-generated

---

### 2. Blog Post OG Images (Dynamic per post)

**File**: `src/app/blog/[slug]/opengraph-image.tsx`

```typescript
import { ImageResponse } from 'next/og';
import { SITE_CONFIG, BLOG_POSTS } from '@/lib/seo/data';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * Generates dynamic OG image for each blog post
 * Data source: BLOG_POSTS from central registry
 */
export default async function Image({ params }: { params: { slug: string } }) {
  const post = BLOG_POSTS[params.slug];

  if (!post) {
    // Fallback for missing posts
    return new ImageResponse(<div style={{ background: '#1a1a1a', width: '100%', height: '100%' }} />, { ...size });
  }

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '60px 80px',
          position: 'relative',
        }}
      >
        {/* Header with category badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: 40,
          }}
        >
          <div
            style={{
              background: 'rgba(184, 134, 11, 0.2)',
              border: '2px solid #B8860B',
              borderRadius: '8px',
              padding: '8px 16px',
              color: '#B8860B',
              fontSize: 18,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            {post.category}
          </div>
        </div>

        {/* Article title */}
        <h1
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: '#ffffff',
            margin: 0,
            lineHeight: 1.2,
            marginBottom: 24,
            maxWidth: '1000px',
          }}
        >
          {post.title}
        </h1>

        {/* Excerpt/description */}
        <p
          style={{
            fontSize: 24,
            fontWeight: 400,
            color: '#cccccc',
            margin: 0,
            lineHeight: 1.5,
            maxWidth: '900px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {post.excerpt}
        </p>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 'auto',
            paddingTop: 40,
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          {/* Company name */}
          <div
            style={{
              fontSize: 20,
              fontWeight: 600,
              color: '#B8860B',
            }}
          >
            {SITE_CONFIG.name}
          </div>

          {/* Read time */}
          <div
            style={{
              fontSize: 18,
              color: '#999999',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span>📖</span>
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Decorative accent */}
        <div
          style={{
            position: 'absolute',
            bottom: '-20%',
            left: '-10%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(184, 134, 11, 0.1) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />
      </div>
    ),
    { ...size }
  );
}

// Generate alt text from data
export async function generateImageMetadata({ params }: { params: { slug: string } }) {
  const post = BLOG_POSTS[params.slug];
  return [
    {
      alt: post ? `${post.title} — ${SITE_CONFIG.name}` : 'Blog Post',
    },
  ];
}
```

**Result**: Each blog post gets unique OG image at `/blog/[slug]/opengraph-image`

---

### 3. Project Showcase OG Images

**File**: `src/app/project-showcase/[slug]/opengraph-image.tsx`

```typescript
import { ImageResponse } from 'next/og';
import { SITE_CONFIG, PROJECTS } from '@/lib/seo/data';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * Generates dynamic OG image for case studies
 * Data source: PROJECTS from central registry
 */
export default async function Image({ params }: { params: { slug: string } }) {
  const project = PROJECTS[params.slug];

  if (!project) {
    return new ImageResponse(<div style={{ background: '#1a1a1a', width: '100%', height: '100%' }} />, { ...size });
  }

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0f1419 0%, #1a1a1a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '60px 80px',
        }}
      >
        {/* Case Study badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: '#B8860B',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
            }}
          >
            Case Study
          </div>
          <div
            style={{
              width: '6px',
              height: '6px',
              background: '#B8860B',
              borderRadius: '50%',
            }}
          />
          <div
            style={{
              fontSize: 16,
              color: '#999999',
            }}
          >
            {project.industry}
          </div>
        </div>

        {/* Project title */}
        <h1
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: '#ffffff',
            margin: 0,
            lineHeight: 1.2,
            marginBottom: 32,
            maxWidth: '900px',
          }}
        >
          {project.title}
        </h1>

        {/* Metrics (key results) */}
        <div
          style={{
            display: 'flex',
            gap: 32,
            marginTop: 32,
          }}
        >
          {project.metrics.slice(0, 3).map((metric, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: 'rgba(184, 134, 11, 0.1)',
                border: '2px solid rgba(184, 134, 11, 0.3)',
                borderRadius: '12px',
                padding: '24px 32px',
              }}
            >
              <div
                style={{
                  fontSize: 32,
                  fontWeight: 700,
                  color: '#B8860B',
                }}
              >
                {metric}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: 'auto',
            paddingTop: 40,
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <div
            style={{
              fontSize: 20,
              fontWeight: 600,
              color: '#B8860B',
            }}
          >
            {SITE_CONFIG.name}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

export async function generateImageMetadata({ params }: { params: { slug: string } }) {
  const project = PROJECTS[params.slug];
  return [
    {
      alt: project ? `${project.title} — ${SITE_CONFIG.name}` : 'Case Study',
    },
  ];
}
```

---

### 4. Generic OG Image Component (Reusable)

For pages that need custom OG images, create a reusable generator:

**File**: `src/lib/seo/components/generateOGImage.tsx`

```typescript
import { ImageResponse } from 'next/og';
import { SITE_CONFIG } from '@/lib/seo/data';

interface OGImageOptions {
  title: string;
  description?: string;
  badge?: string;
  theme?: 'light' | 'dark' | 'gradient';
}

export const OG_IMAGE_SIZE = { width: 1200, height: 630 };

/**
 * Reusable OG image generator for any page
 */
export function generateOGImage(options: OGImageOptions) {
  const { title, description, badge, theme = 'gradient' } = options;

  const backgrounds = {
    light: '#f5f5f5',
    dark: '#1a1a1a',
    gradient: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
  };

  const textColors = {
    light: '#1a1a1a',
    dark: '#ffffff',
    gradient: '#ffffff',
  };

  return new ImageResponse(
    (
      <div
        style={{
          background: backgrounds[theme],
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '60px 80px',
        }}
      >
        {badge && (
          <div
            style={{
              background: 'rgba(184, 134, 11, 0.2)',
              border: '2px solid #B8860B',
              borderRadius: '8px',
              padding: '8px 16px',
              color: '#B8860B',
              fontSize: 18,
              fontWeight: 600,
              textTransform: 'uppercase',
              marginBottom: 32,
              display: 'inline-block',
              alignSelf: 'flex-start',
            }}
          >
            {badge}
          </div>
        )}

        <h1
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: textColors[theme],
            margin: 0,
            lineHeight: 1.1,
            marginBottom: description ? 24 : 0,
          }}
        >
          {title}
        </h1>

        {description && (
          <p
            style={{
              fontSize: 28,
              color: theme === 'light' ? '#666666' : '#cccccc',
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            {description}
          </p>
        )}

        <div
          style={{
            marginTop: 'auto',
            fontSize: 20,
            fontWeight: 600,
            color: '#B8860B',
          }}
        >
          {SITE_CONFIG.name}
        </div>
      </div>
    ),
    { ...OG_IMAGE_SIZE }
  );
}
```

**Usage**:

```typescript
// src/app/services/opengraph-image.tsx
import { generateOGImage } from '@/lib/seo/components/generateOGImage';

export default async function Image() {
  return generateOGImage({
    title: 'Professional Software Engineering Services',
    description: 'Code Quality • Testing • CI/CD • Reliability',
    badge: 'Services',
  });
}
```

---

## Testing OG Images

### Preview locally:

```bash
pnpm dev
# Visit:
# http://localhost:3000/opengraph-image
# http://localhost:3000/blog/solid-principles/opengraph-image
```

### Validate with tools:

- [OpenGraph.xyz](https://www.opengraph.xyz/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

---

## Benefits

✅ **No static files**: Images generated on-demand  
✅ **Always in sync**: Uses same data as metadata  
✅ **Maintainable**: Update data once, OG image updates automatically  
✅ **Type-safe**: TypeScript ensures valid data  
✅ **Edge-optimized**: Runs on Vercel Edge for fast generation  
✅ **Cacheable**: Generated once per deployment, cached by CDN

---

## Performance

- **First generation**: ~200-400ms (Edge Runtime)
- **Subsequent requests**: Cached by Vercel CDN (instant)
- **Build time**: Generated statically for all known routes
- **Bundle impact**: Zero (runs server-side)

---

## Next Steps

1. Implement central data layer (00-central-data-management.md)
2. Create root `opengraph-image.tsx`
3. Create blog post dynamic OG images
4. Create project showcase OG images
5. Test with social media validators
6. Monitor generation performance in Vercel Analytics
