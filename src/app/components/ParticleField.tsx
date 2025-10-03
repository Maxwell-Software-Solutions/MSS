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
    const schedule =
      typeof window.requestIdleCallback === 'function'
        ? window.requestIdleCallback
        : (cb: () => void) => window.setTimeout(cb, 60);

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

      function resize(): void {
        if (!context) return;
        canvas.width = canvas.clientWidth * window.devicePixelRatio;
        canvas.height = canvas.clientHeight * window.devicePixelRatio;
        bufferCanvas.width = canvas.width;
        bufferCanvas.height = canvas.height;
        context.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
        bctx?.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
        // initialize autonomous agents after first real dimensions known
        if (agentsRef.current.length === 0) {
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
        const count = 1 + Math.floor(Math.random() * 2); // 1-2 subtle particles
        for (let i = 0; i < count; i++) {
          const x = Math.random() * logicalW;
          const y = Math.random() * logicalH;
          const angle = Math.random() * Math.PI * 2;
          const speed = 0.4 + Math.random() * 0.3;
          const color = PALETTE[Math.floor(Math.random() * PALETTE.length)]!;
          particlesRef.current.push({
            x,
            y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed * 0.6,
            life: 220 + Math.random() * 120,
            color,
          });
        }
        // schedule next ambient burst with variability
        ambientRef.current.nextAt = performance.now() + 1000 + Math.random() * 2500; // 1s - 3.5s
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
        if (!context) return; // safety
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

        // pulses
        // enable pulses & auto cursor after small delay to reduce main-thread contention
        if (!featuresEnabledRef.current.pulses && ts - rampStart > 2200) {
          featuresEnabledRef.current.pulses = true;
        }
        if (!featuresEnabledRef.current.agents && ts - rampStart > 1600) {
          featuresEnabledRef.current.agents = true;
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

        const suppressConnections = elapsed < 1800 || skipHeavy; // delay & dampen
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
        if (bctx) {
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
      };
    }); // end scheduled initialization
  }, []);

  return (
    <div
      data-testid="particle-field"
      className="relative w-full h-[380px] sm:h-[460px] md:h-[520px] rounded-xl overflow-hidden bg-gradient-to-br from-accent/5 via-transparent to-accent/10 border border-foreground/10"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />
    </div>
  );
}
