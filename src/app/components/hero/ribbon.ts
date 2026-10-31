/**
 * "Noise into signal": a ribbon of thin lines, jagged on the left, resolving into a calm twisting
 * wave on the right. This file draws the static poster; RIBBON_GLSL in ribbonRenderer.ts is the same
 * formula for the live version, and it starts from the same moment so the two line up.
 */

export const RIBBON_START_TIME = 45;

export const ribbonRows = (cssWidth: number): number => (cssWidth < 768 ? 56 : 104);

export const ribbonColumns = (cssWidth: number): number =>
  Math.round(cssWidth < 768 ? Math.min(150, Math.max(90, cssWidth / 3)) : Math.min(420, Math.max(220, cssWidth / 4.5)));

const TAU = Math.PI * 2;

const smoothstep = (from: number, to: number, x: number): number => {
  const k = Math.min(1, Math.max(0, (x - from) / (to - from)));
  return k * k * (3 - 2 * k);
};

function rnd(a: number, b: number): number {
  let x = (Math.imul(a, 73856093) ^ Math.imul(b, 19349663)) >>> 0;
  x ^= x >>> 13;
  x = Math.imul(x, 1274126177) >>> 0;
  x ^= x >>> 16;
  return (x >>> 0) / 4294967295;
}

function jagged(x: number, r: number): number {
  const i = Math.floor(x);
  const from = rnd(i, r);
  return (from + (rnd(i + 1, r) - from) * (x - i)) * 2 - 1;
}

function swell(x: number, r: number): number {
  const i = Math.floor(x);
  const from = rnd(i, r);
  return (from + (rnd(i + 1, r) - from) * smoothstep(0, 1, x - i)) * 2 - 1;
}

function body(x: number, g: number): number {
  const i = Math.floor(g);
  const from = swell(x, i);
  return from + (swell(x, i + 1) - from) * smoothstep(0, 1, g - i);
}

function ribbonY(sx: number, row: number, rows: number, t: number): number {
  const v = row / (rows - 1) - 0.5;
  const order = smoothstep(0.3, 0.66, sx);
  const spine =
    0.86 -
    0.38 * smoothstep(0.08, 1, sx) +
    0.038 * Math.sin(TAU * 0.87 * sx - 0.29 * t + 0.6) +
    0.014 * Math.sin(TAU * 2.13 * sx - 0.17 * t + 2.2);
  const twist =
    6.4 * sx -
    0.24 * t +
    0.8 * Math.sin(TAU * 0.41 * sx - 0.13 * t + 0.7) +
    0.32 * Math.sin(TAU * 1.07 * sx - 0.29 * t + 2.6) +
    0.55 * v * Math.sin(TAU * 0.53 * sx - 0.11 * t + 1.9);
  const width =
    (0.5 + 0.09 * Math.sin(TAU * 0.7 * sx - 0.21 * t + 2) + 0.04 * Math.sin(TAU * 1.9 * sx + 0.16 * t)) *
    (0.28 + 0.72 * order);
  const dy = v * width * Math.cos(twist);
  const p = 1 / (1 + 1.1 * v * width * Math.sin(twist));
  const tremor =
    0.0012 * Math.sin(TAU * (7.3 * sx + 1.1 * v) - 0.8 * t) +
    0.0008 * Math.sin(TAU * (11.9 * sx - 1.7 * v) - 0.7 * t + 1.3) +
    0.0005 * Math.sin(TAU * (19.1 * sx + 0.6 * v) - 1.2 * t + 4.1);
  let rough = 0;
  if (order < 1) {
    const across = v + 0.5;
    const gate = 0.5 + 0.5 * body(sx * 2.3 - t * 0.17, across * 3 + 31);
    rough =
      (0.048 * body(sx * 7 - t * 0.55, across * 8) +
        0.024 * body(sx * 19 - t * 1.1, across * 24 + 50) +
        0.024 * jagged(sx * 47 - t * 2.2, row) +
        0.012 * jagged(sx * 113 - t * 3.6, row + 97)) *
      (0.45 + 1.1 * gate * gate) *
      (0.6 + 0.8 * rnd(row, 7)) *
      (1 - order);
  }
  return spine + dy * p + tremor + rough;
}
export const POSTER_VIEWBOX = '0 0 3200 2000';

/** One path per line, in whole units of a 3200 x 2000 box that stretches to fit the hero. */
export function ribbonPosterLines(rows = 56): Array<{ d: string; opacity: number }> {
  const lines: Array<{ d: string; opacity: number }> = [];
  for (let row = 0; row < rows; row++) {
    let d = '';
    let px = 0;
    let py = 0;
    for (let sx = -0.02; sx <= 1.02; sx += sx < 0.62 ? 0.009 : 0.012) {
      const x = Math.round(sx * 3200);
      const y = Math.round(ribbonY(sx, row, rows, RIBBON_START_TIME) * 2000);
      d += d ? `l${x - px} ${y - py}` : `M${x} ${y}`;
      px = x;
      py = y;
    }
    const depth = row / (rows - 1);
    lines.push({ d, opacity: Math.round((0.16 + 0.7 * depth * depth) * 100) / 100 });
  }
  return lines;
}
