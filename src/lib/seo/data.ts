/**
 * Central SEO Data Repository
 *
 * Single source of truth for all SEO-related data across the application.
 * This prevents duplication and ensures consistency in metadata, structured data,
 * and SEO content.
 *
 * @module seo/data
 */
import { CANONICAL_BASE_URL } from './url';

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
 * Content calendar item for planning future blog posts
 */
export interface ContentIdea {
  /** Post title */
  title: string;
  /** URL-friendly slug */
  slug: string;
  /** Primary target keyword */
  targetKeyword: string;
  /** Monthly search volume */
  searchVolume: number;
  /** Keyword difficulty */
  difficulty: 'easy' | 'medium' | 'hard';
  /** Content category */
  category: string;
  /** Content tags */
  tags: string[];
  /** Publication status */
  status: 'planned' | 'in-progress' | 'published';
  /** Planned/actual publish date (ISO 8601) */
  publishDate?: string;
  /** Editorial priority */
  priority: 'high' | 'medium' | 'low';
  /** Estimated reading time */
  estimatedReadTime: string;
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
    locality?: string;
    region?: string;
    postalCode?: string;
    streetAddress?: string;
  };
  /** Social media links */
  social: {
    linkedin: string;
    github: string;
    rekvizitai: string;
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
  title: 'AI Software Development, Built for Production',
  description:
    'AI software development company in Vilnius, Lithuania. We help businesses adopt AI, build AI agents that work inside their systems, and launch AI products.',
  url: CANONICAL_BASE_URL,
  locale: 'en_US',
  alternateLocale: 'lt_LT',
  email: 'support@maxwellsoftwaresolutions.com',
  foundingDate: '2025-10-03',
  address: {
    country: 'LT',
    locality: 'Vilnius',
    region: 'Vilnius County',
    postalCode: 'LT-10240',
    streetAddress: 'Gvazdikų Sodų 4-oji g. 4',
  },
  social: {
    linkedin: 'https://www.linkedin.com/company/maxwell-software-solutions',
    github: 'https://github.com/Maxwell-Software-Solutions',
    rekvizitai: 'https://rekvizitai.vz.lt/imone/maxwell_software_solutions_mb/',
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
  ai: [
    'AI software development',
    'AI development company',
    'AI agents',
    'agentic AI',
    'AI adoption',
    'AI strategy',
    'AI consulting',
    'LLM integration',
    'generative AI development',
    'AI prototyping',
  ],
  core: [
    'software engineering consultancy',
    'code quality audit',
    'reliability engineering',
    'technical debt reduction',
  ],
  testing: ['test-driven development', 'TDD', 'software testing strategy', 'automated testing'],
  devops: ['CI/CD optimization', 'DevOps best practices', 'continuous integration', 'deployment automation'],
  architecture: ['software architecture', 'clean code', 'SOLID principles', 'design patterns'],
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
    title: 'AI Software Development Company in Vilnius, Lithuania — Maxwell Software Solutions',
    description: SITE_CONFIG.description,
    keywords: [
      ...KEYWORD_SETS.ai,
      'AI development company Vilnius',
      'AI agents Lithuania',
      'AI consulting Lithuania',
      'software development company Vilnius',
      ...KEYWORD_SETS.core,
    ],
    canonical: '/',
    ogType: 'website',
  },
  // Child pages get " | Maxwell Software Solutions" from the root title template
  about: {
    title: 'About Us — AI Software Engineers in Vilnius, Lithuania',
    description:
      'Maxwell Software Solutions is an AI software development company in Vilnius, Lithuania. Our AI software engineers are grounded in architecture, testing and reliability. Meet the team.',
    keywords: [...KEYWORD_SETS.ai, 'AI engineers Vilnius', 'AI development team Lithuania', 'software consultancy Vilnius'],
    canonical: '/about',
  },
  services: {
    title: 'AI Services in Vilnius — AI Agents, AI Adoption and AI Product Development',
    description:
      'AI services from Vilnius, Lithuania: AI adoption and strategy, AI agents and automation, AI product development and prototyping, on a foundation of audits, testing and CI/CD.',
    keywords: [...KEYWORD_SETS.ai, 'AI agents Vilnius', 'AI services Lithuania', ...KEYWORD_SETS.core, 'code quality audit Vilnius'],
    canonical: '/services',
  },
  contact: {
    title: 'Contact Us — Vilnius, Lithuania',
    description:
      'Talk to our team in Vilnius, Lithuania about AI adoption, AI agents or a new AI product, or about the quality and reliability of your software.',
    keywords: ['AI project inquiry', 'AI consulting contact', 'software consultancy Vilnius', ...KEYWORD_SETS.core],
    canonical: '/contact',
  },
  blog: {
    title: 'Engineering Insights — Blog',
    description:
      'Expert insights on software engineering, testing, architecture, and DevOps best practices from the Maxwell Software Solutions team.',
    keywords: [...KEYWORD_SETS.architecture, ...KEYWORD_SETS.testing, 'software engineering blog'],
    canonical: '/blog',
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
  caseStudies: {
    title: 'Real AI Work — Case Studies',
    description:
      'Real AI work: AI document processing for a UK law firm, an AI review loop on a live website, a multi-model AI orchestrator and an LED neon-sign builder.',
    keywords: [
      'AI case studies',
      'AI document processing',
      'AI agents',
      'multi-model AI orchestration',
      'AI development company Vilnius',
    ],
    canonical: '/case-studies',
  },
  startASprint: {
    title: 'Start a Sprint — Sprint-in-a-Box Service | Maxwell Software Solutions',
    description: 'Kick off a focused engineering sprint with Maxwell Software Solutions. Fixed-scope, fixed-price delivery with measurable outcomes in two to four weeks.',
    keywords: ['sprint delivery', 'fixed price sprint', 'engineering sprint', ...KEYWORD_SETS.core],
    canonical: '/start-a-sprint',
  },
  servicesPackages: {
    title: 'Service Packages — Code Audit, Sprint, Retainer & More | Maxwell Software Solutions',
    description: 'Compare all five Maxwell Software Solutions service packages: Code Health Audit, Sprint-in-a-Box, Engineering Partner Retainer, CI/CD Accelerator, and Fractional CTO.',
    keywords: ['engineering service packages', 'code audit package', 'software retainer', ...KEYWORD_SETS.core],
    canonical: '/services/packages',
  },
  advisory: {
    title: 'CTO-in-a-Box — Async Advisory for Startup Founders | Maxwell Software Solutions',
    description: 'Technical leadership without the €120K salary. Async Loom video reviews, monthly strategy call, and Slack access for €500/month. Cancel anytime.',
    keywords: ['fractional CTO', 'startup CTO advisory', 'async technical advisory', 'CTO as a service', ...KEYWORD_SETS.core],
    canonical: '/advisory',
  },
  codeHealthScore: {
    title: 'Code Health Score — Free Self-Assessment Quiz | Maxwell Software Solutions',
    description: 'Rate your codebase health in 2 minutes. Answer 15 questions about testing, deployment, security, and engineering practices. Get an instant score with actionable insights.',
    keywords: ['code health score', 'codebase assessment', 'engineering practices quiz', 'technical debt assessment', ...KEYWORD_SETS.core],
    canonical: '/code-health-score',
  },
  codeAudit: {
    title: 'Code Audit Services — Technical Debt Assessment | Maxwell Software Solutions',
    description: 'Professional code audit services: architecture review, security scan, performance analysis, and technical debt assessment. Prioritised remediation roadmap in 5 business days. €2,500 one-time.',
    keywords: ['code audit services', 'code review service', 'technical debt assessment', 'code quality review', ...KEYWORD_SETS.core],
    canonical: '/services/code-audit',
  },
  fractionalCTO: {
    title: 'Fractional CTO Services — Part-Time Technical Leadership | Maxwell Software Solutions',
    description: 'Fractional CTO services in Europe and Lithuania. Architecture decisions, team hiring, vendor selection, and investor due diligence. From €3,500/month, month-to-month.',
    keywords: ['fractional cto europe', 'fractional cto lithuania', 'part-time cto startup', 'fractional cto services', ...KEYWORD_SETS.core],
    canonical: '/services/fractional-cto',
  },
  hireDeveloper: {
    title: 'Hire a Senior Developer — React, Next.js, Node.js | Maxwell Software Solutions',
    description: 'Hire senior React, Next.js, and Node.js developers in Lithuania and Europe. No recruitment fees, start in 1-2 weeks. Sprint or retainer models available.',
    keywords: ['hire react developer lithuania', 'hire next.js developer', 'outsource development europe', 'hire senior developer', ...KEYWORD_SETS.core],
    canonical: '/services/hire-developer',
  },
  websiteScanner: {
    title: 'Free Website Health Scanner — Performance, Security & SEO | Maxwell Software Solutions',
    description: 'Scan any website for free. Get instant scores for performance (Core Web Vitals), security headers, SEO, and accessibility. Powered by Google PageSpeed Insights.',
    keywords: ['website scanner', 'website health check', 'site speed test', 'security headers check', 'SEO audit tool', 'web performance', ...KEYWORD_SETS.core],
    canonical: '/website-scanner',
  },
  // Lithuanian-only page on its own /lt/ address; the title is used whole (no brand suffix), see the page file
  documentCrossCheckLt: {
    title: 'Dokumentų nesutapimai: sąskaita, važtaraštis, CMR | Maxwell',
    description:
      'DI palygina sąskaitas, važtaraščius, CMR, brėžinius ir sertifikatus ir pažymi, kas nesutampa. Kiekvieną eilutę tvirtina žmogus. Dirbame nuotoliu.',
    keywords: [
      'dokumentų sutikrinimas',
      'dokumentų nesutapimai',
      'važtaraščio ir sąskaitos palyginimas',
      'CMR tikrinimas',
      'DI dokumentų tikrinimas',
      'dirbtinis intelektas verslui',
    ],
    canonical: '/lt/dokumentu-sutikrinimas',
    modifiedTime: '2026-11-04T00:00:00Z',
  },
  // Free in-browser tool, Lithuanian only, same /lt/ rules as the page above
  listCompareLt: {
    title: 'Nemokamas sąrašų palyginimas iš Excel ir PDF | Maxwell',
    description:
      'Įklijuokite du sąrašus iš Excel ar PDF ir iš karto pamatykite, kurie kodai ar kiekiai nesutampa. Veikia naršyklėje, duomenys niekur nesiunčiami.',
    keywords: [
      'sąrašų palyginimas',
      'Excel sąrašų palyginimas',
      'sąskaitos ir važtaraščio palyginimas',
      'kiekių palyginimas',
      'nemokamas įrankis',
    ],
    canonical: '/lt/sarasu-palyginimas',
    modifiedTime: '2026-11-06T00:00:00Z',
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
// Service Offerings
// ============================================================================

/**
 * Service offerings for structured data
 * @constant
 */
export const SERVICES: ReadonlyArray<ServiceOffering> = [
  {
    name: 'AI Adoption and Strategy',
    description:
      "Finding the AI use cases worth doing, a readiness assessment of data and systems, a roadmap, governance, and training for the client's team.",
  },
  {
    name: 'AI Agents and Automation',
    description:
      'Agentic workflows connected to business systems such as CRM, ERP, documents and ticketing, with people approving the steps that matter.',
  },
  {
    name: 'AI Product Development',
    description:
      'LLM features, knowledge assistants, and integration with the major model providers and with open or local models.',
  },
  {
    name: 'AI Innovation and Prototyping',
    description: 'Working proofs of concept for new AI ideas, built in weeks and tested with real users.',
  },
  {
    name: 'Code and AI Readiness Audit',
    description:
      'Static analysis, architecture review and test coverage mapping, with a prioritised plan of what to fix before adding AI.',
  },
  {
    name: 'Testing and AI Evaluations',
    description:
      'Test strategy plus evaluation sets for AI features, so model and prompt changes are checked like any other code.',
  },
  {
    name: 'Refactoring and Modernisation',
    description:
      'Step-by-step technical debt reduction that gives AI features clean interfaces and reliable data to work with.',
  },
  {
    name: 'Reliability and Monitoring',
    description:
      'SLOs, tracing and incident response, extended to tracking AI quality, latency and cost in production.',
  },
  {
    name: 'CI/CD and Safe Rollout',
    description: 'Fast pipelines with quality gates, preview environments and staged releases for safer deployments.',
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
// Content Calendar (P3-1: Content Strategy)
// ============================================================================

/**
 * Content calendar - planned blog posts
 * Move items to BLOG_POSTS when published
 * Track keyword targets, priorities, and publishing schedule
 */
export const CONTENT_CALENDAR: ContentIdea[] = [
  // High Priority - Q1 2026
  {
    title: 'Code Review Checklist: 15 Things Every Reviewer Should Check',
    slug: 'code-review-checklist',
    targetKeyword: 'code review checklist',
    searchVolume: 2400,
    difficulty: 'easy',
    category: 'Code Quality',
    tags: ['Code Review', 'Best Practices', 'Quality Assurance'],
    status: 'planned',
    priority: 'high',
    estimatedReadTime: '10 min read',
  },
  {
    title: 'Technical Debt: How to Identify, Measure, and Pay It Down',
    slug: 'technical-debt-guide',
    targetKeyword: 'technical debt',
    searchVolume: 3600,
    difficulty: 'medium',
    category: 'Refactoring',
    tags: ['Technical Debt', 'Code Quality', 'Maintenance'],
    status: 'planned',
    priority: 'high',
    estimatedReadTime: '12 min read',
  },
  {
    title: 'The Software Testing Pyramid: A Practical Guide',
    slug: 'testing-pyramid-guide',
    targetKeyword: 'testing pyramid',
    searchVolume: 1900,
    difficulty: 'easy',
    category: 'Testing',
    tags: ['Testing Strategy', 'Unit Testing', 'Integration Testing'],
    status: 'planned',
    priority: 'high',
    estimatedReadTime: '11 min read',
  },

  // Medium Priority - Q2 2026
  {
    title: 'DevOps Security Best Practices: Shift-Left Security',
    slug: 'devops-security-best-practices',
    targetKeyword: 'devops security best practices',
    searchVolume: 1200,
    difficulty: 'medium',
    category: 'DevOps',
    tags: ['Security', 'DevOps', 'CI/CD'],
    status: 'planned',
    priority: 'medium',
    estimatedReadTime: '13 min read',
  },
  {
    title: 'Comparing CI/CD Tools: Jenkins vs GitLab CI vs GitHub Actions',
    slug: 'cicd-tools-comparison',
    targetKeyword: 'ci/cd tools comparison',
    searchVolume: 890,
    difficulty: 'medium',
    category: 'DevOps',
    tags: ['CI/CD', 'Tools', 'Comparison'],
    status: 'planned',
    priority: 'medium',
    estimatedReadTime: '15 min read',
  },

  // Long-tail keywords - Q3 2026
  {
    title: 'How to Reduce Technical Debt in Legacy Systems',
    slug: 'reduce-technical-debt-legacy-systems',
    targetKeyword: 'how to reduce technical debt legacy systems',
    searchVolume: 320,
    difficulty: 'easy',
    category: 'Refactoring',
    tags: ['Legacy Code', 'Technical Debt', 'Refactoring'],
    status: 'planned',
    priority: 'medium',
    estimatedReadTime: '14 min read',
  },
  {
    title: 'What is Observability in Software Engineering?',
    slug: 'what-is-observability',
    targetKeyword: 'what is observability software',
    searchVolume: 450,
    difficulty: 'easy',
    category: 'Reliability',
    tags: ['Observability', 'Monitoring', 'DevOps'],
    status: 'planned',
    priority: 'low',
    estimatedReadTime: '9 min read',
  },
];

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
