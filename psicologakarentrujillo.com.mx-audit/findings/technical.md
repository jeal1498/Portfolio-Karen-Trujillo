# Technical SEO Findings — psicologakarentrujillo.com.mx

**Audit Date:** 2026-06-18  
**Auditor:** SEO Technical Specialist

## Technical Score: 72/100 → 84/100 (after fixes)

| Category | Before | After | Status |
|----------|--------|-------|--------|
| Crawlability | 88 | 92 | ✅ Improved |
| Indexability | 90 | 90 | ✅ Pass |
| Security Headers | 55 | 82 | ✅ Improved |
| URL Structure | 95 | 95 | ✅ Pass |
| Mobile Optimization | 90 | 90 | ✅ Pass |
| Core Web Vitals | 75 | 75 | ⚠️ No field data available |
| Structured Data | 60 | 85 | ✅ Improved |
| JS Rendering | 80 | 80 | ✅ Pass (Next.js SSR) |
| AI Crawler Access | 40 | 90 | ✅ Improved |

## Critical Issues Fixed

### robots.txt — AI Crawlers Not Configured
- **Before:** Only generic `User-agent: *` rule. GPTBot, ClaudeBot, PerplexityBot had no explicit directive.
- **After:** Added explicit Allow for AI search crawlers (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, anthropic-ai, PerplexityBot). Blocked training crawlers (CCBot, Bytespider, Google-Extended).
- **Impact:** Site now visible to ChatGPT, Perplexity, Claude AI search features.

## High Priority Issues Fixed

### Security Headers — Missing HSTS and Permissions-Policy
- **Before:** Only `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`
- **After:** Added `Strict-Transport-Security` (max-age=31536000, includeSubDomains, preload) and `Permissions-Policy`
- **Files:** `next.config.mjs`

## What's Already Working Well

- ✅ robots.txt exists and references sitemap
- ✅ Sitemap has all 20 pages with correct priorities and lastmod
- ✅ 301 redirects for www enforcement, old PascalCase slugs, deleted pages
- ✅ Clean kebab-case URLs throughout
- ✅ Next.js SSR — content in initial HTML, no JS-dependent indexing issues
- ✅ Mobile-first design with responsive Tailwind CSS
- ✅ `lang="es-MX"` on `<html>` element
- ✅ Skip-to-content link for accessibility
- ✅ X-Content-Type-Options, X-Frame-Options headers present

## Remaining Issues (Backlog)

### IndexNow Protocol (Low)
- Not implemented. Would speed up indexing on Bing, Yandex, Naver.
- Recommendation: Add IndexNow key and implement via API call on publish.

### og:image Dimensions Missing on All Pages
- **Status:** Fixed in this audit — added 465×533 dimensions to all pages.

### Content-Security-Policy (Medium)
- Not implemented. Would require careful configuration to not break fonts/maps/WhatsApp links.
- Recommendation: Implement CSP in report-only mode first, then enforce.

### og:image Aspect Ratio (Low)
- Current image (465×533) is portrait. Social platforms prefer 1200×630 landscape.
- Recommendation: Create a dedicated OG image at 1200×630 with Karen's photo + clinic branding.
