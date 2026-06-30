# Search Experience Optimization Findings
## Domain: psicologakarentrujillo.com.mx
## Analysis Date: 2026-06-18
## Analyst: Claude Code (SXO Skill)
## Method: Source-code analysis only (live site returns HTTP 403 via Cloudflare)

---

## SXO Gap Score: 74/100

Breakdown:
- Page Type / Intent Match: 13/15
- Content Depth: 14/15
- UX Signals: 11/15
- Schema: 14/15
- Media: 9/15
- Authority: 12/15
- Freshness: 7/10 (lastReviewed: 2026-06-02 confirmed in schema)

---

## Intent Matching Per Page

### / (Homepage)
Target keyword: "neuropsicóloga en Cancún", "neuropsicóloga TDAH Cancún"
Detected intent: Navigational + Mixed informational/transactional
Page type: Clinical practice homepage with routing hub
Intent match: ALIGNED

The homepage correctly functions as a navigational hub. Above the fold it shows: H1 ("Neuropsicóloga en Cancún"), three routing cards that match the three user archetypes ("Mi hijo tiene problemas de atención", "Sospecho que tengo TDAH", "Mi hijo se relaciona de forma diferente"), primary WhatsApp CTA, and a credential strip (cédula, reviews, years of experience). This is exactly what a parent or adult landing from a branded or navigational query needs. The hero serves intent discovery, not transactional pressure.

Minor gap: The homepage has 12 sections, making the full-page scroll very long. For users with high clarity (they already know what they want), there is no sticky navigation link directly to WhatsApp or a booking anchor until they scroll past the 600px hero threshold.

### /evaluacion-tdah-ninos
Target keyword: "valoración TDAH niños Cancún", "evaluación TDAH infantil Cancún"
Detected intent: Informational + Transactional (hybrid — user needs to understand before booking)
Page type: Service funnel page with embedded booking (Cal.com iframe at #agendar)
Intent match: ALIGNED — STRONG

This is the best-optimized page in the site. The content sequence maps precisely to the anxiety-to-decision journey:
1. Pain points (recognition phase)
2. Symptom checker (self-qualification)
3. Definition of TDAH (informational need)
4. Process in steps (procedural clarity)
5. What the report includes (value justification)
6. Neuropsychology vs. psychology differentiator (objection resolution)
7. Reviews (social proof)
8. Who is Karen (trust/E-E-A-T)
9. What happens after (fear reduction)
10. FAQ with 12 questions (remaining objections)
11. Cal.com booking with price displayed prominently as $8,300 MXN

The hero CTA tracks its own visibility (`heroCTAInView`) and shows a sticky mobile bar when the hero button scrolls out of view — a clinically-sound pattern for anxious parents on mobile.

Gap: The Cal.com URL (`https://cal.com/psicologa-karen-trujillo/evaluacion-tdah-infantil`) is hardcoded as a constant `CAL_URL` that is declared but only used conditionally (lazy-loaded when `calVisible` becomes true). There is no fallback for users with JavaScript disabled or slow connections — they may see an empty booking section. No WhatsApp fallback appears immediately adjacent to the Cal.com iframe as a primary alternative.

### /evaluacion-tdah-adultos
Target keyword: "valoración TDAH adultos Cancún", "TDAH adulto diagnóstico"
Detected intent: Informational + Transactional
Page type: Service funnel page, identical structure to /evaluacion-tdah-ninos
Intent match: ALIGNED

The adult TDAH page mirrors the child page structure effectively. The pain points resonate specifically with adult presentation: work performance, procrastination, relationship friction, and the "something neurological" self-suspicion. The differential diagnosis section (TDAH vs. ansiedad vs. burnout) is especially strong for this audience, who have often been misdiagnosed. The symptom "hyperfocus" being explicitly called out as "regulated attention, not lack of attention" addresses a common reason adults self-dismiss the possibility.

Gap: The adult page has no FAQ item addressing "Will my employer see this?" or "Can I use this for accommodation at work?", which are high-stakes concerns for working adults weighing the decision.

### /evaluacion-autismo-cancun
Target keyword: "evaluación autismo Cancún", "diagnóstico TEA niños Cancún", "ADOS-2 Cancún"
Detected intent: Investigational — comparing options, wanting to understand what "good" looks like before booking
Page type: Service funnel page
Intent match: ALIGNED — STRONG

The autism page leads with "ADOS-2 — estándar de oro internacional" in the hero badge, the headline, and the main subtext. This is the single highest-trust signal for parents who have done research: knowing the evaluator uses the ADOS-2 is the primary differentiator. The page names it before price, before process, before Karen's bio — which is the correct priority.

The definition section includes the three support levels (1, 2, 3) with plain-language descriptions, including the note that Level 1 was "formerly called Asperger." This is exactly the information parents who've read about autism on Wikipedia will need confirmed.

Gap: The page lacks any indication of what happens when a parent is told autism is ruled out but another diagnosis emerges (the FAQ covers this textually, but there is no dedicated section with examples). The investigational user comparing providers needs to know: "What is your process when the first answer is 'no autism but something else'?"

### /precios
Target keyword: "cuánto cuesta evaluación neuropsicológica Cancún", "precio TDAH Cancún", "costo autismo Cancún"
Detected intent: Transactional — user ready to decide, price is the remaining barrier
Page type: Pricing page with three-column cards + payment policy + FAQ
Intent match: ALIGNED

Prices are shown prominently without requiring contact: $8,300 MXN (TDAH) and $8,500 MXN (TEA). Each card shows instruments, what's included, and two CTAs (WhatsApp and "Ver proceso completo"). This is exactly what a transactional-intent user needs: no friction, no "contact us for pricing."

Gaps identified:
1. PAYMENT TERMS DISCREPANCY: The /precios page states "50% al inicio, 50% al entregar el informe" (anticipo = 50%). The service pages (/evaluacion-tdah-ninos, /evaluacion-tdah-adultos) state "anticipo de $1,000 MXN" (anticipo = ~12%). These two descriptions of the same payment policy contradict each other. A user who reads /precios first will expect to pay $4,150 upfront; a user who reads the service page will expect to pay $1,000. This is a trust-breaking inconsistency.
2. No financing or payment plan comparison to competitors — users arriving from a price query may be comparison shopping and the page doesn't address why $8,300 is competitive or what cheaper alternatives lack.
3. The /precios page states "No se acepta tarjeta de crédito/débito en consultorio" — this is useful but creates friction. There is no statement about whether SPEI can be done remotely before the first appointment. For users booking the Cal.com slot (which charges an anticipo), there is a mismatch between what the pricing page says and what the booking flow requires.

### /para-escuelas
Target keyword: "neuropsicóloga para escuelas Cancún", "informe TDAH SEP"
Detected intent: B2B informational — educators or school counselors seeking a trusted referral
Page type: Institutional services page
Intent match: ALIGNED for the audience

The page speaks directly to educators/orientadores with language adapted to their context ("adecuaciones curriculares," "validez SEP," "sesión con equipo de orientación"). It includes a referral CTA with a pre-filled WhatsApp message that identifies the sender as a teacher or counselor.

Gap: No downloadable one-page PDF or referral form. Educators who want to share this with parents or administrators need a printable asset. A "Descargar hoja informativa" link would reduce friction significantly for the B2B use case.

### Blog articles
Target keyword: Per-article (e.g., "señales TDAH niños", "TDAH adultos diagnóstico tardío", "cuánto cuesta TDAH Cancún")
Detected intent: Purely informational (awareness/consideration)
Page type: Long-form editorial articles
Intent match: ALIGNED

All 11 blog articles consistently end with a "¿Reconoces estas señales?" or equivalent conversion section that links directly to the relevant service page with the price shown. Example from /blog/senales-tdah-ninos:

  "Ver evaluación TDAH infantil → $8,300 MXN · 4-5 sesiones · Informe con validez oficial"

This is excellent bottom-of-article funnel linkage. The related resources section links to other blog posts (blog-to-blog), but NOT to the service pages in that widget — the service link only appears in the conversion section.

---

## User Journey Analysis

### Journey 1: Anxious parent landing from organic search on "mi hijo no pone atención en la escuela"

1. Likely entry point: /blog/senales-tdah-ninos (informational keyword)
2. Page gives symptom checklist → parent self-qualifies
3. Bottom of page: "Ver evaluación TDAH infantil" → link to /evaluacion-tdah-ninos
4. Service page: symptom checker again → process → price → FAQ → Cal.com iframe or WhatsApp
5. Conversion action: Cal.com booking OR WhatsApp message

Click depth to conversion: 3 clicks (search → blog → service page → WhatsApp/booking)
Assessment: ACCEPTABLE but one click longer than optimal. High-ranking blog traffic could be more aggressively funneled.

### Journey 2: Parent already knowing they want an evaluation, searching "valoración TDAH niños Cancún"

1. Entry point: /evaluacion-tdah-ninos directly
2. Pain points → symptom checker → process → price ($8,300 visible) → Cal.com
3. Click depth to conversion: 1 click (hero CTA → #agendar) + 1 interaction (calendar)
Assessment: EXCELLENT. The hero has a primary CTA ("Agendar valoración") that scrolls to the booking section. Mobile sticky bar appears when hero button exits viewport.

### Journey 3: Adult searcher "¿tengo TDAH adulto?"

1. Entry: /blog/tdah-adultos-diagnostico-tardio or /evaluacion-tdah-adultos
2. The blog article has no sticky CTA and no embedded booking — it links to the service page
3. Service page has the full funnel
Click depth to conversion: 2-3 clicks
Assessment: ACCEPTABLE

### Journey 4: User specifically researching prices

1. Entry: /precios (direct search or navigation from homepage)
2. All prices shown above the fold in three cards
3. WhatsApp CTA within each card
Click depth to conversion: 1 click
Assessment: EXCELLENT

### CTA Visibility Assessment

Homepage: WhatsApp CTA is in the hero and reappears throughout. Mobile sticky bar appears after 600px scroll (past hero). FloatingButtons component is NOT imported on the homepage — the sticky CTA is a custom implementation.

/evaluacion-tdah-ninos, /evaluacion-autismo-cancun, /evaluacion-tdah-adultos: FloatingButtons is NOT imported. Each page uses a custom `heroCTAInView` IntersectionObserver that shows a sticky mobile bar when the hero CTA scrolls out of view. This sticky bar links to `#agendar`, sending users to the Cal.com section — which is correct for conversion.

/precios, /blog/index, and most blog articles: FloatingButtons IS imported (generic Phone + WhatsApp). This is less friction-optimized than the service pages.

INCONSISTENCY: FloatingButtons.tsx uses a generic WhatsApp message ("Hola Psicóloga Karen, vengo de tu web y me gustaría agendar una sesión"). The service pages' hero and sticky CTAs use contextual messages ("vi tu página de valoración TDAH infantil"). Users landing on blog articles from FloatingButtons get a generic message instead of a context-specific one — a missed personalization opportunity.

---

## Anxiety Reduction Signals

This is the most important dimension for the target audience (anxious parents and self-doubting adults). Assessment per signal type:

### Credentials shown early: STRONG
Every page hero contains: cédula federal number (11009616), "7+ años de experiencia", and "47+ reseñas 5 estrellas". The cédula is shown inline in the hero text, in a badge below the photo, in the stats bar below the hero, and in the About section. Repetition is intentional and appropriate for trust-building in a medical context.

### Process explained in steps: STRONG
Every service page has a numbered 5-step process (01-05) with durations per step. The homepage has a 4-step version. Blog articles describe the process in prose. Parents know exactly what will happen before they commit — a primary anxiety reducer.

### Prices shown without requiring contact: STRONG
Prices are shown on: every service page hero area (with Cal.com iframe showing "$8,300 MXN" as large typography), the /precios page with three explicit cards, the homepage service cards, and the bottom of each relevant blog article.

### Social proof before main CTA on service pages: PARTIAL
On /evaluacion-tdah-ninos: testimonials appear in section 7 of ~11, which means a first-time mobile visitor must scroll significantly before reaching them. The hero→symptoms→definition→process sequence delays social proof. The three reviews are authentic and service-specific (names include the child's age: "Mamá de Sofía, 7 años"), which is high-trust. But their position after four heavy content sections means many anxious parents on mobile may never scroll that far.

On the homepage: social proof order is better — it follows services (section 4) and precedes FAQ (section 9), but it is still section 8 of 12.

### Fear address (what happens if it's not TDAH): STRONG
Both service pages explicitly address this in a dedicated section ("¿Qué pasa con los resultados?") with three scenarios: confirmed diagnosis, ruled out + alternatives identified, and mixed/subclinical profile. This is one of the highest-converting anxiety reducers possible — removing the fear of a "negative" result.

### Cancellation policy visible: STRONG
The 48-hour cancellation with reembolso is shown on the /precios page and in each service page FAQ. The service page booking section also has a "risk reversal strip" inside the pricing card.

---

## Conversion Funnel Assessment

### Funnel stages present:
- Awareness entry: 11 blog articles covering top-of-funnel keywords
- Consideration: Service pages with differentiator, process, and FAQ content
- Decision: /precios and service page booking sections

### Funnel gaps:

1. NO EMAIL CAPTURE anywhere on the site. A parent who is not ready to book today has no way to stay in touch. There is no newsletter, no "send me the evaluation guide" lead magnet, no remarketing hook. The only path is WhatsApp or Cal.com — both require immediate intent. A segment of parents in the consideration phase (visiting, researching, not yet ready) leaves with no connection made. This is the largest conversion gap.

2. CAL.COM DEPENDENCY: The primary booking mechanism on service pages is a Cal.com iframe. If Cal.com is slow or the iframe fails to render, the user sees an empty box. The WhatsApp fallback below the iframe is present but secondary in visual hierarchy. Given the target audience (anxious parents, possibly on mobile, possibly with slow connections in Q. Roo), a Cal.com outage or slow load is a real risk.

3. BLOG-TO-BOOKING GAP: Blog articles end with a link to the service page, not directly to the booking section. This adds one more page load and scroll in the journey. For high-intent articles like /blog/cuanto-cuesta-valoracion-tdah-cancun (which targets a transactional keyword), the CTA should link directly to /evaluacion-tdah-ninos#agendar.

4. NO CROSS-SELL PATH between services: A parent of a child with TDAH who is also an adult wondering about themselves has no explicit cross-link from /evaluacion-tdah-ninos to /evaluacion-tdah-adultos. The homepage and /precios are the only pages where all three services appear together.

5. URGENCY SIGNALS: The hero badge says "Disponibilidad limitada · Cancún" on service pages. This is the only urgency signal on the site. There is no "próximas fechas disponibles", no "X lugares disponibles este mes", no waitlist form. For a specialty with genuine limited capacity, more concrete availability signals would increase conversion rates.

---

## What Works

1. ABOVE-THE-FOLD CREDENTIAL DENSITY: The hero of every page leads with the cédula federal number before the main headline on service pages. This is unusual and effective for healthcare — most parents will scan for this credential before reading body copy.

2. SYMPTOM CHECKER INTERACTIVITY: The FunnelSymptomChecker on service pages is a high-engagement conversion element. It shows a result only when signals are selected (reducing initial cognitive load), the result language escalates appropriately ("Una valoración es muy recomendable" at 5+ symptoms), and the CTA below the checker adapts its label ("Tu hijo merece claridad. Agendar" at high symptom count).

3. SCHEMA DEPTH: The schema implementation is among the strongest seen for a solo clinical practice. Each page has: MedicalWebPage, Physician, MedicalClinic, MedicalCondition with ICD-10 and DSM-5 codes, DiagnosticProcedure for each instrument, MedicalProcedure with Offer, AggregateRating, individual Review objects, FAQPage, and BreadcrumbList. SpeakableSpecification targeting specific section IDs for AEO is present on service pages.

4. INSTRUMENT SPECIFICITY: Listing "CONNERS-3, WISC-V, BRIEF-2, CPT-3" (not just "standardized tests") is the single most important trust signal for educated parents who have researched TDAH evaluation. This appears in the hero, the service cards, the process section, the report section, the booking card, and the blog articles. Saturation is appropriate.

5. FAQs ADDRESS REAL OBJECTIONS: The FAQ set on /evaluacion-tdah-ninos (12 questions) covers: age of diagnosis, cost, duration, specific instruments, official validity, TDAH vs. conduct disorder, neuropsychologist vs. psychologist, negative result, cancellation, payment structure, online vs. presential, and installments. This is comprehensive and prioritized correctly — price comes third (after age and duration), indicating understanding of user journey.

6. BREADCRUMB CONSISTENCY: All pages have a visual breadcrumb in the hero and a BreadcrumbList in schema. The blog articles have three levels: Inicio / Blog / Article. This supports both navigation and search appearance.

7. BLOG-TO-SERVICE LINKING: The "¿Qué hacer?" section at the end of each blog article contains a prominent, price-anchored link to the relevant service page. This is the right pattern for converting top-of-funnel readers.

8. DIFFERENTIAL DIAGNOSIS CONTENT: The comparison table (neuropsychology vs. general psychology) appears on all three service pages. This content is rare among competitors, educates the market, and positions Karen as the premium, precise option. It directly addresses the parent's question "why should I pay $8,300 instead of seeing a regular psychologist?"

---

## Critical Issues

### CRITICAL-1: Payment Terms Contradiction Between Pages
Severity: CRITICAL (trust-breaking)
Location: /precios says "50% al inicio, 50% al entregar el informe"; /evaluacion-tdah-ninos FAQ says "anticipo de $1,000 MXN"; /evaluacion-tdah-adultos FAQ says "anticipo de $1,000 MXN"; /evaluacion-autismo-cancun FAQ says "anticipo de $1,500 MXN"

A user reading /precios will expect to pay $4,150 at booking for TDAH. A user reading the service page will expect to pay $1,000. These are contradictory and represent a breaking trust signal at the moment of decision. The schema on /evaluacion-tdah-ninos also shows `"price": "7000"` in the MedicalProcedure Offer (the balance after anticipo), while the user-facing price is $8,300 — a schema-level inconsistency that could produce incorrect rich results.

Recommended fix: Standardize the payment description across all pages. Decide on one official language ("$1,000 MXN de anticipo al agendar, que forma parte del total de $8,300 MXN") and apply it to /precios, all service pages, and the schema objects. Correct the schema price to "8300".

### CRITICAL-2: og:image Dimensions Non-Compliant for Social Sharing
Severity: CRITICAL (social visibility loss)
Location: All pages including /precios, /evaluacion-tdah-ninos, /evaluacion-autismo-cancun, and all blog articles

Every page declares `og:image:width="465"` and `og:image:height="533"`. This is a portrait-format image (465×533). Facebook, WhatsApp, and Twitter/X require a minimum 1200×630 landscape image for proper link preview rendering. A portrait image with these dimensions will be cropped, rendered as a thumbnail, or dropped in favor of other page images. When any page from this site is shared on social media, the preview will either show a tiny portrait thumbnail or a broken preview — a significant loss for word-of-mouth referrals from satisfied parents.

Recommended fix: Create 1200×630 landscape og:image assets for at least the five highest-traffic pages (homepage, three service pages, /precios). Blog articles already have 1200×675 SVG hero images that could serve as og:image. (This is a known gap per project Lesson #7.)

---

## High Issues

### HIGH-1: No Email Capture / Nurture Path
Severity: HIGH (revenue gap)
There is no lead magnet, email capture, newsletter, or any mechanism for parents in the consideration phase to maintain contact without committing to WhatsApp or booking. The consideration-to-decision timeline for parents of children with suspected ADHD or autism can be weeks to months. The site currently has no way to stay present during that window.

Recommended fix: Add a single inline email capture on the homepage (below the Symptom Checker) offering a downloadable PDF: "Guía para padres: qué preguntar en una evaluación neuropsicológica." This creates a low-friction conversion for undecided users while building a list for follow-up.

### HIGH-2: FloatingButtons Missing on Service Pages
Severity: HIGH (mobile conversion gap)
/evaluacion-tdah-ninos, /evaluacion-autismo-cancun, /evaluacion-tdah-adultos, and the homepage do NOT import FloatingButtons. Each service page implements its own sticky mobile bar (`heroCTAInView` observer), which links to `#agendar` rather than WhatsApp. This means mobile users on a service page, between the hero and the booking section, have no always-visible contact option. If the Cal.com iframe fails to load, there is no immediately visible alternative on mobile.

Recommended fix: Either add FloatingButtons to service pages OR ensure the custom sticky bar includes a WhatsApp fallback button alongside the "Agendar" button, so users with booking resistance still have an easy contact path.

### HIGH-3: Blog Articles Link to Service Pages, Not to #agendar
Severity: HIGH (funnel friction)
All blog bottom-of-article CTAs link to /evaluacion-tdah-ninos (the service page root), not to /evaluacion-tdah-ninos#agendar (the booking section). This forces users to load another page and scroll to the booking section — two additional steps for users who arrived from a transactional-intent article like /blog/cuanto-cuesta-valoracion-tdah-cancun.

Recommended fix: Change blog CTA hrefs from `/evaluacion-tdah-ninos` to `/evaluacion-tdah-ninos#agendar` for articles targeting transactional keywords (pricing, "how to book" articles). Keep the service page root link for awareness-stage articles where users still need to read about the service.

### HIGH-4: Social Proof Delayed Too Far Down Service Pages
Severity: HIGH (anxiety gap for mobile users)
On /evaluacion-tdah-ninos, testimonials appear in section 7 of 11 sections. On mobile, the user must scroll through: hero → pain points + symptom checker → TDAH definition → 5-step process → report contents + instruments → neuropsychology differentiator → THEN social proof. At typical reading speeds on mobile, this is 3-4 full screen swipes before the first real-name review appears.

For anxious parents, who are specifically looking for "someone did this and it worked," delaying social proof this far may cause abandonment before conversion.

Recommended fix: Move one featured testimonial (or a mini 3-star strip with name + service tag) immediately below the hero or immediately above the process section. A 2-quote strip immediately after the symptom checker would leverage the moment of highest emotional engagement.

### HIGH-5: Related Resources in Blog Point to Other Blog Posts Only
Severity: HIGH (funnel leak)
The "Recursos relacionados" section at the bottom of every blog article links to other blog articles, never to service pages. On /blog/senales-tdah-ninos, the related resources are: "TDAH en adultos" and "¿Qué es el ADOS-2?". A parent reading the TDAH signals article is most likely to be interested in the /evaluacion-tdah-ninos service page, not the autism article.

Recommended fix: Change at least one related resource card per blog article to point to the most relevant service page instead of another blog post. The blog-to-blog linking is valuable for SEO depth, but the blog-to-service link is what converts.

---

## Medium Issues

### MEDIUM-1: Cal.com Iframe Has No Server-Side Fallback
The booking iframe on service pages lazy-loads via IntersectionObserver. If JavaScript is disabled or the iframe fails (Cal.com downtime, slow connection), users see an empty section with no fallback content. A WhatsApp CTA below the iframe exists but is not visually prominent enough to serve as a primary fallback.

Recommended fix: Add a `noscript` block with a static WhatsApp link that displays when JS is unavailable. Add a visible "Si el calendario no carga, escríbenos" note above or below the iframe with a styled WhatsApp button.

### MEDIUM-2: og:type on Service Pages Declared as "website", Not "service"
All service pages (including /evaluacion-tdah-ninos) declare `<meta property="og:type" content="website" />`. For transactional service pages, a more appropriate type is `"product"` or `"place"`. This is a minor signal but affects how social platforms categorize the shared content.

### MEDIUM-3: Homepage Missing FloatingButtons — Custom Sticky Bar Only Appears on Mobile
The homepage sticky bar (`showStickyCta`) is `md:hidden` — it only appears on mobile. Desktop users above the fold have two CTAs (WhatsApp + "Ver servicios") in the hero, but once they scroll to mid-page, there is no persistent contact method visible on desktop. The Navbar does not include a WhatsApp CTA.

Recommended fix: Add a "Agendar" button to the Navbar sticky header that appears after the hero scrolls out of view, or add a desktop-visible floating button in the lower-right corner.

### MEDIUM-4: Blog Articles Use Illustration SVGs With "Foto ilustrativa" Caption
Twelve out of twelve blog articles have image captions that read "Foto ilustrativa — pendiente de fotografía real." This is visible to site users and signals incomplete production. For a medical professional building trust, placeholder images with explicit "pending" notes reduce perceived professionalism.

Recommended fix: Either remove the caption text or replace the SVG illustrations with real photographs. If SVGs are kept as the final asset, rename the caption to describe the illustration content instead of flagging it as a placeholder.

### MEDIUM-5: /para-escuelas Has No Downloadable Asset
Educators who want to refer students need something to share with parents or bring to their coordinator. No PDF, no referral form, no "solicitar visita informativa" form exists. The page is text-only with a WhatsApp CTA — appropriate for a parent, not efficient for an institutional referral chain.

### MEDIUM-6: Schema Price in /evaluacion-tdah-ninos Offer Object
In the MedicalProcedure schema on /evaluacion-tdah-ninos.tsx, the Offer price is `"7000"` rather than `"8300"`. This appears to be the remainder after the $1,000 anticipo, not the total price. Google may display "MXN 7,000" in rich results for this page rather than $8,300, which would confuse users who then see $8,300 on the page.

---

## Internal Linking Strategy Assessment

Strengths:
- Blog articles link to service pages via bottom-of-article CTAs
- The homepage links to all three service pages (routing cards + CTA final grid)
- /precios links to all three service pages via "Ver proceso completo"
- /para-escuelas links to /evaluacion-tdah-ninos and /evaluacion-autismo-cancun

Gaps:
- Service pages do NOT cross-link to each other. A user on /evaluacion-tdah-ninos who realizes they also want the autism evaluation must navigate back to the homepage or /precios.
- Service pages do NOT link to blog articles — there is no "Leer más sobre TDAH infantil" within the body text. This misses an opportunity to improve dwell time and topical authority.
- /para-escuelas is not linked from any other page except the Navbar. No blog article mentions the school referral service.
- The Navbar links are not visible in the source code I analyzed (Navbar.tsx not read), but based on the CLAUDE.md, the site has a standard sticky navbar that presumably includes main navigation.

---

## Above-the-Fold Content Summary

### Homepage (desktop)
Visible before scroll: dark plum hero with H1 "Neuropsicóloga en Cancún", credential strip, three routing cards, WhatsApp CTA + "Ver servicios" CTA, photo of Karen with badge. Assessment: Excellent credential density, clear routing.

### /evaluacion-tdah-ninos (desktop)
Visible before scroll: breadcrumb, "Disponibilidad limitada" badge, H1 "Valoración TDAH Infantil en Cancún", emotional subtitle "Por fin, claridad sobre lo que le pasa a tu hijo", subheadline with instruments named, cédula + years, two CTAs ("Agendar valoración" + "¿Mi hijo podría tener TDAH?"), three trust badges. Assessment: Strong. Name of condition, specificity of instruments, and emotional hook all above the fold.

### /evaluacion-autismo-cancun (desktop)
Visible before scroll: identical pattern to TDAH page with "ADOS-2 — estándar de oro internacional" in badge, H1 "Evaluación de Autismo en Cancún", "Entender cómo ve el mundo tu hijo cambia todo". Assessment: Strong. The ADOS-2 badge is the highest-differentiating element and appears first.

### /precios (desktop)
Visible before scroll: dark plum header, H1 "Inversión en el diagnóstico correcto", trust badges (sin cobros ocultos, cédula federal, validez SEP/IMSS, reembolso). Note: the actual price cards are NOT above the fold — they are in the section below. A user landing on /precios must scroll to see the prices.

Gap: The H1 on /precios does not state any price. A user who lands from a keyword like "cuánto cuesta valoración TDAH Cancún" gets a heading and trust badges but no price until they scroll. This is a friction point for transactional-intent queries. Recommend adding a price anchor ("Valoración TDAH desde $8,300 MXN") to the header section subtitle.

---

## FAQ Effectiveness Assessment

The FAQ sections across pages address the following real objections of anxious parents:

Covered well:
- "¿Cuánto cuesta?" → answered with exact prices on every page
- "¿Cuánto tarda?" → answered with week-by-week duration
- "¿Qué pruebas?" → answered with all 4-5 instrument names
- "¿Tiene validez el informe?" → covered with SEP/IMSS examples
- "¿Lo puede hacer mi hijo online?" → explicitly answered (presencial required for tests)
- "¿Qué pasa si no tiene TDAH?" → covered with three outcome scenarios
- "¿Puede cancelar?" → covered with 48h rule
- "¿Puede pagar a plazos?" → covered (two-payment structure described)
- "Neuropsicólogo vs psicólogo" → covered with comparison table

Objections NOT covered in FAQ that the target audience likely has:
- "¿Cómo sé que el diagnóstico es confiable?" → No mention of inter-rater reliability, instrument validation, or how Karen's training was certified for ADOS-2
- "¿La escuela de mi hijo aceptará este informe específicamente?" → The answer says "validez oficial," but a parent whose school previously rejected a psych report needs more reassurance
- "¿Qué pasa si mi hijo no coopera en las pruebas?" → A major anxiety for parents of kids with behavioral challenges
- "¿Puedo pedir una segunda opinión?" → No mention of this right
- Adults: "¿Esto afectará mi expediente laboral o de salud?" → Privacy concern for working adults

---

## Limitations

The following could not be assessed from source code alone:

1. Actual rendering on mobile devices — tap-target sizes and above-the-fold content on various screen widths estimated from Tailwind classes but not visually verified
2. Cal.com booking flow completion rate and drop-off points
3. WhatsApp message conversion rate (messages sent vs. appointments booked)
4. Page speed / Core Web Vitals — Next.js configuration not analyzed, no Lighthouse data available
5. Google Search Console data — actual query impressions, CTR, and ranking positions not accessible
6. Competitor SERP analysis — could not fetch live search results due to source-code-only constraint
7. Actual user behavior (heatmaps, scroll depth, session recordings) not available
8. Whether the Cal.com integration is live and configured with the correct calendar for Karen's actual schedule
9. Navbar contents — Navbar.tsx was not read; navigation link set and mobile menu are unverified
10. Whether Google has indexed all pages — robots.txt and sitemap.xml not checked

---

## Cross-Skill Recommendations

- E-E-A-T gaps (credential verification, ADOS-2 training documentation): Recommend `/seo content` analysis for the About page and a dedicated "Certificaciones" section
- Schema correctness (price discrepancy in MedicalProcedure Offer): Recommend `/seo schema` validation
- Local SEO (GBP signals, local citations, proximity signals for Cancún vs. competitor clinics): Recommend `/seo local` analysis
- Thin conversion content (email nurture, lead magnet): Recommend content strategy review for mid-funnel assets

---

*Generate a PDF report? Use `/seo google report`*
