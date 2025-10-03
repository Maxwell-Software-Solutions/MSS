import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import AboutPage from './AboutPage';

expect.extend(toHaveNoViolations);

describe('About page', () => {
  it('renders the main heading', () => {
    render(<AboutPage />);
    expect(screen.getByRole('heading', { name: /about/i })).toBeInTheDocument();
  });

  it('renders the mission statement', () => {
    render(<AboutPage />);
    expect(screen.getByText(/Maxwell Software Solutions focuses on code quality and reliability/i)).toBeInTheDocument();
  });

  it('renders the core principles list', () => {
    render(<AboutPage />);
    expect(screen.getByText('Correctness over cleverness')).toBeInTheDocument();
    expect(screen.getByText('Observability as a feature')).toBeInTheDocument();
    expect(screen.getByText('Automation and reproducibility')).toBeInTheDocument();
  });

  it('renders the belief statement', () => {
    render(<AboutPage />);
    expect(screen.getByText(/We believe correctness and simplicity enable speed/i)).toBeInTheDocument();
  });

  it('has proper list structure', () => {
    render(<AboutPage />);
    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(3);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<AboutPage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('renders founders with roles and bios', () => {
    render(<AboutPage />);
    expect(screen.getByRole('heading', { name: /Founders/i })).toBeInTheDocument();
    expect(screen.getAllByText('Maxwell Archer')[0]).toBeInTheDocument();
    expect(screen.getByText(/Software Engineer & SEO/i)).toBeInTheDocument();
    expect(screen.getAllByText('Petras Rolinskij')[0]).toBeInTheDocument();
    expect(screen.getByText(/Design Director/i)).toBeInTheDocument();
    expect(screen.getAllByText('Marek Wolosewicz')[0]).toBeInTheDocument();
    expect(screen.getByText(/Managing Director/i)).toBeInTheDocument();
  });

  it('renders accessible founder portrait avatars', () => {
    render(<AboutPage />);
    expect(screen.getByRole('img', { name: /Cartoon illustration of Maxwell Archer/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /Cartoon illustration of Petras Rolinskij/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /Cartoon illustration of Marek Wolosewicz/i })).toBeInTheDocument();
  });
});
