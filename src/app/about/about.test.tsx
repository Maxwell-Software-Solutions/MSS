import { screen } from '@testing-library/react';
import { renderWithProviders as render } from '@/test/test-utils';
import { axe, toHaveNoViolations } from 'jest-axe';
import AboutPage from './AboutPage';

expect.extend(toHaveNoViolations);

describe('About page', () => {
  it('renders the main heading', () => {
    render(<AboutPage />);
    expect(screen.getByRole('heading', { name: /about/i })).toBeInTheDocument();
  });

  it('presents MSS as an AI software development company', () => {
    render(<AboutPage />);
    expect(screen.getByText(/is an AI software development company in Vilnius, Lithuania/i)).toBeInTheDocument();
  });

  it('renders the core principles list', () => {
    render(<AboutPage />);
    expect(screen.getByText(/Correctness over cleverness/i)).toBeInTheDocument();
    expect(screen.getByText(/Observability as a feature/i)).toBeInTheDocument();
    expect(screen.getByText(/Automation and reproducibility/i)).toBeInTheDocument();
  });

  it('describes the work as AI software grounded in classic engineering, without claiming a team', () => {
    render(<AboutPage />);
    expect(screen.getByText(/We build AI software with deep grounding in classic software engineering/i)).toBeInTheDocument();
    expect(screen.queryByText(/our team|our engineers|senior team/i)).not.toBeInTheDocument();
  });

  it('has proper list structure', () => {
    render(<AboutPage />);
    const lists = screen.getAllByRole('list');
    expect(lists.length).toBeGreaterThan(0);
    const listItems = screen.getAllByRole('listitem');
    expect(listItems.length).toBeGreaterThanOrEqual(3);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<AboutPage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('shows the founder with his role and bio', () => {
    render(<AboutPage />);
    expect(screen.getByRole('heading', { name: /Who builds your system/i })).toBeInTheDocument();
    expect(screen.getByText('Mantas Brasiunas')).toBeInTheDocument();
    expect(screen.getByText(/Founder & AI Engineering Lead/i)).toBeInTheDocument();
    expect(screen.getByText(/Builds AI agents and AI products/i)).toBeInTheDocument();
    expect(screen.getByText(/years of work for Sage/i)).toBeInTheDocument();
  });

  it('shows nobody else as part of the company', () => {
    render(<AboutPage />);
    const names = screen.getAllByRole('heading', { level: 3 }).map((heading) => heading.textContent);
    expect(names).toEqual(['Mantas Brasiunas']);
    expect(screen.queryByText(/Maxwell Archer|Petras Rolinskij|Marek Wolosewicz/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Managing Director|Design Director|Software Engineer & SEO/i)).not.toBeInTheDocument();
  });

  it('shows his initials instead of a portrait until a photo is added', () => {
    render(<AboutPage />);
    expect(screen.getByText('MB')).toBeInTheDocument();
    expect(screen.queryByRole('img', { name: /Mantas Brasiunas/i })).not.toBeInTheDocument();
  });
});
