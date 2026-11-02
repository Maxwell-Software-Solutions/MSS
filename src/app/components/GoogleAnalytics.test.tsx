import { act, render } from '@testing-library/react';
import GoogleAnalytics from './GoogleAnalytics';

// Mock next/script
jest.mock('next/script', () => {
  return function Script({ 
    children, 
    dangerouslySetInnerHTML, 
    ...props 
  }: { 
    children?: React.ReactNode; 
    dangerouslySetInnerHTML?: { __html: string }; 
    [key: string]: unknown;
  }) {
    if (dangerouslySetInnerHTML) {
      return <script {...props} dangerouslySetInnerHTML={dangerouslySetInnerHTML} />;
    }
    return <script {...props}>{children}</script>;
  };
});

function setConsent(statistics: boolean): void {
  window.Cookiebot = { consent: { necessary: true, statistics } };
}

describe('GoogleAnalytics', () => {
  afterEach(() => {
    delete window.Cookiebot;
    delete window.gtag;
    delete (window as unknown as Record<string, unknown>)['ga-disable-G-TEST123'];
    document.cookie = '_ga=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
    document.cookie = '_ga_TEST123=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
  });

  it('loads nothing before the visitor has consented', () => {
    const { container } = render(<GoogleAnalytics measurementId="G-TEST123" />);
    expect(container.querySelectorAll('script')).toHaveLength(0);
  });

  it('loads nothing when the consent banner is not there at all', () => {
    expect(window.Cookiebot).toBeUndefined();
    const { container } = render(<GoogleAnalytics measurementId="G-TEST123" />);
    expect(container.innerHTML).toBe('');
  });

  it('loads nothing when only necessary cookies are accepted', () => {
    setConsent(false);
    const { container } = render(<GoogleAnalytics measurementId="G-TEST123" />);
    expect(container.querySelectorAll('script')).toHaveLength(0);
  });

  it('renders Google Analytics scripts with the measurement ID once statistics are accepted', () => {
    setConsent(true);
    const { container } = render(<GoogleAnalytics measurementId="G-TEST123" />);

    const scripts = container.querySelectorAll('script');
    expect(scripts.length).toBeGreaterThanOrEqual(1);

    const gtagScript = Array.from(scripts).find((script) => script.getAttribute('src')?.includes('gtag/js'));
    expect(gtagScript).toBeDefined();
    expect(gtagScript?.getAttribute('src')).toContain('G-TEST123');
  });

  it('includes the configuration script with the measurement ID after consent', () => {
    setConsent(true);
    const { container } = render(<GoogleAnalytics measurementId="G-TEST123" />);

    const configScript = Array.from(container.querySelectorAll('script')).find((script) =>
      script.innerHTML?.includes('gtag'),
    );

    expect(configScript).toBeDefined();
    expect(configScript?.innerHTML).toContain('G-TEST123');
    expect(configScript?.innerHTML).toContain('dataLayer');
  });

  it('renders with the production measurement ID after consent', () => {
    setConsent(true);
    const { container } = render(<GoogleAnalytics measurementId="G-Z934MSEFV5" />);

    const gtagScript = Array.from(container.querySelectorAll('script')).find((script) =>
      script.getAttribute('src')?.includes('G-Z934MSEFV5'),
    );
    expect(gtagScript).toBeDefined();
  });

  it('starts when the visitor accepts later, on the Cookiebot event', () => {
    setConsent(false);
    const { container } = render(<GoogleAnalytics measurementId="G-TEST123" />);
    expect(container.querySelectorAll('script')).toHaveLength(0);

    act(() => {
      setConsent(true);
      window.dispatchEvent(new Event('CookiebotOnAccept'));
    });

    expect(container.querySelectorAll('script').length).toBeGreaterThanOrEqual(1);
  });

  it('stops and removes its cookies when consent is withdrawn', () => {
    setConsent(true);
    const { container } = render(<GoogleAnalytics measurementId="G-TEST123" />);
    window.gtag = jest.fn();
    document.cookie = '_ga=GA1.1.1.1; path=/';
    document.cookie = '_ga_TEST123=GS2.1.s1; path=/';
    document.cookie = 'language=lt; path=/';
    expect(document.cookie).toContain('_ga=');

    act(() => {
      setConsent(false);
      window.dispatchEvent(new Event('CookiebotOnDecline'));
    });

    expect(container.querySelectorAll('script')).toHaveLength(0);
    expect((window as unknown as Record<string, unknown>)['ga-disable-G-TEST123']).toBe(true);
    expect(document.cookie).not.toContain('_ga');
    expect(document.cookie).toContain('language=lt');
    document.cookie = 'language=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
  });

  it('removes leftover analytics cookies once the visitor has declined', () => {
    document.cookie = '_ga=GA1.1.1.1; path=/';
    window.Cookiebot = { hasResponse: true, consent: { necessary: true, statistics: false } };
    render(<GoogleAnalytics measurementId="G-TEST123" />);
    expect(document.cookie).not.toContain('_ga');
  });
});
