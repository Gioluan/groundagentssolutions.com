# Accounts Inventory

Every external account that the four products depend on. On closing day, each row needs to be transferred, re-keyed, or co-owned by the buyer. Items marked **[VERIFY]** need to be confirmed against the live account before the deal closes.

---

## Hosting

| Service | Account / handle | Used by | Transfer mechanism |
|---|---|---|---|
| Vercel | Team `mycantera` | MyCantera, Odisea Tours, BusVivo, I Wasn't There | Team settings → Transfer ownership (Vercel UI) |
| GitHub | `Gioluan` (personal) | All product repos | Per-repo transfer to buyer's org, OR full account transfer |

---

## DNS & Domains

| Domain | Registrar | DNS provider | Used by |
|---|---|---|---|
| mycantera.com | [VERIFY — GoDaddy?] | Vercel | MyCantera |
| learn.mycantera.com | (subdomain) | Vercel | MyCantera newsletter |
| odisea-tours.com | [VERIFY — GoDaddy/Hostalia] | Cloudflare | Odisea Tours |
| busvivo.com | [VERIFY] | Vercel | BusVivo |
| iwasntthere.com | [VERIFY] | Cloudflare | I Wasn't There |
| groundagentssolutions.com | [VERIFY] | [VERIFY] | Parent marketing |
| casaruralelchato.com | [VERIFY] | [VERIFY] | Out of scope (Juan's friend) |
| odiseaclub.com | [VERIFY] | 301 → odisea-tours.com | Archived |

> **DNS quirk:** odisea-tours.com DNS lives on Cloudflare even though MX points to Hostalia. Hostalia's DNS panel is a ghost zone — do not edit it.

---

## Firebase projects

| Project ID | Used by | Region | Notes |
|---|---|---|---|
| `mycantera-2beb5` | MyCantera (+ Odisea proposals subset) | [VERIFY] | Auth + Firestore + Storage |
| `busvivo-1b259` | BusVivo | eur3 (Firestore), europe-west1 (RTDB) | Firestore + RTDB + Auth |
| [VERIFY] | Odisea CRM (standalone vanilla JS app) | [VERIFY] | Auth + Firestore. Separate from MyCantera FB. |
| [VERIFY] | I Wasn't There | [VERIFY] | Auth + Firestore + Storage |

Transfer: Firebase project ownership transfers via Google Cloud Console → IAM. Buyer creates a Google account, founder adds them as Owner, then removes self.

---

## Payments

| Provider | Account | Used by | Notes |
|---|---|---|---|
| Stripe | [VERIFY — account ID] | MyCantera (subscriptions) | 16 price IDs (Free / Coach $29 / Club $99 × monthly/annual + each tier's add-ons). See `products/mycantera/stack-and-infra.md`. |
| Stripe | [VERIFY — account ID] | I Wasn't There (one-time Party Mode) | Multi-currency: GBP / EUR / USD |
| Odisea Tours | Bank wire / invoicing | Odisea Tours | No card processor — tours invoiced via bank wire. |
| BusVivo | Not yet wired | BusVivo | Founding-partner program is free; production billing TBD. |

Stripe transfer: Stripe does not allow direct account ownership transfer. The standard path is to provision new Stripe accounts under the buyer, migrate price IDs, and run a cutover. ~1 day per Stripe account.

---

## Email & messaging

| Service | Account | Used by | Notes |
|---|---|---|---|
| Google Workspace | mycantera.com tenant | ramy@mycantera.com, partnerships@mycantera.com | SPF/DKIM/DMARC pass. Mail-tester 10/10. |
| Google Workspace | iwasntthere.com tenant | partnerships@iwasntthere.com | Send As (login mail.google.com as partnerships@). SPF/DKIM/DMARC pass. |
| Resend | [VERIFY] | Odisea Tours (juan@odisea-tours.com) | Verified sender |
| Resend | [VERIFY — separate key] | MyCantera newsletter (learn.mycantera.com) | Newsletter only |
| Cloudflare email routing | iwasntthere.com → Gmail | I Wasn't There ops | Routes partnerships@ to Juan's Gmail |
| Anthropic Claude API | [VERIFY] | MyCantera AI features | Pro-tier features (5 AI tools) |

---

## Analytics & SEO

| Service | Account | Used by |
|---|---|---|
| Google Analytics 4 | G-902SEZT8Z1 | Odisea Tours |
| Google Search Console | [VERIFY — emails] | All 4 products |
| Google Tag Manager | [VERIFY] | [VERIFY] |
| Postmaster Tools | [VERIFY] | MyCantera (rep monitoring) |

---

## Third-party data / APIs

| Service | Used by | Notes |
|---|---|---|
| Brave Search API | MyCantera lead scraper (internal tool) | Cap-limited plan; tier matters (see internal notes) |
| Anthropic API | MyCantera (Claude reports, training plans, chat) | Pay-as-you-go |
| Leaflet / OpenStreetMap tiles | BusVivo map view | Free tile usage at current scale |

---

## What does NOT transfer (founder-personal, out of scope)

- Personal devices, the founder's Apple ID, personal Calendly (`calendly.com/juan-odisea-tours/30min`)
- Personal GitHub `Gioluan` account if the buyer prefers a clean org transfer of individual repos rather than full account transfer
- Personal Anthropic Claude Code account / settings
- Internal tooling under `~/.local/bin/` (Jarvis voice assistant, reels pipeline, etc.) — these are personal-productivity tools, not product infra

---

## Transfer order (recommended)

1. Transfer GitHub repos first — buyer needs source code to verify.
2. Transfer Firebase projects next — auth, data, storage all bind to it.
3. Transfer DNS registrar last — domain delegation flip happens after buyer has working infra.
4. Stripe runs in parallel on its own track (new account on buyer side, cutover).

A full step-by-step is in [handover-checklist.md](handover-checklist.md).
