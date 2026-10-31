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

/** A service: a short rule above the title, a summary, and its promise. The featured one has the accent rule. */
export function ServiceCard({
  title,
  summary,
  imageSrc,
  imageAlt,
  meta,
  tone = 'default',
}: ServiceCardProps): ReactElement {
  return (
    <article className={tone === 'accent' ? 'service service-featured' : 'service'}>
      <h3>{title}</h3>
      <p>{summary}</p>
      {meta && <p className="service-meta">{meta}</p>}
      {imageSrc && (
        <div className="mt-3">
          <Image src={imageSrc} alt={imageAlt || title} width={32} height={32} />
        </div>
      )}
    </article>
  );
}

export default ServiceCard;
