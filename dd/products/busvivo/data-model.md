# BusVivo — Data Model

> Authoritative source: `src/lib/schema.ts` + `firestore.rules` + `database.rules.json` in the repo. This document is the buyer-readable summary.

Data is split between Firestore (persistent state, eur3) and Realtime Database (live driver positions, europe-west1).

---

## Firestore collections

### `companies/{companyId}`
The top-level tenant. Each autocar/bus operator is a `company`.
- Fields: `name`, `nif`, `address`, `createdAt`, `ownerUid`, `subscription` (TBD)

### `users/{uid}`
Firebase Auth UID → user profile.
- Fields: `email`, `displayName`, `role` (`manager` | `driver`), `companyId`, `driverId` (if role=driver)
- Custom claims mirror these on the JWT for rules-side checks

### `companies/{companyId}/buses/{busId}`
Buses owned by a company.
- Fields: `matricula` (license plate, primary identifier shown to managers), `modelo` (dropdown: Mercedes / Volvo / Scania / etc.), `litros100km` (fuel consumption), `currentDriverId` (nullable)

### `companies/{companyId}/drivers/{driverId}`
Drivers employed by a company.
- Fields: `nombre`, `telefono`, `autocarPreferido` (preferred bus matricula), `firebaseUid` (nullable until paired), `pairTokenHash` (nullable, expires), `lastSeenAt`

### `companies/{companyId}/trips/{tripId}`
A scheduled or in-progress trip.
- Fields: `driverId`, `busId`, `startedAt`, `endedAt`, `routePolyline`, `eu561` (computed: total drive minutes, break minutes, rest hours, status flags)
- Hybrid bus assignment: defaults to `drivers.autocarPreferido`, can be overridden per trip

### `companies/{companyId}/pair_tokens/{tokenId}`
Short-lived pairing tokens for driver onboarding.
- Fields: `driverId`, `tokenHash`, `createdAt`, `expiresAt`, `consumedAt`

### `eu561_violations/{violationId}` *(future)*
Detected EU 561 rule violations for compliance reporting.

---

## Realtime Database structure

```
/positions/{companyId}/{driverId}
  lat: number
  lng: number
  heading: number
  speed: number
  updatedAt: serverTimestamp
```

Pushed by the driver mobile app every ~10s while a trip is active. Manager dashboard subscribes via `onValue()` for live map updates. TTL via scheduled cleanup function (driver positions older than 24h archived to Firestore, then deleted from RTDB).

---

## EU 561 engine (v1 — daily only)

Rules enforced in v1:

| Rule | Limit | Detection |
|---|---|---|
| Daily drive time | 9h max | Sum of `trips.eu561.driveMinutes` for current calendar day; exceeds 9h → violation |
| Continuous break | 4.5h max drive without 45min break | Sliding window over current trip's drive events |
| Daily rest | 11h consecutive rest required | Time between `trips.endedAt` of last trip and `trips.startedAt` of next |

**Deferred to v1.2:**
- Weekly rule (56h / 7 days)
- Biweekly rule (90h / 2 weeks)
- Extended daily drive (10h × 2/week)
- Reduced daily rest (9h × 3/week)

---

## Firestore rules summary

- **Manager scope:** Can read/write all collections under their `companyId` (from custom claim).
- **Driver scope:** Can read their own driver doc, their company's buses, and their assigned trips. Can write only `trips/{tripId}` records they're driving.
- **Public:** No public read access. All data is auth-scoped.
- **Service account:** Backend API routes use Admin SDK and bypass rules.

---

## RTDB rules summary

```
/positions/{companyId}/{driverId}
  .read: auth.companyId == companyId
  .write: auth.uid == driverId.firebaseUid
```

Drivers can only write their own position. Managers in the same company can read all positions in that company.

---

## Backup & recovery

- **No scheduled exports today.** Buyer should configure Firestore daily exports to a Cloud Storage bucket post-handover.
- **RTDB position data is ephemeral** — losing it loses ~24h of live position history at worst. Trip-level summaries are archived to Firestore `trips/`.
