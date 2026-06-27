# Memory — Preferencias y Aprendizajes

## Tono y Comunicación

- Tono preferido: directo, eficiente, sin introducciones innecesarias.
- No usar frases de relleno ni preámbulos antes de responder o actuar.

## Protocolo de Memoria

- Usar este archivo (`memory.md`) para registrar preferencias, correcciones y aprendizajes clave.
- Actualizar de forma proactiva sin pedir permiso; confirmar en el chat cuando se guarde nueva información.
- Si una preferencia cambia, reescribir la entrada anterior con la nueva versión.

## Flujo de Trabajo — Propuestas

- Antes de implementar cualquier cambio propuesto (nuevo o corregido), explicar el enfoque primero y esperar confirmación explícita del usuario.
- No ejecutar ediciones de código hasta recibir aprobación.

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

## Auditoría de Marketing — Resultados (2026-06-27)

**Archivos de referencia:**
- `.agents/product-marketing.md` — SSOT del producto (228 líneas)
- `.agents/marketing-audit-2026-06-27.md` — Auditoría completa con 5 entregables (617 líneas)
- `.agents/marketing-audit-report.html` — Reporte visual interactivo

**Método:** Análisis de archivos fuente (el sitio live devuelve 403 Cloudflare). Se leyeron 21 URLs + 11 artículos de blog + componentes React + schemas JSON-LD.

---

### Issues P0 — Críticos (corregir primero)

| ID | Archivo | Problema | Fix |
|----|---------|----------|-----|
| P0-01 | `src/pages/precios.tsx` | Precio TEA: $8,300 MXN (correcto: $8,500 MXN) | Cambiar el valor en precios.tsx |
| P0-02 | `src/pages/evaluacion-tdah-adultos.tsx` | Sección `proceso` lista DIVA 2.0/IDARE (el FAQ de la misma página lista CAARS-2/WAIS-IV) | Alinear array `proceso` con CAARS-2, WAIS-IV, BRIEF-2A, CPT-3 |
| P0-03 | `src/pages/index.tsx` | `injectSchema()` es client-side (`useEffect`) — AI crawlers (GPTBot, ClaudeBot) no ejecutan JS y nunca ven el schema | Migrar a `<script dangerouslySetInnerHTML>` en `<Head>` igual que neuropsicologia-cancun.tsx |
| P0-04 | `src/pages/index.tsx` | Título homepage: 68 chars (se trunca en móvil a ~60) | Opción B recomendada: "Neuropsicóloga Cancún — TDAH y Autismo · Cédula 11009616" (59 chars) |

**Esfuerzo total P0: ~1.5 horas.**

---

### Issues P1 — Importantes (próximo sprint)

| ID | Problema | Archivo(s) |
|----|----------|-----------|
| P1-01 | og:image en páginas de servicio es retrato 465×533 (redes sociales esperan 1200×630 landscape) | Homepage + 7 páginas servicio |
| P1-02 | Article schema `image` apunta a KAREN_IMAGE en vez del hero SVG del artículo | 11 archivos blog (ver tabla en `.agents/marketing-audit-2026-06-27.md` → Entregable 2) |
| P1-03 | `/valoracion-chetumal` en sitemap pero sin enlace interno — página huérfana | `public/sitemap.xml`, `Navbar.tsx` |
| P1-04 | Speakable schema con CSS selectors sin verificar en neuropsicologia-cancun | `src/pages/neuropsicologia-cancun.tsx` |
| P1-05 | `REVIEWS.reviewCount` debe actualizarse mensualmente con el conteo real de GBP | `lib/site.ts` |
| P1-06 | `dateModified` igual a `datePublished` en artículos tocados en junio 2026 | 5 artículos de blog (los de fecha 2025) |
| P1-07 | Falta `sameAs` de Doctoralia/PsychologyToday en Physician schema | `lib/site.ts` → `DIRECTORY_PROFILES` |

---

### Issues P2 — Mediano plazo

| ID | Problema |
|----|----------|
| P2-01 | H1 de homepage sin keywords TDAH/Autismo |
| P2-02 | Blog index sin CollectionPage schema estático |
| P2-03 | FloatingButtons sin `prefers-reduced-motion` (WCAG 2.1) |
| P2-04 | Dos páginas SEO locales con contenido superpuesto — verificar diferenciación |
| P2-05 | Falta `priceRange` en MedicalBusiness schema del homepage |
| P2-06 | Artículos de blog sin enlace contextual interno hacia páginas de conversión |
| P2-07 | `/valoracion-chetumal` sin schema LocalBusiness si tiene contenido local |

---

### Correcciones JSON-LD — 11 artículos de blog (Entregable 2)

El único campo a cambiar en cada `Article` schema es `image: KAREN_IMAGE` → hero SVG propio del artículo:

| Archivo | Imagen correcta |
|---------|----------------|
| `cuanto-cuesta-valoracion-tdah-cancun.tsx` | `/blog/dark-costo-de-la-valoracion-de-tdah-1200x675.svg` |
| `tdah-en-ninas-sintomas.tsx` | `/blog/dark-tdah-en-ninas-1200x675.svg` |
| `senales-tdah-ninos.tsx` | `/blog/dark-senales-de-tdah-en-ninos-1200x675.svg` |
| `tdah-adultos-diagnostico-tardio.tsx` | `/blog/dark-tdah-en-adultos-1200x675.svg` |
| `que-es-ados-2-autismo.tsx` | `/blog/dark-que-es-el-ados-2-1200x675.svg` |
| `autismo-nivel-1-sintomas-adultos.tsx` | `/blog/dark-autismo-nivel-1-en-adultos-1200x675.svg` |
| `cuanto-cuesta-evaluacion-autismo-mexico.tsx` | `/blog/dark-costo-evaluacion-de-autismo-1200x675.svg` |
| `tdah-inatento-sintomas.tsx` | `/blog/dark-tdah-inatento-1200x675.svg` |
| `tdah-vs-ansiedad-diferencias.tsx` | `/blog/dark-tdah-o-ansiedad-1200x675.svg` |
| `burnout-o-tdah-diferencias.tsx` | `/blog/dark-burnout-vs-tdah-1200x675.svg` |
| `donde-evaluar-tdah-cancun.tsx` | `/blog/dark-donde-evaluar-tdah-en-cancun-1200x675.svg` |

También actualizar `dateModified: '2026-06-17'` en artículos con fechas 2025 que recibieron el batch de imágenes.

---

### Mejoras CRO (Entregable 3)

| ID | Componente:línea | Fix | Impacto |
|----|-----------------|-----|---------|
| CRO-01 | `index.tsx:~461` | Micro-copy bajo CTA WA: "Respuesta en menos de 2 horas · Lun–Sáb" | Alto |
| CRO-02 | `SymptomChecker.tsx` | CTA inline después del resultado del cuestionario | Alto |
| CRO-03 | `FloatingButtons.tsx:8` | Añadir variante desktop (`hidden lg:flex`) en esquina inferior derecha | Medio |
| CRO-04 | `para-escuelas.tsx` | Importar y renderizar `<FloatingButtons />` | Medio |
| CRO-05 | `index.tsx:~436–453` | Añadir precio en routing cards del hero ("Desde $8,300 MXN") | Alto |
| CRO-06 | `index.tsx` / `AboutSection.tsx` | Envolver el bloque de 47 reseñas en enlace clickeable a Google Maps | Medio |
| CRO-07 | `evaluacion-tdah-ninos.tsx:~724` | Mejorar callout "costo de no actuar" con timeframe concreto (3–4 semanas) | Medio |

---

### Copy mejorado — páginas prioritarias (Entregable 4)

Ver `.agents/marketing-audit-2026-06-27.md` → Entregable 4 para el texto exacto. Resumen:

- **Homepage:** H1 añadir "Especialista en TDAH y Autismo" + subtítulo empático + micro-copy en CTA + precio en routing cards
- **evaluacion-tdah-adultos:** Sección `proceso` con 2 bloques (entrevista diagnóstica: DIVA 2.0 / pruebas cognitivas: CAARS-2, WAIS-IV, BRIEF-2A, CPT-3) + badge de diagnóstico tardío
- **evaluacion-autismo-cancun:** Bloque nuevo "¿Por qué familias viajan a Cancún?" (escasez regional del ADOS-2) + callout de intervención temprana mejorado

---

### Calendario editorial — próximos 5 artículos (Entregable 5)

| Mes | Slug | Keyword primaria | Intención |
|-----|------|-----------------|-----------|
| Julio | `como-es-una-evaluacion-neuropsicologica-ninos` | evaluación neuropsicológica niños cancún | Informacional |
| Julio | `tdah-ninas-diagnostico-tardio-cancun` | TDAH niñas diagnóstico | Informacional |
| Agosto | `diferencia-tdah-trastorno-aprendizaje` | diferencia TDAH trastorno aprendizaje | Informacional |
| Agosto | `resultado-positivo-autismo-que-sigue` | qué sigue después diagnóstico autismo | Navegacional |
| Septiembre | `evaluacion-neuropsicologica-adultos-cancun` | evaluación neuropsicológica adultos Cancún | Transaccional |

Ver `.agents/marketing-audit-2026-06-27.md` → Entregable 5 para estructura completa de cada artículo.

---

### Fortalezas del sitio (no tocar)

1. Schema JSON-LD más completo de la categoría local (MedicalBusiness + Physician + Reviews + FAQPage)
2. AI bots correctamente permitidos: GPTBot, ClaudeBot, PerplexityBot — `robots.txt` y `llms.txt` correctos
3. Copy emocional específico: "No es falta de voluntad. Puede ser tu cerebro"
4. 47 reseñas con nombres propios — prueba social verificable
5. Precios publicados — diferenciador de transparencia vs competencia
6. Blog con 11 artículos, hero images propias 1200×675, og:image corregidas en meta tags

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
