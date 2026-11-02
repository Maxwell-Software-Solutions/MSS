'use client';

import { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import './legal.css';
import { ArticleSection, PageContainer, PageHeader, TableOfContents } from '@/app/components/ui';
import { useLanguage } from '@/lib/LanguageContext';
import { LEGAL_DOCS } from '@/lib/legal';
import type { LegalKind } from '@/lib/legal';
import { LEGAL_UPDATED } from '@/lib/legal/company';
import type { LegalBlock, LegalLanguage } from '@/lib/legal/types';
import CookieSettingsButton from './CookieSettingsButton';
import { renderInline } from './renderInline';

interface LegalDocumentProps {
  kind: LegalKind;
  /** From `?lang=lt` in the address, so a link in an e-mail opens the right language at once. */
  requestedLanguage?: LegalLanguage | undefined;
}

function Blocks({ blocks }: { blocks: LegalBlock[] }): ReactElement {
  return (
    <>
      {blocks.map((block, index) => {
        switch (block.kind) {
          case 'p':
            return <p key={index}>{renderInline(block.text)}</p>;
          case 'ul':
            return (
              <ul key={index}>
                {block.items.map((item, i) => (
                  <li key={i}>{renderInline(item)}</li>
                ))}
              </ul>
            );
          case 'ol':
            return (
              <ol key={index}>
                {block.items.map((item, i) => (
                  <li key={i}>{renderInline(item)}</li>
                ))}
              </ol>
            );
          case 'h3':
            return (
              <h3 key={index} id={block.id} className="scroll-mt-24">
                {block.text}
              </h3>
            );
          case 'dl':
            return (
              <dl key={index} className="legal-dl">
                {block.rows.map((row, i) => (
                  <div key={i}>
                    <dt>{row.term}</dt>
                    <dd>{renderInline(row.def)}</dd>
                  </div>
                ))}
              </dl>
            );
          case 'table':
            return (
              <table key={index} className="legal-table" role="table">
                <caption>{block.caption}</caption>
                <thead>
                  <tr role="row">
                    {block.head.map((cell, i) => (
                      <th key={i} scope="col" role="columnheader">
                        {cell}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row, r) => (
                    <tr key={r} role="row">
                      {row.map((cell, c) =>
                        c === 0 ? (
                          <th key={c} scope="row" role="rowheader">
                            {renderInline(cell)}
                          </th>
                        ) : (
                          <td key={c} role="cell" data-label={block.head[c]}>
                            {renderInline(cell)}
                          </td>
                        ),
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            );
          case 'note':
            return (
              <div key={index} className="note legal-note" role="note">
                {block.title && <p className="legal-note-title">{block.title}</p>}
                <Blocks blocks={block.blocks} />
              </div>
            );
          case 'cookieSettings':
            return (
              <div key={index} className="legal-actions">
                <CookieSettingsButton label={block.label} unavailable={block.unavailable} />
              </div>
            );
        }
      })}
    </>
  );
}

export default function LegalDocument({ kind, requestedLanguage }: LegalDocumentProps): ReactElement {
  const { language, setLanguage } = useLanguage();
  // A link with ?lang= is honoured on the first paint; after that the site's own language switch rules.
  const [synced, setSynced] = useState(requestedLanguage === undefined);

  useEffect(() => {
    if (requestedLanguage && requestedLanguage !== language) setLanguage(requestedLanguage);
    setSynced(true);
    // Only the first render may follow the address; later language changes come from the switch.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // The provider resets <html lang> to the server's guess when it mounts; after a ?lang= link, put the true one back.
  useEffect(() => {
    if (synced) document.documentElement.setAttribute('lang', language);
  }, [synced, language]);

  const lang: LegalLanguage = synced ? language : (requestedLanguage ?? language);
  const doc = LEGAL_DOCS[kind][lang];

  return (
    <PageContainer>
      <div lang={lang}>
        <PageHeader
          eyebrow={doc.eyebrow}
          title={doc.title}
          subtitle={doc.intro}
          meta={
            <span>
              {doc.updatedLabel}: <time dateTime={LEGAL_UPDATED.iso}>{doc.updated}</time>
            </span>
          }
        />
        <div className="prose-flow">
          <TableOfContents
            title={doc.contentsLabel}
            items={doc.sections.map((section) => ({ href: `#${section.id}`, label: section.title }))}
          />
          {doc.sections.map((section) => (
            <ArticleSection key={section.id} id={section.id} title={section.title}>
              <Blocks blocks={section.blocks} />
            </ArticleSection>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
