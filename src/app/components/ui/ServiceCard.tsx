import type { ReactElement } from 'react';
import Image from 'next/image';

export interface ServiceCardProps {
  title: string;
  summary: string;
  imageSrc?: string; // optional supplemental image
  imageAlt?: string;
  meta?: string;
  tone?: 'default' | 'accent';
}

export function ServiceCard({
  title,
  summary,
  imageSrc,
  imageAlt,
  meta,
  tone = 'default',
}: ServiceCardProps): ReactElement {
  const accent = tone === 'accent';
  return (
    <article
      className={[
        'group rounded-2xl card',
        'p-6 md:p-7 shadow-soft transition h-full',
        'motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-lg motion-safe:focus-within:-translate-y-0.5 motion-safe:focus-within:shadow-lg',
        'motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:focus-within:translate-y-0',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 relative',
        accent ? 'bg-[--card]' : '',
      ].join(' ')}
    >
      <div className="flex flex-col">
        <h3 className="text-lg font-semibold tracking-tight leading-tight">{title}</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-[--muted] max-w-prose line-clamp-4">{summary}</p>
        {meta && <p className="mt-3 text-[12px] tracking-wide text-[--muted]">{meta}</p>}
        {imageSrc && (
          <div className="mt-3">
            <Image src={imageSrc} alt={imageAlt || title} width={32} height={32} />
          </div>
        )}
      </div>
    </article>
  );
}

export default ServiceCard;
