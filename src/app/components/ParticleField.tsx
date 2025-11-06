'use client';
import { useRef, useEffect, type ReactElement } from 'react';
// Use local shim instead of global declaration to avoid lib.dom conflicts.

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: [number, number, number];
}

// Responsive, pointer-reactive particle field
export default function ParticleField(): ReactElement {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const pointerRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });
  const rafRef = useRef<number | null>(null);
  const lastSpawnRef = useRef(0);
  // schedule for ambient particle spawning (initialized after mount for SSR safety)
  const ambientRef = useRef<{ nextAt: number }>({ nextAt: 0 });
  // multiple autonomous agents replacing prior single artificial cursor
  interface Agent {
    x: number;
    y: number;
    vx: number;
    vy: number;
    nextDirAt: number;
    lastSpawn: number;
  }
  const agentsRef = useRef<Agent[]>([]);
  const trailRef = useRef<Array<{ x: number; y: number; ts: number }>>([]);
  // pulse effect scheduler
  const pulseRef = useRef<{ nextAt: number }>({ nextAt: 0 });
  // gating & timing refs
  const startRef = useRef<number>(performance.now());
  const featuresEnabledRef = useRef<{ pulses: boolean; agents: boolean }>({ pulses: false, agents: false });
  const lastFrameRef = useRef<number>(startRef.current);
  const frameSkipToggleRef = useRef<boolean>(false);

  useEffect(() => {
    // Defer heavy canvas + animation setup until main thread is idle (or after small timeout)
    type Scheduler = (cb: () => void) => number;
    const schedule: Scheduler =
      typeof window.requestIdleCallback === 'function'
        ? (cb) => window.requestIdleCallback(() => cb())
        : (cb) => window.setTimeout(cb, 60);

    schedule(() => {
      const canvas = canvasRef.current!;
      let context: CanvasRenderingContext2D | null = null;
      try {
        context = canvas.getContext('2d', { alpha: true });
      } catch {
        context = null;
      }
      // Abort early in non-browser / test environments that return a stub context without expected APIs
      // Narrow context by checking required methods without using 'any'
      if (
        !context ||
        typeof context.setTransform !== 'function' ||
        typeof context.createLinearGradient !== 'function'
      ) {
        return; // Provide a static placeholder only; keeps tests deterministic
      }

      const prefersReducedMotion = (() => {
        try {
          return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        } catch {
          return false;
        }
      })();
      // Detect dark mode so we can reduce visual clutter (no agents / no connection lines)
      // Track dark mode dynamically (respond to OS preference and class-based toggles)
      let isDark = (() => {
        try {
          return (
            window.matchMedia('(prefers-color-scheme: dark)').matches ||
            document.documentElement.classList.contains('dark')
          );
        } catch {
          return document.documentElement.classList.contains('dark');
        }
      })();

      // MediaQuery + MutationObserver to respond when theme changes at runtime
      const mq = (() => {
        try {
          return window.matchMedia('(prefers-color-scheme: dark)');
        } catch {
          return null as unknown as MediaQueryList | null;
        }
      })();
      // Debounced theme change handler: schedule minimal work on theme changes
      let themeChangeTimer: number | null = null;
      let pendingThemeMatches: boolean | null = null;
      let needsResize = false;
      const applyThemeChange = (matches: boolean): void => {
        if (matches === isDark) return;
        isDark = matches;
        if (isDark) {
          // Immediately clear high-cost state when entering dark mode
          agentsRef.current.length = 0;
          trailRef.current.length = 0;
          featuresEnabledRef.current.agents = false;
          // clear drawing buffers to remove previously drawn connection ribbons
          // Avoid immediate heavy clears during navigation; schedule in RAF but skip if nav is in-flight
          requestAnimationFrame(() => {
            if (document.body.hasAttribute('data-nav-in-flight')) return;
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            try {
              ctx?.clearRect?.(0, 0, canvas.width, canvas.height);
            } catch {}
          });
        } else {
          // Defer any re-init work (resize/agents) to the next animation frame to avoid synchronous work
          needsResize = true;
          requestAnimationFrame(() => {
            try {
              // Don't run resize while a navigation is in-flight
              if (document.visibilityState === 'visible' && !document.body.hasAttribute('data-nav-in-flight')) {
                resize();
              }
            } catch {}
            needsResize = false;
          });
        }
      };
      type LegacyMediaQueryList = MediaQueryList & {
        addListener?: (listener: (event: MediaQueryListEvent) => void) => void;
        removeListener?: (listener: (event: MediaQueryListEvent) => void) => void;
      };
      const themeListener = (event: MediaQueryListEvent): void => {
        // Debounce rapid media query events
        try {
          if (themeChangeTimer) clearTimeout(themeChangeTimer);
        } catch {}
        pendingThemeMatches = event.matches;
        themeChangeTimer = window.setTimeout(() => {
          if (pendingThemeMatches !== null) applyThemeChange(pendingThemeMatches);
          pendingThemeMatches = null;
          themeChangeTimer = null;
        }, 80);
      };
      if (mq) {
        try {
          if ('addEventListener' in mq && typeof mq.addEventListener === 'function') {
            mq.addEventListener('change', themeListener);
          } else {
            (mq as LegacyMediaQueryList).addListener?.(themeListener);
          }
        } catch {}
      }

      // Observe body for class mutations (narrower than documentElement) and debounce updates
      const classObserver = new MutationObserver((muts) => {
        // Quick check for any class attribute change
        let saw = false;
        for (const m of muts) {
          if (m.type === 'attributes' && m.attributeName === 'class') {
            saw = true;
            break;
          }
        }
        if (!saw) return;
        try {
          const hasDarkClass = document.documentElement.classList.contains('dark');
          if (themeChangeTimer) clearTimeout(themeChangeTimer as number);
          pendingThemeMatches = hasDarkClass;
          themeChangeTimer = window.setTimeout(() => {
            if (pendingThemeMatches !== null) applyThemeChange(pendingThemeMatches);
            pendingThemeMatches = null;
            themeChangeTimer = null;
          }, 80);
        } catch {}
      });
      try {
        classObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });
      } catch {
        // Fallback to observing documentElement if body isn't available for any reason
        try {
          classObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        } catch {}
      }

      const TARGET_MAX_PARTICLES = prefersReducedMotion ? 400 : 1100; // further lowered
      let dynamicMax = Math.min(140, TARGET_MAX_PARTICLES); // progressive ramp
      const rampStart = performance.now();
      // double buffer (offscreen) for heavier draws (lines + gradients)
      const bufferCanvas = document.createElement('canvas');
      let bctx: CanvasRenderingContext2D | null = null;
      try {
        bctx = bufferCanvas.getContext('2d', { alpha: true });
      } catch {
        bctx = null;
      }

      // Robust dark-mode detection fallback: compute background luminance of the closest container
      const isBackgroundDark = (): boolean => {
        try {
          const el = canvas.parentElement ?? document.documentElement;
          const cs = window.getComputedStyle(el);
          const bg = cs.backgroundColor || cs.background || '';
          // parse rgb(a) or hex
          let r = 0,
            g = 0,
            b = 0;
          const rgbMatch = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
          if (rgbMatch) {
            r = Number(rgbMatch[1]);
            g = Number(rgbMatch[2]);
            b = Number(rgbMatch[3]);
          } else {
            const hexMatch = bg.match(/#([0-9a-f]{6})/i);
            if (hexMatch && hexMatch[1]) {
              const hex = hexMatch[1];
              r = parseInt(hex.substring(0, 2), 16);
              g = parseInt(hex.substring(2, 4), 16);
              b = parseInt(hex.substring(4, 6), 16);
            }
          }
          const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255; // relative luminance
          return lum < 0.45; // threshold — tweakable
        } catch {
          return false;
        }
      };

      function resize(): void {
        if (!context) return;
        // Ensure canvas has valid client dimensions
        if (canvas.clientWidth === 0 || canvas.clientHeight === 0) return;

        canvas.width = canvas.clientWidth * window.devicePixelRatio;
        canvas.height = canvas.clientHeight * window.devicePixelRatio;
        bufferCanvas.width = canvas.width;
        bufferCanvas.height = canvas.height;
        context.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
        bctx?.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
        // initialize autonomous agents after first real dimensions known
        if (agentsRef.current.length === 0 && !isDark) {
          const logicalW = canvas.width / window.devicePixelRatio;
          const logicalH = canvas.height / window.devicePixelRatio;
          const count = 3; // three agents
          for (let i = 0; i < count; i++) {
            const ang = Math.random() * Math.PI * 2;
            const spd = 0.35 + Math.random() * 0.5;
            agentsRef.current.push({
              x: logicalW * (0.2 + Math.random() * 0.6),
              y: logicalH * (0.2 + Math.random() * 0.6),
              vx: Math.cos(ang) * spd,
              vy: Math.sin(ang) * spd,
              nextDirAt: performance.now() + 1800 + Math.random() * 3000,
              lastSpawn: 0,
            });
          }
        }
      }
      resize();
      window.addEventListener('resize', resize);

      const PALETTE: [number, number, number][] = [
        [255, 255, 255], // white (replaces prior light purple)
        [179, 134, 0], // dark gold
        [255, 215, 0], // bright gold
        [102, 106, 112], // grey
        [217, 220, 224], // light grey
      ];

      function spawnBurst(x: number, y: number): void {
        for (let i = 0; i < 7; i++) {
          const angle = Math.random() * Math.PI * 6;
          const speed = 0.7 + Math.random() * 1.2;
          const color = PALETTE[Math.floor(Math.random() * PALETTE.length)]!; // non-null assertion
          particlesRef.current.push({
            x,
            y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 140 + Math.random() * 60,
            color,
          });
        }
      }

      // initialize ambient schedule now that performance.now is available
      ambientRef.current.nextAt = performance.now() + 1200;
      pulseRef.current.nextAt = performance.now() + 3200 + Math.random() * 3000; // first pulse 3.2s - 6.2s (delayed)
      function spawnAmbient(): void {
        const logicalW = canvas.width / window.devicePixelRatio;
        const logicalH = canvas.height / window.devicePixelRatio;
        // Increase ambient activity (on-screen only). Pointer bursts remain unchanged.
        // Light: 2-4 ambient particles every ~0.5-1.2s
        // Dark: 4-7 ambient particles every ~0.35-0.9s
        const count = isDark ? 4 + Math.floor(Math.random() * 4) : 2 + Math.floor(Math.random() * 3);
        for (let i = 0; i < count; i++) {
          const x = Math.random() * logicalW;
          const y = Math.random() * logicalH;
          const angle = Math.random() * Math.PI * 2;
          const speed = 0.45 + Math.random() * 0.35;
          const color = PALETTE[Math.floor(Math.random() * PALETTE.length)]!;
          particlesRef.current.push({
            x,
            y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed * 0.6,
            life: 180 + Math.random() * 140,
            color,
          });
        }
        // schedule next ambient burst with variability (more frequent in dark mode)
        ambientRef.current.nextAt =
          performance.now() + (isDark ? 350 + Math.random() * 550 : 500 + Math.random() * 700);
      }

      function spawnPulse(cx: number, cy: number): void {
        const rings = 2 + Math.floor(Math.random() * 2); // 2-3 rings
        for (let r = 0; r < rings; r++) {
          const radius = 14 + r * 10;
          const particles = 28 + r * 6;
          for (let i = 0; i < particles; i++) {
            const angle = (i / particles) * Math.PI * 2;
            const speed = 0.8 + r * 0.15;
            particlesRef.current.push({
              x: cx + Math.cos(angle) * radius * 0.4,
              y: cy + Math.sin(angle) * radius * 0.4,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              life: 110 + Math.random() * 40,
              color: [255, 255, 255],
            });
          }
        }
      }

      function tick(ts: number): void {
        rafRef.current = requestAnimationFrame(tick);
        if (!context || canvas.width === 0 || canvas.height === 0) return; // safety check for canvas dimensions
        const delta = ts - lastFrameRef.current;
        lastFrameRef.current = ts;
        // cadence dampening: when tab hidden or frames are long, skip every other frame heavy work
        const longFrame = delta > 34; // ~ <30fps region
        const hidden = typeof document !== 'undefined' && document.visibilityState === 'hidden';
        frameSkipToggleRef.current = !frameSkipToggleRef.current;
        const skipHeavy = (longFrame && frameSkipToggleRef.current) || hidden;

        const drawCtx = bctx ?? context;
        drawCtx.clearRect(0, 0, canvas.width, canvas.height);
        const logicalW = canvas.width / window.devicePixelRatio;
        const logicalH = canvas.height / window.devicePixelRatio;

        // subtle gradient background fade
        const grad = drawCtx.createLinearGradient(0, 0, logicalW, logicalH);
        grad.addColorStop(0, 'rgba(255,255,255,0.02)');
        grad.addColorStop(1, 'rgba(255,255,255,0.00)');
        drawCtx.fillStyle = grad;
        drawCtx.fillRect(0, 0, logicalW, logicalH);

        if (pointerRef.current.active && ts - lastSpawnRef.current > (prefersReducedMotion ? 60 : 22)) {
          spawnBurst(pointerRef.current.x, pointerRef.current.y);
          lastSpawnRef.current = ts;
        }

        // ambient spawn check
        if (ts >= ambientRef.current.nextAt && !prefersReducedMotion) {
          spawnAmbient();
        }

        // Re-evaluate dark mode at runtime to ensure immediate response to theme changes
        const nowDark = (() => {
          try {
            return (
              (mq ? mq.matches : false) || document.documentElement.classList.contains('dark') || isBackgroundDark()
            );
          } catch {
            return isDark;
          }
        })();
        if (nowDark !== isDark) {
          isDark = nowDark;
          if (isDark) {
            // clear agents/trails immediately when entering dark
            agentsRef.current.length = 0;
            trailRef.current.length = 0;
            featuresEnabledRef.current.agents = false;
            // Clear drawing buffers to remove any previously drawn connection ribbons
            try {
              if (bctx) {
                bctx.clearRect(0, 0, bufferCanvas.width, bufferCanvas.height);
              }
              if (context) {
                context.clearRect(0, 0, canvas.width, canvas.height);
              }
            } catch {}
          } else {
            // re-init agents on exit from dark (resize will create them)
            try {
              resize();
            } catch {}
          }
        }

        // pulses
        // enable pulses & auto cursor after small delay to reduce main-thread contention
        if (!featuresEnabledRef.current.pulses && ts - rampStart > 2200) {
          featuresEnabledRef.current.pulses = true;
        }
        // Only enable autonomous agents when not in dark mode (they cause visible moving anchors)
        if (!featuresEnabledRef.current.agents && ts - rampStart > 1600) {
          featuresEnabledRef.current.agents = !isDark;
        }

        if (featuresEnabledRef.current.pulses && ts >= pulseRef.current.nextAt && !prefersReducedMotion && !skipHeavy) {
          const logicalW2 = canvas.width / window.devicePixelRatio;
          const logicalH2 = canvas.height / window.devicePixelRatio;
          const px = pointerRef.current.active
            ? pointerRef.current.x
            : logicalW2 * 0.5 + (Math.random() * 0.4 - 0.2) * logicalW2 * 0.6;
          const py = pointerRef.current.active
            ? pointerRef.current.y
            : logicalH2 * 0.5 + (Math.random() * 0.4 - 0.2) * logicalH2 * 0.6;
          spawnPulse(px, py);
          pulseRef.current.nextAt = ts + 4000 + Math.random() * 6000; // 4s - 10s
        }

        // autonomous agents logic
        if (featuresEnabledRef.current.agents && !prefersReducedMotion) {
          const logicalW = canvas.width / window.devicePixelRatio;
          const logicalH = canvas.height / window.devicePixelRatio;
          const trailMaxAge = 1600;
          for (const agent of agentsRef.current) {
            if (ts >= agent.nextDirAt) {
              const ang = Math.random() * Math.PI * 2;
              const spd = 0.45 + Math.random() * 0.65;
              agent.vx = Math.cos(ang) * spd;
              agent.vy = Math.sin(ang) * spd;
              agent.nextDirAt = ts + 1800 + Math.random() * 3800;
            }
            agent.x += agent.vx;
            agent.y += agent.vy;
            if (agent.x < 16) {
              agent.x = 16;
              agent.vx *= -1;
            } else if (agent.x > logicalW - 16) {
              agent.x = logicalW - 16;
              agent.vx *= -1;
            }
            if (agent.y < 16) {
              agent.y = 16;
              agent.vy *= -1;
            } else if (agent.y > logicalH - 16) {
              agent.y = logicalH - 16;
              agent.vy *= -1;
            }
            if (ts - agent.lastSpawn > (prefersReducedMotion ? 520 : 160 + Math.random() * 120)) {
              spawnBurst(agent.x, agent.y);
              agent.lastSpawn = ts;
            }
            trailRef.current.push({ x: agent.x, y: agent.y, ts });
          }
          // prune old trail entries
          while (trailRef.current.length && ts - (trailRef.current[0]?.ts ?? 0) > trailMaxAge) {
            trailRef.current.shift();
          }
          // draw combined trail
          if (trailRef.current.length > 5 && !skipHeavy) {
            drawCtx.lineWidth = 1.1;
            drawCtx.lineCap = 'round';
            drawCtx.lineJoin = 'round';
            for (let i = 1; i < trailRef.current.length; i++) {
              const a = trailRef.current[i - 1];
              const b = trailRef.current[i];
              if (!a || !b) continue;
              const age = ts - b.ts;
              const alpha = Math.max(0, 1 - age / trailMaxAge);
              if (alpha <= 0) continue;
              drawCtx.strokeStyle = `rgba(255,255,255,${alpha * 0.18})`;
              drawCtx.beginPath();
              drawCtx.moveTo(a.x, a.y);
              drawCtx.lineTo(b.x, b.y);
              drawCtx.stroke();
            }
          }
        }

        // progressive ramp of particle ceiling to avoid long tasks during initial load
        const elapsed = ts - rampStart;
        if (elapsed < 6000) {
          // ramp over 6s
          const progress = elapsed / 6000;
          dynamicMax = Math.min(TARGET_MAX_PARTICLES, 140 + Math.floor(progress * (TARGET_MAX_PARTICLES - 140)));
        } else {
          dynamicMax = TARGET_MAX_PARTICLES;
        }

        // In dark mode we suppress particle connection lines and heavy agent trails so only particles remain
        const suppressConnections = elapsed < 1800 || skipHeavy || isDark; // delay & dampen
        const next: Particle[] = [];
        for (const p of particlesRef.current) {
          p.x += p.vx;
          p.y += p.vy;
          p.life -= 1;
          p.vy += 0.004; // gentle drift
          // slight attraction toward pointer when active
          if (pointerRef.current.active) {
            const dx = pointerRef.current.x - p.x;
            const dy = pointerRef.current.y - p.y;
            const dist2 = dx * dx + dy * dy;
            if (dist2 < 40000) {
              // within ~200px
              const f = 0.0006 * (1 - dist2 / 40000);
              p.vx += dx * f;
              p.vy += dy * f;
            }
          }
          if (p.life <= 0) continue;
          // wrap softly
          if (p.x < -10 || p.x > logicalW + 10 || p.y < -10 || p.y > logicalH + 10) continue;
          const alpha = Math.min(1, p.life / 160);
          drawCtx.beginPath();
          const [r, g, b] = p.color;
          drawCtx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
          drawCtx.arc(p.x, p.y, 1.6 + (1 - alpha) * 1.2, 0, Math.PI * 2);
          drawCtx.fill();
          // connection lines
          if (!suppressConnections) {
            // Throttle connection density: only attempt when particle index is even and limit neighbor checks
            let checked = 0;
            const MAX_CHECKS = 22; // cap comparisons per particle to bound cost
            for (let qi = next.length - 1; qi >= 0 && checked < MAX_CHECKS; qi--) {
              const q = next[qi];
              if (!q) continue;
              const dx = p.x - q.x;
              const dy = p.y - q.y;
              const d2 = dx * dx + dy * dy;
              if (d2 < 1000) {
                const [qr, qg, qb] = q.color;
                const mr = Math.round((r + qr) / 2);
                const mg = Math.round((g + qg) / 2);
                const mb = Math.round((b + qb) / 2);
                drawCtx.strokeStyle = `rgba(${mr},${mg},${mb},${0.1 - (d2 / 1000) * 0.1})`;
                drawCtx.lineWidth = 1;
                drawCtx.beginPath();
                drawCtx.moveTo(p.x, p.y);
                drawCtx.lineTo(q.x, q.y);
                drawCtx.stroke();
              }
              checked++;
            }
          }
          next.push(p);
        }
        // cap particle count to avoid runaway growth
        if (next.length > dynamicMax) {
          next.splice(0, next.length - dynamicMax);
        }
        particlesRef.current = next;

        // composite buffer to visible canvas once per frame
        if (bctx && bufferCanvas.width > 0 && bufferCanvas.height > 0) {
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(bufferCanvas, 0, 0);
        }
      }
      rafRef.current = requestAnimationFrame(tick);

      function onPointer(e: PointerEvent): void {
        const rect = canvas.getBoundingClientRect();
        pointerRef.current.x = e.clientX - rect.left;
        pointerRef.current.y = e.clientY - rect.top;
        pointerRef.current.active = true;
      }
      function onLeave(): void {
        pointerRef.current.active = false;
      }
      canvas.addEventListener('pointermove', onPointer);
      canvas.addEventListener('pointerdown', onPointer);
      canvas.addEventListener('pointerup', onLeave);
      canvas.addEventListener('pointerleave', onLeave);

      return () => {
        window.removeEventListener('resize', resize);
        canvas.removeEventListener('pointermove', onPointer);
        canvas.removeEventListener('pointerdown', onPointer);
        canvas.removeEventListener('pointerup', onLeave);
        canvas.removeEventListener('pointerleave', onLeave);
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        // cleanup theme listeners
        try {
          if (mq) {
            if ('removeEventListener' in mq && typeof mq.removeEventListener === 'function') {
              mq.removeEventListener('change', themeListener);
            }
            (mq as LegacyMediaQueryList).removeListener?.(themeListener);
          }
        } catch {}
        try {
          classObserver.disconnect();
        } catch {}
      };
    }); // end scheduled initialization
  }, []);

  return (
    <div
      data-testid="particle-field"
      className="relative w-full h-[380px] sm:h-[460px] md:h-[520px] rounded-xl overflow-hidden bg-gradient-to-br from-accent/5 via-transparent to-accent/10 border border-foreground/1 border-[#d4af3799]"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />
    </div>
  );
}
