import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Alert, ButtonLink } from '@/app/components/ui';
import dynamic from 'next/dynamic';
import ArticleStructuredData from '@/app/components/ArticleStructuredData';
import StructuredData from '@/app/components/StructuredData';
import { generateBreadcrumbSchema } from '@/lib/seo/structured-data';

// Defer large lower-page sections to reduce TTFB / initial JS
const RefactoringStrategies = dynamic(() => import('./sections/RefactoringStrategies'), { ssr: true });
const StepByStepProcess = dynamic(() => import('./sections/StepByStepProcess'), { ssr: true });
const ToolsAndTechniques = dynamic(() => import('./sections/ToolsAndTechniques'), { ssr: true });
const CommonPitfalls = dynamic(() => import('./sections/CommonPitfalls'), { ssr: true });
const MeasuringSuccess = dynamic(() => import('./sections/MeasuringSuccess'), { ssr: true });
const CaseStudies = dynamic(() => import('./sections/CaseStudies'), { ssr: true });

export const metadata: Metadata = {
  title: 'Refactoring Legacy Code: Complete Guide to Modernizing Your Software Architecture',
  description:
    'Learn proven strategies for refactoring legacy code, reducing technical debt, and improving software maintainability. Expert tips for modernizing old codebases.',
  keywords:
    'refactoring legacy code, technical debt, software modernization, code quality, software maintenance, legacy system upgrade, software refactoring, code improvement',
  alternates: {
    canonical: '/blog/refactoring-legacy-code',
  },
};

export default function RefactoringLegacyCodePost(): ReactElement {
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: 'Refactoring Legacy Code', url: '/blog/refactoring-legacy-code' },
  ]);
  return (
    <>
      <StructuredData schema={breadcrumb} />
      <ArticleStructuredData
        title="Refactoring Legacy Code: Complete Guide to Modernizing Your Software Architecture"
        description="Learn proven strategies for refactoring legacy code, reducing technical debt, and improving software maintainability. Expert tips for modernizing old codebases."
        datePublished="2024-12-19"
        imageUrl="https://www.maxwellsoftwaresolutions.com/images/blog/refactoring-legacy-code.svg"
      />
      <article className="article prose-flow">
        {/* Header */}
        <header className="article-head">
          <nav>
            <Link href="/blog" className="article-back">
              ← Back to Insights
            </Link>
          </nav>
          <h1>
            Refactoring Legacy Code: Complete Guide to Modernizing Your Software Architecture
          </h1>
          <div className="article-meta">
            <time dateTime="2024-12-19">December 19, 2024</time>
            <span>•</span>
            <span>12 min read</span>
            <span>•</span>
            <span>Software Modernization</span>
          </div>
        </header>

        {/* Hero Image */}
        <div className="art article-art">
          <Image
            src="/images/blog/refactoring-legacy-code.svg"
            alt="Legacy code refactoring showing transformation from old to new architecture"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Table of Contents */}
        <section className="note">
          <h2 className="mb-4">Table of Contents</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <ul className="list-none space-y-2 pl-0">
              <li>
                <a href="#what-is-legacy-code" className="text-secondary no-underline transition-colors hover:text-accent">
                  • What is Legacy Code?
                </a>
              </li>
              <li>
                <a href="#technical-debt" className="text-secondary no-underline transition-colors hover:text-accent">
                  • Understanding Technical Debt
                </a>
              </li>
              <li>
                <a href="#refactoring-strategies" className="text-secondary no-underline transition-colors hover:text-accent">
                  • Refactoring Strategies
                </a>
              </li>
              <li>
                <a href="#step-by-step-process" className="text-secondary no-underline transition-colors hover:text-accent">
                  • Step-by-Step Process
                </a>
              </li>
            </ul>
            <ul className="list-none space-y-2 pl-0">
              <li>
                <a href="#tools-and-techniques" className="text-secondary no-underline transition-colors hover:text-accent">
                  • Tools and Techniques
                </a>
              </li>
              <li>
                <a href="#common-pitfalls" className="text-secondary no-underline transition-colors hover:text-accent">
                  • Common Pitfalls
                </a>
              </li>
              <li>
                <a href="#measuring-success" className="text-secondary no-underline transition-colors hover:text-accent">
                  • Measuring Success
                </a>
              </li>
              <li>
                <a href="#case-studies" className="text-secondary no-underline transition-colors hover:text-accent">
                  • Worked Example
                </a>
              </li>
            </ul>
          </div>
        </section>

        {/* Introduction */}
        <section>
          <h2 className="mb-6">What is Legacy Code and Why Should You Care?</h2>
          <p className="lead mb-4">
            Legacy code is the technical debt that accumulates over time in software systems. It&apos;s the code that
            works but is difficult to understand, modify, or extend. While it may seem harmless to leave old code as-is,
            the hidden costs of technical debt can cripple your development team&apos;s productivity and your
            business&apos;s ability to compete.
          </p>
          <p>
            In this comprehensive guide, we&apos;ll explore proven strategies for refactoring legacy code, reducing
            technical debt, and modernizing your software architecture. Whether you&apos;re dealing with a 10-year-old
            monolith or a system that&apos;s grown beyond its original design, these techniques will help you transform
            your codebase into a maintainable, scalable foundation for future growth.
          </p>
        </section>

        {/* What is Legacy Code */}
        <section id="what-is-legacy-code">
          <h2 className="mb-6">What is Legacy Code?</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="mb-4">Characteristics of Legacy Code</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-accent-fill rounded-full mt-3 flex-shrink-0"></span>
                  <span>No automated tests or outdated test coverage</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-accent-fill rounded-full mt-3 flex-shrink-0"></span>
                  <span>Complex, deeply nested functions with unclear logic</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-accent-fill rounded-full mt-3 flex-shrink-0"></span>
                  <span>Hardcoded values and magic numbers throughout</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-accent-fill rounded-full mt-3 flex-shrink-0"></span>
                  <span>Outdated dependencies and security vulnerabilities</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-accent-fill rounded-full mt-3 flex-shrink-0"></span>
                  <span>Poor documentation or outdated comments</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4">Signs You Have Legacy Code</h3>
              <div className="space-y-4">
                <Alert variant="info" icon="🚨" title="Red Flags">
                  <ul className="list-none pl-0 space-y-1">
                    <li>• Developers afraid to make changes</li>
                    <li>• Simple features take weeks to implement</li>
                    <li>• Frequent production bugs and hotfixes</li>
                    <li>• High turnover in development team</li>
                  </ul>
                </Alert>
                <Alert variant="warning" icon="⚠️" title="Warning Signs">
                  <ul className="list-none pl-0 space-y-1">
                    <li>• Code reviews take longer than coding</li>
                    <li>• New team members struggle to onboard</li>
                    <li>• Deployment frequency decreasing</li>
                    <li>• Technical debt discussions in every sprint</li>
                  </ul>
                </Alert>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Debt */}
        <section id="technical-debt">
          <h2 className="mb-6">Understanding Technical Debt: The Hidden Cost of Legacy Code</h2>
          <p className="mb-6">
            Technical debt is like financial debt—it accumulates interest over time. Every shortcut taken, every hack
            implemented, and every outdated pattern left in place makes future development more expensive and
            time-consuming.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-6">
            <div className="note">
              <h3 className="mb-4 text-accent">Types of Technical Debt</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="mb-2">Deliberate Debt</h4>
                  <p className="text-sm">
                    Conscious decisions to take shortcuts for speed, often with plans to pay it back later.
                  </p>
                </div>
                <div>
                  <h4 className="mb-2">Accidental Debt</h4>
                  <p className="text-sm">
                    Unintended consequences of poor design decisions or lack of knowledge.
                  </p>
                </div>
                <div>
                  <h4 className="mb-2">Bit Rot</h4>
                  <p className="text-sm">
                    Code that becomes outdated due to changing requirements or technology evolution.
                  </p>
                </div>
              </div>
            </div>
            <div className="note">
              <h3 className="mb-4 text-accent">Cost of Technical Debt</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="mb-2">Development Speed</h4>
                  <p className="text-sm">
                    Features take far longer to implement in legacy systems.
                  </p>
                </div>
                <div>
                  <h4 className="mb-2">Bug Frequency</h4>
                  <p className="text-sm">
                    Production issues are more frequent in high-debt codebases.
                  </p>
                </div>
                <div>
                  <h4 className="mb-2">Team Morale</h4>
                  <p className="text-sm">
                    Developers become frustrated and less productive over time.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </section>

        {/* Refactoring Strategies (dynamically loaded below for code splitting) */}
        <section id="refactoring-strategies">
          <h2 className="mb-6">Proven Refactoring Strategies for Legacy Code</h2>

          <div className="space-y-8">
            <div>
              <h3 className="mb-4">1. Strangler Fig Pattern</h3>
              <p className="mb-4">
                Instead of rewriting everything at once, gradually replace legacy components with new ones. This
                approach minimizes risk and allows you to validate improvements incrementally.
              </p>
              <div className="note">
                <h4 className="mb-2">Implementation Steps:</h4>
                <ol className="space-y-2 text-sm">
                  <li>Identify the most problematic legacy components</li>
                  <li>Create new implementations alongside old ones</li>
                  <li>Route traffic gradually from old to new</li>
                  <li>Monitor performance and functionality</li>
                  <li>Remove old components once new ones are proven</li>
                </ol>
              </div>
            </div>

            <div>
              <h3 className="mb-4">2. Extract Method Refactoring</h3>
              <p className="mb-4">
                Break down large, complex functions into smaller, more manageable pieces. This improves readability,
                testability, and maintainability.
              </p>
              <div className="grid lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="mb-2 text-error">Before: Monolithic Function</h4>
                  <div className="note font-mono text-sm">
                    <div className="text-error">function processUserData(user) &#123;</div>
                    <div className="text-error"> {/* 50+ lines of mixed logic */}</div>
                    <div className="text-error"> {/* validation, processing, saving */}</div>
                    <div className="text-error"> {/* error handling, logging */}</div>
                    <div className="text-error">&#125;</div>
                  </div>
                </div>
                <div>
                  <h4 className="mb-2 text-success">After: Extracted Methods</h4>
                  <div className="note font-mono text-sm">
                    <div className="text-success">function processUserData(user) &#123;</div>
                    <div className="text-success"> validateUser(user);</div>
                    <div className="text-success"> const processed = processUser(user);</div>
                    <div className="text-success"> saveUser(processed);</div>
                    <div className="text-success"> logUserActivity(user);</div>
                    <div className="text-success">&#125;</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-4">3. Dependency Injection</h3>
              <p className="mb-4">
                Replace hardcoded dependencies with injectable interfaces. This makes your code more testable and
                flexible.
              </p>
              <div className="note">
                <h4 className="mb-2">Benefits:</h4>
                <ul className="space-y-2 text-sm">
                  <li>Easier unit testing with mock objects</li>
                  <li>Flexible configuration for different environments</li>
                  <li>Better separation of concerns</li>
                  <li>Easier to swap implementations</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Step-by-Step Process (dynamic) */}
        <section id="step-by-step-process">
          <h2 className="mb-6">Step-by-Step Refactoring Process</h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-6 flex-shrink-0">
                <span className="step-index">1</span>
              </div>
              <div>
                <h3 className="mb-2">Assessment and Planning</h3>
                <p className="mb-3">
                  Before starting any refactoring work, thoroughly assess your codebase and create a comprehensive plan.
                </p>
                <ul className="space-y-1 text-sm">
                  <li>Run code quality analysis tools (SonarQube, CodeClimate)</li>
                  <li>Identify the most critical and high-impact areas</li>
                  <li>Create a dependency map of your system</li>
                  <li>Estimate effort and prioritize refactoring tasks</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-6 flex-shrink-0">
                <span className="step-index">2</span>
              </div>
              <div>
                <h3 className="mb-2">Establish Safety Nets</h3>
                <p className="mb-3">
                  Ensure you have comprehensive testing and monitoring in place before making changes.
                </p>
                <ul className="space-y-1 text-sm">
                  <li>Increase test coverage to at least 80%</li>
                  <li>Set up automated testing pipelines</li>
                  <li>Implement monitoring and alerting</li>
                  <li>Create rollback procedures</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-6 flex-shrink-0">
                <span className="step-index">3</span>
              </div>
              <div>
                <h3 className="mb-2">Incremental Refactoring</h3>
                <p className="mb-3">
                  Make small, safe changes that can be easily tested and validated.
                </p>
                <ul className="space-y-1 text-sm">
                  <li>Refactor one function or class at a time</li>
                  <li>Run tests after each change</li>
                  <li>Commit frequently with descriptive messages</li>
                  <li>Monitor system performance and stability</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-6 flex-shrink-0">
                <span className="step-index">4</span>
              </div>
              <div>
                <h3 className="mb-2">Validation and Testing</h3>
                <p className="mb-3">
                  Thoroughly test each refactored component to ensure functionality is preserved.
                </p>
                <ul className="space-y-1 text-sm">
                  <li>Run all existing tests</li>
                  <li>Perform integration testing</li>
                  <li>Conduct user acceptance testing</li>
                  <li>Monitor production metrics</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Tools and Techniques (dynamic) */}
        <section id="tools-and-techniques">
          <h2 className="mb-6">Essential Tools and Techniques for Code Refactoring</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="mb-4">Code Analysis Tools</h3>
              <div className="space-y-3">
                <div className="note">
                  <h4 className="mb-2">SonarQube</h4>
                  <p className="text-sm">
                    Comprehensive code quality analysis with detailed reports on technical debt, code smells, and
                    security vulnerabilities.
                  </p>
                </div>
                <div className="note">
                  <h4 className="mb-2">CodeClimate</h4>
                  <p className="text-sm">
                    Automated code review with maintainability scores and detailed insights into code complexity and
                    duplication.
                  </p>
                </div>
                <div className="note">
                  <h4 className="mb-2">ESLint / TSLint</h4>
                  <p className="text-sm">
                    JavaScript/TypeScript linting tools that identify code quality issues and enforce coding standards.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-4">Refactoring Techniques</h3>
              <div className="space-y-3">
                <div className="note">
                  <h4 className="mb-2">Extract Method</h4>
                  <p className="text-sm">
                    Break large functions into smaller, focused methods that each do one thing well.
                  </p>
                </div>
                <div className="note">
                  <h4 className="mb-2">Extract Class</h4>
                  <p className="text-sm">
                    Move related functionality into dedicated classes with clear responsibilities.
                  </p>
                </div>
                <div className="note">
                  <h4 className="mb-2">Replace Magic Numbers</h4>
                  <p className="text-sm">
                    Replace hardcoded values with named constants that clearly express their purpose.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Common Pitfalls (dynamic) */}
        <section id="common-pitfalls">
          <h2 className="mb-6">Common Pitfalls and How to Avoid Them</h2>

          <div className="space-y-6">
            <Alert variant="error" icon="🚨" title="Refactoring Without Tests">
              <p className="mb-3">
                <strong>Problem:</strong> Making changes without comprehensive test coverage is like walking on a
                tightrope without a safety net.
              </p>
              <p className="mb-3">
                <strong>Solution:</strong> Establish test coverage before starting refactoring work. Aim for at least
                80% coverage of critical code paths.
              </p>
            </Alert>

            <Alert variant="warning" icon="⚠️" title="Big Bang Refactoring">
              <p className="mb-3">
                <strong>Problem:</strong> Trying to refactor everything at once leads to long-running branches, merge
                conflicts, and increased risk.
              </p>
              <p className="mb-3">
                <strong>Solution:</strong> Break refactoring into small, incremental changes that can be completed in a
                single sprint or iteration.
              </p>
            </Alert>

            <Alert variant="info" icon="💡" title="Ignoring Business Context">
              <p className="mb-3">
                <strong>Problem:</strong> Refactoring for the sake of refactoring without considering business value and
                priorities.
              </p>
              <p className="mb-3">
                <strong>Solution:</strong> Always tie refactoring work to business objectives. Focus on areas that will
                have the biggest impact on development speed and reliability.
              </p>
            </Alert>
          </div>
        </section>

        {/* Measuring Success (dynamic) */}
        <section id="measuring-success">
          <h2 className="mb-6">Measuring Refactoring Success</h2>

          <p className="mb-6">
            To justify continued investment in refactoring, you need to measure and track the impact of your efforts.
            Here are the key metrics to monitor:
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="mb-4">Code Quality Metrics</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Test Coverage</span>
                  <span className="font-semibold text-accent">Target: 80%+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Code Duplication</span>
                  <span className="font-semibold text-accent">Target: &lt;5%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Cyclomatic Complexity</span>
                  <span className="font-semibold text-accent">Target: &lt;10</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Technical Debt Ratio</span>
                  <span className="font-semibold text-accent">Target: &lt;5%</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-4">Business Impact Metrics</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Feature Delivery Speed</span>
                  <span className="font-semibold text-accent">Target: 30%+ improvement</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Production Bug Rate</span>
                  <span className="font-semibold text-accent">Target: 50%+ reduction</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Developer Onboarding Time</span>
                  <span className="font-semibold text-accent">Target: 40%+ reduction</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Code Review Time</span>
                  <span className="font-semibold text-accent">Target: 25%+ reduction</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Case Studies (dynamic) */}
        <section id="case-studies">
          <h2 className="mb-6">A Worked Refactoring Example</h2>

          <div className="space-y-8">
            <div className="note">
              <h3 className="mb-4">Scenario: E-commerce Platform Modernization</h3>
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="mb-3 text-accent">The Challenge</h4>
                  <p className="mb-4">
                    Picture a five-year-old e-commerce platform with hundreds of thousands of lines of code, frequent
                    outages, slow performance, and difficulty adding new features.
                  </p>
                  <ul className="list-none pl-0 text-sm space-y-2">
                    <li>• Slow page loads during peak traffic</li>
                    <li>• Production outages every month</li>
                    <li>• New features take months to implement</li>
                    <li>• High developer turnover due to frustration</li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-3 text-accent">The Solution</h4>
                  <p className="mb-4">
                    A comprehensive refactoring strategy built on the Strangler Fig pattern.
                  </p>
                  <ul className="list-none pl-0 text-sm space-y-2">
                    <li>• Extract payment processing into a microservice</li>
                    <li>• Refactor database queries and add caching</li>
                    <li>• Put a comprehensive testing strategy in place</li>
                    <li>• Migrate legacy components gradually</li>
                  </ul>
                </div>
              </div>
              <Alert variant="success" icon="📊" title="What to Expect Over the Following Year">
                <ul className="list-none pl-0 text-sm space-y-2">
                  <li>• Faster page loads, because the hot paths are measured and cached</li>
                  <li>• Far fewer production outages, because the riskiest code now has tests</li>
                  <li>• Quicker feature delivery, because new work lands in the extracted services</li>
                  <li>• Lower running costs, because the platform does less wasted work</li>
                </ul>
              </Alert>
            </div>
          </div>
        </section>

        {/* Inject dynamically split sections at end for now (demo). In a real refactor, original inline content would be removed. */}
        <RefactoringStrategies />
        <StepByStepProcess />
        <ToolsAndTechniques />
        <CommonPitfalls />
        <MeasuringSuccess />
        <CaseStudies />

        {/* Conclusion */}
        <section>
          <h2 className="mb-6">The Path Forward: Building a Maintainable Future</h2>
          <p className="mb-4">
            Refactoring legacy code is not just a technical exercise—it&apos;s an investment in your team&apos;s
            productivity, your product&apos;s reliability, and your business&apos;s ability to compete in an
            ever-changing market. While the journey may seem daunting, the rewards are substantial and measurable.
          </p>
          <p>
            Remember, refactoring is a marathon, not a sprint. Start small, measure everything, and celebrate
            incremental improvements. With the right strategy, tools, and mindset, you can transform even the most
            challenging legacy codebase into a modern, maintainable foundation for future growth.
          </p>
        </section>

        {/* Call to Action */}
        <section className="callout block-gap">
          <h2 className="mb-4">Ready to Transform Your Legacy Codebase?</h2>
          <p className="mb-6">
            At Maxwell Software Solutions, we specialize in helping teams modernize legacy systems and build
            maintainable, scalable software architectures. Our{' '}
            <Link href="/services" className="text-accent underline hover:no-underline font-medium">
              Technical Debt Reduction service
            </Link>{' '}
            uses systematic refactoring techniques to transform legacy codebases safely — while keeping your production
            systems running.
          </p>
          <div className="band-actions">
            <ButtonLink href="/contact" variant="accent">
              Start Your Modernization Journey
            </ButtonLink>
            <ButtonLink href="/services" variant="ghost">
              View Our Services
            </ButtonLink>
          </div>
        </section>
      </article>
    </>
  );
}
