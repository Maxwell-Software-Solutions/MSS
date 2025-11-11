import { useLanguage } from './LanguageContext';
import { useState, useEffect } from 'react';

/**
 * Hook for handling translations with proper hydration support.
 * Returns a translation function that prevents hydration mismatches
 * by providing fallback values during SSR.
 * 
 * With server-side critical translations, this will now prefer
 * server-injected translations over fallbacks when available.
 */
export function useHydratedTranslation(): (key: string, fallback: string) => string {
  const { t } = useLanguage();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  /**
   * Hydration-safe translation function
   * @param key Translation key
   * @param fallback Fallback text to use during SSR and if translation is missing
   * @returns Translated text or fallback
   */
  const ht = (key: string, fallback: string): string => {
    // Always try the translation function first (it may have server-injected critical translations)
    const translated = t(key);
    
    // If we got back the key itself, it means no translation was found
    if (translated !== key) {
      return translated;
    }
    
    // During SSR or before translations load, use fallback
    if (!isHydrated) {
      return fallback;
    }
    
    // Client-side but no translation found, use fallback
    return fallback;
  };

  return ht;
}