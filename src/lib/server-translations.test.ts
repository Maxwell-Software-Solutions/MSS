import en from './translations/en.json';
import lt from './translations/lt.json';
import { getCriticalTranslations } from './server-translations';

const dictionaries: Array<[string, Record<string, string>]> = [
  ['en', en as Record<string, string>],
  ['lt', lt as Record<string, string>],
];

describe('translations', () => {
  it('carry the same keys in English and Lithuanian', () => {
    const english = Object.keys(en).sort();
    const lithuanian = Object.keys(lt).sort();
    expect(lithuanian).toEqual(english);
  });

  it.each(dictionaries)('%s: no key is empty', (_language, dictionary) => {
    const empty = Object.entries(dictionary)
      .filter(([, value]) => !value.trim())
      .map(([key]) => key);
    expect(empty).toEqual([]);
  });

  it.each(dictionaries)('%s: the removed proof leaves no keys behind', (_language, dictionary) => {
    const stale = Object.keys(dictionary).filter((key) =>
      ['stats.', 'socialProof.', 'projects.', 'caseStudies.', 'caseStudiesPage.'].some((prefix) => key.startsWith(prefix))
    );
    expect(stale).toEqual([]);
  });

  it.each(dictionaries)('%s: every Real AI work key is sent with the server-rendered page', (_language, dictionary) => {
    const keys = Object.keys(dictionary).filter((key) => key.startsWith('realWork.'));
    expect(keys.length).toBeGreaterThanOrEqual(20);
    const critical = getCriticalTranslations(dictionary);
    expect(keys.filter((key) => critical[key] !== dictionary[key])).toEqual([]);
  });

  it('writes AI as DI throughout the Lithuanian Real AI work copy', () => {
    const text = Object.entries(lt)
      .filter(([key]) => key.startsWith('realWork.'))
      .map(([, value]) => value)
      .join(' ');
    expect(text).toMatch(/\bDI\b/);
    expect(text).not.toMatch(/\bAI\b/);
  });
});
