# Zera Dental — zeradental.in

Lead-generation website for **Zera Dental**, the dental-clinic web studio of
[Zera Technologies](https://zeratech.io/).

Built to rank organically for dental website design searches in India and convert clinic owners into
WhatsApp conversations.

## Stack

- **Next.js 15** (App Router) — 53 statically generated pages
- **Tailwind CSS 3** — no UI library, no page builder
- **Google Apps Script + Sheets** — lead capture backend (free, no third party)
- **Vercel** — hosting; **Hostinger** — domain/DNS

## What's in it

| Section | Pages | Purpose |
|---|---|---|
| Core | Home, Pricing, Services, Portfolio, About, Contact, FAQ | Conversion |
| Lead magnet | `/free-website-audit` | 9-question interactive scorecard → Sheets → WhatsApp |
| Service pages | 5 | `/services/[slug]` — commercial keyword targets |
| City pages | 20 | `/dental-website-design/[city]` — local search capture |
| Guides | 11 | `/blog/[slug]` — top-of-funnel keyword content |
| Legal | Privacy, Terms | Compliance + Zera Technologies ownership disclosure |

## SEO built in

- Per-page titles, descriptions and canonicals
- JSON-LD: `ProfessionalService`, `WebSite`, `Service`, `FAQPage`, `Article`, `BreadcrumbList`, `ItemList`, `OfferCatalog`
- `app/sitemap.ts` → 48 URLs, auto-generated from data files
- `app/robots.ts` with host + sitemap directives
- All pages statically pre-rendered (fast Core Web Vitals by default)

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Configuration

Everything you would normally want to change lives in `lib/`:

| File | Contains |
|---|---|
| `lib/site.ts` | Domain, email, WhatsApp number, all pre-filled WA messages, lead endpoint |
| `lib/pricing.ts` | The three packages, care plan, add-ons |
| `lib/cities.ts` | The 20 city pages — add an entry, get a new page + sitemap entry automatically |
| `lib/services.ts` | The 5 service pages |
| `lib/posts-a/b/c.ts` | Blog articles |

### Environment variables

| Name | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_LEAD_ENDPOINT` | Yes | Google Apps Script `/exec` URL — see `google-apps-script/SETUP.md` |

## Adding a new city page

Add an object to `CITIES` in `lib/cities.ts`. The route, metadata, schema, sitemap entry, footer
links and internal linking all generate from it.

## Deployment

1. Push to GitHub
2. Import the repo in Vercel (framework auto-detected as Next.js)
3. Add `NEXT_PUBLIC_LEAD_ENDPOINT` in Vercel → Settings → Environment Variables
4. Add `zeradental.in` and `www.zeradental.in` as domains in Vercel
5. In Hostinger → DNS, point:
   - `A` record `@` → `76.76.21.21`
   - `CNAME` record `www` → `cname.vercel-dns.com`
6. After launch: verify the domain in Google Search Console and submit
   `https://zeradental.in/sitemap.xml`

---

© Zera Dental, a property of [Zera Technologies](https://zeratech.io/).
Designed and developed by Zera Technologies.
