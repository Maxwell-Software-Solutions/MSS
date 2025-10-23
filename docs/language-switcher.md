# Language Switcher Implementation

## Overview
A complete internationalization (i18n) system has been implemented that allows users to switch between English and Lithuanian on the home page.

## Features Implemented

### 1. Language Context Provider (`src/lib/LanguageContext.tsx`)
- React Context for managing language state globally
- Supports English (`en`) and Lithuanian (`lt`)
- Automatically saves language preference to localStorage
- Updates the HTML `lang` attribute for accessibility
- Provides a `t()` function for translating text

### 2. Translation Files
- **English**: `src/lib/translations/en.json`
- **Lithuanian**: `src/lib/translations/lt.json`

Both files contain all translations for:
- Hero section (title, subtitle, CTAs)
- Statistics cards
- Value propositions
- Capabilities section
- About section
- Process timeline
- Case studies
- Contact section

### 3. Language Switcher Button
Located in the header navigation (`HeaderNav.tsx`):
- Shows 🇱🇹 LT when in English mode
- Shows 🇬🇧 EN when in Lithuanian mode
- Toggles between languages on click
- Styled to match the site's design system

### 4. Translated Home Page
The entire home page (`page.tsx`) now uses the translation system:
- All hardcoded text replaced with `t('translation.key')` calls
- Maintains the same layout and styling
- Switches instantly when language is changed

## How to Use

1. **As a User**: Click the language button in the top navigation (desktop) or menu (mobile) to switch between English and Lithuanian

2. **As a Developer**: 
   - To add new translations, edit the JSON files in `src/lib/translations/`
   - Use the `useLanguage()` hook in any component:
     ```tsx
     import { useLanguage } from '@/lib/LanguageContext';
     
     function MyComponent() {
       const { t } = useLanguage();
       return <h1>{t('my.translation.key')}</h1>;
     }
     ```

## Technical Details

- **State Management**: React Context API
- **Persistence**: localStorage (survives page refreshes)
- **Dynamic Loading**: Translations are loaded asynchronously when language changes
- **Client-Side**: The page is now a client component to support dynamic language switching
- **Accessibility**: Updates HTML lang attribute for screen readers

## Future Enhancements

To extend this to other pages:
1. Create translation files for each page
2. Add `'use client'` directive to the page component
3. Import `useLanguage` hook
4. Replace hardcoded text with `t('key')` calls

Example:
```tsx
'use client';
import { useLanguage } from '@/lib/LanguageContext';

export default function AboutPage() {
  const { t } = useLanguage();
  return <h1>{t('about.title')}</h1>;
}
```
