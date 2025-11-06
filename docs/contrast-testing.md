# WCAG Contrast Testing Guide

## Overview

This project includes automated WCAG AA/AAA contrast ratio testing to ensure all text and UI components meet accessibility standards. The contrast checker validates that foreground and background color combinations provide adequate readability.

## WCAG Standards

### WCAG AA (Minimum)

- **Normal text** (< 18pt): 4.5:1 contrast ratio
- **Large text** (≥ 18pt or ≥ 14pt bold): 3:1 contrast ratio
- **UI components**: 3:1 contrast ratio

### WCAG AAA (Enhanced)

- **Normal text**: 7:1 contrast ratio
- **Large text**: 4.5:1 contrast ratio

This project aims for **WCAG AA compliance** as a minimum, with AAA for primary text where feasible.

## Files

- **`src/test/contrast-checker.ts`** - Core contrast checking utilities
- **`src/test/contrast-checker.test.ts`** - Tests for brand color combinations
- **`src/test/contrast-testing-examples.test.tsx`** - Usage examples
- **`src/test/jest-matchers.d.ts`** - TypeScript definitions for custom matchers
- **`src/test/setupTests.ts`** - Jest configuration with contrast matchers

## Usage

### Method 1: Direct Color Testing

Test specific color combinations programmatically:

```typescript
import { meetsWCAG_AA, BRAND_COLORS } from '@/test/contrast-checker';

it('text meets contrast requirements', () => {
  const result = meetsWCAG_AA(BRAND_COLORS.foreground, BRAND_COLORS.background);

  expect(result.passes).toBe(true);
  expect(result.ratio).toBeGreaterThanOrEqual(4.5);
});
```

### Method 2: Large Text & UI Components

Use options for different element types:

```typescript
// Large text (headings)
const heading = meetsWCAG_AA(textColor, bgColor, { largeText: true });
expect(heading.required).toBe(3.0);

// UI components (buttons, borders, icons)
const button = meetsWCAG_AA(iconColor, bgColor, { uiComponent: true });
expect(button.required).toBe(3.0);

// WCAG AAA for enhanced accessibility
const premium = meetsWCAG_AAA(textColor, bgColor);
expect(premium.required).toBe(7.0);
```

### Method 3: Custom Jest Matcher

Use the `toHaveAdequateContrast` matcher for DOM elements:

```typescript
it('button has adequate contrast', () => {
  const { container } = render(<Button>Click me</Button>);
  const button = container.querySelector('button');

  expect(button).toHaveAdequateContrast();
  expect(button).toHaveAdequateContrast({ largeText: true });
  expect(button).toHaveAdequateContrast({ level: 'AAA' });
});
```

**Note**: This matcher requires actual computed styles. In jsdom test environment, styles may not compute fully, so it's often better to test color combinations directly using Method 1.

### Method 4: Brand Color Validation

All brand colors are pre-tested in `contrast-checker.test.ts`:

```typescript
import { BRAND_COLORS } from '@/test/contrast-checker';

// Available colors:
BRAND_COLORS.background; // #1a202c
BRAND_COLORS.backgroundDark; // #0a0f19
BRAND_COLORS.foreground; // #f7fafc
BRAND_COLORS.accent; // #d4af37 (gold)
BRAND_COLORS.accentHover; // #e5c158
BRAND_COLORS.secondary; // #4299e1 (blue)
BRAND_COLORS.card; // #2d3748
BRAND_COLORS.cardDark; // #1a202c
BRAND_COLORS.muted; // #cbd5e1
BRAND_COLORS.mutedDark; // #e2e8f0
```

## Adding Tests to Components

### Step 1: Import utilities

```typescript
import { meetsWCAG_AA, BRAND_COLORS } from '@/test/contrast-checker';
```

### Step 2: Add test suite

```typescript
describe('MyComponent', () => {
  // ... existing tests ...

  describe('Color Contrast', () => {
    it('primary text meets WCAG AA', () => {
      const result = meetsWCAG_AA(BRAND_COLORS.foreground, BRAND_COLORS.background);
      expect(result.passes).toBe(true);
    });

    it('button text meets WCAG AA', () => {
      const result = meetsWCAG_AA(BRAND_COLORS.background, BRAND_COLORS.accent);
      expect(result.passes).toBe(true);
      expect(result.ratio).toBeGreaterThanOrEqual(4.5);
    });
  });
});
```

### Step 3: Test all color combinations

For each component, test:

1. **Body text** - Default text color on default background
2. **Headings** - Use `{ largeText: true }` option
3. **Links** - Hover states and focus states
4. **Buttons** - Text on button background
5. **Cards** - Text on card background
6. **Borders** - Use `{ uiComponent: true }` for UI element contrast
7. **Icons** - Icon color vs background

## Common Patterns

### Testing Buttons

```typescript
it('primary button contrast', () => {
  const result = meetsWCAG_AA(BRAND_COLORS.background, BRAND_COLORS.accent);
  expect(result.passes).toBe(true);
});

it('ghost button contrast', () => {
  const border = meetsWCAG_AA(BRAND_COLORS.accent, BRAND_COLORS.background, { uiComponent: true });
  expect(border.passes).toBe(true);
});
```

### Testing Cards

```typescript
it('card text contrast', () => {
  const result = meetsWCAG_AA(BRAND_COLORS.foreground, BRAND_COLORS.card);
  expect(result.passes).toBe(true);
});

it('card border contrast', () => {
  const result = meetsWCAG_AA(BRAND_COLORS.accent, BRAND_COLORS.background, { uiComponent: true });
  expect(result.ratio).toBeGreaterThanOrEqual(3.0);
});
```

### Testing with Opacity

When using opacity (e.g., `text-foreground/80`), test the blended color:

```typescript
it('secondary text with opacity maintains contrast', () => {
  // foreground/80 approximates to #c9d6de on dark background
  const result = meetsWCAG_AA('#c9d6de', BRAND_COLORS.background);
  expect(result.passes).toBe(true);
});
```

## Test Structure

Every component test should include:

```typescript
describe('ComponentName', () => {
  // 1. Rendering tests
  it('renders correctly', () => {
    /* ... */
  });

  // 2. Interaction tests
  it('handles user interactions', () => {
    /* ... */
  });

  // 3. Accessibility tests
  it('has no accessibility violations', async () => {
    const { container } = render(<Component />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  // 4. Contrast tests
  describe('Color Contrast', () => {
    it('meets WCAG AA for all text', () => {
      const result = meetsWCAG_AA(textColor, bgColor);
      expect(result.passes).toBe(true);
    });
  });
});
```

## Running Tests

```bash
# Run all tests including contrast checks
pnpm test

# Run only contrast tests
pnpm test contrast-checker

# Watch mode
pnpm test:watch
```

## Troubleshooting

### Issue: Contrast test fails

1. Check the actual color values in `globals.css`
2. Verify the color combination in `BRAND_COLORS`
3. Calculate expected ratio: use [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
4. Update colors or adjust opacity to meet requirements

### Issue: Jest matcher doesn't work in jsdom

The `toHaveAdequateContrast` matcher requires computed styles. In jsdom, styles often don't compute fully. Use direct color testing instead:

```typescript
// Instead of this:
expect(element).toHaveAdequateContrast();

// Use this:
const result = meetsWCAG_AA(BRAND_COLORS.foreground, BRAND_COLORS.background);
expect(result.passes).toBe(true);
```

### Issue: Opacity colors

For colors with opacity (e.g., `rgba()` or Tailwind's `/80`), you need to:

1. Calculate the blended color manually, or
2. Test in E2E with actual browser rendering, or
3. Document the baseline contrast is strong enough to allow opacity reduction

## Best Practices

1. **Test early** - Add contrast tests when creating new components
2. **Test all states** - Hover, focus, active, disabled
3. **Document exceptions** - If a color combination is intentionally low contrast (e.g., disabled state), document why
4. **Use brand colors** - Always reference `BRAND_COLORS` constants
5. **Aim for AAA** - While AA is minimum, aim for AAA (7:1) on primary text
6. **Test in browser** - jsdom has limitations; validate visually in real browsers
7. **Update when changing colors** - Re-run tests when updating `globals.css`

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Contrast Ratio Calculator](https://contrast-ratio.com/)
- [MDN: WCAG Color Contrast](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Understanding_WCAG/Perceivable/Color_contrast)

## Current Status

✅ All brand color combinations tested and passing WCAG AA
✅ Automated tests integrated into CI/CD pipeline  
✅ Custom Jest matchers available for component tests
✅ Documentation and examples provided

**Next steps:**

- Add contrast tests to remaining components
- Consider WCAG AAA compliance for primary content
- Integrate visual regression testing for contrast validation
