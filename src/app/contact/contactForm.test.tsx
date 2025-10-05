import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from './contactForm';

describe('ContactForm', () => {
  const originalFetch = global.fetch;
  const mockFetch = jest.fn();

  beforeEach(() => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true, message: 'Email dispatched' }),
    } as unknown as Response);
    global.fetch = mockFetch as unknown as typeof fetch;
  });

  afterEach(() => {
    jest.clearAllMocks();
    global.fetch = originalFetch;
  });

  it('shows validation errors when required fields are empty', async () => {
    render(<ContactForm />);
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /send/i }));

    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/description is required/i)).toBeInTheDocument();
  });

  it('shows an error for invalid email format', async () => {
    render(<ContactForm />);
    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/email/i), 'invalid-email');
    await user.type(screen.getByLabelText(/description/i), 'Some details');
    await user.click(screen.getByRole('button', { name: /send/i }));

    expect(await screen.findByRole('alert')).toHaveTextContent(/email is invalid/i);
  });

  it('calls onSubmit with form data when form is valid', async () => {
    const handle = jest.fn();
    render(<ContactForm onSubmit={handle} />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/first name/i), 'John');
    await user.type(screen.getByLabelText(/last name/i), 'Doe');
    await user.type(screen.getByLabelText(/email/i), 'john.doe@example.com');
    await user.type(screen.getByLabelText(/phone/i), '123456789');
    await user.type(screen.getByLabelText(/description/i), 'I need help');
    await user.click(screen.getByRole('button', { name: /send/i }));

    await waitFor(() => {
      expect(handle).toHaveBeenCalledTimes(1);
    });

    expect(handle).toHaveBeenCalledWith({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '123456789',
      description: 'I need help',
    });

    expect(mockFetch).toHaveBeenCalledWith(
      '/contact-handler.php',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({ Accept: 'application/json' }),
      })
    );

    expect(await screen.findByRole('status')).toHaveTextContent(/email dispatched/i);
  });

  it('surface an error message when the server errors', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ success: false, message: 'Server error' }),
    } as unknown as Response);

    render(<ContactForm />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/email/i), 'john.doe@example.com');
    await user.type(screen.getByLabelText(/description/i), 'Need assistance');
    await user.click(screen.getByRole('button', { name: /send/i }));

    expect(await screen.findByRole('alert')).toHaveTextContent(/could not send/i);
  });
});
