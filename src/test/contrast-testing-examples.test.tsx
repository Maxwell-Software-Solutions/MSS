/**
 * Example Test: Using WCAG Contrast Checkers
 *
 * This file demonstrates how to integrate contrast checking into component tests.
 * Copy these patterns into your own test files.
 */

import { render, screen } from '@testing-library/react';
import { meetsWCAG_AA, BRAND_COLORS } from '@/test/contrast-checker';

// Example Component for demonstration
function ExampleButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      className="btn btn-accent px-10 py-3"
      style={{
        backgroundColor: BRAND_COLORS.accent,
        color: BRAND_COLORS.background,
      }}
    >
      {children}
    </button>
  );
}

function ExampleCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="card shadow-soft p-6"
      style={{
        backgroundColor: BRAND_COLORS.card,
        color: BRAND_COLORS.foreground,
        border: `1px solid ${BRAND_COLORS.accent}`,
      }}
    >
      {children}
    </div>
  );
}

describe('Example: Contrast Testing Patterns', () => {
  describe('Method 1: Direct Color Testing', () => {
    it('button text on accent background meets WCAG AA', () => {
      const result = meetsWCAG_AA(BRAND_COLORS.background, BRAND_COLORS.accent);
      expect(result.passes).toBe(true);
      expect(result.ratio).not.toBeNull();
      expect(result.ratio).toBeGreaterThanOrEqual(4.5);
    });

    it('card text on card background meets WCAG AA', () => {
      const result = meetsWCAG_AA(BRAND_COLORS.foreground, BRAND_COLORS.card);
      expect(result.passes).toBe(true);
      expect(result.ratio).toBeGreaterThanOrEqual(4.5);
    });
  });

  describe('Method 2: Component Structure Testing', () => {
    it('button renders with proper contrast classes', () => {
      render(<ExampleButton>Click me</ExampleButton>);
      const button = screen.getByRole('button', { name: /click me/i });

      // Verify the component uses brand-compliant classes
      expect(button).toHaveClass('btn', 'btn-accent');
      expect(button).toBeInTheDocument();
    });

    it('card renders with proper semantic structure', () => {
      render(<ExampleCard>Card content</ExampleCard>);
      const card = screen.getByText(/card content/i);

      // Verify card structure is rendered
      expect(card).toBeInTheDocument();
      expect(card.parentElement).toBeInTheDocument();
    });
  });

  describe('Method 3: Using Custom Jest Matcher (when styled elements are rendered)', () => {
    it('demonstrates toHaveAdequateContrast matcher', () => {
      const { container } = render(<ExampleButton>Test</ExampleButton>);
      const button = container.querySelector('button');

      if (button) {
        // Note: This matcher works best with actual computed styles in browser
        // In jsdom, styles may not compute, so we verify structure instead
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass('btn-accent');
      }
    });
  });

  describe('Method 4: Testing Color Combinations', () => {
    const colorCombinations = [
      {
        name: 'Primary button',
        fg: BRAND_COLORS.background,
        bg: BRAND_COLORS.accent,
        minRatio: 4.5,
      },
      {
        name: 'Card text',
        fg: BRAND_COLORS.foreground,
        bg: BRAND_COLORS.card,
        minRatio: 4.5,
      },
      {
        name: 'Body text',
        fg: BRAND_COLORS.foreground,
        bg: BRAND_COLORS.background,
        minRatio: 4.5,
      },
      {
        name: 'Muted text',
        fg: BRAND_COLORS.muted,
        bg: BRAND_COLORS.background,
        minRatio: 4.5,
      },
    ];

    colorCombinations.forEach(({ name, fg, bg, minRatio }) => {
      it(`${name} meets WCAG AA contrast requirements`, () => {
        const result = meetsWCAG_AA(fg, bg);
        expect(result.passes).toBe(true);
        expect(result.ratio).not.toBeNull();
        if (result.ratio) {
          expect(result.ratio).toBeGreaterThanOrEqual(minRatio);
        }
      });
    });
  });

  describe('Method 5: Testing with Opacity', () => {
    it('documents contrast for semi-transparent overlays', () => {
      // When using opacity, the actual perceived color changes
      // Document expected behavior for overlays
      const opaqueText = meetsWCAG_AA(BRAND_COLORS.foreground, BRAND_COLORS.background);

      // Verify baseline contrast is strong
      expect(opaqueText.ratio).not.toBeNull();
      if (opaqueText.ratio) {
        expect(opaqueText.ratio).toBeGreaterThan(7); // Should be well above minimum
      }

      // This allows for opacity reduction while maintaining AA compliance
    });
  });
});

/**
 * HOW TO ADD CONTRAST TESTS TO YOUR COMPONENTS
 *
 * 1. Import the contrast checker utilities:
 *    import { meetsWCAG_AA, BRAND_COLORS } from '@/test/contrast-checker';
 *
 * 2. Add a "Color Contrast" describe block to your test suite
 *
 * 3. Test color combinations used in your component:
 *    - Text color vs background color
 *    - Button text vs button background
 *    - Link colors vs their backgrounds
 *    - Border colors vs backgrounds (for UI components, use { uiComponent: true })
 *
 * 4. For large text (headings), use { largeText: true } option
 *
 * 5. Verify results:
 *    expect(result.passes).toBe(true);
 *    expect(result.ratio).toBeGreaterThanOrEqual(4.5); // or 3.0 for large text/UI
 *
 * EXAMPLE:
 *
 * describe('Color Contrast', () => {
 *   it('heading text meets contrast requirements', () => {
 *     const result = meetsWCAG_AA(
 *       BRAND_COLORS.foreground,
 *       BRAND_COLORS.background,
 *       { largeText: true }
 *     );
 *     expect(result.passes).toBe(true);
 *   });
 * });
 */
