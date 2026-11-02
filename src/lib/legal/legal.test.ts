import { LEGAL_DOCS } from './index';
import { COMPANY, LEGAL_UPDATED } from './company';
import type { LegalBlock, LegalDoc, LegalLanguage } from './types';

const KINDS = Object.keys(LEGAL_DOCS) as Array<keyof typeof LEGAL_DOCS>;
const ALL_DOCS: Array<[string, LegalLanguage, LegalDoc]> = KINDS.flatMap((kind) =>
  (['en', 'lt'] as const).map((lang): [string, LegalLanguage, LegalDoc] => [kind, lang, LEGAL_DOCS[kind][lang]]),
);

const KNOWN_MAILBOXES = new Set<string>([
  COMPANY.emails.general,
  COMPANY.emails.privacy,
  COMPANY.emails.security,
  COMPANY.emails.legal,
  'ada@ada.lt',
]);
const INTERNAL_PATHS = new Set(['/privacy', '/terms', '/security', '/contact']);

/** Every string in a block, in order, so markup and links can be checked wherever they are. */
function textsOf(block: LegalBlock): string[] {
  switch (block.kind) {
    case 'p':
      return [block.text];
    case 'ul':
    case 'ol':
      return block.items;
    case 'h3':
      return [block.text];
    case 'dl':
      return block.rows.flatMap((row) => [row.term, row.def]);
    case 'table':
      return [block.caption, ...block.head, ...block.rows.flat()];
    case 'note':
      return [...(block.title ? [block.title] : []), ...block.blocks.flatMap(textsOf)];
    case 'cookieSettings':
      return [block.label, block.unavailable];
  }
}

function shapeOf(block: LegalBlock): string {
  switch (block.kind) {
    case 'ul':
    case 'ol':
      return `${block.kind}:${block.items.length}`;
    case 'dl':
      return `dl:${block.rows.length}`;
    case 'table':
      return `table:${block.head.length}x${block.rows.length}:${block.rows.map((row) => row.length).join(',')}`;
    case 'note':
      return `note[${block.blocks.map(shapeOf).join('|')}]`;
    case 'h3':
      return `h3:${block.id ?? ''}`;
    default:
      return block.kind;
  }
}

function hrefsOf(texts: string[]): string[] {
  return texts.flatMap((text) => [...text.matchAll(/\]\(([^)\s]+)\)/g)].map((match) => match[1] ?? ''));
}

/** Language-specific pages of the same document count as the same link. */
function normalise(href: string): string {
  return href
    .replace('https://vdai.lrv.lt/en/', 'https://vdai.lrv.lt/')
    .replace(/\?hl=(en|lt)$/, '')
    .replace(/\/(eng|lit)$/, '');
}

function sectionTexts(doc: LegalDoc): string[] {
  return doc.sections.flatMap((section) => [section.title, ...section.blocks.flatMap(textsOf)]);
}

describe('legal documents', () => {
  it.each(KINDS)('%s: English and Lithuanian have the same sections, in the same order', (kind) => {
    const ids = (lang: LegalLanguage): string[] => LEGAL_DOCS[kind][lang].sections.map((section) => section.id);
    expect(ids('lt')).toEqual(ids('en'));
  });

  it.each(KINDS)('%s: every section has the same shape in both languages', (kind) => {
    const en = LEGAL_DOCS[kind].en.sections;
    const lt = LEGAL_DOCS[kind].lt.sections;
    en.forEach((section, index) => {
      const other = lt[index];
      expect(other?.blocks.map(shapeOf)).toEqual(section.blocks.map(shapeOf));
    });
  });

  it.each(KINDS)('%s: both languages link to the same places', (kind) => {
    const links = (lang: LegalLanguage): string[][] =>
      LEGAL_DOCS[kind][lang].sections.map((section) =>
        hrefsOf([section.title, ...section.blocks.flatMap(textsOf)]).map(normalise).sort(),
      );
    expect(links('lt')).toEqual(links('en'));
  });

  it.each(ALL_DOCS)('%s (%s): links are well formed and point somewhere real', (_kind, _lang, doc) => {
    const anchors = new Set<string>();
    for (const section of doc.sections) {
      anchors.add(section.id);
      for (const block of section.blocks) if (block.kind === 'h3' && block.id) anchors.add(block.id);
    }
    for (const href of hrefsOf(sectionTexts(doc))) {
      if (href.startsWith('#')) expect(anchors).toContain(href.slice(1));
      else if (href.startsWith('/')) expect(INTERNAL_PATHS).toContain(href);
      else if (href.startsWith('mailto:')) expect(KNOWN_MAILBOXES).toContain(href.slice('mailto:'.length));
      else expect(href).toMatch(/^https:\/\/[a-z0-9.-]+\.[a-z]{2,}(\/\S*)?$/);
    }
  });

  it.each(ALL_DOCS)('%s (%s): inline markup is balanced', (_kind, _lang, doc) => {
    for (const text of sectionTexts(doc)) {
      expect(text.split('**').length % 2).toBe(1);
      expect((text.match(/`/g) ?? []).length % 2).toBe(0);
      expect((text.match(/\[/g) ?? []).length).toBe((text.match(/\]\(/g) ?? []).length);
    }
  });

  it.each(ALL_DOCS)('%s (%s): carries its language, the current date and no empty text', (_kind, lang, doc) => {
    expect(doc.lang).toBe(lang);
    expect(doc.updated).toBe(LEGAL_UPDATED[lang]);
    for (const text of [doc.title, doc.eyebrow, doc.intro, doc.meta.title, doc.meta.description, ...sectionTexts(doc)]) {
      expect(text.trim()).not.toBe('');
    }
    expect(doc.meta.description.length).toBeLessThanOrEqual(200);
  });

  it.each(ALL_DOCS)('%s (%s): section ids are unique', (_kind, _lang, doc) => {
    const ids = doc.sections.map((section) => section.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
