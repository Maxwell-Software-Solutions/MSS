'use client';
import type { ReactElement } from 'react';
import type { FounderInfo } from './founders-data';
import Image from 'next/image';
import { useLanguage } from '@/lib/LanguageContext';

export function FounderCard({ f }: { f: FounderInfo }): ReactElement {
  const { t } = useLanguage();
  // Map founder name to image file
  const firstName = f.name.split(' ')[0]?.toLowerCase() || 'founder';
  // Use JPG for Maxwell (professional photo), SVG for others (illustrations)
  const imageExtension = firstName === 'maxwell' ? 'jpg' : 'svg';
  const imageSrc = `/images/founders/${firstName}.${imageExtension}`;
  const founderKey = firstName; // maxwell, petras, marek
  
  return (
    <figure className="relative rounded-2xl border border-foreground/10 bg-gradient-to-br p-6 sm:p-8 shadow-soft overflow-hidden group min-h-[20rem] sm:min-h-[22rem] flex flex-col">
      <div
        className={`absolute inset-0 pointer-events-none rounded-2xl bg-gradient-to-br ${f.gradient} opacity-10 group-hover:opacity-20 transition-opacity`}
        aria-hidden="true"
      />
      <div className="relative flex flex-col gap-4 sm:gap-5 grow">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5">
          <div className={`${firstName === 'maxwell' ? 'w-28 h-32 sm:w-32 sm:h-36' : 'w-24 h-24 sm:w-28 sm:h-28'} rounded-xl shadow-xl ring-2 ring-white/40 bg-foreground/5 overflow-hidden flex-shrink-0`}>
            <Image
              src={imageSrc}
              alt={f.alt}
              width={firstName === 'maxwell' ? 128 : 112}
              height={firstName === 'maxwell' ? 144 : 112}
              className={`${firstName === 'maxwell' ? 'w-full h-auto object-cover object-top' : 'w-full h-full object-cover'}`}
            />
          </div>
          <figcaption className="flex flex-col text-center sm:text-left">
            <h3 className="font-semibold text-lg leading-tight tracking-tight">{t(`about.founder.${founderKey}.name`)}</h3>
            <div className="text-xs uppercase tracking-wide text-foreground/60 mt-1">{t(`about.founder.${founderKey}.role`)}</div>
          </figcaption>
        </div>
        <p className="text-sm text-foreground/75 leading-relaxed mt-1 max-w-prose text-center sm:text-left">{t(`about.founder.${founderKey}.bio`)}</p>
        <div className="mt-auto pt-4">
          <span className="inline-flex items-center justify-center sm:justify-start gap-1 text-[11px] font-medium uppercase tracking-wider text-foreground/50">
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            Focus • Craft • Impact
          </span>
        </div>
      </div>
    </figure>
  );
}

export default FounderCard;
