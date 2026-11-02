import { privacyEn } from './privacy-en';
import { privacyLt } from './privacy-lt';
import { securityEn } from './security-en';
import { securityLt } from './security-lt';
import { termsEn } from './terms-en';
import { termsLt } from './terms-lt';
import type { LegalDoc, LegalLanguage } from './types';

/** Every legal page in both languages. The two versions are kept side by side so they say the same thing. */
export const LEGAL_DOCS = {
  privacy: { en: privacyEn, lt: privacyLt },
  terms: { en: termsEn, lt: termsLt },
  security: { en: securityEn, lt: securityLt },
} as const satisfies Record<string, Record<LegalLanguage, LegalDoc>>;

export type LegalKind = keyof typeof LEGAL_DOCS;
