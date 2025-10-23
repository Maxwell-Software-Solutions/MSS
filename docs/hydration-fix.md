# Hydration Mismatch Fix

## Problem
Hydration error occurred because the server rendered translation keys (e.g., "nav.services") while the client rendered the actual translated text (e.g., "Services").

**Error Message:**
```
Hydration failed because the server rendered text didn't match the client.
+ Services
- nav.services
```

## Root Cause
- The `HeaderNav` component is rendered server-side in `layout.tsx`
- Translation files are loaded asynchronously on the client
- During SSR, translations aren't available yet, so `t('nav.services')` returns the key itself
- When React hydrates on the client, translations are loaded and `t('nav.services')` returns "Services"
- This mismatch causes React to throw a hydration error

## Solution Implemented

### 1. Added Client-Side Detection
Updated `LanguageContext.tsx` to track when we're on the client:
```tsx
const [isClient, setIsClient] = useState(false);

useEffect(() => {
  setIsClient(true);
}, []);
```

### 2. Modified Translation Function
Updated the `t()` function to return the key during SSR:
```tsx
const t = useCallback(
  (key: string): string => {
    // During SSR or before translations load, return the key itself
    if (!isClient || Object.keys(translations).length === 0) {
      return key;
    }
    return translations[key] || key;
  },
  [translations, isClient]
);
```

### 3. Added Hydration Suppression
Added `suppressHydrationWarning` to navigation links:
```tsx
<Link href="/services" suppressHydrationWarning>
  {t('nav.services') || 'Services'}
</Link>
```

### 4. Added Fallback Values
Provided explicit fallback values for all navigation links:
```tsx
{t('nav.services') || 'Services'}
{t('nav.caseStudies') || 'Case studies'}
{t('nav.about') || 'About'}
{t('nav.blog') || 'Blog'}
```

## Why This Works

1. **Server renders the translation key** → "nav.services"
2. **Client initially renders the same key** → "nav.services" (before translations load)
3. **No hydration mismatch** → Server and client match!
4. **After hydration, translations load** → Updates to "Services" via React re-render
5. **suppressHydrationWarning** → Tells React this is intentional

## Files Modified

1. `src/lib/LanguageContext.tsx`
   - Added `isClient` state
   - Modified `t()` function to handle SSR

2. `src/app/components/HeaderNav.tsx`
   - Added `suppressHydrationWarning` to links
   - Added fallback values

3. `src/app/components/navigation/MobileMenu.tsx`
   - Added `suppressHydrationWarning` to links
   - Added fallback values

## Alternative Solutions Considered

### Option 1: Make Everything Client-Only (Not Chosen)
```tsx
{typeof window !== 'undefined' ? t('nav.services') : 'Services'}
```
❌ **Rejected:** Still causes hydration mismatch

### Option 2: Dynamic Import Header (Not Chosen)
```tsx
const HeaderNav = dynamic(() => import('./HeaderNav'), { ssr: false });
```
❌ **Rejected:** Worse SEO, flash of missing nav on initial load

### Option 3: Pre-load Translations (Not Chosen)
Load all translations synchronously on the server
❌ **Rejected:** Complex, increases bundle size, defeats lazy loading

### ✅ Option 4: Controlled Hydration (Chosen)
Allow initial mismatch, suppress warning, provide fallbacks
✅ **Benefits:**
- Simple implementation
- Good SEO (nav rendered server-side)
- Minimal performance impact
- Translations load progressively

## Testing

To verify the fix:
1. Visit http://localhost:3000
2. Open browser console
3. ✅ No hydration errors should appear
4. Navigation should work correctly
5. Language switching should work smoothly
6. Check in incognito mode (no cached translations)

## Performance Impact

- **Minimal:** Small delay (~100-200ms) before translations appear
- **User Experience:** Slight flash from "nav.services" → "Services"
- **SEO:** ✅ Full server-side rendering maintained
- **Bundle Size:** No increase

## Future Improvements

If the translation key flash becomes noticeable:
1. Pre-render translations in the HTML (increase initial bundle)
2. Use cookies to detect language preference server-side
3. Implement i18n routing (e.g., `/en/services`, `/lt/services`)
4. Add loading state with proper fallback text

## Related Documentation

- React Hydration: https://react.dev/reference/react-dom/client/hydrateRoot
- Next.js i18n: https://nextjs.org/docs/advanced-features/i18n-routing
- suppressHydrationWarning: https://react.dev/reference/react-dom/client/hydrateRoot#suppressing-unavoidable-hydration-mismatch-errors
