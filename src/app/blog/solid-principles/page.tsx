import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ArticleStructuredData from '@/app/components/ArticleStructuredData';
import StructuredData from '@/app/components/StructuredData';
import { generateBreadcrumbSchema } from '@/lib/seo/structured-data';
import { ButtonLink } from '@/app/components/ui';

export const metadata: Metadata = {
  title: 'SOLID Principles: The Foundation of Clean Code — Maxwell Software Solutions',
  description:
    'Master the five SOLID principles that form the foundation of clean, maintainable, and scalable software architecture.',
  alternates: {
    canonical: '/blog/solid-principles',
  },
};

export default function SOLIDPrinciplesPost(): ReactElement {
  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: 'SOLID Principles', url: '/blog/solid-principles' },
  ]);
  return (
    <>
      <StructuredData schema={breadcrumb} />
      <ArticleStructuredData
        title="SOLID Principles: The Foundation of Clean Code"
        description="Master the five SOLID principles that form the foundation of clean, maintainable, and scalable software architecture."
        datePublished="2024-12-19"
        imageUrl="https://www.maxwellsoftwaresolutions.com/images/blog/solid-principles-hero.svg"
      />
      <article className="article prose-flow">
        {/* Header */}
        <header className="article-head">
          <nav>
            <Link href="/blog" className="article-back">
              ← Back to Insights
            </Link>
          </nav>
          <h1>SOLID Principles: The Foundation of Clean Code</h1>
          <div className="article-meta">
            <time dateTime="2024-12-19">December 19, 2024</time>
            <span>•</span>
            <span>8 min read</span>
            <span>•</span>
            <span>Software Architecture</span>
          </div>
        </header>

        {/* Hero Image */}
        <div className="art article-art">
          <Image
            src="/images/blog/solid-principles-hero.svg"
            alt="SOLID Principles illustration showing five interconnected building blocks"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Introduction */}
        <section>
          <p className="lead mb-4">
            In the world of software development, writing code that works is just the beginning. The real challenge lies
            in creating code that&apos;s maintainable, scalable, and easy to understand. This is where SOLID principles
            come into play.
          </p>
          <p>
            SOLID is an acronym for five design principles that help developers create software that&apos;s easier to
            maintain, extend, and refactor. These principles were introduced by Robert C. Martin and have become
            fundamental to modern software architecture.
          </p>
        </section>

        {/* SOLID Overview */}
        <section>
          <h2 className="mb-6">The Five SOLID Principles</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 flex-shrink-0">
                  <span className="text-xl font-medium text-accent">S</span>
                </div>
                <div>
                  <h3 className="mb-2">Single Responsibility Principle</h3>
                  <p>A class should have only one reason to change.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 flex-shrink-0">
                  <span className="text-xl font-medium text-accent">O</span>
                </div>
                <div>
                  <h3 className="mb-2">Open/Closed Principle</h3>
                  <p>
                    Software entities should be open for extension but closed for modification.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 flex-shrink-0">
                  <span className="text-xl font-medium text-accent">L</span>
                </div>
                <div>
                  <h3 className="mb-2">Liskov Substitution Principle</h3>
                  <p>Derived classes must be substitutable for their base classes.</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 flex-shrink-0">
                  <span className="text-xl font-medium text-accent">I</span>
                </div>
                <div>
                  <h3 className="mb-2">Interface Segregation Principle</h3>
                  <p>
                    Clients should not be forced to depend on interfaces they don&apos;t use.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 flex-shrink-0">
                  <span className="text-xl font-medium text-accent">D</span>
                </div>
                <div>
                  <h3 className="mb-2">Dependency Inversion Principle</h3>
                  <p>
                    High-level modules should not depend on low-level modules. Both should depend on abstractions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Explanations */}
        <section className="space-y-16">
          {/* Single Responsibility Principle */}
          <div>
            <h2 className="mb-6">1. Single Responsibility Principle (SRP)</h2>
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <p className="mb-4">
                  The Single Responsibility Principle states that a class should have only one reason to change. In
                  other words, a class should have only one responsibility or job.
                </p>
                <div className="note mb-4">
                  <h3 className="mb-2">❌ Bad Example:</h3>
                  <p className="text-sm">
                    A class that handles user authentication, sends emails, and manages database connections.
                  </p>
                </div>
                <div className="note">
                  <h3 className="mb-2">✅ Good Example:</h3>
                  <p className="text-sm">
                    Separate classes for UserAuthentication, EmailService, and DatabaseConnection.
                  </p>
                </div>
              </div>
              <div className="art relative h-64">
                <Image
                  src="/images/blog/srp-illustration.svg"
                  alt="Single Responsibility Principle showing one class with one responsibility"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Open/Closed Principle */}
          <div>
            <h2 className="mb-6">2. Open/Closed Principle (OCP)</h2>
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="art relative h-64 order-2 lg:order-1">
                <Image
                  src="/images/blog/ocp-illustration.svg"
                  alt="Open/Closed Principle showing extension without modification"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="order-1 lg:order-2">
                <p className="mb-4">
                  Software entities (classes, modules, functions) should be open for extension but closed for
                  modification. This means you should be able to add new functionality without changing existing code.
                </p>
                <div className="note mb-4">
                  <h3 className="mb-2">❌ Bad Example:</h3>
                  <p className="text-sm">Modifying existing classes to add new payment methods.</p>
                </div>
                <div className="note">
                  <h3 className="mb-2">✅ Good Example:</h3>
                  <p className="text-sm">
                    Creating new payment method classes that implement a common interface.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Liskov Substitution Principle */}
          <div>
            <h2 className="mb-6">3. Liskov Substitution Principle (LSP)</h2>
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <p className="mb-4">
                  Derived classes must be substitutable for their base classes without affecting the correctness of the
                  program. This ensures that inheritance is used correctly.
                </p>
                <div className="note mb-4">
                  <h3 className="mb-2">❌ Bad Example:</h3>
                  <p className="text-sm">
                    A Square class that inherits from Rectangle but changes the behavior of width/height setters.
                  </p>
                </div>
                <div className="note">
                  <h3 className="mb-2">✅ Good Example:</h3>
                  <p className="text-sm">
                    Ensuring that derived classes maintain the contract of their base classes.
                  </p>
                </div>
              </div>
              <div className="art relative h-64">
                <Image
                  src="/images/blog/lsp-illustration.svg"
                  alt="Liskov Substitution Principle showing proper inheritance hierarchy"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Interface Segregation Principle */}
          <div>
            <h2 className="mb-6">4. Interface Segregation Principle (ISP)</h2>
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="art relative h-64 order-2 lg:order-1">
                <Image
                  src="/images/blog/isp-illustration.svg"
                  alt="Interface Segregation Principle showing focused interfaces"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="order-1 lg:order-2">
                <p className="mb-4">
                  Clients should not be forced to depend on interfaces they don&apos;t use. It&apos;s better to have
                  many specific interfaces than one general-purpose interface.
                </p>
                <div className="note mb-4">
                  <h3 className="mb-2">❌ Bad Example:</h3>
                  <p className="text-sm">
                    A large interface with methods for printing, scanning, and faxing that not all clients need.
                  </p>
                </div>
                <div className="note">
                  <h3 className="mb-2">✅ Good Example:</h3>
                  <p className="text-sm">
                    Separate interfaces: IPrinter, IScanner, IFax, allowing clients to implement only what they need.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Dependency Inversion Principle */}
          <div>
            <h2 className="mb-6">5. Dependency Inversion Principle (DIP)</h2>
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <p className="mb-4">
                  High-level modules should not depend on low-level modules. Both should depend on abstractions.
                  Abstractions should not depend on details. Details should depend on abstractions.
                </p>
                <div className="note mb-4">
                  <h3 className="mb-2">❌ Bad Example:</h3>
                  <p className="text-sm">
                    A business logic class directly instantiating a specific database implementation.
                  </p>
                </div>
                <div className="note">
                  <h3 className="mb-2">✅ Good Example:</h3>
                  <p className="text-sm">
                    Business logic depending on a database interface, with implementations injected via dependency
                    injection.
                  </p>
                </div>
              </div>
              <div className="art relative h-64">
                <Image
                  src="/images/blog/dip-illustration.svg"
                  alt="Dependency Inversion Principle showing abstraction layers"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="note my-8">
          <h2 className="mb-6">Benefits of Following SOLID Principles</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-accent-fill rounded-full mt-3 flex-shrink-0"></div>
              <div>
                <h3 className="mb-2">Maintainability</h3>
                <p className="text-sm">Code is easier to understand, modify, and extend.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-accent-fill rounded-full mt-3 flex-shrink-0"></div>
              <div>
                <h3 className="mb-2">Testability</h3>
                <p className="text-sm">Smaller, focused classes are easier to unit test.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-accent-fill rounded-full mt-3 flex-shrink-0"></div>
              <div>
                <h3 className="mb-2">Reusability</h3>
                <p className="text-sm">
                  Components can be reused across different parts of the application.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-accent-fill rounded-full mt-3 flex-shrink-0"></div>
              <div>
                <h3 className="mb-2">Flexibility</h3>
                <p className="text-sm">
                  Easy to add new features without breaking existing functionality.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Conclusion */}
        <section>
          <h2 className="mb-6">Conclusion</h2>
          <p className="mb-4">
            SOLID principles are not just theoretical concepts—they&apos;re practical guidelines that help developers
            write better code. While it may take time to master these principles, the investment pays off in the long
            run with more maintainable, scalable, and robust software.
          </p>
          <p>
            Remember, these principles are meant to guide your design decisions, not to be followed rigidly. The goal is
            to create code that&apos;s easy to understand, modify, and extend—code that your future self and your
            teammates will thank you for.
          </p>
        </section>

        {/* Call to Action */}
        <section className="callout block-gap">
          <h2 className="mb-4">Ready to Improve Your Code Quality?</h2>
          <p className="mb-6">
            At Maxwell Software Solutions, we specialize in helping teams write cleaner, more maintainable code. Our{' '}
            <Link href="/services" className="text-accent underline hover:no-underline font-medium">
              Code Quality Audit service
            </Link>{' '}
            identifies SOLID violations, technical debt, and architectural issues — with actionable recommendations your
            team can implement immediately.
          </p>
          <div className="band-actions">
            <ButtonLink href="/contact" variant="accent" size="lg">
              Request a Code Audit
            </ButtonLink>
            <ButtonLink href="/services" variant="ghost" size="lg">
              View Our Services
            </ButtonLink>
          </div>
        </section>
      </article>
    </>
  );
}
