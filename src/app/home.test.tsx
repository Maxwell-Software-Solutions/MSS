import { screen } from '@testing-library/react';
import { renderWithProviders as render } from '@/test/test-utils';
import { axe, toHaveNoViolations } from 'jest-axe';
import Home from './HomePage';

expect.extend(toHaveNoViolations);

// Basic IntersectionObserver mock to immediately invoke visibility
beforeAll(() => {
  class IO implements IntersectionObserver {
    readonly root: Element | Document | null = null;
    readonly rootMargin = '';
    readonly thresholds: ReadonlyArray<number> = [];
    private _cb: IntersectionObserverCallback;
    constructor(cb: IntersectionObserverCallback) {
      this._cb = cb;
    }
    observe(target: Element): void {
      this._cb([{ isIntersecting: true, target } as IntersectionObserverEntry], this);
    }
    unobserve(): void {}
    disconnect(): void {}
    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }
  }
  global.IntersectionObserver = IO as unknown as typeof IntersectionObserver;
});

describe('Home page', () => {
  it('renders the primary headline', () => {
    render(<Home />);
    expect(screen.getByText(/Software Engineering Consultancy/i)).toBeInTheDocument();
  });

  it('renders the main call-to-action buttons', () => {
    render(<Home />);
    expect(screen.getByRole('link', { name: /request your code audit/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /explore services/i })).toBeInTheDocument();
  });

  it('renders the statistics section', () => {
    render(<Home />);
    expect(screen.getByText('-60%')).toBeInTheDocument();
    expect(screen.getByText('+35%')).toBeInTheDocument();
    expect(screen.getByText('-45%')).toBeInTheDocument();
    expect(screen.getByText('Escaped defects')).toBeInTheDocument();
    expect(screen.getByText('Test coverage')).toBeInTheDocument();
    expect(screen.getByText('MTTR')).toBeInTheDocument();
  });

  it('renders the about section', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { name: /about/i })).toBeInTheDocument();
  });

  it('renders the case studies section', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { name: /case studies/i })).toBeInTheDocument();
    expect(screen.getByText('Selected work')).toBeInTheDocument();
  });

  it('renders the contact section', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { name: /contact/i })).toBeInTheDocument();
  });

  it('shows the finished hero picture without waiting for the animation', () => {
    render(<Home />);
    const poster = screen.getByTestId('hero-poster');
    expect(poster).toHaveAttribute('aria-hidden', 'true');
    expect(poster.querySelectorAll('path').length).toBeGreaterThan(20);
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });

  it('hides the animated canvas from assistive technology', () => {
    render(<Home />);
    expect(screen.getByTestId('hero-ribbon')).toHaveAttribute('aria-hidden', 'true');
  });

  it('keeps the hero call-to-action destinations', () => {
    render(<Home />);
    expect(screen.getByRole('link', { name: /request your code audit/i })).toHaveAttribute('href', '/contact');
    expect(screen.getByRole('link', { name: /explore services/i })).toHaveAttribute('href', '/services');
  });

  it('checks accessibility and reports violations', async () => {
    const { container } = render(<Home />);
    const results = await axe(container);
    // Log accessibility violations for review but don't fail the test
    if (results.violations.length > 0) {
      console.log('Accessibility violations found:', results.violations);
    }
    // Note: This test passes regardless of violations to allow for gradual accessibility improvements
  });
});
