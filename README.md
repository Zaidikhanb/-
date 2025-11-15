# Ali Institute Registration

Stylish static frontend + simple Vercel serverless APIs that store submissions into `data.json` and create per-entry `.vcf` files.

## Files included
- `index.html` — user-facing registration form (styled)
- `admin.html` — admin dashboard (password protects via `ADMIN_PASS` env var)
- `styles.css` — central styling
- `utils.js` — front-end JS (submit, immediate vcf download)
- `/api/*.js` — Vercel serverless endpoints: `save`, `all`, `delete`, `login`, `download-json`, `download-vcf`, `purge`
- `package.json`, `README.md`

## Deploy to Vercel
1. Create a new Vercel project, connect GitHub or upload files.
2. Add environment variable `ADMIN_PASS` in the Vercel dashboard.
3. Deploy.

Security note: This example uses filesystem storage for simplicity. For production, use a proper database (Postgres / Firebase / S3) and hardened authentication.
