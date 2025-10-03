import Image from 'next/image';
import type { ReactElement } from 'react';
import type { ServiceItem } from './services-data';

export default function ServiceCard({ s }: { s: ServiceItem }): ReactElement {
  const base = 'card shadow-soft p-5 group hover:shadow-lg transition-shadow';
  const featured = s.featured
    ? ' bg-gradient-to-br from-accent/10 to-transparent border border-accent/30 relative overflow-hidden'
    : '';
  return (
    <section className={base + featured} data-service={s.key}>
      {s.featured && (
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.25),transparent_60%)]"
          aria-hidden="true"
        />
      )}
      <div className="flex items-center gap-3 relative">
        <Image src={s.icon} alt={s.alt} width={32} height={32} />
        <h2 className="text-lg font-semibold tracking-tight">{s.title}</h2>
      </div>
      <p className="mt-2 text-sm text-foreground/75 leading-relaxed relative">{s.body}</p>
      <p className="mt-2 text-xs uppercase tracking-wide text-foreground/50 relative">{s.tagline}</p>
    </section>
  );
}
