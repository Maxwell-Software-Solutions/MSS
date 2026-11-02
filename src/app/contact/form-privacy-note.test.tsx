import { renderWithProviders as render, screen } from '@/test/test-utils';
import ContactFormCard from './ContactFormCard';
import FreeAuditPage from '../free-audit/FreeAuditPage';

describe('Privacy note at the forms', () => {
  it('links the privacy policy from the contact form, where the details are collected', () => {
    render(<ContactFormCard status="idle" error="" onSubmit={async () => undefined} />);
    expect(screen.getByRole('link', { name: 'Privacy Policy' })).toHaveAttribute('href', '/privacy');
  });

  it('links the privacy policy from the free audit form', () => {
    render(<FreeAuditPage />);
    const form = screen.getByRole('form', { name: /free code health audit application/i });
    const note = form.querySelector('.form-note');
    expect(note?.querySelector('a')).toHaveAttribute('href', '/privacy');
  });
});
