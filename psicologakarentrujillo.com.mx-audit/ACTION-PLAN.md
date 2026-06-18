# Action Plan — psicologakarentrujillo.com.mx SEO Audit

**Fecha:** 2026-06-18  
**Rama:** claude/seo-audit-commands-1vz300

## Overall Health Score: 68/100 → 83/100

## Phase 1: Critical Fixes (Done — This Audit)

| # | Acción | Archivo | Impacto |
|---|--------|---------|---------|
| 1 | AI crawlers explícitos en robots.txt | `public/robots.txt` | Alta |
| 2 | HSTS + Permissions-Policy headers | `next.config.mjs` | Alta |
| 3 | geo + openingHoursSpecification en schema global | `src/pages/_document.tsx` | Crítica |
| 4 | hasMap → GBP CID en schemas | `_document.tsx`, `index.tsx` | Alta |
| 5 | Blog articles en llms.txt (11 artículos) | `public/llms.txt` | Media |
| 6 | og:image:width/height en todas las páginas (20 archivos) | Múltiples | Media |
| 7 | twitter:image en páginas de servicio | Múltiples | Media |
| 8 | Email en nap.json | `public/nap.json` | Baja |
| 9 | Título duplicado "Neuropsicóloga" en seo.ts | `src/lib/seo.ts` | Baja |

## Phase 2: High Impact (Acciones Externas — Karen)

| # | Acción | Plazo | Impacto |
|---|--------|-------|---------|
| 1 | Reclamar Apple Business Connect | 1 semana | CRÍTICA |
| 2 | Reclamar Bing Places for Business | 1 semana | CRÍTICA |
| 3 | Crear perfil en Doctoralia MX | 2 semanas | Alta |
| 4 | Crear perfil en Psychology Today MX | 2 semanas | Alta |
| 5 | Crear perfil en Top Doctors MX | 2 semanas | Alta |
| 6 | Después de cada perfil: agregar URL en `src/lib/contact.ts > DIRECTORY_PROFILES` | — | Alta |
| 7 | Sistema de solicitud de reseñas (cadencia 18 días) | Inmediato | Alta |

## Phase 3: Content & Authority (Mes 2)

| # | Acción | Impacto |
|---|--------|---------|
| 1 | Crear canal YouTube con explicaciones de evaluaciones | Alta (AI visibility) |
| 2 | Participar en Reddit (r/TDAH_es, r/psicologia) | Alta (Perplexity citations) |
| 3 | Agregar Article schema a artículos del blog (datePublished, dateModified, author) | Media |
| 4 | Imagen OG dedicada 1200×630 (landscape) con foto + branding de Karen | Media |
| 5 | Someter NAP a Data Axle, Foursquare, Neustar para distribución downstream | Media |

## Phase 4: Monitoring & Iteration (Ongoing)

- Refrescar páginas clave cada 60-90 días (freshness = 3x más citas en AI)
- Monitorear velocidad de reseñas Google (mínimo 1 nueva cada 18 días)
- Verificar indexación de todas las páginas en Google Search Console
- Instalar DataForSEO para geo-grid rank tracking mensual

