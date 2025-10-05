# Contact form email delivery via PHP

This project now supports sending contact form submissions to a PHP mailer endpoint. Follow the steps below to wire everything together.

## 1. Host the PHP handler

1. Ensure you have access to a PHP-capable environment (Apache, Nginx + PHP-FPM, shared hosting, etc.).
2. Deploy the file `public/contact-handler.php` to that environment. You can:
   - Copy it directly to the document root (e.g. `/var/www/html/contact-handler.php`), or
   - Mount it behind a custom path such as `/forms/contact-handler.php`.
3. Update the `$allowedOrigin` logic if you want to restrict CORS to a specific domain (recommended for production).
4. Confirm your server can send mail (SPF/DKIM records, authenticated SMTP relays, etc.). Swap the built-in `mail()` call for a library such as [PHPMailer](https://github.com/PHPMailer/PHPMailer) or an SMTP integration if deliverability is an issue.

## 2. Point the Next.js app at the endpoint

Configure the public environment variable with the PHP endpoint URL:

```bash
# .env.local
NEXT_PUBLIC_CONTACT_ENDPOINT="https://your-php-host.example.com/contact-handler.php"
```

When the variable is omitted the form defaults to `/contact-handler.php`, which only works if the PHP script lives alongside (and is executed by) the same origin that serves the Next.js build. This is unusual on serverless platforms like Vercel—deploy the PHP script elsewhere and set the full URL instead.

## 3. Form behaviour

- The form validates email and description client-side, then POSTs the remaining fields to the PHP endpoint as multipart form data.
- A JSON payload is expected in response:
  - `{ "success": true, "message": "..." }` – shows a green success banner and resets the form.
  - `{ "success": false, "message": "..." }` or non-200 status – shows a red error banner.
- If you provide the optional `onSubmit` prop (mainly for tests/analytics) it fires after a successful delivery.

## 4. Hardening checklist

- Replace the default `no-reply@maxwellsoftwaresolutions.com` sender with a mailbox that has SPF/DKIM configured.
- Add server-side spam filtering (e.g., Akismet) or CAPTCHA verification.
- Log or persist submissions if you need an audit trail.
- If you support multiple environments, set `NEXT_PUBLIC_CONTACT_ENDPOINT` separately per environment.

With these steps the contact form will deliver quotes to `admin@maxwellsoftwaresolutions.com` using a PHP backend.
