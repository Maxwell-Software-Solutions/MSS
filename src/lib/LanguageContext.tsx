'use client';

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';

type Language = 'en' | 'lt';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
  initialLanguage?: Language;
  criticalTranslations?: Record<string, string>;
}

export function LanguageProvider({ 
  children, 
  initialLanguage, 
  criticalTranslations = {} 
}: LanguageProviderProps): React.ReactElement {
  const [language, setLanguageState] = useState<Language>(initialLanguage ?? 'en');
  const [translations, setTranslations] = useState<Record<string, string>>(criticalTranslations);
  const [isClient, setIsClient] = useState(false);

  // Mark when we're on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Load full translations when language changes
  useEffect(() => {
    async function loadTranslations(): Promise<void> {
      try {
        const translationModule = await import(`@/lib/translations/${language}.json`);
        // Use full client translations which include all keys
        setTranslations(translationModule.default);
      } catch (error) {
        console.error(`Failed to load translations for ${language}:`, error);
        // On error, keep whatever translations we have
        setTranslations(criticalTranslations);
      }
    }
    void loadTranslations();
  }, [language, criticalTranslations]);

  // Load language preference from localStorage on mount if no initialLanguage provided
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('language') as Language | null;
      if (!initialLanguage && saved && (saved === 'en' || saved === 'lt')) {
        setLanguageState(saved);
      }
      // Ensure document lang matches selected/preferred language after mount
      const docLang = initialLanguage ?? saved ?? 'en';
      document.documentElement.setAttribute('lang', docLang);
    }
    // only run on mount or when initialLanguage changes
  }, [initialLanguage]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
      // Persist language in a cookie so SSR can read it on next request
      document.cookie = `language=${lang}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
      document.documentElement.setAttribute('lang', lang);

      // Announce language change for screen readers
      const announcement = lang === 'en' ? 'Language changed to English' : 'Kalba pakeista į lietuvių';
      const announcer = document.createElement('div');
      announcer.setAttribute('role', 'status');
      announcer.setAttribute('aria-live', 'polite');
      announcer.className = 'sr-only';
      announcer.textContent = announcement;
      document.body.appendChild(announcer);
      setTimeout(() => document.body.removeChild(announcer), 1000);
    }
  }, []);

  const t = useCallback(
    (key: string): string => {
      // During SSR or before translations load, use critical translations if available
      if (!isClient || Object.keys(translations).length === 0) {
        return criticalTranslations[key] || key;
      }
      
      // Once client translations are loaded, prioritize them over server critical translations
      return translations[key] || key;
    },
    [translations, isClient, criticalTranslations]
  );

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
