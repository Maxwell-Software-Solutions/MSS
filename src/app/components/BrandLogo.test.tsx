import { render, screen } from '@testing-library/react';
import BrandLogo from './BrandLogo';

describe('BrandLogo', () => {
  it('has an accessible name when given a label', () => {
    render(<BrandLogo label="Maxwell Software Solutions" />);
    expect(screen.getByRole('img', { name: 'Maxwell Software Solutions' })).toBeInTheDocument();
  });

  it('is hidden from assistive technology when a surrounding link names it', () => {
    const { container } = render(<BrandLogo />);
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});
