import '@testing-library/jest-dom';

declare global {
  namespace jest {
    interface Matchers<R> {
      /**
       * Check if an element meets WCAG contrast requirements
       * @param options - Configuration for contrast checking
       * @param options.largeText - Whether the text is considered large (≥18pt or ≥14pt bold)
       * @param options.uiComponent - Whether this is a UI component (requires 3:1 minimum)
       * @param options.level - WCAG level to test against ('AA' or 'AAA'), defaults to 'AA'
       * @example
       * expect(element).toHaveAdequateContrast();
       * expect(heading).toHaveAdequateContrast({ largeText: true });
       * expect(button).toHaveAdequateContrast({ uiComponent: true });
       * expect(element).toHaveAdequateContrast({ level: 'AAA' });
       */
      toHaveAdequateContrast(options?: { largeText?: boolean; uiComponent?: boolean; level?: 'AA' | 'AAA' }): R;
    }
  }
}

export {};
