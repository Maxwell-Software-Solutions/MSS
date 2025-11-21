## Copilot / AI Agent Instructions — MSS (Maxwell Site)

### Quick Orientation

- **Framework**: Next.js 15 (App Router) + React 19 + TypeScript 5
- **Key files**: `src/app/layout.tsx` (root layout with providers), `src/app/page.tsx`, `next.config.ts` (webpack/headers), `package.json` (scripts)
- **Styling**: Tailwind CSS v4 (`src/app/globals.css`)
- **Theme System**: Uses CSS custom properties with `data-theme` attribute (NOT Tailwind's `dark:` classes)

### Essential Commands

| Task              | Command                                        |
| ----------------- | ---------------------------------------------- |
| Dev server        | `pnpm dev`                                     |
| Production build  | `pnpm build`                                   |
| Run all tests     | `pnpm test` (lint → typecheck → jest)          |
| E2E tests         | `pnpm e2e` (Playwright auto-starts dev server) |
| E2E with UI       | `pnpm e2e:ui`                                  |
| Performance audit | `pnpm lighthouse` (90+ score required)         |
| Bundle analysis   | `pnpm analyze`                                 |

### Architecture & Conventions

**Component boundaries**:

- **Server Components by default** — only add `'use client'` for interactivity (hooks, event handlers)
- Pages: `src/app/*` with route-based structure
- Reusable components: `src/app/components/` (e.g., `HeaderNav.tsx`, `AppFooter.tsx`)
- Global providers: `src/app/layout.tsx` includes `LanguageProvider`, `Cookiebot`, `GoogleAnalytics`

**Import paths**:

- **Always use `@/` alias** (never relative paths across directories): `import { foo } from '@/lib/utils'`
- Configured in `tsconfig.json` and `jest.config.js`

**Testing structure**:

- Unit tests live alongside code (e.g., `src/app/components/Button.test.tsx`)
- Jest with `ts-jest`, React Testing Library, and `jest-axe` for a11y
- E2E tests in `e2e/` (Playwright with chromium/firefox/webkit)
- `jest.config.js` mocks `next/image` via `src/test/__mocks__/nextImageMock.tsx`

### Coding Principles

**KISS (Keep It Simple, Stupid)**:

- Server Components by default — only add `'use client'` when interactivity is required
- Prefer straightforward solutions over clever abstractions
- Direct implementations unless complexity demands abstraction

**DRY (Don't Repeat Yourself)**:

- Reusable components in `src/app/components/`
- Shared utilities in `src/lib/` (e.g., `LanguageContext.tsx`, translations)
- Consistent patterns across similar features (model existing code)

**SOLID (Apply When Beneficial)**:

- Single Responsibility: Each component/function focuses on one concern
- Don't over-engineer: Start simple, refactor when patterns emerge
- See existing component structure for practical examples (e.g., `HeaderNav.tsx`, `AppFooter.tsx`)

### Environment Variables

- See `next.config.ts` and README; common keys: `OPENAI_API_KEY`, `NEXT_PUBLIC_APPS_SCRIPT_URL`, `NEXT_PUBLIC_SHARED_TOKEN`, `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `NEXT_PUBLIC_COOKIEBOT_CBID`
- Set `.env.local` for local dev
- **Never commit secrets** — use environment variables and `.env.local`

### Build & Deployment Details

- Build helper: `postbuild:autocommit` attempts an automatic git commit after successful build — avoid unexpected commits when testing patches locally
- Webpack/optimization: `next.config.ts` contains custom chunking, compression, and terser settings — avoid large, global changes that break these optimizations
- Accessibility & performance: repository includes explicit docs under `docs/` (e.g. `accessibility.md`, `performance-optimization.md`) and the project enforces high Lighthouse and WCAG targets. When changing markup, preserve semantic structure and a11y affordances (skip links, ARIA where present)

### Integration Points

- Analytics & consent: `src/app/layout.tsx` wires `Cookiebot` and `GoogleAnalytics`. Cookie IDs and GA IDs come via env vars
- External services: `@vercel/kv` and `openai` appear in dependencies — be explicit about not committing secret keys; prefer using `.env.local` and the environment
- Images: Next image optimization is enabled (`next.config.ts` image formats). Avoid adding unoptimized large raster assets

### Component Patterns

**Server Component (default)**:

```tsx
export default async function Page() {
  const data = await fetchData();
  return <Content data={data} />;
}
```

**Client Component (explicit)**:

```tsx
'use client';
export function InteractiveButton() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount((c) => c + 1)}>{count}</button>;
}
```

### Testing Patterns

**Unit test example**:

```tsx
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });
});
```

**E2E test example**:

```typescript
import { test, expect } from '@playwright/test';

test('homepage loads', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /Maxwell/i })).toBeVisible();
});
```

### Common Pitfalls

1. **Using `'use client'` unnecessarily** → increases bundle size, breaks SSR optimizations
2. **Relative imports across directories** → Use `@/` alias (e.g., `@/lib/utils` not `../../lib/utils`)
3. **Skipping test validation** → Always run `pnpm test` before committing
4. **Modifying webpack config carelessly** → Can break production optimizations in `next.config.ts`
5. **Adding large images without optimization** → Use Next.js Image component with WebP/AVIF
6. **Ignoring accessibility** → Project enforces WCAG AA, maintain semantic HTML and ARIA labels
7. **Using Tailwind `dark:` classes for theming** → This project uses `data-theme` attribute with CSS custom properties instead. Use `style={{ color: 'var(--color-text)' }}` or similar CSS variables from `src/app/styles/tokens.css`, NOT `text-slate-900 dark:text-slate-100`

### Theme System (IMPORTANT)

**DO NOT use Tailwind's `dark:` modifier** — the site uses a custom theme system:

- Theme toggled via `data-theme="light"` or `data-theme="dark"` on `:root`
- Colors defined in `src/app/styles/tokens.css` as CSS custom properties
- Common theme variables:
  - `--color-text` (main text: dark in light mode, light in dark mode)
  - `--color-text-secondary` (secondary text)
  - `--color-bg` (background)
  - `--color-accent` (brand accent color)
  - `--color-border` (borders)

**Correct approach for theme-aware styling**:

```tsx
// ✅ CORRECT - Uses CSS custom properties
<h1 style={{ color: 'var(--color-text)' }}>Title</h1>
<p style={{ color: 'var(--color-text-secondary)' }}>Subtitle</p>

// ❌ WRONG - Tailwind dark: classes won't work
<h1 className="text-slate-900 dark:text-white">Title</h1>
```

See `src/app/styles/tokens.css` for all available theme variables.

### Editing & PR Guidance

- Small UIs: prefer editing or adding files under `src/app/components/` and update corresponding unit tests in `src/`
- Tests: for code changes, ensure `pnpm test` passes (lint + typecheck + jest). If adding runtime behavior, add a Playwright test under `e2e/` if it affects pages
- Build validation: use `pnpm build` (or `npm run build`) and run `pnpm test` locally before creating PR

### Examples (Where to Find Patterns)

- Redirects & headers: `next.config.ts` shows canonical headers and redirects. Model changes to routing/headers on the same pattern
- Root layout: `src/app/layout.tsx` demonstrates providers, global CSS, and critical CSS inlining
- Jest setup: `jest.config.js` and `src/test/setupTests.ts` show test bootstrapping and mocks

If unsure, prefer minimal, reversible edits and signal the change in the PR description (what file changed, why, how validated). Ask for clarification when a change touches infra (build, webpack, or CI scripts).

### SEO Implementation Workflow

**Active SEO Improvements**: See `docs/seo/` directory for comprehensive SEO implementation plan with prioritized tasks (P0-P3).

**Workflow Directive**: When implementing SEO features from `docs/seo/` documentation, **ALWAYS** follow this test-driven process:

1. **Implement** → Create/modify files per implementation doc
2. **Build** → Run `pnpm build` (must succeed with zero errors)
3. **Test** → Run `pnpm test` (all tests must pass)
4. **Validate** → Complete manual validation checklist from doc
5. **Commit** → Git commit changes with descriptive message
6. **Delete Doc** → Remove implementation doc once complete and validated

**Quality Gates** (all must pass before proceeding):

- ✅ TypeScript compiles without errors
- ✅ `pnpm build` succeeds
- ✅ `pnpm test` passes (lint + typecheck + jest)
- ✅ Manual validation complete (see doc checklist)
- ✅ No console errors in browser

**Implementation Order** (do NOT skip phases):

1. **Phase 1 - Foundation** (Week 1): `00-central-data-management.md` — Create `src/lib/seo/data.ts` and `utils.ts` with central data registry (SITE_CONFIG, PAGES, BLOG_POSTS, etc.)
2. **Phase 2 - P0 Critical** (Week 2): `P0-1-opengraph-images.md`, `P0-2-enhanced-metadata.md`, `P0-3-structured-data.md` — OG images, metadata, Schema.org
3. **Phase 3 - P1 High** (Week 3-4): `P1-1-dynamic-sitemap.md`, `P1-2-internal-linking.md` — Dynamic sitemap, related content
4. **Phase 4 - P2 Medium** (Week 5-6): `P2-1-faq-schema.md`, `P2-2-canonical-enforcement.md` — FAQ schema, canonical URLs
5. **Phase 5 - P3 Ongoing**: `P3-1-content-strategy.md`, `P3-2-implementation-roadmap.md` — Content planning, monitoring

**Key Architectural Patterns** (enforce in all SEO code):

- **DRY (Don't Repeat Yourself)**: Single source of truth in `src/lib/seo/data.ts` — update once, propagates everywhere
- **Atomic Components**: Small, reusable components (RelatedArticles, Breadcrumbs, FAQ, StructuredData)
- **Dynamic Generation**: Metadata, OG images, sitemap, schemas all generated from central data
- **Type Safety**: Full TypeScript coverage with interfaces for all SEO data structures

**Progress Tracking**: Implementation docs in `docs/seo/` are deleted after completion — when all are gone, SEO implementation is complete.

**Reference**: See `docs/seo/WORKFLOW.md` for detailed phase-by-phase instructions, troubleshooting, and validation checklists.
