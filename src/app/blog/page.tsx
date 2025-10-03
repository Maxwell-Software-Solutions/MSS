import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Insights — Maxwell Software Solutions',
  description: 'Short, high-signal posts on testing, refactoring, and reliability.',
};

export default function BlogIndexPage(): ReactElement {
  return (
    <div className="max-w-4xl mx-auto px-6 sm:px-10 py-12">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8">Insights</h1>
      <p className="text-lg text-foreground/80 mb-12">
        Short, high-signal posts on testing, refactoring, and reliability.
      </p>

      <div className="space-y-12">
        {/* SOLID Principles Post */}
        <article className="group">
          <Link href="/blog/solid-principles" className="block">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="relative h-48 lg:h-64 rounded-xl overflow-hidden">
                <Image
                  src="/images/blog/solid-principles-hero.svg"
                  alt="SOLID Principles illustration"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div>
                <div className="flex items-center gap-2 text-sm text-foreground/60 mb-3">
                  <time dateTime="2024-12-19">December 19, 2024</time>
                  <span>•</span>
                  <span>8 min read</span>
                  <span>•</span>
                  <span className="bg-accent/20 text-accent px-2 py-1 rounded-full text-xs">Software Architecture</span>
                </div>
                <h2 className="text-2xl font-bold mb-3 group-hover:text-accent transition-colors">
                  SOLID Principles: The Foundation of Clean Code
                </h2>
                <p className="text-foreground/70 mb-4 leading-relaxed">
                  Master the five SOLID principles that form the foundation of clean, maintainable, and scalable
                  software architecture. Learn how these principles guide better design decisions.
                </p>
                <div className="flex items-center gap-2 text-accent font-medium group-hover:gap-3 transition-all">
                  Read more
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </article>

        {/* Test-Driven Development Post */}
        <article className="group">
          <Link href="/blog/test-driven-development" className="block">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="relative h-48 lg:h-64 rounded-xl overflow-hidden order-2 lg:order-1">
                <Image
                  src="/images/blog/tdd-business-value.svg"
                  alt="Test-Driven Development showing business metrics and code quality"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="order-1 lg:order-2">
                <div className="flex items-center gap-2 text-sm text-foreground/60 mb-3">
                  <time dateTime="2024-12-19">December 19, 2024</time>
                  <span>•</span>
                  <span>10 min read</span>
                  <span>•</span>
                  <span className="bg-accent/20 text-accent px-2 py-1 rounded-full text-xs">Business Value</span>
                </div>
                <h2 className="text-2xl font-bold mb-3 group-hover:text-accent transition-colors">
                  Test-Driven Development: Building Business Confidence Through Code Quality
                </h2>
                <p className="text-foreground/70 mb-4 leading-relaxed">
                  Discover how TDD reduces costs, improves reliability, and delivers measurable business value. Learn
                  why leading companies invest in test-driven development and see the ROI calculations.
                </p>
                <div className="flex items-center gap-2 text-accent font-medium group-hover:gap-3 transition-all">
                  Read more
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </article>

        {/* Refactoring Legacy Code Post */}
        <article className="group">
          <Link href="/blog/refactoring-legacy-code" className="block">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="relative h-48 lg:h-64 rounded-xl overflow-hidden">
                <Image
                  src="/images/blog/refactoring-legacy-code.svg"
                  alt="Legacy code refactoring showing transformation from old to new architecture"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div>
                <div className="flex items-center gap-2 text-sm text-foreground/60 mb-3">
                  <time dateTime="2024-12-19">December 19, 2024</time>
                  <span>•</span>
                  <span>12 min read</span>
                  <span>•</span>
                  <span className="bg-accent/20 text-accent px-2 py-1 rounded-full text-xs">
                    Software Modernization
                  </span>
                </div>
                <h2 className="text-2xl font-bold mb-3 group-hover:text-accent transition-colors">
                  Refactoring Legacy Code: Complete Guide to Modernizing Your Software Architecture
                </h2>
                <p className="text-foreground/70 mb-4 leading-relaxed">
                  Learn proven strategies for refactoring legacy code, reducing technical debt, and improving software
                  maintainability. Expert tips for modernizing old codebases with real-world case studies.
                </p>
                <div className="flex items-center gap-2 text-accent font-medium group-hover:gap-3 transition-all">
                  Read more
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </article>
      </div>
    </div>
  );
}
