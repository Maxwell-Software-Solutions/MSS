/**
 * Cookie consent, as reported by the Cookiebot banner.
 * Docs: https://www.cookiebot.com/en/developer/
 */
export interface CookiebotApi {
  consent?: {
    necessary?: boolean;
    preferences?: boolean;
    statistics?: boolean;
    marketing?: boolean;
    method?: string | null;
  };
  consented?: boolean;
  declined?: boolean;
  hasResponse?: boolean;
  renew?: () => void;
  withdraw?: () => void;
}

declare global {
  interface Window {
    Cookiebot?: CookiebotApi;
  }
}

/** Window events Cookiebot fires when the visitor's choice is known or changes (also on later page loads). */
export const CONSENT_EVENTS = [
  'CookiebotOnConsentReady',
  'CookiebotOnAccept',
  'CookiebotOnDecline',
  'CookiebotOnLoad',
] as const;

/** True only when the visitor has actively accepted statistics cookies. No banner means no consent. */
export function hasStatisticsConsent(): boolean {
  return typeof window !== 'undefined' && window.Cookiebot?.consent?.statistics === true;
}

/** Re-opens the Cookiebot banner. Returns false when the banner is not available on this page. */
export function openCookieSettings(): boolean {
  if (typeof window === 'undefined') return false;
  const api = window.Cookiebot;
  if (!api || typeof api.renew !== 'function') return false;
  api.renew();
  return true;
}
