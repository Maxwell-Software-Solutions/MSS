'use client';

import { useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/lib/LanguageContext';
import { isLithuanianPath } from '@/lib/page-language';

/**
 * The header's and the phone menu's language switch. A /lt/ page has no English twin, so switching to English
 * opens the English home page. It is a full page load: the client router does not complete a move to "/" on this site.
 */
export function useLanguageToggle(): { language: 'en' | 'lt'; toggleLanguage: () => void } {
  const { language, setLanguage } = useLanguage();
  const pathname = usePathname();

  const toggleLanguage = useCallback(() => {
    const next = language === 'en' ? 'lt' : 'en';
    setLanguage(next);
    if (next === 'en' && isLithuanianPath(pathname)) window.location.assign('/');
  }, [language, setLanguage, pathname]);

  return { language, toggleLanguage };
}
