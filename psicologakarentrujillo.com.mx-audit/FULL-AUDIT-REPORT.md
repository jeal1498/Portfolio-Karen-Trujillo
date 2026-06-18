# Auditoría SEO Completa — psicologakarentrujillo.com.mx
**Fecha:** 2026-06-18 | **Método:** análisis de código fuente (sitio live devuelve 403 por Cloudflare)

---

## Puntuación Global: 74 / 100

| Categoría | Peso | Puntuación | Ponderado |
|-----------|------|-----------|-----------|
| Technical SEO | 22% | 79 | 17.4 |
| Content Quality (E-E-A-T) | 23% | 78 | 17.9 |
| On-Page SEO | 20% | 72 | 14.4 |
| Schema / Structured Data | 10% | 78 | 7.8 |
| Performance (CWV) | 10% | N/D* | — |
| AI Search Readiness (GEO) | 10% | 74 | 7.4 |
| Images | 5% | 45 | 2.2 |
| **TOTAL** | **100%** | | **≈ 74** |

*Sin datos de campo — Cloudflare bloquea CrUX fetch. Requiere Google Search Console.

---

## Tipo de negocio
**Local Service · Healthcare · Neuropsicología Clínica** — presencial en Cancún con opción híbrida. Sector YMYL: reglas E-E-A-T de máxima exigencia.

---

## 5 Issues Críticos

### 🔴 C-1: Google-Extended bloqueado en robots.txt
El sitio **no puede aparecer en Google AI Overviews**. `Google-Extended` está agrupado con scrapers de entrenamiento (CCBot, Bytespider) — clasificación errónea. Google-Extended es el crawler de AI Overviews y Gemini Search.
**Fix:** 2 líneas en `public/robots.txt`. **Tiempo:** 2 min.

### 🔴 C-2: Precio incorrecto en Schema ($7,000 vs $8,300 MXN)
`evaluacion-tdah-ninos.tsx`, `evaluacion-tdah-adultos.tsx` e `index.tsx` declaran `"price": "7000"` en `MedicalProcedure > Offer`. El precio real es $8,300 MXN. Google puede mostrar el dato del schema en rich results.
**Fix:** 3 ediciones de línea. **Tiempo:** 5 min.

### 🔴 C-3: og:image portrait (465×533) en las 20 páginas
Facebook, WhatsApp, LinkedIn y Twitter requieren 1200×630 landscape. Los 11 artículos del blog ya tienen SVG hero 1200×675 — no se usan como og:image.
**Fix:** Apuntar og:image de blog a SVG existente; generar 9 imágenes landscape para páginas principales.

### 🔴 C-4: Contradicción de anticipo entre páginas
`/precios` dice anticipo ≈ 50% (~$4,150). Páginas de servicio dicen $1,000–$1,500 MXN. Quiebra la confianza en el momento de mayor intención.
**Fix:** Estandarizar texto en todas las páginas. **Tiempo:** 20 min.

### 🔴 C-5: Hub-and-spoke roto — pillar pages sin links al blog
Las 3 páginas de servicio reciben PageRank de 11 artículos pero devuelven cero. Circuito de PageRank roto.
**Fix:** Sección "Recursos relacionados" al final de cada página de servicio.

---

## 5 Quick Wins

1. **Desbloquear Google-Extended** en robots.txt → 2 min → AI Overviews
2. **Corregir precio schema** `"7000"` → `"8300"` en 3 archivos → 5 min
3. **og:image de blog** → apuntar a SVG hero existente → 30 min → social previews
4. **tel: href** → `PHONE_NUMBER` → `PHONE_E164` en FloatingButtons y servicios → 20 min
5. **Schema zona-hotelera** → `LocalBusiness` → `['MedicalBusiness','MedicalClinic']` + `geo` → 10 min

---

## Technical SEO — 79/100

**Fortalezas:** SSR completo, canonical en todas las páginas, redirect 301 www, security headers (HSTS preload, X-Frame-Options, X-Content-Type-Options), 404 configurada, sitemap con cobertura 100%.

**Issues:**
| Severidad | Hallazgo |
|-----------|---------|
| 🔴 Crítico | Google-Extended bloqueado (ver C-1) |
| 🟡 Alto | Sin Content-Security-Policy header |
| 🟡 Medio | 3 páginas sin links internos desde nav/footer: `/para-escuelas`, `/neuropsicologia-cancun`, `/neuropsicologia-zona-hotelera-cancun` |
| 🟡 Medio | `applySeo()` en lib/seo.ts es código muerto (no se llama en ninguna página) |
| 🟢 Bajo | AggregateRating duplicado en `_document.tsx` e `index.tsx` |

---

## Content Quality / E-E-A-T — 78/100

| Factor | Puntuación |
|--------|-----------|
| Experience | 75/100 |
| Expertise | 88/100 |
| Authoritativeness | 72/100 |
| Trustworthiness | 88/100 |

**Fortalezas:** instrumentos diagnósticos específicos en cada página, cédula 11009616 en 4+ lugares, 47 reseñas nombradas, precios transparentes con desglose de pagos, artículos del blog con DSM-5, ICD-10 y ejemplos por grupo de edad.

**Issues:**
| Severidad | Hallazgo |
|-----------|---------|
| 🔴 Alto | 16 de 18 títulos superan 60 caracteres (peor: 102 chars) |
| 🔴 Alto | og:image portrait en todas las páginas |
| 🟡 Medio | Sin byline visible con fecha en artículos (solo en JSON-LD) |
| 🟡 Medio | Sin links a fuentes externas de autoridad (APA, NIH, DSM-5) |
| 🟡 Medio | Sin Privacy Policy page (pese a captura de leads vía WhatsApp) |
| 🟡 Medio | Meta descriptions > 160 chars en 4 páginas |

---

## Schema / Structured Data — 78/100

**Fortalezas excepcionales para clínica individual:** `['MedicalBusiness','MedicalClinic']` dual @type, `Physician` con `hasCredential`/`alumniOf`/`memberOf`, `MedicalCondition` con ICD-10 + DSM-5 + Wikidata sameAs, 4–5 `DiagnosticProcedure` por página de servicio, `AggregateRating` 5.0/47 + 6 `Review` con nombres reales, `SpeakableSpecification`, `openingHoursSpecification` UTC-5, @graph coherente con `/#physician` y `/#clinic` cross-references.

**Issues:**
| Severidad | Hallazgo |
|-----------|---------|
| 🔴 Crítico | `price: '7000'` en nodos TDAH (ver C-2) |
| 🟡 Medio | Imagen en schema de blog: portrait 465×533 en lugar de hero SVG 1200×675 |
| 🟡 Medio | zona-hotelera `LocalBusiness` sin `geo` ni `hasMap` |
| 🟡 Medio | `que-es-ados-2-autismo`: `@type: 'Article'` en lugar de `['Article','BlogPosting']` |
| 🟡 Medio | Blog index sin schema (añadir `CollectionPage` + `BreadcrumbList`) |
| 🟢 Bajo | Oportunidad: `Service` schema en páginas de servicio para feature "Servicios" en SERP |
| 🟢 Bajo | `SpeakableSpecification` faltante en artículos del blog |

---

## GEO / AI Search Readiness — 74/100

| Plataforma | Disponibilidad | Estado |
|-----------|----------------|--------|
| Google AI Overviews | Bloqueada | 🔴 CRÍTICO |
| ChatGPT | Alta | 🟡 Sin YouTube |
| Perplexity | Alta | ✅ |
| Bing Copilot | Media | 🟡 Sin directorios |

**Fortalezas:** `llms.txt` presente y completo, brand co-mention "Karen Trujillo + neuropsicóloga + Cancún" en cada título/meta/schema, pasajes definitorios con DSM-5 bajo IDs de sección, FAQ self-contained (60–140 palabras por respuesta).

**Issues:**
| Severidad | Hallazgo |
|-----------|---------|
| 🔴 Crítico | Google-Extended bloqueado (ver C-1) |
| 🟡 Alto | Sin canal YouTube (correlación 0.737 con citabilidad en ChatGPT) |
| 🟡 Medio | Sin `<time>` visible en artículos de blog |
| 🟡 Medio | `SpeakableSpecification` ausente en los 11 artículos del blog |
| 🟡 Medio | Doctoralia MX, Psychology Today MX, Top Doctors: pendientes |

---

## Local SEO — 76/100

**Fortalezas:** fuente de verdad única (`lib/contact.ts` + `lib/site.ts`), 47 reseñas a 5.0 estrellas, Maps embed con CID confirmado, páginas de neuropsicología con contenido genuinamente local.

**Issues:**
| Severidad | Hallazgo |
|-----------|---------|
| 🟡 Alto | `tel:${PHONE_NUMBER}` sin prefijo `+` en FloatingButtons y páginas de servicio |
| 🟡 Alto | `LocalBusiness` en zona-hotelera en lugar de `['MedicalBusiness','MedicalClinic']` |
| 🟡 Medio | Sin Google Maps embed en páginas de neuropsicología |
| 🟡 Medio | Doctoralia MX, Psychology Today MX, Top Doctors MX pendientes |
| 🟡 Medio | "Psicóloga" (iframe Maps) vs "Neuropsicóloga" (schema) — inconsistencia de nombre |
| 🟢 Bajo | Bing Places y Apple Business Connect sin reclamar |

---

## SXO / Search Experience — 74/100

**Fortalezas:** SymptomChecker con CTA adaptativo, sección "¿Qué pasa si no tiene TDAH?" con 3 escenarios, tabla neuropsicología vs. psicología, FAQ 12 preguntas por servicio.

**Issues:**
| Severidad | Hallazgo |
|-----------|---------|
| 🔴 Crítico | Contradicción anticipo entre /precios y páginas de servicio (ver C-4) |
| 🟡 Alto | Social proof aparece como sección 7/11 en mobile — muy abajo del fold |
| 🟡 Alto | Sin captura de email ni ruta de nurturing para prospectos en consideración |
| 🟡 Medio | Blog CTAs enlazan a raíz del servicio en lugar de `#agendar` |
| 🟡 Medio | Captions de imágenes del blog con texto placeholder visible |

---

## Sitemap — 80/100

**Fortalezas:** cobertura 100% (20/20 páginas), sin URLs fantasma, www consistente, sitemap en robots.txt.

**Issues:**
| Severidad | Hallazgo |
|-----------|---------|
| 🟡 Medio | Todas las URLs tienen `lastmod: 2026-06-17` idéntico — Google ignora lastmod uniforme |
| 🟡 Medio | Sin image sitemap (57 assets no declarados) |

---

## Content Cluster — 52/100

**Issues:**
| Severidad | Hallazgo |
|-----------|---------|
| 🔴 Crítico | 0/3 páginas de servicio enlazan a artículos del blog (ver C-5) |
| 🟡 Alto | `que-es-ados-2-autismo` no enlaza a sus pares del cluster TEA |
| 🟡 Medio | Canibalización: `burnout-o-tdah` vs `tdah-vs-ansiedad` compiten por el mismo intent |
| 🟡 Medio | 10 artículos recomendados faltantes (ver findings/cluster.md) |

---

## Archivos de hallazgos detallados
- `findings/technical.md` — Technical SEO (79/100)
- `findings/content.md` — Content & E-E-A-T (78/100)
- `findings/schema.md` — Structured Data (78/100)
- `findings/geo.md` — GEO / AI Search (74/100)
- `findings/local.md` — Local SEO (76/100)
- `findings/sxo.md` — Search Experience (74/100)
- `findings/sitemap.md` — Sitemap (80/100)
- `findings/cluster.md` — Content Cluster (52/100)

---

## Limitaciones
- Sin datos de campo CWV (necesita Google Search Console + CrUX)
- Sin datos de rankings reales (necesita GSC o DataForSEO)
- Sin auditoría de backlinks (necesita Moz API o Ahrefs)
- Sin estado real del perfil Google Business
- Sin screenshots (Playwright/Chrome no disponibles en entorno remoto)
