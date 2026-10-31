import { renderWithProviders, screen } from '@/test/test-utils';
import { BOOKING_URL } from '@/lib/booking';
import ScheduleCallButton from './ScheduleCallButton';

describe('ScheduleCallButton', () => {
  it('opens the booking page in a new tab', () => {
    renderWithProviders(<ScheduleCallButton />);
    const link = screen.getByRole('link', { name: 'Schedule a Call' });
    expect(link).toHaveAttribute('href', BOOKING_URL);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
