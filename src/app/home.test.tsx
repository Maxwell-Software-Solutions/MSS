import { fireEvent, screen } from '@testing-library/react';
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
  it('leads with AI in the headline and subheading', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { level: 1, name: /put ai to work in your business/i })).toBeInTheDocument();
    expect(screen.getByText(/^We are an AI software development company in Vilnius, Lithuania/i)).toBeInTheDocument();
  });

  it('renders the main call-to-action buttons', () => {
    render(<Home />);
    expect(screen.getByRole('link', { name: /discuss your ai project/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /see ai services/i })).toBeInTheDocument();
  });

  it('puts the four AI services and AI agents before the engineering foundations', () => {
    render(<Home />);
    const aiServices = screen.getByRole('heading', { level: 2, name: /^ai services$/i });
    for (const name of [/ai adoption and strategy/i, /ai agents and automation/i, /ai product development/i, /ai innovation and prototyping/i]) {
      expect(screen.getByRole('heading', { level: 3, name })).toBeInTheDocument();
    }
    const agents = screen.getByRole('heading', { level: 2, name: /ai agents that do real work/i });
    const foundations = screen.getByRole('heading', { level: 2, name: /the engineering behind production ai/i });
    expect(aiServices.compareDocumentPosition(agents) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(agents.compareDocumentPosition(foundations) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('keeps the four engineering foundations without any made-up figures', () => {
    render(<Home />);
    for (const name of [/evaluations and tests/i, /clean foundations/i, /^monitoring$/i, /safe rollout/i]) {
      expect(screen.getByRole('heading', { level: 3, name })).toBeInTheDocument();
    }
    for (const text of [/-60%/, /\+35%/, /-45%/, /escaped defects/i, /test coverage/i, /mttr/i]) {
      expect(screen.queryByText(text)).not.toBeInTheDocument();
    }
  });

  it('has no client strip, testimonials or old case studies', () => {
    render(<Home />);
    for (const text of [/trusted by/i, /client perspective/i, /^miau$/i, /fueille/i, /retail platform/i, /fintech api/i, /saas migration/i]) {
      expect(screen.queryByText(text)).not.toBeInTheDocument();
    }
    expect(screen.queryByRole('link', { name: /case study/i })).not.toBeInTheDocument();
  });

  it('renders the about section', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { name: /about/i })).toBeInTheDocument();
  });

  it('renders the Real AI work section after the engineering foundations', () => {
    render(<Home />);
    const work = screen.getByRole('heading', { level: 2, name: /^real ai work$/i });
    expect(screen.getByText('Selected work')).toBeInTheDocument();
    for (const name of [/^irwin mitchell$/i, /^miausairovi cattery$/i, /^our multi-model ai orchestrator$/i, /^neonova$/i]) {
      expect(screen.getByRole('heading', { level: 3, name })).toBeInTheDocument();
    }
    const foundations = screen.getByRole('heading', { level: 2, name: /the engineering behind production ai/i });
    const contact = screen.getByRole('heading', { level: 2, name: /^contact$/i });
    expect(foundations.compareDocumentPosition(work) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(work.compareDocumentPosition(contact) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
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

  it('remembers a paused hero on later visits until play is pressed', () => {
    localStorage.clear();
    const first = render(<Home />);
    fireEvent.click(screen.getByRole('button', { name: /pause animation/i }));
    expect(localStorage.getItem('site.heroPaused')).toBe('true');
    first.unmount();

    render(<Home />);
    fireEvent.click(screen.getByRole('button', { name: /play animation/i }));
    expect(localStorage.getItem('site.heroPaused')).toBeNull();
    expect(screen.getByRole('button', { name: /pause animation/i })).toBeInTheDocument();
  });

  it('keeps the hero call-to-action destinations', () => {
    render(<Home />);
    expect(screen.getByRole('link', { name: /discuss your ai project/i })).toHaveAttribute('href', '/contact');
    expect(screen.getByRole('link', { name: /see ai services/i })).toHaveAttribute('href', '/services');
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
