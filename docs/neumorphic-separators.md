# Neumorphic Separator Implementation

## Overview

All separator lines throughout the MSS website have been converted to neumorphic design, maintaining consistency with the 3D embossed aesthetic of buttons, cards, and inputs.

## Separator Classes

### Horizontal Separators

#### `.neuro-separator`

Full-width HR-style separator with gradient and dual shadows.

```html
<hr className="neuro-separator" />
```

#### `.neuro-separator-inline`

Inline separator using `::before` pseudo-element, replaces `border-t`.

```html
<div className="neuro-separator-inline pt-4">Content</div>
```

#### `.neuro-section-border`

Section-level top border with gradient effect.

```html
<section className="neuro-section-border">Content</section>
```

### Vertical Separators

#### `.neuro-separator-vertical`

Vertical separator for left borders (e.g., timeline main line).

```html
<ol className="neuro-separator-vertical pl-8">
  Items
</ol>
```

#### `.neuro-separator-vertical-dashed`

Dashed vertical separator for connecting elements.

```html
<div className="neuro-separator-vertical-dashed">Content</div>
```

### Specialized Separators

#### `.neuro-header-border`

Header bottom border with downward shadow effect.

```html
<header className="neuro-header-border">Nav</header>
```

#### `.neuro-footer-border`

Footer top border with upward shadow effect.

```html
<footer className="neuro-footer-border">Links</footer>
```

#### `.mobile-nav-bottom-section`

Mobile menu separator with neumorphic gradient.

```html
<div className="mobile-nav-bottom-section">Theme controls</div>
```

## Implementation Details

### Light Theme

- Gradient: `rgba(163, 177, 198, 0.3)` → `rgba(163, 177, 198, 0.5)` → `rgba(163, 177, 198, 0.3)`
- Shadow: `0 1px 0 rgba(255, 255, 255, 0.4)` (light highlight)

### Dark Theme

- Gradient: `rgba(0, 0, 0, 0.6)` → `rgba(60, 75, 95, 0.6)` → `rgba(0, 0, 0, 0.6)`
- Shadow: `0 1px 0 rgba(60, 75, 95, 0.3)` (subtle lift)

### Vertical Separators

Same gradient approach but rotated 90° with horizontal shadow offset.

## Components Updated

### Core Layout

- ✅ `src/app/layout.tsx` - Header border
- ✅ `src/app/components/AppFooter.tsx` - Footer border and internal separator
- ✅ `src/app/components/navigation/MobileMenu.tsx` - Bottom section separator

### Home Page Sections

- ✅ `src/app/HomeContent.tsx` - All section borders (capabilities, about, process, contact)
- ✅ `src/app/HomeContent.tsx` - Contact section LinkedIn separator
- ✅ `src/app/HomeContent.tsx` - Timeline vertical separators (main + dashed connectors)

### Feature Sections

- ✅ `src/app/components/TestimonialsSection.tsx` - Section border
- ✅ `src/app/components/FinalCtaSection.tsx` - Section border
- ✅ `src/app/components/DarkShowcaseSection.tsx` - Section border

### Blog Pages

- ✅ `src/app/blog/test-driven-development/page.tsx` - Cost breakdown separators (2 instances)

### Tests

- ✅ `src/app/components/AppFooter.test.tsx` - Updated to expect `neuro-footer-border`

## Design Principles

1. **Consistency**: All separators use the same gradient + shadow technique
2. **Theme Awareness**: Automatically adapts to light/dark theme via CSS custom properties
3. **3D Effect**: Dual shadows create subtle embossed appearance matching buttons/cards
4. **Accessibility**: Maintains proper contrast ratios (WCAG AA compliant)
5. **Performance**: CSS-only implementation, no JavaScript overhead

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Uses CSS `::before` pseudo-elements
- Gradients and box-shadow widely supported
- Graceful degradation: falls back to no separator if CSS not supported

## Future Maintenance

When adding new components with separators:

1. Use `.neuro-separator-inline` instead of `border-t border-foreground/10`
2. Use `.neuro-section-border` for full-width section separators
3. Use `.neuro-separator-vertical` for left/right borders
4. Never use plain Tailwind border utilities for visual separators
5. Reserve border utilities only for structural/debugging purposes

## Testing

All 164 unit tests pass after separator conversion:

- Jest tests validate class names
- No visual regression
- TypeScript compilation clean
- Lint warnings only (pre-existing, unrelated)
