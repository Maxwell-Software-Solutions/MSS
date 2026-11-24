import type { LegalLanguage } from './types';

/** A page's language from its [lang] segment. The middleware sets it from `?lang=`, a /lt/ address or the language cookie. */
export function pageLanguage(lang: string): LegalLanguage {
  return lang === 'lt' ? 'lt' : 'en';
}
