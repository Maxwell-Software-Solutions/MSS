'use client';

import { useCallback, useEffect, useRef, useState, type ReactElement } from 'react';
import ScheduleCallButton from './ScheduleCallButton';
import { useLanguage } from '@/lib/LanguageContext';
import { trackCTAClick } from '@/lib/analytics';
import './promo-film.css';

const PHONE = '(max-width: 767px)';
const FILM = {
  wide: { webm: '/video/maxwell-film-16x9.webm', mp4: '/video/maxwell-film-16x9.mp4', poster: '/video/maxwell-film-16x9.webp' },
  tall: { webm: '/video/maxwell-film-4x5.webm', mp4: '/video/maxwell-film-4x5.mp4', poster: '/video/maxwell-film-4x5.webp' },
};

function play(video: HTMLVideoElement): void {
  const pending = video.play();
  pending?.catch(() => undefined);
}

/**
 * The short film right after the hero. Nothing loads until the page has finished and the film is near the
 * screen; it plays muted while in view, and the visitor can pause it or turn the sound on.
 */
export default function PromoFilm(): ReactElement {
  const { t, language } = useLanguage();
  const frameRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const heldRef = useRef(false);
  const heardRef = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [caption, setCaption] = useState('');
  const languageRef = useRef(language);
  const cueRef = useRef<(() => void) | null>(null);

  // captions in the site language, drawn here rather than by the browser so they match the site; the track
  // file is only fetched once the film itself is. The cue is looked up from the playback time, which every
  // browser keeps current, rather than from activeCues, which some do not.
  const pickCaptions = useCallback((lang: string): void => {
    const video = videoRef.current;
    const tracks = video?.textTracks;
    if (!video?.getAttribute('src') || !tracks) return;
    cueRef.current?.();
    const list = Array.from(tracks);
    for (const item of list) item.mode = item.language === lang ? 'hidden' : 'disabled';
    const track = list.find((item) => item.language === lang);
    if (!track) {
      cueRef.current = null;
      setCaption('');
      return;
    }
    const show = (): void => {
      const now = video.currentTime;
      const cue = Array.from(track.cues ?? []).find((item) => item.startTime <= now && now < item.endTime);
      setCaption(cue ? (cue as VTTCue).text : '');
    };
    track.addEventListener('cuechange', show);
    video.addEventListener('timeupdate', show);
    cueRef.current = () => {
      track.removeEventListener('cuechange', show);
      video.removeEventListener('timeupdate', show);
    };
    show();
  }, []);

  // near the screen only the film's header is fetched; the rest streams once it is in view or asked for
  const ensureSource = useCallback(
    (preload: 'metadata' | 'auto' = 'auto'): HTMLVideoElement | null => {
      const video = videoRef.current;
      if (!video) return null;
      if (preload === 'auto') video.preload = 'auto';
      if (video.getAttribute('src')) return video;
      const film = window.matchMedia?.(PHONE).matches ? FILM.tall : FILM.wide;
      video.poster = film.poster;
      video.preload = preload;
      // the smaller WebM where VP9 is native; Apple's WebKit, iPhones included, always gets the H.264 file
      const webm = video.canPlayType('video/webm; codecs="vp9, opus"') === 'probably' && !/Apple/.test(navigator.vendor);
      video.src = webm ? film.webm : film.mp4;
      pickCaptions(languageRef.current);
      return video;
    },
    [pickCaptions]
  );

  useEffect(() => {
    languageRef.current = language;
    pickCaptions(language);
  }, [language, pickCaptions]);

  useEffect(() => () => cueRef.current?.(), []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;
    // iOS only autoplays inline video that is muted as an attribute, which React does not render
    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute('muted', '');
    const onPlay = (): void => setPlaying(true);
    const onPause = (): void => setPlaying(false);
    const onVolume = (): void => setMuted(video.muted);
    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);
    video.addEventListener('volumechange', onVolume);
    return () => {
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
      video.removeEventListener('volumechange', onVolume);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const frame = frameRef.current;
    if (!video || !frame) return undefined;
    const watch = typeof IntersectionObserver === 'function';

    // in view: play unless the visitor paused it; out of view: stop, so it never plays unseen
    const seen = watch
      ? new IntersectionObserver(
          ([entry]) => {
            if (entry?.isIntersecting) {
              ensureSource();
              if (heldRef.current) return;
              video.autoplay = true;
              // iOS loads nothing on its own, so ask for playback once the browser has a source to load
              if (video.networkState !== 0) play(video);
            } else {
              video.autoplay = false;
              if (!video.paused) video.pause();
            }
          },
          { threshold: 0.35 }
        )
      : null;
    // close to the screen: get ready, so the film starts at once when it arrives
    const near = watch
      ? new IntersectionObserver(
          ([entry]) => {
            if (!entry?.isIntersecting) return;
            ensureSource('metadata');
            near?.disconnect();
          },
          { rootMargin: '0px 0px 50% 0px' }
        )
      : null;

    // the hero loads first: the poster and the film come in only once the page has loaded and the browser is idle
    let timer = 0;
    let cancelled = false;
    const begin = (): void => {
      if (cancelled) return;
      frame.dataset.armed = '';
      seen?.observe(frame);
      near?.observe(frame);
    };
    const start = (): void => {
      timer = window.setTimeout(() => (window.requestIdleCallback ? window.requestIdleCallback(begin, { timeout: 1500 }) : begin()), 0);
    };
    if (document.readyState === 'complete') start();
    else window.addEventListener('load', start, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener('load', start);
      window.clearTimeout(timer);
      seen?.disconnect();
      near?.disconnect();
    };
  }, [ensureSource]);

  const togglePlay = (): void => {
    const video = ensureSource();
    if (!video) return;
    if (video.paused) {
      heldRef.current = false;
      play(video);
    } else {
      heldRef.current = true;
      video.autoplay = false;
      video.pause();
    }
  };

  const toggleSound = (): void => {
    const video = ensureSource();
    if (!video) return;
    if (!video.muted) {
      video.muted = true;
      setMuted(true);
      return;
    }
    // the first time the sound comes on, the film starts again so the voice is heard from the top
    if (!heardRef.current) {
      heardRef.current = true;
      video.currentTime = 0;
    }
    video.muted = false;
    setMuted(false);
    heldRef.current = false;
    play(video);
  };

  const playLabel = t(playing ? 'promoFilm.pause' : 'promoFilm.play');
  const soundLabel = t(muted ? 'promoFilm.soundOn' : 'promoFilm.soundOff');

  return (
    <section className="section section-tone promo-film" aria-labelledby="promo-film-heading">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">{t('promoFilm.eyebrow')}</div>
          <h2 id="promo-film-heading">{t('promoFilm.heading')}</h2>
        </div>

        <div ref={frameRef} className="promo-film-frame">
          <video ref={videoRef} className="promo-film-media" muted loop playsInline preload="none">
            <track kind="captions" srcLang="en" label="English" src="/video/maxwell-film.en.vtt" />
            <track kind="captions" srcLang="lt" label="Lietuvių" src="/video/maxwell-film.lt.vtt" />
          </video>
          {caption ? (
            <p className="promo-film-caption" lang={language} aria-hidden="true">
              <span>{caption}</span>
            </p>
          ) : null}
          <div className="promo-film-controls">
            <button type="button" className="promo-film-button" onClick={togglePlay} aria-label={playLabel} title={playLabel}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d={playing ? 'M5.5 3.5v9M10.5 3.5v9' : 'M5 3.5v9l7-4.5z'} />
              </svg>
            </button>
            <button type="button" className="promo-film-button" onClick={toggleSound} aria-label={soundLabel} title={soundLabel}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M2.5 6v4h2.5l3.5 3V3L5 6z" />
                <path d={muted ? 'M11 6.2l3.5 3.6M14.5 6.2L11 9.8' : 'M11 5.8a3 3 0 0 1 0 4.4M12.8 4a5.5 5.5 0 0 1 0 8'} />
              </svg>
            </button>
          </div>
        </div>

        <div className="page-actions promo-film-actions">
          <ScheduleCallButton className="btn-lg" onClick={() => trackCTAClick('promo_film')} />
        </div>
      </div>
    </section>
  );
}
