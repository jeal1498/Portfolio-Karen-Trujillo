# Maps Intelligence Findings — psicologakarentrujillo.com.mx

**Audit Date:** 2026-06-18  
**Capability Tier:** Tier 0 (Free — DataForSEO not available)  
**GBP CID:** 4630406520710891531

## Maps Health Score: 65/100 → 72/100 (after fixes)

*Note: Tier 0 analysis. Geo-grid ranking, live GBP profile data, and review velocity charts require DataForSEO (Tier 1).*

## GBP Profile Status (Inferred from Schema + Code)

| Field | Status | Source |
|-------|--------|--------|
| Business Name | ✅ Present | GBP CID verified |
| Primary Category | Unknown | Requires Tier 1 |
| Address | ✅ Present | schema + maps embed |
| Phone | ✅ Present | +52 998 321 1547 |
| Website | ✅ Present | psicologakarentrujillo.com.mx |
| Hours | ✅ Present | L-V 9-19, Sá 9-14 |
| Google Maps CID | ✅ Active | 4630406520710891531 |
| Reviews | ✅ 47 reseñas / 5.0 ⭐ | From schema |
| Google Maps Embed | ✅ On homepage | Iframe present |
| hasMap in Schema | ✅ Fixed | Added in this audit |
| Photos | Unknown | Requires Tier 1 |
| GBP Posts | Unknown | Requires Tier 1 |
| Services listed on GBP | Unknown | Requires Tier 1 |

## Issues Fixed

### hasMap Property Missing in Schema (Fixed)
- **Before:** No `hasMap` linking to GBP CID in global or homepage schema
- **After:** `hasMap: 'https://maps.google.com/?cid=4630406520710891531'` added to both `_document.tsx` and `index.tsx` schemas

## Cross-Platform Presence

| Platform | Status | Action |
|----------|--------|--------|
| Google Maps | ✅ Claimed (CID: 4630406520710891531) | Maintain 18-day review cadence |
| Bing Places | ❌ NOT claimed | **CRITICAL: Claim at bingplaces.com** |
| Apple Maps / Business Connect | ❌ NOT claimed | **CRITICAL: Claim at businessconnect.apple.com** |
| OpenStreetMap | Unknown | Low priority |
| Waze | Unknown | Low priority |

## Competitor Landscape (Tier 0 Estimate)

*Neuropsicólogos/psicólogos en Cancún que evalúan TDAH/Autismo:*
- Likely 5-15 competitors in the Cancún metro area
- Karen Trujillo's differentiation: ADOS-2 specifically named + standardized instruments listed + price transparency + 47 verified reviews
- Specific competitive analysis requires DataForSEO geo-grid scan

## Review Intelligence

Based on schema data (no live GBP access):
- **Rating:** 5.0 ⭐ (47 reviews) — excellent above all thresholds
- **18-day rule risk:** Unknown — track manually to ensure review velocity maintained
- **Response rate:** Unknown — verify and respond to all reviews from GBP dashboard
- **HIPAA equivalent (Mexico):** Do NOT confirm reviewer is a patient in responses

## Schema Recommendation for GBP Integration

Schema already includes:
- `geo` coordinates (21.1530418, -86.8958544) ✅ Fixed in this audit
- `openingHoursSpecification` for weekdays and Saturday ✅ Fixed
- `hasMap` pointing to CID ✅ Fixed
- `aggregateRating` with 5.0/47 ✅ Present

## Next Steps for Tier 1 Analysis

To get full geo-grid ranking and live GBP data, install DataForSEO extension and run:
- `/seo maps grid "neuropsicóloga Cancún" Cancún`
- `/seo maps gbp "Karen Trujillo Cancún" Cancún`
- `/seo maps reviews "Karen Trujillo Cancún" Cancún`
