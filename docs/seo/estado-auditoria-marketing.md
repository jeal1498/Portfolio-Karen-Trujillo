# Estado de la auditoría de marketing

> Movido desde `memory.md` (17 oct 2026) para que ese archivo quede solo con preferencias.

## Skills de Marketing Instalados (2026-06-27)

Se instalaron 10 skills de `coreyhaines31/marketingskills` en `.agents/skills/` con symlinks en `.claude/skills/`. Estos son los únicos relevantes para un sitio clínico de consulta.

| Skill instalado | Para qué sirve en este repo |
|---|---|
| `product-marketing` | Base — SSOT de producto. Lee `.agents/product-marketing.md` |
| `copywriting` | Escribir/mejorar copy de páginas de servicio y landing principal |
| `cro` | Optimizar conversiones: que la mamá ansiosa agende consulta |
| `seo-audit` | Auditar gaps de SEO on-page en todas las rutas |
| `ai-seo` | Optimizar para aparecer en respuestas de ChatGPT/Perplexity/Google AI |
| `schema` | Reforzar y completar JSON-LD (LocalBusiness, FAQPage, MedicalBusiness, etc.) |
| `content-strategy` | Planificar próximos artículos del blog con criterio de demanda real |
| `copy-editing` | Revisar y pulir textos existentes en páginas y blog |
| `customer-research` | Entender mejor la persona "mamá con años de incertidumbre" |
| `marketing-psychology` | Aplicar principios de reducción de ansiedad y prueba social al copy |

---

## Auditoría de Marketing — Estado de implementación (actualizado 2026-06-28)

**Archivos de referencia:**
- `.agents/product-marketing.md` — SSOT del producto (228 líneas)
- `.agents/marketing-audit-2026-06-27.md` — Auditoría completa con 5 entregables (617 líneas)
- `.agents/implementacion-correcciones-auditoria.md` — Plan de implementación ejecutado

**Branch de implementación:** `claude/audit-corrections-implementation-1yrwnz` (mergeado a `main` el 2026-06-28)

---

### Issues P0 — TODOS COMPLETADOS ✅

| ID | Archivo | Estado | Notas |
|----|---------|--------|-------|
| P0-01 | `src/pages/precios.tsx` | ✅ Hecho | Precio TEA corregido: $8,300 → $8,500 MXN |
| P0-02 | `src/pages/evaluacion-tdah-adultos.tsx` | ✅ Hecho | `proceso[1].desc` + `instrumentos[]` actualizados con CAARS-2, WAIS-IV, BRIEF-2A, CPT-3 |
| P0-03 | `src/pages/index.tsx` | ✅ Ya estaba | Schema ya usaba `dangerouslySetInnerHTML` en `<Head>` — no requirió cambios |
| P0-04 | `src/pages/index.tsx` | ✅ Hecho | Título reducido a 59 chars: "Neuropsicóloga Cancún — TDAH y Autismo · Cédula 11009616" |

---

### Issues P1 — Estado mixto

| ID | Problema | Estado | Notas |
|----|----------|--------|-------|
| P1-01 | og:image en páginas de servicio (retrato 465×533 vs 1200×630) | ✅ Hecho | 9 OG images (1200×630) en `/public/`, 5 blog hero SVGs (1200×675) en `/public/blog/`. Meta tags actualizados en las 9 páginas. Referencia rota `lavender-para-escuelas-640x400.svg` corregida → `lavender-servicio-640x400.svg`. |
| P1-02 | Article schema `image` → hero SVG del artículo | ✅ Hecho | 11 artículos actualizados; `dateModified: '2026-06-17'` corregido en artículos con fechas 2025 |
| P1-03 | `/valoracion-chetumal` página huérfana | ✅ Parcial | Añadida a `sitemap.xml` (priority 0.85, changefreq weekly). Falta enlace en Navbar. Dirección real aún pendiente de Karen (línea 18 de valoracion-chetumal.tsx) |
| P1-04 | Speakable schema — IDs verificados | ✅ Verificado | Los 4 IDs existen en JSX: `que-es-neuropsicologia`, `diferenciadores`, `karen-perfil`, `preguntas-frecuentes` — sin cambios requeridos |
| P1-05 | `REVIEWS.reviewCount` actualización mensual | ✅ Hecho | Actualizado a 18 (confirmado con GBP real). Tarea recurrente: revisar GBP mensualmente. |
| P1-06 | `dateModified` en artículos tocados junio 2026 | ✅ Hecho | Cubierto en P1-02 |
| P1-07 | `sameAs` Doctoralia/PsychologyToday/LinkedIn | ⏳ Pendiente | Karen aún no ha creado los perfiles de directorios |

---

### Issues P2 — Estado mixto

| ID | Problema | Estado | Notas |
|----|----------|--------|-------|
| P2-01 | H1 homepage sin keywords TDAH/Autismo | ✅ Hecho | Añadido `<h2>` "Especialista en diagnóstico de TDAH y Autismo" sobre H1 |
| P2-02 | Blog index sin CollectionPage schema | ⏳ Pendiente | Trabajo futuro |
| P2-03 | FloatingButtons sin `prefers-reduced-motion` | ✅ Hecho | Reescrito con `useReducedMotion()` de Framer Motion |
| P2-04 | Páginas SEO locales superpuestas | ✅ Verificado | Ambas páginas tienen diferenciación suficiente — sin cambios requeridos |
| P2-05 | Falta `priceRange` en MedicalBusiness | ✅ Ya estaba | `priceRange: '$8,300 - $8,500 MXN'` ya existía en index.tsx |
| P2-06 | Blog sin enlace contextual a conversión | ✅ Hecho | Los 11 artículos recibieron ≥1 `<Link>` contextual hacia página de servicio correspondiente |
| P2-07 | `/valoracion-chetumal` sin schema LocalBusiness | ⏳ Pendiente | La landing ya tiene Event schema; LocalBusiness es complementario |

---

### Mejoras CRO — TODAS COMPLETADAS ✅

| ID | Componente | Estado | Notas |
|----|-----------|--------|-------|
| CRO-01 | `index.tsx` | ✅ Hecho | Micro-copy bajo CTA WA: "Respuesta habitual en menos de 2 horas · Lun–Sáb" |
| CRO-02 | `SymptomChecker.tsx` | ✅ Hecho | CTA WA inline tras resultado del cuestionario |
| CRO-03 | `FloatingButtons.tsx` | ✅ Hecho | Desktop button (`hidden lg:flex`) + `useReducedMotion` |
| CRO-04 | `para-escuelas.tsx` | ✅ Hecho | `<FloatingButtons />` importado y renderizado |
| CRO-05 | `index.tsx` routing cards | ✅ Hecho | Precios visibles: TDAH $8,300 · TEA $8,500 |
| CRO-06 | `index.tsx` reseñas | ✅ Hecho | Bloque "47 reseñas" enlazado a Google Maps CID |
| CRO-07 | `evaluacion-tdah-ninos.tsx` callout | ✅ Hecho | Reescrito con timeframe "3-4 semanas" y "claridad dura toda la vida" |

---

### Tareas completadas recientemente

- ✅ **README.md** — generado con 12 secciones: título, demo, stack, estructura, páginas, componentes, local dev, variables de entorno, guías de contribución, design system, SEO y docs relacionados. Mergeado a `main` el 2026-06-29.

### Tareas pendientes para próxima sesión

1. **LIMPIEZA DEL REPO** — eliminar archivos y carpetas que no son necesarios. Candidatos identificados:
   - 14 imágenes huérfanas en `public/blog/` (versiones antiguas, nunca referenciadas en código):
     `2b1f47-autismo-nivel-1-600x340.svg`, `5b4e7f-burnout-vs-tdah-600x340.svg`, `5b4e7f-tdah-adultos-600x340.svg`,
     `blush-ados-2-600x340.svg`, `blush-autismo-tea-640x400.svg`, `blush-costo-autismo-600x340.svg`,
     `dark-cancun-600x340.svg`, `f8f7fc-tdah-vs-ansiedad-600x340.svg`, `lavender-tdah-adultos-640x400.svg`,
     `lavender-tdah-en-ninas-600x340.svg`, `lavender-tdah-en-ninos-900x500.svg`, `lavender-tdah-inatento-600x340.svg`,
     `lavender-tdah-infantil-640x400.svg`, `sand-costo-tdah-600x340.svg`
   - Revisar si hay otras carpetas o archivos raíz innecesarios (scripts temporales, docs de planificación, etc.)
2. **P1-07 perfiles de directorio** — Karen debe crear Doctoralia / PsychologyToday / LinkedIn y compartir URLs para añadir a `sameAs` en schema Physician
3. **P1-03 Navbar** — añadir enlace a `/valoracion-chetumal` cuando Karen confirme la dirección
4. **CHETUMAL_ADDRESS** — Karen debe proveer la dirección real del consultorio en Chetumal (`valoracion-chetumal.tsx:18`)
5. **P2-02 CollectionPage schema** — añadir schema al índice del blog
6. **P2-07 LocalBusiness schema** — añadir a `/valoracion-chetumal` como complemento al Event schema existente

### Entregables de la auditoría 2026-06-27 — COMPLETADOS ✅

| Entregable | Estado |
|---|---|
| E1: Correcciones P0+P1 | ✅ Commiteado |
| E2: P2-01 keywords H1 | ✅ Commiteado |
| E3: CRO WhatsApp (7 componentes) | ✅ Commiteado |
| E4 Copy 1: evaluacion-tdah-adultos.tsx (instrumentos detallados) | ✅ Commiteado |
| E4 Copy 2: index.tsx (H1 + subtítulo hero) | ✅ Commiteado |
| E4 Copy 3: evaluacion-autismo-cancun.tsx (sección #por-que-cancun) | ✅ Commiteado |
| E5 Artículo 1: como-es-una-evaluacion-neuropsicologica-ninos | ✅ Commiteado |
| E5 Artículo 2: tdah-ninas-diagnostico-tardio-cancun | ✅ Commiteado |
| E5 Artículo 3: diferencia-tdah-trastorno-aprendizaje | ✅ Commiteado |
| E5 Artículo 4: resultado-positivo-autismo-que-sigue | ✅ Commiteado |
| E5 Artículo 5: evaluacion-neuropsicologica-adultos-cancun | ✅ Commiteado |
| P2-06: 11 artículos con internal links | ✅ Commiteado |
| prompts-gemini-imagenes.html (14 prompts) | ✅ Commiteado |

---

### Fortalezas del sitio (no tocar)

1. Schema JSON-LD más completo de la categoría local (MedicalBusiness + Physician + Reviews + FAQPage)
2. AI bots correctamente permitidos: GPTBot, ClaudeBot, PerplexityBot — `robots.txt` y `llms.txt` correctos
3. Copy emocional específico: "No es falta de voluntad. Puede ser tu cerebro"
4. 18 reseñas con nombres propios — prueba social verificable (GBP real confirmado 2026-06-28)
5. Precios publicados — diferenciador de transparencia vs competencia
6. Blog con 16 artículos (11 existentes + 5 nuevos de Entregable 5), hero images propias 1200×675, og:image corregidas en Article schema, internal links en todos los artículos
