# Auditoría SEO Completa — psicologakarentrujillo.com.mx

- **Fecha:** 2026-06-17
- **Tipo de negocio:** Consulta clínica local (healthcare / YMYL) — neuropsicología, diagnóstico TDAH y autismo (TEA), Cancún
- **Método:** HTML en vivo (`curl` al SSR) + lectura del código fuente + 6 sub-agents especialistas de `claude-seo` (técnico, contenido, schema, local, GEO, SXO)
- **Limitación principal:** sin navegador headless ni credenciales Google en la sesión → Performance (CWV de campo) es provisional. Datos de GBP (categoría, fotos, Q&A) no auditables por HTTP.
- **Plan de remediación:** ver [`docs/seo-implementation-plan.md`](./seo-implementation-plan.md) (tareas T-01…T-17). Cada hallazgo aquí enlaza a su tarea.

---

## 📊 SEO Health Score: 78 / 100 — *Sólido, con problemas puntuales de alto impacto*

| Categoría | Peso | Score | → Tareas |
|---|---|---|---|
| Calidad de Contenido (E-E-A-T) | 23% | 82 | T-02, T-11 |
| SEO Técnico | 22% | 80 | T-08, T-14, T-15 |
| On-Page SEO | 20% | 78 | T-01, T-06, T-07, T-08 |
| Schema / Datos estructurados | 10% | 80 | T-03, T-04, T-05, T-09, T-10 |
| AI Search (GEO) | 10% | 80 | T-09, T-16 |
| Performance (CWV)* | 10% | 72* | T-13, T-17 |
| Imágenes | 5% | 50 | T-02 |

\* Provisional — sin datos de campo (CrUX/Lighthouse).

**Ponderado:** 0.22·80 + 0.23·82 + 0.20·78 + 0.10·80 + 0.10·72 + 0.10·80 + 0.05·50 ≈ **78**.

### Top 4 críticos
1. **Imágenes placeholder en producción** — `placehold.co` × **75** en 10 artículos + tarjetas de home. → T-02
2. **`<title>` de la HOME vacío en SSR** (bug de interpolación en `next/head`). → T-01
3. **Coordenadas geo del schema desalineadas ~4.7 km** del pin real del GBP. → T-03
4. **Horario inconsistente:** home "8:00 PM" vs schema `19:00` vs páginas internas "7:00 PM". → T-04

### Quick wins
T-01 (título home), T-07 (typo `/precios`), T-06 (enlazar `/precios`), T-08 (`og:image` + `lang=es-MX`), T-09 (enlace de reseñas Google).

---

## 1. SEO Técnico — 80

**Qué funciona**
- HTTPS + HSTS (`strict-transport-security: max-age=63072000`). Servidor Vercel; no filtra `X-Powered-By`.
- `robots.txt` limpio: `User-agent: * / Allow: / / Disallow: /404` + `Sitemap:` declarado. No bloquea nada crítico.
- `sitemap.xml` con 19 URLs (8 principales + 11 blog).
- `/no-existe-xyz` → **HTTP 404** real (no soft-404).
- Canonicals correctos y absolutos por ruta; `next/image` en 8 archivos.

**Hallazgos**
- 🟠 **High** — `<html lang="es">` en `_document.tsx:72`; debería ser `es-MX` (señal regional MX). → T-08
- 🟡 **Medium** — Faltan `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options` (solo hay HSTS). → T-14
- 🟢 **Low** — `sitemap.xml` con `lastmod` uniforme `2026-04-22` (estático, no refleja fechas reales). → T-15
- 🟢 **Low** — Fuentes cargadas vía `<link>` a Google Fonts (`_document.tsx:74-76`) en vez de `next/font/google` (auto-hospedaje elimina request render-blocking).

## 2. On-Page SEO — 78

**Qué funciona**
- Titles y meta descriptions específicos y con keyword local en casi todas las rutas (p. ej. `/evaluacion-tdah-ninos`: "Valoración TDAH Infantil en Cancún · Niños 5-17 | Karen Trujillo").
- H1 único por página; descripciones con gancho emocional ("¿Tu hijo no pone atención en la escuela?").
- Cédula 11009616 en titles y meta de páginas clave.

**Hallazgos**
- 🔴 **High** — **`<title>` de la home vacío en SSR.** `index.tsx:342` usa `<title>…Cédula {CEDULA}</title>`: el `<title>` con hijos mixtos (texto + interpolación) no lo serializa `next/head` → emite `<title></title>`. Verificado: `curl -sL https://www.psicologakarentrujillo.com.mx/ | grep -o '<title>[^<]*</title>'` → vacío. Las páginas con título de string puro renderizan bien. → T-01
- 🟡 **Medium** — `og:image` ausente en `/precios` (`precios.tsx` Head desde :180) y `/blog` (índice). Verificado: `og:image` vacío en vivo. → T-08
- 🟢 **Low** — Typo en H1 de `/precios` (`precios.tsx:202`): `Inversión en el<br />diagnóstico` se extrae como "eldiagnóstico" (sin espacio). → T-07

## 3. Calidad de Contenido / E-E-A-T — 82 (lo más fuerte)

**Qué funciona**
- **Trust/Expertise excepcional para YMYL:** cédula federal **11009616** en title, schema (`hasCredential`/`EducationalOccupationalCredential`) y texto visible — raro en competidores locales.
- Instrumentos estandarizados concretos (ADOS-2, WISC-V, CONNERS-3, CAARS-2, BRIEF-2, CPT-3) en vez de promesas vagas.
- Reseñas con nombres propios y contexto de servicio.
- 11 artículos de blog que cubren exactamente las consultas informacionales clave (`que-es-ados-2-autismo`, `cuanto-cuesta-valoracion-tdah-cancun`, `tdah-en-ninas-sintomas`, `burnout-o-tdah-diferencias`) y enlazan a las páginas de servicio.
- Precios transparentes ($8,300 / $8,500 MXN).
- Disciplina de alt text: solo 1 `<img>` sin alt, 0 alts vacíos.

**Hallazgos**
- 🟡 **Medium** — Sin fecha visible de publicación/actualización en los artículos (el `datePublished` existe en JSON-LD pero no en la UI). Señal de freshness/E-E-A-T en salud. → T-11
- 🟡 **Medium** — Las imágenes placeholder (ver §7) degradan la percepción de profesionalismo del contenido. → T-02
- ✅ Las dos páginas de neuropsicología (`/neuropsicologia-cancun` vs `/zona-hotelera`) **NO son doorway**: la de zona hotelera tiene contenido logístico único (agrupación de sesiones, distancias, Riviera Maya). Confirmado por el análisis local.

## 4. Schema / Datos estructurados — 80

**Qué funciona**
- Implementación **excepcional** para un consultorio local: la home emite 4 bloques JSON-LD con `MedicalBusiness`+`MedicalClinic`, `Physician`, `MedicalProcedure` (con precio vía `Offer`), `FAQPage`, `AggregateRating`, `BreadcrumbList`, `Organization`, `WebSite`, `OpeningHoursSpecification`. Las páginas de servicio añaden `MedicalCondition` con códigos ICD-10/DSM-5, `Review` individuales y `MedicalWebPage`. Muy por encima de Doctoralia/psico.mx.
- Artículos del blog con `Article` + `author` (Person) + `datePublished`/`dateModified` + `publisher`.

**Hallazgos**
- 🔴 **Critical** — Coordenadas geo desalineadas: schema/meta `21.1619, -86.8515` (`index.tsx:149`, `:348`, `:349`) vs pin del GBP/embed/direcciones `21.1530418, -86.8958544` (`index.tsx:1066`, `:1129`). ~4.7 km. → T-03
- 🔴 **Critical** — `OpeningHoursSpecification` (`closes 19:00`) ≠ horario visible en home (`LocationSection.tsx:45` → "8:00 PM"). → T-04
- 🟠 **High** — Dirección postal en **4 variantes** (`site.ts:21`, `LocationSection.tsx:32`, y schemas que interpolan "Supermanzana"). Degrada consistencia NAP. → T-05
- 🟡 **Medium** — `HowTo`/`HowToStep` en las 3 páginas de servicio (`evaluacion-tdah-ninos/-adultos`, `evaluacion-autismo-cancun`): **deprecado** (rich results retirados sept-2023). Markup muerto. → T-10
- 🟡 **Medium** — Los testimonios de la home (`TestimonialsSection.tsx:4`) no tienen nodos `Review` individuales (sí existen en páginas de servicio); añadirlos habilita estrellas en orgánico desde `/`. → T-09
- 🟡 **Medium** — Nombre del negocio en ~4 variantes entre schemas y GBP; canonizar al nombre del GBP. → T-05

## 5. AI Search Readiness (GEO) — 80

**Qué funciona**
- `robots.txt` no bloquea GPTBot / OAI-SearchBot / PerplexityBot / ClaudeBot / Google-Extended (permitidos por defecto) → buena elegibilidad para IA.
- Schema rico = base sólida para grounding de respuestas.
- FAQ y títulos de blog en forma de pregunta (alta citabilidad a nivel pasaje).
- `sameAs` a Instagram/Facebook/TikTok (señal de entidad).

**Hallazgos**
- 🟢 **Low** — `llms.txt` no existe (404). **Nota basada en evidencia:** no es hoy una palanca de citación demostrada → opcional, no prioritario. → T-16
- 🟡 **Medium** — Reforzar la entidad "Karen Trujillo" con `Person` consistente + `sameAs` también en el JSON-LD de la home. → T-09

## 6. Performance (Core Web Vitals) — 72 *(provisional)*

No medible sin datos de campo (sin navegador headless ni credenciales Google en la sesión). Evaluación desde la fuente:

**Qué funciona:** SSR en Vercel, imagen real en `.webp`, `next/image`, fuentes con `preconnect` + `display=swap`.

**Hallazgos**
- 🟡 **Medium** — **9 de 12 componentes con Framer Motion no cubren `prefers-reduced-motion`** (`Hero`, `AboutSection`, `ServicesSection`, `FAQSection`, `TestimonialsSection`, `LocationSection`, `SymptomChecker`, `FloatingButtons`, `BlogLayout`). `CLAUDE.md` lo exige; impacta INP + accesibilidad WCAG. → T-13
- 🟢 **Low** — `placehold.co` añade DNS/requests externos. → T-02
- → Para números reales: `/seo google setup` (Tier 0) + `/seo google`. → T-17

## 7. Imágenes — 50 (área más débil)

**Hallazgos**
- 🔴 **Critical** — **75 referencias a `placehold.co`** en los 10 artículos de `src/pages/blog/*` y en las tarjetas de blog de la home (`index.tsx` ~1010-1012). En producción.
- 🟡 **Medium** — Todas las `og:image` de artículos apuntan a `KAREN_IMAGE` genérico (p. ej. `blog/que-es-ados-2-autismo.tsx:112`) en vez de una imagen propia del artículo → daña CTR en social/Discover.
- → T-02 (requiere imágenes reales o autorización para generarlas).

---

## 8. Deep-dive: SEO Local — 71 / 100

> Negocio brick-and-mortar (dirección, embed con Place ID, horarios). Vertical healthcare.

**Qué funciona:** schema de healthcare entre los más completos vistos en consultorios MX; señales on-page locales fuertes (`geo.region: MX-ROO`, `areaServed` con Cancún/Playa del Carmen/Tulum/Mérida y `sameAs` Wikidata); cédula como señal de confianza; zona hotelera diferenciada (no doorway); Maps embed con **Place ID real** confirmado en producción (`1s0x8f4c2b10d813a9c7%3A0x4042823298a0080b`).

**Hallazgos clave**
- 🔴 **C1** — Coordenadas schema vs pin GBP ≈ 4.7 km (→ T-03).
- 🔴 **C2** — Horario 7 PM (schema/páginas internas) vs 8 PM (home) (→ T-04).
- 🟠 **H1** — Dirección en 4 variantes; teléfono `+529983211547` SÍ consistente (→ T-05).
- 🟠 **H2** — Sin perfiles tier-1 verificados (Doctoralia MX, Médicos MX, BBB) (→ T-12).
- 🟠 **H3** — Sin enlace/widget para dejar reseña de Google pese a declarar 47 reseñas (CID disponible en el embed) (→ T-09).
- 🟡 **M3** — `LocationSection.tsx:72` usa embed `?q=<nombre>` (frágil) mientras producción sirve embed `pb=` con Place ID; alinear el source al Place ID permanente.
- 🟡 **M4** — Sin nodos `Review` de testimonios en home (→ T-09).
- 🟡 **M5** — `prefers-reduced-motion` ausente en `LocationSection`/`TestimonialsSection` (→ T-13).

**Limitación:** la categoría primaria del GBP (factor #1 de ranking local) y la proximidad del usuario no son auditables por HTTP. Verificar que el GBP esté reclamado, con categoría "Neuropsicólogo"/"Psicólogo".

---

## 9. Deep-dive: Search Experience (SXO) — 71 / 100

**Qué funciona:** credibilidad clínica bien ejecutada (cédula en title/hero/badge/schema); reseñas con nombres; arquitectura de contenido informacional completa con enlaces a servicios; WhatsApp con mensajes pre-escritos contextuales; precio visible y sin ambigüedad en tarjetas/FAQ.

**Hallazgos clave**
- 🔴 **Critical** — Imágenes placeholder (ver §7) (→ T-02).
- 🟠 **High** — `FloatingButtons` solo móvil (`lg:hidden`): en desktop, las páginas de servicio no tienen CTA de contacto fijo tras pasar el hero.
- 🟠 **High** — `/precios` huérfana: no está en `Navbar.tsx` ni enlazada desde home (solo en sitemap) (→ T-06).
- 🟠 **High** — Mismatch page-type para "neuropsicólogo Cancún": el SERP lo dominan directorios (Doctoralia, Psychology Today, Top Doctors); una landing individual no compite ahí → concentrar esfuerzo en consultas específicas ("evaluación TDAH niños Cancún", "diagnóstico autismo ADOS-2 Cancún") y aparecer en esos directorios (→ T-12).
- 🟡 **Medium** — Embed de Cal.com no presente en el HTML SSR (solo con JS): añadir CTA textual intermedio que ancle al calendario.
- 🟡 **Medium** — Precio no aparece above-the-fold en las páginas de servicio (solo en FAQ); subir credenciales rápidas + precio al hero.
- 🟢 **Low** — Sin fecha visible en artículos (→ T-11); typo en H1 de `/precios` (→ T-07).

**Scores por persona**
- **Persona A (madre, hijo 5-17):** 80/100 — gap principal: precio no en el hero de servicio; Cal.com al fondo.
- **Persona B (adulto 25-45, sospecha TDAH):** 72/100 — gap: la tabla comparativa neuropsicología vs psicología (su duda crítica de credibilidad) está en la sección 5 del DOM, no arriba.

**Gap por 7 dimensiones:** Page Type 12/15 · Content Depth 13/15 · UX Signals 9/15 · Schema 14/15 · **Media 5/15** · Authority 14/15 · Freshness 5/10 → **72/100**.

---

## 10. Hallazgos consolidados por severidad

| Sev | Hallazgo | Evidencia | Tarea |
|---|---|---|---|
| 🔴 Critical | Imágenes placeholder en producción (×75) | `grep -rn placehold.co src/` | T-02 |
| 🔴 Critical | Coordenadas geo desalineadas ~4.7 km | `index.tsx:149/348/349` vs `:1066/1129` | T-03 |
| 🔴 Critical | Horario inconsistente 8 PM vs 19:00 | `LocationSection.tsx:45` vs schema | T-04 |
| 🟠 High | `<title>` de home vacío en SSR | `curl` home + `index.tsx:342` | T-01 |
| 🟠 High | Dirección NAP en 4 variantes | `site.ts:21`, `LocationSection.tsx:32`, schemas | T-05 |
| 🟠 High | `/precios` huérfana (sin enlaces internos) | `Navbar.tsx:7`; `grep precios index.tsx` | T-06 |
| 🟠 High | `lang="es"` en vez de `es-MX` | `_document.tsx:72` | T-08 |
| 🟠 High | Sin CTA fijo en desktop (páginas servicio) | `FloatingButtons` `lg:hidden` | (UX) |
| 🟠 High | Mismatch page-type "neuropsicólogo Cancún" | análisis SERP | T-12 |
| 🟡 Medium | `og:image` faltante en `/precios` y `/blog` | `curl` (og:image vacío) | T-08 |
| 🟡 Medium | `HowTo` deprecado en 3 páginas de servicio | `grep HowTo src/pages` | T-10 |
| 🟡 Medium | Sin nodos `Review` en home + sin enlace de reseña | `TestimonialsSection.tsx:4` | T-09 |
| 🟡 Medium | Nombre de negocio en 4 variantes | schemas vs GBP | T-05 |
| 🟡 Medium | `prefers-reduced-motion` en 9 componentes | `grep -L useReducedMotion` | T-13 |
| 🟡 Medium | Cal.com / precio no en above-the-fold | DOM páginas servicio | (UX/contenido) |
| 🟡 Medium | Embed `?q=` en source vs `pb=` en prod | `LocationSection.tsx:72` | T-05/local |
| 🟢 Low | Typo H1 `/precios` ("eldiagnóstico") | `precios.tsx:202` | T-07 |
| 🟢 Low | Sin fecha visible en artículos | `BlogLayout.tsx` | T-11 |
| 🟢 Low | Faltan security headers | `curl -sI` | T-14 |
| 🟢 Low | `sitemap.xml` lastmod uniforme | `curl sitemap.xml` | T-15 |
| 🟢 Low | `llms.txt` ausente (opcional) | `curl` → 404 | T-16 |
| 🟢 Low | Fuentes vía `<link>` (no `next/font`) | `_document.tsx:74-76` | (perf) |

---

## 11. Metodología y limitaciones
- **Evidencia en vivo:** `curl` al HTML SSR de 7 rutas + `robots.txt`, `sitemap.xml`, `llms.txt`, headers y prueba de 404.
- **Evidencia de código:** `Read`/`Grep` sobre `src/` (este repo es la fuente del sitio).
- **Sub-agents:** técnico, contenido, schema, local, GEO, SXO (de `claude-seo`).
- **No verificable en esta sesión:** CWV de campo (sin CrUX/Lighthouse), datos internos del GBP (categoría/fotos/Q&A/posts), posiciones reales en local pack, y métricas que requieren extensiones de pago (DataForSEO) o credenciales Google.
- **Requiere confirmación del dueño antes de editar:** ubicación/coordenadas reales, horario de cierre real, dirección postal canónica, e imágenes reales. Ver bloqueadores 🔒 en el plan.

> **Reproducir / re-medir:** `/seo audit https://www.psicologakarentrujillo.com.mx` · validar schema con `/seo schema` · baseline de regresiones con `/seo drift baseline`.
