'use client';

import { useCallback, useEffect, useRef, useState, type ReactElement } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { trackCTAClick } from '@/lib/analytics';
import { TALL, ctaPoint, endScale, filmSources, frameAt, growth, holdPoint, pinProgress, posterOf, settleAt, voiceOf } from './promoFilmModel';
import type { Cut, FilmSource, Layout } from './promoFilmModel';
import './promo-film.css';

const SOUND_KEY = 'mss.film.sound';

/** The cut and the files chosen for the film, with a key that tells one choice from the next. */
interface Choice {
  cut: Cut;
  sources: FilmSource[];
  key: string;
}

function recall(): 'on' | 'off' | null {
  try {
    const saved = window.sessionStorage.getItem(SOUND_KEY);
    return saved === 'on' || saved === 'off' ? saved : null;
  } catch {
    return null;
  }
}

// cuts that have no Lithuanian-voiced file yet, remembered for the visit so a missing file is asked for once
const NO_LT_KEY = 'mss.film.no-lt';

function missingLt(): Set<Cut> {
  try {
    return new Set((window.sessionStorage.getItem(NO_LT_KEY) ?? '').split(',').filter((item): item is Cut => item === 'wide' || item === 'tall'));
  } catch {
    return new Set();
  }
}

function rememberMissingLt(cuts: Set<Cut>): void {
  try {
    window.sessionStorage.setItem(NO_LT_KEY, Array.from(cuts).join(','));
  } catch {
    // storage is off: it is asked for again on the next screen
  }
}

function remember(choice: 'on' | 'off'): void {
  try {
    window.sessionStorage.setItem(SOUND_KEY, choice);
  } catch {
    // storage is off: the choice then lasts for this page only
  }
}

// the smaller WebM where VP9 is native; Apple's WebKit, iPhones included, always gets the H.264 file
function webmFits(video: HTMLVideoElement): boolean {
  return video.canPlayType('video/webm; codecs="vp9, opus"') === 'probably' && !/Apple/.test(navigator.vendor);
}

/**
 * The film right after the hero, part of the dark page rather than a player on it. As the page scrolls the picture
 * settles in the dark, pins under the header, grows until it fills the screen and lets go, without ever taking the
 * scroll away from the visitor. It plays muted while on screen, stops when it is not, and plays once: the live
 * "Book a call" button goes in over the one drawn in the film the moment that one starts to appear, so it can be clicked
 * from its first frame, the film stops on its last card, and "Watch again" is there for anyone who wants it. Nothing
 * loads until the page has loaded and the film's runway is in view, so the hero is never slowed.
 */
export default function PromoFilm(): ReactElement {
  const { t, language } = useLanguage();
  const trackRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const viewRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const heldRef = useRef(false); // the visitor paused it: scrolling back does not start it again
  const endedRef = useRef(false); // it has played through: nothing starts it again but a click on "Watch again"
  const soundRef = useRef(false); // the visitor turned the sound on earlier in this visit
  const heardRef = useRef(false); // the film has been heard, so the button no longer promises a restart
  const inViewRef = useRef(false);
  const choiceRef = useRef<Choice | null>(null);
  const noLtRef = useRef<Set<Cut> | null>(null); // cuts with no Lithuanian-voiced file yet, read once the page is up
  const languageRef = useRef(language);
  const cueRef = useRef<(() => void) | null>(null);
  const loadRef = useRef(0); // counts loads of the film's files and restarts, so a late retry never fights a newer one
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [heard, setHeard] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [ended, setEnded] = useState(false);
  const [cta, setCta] = useState(false); // the live "Book a call" is in: from the drawn button's first frame, not from the end
  const [caption, setCaption] = useState('');

  // captions in the site language, drawn here rather than by the browser so they match the site; the track
  // files are only fetched once the film itself is. The cue is looked up from the playback time, which every
  // browser keeps current, rather than from activeCues, which some do not.
  const pickCaptions = useCallback((lang: string): void => {
    const video = videoRef.current;
    const tracks = video?.textTracks;
    if (!video || !tracks || !choiceRef.current) return;
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

  // Playback the browser refuses (iOS in Low Power Mode, a blocked autoplay setting) leaves the poster with a play
  // button. Sound that is refused only because nobody has touched the page yet falls back to the muted film.
  const tryPlay = useCallback((video: HTMLVideoElement): void => {
    const attempt = (): void => {
      const pending = video.play();
      pending?.catch((error: unknown) => {
        if ((error as { name?: string } | null)?.name === 'AbortError') return;
        if (!video.muted) {
          video.muted = true;
          attempt();
          return;
        }
        setBlocked(true);
      });
    };
    attempt();
  }, []);

  // the film is over: it stays on its last card, and the live button and "Watch again" take over
  const finish = useCallback((video: HTMLVideoElement): void => {
    if (endedRef.current) return;
    endedRef.current = true;
    video.autoplay = false;
    if (!video.paused) video.pause();
    setEnded(true);
    setCta(true);
    setCaption('');
  }, []);

  // the cut follows the screen's orientation; in Lithuanian the Lithuanian voice is tried first, then the English one
  const choose = useCallback((video: HTMLVideoElement): Choice => {
    const cut: Cut = window.matchMedia?.(TALL).matches ? 'tall' : 'wide';
    noLtRef.current ??= missingLt();
    const lang = noLtRef.current.has(cut) ? 'en' : languageRef.current;
    const sources = filmSources(cut, lang, webmFits(video));
    return { cut, sources, key: sources.map((item) => item.src).join('|') };
  }, []);

  const begin = useCallback(
    (video: HTMLVideoElement, choice: Choice, preload: 'metadata' | 'auto', resume?: { time: number; playing: boolean; ended: boolean }): void => {
      video.poster = posterOf(choice.cut);
      video.preload = preload;
      video.querySelectorAll('source').forEach((node) => node.remove());
      const files = document.createDocumentFragment();
      for (const item of choice.sources) {
        const node = document.createElement('source');
        node.src = item.src;
        node.type = item.type;
        files.append(node);
      }
      video.prepend(files);
      choiceRef.current = choice;
      // the first files go in while nothing has loaded, and that starts the loading by itself; changing them later needs a nudge
      if (video.networkState !== 0) video.load();
      const mine = (loadRef.current += 1);
      if (resume) {
        const want = resume.time;
        const seek = (): void => {
          if (want > 0 && Number.isFinite(video.duration)) video.currentTime = Math.min(want, video.duration);
        };
        video.addEventListener(
          'loadedmetadata',
          () => {
            seek();
            if (resume.playing) tryPlay(video);
          },
          { once: true }
        );
        // WebKit now and then drops a seek made while the new files are still coming in: ask again, a few times, until
        // the film is where it was. Anything else that moves the film (a click on Watch again) ends the asking. If a film
        // that had ended cannot be put back on its last card, it is not left showing the wrong picture under the button:
        // it goes back to its start, waiting for a tap.
        let tries = 0;
        const events = ['canplay', 'seeked', 'playing'];
        const stop = (giveUp: boolean): void => {
          window.clearTimeout(timer);
          events.forEach((name) => video.removeEventListener(name, check));
          if (giveUp && resume.ended && loadRef.current === mine && Math.abs(video.currentTime - want) > 1) {
            endedRef.current = false;
            heldRef.current = true;
            setEnded(false);
            setCta(false);
          }
        };
        const timer = window.setTimeout(() => stop(true), 4000);
        function check(): void {
          if (loadRef.current !== mine || want <= 0) return stop(false);
          if (video.seeking) return; // a seek in flight reports where it is going; judge it once it has landed
          if (Math.abs(video.currentTime - want) <= 1) return stop(false);
          if (tries >= 3) return stop(true);
          tries += 1;
          seek();
        }
        events.forEach((name) => video.addEventListener(name, check));
      }
      pickCaptions(languageRef.current);
    },
    [pickCaptions, tryPlay]
  );

  // near the screen only the film's header is fetched; the rest streams once it is in view or asked for
  const ensureSource = useCallback(
    (preload: 'metadata' | 'auto' = 'auto'): HTMLVideoElement | null => {
      const video = videoRef.current;
      if (!video) return null;
      if (!choiceRef.current) begin(video, choose(video), preload);
      else if (preload === 'auto') video.preload = 'auto';
      return video;
    },
    [begin, choose]
  );

  // a turned phone or a switched site language may call for other files: swap them and carry on from the same second
  const refresh = useCallback((): void => {
    const video = videoRef.current;
    const current = choiceRef.current;
    if (!video || !current) return;
    const next = choose(video);
    if (next.key === current.key) return;
    begin(video, next, video.preload === 'metadata' ? 'metadata' : 'auto', { time: video.currentTime, playing: !video.paused, ended: endedRef.current });
  }, [begin, choose]);

  useEffect(() => {
    languageRef.current = language;
    pickCaptions(language);
    refresh();
  }, [language, pickCaptions, refresh]);

  useEffect(() => {
    const query = window.matchMedia?.(TALL);
    query?.addEventListener?.('change', refresh);
    return () => query?.removeEventListener?.('change', refresh);
  }, [refresh]);

  useEffect(() => () => cueRef.current?.(), []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;
    // iOS only autoplays inline video that is muted as an attribute, which React does not render
    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute('muted', '');
    // sound the visitor has already asked for stays on for the rest of this visit
    const saved = recall();
    soundRef.current = saved === 'on';
    heardRef.current = saved !== null;
    setHeard(saved !== null);
    const onPlay = (): void => {
      setPlaying(true);
      setBlocked(false);
    };
    const onPause = (): void => setPlaying(false);
    const onVolume = (): void => setMuted(video.muted);
    // no Lithuanian-voiced file yet: the browser has fallen back to the English one, so do not ask again
    const onMetadata = (): void => {
      const choice = choiceRef.current;
      if (choice?.sources.some((item) => voiceOf(item.src) === 'lt') && voiceOf(video.currentSrc) === 'en') {
        noLtRef.current ??= missingLt();
        noLtRef.current.add(choice.cut);
        rememberMissingLt(noLtRef.current);
      }
    };
    // The live button goes in at the first frame of the one the film draws, while the film is still playing, so it is
    // there to be clicked as soon as anyone can see a button; the film then stops on its last card, just before it
    // fades out. The playing time is only reported a few times a second, so from a second before the button it is
    // watched frame by frame. The button follows the clock both ways: a film put back to its start takes it away.
    let polling = 0;
    const poll = (): void => {
      polling = 0;
      if (video.paused || endedRef.current) return;
      const now = video.currentTime;
      if (now >= holdPoint(video.duration)) {
        finish(video);
        return;
      }
      if (now >= ctaPoint(video.duration)) setCta(true);
      polling = window.requestAnimationFrame(poll);
    };
    const onTime = (): void => {
      if (endedRef.current) return;
      const now = video.currentTime;
      const cue = ctaPoint(video.duration);
      setCta(now >= cue);
      if (video.paused) return;
      if (now >= holdPoint(video.duration)) finish(video);
      else if (!polling && now >= cue - 1) polling = window.requestAnimationFrame(poll);
    };
    // the browser got to the very end first (a hidden tab, a busy page): back to the card that was meant to be held
    const onEnded = (): void => {
      const stop = holdPoint(video.duration);
      if (Number.isFinite(stop) && video.currentTime > stop) video.currentTime = stop;
      finish(video);
    };
    // sound and a hidden tab do not go together
    const onVisibility = (): void => {
      if (!choiceRef.current) return;
      if (document.hidden) {
        if (!video.paused) video.pause();
      } else if (inViewRef.current && !heldRef.current && !endedRef.current) {
        tryPlay(video);
      }
    };
    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);
    video.addEventListener('volumechange', onVolume);
    video.addEventListener('loadedmetadata', onMetadata);
    video.addEventListener('timeupdate', onTime);
    video.addEventListener('ended', onEnded);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      window.cancelAnimationFrame(polling);
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
      video.removeEventListener('volumechange', onVolume);
      video.removeEventListener('loadedmetadata', onMetadata);
      video.removeEventListener('timeupdate', onTime);
      video.removeEventListener('ended', onEnded);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [finish, tryPlay]);

  // playback: starts once half of the stage is on screen, stops when it has gone, keeps its place in between, and
  // once it has played through it never starts again by itself
  useEffect(() => {
    const video = videoRef.current;
    const frame = frameRef.current;
    const view = viewRef.current;
    const track = trackRef.current;
    if (!video || !frame || !view || !track) return undefined;
    const watch = typeof IntersectionObserver === 'function';

    const seen = watch
      ? new IntersectionObserver(
          (entries) => {
            const entry = entries[entries.length - 1];
            if (!entry) return;
            const share = entry.isIntersecting ? entry.intersectionRatio : 0;
            if (share >= 0.5) {
              inViewRef.current = true;
              // a film that has played through has everything it needs: touching its files again could only disturb its last card
              if (endedRef.current) return;
              ensureSource();
              if (heldRef.current || document.hidden) return;
              video.autoplay = true;
              video.muted = !soundRef.current;
              tryPlay(video);
            } else if (share < 0.3) {
              inViewRef.current = false;
              video.autoplay = false;
              if (!video.paused) video.pause();
            }
          },
          { threshold: [0, 0.3, 0.5] }
        )
      : null;
    // the runway has come into view: get ready, so the film starts at once when the stage is half there. A visitor who
    // never scrolls past the hero fetches nothing but the poster. The runway begins exactly where the hero ends, and an
    // edge that only touches the screen counts as seen, so the screen is a few pixels shorter for this.
    const near = watch
      ? new IntersectionObserver(
          ([entry]) => {
            if (!entry?.isIntersecting) return;
            ensureSource('metadata');
            near?.disconnect();
          },
          { rootMargin: '0px 0px -4px 0px' }
        )
      : null;

    // the hero loads first: the poster and the film come in only once the page has loaded and the browser is idle
    let timer = 0;
    let cancelled = false;
    const arm = (): void => {
      if (cancelled) return;
      frame.dataset.armed = '';
      seen?.observe(view);
      near?.observe(track);
    };
    const start = (): void => {
      timer = window.setTimeout(() => (window.requestIdleCallback ? window.requestIdleCallback(arm, { timeout: 1500 }) : arm()), 0);
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
  }, [ensureSource, tryPlay]);

  // the pin: while the runway scrolls past, the stage stays put under the header and the picture grows into the screen
  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    const view = viewRef.current;
    const card = cardRef.current;
    const frame = frameRef.current;
    if (!track || !stage || !view || !card || !frame) return undefined;

    let layout: Layout | null = null;
    let scale = 1;
    let pin = 0;
    let run = 0;
    let from = 0.05;
    let to = 0.72;
    let shown = -1;
    let frameId = 0;

    const clear = (): void => {
      layout = null;
      shown = -1;
      stage.style.removeProperty('--film-e');
      frame.style.removeProperty('transform');
    };

    const paint = (): void => {
      frameId = 0;
      if (!layout) return;
      const e = Math.round(growth(pinProgress(track.getBoundingClientRect().top, pin, run), from, to) * 1000) / 1000;
      if (e === shown) return;
      shown = e;
      const { k, tx, ty } = frameAt(layout, scale, e);
      stage.style.setProperty('--film-e', String(e));
      frame.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0) scale(${k.toFixed(4)})`;
    };

    const schedule = (): void => {
      if (!frameId) frameId = window.requestAnimationFrame(paint);
    };

    // without a sticky stage (an old browser, no style sheet) there is nothing to pin: the picture just stays as it is
    const measure = (): void => {
      const pinned = getComputedStyle(stage);
      if (pinned.position !== 'sticky') {
        clear();
        return;
      }
      const tuning = getComputedStyle(track);
      const read = (name: string, fallback: number): number => {
        const value = parseFloat(tuning.getPropertyValue(name));
        return Number.isFinite(value) ? value : fallback;
      };
      from = read('--film-grow-from', 0.05);
      to = read('--film-grow-to', 0.72);
      pin = parseFloat(pinned.top) || 0;
      run = track.offsetHeight - stage.offsetHeight;
      const box = view.getBoundingClientRect();
      const at = card.getBoundingClientRect();
      layout = { viewW: box.width, viewH: box.height, cardX: at.left - box.left, cardY: at.top - box.top, cardW: at.width, cardH: at.height };
      scale = endScale(layout, read('--film-max-crop', 1.1));
      shown = -1;
      schedule();
    };

    // Once the hand is off, a page resting close to the card or to the full film glides the last bit there. It is asked
    // for only after the scrolling has stopped and is dropped the moment anyone touches the page again, so nothing is
    // held back: CSS scroll-snap is applied by Chromium to every wheel step, and so keeps the wheel from leaving it.
    let idle = 0;
    let pointers = 0;
    let fingers = 0;
    const settle = (): void => {
      if (!layout || pointers > 0 || fingers > 0 || document.hidden) return;
      const raw = run > 0 ? (pin - track.getBoundingClientRect().top) / run : 0;
      const goal = settleAt(raw, to, 0.08);
      if (goal === null) return;
      const distance = (goal - raw) * run;
      if (Math.abs(distance) >= 2) window.scrollTo({ top: window.scrollY + distance, behavior: 'smooth' });
    };
    const rest = (): void => {
      window.clearTimeout(idle);
      idle = window.setTimeout(settle, 220);
    };
    const onScroll = (): void => {
      schedule();
      rest();
    };
    const onDown = (): void => {
      pointers += 1;
    };
    const onUp = (): void => {
      pointers = Math.max(0, pointers - 1);
      rest();
    };
    const onTouch = (event: TouchEvent): void => {
      fingers = event.touches.length;
      rest();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    window.addEventListener('pointercancel', onUp, { passive: true });
    window.addEventListener('touchstart', onTouch, { passive: true });
    window.addEventListener('touchend', onTouch, { passive: true });
    window.addEventListener('touchcancel', onTouch, { passive: true });
    const resize = typeof ResizeObserver === 'function' ? new ResizeObserver(measure) : null;
    if (resize) {
      resize.observe(track);
      resize.observe(view);
      resize.observe(card);
    } else {
      window.addEventListener('resize', measure);
      measure();
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
      window.removeEventListener('touchstart', onTouch);
      window.removeEventListener('touchend', onTouch);
      window.removeEventListener('touchcancel', onTouch);
      window.removeEventListener('resize', measure);
      window.clearTimeout(idle);
      window.cancelAnimationFrame(frameId);
      resize?.disconnect();
    };
  }, []);

  // from the card's end it goes back to the start, on a click and never otherwise
  const restart = (): void => {
    const video = ensureSource();
    if (!video) return;
    endedRef.current = false;
    heldRef.current = false;
    loadRef.current += 1;
    setEnded(false);
    setCta(false);
    video.currentTime = 0;
    video.muted = !soundRef.current;
    tryPlay(video);
  };

  const togglePlay = (): void => {
    if (endedRef.current) {
      restart();
      return;
    }
    const video = ensureSource();
    if (!video) return;
    if (video.paused) {
      heldRef.current = false;
      video.muted = !soundRef.current;
      tryPlay(video);
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
      soundRef.current = false;
      remember('off');
      return;
    }
    // the first time the sound comes on, the film starts again so the voice is heard from the top
    if (!heardRef.current) {
      heardRef.current = true;
      setHeard(true);
      video.currentTime = 0;
    }
    video.muted = false;
    soundRef.current = true;
    remember('on');
    heldRef.current = false;
    tryPlay(video);
  };

  // the poster's own button: when the browser would not start the film by itself, a tap starts it, with its sound
  const startWithSound = (): void => {
    const video = ensureSource();
    if (!video) return;
    heardRef.current = true;
    setHeard(true);
    soundRef.current = true;
    remember('on');
    video.muted = false;
    heldRef.current = false;
    setBlocked(false);
    tryPlay(video);
  };

  const showStart = blocked && !playing && !ended;
  const playLabel = t(ended ? 'promoFilm.watchAgain' : playing ? 'promoFilm.pause' : 'promoFilm.play');
  const soundLabel = t(muted ? (heard ? 'promoFilm.soundOn' : 'promoFilm.playWithSound') : 'promoFilm.soundOff');

  return (
    <section className="promo-film" aria-labelledby="promo-film-heading">
      <h2 id="promo-film-heading" className="sr-only">
        {t('promoFilm.heading')}
      </h2>

      <div ref={trackRef} className="promo-film-track">
        <div ref={stageRef} className="promo-film-stage">
          <div ref={viewRef} className="promo-film-view">
            <div className="promo-film-slot">
              <div ref={cardRef} className="promo-film-card">
                <div ref={frameRef} className="promo-film-frame" data-blocked={showStart ? '' : undefined}>
                  <video ref={videoRef} className="promo-film-media" muted playsInline preload="none">
                    <track kind="captions" srcLang="en" label="English" src="/video/maxwell-film.en.vtt" />
                    <track kind="captions" srcLang="lt" label="Lietuvių" src="/video/maxwell-film.lt.vtt" />
                  </video>
                  <div className="promo-film-floor" aria-hidden="true" />
                  <div className="promo-film-veil" aria-hidden="true" />
                  {cta ? (
                    <a className="promo-film-cta" href="/book" target="_blank" rel="noopener noreferrer" aria-label={t('cta.bookCall.aria')} onClick={() => trackCTAClick('promo_film')}>
                      {t('cta.bookCall')}
                    </a>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="promo-film-ui">
              {caption ? (
                <p className="promo-film-caption" lang={language} aria-hidden="true">
                  <span>{caption}</span>
                </p>
              ) : null}
              {showStart ? (
                <button type="button" className="promo-film-start" onClick={startWithSound} aria-label={t('promoFilm.play')} title={t('promoFilm.play')}>
                  <svg width="28" height="28" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <path d="M5 3.2v9.6a.4.4 0 0 0 .6.35l7.6-4.8a.4.4 0 0 0 0-.7L5.6 2.85A.4.4 0 0 0 5 3.2z" />
                  </svg>
                </button>
              ) : null}
              <div className="promo-film-controls">
                <button type="button" className="promo-film-button" data-again={ended ? '' : undefined} onClick={togglePlay} aria-label={playLabel} title={playLabel}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d={ended ? 'M13.5 8a5.5 5.5 0 1 1-1.7-3.95M13.5 2.4v3.3h-3.3' : playing ? 'M5.5 3.5v9M10.5 3.5v9' : 'M5 3.5v9l7-4.5z'} />
                  </svg>
                  {ended ? <span>{playLabel}</span> : null}
                </button>
                {ended ? null : (
                  <button type="button" className="promo-film-button promo-film-sound" data-invite={muted && !heard ? '' : undefined} onClick={toggleSound}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M2.5 6v4h2.5l3.5 3V3L5 6z" />
                      <path d={muted ? 'M11 6.2l3.5 3.6M14.5 6.2L11 9.8' : 'M11 5.8a3 3 0 0 1 0 4.4M12.8 4a5.5 5.5 0 0 1 0 8'} />
                    </svg>
                    <span>{soundLabel}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="promo-film-fade" aria-hidden="true" />
    </section>
  );
}
