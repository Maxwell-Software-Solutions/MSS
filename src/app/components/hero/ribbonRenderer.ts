/**
 * Small WebGL2 renderer for the hero ribbon. Every line segment is a quad expanded in the vertex
 * shader, so lines stay crisp at any pixel density and nothing is uploaded per frame.
 * The formula in RIBBON_GLSL mirrors ribbonY() in ribbon.ts, which draws the static poster.
 */
import { RIBBON_START_TIME, ribbonColumns, ribbonRows } from './ribbon';

const RIBBON_GLSL = /* glsl */ `
const float TAU = 6.2831853;

float rnd(int a, int b) {
  uint x = uint(a) * 73856093u ^ uint(b) * 19349663u;
  x ^= x >> 13u; x *= 1274126177u; x ^= x >> 16u;
  return float(x) / 4294967295.0;
}

// straight runs between lattice values: the fine, jagged part of the noise
float jagged(float x, int r) {
  float f = floor(x);
  int i = int(f);
  return mix(rnd(i, r), rnd(i + 1, r), x - f) * 2.0 - 1.0;
}

float swell(float x, int r) {
  float f = floor(x);
  int i = int(f);
  float w = x - f;
  return mix(rnd(i, r), rnd(i + 1, r), w * w * (3.0 - 2.0 * w)) * 2.0 - 1.0;
}

// varies smoothly from line to line, so the bundle moves as one body rather than as static
float body(float x, float g) {
  float f = floor(g);
  int i = int(f);
  float w = g - f;
  return mix(swell(x, i), swell(x, i + 1), w * w * (3.0 - 2.0 * w));
}

// x, y in hero units, z = line weight from nearness, w = order (0 noise, 1 signal)
vec4 ribbon(float sx, float row, float rows, float t) {
  float v = row / (rows - 1.0) - 0.5;
  float order = smoothstep(0.30, 0.66, sx);
  float spine = 0.86 - 0.38 * smoothstep(0.08, 1.0, sx)
    + 0.038 * sin(TAU * 0.87 * sx - 0.29 * t + 0.6)
    + 0.014 * sin(TAU * 2.13 * sx - 0.17 * t + 2.2);
  // incommensurate terms: no two lobes match and the shape never repeats
  float twist = 6.4 * sx - 0.24 * t
    + 0.80 * sin(TAU * 0.41 * sx - 0.13 * t + 0.7)
    + 0.32 * sin(TAU * 1.07 * sx - 0.29 * t + 2.6)
    + 0.55 * v * sin(TAU * 0.53 * sx - 0.11 * t + 1.9);
  // the cursor leans the surface a little; it does not dent it
  vec2 lean = (vec2(sx, spine) - uMouse.xy) / vec2(0.14, 0.34);
  twist += uMouse.z * exp(-dot(lean, lean));
  float width = (0.50 + 0.09 * sin(TAU * 0.70 * sx - 0.21 * t + 2.0) + 0.04 * sin(TAU * 1.90 * sx + 0.16 * t))
    * (0.28 + 0.72 * order);
  float dy = v * width * cos(twist);
  float p = 1.0 / (1.0 + 1.1 * v * width * sin(twist));
  // the noise never quite goes: a small live tremor stays in the ordered lines
  float tremor = 0.0012 * sin(TAU * (7.3 * sx + 1.1 * v) - 0.8 * t)
               + 0.0008 * sin(TAU * (11.9 * sx - 1.7 * v) - 0.7 * t + 1.3)
               + 0.0005 * sin(TAU * (19.1 * sx + 0.6 * v) - 1.2 * t + 4.1);
  float rough = 0.0;
  if (order < 1.0) {
    int r = int(row);
    float across = v + 0.5;
    float gate = 0.5 + 0.5 * body(sx * 2.3 - t * 0.17, across * 3.0 + 31.0);
    // each scale drifts at its own speed, so the noise keeps changing shape as it flows
    rough = (0.048 * body(sx * 7.0 - t * 0.55, across * 8.0)
           + 0.024 * body(sx * 19.0 - t * 1.10, across * 24.0 + 50.0)
           + 0.024 * jagged(sx * 47.0 - t * 2.20, r)
           + 0.012 * jagged(sx * 113.0 - t * 3.60, r + 97))
      * (0.45 + 1.1 * gate * gate) * (0.6 + 0.8 * rnd(r, 7)) * (1.0 - order);
  }
  return vec4(sx, spine + dy * p + tremor + rough, clamp(p - 0.4, 0.25, 1.0), order);
}
`;

const VERTEX = /* glsl */ `#version 300 es
precision highp float;
precision highp int;
in vec2 aCell;
in vec2 aCorner;
uniform vec2 uGrid;
uniform vec2 uRes;
uniform vec2 uBand;
uniform vec2 uSpan;
uniform float uT;
uniform float uPx;
uniform float uReveal;
uniform vec3 uPulse;
uniform vec3 uMouse;
uniform vec4 uCopy;
out float vD;
out float vHalf;
out vec4 vColor;
${RIBBON_GLSL}
vec4 place(float col, float row) {
  vec4 q = ribbon(mix(-0.02, 1.02, col / uGrid.x), row, uGrid.y, uT);
  return vec4(vec2(uSpan.x + uSpan.y * q.x, uBand.x + uBand.y * q.y) * uRes, q.z, q.w);
}
void main() {
  float end = aCorner.x;
  float side = aCorner.y;
  float row = aCell.y;
  vec4 a = place(aCell.x, row);
  vec4 b = place(aCell.x + 1.0, row);
  vec4 here = end < 0.5 ? a : b;
  vec2 dir = b.xy - a.xy;
  dir /= max(length(dir), 0.001);
  vec2 n = vec2(-dir.y, dir.x);

  float depth = row / (uGrid.y - 1.0);
  float order = here.w;
  float sx = here.x / uRes.x;

  // draw-on: each line has its own pen; the front runs in from the left and slows as it arrives
  float delay = rnd(int(row), 91) * 0.5;
  float u = clamp((uReveal - delay) / 2.6, 0.0, 1.0);
  u = 1.0 - pow(1.0 - u, 2.2);
  float front = u * 1.26 - 0.13;
  float drawn = 1.0 - smoothstep(front - 0.05, front, sx);
  float tip = 0.3 * exp(-pow((sx - front + 0.02) / 0.03, 2.0)) * (1.0 - smoothstep(2.2, 3.0, uReveal));

  // soft gold lights travel along the ordered side of the ribbon, following its twist, each one
  // uPulse.z behind the last and each on a different part of the bundle
  float along = sx + 0.3 * depth - uPulse.x;
  float which = floor(along / uPulse.z + 0.5);
  float s = along - which * uPulse.z;
  float across = exp(-pow((depth - 0.35 - 0.4 * fract(which * 0.618)) / 0.6, 2.0));
  float band = exp(-s * s / 0.0028);
  float tail = s < 0.0 ? exp(s / 0.1) : 0.0;
  float pulse = clamp((band + 0.4 * tail) * across * order * order * uPulse.y, 0.0, 1.0);

  float lift = max(pulse, tip);
  float base = mix(0.16, 0.86, depth * depth) * (0.8 + 0.2 * order);
  float alpha = mix(base, 1.0, lift) * drawn;
  // fades out under the text block; the floor keeps every text colour above 4.5:1
  float cover = (1.0 - smoothstep(uCopy.x, uCopy.x + uCopy.z, here.x))
              * (1.0 - smoothstep(uCopy.y, uCopy.y + uCopy.w, here.y));
  alpha *= 1.0 - 0.78 * cover;
  vec3 rgb = mix(vec3(0.92), vec3(0.788, 0.635, 0.153), lift);
  vColor = vec4(rgb * alpha, alpha);

  float halfW = uPx * mix(0.36, 0.62, here.z);
  vHalf = halfW;
  vD = side * (halfW + 1.0);
  vec2 pos = here.xy + n * vD + dir * (end * 2.0 - 1.0) * halfW * 0.5;
  gl_Position = vec4(pos.x / uRes.x * 2.0 - 1.0, 1.0 - pos.y / uRes.y * 2.0, 0.0, 1.0);
}`;

const FRAGMENT = /* glsl */ `#version 300 es
precision highp float;
in float vD;
in float vHalf;
in vec4 vColor;
out vec4 color;
void main() {
  color = vColor * clamp(vHalf + 0.5 - abs(vD), 0.0, 1.0);
}`;

export interface RibbonHandle {
  setVisible(visible: boolean): void;
  /** The visitor's pause control. */
  setPaused(paused: boolean): void;
  /** Reduced motion: no draw-on and no cursor lean. The drift and the light are the same for everyone. */
  setReduced(reduced: boolean): void;
  stop(): void;
}

interface RibbonOptions {
  reduced: boolean;
  /** Called once the first frame is on screen, when the poster can give way. */
  onReady: () => void;
  /** Called if the GPU context goes away or the GPU is too slow, so the poster can come back. */
  onLost: () => void;
}

// The ribbon arrives with some energy, then keeps a drift you can see at a glance. Speeds are relative
// to the formula's own clock.
const ARRIVAL_SPEED = 0.9;
const DRIFT_SPEED = 0.5;
const SETTLE_SECONDS = 3.5;

// Once settled the motion is slow enough that every other frame is imperceptible, and half the GPU work
const SETTLED_AFTER = 8;

// A gold light is always on its way along the ribbon: one is already bright on the first frame and a new
// one sets off every 4 seconds, so nobody waits to see something move.
const LIGHT_START = 0.85;
const LIGHT_SPEED = 0.15;
const LIGHT_SPACING = 0.6;
const LIGHT_STRENGTH = 0.95;
const CURSOR_LEAN = 0.07;
// Past the end of the draw-on: every line is simply there, for reduced motion and after a pause
const FULLY_DRAWN = 99;

function buildProgram(gl: WebGL2RenderingContext): WebGLProgram | null {
  const program = gl.createProgram();
  const parts = [
    [gl.VERTEX_SHADER, VERTEX],
    [gl.FRAGMENT_SHADER, FRAGMENT],
  ] as const;
  if (!program) return null;
  for (const [type, source] of parts) {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    gl.attachShader(program, shader);
  }
  gl.bindAttribLocation(program, 0, 'aCell');
  gl.bindAttribLocation(program, 1, 'aCorner');
  gl.linkProgram(program);
  return gl.getProgramParameter(program, gl.LINK_STATUS) ? program : null;
}

export function startRibbon(
  canvas: HTMLCanvasElement,
  stage: HTMLElement,
  copy: HTMLElement,
  poster: Element,
  options: RibbonOptions
): RibbonHandle | null {
  const context = canvas.getContext('webgl2', {
    alpha: true,
    antialias: false,
    depth: false,
    stencil: false,
    premultipliedAlpha: true,
    failIfMajorPerformanceCaveat: true,
  });
  if (!context || typeof context.createShader !== 'function') return null;
  const gl: WebGL2RenderingContext = context;

  const program = buildProgram(gl);
  const corners = gl.createBuffer();
  const cells = gl.createBuffer();
  if (!program || !corners || !cells) return null;

  const uniform = (name: string): WebGLUniformLocation | null => gl.getUniformLocation(program, name);
  const u = {
    grid: uniform('uGrid'),
    res: uniform('uRes'),
    band: uniform('uBand'),
    span: uniform('uSpan'),
    t: uniform('uT'),
    px: uniform('uPx'),
    reveal: uniform('uReveal'),
    pulse: uniform('uPulse'),
    mouse: uniform('uMouse'),
    copy: uniform('uCopy'),
  };

  gl.useProgram(program);
  // one quad per line segment: which end of the segment, and which side of the line
  gl.bindBuffer(gl.ARRAY_BUFFER, corners);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, -1, 0, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(1);
  gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ARRAY_BUFFER, cells);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  gl.vertexAttribDivisor(0, 1);
  gl.enable(gl.BLEND);
  // brightest wins: joints and crossings stay crisp instead of adding up into haze
  gl.blendEquation(gl.MAX);
  gl.blendFunc(gl.ONE, gl.ONE);
  gl.clearColor(0, 0, 0, 0);

  let cols = 0;
  let rows = 0;
  let width = 0;
  let height = 0;
  let dpr = 1;
  let quality = 1;
  let layoutDirty = true;

  function layout(): void {
    layoutDirty = false;
    const cssWidth = stage.clientWidth;
    const cssHeight = stage.clientHeight;
    const stageBox = stage.getBoundingClientRect();
    const copyBox = copy.getBoundingClientRect();
    const posterBox = poster.getBoundingClientRect();
    // on phones the poster runs wider than the stage; the lines keep the same density across it
    const span = posterBox.width / stageBox.width;
    // at least two samples per CSS pixel, even on standard screens: dense lines stay smooth, not shimmering
    dpr = quality < 1 ? 1 : Math.min(3, Math.max(2, window.devicePixelRatio || 1));
    width = Math.round(cssWidth * dpr);
    height = Math.round(cssHeight * dpr);
    canvas.width = width;
    canvas.height = height;
    gl.viewport(0, 0, width, height);

    const nextRows = Math.round(ribbonRows(cssWidth) * quality);
    const nextCols = Math.round(ribbonColumns(cssWidth * span) * quality);
    if (nextRows !== rows || nextCols !== cols) {
      rows = nextRows;
      cols = nextCols;
      const data = new Float32Array(rows * cols * 2);
      let i = 0;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          data[i++] = c;
          data[i++] = r;
        }
      }
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    }

    const band = posterBox.height / stageBox.height;
    gl.uniform2f(u.grid, cols, rows);
    gl.uniform2f(u.res, width, height);
    gl.uniform1f(u.px, dpr);
    // CSS places the poster; the live lines draw into the same box so the two line up
    gl.uniform2f(u.band, (posterBox.top - stageBox.top) / stageBox.height, band);
    gl.uniform2f(u.span, (posterBox.left - stageBox.left) / stageBox.width, span);
    // Phones shade the text with their own CSS scrim (--ribbon-cover: none), so no line fades here
    const cover = getComputedStyle(stage).getPropertyValue('--ribbon-cover').trim() !== 'none';
    gl.uniform4f(
      u.copy,
      cover ? (copyBox.right - stageBox.left) * dpr : -1e6,
      (copyBox.bottom - stageBox.top) * dpr,
      144 * dpr,
      (band < 0.99 ? 48 : 80) * dpr
    );
  }

  const pointer = { x: 0, y: 0, cx: 0, cy: 0, target: 0, amp: 0, seen: false };
  const onMove = (e: PointerEvent): void => {
    if (e.pointerType === 'touch') return;
    const box = stage.getBoundingClientRect();
    pointer.x = e.clientX - box.left;
    pointer.y = e.clientY - box.top;
    if (!pointer.seen) {
      pointer.cx = pointer.x;
      pointer.cy = pointer.y;
      pointer.seen = true;
    }
    pointer.target = 1;
  };
  const onLeave = (): void => {
    pointer.target = 0;
  };

  // time only advances while frames are drawn, so nothing jumps after a pause
  let elapsed = 0;
  let flow = RIBBON_START_TIME;
  let reduced = options.reduced;
  let paused = false;
  // reduced motion skips the draw-on; once skipped it never starts over
  let drawnOn = reduced;
  let last = 0;
  let raf = 0;
  let still = 0;
  let skipFrame = false;
  let running = false;
  let inView = true;
  let announced = false;
  let halted = false;
  const speed = { frames: 0, ms: 0, slow: 0 };

  function draw(dt: number): void {
    if (layoutDirty) layout();

    const follow = 1 - Math.exp(-dt * 1.6);
    pointer.cx += (pointer.x - pointer.cx) * follow;
    pointer.cy += (pointer.y - pointer.cy) * follow;
    pointer.amp += (pointer.target - pointer.amp) * (1 - Math.exp(-dt * 0.9));

    flow += dt * (DRIFT_SPEED + (ARRIVAL_SPEED - DRIFT_SPEED) * Math.exp(-elapsed / SETTLE_SECONDS));

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform1f(u.t, flow);
    gl.uniform1f(u.reveal, drawnOn ? FULLY_DRAWN : elapsed);
    gl.uniform3f(u.pulse, LIGHT_START + LIGHT_SPEED * elapsed, LIGHT_STRENGTH, LIGHT_SPACING);
    gl.uniform3f(u.mouse, (pointer.cx * dpr) / width, (pointer.cy * dpr) / height, reduced ? 0 : pointer.amp * CURSOR_LEAN);
    gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 4, cols * rows);
  }

  // A still picture is drawn again on the next frame: WebKit can hold a lone WebGL frame back until another
  // one follows, which left the hero blank after a resize while paused
  function drawStill(): void {
    draw(0);
    cancelAnimationFrame(still);
    still = requestAnimationFrame(() => {
      if (!running) draw(0);
    });
  }

  // weak GPU, judged in the first seconds: drop detail once, then settle on the poster, rather than stutter.
  // Above 25 fps is fine, since low-power modes cap at 30; one long frame during page load does not count.
  function checkSpeed(raw: number): void {
    if (elapsed > SETTLED_AFTER) return;
    speed.frames++;
    speed.ms += raw;
    if (raw > 40) speed.slow++;
    if (speed.frames < 24 && speed.ms < 1500) return;
    const struggling = speed.slow * 2 > speed.frames;
    speed.frames = speed.ms = speed.slow = 0;
    if (!struggling) return;
    if (quality === 1) {
      quality = 0.6;
      layoutDirty = true;
    } else {
      halt();
    }
  }

  function frame(now: number): void {
    raf = requestAnimationFrame(frame);
    skipFrame = !skipFrame;
    if (skipFrame && elapsed > SETTLED_AFTER) return;
    // a frame's timestamp can predate the moment the ribbon started
    const raw = Math.max(0, now - last);
    last = now;
    const dt = Math.min(raw / 1000, 0.1);
    elapsed += dt;
    draw(dt);
    if (!announced) {
      announced = true;
      options.onReady();
    }
    checkSpeed(raw);
  }

  function resume(): void {
    if (running || halted || paused || !inView || document.hidden) return;
    running = true;
    last = performance.now();
    raf = requestAnimationFrame(frame);
  }

  function pause(): void {
    running = false;
    cancelAnimationFrame(raf);
  }

  function halt(): void {
    halted = true;
    pause();
    options.onLost();
  }

  const resizes = new ResizeObserver(() => {
    layoutDirty = true;
    if (!running) drawStill(); // a resize clears the canvas, so repaint it while paused
  });
  resizes.observe(stage);
  resizes.observe(copy);

  const onVisibility = (): void => {
    if (document.hidden) pause();
    else resume();
  };
  const onContextLost = (e: Event): void => {
    e.preventDefault();
    halt();
  };
  stage.addEventListener('pointermove', onMove, { passive: true });
  stage.addEventListener('pointerleave', onLeave, { passive: true });
  document.addEventListener('visibilitychange', onVisibility);
  canvas.addEventListener('webglcontextlost', onContextLost);

  resume();

  return {
    setVisible(visible) {
      inView = visible;
      if (visible) resume();
      else pause();
    },
    setPaused(value) {
      paused = value;
      if (!paused) {
        resume();
        return;
      }
      pause();
      if (halted) return;
      // a pause during the draw-on, or a remembered one before the first frame, still shows the whole ribbon
      drawnOn = true;
      drawStill();
      if (!announced) {
        announced = true;
        options.onReady();
      }
    },
    setReduced(value) {
      reduced = value;
      if (value) drawnOn = true;
    },
    stop() {
      pause();
      cancelAnimationFrame(still);
      resizes.disconnect();
      stage.removeEventListener('pointermove', onMove);
      stage.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('visibilitychange', onVisibility);
      canvas.removeEventListener('webglcontextlost', onContextLost);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    },
  };
}
