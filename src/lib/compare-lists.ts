/**
 * Compares two pasted lists (code + quantity per line) for the free Lithuanian list-compare tool.
 * Pure functions only: the text never leaves the browser and nothing here touches the network or storage.
 */

export type Status = 'match' | 'diff' | 'only-first' | 'only-second';

/** Zero-based column positions; null when no column was found. */
export interface Columns {
  code: number | null;
  qty: number | null;
}

export interface ListInfo {
  /** Widest line, in columns */
  width: number;
  /** Columns the comparison used for this list */
  columns: Columns;
  /** True when detection is a guess, so the page offers a column picker */
  ambiguous: boolean;
  /** The first line, so the picker can show what each column holds */
  sample: string[];
  /** Lines without a code or a quantity, such as headers and totals */
  skipped: number;
}

export interface ComparedRow {
  code: string;
  first: number | null;
  second: number | null;
  status: Status;
  /** Absolute difference, set when the status is 'diff' */
  difference: number | null;
}

export interface Comparison {
  /** Mismatches first, then matches; one row per item code */
  rows: ComparedRow[];
  mismatches: number;
  lists: [ListInfo, ListInfo];
}

/** Letters and digits with an optional - . / _ inside (ABC-123, 4770001); needs at least one digit */
const CODE = /^(?=.*\d)[A-Za-z0-9][A-Za-z0-9._/-]*$/;
const LETTER_AND_DIGIT_CODE = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z0-9][A-Za-z0-9._/-]*$/;

/** Cuts a line into cells: tabs win, then semicolons, then runs of two or more spaces, then single spaces. */
function splitLine(line: string): string[] {
  const cells = line.includes('\t')
    ? line.split('\t')
    : line.includes(';')
      ? line.split(';')
      : line.trim().split(/\s{2,}/);
  const trimmed = cells.map((cell) => cell.trim());
  return trimmed.length === 1 ? line.trim().split(/\s+/) : trimmed;
}

export function splitRows(text: string): string[][] {
  return text
    .split(/\r?\n/)
    .filter((line) => line.trim() !== '')
    .map(splitLine);
}

/**
 * Reads "1 240,50", "1240.5", "1.240,50" and "1,240.50". Where both marks appear the last one is the decimal mark;
 * a lone mark is read as the decimal mark (Lithuanian style), so "1,5" and "1.5" are both 1.5.
 */
export function parseNumber(raw: string): number | null {
  const text = raw.replace(/[\s  ]/g, '');
  if (!/^-?\d[\d.,]*$/.test(text)) return null;
  const lastDot = text.lastIndexOf('.');
  const lastComma = text.lastIndexOf(',');
  const decimalAt = Math.max(lastDot, lastComma);
  if (decimalAt < 0) return Number(text);
  const mark = text[decimalAt]!;
  const other = mark === '.' ? ',' : '.';
  // A mark that repeats ("1.240.500") can only be a thousands separator
  if (text.split(mark).length > 2 && !text.includes(other)) return Number(text.replaceAll(mark, ''));
  const whole = text.slice(0, decimalAt).replaceAll('.', '').replaceAll(',', '');
  return Number(`${whole}.${text.slice(decimalAt + 1)}`);
}

const share = (cells: string[], test: (cell: string) => boolean): number => {
  const filled = cells.filter((cell) => cell !== '');
  return filled.length === 0 ? 0 : filled.filter(test).length / filled.length;
};

/**
 * Code column: the first column that is mostly ABC-123 style codes, else the first mostly digit codes.
 * Quantity column: the last other column that is mostly numbers. It is a guess when several columns are numbers.
 */
function detectColumns(rows: string[][], width: number): { columns: Columns; ambiguous: boolean } {
  const column = (index: number): string[] => rows.map((row) => row[index] ?? '');
  const indexes = Array.from({ length: width }, (_, index) => index);
  const code =
    indexes.find((index) => share(column(index), (cell) => LETTER_AND_DIGIT_CODE.test(cell)) >= 0.5) ??
    indexes.find((index) => share(column(index), (cell) => CODE.test(cell)) >= 0.5) ??
    null;
  const numeric = indexes.filter((index) => index !== code && share(column(index), (cell) => parseNumber(cell) !== null) >= 0.5);
  const qty = numeric.at(-1) ?? null;
  return { columns: { code, qty }, ambiguous: code === null || qty === null || numeric.length > 1 };
}

const round = (value: number): number => Math.round(value * 1e6) / 1e6;

function totals(rows: string[][], { code, qty }: Columns): { items: Map<string, { code: string; qty: number }>; skipped: number } {
  const items = new Map<string, { code: string; qty: number }>();
  let skipped = 0;
  for (const row of rows) {
    const itemCode = code === null ? '' : (row[code] ?? '');
    const quantity = qty === null ? null : parseNumber(row[qty] ?? '');
    if (itemCode === '' || quantity === null) {
      skipped += 1;
      continue;
    }
    const key = itemCode.toUpperCase();
    const known = items.get(key);
    items.set(key, { code: known?.code ?? itemCode, qty: round((known?.qty ?? 0) + quantity) });
  }
  return { items, skipped };
}

function analyse(text: string, pick: Partial<Columns>): { rows: string[][]; info: Omit<ListInfo, 'skipped'> } {
  const rows = splitRows(text);
  const width = rows.reduce((widest, row) => Math.max(widest, row.length), 0);
  const { columns: detected, ambiguous } = detectColumns(rows, width);
  // A picked column counts only while the picker is on screen and the column exists in this text
  const choose = (picked: number | null | undefined, found: number | null): number | null =>
    ambiguous && picked !== undefined && (picked === null || picked < width) ? picked : found;
  const columns = { code: choose(pick.code, detected.code), qty: choose(pick.qty, detected.qty) };
  return { rows, info: { width, columns, ambiguous, sample: rows[0] ?? [] } };
}

/** Compares two pasted lists by item code. Duplicate codes in one list are summed; codes match regardless of case. */
export function compareLists(
  firstText: string,
  secondText: string,
  firstPick: Partial<Columns> = {},
  secondPick: Partial<Columns> = {},
): Comparison {
  const first = analyse(firstText, firstPick);
  const second = analyse(secondText, secondPick);
  const a = totals(first.rows, first.info.columns);
  const b = totals(second.rows, second.info.columns);

  const rows: ComparedRow[] = [];
  for (const [key, one] of a.items) {
    const two = b.items.get(key);
    if (!two) rows.push({ code: one.code, first: one.qty, second: null, status: 'only-first', difference: null });
    else if (one.qty === two.qty) rows.push({ code: one.code, first: one.qty, second: two.qty, status: 'match', difference: null });
    else rows.push({ code: one.code, first: one.qty, second: two.qty, status: 'diff', difference: round(Math.abs(one.qty - two.qty)) });
  }
  for (const [key, two] of b.items) {
    if (!a.items.has(key)) rows.push({ code: two.code, first: null, second: two.qty, status: 'only-second', difference: null });
  }
  rows.sort((x, y) => Number(x.status === 'match') - Number(y.status === 'match'));

  return {
    rows,
    mismatches: rows.filter((row) => row.status !== 'match').length,
    lists: [
      { ...first.info, skipped: a.skipped },
      { ...second.info, skipped: b.skipped },
    ],
  };
}
