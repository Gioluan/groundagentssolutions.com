# Odisea Tours — Stack & Infrastructure

Odisea Tours has two codebases:

1. **Main marketing site** — Next.js 16, public-facing
2. **Internal CRM** — Vanilla JS SPA, ops cockpit

Both are documented below.

---

# 1. Main Marketing Site

## Repository

- **GitHub:** `github.com/Gioluan/odisea-tours-web` (private)
- **Default branch:** `master`
- **CI/CD:** Vercel auto-deploys `master` to production
- **Local path:** `~/Desktop/odisea-tours-web/`

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, TypeScript) |
| Styling | Tailwind v4 |
| Runtime | Node.js on Vercel |
| Analytics | Google Analytics 4 (G-902SEZT8Z1) |
| Email sender | Resend (`juan@odisea-tours.com` verified sender) |
| Schemas | BreadcrumbList, FAQPage, Article, TouristTrip JSON-LD |
| Content | Markdown / MDX in `content/` |
| Middleware | `middleware.ts` for routing |

## Hosting

| Item | Value |
|---|---|
| Provider | Vercel |
| Team | `mycantera` (shared) |
| Project | `odisea-tours-web` |
| Production domain | `odisea-tours.com` |

## DNS

| Provider | Cloudflare (DNS) + Hostalia (MX) |
|---|---|
| `odisea-tours.com` A/ALIAS | Vercel |
| `www.odisea-tours.com` CNAME | Vercel |
| MX | Hostalia (`juan@odisea-tours.com` mailbox) |
| Resend sender | `juan@odisea-tours.com` (verified via SPF/DKIM) |

> **Quirk:** Hostalia's DNS panel for `odisea-tours.com` is a **ghost zone** — Cloudflare is authoritative. Do not edit Hostalia DNS.

## Pages

- Tours: `/tours/[slug]` (7 tours)
- Audiences: `/veterans`, `/youth`, `/schools`
- Destinations: `/destinations/barcelona`, `/destinations/madrid`, `/destinations/valencia`
- Journal: `/journal/[slug]` (24 posts)
- Team: `/team`
- Plan-your-tour funnel: `/plan-your-tour` → form
- Contact: `/contact`
- Proposals: `/for/[slug]` (password-gated, served from MyCantera Firestore)

## Environment variables

```
RESEND_API_KEY
NEXT_PUBLIC_GA4_ID
NEXT_PUBLIC_FIREBASE_API_KEY      # only for /for/[slug] proposal reads
NEXT_PUBLIC_FIREBASE_PROJECT_ID    # → mycantera-2beb5
```

---

# 2. Internal CRM (Odisea Sales)

## Repository

- **GitHub:** `github.com/Gioluan/OdiseaTours` (private)
- **Local path:** `~/Desktop/odisea-sales/`
- **Launcher:** Desktop shortcut `Odisea Tours CRM.lnk`

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Vanilla JS SPA (no build step) |
| Styling | Custom CSS, dark theme |
| Auth | Firebase Auth (own project) |
| Database | Cloud Firestore (own project) |
| Templates | Email template library + photo asset library |
| Proposal builder | HTML deck → Playwright PDF → pikepdf compress |

## Hosting

| Item | Value |
|---|---|
| Deployment | Run locally as desktop app, OR deployable to Vercel |
| Vercel project | [VERIFY] |

## Firebase

| Item | Value |
|---|---|
| Project ID | [VERIFY — separate from mycantera-2beb5] |
| Services | Auth, Firestore |

## Key files

- `index.html` — entry point
- `app.js` (or similar) — SPA logic
- `templates/` — email templates
- `assets/photos/` — proposal photos
- `seed.js` — initial leads import script

---

# Proposal builder pipeline

Lives at `~/Desktop/odisea-itinerary-template/`.

**Flow:**
1. HTML deck rendered from template + client data
2. Playwright renders to PDF
3. pikepdf compresses (1100px / q55 → ~2MB output)
4. Two reusable shapes:
   - **Cultural Spain Tour** template
   - **Donosti Cup tournament** template

Published proposals are uploaded to MyCantera Firestore `odisea_proposals` collection and live at `odisea-tours.com/for/[slug]` (password-gated client-side).

---

# Lead scrapers (internal tooling)

| Folder | Purpose |
|---|---|
| `~/Desktop/odisea-lead-scraper/` | General tour-buyer scraper |
| `~/Desktop/odisea-school-leads/` | US private schools, Modern Languages Department Chairs |
| `~/Desktop/odisea-agency-leads/` | US travel agencies (124-seed scrape) |
| `~/.local/bin/_odisea_reels/` | FFmpeg branded Reel builder |

These are Python tools. Not customer-facing. Useful productivity assets; not load-bearing for the product.
