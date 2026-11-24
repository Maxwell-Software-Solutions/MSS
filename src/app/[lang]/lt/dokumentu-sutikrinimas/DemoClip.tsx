'use client';

import { useCallback, useEffect, useRef, useState, type ReactElement } from 'react';
import './demo-clip.css';

const VIDEO = '/video/mss-shipment-check-1080x1080.mp4';
const POSTER = '/video/mss-shipment-check-poster.webp';
const CAPTION = 'Tikras paleidimas: trys dokumentai, viena neatitiktis';

/**
 * The demo clip beside the hero text: muted, looping and inline on phones.
 * It starts by itself, except for visitors who ask their system for reduced motion: they see the poster and a play
 * button. The whole picture is one button, so anyone can pause it (or start it if the browser blocked autoplay).
 */
export default function DemoClip(): ReactElement {
  const video = useRef<HTMLVideoElement>(null);
  // Hidden until the clip is known to be paused, so the button does not flash before an autoplay starts
  const [showPlay, setShowPlay] = useState(false);

  useEffect(() => {
    const clip = video.current;
    if (!clip) return;
    clip.muted = true;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduced.matches) setShowPlay(true);
    else void Promise.resolve(clip.play()).catch(() => setShowPlay(true));

    const onChange = (): void => {
      if (reduced.matches) clip.pause();
    };
    reduced.addEventListener('change', onChange);
    return () => reduced.removeEventListener('change', onChange);
  }, []);

  const toggle = useCallback(() => {
    const clip = video.current;
    if (!clip) return;
    if (clip.paused) void Promise.resolve(clip.play()).catch(() => undefined);
    else clip.pause();
  }, []);

  return (
    <figure className="doc-clip">
      <div className="doc-clip-frame">
        <video
          ref={video}
          src={VIDEO}
          poster={POSTER}
          muted
          loop
          playsInline
          preload="metadata"
          aria-describedby="doc-clip-caption"
          onPlay={() => setShowPlay(false)}
          onPause={() => setShowPlay(true)}
        />
        <button
          type="button"
          className="doc-clip-toggle"
          data-paused={showPlay ? 'true' : 'false'}
          aria-label={showPlay ? 'Paleisti vaizdo įrašą' : 'Pristabdyti vaizdo įrašą'}
          onClick={toggle}
        >
          <svg viewBox="0 0 64 64" width="64" height="64" aria-hidden="true" focusable="false">
            <circle cx="32" cy="32" r="31" fill="#0a0a0a" fillOpacity="0.82" stroke="#fff" strokeOpacity="0.9" />
            <path d="M26 20.5v23l19-11.5z" fill="#fff" />
          </svg>
        </button>
      </div>
      <figcaption id="doc-clip-caption">{CAPTION}</figcaption>
    </figure>
  );
}
