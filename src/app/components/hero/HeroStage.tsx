'use client';

import { memo, useEffect, useRef, type ReactElement } from 'react';
import Link from 'next/link';
import CalendlyCTA from '../CalendlyCTA';
import { useLanguage } from '@/lib/LanguageContext';
import { trackCTAClick } from '@/lib/analytics';
import { POSTER_VIEWBOX, ribbonPosterLines } from './ribbon';
import type { RibbonHandle } from './ribbonRenderer';
import './hero.css';

const posterLines = ribbonPosterLines();

/** The finished picture as plain markup: there at first paint, and all that is needed without WebGL. */
const RibbonPoster = memo(function RibbonPoster(): ReactElement {
  return (
    <svg
      className="hero-poster"
      viewBox={POSTER_VIEWBOX}
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      data-testid="hero-poster"
    >
      {posterLines.map((line) => (
        <path key={line.d} d={line.d} strokeOpacity={line.opacity} />
      ))}
    </svg>
  );
});

export default function HeroStage(): ReactElement {
  const { t } = useLanguage();
  const stageRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const copyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    const copy = copyRef.current;
    const poster = stage?.querySelector('.hero-poster');
    if (!stage || !canvas || !copy || !poster) return undefined;

    const root = document.documentElement;
    let ribbon: RibbonHandle | null = null;
    let inView = true;
    let cancelled = false;

    const showPoster = (): void => {
      stage.dataset.ribbon = 'static';
    };

    // one observer: the header follows the hero, and the animation pauses once it is gone
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry?.isIntersecting ?? true;
        root.toggleAttribute('data-hero-passed', !inView);
        ribbon?.setVisible(inView);
      },
      { rootMargin: '-64px 0px 0px 0px' }
    );
    observer.observe(stage);

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMotionChange = (): void => {
      if (!motion.matches) return;
      ribbon?.stop();
      ribbon = null;
      showPoster();
    };
    motion.addEventListener?.('change', onMotionChange);

    let boot = 0;
    if (motion.matches) {
      showPoster();
    } else {
      // after first paint: the page is complete without this, so nothing waits on it
      boot = window.setTimeout(() => {
        import('./ribbonRenderer')
          .then(({ startRibbon }) => {
            if (cancelled) return;
            ribbon = startRibbon(canvas, stage, copy, poster, {
              onReady: () => {
                stage.dataset.ribbon = 'live';
              },
              onLost: showPoster,
            });
            if (ribbon) ribbon.setVisible(inView);
            else showPoster();
          })
          .catch(showPoster);
      }, 0);
    }

    return () => {
      cancelled = true;
      window.clearTimeout(boot);
      motion.removeEventListener?.('change', onMotionChange);
      observer.disconnect();
      root.removeAttribute('data-hero-passed');
      ribbon?.stop();
    };
  }, []);

  return (
    <section ref={stageRef} className="hero-stage" data-testid="hero-stage">
      <noscript>
        <style>{'.hero-poster{opacity:1}'}</style>
      </noscript>
      <canvas ref={canvasRef} className="hero-ribbon" aria-hidden="true" data-testid="hero-ribbon" />
      <div className="hero-content mx-auto max-w-6xl px-6 sm:px-10">
        <div ref={copyRef} className="hero-copy">
          <h1 className="hero-title">{t('hero.title')}</h1>
          <p className="hero-lede">{t('hero.subtitle')}</p>
          <div className="hero-actions flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="btn btn-accent btn-lg"
              onClick={() => trackCTAClick('hero_primary')}
            >
              {t('hero.cta.primary')}
            </Link>
            <Link
              href="/services"
              className="btn hero-btn-quiet btn-lg"
              onClick={() => trackCTAClick('hero_secondary')}
            >
              {t('hero.cta.secondary')}
            </Link>
          </div>
          <p className="hero-values text-sm text-muted">{t('hero.values')}</p>
          <CalendlyCTA />
        </div>
      </div>
      <div className="hero-band">
        <RibbonPoster />
      </div>
    </section>
  );
}
