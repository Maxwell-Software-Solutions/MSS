import { privacyEn } from './privacy-en';
import { privacyLt } from './privacy-lt';
import type { LegalDoc, LegalLanguage } from './types';

/** Every legal page in both languages. The two versions are kept side by side so they say the same thing. */
export const LEGAL_DOCS = {
  privacy: { en: privacyEn, lt: privacyLt },
} as const satisfies Record<string, Record<LegalLanguage, LegalDoc>>;

export type LegalKind = keyof typeof LEGAL_DOCS;
