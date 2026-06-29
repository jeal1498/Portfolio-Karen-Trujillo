# Schema Markup Audit — psicologakarentrujillo.com.mx

**Audit Date:** 2026-06-18
**Method:** Source code analysis (live site returns HTTP 403 — Cloudflare blocks programmatic access)
**Source analyzed:** `/home/user/Portfolio-Karen-Trujillo/src/pages/` and `src/lib/`

---

## 1. Schema Inventory

### Delivery mechanism

All JSON-LD is injected via `<script type="application/ld+json">` inside JSX `<Head>` blocks — server-side rendered (SSR), visible in raw HTML. The `injectSchema()` utility in `lib/seo.ts` exists but is **not used by any page**. All schema is page-local inline code.

### Page-by-page inventory

| Page | @type(s) present | Delivery |
|------|-----------------|----------|
| `index.tsx` | `WebPage` + `SpeakableSpecification`; `@graph`: `MedicalBusiness`+`MedicalClinic`, `Physician`, `WebSite`, `MedicalWebPage` (with embedded `BreadcrumbList`), 3× `MedicalProcedure` (each with `Offer`), `AggregateRating`, 6× `Review`, `FAQPage` | 2 separate `<script>` blocks |
| `evaluacion-tdah-ninos.tsx` | `@graph`: `MedicalWebPage`, `Physician`, `MedicalClinic`, `MedicalCondition`, 4× `DiagnosticProcedure`, `MedicalProcedure` (with `Offer`), 3× `Review`, `AggregateRating`, `FAQPage` | 1 `<script>` block |
| `evaluacion-tdah-adultos.tsx` | Same structure as ninos; 4× different `DiagnosticProcedure` types | 1 `<script>` block |
| `evaluacion-autismo-cancun.tsx` | Same structure; 5× `DiagnosticProcedure`; correct `price: '8500'` | 1 `<script>` block |
| `neuropsicologia-cancun.tsx` | `@graph`: `AboutPage`, standalone `BreadcrumbList`, `Physician` (with embedded `aggregateRating`, `alumniOf`, `memberOf`), `FAQPage` | 1 `<script>` block |
| `neuropsicologia-zona-hotelera-cancun.tsx` | `@graph`: `LandingPage`, `BreadcrumbList`, `LocalBusiness` (with `areaServed` 10 zones, `openingHours`, `aggregateRating` — **missing `geo`**), `FAQPage` | 1 `<script>` block |
| `para-escuelas.tsx` | `@graph`: `WebPage`, `BreadcrumbList`, `FAQPage` | 1 `<script>` block |
| `precios.tsx` | `ItemList` with 3× `ListItem` > `Offer` (prices via `.replace(/[^0-9]/g,'')` — evaluates correctly to 8300/8300/8500) | 1 `<script>` block |
| `blog/index.tsx` | **None** | — |
| 10 of 11 blog articles | `@graph`: `['Article','BlogPosting']`, `Person` author, `Organization` publisher, `MedicalCondition` (about), 3-level `BreadcrumbList`, `FAQPage` | 1 `<script>` block per article |
| `blog/que-es-ados-2-autismo.tsx` | `@type: 'Article'` only (not dual array) | 1 `<script>` block |

---

## 2. Validation Results

### Pass / Fail per block

| Block | @context https | Valid @type | Required props | Absolute URLs | ISO 8601 dates | Result |
|-------|---------------|-------------|---------------|--------------|---------------|--------|
| index — WebPage + SpeakableSpecification | PASS | PASS | PASS | PASS | PASS | PASS |
| index — @graph (main) | PASS | PASS | FAIL (price bug) | PASS | PASS | FAIL |
| tdah-ninos — @graph | PASS | PASS | FAIL (price bug) | PASS | PASS | FAIL |
| tdah-adultos — @graph | PASS | PASS | FAIL (price bug) | PASS | PASS | FAIL |
| autismo — @graph | PASS | PASS | PASS | PASS | PASS | PASS |
| neuropsicologia-cancun — @graph | PASS | PASS | PASS | PASS | n/a | PASS |
| neuropsicologia-zona-hotelera — @graph | PASS | PASS | FAIL (geo missing) | PASS | n/a | FAIL |
| para-escuelas — @graph | PASS | PASS | PASS | PASS | n/a | PASS |
| precios — ItemList | PASS | PASS | PASS | PASS | n/a | PASS |
| blog/index — (no schema) | — | — | — | — | — | MISSING |
| 10 blog articles — @graph | PASS | PASS | FAIL (wrong image) | PASS | PASS | WARN |
| que-es-ados-2 — @graph | PASS | WARN (partial type) | FAIL (wrong image) | PASS | PASS | WARN |

---

## 3. Issues Found

### ISSUE-01 — CRITICAL: Wrong price in TDAH service Offer nodes

**Pages affected:** `evaluacion-tdah-ninos.tsx`, `evaluacion-tdah-adultos.tsx`, and the 3× `MedicalProcedure` for TDAH services in `index.tsx`

**Current value:** `"price": "7000"`
**Correct value:** `"8300"` (matches UI display, `precios.tsx` ItemList, and the autismo page pattern)

The UI, the `precios.tsx` structured data, and the autismo page all show $8,300 MXN. The TDAH service Offer nodes are the only places using `7000`. This creates a price inconsistency that Google may flag as misleading rich result content.

**Fix — in each affected MedicalProcedure Offer:**
```json
{
  "@type": "Offer",
  "price": "8300",
  "priceCurrency": "MXN",
  "availability": "https://schema.org/InStock"
}
```

---

### ISSUE-02 — MEDIUM: `LocalBusiness` on zona-hotelera page missing `geo` coordinates

**Page:** `neuropsicologia-zona-hotelera-cancun.tsx`

The `LocalBusiness` entity has `address`, `openingHours`, `areaServed`, `aggregateRating`, and `priceRange`, but is missing `geo`. Without `geo`, this entity cannot qualify for local pack rich results.

**Fix — add to the LocalBusiness node:**
```json
{
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 21.1530418,
    "longitude": -86.8958544
  },
  "hasMap": "https://maps.google.com/?cid=4630406520710891531"
}
```

---

### ISSUE-03 — MEDIUM: Blog article `image` uses portrait photo instead of article hero

**Pages affected:** All 11 blog articles

All articles use `image: KAREN_IMAGE` — Karen's portrait photo (465×533 px, portrait orientation). Every article already has a purpose-built hero SVG at `/public/blog/dark-{slug}.svg` (1200×675 px, landscape). Google's Article rich result validator prefers images with width ≥ 1200 px and aspect ratio ≥ 16:9.

Current (wrong):
```json
"image": "https://www.psicologakarentrujillo.com.mx/karen-trujillo.webp"
```

Correct pattern (example for `tdah-en-adultos-sintomas.tsx`):
```json
"image": {
  "@type": "ImageObject",
  "url": "https://www.psicologakarentrujillo.com.mx/blog/dark-tdah-adultos.svg",
  "width": 1200,
  "height": 675
}
```

Each article must reference its own `dark-{slug}.svg`. The mapping is 1-to-1 — all 11 SVGs already exist in `/public/blog/`.

---

### ISSUE-04 — MEDIUM: `que-es-ados-2-autismo.tsx` uses single `@type: 'Article'` instead of dual array

**Page:** `blog/que-es-ados-2-autismo.tsx`

All other 10 articles use `'@type': ['Article', 'BlogPosting']`. This article uses only `'Article'`. Not a blocking error but creates inconsistency and misses the `BlogPosting` signal.

**Fix:**
```json
"@type": ["Article", "BlogPosting"]
```

---

### ISSUE-05 — LOW: `blog/index.tsx` has no schema at all

The blog index page (`/blog`) has zero structured data. Minimum recommended: `CollectionPage` or `WebPage` with `BreadcrumbList`.

**Recommended addition:**
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://www.psicologakarentrujillo.com.mx/blog/#webpage",
      "url": "https://www.psicologakarentrujillo.com.mx/blog/",
      "name": "Blog — Neuropsicología y TDAH en Cancún",
      "description": "Artículos sobre TDAH, autismo y diagnóstico neuropsicológico escritos por Karen Trujillo, neuropsicóloga en Cancún.",
      "inLanguage": "es-MX",
      "isPartOf": { "@id": "https://www.psicologakarentrujillo.com.mx/#website" },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Inicio",
            "item": "https://www.psicologakarentrujillo.com.mx/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Blog",
            "item": "https://www.psicologakarentrujillo.com.mx/blog/"
          }
        ]
      }
    }
  ]
}
```

---

### ISSUE-06 — LOW: `precios.tsx` `Offer` seller is an inline `Person` node instead of an @id reference

The `precios.tsx` `ItemList` embeds a `Person` with `name` and `identifier` inline rather than referencing `{ "@id": "https://www.psicologakarentrujillo.com.mx/#physician" }`. This disconnects the pricing data from the established physician entity in the knowledge graph.

**Fix — replace inline seller with:**
```json
"seller": { "@id": "https://www.psicologakarentrujillo.com.mx/#physician" }
```

---

### ISSUE-07 — LOW: Blog articles missing `keywords` and `wordCount`

Recommended Article properties that increase AI/LLM citation quality:

```json
"keywords": "TDAH, trastorno de atención, diagnóstico TDAH, neuropsicología Cancún",
"wordCount": 1200,
"inLanguage": "es-MX"
```

`inLanguage` is already present on all articles. `keywords` and `wordCount` are missing on all 11.

---

### ISSUE-08 — INFO: `FAQPage` present on 7 pages

Google retired FAQ rich results for all sites on May 7, 2026. The existing `FAQPage` markup is present on: `index.tsx`, `evaluacion-tdah-ninos.tsx`, `evaluacion-tdah-adultos.tsx`, `evaluacion-autismo-cancun.tsx`, `neuropsicologia-cancun.tsx`, `neuropsicologia-zona-hotelera-cancun.tsx`, `para-escuelas.tsx`.

**Do not remove.** The markup continues to aid AI Overviews, LLM citation, and entity resolution. Keeping it is correct. No action required.

---

## 4. Missing High-Value Schema Opportunities

### OPP-01 — HIGH: `Service` schema on service pages (distinct from `MedicalProcedure`)

The service pages have excellent `MedicalProcedure` schema, but `Service` is a separate Google-supported rich result type. Adding `Service` nodes enables the "Services" SERP feature for local business queries.

**Add to each service page @graph (example for TDAH niños):**
```json
{
  "@type": "Service",
  "@id": "https://www.psicologakarentrujillo.com.mx/evaluacion-tdah-ninos/#service",
  "name": "Evaluación Neuropsicológica de TDAH Infantil",
  "description": "Evaluación integral de TDAH para niños de 5 a 17 años con instrumentos estandarizados CONNERS-3, WISC-V, BRIEF-2 y CPT-3.",
  "url": "https://www.psicologakarentrujillo.com.mx/evaluacion-tdah-ninos/",
  "provider": { "@id": "https://www.psicologakarentrujillo.com.mx/#clinic" },
  "areaServed": {
    "@type": "City",
    "name": "Cancún",
    "sameAs": "https://www.wikidata.org/wiki/Q204813"
  },
  "serviceType": "Evaluación Neuropsicológica",
  "termsOfService": "https://www.psicologakarentrujillo.com.mx/precios/",
  "offers": {
    "@type": "Offer",
    "price": "8300",
    "priceCurrency": "MXN",
    "availability": "https://schema.org/InStock"
  }
}
```

---

### OPP-02 — MEDIUM: `SpeakableSpecification` on service pages

The homepage has `SpeakableSpecification` pointing to the headline and description CSS selectors. Service pages lack this. Adding it on `evaluacion-tdah-ninos.tsx`, `evaluacion-tdah-adultos.tsx`, and `evaluacion-autismo-cancun.tsx` improves voice assistant and AI Overview coverage for service-level queries.

```json
{
  "@type": "WebPage",
  "@id": "https://www.psicologakarentrujillo.com.mx/evaluacion-tdah-ninos/#webpage",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": ["h1", ".page-description"]
  }
}
```

---

### OPP-03 — MEDIUM: `MedicalClinic` `@type` array on `neuropsicologia-cancun.tsx`

The neuropsicologia-cancun page uses `AboutPage` but has no clinic/business entity in its @graph. Adding a brief `['MedicalBusiness','MedicalClinic']` node (can be a thin reference via @id) would reinforce the local entity signal on this high-traffic SEO page.

---

### OPP-04 — LOW: `EventSeries` or appointment `Event` for recurring availability windows

If Karen holds group psychoeducation sessions or workshops for schools (`para-escuelas`), `Event` schema would enable rich results. Not applicable to regular clinical evaluations, but relevant to the `para-escuelas.tsx` page if any scheduled events exist.

---

## 5. Priority Fix Order

| Priority | Issue | Page(s) | Effort |
|----------|-------|---------|--------|
| 1 — CRITICAL | ISSUE-01: Fix price `7000` → `8300` in TDAH Offer nodes | `index.tsx`, `evaluacion-tdah-ninos.tsx`, `evaluacion-tdah-adultos.tsx` | 3 line edits |
| 2 — MEDIUM | ISSUE-02: Add `geo` + `hasMap` to zona-hotelera `LocalBusiness` | `neuropsicologia-zona-hotelera-cancun.tsx` | 1 object addition |
| 3 — MEDIUM | ISSUE-03: Replace `image: KAREN_IMAGE` with article hero SVGs | All 11 blog articles | 11 edits |
| 4 — MEDIUM | OPP-01: Add `Service` schema to 3 service pages | 3 service pages | New node per page |
| 5 — MEDIUM | ISSUE-04: Fix single `@type` on ados-2 article | `que-es-ados-2-autismo.tsx` | 1 line edit |
| 6 — LOW | ISSUE-05: Add `CollectionPage` schema to blog index | `blog/index.tsx` | New block |
| 7 — LOW | ISSUE-06: Replace inline seller with @id reference | `precios.tsx` | 1 object edit |
| 8 — LOW | ISSUE-07: Add `keywords` and `wordCount` to blog articles | All 11 blog articles | 2 props per article |
| 9 — LOW | OPP-02: Add `SpeakableSpecification` to service pages | 3 service pages | 1 prop per page |

---

## 6. What Is Working Well

The schema implementation is substantially above average for a healthcare website in Mexico:

- `['MedicalBusiness','MedicalClinic']` dual @type on the primary clinic entity
- `Physician` with `hasCredential` (cédula 11009616), `alumniOf` (Universidad Modelo Mérida), `memberOf` (Colegio de Psicólogos de Quintana Roo)
- `MedicalCondition` with ICD-10 codes (F90, F90.0, F84.0), DSM-5 codes (314.00, 314.01, 299.00), and Wikidata `sameAs` links (Q206811 TDAH, Q38404 TEA)
- 4–5 `DiagnosticProcedure` nodes per service page naming the actual instruments (ADOS-2, WISC-V, CAARS-2, CONNERS-3, BRIEF-2, CPT-3)
- `AggregateRating` (5.0/47 reviews) cross-referenced from multiple entity nodes
- 6× `Review` entities on homepage with reviewer names and service-specific text
- `SpeakableSpecification` on homepage pointing to CSS selectors
- `openingHoursSpecification` with day-of-week arrays and UTC-5 timezone on clinic entities
- Entity graph coherence: author `@id` references in blog articles point to `/#physician`, publisher `@id` references point to `/#clinic`
- 3-level `BreadcrumbList` on all blog articles (Inicio > Blog > Article title)
- `WebSite` with `potentialAction` SearchAction for sitelinks search box eligibility
