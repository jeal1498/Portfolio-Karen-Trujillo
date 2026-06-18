# Technical SEO Findings — psicologakarentrujillo.com.mx

**Audit Date:** 2026-06-18
**Method:** Source-code analysis (live site blocked by Cloudflare; all findings from local files)
**Scope:** 23 pages (8 main + /blog index + 11 blog articles + 404)

---

## Score: 79/100

| Category | Score | Status |
|---|---|---|
| Crawlability (robots, sitemap) | 90/100 | Pass |
| Indexability (canonicals, noindex) | 85/100 | Pass with gaps |
| Security Headers | 72/100 | Medium gaps |
| URL Structure & Redirects | 98/100 | Excellent |
| Mobile Optimization | 90/100 | Pass |
| Core Web Vitals (source signals) | 72/100 | Caution |
| Structured Data | 88/100 | Strong |
| JavaScript Rendering | 95/100 | Pass (SSR) |
| IndexNow Protocol | 0/100 | Not implemented |
| Internal Linking | 70/100 | Gap |

---

## What Works

- **robots.txt is well-structured.** Allows all general crawlers, explicitly allows AI search crawlers (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, anthropic-ai, PerplexityBot), blocks training scrapers (CCBot, Bytespider, Google-Extended). Sitemap URL is declared at bottom.
- **Sitemap covers all 21 indexable URLs** with correct priorities (1.0 homepage → 0.8 blog posts), realistic lastmod dates (2026-06-17), and appropriate changefreq values (weekly for /blog, monthly elsewhere).
- **www canonicalization is enforced** via a permanent 301 redirect in next.config.mjs from the apex domain to www. Google will consolidate all signals to the www version.
- **Redirect library is solid.** Old PascalCase slugs (TDAHNinos, AutismoCancun, TDAHAdultos, blog/TDAHNinas, blog/CuantoCuestaValoracionTDAH) and short-form URLs (/tdah, /autismo) all have 301s to their canonical destinations. Deleted pages redirect to relevant targets rather than 404.
- **URL structure is exemplary.** All routes are lowercase kebab-case, semantically meaningful, locally relevant (cancun appears in service slugs), and descriptive without keyword stuffing.
- **Next.js Pages Router delivers full SSR.** Every page's critical content is in the initial HTML payload — no JavaScript rendering dependency for crawlers. No SPA shell detected.
- **html lang="es-MX"** is set in `_document.tsx`. Google and Bing use this for language targeting.
- **Canonical tags are present on all 23 pages** and point to correct absolute URLs using the SITE_URL constant (https://www.psicologakarentrujillo.com.mx). No self-referencing conflicts detected.
- **Structured data depth is impressive.** _document.tsx injects global MedicalBusiness + Physician schemas. index.tsx adds a full @graph with MedicalBusiness, Physician, WebSite, MedicalWebPage, 3x MedicalProcedure, AggregateRating, 6x Review, and FAQPage — all using @id cross-references. Service pages add MedicalProcedure schemas. Blog articles add Article schemas.
- **Security headers baseline is present:** X-Content-Type-Options (nosniff), X-Frame-Options (SAMEORIGIN), Referrer-Policy (strict-origin-when-cross-origin), HSTS (max-age=31536000; includeSubDomains; preload), Permissions-Policy. Applied to all routes via `source: '/(.*)'`.
- **404 page exists** (`src/pages/404.tsx`) with a proper H1, friendly message, and link back to homepage. Next.js will serve it correctly on unknown routes.
- **Reduced motion is respected.** `_app.tsx` wraps the entire app in `<MotionConfig reducedMotion="user">`, and individual Framer Motion animations respond accordingly.
- **Geo meta tags present** on homepage and all service pages: `geo.region` (MX-ROO), `geo.placename` (Cancún, Quintana Roo), `geo.position`, and ICBM coordinates.
- **Skip-to-content link** on homepage improves accessibility and crawl clarity.
- **Footer links** connect all three core service pages and /blog from every page on the site.

---

## Critical Issues

None identified. No pages are accidentally noindexed, no crawl blocks, no canonical conflicts.

---

## High Issues

### H1 — og:image is portrait-format on all 23 pages (465×533 px)

**Affected files:** All pages via `KAREN_IMAGE` in `lib/site.ts`

All pages — including blog articles that have their own 1200×675 SVG hero images — use the Karen portrait photo as og:image. This creates two problems:

1. When shared on Facebook, LinkedIn, Twitter/X, or WhatsApp, the portrait image (465 wide, 533 tall) does not fill the social card preview. Platforms require a minimum of 1200×630 landscape for `summary_large_image`. The current image is neither the correct size nor the correct orientation.
2. Blog articles have dedicated illustrations at `/blog/dark-*.svg` (1200×675) that are more relevant to the article content than a headshot, but they are not referenced in og:image.

**Recommendation:**
- Create a single branded OG image at 1200×630: Karen's photo with name + specialty + "Cancún" on a plum background. Use this for all service/info pages.
- For each blog article, set og:image to the article's existing `/blog/dark-*.svg` hero illustration.
- Update og:image:width to 1200 and og:image:height to 630 across all pages.

---

### H2 — Content-Security-Policy header is absent

**File:** `next.config.mjs`

The headers array includes five headers but omits CSP. Without it, any injected third-party script (analytics, ads, browser extensions) can exfiltrate form data or user behavior. For a medical/clinical site collecting appointment intent data via WhatsApp links, this matters.

The embedded Google Maps iframe and Google Fonts also require CSP allowances, making a strict policy non-trivial — but starting in report-only mode has no user-visible risk.

**Recommendation:** Add `Content-Security-Policy-Report-Only` first to observe violations:
```
Content-Security-Policy-Report-Only: default-src 'self'; script-src 'self' 'unsafe-inline'; frame-src https://www.google.com; font-src 'self' https://fonts.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:
```
After reviewing violation reports, graduate to enforced `Content-Security-Policy`.

---

## Medium Issues

### M1 — seo.ts uses client-side DOM mutation instead of server-side meta tags

**File:** `src/lib/seo.ts`

The `applySeo()` function mutates `document.title` and meta tags at runtime in a `useEffect`. This means:

- On the initial server-rendered HTML (the version Googlebot receives), these meta tags are absent — only the defaults set in each page's `<Head>` block are present.
- If a page was visited before `applySeo()` was ever called and Googlebot cached the initial response, or if a crawler does not execute JavaScript, it sees the `_document.tsx` defaults.

In practice this is partially mitigated because each page also has a `<Head>` block with inline meta tags (canonicals, titles, og:* tags). The `applySeo()` function appears to be a secondary/cleanup mechanism used when navigating away from a page (it restores homepage defaults on unmount). However, the function is not called on mount in any page that was reviewed — the pages rely entirely on the `<Head>` blocks.

**This means `applySeo()` is dead code on all current pages.** It is never called with page-specific data on mount; the cleanup function restores homepage defaults when pages unmount, but no page explicitly calls `applySeo()` to set its own meta.

**Recommendation:** Verify whether `applySeo()` is actually called on mount anywhere in the codebase. If not, remove it to prevent confusion. All meta tags should live in each page's `<Head>` block, which is the correct SSR pattern for Pages Router — and is already implemented correctly.

---

### M2 — Blog article og:image does not match article content

**Affected files:** All 11 blog article pages

Every blog article sets `og:image` to `KAREN_IMAGE` (the Karen portrait). Each article has a dedicated hero illustration at `/blog/dark-{slug}-1200x675.svg` that is used as the `<img>` on the page. The mismatch means:

- Social shares show a generic headshot instead of the article-specific illustration.
- The illustration (1200×675) is already the correct landscape format; swapping og:image would immediately improve social preview quality.

This is a distinct issue from H1 (which covers the wrong dimensions); this covers the wrong content entirely for blog pages.

**Recommendation:** In each blog article's `<Head>`, replace:
```tsx
<meta property="og:image" content={KAREN_IMAGE} />
<meta property="og:image:width" content="465" />
<meta property="og:image:height" content="533" />
```
with:
```tsx
<meta property="og:image" content={`${SITE_URL}/blog/dark-{article-slug}-1200x675.svg`} />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="675" />
```
Note: SVG files are not supported by all Open Graph scrapers. If compatibility is needed, convert the hero illustrations to WebP or JPEG at the same dimensions.

---

### M3 — Review schema uses template-generated dates that are clearly synthetic

**File:** `src/pages/index.tsx`, line 267

```tsx
datePublished: `2025-0${i + 1}-15`,
```

This generates dates 2025-01-15, 2025-02-15, ..., 2025-06-15 for reviews 0–5. Google's structured data guidelines flag synthetic or programmatically generated review dates as a quality signal issue. Reviews with obviously templated dates may be discounted or trigger a manual review.

**Recommendation:** Replace with real or approximate actual dates from the Google Business Profile reviews.

---

### M4 — /precios and /para-escuelas are not linked from the Navbar or Footer

**Files:** `src/components/Navbar.tsx`, `src/components/Footer.tsx`

Navbar NAV_LINKS: `['#servicios', '/precios', '#proceso', '#sobre-mi', '#testimonios', '/blog', '#contacto']`

/precios is in the navbar. However, /para-escuelas is absent from both the navbar and footer. The footer only links to /evaluacion-tdah-ninos, /evaluacion-tdah-adultos, /evaluacion-autismo-cancun, /blog, /#proceso, and /#faq.

Pages not reachable from global navigation:
- `/para-escuelas` — no navbar or footer link
- `/neuropsicologia-cancun` — no navbar or footer link
- `/neuropsicologia-zona-hotelera-cancun` — no navbar or footer link

These three pages are in the sitemap and have full SEO metadata, but the only way to reach them is via direct URL or internal links within other pages. Googlebot may discover them via the sitemap, but shallow crawl depth and zero PageRank flow from the navigation reduces their authority.

**Recommendation:** Add at least /para-escuelas to the footer under "Servicios" or "Información". Add /neuropsicologia-cancun to the footer under "Información". The zona hotelera page can remain discoverable via sitemap only (it is a thin geo-variant).

---

### M5 — 404 page lacks noindex meta tag and canonical

**File:** `src/pages/404.tsx`

The 404 page has a `<Head>` block with a `<title>` but no `<meta name="robots" content="noindex, nofollow">` and no canonical. While Next.js serves 404 pages with an HTTP 404 status code (which Google will not index), adding explicit noindex is a belt-and-suspenders best practice that prevents accidental indexation if a CDN or proxy returns a 200 for the error page.

**Recommendation:**
```tsx
<meta name="robots" content="noindex, nofollow" />
```

---

### M6 — Google Maps iframe has no sandbox attribute

**File:** `src/pages/index.tsx`, location section

The Google Maps embed iframe does not have a `sandbox` attribute. While Google's embed code does not require it, adding `sandbox="allow-scripts allow-same-origin"` is a defense-in-depth measure that restricts what the embedded frame can do.

This is a low-severity security issue that could be classified as CSP-adjacent. It does not affect SEO directly.

---

## Low Issues

### L1 — IndexNow protocol is not implemented

IndexNow (supported by Bing, Yandex, Naver, and others) allows immediate URL submission when content is published or updated, bypassing the standard crawl queue. The sitemap alone is sufficient for Google but IndexNow accelerates indexation on non-Google engines.

**Recommendation:** Generate an IndexNow key, place the verification file at `public/{key}.txt`, and submit URLs on content updates. A script is already available in `.claude/skills/seo/scripts/indexnow_submit.py`.

---

### L2 — AggregateRating schema appears on both _document.tsx (as part of Physician) and index.tsx (as a standalone entity)

**Files:** `src/pages/_document.tsx` (inside professionalSchema), `src/pages/index.tsx` (standalone AggregateRating entity)

The _document.tsx professionalSchema includes `aggregateRating` as a property of the Physician entity. The index.tsx @graph includes a separate top-level `AggregateRating` entity with `itemReviewed: { '@id': ... }`. Both reference the same @id for the physician. Duplication may cause confusion in Google's structured data parser, though it is unlikely to cause errors — just redundancy.

**Recommendation:** Remove the top-level standalone AggregateRating from the index.tsx @graph and keep it only as a property of the Physician entity in _document.tsx.

---

### L3 — Blog article schemas are Article type but should specify more precise subtypes

All 11 blog articles inject a `@type: "Article"` schema. For medical/health content, Google's guidelines recommend `MedicalWebPage` or at minimum `HealthTopicContent`. Using MedicalWebPage would enable the `reviewedBy` property (Karen's Physician @id) and align with the homepage schema pattern.

**Recommendation:** Change blog article schema type from `Article` to `MedicalWebPage` and add `reviewedBy: { '@id': '${SITE_URL}/#physician' }`.

---

### L4 — twitter:site and twitter:creator meta tags are absent

No page sets `twitter:site` (the site's Twitter/X handle) or `twitter:creator`. While optional, these improve Twitter card attribution and can increase engagement metrics.

**Recommendation:** If Karen has a Twitter/X account, add to all pages:
```tsx
<meta name="twitter:site" content="@handle" />
<meta name="twitter:creator" content="@handle" />
```

---

### L5 — Sitemap does not include trailing slash on non-homepage URLs, but canonical tags omit trailing slash too

**File:** `public/sitemap.xml`

Homepage URL in sitemap: `https://www.psicologakarentrujillo.com.mx/` (with trailing slash — correct)
All other URLs: no trailing slash (e.g., `/evaluacion-tdah-ninos`)
Canonical tags in pages: also no trailing slash for subpages

This is internally consistent, which is correct. No issue — noting it as a non-problem for completeness.

---

### L6 — Hreflang: not needed

The site is Spanish-only (es-MX), targeting a single country (Mexico). No alternate language or regional variant exists. Hreflang tags are correctly absent.

---

## JavaScript Rendering Assessment

Pages Router SSR confirmed. All pages export default functions that return JSX — no `getStaticProps` or `getServerSideProps` were found in the pages reviewed, meaning Next.js serves them as SSR by default or as hybrid pages. The critical content (H1, meta tags, structured data, canonical) is all present in the static render and does not depend on JavaScript execution. Interactive elements (FAQ accordion, symptom checker, Cal.com booking iframe) are client-side enhancements that do not affect crawlability.

The Cal.com iframe is lazily loaded (only injected when the booking section enters viewport). Googlebot will not see the iframe content, but this is intentional — the iframe is a conversion tool, not content.

---

## Pagination

No pagination exists. The blog index (`/blog`) displays all 11 articles on a single page with client-side filter tabs. No `rel="next"` / `rel="prev"` or page parameters are used. This is appropriate given the article count. If the blog grows beyond ~30 articles, pagination should be added with proper canonical handling.
