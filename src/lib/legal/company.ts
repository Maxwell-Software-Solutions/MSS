import { CONTACT_EMAIL, CONTACT_PHONE } from '@/app/contact/contact.constants';

const DOMAIN = 'maxwellsoftwaresolutions.com';

/** Provider details shown in the footer and in the legal pages. One source, so they cannot drift apart. */
export const COMPANY = {
  /** Name exactly as the Register of Legal Entities holds it. */
  registerName: 'Maxwell software solutions, MB',
  brand: 'Maxwell Software Solutions',
  code: '307462076',
  street: 'Gvazdikų Sodų 4-oji g. 4',
  city: 'LT-10240 Vilnius',
  site: `https://www.${DOMAIN}`,
  domain: DOMAIN,
  phone: CONTACT_PHONE,
  emails: {
    /** The address shown in the footer and on the contact page. */
    general: CONTACT_EMAIL,
    privacy: `privacy@${DOMAIN}`,
    security: `security@${DOMAIN}`,
    legal: `legal@${DOMAIN}`,
  },
} as const;

/** Date of the current wording of the three legal pages. Change it whenever their text changes. */
export const LEGAL_UPDATED = {
  iso: '2026-11-02',
  en: '2 November 2026',
  lt: '2026 m. lapkričio 2 d.',
} as const;

export const VDAI = {
  site: 'https://vdai.lrv.lt',
  email: 'ada@ada.lt',
  phone: '+370 5 271 2804',
  address: 'L. Sapiegos g. 17, 10312 Vilnius',
} as const;

/** `[address](mailto:address)` for the inline markup. */
export function mail(address: string): string {
  return `[${address}](mailto:${address})`;
}
