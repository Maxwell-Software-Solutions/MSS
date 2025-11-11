/**
 * Analytics Event Tracking Utilities
 *
 * Event Naming Convention:
 * - category.action.label
 * - Use lowercase with underscores for multi-word parts
 * - Examples: cta.click.hero_primary, form.submit.contact, outbound.click.github
 */

export type AnalyticsEvent = {
  category: string;
  action: string;
  label?: string;
  value?: number;
};

/**
 * Track a custom analytics event
 */
export function trackEvent(event: AnalyticsEvent): void {
  if (typeof window === 'undefined') return;

  const { category, action, label, value } = event;
  const eventName = label ? `${category}.${action}.${label}` : `${category}.${action}`;

  // Google Analytics 4
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }

  // Console log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics]', eventName, { category, action, label, value });
  }
}

/**
 * Track CTA button clicks
 */
export function trackCTAClick(label: string): void {
  trackEvent({
    category: 'cta',
    action: 'click',
    label,
  });
}

/**
 * Track form submissions
 */
export function trackFormSubmit(formName: string, success: boolean): void {
  trackEvent({
    category: 'form',
    action: 'submit',
    label: `${formName}_${success ? 'success' : 'failure'}`,
  });
}

/**
 * Track outbound link clicks
 */
export function trackOutboundClick(label: string, url: string): void {
  trackEvent({
    category: 'outbound',
    action: 'click',
    label,
  });

  // Additional tracking for URL
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'click', {
      event_category: 'outbound',
      event_label: label,
      transport_type: 'beacon',
      link_url: url,
    });
  }
}

/**
 * Track page views (for SPAs)
 */
export function trackPageView(url: string): void {
  if (typeof window.gtag === 'function') {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '', {
      page_path: url,
    });
  }
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
