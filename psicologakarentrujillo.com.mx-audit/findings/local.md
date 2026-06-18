# Local SEO Findings — psicologakarentrujillo.com.mx

**Audit Date:** 2026-06-18  
**Business Type:** Brick-and-Mortar (physical consultorio + hybrid online sessions)  
**Industry Vertical:** Healthcare — Neuropsychology / Mental Health

## Local SEO Score: 74/100 → 84/100 (after fixes)

| Dimension | Before | After | Weight |
|-----------|--------|-------|--------|
| GBP Signals | 70/100 | 70/100 | 25% |
| Reviews & Reputation | 90/100 | 90/100 | 20% |
| Local On-Page SEO | 85/100 | 90/100 | 20% |
| NAP Consistency | 80/100 | 88/100 | 15% |
| Local Schema | 65/100 | 88/100 | 10% |
| Local Authority | 50/100 | 50/100 | 10% |

## Issues Fixed

### 1. MedicalBusiness Schema Missing geo + openingHoursSpecification
- **Before:** Global `_document.tsx` schema had no geo coordinates or hours
- **After:** Added `GeoCoordinates` (21.1530418, -86.8958544) and `OpeningHoursSpecification` for weekdays and Saturday
- **Impact:** Critical for local pack visibility

### 2. Missing `hasMap` in Schema
- **Before:** No link from schema to Google Maps CID
- **After:** Added `hasMap: 'https://maps.google.com/?cid=4630406520710891531'`

### 3. NAP Inconsistency — Empty Email in nap.json
- **Before:** `nap.json` had `"email": ""`
- **After:** Added `"email": "karentrujillopsic@gmail.com"`

## What's Working Well

- ✅ NAP consistency: Name, Address, Phone flow from `site.ts` → schema → page HTML
- ✅ Google Maps CID present: `4630406520710891531` — verified GBP listing
- ✅ Google Maps embed on homepage with exact coordinates
- ✅ Reviews: 47 reseñas con 5.0 estrellas — well above 10-review magic threshold
- ✅ Star rating 5.0 (31% of consumers only use 4.5+)
- ✅ `aggregateRating` in schema with correct ratingValue and reviewCount
- ✅ City + service keyword in title tags (e.g., "Neuropsicóloga en Cancún — TDAH y Autismo")
- ✅ H1 with local intent on all pages
- ✅ `tel:` click-to-call links for mobile users
- ✅ WhatsApp floating CTAs always visible
- ✅ Dedicated service pages (one per condition) — #1 local organic factor
- ✅ Internal linking: homepage → all service pages within 1 click
- ✅ `areaServed` with Wikidata-linked cities

## Critical Pending (External Actions — Karen Must Do)

### Apple Business Connect (CRITICAL — External)
- **Status:** Not claimed
- **Impact:** Usage doubled to 27% (BrightLocal 2026). Critical for iPhone Safari Maps.
- **Action:** Claim at businessconnect.apple.com using the same NAP data as GBP

### Bing Places for Business (CRITICAL — External)
- **Status:** Not claimed
- **Impact:** Powers ChatGPT local recommendations, Bing Copilot, Alexa. Essential for AI search.
- **Action:** Claim at bingplaces.com

### Directory Profiles (HIGH — External)
All three medical directories in nap.json are PENDING:
- **Doctoralia MX:** https://www.doctoralia.com.mx/ — create profile
- **Psychology Today:** https://therapists.psychologytoday.com/ — create profile  
- **Top Doctors MX:** https://www.topdoctors.mx/ — create profile
**After creating each:** Add URL to `src/lib/contact.ts > DIRECTORY_PROFILES` — auto-propagates to all schemas

### Data Aggregators (MEDIUM — External)
- Submit NAP to: Data Axle, Foursquare, Neustar/TransUnion
- These distribute to downstream directories automatically
- Use `public/nap.json` as the authoritative data source

### GBP Q&A Section (MEDIUM — External)
- GBP removed Q&A in December 2025 (replaced by Ask Maps Gemini AI)
- **Action:** Convert Q&A content to FAQ sections on website (already done on homepage ✅)

### 18-Day Review Cadence (MEDIUM — Ongoing)
- Current: 47 reviews total (excellent count)
- **Risk:** Rankings drop if no new reviews for 3 weeks (Sterling Sky research)
- **Action:** Set up systematic review requests after each evaluation delivery
