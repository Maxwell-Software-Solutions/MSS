import { render } from '@testing-library/react';
import GoogleAnalytics from './GoogleAnalytics';

// Mock next/script
jest.mock('next/script', () => {
  return function Script({ children, dangerouslySetInnerHTML, ...props }: any) {
    if (dangerouslySetInnerHTML) {
      return <script {...props} dangerouslySetInnerHTML={dangerouslySetInnerHTML} />;
    }
    return <script {...props}>{children}</script>;
  };
});

describe('GoogleAnalytics', () => {
  it('renders Google Analytics scripts with correct measurement ID', () => {
    const { container } = render(<GoogleAnalytics measurementId="G-TEST123" />);
    
    const scripts = container.querySelectorAll('script');
    expect(scripts.length).toBeGreaterThanOrEqual(1);
    
    // Check if gtag script is present
    const gtagScript = Array.from(scripts).find(
      script => script.getAttribute('src')?.includes('gtag/js')
    );
    expect(gtagScript).toBeDefined();
    expect(gtagScript?.getAttribute('src')).toContain('G-TEST123');
  });

  it('includes configuration script with measurement ID', () => {
    const { container } = render(<GoogleAnalytics measurementId="G-TEST123" />);
    
    const configScript = Array.from(container.querySelectorAll('script')).find(
      script => script.innerHTML?.includes('gtag')
    );
    
    expect(configScript).toBeDefined();
    expect(configScript?.innerHTML).toContain('G-TEST123');
    expect(configScript?.innerHTML).toContain('dataLayer');
  });

  it('renders with production measurement ID', () => {
    const { container } = render(<GoogleAnalytics measurementId="G-Z934MSEFV5" />);
    
    const scripts = container.querySelectorAll('script');
    expect(scripts.length).toBeGreaterThanOrEqual(1);
    
    const gtagScript = Array.from(scripts).find(
      script => script.getAttribute('src')?.includes('G-Z934MSEFV5')
    );
    expect(gtagScript).toBeDefined();
  });
});
