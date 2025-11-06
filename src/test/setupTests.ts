import '@testing-library/jest-dom';
import 'jest-axe/extend-expect';
import { toHaveAdequateContrast } from './contrast-checker';

// Extend Jest matchers with custom contrast checker
expect.extend({
  toHaveAdequateContrast,
});

// Mock next/navigation for tests
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    };
  },
  useSearchParams() {
    return new URLSearchParams();
  },
  usePathname() {
    return '/';
  },
}));

// next/image is mapped via moduleNameMapper to a custom mock that strips Next-specific props.
// The previous inline mock leaked Next-specific boolean props (priority, fill, etc.) to the DOM,
// causing React console warnings in tests. Removed to avoid duplicate/less capable mock.

// Mock next/dynamic to return the inner component immediately, avoiding async state updates that
// trigger act() warnings in tests.
jest.mock('next/dynamic', () => {
  // Return a factory that ignores import function and yields a stub component.
  return () =>
    function DynamicStub() {
      return null;
    };
});

// Global test environment setup
if (typeof window !== 'undefined' && !('matchMedia' in window)) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
}

// Mock IntersectionObserver
if (typeof global.IntersectionObserver === 'undefined') {
  global.IntersectionObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }));
}

// Mock requestAnimationFrame
if (typeof global.requestAnimationFrame === 'undefined') {
  global.requestAnimationFrame = jest.fn((callback: FrameRequestCallback) => {
    setTimeout(callback, 0);
    return 1;
  });
}

if (typeof global.cancelAnimationFrame === 'undefined') {
  global.cancelAnimationFrame = jest.fn();
}

// Mock canvas getContext to avoid jsdom not-implemented errors cluttering test output.
if (typeof HTMLCanvasElement !== 'undefined') {
  Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
    value: jest.fn().mockImplementation(() => {
      return {
        // minimal stub API used in ParticleField
        clearRect: jest.fn(),
        fillRect: jest.fn(),
        beginPath: jest.fn(),
        moveTo: jest.fn(),
        lineTo: jest.fn(),
        stroke: jest.fn(),
        arc: jest.fn(),
        fill: jest.fn(),
        closePath: jest.fn(),
        createLinearGradient: jest.fn().mockReturnValue({
          addColorStop: jest.fn(),
        }),
        strokeStyle: '',
        fillStyle: '',
        lineWidth: 0,
      } as unknown as CanvasRenderingContext2D;
    }),
  });
}
