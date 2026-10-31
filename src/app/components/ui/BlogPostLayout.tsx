import type { ReactElement, ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface BlogPostLayoutProps {
  title: string;
  date: string;
  readTime: string;
  category: string;
  heroImage: string;
  heroAlt: string;
  children: ReactNode;
}

/** Article page: back link, title, meta line, art, then the reading column. */
export function BlogPostLayout({
  title,
  date,
  readTime,
  category,
  heroImage,
  heroAlt,
  children,
}: BlogPostLayoutProps): ReactElement {
  return (
    <article className="article">
      <header className="article-head">
        <nav>
          <Link href="/blog" className="article-back">
            ← Back to Insights
          </Link>
        </nav>
        <h1>{title}</h1>
        <div className="article-meta">
          <time dateTime={date}>
            {new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </time>
          <span>•</span>
          <span>{readTime}</span>
          <span>•</span>
          <span>{category}</span>
        </div>
      </header>

      <div className="art article-art">
        <Image src={heroImage} alt={heroAlt} fill className="object-cover" priority />
      </div>

      <div className="prose-flow">{children}</div>
    </article>
  );
}

export default BlogPostLayout;
