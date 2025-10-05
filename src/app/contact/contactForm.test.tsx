import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from './contactForm';

describe('ContactForm', () => {
  const fetchMock = jest.fn();
  const originalFetch = global.fetch;

  beforeEach(() => {
    fetchMock.mockReset();
    global.fetch = fetchMock as unknown as typeof fetch;
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('shows validation errors when required fields are empty', async () => {
    render(<ContactForm />);
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /send/i }));

    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/description is required/i)).toBeInTheDocument();
  });

  it('shows an error for invalid email format', async () => {
    render(<ContactForm />);
    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/first name/i), 'Jane');
    await user.type(screen.getByLabelText(/email/i), 'invalid-email');
    await user.type(screen.getByLabelText(/description/i), 'Some details');
    await user.click(screen.getByRole('button', { name: /send/i }));

    expect(await screen.findByRole('alert')).toHaveTextContent(/email is invalid/i);
  });

  it('submits to the API when form is valid and shows success', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    render(<ContactForm />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/first name/i), 'John');
    await user.type(screen.getByLabelText(/last name/i), 'Doe');
    await user.type(screen.getByLabelText(/email/i), 'john.doe@example.com');
    await user.type(screen.getByLabelText(/phone/i), '123456789');
    await user.type(screen.getByLabelText(/description/i), 'I need help');
    await user.click(screen.getByRole('button', { name: /send/i }));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        '/api/contact',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        })
      );
    });

    const [[, requestInit]] = fetchMock.mock.calls as [[string, RequestInit]];
    expect(requestInit.body).toBe(
      JSON.stringify({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '123456789',
        description: 'I need help',
      })
    );

    expect(await screen.findByText(/thanks! we will get back to you shortly/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toHaveValue('');
    expect(screen.getByLabelText(/description/i)).toHaveValue('');
  });

  it('shows an error message when the API responds with an error', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ success: false, message: 'Too many requests' }),
    });

    render(<ContactForm />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/first name/i), 'Jane');
    await user.type(screen.getByLabelText(/email/i), 'jane.doe@example.com');
    await user.type(screen.getByLabelText(/description/i), 'Help please');
    await user.click(screen.getByRole('button', { name: /send/i }));

    expect(await screen.findByText(/too many requests/i)).toBeInTheDocument();
  });
});
