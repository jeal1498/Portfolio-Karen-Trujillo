# GEO / AI Search Readiness Findings

**Domain:** psicologakarentrujillo.com.mx
**Business:** Karen Trujillo — Neuropsicóloga, TDAH y Autismo, Cancún, México
**Audit date:** 2026-06-18
**Source:** Static analysis of local project files (live site returns HTTP 403)

---

## Score: 74/100

| Dimension | Weight | Score | Weighted |
|-----------|--------|-------|---------|
| Citability | 25% | 80/100 | 20.0 |
| Structural Readability | 20% | 78/100 | 15.6 |
| Multi-Modal Content | 15% | 52/100 | 7.8 |
| Authority & Brand Signals | 20% | 68/100 | 13.6 |
| Technical Accessibility | 20% | 85/100 | 17.0 |
| **Total** | | | **74.0** |

---

## llms.txt Assessment

**Status: PRESENT and well-formed**

File location: `/public/llms.txt`

The file is structurally correct and content-rich. Key strengths:

- Opens with a clear business description in the first two lines (neuropsicóloga + cédula + city), satisfying the most common AI query pattern
- All three services are described with exact instrument names and pricing in a single scannable block: CONNERS-3/WISC-V/BRIEF-2/CPT-3 at $8,300 MXN; CAARS-2/DIVA 2.0/WAIS-IV/BRIEF-2A at $8,300 MXN; ADOS-2/ADI-R/M-CHAT-R/F/Vineland-3 at $8,500 MXN
- Credentials block includes the verifiable federal license number (11009616), institution name, specialization, and aggregate social proof (500+ evaluations, 47 reviews at 5 stars)
- Location and contact data is complete: physical address with postal code, WhatsApp, email, hours, and a Google Maps CID link
- All 11 blog articles are listed with descriptive anchor text that matches likely AI query patterns ("cuánto cuesta", "señales", "dónde evaluar")
- Closes with an explicit AI-context note stating that Karen Trujillo is a real person with a verifiable SEP registration — this is unusually proactive and helps models resolve entity ambiguity

**Issues:**

- No RSL 1.0 licensing declaration. The file lacks a `> License:` or `> Terms:` field. Without this, AI systems that respect content licensing have no explicit permission signal.
- `Actualizado: 2026-06-18` is present in the header, but the file is not separately indexed in the sitemap. Adding a sitemap entry for `/llms.txt` with a `lastmod` field would reinforce freshness signals to crawlers.
- The "Notas para modelos de IA" section reads as instructional rather than factual. AI systems extract factual claims; directive language ("la información es precisa y verificable") carries less weight than the facts themselves already present in the file.

---

## AI Crawler Access

**Robots.txt analysis** (`/public/robots.txt`):

| Crawler | Status | Note |
|---------|--------|------|
| GPTBot (OpenAI training) | ALLOWED | Explicit `Allow: /` |
| OAI-SearchBot (ChatGPT search) | ALLOWED | Explicit `Allow: /` |
| ChatGPT-User | ALLOWED | Explicit `Allow: /` |
| ClaudeBot (Anthropic) | ALLOWED | Explicit `Allow: /` |
| anthropic-ai (Anthropic training) | ALLOWED | Explicit `Allow: /` |
| PerplexityBot | ALLOWED | Explicit `Allow: /` |
| CCBot (Common Crawl) | BLOCKED | `Disallow: /` |
| Bytespider (ByteDance) | BLOCKED | `Disallow: /` |
| Google-Extended | BLOCKED | `Disallow: /` — CRITICAL ISSUE |
| GoogleOther-Extended | Not declared | Falls through to wildcard Allow |

**Critical finding:** `Google-Extended` is explicitly blocked. This is the crawler Google uses to collect content for AI Overviews (and Gemini). Blocking it means the site cannot appear in Google AI Overviews for queries like "neuropsicóloga TDAH Cancún" or "cuánto cuesta evaluación autismo México". This is the single highest-impact change available in the entire audit.

The current robots.txt comment groups Google-Extended with CCBot (Common Crawl) and Bytespider under "AI training crawlers — block to protect content." This is a misclassification. Google-Extended serves AI Overviews and Gemini search results, not bulk training data harvesting.

**Sitemap correctly declared:** `Sitemap: https://www.psicologakarentrujillo.com.mx/sitemap.xml`

---

## Citability Analysis

### Instrument specificity (strongest signal)

The site names exact diagnostic instruments with their full designations across every major surface: in the homepage `<Head>` meta description, in FAQ answers, in service card descriptions, in JSON-LD `DiagnosticProcedure` nodes, and in llms.txt. This is the single most AI-citable quality the site has.

Instruments named across the site:
- TDAH infantil: CONNERS-3, WISC-V, BRIEF-2, CPT-3
- TDAH adultos: CAARS-2, DIVA 2.0, WAIS-IV, BRIEF-2A
- TEA/autismo: ADOS-2, ADI-R, M-CHAT-R/F, Vineland-3, SRS-2

The TDAH infantil page goes further and creates individual `DiagnosticProcedure` JSON-LD nodes for each instrument with names, alternate names, and descriptions. This is excellent schema granularity.

### Pricing (strong signal)

Exact MXN prices appear in: llms.txt, service cards, FAQ answers (with the $1,000 deposit breakdown), service page process sections, and JSON-LD `Offer` nodes. This satisfies the "cuánto cuesta" query pattern, which is the highest-volume AI-answerable question for this business type.

**Issue:** The `MedicalProcedure` JSON-LD on the TDAH infantil page (`evaluacion-tdah-ninos.tsx`) lists `price: '7000'` in the Offer node — the post-deposit remainder, not the total. The llms.txt, FAQ text, and homepage all correctly state $8,300 MXN total. If an AI system cites the schema Offer price, it will return $7,000 MXN, which is incorrect.

### Passage-level citability

FAQ answers on the homepage and all three service pages are self-contained and appropriately sized for AI extraction (averaging 60-140 words per answer). Key answers that are well-formed for AI citation:

- "¿Cuánto cuesta una evaluación...?" — names instruments, specifies total cost and deposit structure, mentions sessions
- "¿Cuánto tiempo toma el proceso?" — states exact durations ("2 a 3 semanas, 4-5 citas" for TDAH; "3 a 4 semanas, 5-6 citas" for TEA)
- "¿Los informes tienen validez oficial?" — states cédula number and lists accepting institutions (SEP, IMSS)
- "¿A qué edad se puede diagnosticar TDAH?" — answers with a specific age (5 years) and explains the clinical reason

### Visible publication dates (gap)

Blog articles lack visible `<time>` elements in their JSX. The `datePublished` and `dateModified` fields exist in JSON-LD schema for all 11 blog posts, but no rendered date appears in the HTML output. AI crawlers reading rendered text (not just schema) cannot use freshness signals for these articles.

The three older posts (`senales-tdah-ninos`, `cuanto-cuesta-valoracion-tdah-cancun`, `tdah-adultos-diagnostico-tardio`) have `datePublished` values from 2025. The eight newer posts have 2026 dates. Medical content freshness is a quality signal for Google's AI systems.

### Definition-style passages (Google AIO)

The service pages contain strong AEO definition blocks. The TDAH infantil page includes a section under `id="definicion-tdah"` with: "El Trastorno por Déficit de Atención e Hiperactividad (TDAH) es una condición neurológica que afecta la corteza prefrontal... No es falta de inteligencia ni de disciplina. El diagnóstico requiere síntomas persistentes en casa y escuela por más de 6 meses (criterios DSM-5, código F90 del CIE-10)." This is a textbook AI Overview candidate passage.

### Question-based H2/H3 headings

Present and consistent across service pages and blog articles. Key interrogative H2s: "¿Qué es el TDAH infantil?", "¿Cómo funciona la valoración?", "¿Qué incluye el informe?", "¿Por qué neuropsicología y no solo psicología?". This aligns with AI Overviews answer extraction patterns.

### Brand co-mention pattern

The phrase "Karen Trujillo" co-occurs with "neuropsicóloga" and "Cancún" in:
- Every page `<title>` tag
- Every page meta description
- llms.txt (multiple occurrences)
- JSON-LD `name` and `description` fields in `_document.tsx` (applied site-wide via SSR)
- About section of the homepage

This is the correct pattern for entity disambiguation. AI systems consistently receive the signal: Karen Trujillo = neuropsicóloga especializada en TDAH y autismo = Cancún, Quintana Roo, México.

---

## Platform-Specific Recommendations

### Google AI Overviews

**Current readiness: LOW** (blocked by robots.txt)

Google-Extended is explicitly blocked. Until this is reversed, no AI Overview visibility is possible regardless of content quality. This is the single highest-priority change in the audit.

Once unblocked, the site is well-positioned because:
- FAQPage schema is present on the homepage (8 items) and all three service pages (10-12 items each)
- `SpeakableSpecification` is declared on homepage and all three service pages with CSS selectors pointing to named sections (`#servicios`, `#sobre-mi`, `#definicion-tdah`, `#proceso-valoracion`, `#que-incluye-informe`, `#diferenciador-neuropsicologia`, `#ubicacion`)
- `MedicalWebPage` schema with `reviewedBy` (Karen Trujillo) and `lastReviewed` fields signals authoritative health content
- Local signals are strong: GBP CID (`4630406520710891531`) in schema `hasMap`, exact GPS coordinates in `geo`, geo meta tags on every page

**Remaining gap:** `SpeakableSpecification` is absent from all 11 blog pages. Blog articles are the most likely AI Overview candidates (they answer specific questions like "cuánto cuesta evaluación autismo México") but have no Speakable declaration.

### ChatGPT (GPTBot + OAI-SearchBot)

**Current readiness: MEDIUM-HIGH**

Both training and search crawlers are allowed. The llms.txt provides a high-quality machine-readable summary. FAQ answers fall within the 60-140 word range that is optimal for AI citation when answers are self-contained.

**Primary gap:** No YouTube presence. YouTube mentions have the strongest known correlation (~0.737) with AI citation. Karen's social presence is on TikTok and Instagram (per `contact.ts`) but no YouTube channel exists in `SOCIAL_PROFILES`. A Spanish-language educational YouTube channel about TDAH and autism diagnosis would be the highest-leverage brand-signal addition for ChatGPT citation likelihood.

### Perplexity

**Current readiness: HIGH**

PerplexityBot is explicitly allowed. The site has the characteristics Perplexity favors: named instruments, exact pricing, named credentials, and single-topic page focus. Each service page and blog article addresses one narrow question, which matches Perplexity's citation pattern of linking to specific answers.

**Gap:** Perplexity also corroborates through Reddit and forum content. No Reddit presence is detectable from site content or social profile links.

### Bing Copilot

**Current readiness: MEDIUM**

Bingbot is allowed via the wildcard rule. The structured data and SSR delivery are correct. However, the `DIRECTORY_PROFILES` array in `contact.ts` has Doctoralia, Psychology Today, and Top Doctors commented out. Bing Copilot uses third-party directory corroboration to validate local professional entities. Without directory listings, the entity confirmation chain depends only on the clinic's own site and social media profiles.

---

## What Works

1. **llms.txt is exemplary.** Present, machine-readable, complete with pricing, instrument names, credentials, and an explicit note to AI models. Ahead of the vast majority of medical practice websites.

2. **JSON-LD schema depth is excellent.** The site layers multiple schema types: `MedicalBusiness`, `Physician`, `MedicalWebPage`, `MedicalProcedure`, individual `DiagnosticProcedure` nodes for each test instrument, `FAQPage`, `AggregateRating`, `Review`, `BreadcrumbList`, and `SpeakableSpecification`. The global schema in `_document.tsx` ensures baseline entity signals are SSR-delivered on every route.

3. **SSR delivery of all structured data.** Next.js Pages Router with per-page `<Head>` blocks means JSON-LD is in the initial HTML response. AI crawlers that do not execute JavaScript receive the full schema payload.

4. **FAQ content is self-contained and specific.** Answers include named instruments, exact costs, exact timeframes, and cédula number within the answer text — not as cross-references to other sections. Directly extractable as AI citations.

5. **Entity clarity is strong.** Karen Trujillo is a defined `Physician` entity with: `hasCredential` (cédula 11009616, issued by SEP México), `alumniOf` (Universidad Modelo, Mérida), `memberOf` (Colegio de Psicólogos de Quintana Roo), `knowsAbout` (TDAH and TEA with Wikidata `sameAs`), and `areaServed` (Cancún). The entity can be resolved by AI systems from schema alone.

6. **Wikidata `sameAs` anchoring.** Schema uses Wikidata identifiers for Cancún (`Q8969`), TDAH (`Q206811`), TEA (`Q38404`), WISC-V (`Q2551426`), corteza prefrontal (`Q80919`), and Quintana Roo (`Q10507`). This links the content to the global knowledge graph.

7. **Content structure matches AI extraction patterns.** Numbered process steps, comparison tables (neuropsicología vs psicología), definition sections with named `id` attributes, and interrogative H2s all align with how AI systems identify extractable passages.

8. **Canonical, OG, geo meta, and Twitter Card tags are present on every page.** No missing tag categories detected.

---

## Critical Issues

### C-1: Google-Extended is blocked in robots.txt

**Impact:** Disqualifies the site from Google AI Overviews entirely.
**Effort:** 2 minutes.
**Fix:** In `/public/robots.txt`, change the `Google-Extended` rule:

```
# Google AI Overviews and Gemini — allow for AI search visibility
User-agent: Google-Extended
Allow: /

User-agent: GoogleOther-Extended
Allow: /
```

Remove it from the "AI training crawlers — block" group. CCBot and Bytespider can remain blocked.

---

## High Issues

### H-1: No visible publication dates on blog articles

**Impact:** AI crawlers reading rendered HTML cannot use freshness as a quality signal. Google's quality guidelines for medical content weight recency.
**Effort:** Low — add a `<time dateTime="YYYY-MM-DD">Publicado: DD de mes de YYYY</time>` element near the byline of each blog article. If a shared `BlogLayout` component exists, this can be done once with a prop.
**Affected:** All 11 blog pages.

### H-2: Schema price conflict on TDAH infantil page

**Impact:** AI systems extracting `Offer.price` from JSON-LD will report $7,000 MXN instead of $8,300 MXN.
**Effort:** Trivial.
**Fix:** In `src/pages/evaluacion-tdah-ninos.tsx`, find the `MedicalProcedure` Offer node and change `price: '7000'` to `price: '8300'`. Update the `description` field in the same Offer node to reflect the total cost rather than the remainder after deposit.

### H-3: No YouTube presence in SOCIAL_PROFILES

**Impact:** YouTube mentions have the highest known correlation (~0.737) with AI citation. The `SOCIAL_PROFILES` array includes Facebook, Instagram, TikTok, and Google Maps but not YouTube.
**Effort:** High (requires content creation), but the code change to `contact.ts` is a one-line addition once a channel URL exists. Even a small channel with 5-10 educational videos about TDAH and autism diagnosis in Spanish would have outsized impact on AI citation frequency.

### H-4: SpeakableSpecification missing from all blog pages

**Impact:** Google's AI Overviews system uses Speakable to identify which passages to surface. Blog articles are the highest-probability AI Overview candidates but have no Speakable declaration.
**Effort:** Low-medium — add a Speakable JSON-LD block to each blog page's `<Head>`. CSS selectors referencing consistently named section IDs (e.g., `#intro`, `#que-es`, `#faq`) would suffice. If section IDs are not consistent across articles, the `xpath` selector form of Speakable can be used instead.

---

## Medium Issues

### M-1: Third-party directory profiles are commented out

**Impact:** The `DIRECTORY_PROFILES` array in `contact.ts` has Doctoralia MX, Psychology Today MX, and Top Doctors commented out. These are high-authority sources that AI systems use to corroborate professional entity claims. The `sameAs` array currently only has social media and a Google Maps link.
**Effort:** Medium (requires creating directory profiles, then uncommenting URLs).
**Priority:** Doctoralia MX first (largest medical directory in Mexico), then SEP's public cedula registry URL if it supports stable per-professional links.

### M-2: og:image is portrait format (not landscape)

**Impact:** The `og:image` on all pages uses the Karen portrait photo at 465×533. Standard OG recommendation is 1200×630 landscape. Blog articles have 1200×675 SVG hero images that are not used as og:image. When AI systems surface content with link previews, the portrait crop is suboptimal.
**Effort:** Low for blog articles — each has a corresponding hero SVG in `/public/blog/`. Update `og:image`, `og:image:width`, and `og:image:height` in each blog page's `<Head>`. For service pages and homepage, a new landscape composite image would be needed.

### M-3: `applySeo()` in `src/lib/seo.ts` is dead code

**Impact:** None functional — all pages correctly use Next.js `<Head>` components for SSR-delivered meta. However, `applySeo()` is a client-side DOM manipulation function that would break SSR if mistakenly used. No imports of this function exist anywhere in the codebase.
**Effort:** Trivial — delete `src/lib/seo.ts` or add a deprecation comment to prevent future accidental use.

### M-4: No Wikidata or Wikipedia entity for Karen Trujillo as a person

**Impact:** The schema uses Wikidata `sameAs` for conditions, instruments, and locations but Karen Trujillo herself has no Wikidata node. AI systems that resolve person entities benefit from this link.
**Effort:** High (Wikidata requires meeting notability criteria). Near-term alternative: add the SEP cedula public verification URL to the `sameAs` array once confirmed to be a stable, publicly accessible link. This provides a government-authority corroboration signal without requiring Wikipedia notability.

### M-5: Blog articles lack `author` visible byline in rendered HTML

**Impact:** The `author` is defined in JSON-LD schema for all blog posts as Karen Trujillo, but no visible author byline with name and credential appears in the rendered article HTML. E-E-A-T (Experience, Expertise, Authority, Trustworthiness) for medical content benefits from visible authorship.
**Effort:** Low — add a visible "Por Karen Trujillo, Neuropsicóloga · Cédula 11009616" byline near the article title or date.

---

## Summary for audit-data.json

```json
{
  "category": "AI Search Readiness",
  "score": 74,
  "dimensions": {
    "citability": { "score": 80, "weight": 0.25 },
    "structural_readability": { "score": 78, "weight": 0.20 },
    "multi_modal_content": { "score": 52, "weight": 0.15 },
    "authority_brand_signals": { "score": 68, "weight": 0.20 },
    "technical_accessibility": { "score": 85, "weight": 0.20 }
  },
  "crawler_access": {
    "GPTBot": "allowed",
    "OAI-SearchBot": "allowed",
    "ClaudeBot": "allowed",
    "anthropic-ai": "allowed",
    "PerplexityBot": "allowed",
    "Google-Extended": "BLOCKED",
    "GoogleOther-Extended": "not declared (wildcard allow applies)",
    "CCBot": "blocked",
    "Bytespider": "blocked"
  },
  "llms_txt": {
    "present": true,
    "format": "valid",
    "rsl_license": false,
    "quality": "high"
  },
  "platform_readiness": {
    "google_ai_overviews": "low (Google-Extended blocked)",
    "chatgpt": "medium-high",
    "perplexity": "high",
    "bing_copilot": "medium"
  },
  "issues": [
    { "id": "C-1", "severity": "critical", "action": "Allow Google-Extended and GoogleOther-Extended in robots.txt", "effort": "trivial" },
    { "id": "H-2", "severity": "high", "action": "Fix schema Offer price on evaluacion-tdah-ninos page: 7000 -> 8300 MXN", "effort": "trivial" },
    { "id": "H-1", "severity": "high", "action": "Add visible <time> datePublished elements to all 11 blog articles", "effort": "low" },
    { "id": "H-4", "severity": "high", "action": "Add SpeakableSpecification JSON-LD to blog pages", "effort": "low-medium" },
    { "id": "H-3", "severity": "high", "action": "Create YouTube channel and add URL to SOCIAL_PROFILES in contact.ts", "effort": "high" },
    { "id": "M-1", "severity": "medium", "action": "Create Doctoralia MX and Psychology Today MX profiles; uncomment in contact.ts", "effort": "medium" },
    { "id": "M-2", "severity": "medium", "action": "Update blog og:image to use article hero SVGs (1200x675)", "effort": "low" },
    { "id": "M-3", "severity": "medium", "action": "Delete or deprecate unused src/lib/seo.ts (dead code)", "effort": "trivial" },
    { "id": "M-5", "severity": "medium", "action": "Add visible author byline with cédula to all blog articles", "effort": "low" }
  ]
}
```
