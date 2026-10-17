# Content Quality Findings
## Score: 78/100

**Site:** psicologakarentrujillo.com.mx
**Business:** Karen Trujillo — Neuropsicóloga especializada en TDAH y Autismo en Cancún
**Audit date:** 2026-06-18
**Methodology:** Source code analysis (live site returns HTTP 403 via Cloudflare). All pages analyzed from `/home/user/Portfolio-Karen-Trujillo/src/pages/`.

---

## E-E-A-T Assessment

### Overall E-E-A-T Score: 81/100

| Factor | Weight | Raw Score | Weighted | Notes |
|--------|--------|-----------|----------|-------|
| Experience | 20% | 75/100 | 15/20 | 500+ evaluations cited, 7+ years; no dated case studies or peer citations |
| Expertise | 25% | 88/100 | 22/25 | Specific instruments named throughout (ADOS-2, WISC-V, CAARS-2, CPT-3); ICD-10 / DSM-5 codes in schema; clear specialization scope |
| Authoritativeness | 25% | 72/100 | 18/25 | Cédula 11009616 visible on every page; Colegio de Psicólogos de Quintana Roo membership; no external citations (journals, professional directories, media mentions) |
| Trustworthiness | 30% | 88/100 | 26/30 | Real address, phone, hours, Google Maps embed; transparent pricing ($8,300–$8,500 MXN); cancellation/refund policy stated; 47 reviews with names; payment methods listed |

### E-E-A-T Signal Inventory

**Credential signals present:**
- Cédula Federal 11009616 (SEP) — displayed in hero badge, stats bar, about section, all service pages, all blog articles, all FAQ answers
- Universidad Modelo, Quintana Roo — named in about section and schema `alumniOf`
- Colegio de Psicólogos de Quintana Roo — named in about section, schema `memberOf`, FAQ on neuropsicologia-cancun.tsx
- Job title "Neuropsicóloga Clínica" consistent across pages

**Instrument specificity (strongest E-E-A-T asset):**
All service pages name instruments with full names and purposes:
- TDAH Infantil: CONNERS-3, WISC-V, BRIEF-2, CPT-3
- TDAH Adultos: CAARS-2, WAIS-IV, BRIEF-2A, CPT-3
- Autismo: ADOS-2, ADI-R, WISC-V, Vineland-3, SRS-2
Each instrument explained in schema `DiagnosticProcedure` with `alternateName`, `description`, and `usedToDiagnose` links.

**Gaps in E-E-A-T:**
- No external links to published research or clinical guidelines cited anywhere
- No author byline or "reviewed by" visible text on blog articles (present in JSON-LD `reviewedBy` but not rendered)
- No university diploma, certification images, or professional directory link
- No publications, press mentions, or speaking engagements listed
- Reviews have names (Mamá de Sofía, Alejandro, etc.) but no source URL or verified platform badge
- "500+ evaluaciones" and "47+ reseñas" are unlinked claims — AggregateRating reviewCount in schema is "47" matching the visible claim, which is good

---

## What Works

1. **Credential specificity is exceptional.** Cédula 11009616 appears in hero, stats bar, about section, CTA final, JSON-LD `credentialId`, and every FAQ answer referencing official validity. This is the correct YMYL trust pattern.

2. **Instrument naming is the site's strongest differentiation.** Every service page, every pricing table, every relevant blog post names the exact tools (ADOS-2, WISC-V, CAARS-2). This creates genuine authority signals that generalist psychology sites cannot replicate.

3. **Pricing is fully transparent.** $8,300 MXN (TDAH) and $8,500 MXN (TEA) are stated in hero sections, service cards, process descriptions, FAQ answers, and the dedicated /precios page. The two-payment structure (anticipo + saldo) and reimbursement policy are explained. This is excellent YMYL practice.

4. **Schema markup is comprehensive and well-structured.** Every service page implements `MedicalWebPage`, `Physician`, `MedicalClinic`, `MedicalCondition`, `DiagnosticProcedure`, `MedicalProcedure`, `FAQPage`, individual `Review` entities, and `AggregateRating`. ICD-10 codes (F90, F84.0) and DSM-5 codes are present. Wikidata `sameAs` links establish entity disambiguation. `lastReviewed` dates are current (2026-06-02 / 2026-06-04).

5. **Reviews include real-seeming named testimonials.** Six reviews in homepage data array include names with relational identifiers (Mamá de Sofía 7 años, Alejandro 34 años, etc.) and service-specific attribution. These read as authentic patient voices, not generic praise.

6. **FAQ depth is strong.** Homepage: 8 FAQ items. Each service page: 10–12 items covering diagnosis age ranges, costs, cancellation, payment, online vs. presential, differential with other conditions. This satisfies the "anxious parent" reading pattern and creates strong AEO/speakable targets.

7. **Blog articles have genuine clinical structure.** Articles analyzed (senales-tdah-ninos, que-es-ados-2-autismo, tdah-adultos-diagnostico-tardio, cuanto-cuesta-evaluacion-autismo-mexico) contain structured symptom lists with real-world examples, myth-busting sections, age-range breakdowns, and comparison tables. These are substantively more specific than typical SEO content.

8. **AEO/speakable implementation.** Each service page and neuropsicologia-cancun carry `speakable` JSON-LD with `cssSelector` targeting the definition, process, instruments, and differentiator sections. This positions the site well for AI citation.

9. **Location signals are thorough.** Full street address, postal code, Google Maps embed, GeoCoordinates, `geo.position` meta tags, and `areaServed` arrays including Cancún, Playa del Carmen, Tulum, Mérida, Quintana Roo.

10. **YMYL boundary management is correct.** Symptom checkers consistently labeled "Herramienta orientativa · No es diagnóstico." Suggests professional evaluation rather than self-diagnosis. Appropriate medical disclaimers are in place.

---

## Critical Issues

### C-1: All title tags exceed 60 characters — 16 out of 18 pages affected

Google truncates titles in SERPs at approximately 580px (roughly 55–60 characters). 16 of 18 pages exceed this threshold:

| Page | Title | Length |
|------|-------|--------|
| Homepage | Neuropsicóloga en Cancún — TDAH y Autismo \| Karen Trujillo · Cédula 11009616 | 76 chars |
| TDAH Niños | Valoración TDAH Infantil en Cancún · Niños 5-17 \| Karen Trujillo | 64 chars |
| TDAH Adultos | Valoración TDAH en Adultos en Cancún · +18 años \| Karen Trujillo | 64 chars |
| Zona Hotelera | Neuropsicóloga para Zona Hotelera y Riviera Maya \| Karen Trujillo Cancún | 72 chars |
| Para Escuelas | Evaluaciones Neuropsicológicas para Escuelas en Cancún \| Karen Trujillo | 71 chars |
| Precios | Precios de Evaluaciones Neuropsicológicas en Cancún \| Karen Trujillo | 68 chars |
| Blog: Señales TDAH | Señales de TDAH en niños: guía para padres \| Neuropsicóloga Karen Trujillo | 74 chars |
| Blog: ADOS-2 | ¿Qué es el ADOS-2? Estándar de oro para diagnosticar autismo \| Neuropsicóloga Karen Trujillo | 92 chars |
| Blog: TDAH Adultos | TDAH en adultos: por qué miles llegan al diagnóstico después de los 30 \| Neuropsicóloga Karen Trujillo | 102 chars |
| Blog: Niñas | TDAH en Niñas: Síntomas que Casi Nadie Detecta \| Neuropsicóloga Karen Trujillo Cancún | 85 chars |
| Blog: Burnout | Burnout vs. TDAH: cómo saber cuál tienes (o si son los dos) \| Karen Trujillo | 76 chars |
| Blog: Inatento | TDAH Inatento: síntomas en niños y adultos \| Neuropsicóloga Karen Trujillo Cancún | 81 chars |
| Blog: Costo TDAH | ¿Cuánto cuesta una valoración de TDAH en Cancún? \| Neuropsicóloga Karen Trujillo | 80 chars |
| Blog: Dónde evaluar | Dónde evaluar TDAH en Cancún: guía para elegir bien \| Karen Trujillo | 68 chars |
| Blog: TDAH/Ansiedad | ¿TDAH o Ansiedad? Diferencias y cómo saber cuál es cuál \| Karen Trujillo Cancún | 79 chars |
| Blog: Costo Autismo | ¿Cuánto cuesta una evaluación de autismo en México? \| Karen Trujillo Cancún | 75 chars |

Within budget (≤60 chars): `/evaluacion-autismo-cancun` (60), `/neuropsicologia-cancun` (59).

The blog articles are worst (92, 102 chars). While Google rewrites truncated titles in SERPs, uncontrolled rewrites can lose keyword priority. The main risk is that the portion after the pipe — the brand identifier "Karen Trujillo" — gets cut, reducing brand recognition in search results.

**Impact:** High. Every page except two shows truncated titles in SERPs.

### C-2: og:image uses portrait photo (465×533) on all pages — not optimized for social sharing

All 18 pages use `KAREN_IMAGE` (`/Psicologa_Karen_Trujillo.webp`, 465×533 pixels) as their `og:image`. Facebook and LinkedIn crop this portrait in a 1.91:1 landscape ratio (1200×630 recommended), producing a badly cropped thumbnail showing the top of Karen's head or torso only. Twitter's `summary_large_image` card requires approximately 2:1 ratio. The blog articles have custom SVG hero images at 1200×675 (correct ratio) but do not use them as `og:image`.

**Impact:** High. Every social share of any page produces a suboptimal preview, reducing CTR from social channels.

---

## High Issues

### H-1: Blog article titles are not visible as bylines or publish dates in rendered content

From code inspection, blog articles carry `lastReviewed` dates in JSON-LD (2026-06-02) and `reviewedBy: physician`, but no visible author byline, publication date, or update date is rendered on the article page itself. Per Google's September 2025 QRG, YMYL health content is expected to show visible authorship and date signals. The JSON-LD is present but human-facing transparency is absent.

**Recommendation:** Add visible "Escrito y revisado por Karen Trujillo, Neuropsicóloga · Cédula 11009616 · Actualizado junio 2026" to each blog article, ideally as a metadata row between the hero and first H2.

### H-2: No external authority links on any page

No page links outward to the DSM-5, ICD-10, WHO, APA, AAP, INEGI, or any clinical guideline. For a YMYL medical site, citing the authoritative source of diagnostic criteria (DSM-5 article on TDAH, WHO ICD-10 code page) substantially strengthens E-E-A-T. The site references DSM-5 and ICD-10 codes extensively in schema and body text but never links to them.

**Recommendation:** Add 2–3 external authority links per service page. Example on evaluacion-tdah-ninos: link "criterios DSM-5" to the APA or NIH resource, link "WISC-V" to Pearson's instrument page.

### H-3: No visible author bio on blog articles

Blog articles show a CTA section for Karen at the bottom of the page on service pages, but from the code of blog articles (senales-tdah-ninos.tsx, que-es-ados-2-autismo.tsx, etc.), there is no rendered "About the author" section within the article body. Google's QRG specifically flags health content from unknown or uncredentialed sources as low-quality. The author is identifiable through schema, but not through visible on-page content within the article.

**Recommendation:** Add a brief author box (photo, name, cédula, specialization, link to /neuropsicologia-cancun) after the article body and before the related-articles section.

### H-4: Schema `Offer.price` on service pages shows $7,000 MXN, not $8,300 MXN

In `evaluacion-tdah-ninos.tsx` and `evaluacion-tdah-adultos.tsx`, the `MedicalProcedure → offers → price` is set to `"7000"` MXN, but the page text, FAQ answers, and all user-visible content correctly state $8,300 MXN. The likely explanation is the $1,000 anticipo was subtracted when populating the offer, but that creates a factual mismatch in structured data that Google may use for rich results pricing. The autismo page correctly shows `"8500"`.

**Recommendation:** Correct the offers price on both TDAH pages to `"8300"` to match the displayed price and avoid misleading rich result snippets.

### H-5: "Disponibilidad limitada" urgency badge may conflict with YMYL tone

Both evaluacion-tdah-ninos and evaluacion-tdah-adultos display an animated pulsing badge reading "Disponibilidad limitada · Cancún · Niños 5-17 años." Google's September 2025 QRG flags artificial urgency tactics on health/medical YMYL pages as potentially manipulative. This is a subjective call but worth reviewing — if availability genuinely is limited, a static text phrase is safer than an animated pulsing indicator.

---

## Medium Issues

### M-1: Title tags — strategic priority is diluted by brand-plus-cédula pattern

The homepage title `Neuropsicóloga en Cancún — TDAH y Autismo | Karen Trujillo · Cédula 11009616` is 76 characters. Beyond the length issue (C-1), including the cédula number in the title tag is an unusual choice. It reinforces trust but occupies 12 characters that could be used for geographic or topical keywords. The cédula is already well-covered in schema and visible text; the title does not need to carry it.

### M-2: Meta descriptions on some pages are longer than 160 characters

The TDAH Niños description is approximately 165 characters with the CEDULA interpolated. Google truncates at ~155–160 characters. Test with the actual CEDULA value rendered:

- TDAH Niños: "¿Tu hijo no pone atención en la escuela? Valoración neuropsicológica de TDAH infantil en Cancún (5-17 años). Pruebas CONNERS-3, WISC-V. Informe oficial con cédula 11009616. $8,300 MXN. Agenda en línea." = ~202 characters — over limit.
- TDAH Adultos: similar pattern, approximately 195 characters.
- Precios: "Costos de valoración de TDAH y diagnóstico de autismo (TEA) en Cancún. TDAH $8,300 MXN · TEA $8,500 MXN. Incluye todas las sesiones, pruebas e informe clínico. Cédula 11009616." = ~177 characters — over limit.

While Google may rewrite meta descriptions anyway, exceeding 160 chars means Google will never use your written description and will instead generate its own from page content.

### M-3: /neuropsicologia-zona-hotelera-cancun has thin unique content relative to /neuropsicologia-cancun

The zona-hotelera page is functionally a geographic variant of the neuropsicologia-cancun page. Both pages cover: what neuropsychology is, what Karen evaluates, pricing, FAQ about the evaluation process. The zona-hotelera page adds logistics around traveling from outside Cancún (distances, grouping sessions), which is genuinely distinct content. However, the core service descriptions and FAQ answers substantially overlap with neuropsicologia-cancun. Google may evaluate these as near-duplicate pages targeting only slightly different local keywords.

**Recommendation:** Expand zona-hotelera with at least 3 unique sections not present on neuropsicologia-cancun: a neighborhood/route guide from the hotel zone, patient stories explicitly from outside Cancún, and any specific considerations for international visitors (documents, insurance).

### M-4: /para-escuelas has no pricing visible on the page

The para-escuelas page describes the process for school referrals but does not state pricing anywhere. Schools making referral decisions benefit from knowing cost ranges so they can appropriately prepare families. All other pages feature pricing prominently. The omission is a conversion friction point for this audience.

### M-5: Blog index page (/blog) has no article count or category filtering

The blog index lists all articles but provides no count, category navigation, or search functionality. With 11 articles spanning TDAH infantil, TDAH adultos, autismo, and differential diagnosis, users cannot quickly filter to their topic. This also reduces the topical depth signal Google assigns to the blog section.

### M-6: No "last updated" date visible on any service page

Service pages carry `lastReviewed: "2026-06-02"` in JSON-LD but no visible date. For medical content, visible freshness signals reassure anxious parents that the information (especially pricing and instrument names) is current. This is especially relevant given that diagnostic instruments and clinical criteria evolve.

---

## Low Issues

### L-1: Reviews in service pages appear to duplicate homepage reviews

The review set shown on evaluacion-tdah-ninos.tsx (Mamá de Sofía, Papá de Diego, Mamá de Valentina) overlaps with homepage reviews (Mamá de Sofía, Papá de Diego). The TDAH-adultos reviews (Alejandro, Mariana, Roberto) are unique to that page, which is good. The autismo reviews (Mamá de Santiago, Mamá de Emilia, Papá de Mateo) overlap with homepage. Duplicated testimonials across pages are not a serious issue but reduce the richness of social proof if users visit multiple pages.

### L-2: Blog article `cuanto-cuesta-evaluacion-autismo-mexico.tsx` uses Framer Motion `motion` import while all other blog articles use CSS keyframes

This inconsistency means the autismo cost article loads Framer Motion as a dependency while other blog articles optimized it away. This is a minor performance note rather than a content quality issue, but it indicates the article may have been created from an older template.

### L-3: Cal.com booking URL contains placeholder comment "cambiar al URL real de Karen"

In evaluacion-tdah-ninos.tsx, evaluacion-tdah-adultos.tsx, and evaluacion-autismo-cancun.tsx, the `CAL_URL` constant is accompanied by the comment `/* CONFIG — Cal.com URL (cambiar al URL real de Karen) */`. The Cal.com URLs are set to specific paths (`/evaluacion-tdah-infantil`, `/valoracion-tdah-adultos-hibrido`, `/valoracion-autismo-infantil-presencial`). These appear to be real URLs, but the comment suggests they may be placeholders pending verification. If the Cal.com calendar is not actually active, the "Agendar valoración" CTA scrolls to a broken booking section.

### L-4: `Physician` schema has `medicalSpecialty: "Neuropsychiatry"` — misclassification

`Neuropsychiatry` is a medical specialty (MD-level, psychiatry branch). Karen is a licensed psychologist/neuropsychologist, not a physician or psychiatrist. The correct schema.org value for a clinical neuropsychologist would be `Psychology` or `Psychiatry` does not map well to `Psychologist`. This may cause Google to misclassify the practitioner type. A safer approach is to use `jobTitle` only and omit `medicalSpecialty`, or use a custom value in `additionalType`.

### L-5: Missing `hreflang` — not applicable but noted

The site is entirely in `es-MX`. No hreflang is needed. Noted as confirmed non-issue.

---

## Per-Page Summary Table

| Page | Title Length | Meta Desc OK | H1 | Content Depth | E-E-A-T Rating | Primary Issue |
|------|-------------|--------------|-----|---------------|----------------|---------------|
| / (Homepage) | 76 ✗ | OK | One ✓ | Deep — 11 sections, 8 FAQ, 6 reviews, process, services, location | Excellent | Title too long; og:image ratio |
| /evaluacion-tdah-ninos | 64 ✗ | Over 160 ✗ | One ✓ | Very deep — 12 FAQ, 5-step process, instrument list, comparison table, 3 reviews, about section | Excellent | Title length; meta desc truncation; schema price mismatch ($7,000 vs $8,300) |
| /evaluacion-tdah-adultos | 64 ✗ | Over 160 ✗ | One ✓ | Very deep — 12 FAQ, 5-step process, instrument list, comparison table, 3 reviews, about section | Excellent | Title length; meta desc truncation; schema price mismatch |
| /evaluacion-autismo-cancun | 60 ✓ | OK | One ✓ | Very deep — 12 FAQ, 5-step process, 5 instruments, ADOS-2 differentiator, 3 reviews | Excellent | None significant; best-optimized service page |
| /neuropsicologia-cancun | 59 ✓ | ~190 chars ✗ | One ✓ | Good — what neuropsychology is, 4 differentiators, 5 conditions, 6 FAQ, Karen profile | Strong | Meta desc over 160; no external authority links |
| /neuropsicologia-zona-hotelera-cancun | 72 ✗ | OK | One ✓ | Moderate — logistical content is unique; core service content overlaps neuro-cancun | Moderate | Partial content duplication; title too long |
| /para-escuelas | 71 ✗ | OK | One ✓ | Good — 6 report components, 3 conditions, 4-step referral process, 5 FAQ | Good | No pricing visible; title too long |
| /precios | 68 ✗ | ~177 chars ✗ | One ✓ | Good — 3 evaluation packages with full instrument lists, 6 payment policies, FAQ | Good | Title length; meta desc truncation |
| /blog/senales-tdah-ninos | 74 ✗ | OK | One ✓ | Excellent — 3 symptom categories × 4–6 items with examples, 3 age-range breakdowns, 5 myths, FAQ, CTA | Excellent | Title too long; no visible author byline |
| /blog/que-es-ados-2-autismo | 92 ✗ | OK | One ✓ | Excellent — 4 ADOS modules, 5 "why gold standard" reasons, 3-method comparison, 5-instrument battery, 3 support levels, 5 myths, 6 FAQ | Excellent | Title very long (worst case); no byline |
| /blog/tdah-adultos-diagnostico-tardio | 102 ✗ | OK | One ✓ | Excellent — 3 life-domain categories × 4–5 signals with examples, condition confusion matrix, historical context, FAQ | Excellent | Title longest of all (102 chars); no byline |
| /blog/tdah-en-ninas-sintomas | 85 ✗ | OK | One ✓ | Not fully inspected; structure similar to senales-tdah-ninos | Expected good | Title length; no byline |
| /blog/autismo-nivel-1-sintomas-adultos | ~75 ✗ | OK | One ✓ | Not fully inspected | Expected good | Title length; no byline |
| /blog/burnout-o-tdah-diferencias | 76 ✗ | OK | One ✓ | Not fully inspected | Expected good | Title length; no byline |
| /blog/tdah-inatento-sintomas | 81 ✗ | OK | One ✓ | Not fully inspected | Expected good | Title length; no byline |
| /blog/cuanto-cuesta-valoracion-tdah-cancun | 80 ✗ | OK | One ✓ | Not fully inspected | Expected good | Title length; no byline; Framer Motion inconsistency |
| /blog/donde-evaluar-tdah-cancun | 68 ✗ | OK | One ✓ | Not fully inspected | Expected good | Title length; no byline |
| /blog/tdah-vs-ansiedad-diferencias | 79 ✗ | OK | One ✓ | Not fully inspected | Expected good | Title length; no byline |
| /blog/cuanto-cuesta-evaluacion-autismo-mexico | 75 ✗ | OK | One ✓ | Good — cost breakdown, comparison table, FAQ | Good | Title length; no byline; Framer Motion import |

---

## AI Citation Readiness Score: 74/100

### Quotable facts present (strong signals)
- "La valoración neuropsicológica de TDAH infantil en Cancún tiene un costo de $8,300 MXN e incluye 4-5 sesiones presenciales distribuidas en 2 a 3 semanas." — Direct-answer format, ideal for AI citation.
- "El ADOS-2 tiene una sensibilidad superior al 90% en estudios internacionales" — specific, verifiable statistic.
- "60–70% de los niños con TDAH mantienen síntomas significativos en la adultez" — quantified claim.
- "El anticipo de $1,000 MXN forma parte del costo total de $8,300 MXN" — FAQ-style direct answer.
- ICD-10 codes F90 (TDAH), F84.0 (TEA) and DSM-5 codes 314.01, 299.00 in schema and body text.
- "El TDAH es una condición neurológica que afecta la corteza prefrontal, la zona responsable de planificar, organizarse y regular emociones. No es falta de inteligencia ni de disciplina."

### Gaps reducing AI citation readiness
- Statistics are cited without source (e.g., "60–70% de los niños con TDAH" appears on tdah-adultos but no reference to the study). AI models and Google's citation systems prefer claims linked to authoritative sources.
- No structured "Key Facts" or "En resumen" summary boxes at the top of long articles to give AI a clear extraction target.
- `speakable` JSON-LD targets CSS selectors correctly on service pages, but blog articles do not appear to have `speakable` schema from the inspected files. Adding speakable to the definition and FAQ sections of blog articles would increase citation probability.
- Lack of a clear entity page for Karen Trujillo (the /neuropsicologia-cancun page functions as one, but it does not have explicit `sameAs` links to her LinkedIn, Google Scholar, or professional directory profile).

---

## YMYL Compliance Assessment

**Rating: Meets threshold, with noted gaps**

The site correctly handles YMYL responsibility:
- Medical claims are appropriately scoped (diagnosis requires professional evaluation)
- Symptom checkers labeled "No es diagnóstico"
- All diagnostic claims attributed to named clinician with federal credential
- Pricing and policies are transparent
- No unverified health claims or treatment promises beyond scope of diagnostic practice

**Remaining YMYL gaps:**
- No privacy policy page found in `/src/pages/` — health-related lead capture (WhatsApp CTAs collect intent signals) should have a privacy statement visible to users.
- No emergency disclaimer or "if in crisis" referral for mental health contexts.
- The cédula 11009616 is verifiable at the SEP Cédulas Profesionales registry, but no link to that verification is provided. Adding a verifiable link would significantly strengthen trust.

---

## Prioritized Action List

**Fix immediately (Critical):**
1. Shorten all blog article titles to ≤60 characters — start with the two worst (102, 92 chars).
2. Correct `MedicalProcedure → offers → price` to `"8300"` on evaluacion-tdah-ninos and evaluacion-tdah-adultos.
3. Create OG-optimized landscape images (1200×630) for the 8 main pages (homepage + 3 service + 2 neuropsicología + precios + para-escuelas).

**Fix within 2 weeks (High):**
4. Add visible author byline + publication date to all 11 blog articles.
5. Add 2–3 external authority links per service page (DSM-5, APA, NIH, or WHO).
6. Shorten remaining titles exceeding 60 chars (homepage, Zona Hotelera, Para Escuelas, Precios, service pages).
7. Shorten meta descriptions to ≤155 characters on pages where they exceed this (TDAH Niños, TDAH Adultos, Neuropsicología Cancún, Precios).

**Fix within 1 month (Medium):**
8. Add a Privacy Policy page.
9. Expand /neuropsicologia-zona-hotelera-cancun with unique content not present on /neuropsicologia-cancun.
10. Add a visible "Última actualización" date to all service pages.
11. Add price information to /para-escuelas.
12. Add a link to SEP cédula verification for cédula 11009616.
13. Add `speakable` schema to blog article FAQ and definition sections.

**Defer / low priority:**
14. Review `medicalSpecialty: "Neuropsychiatry"` classification in schema — consider removing or replacing.
15. Verify Cal.com booking URLs are live and active.
16. Consider de-duplicating reviews across service pages using different testimonials per page.
