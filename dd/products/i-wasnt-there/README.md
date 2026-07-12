# I Wasn't There

> Ephemeral bachelor/hen-party photo & chat app. Everything auto-deletes when the trip countdown ends. Multi-currency, SEO-heavy, 65+ URLs indexed-ready.

- **Domain:** [iwasntthere.com](https://iwasntthere.com)
- **Repo:** `github.com/Gioluan/iwasntthere` (private)
- **Status:** Live since 2026-03-28. Indexed in Google. Active partner outreach to UK/EU stag operators.

---

## What you are buying

A self-contained party-app SaaS with:

- **Trip app** — photos, chat, countdown timer, auto-delete on expiry
- **Multi-currency pricing** — Party Mode £7.99 GBP / €8.99 EUR / $9.99 USD
- **Free tier** — 24h, 5 people, 15 photos
- **65+ URL SEO surface** — fully optimized for stag-do / hen-do / bachelor-party search intent
- **Partner outreach pipeline** — 9 UK/EU stag operators contacted, 50% Party Mode commission offer, custom demo pages built per partner (e.g. StagWeb)
- **Weekly blog auto-publishes** — Tuesdays 10am Madrid via scheduled trigger (`trig_01E62Xk8mPZYd3WkHfAAbpzH`)
- **Google Workspace email** — `partnerships@iwasntthere.com`, SPF/DKIM/DMARC verified
- **Fully isolated infrastructure** — own Firebase, own Stripe, own DNS, zero shared dependencies with other Ground Agents products

---

## SEO architecture (as of 2026-04-17)

| Layer | Pages |
|---|---|
| Topic hubs (priority 1.0) | `/stag-do`, `/hen-do`, `/bachelor-party` |
| Comparison pages | `/prague-vs-budapest-stag-do`, `/benidorm-vs-magaluf-stag-do`, `/ibiza-vs-magaluf-stag-do` |
| City pages | 25 (stag-do, hen-do, bachelor-party variants per city) |
| Blog | 10 posts including outreach-ammo neutral roundup `/blog/best-uk-stag-do-companies-2026` |
| Schemas | Article, FAQPage, BreadcrumbList, HowTo, ItemList, Speakable, Organization, WebSite, SoftwareApplication |
| Feed | RSS at `/feed.xml` |
| i18n | `hreflang` en-GB / en-US / en-AU / en-IE |
| UX components | Visible `<Breadcrumbs/>` + `<RelatedPosts/>` on every page |

---

## Pricing

| Tier | Price | Limits |
|---|---|---|
| Free | $0 | 24h, 5 people, 15 photos |
| Party Mode | £7.99 / €8.99 / $9.99 one-time | Trip duration, unlimited people, unlimited photos, auto-delete on expiry |

Pricing is one-time per trip, NOT subscription. Currency auto-detected from user region with manual override.

---

## Partner program

- **9 UK/EU stag operators** contacted via personalized email + custom demo page
- **50% Party Mode commission** offered to partners
- **StagWeb** outreach is the flagship: dedicated partner page + custom demo + 50% commission proposal
- All partner correspondence from `partnerships@iwasntthere.com`

---

## Cross-product links

- **None.** Fully isolated. Own Firebase project, own Stripe account, own DNS path. Zero shared infrastructure with MyCantera / Odisea / BusVivo.

---

## What to read next

- [`stack-and-infra.md`](stack-and-infra.md)
- [`operations.md`](operations.md)
