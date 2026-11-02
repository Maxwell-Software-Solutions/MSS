import { cookies } from 'next/headers';
import type { LegalLanguage } from './types';

/** `?lang=lt` or `?lang=en` in a link; anything else is ignored. */
export function parseLanguage(value: string | string[] | undefined): LegalLanguage | undefined {
  const first = Array.isArray(value) ? value[0] : value;
  return first === 'lt' || first === 'en' ? first : undefined;
}

/** The language of a request: the link's `?lang=`, else the site's `language` cookie, else English. */
export async function resolveLanguage(requested: LegalLanguage | undefined): Promise<LegalLanguage> {
  if (requested) return requested;
  const stored = (await cookies()).get('language')?.value;
  return stored === 'lt' ? 'lt' : 'en';
}
