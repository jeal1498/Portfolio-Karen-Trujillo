# Local SEO Findings — psicologakarentrujillo.com.mx

**Audit Date:** 2026-06-18
**Audited From:** Source code only (site returns HTTP 403 at Cloudflare edge)
**Business Type:** Brick-and-Mortar + Hybrid (physical consultorio en SM200 Cancún; entrevista inicial y devolución también online)
**Industry Vertical:** Healthcare — Neuropsicología Clínica (TDAH + TEA)

---

## Local SEO Score: 76/100

| Dimension | Score | Weight | Weighted |
|-----------|-------|--------|---------|
| GBP Signals | 70/100 | 25% | 17.5 |
| Reviews & Reputation | 90/100 | 20% | 18.0 |
| Local On-Page SEO | 88/100 | 20% | 17.6 |
| NAP Consistency & Citations | 72/100 | 15% | 10.8 |
| Local Schema Markup | 82/100 | 10% | 8.2 |
| Local Link & Authority Signals | 40/100 | 10% | 4.0 |
| **TOTAL** | | | **76.1** |

---

## NAP Consistency Audit

**Source of Truth:** `src/lib/site.ts` (ADDRESS, GEO) + `src/lib/contact.ts` (PHONE_E164, WA_NUMBER)

| Field | lib/site.ts + contact.ts | public/nap.json | Visible HTML (homepage) | Schema JSON-LD | Status |
|-------|--------------------------|-----------------|-------------------------|----------------|--------|
| Business Name | Neuropsicóloga Karen Trujillo | Neuropsicóloga Karen Trujillo | "Karen Trujillo / Neuropsicóloga en Cancún" | "Neuropsicóloga Karen Trujillo — Consultorio de Neuropsicología" | MINOR VARIATION |
| Street | SM200 M49 L2, Hacienda de Chinconcuac, Circuito casa 1587B | same | "SM200 M49 L2, Hacienda de Chinconcuac / Supermanzana Circuito casa 1587B" | via ADDRESS spread | VISIBLE FORMAT SPLIT |
| City | Cancún | Cancún | Cancún | Cancún | OK |
| State | Quintana Roo | Quintana Roo | Quintana Roo | Quintana Roo | OK |
| Postal Code | 77539 | 77539 | C.P. 77539 | 77539 | OK |
| Country | MX | México | (not shown) | MX | FORMAT MISMATCH |
| Phone (E.164) | +529983211547 | +52 998 321 1547 | +52 998 321 1547 | +529983211547 | FORMAT MISMATCH |
| Geo Lat | 21.1530418 | 21.1530418 | geo.position meta tag | 21.1530418 | OK — 7 decimals |
| Geo Lng | -86.8958544 | -86.8958544 | geo.position meta tag | -86.8958544 | OK — 7 decimals |
| Maps CID | 4630406520710891531 | 4630406520710891531 | hasMap + embed + review link | hasMap | OK |

**Discrepancies found:**

1. **Phone format inconsistency (Medium):** `PHONE_NUMBER = '529983211547'` (no `+`) is used in `tel:` href attributes on most pages. `Footer.tsx` uses `` `tel:+${PHONE_NUMBER}` `` (adds `+` manually), while `FloatingButtons.tsx` and service pages use `` `tel:${PHONE_NUMBER}` `` (produces `tel:529983211547` without `+`). RFC 3966 requires `+` prefix for international numbers. The `PHONE_E164 = '+529983211547'` constant exists but is only used in schema, not in `tel:` links. Impact: mobile dialers handle this inconsistently; some Android devices fail to resolve numbers without `+` when dialing Mexico country code.

2. **Business name variation (Low):** Schema uses "Neuropsicóloga Karen Trujillo — Consultorio de Neuropsicología" while nap.json uses "Neuropsicóloga Karen Trujillo". Footer shows "Karen Trujillo / Neuropsicóloga en Cancún". None are factually wrong, but citation-matching algorithms prefer exact-string consistency across all surfaces.

3. **Street address HTML split (Low):** The visible HTML on the homepage renders the street across two `<br>` elements: "Hacienda de Chinconcuac" on line one, "Supermanzana Circuito casa 1587B" on line two. This is purely cosmetic for UX but the nap.json has it as a single string. Consistent.

4. **Country code format (Low):** JSON-LD schema uses `addressCountry: 'MX'` (ISO 3166-1 alpha-2 — correct per schema.org spec). nap.json uses `"country": "México"` (human-readable). nap.json is only used for manual directory submissions, so this is not a crawling issue, but the person entering data should use 'MX' in form fields.

---

## Local Schema Assessment

**Schema type on homepage:** `['MedicalBusiness', 'MedicalClinic']` — correct dual-typing. A standalone private neuropsychology practice in Mexico should use `MedicalBusiness` + `MedicalClinic` (or `MedicalOrganization`). Using `Physician` for Karen's personal entity is also correct.

Note: `LegalService` / `Attorney` schemas are not relevant here. `Physician` is appropriate for the practitioner node; there is no deprecated schema type in use.

| Property | Required/Recommended | Homepage Schema | /neuropsicologia-zona-hotelera schema | Assessment |
|----------|---------------------|----------------|---------------------------------------|------------|
| @type | Required | MedicalBusiness + MedicalClinic | LocalBusiness | MISMATCH — zona-hotelera page uses base `LocalBusiness` |
| name | Required | Present | Present | OK |
| address (PostalAddress) | Required | Present (via ADDRESS spread) | Present (via ADDRESS spread) | OK |
| telephone | Recommended | Present (PHONE_E164) | Present (PHONE_E164) | OK |
| url | Recommended | Present | Present | OK |
| image | Recommended | Present (KAREN_IMAGE) | Present | OK |
| geo (GeoCoordinates) | Recommended | Present — 7-decimal precision | MISSING | MISSING on zona-hotelera |
| openingHoursSpecification | Recommended | Present | Present | OK |
| priceRange | Recommended | Present ($8,300 - $8,500 MXN) | Present | OK |
| areaServed | Recommended | Present — 7 cities + Quintana Roo | Present — 10 areas | OK |
| hasMap | Recommended | Present (CID link) | MISSING | MISSING on zona-hotelera |
| aggregateRating | Recommended | Separate @type node (standalone) | Present inline | SEE NOTE BELOW |
| sameAs | Recommended | Present (social + GBP CID) | MISSING | MISSING on zona-hotelera |
| medicalSpecialty | Healthcare-specific | 'Neuropsychiatry' | N/A | OK |

**aggregateRating placement note (High):** On the homepage, `AggregateRating` is a standalone graph node with `itemReviewed: { '@id': '#physician' }`, not nested inside the `MedicalBusiness` node. Google's structured data guidelines recommend nesting `aggregateRating` directly inside the entity being rated. A standalone node linked via `@id` is technically valid JSON-LD but is less reliably processed by Google's rich result parser for local pack signals. The `/neuropsicologia-cancun` page correctly nests it inside the `Physician` node.

**Review datePublished issue (Medium):** Individual `Review` nodes in the homepage schema use `datePublished: '2025-0${i + 1}-15'` — a template literal that produces `2025-01-15` through `2025-06-15` for the 6 reviews. This means every build produces dates tied to array index, not actual review dates. Months 07–12 would produce invalid ISO dates (`2025-07-15` etc. are valid, but the current set only covers 6 reviews = months 1–6, which happen to all be valid). The issue is semantic: these are not the real publication dates of the reviews.

**`/neuropsicologia-zona-hotelera-cancun` schema type issue (High):** Uses `@type: 'LocalBusiness'` instead of `MedicalBusiness` or `MedicalClinic`. This is the wrong subtype for a healthcare provider. Whitespark 2026 research lists wrong GBP/schema category as the #1 negative ranking factor (score: 176). While this is a secondary page, consistency matters.

---

## Location Pages Quality

### /neuropsicologia-cancun

**Unique content:** Yes — this is not a doorway page. The page covers what neuropsychology is, differentiators vs. general psychology, Karen's full professional profile, conditions evaluated in Cancún, and a FAQ specific to the specialty. Content is substantively distinct from the homepage.

**Local keyword density:**
- H1: "Neuropsicóloga en Cancún — Karen Trujillo" — exact-match primary keyword
- Multiple mentions of "Cancún, Quintana Roo" in body text
- FAQ answer explicitly states the full address with CP
- "Colegio de Psicólogos de Quintana Roo" adds local authority signal

**Geo signals:**
- `geo.region: MX-ROO`, `geo.placename: Cancún, Quintana Roo`, `geo.position` and `ICBM` meta tags present
- Address visible in body of CTA section: "SM200 M49 L2, Hacienda de Chinconcuac, Cancún, Q.Roo (CP 77539)"

**Maps embed:** MISSING — no Google Maps iframe on this page. The location section (with iframe) exists only on the homepage. The `/neuropsicologia-cancun` page has no embedded map.

**Internal linking depth:** 1 click from homepage. Page links back to all 3 service pages in an internal linking strip at the bottom — good hub-and-spoke structure.

**Near-me intent addressed:** The FAQ question "¿Dónde está el consultorio en Cancún?" addresses the local intent directly with full address.

**Landmark references:** "Cancún, Quintana Roo" and "SM200" are used. No references to nearby landmarks (Walmart, hospital names, major intersections) that would strengthen hyperlocal relevance. Opportunity.

**Assessment:** High-quality, unique content page. Missing map embed is the main gap.

---

### /neuropsicologia-zona-hotelera-cancun

**Unique content:** Yes — substantively distinct from all other pages. Focuses exclusively on patients traveling from Zona Hotelera, Playa del Carmen, Tulum, Mérida, Isla Mujeres, Holbox. Content addresses travel logistics, session scheduling for out-of-towners, and ADOS-2 scarcity in smaller cities.

**Local keyword usage:**
- H1: "Neuropsicóloga para la Zona Hotelera y Riviera Maya" — addresses the geographic search intent directly
- Body text: specific travel times from each city (15–25 min, ~60 min, ~90 min, ~3 hrs)
- Address repeated twice in body text
- "Bulevar Kukulcán" reference — strong landmark signal for Zone Hotelera searchers
- "307" highway reference for Playa del Carmen audience

**Maps embed:** MISSING — the location section uses a text address block and WhatsApp CTA. No embedded Google Maps iframe.

**Distance tables:** The ciudades grid (distances from 5 origin cities) is strong local content that signals geographic relevance to Google without needing separate city pages.

**Schema @type:** `LocalBusiness` instead of `MedicalBusiness` — should be corrected.

**Missing from schema:** geo coordinates, hasMap, sameAs — all present on the main LocalBusiness entity in the homepage schema but not re-declared here. Since these are separate schema graph instances (different `@id` values), the omissions are meaningful.

**Assessment:** Strong content differentiation. Geographic specificity is excellent. Main issues are schema type and missing map embed.

---

## GBP Signals Assessment

| Signal | Found in Source | Notes |
|--------|----------------|-------|
| GBP CID reference | Yes — CID `4630406520710891531` | Used in hasMap, DIRECTORY_PROFILES, review write link |
| Google Maps embed (iframe) | Yes — homepage only | Not present on location pages |
| Maps directions link | Yes — `https://www.google.com/maps/dir/?api=1&destination=21.1530418,-86.8958544` | Homepage location section |
| Review link (write a review) | Yes — `https://maps.google.com/maps?cid=...&action=writeareview` | Testimonials section on homepage |
| Review widget | No — not embedded | Reviews are hardcoded in JSX, not pulled live from GBP |
| GBP Posts indicator | No | No reference to GBP posts on the site |
| Photo gallery reference | No | Karen's portrait exists but no gallery |
| Q&A signal | No (GBP Q&A removed Dec 2025) | FAQ sections on site cover this |

**Key gap:** The Google Maps embed is only on the homepage. Both location-targeted pages (/neuropsicologia-cancun and /neuropsicologia-zona-hotelera-cancun) have no iframe embed, which reduces the local relevance signal on pages designed specifically to rank for geographic queries.

**GBP management status:** Cannot be verified from source code. The CID is present and appears legitimate (referenced consistently across contact.ts, schema, and nap.json).

---

## Review Signals Assessment

| Metric | Value | Source |
|--------|-------|--------|
| Aggregate rating | 5.0 | REVIEWS constant in site.ts |
| Review count | 47 | REVIEWS constant in site.ts |
| AggregateRating in schema | Yes | Homepage @graph + neuropsicologia-cancun Physician node + zona-hotelera LocalBusiness node |
| Individual reviews in schema | 6 Review nodes | Homepage @graph |
| Review display on page | Yes | Featured quote + 3 cards (homepage), stat box (neuropsicologia-cancun) |
| Reviewer names | Descriptive names ("Mamá de Sofía, 7 años", "Alejandro, 34 años") | Not full legal names — realistic and useful |
| Service specificity | Yes — each review tagged with service type | Strong signal |
| Response pattern | Not visible from source | Cannot assess from code |
| Review velocity | Unknown — no timestamps shown on site | 47 total — excellent threshold |

**Review content quality:** All 6 hardcoded reviews include: specific outcome (diagnóstico, informe, adecuaciones), named reviewer in relatable format, and tagged service. This is the right pattern. Reviews reference "Cancún" indirectly via service context.

**18-day review velocity risk:** Cannot determine last review date from source code. The 47-count is excellent, but Sterling Sky research shows a ranking cliff if no new reviews post for 3 weeks. This is an ongoing operational risk.

**Hardcoded vs. live reviews:** The 6 displayed reviews are JSX constants, not pulled from Google. This is intentional for performance and control, but means the displayed reviews won't update automatically as new reviews come in. The review count (47) and the displayed 6 can drift out of sync with what GBP shows.

---

## WhatsApp CTA Assessment

| Element | Present | Notes |
|---------|---------|-------|
| FloatingButtons (mobile) | Yes | Fixed bottom bar, lg:hidden — mobile only |
| Hero WhatsApp CTA | Yes | Primary green button above fold |
| Sticky mobile CTA (after scroll) | Yes | `showStickyCta` logic triggers after hero scroll |
| WhatsApp number consistency | Yes | All use `WA_NUMBER` from contact.ts = 529983211547 |
| Message pre-population | Yes | Contextual messages per page section |
| WA URL format | `wa.me/529983211547` | Missing `+` — some devices may not resolve without +52 prefix. Test needed. |

**Note on wa.me URL:** `wa.me/529983211547` (without `+`) is widely accepted by WhatsApp's own documentation as valid for Mexico country code. This is less of a risk than the `tel:` format issue.

---

## Local Keywords Assessment

| Keyword | H1 | Title Tag | Description | Schema name | Body |
|---------|-----|-----------|-------------|-------------|------|
| neuropsicóloga Cancún | Homepage H1 | Yes | Yes | Yes | Yes |
| evaluación TDAH Cancún | Service page H1 | Yes | Yes | Yes | Yes |
| diagnóstico autismo Cancún | Service page H1 | Yes | Yes | Yes | Yes |
| neuropsicóloga Quintana Roo | No H1 | No | Partial | Yes (areaServed) | FAQ text |
| neuropsicóloga zona hotelera | Location page H1 | Yes | Yes | Schema name | Yes |
| neuropsicóloga Riviera Maya | Location page H1 | Yes | Yes | Yes | Yes |
| evaluación neuropsicológica Cancún | Location page body | Location page | Yes | Procedure names | Yes |
| TDAH niños Cancún | Service page | Yes | Yes | Procedure | Yes |
| TDAH adultos Cancún | Service page | Yes | Yes | Procedure | Yes |

**Local keyword verdict:** Coverage is excellent across the primary service + location combinations. Quintana Roo as a state-level keyword has lighter coverage in H1/title compared to city-level.

---

## Citation Presence (Tier 1 Directories)

Assessment is source-code-only. No live directory lookups performed.

| Directory | Status (from nap.json) | Notes |
|-----------|------------------------|-------|
| Google Business Profile | Active (CID confirmed) | hasMap + embed confirm active listing |
| Bing Places for Business | Unknown — not referenced in any source file | Likely unclaimed |
| Apple Business Connect | Unknown — not referenced | Likely unclaimed |
| Yelp | Not referenced anywhere | Unknown status |
| BBB | Not referenced anywhere | Less relevant for Mexico market |
| Doctoralia MX | PENDIENTE — per nap.json | Must create profile |
| Psychology Today (MX) | PENDIENTE — per nap.json | Must create profile |
| Top Doctors MX | PENDIENTE — per nap.json | Must create profile |
| Facebook Business | Active — SOCIAL.facebook in contact.ts | sameAs reference present |
| Instagram Business | Active — SOCIAL.instagram in contact.ts | sameAs reference present |

**Critical gap:** Doctoralia is the #1 healthcare directory in Mexico and Latin America. Its absence is the single most impactful citation gap for ranking in local pack and AI-generated recommendations.

---

## What Works Well

1. **Single source of truth for all NAP data** — `lib/site.ts` + `lib/contact.ts` are the authoritative sources. ADDRESS, GEO, PHONE_E164, WA_NUMBER all propagate to schema, meta tags, and visible HTML automatically. No manual copy-paste risk.

2. **Rich schema graph on homepage** — The `@graph` array on the homepage contains MedicalBusiness + MedicalClinic, Physician, WebSite, MedicalWebPage, 3 MedicalProcedure nodes, AggregateRating, 6 Review nodes, and FAQPage. This is comprehensive.

3. **Geo meta tags on every page** — `geo.region`, `geo.placename`, `geo.position`, and `ICBM` meta tags are present consistently across homepage, neuropsicologia-cancun, and neuropsicologia-zona-hotelera-cancun.

4. **Google Maps embed with exact CID pin** — The homepage iframe uses coordinates `21.1530418,-86.8958544` and the CID-linked business name appears as the iframe title. The embed is present and correctly attributed.

5. **Review signals are strong** — 47 reviews at 5.0 stars with `aggregateRating` in schema on multiple pages. The `writeareview` direct link in the testimonials section actively drives new reviews.

6. **Service pages are dedicated and non-doorway** — `/evaluacion-tdah-ninos`, `/evaluacion-tdah-adultos`, `/evaluacion-autismo-cancun` each have unique content, instruments listed, pricing, and internal linking. These are the #1 local organic ranking factor (Whitespark 2026).

7. **Internal linking architecture is solid** — Every service page appears in the navigation footer, in the homepage CTA grid, and in the bottom strip of location pages. No service page is deeper than 2 clicks from any other page.

8. **Mobile click-to-call is present** — `tel:` links exist on homepage location section, all service pages, and FloatingButtons. The floating bar (mobile-only, fixed bottom) ensures conversion opportunity is always accessible.

9. **Dedicated location pages with unique content** — Both `/neuropsicologia-cancun` and `/neuropsicologia-zona-hotelera-cancun` have substantively different content from each other and from the homepage. They are not doorway pages.

10. **areaServed covers the right geographic footprint** — Cancún, Playa del Carmen, Tulum, Mérida, Quintana Roo, Riviera Maya with Wikidata sameAs references provide strong geographic entity associations.

---

## Critical Issues

### C-1: `tel:` href missing `+` prefix (most pages)
- **Where:** `FloatingButtons.tsx`, `evaluacion-tdah-ninos.tsx`, `evaluacion-tdah-adultos.tsx`, `evaluacion-autismo-cancun.tsx`, `index.tsx` (location + CTA sections)
- **Code:** `` `tel:${PHONE_NUMBER}` `` → `tel:529983211547` (no `+`)
- **Footer is inconsistent:** Footer.tsx uses `` `tel:+${PHONE_NUMBER}` `` (correct)
- **Fix:** Replace all instances with `` `tel:${PHONE_E164}` `` — `PHONE_E164 = '+529983211547'` already exists in contact.ts exactly for this purpose
- **Impact:** RFC 3966 non-compliance; some mobile dialers fail on numbers without `+` prefix

### C-2: Zero Tier-1 medical directory citations
- **Where:** External — no code fix possible
- **Issue:** Doctoralia MX, Psychology Today MX, Top Doctors MX are all marked PENDIENTE in nap.json
- **Impact:** Whitespark 2026: 3 of top 5 AI visibility factors are citation-related. For healthcare queries in AI Overviews, Perplexity, ChatGPT — absence from Doctoralia is a significant miss
- **Action:** Karen must create profiles. After creation, add URLs to `DIRECTORY_PROFILES` in contact.ts — they auto-propagate to all schema `sameAs` arrays

---

## High Issues

### H-1: Google Maps embed missing from both location pages
- **Where:** `/neuropsicologia-cancun` and `/neuropsicologia-zona-hotelera-cancun`
- **Issue:** Both pages have zero Google Maps iframe. The homepage embed uses the correct CID-referenced iframe (pb=...`0x4042823298a0080b` which is the CID)
- **Impact:** Google's local ranking algorithm uses Maps embeds as a confirmation signal that the address claimed in schema matches a verified GBP location. Pages designed to rank for geographic queries need this signal.
- **Fix:** Copy the same `<iframe>` from the homepage location section into both location pages, ideally in a dedicated "Cómo llegar" section before the FAQ

### H-2: `/neuropsicologia-zona-hotelera-cancun` uses wrong schema @type
- **Where:** `neuropsicologia-zona-hotelera-cancun.tsx` line 158
- **Issue:** `@type: 'LocalBusiness'` — should be `['MedicalBusiness', 'MedicalClinic']` to match the homepage and correctly represent the healthcare context
- **Impact:** Wrong schema subtype is Whitespark's #1 negative ranking factor (score: 176). Even on a secondary page, the type mismatch can confuse entity resolution.
- **Fix:** Change to `'@type': ['MedicalBusiness', 'MedicalClinic']`

### H-3: `aggregateRating` not nested inside `MedicalBusiness` node on homepage
- **Where:** `index.tsx` schema `@graph`, lines 254–260
- **Issue:** `AggregateRating` is a standalone node with `itemReviewed: { '@id': '/#physician' }` — points to the Physician, not the clinic entity. Google's Rich Results Test expects `aggregateRating` nested inside the business entity for local search rich results.
- **Fix:** Add `aggregateRating` as a nested property inside the `MedicalBusiness` node (in addition to, or instead of, the standalone node)

### H-4: Missing `geo` and `hasMap` on zona-hotelera LocalBusiness schema
- **Where:** `neuropsicologia-zona-hotelera-cancun.tsx` schema
- **Issue:** The `LocalBusiness` node has no `geo: { '@type': 'GeoCoordinates', ... }` and no `hasMap` property
- **Fix:** Add both from the `GEO` constant in site.ts and the Maps CID URL from contact.ts

### H-5: Bing Places and Apple Business Connect not claimed
- **External action required**
- Bing Places powers ChatGPT local recommendations, Bing Copilot, and Alexa. Apple Business Connect powers iPhone Maps (27% browser share per BrightLocal 2026).
- These are external actions Karen must take. No code change can fix this.

---

## Medium Issues

### M-1: Review `datePublished` values are index-derived, not actual dates
- **Where:** `index.tsx` lines 261–268
- **Code:** `` datePublished: `2025-0${i + 1}-15` `` — produces 2025-01-15 through 2025-06-15
- **Issue:** These are synthetic dates tied to array index. If reviews are reordered, dates shift. Google can cross-reference review dates with GBP API data.
- **Fix:** Add a `date` field to each `Review` object in the `reviews` array and use actual approximate dates from when the reviews were posted on Google

### M-2: No Google Maps embed or directions link on `/neuropsicologia-cancun`
- (Partially overlaps H-1 but the directions link `google.com/maps/dir` is also absent)
- The CTA at the bottom of the page provides WhatsApp contact but no map or directions. A user landing on this page cannot navigate to the office.

### M-3: Footer copyright shows 2025, not 2026
- **Where:** `Footer.tsx` line 138
- **Issue:** `© 2025 Karen Trujillo` — today is 2026-06-18. Stale copyright year signals the site may not be actively maintained.
- **Fix:** Update to `© {new Date().getFullYear()} Karen Trujillo` for automatic year updating

### M-4: `nap.json` phone format inconsistency with schema
- nap.json: `"+52 998 321 1547"` (with spaces, with +)
- Schema `telephone`: `"+529983211547"` (no spaces, E.164)
- For directory submissions, the spaced format is human-friendly. But submitters should use E.164 in schema-aware directories.
- **Fix:** Add a `phoneE164` field to nap.json: `"+529983211547"` alongside the human-readable version

### M-5: `sameAs` missing from zona-hotelera LocalBusiness schema
- Without `sameAs` pointing to GBP CID, social profiles, or the homepage entity, Google cannot confidently link this page's schema to the same business entity as the homepage
- **Fix:** Add `sameAs: SOCIAL_PROFILES` (from contact.ts) to the LocalBusiness node in zona-hotelera schema

### M-6: No landmark references in location pages
- The `/neuropsicologia-cancun` page and the homepage address section reference "SM200" (supermanzana code) but no nearby landmarks (nearby shopping centers, hospitals, or major roads visible from Cancún)
- The zona-hotelera page mentions "bulevar Kukulcán" (strong) but the main consultorio location section only has the SM200 address
- **Opportunity:** Add 1–2 sentences like "A 5 minutos del Walmart SM200" or "frente al... [nearest recognizable landmark]" in the LocationSection HTML

### M-7: `prefers-reduced-motion` not handled in `SectionReveal` on location pages
- **Where:** `neuropsicologia-cancun.tsx` and `neuropsicologia-zona-hotelera-cancun.tsx` — both define their own local `SectionReveal` component
- **Issue:** These local versions do NOT check `window.matchMedia('(prefers-reduced-motion: reduce)')` before setting up the IntersectionObserver animation — the homepage `SectionReveal` does check it. This is an accessibility regression specific to the two location pages.
- **Fix:** Either import a shared `SectionReveal` component or add the `prefers-reduced-motion` check to both local versions

---

## Low Issues

### L-1: Business name not fully consistent across surfaces
- Schema: "Neuropsicóloga Karen Trujillo — Consultorio de Neuropsicología"
- nap.json: "Neuropsicóloga Karen Trujillo"
- Footer brand: "Karen Trujillo" (no title in the `<p>` text, title is in the subtitle)
- GBP listing name (inferred from Maps iframe title): "Psicóloga Karen Trujillo | Neuropsicología: TDAH y Autismo"
- The GBP name "Psicóloga" vs. schema "Neuropsicóloga" is a low-level inconsistency — recommend checking the GBP profile name directly and ensuring it matches the site's terminology ("Neuropsicóloga")

### L-2: `og:image` dimensions are non-standard for local business sharing
- All pages use `og:image` pointing to `KAREN_IMAGE` (portrait photo, 465×533px)
- Standard OG image for local business is 1200×630 landscape
- When shared on Facebook, WhatsApp previews, or Messenger, the portrait will be cropped awkwardly
- This was flagged as T-02 pending in the previous audit session

### L-3: `SpeakableSpecification` present but limited
- The homepage schema includes a `SpeakableSpecification` with CSS selectors `['#servicios', '#sobre-mi', '#ubicacion']`
- This is a positive signal for voice search and AI assistants reading local business content
- Opportunity: ensure the `#ubicacion` section explicitly states the full NAP in speakable text format (it currently does via the address block)

### L-4: Blog articles missing `dateModified` in schema
- Cannot fully assess without reading all blog files, but `MedicalWebPage.lastReviewed` on the homepage is `'2026-06-04'` — recent and accurate.
- Blog posts should include `datePublished` and `dateModified` in their structured data for freshness signals

### L-5: `robots.txt` blocks `Google-Extended`
- **Where:** `public/robots.txt` line 32: `User-agent: Google-Extended / Disallow: /`
- `Google-Extended` is the crawler for Google's AI training (Bard/Gemini). Blocking it does NOT affect Google Search or AI Overviews indexing.
- This is intentional content protection — not an error — but worth confirming Karen consents to this tradeoff (content protected from AI training but included in AI Overviews via standard Googlebot)

---

## Top 10 Prioritized Actions

| Priority | Action | Effort | Impact | Who |
|----------|--------|--------|--------|-----|
| 1 | **Fix `tel:` links to use `PHONE_E164`** — replace `` `tel:${PHONE_NUMBER}` `` with `` `tel:${PHONE_E164}` `` in FloatingButtons.tsx and all service pages | 30 min | High — RFC 3966 compliance, mobile dialing reliability | Developer |
| 2 | **Create Doctoralia MX profile** — highest-impact Tier-1 medical directory for Mexico | 2 hrs | Critical — #1 missing citation | Karen |
| 3 | **Add Google Maps embed to `/neuropsicologia-cancun`** — copy iframe from homepage location section | 20 min | High — local signal on key ranking page | Developer |
| 4 | **Fix schema @type on zona-hotelera page** — change `'LocalBusiness'` to `['MedicalBusiness', 'MedicalClinic']` | 5 min | High — wrong type is #1 negative factor | Developer |
| 5 | **Nest `aggregateRating` inside the `MedicalBusiness` node on homepage** — add it as a property of the clinic entity, not just as a standalone graph node | 10 min | High — rich result eligibility | Developer |
| 6 | **Add `geo`, `hasMap`, `sameAs` to zona-hotelera LocalBusiness schema** | 15 min | High — completes the schema entity | Developer |
| 7 | **Claim Bing Places for Business** | 30 min | High — ChatGPT local + Copilot coverage | Karen |
| 8 | **Claim Apple Business Connect** | 30 min | High — iPhone Maps, 27% browser share | Karen |
| 9 | **Fix `Review.datePublished` to use real dates** — add actual date strings to each review object | 30 min | Medium — schema credibility | Developer |
| 10 | **Create Psychology Today MX profile + Top Doctors MX profile** — after Doctoralia | 2 hrs each | Medium — AI visibility citation signals | Karen |

---

## Limitations Disclaimer

This audit was performed exclusively from source code analysis. The following could not be assessed:

- **Live GBP profile status:** Cannot confirm the current state, completeness score, categories, photos count, or posts activity on the actual Google Business Profile
- **GBP primary category:** Cannot verify what the GBP primary category is set to (this is the #1 ranking factor per Whitespark 2026). "Neuropsicólogo" or "Psicólogo" — the category name in GBP must be verified directly in the GBP dashboard
- **Actual review velocity:** Cannot determine when the last Google review was posted
- **Citation consistency on third-party directories:** Cannot fetch live pages from Yelp, BBB, or any directory
- **Local pack rankings:** Cannot determine current ranking positions for target keywords in Cancún
- **Core Web Vitals / page speed:** Not assessed (affects local pack indirectly)
- **GBP posts activity:** Cannot see if Karen is posting weekly GBP posts (a supplementary ranking signal)
- **Backlink profile:** No access to link data — the 40/100 Local Authority score reflects the absence of verifiable citation links, not a confirmed absence of all local links
