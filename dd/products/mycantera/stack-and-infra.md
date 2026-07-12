# MyCantera — Stack & Infrastructure

## Repository

- **GitHub:** `github.com/Gioluan/mycantera` (private)
- **Default branch:** `master`
- **CI/CD:** Vercel auto-deploys `master` to production. PR previews on every branch push.

## Local development

```
git clone git@github.com:Gioluan/mycantera.git
cd mycantera
npm install
cp .env.example .env.local   # fill in Firebase + Stripe + Anthropic keys
npm run dev                  # http://localhost:3000
```

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, TypeScript) |
| Styling | Tailwind v4 + CSS vars for theming |
| Runtime | Node.js on Vercel |
| Auth | Firebase Auth (email + magic link + Google + Apple) |
| Database | Cloud Firestore |
| Object storage | Firebase Storage |
| Payments | Stripe (subscriptions) |
| AI | Anthropic Claude API (Pro tier only) |
| Transactional email | Resend (newsletter key only — separate from product email) |
| PWA | manifest.json + service worker, iOS splash, install celebration |
| Analytics | [VERIFY — GA4 or self-hosted] |

---

## Hosting

| Item | Value |
|---|---|
| Provider | Vercel |
| Team | `mycantera` (shared with all 4 products) |
| Project | `mycantera` |
| Production domain | `mycantera.com` |
| Production aliases | [VERIFY — www.mycantera.com] |
| Newsletter sub-app | `learn.mycantera.com` (separate Vercel project or route) |

---

## Firebase

| Item | Value |
|---|---|
| Project ID | `mycantera-2beb5` |
| Console URL | `console.firebase.google.com/project/mycantera-2beb5` |
| Region | [VERIFY] |
| Services enabled | Auth, Firestore, Storage, App Check init, Hosting (unused) |

---

## DNS

| Record | Type | Target |
|---|---|---|
| `mycantera.com` | A / ALIAS | Vercel |
| `www.mycantera.com` | CNAME | Vercel |
| `learn.mycantera.com` | CNAME | Vercel |
| `auth/action` route | (Next.js route) | Custom Firebase action handler — keeps firebaseapp.com URLs out of emails |
| MX | (Google Workspace) | `mycantera.com` tenant |
| SPF / DKIM / DMARC | TXT | Verified, mail-tester score 10/10 |

---

## Environment variables (names only — secrets not in this repo)

### Public (NEXT_PUBLIC_*)
```
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
NEXT_PUBLIC_APP_CHECK_RECAPTCHA_KEY
```

### Server
```
FIREBASE_ADMIN_PROJECT_ID
FIREBASE_ADMIN_CLIENT_EMAIL
FIREBASE_ADMIN_PRIVATE_KEY
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
ANTHROPIC_API_KEY
RESEND_NEWSLETTER_API_KEY
```

### Stripe price IDs (16 total)
```
STRIPE_PRICE_COACH_MONTHLY
STRIPE_PRICE_COACH_ANNUAL
STRIPE_PRICE_CLUB_MONTHLY
STRIPE_PRICE_CLUB_ANNUAL
... (+ add-on price IDs)
```

> The full env var matrix lives in `.env.example` in the repo. On closing, all secrets are rotated.

---

## Auth flow

- Sign-up: email + magic link OR Google OR Apple (Apple Sign In needs Firebase Console setup post-handover)
- Verification email links go through the custom `/auth/action` route on `mycantera.com` — `firebaseapp.com` URLs deliberately kept out of all emails for spam-reputation reasons
- App Check is initialized but **enforcement is not toggled on yet** — buyer should enable in Firebase Console post-handover
- Custom claims: `{ role: "manager" | "coach" | "parent" | "player", clubId }`

---

## Public-page caching strategy

- `/club/[slug]` — ISR with 60s revalidate
- `/live/[matchId]` — server-render with no cache (live data)
- `/for/[slug]` — server-render with password gate
- Blog — static, regenerated on Monday cron via Vercel cron

---

## Known infrastructure debts

1. **Resend free tier** — newsletter currently sends from a free Resend account. Upgrading to Pro ($20/mo) removes the 100/day cap and unlocks transactional sending from `mycantera.com` directly (currently transactional goes via Firebase default mailer).
2. **Apple Sign In** — wired in code but needs Apple Developer Account + Firebase Console toggle.
3. **App Check enforcement** — currently `init` only; not enforcing on Firestore yet.
4. **Postmaster Tools** — monitor daily for first 30 days of any new outreach push (per founder's `mc_fu1` recovery plan).
