import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    NEXT_PUBLIC_APPS_SCRIPT_URL: process.env.NEXT_PUBLIC_APPS_SCRIPT_URL,
    NEXT_PUBLIC_SHARED_TOKEN: process.env.NEXT_PUBLIC_SHARED_TOKEN,
  },
  /**
   * Canonical URL enforcement via 301 redirects
   * Prevents duplicate content from www/non-www, trailing slashes, etc.
   */
  async redirects() {
    return [
      // 1. Enforce canonical hostname (route legacy or non-www domains → www.maxwellsoftwaresolutions.com)
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'maxwellsoftwaresolutions.com',
          },
        ],
        destination: 'https://www.maxwellsoftwaresolutions.com/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'maxwell-software.com',
          },
        ],
        destination: 'https://www.maxwellsoftwaresolutions.com/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.maxwell-software.com',
          },
        ],
        destination: 'https://www.maxwellsoftwaresolutions.com/:path*',
        permanent: true,
      },

      // 2. Trailing slash normalization (remove trailing slashes)
      {
        source: '/:path+/',
        destination: '/:path+',
        permanent: true,
      },

      // 3. Legacy URL redirects
      {
        source: '/consulting-process',
        destination: '/services',
        permanent: true,
      },
      // The old case studies were removed; the index and every detail page now land on the real AI work page
      {
        source: '/project-showcase/:path*',
        destination: '/case-studies',
        permanent: true,
      },

      // Retired pages: /pricing and /free-audit, with any subpath or /en, /lt prefix, go to the contact page.
      // Temporary, so the pages can come back. ":path*" also matches the bare path.
      ...['pricing', 'free-audit'].flatMap((page) => [
        { source: `/${page}/:path*`, destination: '/contact', permanent: false },
        { source: `/:lang(en|lt)/${page}/:path*`, destination: '/contact', permanent: false },
      ]),

      // 4. Short booking link for emails; temporary so the calendar page can change later
      {
        source: '/book',
        destination:
          'https://calendar.google.com/calendar/appointments/schedules/AcZssZ3gh9_O7RuIGp-YoR2kYko8NBkJwtwOpuagiOnzRslqNHnheXWbedMLPLhajGv7DZl9Ks1IQTb9',
        permanent: false,
      },
    ];
  },
  // Performance optimizations
  experimental: {
    optimizePackageImports: ['@next/font'],
    // Enable streaming
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  // Server external packages
  serverExternalPackages: [],
  // Enable static generation for better performance
  // output: 'standalone', // Disabled due to Windows symlink issues
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Compression
  compress: true,
  // Production builds keep Next's own chunking and minifiers; only console noise is stripped from them
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' && { exclude: ['error'] },
  },
  webpack: (config, { dev }) => {
    // Development optimizations
    if (dev) {
      // Faster builds in development
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }

    // Module resolution optimizations
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
    };

    return config;
  },
  // Headers for performance and security
  async headers() {
    const isDev = process.env.NODE_ENV !== 'production';

    // Dev-only permissive headers for VS Code Simple Browser
    if (isDev) {
      const csp = [
        "default-src 'self' http: https: data: blob:",
        "script-src 'self' 'unsafe-eval' 'unsafe-inline' http: https: blob:",
        "style-src 'self' 'unsafe-inline' http: https:",
        "img-src 'self' data: blob: http: https:",
        "connect-src 'self' ws: wss: http: https:",
        // NO frame-ancestors in dev - allows embedding in Simple Browser
      ].join('; ');

      return [
        {
          source: '/:path*',
          headers: [
            { key: 'Content-Security-Policy', value: csp },
            { key: 'X-Frame-Options', value: 'ALLOWALL' },
          ],
        },
      ];
    }

    // Production headers
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' vscode-webview://*;",
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'geolocation=(), microphone=(), camera=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=86400',
          },
        ],
      },
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
  },
};

export default nextConfig;
