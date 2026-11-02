'use client';

import type { ReactElement } from 'react';
import Link from 'next/link';
import HeroStage from './components/hero/HeroStage';
import DeferredSections from './components/DeferredSections';
import DarkShowcaseSection from './components/DarkShowcaseSection';
import RealAiWork from './components/RealAiWork';
import Rail from './components/Rail';
import { useReveal } from './components/useReveal';
import { useLanguage } from '@/lib/LanguageContext';
import { FeatureCard, ButtonLink, LineIcon } from './components/ui';
import type { LineIconName } from './components/ui';
import './home.css';

export default function HomeContent(): ReactElement {
  const { t } = useLanguage();
  useReveal();

  const aiServices: Array<{ icon: LineIconName; title: string; description: string }> = [
    { icon: 'search', title: t('capabilities.adoption.title'), description: t('capabilities.adoption.body') },
    { icon: 'bolt', title: t('capabilities.agents.title'), description: t('capabilities.agents.body') },
    { icon: 'chat', title: t('capabilities.products.title'), description: t('capabilities.products.body') },
    { icon: 'flask', title: t('capabilities.innovation.title'), description: t('capabilities.innovation.body') },
  ];

  return (
    <>
      <HeroStage />

      {/* What we build with AI */}
      <section className="section" aria-labelledby="capabilities-heading">
        <div className="wrap">
          <div className="section-head section-head-split">
            <div className="eyebrow">{t('capabilities.eyebrow')}</div>
            <h2 id="capabilities-heading">{t('capabilities.heading')}</h2>
            <p className="lead">
              <span className="copy-long">{t('capabilities.description')}</span>
              <span className="copy-short">{t('capabilities.description.short')}</span>
            </p>
          </div>

          {/* A group, not a region: the section already carries this name as a landmark */}
          <Rail className="columns columns-4" role="group" aria-label={t('capabilities.heading')} label={t('capabilities.heading')}>
            {aiServices.map((card) => (
              <FeatureCard
                key={card.title}
                icon={<LineIcon name={card.icon} className="item-icon" />}
                title={card.title}
                description={card.description}
              />
            ))}
          </Rail>
        </div>
      </section>

      {/* AI agents that do real work */}
      <DarkShowcaseSection />

      {/* How an AI project runs */}
      <section className="section" aria-labelledby="process-heading">
        <div className="wrap">
          <h2 id="process-heading" className="section-head">
            {t('process.heading')}
          </h2>

          <ol className="steps steps-4">
            {[
              { step: '01', titleKey: 'process.step1.title', bodyKey: 'process.step1.body' },
              { step: '02', titleKey: 'process.step2.title', bodyKey: 'process.step2.body' },
              { step: '03', titleKey: 'process.step3.title', bodyKey: 'process.step3.body' },
              { step: '04', titleKey: 'process.step4.title', bodyKey: 'process.step4.body' },
            ].map((s) => (
              <li key={s.step} className="step">
                <div className="step-index" aria-hidden="true">
                  <span>{s.step}</span>
                </div>
                <div>
                  <h3>{t(s.titleKey)}</h3>
                  <p>{t(s.bodyKey)}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Who we are */}
      <section id="about" className="section section-tone home-about">
        <div className="wrap split">
          <h2>{t('about.section.heading')}</h2>
          <div>
            <p className="lead">{t('about.section.description')}</p>
            <div className="page-actions">
              <ButtonLink href="/about" variant="accent">
                {t('about.section.cta')}
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* The engineering behind it: what makes AI hold up in production */}
      <section className="section">
        <div className="wrap">
          <h2 className="section-head">{t('value.label')}</h2>

          <Rail className="columns columns-4" role="group" aria-label={t('value.label')} label={t('value.label')}>
            {[
              { title: t('value.evals.title'), description: t('value.evals.body') },
              { title: t('value.foundations.title'), description: t('value.foundations.body') },
              { title: t('value.monitoring.title'), description: t('value.monitoring.body') },
              { title: t('value.rollout.title'), description: t('value.rollout.body') },
            ].map((card) => (
              <FeatureCard key={card.title} title={card.title} description={card.description} />
            ))}
          </Rail>
        </div>
      </section>

      {/* Real AI work, and the founder's past work at Sage */}
      <RealAiWork />

      {/* First invitation to talk */}
      <section id="contact" className="section section-tone">
        <div className="wrap">
          <div className="band-split">
            <h2>{t('contact.heading')}</h2>
            <p>
              <span className="copy-long">{t('contact.description')}</span>
              <span className="copy-short">{t('contact.description.short')}</span>
            </p>
            <div className="band-actions">
              <Link href="/contact" className="btn btn-accent btn-lg">
                {t('contact.cta.primary')}
              </Link>
              <ButtonLink href="/services" variant="ghost" size="lg" className="link-quiet">
                {t('contact.cta.secondary')}
              </ButtonLink>
            </div>
          </div>
          <div className="assurances block-gap">
            <p>{t('contact.linkedin.label')}</p>
            <a
              href="https://www.linkedin.com/company/maxwell-software-solutions"
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-11 font-medium text-foreground transition-colors hover:text-accent lg:min-h-0"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              {t('contact.linkedin.company')}
            </a>
          </div>
        </div>
      </section>

      <DeferredSections />
    </>
  );
}
