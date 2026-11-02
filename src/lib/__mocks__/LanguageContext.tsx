// Mock for LanguageContext used in tests
import { createContext, useContext, useCallback, useState } from 'react';
import enTranslations from '../translations/en.json';
import ltTranslations from '../translations/lt.json';

type Language = 'en' | 'lt';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const MockLanguageContext = createContext<LanguageContextType | undefined>(undefined);

const dictionaries: Record<Language, Record<string, string>> = {
  en: enTranslations as Record<string, string>,
  lt: ltTranslations as Record<string, string>,
};

// English unless a test asks for Lithuanian with initialLanguage; setLanguage switches like the real provider
export function LanguageProvider({
  children,
  initialLanguage = 'en',
}: {
  children: React.ReactNode;
  initialLanguage?: Language;
}): React.ReactElement {
  const [language, setLanguage] = useState<Language>(initialLanguage);

  const t = useCallback(
    (key: string): string => {
      return dictionaries[language][key] || key;
    },
    [language],
  );

  return (
    <MockLanguageContext.Provider value={{ language, setLanguage, t }}>{children}</MockLanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(MockLanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
