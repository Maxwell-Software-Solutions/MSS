import Image from 'next/image';
import type { ReactElement } from 'react';
import type { ServiceItem } from './services-data';

export default function ServiceCard({ s }: { s: ServiceItem }): ReactElement {
  const base = 'card p-5 group';
  const featured = s.featured ? ' border-accent/40 relative overflow-hidden' : '';
  return (
    <section className={base + featured} data-service={s.key}>
      <div className="flex items-center gap-3 relative">
        <Image src={s.icon} alt={s.alt} width={32} height={32} />
        <h2 className="text-lg tracking-tight">{s.title}</h2>
      </div>
      <p className="mt-2 text-sm text-foreground/75 leading-relaxed relative">{s.body}</p>
      <p className="mt-2 text-xs text-foreground/70 relative">{s.tagline}</p>
    </section>
  );
}
