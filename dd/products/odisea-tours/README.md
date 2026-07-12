# Odisea Tours

> Group sports & cultural travel tour operator. 30+ pages, 5 packaged tours, GA4 instrumentation, internal CRM, and a Playwright-based proposal builder.

- **Domain:** [odisea-tours.com](https://odisea-tours.com)
- **Main site repo:** `github.com/Gioluan/odisea-tours-web` (private)
- **CRM repo:** `github.com/Gioluan/OdiseaTours` (private, vanilla JS app)
- **Status:** Live since 2026-04-16. Revenue-generating (tours invoiced via bank wire).

---

## What you are buying

A tour-operator business with:

- **Marketing site** — 30+ pages including 7 tour landing pages, 3 audience segments (veterans / youth / schools), 3 destination cities (Barcelona / Madrid / Valencia), 24 journal posts, team page, plan-your-tour funnel, contact form
- **Five packaged tours** with locked pricing:
  - Sabores de España — €2,595
  - Flamenco — €2,495
  - Camino de Santiago — €1,995
  - Soccer (US audience) — $3,495
  - Softball (US audience) — $2,895
  - Plus custom: Sin Traducción — $2,000 USD (8-night Spanish-immersion school anchor)
- **SEO surface** — BreadcrumbList, FAQPage, Article, TouristTrip schemas, keyword H1s, 30+ internal links across blog posts, sitemap + RSS
- **Internal CRM** — standalone vanilla JS app on its own Firebase project. Active daily ops cockpit. Desktop launcher shortcut.
- **Proposal builder** — HTML deck → Playwright PDF → pikepdf compress pipeline. Two reusable templates (cultural Spain Tour, Donosti Cup tournament). Live proposals shareable at `odisea-tours.com/for/[slug]` (cross-link to MyCantera Firestore).
- **Lead scrapers** — Python tooling under `~/Desktop/odisea-lead-scraper/` and `~/Desktop/odisea-school-leads/`. Produced 124-seed US-agency scrape and 50 curated US private schools list.
- **Reels pipeline** — FFmpeg branded Reel builder at `~/.local/bin/_odisea_reels/`. Reel 01 shipped.
- **Customer relationships** — 15+ years operating, deep relationships with Spanish football clubs (FCB / VCF / RFEF — note: NOT official partner, do not claim that in materials), Spanish coaching network, US travel agencies (124-seed pipeline, 7 tier-1 agencies ready for outreach).

---

## Brand & team

- **Founder:** Juan (sole founder, "big boss")
- **Aitor** — Middle East operations
- **Raul** — Lead sales rep
- 15+ years operating since 2005

---

## Status & traction

- **Launched website 2026-04-16** with full SEO scaffolding
- **GA4** instrumented (`G-902SEZT8Z1`)
- **Active proposals in flight** as of handover preparation — see CRM
- **Sin Traducción tour** — anchor for US Schools Pilot. 9 schools ready to send drafts at `~/Desktop/odisea-school-leads/output/email_drafts.md`
- **Bayswater City SC partnership outreach in flight** (NPL WA championship club, two-PDF proposal sent 2026-05-05)

---

## Cross-product links

- **CTA from MyCantera club pages** — every MyCantera club has a Tours tab linking here
- **Proposals stored in MyCantera Firestore** — `mycantera.com/sales` is the unified CRM; Odisea proposals live in `odisea_proposals` collection there
- **Email sender** — `juan@odisea-tours.com` via Resend; MyCantera `/sales` send-email API uses this sender

---

## Distribution channels (ranked, per 2026-05-07 playbook)

1. FAM trips (highest converting)
2. Trade shows / events (SYTA 2026 plan locked — Pittsburgh, Aug 21-24)
3. Ambassador / referral partners
4. LinkedIn outbound
5. Webinars
6. Cold email (lowest, but high volume)

---

## What to read next

- [`stack-and-infra.md`](stack-and-infra.md) — both main site and CRM technical detail
- [`operations.md`](operations.md) — deploy, content publishing, lead pipeline runbooks

---

## Archived sub-product

**OdiseaClub** — initially planned as a separate app (squad / trips / matches features). Archived. `odiseaclub.com` 301-redirects to `odisea-tours.com`. Source at `~/Desktop/odiseaclub/` (not actively developed). Not in scope for sale.
