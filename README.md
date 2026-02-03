# central_dashboard

Portal for Microfix tools hosted on appfix.org.

## Local dev

```bash
npm i
npm run dev
```

## Auth (planned)

Uses Authentik (OIDC) via NextAuth/Auth.js.

Env vars:
- NEXTAUTH_URL
- NEXTAUTH_SECRET
- AUTHENTIK_ISSUER (e.g. https://auth.appfix.org/application/o/<slug>/)
- AUTHENTIK_CLIENT_ID
- AUTHENTIK_CLIENT_SECRET

