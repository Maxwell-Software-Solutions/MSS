'use client';
import { useEffect } from 'react';

function luminance(r: number, g: number, b: number): number {
  const a: [number, number, number] = [r, g, b].map((v) => {
    let n = v / 255;
    n = n <= 0.03928 ? n / 12.92 : Math.pow((n + 0.055) / 1.055, 2.4);
    return n;
  }) as [number, number, number];
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}
function parseColor(c: string): [number, number, number] | null {
  c = c.trim();
  if (/^#/.test(c)) {
    const hex = c.slice(1);
    if (hex.length === 3) {
      const r = parseInt(hex[0]! + hex[0]!, 16);
      const g = parseInt(hex[1]! + hex[1]!, 16);
      const b = parseInt(hex[2]! + hex[2]!, 16);
      return [r, g, b];
    } else if (hex.length >= 6) {
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      return [r, g, b];
    }
  }
  const m = c.match(/rgba?\(([^)]+)\)/i);
  if (m) {
    const parts = m[1]!.split(/\s*,\s*/).map(Number);
    if (parts.length >= 3 && parts[0] !== undefined && parts[1] !== undefined && parts[2] !== undefined) {
      return [parts[0], parts[1], parts[2]];
    }
  }
  return null;
}
function getComputedRGB(el: HTMLElement, prop: string): [number, number, number] | null {
  const cs = getComputedStyle(el);
  const v = cs.getPropertyValue(prop) || (cs as unknown as Record<string, string | undefined>)[prop];
  if (!v) return null;
  return parseColor(v);
}

export default function AutoContrastButtons(): null {
  useEffect(() => {
    const MIN_RATIO = 4.5; // WCAG AA for normal text
    const rootBgRGB = getComputedRGB(document.documentElement, 'background-color') || [255, 255, 255];
    // const bgLum = luminance(...rootBgRGB); // not used directly

    function adjust(btn: HTMLElement): void {
      const style = getComputedStyle(btn);
      // discover background through layers: inline style > bg color > gradient fallback var
      let bgColor = style.backgroundColor || style.getPropertyValue('background-color');
      if (bgColor && bgColor.startsWith('linear-gradient')) {
        // attempt to pull first color stop
        const stopMatch = bgColor.match(/rgba?\([^,)+]+,[^,)+]+,[^,)+]+(?:,[^,)+]+)?\)/); // crude
        if (stopMatch) bgColor = stopMatch[0];
        else bgColor = '';
      }
      if (!bgColor || bgColor === 'transparent') {
        bgColor = getComputedStyle(document.body).backgroundColor || '#ffffff';
      }
      const fgColor = style.color;
      const bg = parseColor(bgColor) || rootBgRGB;
      const fg = parseColor(fgColor) || [0, 0, 0];
      const ratio =
        (Math.max(luminance(...bg), luminance(...fg)) + 0.05) / (Math.min(luminance(...bg), luminance(...fg)) + 0.05);
      if (ratio < MIN_RATIO) {
        // choose better between black & white
        const blackRatio =
          (Math.max(luminance(...bg), luminance(0, 0, 0)) + 0.05) /
          (Math.min(luminance(...bg), luminance(0, 0, 0)) + 0.05);
        const whiteRatio =
          (Math.max(luminance(...bg), luminance(255, 255, 255)) + 0.05) /
          (Math.min(luminance(...bg), luminance(255, 255, 255)) + 0.05);
        const best = whiteRatio > blackRatio ? '#ffffff' : '#000000';
        btn.style.setProperty('--btn-accent-fg', best);
      } else {
        // keep existing or reset
        btn.style.removeProperty('--btn-accent-fg');
      }
    }
    const selector = '.btn,button,[role="button"]';
    const buttons = Array.from(document.querySelectorAll<HTMLElement>(selector));
    buttons.forEach(adjust);
    const obs = new MutationObserver((muts) => {
      muts.forEach((m) => {
        m.addedNodes.forEach((n) => {
          if (n instanceof HTMLElement && n.matches?.(selector)) {
            adjust(n);
          } else if (n instanceof HTMLElement) {
            n.querySelectorAll(selector).forEach((el) => adjust(el as HTMLElement));
          }
        });
        if (m.type === 'attributes' && m.target instanceof HTMLElement && m.target.matches(selector)) {
          adjust(m.target);
        }
      });
    });
    obs.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class'],
    });
    window.addEventListener('resize', () => buttons.forEach(adjust));
    return () => {
      obs.disconnect();
    };
  }, []);
  return null;
}
