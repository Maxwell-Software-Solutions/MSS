'use client';

import type { ReactElement } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/LanguageContext';
import { Badge } from '@/app/components/ui';

export default function BlogIndexContent(): ReactElement {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-6 sm:px-10 py-12">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8">{t('blog.title')}</h1>
      <p className="text-lg text-foreground/80 mb-12">{t('blog.subtitle')}</p>

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
                <div className="flex items-center gap-2 text-sm text-foreground/75 mb-3">
                  <time dateTime="2024-12-19">{t('blog.solid.date')}</time>
                  <span>•</span>
                  <span>
                    {t('blog.solid.duration')} {t('blog.minRead')}
                  </span>
                  <span>•</span>
                  <Badge>{t('blog.solid.category')}</Badge>
                </div>
                <h2 className="text-2xl font-bold mb-3 group-hover:text-accent transition-colors">
                  {t('blog.solid.title')}
                </h2>
                <p className="text-foreground/70 mb-4 leading-relaxed">{t('blog.solid.excerpt')}</p>
                <div className="flex items-center gap-2 text-accent font-medium group-hover:gap-3 transition-all">
                  {t('blog.readMore')}
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
                <div className="flex items-center gap-2 text-sm text-foreground/75 mb-3">
                  <time dateTime="2024-12-19">{t('blog.tdd.date')}</time>
                  <span>•</span>
                  <span>
                    {t('blog.tdd.duration')} {t('blog.minRead')}
                  </span>
                  <span>•</span>
                  <Badge>{t('blog.tdd.category')}</Badge>
                </div>
                <h2 className="text-2xl font-bold mb-3 group-hover:text-accent transition-colors">
                  {t('blog.tdd.title')}
                </h2>
                <p className="text-foreground/70 mb-4 leading-relaxed">{t('blog.tdd.excerpt')}</p>
                <div className="flex items-center gap-2 text-accent font-medium group-hover:gap-3 transition-all">
                  {t('blog.readMore')}
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
                <div className="flex items-center gap-2 text-sm text-foreground/75 mb-3">
                  <time dateTime="2024-12-19">{t('blog.refactoring.date')}</time>
                  <span>•</span>
                  <span>
                    {t('blog.refactoring.duration')} {t('blog.minRead')}
                  </span>
                  <span>•</span>
                  <Badge>{t('blog.refactoring.category')}</Badge>
                </div>
                <h2 className="text-2xl font-bold mb-3 group-hover:text-accent transition-colors">
                  {t('blog.refactoring.title')}
                </h2>
                <p className="text-foreground/70 mb-4 leading-relaxed">{t('blog.refactoring.excerpt')}</p>
                <div className="flex items-center gap-2 text-accent font-medium group-hover:gap-3 transition-all">
                  {t('blog.readMore')}
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
