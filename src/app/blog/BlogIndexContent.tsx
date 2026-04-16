'use client';

import type { ReactElement } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { Badge } from '@/app/components/ui';

interface BlogPost {
  href: string;
  imageSrc: string;
  imageAlt: string;
  dateTime: string;
  dateKey: string;
  durationKey: string;
  categoryKey: string;
  titleKey: string;
  excerptKey: string;
}

const posts: BlogPost[] = [
  {
    href: '/blog/code-health-audit-business-impact',
    imageSrc: '/images/blog/api-design-hero.svg',
    imageAlt: 'Codebase architecture diagram showing interconnected modules',
    dateTime: '2026-03-28',
    dateKey: 'blog.codeHealth.date',
    durationKey: 'blog.codeHealth.duration',
    categoryKey: 'blog.codeHealth.category',
    titleKey: 'blog.codeHealth.title',
    excerptKey: 'blog.codeHealth.excerpt',
  },
  {
    href: '/blog/what-to-expect-2-week-sprint',
    imageSrc: '/images/blog/tdd-hero.svg',
    imageAlt: 'Sprint planning board showing a focused 2-week delivery cycle',
    dateTime: '2026-03-28',
    dateKey: 'blog.sprint.date',
    durationKey: 'blog.sprint.duration',
    categoryKey: 'blog.sprint.category',
    titleKey: 'blog.sprint.title',
    excerptKey: 'blog.sprint.excerpt',
  },
  {
    href: '/blog/solid-principles',
    imageSrc: '/images/blog/solid-principles-hero.svg',
    imageAlt: 'SOLID Principles illustration',
    dateTime: '2024-12-19',
    dateKey: 'blog.solid.date',
    durationKey: 'blog.solid.duration',
    categoryKey: 'blog.solid.category',
    titleKey: 'blog.solid.title',
    excerptKey: 'blog.solid.excerpt',
  },
  {
    href: '/blog/test-driven-development',
    imageSrc: '/images/blog/tdd-hero.svg',
    imageAlt: 'Test-Driven Development cycle diagram',
    dateTime: '2024-12-19',
    dateKey: 'blog.tdd.date',
    durationKey: 'blog.tdd.duration',
    categoryKey: 'blog.tdd.category',
    titleKey: 'blog.tdd.title',
    excerptKey: 'blog.tdd.excerpt',
  },
  {
    href: '/blog/refactoring-legacy-code',
    imageSrc: '/images/blog/refactoring-hero.svg',
    imageAlt: 'Code refactoring process visualization',
    dateTime: '2024-12-19',
    dateKey: 'blog.refactoring.date',
    durationKey: 'blog.refactoring.duration',
    categoryKey: 'blog.refactoring.category',
    titleKey: 'blog.refactoring.title',
    excerptKey: 'blog.refactoring.excerpt',
  },
  {
    href: '/blog/api-design-best-practices',
    imageSrc: '/images/blog/api-design-hero.svg',
    imageAlt: 'API Design illustration showing RESTful endpoints and HTTP methods',
    dateTime: '2024-12-20',
    dateKey: 'blog.api.date',
    durationKey: 'blog.api.duration',
    categoryKey: 'blog.api.category',
    titleKey: 'blog.api.title',
    excerptKey: 'blog.api.excerpt',
  },
  {
    href: '/blog/microservices-architecture',
    imageSrc: '/images/blog/microservices-hero.svg',
    imageAlt: 'Microservices architecture diagram showing independent services communicating',
    dateTime: '2024-12-21',
    dateKey: 'blog.microservices.date',
    durationKey: 'blog.microservices.duration',
    categoryKey: 'blog.microservices.category',
    titleKey: 'blog.microservices.title',
    excerptKey: 'blog.microservices.excerpt',
  },
  {
    href: '/blog/ci-cd-pipelines',
    imageSrc: '/images/blog/cicd-hero.svg',
    imageAlt: 'CI/CD pipeline diagram showing automated build, test, and deployment stages',
    dateTime: '2024-12-22',
    dateKey: 'blog.cicd.date',
    durationKey: 'blog.cicd.duration',
    categoryKey: 'blog.cicd.category',
    titleKey: 'blog.cicd.title',
    excerptKey: 'blog.cicd.excerpt',
  },
];

export default function BlogIndexContent(): ReactElement {
  const { t } = useLanguage();

  return (
    <div className="max-w-6xl mx-auto px-6 sm:px-10 py-16 sm:py-20">
      {/* Hero header */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <div className="eyebrow mb-4">Engineering Insights</div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight max-w-3xl">
          {t('blog.title').split(' ').slice(0, -1).join(' ')}{' '}
          <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
            {t('blog.title').split(' ').at(-1)}
          </span>
        </h1>
        <p className="mt-6 text-lg text-foreground/70 max-w-2xl">{t('blog.subtitle')}</p>
      </motion.header>

      <div className="space-y-8">
        {posts.map((post, i) => (
          <motion.article
            key={post.href}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="group"
          >
            <Link href={post.href} className="block">
              <div className="neuro-card rounded-2xl border border-violet-500/15 bg-white/[0.03] backdrop-blur overflow-hidden hover:-translate-y-1 transition-all duration-300">
                <div className="flex flex-col lg:flex-row gap-0">
                  <div className="relative h-56 lg:h-auto lg:w-72 lg:flex-shrink-0 overflow-hidden bg-foreground/5">
                    <Image
                      src={post.imageSrc}
                      alt={post.imageAlt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 sm:p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-2 text-sm text-foreground/60 mb-3">
                      <time dateTime={post.dateTime}>{t(post.dateKey)}</time>
                      <span>•</span>
                      <span>
                        {t(post.durationKey)} {t('blog.minRead')}
                      </span>
                      <span>•</span>
                      <Badge>{t(post.categoryKey)}</Badge>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold mb-3 group-hover:text-violet-400 transition-colors">
                      {t(post.titleKey)}
                    </h2>
                    <p className="text-foreground/70 mb-4 leading-relaxed text-[15px]">{t(post.excerptKey)}</p>
                    <div className="flex items-center gap-2 text-violet-400 font-medium group-hover:gap-3 transition-all">
                      {t('blog.readMore')}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
