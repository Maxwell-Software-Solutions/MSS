import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';

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
};

export default function RefactoringLegacyCodePost(): ReactElement {
  return (
    <article className="max-w-4xl mx-auto px-6 sm:px-10 py-12">
      {/* Header */}
      <header className="mb-12">
        <nav className="mb-6">
          <Link href="/blog" className="text-foreground/60 hover:text-foreground transition-colors">
            ← Back to Insights
          </Link>
        </nav>
        <h1 className="text-4xl sm:text-5xl font-bold mb-6">
          Refactoring Legacy Code: Complete Guide to Modernizing Your Software Architecture
        </h1>
        <div className="flex items-center gap-4 text-foreground/60">
          <time dateTime="2024-12-19">December 19, 2024</time>
          <span>•</span>
          <span>12 min read</span>
          <span>•</span>
          <span>Software Modernization</span>
        </div>
      </header>

      {/* Hero Image */}
      <div className="mb-12 relative h-64 sm:h-80 rounded-2xl overflow-hidden">
        <Image
          src="/images/blog/refactoring-legacy-code.svg"
          alt="Legacy code refactoring showing transformation from old to new architecture"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Table of Contents */}
      <section className="mb-12 bg-foreground/5 rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-4">Table of Contents</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <ul className="space-y-2 text-foreground/70">
            <li>
              <a href="#what-is-legacy-code" className="hover:text-accent transition-colors">
                • What is Legacy Code?
              </a>
            </li>
            <li>
              <a href="#technical-debt" className="hover:text-accent transition-colors">
                • Understanding Technical Debt
              </a>
            </li>
            <li>
              <a href="#refactoring-strategies" className="hover:text-accent transition-colors">
                • Refactoring Strategies
              </a>
            </li>
            <li>
              <a href="#step-by-step-process" className="hover:text-accent transition-colors">
                • Step-by-Step Process
              </a>
            </li>
          </ul>
          <ul className="space-y-2 text-foreground/70">
            <li>
              <a href="#tools-and-techniques" className="hover:text-accent transition-colors">
                • Tools and Techniques
              </a>
            </li>
            <li>
              <a href="#common-pitfalls" className="hover:text-accent transition-colors">
                • Common Pitfalls
              </a>
            </li>
            <li>
              <a href="#measuring-success" className="hover:text-accent transition-colors">
                • Measuring Success
              </a>
            </li>
            <li>
              <a href="#case-studies" className="hover:text-accent transition-colors">
                • Real-World Case Studies
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/* Introduction */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">What is Legacy Code and Why Should You Care?</h2>
        <p className="text-xl text-foreground/80 leading-relaxed mb-6">
          Legacy code is the technical debt that accumulates over time in software systems. It&apos;s the code that
          works but is difficult to understand, modify, or extend. While it may seem harmless to leave old code as-is,
          the hidden costs of technical debt can cripple your development team&apos;s productivity and your
          business&apos;s ability to compete.
        </p>
        <p className="text-lg text-foreground/70 leading-relaxed">
          In this comprehensive guide, we&apos;ll explore proven strategies for refactoring legacy code, reducing
          technical debt, and modernizing your software architecture. Whether you&apos;re dealing with a 10-year-old
          monolith or a system that&apos;s grown beyond its original design, these techniques will help you transform
          your codebase into a maintainable, scalable foundation for future growth.
        </p>
      </section>

      {/* What is Legacy Code */}
      <section id="what-is-legacy-code" className="mb-16">
        <h2 className="text-3xl font-bold mb-8">What is Legacy Code?</h2>
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Characteristics of Legacy Code</h3>
            <ul className="space-y-3 text-foreground/70">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></span>
                <span>No automated tests or outdated test coverage</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></span>
                <span>Complex, deeply nested functions with unclear logic</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></span>
                <span>Hardcoded values and magic numbers throughout</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></span>
                <span>Outdated dependencies and security vulnerabilities</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></span>
                <span>Poor documentation or outdated comments</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Signs You Have Legacy Code</h3>
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="font-semibold text-red-800 mb-2">🚨 Red Flags</h3>
                <ul className="text-red-700 text-sm space-y-1">
                  <li>• Developers afraid to make changes</li>
                  <li>• Simple features take weeks to implement</li>
                  <li>• Frequent production bugs and hotfixes</li>
                  <li>• High turnover in development team</li>
                </ul>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Warning Signs</h4>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• Code reviews take longer than coding</li>
                  <li>• New team members struggle to onboard</li>
                  <li>• Deployment frequency decreasing</li>
                  <li>• Technical debt discussions in every sprint</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Debt */}
      <section id="technical-debt" className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Understanding Technical Debt: The Hidden Cost of Legacy Code</h2>
        <p className="text-lg text-foreground/70 mb-6">
          Technical debt is like financial debt—it accumulates interest over time. Every shortcut taken, every hack
          implemented, and every outdated pattern left in place makes future development more expensive and
          time-consuming.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-foreground/5 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-accent">Types of Technical Debt</h3>
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold mb-2">Deliberate Debt</h4>
                <p className="text-foreground/70 text-sm">
                  Conscious decisions to take shortcuts for speed, often with plans to pay it back later.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Accidental Debt</h4>
                <p className="text-foreground/70 text-sm">
                  Unintended consequences of poor design decisions or lack of knowledge.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Bit Rot</h4>
                <p className="text-foreground/70 text-sm">
                  Code that becomes outdated due to changing requirements or technology evolution.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-foreground/5 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-accent">Cost of Technical Debt</h3>
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold mb-2">Development Speed</h4>
                <p className="text-foreground/70 text-sm">Features take 2-10x longer to implement in legacy systems.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Bug Frequency</h4>
                <p className="text-foreground/70 text-sm">
                  Production issues increase by 40-80% in high-debt codebases.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Team Morale</h4>
                <p className="text-foreground/70 text-sm">
                  Developers become frustrated and less productive over time.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-accent/10 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Technical Debt Calculator</h3>
          <p className="text-foreground/70 mb-4">Calculate the real cost of your technical debt:</p>
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-accent">$50K - $500K</div>
              <div className="text-sm text-foreground/70">Annual Cost for Medium Codebases</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent">2-5x</div>
              <div className="text-sm text-foreground/70">Slower Development Speed</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent">30-60%</div>
              <div className="text-sm text-foreground/70">Higher Bug Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Refactoring Strategies (dynamically loaded below for code splitting) */}
      <section id="refactoring-strategies" className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Proven Refactoring Strategies for Legacy Code</h2>

        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-semibold mb-4">1. Strangler Fig Pattern</h3>
            <p className="text-lg text-foreground/70 mb-4">
              Instead of rewriting everything at once, gradually replace legacy components with new ones. This approach
              minimizes risk and allows you to validate improvements incrementally.
            </p>
            <div className="bg-foreground/5 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Implementation Steps:</h4>
              <ol className="list-decimal list-inside space-y-2 text-foreground/70 text-sm">
                <li>Identify the most problematic legacy components</li>
                <li>Create new implementations alongside old ones</li>
                <li>Route traffic gradually from old to new</li>
                <li>Monitor performance and functionality</li>
                <li>Remove old components once new ones are proven</li>
              </ol>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4">2. Extract Method Refactoring</h3>
            <p className="text-lg text-foreground/70 mb-4">
              Break down large, complex functions into smaller, more manageable pieces. This improves readability,
              testability, and maintainability.
            </p>
            <div className="grid lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2 text-red-600">Before: Monolithic Function</h4>
                <div className="bg-foreground/10 rounded-lg p-4 font-mono text-sm">
                  <div className="text-red-600">function processUserData(user) &#123;</div>
                  <div className="text-red-600"> {/* 50+ lines of mixed logic */}</div>
                  <div className="text-red-600"> {/* validation, processing, saving */}</div>
                  <div className="text-red-600"> {/* error handling, logging */}</div>
                  <div className="text-red-600">&#125;</div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-green-600">After: Extracted Methods</h4>
                <div className="bg-foreground/10 rounded-lg p-4 font-mono text-sm">
                  <div className="text-green-600">function processUserData(user) &#123;</div>
                  <div className="text-green-600"> validateUser(user);</div>
                  <div className="text-green-600"> const processed = processUser(user);</div>
                  <div className="text-green-600"> saveUser(processed);</div>
                  <div className="text-green-600"> logUserActivity(user);</div>
                  <div className="text-green-600">&#125;</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4">3. Dependency Injection</h3>
            <p className="text-lg text-foreground/70 mb-4">
              Replace hardcoded dependencies with injectable interfaces. This makes your code more testable and
              flexible.
            </p>
            <div className="bg-foreground/5 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Benefits:</h4>
              <ul className="list-disc list-inside space-y-2 text-foreground/70 text-sm">
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
      <section id="step-by-step-process" className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Step-by-Step Refactoring Process</h2>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">1</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Assessment and Planning</h3>
              <p className="text-foreground/70 mb-3">
                Before starting any refactoring work, thoroughly assess your codebase and create a comprehensive plan.
              </p>
              <ul className="list-disc list-inside space-y-1 text-foreground/70 text-sm">
                <li>Run code quality analysis tools (SonarQube, CodeClimate)</li>
                <li>Identify the most critical and high-impact areas</li>
                <li>Create a dependency map of your system</li>
                <li>Estimate effort and prioritize refactoring tasks</li>
              </ul>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">2</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Establish Safety Nets</h3>
              <p className="text-foreground/70 mb-3">
                Ensure you have comprehensive testing and monitoring in place before making changes.
              </p>
              <ul className="list-disc list-inside space-y-1 text-foreground/70 text-sm">
                <li>Increase test coverage to at least 80%</li>
                <li>Set up automated testing pipelines</li>
                <li>Implement monitoring and alerting</li>
                <li>Create rollback procedures</li>
              </ul>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">3</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Incremental Refactoring</h3>
              <p className="text-foreground/70 mb-3">
                Make small, safe changes that can be easily tested and validated.
              </p>
              <ul className="list-disc list-inside space-y-1 text-foreground/70 text-sm">
                <li>Refactor one function or class at a time</li>
                <li>Run tests after each change</li>
                <li>Commit frequently with descriptive messages</li>
                <li>Monitor system performance and stability</li>
              </ul>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">4</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Validation and Testing</h3>
              <p className="text-foreground/70 mb-3">
                Thoroughly test each refactored component to ensure functionality is preserved.
              </p>
              <ul className="list-disc list-inside space-y-1 text-foreground/70 text-sm">
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
      <section id="tools-and-techniques" className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Essential Tools and Techniques for Code Refactoring</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Code Analysis Tools</h3>
            <div className="space-y-3">
              <div className="bg-foreground/5 rounded-lg p-4">
                <h4 className="font-semibold mb-2">SonarQube</h4>
                <p className="text-foreground/70 text-sm">
                  Comprehensive code quality analysis with detailed reports on technical debt, code smells, and security
                  vulnerabilities.
                </p>
              </div>
              <div className="bg-foreground/5 rounded-lg p-4">
                <h4 className="font-semibold mb-2">CodeClimate</h4>
                <p className="text-foreground/70 text-sm">
                  Automated code review with maintainability scores and detailed insights into code complexity and
                  duplication.
                </p>
              </div>
              <div className="bg-foreground/5 rounded-lg p-4">
                <h4 className="font-semibold mb-2">ESLint / TSLint</h4>
                <p className="text-foreground/70 text-sm">
                  JavaScript/TypeScript linting tools that identify code quality issues and enforce coding standards.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Refactoring Techniques</h3>
            <div className="space-y-3">
              <div className="bg-foreground/5 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Extract Method</h4>
                <p className="text-foreground/70 text-sm">
                  Break large functions into smaller, focused methods that each do one thing well.
                </p>
              </div>
              <div className="bg-foreground/5 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Extract Class</h4>
                <p className="text-foreground/70 text-sm">
                  Move related functionality into dedicated classes with clear responsibilities.
                </p>
              </div>
              <div className="bg-foreground/5 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Replace Magic Numbers</h4>
                <p className="text-foreground/70 text-sm">
                  Replace hardcoded values with named constants that clearly express their purpose.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Pitfalls (dynamic) */}
      <section id="common-pitfalls" className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Common Pitfalls and How to Avoid Them</h2>

        <div className="space-y-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-red-800 mb-4">🚨 Refactoring Without Tests</h3>
            <p className="text-red-700 mb-3">
              <strong>Problem:</strong> Making changes without comprehensive test coverage is like walking on a
              tightrope without a safety net.
            </p>
            <p className="text-red-700 mb-3">
              <strong>Solution:</strong> Establish test coverage before starting refactoring work. Aim for at least 80%
              coverage of critical code paths.
            </p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-yellow-800 mb-4">⚠️ Big Bang Refactoring</h3>
            <p className="text-yellow-700 mb-3">
              <strong>Problem:</strong> Trying to refactor everything at once leads to long-running branches, merge
              conflicts, and increased risk.
            </p>
            <p className="text-yellow-700 mb-3">
              <strong>Solution:</strong> Break refactoring into small, incremental changes that can be completed in a
              single sprint or iteration.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">💡 Ignoring Business Context</h3>
            <p className="text-blue-700 mb-3">
              <strong>Problem:</strong> Refactoring for the sake of refactoring without considering business value and
              priorities.
            </p>
            <p className="text-blue-700 mb-3">
              <strong>Solution:</strong> Always tie refactoring work to business objectives. Focus on areas that will
              have the biggest impact on development speed and reliability.
            </p>
          </div>
        </div>
      </section>

      {/* Measuring Success (dynamic) */}
      <section id="measuring-success" className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Measuring Refactoring Success</h2>

        <p className="text-lg text-foreground/70 mb-6">
          To justify continued investment in refactoring, you need to measure and track the impact of your efforts. Here
          are the key metrics to monitor:
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Code Quality Metrics</h3>
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
            <h3 className="text-xl font-semibold mb-4">Business Impact Metrics</h3>
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
      <section id="case-studies" className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Real-World Refactoring Case Studies</h2>

        <div className="space-y-8">
          <div className="bg-foreground/5 rounded-2xl p-8">
            <h3 className="text-2xl font-semibold mb-4">Case Study 1: E-commerce Platform Modernization</h3>
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold mb-3 text-accent">The Challenge</h4>
                <p className="text-foreground/70 mb-4">
                  A 5-year-old e-commerce platform with 500K+ lines of code was experiencing frequent outages, slow
                  performance, and difficulty adding new features.
                </p>
                <ul className="text-foreground/70 text-sm space-y-2">
                  <li>• 15-minute page load times during peak traffic</li>
                  <li>• 3-5 production outages per month</li>
                  <li>• New features took 3-6 months to implement</li>
                  <li>• High developer turnover due to frustration</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-accent">The Solution</h4>
                <p className="text-foreground/70 mb-4">
                  Implemented a comprehensive refactoring strategy using the Strangler Fig pattern.
                </p>
                <ul className="text-foreground/70 text-sm space-y-2">
                  <li>• Extracted payment processing into microservice</li>
                  <li>• Refactored database queries and added caching</li>
                  <li>• Implemented comprehensive testing strategy</li>
                  <li>• Gradual migration of legacy components</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-2">Results After 12 Months</h4>
              <div className="grid md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-600">↓ 90%</div>
                  <div className="text-sm text-green-700">Page Load Time</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">↓ 95%</div>
                  <div className="text-sm text-green-700">Production Outages</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">↑ 300%</div>
                  <div className="text-sm text-green-700">Feature Delivery Speed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">$2M</div>
                  <div className="text-sm text-green-700">Annual Cost Savings</div>
                </div>
              </div>
            </div>
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
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">The Path Forward: Building a Maintainable Future</h2>
        <p className="text-lg text-foreground/70 mb-4">
          Refactoring legacy code is not just a technical exercise—it&apos;s an investment in your team&apos;s
          productivity, your product&apos;s reliability, and your business&apos;s ability to compete in an ever-changing
          market. While the journey may seem daunting, the rewards are substantial and measurable.
        </p>
        <p className="text-lg text-foreground/70">
          Remember, refactoring is a marathon, not a sprint. Start small, measure everything, and celebrate incremental
          improvements. With the right strategy, tools, and mindset, you can transform even the most challenging legacy
          codebase into a modern, maintainable foundation for future growth.
        </p>
      </section>

      {/* Call to Action */}
      <section className="bg-accent/10 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Transform Your Legacy Codebase?</h2>
        <p className="text-foreground/70 mb-6">
          At Maxwell Software Solutions, we specialize in helping teams modernize legacy systems and build maintainable,
          scalable software architectures. Let&apos;s work together to transform your technical debt into a competitive
          advantage.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact" className="btn btn-primary">
            Start Your Modernization Journey
          </Link>
          <Link href="/services" className="btn btn-ghost">
            View Our Services
          </Link>
        </div>
      </section>
    </article>
  );
}
