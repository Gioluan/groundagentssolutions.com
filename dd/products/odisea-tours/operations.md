# Odisea Tours — Operations

## Deploy main site

Auto-deploy on push to `master`. Manual:
```bash
cd ~/Desktop/odisea-tours-web
vercel --prod
```

## Deploy CRM

Two options depending on how the CRM is run:

**Local (current default):**
- Double-click desktop shortcut `Odisea Tours CRM.lnk`
- Opens local HTML; reads/writes to Firebase

**Hosted:**
```bash
cd ~/Desktop/odisea-sales
vercel --prod
```

## Rollback (main site)

Vercel UI → Deployments → previous green → "Promote to Production".

## Content workflow

### Publishing a new journal post
1. Add Markdown file under `content/journal/`
2. Add to sitemap entries (auto-generated, but verify)
3. Push to `master` — Vercel rebuilds
4. RSS feed at `/rss.xml` updates automatically

### Adding a tour
1. Add tour data file under `content/tours/`
2. Create images under `public/tours/[slug]/`
3. Push — page generates at `/tours/[slug]`

### Publishing a proposal
1. Open Odisea CRM
2. Use proposal builder to render HTML deck
3. (Optional) Generate PDF via Playwright script
4. Use `mycantera.com/sales` to create a published proposal record → writes to `odisea_proposals/{slug}` in MyCantera Firestore
5. Share URL `odisea-tours.com/for/[slug]` with password

## Lead pipeline runbook

### Run a fresh scrape
```bash
cd ~/Desktop/odisea-school-leads   # or odisea-agency-leads, etc.
python scrape.py                   # or specific script per folder
```
Output lands in `output/` as JSON + CSV.

### Send first-touch outreach
1. Review drafts in `output/email_drafts.md`
2. Send manually from `juan@odisea-tours.com` (NOT bulk — small batches)
3. Log touches in CRM

## DNS gotcha

**odisea-tours.com DNS is on Cloudflare; MX is on Hostalia.** Hostalia's DNS panel for the domain is a ghost zone and editing it does nothing. If you need to change DNS, use Cloudflare. If you need to change MX, you need to change MX records in **Cloudflare** (where DNS is authoritative) pointing at Hostalia or a new mail provider.

## Common runbooks

### A proposal page (`/for/[slug]`) is 404
- Confirm record exists in MyCantera Firestore `odisea_proposals/{slug}`
- Confirm `slug` matches case-sensitively
- Confirm Odisea Tours web app's Firebase config is reading from `mycantera-2beb5`

### Email from `juan@odisea-tours.com` going to spam
- Verify SPF / DKIM / DMARC records on Cloudflare DNS — all should pass
- Resend dashboard → verify sender domain still verified
- Check Resend dashboard for bounces / complaints

### A new tour pricing change
- Update in `content/tours/[slug].md` (or wherever pricing lives)
- Update `odiseatours-packages-pricing.md` reference

### Cross-product carve-out
If MyCantera is sold but Odisea is kept (or vice versa):
1. Export `odisea_proposals` collection from MyCantera Firestore
2. Import into Odisea's standalone Firebase project
3. Update Odisea Tours web env vars to point at Odisea's Firebase
4. Smoke-test all live `/for/[slug]` URLs

## Founder-specific notes for buyer

- **Don't claim "official partner" for FCB / VCF / RFEF.** Odisea works closely with them (15+ years) but is NOT an official partner. Avoid the word "official" in this context entirely.
- **Don't promise top La Liga academy fixtures for men's tours.** Top academies don't normally play men's tours; only women's exceptionally. For men's, use "Spanish academy or amateur sides."
- **Use "soccer" for US audiences, "football" for UK/Europe.** Default to "soccer" in all US-facing copy.
- **No em-dashes in any copy.** Founder considers `—` an AI tell — banned from deliverables.
- **No fabricated testimonial quotes or contact info.** All testimonials must be real and verified with the person. All emails must come from a primary source — never generate from a naming pattern.
