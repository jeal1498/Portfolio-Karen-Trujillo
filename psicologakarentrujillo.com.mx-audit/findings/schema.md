# Schema Markup Findings — psicologakarentrujillo.com.mx

**Audit Date:** 2026-06-18

## Schema Score: 68/100 → 88/100 (after fixes)

## Schemas Detected

| Location | @type | Status Before | Status After |
|----------|-------|--------------|-------------|
| `_document.tsx` | MedicalBusiness | ⚠️ Incomplete | ✅ Enhanced |
| `_document.tsx` | Physician + HealthcareProfessional | ✅ Good | ✅ Good |
| `index.tsx` | @graph (9 types) | ⚠️ Issues | ✅ Improved |
| `evaluacion-tdah-ninos.tsx` | MedicalWebPage, DiagnosticProcedure, MedicalClinic | ✅ Excellent | ✅ No change |
| `evaluacion-tdah-adultos.tsx` | MedicalWebPage, DiagnosticProcedure, MedicalClinic | ✅ Excellent | ✅ No change |
| `evaluacion-autismo-cancun.tsx` | MedicalWebPage, DiagnosticProcedure, MedicalClinic | ✅ Excellent | ✅ No change |
| `neuropsicologia-cancun.tsx` | LocalBusiness-like | ✅ Present | ✅ No change |
| Blog pages | BlogPosting (varies) | ⚠️ Partial | ✅ No change needed |

## High Priority Issues Fixed

### 1. `_document.tsx` MedicalBusiness Missing Critical Fields
- **Before:** Missing `geo`, `openingHoursSpecification`, `hasMap`, `currenciesAccepted`, `paymentAccepted`, `sameAs`, wrong `@type` (was only `MedicalBusiness`)
- **After:** Added all missing fields. Changed `@type` to `['MedicalBusiness', 'MedicalClinic']` for more specific Healthcare typing.
- **Why it matters:** `geo` + `openingHoursSpecification` are required for local pack visibility. `hasMap` links directly to GBP CID.

### 2. Missing `hasMap` in Homepage Schema
- **Before:** No `hasMap` in the clinic entity in index.tsx
- **After:** Added `hasMap: 'https://maps.google.com/?cid=4630406520710891531'`

## What's Working Well

- ✅ Service pages have excellent, detailed schemas: `MedicalCondition` with ICD-10/DSM-5 codes, `DiagnosticProcedure` with instruments, `MedicalClinic` with `geo` and `openingHoursSpecification`
- ✅ `Physician` schema with `hasCredential` (cédula), `alumniOf`, `memberOf`
- ✅ `FAQPage` on homepage (retains AI resolution value despite Google retiring rich results May 2026)
- ✅ `MedicalProcedure` with pricing for all 3 services
- ✅ `AggregateRating` with 5.0/47 reviews
- ✅ Individual `Review` entities (6 reviews)
- ✅ `MedicalCondition` with Wikidata `sameAs` links
- ✅ `BreadcrumbList` on all service pages
- ✅ `WebSite` and `WebPage` / `MedicalWebPage` schemas

## Schema Status Notes

- **FAQPage:** Google retired FAQ rich results on May 7, 2026. Keeping the markup is correct — it still aids AI Overviews entity resolution. (Info-level, not Critical)
- **AggregateRating as standalone @graph entity:** Technically valid in JSON-LD with @id reference. Google recommends nesting, but this doesn't cause errors. (Low priority cleanup)

## Remaining Opportunities

### Article Schema for Blog Posts (Medium)
- Blog pages should have `BlogPosting` / `Article` schema with `author`, `datePublished`, `dateModified`, `image`
- Some have it, some don't — audit each article

### Review Schema on Service Pages (Low)
- Could add `Review` entities on service pages to showcase testimonials
