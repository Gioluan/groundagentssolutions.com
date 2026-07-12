# BusVivo

> Bus-fleet tracking, compliance, and operator OS for Spanish autocar SMEs. EU 561 driver-hours engine, real-time map tracking, WhatsApp driver pairing.

- **Domain:** [busvivo.com](https://busvivo.com)
- **Repo:** `github.com/Gioluan/busvivo` (private)
- **Status:** Live. Phase 1 (Operator OS) build in progress. Founding-partner program open.

---

## What you are buying

A SaaS platform for Spanish autocar / bus-operator SMEs with:

- **Manager dashboard** — fleet view, driver list, trip list, real-time map
- **Driver mobile app** — paired via WhatsApp link, no SMS infrastructure
- **EU 561 compliance engine (v1)** — daily-only: 9h daily drive limit / 4.5h break rule / 11h rest
- **Empty-state onboarding** — Add Bus modal (matricula + modelo + L/100km), Add Driver modal (name + phone + autocar)
- **PWA + bottom-tab nav** (MAPA / FLOTA / CONDUCTORES / VIAJES) on mobile
- **Transit-poster design system** — Bebas Neue display, Space Grotesk body, JetBrains Mono data; paper `#f3ede0` + ink navy + signal yellow + transit red
- **Founding-partner pricing locked** — €5/bus/mo forever after 90-day free pilot (vs €10 public). 25 plazas reserved for Spanish autocar SMEs.

---

## Strategy roadmap (locked 2026-04-30)

| Phase | Scope | Target |
|---|---|---|
| **Phase 1** (current) | Operator OS for Spanish autocar SMEs: tracking + savings + compliance | now |
| **Phase 2** | Booking engine + dynamic pricing | Q3 2026 |
| **Phase 3** | Bus-transfers-in-Spain marketplace, Odisea Tours as demand-side anchor | Q4 2026 |
| **Phase 4** | Financial OS + insurance reseller | 2027+ |

---

## Phase 1 roadmap detail

11 sequenced build tasks defined. Decisions locked:

- **WhatsApp pairing link** (no SMS infra v1)
- **Hybrid bus assignment** (default + override per trip)
- **EU 561 daily-only for v1** (weekly + biweekly rules deferred to Phase 1.2)
- **Driver app = 5 screens** (login via pair, today's trip, start/break/end, history, profile)

Foundation files complete:
- `src/lib/firebase.ts`, `src/lib/firebase-admin.ts`, `src/lib/auth.tsx`
- `src/lib/schema.ts`, `firestore.rules`, `database.rules.json`
- `src/lib/store.ts` (dual-mode: demo localStorage OR firebase Firestore)

Auth complete (Round 4, 2026-05-01):
- `/api/auth/signup` mints custom token with `{ role: "manager", companyId }` claims
- Firebase project `busvivo-1b259` live (eur3 Firestore + europe-west1 RTDB)
- Custom rules deploy script `scripts/deploy-rules.mjs` (Node + google-auth-library, no firebase CLI required)

Manager onboarding complete (Round 5a, 2026-05-02):
- Add Bus + Add Driver modals shipped
- Empty states with primary CTAs on FLOTA / CONDUCTORES tabs
- Yellow header "▶ Añadir otro" bar in non-empty lists
- Auth-gated UI (+ buttons only show for managers)

---

## What's next (Round 5b — WhatsApp pairing flow)

- `/api/auth/pair-token-create` (manager creates token)
- `/api/auth/pair-token-consume` (driver consumes via WhatsApp link)
- `/d/[companyId]/[driverId]` pairing landing
- WhatsApp share button on driver detail page
- Replace driver app login with paired-driver flow

After 5b: trip logging, real-time positions, EU 561 v1 daily engine, savings dashboard.

---

## Founding-partner program

- **25 plazas** for Spanish autocar SMEs
- **90-day free pilot**, then €5/bus/mo locked forever (vs €10 public retail)
- **Ask:** real fleet data, weekly 20-min call, written/video reference
- **Contact:** `juan@busvivo.com`

---

## Cross-product links

- **None as of today.** Fully isolated infrastructure (own Firebase project, own domain, own auth).
- **Phase 3 link planned:** Use Odisea Tours as demand-side anchor for bus-transfers marketplace.

---

## What to read next

- [`stack-and-infra.md`](stack-and-infra.md)
- [`data-model.md`](data-model.md)
- [`operations.md`](operations.md)
