# P0-2: Enhanced Root Metadata & Layout

**Priority**: P0 Critical  
**Effort**: 1-2 hours  
**Maintainability**: ⭐⭐⭐⭐⭐

## Overview

Upgrade `src/app/layout.tsx` metadata to use the central data registry, add comprehensive SEO fields, and implement proper Open Graph/Twitter cards. This establishes the foundation for all page-level metadata.

## Current State

```typescript
// src/app/layout.tsx - BEFORE
export const metadata: Metadata = {
  title: 'Maxwell — Modern Web Experiences',
  description: 'Iterate on your site live with AI-driven edits.',
  // ... generic, doesn't match business
};
```

**Issues**:

- Generic description doesn't match actual services
- Missing keywords, authors, verification
- OG images not configured
- No title template for child pages

---

## Implementation

### 1. Update Root Layout Metadata

**File**: `src/app/layout.tsx`

```typescript
import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import HeaderNav from './components/HeaderNav';
import { Geist, Geist_Mono, Montserrat } from 'next/font/google';
import './globals.css';
import './styles/tokens.css';
import GoogleAnalytics from '@/app/components/GoogleAnalytics';
import Cookiebot from '@/app/components/Cookiebot';
import ClientOnlyComponents from '@/app/components/ClientOnlyComponents';
import { LanguageProvider } from '@/lib/LanguageContext';
import StructuredData from '@/app/components/StructuredData';
import { organizationSchema } from '@/lib/structuredData';
import { headers } from 'next/headers';
import { loadServerTranslations, getCriticalTranslations } from '@/lib/server-translations';
import { SITE_CONFIG, PAGES } from '@/lib/seo/data'; // NEW IMPORT

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://maxwell-software.com';

// Font configurations remain the same...
const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
});

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
  preload: false,
  adjustFontFallback: true,
});

/**
 * Enhanced root metadata using central data registry
 * Data source: SITE_CONFIG and PAGES.home from @/lib/seo/data
 */
export const metadata: Metadata = {
  // Title with template for child pages
  title: {
    default: PAGES.home.title,
    template: `%s | ${SITE_CONFIG.name}`,
  },

  // Description from central registry
  description: PAGES.home.description,

  // Keywords array
  keywords: PAGES.home.keywords,

  // Author information
  authors: [
    {
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
  ],

  // Creator/Publisher for rich snippets
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,

  // Metadata base URL for all relative paths
  metadataBase: new URL(siteUrl),

  // Canonical URL and language alternates
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en',
      'lt-LT': '/lt',
    },
  },

  // Enhanced Open Graph metadata
  openGraph: {
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    type: 'website',
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    locale: SITE_CONFIG.locale,
    alternateLocale: [SITE_CONFIG.alternateLocale],

    // OG Image (generated dynamically)
    images: [
      {
        url: '/opengraph-image', // Next.js auto-discovers opengraph-image.tsx
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} — ${SITE_CONFIG.title}`,
        type: 'image/png',
      },
    ],
  },

  // Twitter Card metadata
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    creator: SITE_CONFIG.social.twitter, // Add when available
    images: ['/opengraph-image'],
  },

  // Enhanced robots configuration
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1, // No limit
      'max-image-preview': 'large', // Large image previews
      'max-snippet': -1, // No snippet length limit
    },
  },

  // Verification tokens (add from Google Search Console)
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION, // Set in .env
    // yandex: 'YOUR_YANDEX_TOKEN',
    // bing: 'YOUR_BING_TOKEN',
  },

  // App manifest and icons
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/logo-icon.svg', sizes: '64x64', type: 'image/svg+xml' },
    ],
    apple: '/logo-icon.svg',
    shortcut: '/favicon.svg',
  },

  // Additional metadata for categorization
  category: 'technology',

  // App-specific metadata
  applicationName: SITE_CONFIG.name,

  // Format detection (disable auto phone number detection if needed)
  formatDetection: {
    telephone: false, // Prevents accidental phone number linking
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5, // Allow zoom for accessibility
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' },
  ],
};

export default async function RootLayout({ children }: { children: React.ReactNode }): Promise<ReactElement> {
  // ... rest of layout remains the same
  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language') || 'en';
  const primaryLanguage = acceptLanguage.split(',')[0].toLowerCase();
  const userLanguage = primaryLanguage.startsWith('lt') ? 'lt' : 'en';

  const translations = await loadServerTranslations(userLanguage);
  const criticalTranslations = getCriticalTranslations(userLanguage);

  return (
    <html
      lang={userLanguage}
      suppressHydrationWarning
      className={`${montserrat.variable} ${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* DNS Prefetch for analytics/third-party */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://consent.cookiebot.com" />
      </head>
      <body>
        <Cookiebot />
        <GoogleAnalytics />

        {/* Structured data from central registry */}
        <StructuredData schema={organizationSchema} />

        <LanguageProvider initialLanguage={userLanguage} initialTranslations={translations}>
          <HeaderNav criticalTranslations={criticalTranslations} />
          <main>{children}</main>
          <ClientOnlyComponents />
        </LanguageProvider>
      </body>
    </html>
  );
}
```

---

### 2. Update Home Page Metadata

**File**: `src/app/page.tsx`

```typescript
import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import HomeContent from './HomeContent';
import { generateMetadata as genMeta } from '@/lib/seo/utils';

/**
 * Homepage metadata from central registry
 * Uses utility function to generate from PAGES.home
 */
export const metadata: Metadata = genMeta('home');

export default function Home(): ReactElement {
  return <HomeContent />;
}
```

**Note**: The `generateMetadata` utility from `@/lib/seo/utils` pulls from `PAGES.home` in the central data registry.

---

### 3. Environment Variables

**Add to `.env.local`**:

```bash
# Google Search Console verification
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your_verification_token_here

# Site URL (production)
NEXT_PUBLIC_SITE_URL=https://maxwell-software.com
```

**How to get verification token**:

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property for `maxwell-software.com`
3. Choose "HTML tag" verification method
4. Copy token from `<meta name="google-site-verification" content="TOKEN">`
5. Add to `.env.local`

---

### 4. Verify Enhanced Metadata

**Development testing**:

```bash
pnpm dev
# Visit http://localhost:3000
# View page source (Ctrl+U / Cmd+U)
# Search for <meta> tags to verify:
```

**Expected output in HTML**:

```html
<title>Maxwell Software Solutions — Engineering Excellence Through Quality & Reliability</title>
<meta name="description" content="Elite software engineering consultancy..." />
<meta name="keywords" content="software engineering consultancy, code quality audit..." />

<!-- Open Graph -->
<meta property="og:title" content="Maxwell Software Solutions" />
<meta property="og:description" content="Elite software engineering..." />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://maxwell-software.com/" />
<meta property="og:image" content="https://maxwell-software.com/opengraph-image" />
<meta property="og:locale" content="en_US" />
<meta property="og:locale:alternate" content="lt_LT" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Maxwell Software Solutions" />
<meta name="twitter:image" content="https://maxwell-software.com/opengraph-image" />

<!-- Verification -->
<meta name="google-site-verification" content="YOUR_TOKEN" />
```

---

## Benefits of This Approach

✅ **DRY**: Title, description, keywords defined once in central registry  
✅ **Type-Safe**: TypeScript ensures data consistency  
✅ **Maintainable**: Update `SITE_CONFIG` in one place  
✅ **SEO-Complete**: All critical metadata fields included  
✅ **Child Pages**: Template automatically applies to all pages  
✅ **Testable**: Can unit test metadata generation functions

---

## Title Template in Action

Child pages automatically inherit the template:

```typescript
// src/app/about/page.tsx
export const metadata = {
  title: 'About Us', // Becomes: "About Us | Maxwell Software Solutions"
};
```

**Without template**: "About Us"  
**With template**: "About Us | Maxwell Software Solutions"

This ensures consistent branding across all pages.

---

## Migration Checklist

- [ ] Install central data layer (`src/lib/seo/data.ts`)
- [ ] Update `src/app/layout.tsx` with enhanced metadata
- [ ] Add `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` to `.env.local`
- [ ] Update `src/app/page.tsx` to use `generateMetadata('home')`
- [ ] Test in development: view page source
- [ ] Validate with [OpenGraph.xyz](https://www.opengraph.xyz/)
- [ ] Submit to Google Search Console for verification

---

## Next Steps

1. Implement P0-1 (Open Graph images)
2. Update individual page metadata using utilities (P1)
3. Expand structured data (P0-3)
4. Monitor Google Search Console for indexing status
