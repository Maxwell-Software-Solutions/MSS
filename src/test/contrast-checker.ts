/**
 * WCAG AA Contrast Ratio Checker
 *
 * Provides utilities to check color contrast ratios according to WCAG 2.1 standards:
 * - Normal text (< 18pt): minimum 4.5:1
 * - Large text (≥ 18pt or ≥ 14pt bold): minimum 3:1
 * - UI components and graphics: minimum 3:1
 */

/**
 * Convert hex color to RGB
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  // Remove # if present
  hex = hex.replace(/^#/, '');

  // Handle shorthand hex (e.g., #fff)
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((char) => char + char)
      .join('');
  }

  if (hex.length !== 6) {
    return null;
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return { r, g, b };
}

/**
 * Convert RGB to relative luminance
 * Formula from WCAG 2.1: https://www.w3.org/WAI/GL/wiki/Relative_luminance
 */
function getLuminance(rgb: { r: number; g: number; b: number }): number {
  const rsRGB = rgb.r / 255;
  const gsRGB = rgb.g / 255;
  const bsRGB = rgb.b / 255;

  const r = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
  const g = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
  const b = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Calculate contrast ratio between two colors
 * Formula from WCAG 2.1: (L1 + 0.05) / (L2 + 0.05)
 * where L1 is the lighter color and L2 is the darker color
 */
export function getContrastRatio(color1: string, color2: string): number | null {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  if (!rgb1 || !rgb2) {
    return null;
  }

  const lum1 = getLuminance(rgb1);
  const lum2 = getLuminance(rgb2);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if contrast ratio meets WCAG AA standard
 */
export function meetsWCAG_AA(
  foreground: string,
  background: string,
  options: {
    largeText?: boolean;
    uiComponent?: boolean;
  } = {}
): { passes: boolean; ratio: number | null; required: number } {
  const ratio = getContrastRatio(foreground, background);

  let required: number;
  if (options.uiComponent) {
    required = 3.0;
  } else if (options.largeText) {
    required = 3.0;
  } else {
    required = 4.5;
  }

  return {
    passes: ratio !== null && ratio >= required,
    ratio,
    required,
  };
}

/**
 * Check if contrast ratio meets WCAG AAA standard
 */
export function meetsWCAG_AAA(
  foreground: string,
  background: string,
  options: {
    largeText?: boolean;
  } = {}
): { passes: boolean; ratio: number | null; required: number } {
  const ratio = getContrastRatio(foreground, background);

  const required = options.largeText ? 4.5 : 7.0;

  return {
    passes: ratio !== null && ratio >= required,
    ratio,
    required,
  };
}

/**
 * Extract computed colors from DOM element
 */
export function getComputedColors(element: Element): {
  color: string | null;
  backgroundColor: string | null;
} {
  if (typeof window === 'undefined') {
    return { color: null, backgroundColor: null };
  }

  const computed = window.getComputedStyle(element);
  const color = computed.color;
  const backgroundColor = computed.backgroundColor;

  // Convert rgb/rgba to hex
  const rgbToHex = (rgb: string | undefined): string | null => {
    if (!rgb) return null;
    const match = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)$/);
    if (!match) return null;

    const r = parseInt(match[1]!, 10).toString(16).padStart(2, '0');
    const g = parseInt(match[2]!, 10).toString(16).padStart(2, '0');
    const b = parseInt(match[3]!, 10).toString(16).padStart(2, '0');
    return `#${r}${g}${b}`;
  };

  return {
    color: color ? rgbToHex(color) : null,
    backgroundColor: backgroundColor ? rgbToHex(backgroundColor) : null,
  };
}

/**
 * Check contrast for a DOM element (requires jsdom environment)
 */
export function checkElementContrast(
  element: Element,
  options: {
    largeText?: boolean;
    uiComponent?: boolean;
  } = {}
): {
  passes: boolean;
  ratio: number | null;
  required: number;
  colors: { foreground: string | null; background: string | null };
} {
  const { color, backgroundColor } = getComputedColors(element);

  if (!color || !backgroundColor) {
    return {
      passes: false,
      ratio: null,
      required: options.uiComponent ? 3.0 : options.largeText ? 3.0 : 4.5,
      colors: { foreground: color, background: backgroundColor },
    };
  }

  const result = meetsWCAG_AA(color, backgroundColor, options);

  return {
    ...result,
    colors: { foreground: color, background: backgroundColor },
  };
}

/**
 * Jest matcher to check contrast ratio
 */
export function toHaveAdequateContrast(
  element: Element,
  options: {
    largeText?: boolean;
    uiComponent?: boolean;
    level?: 'AA' | 'AAA';
  } = {}
): { pass: boolean; message: () => string } {
  const level = options.level || 'AA';
  const { color, backgroundColor } = getComputedColors(element);

  if (!color || !backgroundColor) {
    return {
      pass: false,
      message: () =>
        `Expected element to have computed color and background-color, but got:\n` +
        `  color: ${color}\n` +
        `  background-color: ${backgroundColor}`,
    };
  }

  const checkFn = level === 'AAA' ? meetsWCAG_AAA : meetsWCAG_AA;
  const result = checkFn(color, backgroundColor, options);

  const typeText = options.uiComponent ? 'UI component' : options.largeText ? 'large text' : 'normal text';

  if (result.passes) {
    return {
      pass: true,
      message: () =>
        `Expected element NOT to meet WCAG ${level} contrast for ${typeText}, but it does:\n` +
        `  Ratio: ${result.ratio?.toFixed(2)}:1\n` +
        `  Required: ${result.required}:1\n` +
        `  Foreground: ${color}\n` +
        `  Background: ${backgroundColor}`,
    };
  }

  return {
    pass: false,
    message: () =>
      `Expected element to meet WCAG ${level} contrast for ${typeText}:\n` +
      `  Ratio: ${result.ratio?.toFixed(2)}:1\n` +
      `  Required: ${result.required}:1\n` +
      `  Foreground: ${color}\n` +
      `  Background: ${backgroundColor}`,
  };
}

// Brand colors from globals.css for reference
export const BRAND_COLORS = {
  background: '#1a202c',
  backgroundDark: '#0a0f19',
  foreground: '#f7fafc',
  accent: '#d4af37',
  accentHover: '#e5c158',
  secondary: '#4299e1',
  card: '#2d3748',
  cardDark: '#1a202c',
  muted: '#cbd5e1',
  mutedDark: '#e2e8f0',
} as const;

/**
 * Pre-calculated contrast ratios for common brand color combinations
 */
export function testBrandColorContrast(): void {
  const tests = [
    { fg: BRAND_COLORS.foreground, bg: BRAND_COLORS.background, name: 'Foreground on Background' },
    { fg: BRAND_COLORS.foreground, bg: BRAND_COLORS.backgroundDark, name: 'Foreground on Background (dark)' },
    { fg: BRAND_COLORS.background, bg: BRAND_COLORS.accent, name: 'Background on Accent' },
    { fg: BRAND_COLORS.accent, bg: BRAND_COLORS.background, name: 'Accent on Background' },
    { fg: BRAND_COLORS.foreground, bg: BRAND_COLORS.card, name: 'Foreground on Card' },
    { fg: BRAND_COLORS.foreground, bg: BRAND_COLORS.cardDark, name: 'Foreground on Card (dark)' },
    { fg: BRAND_COLORS.muted, bg: BRAND_COLORS.background, name: 'Muted on Background' },
    { fg: BRAND_COLORS.mutedDark, bg: BRAND_COLORS.backgroundDark, name: 'Muted on Background (dark)' },
  ];

  describe('Brand Color Contrast Ratios', () => {
    tests.forEach(({ fg, bg, name }) => {
      it(`${name} should meet WCAG AA`, () => {
        const result = meetsWCAG_AA(fg, bg);
        expect(result.passes).toBe(true);
        expect(result.ratio).toBeGreaterThanOrEqual(result.required);
      });
    });
  });
}
