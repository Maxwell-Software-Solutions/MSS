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
        'card relative flex h-full flex-col p-6 md:p-7',
        accent ? 'border-accent/40' : '',
      ].join(' ')}
    >
      <h3 className="text-lg font-semibold leading-snug tracking-tight">{title}</h3>
      <p className="mt-3 max-w-prose text-[0.9375rem] leading-relaxed text-secondary">{summary}</p>
      {meta && <p className="mt-auto pt-5 text-sm font-medium text-accent">{meta}</p>}
      {imageSrc && (
        <div className="mt-3">
          <Image src={imageSrc} alt={imageAlt || title} width={32} height={32} />
        </div>
      )}
    </article>
  );
}

export default ServiceCard;
