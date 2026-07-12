# MyCantera — Operations

## Deploy

Auto-deploy is wired:

- Push to `master` → Vercel builds and deploys to production (`mycantera.com`)
- Push to any other branch → Vercel publishes a preview URL
- No manual deploy command needed

Manual deploy fallback:
```bash
vercel --prod
```
(must be logged in to the `mycantera` Vercel team)

## Rollback

Two options:

1. **Vercel UI** — Deployments tab → previous green deploy → "Promote to Production". ~10 seconds.
2. **Git revert** — `git revert <bad-commit-sha>` then push. Vercel deploys the revert.

Always prefer Vercel UI rollback for hotfix — re-deploys the existing build artifact instantly, no rebuild.

## Firestore rules deploy

Rules are in `firestore.rules` at the repo root.

```bash
# Using firebase CLI
firebase deploy --only firestore:rules
```

Or via a custom deploy script (similar pattern to BusVivo's `scripts/deploy-rules.mjs`) if firebase CLI is unavailable.

## Storage rules deploy

```bash
firebase deploy --only storage
```

## Stripe webhook setup

After any redeploy that changes the webhook signature, re-verify:

1. Stripe Dashboard → Developers → Webhooks
2. Endpoint: `https://mycantera.com/api/stripe/webhook`
3. Signing secret → copy to Vercel env var `STRIPE_WEBHOOK_SECRET`
4. Redeploy MyCantera (env change requires deploy)

## Common runbooks

### A user's subscription is "stuck"
1. Find their `clubId` in Firestore via their email in `users/{uid}`
2. Open Stripe Customer for that email
3. Compare `clubs/{clubId}.subscription.status` against Stripe — if drifted, manually update Firestore from Stripe (Stripe is the source of truth)
4. If webhook is misfiring, check Vercel function logs for `/api/stripe/webhook`

### A coach can't access AI features
1. Verify their `clubs/{clubId}.subscription.tier` is `coach` or `club`
2. Check Anthropic API key is set in Vercel env
3. Check Anthropic dashboard for rate limits or 402s

### A registration form is taking payments but not creating players
- Almost always a Stripe webhook misfire
- Check `/api/stripe/webhook` logs
- Look for `payment_intent.succeeded` events without matching `players` writes
- Manually trigger replay from Stripe Dashboard → Webhooks → Recent deliveries

### Blog didn't publish on Monday
- Vercel → Settings → Cron Jobs → check the `/api/cron/weekly-blog` job ran
- If failed, manually run `curl -X POST https://mycantera.com/api/cron/weekly-blog` with the cron secret

### Sender domain reputation drops (Google Postmaster Tools)
- Pause any active outreach push immediately
- Resend tracking pixels are **off** (per founder's 2026-04-30 fu1 recovery plan) — verify still off
- Drop daily volume to 30/day for 7 days, then ramp to 50/day, monitor

## Founder-specific notes for buyer

- `mycantera.com/sales` is the internal CRM. Two separate features:
  1. **MyCantera prospects** (`sales_prospects` collection)
  2. **Odisea Tours proposals** (`odisea_proposals` collection)
- The Odisea proposal sub-feature is the cross-product link. See [`../../ecosystem.md`](../../ecosystem.md) and [`../../due-diligence/handover-checklist.md`](../../due-diligence/handover-checklist.md) for carve-out steps if MyCantera and Odisea sell to different buyers.
- **Tours module on club pages is intentional** — it's the funnel into Odisea Tours. Disabling it severs the Odisea acquisition channel.
- Auto-publishing weekly blog is on a Vercel cron; LinkedIn draft is supposed to be posted manually on Tuesday/Wednesday per founder's playbook.
