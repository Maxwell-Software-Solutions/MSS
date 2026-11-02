import { screen, within } from '@testing-library/react';
import { renderWithProviders as render } from '@/test/test-utils';
import { axe, toHaveNoViolations } from 'jest-axe';
import RealAiWork from './RealAiWork';

expect.extend(toHaveNoViolations);

describe('RealAiWork', () => {
  it('names the four pieces of real work with the facts we can stand behind', () => {
    render(<RealAiWork />);
    expect(screen.getByText(/AI that processes legal documents accurately enough to take on demanding work/i)).toBeInTheDocument();
    expect(screen.getByText(/hours of work come down to minutes/i)).toBeInTheDocument();
    expect(screen.getByText(/We built and maintain the site/i)).toBeInTheDocument();
    expect(screen.getByText(/The client comments on a preview, an AI agent makes the fix, a person approves it, and it goes live/i)).toBeInTheDocument();
    expect(screen.getByText(/Claude, OpenAI's models, Grok, Kimi and local open models/i)).toBeInTheDocument();
    expect(screen.getByText(/the right model for the job, not just the popular one/i)).toBeInTheDocument();
    expect(screen.getByText(/design your own sign and watch it glow as you type/i)).toBeInTheDocument();
  });

  it('says whose project the Irwin Mitchell work is', () => {
    render(<RealAiWork />);
    expect(screen.getByText("Our founder's own project")).toBeInTheDocument();
    expect(screen.getByText(/UK law firm/i)).toBeInTheDocument();
  });

  it('links the cattery and the neon-sign builder to their own sites, in a new tab', () => {
    render(<RealAiWork />);
    const cattery = screen.getByRole('link', { name: /miausairovi\.com/i });
    expect(cattery).toHaveAttribute('href', 'https://miausairovi.com');
    expect(cattery).toHaveAttribute('target', '_blank');
    expect(cattery).toHaveAttribute('rel', expect.stringContaining('noopener'));
    expect(cattery).toHaveAccessibleName(/opens in a new tab/i);
    const neonova = screen.getByRole('link', { name: /neonova\.company/i });
    expect(neonova).toHaveAttribute('href', 'https://neonova.company');
    expect(neonova).toHaveAttribute('target', '_blank');
    expect(screen.getAllByRole('link')).toHaveLength(2);
  });

  it('shows no Irwin Mitchell logo, and no pictures at all', () => {
    const { container } = render(<RealAiWork />);
    expect(container.querySelectorAll('img')).toHaveLength(0);
    expect(screen.queryByRole('img', { name: /irwin|mitchell/i })).not.toBeInTheDocument();
    // The only picture with a name is the Sage logo
    expect(screen.getAllByRole('img').map((el) => el.getAttribute('aria-label'))).toEqual(['Sage']);
  });

  it('labels the Sage note as founder experience, never as a client', () => {
    render(<RealAiWork />);
    const note = screen.getByRole('group', { name: /^founder experience$/i });
    expect(within(note).getByText('Before MSS, our founder spent years engineering software for Sage.')).toBeInTheDocument();
    expect(
      within(note).getByText('Sage is a UK software company whose accounting, payroll and HR software is used by businesses around the world.')
    ).toBeInTheDocument();
    expect(within(note).getByRole('img', { name: 'Sage' })).toBeInTheDocument();
    expect(screen.queryByText(/client.{0,20}sage|sage.{0,20}client|trusted by/i)).not.toBeInTheDocument();
  });

  it('draws the Sage logo in one colour taken from the text, undistorted', () => {
    render(<RealAiWork />);
    const logo = screen.getByRole('img', { name: 'Sage' });
    expect(logo).toHaveAttribute('fill', 'currentColor');
    expect(logo).toHaveAttribute('viewBox', '0 0 250 141');
    expect(logo).not.toHaveAttribute('width');
    expect(logo).not.toHaveAttribute('height');
    expect(logo).not.toHaveAttribute('preserveAspectRatio');
    const paths = logo.querySelectorAll('path');
    expect(paths).toHaveLength(4);
    paths.forEach((path) => {
      expect(path).not.toHaveAttribute('fill');
      expect(path).not.toHaveAttribute('transform');
    });
  });

  it('brings its own heading on the home page, with h3 card titles', () => {
    render(<RealAiWork />);
    expect(screen.getByText('Selected work')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /^real ai work$/i })).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(4);
    expect(screen.getByRole('region', { name: /^real ai work$/i })).toBeInTheDocument();
  });

  it('sits under the page heading on the case studies page, with h2 card titles', () => {
    render(<RealAiWork variant="page" />);
    expect(screen.queryByRole('heading', { level: 1 })).not.toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(4);
    expect(screen.queryByRole('heading', { level: 3 })).not.toBeInTheDocument();
    expect(screen.getByRole('region', { name: /^real ai work$/i })).toBeInTheDocument();
  });

  it.each(['home', 'page'] as const)('has no accessibility violations (%s)', async (variant) => {
    const { container } = render(<RealAiWork variant={variant} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
