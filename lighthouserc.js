module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:3000',
        'http://localhost:3000/about',
        'http://localhost:3000/blog',
        'http://localhost:3000/services',
        'http://localhost:3000/contact',
        'http://localhost:3000/project-showcase',
      ],
      numberOfRuns: 3,
      settings: {
        chromeFlags: '--no-sandbox --disable-dev-shm-usage',
        preset: 'desktop',
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.8 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.8 }],
        'categories:seo': ['warn', { minScore: 0.8 }],
        'first-contentful-paint': ['warn', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.01 }],
        'total-blocking-time': ['warn', { maxNumericValue: 300 }],
        // Flag heavy PNG files - prefer SVG
        'resource-summary:image:size': ['warn', { maxNumericValue: 200000 }],
        // Warn about duplicate images
        'duplicated-javascript': ['warn', { maxNumericValue: 10000 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};

