# Maxwell Software Solutions — Brand Guidelines

## Overview

These guidelines establish visual consistency across the MSS website. All components should adhere to these standards to maintain a professional, cohesive brand identity.

---

## Color Palette

### Primary Colors

| Token            | Light Mode | Dark Mode | Usage                              |
| ---------------- | ---------- | --------- | ---------------------------------- |
| `--background`   | `#1a202c`  | `#0a0f19` | Main page background               |
| `--foreground`   | `#f7fafc`  | `#f7fafc` | Primary text color                 |
| `--accent`       | `#d4af37`  | `#d4af37` | Gold brand color, CTAs, highlights |
| `--accent-hover` | `#e5c158`  | `#e5c158` | Hover state for accent elements    |
| `--secondary`    | `#4299e1`  | `#4299e1` | Blue secondary accent              |

### Component Colors

| Token      | Value                                | Usage            |
| ---------- | ------------------------------------ | ---------------- |
| `--card`   | `#2d3748` (light) / `#1a202c` (dark) | Card backgrounds |
| `--muted`  | `#cbd5e1` (light) / `#e2e8f0` (dark) | Secondary text   |
| `--border` | `rgba(212, 175, 55, 0.5)`            | Standard borders |

### Semantic Colors

- **Success/Emerald**: `emerald-500`, `emerald-200`, `emerald-50`
- **Error/Red**: `red-500`, `red-200`, `red-50`
- **Neutral**: `slate-600`, `slate-200`

---

## Typography

### Font Family

- **Primary**: Arial, Helvetica, sans-serif
- **Base Size**: 16px
- **Line Height**: 1.65 (default), 1.75 (lead text)
- **Letter Spacing**: 0.01em (default)

### Heading Scales

| Element | Size Range                                                       | Weight  | Usage               |
| ------- | ---------------------------------------------------------------- | ------- | ------------------- |
| `h1`    | `clamp(36px, 3.6vw, 56px)` or `text-3xl sm:text-4xl lg:text-7xl` | 600-700 | Page titles         |
| `h2`    | `clamp(22px, 2.2vw, 28px)` or `text-3xl sm:text-5xl`             | 600     | Section headings    |
| `h3`    | `text-lg` to `text-2xl`                                          | 500-600 | Subsection headings |

### Text Utilities

| Class      | Usage                                                   |
| ---------- | ------------------------------------------------------- |
| `.lead`    | 1.125rem, line-height 1.75, for introductory paragraphs |
| `.eyebrow` | 0.72rem, uppercase, letter-spacing 0.16em, for labels   |
| `.muted`   | Secondary text with reduced opacity                     |

---

## Spacing & Layout

### Container

- **Max Width**: 80rem (1280px)
- **Padding**: `1rem` (mobile) → `2.5rem` (desktop)
- Responsive breakpoints:
  - `475px`: 1.25rem padding
  - `640px`: 2rem padding
  - `768px`: 2.5rem padding

### Section Spacing

- **Standard**: `py-12 md:py-16` or `py-20`
- **Hero sections**: `py-12 sm:py-16 lg:py-20`
- **Vertical rhythm**: Use multiples of 4px (0.25rem)

### Gap Spacing

- **Small**: `gap-3` or `gap-4` (12-16px)
- **Medium**: `gap-6` or `gap-8` (24-32px)
- **Large**: `gap-10` or `gap-12` (40-48px)

---

## Border Radius

### Standard Values

| Size        | Value                    | Usage                          |
| ----------- | ------------------------ | ------------------------------ |
| Small       | `6px` - `8px`            | Buttons, small elements        |
| Standard    | `var(--radius)` = `12px` | Cards, inputs                  |
| Medium      | `rounded-xl` = `12px`    | Images, medium components      |
| Large       | `rounded-2xl` = `16px`   | Feature cards, sections        |
| Extra Large | `rounded-3xl` = `24px`   | Contact forms, prominent cards |

### Guidelines

- **Buttons**: `10px` (`.btn` class)
- **Cards**: `12px` via `var(--radius)`
- **Forms**: `rounded-2xl` (16px)
- **Hero images**: `18px` (`.full-image`)
- **Navigation panels**: `18px`

---

## Shadows

### Shadow System

| Class          | Definition                                              | Usage                                   |
| -------------- | ------------------------------------------------------- | --------------------------------------- |
| `.shadow-soft` | `0 1px 2px rgba(0,0,0,0.3), 0 8px 24px rgba(0,0,0,0.2)` | Standard cards, buttons                 |
| `.shadow-lg`   | Enhanced shadow for hover states                        | Interactive cards on hover              |
| `.shadow-xl`   | Deep shadow                                             | Prominent elements like founder avatars |

### Guidelines

- Use `.shadow-soft` as default for cards
- Add `hover:shadow-lg` for interactive elements
- Forms use inline shadows: `shadow-[0_1px_2px_rgba(15,23,42,0.08)]`

---

## Buttons

### Primary Button (`.btn-accent`)

```css
background: var(--accent)
color: var(--background)
padding: 0.75rem 1.25rem
border-radius: 10px
min-height: 44px
font-weight: 600
```

**Hover**: `background: var(--accent-hover)`

### Ghost Button (`.btn-ghost`)

```css
border: 1px solid rgba(212, 175, 55, 0.6)
background: transparent
hover:background: rgba(255, 255, 255, 0.1)
```

### Button Guidelines

- **Minimum size**: 44px × 44px (accessibility)
- **Mobile**: 48px min-height
- **Padding**: `px-6 sm:px-8` or `px-10` for CTAs
- **Font size**: `text-base` to `text-lg`
- **Active state**: `translateY(1px)` for tactile feedback

---

## Cards

### Standard Card (`.card`)

```css
border: 1px solid rgba(212, 175, 55, 0.6)
border-radius: var(--radius) (12px)
background: rgba(45, 55, 72, 0.95)
padding: 1rem to 2rem
```

### Card Variants

1. **Default Card**

   - Border: `border-foreground/10` or `border-accent/30`
   - Background: `bg-[--card]`
   - Padding: `p-5` to `p-8`

2. **Feature Card** (with accent)

   - Background: `bg-gradient-to-br from-accent/10 to-transparent`
   - Border: `border-accent/30`
   - Shadow: `.shadow-soft`

3. **Founder Card**
   - Border radius: `rounded-2xl`
   - Gradient overlay: 10% opacity, 20% on hover
   - Min height: `20rem` to `22rem`

### Card Guidelines

- Use `shadow-soft` for elevation
- Add `hover:shadow-lg` for interactive cards
- Motion-safe: `hover:-translate-y-0.5` for lift effect
- Consistent padding: `p-5` to `p-8` based on content density

---

## Forms

### Input Fields

```css
border-radius: rounded-2xl (16px)
border: 1px solid slate-200/slate-700
background: white/95 or slate-800/70
padding: px-4 py-3
font-size: text-base
focus: border-accent, ring-2 ring-accent
```

### Form Container

```css
border-radius: rounded-3xl (24px)
background: white/85 or slate-900/75
backdrop-blur: blur-xl
padding: p-8
shadow: shadow-soft
```

---

## Borders

### Border Colors

| Context  | Light Mode                               | Dark Mode                                |
| -------- | ---------------------------------------- | ---------------------------------------- |
| Standard | `border-foreground/10`                   | `border-foreground/10`                   |
| Accent   | `border-accent/30` to `border-accent/60` | `border-accent/40` to `border-accent/50` |
| Forms    | `border-slate-200`                       | `border-slate-700`                       |
| Sections | `border-t border-foreground/10`          | Same                                     |

### Guidelines

- Section dividers: `border-t border-foreground/10`
- Cards: `border-accent/60` for visibility
- Inputs: `border-slate-200` → `border-accent` on focus
- Navigation: `border-b border-foreground/10`

---

## Transitions & Animations

### Standard Transitions

```css
transition: all 0.2s ease
transition: color 0.2s ease
transition: background-color 0.2s ease
```

### Reveal Animation

```css
[data-reveal] {
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 700ms ease, transform 700ms ease;
}
[data-reveal].visible {
  opacity: 1;
  transform: translateY(0);
}
```

### Hover Effects

- **Links**: `hover:text-accent`
- **Buttons**: Background color shift + shadow increase
- **Cards**: `-translate-y-0.5` + `shadow-lg`
- **Images**: `scale-105` (for blog thumbnails)

---

## Accessibility

### Minimum Requirements

- **Touch targets**: 44px × 44px minimum (48px on mobile)
- **Color contrast**: WCAG AA 4.5:1 for text
- **Focus states**: `focus-visible:ring-2 ring-accent/60`
- **Skip links**: Provided in layout
- **ARIA labels**: Required for icon-only buttons

### Focus Ring

```css
focus-visible:outline-none
focus-visible:ring-2
focus-visible:ring-offset-2
focus-visible:ring-accent/60
```

---

## Responsive Breakpoints

| Breakpoint | Min Width | Usage                   |
| ---------- | --------- | ----------------------- |
| `xs`       | 475px     | Extra small adjustments |
| `sm`       | 640px     | Small tablets           |
| `md`       | 768px     | Tablets                 |
| `lg`       | 1024px    | Desktops                |
| `xl`       | 1280px    | Large desktops          |

### Mobile-First Approach

- Default styles for mobile
- Use `sm:`, `md:`, `lg:` prefixes for larger screens
- Test at 375px (iPhone SE) minimum

---

## Component Patterns

### Hero Section

```tsx
<section className="relative hero-gradient section overflow-hidden py-12 sm:py-16 lg:py-20">
  <div className="container relative">
    <h1 className="text-4xl xs:text-5xl sm:text-6xl lg:text-7xl font-bold">
    <p className="mt-6 text-lg xs:text-xl sm:text-2xl text-foreground/80">
    <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
```

### Section with Border

```tsx
<section className="px-6 sm:px-10 py-20 border-t border-foreground/10 bg-background/50">
```

### CTA Section

```tsx
<section className="px-6 sm:px-10 py-24 border-t border-foreground/10 bg-gradient-to-b from-background to-background/50">
  <div className="max-w-5xl mx-auto text-center">
    <h2 className="text-3xl sm:text-5xl font-semibold">
    <p className="mt-6 text-lg text-foreground/70">
    <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
```

---

## Inconsistencies to Fix

Based on the audit, these inconsistencies need correction:

### 1. **Border Radius Inconsistencies**

- FounderCard uses `rounded-2xl` (16px) ✓
- AppFooter contact boxes: No explicit radius — **needs `rounded-xl` or `rounded-2xl`**
- DarkShowcaseSection cards: `rounded-xl` ✓
- Blog images: `rounded-xl` ✓

### 2. **Shadow Inconsistencies**

- ServiceCard uses custom shadow instead of `.shadow-soft` — **standardize**
- TeamCard uses `.shadow-soft` ✓
- Contact form uses `.shadow-soft` ✓

### 3. **Button Inconsistencies**

- Blog posts use `.btn-primary` (undefined) — **should be `.btn-accent`**
- Consistent `px-6 py-3` vs `px-10 py-3` — **standardize CTA buttons to px-10**

### 4. **Card Padding Inconsistencies**

- HomePage value props: `p-5` ✓
- HomePage capabilities: `p-6`
- FounderCard: `p-6 sm:p-8` ✓
- ServiceCard: `p-6 md:p-7` ✓
- **Standardize to `p-5` for compact cards, `p-6` for standard, `p-8` for prominent**

### 5. **Border Inconsistencies**

- AppFooter uses `border-black/10` — **should use `border-foreground/10`**
- Contact cards use `border-black/5` — **should use `border-foreground/10` or `border-accent/30`**

### 6. **Text Color Inconsistencies**

- AppFooter uses explicit `text-slate-600` — **should use `text-foreground/80` or `text-muted`**
- Mixed usage of `text-foreground/70` vs `/75` vs `/80` — **standardize to /80 for body, /70 for secondary**

---

## Implementation Priority

1. **High Priority** (breaks visual consistency):

   - Fix undefined `.btn-primary` class
   - Standardize border colors away from `border-black/`
   - Fix AppFooter text colors

2. **Medium Priority** (improves consistency):

   - Standardize shadows to `.shadow-soft`
   - Align button padding patterns
   - Consistent border radius on all cards

3. **Low Priority** (refinements):
   - Card padding standardization
   - Text opacity value alignment

---

## Quick Reference

### Standard Card

```tsx
<div className="card shadow-soft p-6 rounded-2xl border border-accent/60">
```

### Standard Button

```tsx
<a href="/contact" className="btn btn-accent px-10 py-3 text-base shadow-soft">
```

### Section Pattern

```tsx
<section className="px-6 sm:px-10 py-20 border-t border-foreground/10">
```

### Text Hierarchy

```tsx
<h2 className="text-3xl sm:text-5xl font-semibold tracking-tight">
<p className="mt-6 text-lg text-foreground/80 leading-relaxed">
```

---

_Last updated: November 6, 2025_
