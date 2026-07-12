# Closing-Day Handover Checklist

Step-by-step flip for transferring ownership of one product or the full bundle. Designed to be executable by the buyer's technical lead with founder support on a shared call.

> **Pre-closing rule:** Do nothing destructive. Add the buyer as Owner everywhere first. Only remove the founder after the buyer confirms each system is working under their own credentials.

---

## T-14 days: Pre-closing prep

- [ ] Buyer creates dedicated GitHub organization (e.g. `buyer-co`)
- [ ] Buyer creates dedicated Vercel team
- [ ] Buyer creates buyer-side Google account for Firebase Owner role
- [ ] Buyer creates new Stripe account(s) — one per product that has billing (MyCantera, I Wasn't There)
- [ ] Buyer provisions buyer-side email (e.g. `ops@buyer-co.com`) for recovery / 2FA
- [ ] Founder exports a fresh data snapshot from each Firebase project (Firestore + RTDB + Storage manifests)
- [ ] Both parties sign data-handling NDA and DPA

---

## T-7 days: Code transfer

- [ ] For each product repo, founder issues GitHub repo transfer to buyer org:
  - `Gioluan/mycantera` → `buyer-co/mycantera`
  - `Gioluan/odisea-tours-web` → `buyer-co/odisea-tours-web`
  - `Gioluan/OdiseaTours` (Odisea CRM) → `buyer-co/odisea-crm`
  - `Gioluan/busvivo` → `buyer-co/busvivo`
  - `Gioluan/iwasntthere` → `buyer-co/iwasntthere`
  - `Gioluan/groundagentssolutions.com` → `buyer-co/groundagentssolutions.com`
- [ ] Buyer accepts each transfer; Vercel re-binds to the new repo paths automatically
- [ ] Buyer pushes a no-op commit to confirm CI / deploy pipelines still work

---

## T-3 days: Infra transfer (additive)

- [ ] **Vercel:** Buyer is added as Owner on `mycantera` team. Each project is then re-imported under the buyer's own Vercel team, env vars duplicated.
- [ ] **Firebase (per project):** Founder adds buyer's Google account as `Owner` in Google Cloud Console → IAM. Buyer verifies they can log in to Firebase Console and see all data.
  - `mycantera-2beb5`
  - `busvivo-1b259`
  - Odisea CRM Firebase project
  - I Wasn't There Firebase project
- [ ] **Anthropic API:** New API key on buyer's Anthropic account; founder leaves old key live for cutover.
- [ ] **Resend:** Buyer creates own account; founder verifies sender from new account; rotate API keys in Vercel env.
- [ ] **Google Workspace tenants:** Buyer is added as Admin on both `mycantera.com` and `iwasntthere.com` tenants.

---

## T-0: Closing day

Run in this order. Each step is a separate atomic flip; abort if any fails.

### 1. DNS (last, since everything else needs to work first)
- [ ] **mycantera.com:** Transfer registrar to buyer; nameservers stay pointed at Vercel.
- [ ] **odisea-tours.com:** Transfer registrar to buyer; nameservers stay pointed at Cloudflare. Hostalia MX untouched (legacy ghost zone).
- [ ] **busvivo.com:** Transfer registrar to buyer; nameservers stay pointed at Vercel.
- [ ] **iwasntthere.com:** Transfer registrar to buyer; Cloudflare email routing reconfigured to buyer's mail.
- [ ] **groundagentssolutions.com:** Transfer registrar to buyer.

### 2. Stripe
- [ ] **MyCantera:** Buyer's new Stripe account replaces founder's. All 16 price IDs re-created (Free / Coach $29 / Club $99 × monthly/annual × add-ons). Vercel env vars `STRIPE_SECRET_KEY` and `STRIPE_PUBLISHABLE_KEY` swapped. Webhook endpoint re-pointed.
- [ ] **I Wasn't There:** Same flip for Party Mode pricing.
- [ ] Founder's old Stripe accounts stay open for ~30 days to handle refund obligations on pre-closing transactions, then closed.

### 3. MyCantera ↔ Odisea cross-link decision
The unified `/sales` CRM on `mycantera.com/sales` writes `odisea_proposals` into the MyCantera Firestore. Two options on closing:

**Option A — Keep the cross-link** (recommended if buyer takes the full bundle)
- No action. Both products continue to share the CRM. Audit `odisea_proposals` for sensitive data.

**Option B — Cut the cross-link** (required if MyCantera and Odisea sell to different buyers)
- [ ] Export `odisea_proposals` collection from `mycantera-2beb5` to JSON
- [ ] Import into Odisea's standalone Firebase project
- [ ] Re-deploy Odisea proposal pages pointed at Odisea Firebase (env var `NEXT_PUBLIC_FIREBASE_PROJECT_ID`)
- [ ] Disable `odisea_proposals` write path in MyCantera `/sales` UI
- [ ] Smoke-test 3–5 published proposal URLs

### 4. Final verification (smoke test on the buyer's side)
- [ ] MyCantera: login as a coach, create a match, generate an AI report
- [ ] Odisea Tours: load the homepage, follow a CTA into the proposal builder, send a test proposal email
- [ ] BusVivo: login as a manager, add a bus, send a WhatsApp pairing link to a test driver
- [ ] I Wasn't There: create a trip, upload a photo, confirm Party Mode purchase succeeds via Stripe test mode
- [ ] All four `/health` endpoints (or root pages) return 200

### 5. Founder removal
After buyer has run the bundle for ≥ 24h without incident:
- [ ] Founder is removed as Owner from all Firebase projects
- [ ] Founder is removed as Owner from `mycantera` Vercel team (or the team is deleted if all projects re-imported buyer-side)
- [ ] Founder is removed from both Google Workspace admin consoles
- [ ] Founder loses GitHub org access (transfer happened at T-7, but verify)
- [ ] Founder's Anthropic API key is revoked
- [ ] Founder's Resend account keys are revoked

---

## Post-closing (30 days)

- [ ] Founder remains available on a paid advisory retainer for incident response (recommended: $X / month for 90 days, on-call by email within 24h)
- [ ] Buyer rotates all webhook secrets, Stripe restricted keys, Firebase service-account keys
- [ ] Buyer audits Firestore rules for any remaining founder-only allow-listed UIDs
- [ ] Buyer reviews `mycantera.com/sales` CRM for any seller-side PII that should be redacted

---

## Acceptance criteria

The handover is considered complete when:
1. Buyer can independently deploy a new version of all four products via `git push`
2. All four production domains resolve to buyer-controlled Vercel projects
3. All four Firebase projects list the buyer (and only the buyer) as Owner
4. All Stripe webhooks fire into buyer-controlled endpoints
5. Buyer has tested an end-to-end purchase on MyCantera + I Wasn't There against their own Stripe account
