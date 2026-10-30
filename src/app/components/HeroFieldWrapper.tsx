'use client';
import dynamic from 'next/dynamic';
import DeferredClient from './DeferredClient';
import type { ReactElement } from 'react';

const ParticleField = dynamic(() => import('./ParticleField'), {
  ssr: false,
  loading: () => (
    <div
      data-testid="particle-field"
      className="relative flex h-[420px] w-full items-center justify-center overflow-hidden rounded-xl border border-border bg-surface lg:h-[460px]"
    >
      <span className="text-sm text-muted">Loading field…</span>
    </div>
  ),
});

export default function HeroFieldWrapper(): ReactElement {
  return (
    <div className="hidden lg:block" data-parallax="0.1" data-reveal data-testid="hero-field-wrapper">
      {/* Removed textual placeholder for particle field */}
      <DeferredClient
        fallback={
          <div
            data-testid="particle-field"
            className="h-[420px] rounded-xl border border-border bg-wash lg:h-[460px]"
            aria-hidden="true"
          />
        }
        minHeight="420px"
      >
        <ParticleField />
      </DeferredClient>
    </div>
  );
}
