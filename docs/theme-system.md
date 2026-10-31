# Theme System Documentation

## Overview

The MSS website now features a complete light/dark theme system with:

- ✅ CSS custom property tokens for both themes
- ✅ Theme switcher button with sun/moon icons
- ✅ localStorage persistence
- ✅ System preference detection (prefers-color-scheme)
- ✅ WCAG 2.1 AA compliance with documented contrast ratios
- ✅ Smooth transitions and accessible controls
- ✅ Comprehensive E2E test suite

## Architecture

### Core Files

#### 1. `src/app/styles/tokens.css` (CSS Custom Properties)

**Purpose**: Central color token definitions for light and dark themes

**Theme Tokens**:

```css
/* Light Theme */
:root[data-theme='light'] {
  --color-bg: #fbfbfa; /* Soft off-white background */
  --color-text: #0a0a0a; /* Text - 19:1 */
  --color-accent: #8b6b00; /* Brand gold - 4.8:1 */
  --color-card: #ffffff; /* Card background */
  --color-border: #e6e6e3; /* Borders */
  /* ... plus hover states, shadows, secondary colors */
}

/* Dark Theme (Original Design) */
:root[data-theme='dark'] {
  --color-bg: #0a0a0a; /* Near-black background */
  --color-text: #f5f5f3; /* Bright text - 18:1 */
  --color-accent: #c9a227; /* Gold tint - 8.2:1 */
  --color-card: #121212; /* Elevated card surface */
  --color-border: #262626; /* Subtle borders */
  /* ... matching original design system */
}
```

**Contrast Ratios** (all meet WCAG 2.1 AA):

- Text on background: ≥4.5:1 (normal text)
- Large text: ≥3:1
- UI components: ≥3:1
- All ratios documented in comments

#### 2. `src/hooks/useTheme.ts` (Theme Management Hook)

**Purpose**: React hook for theme state, persistence, and system preference detection

**Key Functions**:

```typescript
const { theme, toggleTheme } = useTheme();

// Automatic features:
// - Reads localStorage on mount
// - Detects system preference if no stored value
// - Listens to system preference changes
// - Applies theme to document.documentElement
// - Persists to localStorage
```

**Storage Key**: `site.theme` (values: `'light'` or `'dark'`)

#### 3. `src/app/components/ThemeToggle.tsx` (UI Component)

**Purpose**: Accessible button component for theme switching

**Features**:

- Sun icon in dark mode (click for light)
- Moon icon in light mode (click for dark)
- `aria-pressed` state for screen readers
- `aria-label` describing action
- Focus-visible outline (WCAG 2.1 requirement)
- Smooth rotation animation

#### 4. `src/app/globals.css` (Legacy Bridge)

**Purpose**: Maps old custom properties to new token system

**Migration Strategy**:

```css
:root {
  /* Legacy properties reference new tokens */
  --background: var(--color-bg);
  --foreground: var(--color-text);
  --accent: var(--color-accent);
  /* Existing components work unchanged */
}
```

## Integration Points

### Header Navigation

- **File**: `src/app/components/HeaderNav.tsx`
- **Location**: ThemeToggle appears between "Blog" link and language switcher
- **Visibility**: Desktop only (hidden on mobile menu)

### Root Layout

- **File**: `src/app/layout.tsx`
- **Import**: `import './styles/tokens.css'` loads theme system
- **Order**: Imported after `globals.css` to allow token overrides

### Mobile Menu

- **File**: `src/app/globals.css` (lines 404-527)
- **Behavior**: Explicit light/dark mode styles with @media fallbacks
- **Colors**: Dark menu maintains original design (#f5f5f3 text, gold accents)

## User Experience

### Default Behavior

1. **First visit**: Respects system preference (prefers-color-scheme)
2. **After toggle**: Saves preference to localStorage
3. **Return visits**: Restores saved preference
4. **System change**: Updates only if user hasn't set manual preference

### Theme Persistence

- **Storage**: `localStorage.setItem('site.theme', 'light' | 'dark')`
- **Scope**: Per-origin (applies to entire site)
- **Privacy**: Client-side only, no server tracking

### Accessibility Features

- **Keyboard**: Full keyboard navigation (Tab, Enter, Space)
- **Screen Readers**: `aria-pressed` indicates current state
- **Focus**: Visible outline on :focus-visible
- **Labels**: Descriptive aria-label ("Switch to light theme")

## Testing

### E2E Test Suite

**File**: `e2e/theme-switcher.spec.ts`

**Coverage** (30 tests across 3 browsers):

1. ✅ Theme toggle button renders
2. ✅ Toggle switches between light/dark
3. ✅ Theme persists after page reload
4. ✅ Keyboard accessibility (Tab, Enter)
5. ✅ aria-pressed state updates correctly
6. ✅ Dark theme passes WCAG AA (axe-playwright)
7. ✅ Light theme passes WCAG AA (axe-playwright)
8. ✅ Correct icon shown for current theme
9. ✅ System preference respected without localStorage
10. ✅ Theme works across different pages

**Run Tests**:

```bash
# Install browsers first
pnpm exec playwright install

# Run theme tests
pnpm e2e theme-switcher

# Run all E2E tests
pnpm e2e

# Interactive mode
pnpm e2e:ui
```

### Manual Testing Checklist

- [ ] Toggle button appears in header (desktop)
- [ ] Click toggles theme with smooth transition
- [ ] Reload preserves theme choice
- [ ] Clear localStorage → respects system preference
- [ ] Change system preference → theme updates (if no manual choice)
- [ ] Navigate to different pages → theme persists
- [ ] Keyboard: Tab to button, Enter to toggle
- [ ] Screen reader announces state changes

## Performance

### Bundle Impact

- **tokens.css**: ~8 KB (uncompressed)
- **useTheme.ts**: ~2 KB (client-side hook)
- **ThemeToggle.tsx**: ~1 KB (component code)
- **Total**: <12 KB additional JavaScript

### Runtime Performance

- **Theme application**: Synchronous (no flash of wrong theme)
- **localStorage read**: Single read on mount
- **System detection**: Uses native `matchMedia` API
- **No re-renders**: Theme applied via CSS custom properties

### Optimization Techniques

1. **Server-side rendering**: Initial theme from localStorage script (future)
2. **CSS-only switching**: No inline style manipulation
3. **Will-change**: Smooth transitions without layout shift
4. **Cached tokens**: CSS variables computed once per theme

## Maintenance

### Adding New Colors

1. Add token to `tokens.css` for both themes:
   ```css
   :root[data-theme='light'] {
     --color-new-token: #VALUE; /* Contrast ratio: X:1 */
   }
   :root[data-theme='dark'] {
     --color-new-token: #VALUE; /* Contrast ratio: Y:1 */
   }
   ```
2. Document contrast ratio in comment
3. Use token in components: `color: var(--color-new-token);`

### Updating Existing Components

**Before**:

```css
.card {
  background: #121212;
  color: #f5f5f3;
}
```

**After**:

```css
.card {
  background: var(--color-card);
  color: var(--color-text);
}
```

### Contrast Validation

Use browser DevTools or online checkers:

- **Text**: Minimum 4.5:1 contrast ratio
- **Large text (18pt+)**: Minimum 3:1
- **UI components**: Minimum 3:1
- **Tool**: WebAIM Contrast Checker (https://webaim.org/resources/contrastchecker/)

## Troubleshooting

### Theme not applying

1. Check `data-theme` attribute on `<html>`: `document.documentElement.dataset.theme`
2. Verify tokens.css imported: inspect computed styles
3. Clear localStorage: `localStorage.removeItem('site.theme')`
4. Hard refresh: Ctrl+Shift+R (Windows) / Cmd+Shift+R (Mac)

### Flash of wrong theme (FOUT)

- **Current**: Minor flash on first load
- **Solution**: Add blocking script in `<head>` (future enhancement):
  ```html
  <script>
    const theme =
      localStorage.getItem('site.theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  </script>
  ```

### Contrast issues

1. Check token value in `tokens.css`
2. Verify contrast ratio meets WCAG AA
3. Run axe DevTools extension for violations
4. Test with real users (esp. visual impairments)

## Future Enhancements

### Planned Features

- [ ] High contrast mode (WCAG AAA)
- [ ] Custom accent color picker
- [ ] Automatic dark mode (sunset to sunrise)
- [ ] Per-page theme overrides
- [ ] Theme preview before applying

### Migration Path

- **Phase 1**: ✅ Core system with tokens
- **Phase 2**: ✅ ThemeToggle in header
- **Phase 3**: 🔄 Replace hardcoded colors in components
- **Phase 4**: 📋 Server-side rendering (eliminate FOUT)
- **Phase 5**: 📋 Advanced themes (seasonal, brand variations)

## API Reference

### useTheme Hook

```typescript
import { useTheme } from '@/hooks/useTheme';

function Component() {
  const { theme, toggleTheme } = useTheme();

  // theme: 'light' | 'dark'
  // toggleTheme: () => void

  return <button onClick={toggleTheme}>Current theme: {theme}</button>;
}
```

### CSS Token Usage

```css
.my-component {
  background: var(--color-card);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-md);
}

.my-button {
  background: var(--color-accent);
  color: var(--color-accent-fg);
}

.my-button:hover {
  background: var(--color-accent-hover);
}
```

### Manual Theme Control

```typescript
// Set theme programmatically
import { applyTheme } from '@/hooks/useTheme';

applyTheme('dark');
localStorage.setItem('site.theme', 'dark');

// Get current theme
const currentTheme = document.documentElement.getAttribute('data-theme');

// Detect system preference
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
```

## Resources

- **WCAG 2.1 AA Guidelines**: https://www.w3.org/WAI/WCAG21/quickref/
- **Contrast Checker**: https://webaim.org/resources/contrastchecker/
- **CSS Custom Properties**: https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties
- **prefers-color-scheme**: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
- **axe-core Rules**: https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md

## Support

For theme-related issues:

1. Check this documentation first
2. Inspect browser console for errors
3. Validate with Lighthouse accessibility audit
4. Run E2E tests: `pnpm e2e theme-switcher`
5. File issue with screenshots and steps to reproduce
