# GEO / AI Search Findings — psicologakarentrujillo.com.mx

**Audit Date:** 2026-06-18

## GEO Readiness Score: 58/100 → 76/100 (after fixes)

| Dimension | Before | After |
|-----------|--------|-------|
| AI Crawler Access | 30/100 | 90/100 |
| llms.txt Completeness | 50/100 | 92/100 |
| Citability Score | 72/100 | 72/100 |
| Structural Readability | 78/100 | 78/100 |
| Authority Signals | 65/100 | 65/100 |
| Server-Side Rendering | 90/100 | 90/100 |

## Platform Visibility (Before/After)

| Platform | Before | After |
|----------|--------|-------|
| Google AI Overviews | Medium | Medium-High |
| Google AI Mode | Medium | Medium |
| ChatGPT | Low-Medium | Medium |
| Perplexity | Low | Medium |
| Bing Copilot | Unknown | Unknown |

## Issues Fixed

### 1. AI Crawlers Not Explicitly Allowed in robots.txt
- **Before:** No explicit directives for GPTBot, ClaudeBot, PerplexityBot
- **After:** All key AI search crawlers explicitly allowed
- **Impact:** Improved crawlability for ChatGPT, Perplexity, Claude AI features

### 2. llms.txt Missing 11 Blog Articles
- **Before:** Only 6 main pages listed (missing all blog articles)
- **After:** All 11 blog articles added with descriptive titles and URLs
- **Also added:** Update date (`Actualizado: 2026-06-18`), pricing info, experience stats

## What's Already Working Well

- ✅ `llms.txt` exists at `/llms.txt` (site root)
- ✅ Credentials and professional info clearly stated
- ✅ Contact info, hours, and address in llms.txt
- ✅ Next.js SSR — all content visible to AI crawlers without JS execution
- ✅ `geo.position` and `ICBM` meta tags on all pages
- ✅ Structured FAQ sections (good for AI QA extraction)
- ✅ Question-based H2/H3 headings throughout blog content
- ✅ Specific statistics (cédula 11009616, 47 reseñas, $8,300 MXN price)
- ✅ Self-contained answer blocks in FAQ sections
- ✅ `MedicalCondition` schema with Wikidata sameAs (entity disambiguation)

## Remaining Opportunities (External Actions Required)

### Wikipedia/Wikidata Entity Presence (High Impact)
- Neither Karen Trujillo nor the clinic has a Wikipedia page
- **Recommendation:** Create a notable citation on Wikipedia for TDAH/neuropsicología en Cancún
- **Impact:** 3x stronger correlation with AI citation than backlinks (Ahrefs study)

### Reddit Presence (High Impact)
- No detected Reddit community presence
- **Recommendation:** Participate in r/TDAH_es, r/psicologia, r/mexico health discussions
- **Impact:** Reddit is 46.7% of Perplexity citations

### YouTube Channel (High Impact)
- No YouTube channel detected
- **Recommendation:** Create channel explaining TDAH/autismo diagnosis process
- **Impact:** YouTube mentions correlate ~0.737 with AI visibility (highest signal)

### RSL 1.0 Licensing (Low)
- Not implemented. Would declare content licensing for AI training.

### Content Freshness (Ongoing)
- Pages with lastmod 2026-06-17 are well within the 3-month freshness window
- **Recommendation:** Set calendar reminders to refresh key pages every 60-90 days
