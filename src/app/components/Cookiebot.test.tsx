import { render } from '@testing-library/react';
import Cookiebot from './Cookiebot';

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

describe('Cookiebot', () => {
  it('renders Cookiebot script with correct cbid', () => {
    const { container } = render(<Cookiebot cbid="c99c6734-f40a-4c0f-842f-aea763f24ee7" />);
    
    const scripts = container.querySelectorAll('script');
    expect(scripts.length).toBeGreaterThanOrEqual(1);
    
    // Check if Cookiebot script is present
    const cookiebotScript = Array.from(scripts).find(
      script => script.getAttribute('src')?.includes('consent.cookiebot.com')
    );
    expect(cookiebotScript).toBeDefined();
    expect(cookiebotScript?.getAttribute('src')).toBe('https://consent.cookiebot.com/uc.js');
  });

  it('includes correct data attributes', () => {
    const { container } = render(<Cookiebot cbid="c99c6734-f40a-4c0f-842f-aea763f24ee7" />);
    
    const cookiebotScript = Array.from(container.querySelectorAll('script')).find(
      script => script.getAttribute('src')?.includes('consent.cookiebot.com')
    );
    
    expect(cookiebotScript).toBeDefined();
    expect(cookiebotScript?.getAttribute('data-cbid')).toBe('c99c6734-f40a-4c0f-842f-aea763f24ee7');
    expect(cookiebotScript?.getAttribute('data-blockingmode')).toBe('auto');
    expect(cookiebotScript?.getAttribute('type')).toBe('text/javascript');
  });

  it('renders with production cbid', () => {
    const { container } = render(<Cookiebot cbid="c99c6734-f40a-4c0f-842f-aea763f24ee7" />);
    
    const scripts = container.querySelectorAll('script');
    expect(scripts.length).toBeGreaterThanOrEqual(1);
    
    const cookiebotScript = Array.from(scripts).find(
      script => script.getAttribute('data-cbid')?.includes('c99c6734-f40a-4c0f-842f-aea763f24ee7')
    );
    expect(cookiebotScript).toBeDefined();
  });
});
