// Mock for LanguageContext used in tests
import { createContext, useContext, useCallback } from 'react';
import enTranslations from '../translations/en.json';

type Language = 'en' | 'lt';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const MockLanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const setLanguage = useCallback(() => {
    // No-op for tests
  }, []);

  const t = useCallback((key: string): string => {
    return (enTranslations as Record<string, string>)[key] || key;
  }, []);

  return (
    <MockLanguageContext.Provider value={{ language: 'en', setLanguage, t }}>
      {children}
    </MockLanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(MockLanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
