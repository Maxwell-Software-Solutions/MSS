import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import ScrollEffects from './ParallaxScrollEffects';

expect.extend(toHaveNoViolations);

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('ParallaxScrollEffects component', () => {
  beforeEach(() => {
    // Mock IntersectionObserver
    global.IntersectionObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));

    // Mock requestAnimationFrame
    global.requestAnimationFrame = jest.fn((callback) => {
      setTimeout(callback, 0);
      return 1;
    });

    global.cancelAnimationFrame = jest.fn();

    // Mock window.matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    // Mock window.addEventListener
    window.addEventListener = jest.fn();
    window.removeEventListener = jest.fn();
  });

  it('renders without crashing', () => {
    const { container } = render(<ScrollEffects />);
    expect(container).toBeInTheDocument();
  });

  it('returns null as expected', () => {
    const { container } = render(<ScrollEffects />);
    expect(container.firstChild).toBeNull();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<ScrollEffects />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('renders without crashing', () => {
    render(<ScrollEffects />);
    // The component should render without errors
    expect(true).toBe(true);
  });
});
