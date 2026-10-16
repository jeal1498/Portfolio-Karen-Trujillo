# Memory — Preferencias y Aprendizajes

## Tono y Comunicación

- Tono preferido: directo, eficiente, sin introducciones innecesarias.
- No usar frases de relleno ni preámbulos antes de responder o actuar.

## Protocolo de Memoria

- Usar este archivo (`memory.md`) para registrar preferencias, correcciones y aprendizajes clave.
- Actualizar de forma proactiva sin pedir permiso; confirmar en el chat cuando se guarde nueva información.
- Si una preferencia cambia, reescribir la entrada anterior con la nueva versión.

## Flujo de Trabajo — Propuestas

- Los cambios aprobados se suben **directo a `main`** (pedido el 14 oct 2026), sin ramas intermedias.

- Antes de implementar cualquier cambio propuesto (nuevo o corregido), explicar el enfoque primero y esperar confirmación explícita del usuario.
- No ejecutar ediciones de código hasta recibir aprobación.

## Videos de Karen — flujo por etapas

- Desde el 16 oct 2026 cada video sigue el flujo con **una aprobación por etapa** (transcripción y estructura → tabla de elementos → video → portada → copy → hecho), igual que en Checa. Está en `.claude/skills/videos-karen/SKILL.md`.
- Carpetas `marketing/videos/Marca Personal/NN - Nombre/` (NN = orden de subida), calendario en `marketing/plan/calendario.md`, `git pull` antes de editar y video final commiteado una sola vez. La segunda versión de un tema es otro video con un guion diferente sobre el mismo tema, con su propio número, en la misma cuenta. La numeración 01 a 05 está confirmada.
- El estilo visual de Karen no cambia (ciruela y lavanda, Outfit y Maven Pro). El video final se commitea una sola vez, ya aprobado. «Hecho» no es «Publicado».

## Impeccable Skill

- Si context.mjs reporta UPDATE_AVAILABLE, actualizar siempre sin preguntar: `npx impeccable skills update`.
- Confirmar en el chat que se actualizó (o que ya estaba en la versión más reciente).

---

## Campaña Pop-Up Chetumal — Estado actual

**Archivo de propuesta:** `propuesta-campana-chetumal.md` (en la raíz del repo)  
**Estado:** ✅ Landing lista — solo falta la dirección del consultorio en Chetumal

### Implementación completada (2026-06-27)

- ✅ `src/pages/valoracion-chetumal.tsx` — landing page completa con precios, instrumentos y fechas
- ✅ Tiers: solo Estándar + Completo (Básico eliminado)
- ✅ Precios actualizados y confirmados por Karen
- ✅ Batería de instrumentos corregida (CUMANES, Masking, IDARE en lugar de WISC-V)
- ✅ Anticipo: 50% al reservar + 50% en primera sesión
- ✅ Cupos: 10 (constante `MAX_SLOTS`)
- ✅ Fechas: 21 de julio al 3 de agosto (tentativas, fácil cambiar)
- ✅ Copy hero: versión A clínica
- ✅ 3 scripts de video para Facebook (sección 5 del doc) — listos para grabar
- ✅ Brief visual de campaña (sección 6 del doc) — paleta, tipografía, estructura visual

### Auditoría completa aplicada (2026-06-28)

Todos los issues P0 de la campaña fueron corregidos y pusheados a `main`:

- ✅ FAQ item 3 reescrito — eliminada mención a tier Básico (el schema FAQPage también quedó limpio)
- ✅ "Los tres niveles" → "Ambos niveles" en intro de pricing
- ✅ Subtítulo hero menciona fecha y "sin necesidad de hacer el viaje"
- ✅ Anticipo en tarjeta: "50% al reservar · 50% en la primera sesión"
- ✅ Badge de urgencia más visible (text-[9px] → text-[10px] sm:text-xs)
- ✅ CTA secundario hero legible (text-[9px] → text-xs)
- ✅ Dirección placeholder ya no se expone al usuario — muestra "Se confirma al reservar vía WhatsApp"
- ✅ Label "Máximo alcance diagnóstico" en tarjetas Completo de los 3 tabs
- ✅ Nueva FAQ: "¿Cuándo recibo el informe?" (total: 7 items)
- ✅ Schema: organizer tipado como ['Person','Physician'] + medicalSpecialty
- ✅ Schema: offers con url, validFrom, validThrough
- ✅ Meta tags geo.position e ICBM para localidad Chetumal
- ✅ propuesta-campana-chetumal.md: Script 2 corregido (WISC-V → CUMANES), carrusel slide 5 ($2,800 → $3,900), Script 3 con apertura de contexto para Facebook

### Para publicar la landing solo falta 1 dato

```typescript
// src/pages/valoracion-chetumal.tsx — línea 18
const CHETUMAL_ADDRESS = '[DIRECCIÓN — pendiente]';  // → dirección real del consultorio
```

### Canal de redes sociales recomendado

- **Facebook** — canal principal. Padres 30–50 años que toman la decisión están en Facebook, no en TikTok. Grupos locales de Chetumal son canal orgánico de alto impacto.
- **TikTok** — canal secundario. Para adultos 25–35 con TDAH no diagnosticado.
- **Formato:** Video vertical (Reels) > imagen estática. Karen a cámara, sin setup elaborado.

### Precios confirmados por Karen (2026-06-27)

| Tier | TDAH Niños/Adultos | Autismo/TEA |
|---|---|---|
| ~~Básico~~ | ~~eliminado~~ | ~~eliminado~~ |
| Estándar ★ ancla | $3,900 MXN | $4,500 MXN |
| Completo | $5,000 MXN | $5,800 MXN |

### Estructura de tiers — DECISIÓN FINAL

**Solo Estándar + Completo** (Básico eliminado de la campaña). Decisión tomada por el equipo técnico a solicitud de Karen: con 10 cupos en formato pop-up, 2 opciones convierten mejor y la diferencia de precio entre Básico y Estándar ($400) no justifica la complejidad.

### Batería de instrumentos — CONFIRMADA

| Tipo | Estándar | Completo |
|---|---|---|
| TDAH Niños | CONNERS, EDAH, CDI | CONNERS, EDAH, CDI, **CUMANES**, **Masking**, **IDARE** |
| TDAH Adultos | DIVA 2.0, CONNERS Adultos, IDARE | DIVA 2.0, CONNERS Adultos, IDARE, Inv. Depresión |
| TEA | ADOS-2, ADI-R | ADOS-2, ADI-R, **CUMANES** |

**Notas clínicas:**
- CONNERS y EDAH son escalas para padres y maestros (no aplicadas directamente al niño)
- WISC-V **eliminado** de todos los tiers (era para inteligencia — no aplica en este formato)
- CUMANES aplica tanto en TDAH como en TEA: mide función ejecutiva, flexibilidad mental, inhibición de respuestas y focalización de la atención (marcador neuropsicológico del TDAH)
- AQ-10 ya no aparece en la landing (estaba en el Básico TEA, que fue eliminado)

### Decisiones de Karen — RESPONDIDAS

| # | Pregunta | Respuesta |
|---|---|---|
| P1 | Precios | Confirmados (con ajustes en P2) |
| P2 | Instrumentos/sesiones | Quita WISC-V, agrega CUMANES (TDAH+TEA) + Masking + IDARE (TDAH Niños). AQ-10 correcto. |
| P3 | Anticipo | 50% al reservar + 50% en la primera sesión |
| P4 | Tiers | Delegado al equipo → Estándar + Completo (sin Básico) |
| P5 | Fechas | **21 de julio al 3 de agosto** (tentativo) — implementado en código |
| P6 | Dirección | Sin confirmar — **placeholder activo en código** |
| P7 | Cupos | 10 máximo → `MAX_SLOTS = 10` en código |
| P8 | Flujo de reserva | Solo WhatsApp |
| P9 | Copy hero | Versión A (clínica) — italic emocional eliminado |

---

## Software Clínico que el usuario está construyendo para Karen

El usuario está desarrollando **dos productos separados** para la Psicóloga Karen Trujillo:

1. **Sitio web de marketing** — este repo (`Portfolio-Karen-Trujillo`). Next.js 14 + Tailwind + shadcn. Sirve para atraer pacientes y agendar consultas.
2. **App clínica PsychoCore** — repo separado (`expedientes-clinicos-neuro`). Gestión interna de expedientes: pacientes, anamnesis, evaluaciones neuropsicológicas, notas SOAP, documentos. Solo para uso de Karen, no es pública.

Ambos proyectos son independientes. Este repo (`Portfolio-Karen-Trujillo`) **no contiene código de PsychoCore**.

---

## App Clínica PsychoCore — Contexto General

Además del sitio web de marketing (este repo), Karen tiene una **app clínica separada** llamada **PsychoCore** (repo: `expedientes-clinicos-neuro`) para gestionar expedientes de pacientes. Las dos apps son independientes.

**Stack PsychoCore:**
- Next.js 14.2.15 App Router · TypeScript 5 · Node ≥20
- Supabase JS client directo (sin ORM) · PostgreSQL 17 · región us-west-2
- CSS Modules (sin Tailwind, sin shadcn) · sin Zod · sin react-hook-form
- Vercel deployment · Supabase Auth · Supabase Storage

**Patrones de código PsychoCore (respetar siempre):**
- Server Components para SELECT · Server Actions para INSERT/UPDATE
- Formularios HTML nativos: `<form action={serverAction}>` + `SubmitButton` con `useFormStatus`
- Errores vía URL query params: `redirect('...?error=' + encodeURIComponent(msg))`
- Auditoría SELECT manual con `insertAuditLog()` en cada Server Component
- Migraciones solo con `mcp__Supabase__apply_migration` (no CLI)
- Navegación con `<a href>` nativo (no `<Link>` de Next.js)
- Gráficas SVG inline en Server Components (sin librería de charts)
- Inmutabilidad NOM-004: patrón `is_locked + locked_at + hash_integridad` + trigger `prevent_locked_*_update()`

---

## App Clínica — Blueprint de Evaluaciones Neuropsicológicas

### Contexto del módulo

Se diseñó un blueprint completo para el módulo de baterías de evaluación neuropsicológica. La unidad de trabajo clínico es la **batería** (no el instrumento suelto). Los 6 instrumentos que usa Karen: CONNERS-3, BRIEF-2, ADOS-2, WISC-V, CAARS-2, CPT-3.

### Estado de implementación (verificado 2026-06-25)

| Área | Estado |
|------|--------|
| DB: tablas, ENUMs, RLS, triggers, semillas | ✅ 100% completo |
| Constantes (`src/lib/evaluaciones/constants.ts`) | ⚠️ Parcial — existe con nombre/ruta incorrecto y 6/8 exports faltantes |
| Tipos TypeScript (`database.types.ts`) | ❌ No actualizado |
| Rutas `baterias/` (8 archivos) | ❌ No implementado |
| Server Actions (crearBateria, guardarPuntajes, firmarBateria) | ❌ No implementado |
| Formularios por instrumento | ❌ No implementado |
| PDF (`@react-pdf/renderer`) | ❌ No instalado |
| Integración expediente del paciente | ❌ Enlace faltante |

### Problema concreto del archivo de constantes

- Existe: `src/lib/evaluaciones-constants.ts` (nombre plano, exports incompletos)
- Debe ser: `src/lib/evaluaciones/constants.ts` (subdirectorio, 8 exports completos)
- 3 archivos legacy ya importan de la ruta incorrecta — actualizar sus imports al corregir

### Tablas nuevas en DB (ya aplicadas)

- `instrumentos_catalogo` — catálogo de los 6 instrumentos
- `baterias_evaluacion` — con `is_locked`, `hash_integridad`, `impresion_diagnostica`, `recomendaciones`
- `evaluacion_instrumento_detalle` — una fila por instrumento × informante
- `normas_conversion` — tablas de normas (vacía, para uso futuro)

### Patrones clínicos clave

- **CONNERS-3 y BRIEF-2:** multi-informante (padre + maestro) — la app muestra gráfica comparativa SVG de ambos
- **ADOS-2:** módulos 1-4 según nivel de lenguaje; clasificación automática no_tea/tea_probable/tea según puntos de corte hardcodeados en constants.ts
- **WISC-V:** capturar puntajes escalares (1-19) por subprueba; Karen captura los índices también desde el protocolo físico
- **CPT-3:** solo importar T-scores del output — no recalcular desde ítems
- Umbral clínico CONNERS-3: T ≥ 70 · Umbral clínico BRIEF-2: T ≥ 65 (diferente)

### Flujo de firma de batería

1. Todos los instrumentos puntuados → Karen escribe impresión diagnóstica + recomendaciones
2. Generar PDF con `@react-pdf/renderer` → subir a bucket `reportes-escaneados`
3. Calcular SHA-256 del contenido clínico → UPDATE con `is_locked = true`, `estado = 'firmado'`
4. El trigger `trg_baterias_lock_guard` bloquea cualquier UPDATE posterior

---

---

## Optimización CRO — WhatsApp (2026-06-28)

### Mensajes optimizados en componentes compartidos

| Componente | Problema | Fix |
|---|---|---|
| `FloatingButtons.tsx` | "sesión"/"consulta" — terminología de terapia | "valoración neuropsicológica. ¿Cuál es la disponibilidad?" + migrado a `waUrl()` |
| `Hero.tsx` | Genérico sin siguiente paso | Añade "¿Podrías orientarme sobre el proceso y la disponibilidad?" + migrado a `waUrl()` |
| `Navbar.tsx` (x2) | Sin llamada a acción | Añade "¿Cuál es la disponibilidad?" |
| `Footer.tsx` | Genérico | Añade "¿Cuál es la disponibilidad?" |
| `FAQSection.tsx` | URL hardcodeada con encoding manual | `waUrl()` + contexto "acabo de leer las preguntas frecuentes" |
| `ServicesSection.tsx` | Sin contexto de paciente, encoding inconsistente | TDAH niños → "para mi hijo/a", TDAH adultos → "para mí", todo a `waUrl()` |
| `BlogLayout.tsx` | Encoding incompleto en default | `encodeURIComponent()` completo + "¿Cuál es la disponibilidad?" |

### FloatingButtons añadido a 9 páginas que no lo tenían

`index.tsx` · `evaluacion-tdah-ninos.tsx` · `evaluacion-tdah-adultos.tsx` · `evaluacion-autismo-cancun.tsx` · `neuropsicologia-cancun.tsx` · `neuropsicologia-zona-hotelera-cancun.tsx` · `blog/tdah-adultos-diagnostico-tardio.tsx` · `blog/que-es-ados-2-autismo.tsx` · `blog/senales-tdah-ninos.tsx`

### Patrón de mensaje correcto (respetar en futuros CTAs)

```
"Hola Karen, [contexto de dónde vienen o qué leyeron]. [Qué quieren + para quién]. ¿Cuál es la disponibilidad?"
```

- Siempre usar `waUrl()` de `@/lib/contact` — nunca URLs hardcodeadas con `%20`
- Nunca usar "sesión" o "consulta" para las evaluaciones neuropsicológicas
- Incluir contexto de paciente cuando se conoce (hijo/a vs adulto vs TEA)

---

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

---

## Sesión CRO — Plan por Bloques (2026-06-30)

**Branch:** `claude/plan-goal-loop-execution-8ovtcv`  
**PR:** #27 mergeado a main

### Cambios implementados

#### Bloque A — Quick wins de fricción

| Item | Archivo | Cambio |
|------|---------|--------|
| A1 Contraste footer | `Footer.tsx` | `text-[#c6bce2]/50` → `/75` en `FooterCol` (WCAG AA) |
| A2 CTA doble Hero | `index.tsx` | Eliminado botón "Ver servicios" — solo queda WhatsApp |
| A3 Micro-CTA footer | `Footer.tsx` | Nuevo bloque `¿Lista para dar el primer paso? / Agendar por WhatsApp →` antes del copyright |

#### Bloque B — SymptomChecker contextual

| Item | Archivo | Cambio |
|------|---------|--------|
| B1 WA personalizado | `SymptomCheckerHome.tsx` | `buildWaMsg()` genera mensaje dinámico según cantidad de síntomas seleccionados (0→genérico, 1+→personalizado con conteo y área) |

#### Bloque C — Reordenamiento de secciones

| Item | Archivo | Cambio |
|------|---------|--------|
| C1 Homepage | `index.tsx` | Eliminadas: Stats Bar + "Por qué Neuropsicología". Nuevo orden: Hero → SymptomChecker → Servicios → **Testimonios** → About → Proceso → FAQ → Blog → Ubicación |
| C2 TDAH niños | `evaluacion-tdah-ninos.tsx` | Tabla comparativa "Diferenciador" movida de sección 6 (mid-page) a posición 10b (post-FAQ, pre-Pricing) |

#### Bloque D — Copy emocional blog

| Item | Archivo | Cambio |
|------|---------|--------|
| D1 Señales TDAH | `blog/senales-tdah-ninos.tsx` | 14→12 señales (removidas 2 de inatención); h2 actualizado; párrafo puente emocional antes del CTA; botón "¿Reconoces esto? Hablemos →" |

#### Bloque E — No implementado (requiere infraestructura o decisión de Karen)

- E1: FloatingButtons contextual por sección visible (IntersectionObserver)
- E2: Lead magnet PDF (requiere email integration)

### PageSpeed Insights — Baseline (2026-06-30)

URL: `https://pagespeed.web.dev/analysis/https-www-psicologakarentrujillo-com-mx/olmi4k7r7m?form_factor=mobile`  
Resultado: **Sin datos suficientes** — Chrome UX Report no tiene datos reales para esta página al 30-jun-2026.  
Acción: Re-verificar en 30 días cuando haya más tráfico acumulado.

---

## Protocolo para Trabajo entre Conversaciones

Cuando el usuario pide generar instrucciones para otra conversación:

1. **Antes de planear:** solicitar el estado técnico real (stack, schema, archivos, patrones) — nunca planear a ciegas
2. **Blueprint primero:** generar el diseño de alto nivel con decisiones de arquitectura
3. **Instrucción `/plan`:** texto markdown autocontenido que incluya stack, patrones a respetar, restricciones absolutas, y código de referencia concreto (no pseudocódigo cuando hay un patrón exacto disponible)
4. **Verificación:** generar prompt de verificación separado para confirmar implementación antes de dar por completado
5. **Continuación:** si la verificación revela implementación parcial, generar prompt de continuación que parta del estado real verificado

### Preguntas técnicas a solicitar antes de planear (checklist)

Para cualquier módulo nuevo en PsychoCore, pedir siempre: stack completo, DDL de tablas relevantes, rutas exactas de archivos, patrón de código real (copiar el Server Action o componente más complejo), sistema de auth, storage configurado, herramienta de PDF si existe, librería de forms/validación, patrón de errores, y si hay migraciones con tracking o aplicadas directamente.

---

## Medición + Google Ads — Estado (14 oct 2026)

- Si el usuario dice **«empecemos con el plan»**: leer `docs/google-ads/PLAN.md` y `REPARTO.md`, recapitular en corto qué está hecho y cuál es el siguiente paso (normalmente C1 → B1).

Plan completo y estado en **`docs/google-ads/PLAN.md`** (leer primero); reparto de tareas en `docs/google-ads/REPARTO.md`. Guía de cuentas para Karen en `docs/google-ads/GUIA-KAREN.md`.
- ✅ Fase 1 en código: GA4 con Consent Mode v2 + aviso de cookies + eventos `contacto_whatsapp`, `contacto_llamada`, `contacto_correo`, `agendar_cita`, `cita_agendada`. Se activa con `NEXT_PUBLIC_GA_ID` en Vercel.
- ⏳ Falta: Karen crea GA4 / Search Console / Google Ads y pone el ID en Vercel.
- ✅ Fase 2 en borrador: PALABRAS-CLAVE.md, ANUNCIOS.md, REVISION-PAGINAS.md + evento `clic_agendar`. Falta confirmar volumen/CPC con las cuentas.
- Regla: pagar por búsquedas con intención de agendar, no por las más buscadas (esas van al blog).
