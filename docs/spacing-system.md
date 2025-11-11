# Spacing System — Maxwell Software Solutions

## Design Tokens (4px base unit)

### Spacing Scale

- `xs` = 0.5rem (8px) - `2`
- `sm` = 0.75rem (12px) - `3`
- `md` = 1rem (16px) - `4`
- `lg` = 1.5rem (24px) - `6`
- `xl` = 2rem (32px) - `8`
- `2xl` = 3rem (48px) - `12`
- `3xl` = 4rem (64px) - `16`
- `4xl` = 6rem (96px) - `24`

## Usage Guidelines

### Page-level Wrapper

```tsx
<div className="min-h-screen px-6 sm:px-10 py-16 sm:py-20">
```

- Horizontal: `px-6 sm:px-10` (24px → 40px)
- Vertical: `py-16 sm:py-20` (64px → 80px)

### Section Spacing

```tsx
<section className="py-12 sm:py-16">
```

- Between major sections: `py-12 sm:py-16` (48px → 64px)
- Section internal top/bottom: `mt-12` or `mb-12`

### Container Max Width

```tsx
<div className="max-w-6xl mx-auto">
```

- Standard content: `max-w-6xl` (1152px)
- Wide content: `max-w-7xl` (1280px)
- Narrow content: `max-w-4xl` (896px)

### Card Padding

```tsx
<Card padding="md"> {/* p-6 */}
```

- Small: `p-4 sm:p-5` (16px → 20px)
- Medium: `p-6` (24px)
- Large: `p-8 sm:p-12` (32px → 48px)

### Grid Gaps

```tsx
<div className="grid gap-6 md:gap-8">
```

- Small items: `gap-4` (16px)
- Medium items: `gap-6 md:gap-8` (24px → 32px)
- Large cards: `gap-8` (32px)

### Vertical Stacking

```tsx
<div className="space-y-6">
```

- Tight: `space-y-3` (12px) - list items, form fields
- Medium: `space-y-6` (24px) - content blocks
- Loose: `space-y-10` or `space-y-12` (40px or 48px) - major content sections

### Text Spacing

- Heading margin: `mb-4` (16px)
- Paragraph margin: `mt-4` or `mt-6` (16px or 24px)
- Small text margin: `mt-2` or `mt-3` (8px or 12px)

### Button & Link Spacing

- Padding: `px-6 py-3` or `px-8 py-4` (24px/12px or 32px/16px)
- Group gap: `gap-3 sm:gap-4` (12px → 16px)

## Exceptions

1. **Hero Section**: Can use larger padding like `py-20` for visual impact
2. **Footer**: May use `py-12 sm:py-14` for balanced appearance
3. **Header**: Fixed height `h-14` (56px) for consistency

## Migration Checklist

- [ ] Update all page wrappers to use consistent `px-6 sm:px-10 py-16 sm:py-20`
- [ ] Standardize section padding to `py-12 sm:py-16`
- [ ] Ensure card padding follows small/medium/large pattern
- [ ] Verify grid gaps use `gap-6 md:gap-8` for most cases
- [ ] Check all `space-y-*` values match content hierarchy
