This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Maxwell Software Solutions Website

A high-performance, accessible, and SEO-optimized website built with Next.js 15, React 19, and Tailwind CSS v4.

### Key Features

- **Mobile-First Design**: Optimized for all devices with responsive layouts and 44×44px touch targets
- **WCAG AA Compliant**: Full accessibility support with semantic HTML, ARIA labels, and keyboard navigation
- **Performance Optimized**: Achieves high Lighthouse scores with lazy loading, image optimization, and efficient caching
- **SEO Enhanced**: Structured data (Schema.org), unique meta descriptions, and Open Graph tags
- **Security Hardened**: HSTS, CSP-ready, and comprehensive security headers

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Development Scripts

```bash
# Development
npm run dev          # Start development server

# Building
npm run build        # Production build
npm run build:test   # Build with tests
npm start           # Start production server

# Quality Assurance
npm run lint         # Run ESLint
npm run typecheck    # TypeScript type checking
npm run test         # Run all tests

# E2E Testing
npm run e2e          # Run Playwright tests
npm run e2e:ui       # Run Playwright with UI
npm run e2e:report   # Show test report

# Performance
npm run lighthouse   # Run Lighthouse audit
npm run analyze      # Analyze bundle size
```

## Architecture

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **UI Library**: React 19
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript 5
- **Testing**: Jest, Playwright
- **Performance**: Lighthouse CI

### Project Structure
```
src/
├── app/              # Next.js app directory
│   ├── components/   # Reusable React components
│   ├── about/        # About page and components
│   ├── blog/         # Blog posts and listings
│   ├── services/     # Services page
│   └── layout.tsx    # Root layout with metadata
├── test/             # Unit tests
└── e2e/              # End-to-end tests

docs/
├── accessibility.md              # WCAG compliance guide
├── mobile-responsiveness.md      # Mobile-first design guide
├── performance-optimization.md   # Core Web Vitals guide
└── security-best-practices.md    # Security guidelines
```

## Best Practices Documentation

Comprehensive guides for maintaining high quality standards:

- **[Accessibility Guide](docs/accessibility.md)**: WCAG POUR principles, semantic HTML, ARIA, screen reader testing
- **[Mobile Responsiveness](docs/mobile-responsiveness.md)**: Mobile-first approach, touch targets, typography, breakpoints
- **[Performance Optimization](docs/performance-optimization.md)**: Core Web Vitals, image optimization, caching strategies
- **[Security Best Practices](docs/security-best-practices.md)**: HSTS, MFA, input validation, dependency management

## Core Web Vitals Targets

- **LCP** (Largest Contentful Paint): < 2.5s
- **INP** (Interaction to Next Paint): < 200ms
- **CLS** (Cumulative Layout Shift): < 0.1

## Accessibility Features

- ✅ WCAG AA compliant
- ✅ Semantic HTML5 elements
- ✅ ARIA labels for icons and interactive elements
- ✅ Keyboard navigation support
- ✅ Skip-to-content link
- ✅ Minimum 16px font size
- ✅ 4.5:1 color contrast ratio
- ✅ 44×44px touch targets
- ✅ Respects `prefers-reduced-motion`

## SEO Features

- ✅ Unique meta descriptions per page
- ✅ Structured data (Schema.org Article for blog posts)
- ✅ Open Graph and Twitter Card metadata
- ✅ Semantic heading hierarchy
- ✅ XML sitemap (auto-generated)
- ✅ Robots.txt configured

## Security Features

- ✅ HSTS (HTTP Strict Transport Security)
- ✅ Content Security Policy ready
- ✅ X-Frame-Options: DENY
- ✅ X-Content-Type-Options: nosniff
- ✅ Referrer-Policy
- ✅ Permissions-Policy

## Performance Optimizations

- ✅ Image optimization (WebP, AVIF)
- ✅ Lazy loading for below-the-fold content
- ✅ Code splitting and dynamic imports
- ✅ Gzip compression
- ✅ Static asset caching (1 year)
- ✅ Critical CSS inlining
- ✅ Font optimization with `next/font`

## Testing

### Unit Tests
```bash
npm run test
```

### E2E Tests
```bash
npm run e2e
```

### Accessibility Testing
- Automated: Lighthouse, axe DevTools
- Manual: Keyboard navigation, screen readers (VoiceOver, NVDA)

### Performance Testing
```bash
npm run lighthouse
```

## Environment Variables

Create a `.env.local` file for local development:

```env
OPENAI_API_KEY=your_api_key
NEXT_PUBLIC_APPS_SCRIPT_URL=your_url
NEXT_PUBLIC_SHARED_TOKEN=your_token
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Contributing

1. Follow the coding standards in ESLint config
2. Write tests for new features
3. Run `npm run test` before committing
4. Ensure Lighthouse score stays > 90
5. Maintain WCAG AA compliance

## License

Copyright © 2024 Maxwell Software Solutions. All rights reserved.

---

**Note**: Restart the dev server after updating environment variables to pick up the changes.
