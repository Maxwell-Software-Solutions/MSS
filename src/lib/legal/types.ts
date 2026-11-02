export type LegalLanguage = 'en' | 'lt';

/**
 * Inline markup used in every string below, rendered by `renderInline`:
 * **bold**, `code`, and [label](url) where url is a /path, #anchor, mailto: or https:// address.
 */
export type LegalBlock =
  | { kind: 'p'; text: string }
  | { kind: 'ul'; items: string[] }
  | { kind: 'ol'; items: string[] }
  | { kind: 'h3'; id?: string; text: string }
  | { kind: 'dl'; rows: Array<{ term: string; def: string }> }
  | { kind: 'table'; caption: string; head: string[]; rows: string[][] }
  | { kind: 'note'; title?: string; blocks: LegalBlock[] }
  | { kind: 'cookieSettings'; label: string; unavailable: string };

export interface LegalSection {
  id: string;
  title: string;
  blocks: LegalBlock[];
}

export interface LegalDoc {
  lang: LegalLanguage;
  eyebrow: string;
  title: string;
  updatedLabel: string;
  updated: string;
  intro: string;
  contentsLabel: string;
  sections: LegalSection[];
  meta: { title: string; description: string };
}
