# MyCantera — Data Model

> Authoritative source: `firestore.rules` and `src/lib/schema.ts` in the repo. This document is the buyer-readable summary.

All data is stored in Cloud Firestore (project `mycantera-2beb5`). Object media (player photos, club logos, registration uploads) is in Firebase Storage.

---

## Core collections

### `clubs/{clubId}`
The top-level tenant. Most data scopes under a club via `clubId`.
- Fields: `name`, `slug`, `logoUrl`, `identity` (brand colors, mascot, founded year), `subscription` (tier, status, Stripe subscription ID), `createdBy`, `createdAt`
- Public read for the `/club/[slug]` page. Write restricted to club managers.

### `users/{uid}`
Firebase Auth UID → user profile.
- Fields: `email`, `displayName`, `photoURL`, `role` (custom claim), `clubId`, `defaultTeamId`
- Split get/list rules (audited 2026-03-27) — users can only `get` their own document.

### `teams/{teamId}`
A team within a club (e.g. "U10 Boys").
- Fields: `clubId`, `name`, `ageGroup`, `coaches` (array of UIDs), `season`

### `players/{playerId}`
A player on one or more teams.
- Fields: `clubId`, `teamIds`, `name`, `dateOfBirth`, `position`, `photoUrl`, `parentEmails`, `registrationId` (link to `registrations/`)

### `matches/{matchId}`
A scheduled match.
- Fields: `clubId`, `teamId`, `opponent`, `kickoff` (Timestamp), `venue`, `lineup` (array of playerIds), `status` (scheduled | live | completed | cancelled | postponed), `rsvps` (map of UID → status)
- `/live/[matchId]` is a public page reading from here.

### `trainings/{trainingId}`
A scheduled training session.
- Fields: `clubId`, `teamId`, `start`, `end`, `attendance` (map), `aiPlanId` (link to `ai_plans/`)

### `ai_plans/{planId}` *(Pro tier only)*
Cached AI-generated training plans.
- Fields: `clubId`, `teamId`, `prompt`, `response`, `tokensUsed`, `createdAt`, `createdBy`

### `ai_reports/{reportId}` *(Pro tier only)*
Cached post-match AI reports.

### `notifications/{notificationId}`
In-app bell + modal notifications.
- Fields: `recipientUid`, `kind`, `body`, `link`, `readAt`

### `registrations/{registrationId}`
Parent registration form submissions.
- Fields: `clubId`, `formId`, `playerData`, `parentEmail`, `paymentStatus`, `stripeCheckoutSessionId`

### `payment_forms/{formId}`
The form-builder definitions used by `registrations/`.

### `sales_prospects/{prospectId}` *(internal use)*
MyCantera outreach pipeline.
- Fields: `name`, `clubName`, `email`, `phone`, `status`, `lastTouchAt`, `tags`

### `odisea_proposals/{proposalId}` *(internal use — cross-product)*
Odisea Tours proposals published at `odisea-tours.com/for/[slug]`.
- Fields: `clientName`, `tourType`, `pricing`, `passwordHash`, `slug`, `createdBy`
- **Cross-link:** Lives in the MyCantera Firestore for operational convenience. Can be carved out (see [`../../due-diligence/handover-checklist.md`](../../due-diligence/handover-checklist.md)).

### `newsletter_subscribers/{subscriberId}`
For `learn.mycantera.com`.

### `blog_posts/{postId}`
Auto-generated weekly blog content.

---

## Firestore rules summary

Audited and tightened 2026-03-27. Key principles:

- **Split `get` vs `list`** on `users` — prevents enumeration.
- **Split `create` vs `update`** on 8 high-value collections — different validation per operation.
- **Public reads only on:** `clubs`, `players` (filtered subset), `matches` (when status != draft), `blog_posts`, `odisea_proposals` (password-gated client-side).
- **Server-only writes** on: `ai_plans`, `ai_reports`, `registrations` (Stripe webhook writes), `notifications`.
- **App Check init** is in place; enforcement toggle is in Firebase Console (off as of handover).

---

## Cloud Functions / API routes

| Route | Purpose |
|---|---|
| `/api/stripe/webhook` | Stripe events → update `clubs.subscription`, create `payment_intents`, etc. |
| `/api/stripe/checkout` | Mint Checkout Sessions for tier upgrades and registrations |
| `/api/auth/signup` | Custom claim minting on signup |
| `/api/auth/magic-link` | Custom magic-link generation with mycantera.com landing |
| `/api/ai/training-plan` | Anthropic API call, caches into `ai_plans` |
| `/api/ai/post-match-report` | Anthropic API call, caches into `ai_reports` |
| `/api/ai/chat` | Streaming chat with Anthropic |
| `/api/sales/*` | Internal CRM endpoints — read-protected by manager role |
| `/api/odisea/*` | Internal Odisea proposal endpoints — same auth scope |
| `/api/newsletter/subscribe` | Adds to `newsletter_subscribers`, sends confirmation via Resend |
| `/api/cron/weekly-blog` | Vercel cron (Mondays 9am) — generates a blog post via Anthropic and publishes |

---

## Backup & recovery

- **No scheduled exports today.** Buyer should configure Firestore daily exports to a Cloud Storage bucket post-handover (~$0.18/GB/month, trivial at current scale).
- **Stripe** is the source of truth for billing — if `clubs.subscription` drifts, reconcile from Stripe.
