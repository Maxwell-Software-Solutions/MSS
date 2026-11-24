import { compareLists, parseNumber, splitRows } from './compare-lists';

describe('splitRows', () => {
  it('splits on tabs, semicolons and runs of two or more spaces', () => {
    expect(splitRows('PD-250\t40')).toEqual([['PD-250', '40']]);
    expect(splitRows('PD-250;40')).toEqual([['PD-250', '40']]);
    expect(splitRows('PD-250   40')).toEqual([['PD-250', '40']]);
  });

  it('keeps a thousands space inside one cell, and falls back to single spaces when there is nothing else', () => {
    expect(splitRows('PD-250  1 240,50')).toEqual([['PD-250', '1 240,50']]);
    expect(splitRows('PD-250 40')).toEqual([['PD-250', '40']]);
  });

  it('trims cells, handles Windows line endings and drops blank lines', () => {
    expect(splitRows('  PD-250  ;  40  \r\n\r\n   \r\nGU-6205\t300\r\n')).toEqual([
      ['PD-250', '40'],
      ['GU-6205', '300'],
    ]);
  });

  it('keeps an empty cell in place so later columns do not shift', () => {
    expect(splitRows('\tPD-250\t40')).toEqual([['', 'PD-250', '40']]);
  });
});

describe('parseNumber', () => {
  it.each([
    ['40', 40],
    ['1 240,50', 1240.5],
    ['1 240,50', 1240.5],
    ['1240.5', 1240.5],
    ['1240,5', 1240.5],
    ['1.240,50', 1240.5],
    ['1,240.50', 1240.5],
    ['1.240.500', 1240500],
    ['1,240,500', 1240500],
    ['0,125', 0.125],
    ['-3,5', -3.5],
  ])('reads %s as %s', (text, value) => {
    expect(parseNumber(text)).toBe(value);
  });

  it.each(['', 'abc', 'PD-250', '12abc', '--1', '4,5 vnt.'])('rejects %p', (text) => {
    expect(parseNumber(text)).toBeNull();
  });
});

describe('compareLists', () => {
  const first = 'PD-250;40\nGU-6205;300\nST-30-1000;80';
  const second = 'GU-6205;280\nPD-250;40\nSZ-304207;500';

  it('finds matching, differing, and one-sided lines, mismatches first', () => {
    const { rows, mismatches } = compareLists(first, second);
    expect(rows).toEqual([
      { code: 'GU-6205', first: 300, second: 280, status: 'diff', difference: 20 },
      { code: 'ST-30-1000', first: 80, second: null, status: 'only-first', difference: null },
      { code: 'SZ-304207', first: null, second: 500, status: 'only-second', difference: null },
      { code: 'PD-250', first: 40, second: 40, status: 'match', difference: null },
    ]);
    expect(mismatches).toBe(3);
  });

  it('matches across different separators and number formats', () => {
    const { rows, mismatches } = compareLists('PD-250\t1 240,50', 'PD-250;  1240.5');
    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({ status: 'match', first: 1240.5, second: 1240.5 });
    expect(mismatches).toBe(0);
  });

  it('adds up duplicate codes within a list and ignores the case of codes', () => {
    const { rows } = compareLists('pd-250;10\nPD-250;30,5\nPD-250;0,1', 'PD-250;40.6');
    expect(rows).toEqual([{ code: 'pd-250', first: 40.6, second: 40.6, status: 'match', difference: null }]);
  });

  it('gives a clean difference for decimals', () => {
    const { rows } = compareLists('A1;0,1\nA1;0,2', 'A1;0,4');
    expect(rows[0]).toMatchObject({ status: 'diff', first: 0.3, second: 0.4, difference: 0.1 });
  });

  it('returns nothing for empty input, on either side', () => {
    expect(compareLists('', '').rows).toEqual([]);
    expect(compareLists('  \n\t\n', '').mismatches).toBe(0);
    expect(compareLists('PD-250;40', '').rows).toEqual([{ code: 'PD-250', first: 40, second: null, status: 'only-first', difference: null }]);
  });

  it('skips lines without a code or a quantity, such as headers and totals, and counts them', () => {
    const { rows, lists } = compareLists('Kodas;Kiekis\nPD-250;40\nGU-6205;300\nIš viso;', 'PD-250;40\nGU-6205;300');
    expect(rows).toHaveLength(2);
    expect(rows.every((row) => row.status === 'match')).toBe(true);
    expect(lists[0].skipped).toBe(2);
    expect(lists[1].skipped).toBe(0);
  });
});

describe('column detection', () => {
  it('takes the first code-like column and the last numeric column, with no picker needed', () => {
    const { lists } = compareLists('PD-250;Varžtas;40\nGU-6205;Guolis;300', '');
    expect(lists[0].columns).toEqual({ code: 0, qty: 2 });
    expect(lists[0].ambiguous).toBe(false);
  });

  it('passes row numbers by when a column with letters and digits follows', () => {
    const { lists } = compareLists('1;PD-250;40\n2;GU-6205;300', '');
    expect(lists[0].columns).toEqual({ code: 1, qty: 2 });
  });

  it('uses a column of plain digits as the code when there are no ABC-123 style codes', () => {
    const { rows, lists } = compareLists('4770001;40\n4770002;5', '4770001;40');
    expect(lists[0].columns).toEqual({ code: 0, qty: 1 });
    expect(rows.map((row) => row.status)).toEqual(['only-first', 'match']);
  });

  it('is ambiguous with several numeric columns, and the picked column then counts', () => {
    const lines = 'PD-250;40;12,50;500\nGU-6205;300;2;600';
    const guessed = compareLists(lines, 'PD-250;40\nGU-6205;300');
    expect(guessed.lists[0]).toMatchObject({ ambiguous: true, columns: { code: 0, qty: 3 } });
    expect(guessed.mismatches).toBe(2);

    const picked = compareLists(lines, 'PD-250;40\nGU-6205;300', { qty: 1 });
    expect(picked.lists[0].columns).toEqual({ code: 0, qty: 1 });
    expect(picked.mismatches).toBe(0);
  });

  it('is ambiguous when no quantity column exists, and ignores a pick outside the text', () => {
    const { lists } = compareLists('PD-250\nGU-6205', '', { qty: 7 });
    expect(lists[0]).toMatchObject({ ambiguous: true, columns: { code: 0, qty: null } });
  });

  it('ignores a pick when detection is sure', () => {
    const { lists } = compareLists('PD-250;40', '', { qty: 0 });
    expect(lists[0].columns).toEqual({ code: 0, qty: 1 });
  });

  it('reports the width and a sample line for the picker', () => {
    const { lists } = compareLists('Kodas;Pavadinimas;Kiekis\nPD-250;Varžtas;40', '');
    expect(lists[0].width).toBe(3);
    expect(lists[0].sample).toEqual(['Kodas', 'Pavadinimas', 'Kiekis']);
  });
});
