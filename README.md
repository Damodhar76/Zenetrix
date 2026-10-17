# Zenitrix Technologies website (from "Website Master Blueprint" v1.0)

Next.js 15 (App Router) + TypeScript + Tailwind v4, fully static. Pages are generated from typed data in `data/`.

## Run
```bash
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_SITE_URL to the real domain
npm run dev                  # http://localhost:3000
npm run build && npm run check:pages
```

## What is built (Blueprint section -> file)
- 4 Stack, 5 Performance: `next.config.mjs`, `app/layout.tsx` (next/font Sora + Inter, security headers, GA4 only if ID set)
- 6 Design tokens: `app/globals.css`
- 7 Hero (car / phone / smartwatch, auto-cycle, reduced-motion aware): `components/hero/Hero.tsx`
- 9 Catalogue (6 categories, 34 products, 15 industries, 8 services): `data/catalog.ts`
- 10 Architecture + internal links: `app/**`
- 11 Areas (40 hubs; 300 service-by-area pages): `data/areas.ts`, `data/serviceAreaPages.ts`
- 12 Metadata templates: `lib/seo.ts` and each `generateMetadata`
- 13 Schema (Organization/LocalBusiness, WebSite, BreadcrumbList, FAQPage, Product, Service, CollectionPage): `lib/schema.ts`
- 14 robots / sitemap / manifest: `app/robots.ts`, `app/sitemap.ts`, `app/manifest.ts`
- 15 FAQ bank: `data/faqs.ts`; 16 Lead form + WhatsApp + sticky mobile bar: `components/forms`, `components/layout/StickyBar.tsx`

## Important rules baked in
- Nothing invented: every unknown fact is marked **[CLIENT TO CONFIRM]** (search the repo for it).
- No certifications, prices, ratings or specs are shown.
- Anti-doorway: service-by-area pages are `noindex` and left out of the sitemap until `localFacts[area].project` in `data/serviceAreaPages.ts` has a real project. Fill it in and the page becomes indexable automatically.

## Still pending (Blueprint section 20)
Competitor live audit, keyword volumes, logo vectorising + real favicon/OG images, hero video, real copy for 34 products / industries / services / areas, 40 blog posts (`content/blog`), comparison pages, cookie consent, privacy + terms pages, Turnstile + email/Sheet lead routing, QA (Lighthouse, schema validation), deploy + Search Console.
Add domain, coordinates (`lib/site.ts`), sameAs links, and logo files are in `public/images/` (`zenitrix-logo.png`, `zenitrix-logo-white.png`).

## Update (Oct 2026): UI refresh
- New navbar: Home, About, Products (mega menu), Services (dropdown), Contact + mobile drawer.
- New home page per Blueprint 7.3: hero, trust bar, category cards, how it works, smart control, repair/AMC, industries, areas, FAQ, quote form.
- Hero banners and images on all inner pages. Images are illustrative SVGs in `public/images/`; replace with real project photos (Blueprint 6.4).
- Run: `npm install && npm run dev`

## Fix (Oct 2026)
- Fixed build error: `await params` used inside a non-async callback in `app/services/[slug]/page.tsx` and `app/industries/[slug]/page.tsx`. `tsc --noEmit` is now clean.

## Update (Oct 2026): everything that could be built without client inputs
- **Real explanatory copy** (no specs/prices/certs invented) for 6 categories, 36 products, 15 industries, 8 services: `data/content.ts`. Area hubs get locality-type guidance.
- **Guides**: 11 launch posts in `data/blog.ts` (`/blog/`, Article schema). **Compare**: 5 pages in `data/compare.ts` (`/compare/`). **Projects**: `data/projects.ts` (empty until client gives real projects; `/projects/` stays noindex meanwhile).
- **Selector tool** `/which-automation/` ("Which automation do I need?").
- **Legal**: `/privacy-policy/`, `/terms/` (DPDP-aligned drafts, have a lawyer review), `/thank-you/` (noindex, GA4 `generate_lead`).
- **Cookie consent**: GA4 loads only after Accept (`components/layout/CookieConsent.tsx`).
- **Lead pipeline**: `app/api/lead/route.ts` (honeypot, rate-limit, Turnstile, Resend email, Sheet/CRM webhook). Falls back to WhatsApp if nothing is configured. See `.env.example`.
- **SEO/security**: dynamic OG image and apple icon (`app/opengraph-image.tsx`, `app/apple-icon.tsx`), CSP + X-Frame-Options in production, sitemap/robots/footer updated.
- **QA scripts** (run after `npm run build`): `npm run check:all` = page count, broken links, SEO + schema validation (one H1, title, description, canonical, no invented ratings/offers), anti-doorway similarity gate. `npm run typecheck`.
- Fixed `scripts/count-pages.mjs` (Next emits `name.html`, not `index.html`).

See `PROGRESS.md` for the updated Blueprint section 20 tracker.

## Update (Oct 2026, build 4): media + tools
- Images: `public/images/*.webp` (80 files). Videos: `public/videos/*.mp4|webm|-poster.webp` (6 clips, 1280x720, silent, encoded with ffmpeg from the V2 footage). Images are illustrative.
- New: `/videos/`, `/gallery/`, `/search/`, `/cost-estimator/`, coverage map, video + image sitemaps, VideoObject/ImageObject schema, Lighthouse CI, Playwright smoke tests, IndexNow script, GitHub CI.
- Checks: `npm run typecheck && npm run check:media`, then after `npm run build`: `npm run check:all`. E2E: `npm start` then `npm run test:e2e`.
- Replacing media: drop real photos in `public/images/` using the same file names (or edit `data/media.ts`, `lib/images.ts`).


## Update (Oct 2026, build 5)
See `PROGRESS.md` ("build 5") for the full list. Quick commands:
```bash
npm install
npm run check:data     # data integrity, no build needed
npm run typecheck && npm run build
npm run check:all      # media, pages, links, SEO/schema, similarity + 450-word gate, JS budget
npm start & npm run test:e2e
```
Where the client adds real facts (nothing is shown until they exist): `data/specs.ts`, `data/certificates.ts`, `data/testimonials.ts`, `data/amc.ts`, `data/projects.ts`, `data/serviceAreaPages.ts` (`localFacts`), `data/redirects.json`, `lib/site.ts` (coordinates, sameAs, hours). New env keys are in `.env.example`.
