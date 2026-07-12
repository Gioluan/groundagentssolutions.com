# I Wasn't There — Operations

## Deploy

Auto-deploy on push to `master`. Manual:
```bash
cd ~/Desktop/iwasntthere
vercel --prod
```

## Rollback

Vercel UI → Deployments → previous green → "Promote to Production".

## Firestore rules deploy

```bash
firebase deploy --only firestore:rules
```

## Storage rules deploy

```bash
firebase deploy --only storage
```

## Stripe webhook setup

After any redeploy that changes the webhook signature:
1. Stripe Dashboard → Developers → Webhooks
2. Endpoint: `https://iwasntthere.com/api/stripe/webhook`
3. Signing secret → copy to Vercel env `STRIPE_WEBHOOK_SECRET`
4. Redeploy

## Common runbooks

### A trip didn't auto-delete on expiry
- Check the auto-delete cron job logs (Vercel or Firebase Functions)
- Manually delete from Firestore:
  - Trip doc in `trips/{tripId}`
  - All photos in Storage under `trips/{tripId}/`
  - All chat messages in `trips/{tripId}/messages/`

### A user paid for Party Mode but the trip stayed on Free tier
- Stripe webhook misfire — check `/api/stripe/webhook` logs
- Manually upgrade: set `trips/{tripId}.tier = "party"` and `expiresAt` according to Party Mode duration
- Replay webhook from Stripe Dashboard → Webhooks → Recent deliveries

### A photo upload fails
- Firebase Storage rules check — see `storage.rules`
- Storage quota (free tier 5GB) — check Firebase console

### partnerships@ email doesn't deliver
- Cloudflare email routing dashboard → verify routing rule is active
- Check Send As / Send From configuration on Juan's Gmail account
- SPF / DKIM / DMARC — verify all pass on iwasntthere.com

### A new SEO landing page should be added
1. Add page route under the appropriate hub (`/stag-do/[city]`, `/hen-do/[city]`, etc.)
2. Add JSON-LD schemas (Article, FAQPage, BreadcrumbList minimum)
3. Add to sitemap
4. Add hreflang alternates for en-GB / en-US / en-AU / en-IE if relevant
5. Push to master → Vercel rebuilds
6. Submit URL in Google Search Console

### Weekly blog didn't publish on Tuesday
- Trigger ID: `trig_01E62Xk8mPZYd3WkHfAAbpzH`
- Check Vercel cron / Firebase scheduled function logs at 10:00 Madrid Tuesday
- Manually fire the publish endpoint if needed

## Founder-specific notes for buyer

- **Ephemeral by design.** Auto-delete is the product. Don't add archival features — it breaks the value proposition (and probably the partner pitch).
- **Multi-currency is intentional.** Stag operators sell to UK and EU; pricing locally feels right. Don't collapse to USD-only.
- **Email goes to Juan's Gmail via Cloudflare routing.** Swap on closing day — see [`../../due-diligence/handover-checklist.md`](../../due-diligence/handover-checklist.md).
- **Partner outreach is in flight.** Pause any pending sends until buyer takes over the `partnerships@` mailbox.
- **No analytics provider beyond Google Search Console.** Buyer may want to add Plausible / PostHog post-handover.
