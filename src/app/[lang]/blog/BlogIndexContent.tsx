'use client';

import type { ReactElement } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/LanguageContext';
import { LineIcon } from '@/app/components/ui';

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
    imageSrc: '/images/blog/card-code-health.svg',
    imageAlt: 'Abstract heartbeat pulse over circuit board pattern representing code health',
    dateTime: '2026-03-28',
    dateKey: 'blog.codeHealth.date',
    durationKey: 'blog.codeHealth.duration',
    categoryKey: 'blog.codeHealth.category',
    titleKey: 'blog.codeHealth.title',
    excerptKey: 'blog.codeHealth.excerpt',
  },
  {
    href: '/blog/what-to-expect-2-week-sprint',
    imageSrc: '/images/blog/card-sprint.svg',
    imageAlt: 'Abstract kanban board with growing velocity bars representing a sprint',
    dateTime: '2026-03-28',
    dateKey: 'blog.sprint.date',
    durationKey: 'blog.sprint.duration',
    categoryKey: 'blog.sprint.category',
    titleKey: 'blog.sprint.title',
    excerptKey: 'blog.sprint.excerpt',
  },
  {
    href: '/blog/solid-principles',
    imageSrc: '/images/blog/card-solid.svg',
    imageAlt: 'Abstract coloured vertical blocks representing the five SOLID principles',
    dateTime: '2024-12-19',
    dateKey: 'blog.solid.date',
    durationKey: 'blog.solid.duration',
    categoryKey: 'blog.solid.category',
    titleKey: 'blog.solid.title',
    excerptKey: 'blog.solid.excerpt',
  },
  {
    href: '/blog/test-driven-development',
    imageSrc: '/images/blog/card-tdd.svg',
    imageAlt: 'Abstract red green and blue circles representing the TDD cycle',
    dateTime: '2024-12-19',
    dateKey: 'blog.tdd.date',
    durationKey: 'blog.tdd.duration',
    categoryKey: 'blog.tdd.category',
    titleKey: 'blog.tdd.title',
    excerptKey: 'blog.tdd.excerpt',
  },
  {
    href: '/blog/refactoring-legacy-code',
    imageSrc: '/images/blog/card-refactoring.svg',
    imageAlt: 'Abstract before and after code blocks showing transformation',
    dateTime: '2024-12-19',
    dateKey: 'blog.refactoring.date',
    durationKey: 'blog.refactoring.duration',
    categoryKey: 'blog.refactoring.category',
    titleKey: 'blog.refactoring.title',
    excerptKey: 'blog.refactoring.excerpt',
  },
  {
    href: '/blog/api-design-best-practices',
    imageSrc: '/images/blog/card-api-design.svg',
    imageAlt: 'Abstract network of connected endpoint nodes representing API design',
    dateTime: '2024-12-20',
    dateKey: 'blog.api.date',
    durationKey: 'blog.api.duration',
    categoryKey: 'blog.api.category',
    titleKey: 'blog.api.title',
    excerptKey: 'blog.api.excerpt',
  },
  {
    href: '/blog/microservices-architecture',
    imageSrc: '/images/blog/card-microservices.svg',
    imageAlt: 'Abstract hexagonal honeycomb grid representing microservices',
    dateTime: '2024-12-21',
    dateKey: 'blog.microservices.date',
    durationKey: 'blog.microservices.duration',
    categoryKey: 'blog.microservices.category',
    titleKey: 'blog.microservices.title',
    excerptKey: 'blog.microservices.excerpt',
  },
  {
    href: '/blog/ci-cd-pipelines',
    imageSrc: '/images/blog/card-cicd.svg',
    imageAlt: 'Abstract pipeline flow with coloured stage nodes representing CI/CD',
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
    <>
      <header className="wrap page-head">
        <div className="eyebrow">Engineering Insights</div>
        <h1>{t('blog.title')}</h1>
        <p className="lead">{t('blog.subtitle')}</p>
      </header>

      <div className="section">
        <div className="wrap post-list">
          {posts.map((post) => (
            <article key={post.href}>
              <Link href={post.href} className="post">
                <div className="post-text">
                  <div className="work-meta">
                    <time dateTime={post.dateTime}>{t(post.dateKey)}</time>
                    <span>•</span>
                    <span>
                      {t(post.durationKey)} {t('blog.minRead')}
                    </span>
                    <span>•</span>
                    <span>{t(post.categoryKey)}</span>
                  </div>
                  <h2>{t(post.titleKey)}</h2>
                  <p>{t(post.excerptKey)}</p>
                  <div className="more">
                    {t('blog.readMore')}
                    <LineIcon name="arrow" />
                  </div>
                </div>
                <div className="art">
                  <Image src={post.imageSrc} alt={post.imageAlt} fill className="object-cover" />
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
