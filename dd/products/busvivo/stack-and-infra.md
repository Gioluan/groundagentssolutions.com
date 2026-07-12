# BusVivo — Stack & Infrastructure

## Repository

- **GitHub:** `github.com/Gioluan/busvivo` (private)
- **Default branch:** `master`
- **CI/CD:** Vercel auto-deploys `master` to production
- **Local path:** `~/Desktop/busvivo/`

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, TypeScript) |
| Styling | Tailwind v4 + CSS vars (transit-poster aesthetic) |
| Fonts | Bebas Neue (display) + Space Grotesk (body) + JetBrains Mono (data) |
| Auth | Firebase Auth + Admin SDK (custom token minting) |
| Database | Cloud Firestore (eur3) + Firebase Realtime Database (europe-west1) |
| Map | Leaflet + OpenStreetMap tiles |
| Pairing | WhatsApp share links (no SMS infrastructure) |
| PWA | manifest.json + service worker, installable |

## Why Firestore + RTDB?

- **Firestore (eur3)** — persistent state: companies, buses, drivers, trips, EU 561 calculations
- **Realtime Database (europe-west1)** — live driver positions (high write frequency, low retention, cheaper than Firestore for ephemeral data)

## Hosting

| Item | Value |
|---|---|
| Provider | Vercel |
| Team | `mycantera` (shared with all 4 products) |
| Project | `busvivo` (under team `mycantera/busvivo`) |
| Production domain | `busvivo.com` |
| Aliases | `busvivo.vercel.app`, `busvivo-mycantera.vercel.app`, `busvivo-gioluan-mycantera.vercel.app` |

## Firebase

| Item | Value |
|---|---|
| Project ID | `busvivo-1b259` |
| Console | `console.firebase.google.com/project/busvivo-1b259` |
| Firestore region | `eur3` |
| RTDB region | `europe-west1` |
| Services enabled | Auth, Firestore, RTDB |
| Authorized domains for Auth | `busvivo.com`, `busvivo.vercel.app` (added 2026-05-02) |

## DNS

| Record | Target |
|---|---|
| `busvivo.com` A/ALIAS | Vercel |
| `www.busvivo.com` CNAME | Vercel |
| MX | [VERIFY] |

## Environment variables

### Public (browser-safe)
```
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_DATABASE_URL
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
NEXT_PUBLIC_PAIRING_BASE_URL    # default: https://busvivo.com/d
```

### Server
```
FIREBASE_ADMIN_PROJECT_ID
FIREBASE_ADMIN_CLIENT_EMAIL
FIREBASE_ADMIN_PRIVATE_KEY
```

All env vars set on Vercel production. Auto-deploys from master.

## Auth flow

- **Manager signup:** email/password → `/api/auth/signup` → mints custom token with `{ role: "manager", companyId }` claim → user gets `companyId` scoped to their company
- **Driver pairing (in progress):** Manager creates pair token on driver detail page → shares via WhatsApp link `https://busvivo.com/d/[companyId]/[driverId]?token=xxx` → driver opens link, signs in (creates Firebase Auth account on first use), token consumed, driver bound to company

## Store layer

`src/lib/store.ts` is dual-mode:

```ts
setMode('demo')      // reads/writes localStorage (works in browser, no Firebase)
setMode('firebase')  // reads/writes Firestore via authenticated client
```

This lets the marketing demo work without Firebase credentials and the production app work against real data with the same UI code.

## Rules deploy

Custom Node script — does NOT require firebase CLI / firebase login:

```bash
node scripts/deploy-rules.mjs
```

Internals:
1. Reads service account JSON
2. Uses `google-auth-library` to mint OAuth tokens
3. POSTs `firestore.rules` content to firebaserules API
4. PUTs `database.rules.json` to RTDB `/.settings/rules.json` with Bearer header

## Known infrastructure debts

1. **No SMS provider** — pairing is WhatsApp-only by design. If WhatsApp link delivery becomes problematic, add Twilio (~1 day work).
2. **OpenStreetMap free tiles** — fine at pilot scale. At scale, move to Mapbox / MapTiler.
3. **EU 561 v1 = daily rules only** — weekly (56h/week max) and biweekly (90h/2-weeks max) rules deferred to v1.2.
4. **No billing wired** — pilots are free; production billing TBD post-pilot.
