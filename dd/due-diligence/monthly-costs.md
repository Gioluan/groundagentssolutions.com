# Monthly Operating Costs

Rough monthly cost breakdown for the four products at current scale. All figures are USD/month unless noted. Items marked **[VERIFY]** should be confirmed against the active invoices on closing.

> The current operating cost is intentionally low — the founder has optimized aggressively for "ship without burning capital." A buyer with revenue ambition will likely upgrade some tiers (Vercel Pro, Firebase reserved capacity, Resend Pro for MyCantera) as user count grows.

---

## Per-product cost (current scale)

### MyCantera

| Line item | Cost | Notes |
|---|---|---|
| Vercel (Hobby/Pro share) | [VERIFY] | Shared on `mycantera` team |
| Firebase Blaze (Auth + Firestore + Storage) | $0–10 | Free tier covers current usage |
| Anthropic Claude API | Variable | Pay-as-you-go; depends on Pro-tier AI feature usage |
| Resend (newsletter key only) | $0 | Free tier (3K emails/mo, 1 domain) |
| Stripe | 2.9% + $0.30 per txn | Standard rates |
| Google Workspace (mycantera.com tenant) | ~$7 / user | 2 mailboxes (ramy@, partnerships@) → ~$14 |
| Domain mycantera.com | ~$15/year | Effectively $1.25/mo |
| **MyCantera subtotal** | **~$15–50 + Stripe% + Anthropic usage** | |

### Odisea Tours

| Line item | Cost | Notes |
|---|---|---|
| Vercel | Shared on `mycantera` team | |
| Firebase (Odisea CRM) | $0 | Free tier |
| Resend | $0 | Free tier, one verified sender |
| Domain odisea-tours.com | ~$15/year | Effectively $1.25/mo |
| Cloudflare DNS | $0 | Free plan |
| Hostalia (MX, ghost zone) | [VERIFY] | Legacy MX hosting |
| GA4 | $0 | Free |
| **Odisea Tours subtotal** | **~$1–10** | |

### BusVivo

| Line item | Cost | Notes |
|---|---|---|
| Vercel | Shared on `mycantera` team | |
| Firebase Blaze (Firestore eur3 + RTDB europe-west1 + Auth) | $0–10 | Free tier covers current pilot scale |
| Domain busvivo.com | ~$15/year | Effectively $1.25/mo |
| Leaflet / OSM tiles | $0 | Free at current scale; will need paid tile provider at scale |
| **BusVivo subtotal** | **~$1–10** | Founding-partner pilots are free (no billing wired yet) |

### I Wasn't There

| Line item | Cost | Notes |
|---|---|---|
| Vercel | Shared on `mycantera` team | |
| Firebase Blaze (Auth + Firestore + Storage) | $0–10 | Ephemeral storage cycles photos out fast |
| Stripe | 2.9% + $0.30 per txn | |
| Google Workspace (iwasntthere.com tenant) | ~$7 / user | 1 mailbox (partnerships@) → ~$7 |
| Cloudflare email routing | $0 | Routes mail to Gmail |
| Domain iwasntthere.com | ~$15/year | Effectively $1.25/mo |
| **I Wasn't There subtotal** | **~$10–20 + Stripe%** | |

---

## Shared / infrastructure-level costs

| Line item | Cost | Notes |
|---|---|---|
| Vercel team `mycantera` (single bill) | [VERIFY — Hobby or Pro $20/mo] | Covers all 4 products |
| GitHub (Gioluan personal) | $0 | Free for private repos |
| Brave Search API (internal lead tooling) | [VERIFY — usage-capped] | MyCantera lead pipeline only, not user-facing |

---

## Total monthly burn (rough)

At current scale (pilots + early paid users), all four products combined run on roughly **$30–80 / month plus payment processor fees**. The dominant variable is Anthropic API usage on MyCantera if AI features scale.

A buyer who upgrades to:
- Vercel Pro ($20/mo, removes hobby restrictions)
- Resend Pro for MyCantera transactional ($20/mo)
- Firebase reserved capacity at scale

…would still operate the bundle under **$200/month** for the first ~1,000 paying users.

---

## What costs are NOT in scope

- Founder's personal subscriptions (Claude Code Max, JetBrains, etc.)
- Internal-tooling APIs (e.g. Brave Search lead scraper) — these are sales productivity, not user-facing infra
- One-time spends (logo work, photography, domain registration backlog)
