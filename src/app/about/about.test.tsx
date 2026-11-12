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

  it('describes the team as AI software engineers grounded in classic engineering', () => {
    render(<AboutPage />);
    expect(screen.getByText(/AI software engineers with deep grounding in classic software engineering/i)).toBeInTheDocument();
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

  it('renders founders with roles and bios', () => {
    render(<AboutPage />);
    expect(screen.getByRole('heading', { name: /Founders/i })).toBeInTheDocument();
    expect(screen.getAllByText('Mantas Brasiunas')[0]).toBeInTheDocument();
    expect(screen.getByText(/Founder & AI Engineering Lead/i)).toBeInTheDocument();
    expect(screen.getAllByText('Maxwell Archer')[0]).toBeInTheDocument();
    expect(screen.getByText(/Software Engineer & SEO/i)).toBeInTheDocument();
    expect(screen.getAllByText('Petras Rolinskij')[0]).toBeInTheDocument();
    expect(screen.getByText(/Design Director/i)).toBeInTheDocument();
    expect(screen.getAllByText('Marek Wolosewicz')[0]).toBeInTheDocument();
    expect(screen.getByText(/Managing Director/i)).toBeInTheDocument();
  });

  it('renders accessible founder portrait avatars', () => {
    render(<AboutPage />);
    expect(screen.getByRole('img', { name: /Professional photo of Maxwell Archer/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /Professional photo of Petras Rolinskij/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /Professional photo of Marek Wolosewicz/i })).toBeInTheDocument();
  });

  it('lists Mantas Brasiunas first, with his bio', () => {
    render(<AboutPage />);
    const names = screen.getAllByRole('heading', { level: 3 }).map((heading) => heading.textContent);
    expect(names[0]).toBe('Mantas Brasiunas');
    expect(screen.getByText(/Builds AI agents and AI products/i)).toBeInTheDocument();
    expect(screen.getByText(/years of work for Sage/i)).toBeInTheDocument();
  });

  it('shows his initials instead of a portrait until a photo is added', () => {
    render(<AboutPage />);
    expect(screen.getByText('MB')).toBeInTheDocument();
    expect(screen.queryByRole('img', { name: /Mantas Brasiunas/i })).not.toBeInTheDocument();
  });
});
