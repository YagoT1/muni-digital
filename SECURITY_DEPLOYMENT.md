# Security hardening & deployment checklist

## 1) Environment variables
- Define and rotate `JWT_SECRET` periodically.
- Use `DATABASE_URL` in production.
- Set explicit `CORS_ORIGINS` with trusted domains only.
- Keep `SEED_ADMIN_ON_BOOT=false` in production.

## 2) HTTP security controls
- Security headers are enabled server-side (CSP, HSTS in prod, X-Frame-Options, nosniff, referrer policy).
- Deploy behind HTTPS only; HSTS requires TLS termination.

## 3) Rate limiting
- Global API limit enabled.
- Stricter limits enabled for:
  - `/auth/login`
  - `/auth/register`
  - `/users/:id/reset-password`

## 4) Auth/session
- Single frontend token key: `md_access_token`.
- Avoid logging tokens, JWT payloads, or passwords.
- Prefer migration to HttpOnly secure cookies in a future phase for stronger XSS resilience.

## 5) Admin operations
- Password reset no longer returns plaintext temporary passwords.
- `empleado` role assignment requires `legajo`.

## 6) Dependency governance
- Run regularly:
  - `npm --prefix backend audit`
  - `npm --prefix frontend audit`
- Patch critical/high advisories first.

## 7) Operational recommendations
- Enable centralized logging and redaction (password/token fields).
- Add WAF/CDN rate-limits as external defense-in-depth.
- Use secret manager (not plain `.env` in production).
