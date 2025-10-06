import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from './contactForm';

const originalEnv = { ...process.env };
const globalAny = global as typeof globalThis & { fetch?: typeof fetch };
const originalFetch = globalAny.fetch;

function setEnv(overrides: Record<string, string | undefined>): void {
  const nextEnv: NodeJS.ProcessEnv = { ...originalEnv };
  for (const [key, value] of Object.entries(overrides)) {
    if (typeof value === 'string') {
      nextEnv[key] = value;
    } else {
      delete nextEnv[key];
    }
  }

  process.env = nextEnv;
}

describe('ContactForm', () => {
  afterEach(() => {
    jest.resetAllMocks();
    process.env = { ...originalEnv };
    if (originalFetch) {
      globalAny.fetch = originalFetch;
    } else {
      delete globalAny.fetch;
    }
  });

  it('submits form data to the Apps Script endpoint and shows the success message', async () => {
    setEnv({
      NEXT_PUBLIC_APPS_SCRIPT_URL: 'https://script.example.com/contact',
      NEXT_PUBLIC_SHARED_TOKEN: 'token-123',
    });

    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      headers: {
        get: (name: string) => (name.toLowerCase() === 'content-type' ? 'application/json' : null),
      },
      json: jest.fn().mockResolvedValue({ message: 'All good!' }),
      text: jest.fn().mockResolvedValue('All good!'),
    });

    globalAny.fetch = fetchMock as unknown as typeof fetch;

    render(<ContactForm />);

    const user = userEvent.setup();
    await user.type(screen.getByLabelText('First name'), 'Jane');
    await user.type(screen.getByLabelText('Last name'), 'Doe');
    await user.type(screen.getByLabelText(/email/i), 'jane@example.com');
    await user.type(screen.getByLabelText('Phone'), '123-456-7890');
    await user.type(screen.getByLabelText(/description/i), 'Need help with our CI pipeline.');
    await user.click(screen.getByRole('button', { name: 'Send' }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));

    const [endpoint, options] = fetchMock.mock.calls[0];

    expect(endpoint).toBe('https://script.example.com/contact');
    expect(options?.method).toBe('POST');
    expect(options?.headers).toEqual({ 'Content-Type': 'application/json' });

    const body = JSON.parse((options?.body as string) ?? '{}');
    expect(body).toMatchObject({
      token: 'token-123',
      name: 'Jane Doe',
      email: 'jane@example.com',
      message: 'Need help with our CI pipeline.',
      phone: '123-456-7890',
    });

    await waitFor(() => expect(screen.getByText('All good!')).toBeInTheDocument());
    expect((screen.getByLabelText('First name') as HTMLInputElement).value).toBe('');
  });

  it('surfaces the response text when the Apps Script call fails', async () => {
    setEnv({
      NEXT_PUBLIC_APPS_SCRIPT_URL: 'https://script.example.com/contact',
      NEXT_PUBLIC_SHARED_TOKEN: 'token-123',
    });

    const fetchMock = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
      headers: {
        get: (name: string) => (name.toLowerCase() === 'content-type' ? 'text/plain' : null),
      },
      json: jest.fn(),
      text: jest.fn().mockResolvedValue('Upstream error'),
    });

    globalAny.fetch = fetchMock as unknown as typeof fetch;

    render(<ContactForm />);

    const user = userEvent.setup();
    await user.type(screen.getByLabelText('First name'), 'Sam');
    await user.type(screen.getByLabelText(/email/i), 'sam@example.com');
    await user.type(screen.getByLabelText(/description/i), 'Hello world');
    await user.click(screen.getByRole('button', { name: 'Send' }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(screen.getByText('Upstream error')).toBeInTheDocument());
  });

  it('disables submission when configuration is missing', () => {
    setEnv({
      NEXT_PUBLIC_APPS_SCRIPT_URL: undefined,
      NEXT_PUBLIC_SHARED_TOKEN: undefined,
    });

    render(<ContactForm />);

    expect(screen.getByRole('button', { name: 'Temporarily unavailable' })).toBeDisabled();
    expect(screen.getByText(/Our form is offline right now/i)).toBeInTheDocument();
  });
});
