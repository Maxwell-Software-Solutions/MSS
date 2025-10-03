import type { NextConfig } from 'next';
import path from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';

// Bundle analyzer configuration
const isAnalyze = process.env.ANALYZE === 'true';

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
  // Permanent redirects
  async redirects() {
    return [
      {
        source: '/consulting-process',
        destination: '/services',
        permanent: true,
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
  // Webpack configuration for performance
  webpack: (config, { dev, isServer }) => {
    // Production optimizations
    if (!dev && !isServer) {
      // Enable tree shaking
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;

  // Base minimizer list
  config.optimization.minimizer = [];

      // Split chunks for better caching
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 25,
        minSize: 20000,
        cacheGroups: {
          default: false,
          vendors: false,
          // Vendor chunk
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /[\\/]node_modules[\\/]/,
            priority: 20,
            enforce: true,
          },
          // Common chunk
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 10,
            reuseExistingChunk: true,
            enforce: true,
          },
          // React chunk
          react: {
            name: 'react',
            chunks: 'all',
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            priority: 30,
            enforce: true,
          },
          // Next.js chunk
          next: {
            name: 'next',
            chunks: 'all',
            test: /[\\/]node_modules[\\/](next)[\\/]/,
            priority: 25,
            enforce: true,
          },
          // Fonts chunk
          fonts: {
            name: 'fonts',
            chunks: 'all',
            test: /[\\/]node_modules[\\/].*\.(woff|woff2|eot|ttf|otf)$/,
            priority: 15,
            enforce: true,
          },
        },
      };

      // Add compression plugin for gzip
      config.plugins.push(
        new CompressionPlugin({
          filename: '[path][base].gz',
          algorithm: 'gzip',
          test: /\.(js|css|html|svg)$/,
          threshold: 10240,
          minRatio: 0.8,
        })
      );

      // Bundle analyzer is handled separately via @next/bundle-analyzer

      // Minimize CSS
      config.optimization.minimize = true;

      // Single Terser pass (removed duplicate config)
      config.optimization.minimizer.push(
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true,
              drop_debugger: true,
              pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
            },
            mangle: { safari10: true },
            format: { comments: false },
          },
          extractComments: false,
        })
      );

      // Increase bundle size limits for better performance
      config.performance = {
        hints: 'warning',
        maxEntrypointSize: 1024000, // 1MB
        maxAssetSize: 1024000, // 1MB
      };
    }

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

    // Performance hints
    config.performance = {
      hints: dev ? false : 'warning',
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    };

    return config;
  },
  // Headers for performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
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
