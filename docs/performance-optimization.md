# Performance Optimization Guide

This document outlines performance optimization strategies for the Maxwell Software Solutions website, focusing on Core Web Vitals and best practices.

## Core Web Vitals

Google's Core Web Vitals are essential metrics for measuring user experience:

### 1. Largest Contentful Paint (LCP)
**Target**: < 2.5 seconds

**What it measures**: Time until the largest content element is visible

**How to improve**:
- Optimize images (compression, modern formats, lazy loading)
- Minimize render-blocking resources (CSS, JavaScript)
- Use CDN for static assets
- Implement server-side rendering (SSR) or static generation
- Preload critical resources
- Optimize server response time

### 2. Interaction to Next Paint (INP)
**Target**: < 200 milliseconds

**What it measures**: Responsiveness of the page to user interactions

**How to improve**:
- Minimize JavaScript execution time
- Use code splitting and lazy loading
- Optimize event handlers
- Defer non-critical JavaScript
- Use web workers for heavy computations
- Avoid long tasks (> 50ms)

### 3. Cumulative Layout Shift (CLS)
**Target**: < 0.1

**What it measures**: Visual stability of the page

**How to improve**:
- Set explicit width and height on images and videos
- Reserve space for ads and embeds
- Avoid inserting content above existing content
- Use CSS `aspect-ratio` for responsive images
- Preload fonts and use font-display: swap

## Image Optimization

### Modern Formats
Use WebP and AVIF for better compression:

```typescript
// next.config.ts
images: {
  formats: ['image/webp', 'image/avif'],
}
```

### Responsive Images
```jsx
<Image
  src="/image.jpg"
  alt="Description"
  width={1200}
  height={800}
  sizes="(min-width: 1024px) 50vw, 100vw"
  loading="lazy"
  quality={85}
/>
```

### Lazy Loading
```html
<!-- Native lazy loading -->
<img src="image.jpg" loading="lazy" alt="Description" />

<!-- Next.js Image with lazy loading (default) -->
<Image src="/image.jpg" alt="Description" width={800} height={600} />
```

### Image Compression
- Use tools like [TinyPNG](https://tinypng.com/) or [Squoosh](https://squoosh.app/)
- Aim for < 100KB per image
- Use appropriate quality settings (80-85 for photos, 90+ for graphics)

## CSS Optimization

### Critical CSS
Inline critical CSS for above-the-fold content:

```tsx
// layout.tsx
<style
  dangerouslySetInnerHTML={{
    __html: `
      body { margin: 0; font-family: Arial, sans-serif; }
      .header { background: #fff; padding: 1rem; }
      .hero { min-height: 500px; }
    `,
  }}
/>
```

### CSS Best Practices
- Minimize CSS file size (< 50KB for critical CSS)
- Remove unused CSS (PurgeCSS, UnCSS)
- Use CSS Grid and Flexbox instead of float-based layouts
- Avoid `@import` in CSS (use `<link>` instead)
- Combine CSS files where possible

### Tailwind CSS Optimization
```javascript
// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
  },
}
```

## JavaScript Optimization

### Code Splitting
Split code by route and component:

```tsx
// Dynamic imports with Next.js
const DynamicComponent = dynamic(() => import('./Component'), {
  loading: () => <p>Loading...</p>,
  ssr: true, // or false depending on needs
});
```

### Bundle Size
- Keep initial bundle < 200KB (gzipped)
- Use tree shaking to remove unused code
- Analyze bundle with webpack-bundle-analyzer
- Use dynamic imports for large dependencies

### Minification and Compression
```typescript
// next.config.ts
webpack: (config, { dev }) => {
  if (!dev) {
    config.optimization.minimize = true;
    config.plugins.push(
      new CompressionPlugin({
        algorithm: 'gzip',
        test: /\.(js|css|html|svg)$/,
      })
    );
  }
  return config;
}
```

## Caching Strategy

### Static Assets
Cache static assets with long expiration:

```typescript
// next.config.ts
async headers() {
  return [
    {
      source: '/_next/static/(.*)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
    {
      source: '/images/(.*)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ];
}
```

### Dynamic Content
Cache dynamic content with shorter expiration:

```typescript
{
  source: '/(.*)',
  headers: [
    {
      key: 'Cache-Control',
      value: 'public, max-age=3600, s-maxage=86400, stale-while-revalidate',
    },
  ],
}
```

## Font Optimization

### Next.js Font Optimization
```typescript
import { Geist } from 'next/font/google';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap', // Use font-display: swap
  preload: true, // Preload fonts
});
```

### Self-Hosted Fonts
```css
@font-face {
  font-family: 'CustomFont';
  src: url('/fonts/custom.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

## Preloading and Prefetching

### Preload Critical Resources
```html
<link rel="preload" href="/fonts/font.woff2" as="font" type="font/woff2" crossorigin />
<link rel="preload" href="/critical.css" as="style" />
<link rel="preload" href="/hero.jpg" as="image" />
```

### DNS Prefetch
```html
<link rel="dns-prefetch" href="//fonts.googleapis.com" />
<link rel="preconnect" href="//fonts.googleapis.com" crossorigin />
```

### Prefetch Next Pages
```tsx
import Link from 'next/link';

// Next.js automatically prefetches linked pages in viewport
<Link href="/services" prefetch>Services</Link>
```

## Server-Side Rendering (SSR)

### When to Use SSR
- Dynamic content that changes per request
- SEO-critical pages
- Personalized content

### When to Use Static Generation
- Content that rarely changes
- Marketing pages
- Blog posts
- Documentation

### Hybrid Approach
```tsx
// Static generation with revalidation
export const revalidate = 3600; // Revalidate every hour

export default async function Page() {
  const data = await fetchData();
  return <div>{data}</div>;
}
```

## Third-Party Scripts

### Defer Non-Critical Scripts
```tsx
import Script from 'next/script';

<Script
  src="https://analytics.example.com/script.js"
  strategy="lazyOnload" // Load after page is interactive
/>
```

### Async Loading
```html
<script src="script.js" async></script>
```

## Performance Monitoring

### Lighthouse
```bash
npm run lighthouse
```

### Core Web Vitals Report
Use Google Search Console to monitor real-user metrics

### Custom Monitoring
```typescript
// Report Web Vitals
export function reportWebVitals(metric: NextWebVitalsMetric) {
  console.log(metric);
  // Send to analytics
  if (metric.label === 'web-vital') {
    // Track Core Web Vitals
    analytics.track('Web Vital', {
      name: metric.name,
      value: metric.value,
      id: metric.id,
    });
  }
}
```

## Testing Performance

### Lighthouse CI
```bash
npm run lighthouse:collect
npm run lighthouse:assert
```

### PageSpeed Insights
- Test with [PageSpeed Insights](https://pagespeed.web.dev/)
- Test on mobile and desktop
- Aim for score > 90

### WebPageTest
- Use [WebPageTest](https://www.webpagetest.org/)
- Test from different locations
- Test on different devices and network speeds

## Performance Budget

Set and enforce performance budgets:

```javascript
// lighthouserc.js
module.exports = {
  ci: {
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'first-contentful-paint': ['error', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 300 }],
      },
    },
  },
};
```

## Network Optimization

### HTTP/2
- Use HTTP/2 for multiplexing
- Server push for critical resources
- Header compression

### Compression
- Enable gzip or Brotli compression
- Compress HTML, CSS, JavaScript, SVG
- Don't compress images (already compressed)

### Reduce HTTP Requests
- Combine CSS/JS files
- Use CSS sprites or SVG symbols
- Inline small assets (< 10KB)

## Database Optimization

### Caching
- Use Redis or Memcached for caching
- Cache database queries
- Use CDN for static content

### Query Optimization
- Use indexes on frequently queried fields
- Avoid N+1 queries
- Use pagination for large datasets
- Optimize database schema

## Mobile Performance

### Reduce Data Transfer
- Optimize images for mobile (smaller sizes)
- Use responsive images with srcset
- Lazy load below-the-fold content
- Minimize third-party scripts

### Touch Optimization
- Use CSS for simple animations (not JavaScript)
- Debounce scroll and resize events
- Use passive event listeners
- Minimize reflows and repaints

## Best Practices Checklist

### Images
- [ ] Use modern formats (WebP, AVIF)
- [ ] Implement lazy loading
- [ ] Set explicit dimensions
- [ ] Optimize file sizes (< 100KB)
- [ ] Use responsive images with srcset
- [ ] Use CDN for image delivery

### CSS
- [ ] Inline critical CSS
- [ ] Remove unused CSS
- [ ] Minify CSS files
- [ ] Use CSS Grid/Flexbox
- [ ] Avoid CSS @import

### JavaScript
- [ ] Minimize bundle size
- [ ] Use code splitting
- [ ] Defer non-critical scripts
- [ ] Remove unused code
- [ ] Minify and compress

### Fonts
- [ ] Use font-display: swap
- [ ] Preload critical fonts
- [ ] Limit font variants
- [ ] Use system fonts where possible

### Caching
- [ ] Cache static assets (1 year)
- [ ] Cache dynamic content (appropriate duration)
- [ ] Use service workers for offline support
- [ ] Implement stale-while-revalidate

### Monitoring
- [ ] Monitor Core Web Vitals
- [ ] Set performance budgets
- [ ] Track real-user metrics
- [ ] Regular Lighthouse audits

## Resources

### Tools
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [WebPageTest](https://www.webpagetest.org/)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)

### Documentation
- [Web.dev Performance](https://web.dev/performance/)
- [Next.js Performance](https://nextjs.org/docs/pages/building-your-application/optimizing)
- [Core Web Vitals](https://web.dev/vitals/)

### Books
- "High Performance Web Sites" by Steve Souders
- "Designing for Performance" by Lara Hogan
- "Web Performance in Action" by Jeremy Wagner
