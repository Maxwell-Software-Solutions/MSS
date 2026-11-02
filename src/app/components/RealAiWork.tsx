'use client';

import type { ReactElement } from 'react';
import Rail from './Rail';
import SageLogo from './SageLogo';
import { LineIcon } from './ui';
import type { LineIconName } from './ui';
import { useLanguage } from '@/lib/LanguageContext';
// The rail rules for phones live in home.css, and this section also appears on the case studies page.
// A relative path: Jest maps the "@/" alias before its stylesheet stub, so only relative CSS imports are stubbed.
import '../home.css';

type WorkKey = 'irwin' | 'cattery' | 'orchestrator' | 'neonova';

interface Work {
  key: WorkKey;
  icon?: LineIconName;
  /** Shown as a quiet line under the card, for work that is not a company engagement */
  note?: boolean;
  link?: { href: string; label: string };
  /** The smaller card: a single row on desktop, a narrower card in the rail on phones */
  small?: boolean;
}

// Only work we can stand behind. Irwin Mitchell is named in text only, never with a logo.
const WORK: Work[] = [
  { key: 'irwin', icon: 'document', note: true },
  { key: 'cattery', icon: 'loop', link: { href: 'https://miausairovi.com', label: 'miausairovi.com' } },
  { key: 'orchestrator', icon: 'route' },
  { key: 'neonova', small: true, link: { href: 'https://neonova.company', label: 'neonova.company' } },
];

interface RealAiWorkProps {
  /** `home` brings its own heading; `page` sits under the page's h1, so its card titles are h2 */
  variant?: 'home' | 'page';
}

/** Real AI work, named plainly, followed by the founder's past experience at Sage (labelled, never a client). */
export default function RealAiWork({ variant = 'home' }: RealAiWorkProps): ReactElement {
  const { t } = useLanguage();
  const onHome = variant === 'home';
  const Title = onHome ? 'h3' : 'h2';

  return (
    <section
      id="real-work"
      className="section"
      {...(onHome ? { 'aria-labelledby': 'real-work-heading' } : { 'aria-label': t('realWork.heading') })}
    >
      <div className="wrap">
        {onHome && (
          <div className="section-head section-head-split">
            <div className="eyebrow">{t('realWork.eyebrow')}</div>
            <h2 id="real-work-heading">{t('realWork.heading')}</h2>
            <p className="lead">
              <span className="copy-long">{t('realWork.lead')}</span>
              <span className="copy-short">{t('realWork.lead.short')}</span>
            </p>
          </div>
        )}

        <Rail
          className="columns columns-3 proofs"
          role="group"
          aria-label={t('realWork.heading')}
          label={t('realWork.heading')}
        >
          {WORK.map((work) => {
            const prefix = `realWork.${work.key}`;
            const titleId = `real-work-${work.key}`;
            return (
              <article
                key={work.key}
                className={`proof${work.small ? ' proof-small' : ''}`}
                aria-labelledby={titleId}
              >
                {work.icon && <LineIcon name={work.icon} className="proof-icon" />}
                <div className="proof-head">
                  <Title id={titleId}>{t(`${prefix}.title`)}</Title>
                  <p className="proof-meta">{t(`${prefix}.meta`)}</p>
                </div>
                <p className="proof-body">{t(`${prefix}.body`)}</p>
                {work.note && <p className="proof-note">{t(`${prefix}.note`)}</p>}
                {work.link && (
                  <a className="more" href={work.link.href} target="_blank" rel="noopener noreferrer">
                    {work.link.label}
                    <span className="sr-only"> {t('realWork.newTab')}</span>
                    <LineIcon name="external" />
                  </a>
                )}
              </article>
            );
          })}
        </Rail>

        <div className="founder-note" role="group" aria-labelledby="founder-note-label">
          <p className="eyebrow" id="founder-note-label">
            {t('realWork.founder.label')}
          </p>
          <SageLogo className="founder-logo" />
          <div>
            <p className="founder-lead">{t('realWork.founder.lead')}</p>
            <p className="founder-about">{t('realWork.founder.about')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
