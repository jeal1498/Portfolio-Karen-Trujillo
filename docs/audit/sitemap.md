# Sitemap Findings

## Score: 80/100

Audit method: source-code analysis only (live site returns HTTP 403 via Cloudflare).
Files analyzed: `public/sitemap.xml`, `public/robots.txt`, `next.config.mjs`, all `.tsx` files under `src/pages/`.
Audit date: 2026-06-18.

---

## Coverage Analysis (pages in sitemap vs pages that exist)

| Metric | Value |
|--------|-------|
| Total URLs in sitemap | 20 |
| Total routable .tsx pages | 20 |
| Pages present in sitemap | 20 / 20 |
| Orphan URLs (sitemap only, no file) | 0 |
| Missing pages (file exists, not in sitemap) | 0 |
| Coverage rate | 100% |

All 20 public routes have 1:1 coverage. The non-public Next.js files (`_app.tsx`, `_document.tsx`, `404.tsx`) are correctly excluded.

**Pages confirmed present in both:**
- `/` (homepage)
- `/evaluacion-tdah-ninos`
- `/evaluacion-tdah-adultos`
- `/evaluacion-autismo-cancun`
- `/precios`
- `/neuropsicologia-cancun`
- `/neuropsicologia-zona-hotelera-cancun`
- `/para-escuelas`
- `/blog`
- `/blog/senales-tdah-ninos`
- `/blog/cuanto-cuesta-valoracion-tdah-cancun`
- `/blog/tdah-adultos-diagnostico-tardio`
- `/blog/tdah-en-ninas-sintomas`
- `/blog/que-es-ados-2-autismo`
- `/blog/tdah-inatento-sintomas`
- `/blog/tdah-vs-ansiedad-diferencias`
- `/blog/cuanto-cuesta-evaluacion-autismo-mexico`
- `/blog/autismo-nivel-1-sintomas-adultos`
- `/blog/burnout-o-tdah-diferencias`
- `/blog/donde-evaluar-tdah-cancun`

---

## Quality Issues

### FAIL — All lastmod dates are identical (2026-06-17)

Every single URL in the sitemap carries `<lastmod>2026-06-17</lastmod>`. This is a known quality signal Google uses to assess sitemap trustworthiness. When all 20 URLs share the same date — including evergreen service pages and blog articles written on different days — Google treats the lastmod field as unreliable and stops using it for crawl scheduling.

The 10 blog articles each have a distinct publication date. At minimum, blog lastmod values should reflect actual publication dates. Service pages genuinely do change less frequently, but using the same date as every blog article undermines credibility.

**Fix:** Set each `<lastmod>` to the actual last-modified date of that page's content. Blog articles should use publication date. Service pages should use the date of their most recent content edit.

### WARN — Trailing slash inconsistency (homepage vs all others)

The homepage is listed as `https://www.psicologakarentrujillo.com.mx/` (with trailing slash). All 19 other URLs have no trailing slash. This is not a critical error — Next.js Pages Router canonicalizes `/` to itself — but it creates a visual inconsistency in the sitemap. If `next.config.mjs` is ever updated to add `trailingSlash: true`, the non-homepage URLs would all need updating.

**Fix (optional):** Either drop the trailing slash from the homepage entry to `https://www.psicologakarentrujillo.com.mx` or confirm the canonical for `/` in the page's `applySeo()` call. Low priority.

### INFO — `priority` and `changefreq` are ignored by Google

Both `<priority>` and `<changefreq>` have been ignored by Google's crawler since approximately 2023. The values present are logically structured (1.0 homepage, 0.9 service pages, 0.85 pricing/local SEO, 0.8 blog) but provide no SEO benefit. Bing still reads `changefreq`.

**Fix (optional):** These tags can be removed to reduce file size and maintenance burden. Removing them does not hurt rankings. Keep only `<loc>` and `<lastmod>`.

### FAIL — No image sitemap

The site has 57 image assets referenced in page content:
- `Psicologa_Karen_Trujillo.webp` — Karen's photo used in Hero and og:image
- 56 blog SVG illustrations (`/blog/dark-*.svg`) — hero images for each article

None of these are declared in the sitemap via `<image:image>` extensions. Google Image Search cannot discover images that are not in the sitemap or that require JavaScript to render. Since the blog hero images are rendered via `<img>` tags (not CSS background), they may be discoverable via standard crawl, but the WebP photo especially benefits from sitemap declaration.

**Fix (medium priority):** Add `<image:image>` entries to the homepage URL (for the WebP) and to each blog article URL (for its corresponding SVG). Add the image sitemap namespace to the `<urlset>` opening tag.

---

## Missing Pages

None. All 20 expected pages are present in the sitemap.

---

## Orphan URLs (in sitemap but no page file)

None. Every URL in the sitemap has a corresponding `.tsx` file.

---

## What Works

- **XML is valid and well-formed.** UTF-8 declaration, correct namespace (`http://www.sitemaps.org/schemas/sitemap/0.9`), no syntax errors.
- **URL count is well within limits.** 20 URLs against the 50,000 per-file cap. No index sitemap needed.
- **100% page coverage.** Every public route is in the sitemap. No pages are missing. No ghost URLs.
- **www consistency is perfect.** All 20 URLs use `https://www.` — matches the canonical enforced in `next.config.mjs` via the permanent redirect from bare domain to www.
- **Sitemap declared in robots.txt.** Line 35: `Sitemap: https://www.psicologakarentrujillo.com.mx/sitemap.xml`. Domain matches sitemap entries. Googlebot will find it.
- **404 page correctly excluded.** `src/pages/404.tsx` is not in the sitemap.
- **Redirect targets not in sitemap.** Legacy slugs (`/tdah`, `/autismo`, `/TDAHNinos`, etc.) defined in `next.config.mjs` are redirect sources, not destinations — they correctly do not appear in the sitemap.
- **Location page quality gate: PASS.** The site has 2 local SEO pages (`/neuropsicologia-cancun`, `/neuropsicologia-zona-hotelera-cancun`), well below the 30-page WARNING threshold and the 50-page HARD STOP. No doorway page risk.
- **No www/non-www canonical split risk.** `next.config.mjs` enforces a 301 from bare domain to www for all paths. The sitemap exclusively uses www. These are aligned.

---

## Recommendations

**Priority 1 — Fix lastmod dates (high SEO impact)**

Replace the mass-assigned `2026-06-17` date with accurate dates per page. Blog articles have a publication chronology that can be inferred from content or git history. Service pages warrant the same date only if they were genuinely all last edited on the same day. Use `git log --follow -1 --format="%ad" --date=short -- src/pages/FILENAME.tsx` per file to extract the real last-commit date.

**Priority 2 — Add image sitemap entries (medium SEO impact)**

At minimum, add an `<image:image>` block to the homepage URL for the Karen WebP photo. For blog articles, add entries pointing to each article's hero SVG. This makes the images discoverable by Google Image Search without requiring a full JS render.

Example structure for a blog article URL entry:
```xml
<url>
  <loc>https://www.psicologakarentrujillo.com.mx/blog/senales-tdah-ninos</loc>
  <lastmod>2026-05-12</lastmod>
  <image:image>
    <image:loc>https://www.psicologakarentrujillo.com.mx/blog/dark-tdah-ninos.svg</image:loc>
    <image:title>Señales de TDAH en niños</image:title>
  </image:image>
</url>
```

Add `xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"` to the `<urlset>` opening tag.

**Priority 3 — Remove priority and changefreq (low impact, cleanup)**

Optional. Removing deprecated tags reduces file size and eliminates future maintenance confusion. Google ignores both fields. If Bing traffic is a goal, `changefreq` can be kept only for pages with genuinely different update frequencies.

---

## Structured Findings (JSON-compatible for audit-data.json)

```json
{
  "category": "Sitemap",
  "score": 80,
  "url_count": 20,
  "coverage_rate": 1.0,
  "orphan_urls": 0,
  "missing_pages": 0,
  "xml_valid": true,
  "robots_txt_declares_sitemap": true,
  "www_consistent": true,
  "trailing_slash_inconsistency": "homepage only has trailing slash",
  "lastmod_all_identical": true,
  "lastmod_date": "2026-06-17",
  "deprecated_tags": ["priority", "changefreq"],
  "image_sitemap": false,
  "location_pages_count": 2,
  "location_page_quality_gate": "PASS",
  "checks": {
    "xml_validity": "PASS",
    "url_limit": "PASS",
    "full_coverage": "PASS",
    "no_orphan_urls": "PASS",
    "www_consistency": "PASS",
    "robots_txt_reference": "PASS",
    "no_404_in_sitemap": "PASS",
    "location_quality_gate": "PASS",
    "lastmod_varied": "FAIL",
    "image_sitemap": "FAIL",
    "trailing_slash_consistency": "WARN",
    "priority_changefreq_deprecated": "INFO"
  }
}
```
