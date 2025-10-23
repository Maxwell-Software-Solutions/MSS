import { render, type RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';

// Mock the LanguageContext module BEFORE importing it
jest.mock('@/lib/LanguageContext');

// Import AFTER mocking
import { LanguageProvider } from '@/lib/LanguageContext';

// Custom render function that wraps with the mocked LanguageProvider
export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, {
    wrapper: ({ children }) => <LanguageProvider>{children}</LanguageProvider>,
    ...options,
  });
}

// Re-export everything from @testing-library/react
export * from '@testing-library/react';
