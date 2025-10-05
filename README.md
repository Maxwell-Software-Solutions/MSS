This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Environment configuration

Set the following environment variables before running the contact form in production:

- `CONTACT_APPS_SCRIPT_URL` – the deployed Google Apps Script web-app URL that processes form submissions.
- `CONTACT_APPS_SCRIPT_TOKEN` – the shared secret token that the Apps Script expects in the `token` field.
- `CONTACT_ALLOWED_ORIGINS` *(optional)* – a comma-separated list of additional origins allowed to call `/api/contact`. The defaults cover `localhost:3000`, the production domain, and the staging deployment.

> Legacy support: the API route also recognises `APPS_SCRIPT_URL` and `SHARED_TOKEN` for compatibility with older deployments, but prefer the new `CONTACT_*` names for clarity.

You can define these in a `.env.local` file while developing locally:

```bash
CONTACT_APPS_SCRIPT_URL="https://script.google.com/macros/s/your-id/exec"
CONTACT_APPS_SCRIPT_TOKEN="super-secret-token"
CONTACT_ALLOWED_ORIGINS="https://partner.example,https://another.example"
```

Restart the dev server after updating the environment to pick up the changes.
