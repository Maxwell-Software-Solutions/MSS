'use client';

import { memo, useEffect, useRef, useState, type ReactElement } from 'react';
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
  const ribbonRef = useRef<RibbonHandle | null>(null);
  const [paused, setPaused] = useState(false);
  const pauseLabel = t(paused ? 'hero.motion.play' : 'hero.motion.pause');

  const togglePause = (): void => {
    setPaused(!paused);
    ribbonRef.current?.setPaused(!paused);
  };

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    const copy = copyRef.current;
    const poster = stage?.querySelector('.hero-poster');
    if (!stage || !canvas || !copy || !poster) return undefined;

    const root = document.documentElement;
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
        ribbonRef.current?.setVisible(inView);
      },
      { rootMargin: '-64px 0px 0px 0px' }
    );
    observer.observe(stage);

    // Reduced motion does not mean a still picture: the lines hold their shape and the light keeps travelling
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMotionChange = (): void => ribbonRef.current?.setReduced(motion.matches);
    motion.addEventListener?.('change', onMotionChange);

    // after first paint: the page is complete without this, so nothing waits on it
    const boot = window.setTimeout(() => {
      import('./ribbonRenderer')
        .then(({ startRibbon }) => {
          if (cancelled) return;
          const ribbon = startRibbon(canvas, stage, copy, poster, {
            reduced: motion.matches,
            onReady: () => {
              stage.dataset.ribbon = 'live';
            },
            onLost: showPoster,
          });
          ribbonRef.current = ribbon;
          if (!ribbon) {
            showPoster();
            return;
          }
          ribbon.setVisible(inView);
          ribbon.setPaused(stage.hasAttribute('data-paused'));
        })
        .catch(showPoster);
    }, 0);

    return () => {
      cancelled = true;
      window.clearTimeout(boot);
      motion.removeEventListener?.('change', onMotionChange);
      observer.disconnect();
      root.removeAttribute('data-hero-passed');
      ribbonRef.current?.stop();
      ribbonRef.current = null;
    };
  }, []);

  return (
    <section ref={stageRef} className="hero-stage" data-testid="hero-stage" data-paused={paused ? '' : undefined}>
      <noscript>
        <style>{'.hero-poster{opacity:1}.hero-glow,.hero-pause{display:none}'}</style>
      </noscript>
      <canvas ref={canvasRef} className="hero-ribbon" aria-hidden="true" data-testid="hero-ribbon" />
      <div className="hero-content mx-auto max-w-6xl px-6 sm:px-10">
        <div ref={copyRef} className="hero-copy">
          <h1 className="hero-title">{t('hero.title')}</h1>
          <p className="hero-lede">
            <span className="hero-lede-full">{t('hero.subtitle')}</span>
            <span className="hero-lede-short">{t('hero.subtitle.short')}</span>
          </p>
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
      <div className="hero-glow" aria-hidden="true" />
      <button type="button" className="hero-pause" onClick={togglePause} aria-label={pauseLabel} title={pauseLabel}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d={paused ? 'M5 3.5v9l7-4.5z' : 'M5.5 3.5v9M10.5 3.5v9'} />
        </svg>
      </button>
    </section>
  );
}
