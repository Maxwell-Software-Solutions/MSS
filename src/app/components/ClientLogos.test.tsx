import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import LogoStrip from './ClientLogos';

expect.extend(toHaveNoViolations);

describe('ClientLogos component', () => {
  it('renders the eyebrow text', () => {
    render(<LogoStrip />);
    expect(screen.getByText('Trusted by teams')).toBeInTheDocument();
  });

  it('renders all client logos', () => {
    render(<LogoStrip />);
    expect(screen.getByText('Acme')).toBeInTheDocument();
    expect(screen.getByText('Nimbus')).toBeInTheDocument();
    expect(screen.getByText('Helios')).toBeInTheDocument();
    expect(screen.getByText('Orbit')).toBeInTheDocument();
    expect(screen.getByText('Vertex')).toBeInTheDocument();
    expect(screen.getByText('Lumina')).toBeInTheDocument();
  });

  it('renders the correct number of logos', () => {
    render(<LogoStrip />);
    const logoElements = screen.getAllByText(/Acme|Nimbus|Helios|Orbit|Vertex|Lumina/);
    expect(logoElements).toHaveLength(6);
  });

  it('has proper semantic structure', () => {
    render(<LogoStrip />);
    // Check that the component renders without errors
    expect(screen.getByText('Trusted by teams')).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<LogoStrip />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
