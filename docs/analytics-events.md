# Analytics Event Tracking Map

This document defines all analytics events tracked across the Maxwell Software Solutions website.

## Event Naming Convention

Events follow the pattern: `category.action.label`

- **category**: The type of interaction (e.g., `cta`, `form`, `outbound`)
- **action**: The specific action taken (e.g., `click`, `submit`)
- **label**: Additional context or identifier (e.g., `hero_primary`, `contact_success`)

## Tracked Events

### CTA (Call-to-Action) Clicks

| Event Name                 | Location      | Description                                              |
| -------------------------- | ------------- | -------------------------------------------------------- |
| `cta.click.hero_primary`   | Homepage hero | Primary CTA button ("Get started" / "Book consultation") |
| `cta.click.hero_secondary` | Homepage hero | Secondary CTA button ("View services")                   |
| `cta.click.services_cta`   | Services page | Main CTA on services page                                |
| `cta.click.case_study_cta` | Case studies  | CTA within case study cards                              |
| `cta.click.footer_contact` | Footer        | Contact link in footer                                   |

### Form Submissions

| Event Name                    | Form         | Description                |
| ----------------------------- | ------------ | -------------------------- |
| `form.submit.contact_success` | Contact form | Successful form submission |
| `form.submit.contact_failure` | Contact form | Failed form submission     |

### Outbound Links

| Event Name                         | Destination | Description                              |
| ---------------------------------- | ----------- | ---------------------------------------- |
| `outbound.click.github`            | GitHub      | Link to GitHub organization              |
| `outbound.click.linkedin`          | LinkedIn    | Link to LinkedIn company page            |
| `outbound.click.external_resource` | Various     | External documentation or resource links |

### Navigation

| Event Name               | Location | Description                  |
| ------------------------ | -------- | ---------------------------- |
| `nav.click.services`     | Header   | Services navigation link     |
| `nav.click.case_studies` | Header   | Case studies navigation link |
| `nav.click.about`        | Header   | About navigation link        |
| `nav.click.blog`         | Header   | Blog navigation link         |
| `nav.language_toggle`    | Header   | Language switcher (EN ↔ LT)  |

## Implementation

Events are tracked using the utility functions in `src/lib/analytics.ts`:

```typescript
import { trackCTAClick, trackFormSubmit, trackOutboundClick } from '@/lib/analytics';

// Track CTA click
trackCTAClick('hero_primary');

// Track form submission
trackFormSubmit('contact', true); // true = success, false = failure

// Track outbound link
trackOutboundClick('github', 'https://github.com/Maxwell-Software-Solutions');
```

## Google Analytics 4 Configuration

Events are sent to GA4 using the `gtag` function. The measurement ID is configured via the `NEXT_PUBLIC_GA_MEASUREMENT_ID` environment variable.

### Event Parameters

All events include:

- `event_category`: The category of the event
- `event_label`: The label/identifier
- `value`: Optional numeric value

Outbound links additionally include:

- `link_url`: The destination URL
- `transport_type`: Set to `beacon` for reliable tracking

## Development Mode

In development mode, all events are logged to the browser console for debugging:

```
[Analytics] cta.click.hero_primary { category: 'cta', action: 'click', label: 'hero_primary' }
```

## Privacy & GDPR Compliance

Analytics tracking respects user consent via Cookiebot integration. Events are only sent after user consent is obtained. No personally identifiable information (PII) is tracked.

## Monitoring & Analysis

Key metrics to monitor in GA4:

1. **CTA Engagement**: Conversion funnel from hero CTAs to contact form
2. **Form Success Rate**: `contact_success` vs `contact_failure` ratio
3. **Navigation Patterns**: Most clicked navigation items
4. **Outbound Interest**: Which external resources generate most interest

## Testing

Analytics events can be tested:

1. Open browser DevTools console
2. Set `NODE_ENV=development` or check console logs
3. Interact with tracked elements
4. Verify console output shows correct event names and parameters

## Maintenance

When adding new tracked interactions:

1. Add event to this documentation
2. Implement tracking call using appropriate utility function
3. Test in development mode
4. Verify in GA4 after deployment
