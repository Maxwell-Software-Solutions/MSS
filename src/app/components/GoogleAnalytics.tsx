'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import { CONSENT_EVENTS, hasStatisticsConsent } from '@/lib/consent';

interface GoogleAnalyticsProps {
  measurementId: string;
}

const EXPIRED = 'Thu, 01 Jan 1970 00:00:00 GMT';

/** Removes one cookie from this host and from every parent domain it could have been set on. */
function expireCookie(name: string): void {
  const parts = window.location.hostname.split('.');
  document.cookie = `${name}=; expires=${EXPIRED}; path=/`;
  for (let i = 0; i < parts.length - 1; i += 1) {
    const domain = parts.slice(i).join('.');
    document.cookie = `${name}=; expires=${EXPIRED}; path=/; domain=${domain}`;
    document.cookie = `${name}=; expires=${EXPIRED}; path=/; domain=.${domain}`;
  }
}

/** Switches Google Analytics off after consent is withdrawn: no more hits, and its cookies are removed. */
function stopAnalytics(measurementId: string): void {
  (window as unknown as Record<string, unknown>)[`ga-disable-${measurementId}`] = true;
  document.cookie
    .split(';')
    .map((entry) => entry.split('=')[0]?.trim() ?? '')
    .filter((name) => /^_ga(_.+)?$/.test(name))
    .forEach(expireCookie);
}

/**
 * Google Analytics, loaded only after the visitor has accepted statistics cookies in the Cookiebot banner.
 * Without that consent (including when the banner cannot be shown) nothing is loaded, no cookie is set
 * and no request goes to Google.
 * @param measurementId - Google Analytics measurement ID (e.g., 'G-Z934MSEFV5')
 */
export default function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps): ReactElement | null {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const sync = (): void => {
      const consented = hasStatisticsConsent();
      if (consented) {
        (window as unknown as Record<string, unknown>)[`ga-disable-${measurementId}`] = false;
      } else if (window.gtag || window.Cookiebot?.hasResponse) {
        stopAnalytics(measurementId);
      }
      setAllowed(consented);
    };
    sync();
    CONSENT_EVENTS.forEach((name) => window.addEventListener(name, sync));
    return () => CONSENT_EVENTS.forEach((name) => window.removeEventListener(name, sync));
  }, [measurementId]);

  if (!allowed) return null;

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}
