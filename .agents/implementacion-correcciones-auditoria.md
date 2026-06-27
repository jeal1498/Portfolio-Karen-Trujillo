# Instrucción de Implementación — Correcciones de Auditoría de Marketing
> Generada el 2026-06-27 · Basada en `.agents/marketing-audit-2026-06-27.md`  
> Método de verificación: `npx tsc --noEmit -p .` antes de reportar como completo  
> Regla de oro: cambios quirúrgicos — no refactorizar código adyacente

---

## GRUPO 1 — P0: Correcciones Críticas de Datos

### 1.1 — Precio TEA en precios.tsx (`P0-01`)

**Archivo:** `src/pages/precios.tsx`

Buscar la entrada del servicio de autismo/TEA y cambiar el precio de `$8,300` a `$8,500 MXN`.

Buscar cualquier texto o variable que diga `8300` o `$8,300` en el contexto del servicio TEA/autismo y corregirlo a `$8,500`. El precio correcto ($8,500 MXN) está confirmado en:
- `src/pages/evaluacion-autismo-cancun.tsx`
- `public/llms.txt`
- `.agents/product-marketing.md` (sección 4)

Si la página tiene un objeto `Offer` en su JSON-LD, actualizar también el `price` a `8500`.

---

### 1.2 — Instrumentos TDAH adultos en evaluacion-tdah-adultos.tsx (`P0-02`)

**Archivo:** `src/pages/evaluacion-tdah-adultos.tsx`

Localizar el array `proceso` (sección visual del proceso de evaluación). Actualmente lista instrumentos incorrectos: DIVA 2.0, Conners Adultos, Cribado TDAH, IDARE, Inventario Depresión, 16 Factores.

Reemplazar la descripción de cada instrumento por la batería canónica con roles diferenciados:

```
ENTREVISTA DIAGNÓSTICA:
- DIVA 2.0 — Entrevista diagnóstica de TDAH en adultos (puede mantenerse como entrevista inicial)

PRUEBAS COGNITIVAS (reemplazar los genéricos):
- CAARS-2 — Escalas de TDAH para Adultos (Conners)
- WAIS-IV — Escala de Inteligencia de Wechsler para Adultos
- BRIEF-2A — Inventario de Evaluación Conductual de Funciones Ejecutivas (Adultos)
- CPT-3 — Test de Ejecución Continua
```

La lista canónica de instrumentos adultos es: **CAARS-2, WAIS-IV, BRIEF-2A, CPT-3** (más DIVA 2.0 como entrevista diagnóstica).

---

### 1.3 — Título de homepage demasiado largo (`P0-04`)

**Archivo:** `src/pages/index.tsx`

El título actual tiene 68 caracteres (Google trunca ~60 en móvil). Reemplazar por una de las dos opciones:

- **Opción A** (57 chars, sin cédula): `"Neuropsicóloga en Cancún — TDAH y Autismo | Karen Trujillo"`
- **Opción B** (59 chars, con cédula): `"Neuropsicóloga Cancún — TDAH y Autismo · Cédula 11009616"` ← recomendada

Localizar la llamada a `applySeo()` en `index.tsx` y actualizar el campo `title`.

---

## GRUPO 2 — P0-03: Migración de Schema Homepage a `<Head>` Estático

**Archivo principal:** `src/pages/index.tsx`  
**Archivo secundario (si aplica):** `src/pages/blog/index.tsx`

### Problema
La función `injectSchema()` de `lib/seo.ts` usa `document.createElement('script')` en `useEffect` — opera en el cliente. Los crawlers de IA (GPTBot, ClaudeBot, PerplexityBot) frecuentemente no ejecutan JavaScript. El schema más importante del sitio (MedicalBusiness + AggregateRating con 47 reseñas + FAQPage) puede ser invisible para ellos.

### Patrón correcto (ya usado en otras páginas)
Ver `src/pages/neuropsicologia-cancun.tsx` y `src/pages/evaluacion-tdah-ninos.tsx` como referencia — usan `dangerouslySetInnerHTML` en `<Head>`.

### Implementación

1. En `index.tsx`, localizar la llamada a `injectSchema()` y el objeto de schema que pasa.
2. Eliminar la llamada a `injectSchema()` y su cleanup en `useEffect`.
3. Mover el schema al bloque `<Head>`:

```tsx
<Head>
  {/* ... meta tags existentes ... */}
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaObject) }}
  />
</Head>
```

4. El objeto `schemaObject` puede definirse como `const` fuera del componente o dentro del componente (antes del return), pero debe ser un objeto JavaScript plano serializable.

5. Repetir el mismo cambio en `src/pages/blog/index.tsx` si usa `injectSchema()`.

> **Nota:** `applySeo()` también puede operar en cliente — si el index de blog lo usa para meta tags, esos sí son manejados por Next.js vía `<Head>` nativamente, así que solo migrar el schema JSON-LD.

---

## GRUPO 3 — P1-02: Correcciones JSON-LD en los 11 Artículos de Blog

### Problema
El campo `image` en el objeto `Article` del JSON-LD de cada artículo apunta a `KAREN_IMAGE` (foto retrato 465×533px). Debe apuntar al SVG hero de cada artículo (1200×675px). Las etiquetas `<meta property="og:image">` ya fueron corregidas — solo falta el campo `image` del schema.

### Patrón de corrección

En cada archivo `.tsx` de blog, dentro del objeto `Article` (o `BlogPosting`) del schema JSON-LD:

```typescript
// ANTES (incorrecto):
image: KAREN_IMAGE,

// DESPUÉS (correcto):
image: `${SITE_URL}/blog/<nombre-del-hero>.svg`,
```

### Tabla de correcciones por archivo

| Archivo (`src/pages/blog/`) | Campo `image` correcto |
|-----------------------------|------------------------|
| `cuanto-cuesta-valoracion-tdah-cancun.tsx` | `` `${SITE_URL}/blog/dark-costo-de-la-valoracion-de-tdah-1200x675.svg` `` |
| `tdah-en-ninas-sintomas.tsx` | `` `${SITE_URL}/blog/dark-tdah-en-ninas-1200x675.svg` `` |
| `senales-tdah-ninos.tsx` | `` `${SITE_URL}/blog/dark-senales-de-tdah-en-ninos-1200x675.svg` `` |
| `tdah-adultos-diagnostico-tardio.tsx` | `` `${SITE_URL}/blog/dark-tdah-en-adultos-1200x675.svg` `` |
| `que-es-ados-2-autismo.tsx` | `` `${SITE_URL}/blog/dark-que-es-el-ados-2-1200x675.svg` `` |
| `autismo-nivel-1-sintomas-adultos.tsx` | `` `${SITE_URL}/blog/dark-autismo-nivel-1-en-adultos-1200x675.svg` `` |
| `cuanto-cuesta-evaluacion-autismo-mexico.tsx` | `` `${SITE_URL}/blog/dark-costo-evaluacion-de-autismo-1200x675.svg` `` |
| `tdah-inatento-sintomas.tsx` | `` `${SITE_URL}/blog/dark-tdah-inatento-1200x675.svg` `` |
| `tdah-vs-ansiedad-diferencias.tsx` | `` `${SITE_URL}/blog/dark-tdah-o-ansiedad-1200x675.svg` `` |
| `burnout-o-tdah-diferencias.tsx` | `` `${SITE_URL}/blog/dark-burnout-vs-tdah-1200x675.svg` `` |
| `donde-evaluar-tdah-cancun.tsx` | `` `${SITE_URL}/blog/dark-donde-evaluar-tdah-en-cancun-1200x675.svg` `` |

### Actualizar `dateModified` en artículos con fecha 2025

Para los 5 artículos publicados en 2025 que recibieron el batch de imágenes hero en junio 2026, actualizar `dateModified` a `'2026-06-17'` (manteniendo `datePublished` original):

- `cuanto-cuesta-valoracion-tdah-cancun.tsx` → `dateModified: '2026-06-17'`
- `tdah-en-ninas-sintomas.tsx` → `dateModified: '2026-06-17'`
- `senales-tdah-ninos.tsx` → `dateModified: '2026-06-17'`
- `tdah-adultos-diagnostico-tardio.tsx` → `dateModified: '2026-06-17'`
- `que-es-ados-2-autismo.tsx` → `dateModified: '2026-06-17'` (actualmente igual a `datePublished: '2025-06-29'`)

---

## GRUPO 4 — CRO: 7 Mejoras de Conversión

### CRO-01 — Micro-copy de tiempo de respuesta en CTA WhatsApp

**Impacto: ALTO**

**Archivos:**
- `src/pages/index.tsx` — CTA del hero (líneas ~461-465)
- `src/components/FloatingButtons.tsx` — tooltip o label
- CTAs finales de páginas de servicio

Agregar debajo de cada botón de WhatsApp principal:

```tsx
<p className="text-xs text-muted-foreground mt-1">
  Respuesta habitual en menos de 2 horas · Lun–Sáb
</p>
```

---

### CRO-02 — CTA post-resultado en Symptom Checker

**Impacto: ALTO**

**Archivo:** `src/components/SymptomChecker.tsx`

Localizar el bloque condicional que muestra el resultado final `{submitted && ...}` y agregar inmediatamente después del texto de resultado:

```tsx
<a
  href={waUrl('Hola Karen, acabo de completar el cuestionario y me gustaría saber más sobre la evaluación')}
  className="mt-4 inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-bold"
>
  <MessageCircle className="w-5 h-5" />
  Hablar con Karen sobre los resultados
</a>
```

Importar `{ MessageCircle }` de `lucide-react` si no está importado ya. Importar `waUrl` de `@/lib/contact`.

---

### CRO-03 — FloatingButtons: agregar versión desktop

**Impacto: MEDIO**

**Archivo:** `src/components/FloatingButtons.tsx`

Actualmente la clase del contenedor tiene `lg:hidden` — invisible en desktop. Agregar un botón flotante de WhatsApp independiente solo para desktop (esquina inferior derecha):

```tsx
{/* Botón flotante desktop — solo lg+ */}
<a
  href={waUrl('Hola Karen, me gustaría agendar una consulta')}
  className="hidden lg:flex fixed bottom-8 right-8 z-[100] w-14 h-14 bg-[#25D366] rounded-full items-center justify-center shadow-xl hover:scale-110 transition-transform"
  aria-label="Contactar por WhatsApp"
>
  <MessageCircle className="w-7 h-7 text-white" />
</a>
```

Si `FloatingButtons` usa Framer Motion, condicionar con `useReducedMotion()` (ver CRO-07).

---

### CRO-04 — FloatingButtons en `/para-escuelas`

**Impacto: MEDIO**

**Archivo:** `src/pages/para-escuelas.tsx`

1. Agregar en la sección de imports:
```tsx
import FloatingButtons from '@/components/FloatingButtons';
```

2. Antes del cierre del JSX principal (antes de `</main>` o `</Layout>`):
```tsx
<FloatingButtons />
```

---

### CRO-05 — Precios en routing cards del hero

**Impacto: MEDIO**

**Archivo:** `src/pages/index.tsx`, líneas ~436–453 (las 3 routing cards del hero)

En cada routing card, agregar una línea de precio debajo de la edad/descripción:

```tsx
{/* Para TDAH niños */}
<span className="text-xs text-muted-foreground mt-1 block">Desde $8,300 MXN</span>

{/* Para TDAH adultos */}
<span className="text-xs text-muted-foreground mt-1 block">Desde $8,300 MXN</span>

{/* Para TEA / Autismo */}
<span className="text-xs text-muted-foreground mt-1 block">Desde $8,500 MXN</span>
```

---

### CRO-06 — Trust badge de reseñas clickeable a Google Maps

**Impacto: MEDIO**

**Archivo:** `src/pages/index.tsx` (sección AboutSection o badge de estrellas)

Localizar el bloque que muestra "47 reseñas · 5.0 estrellas" y envolver en enlace:

```tsx
<a
  href={DIRECTORY_PROFILES.googleMaps}  // o la URL de Google Maps de lib/contact.ts
  target="_blank"
  rel="noopener noreferrer"
  className="hover:underline"
>
  {/* contenido del badge de estrellas */}
</a>
```

Verificar que `DIRECTORY_PROFILES` o la URL de Google Maps esté disponible en `lib/contact.ts` o `lib/site.ts`.

---

### CRO-07 — "Costo de no actuar" con timeframe específico

**Impacto: MEDIO**

**Archivo:** `src/pages/evaluacion-tdah-ninos.tsx`, líneas ~724–732

Reemplazar el callout actual por:

```
Cada año sin diagnóstico es un año de trabajo escolar más difícil, 
más tensión familiar, más estrategias de compensación que desgastan. 
La evaluación tarda 3-4 semanas. La claridad dura toda la vida.
```

---

## GRUPO 5 — P2: Mejoras de Mediano Plazo

### P2-03 — FloatingButtons: agregar `prefers-reduced-motion`

**Archivo:** `src/components/FloatingButtons.tsx`

Si el componente usa `motion.div` con `animate`/`initial`, agregar soporte de accesibilidad:

```tsx
import { motion, useReducedMotion } from 'framer-motion';

// Dentro del componente:
const shouldReduce = useReducedMotion();

// En el motion.div de entrada:
<motion.div
  initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={shouldReduce ? { duration: 0 } : { duration: 0.3, ease: 'easeOut' }}
>
```

---

### P2-05 — `priceRange` en MedicalBusiness del homepage

**Archivo:** `src/pages/index.tsx`

En el objeto `MedicalBusiness` o `MedicalClinic` dentro del schema JSON-LD, agregar:

```typescript
priceRange: '$8,300–$10,500 MXN',
```

---

### P2-01 — H1 homepage con keywords TDAH/Autismo

**Archivo:** `src/pages/index.tsx`, componente `Hero.tsx`

Opciones:
- Modificar H1 a: `"Neuropsicóloga en Cancún · TDAH y Autismo"`
- O agregar H2 visible: `"Especialista en diagnóstico de TDAH y Autismo"`

Verificar contraste y diseño antes de implementar. El H1 actual `"Neuropsicóloga en Cancún"` no incluye las keywords más valiosas.

---

## GRUPO 6 — P1 Pendientes (Sin Código, Requieren Validación Manual)

### P1-03 — Página `valoracion-chetumal` huérfana

Verificar si `src/pages/valoracion-chetumal.tsx` existe y tiene contenido. Si:
- **Tiene contenido:** agregar enlace desde `/neuropsicologia-zona-hotelera-cancun` hacia esa página
- **Es stub vacío:** eliminar de `public/sitemap.xml` hasta que esté lista

### P1-04 — IDs de `speakable` en neuropsicologia-cancun.tsx

**Archivo:** `src/pages/neuropsicologia-cancun.tsx`

El schema `speakable` declara los CSS selectors: `#que-es-neuropsicologia`, `#diferenciadores`, `#karen-perfil`, `#preguntas-frecuentes`. Verificar que cada uno de esos IDs existe como atributo en el JSX de la misma página. Si alguno no existe, agregarlo al elemento HTML correspondiente o eliminarlo del array.

### P1-07 — Perfiles de autoridad en `sameAs` del Physician schema

**Archivo:** `lib/contact.ts` o `lib/site.ts`

Si Karen tiene perfiles en Doctoralia, PsychologyToday o LinkedIn profesional, agregar sus URLs al array `SOCIAL_PROFILES` o `DIRECTORY_PROFILES`. El Physician schema los recoge automáticamente desde ahí.

---

## Verificación Final

Después de implementar todos los cambios:

```bash
# 1. Verificar TypeScript sin errores
npx tsc --noEmit -p .

# 2. Confirmar archivos tocados (no más de los necesarios)
git diff --stat

# 3. Contar ocurrencias de KAREN_IMAGE en archivos de blog (debe ser 0 en campo image del schema)
grep -o 'KAREN_IMAGE' src/pages/blog/*.tsx | wc -l

# 4. Verificar precio TEA corregido en precios.tsx
grep -o '8[,.]300\|8[,.]500' src/pages/precios.tsx

# 5. Verificar que tsconfig.tsbuildinfo está incluido en el commit (ver CLAUDE.md Lección 3)
git status
```

---

## Mensaje de Commit Sugerido

```
fix: aplicar correcciones de auditoría de marketing 2026-06-27

P0:
- precios.tsx: corregir precio TEA de $8,300 a $8,500 MXN
- evaluacion-tdah-adultos.tsx: alinear instrumentos con batería canónica (CAARS-2, WAIS-IV, BRIEF-2A, CPT-3)
- index.tsx: migrar schema JSON-LD de injectSchema() a dangerouslySetInnerHTML en <Head>
- index.tsx: reducir título a ≤60 caracteres

P1:
- 11 artículos de blog: corregir campo `image` en Article schema (KAREN_IMAGE → hero SVG)
- 5 artículos: actualizar dateModified a 2026-06-17

CRO:
- FloatingButtons: agregar versión desktop + prefers-reduced-motion
- SymptomChecker: agregar CTA inline post-resultado
- para-escuelas: importar y renderizar FloatingButtons
- Hero routing cards: agregar precio en cada card
- CTA WhatsApp: agregar micro-copy de tiempo de respuesta
- Trust badge: hacer clickeable hacia Google Maps
- evaluacion-tdah-ninos: actualizar callout "costo de no actuar" con timeframe

P2:
- index.tsx schema: agregar priceRange al MedicalBusiness
- FloatingButtons: useReducedMotion() en todas las animaciones
```

---

## Referencia de Archivos Involucrados

| Grupo | Archivos |
|-------|---------|
| P0-01 | `src/pages/precios.tsx` |
| P0-02 | `src/pages/evaluacion-tdah-adultos.tsx` |
| P0-03 | `src/pages/index.tsx`, `src/pages/blog/index.tsx` |
| P0-04 | `src/pages/index.tsx` |
| P1-02 | `src/pages/blog/` (11 archivos) |
| CRO-01 | `src/pages/index.tsx`, `src/components/FloatingButtons.tsx`, páginas de servicio |
| CRO-02 | `src/components/SymptomChecker.tsx` |
| CRO-03 | `src/components/FloatingButtons.tsx` |
| CRO-04 | `src/pages/para-escuelas.tsx` |
| CRO-05 | `src/pages/index.tsx` |
| CRO-06 | `src/pages/index.tsx` |
| CRO-07 | `src/pages/evaluacion-tdah-ninos.tsx` |
| P2-01 | `src/pages/index.tsx`, `src/components/Hero.tsx` |
| P2-03 | `src/components/FloatingButtons.tsx` |
| P2-05 | `src/pages/index.tsx` |
