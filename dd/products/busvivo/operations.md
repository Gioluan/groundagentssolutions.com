# BusVivo — Operations

## Deploy

Auto-deploy on push to `master`. Manual:
```bash
cd ~/Desktop/busvivo
vercel --prod
```

## Rollback

Vercel UI → Deployments → previous green → "Promote to Production".

## Rules deploy

```bash
node scripts/deploy-rules.mjs
```

Uses service account credentials. Does NOT require firebase CLI. Deploys both Firestore rules and RTDB rules in one shot.

After editing `firestore.rules` or `database.rules.json`, always re-run this script. Vercel deploy does NOT automatically push rules.

## Common runbooks

### Manager signup fails
- Check `/api/auth/signup` Vercel function logs
- Verify `FIREBASE_ADMIN_*` env vars are set
- Common cause: service account key has newlines mis-escaped (check `FIREBASE_ADMIN_PRIVATE_KEY` ends with `-----END PRIVATE KEY-----\n` and `\n` is literal, not escaped to `\\n`)

### Driver pairing link doesn't work
- Confirm `/d/[companyId]/[driverId]?token=xxx` route is deployed
- Check pair token in Firestore `companies/{companyId}/pair_tokens/{tokenId}` has not expired
- Re-create pair token from manager UI

### Live map not updating
- Open browser devtools → Network → WS — confirm Firebase RTDB websocket is connecting
- Check RTDB rules allow read for current manager
- Check driver app is actually pushing — RTDB Data tab in Firebase Console should show fresh `updatedAt` timestamps

### A trip's EU 561 calculation looks wrong
- Trip-level `eu561` field is computed by a server function (or client-side as of v1)
- Inspect the underlying drive events
- Force recalc by re-saving the trip

### Demo data has drifted
- BusVivo runs in **demo mode** by default for unauthenticated users (localStorage)
- Demo data is seeded by `src/lib/store.ts` initialization
- To reset: clear localStorage in browser

### Firebase quota exceeded
- Most likely RTDB write hot path (position pushes from drivers)
- Mitigation: throttle position update interval (10s → 30s) in driver app
- Long-term: split high-write collections to a different region or scale up tier

## Testing data

Test user left in Firebase Auth post-Round-4 smoke test:
- `smoketest+TIMESTAMP@busvivo.com` — safe to delete from console if cleaning

## Founder-specific notes for buyer

- **Phase 1 is the operator OS for Spanish autocar SMEs.** Don't drift into booking / consumer-facing features until Phase 1 paid users are stable.
- **WhatsApp pairing is intentional** — Spanish autocar drivers all use WhatsApp; SMS infra is unnecessary complexity at this stage.
- **EU 561 daily-only is intentional for v1.** Weekly + biweekly rules are deferred — most SMEs care primarily about daily rules and tachograph reconciliation.
- **Transit-poster design system is the brand.** Don't paint over with generic SaaS aesthetics — the visual differentiation is part of the sales pitch to fleet operators.
- **Founding partner deals are personally negotiated.** €5/bus/mo locked-forever is the commitment to honor — not promotional.
