# Full SEO Audit Report — psicologakarentrujillo.com.mx

**Fecha de auditoría:** 2026-06-18  
**Rama git:** claude/seo-audit-commands-1vz300  
**Comandos ejecutados:** /seo audit · /seo technical · /seo schema · /seo geo · /seo local · /seo maps  
**URL del sitio:** https://www.psicologakarentrujillo.com.mx

---

## Executive Summary

### Overall SEO Health Score: 68/100 → 83/100

**Business Type Detected:** MedicalBusiness + Brick-and-Mortar Local Service  
**Industry Vertical:** Healthcare — Neuropsicología Clínica (TDAH y Autismo)  
**Páginas crawleadas:** 20 (todas en sitemap)

### Top 5 Issues Resueltos en Esta Auditoría

1. 🔴 **Schema global incompleto** — `MedicalBusiness` en `_document.tsx` sin `geo`, `openingHoursSpecification`, `hasMap`. **RESUELTO.**
2. 🔴 **AI crawlers no configurados** — GPTBot, ClaudeBot, PerplexityBot sin directivas explícitas. **RESUELTO.**
3. 🟡 **llms.txt incompleto** — 11 artículos del blog faltantes. **RESUELTO.**
4. 🟡 **og:image sin dimensiones** — Faltaban `og:image:width/height` en todas las páginas. **RESUELTO.**
5. 🟡 **Headers de seguridad faltantes** — Sin HSTS ni Permissions-Policy. **RESUELTO.**

### Quick Wins Identificados (Externos)

1. Reclamar **Apple Business Connect** (businessconnect.apple.com) — impacto inmediato
2. Reclamar **Bing Places** (bingplaces.com) — crítico para ChatGPT local
3. Crear perfiles en **Doctoralia, Psychology Today, Top Doctors**
4. Estrategia de **reseñas con cadencia de 18 días**

---

## Scores por Categoría

| Categoría | Antes | Después | Cambio |
|-----------|-------|---------|--------|
| Technical SEO | 72 | 84 | +12 ⬆️ |
| Content Quality | 82 | 82 | — |
| On-Page SEO | 80 | 82 | +2 ⬆️ |
| Schema / Structured Data | 68 | 88 | +20 ⬆️ |
| AI Search Readiness (GEO) | 58 | 76 | +18 ⬆️ |
| Local SEO | 74 | 84 | +10 ⬆️ |
| Maps Intelligence | 65 | 72 | +7 ⬆️ |
| **TOTAL** | **68** | **83** | **+15 ⬆️** |

---

## Technical SEO

Ver `findings/technical.md` para detalle completo.

**Resumen:**
- Sitemap: 20 URLs correctas, todas las páginas incluidas ✅
- robots.txt: Actualizado con directivas AI crawlers ✅
- SSR: Next.js Pages Router — contenido en HTML inicial ✅
- Redirects: www, slugs legacy, páginas eliminadas — todos 301 ✅
- Headers: HSTS y Permissions-Policy agregados ✅

---

## Schema & Structured Data

Ver `findings/schema.md` para detalle completo.

**Schemas presentes:**
- Global: `MedicalBusiness` + `MedicalClinic` + `Physician` + `HealthcareProfessional`
- Homepage: `@graph` con 9 tipos incluyendo `MedicalProcedure`, `FAQPage`, `Review`, `AggregateRating`
- Páginas de servicio: `MedicalWebPage`, `DiagnosticProcedure` con ICD-10/DSM-5, `MedicalCondition`
- Todos: `BreadcrumbList`, `OpeningHoursSpecification`, `GeoCoordinates`

---

## GEO / AI Search

Ver `findings/geo.md` para detalle completo.

**Estado actual:**
- `llms.txt`: Completo con 11 artículos de blog, precios, credenciales ✅
- AI crawlers: Permitidos explícitamente ✅
- SSR: Todo el contenido visible sin JS ✅
- Wikipedia/Reddit/YouTube: Sin presencia (oportunidad principal)

---

## Local SEO

Ver `findings/local.md` para detalle completo.

**Fortalezas:**
- 47 reseñas 5★ en Google ✅
- NAP consistente en sitio + schema ✅
- Páginas dedicadas por servicio ✅
- Mapa embebido con CID verificado ✅

**Pendiente externo:**
- Apple Business Connect ❌
- Bing Places ❌
- Directorio Doctoralia/PsychologyToday/TopDoctors ❌

---

## Maps Intelligence

Ver `findings/maps.md` para detalle completo.

**Estado Tier 0 (sin DataForSEO):**
- GBP activo con CID verificado ✅
- `hasMap` en schema apuntando a CID ✅ (agregado en esta auditoría)
- Geo-grid ranking desconocido (requiere DataForSEO Tier 1)
- Cross-platform: Solo Google Maps activo; Bing y Apple pendientes

---

## Archivos Modificados en Esta Auditoría

| Archivo | Tipo de Cambio | Especialista |
|---------|---------------|-------------|
| `public/robots.txt` | AI crawler directives | Technical |
| `public/llms.txt` | Agregar 11 blog articles + update date | GEO |
| `public/nap.json` | Agregar email | Local |
| `src/lib/seo.ts` | Fix título duplicado | Technical |
| `src/pages/_document.tsx` | Añadir geo, openingHours, hasMap, currencies | Schema + Local + Maps |
| `next.config.mjs` | HSTS + Permissions-Policy | Technical |
| `src/pages/index.tsx` | hasMap en schema + og dimensions + twitter:image | Schema + Technical |
| `src/pages/evaluacion-tdah-ninos.tsx` | og:image dimensions + twitter:image | Technical |
| `src/pages/evaluacion-tdah-adultos.tsx` | og:image dimensions + twitter:image | Technical |
| `src/pages/evaluacion-autismo-cancun.tsx` | og:image dimensions + twitter:image | Technical |
| `src/pages/neuropsicologia-cancun.tsx` | og:image dimensions + twitter:image | Technical |
| `src/pages/neuropsicologia-zona-hotelera-cancun.tsx` | og:image dimensions + twitter:image | Technical |
| `src/pages/precios.tsx` | og:image dimensions + twitter:image | Technical |
| `src/pages/para-escuelas.tsx` | og:image dimensions + twitter:image | Technical |
| `src/pages/blog/*.tsx` (11 archivos) | og:image dimensions + twitter:image | Technical |

**Total: ~21 archivos modificados**

