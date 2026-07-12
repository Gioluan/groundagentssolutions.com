# I Wasn't There — Stack & Infrastructure

## Repository

- **GitHub:** `github.com/Gioluan/iwasntthere` (private)
- **Default branch:** `master`
- **CI/CD:** Vercel auto-deploys `master` to production
- **Local path:** `~/Desktop/iwasntthere/`

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, TypeScript) |
| Styling | Tailwind v4 |
| Runtime | Node.js on Vercel |
| Auth | Firebase Auth |
| Database | Cloud Firestore |
| Object storage | Firebase Storage (ephemeral photos) |
| Payments | Stripe (one-time Party Mode, multi-currency) |
| PWA | manifest.json + service worker, installable |
| Email routing | Cloudflare email routing → Gmail |
| SEO | 65+ URLs, JSON-LD schemas, sitemap + RSS, hreflang en-GB/en-US/en-AU/en-IE |

## Hosting

| Item | Value |
|---|---|
| Provider | Vercel |
| Team | `mycantera` (shared) |
| Project | `iwasntthere` |
| Production domain | `iwasntthere.com` |

## Firebase

| Item | Value |
|---|---|
| Project ID | [VERIFY] |
| Services | Auth, Firestore, Storage |

## DNS

| Record | Provider | Target |
|---|---|---|
| `iwasntthere.com` A/ALIAS | Cloudflare | Vercel |
| `www.iwasntthere.com` CNAME | Cloudflare | Vercel |
| Email routing | Cloudflare | Routes `partnerships@iwasntthere.com` to Juan's Gmail (Send As configured) |
| MX | (Google Workspace tenant on iwasntthere.com) | |

## Google Workspace

- Tenant: `iwasntthere.com`
- Mailbox: `partnerships@iwasntthere.com`
- **Login pattern:** Log in to `mail.google.com` directly as `partnerships@iwasntthere.com` to SEND (not "Send As" from another account)
- SPF / DKIM / DMARC verified, no deliverability issues

## Stripe

- Separate Stripe account (not shared with MyCantera)
- Party Mode one-time charges in GBP / EUR / USD
- Webhook endpoint: `https://iwasntthere.com/api/stripe/webhook`

## Environment variables (names only)

### Public
```
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
```

### Server
```
FIREBASE_ADMIN_PROJECT_ID
FIREBASE_ADMIN_CLIENT_EMAIL
FIREBASE_ADMIN_PRIVATE_KEY
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
STRIPE_PRICE_PARTY_MODE_GBP
STRIPE_PRICE_PARTY_MODE_EUR
STRIPE_PRICE_PARTY_MODE_USD
```

## Auto-delete cron

- Vercel cron OR Firebase scheduled function (verify which)
- Runs hourly, scans `trips` for `expiresAt < now()`, deletes:
  1. All photos in Firebase Storage under the trip
  2. All chat messages
  3. The trip record itself
- Free-tier 24h trips share the same cron pipeline

## Weekly blog cron

- Scheduled trigger ID: `trig_01E62Xk8mPZYd3WkHfAAbpzH`
- Tuesdays 10:00 Madrid time
- Generates a blog post (likely via Anthropic API) and publishes

## Known infrastructure debts

1. **Cloudflare email routing** depends on Juan's personal Gmail. Buyer should swap to their own destination on closing.
2. **Stripe account** is named after Juan — buyer creates own Stripe account on closing; price IDs re-created.
3. **Storage costs scale with photo volume** — auto-delete keeps it bounded, but a viral spike could create a transient Firebase Storage bill.
