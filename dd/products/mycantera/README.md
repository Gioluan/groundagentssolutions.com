# MyCantera

> Soccer-club management SaaS — squads, matches, training, calendar, parent registration, payments, and Claude-powered AI tools for coaches.

- **Domain:** [mycantera.com](https://mycantera.com)
- **Repo:** `github.com/Gioluan/mycantera` (private)
- **Status:** Live. Paid users on Free / Coach / Club tiers. Demo club seeded at `mycantera.com/club/pacific-coast-fc`.

---

## What you are buying

A complete club-management platform with:

- **Squad management** — players, teams, parents, coaches, roles
- **Match management** — fixtures, line-ups, live match pages (`/live/[matchId]`), RSVPs, cancel/postpone notifications
- **Training** — sessions, attendance, AI-generated plans (Pro tier)
- **Public surface** — club page (`/club/[slug]`), player page (`/player/[id]`), bookable proposal page (`/for/[slug]`)
- **Registration & payments** — form builder, multi-step parent form, Stripe one-time or installments, auto-creates player records
- **AI coach tools** — 5 Pro-tier features powered by Anthropic Claude (training plans, post-match reports, chat, identity builder, drill library)
- **In-app notifications** — bell + modal, family RSVP summary, match status changes
- **PWA** — installable on iOS/Android with native splash + install celebration
- **Newsletter (separate sub-product)** — `learn.mycantera.com`, weekly coach AI newsletter
- **Unified Sales CRM** — `mycantera.com/sales`, Firebase-backed, also handles Odisea Tours proposals
- **Sales hiring kit + outreach playbook** — bilingual SDR scripts and process documented

---

## Pricing (locked 2026-04-19)

| Tier | Price | Audience |
|---|---|---|
| Free | $0 | Solo coaches, evaluation |
| Coach | $29 / month | Individual coach with one team |
| Club | $99 / month | Whole club, multi-team |
| Academy / League | Custom | Quoted via `partnerships@mycantera.com` |

AI features (training plans, reports, chat, identity, drills) are Pro-only — hard 403 gate enforced server-side.

---

## Status & traction

- **Demo club:** Pacific Coast FC seeded with 52 players, 15 matches, full identity → shareable at `mycantera.com/club/pacific-coast-fc`
- **Public surface SEO:** H1 keyword-optimized, next/image, dynamic OG tags, BreadcrumbList + Article + WebSite schemas on all public pages
- **Weekly blog:** Auto-publishes every Monday 9am
- **Authentication UX (shipped 2026-04-28):** Magic link, email verification, social proof scaffolding, App Check init, iOS splash, install celebration
- **Frontend audit complete (2026-04-30):** Design token sweep (625 emerald → CSS var), shared `@/components/ui/` module, skeletons on matches + teams pages, accessibility pass (alt + aria)

---

## Founding customers / pilots

- **Pacific Coast FC** — demo club (seeded by founder for sales demos)
- Outreach pipeline of ~5,000 cleaned contacts across 1,993 clubs (NCAA D1/D2/D3 + NAIA + youth + academy). See sales-ops folder for breakdown.

---

## Cross-product links

- **Tours module** — every MyCantera club has a Tours tab that funnels into Odisea Tours. **Never disable** (Odisea funnel relies on it).
- **`/sales` CRM** — also serves Odisea Tours proposals (writes `odisea_proposals` collection)

---

## What to read next

- [`stack-and-infra.md`](stack-and-infra.md) — full technical stack, repo paths, hosting, env vars
- [`data-model.md`](data-model.md) — Firestore collections, key schemas, rules
- [`operations.md`](operations.md) — deploy, rollback, runbooks
