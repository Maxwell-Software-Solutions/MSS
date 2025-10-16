'use client';

import Script from 'next/script';
import type { ReactElement } from 'react';

interface CookiebotProps {
  cbid: string;
}

/**
 * Cookiebot component for cookie consent management
 * @param cbid - Cookiebot ID for the consent banner
 */
export default function Cookiebot({ cbid }: CookiebotProps): ReactElement {
  return (
    <Script
      id="Cookiebot"
      src="https://consent.cookiebot.com/uc.js"
      data-cbid={cbid}
      data-blockingmode="auto"
      type="text/javascript"
      strategy="beforeInteractive"
    />
  );
}
