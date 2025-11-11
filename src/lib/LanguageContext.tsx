'use client';

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';

type Language = 'en' | 'lt';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }): React.ReactElement {
  const [language, setLanguageState] = useState<Language>('en');
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [isClient, setIsClient] = useState(false);

  // Mark when we're on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Load translations when language changes
  useEffect(() => {
    async function loadTranslations(): Promise<void> {
      try {
        const translationModule = await import(`@/lib/translations/${language}.json`);
        setTranslations(translationModule.default);
      } catch (error) {
        console.error(`Failed to load translations for ${language}:`, error);
        setTranslations({});
      }
    }
    void loadTranslations();
  }, [language]);

  // Load language preference from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('language') as Language | null;
      if (saved && (saved === 'en' || saved === 'lt')) {
        setLanguageState(saved);
      }
    }
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
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
      // During SSR or before translations load, return the key itself to avoid hydration mismatch
      if (!isClient || Object.keys(translations).length === 0) {
        return key;
      }
      return translations[key] || key;
    },
    [translations, isClient]
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
