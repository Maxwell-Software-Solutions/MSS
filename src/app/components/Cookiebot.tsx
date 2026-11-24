'use client';

import Script from 'next/script';
import type { ReactElement } from 'react';

interface CookiebotProps {
  cbid: string;
}

/**
 * Cookiebot component for cookie consent management.
 * Manual blocking mode: Google Analytics already waits for consent in code. Auto mode wraps addEventListener and
 * swallows stylesheet load events, so React held every navigation to a page with new CSS for its 60-second timeout.
 * @param cbid - Cookiebot ID for the consent banner
 */
export default function Cookiebot({ cbid }: CookiebotProps): ReactElement {
  return (
    <Script
      id="Cookiebot"
      src="https://consent.cookiebot.com/uc.js"
      data-cbid={cbid}
      type="text/javascript"
      strategy="lazyOnload"
    />
  );
}
