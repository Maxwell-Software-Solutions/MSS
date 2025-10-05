# Contact form email delivery via Resend

The contact form now submits directly to the Next.js route `POST /api/contact`, which relays the message using the [Resend](https://resend.com) transactional email API. Follow the steps below to configure the integration.

## 1. Configure environment variables

Create or update `.env.local` (and the matching variables in your hosting provider) with the following values:

```bash
RESEND_API_KEY="your_resend_api_key"
CONTACT_RECIPIENT_EMAIL="admin@maxwellsoftwaresolutions.com"
# Optional overrides
CONTACT_FROM_EMAIL="Maxwell Software Solutions <contact@maxwellsoftwaresolutions.com>"
NEXT_PUBLIC_CONTACT_ENDPOINT="/api/contact"
```

- `RESEND_API_KEY` — required. Generate from the Resend dashboard.
- `CONTACT_RECIPIENT_EMAIL` — defaults to `admin@maxwellsoftwaresolutions.com` but can be customised per environment.
- `CONTACT_FROM_EMAIL` — must use a verified sending domain in Resend. Defaults to `contact@maxwellsoftwaresolutions.com`.
- `NEXT_PUBLIC_CONTACT_ENDPOINT` — left as `/api/contact` unless you proxy through another service.

After setting the variables, redeploy the site so the new secrets are available. The API route will return `500` if the Resend key is missing.

## 2. Email payload details

`POST /api/contact` expects JSON:

```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane@example.com",
  "phone": "555-0101",
  "description": "Tell us about your project"
}
```

Server-side validation enforces a well-formed email address and a non-empty description. On success the handler sends both HTML and plain-text copies to the configured recipient and sets the `replyTo` header to the submitter's email address.

## 3. Client behaviour

- The React form sends JSON to `/api/contact` with `fetch`, shows a success banner when the API returns `{ "success": true }`, and surfaces any error message otherwise.
- The optional `onSubmit` callback still fires after successful delivery (used in tests/analytics).

## 4. Hardening checklist

- Verify the sending domain inside Resend so messages land in the inbox (SPF, DKIM, DMARC).
- Rate limit or add CAPTCHA if you expect high traffic or spam.
- Mirror submissions into persistent storage if you need an audit trail (Resend webhooks or a server-side insert).
- Remove `public/contact-handler.php` if you previously deployed the PHP workaround—it now returns `410 Gone` to discourage use.

With this setup the contact form delivers messages through the Resend API while staying fully compatible with Vercel’s serverless environment.
