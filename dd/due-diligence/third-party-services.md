# Third-Party Services — Dependency Matrix

Per-product breakdown of every external service the products depend on. "Critical" means the product breaks if cut. "Important" means a feature degrades. "Nice-to-have" means the product still works.

---

## MyCantera

| Service | Criticality | What breaks if cut | Replacement effort |
|---|---|---|---|
| Vercel | Critical | App goes down | Move to Netlify / Cloudflare Pages / AWS Amplify — half-day |
| Firebase (Auth + Firestore + Storage) | Critical | Login, all data, uploads | No clean swap; would require rewrite to Supabase or self-hosted Postgres |
| Stripe | Critical for paid tiers | Subscriptions stop processing | Paddle / Lemon Squeezy swap — 2–3 days |
| Anthropic Claude API | Important (Pro features) | 5 AI features go dark (Free/Coach tiers unaffected) | OpenAI / Gemini swap — 1 day, prompt rewriting required |
| Resend (newsletter) | Important | Coach AI newsletter doesn't send | SendGrid / Postmark swap — half-day |
| Google Workspace (mycantera.com) | Important | Email goes through workspace | Migrate to Fastmail / different Workspace tenant |
| Postmaster Tools | Nice-to-have | No domain rep visibility | Free alternative |
| DNS (registrar) | Critical | Domain stops resolving | Standard registrar transfer |

---

## Odisea Tours

| Service | Criticality | What breaks if cut | Replacement effort |
|---|---|---|---|
| Vercel | Critical | Marketing site + proposal pages down | Move to Netlify — half-day |
| Firebase (Odisea CRM — own project) | Critical for CRM | Lead pipeline / proposal builder unusable | CRM is internal; downtime tolerable while migrating |
| Cloudflare DNS | Critical | Domain stops resolving | Standard DNS migration |
| Hostalia (MX) | Important | juan@odisea-tours.com mailbox unreachable | Migrate MX to Google Workspace or Fastmail — half-day |
| Resend (juan@odisea-tours.com sender) | Important | Outbound sales email stops | SendGrid / Postmark — half-day |
| GA4 | Nice-to-have | No analytics | n/a |
| MyCantera Firestore (cross-link for proposals) | Important | `/for/[slug]` proposal pages 404 unless migrated | Export collection + repoint — half-day. See [handover-checklist.md](handover-checklist.md). |

---

## BusVivo

| Service | Criticality | What breaks if cut | Replacement effort |
|---|---|---|---|
| Vercel | Critical | App goes down | Move to Netlify — half-day |
| Firebase (Firestore eur3 + RTDB europe-west1 + Auth) | Critical | Login, fleet data, live driver positions | No clean swap; would require rewrite |
| Leaflet + OpenStreetMap tiles | Critical for map view | Map breaks | Mapbox / MapTiler swap — 1 day. Will likely be needed at scale anyway. |
| WhatsApp link generation | Critical for driver pairing flow | No SMS infrastructure; WhatsApp is the only pairing channel | Add SMS provider (Twilio) — 1–2 days |
| DNS (registrar) | Critical | Domain stops resolving | Standard registrar transfer |

---

## I Wasn't There

| Service | Criticality | What breaks if cut | Replacement effort |
|---|---|---|---|
| Vercel | Critical | App goes down | Move to Netlify — half-day |
| Firebase (Auth + Firestore + Storage — own project) | Critical | Login, trip data, photo upload, auto-delete cron | No clean swap |
| Stripe | Critical for Party Mode | Paid tier stops; free tier still works | Paddle swap — 1 day |
| Cloudflare email routing | Important | partnerships@ mail dead-letters | Add Workspace tenant — half-day |
| Google Search Console | Nice-to-have | No SEO visibility | n/a |

---

## Cross-cutting

| Service | Used by | Single point of failure? |
|---|---|---|
| GitHub (Gioluan account) | All 4 product repos | Account compromise = all source code at risk. Mitigated by transferring to a dedicated org pre-closing. |
| Vercel team `mycantera` | All 4 product deploys | Team account = all deploys at risk. Mitigated by team-level 2FA + buyer creates own team and re-imports projects. |
| Founder's email (jbs.spain@gmail.com) | Recovery for many of the above | Set up dedicated `ops@` recovery email pre-closing. |
