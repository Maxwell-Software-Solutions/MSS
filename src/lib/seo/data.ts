/**
 * Central SEO Data Repository
 * 
 * Single source of truth for all SEO-related data across the application.
 * This prevents duplication and ensures consistency in metadata, structured data,
 * and SEO content.
 * 
 * @module seo/data
 */

// ============================================================================
// Type Definitions
// ============================================================================

/**
 * Base metadata structure for all pages
 */
export interface PageMetadata {
  /** Page title (without site name suffix) */
  title: string;
  /** Meta description (150-160 characters recommended) */
  description: string;
  /** SEO keywords array */
  keywords: string[];
  /** Canonical URL path (relative to site root) */
  canonical: string;
  /** Open Graph type */
  ogType?: 'website' | 'article' | 'profile';
  /** ISO 8601 publication date */
  publishedTime?: string;
  /** ISO 8601 last modified date */
  modifiedTime?: string;
  /** Content section/category */
  section?: string;
  /** Content tags */
  tags?: string[];
}

/**
 * Extended metadata for blog posts
 */
export interface BlogPostMeta extends PageMetadata {
  /** URL-friendly slug */
  slug: string;
  /** Author name */
  author: string;
  /** ISO 8601 publication date (required for articles) */
  publishedTime: string;
  /** ISO 8601 last modified date */
  modifiedTime?: string;
  /** Estimated reading time */
  readTime: string;
  /** Primary category */
  category: string;
  /** Short excerpt for previews */
  excerpt: string;
}

/**
 * Project showcase metadata
 */
export interface ProjectMeta {
  /** URL-friendly slug */
  slug: string;
  /** Project title */
  title: string;
  /** Detailed description */
  description: string;
  /** Key performance metrics */
  metrics: string[];
  /** Industry/sector */
  industry: string;
  /** Technologies used */
  technologies: string[];
  /** ISO 8601 publication date */
  publishedDate: string;
}

/**
 * Service offering structure
 */
export interface ServiceOffering {
  /** Service name */
  name: string;
  /** Detailed description */
  description: string;
}

/**
 * FAQ item structure
 */
export interface FAQItem {
  /** Question text */
  question: string;
  /** Answer text */
  answer: string;
}

/**
 * Site configuration
 */
export interface SiteConfig {
  /** Company name */
  name: string;
  /** Site tagline/subtitle */
  title: string;
  /** Site description */
  description: string;
  /** Full site URL (no trailing slash) */
  url: string;
  /** Primary locale */
  locale: string;
  /** Alternate locale */
  alternateLocale: string;
  /** Contact email */
  email: string;
  /** Company founding date (ISO 8601) */
  foundingDate: string;
  /** Company address */
  address: {
    country: string;
  };
  /** Social media links */
  social: {
    linkedin: string;
    github: string;
    twitter: string;
  };
}

// ============================================================================
// Site Configuration
// ============================================================================

/**
 * Global site configuration
 * @constant
 */
export const SITE_CONFIG: Readonly<SiteConfig> = {
  name: 'Maxwell Software Solutions',
  title: 'Engineering Excellence Through Quality & Reliability',
  description:
    'Elite software engineering consultancy specializing in code quality audits, test-driven development, CI/CD optimization, and reliability engineering.',
  url: 'https://maxwell-software.com',
  locale: 'en_US',
  alternateLocale: 'lt_LT',
  email: 'contact@maxwell-software.com',
  foundingDate: '2024-01-01',
  address: {
    country: 'LT',
  },
  social: {
    linkedin: 'https://www.linkedin.com/company/maxwell-software-solutions',
    github: 'https://github.com/Maxwell-Software-Solutions',
    twitter: '@maxwellsoftware',
  },
} as const;

// ============================================================================
// Keyword Sets (Reusable)
// ============================================================================

/**
 * Reusable keyword sets by category
 * @constant
 */
export const KEYWORD_SETS = {
  core: [
    'software engineering consultancy',
    'code quality audit',
    'reliability engineering',
    'technical debt reduction',
  ],
  testing: [
    'test-driven development',
    'TDD',
    'software testing strategy',
    'automated testing',
  ],
  devops: [
    'CI/CD optimization',
    'DevOps best practices',
    'continuous integration',
    'deployment automation',
  ],
  architecture: [
    'software architecture',
    'clean code',
    'SOLID principles',
    'design patterns',
  ],
} as const;

// ============================================================================
// Page Metadata Registry
// ============================================================================

/**
 * Central registry of all page metadata
 * @constant
 */
export const PAGES: Record<string, PageMetadata> = {
  home: {
    title: 'Maxwell Software Solutions — Engineering Excellence Through Quality & Reliability',
    description: SITE_CONFIG.description,
    keywords: [...KEYWORD_SETS.core, ...KEYWORD_SETS.testing, ...KEYWORD_SETS.devops],
    canonical: '/',
    ogType: 'website',
  },
  about: {
    title: 'About Us — Our Approach to Software Engineering Excellence',
    description:
      'Learn about our engineering philosophy, team expertise, and commitment to delivering high-quality software solutions through proven practices.',
    keywords: [...KEYWORD_SETS.core, 'software consulting team', 'engineering expertise'],
    canonical: '/about',
  },
  services: {
    title: 'Services — Code Quality, Testing & CI/CD Optimization',
    description:
      'Professional software engineering services: code quality audits, reliability engineering, testing strategy, CI/CD hardening, and technical debt reduction.',
    keywords: [...KEYWORD_SETS.core, ...KEYWORD_SETS.testing, ...KEYWORD_SETS.devops],
    canonical: '/services',
  },
  contact: {
    title: 'Contact Us — Start Your Software Quality Journey',
    description:
      "Get in touch with our engineering team to discuss your code quality, testing, or DevOps challenges. We're here to help.",
    keywords: ['software consulting contact', 'engineering services inquiry', ...KEYWORD_SETS.core],
    canonical: '/contact',
  },
  blog: {
    title: 'Engineering Insights — Blog',
    description:
      'Expert insights on software engineering, testing, architecture, and DevOps best practices from the Maxwell Software Solutions team.',
    keywords: [...KEYWORD_SETS.architecture, ...KEYWORD_SETS.testing, 'software engineering blog'],
    canonical: '/blog',
  },
  projectShowcase: {
    title: 'Case Studies — Real-World Engineering Success Stories',
    description:
      'Explore our portfolio of successful software quality transformations, reliability improvements, and engineering excellence initiatives.',
    keywords: ['software case studies', 'engineering portfolio', ...KEYWORD_SETS.core],
    canonical: '/project-showcase',
  },
  founders: {
    title: 'Our Founders — Leadership in Software Engineering',
    description:
      'Meet the experienced software engineers leading Maxwell Software Solutions with decades of combined expertise.',
    keywords: ['software engineering leadership', 'founders', 'engineering team'],
    canonical: '/founders',
  },
  privacy: {
    title: 'Privacy Policy',
    description: 'Our privacy policy and data protection practices.',
    keywords: ['privacy policy', 'data protection'],
    canonical: '/privacy',
  },
  security: {
    title: 'Security',
    description: 'Our security practices and commitment to protecting your information.',
    keywords: ['security practices', 'data security'],
    canonical: '/security',
  },
  terms: {
    title: 'Terms of Service',
    description: 'Terms and conditions for using Maxwell Software Solutions services.',
    keywords: ['terms of service', 'legal'],
    canonical: '/terms',
  },
};

// ============================================================================
// Blog Posts Registry
// ============================================================================

/**
 * Central registry of all blog posts
 * Single source of truth for blog metadata
 * @constant
 */
export const BLOG_POSTS: Record<string, BlogPostMeta> = {
  'solid-principles': {
    slug: 'solid-principles',
    title: 'SOLID Principles: The Foundation of Clean Code',
    description:
      'Master the five SOLID principles that form the foundation of clean, maintainable, and scalable software architecture.',
    excerpt:
      'Learn how Single Responsibility, Open-Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion principles create robust software.',
    keywords: [...KEYWORD_SETS.architecture, 'SOLID', 'object-oriented design', 'software principles'],
    canonical: '/blog/solid-principles',
    ogType: 'article' as const,
    author: 'Maxwell Software Solutions',
    publishedTime: '2024-12-19T00:00:00.000Z',
    modifiedTime: '2024-12-19T00:00:00.000Z',
    readTime: '8 min read',
    category: 'Software Architecture',
    section: 'Software Engineering',
    tags: ['SOLID', 'Clean Code', 'Architecture', 'Design Patterns'],
  },
  'test-driven-development': {
    slug: 'test-driven-development',
    title: 'Test-Driven Development: A Practical Guide',
    description:
      'Learn how to implement TDD effectively with real-world examples, best practices, and common pitfalls to avoid.',
    excerpt:
      'Discover the Red-Green-Refactor cycle and how TDD improves code quality, reduces bugs, and accelerates development.',
    keywords: [...KEYWORD_SETS.testing, 'TDD tutorial', 'red green refactor', 'unit testing'],
    canonical: '/blog/test-driven-development',
    ogType: 'article',
    author: 'Maxwell Software Solutions',
    publishedTime: '2024-12-20T00:00:00.000Z',
    modifiedTime: '2024-12-20T00:00:00.000Z',
    readTime: '10 min read',
    category: 'Testing',
    section: 'Software Engineering',
    tags: ['TDD', 'Testing', 'Quality Assurance', 'Best Practices'],
  },
  'refactoring-legacy-code': {
    slug: 'refactoring-legacy-code',
    title: 'Refactoring Legacy Code: Where to Start',
    description:
      'Strategic approaches to refactoring legacy codebases safely and effectively, with proven techniques and risk mitigation strategies.',
    excerpt: 'Transform unmaintainable legacy code into clean, testable systems without breaking production.',
    keywords: [...KEYWORD_SETS.core, 'legacy code refactoring', 'code modernization', 'technical debt'],
    canonical: '/blog/refactoring-legacy-code',
    ogType: 'article',
    author: 'Maxwell Software Solutions',
    publishedTime: '2024-12-21T00:00:00.000Z',
    modifiedTime: '2024-12-21T00:00:00.000Z',
    readTime: '12 min read',
    category: 'Refactoring',
    section: 'Software Engineering',
    tags: ['Refactoring', 'Legacy Code', 'Technical Debt', 'Code Quality'],
  },
  'microservices-architecture': {
    slug: 'microservices-architecture',
    title: 'Microservices Architecture: Benefits, Challenges & Best Practices',
    description:
      'Comprehensive guide to microservices architecture, including when to use it, common pitfalls, and proven patterns for success.',
    excerpt:
      'Navigate the complexity of microservices with practical guidance on service boundaries, communication patterns, and operational excellence.',
    keywords: [...KEYWORD_SETS.architecture, 'microservices', 'distributed systems', 'API design'],
    canonical: '/blog/microservices-architecture',
    ogType: 'article',
    author: 'Maxwell Software Solutions',
    publishedTime: '2024-12-22T00:00:00.000Z',
    modifiedTime: '2024-12-22T00:00:00.000Z',
    readTime: '15 min read',
    category: 'Architecture',
    section: 'Software Engineering',
    tags: ['Microservices', 'Architecture', 'Distributed Systems', 'Scalability'],
  },
  'ci-cd-pipelines': {
    slug: 'ci-cd-pipelines',
    title: 'Modern CI/CD Pipelines: Automating Your Software Delivery',
    description:
      'Learn how to build modern CI/CD pipelines with automated testing, deployment strategies, and DevOps best practices for faster, safer releases.',
    excerpt:
      'Master continuous integration and deployment with practical examples of pipeline configuration, testing strategies, and deployment automation.',
    keywords: [...KEYWORD_SETS.devops, 'pipeline automation', 'deployment strategies', 'build automation'],
    canonical: '/blog/ci-cd-pipelines',
    ogType: 'article',
    author: 'Maxwell Software Solutions',
    publishedTime: '2024-12-22T00:00:00.000Z',
    modifiedTime: '2024-12-22T00:00:00.000Z',
    readTime: '11 min read',
    category: 'DevOps',
    section: 'Software Engineering',
    tags: ['CI/CD', 'DevOps', 'Automation', 'Deployment'],
  },
  'api-design-best-practices': {
    slug: 'api-design-best-practices',
    title: 'API Design Best Practices: Building Developer-Friendly Interfaces',
    description:
      'Essential principles for designing RESTful APIs that are intuitive, scalable, and maintainable, with real-world examples.',
    excerpt:
      'Create APIs that developers love with clear naming conventions, proper versioning, comprehensive documentation, and robust error handling.',
    keywords: [...KEYWORD_SETS.architecture, 'API design', 'REST API', 'API best practices', 'web services'],
    canonical: '/blog/api-design-best-practices',
    ogType: 'article',
    author: 'Maxwell Software Solutions',
    publishedTime: '2024-12-23T00:00:00.000Z',
    modifiedTime: '2024-12-23T00:00:00.000Z',
    readTime: '9 min read',
    category: 'API Design',
    section: 'Software Engineering',
    tags: ['API Design', 'REST', 'Web Services', 'Best Practices'],
  },
};

// ============================================================================
// Project Showcase Registry
// ============================================================================

/**
 * Central registry of project case studies
 * @constant
 */
export const PROJECTS: Record<string, ProjectMeta> = {
  'retail-platform': {
    slug: 'retail-platform',
    title: 'E-Commerce Platform Quality Transformation',
    description: 'Reduced defects by 58% and improved deployment frequency by 28% for a high-traffic retail platform.',
    metrics: ['-58% defects', '+28% deploys', '+12 CSAT'],
    industry: 'Retail',
    technologies: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Docker'],
    publishedDate: '2024-12-15',
  },
  'fintech-api': {
    slug: 'fintech-api',
    title: 'FinTech API Reliability Engineering',
    description:
      'Achieved 99.95% uptime and reduced MTTR by 73% through comprehensive testing and observability improvements.',
    metrics: ['99.95% uptime', '-73% MTTR', '100% test coverage'],
    industry: 'Financial Technology',
    technologies: ['Java', 'Spring Boot', 'Kafka', 'Redis', 'Kubernetes'],
    publishedDate: '2024-12-10',
  },
  'saas-migration': {
    slug: 'saas-migration',
    title: 'SaaS Platform CI/CD Modernization',
    description:
      'Modernized deployment pipeline reducing release time from 4 hours to 12 minutes with zero-downtime deployments.',
    metrics: ['-95% release time', '0 downtime', '+40% developer velocity'],
    industry: 'SaaS',
    technologies: ['Python', 'Django', 'GitLab CI', 'Terraform', 'AWS'],
    publishedDate: '2024-12-05',
  },
};

// ============================================================================
// Service Offerings
// ============================================================================

/**
 * Service offerings for structured data
 * @constant
 */
export const SERVICES: ReadonlyArray<ServiceOffering> = [
  {
    name: 'Code Quality Audit',
    description:
      'Comprehensive code quality analysis identifying technical debt, vulnerabilities, and improvement opportunities with actionable recommendations.',
  },
  {
    name: 'Reliability Engineering',
    description:
      'Build resilient systems with proper monitoring, alerting, incident response, and chaos engineering practices.',
  },
  {
    name: 'Testing Strategy & Implementation',
    description:
      'Design and implement comprehensive testing strategies including unit, integration, E2E, and performance testing.',
  },
  {
    name: 'CI/CD Pipeline Optimization',
    description:
      'Optimize build pipelines, automate deployments, and implement continuous delivery best practices for faster, safer releases.',
  },
  {
    name: 'Technical Debt Reduction',
    description:
      'Strategic refactoring and modernization to reduce technical debt while maintaining business continuity.',
  },
  {
    name: 'Software Architecture Consulting',
    description:
      'Expert guidance on architecture decisions, design patterns, and system scalability for long-term success.',
  },
] as const;

// ============================================================================
// FAQ Data
// ============================================================================

/**
 * Frequently asked questions organized by category
 * @constant
 */
export const FAQS: Record<string, ReadonlyArray<FAQItem>> = {
  general: [
    {
      question: 'What is a code quality audit?',
      answer:
        'A code quality audit is a comprehensive analysis of your codebase to identify technical debt, security vulnerabilities, performance bottlenecks, and maintainability issues. We examine code structure, testing coverage, documentation, and adherence to best practices, delivering actionable recommendations for improvement.',
    },
    {
      question: 'What technologies do you support?',
      answer:
        'We have expertise across modern technology stacks including TypeScript/JavaScript, Python, Java, Go, React, Node.js, and major cloud platforms (AWS, Azure, GCP). Our engineering principles apply regardless of specific technology choices.',
    },
  ],
  services: [
    {
      question: 'How long does a typical engagement last?',
      answer:
        'Engagement duration varies based on project scope. Code quality audits typically take 2-4 weeks, while ongoing reliability engineering or CI/CD optimization projects can range from 2-6 months. We work with you to define clear milestones and deliverables.',
    },
    {
      question: 'Can you help with legacy code?',
      answer:
        'Absolutely. Legacy code transformation is one of our specialties. We use proven refactoring techniques, incremental migration strategies, and comprehensive testing to modernize codebases while minimizing risk to production systems.',
    },
  ],
  process: [
    {
      question: 'Do you work with remote teams?',
      answer:
        'Yes, we work with teams worldwide. Our consultants are experienced in remote collaboration and can integrate seamlessly with your existing processes, whether you prefer daily standups, async communication, or hybrid models.',
    },
    {
      question: 'Do you provide training for our team?',
      answer:
        'Yes, knowledge transfer is a core part of our engagements. We provide hands-on training, documentation, and mentoring to ensure your team can maintain and build upon the improvements we implement together.',
    },
  ],
  pricing: [
    {
      question: 'How do you measure success?',
      answer:
        'We establish concrete metrics at the start of each engagement, such as defect reduction percentage, test coverage improvement, deployment frequency increase, MTTR reduction, or performance gains. Every recommendation includes measurable success criteria.',
    },
  ],
};

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get all FAQ items flattened into a single array
 * @returns All FAQ items across all categories
 */
export function getAllFAQs(): FAQItem[] {
  return Object.values(FAQS).flat();
}

/**
 * Validate that a page key exists in the registry
 * @param key - Page key to validate
 * @returns true if page exists
 */
export function isValidPageKey(key: string): key is keyof typeof PAGES {
  return key in PAGES;
}

/**
 * Validate that a blog slug exists in the registry
 * @param slug - Blog post slug to validate
 * @returns true if blog post exists
 */
export function isValidBlogSlug(slug: string): slug is keyof typeof BLOG_POSTS {
  return slug in BLOG_POSTS;
}

/**
 * Validate that a project slug exists in the registry
 * @param slug - Project slug to validate
 * @returns true if project exists
 */
export function isValidProjectSlug(slug: string): slug is keyof typeof PROJECTS {
  return slug in PROJECTS;
}
