'use client';

import type { ReactElement } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/LanguageContext';
import { Badge } from '@/app/components/ui';

export default function BlogIndexContent(): ReactElement {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-6 sm:px-10 py-16 sm:py-20">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8">{t('blog.title')}</h1>
      <p className="text-lg text-foreground/80 mb-12">{t('blog.subtitle')}</p>

      <div className="space-y-12">
        {/* SOLID Principles Post */}
        <article className="group">
          <Link href="/blog/solid-principles" className="block">
            <div className="flex flex-col gap-6">
              <div className="relative h-56 lg:h-64 rounded-xl overflow-hidden bg-foreground/5">
                <Image
                  src="/images/blog/solid-principles-hero.svg"
                  alt="SOLID Principles illustration"
                  fill
                  className="object-contain scale-95 group-hover:scale-100 transition-transform duration-300"
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
            <div className="flex flex-col gap-6">
              <div className="relative h-56 lg:h-64 rounded-xl overflow-hidden bg-foreground/5">
                <Image
                  src="/images/blog/tdd-hero.svg"
                  alt="Test-Driven Development cycle diagram"
                  fill
                  className="object-contain scale-95 group-hover:scale-100 transition-transform duration-300"
                />
              </div>
              <div>
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
            <div className="flex flex-col gap-6">
              <div className="relative h-56 lg:h-64 rounded-xl overflow-hidden bg-foreground/5">
                <Image
                  src="/images/blog/refactoring-hero.svg"
                  alt="Code refactoring process visualization"
                  fill
                  className="object-contain scale-95 group-hover:scale-100 transition-transform duration-300"
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

        {/* API Design Best Practices Post */}
        <article className="group">
          <Link href="/blog/api-design-best-practices" className="block">
            <div className="flex flex-col gap-6">
              <div className="relative h-56 lg:h-64 rounded-xl overflow-hidden bg-foreground/5">
                <Image
                  src="/images/blog/api-design-hero.svg"
                  alt="API Design illustration showing RESTful endpoints and HTTP methods"
                  fill
                  className="object-contain scale-95 group-hover:scale-100 transition-transform duration-300"
                />
              </div>
              <div>
                <div className="flex items-center gap-2 text-sm text-foreground/75 mb-3">
                  <time dateTime="2024-12-20">{t('blog.api.date')}</time>
                  <span>•</span>
                  <span>
                    {t('blog.api.duration')} {t('blog.minRead')}
                  </span>
                  <span>•</span>
                  <Badge>{t('blog.api.category')}</Badge>
                </div>
                <h2 className="text-2xl font-bold mb-3 group-hover:text-accent transition-colors">
                  {t('blog.api.title')}
                </h2>
                <p className="text-foreground/70 mb-4 leading-relaxed">{t('blog.api.excerpt')}</p>
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

        {/* Microservices Architecture Post */}
        <article className="group">
          <Link href="/blog/microservices-architecture" className="block">
            <div className="flex flex-col gap-6">
              <div className="relative h-56 lg:h-64 rounded-xl overflow-hidden bg-foreground/5">
                <Image
                  src="/images/blog/microservices-hero.svg"
                  alt="Microservices architecture diagram showing independent services communicating"
                  fill
                  className="object-contain scale-95 group-hover:scale-100 transition-transform duration-300"
                />
              </div>
              <div>
                <div className="flex items-center gap-2 text-sm text-foreground/75 mb-3">
                  <time dateTime="2024-12-21">{t('blog.microservices.date')}</time>
                  <span>•</span>
                  <span>
                    {t('blog.microservices.duration')} {t('blog.minRead')}
                  </span>
                  <span>•</span>
                  <Badge>{t('blog.microservices.category')}</Badge>
                </div>
                <h2 className="text-2xl font-bold mb-3 group-hover:text-accent transition-colors">
                  {t('blog.microservices.title')}
                </h2>
                <p className="text-foreground/70 mb-4 leading-relaxed">{t('blog.microservices.excerpt')}</p>
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

        {/* CI/CD Pipelines Post */}
        <article className="group">
          <Link href="/blog/ci-cd-pipelines" className="block">
            <div className="flex flex-col gap-6">
              <div className="relative h-56 lg:h-64 rounded-xl overflow-hidden bg-foreground/5">
                <Image
                  src="/images/blog/cicd-hero.svg"
                  alt="CI/CD pipeline diagram showing automated build, test, and deployment stages"
                  fill
                  className="object-contain scale-95 group-hover:scale-100 transition-transform duration-300"
                />
              </div>
              <div>
                <div className="flex items-center gap-2 text-sm text-foreground/75 mb-3">
                  <time dateTime="2024-12-22">{t('blog.cicd.date')}</time>
                  <span>•</span>
                  <span>
                    {t('blog.cicd.duration')} {t('blog.minRead')}
                  </span>
                  <span>•</span>
                  <Badge>{t('blog.cicd.category')}</Badge>
                </div>
                <h2 className="text-2xl font-bold mb-3 group-hover:text-accent transition-colors">
                  {t('blog.cicd.title')}
                </h2>
                <p className="text-foreground/70 mb-4 leading-relaxed">{t('blog.cicd.excerpt')}</p>
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
