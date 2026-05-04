# Proyash

Website for **Proyash**, a student welfare initiative based in Tehatta, Nadia, West Bengal. The site manages event registration, showcases the annual event gallery, and provides a contact form for outreach.

## Stack

- **Frontend:** React 18, TypeScript, Vite, SCSS
- **Routing:** React Router v7
- **Email:** Resend API via AWS Lambda
- **Package manager:** pnpm

## Pages

| Route | Description |
|---|---|
| `/` | Home — intro, stats, testimonials |
| `/events` | Events listing for the annual competition |
| `/register` | Student registration form |
| `/dashboard` | Registered participant dashboard |
| `/gallery` | Photo gallery by year (2023–2025) |
| `/contact` | Contact form (sends email via Lambda + Resend) |

## Local Development

```bash
pnpm install
pnpm dev
```

The dev server runs at `http://localhost:5173`.

## Contact Form (Lambda)

The contact form posts to an AWS Lambda Function URL. The Lambda uses Resend to forward messages to the Proyash inbox.

**Environment variables** — create a `.env.local` at the project root:

```env
VITE_LAMBDA_URL=https://<your-function-url>.lambda-url.ap-south-1.on.aws/
```

**Lambda environment variables** (set in AWS console):

```
RESEND_API_KEY=<your-resend-api-key>
```

### Deploying the Lambda

```bash
cd lambda
npm install
zip -r contact.zip index.mjs package.json node_modules
```

Upload `contact.zip` to the `proyash-contact` Lambda function in `ap-south-1` and deploy.

## Build

```bash
pnpm build
```

Output goes to `dist/`.
