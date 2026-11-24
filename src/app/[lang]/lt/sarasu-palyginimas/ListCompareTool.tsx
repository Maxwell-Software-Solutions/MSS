'use client';

import { useId, useMemo, useState, type ChangeEvent, type ReactElement } from 'react';
import { compareLists, type Columns, type ListInfo, type Status } from '@/lib/compare-lists';
import './list-compare.css';

/** Made-up lines for the "Įkelti pavyzdį" button: one quantity differs (GU-6205) and one line is missing (ST-30-1000). */
const SAMPLE_FIRST = ['PD-250;40', 'GU-6205;300', 'ST-30-1000;80', 'SZ-304207;500', 'TE-EP2-400;144'].join('\n');
const SAMPLE_SECOND = ['GU-6205;280', 'PD-250;40', 'SZ-304207;500', 'TE-EP2-400;144'].join('\n');

const STATUS_LABEL: Record<Status, string> = {
  match: 'Sutampa',
  diff: 'Skiriasi kiekis',
  'only-first': 'Tik pirmame dokumente',
  'only-second': 'Tik antrame dokumente',
};

const formatNumber = new Intl.NumberFormat('lt-LT', { maximumFractionDigits: 6 }).format;

/** "iš 1 eilutės", "iš 5 eilučių", "iš 21 eilutės" */
const rowsAfterIš = (count: number): string => `${count} ${count % 10 === 1 && count % 100 !== 11 ? 'eilutės' : 'eilučių'}`;

/** A quantity, or a dash that screen readers announce as "nėra" */
function Quantity({ value }: { value: number | null }): ReactElement {
  if (value !== null) return <>{formatNumber(value)}</>;
  return (
    <>
      <span aria-hidden="true">–</span>
      <span className="sr-only">nėra</span>
    </>
  );
}

const shorten = (text: string): string => (text.length > 24 ? `${text.slice(0, 23)}…` : text);

interface ListBoxProps {
  label: string;
  legend: string;
  value: string;
  info: ListInfo;
  onText: (text: string) => void;
  onPick: (pick: Partial<Columns>) => void;
}

function ListBox({ label, legend, value, info, onText, onPick }: ListBoxProps): ReactElement {
  const id = useId();
  const columnSelect = (field: keyof Columns, text: string): ReactElement => (
    <div>
      <label htmlFor={`${id}-${field}`} className="form-label">
        {text}
      </label>
      <select
        id={`${id}-${field}`}
        className="field"
        value={info.columns[field] ?? ''}
        onChange={(event: ChangeEvent<HTMLSelectElement>) =>
          onPick({ [field]: event.target.value === '' ? null : Number(event.target.value) })
        }
      >
        <option value="">Pasirinkite</option>
        {Array.from({ length: info.width }, (_, index) => (
          <option key={index} value={index}>
            {index + 1}. {shorten(info.sample[index] || 'tuščias')}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div>
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <textarea
        id={id}
        className="field compare-input"
        rows={10}
        wrap="off"
        spellCheck={false}
        autoComplete="off"
        placeholder="Kodas ir kiekis, po vieną eilutę"
        value={value}
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => onText(event.target.value)}
      />
      {info.width > 0 && info.ambiguous && (
        <fieldset className="compare-picker">
          <legend>{legend}</legend>
          <p className="form-note">Stulpelius atpažinome tik spėdami. Jei suklydome, pasirinkite patys.</p>
          <div className="compare-picker-grid">
            {columnSelect('code', 'Kodo stulpelis')}
            {columnSelect('qty', 'Kiekio stulpelis')}
          </div>
        </fieldset>
      )}
    </div>
  );
}

/** Two pasted lists in, a table of what does not match out. Everything is computed in the browser. */
export default function ListCompareTool(): ReactElement {
  const [first, setFirst] = useState('');
  const [second, setSecond] = useState('');
  const [firstPick, setFirstPick] = useState<Partial<Columns>>({});
  const [secondPick, setSecondPick] = useState<Partial<Columns>>({});

  const result = useMemo(() => compareLists(first, second, firstPick, secondPick), [first, second, firstPick, secondPick]);
  const ready = first.trim() !== '' && second.trim() !== '';
  const skipped = result.lists[0].skipped + result.lists[1].skipped;

  const loadSample = (): void => {
    setFirst(SAMPLE_FIRST);
    setSecond(SAMPLE_SECOND);
    setFirstPick({});
    setSecondPick({});
  };

  return (
    <div className="compare-tool">
      <div className="form-panel">
        <div className="columns columns-2">
          <ListBox
            label="Pirmas dokumentas (pvz., sąskaita)"
            legend="Pirmo dokumento stulpeliai"
            value={first}
            info={result.lists[0]}
            onText={setFirst}
            onPick={(pick) => setFirstPick((previous) => ({ ...previous, ...pick }))}
          />
          <ListBox
            label="Antras dokumentas (pvz., važtaraštis)"
            legend="Antro dokumento stulpeliai"
            value={second}
            info={result.lists[1]}
            onText={setSecond}
            onPick={(pick) => setSecondPick((previous) => ({ ...previous, ...pick }))}
          />
        </div>
        <div className="compare-actions">
          <button type="button" className="btn" onClick={loadSample}>
            Įkelti pavyzdį
          </button>
          <p className="form-note">
            Stulpelius gali skirti tabuliacija, kabliataškis arba bent du tarpai. Skaičiai gali būti 1 240,50 arba 1240.5.
          </p>
        </div>
        <p className="form-note compare-privacy">Duomenys apdorojami tik jūsų naršyklėje ir niekur nesiunčiami.</p>
      </div>

      <div className="compare-result">
        {!ready ? (
          <p className="form-note">Įklijuokite abu sąrašus, kad pamatytumėte rezultatą.</p>
        ) : result.rows.length === 0 ? (
          <p>Nepavyko rasti kodų ir kiekių. Patikrinkite, ar kiekvienoje eilutėje yra kodas ir kiekis.</p>
        ) : (
          <>
            <p role="status" className="compare-summary">
              {result.mismatches} iš {rowsAfterIš(result.rows.length)} nesutampa
            </p>
            {skipped > 0 && (
              <p className="form-note">
                Praleistos eilutės be kodo ar kiekio (pvz., antraštės): pirmame dokumente {result.lists[0].skipped}, antrame{' '}
                {result.lists[1].skipped}.
              </p>
            )}
            <div className="table-scroll">
              <table className="table compare-table">
                <caption className="sr-only">Sąrašų palyginimo rezultatas</caption>
                <thead>
                  <tr>
                    <th scope="col">Kodas</th>
                    <th scope="col" className="compare-num">
                      Pirmas dokumentas
                    </th>
                    <th scope="col" className="compare-num">
                      Antras dokumentas
                    </th>
                    <th scope="col">Būsena</th>
                  </tr>
                </thead>
                <tbody>
                  {result.rows.map((row) => (
                    <tr key={row.code} data-status={row.status}>
                      <td>{row.code}</td>
                      <td className="compare-num">
                        <Quantity value={row.first} />
                      </td>
                      <td className="compare-num">
                        <Quantity value={row.second} />
                      </td>
                      <td className="compare-status">
                        {STATUS_LABEL[row.status]}
                        {row.difference !== null && <span className="compare-diff"> (skirtumas {formatNumber(row.difference)})</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
