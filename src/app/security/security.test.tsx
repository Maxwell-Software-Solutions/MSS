import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import SecurityPage from './SecurityPage';

expect.extend(toHaveNoViolations);

describe('Security page', () => {
  it('has proper heading hierarchy', () => {
    render(<SecurityPage />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Security');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<SecurityPage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
