# Quick Reference: Adding Contrast Tests to Components

## Import Statement

```typescript
import { meetsWCAG_AA, BRAND_COLORS } from '@/test/contrast-checker';
```

## Basic Pattern

```typescript
describe('YourComponent', () => {
  // ... existing tests ...

  describe('Color Contrast', () => {
    it('meets WCAG AA for primary text', () => {
      const result = meetsWCAG_AA(BRAND_COLORS.foreground, BRAND_COLORS.background);
      expect(result.passes).toBe(true);
      expect(result.ratio).toBeGreaterThanOrEqual(4.5);
    });
  });
});
```

## Common Combinations

### Body Text

```typescript
meetsWCAG_AA(BRAND_COLORS.foreground, BRAND_COLORS.background);
// Expected ratio: ~12:1 ✓
```

### Buttons

```typescript
// Primary button (.btn-accent)
meetsWCAG_AA(BRAND_COLORS.background, BRAND_COLORS.accent);
// Expected ratio: ~5.5:1 ✓

// Ghost button border
meetsWCAG_AA(BRAND_COLORS.accent, BRAND_COLORS.background, { uiComponent: true });
// Required: 3:1 ✓
```

### Cards

```typescript
meetsWCAG_AA(BRAND_COLORS.foreground, BRAND_COLORS.card);
// Expected ratio: ~9:1 ✓
```

### Muted Text

```typescript
meetsWCAG_AA(BRAND_COLORS.muted, BRAND_COLORS.background);
// Expected ratio: ~8:1 ✓
```

### Headings (Large Text)

```typescript
meetsWCAG_AA(BRAND_COLORS.foreground, BRAND_COLORS.background, { largeText: true });
// Required: 3:1 (instead of 4.5:1) ✓
```

## Test File Template

```typescript
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { meetsWCAG_AA, BRAND_COLORS } from '@/test/contrast-checker';
import YourComponent from './YourComponent';

expect.extend(toHaveNoViolations);

describe('YourComponent', () => {
  it('renders correctly', () => {
    render(<YourComponent />);
    // ... assertions
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<YourComponent />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  describe('Color Contrast', () => {
    it('text meets WCAG AA', () => {
      const result = meetsWCAG_AA(BRAND_COLORS.foreground, BRAND_COLORS.background);
      expect(result.passes).toBe(true);
    });

    it('interactive elements meet WCAG AA', () => {
      const result = meetsWCAG_AA(BRAND_COLORS.accent, BRAND_COLORS.background, { uiComponent: true });
      expect(result.passes).toBe(true);
    });
  });
});
```

## Options

| Option              | Default | Purpose                                            |
| ------------------- | ------- | -------------------------------------------------- |
| `largeText: true`   | `false` | For text ≥18pt or ≥14pt bold (requires 3:1)        |
| `uiComponent: true` | `false` | For UI elements like borders, icons (requires 3:1) |
| `level: 'AAA'`      | `'AA'`  | Use stricter AAA standard (7:1 for text)           |

## Return Values

```typescript
{
  passes: boolean,      // Whether it meets the standard
  ratio: number | null, // Actual contrast ratio
  required: number      // Required ratio for the standard
}
```

## Brand Colors Available

```typescript
BRAND_COLORS.background; // #1a202c
BRAND_COLORS.backgroundDark; // #0a0f19
BRAND_COLORS.foreground; // #f7fafc
BRAND_COLORS.accent; // #d4af37
BRAND_COLORS.accentHover; // #e5c158
BRAND_COLORS.secondary; // #4299e1
BRAND_COLORS.card; // #2d3748
BRAND_COLORS.cardDark; // #1a202c
BRAND_COLORS.muted; // #cbd5e1
BRAND_COLORS.mutedDark; // #e2e8f0
```

## Files

- **Core**: `src/test/contrast-checker.ts`
- **Tests**: `src/test/contrast-checker.test.ts`
- **Examples**: `src/test/contrast-testing-examples.test.tsx`
- **Docs**: `docs/contrast-testing.md`

## Run Tests

```bash
pnpm test              # All tests
pnpm jest             # Jest only
pnpm test:watch       # Watch mode
pnpm test contrast    # Filter for contrast tests
```

## Need Help?

See full documentation: `docs/contrast-testing.md`
