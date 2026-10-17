# Pending Work Tracker (Blueprint Section 20), updated Oct 2026

| # | Task | Status |
|---|------|--------|
| 1 | Master blueprint | DONE |
| 2 | Resolve 2 Google share links; finalise competitor list | PENDING (needs links opened by a human or live tools) |
| 3 | Live competitor audit | PENDING (needs Screaming Frog / PageSpeed API / Ahrefs) |
| 4 | Keyword volume validation | PENDING (needs Keyword Planner / Ahrefs) |
| 5 | Collect client inputs (Blueprint 21) | PENDING (see checklist below) |
| 6 | Vectorise logo, favicon set, manifest, OG templates | PARTIAL: icon.svg, dynamic OG image, apple icon, manifest done. Needs real logo PNG/SVG and favicon.ico |
| 7 | Design mockups | PENDING (UI already built in code; designer review optional) |
| 8 | Hero assets (car video, phone/watch SVG) | DONE (illustrative): hero video `public/videos/hero-car-gate.*` + poster + interactive SVG phone/watch. Swap in a filmed video later |
| 9 | Next.js scaffold | DONE |
| 10 | Typed data files | DONE (+ content, blog, compare, projects) |
| 11 | SEO engine | DONE (metadata, JSON-LD incl. Article, robots, sitemap, breadcrumbs, OG image) |
| 12 | Product page content | DONE for general copy (36 products). Datasheet specs, certificates: CLIENT |
| 13 | Industry, service, area hub content | DONE for general copy. Local facts per area: CLIENT |
| 14 | Service-by-area content (300 pages) | TEMPLATE DONE (blueprint 12.4 structure, local FAQs, map, staged release batches 1-3). BLOCKED on client data: needs a real project + local facts per area in `data/serviceAreaPages.ts` (`localFacts`). Pages stay noindex until then; CI fails an indexable page under 450 words |
| 15 | Blog (40 posts) + comparison pages | DONE: 40 guides (`data/blog.ts`, `blog2.ts`, `blog3.ts`) with crawlable pagination, 8 comparisons, glossary, cost-factors tool, selector. Client should review guides for accuracy |
| 16 | Forms, WhatsApp, GA4 events, consent banner | DONE (set env keys to activate email/Sheet/Turnstile/GA4) |
| 17 | QA scripts | DONE: `npm run check:all`, `check:media`, Lighthouse CI (`lighthouserc.json`), Playwright smoke tests (`tests/`), GitHub CI workflow. Run Lighthouse/axe on the deployed site |
| 18 | Deploy, DNS, Search Console, Bing, IndexNow, GBP, citations | PENDING |
| 19 | Week-1 crawl monitoring | PENDING |
| 20 | Reviews, link building, reporting | PENDING |

## Client checklist (search the repo for `[CLIENT TO CONFIRM]`)
1. Domain, then set `NEXT_PUBLIC_SITE_URL`. 2. Coordinates and social links in `lib/site.ts`. 3. Logo: done (`public/images/zenitrix-logo.png`).
4. CE / GeM / TUV certificate numbers and PDFs. 5. Product datasheets. 6. Real projects (`data/projects.ts`) with photos and locality.
7. Confirm: fence boom barrier, arm-out boom barrier, folding door automation, smartwatch/app support. 8. AMC plans, warranty, response times.
9. Legal review of Privacy Policy and Terms. 10. Resend / webhook / Turnstile / GA4 keys.


## Update (Oct 2026, build 4): media, search and tools
- **Images**: 80 WebP scenes in `public/images/` (one per product x36, category x6, industry x15, gallery x8, hero + poster). Mapped in `lib/images.ts`.
- **Videos**: 6 short silent clips (MP4 + WebM + poster) in `public/videos/` from the V2 footage (hero-car-gate, boom-barrier, lobby-speed-gate, automatic-glass-door, sectional-door, rolling-shutter). Players lazy-load and always have a pause button.
- **ALL media is illustrative artwork** made by `tools/media/gen_media.py` (no network needed, `npm run media` to regenerate). Replace with real project photos/videos when supplied (Blueprint 6.4). Do not present them as real installations.
- **New pages**: `/videos/`, `/gallery/` (lightbox), `/search/` (+ `/search-index.json`), `/cost-estimator/` (explains price factors, never shows prices). Hyderabad hub and home page have a schematic coverage map (`components/maps/HydMap.tsx`, approximate positions).
- **SEO**: VideoObject + ImageObject schema, WebSite SearchAction, `video-sitemap.xml`, `image-sitemap.xml`, robots lists all sitemaps, 404 page has search.
- **Product pages** now have a video, a 3-image gallery lightbox and unique hero image each.
- **Ops**: `scripts/indexnow.mjs` (submit URLs to Bing/Yandex after deploy).

## Still needs the CLIENT or live tools (cannot be built offline)
Real project photos and videos, certificates (CE/GeM/TUV), datasheets, domain, coordinates, reviews, 15 more blog posts, service-by-area local facts (+ a real project per area), competitor audit, keyword volumes, deploy/Search Console/GBP.


## Update (Oct 2026, build 5): every blueprint feature that can be built offline
- **Lead capture (Sec 16)**: optional site-photo upload (shrunk in the browser, emailed as an attachment and sent to the webhook), optional email with an optional automatic customer confirmation (`LEAD_CONFIRM_CUSTOMER=1`), WhatsApp text now names the page, `call_click` and `whatsapp_click` GA4 events (`components/layout/Tracking.tsx`).
- **Selector (Sec 8.3)**: now six questions: site, need, space, opening width, traffic, budget range. Passes a summary into the quote form. Still no prices.
- **Product pages (Sec 12.3)**: types and options table, datasheet-driven specification table + PDF download + Product `additionalProperty` (`data/specs.ts`, empty until the client supplies datasheets), product-family FAQs (`data/categoryFaqs.ts`), industries and guides links, 10 areas (industrial first for shutters, doors, docks).
- **Industry pages**: product list, guides, FAQs, areas, schema. **Area hubs**: schema, typical sites, popular solutions, FAQs, highlighted map. **Service-by-area**: full 12.4 layout, local data sheet fields (`landmarks`, `roads`, `travelTime`, `buildingTypes`, `faqs`), release batches (`NEXT_PUBLIC_RELEASE_BATCH`).
- **Trust data (client fills, nothing invented)**: `data/certificates.ts` (certificates page + ItemList schema + home badges + trust facts), `data/testimonials.ts` (home section, no Review schema), `data/amc.ts` (AMC plan table + service commitments), `data/projects.ts` (now with CreativeWork schema and project map).
- **Content**: guides 25 to 40, blog pagination (`/blog/page/2/`...), editorial team page (`/authors/zenitrix-team/`, BlogPosting author link, image in schema), glossary (`/glossary/`, DefinedTermSet), 3 more comparisons.
- **SEO/tech**: WebPage schema on every page, ContactPoint and optional opening hours in LocalBusiness, accurate sitemap lastmod, per-route Open Graph images (product, family, area, guide, industry, service), host redirect + `data/redirects.json` legacy 301s, Clarity (after consent), skip link, CSP for Clarity.
- **QA**: `npm run check:data` (works before a build: 40 guides, unique slugs, every internal link resolves), `npm run check:budget` (JS budget 150 KB / 220 KB home), 450-word gate for indexable service-by-area pages, more Playwright tests.
- **Not verified here**: this environment has no network, so `npm install`, `next build` and Playwright were NOT run. Type-checking against stubbed framework types passed and `check:data` passes. Run `npm install && npm run typecheck && npm run build && npm run check:all` first.

## Still needs the CLIENT or live tools (updated)
Real project photos/videos, certificates (CE/GeM/TUV) and datasheets, domain, coordinates and social links, opening hours, reviews, AMC plans and response commitments, locality data sheets with one real project per area (unlocks the 300 pages), competitor audit, keyword volumes, deploy / Search Console / Bing / GBP / citations, week-1 monitoring, link building.

## Update (Oct 2026, build 6): videos, premium backgrounds, social, SEO depth
- **Videos (from V4 footage)**: `hero-gate-car` now plays in the home hero (`components/media/HeroVideo.tsx`, muted loop, poster, pause on reduced-motion/Save-Data). `gate-approach` plays in the Certifications hero (`Page` accepts `hero.video`). `lobby-speed-gate` replaces the still image in "Glass speed gates and automatic entrances". `dock-truck` and `forklift-door` are mapped to dock equipment and high-speed door product pages. All are in `data/media.ts` (so `/videos/` and the video sitemap pick them up).
- **Backgrounds**: flat white replaced by a premium light gradient (`.sec-premium`, body gradient, richer `.sec-surface`) in `app/globals.css`.
- **Social**: Facebook, Instagram, LinkedIn, Pinterest, YouTube, X and Threads (links updated Oct 2026) plus Justdial; all in `sameAs` schema. Logo and favicon replaced with the fox mark brand (Oct 2026).
- **SEO**: blog template (H1/H2/H3/H4, contents list, key takeaways, checklist, FAQ + FAQPage, BlogPosting with wordCount/keywords, article OG tags); service pages (`data/serviceSeo.ts`: meta, long intro, H2/H3 cards, 5 FAQs each, HowTo + Service schema); area hubs (`data/areaSeo.ts`: local intro, landmarks, roads, typical sites, steps, FAQs, HowTo, unique meta). FAQ questions are now H3.
- Run `npm install && npm run typecheck && npm run build && npm run check:all` first (not run here: no network).

## V5 update
- Blog cards: every one of the 46 guides now has its own distinct image (`lib/blogImages.ts`, existing files only, 640px twins kept, so no speed change). Fallback to topic image if a new guide is added without a mapping.
- Mobile UI: 15px base font, 46px tap targets, safe-area sticky bar, 3-line card summaries, no hover-lift on touch, horizontal-overflow guard, 16px inputs (no iOS zoom), tables scroll sideways. CSS only: no new JS or requests.


## V6 update (Oct 2026): RFID range, richer content, keywords
- **RFID products**: `UHF RFID Handheld Reader` replaced by **UHF RFID Controller** (`/products/rfid-access-control/uhf-rfid-controller/`, controller + software image). Old handheld URL 301-redirects to it (`data/redirects.json`). The **Long Range UHF RFID Stickers and Tags** page now uses the supplied sticker/tag photo. Images: `public/images/p-uhf-rfid-controller*.webp`, `p-long-range-uhf-rfid-stickers-and-tags*.webp`.
- **Rich product content** (`data/richProducts.ts`, rendered on the product page): headline, key features, step-by-step flow, where used, works with, installation tips, 6-8 product FAQs each and extra keywords, for the controller, stickers/tags and both readers. RFID family copy and FAQs rewritten (controller, software, tinted glass, lost tags, visitors, power cut).
- **Meta keywords**: `lib/keywords.ts` builds up to 45 keywords per product (intent + localities); category pages and the site-wide list expanded.
- **To verify with the client**: controller software functions are written as typical capabilities of a UHF RFID parking system. Confirm against the real software and add the datasheet in `data/specs.ts` (key `rfid-access-control/uhf-rfid-controller`).
- Sticker photo carries Autozon branding; the controller image is a software screenshot. Swap the files (same names) if you want Zenitrix-branded versions.
- Not run here (no network): `npm install`, `next build`. `check:data` and `check:media` pass.

## V12 update (Oct 2026): client feedback round
- **Images**: PVC and Polycarbonate sectional door images were the same file. Now distinct: Full-Vision = clear glass, Polycarbonate = frosted opal panels, PVC = white PVC panels with one clear vision strip. Garage Sectional (and Insulated Garage) door recoloured to graphite so it no longer looks like Wooden-Finish. These are edited versions of existing renders: replace with real or newly generated photos (same file names) when available (prompts in IMAGE-PROMPTS.md).
- **New product**: Cantilever Trackless Gate Automation (`/products/gate-automation/cantilever-trackless-gate-automation/`). Placeholder image is a crop of the daytime gate scene.
- **Areas**: client's 18 priority localities are shown first in every "Available across Hyderabad" list (`PRIORITY` in `data/areas.ts`); 18 new localities added (Neopolis, Osman Nagar, Kollur, Velimela, Manchirevula, Nallagandla, Bandlaguda Jagir, Neknampur, Shankarpalli, Ameenpur, Suchitra, Yapral, Kapra, ECIL, Srinagar Colony, Maheshwaram, Tukkuguda, Adibatla). Hyderabad hub has a Priority section.
- **Telangana + Andhra Pradesh**: all 33 Telangana and 26 AP districts from the client workbook (`data/regions.ts`), new `/andhra-pradesh/` hub and district pages, sitemap, footer, schema areaServed. Old Telangana slugs 301-redirect.
- **10 years of experience** (`SITE.years`, `trustFacts.yearsInBusiness`): hero, home trust bar, about, projects, quote box, district pages, schema description.
- **Projects**: page rebuilt (no placeholder text, no invented projects), in the main menu. Add real ones in `data/projects.ts`.
- Verified: `tsc`, `next build`, `check:data`.

## V14 update (Oct 2026): shutter video, text bug, crawl/SEO fixes
- **Video**: `rolling-shutter` replaced with the new automatic rolling shutter at a bakery/cafe shopfront (10 s, mp4 ~0.9 MB + webm + poster). Title/description updated in `data/media.ts` (feeds VideoObject schema and video sitemap). Shown on every Rolling Shutters product page and the category. mp4 is now listed first in `VideoPlayer` (smaller, plays everywhere).
- **Text bug**: product, category, industry and service-by-area pages lowercased whole names, so "GI Rolling Shutter" became "gi rolling shutter". New `lib/text.ts` `lc()` keeps acronyms (GI, PVC, UHF, RFID, AMC) in capitals.
- **CSP fix (production)**: Google Fonts stylesheet and font files were blocked by `style-src` / `font-src`; both now allow fonts.googleapis.com and fonts.gstatic.com; `media-src` added.
- **Crawl**: `/thank-you/` and `/search/` no longer disallowed in robots.txt (they are `noindex`, and Google can only see noindex on crawlable pages). `/search?` and `/api/` stay blocked.
- **Mobile**: explicit `viewport` export (device-width, viewport-fit cover, theme colour).
- **Deploy guard**: production build prints a warning if `NEXT_PUBLIC_SITE_URL` is unset or example.com. MUST be set to the real https domain, or canonicals, sitemap and schema point to example.com and Google will not index correctly.
- Verified here: `check:media`, `check:data`. NOT run (no network): `npm install`, `tsc`, `next build`, Playwright. Run `npm install && npm run typecheck && npm run build && npm run check:all` before deploy.

## V15 (mobile performance pass)
- Google Fonts stylesheet no longer blocks first paint (injected by a tiny head script, `<noscript>` fallback kept); metric-matched Arial fallbacks ("Inter Fallback", "Sora Fallback") keep CLS at 0 while the fonts swap in.
- GA4 / Clarity (when IDs are set) now load on first interaction or 8 s after load, never during page load (lower TBT).
- Removed the blur filter from the video play button.
- `lighthouserc.json` now tests MOBILE (default emulation, performance >= 0.95); `lighthouserc.desktop.json` keeps the desktop run. Run: `npm run build && npx next export` is not needed; use `npx @lhci/cli autorun --config=lighthouserc.json`.

## V17 update (Oct 2026): ZDR catalogue cross-check
- **High-Speed Doors**: the single "High-Speed Doors" product is now the 7 types from the Autozon (ZDR) catalogue: Conveyor, Standard, Clean Room, Self Repairable, Freezer, Fast Pack, Spiral. Each has its own page, image (`public/images/p-<slug>.webp` + `-640`), copy (`data/content.ts`) and specification table with catalogue model code (`data/specs.ts`). Old URL `/products/high-speed-doors-dock/high-speed-doors/` 301-redirects to the Standard High Speed Door page; internal links now point to the category page.
- **Images**: Wind-Resistance Rolling Shutter (catalogue p.28) and Inflatable Dock Shelters (client-supplied photo) replaced. Catalogue images carry small Autozon marks; swap same-name files for Zenitrix-branded ones when available.
- **Specs added from the catalogue**: wind-resistance shutter, dock leveller AZDL6010, retractable and inflatable dock shelter (model and description only).
- Verified: `check:data`, `check:media`. Not run (no network): `npm install`, `next build`.

## V18 update (Oct 2026)
- Email now zenitrixautomations@gmail.com. Justdial (https://jsdl.in/RSL-EPQ1791567663) added to social links, header icons and schema sameAs.
- Fixed 2 broken links on /videos/. Titles auto-fit to ~60 chars (`fitTitle` in lib/seo.ts); compare/blog duplicate title fixed.
- Performance: self-hosted Inter/Sora (public/fonts), inline CSS, 400w image and 800w hero-poster variants, contrast fixes, browserslist.
- Local SEO: env-driven geo, hasMap, opening hours, Search Console + Bing verification. See DEPLOY.md.
- Verified: tsc, build, check:all (632 pages). Lighthouse (sandbox Chrome): A11y/BP/SEO 100; Performance 95 unthrottled, 81 to 92 under simulated mobile throttling in the slow sandbox. Re-test on PageSpeed Insights after deploy.


## Update (Oct 2026, build 6): launch hardening
- Domain set to https://zenitrixautomations.com (`lib/site.ts`, `.env.production`, `next.config.mjs`, IndexNow script).
- Mobile: always-visible search bar with live suggestions in the header (`components/search/MobileSearch.tsx`), mobile menu re-anchored under it, lighter paint (no blur blobs), 44px tap targets, anchor offset for the sticky header.
- SEO: site-wide keyword set (`siteKeywords()` in `lib/keywords.ts`, English + Telugu, all main places), richer default OpenGraph/Twitter/author/geo meta, robots `host`, fuller manifest, extra legacy redirects.
- 404: redesigned (`app/not-found.tsx`, noindex, search, popular links, call/WhatsApp), plus `app/error.tsx` and `app/global-error.tsx`.
- Security: tighter headers, hardened `/api/lead`, `security.txt`. Tests added in `tests/smoke.spec.ts`.
- NOT verified in a build: the update was made without being able to run `npm install` / `next build`. Run `npm install && npm run typecheck && npm run build && npm run check:all` first.
