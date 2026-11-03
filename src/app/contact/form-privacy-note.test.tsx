import { renderWithProviders as render, screen } from '@/test/test-utils';
import ContactFormCard from './ContactFormCard';

describe('Privacy note at the forms', () => {
  it('links the privacy policy from the contact form, where the details are collected', () => {
    render(<ContactFormCard status="idle" error="" onSubmit={async () => undefined} />);
    expect(screen.getByRole('link', { name: 'Privacy Policy' })).toHaveAttribute('href', '/privacy');
  });
});
