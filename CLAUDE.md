# Karen Trujillo — Neuropsicóloga en Cancún · Claude Instructions

> **Preferencias del usuario:** leer `memory.md` al inicio de cada sesión. Actualizarlo proactivamente cuando el usuario indique nuevas preferencias.

## Contexto del Producto

**Propósito:** Sitio web clínico de una sola página (+ rutas de servicio y blog) para Karen Trujillo, neuropsicóloga especializada en diagnóstico de TDAH y autismo en Cancún. Convierte familias con dudas en consultas agendadas estableciendo credibilidad clínica y calidez humana simultáneamente.

**Usuario objetivo:** Padres/madres con hijos de 5–17 años con dificultades de atención o comunicación social; adultos de 25–45 años con TDAH no diagnosticado; familias buscando diagnóstico TEA. Llegan con años de incertidumbre y ansiedad. La pregunta real que responde el sitio: *"¿puedo confiarle la evaluación de mi hijo?"*

**La respuesta correcta a esa pregunta:** Instrumentos estandarizados específicos (ADOS-2, WISC-V, CAARS-2, CONNERS-3, BRIEF-2, CPT-3), cédula profesional real (11009616), reseñas con nombres propios, proceso explicado en pasos concretos.

## Stack Técnico

- **Framework:** Next.js 14 (Pages Router) + React 18 + TypeScript
- **Styling:** Tailwind CSS v3 + CSS custom properties
- **UI:** shadcn/ui (Radix primitives) + `class-variance-authority` + `tailwind-merge`
- **Animaciones:** Framer Motion 12 — con soporte obligatorio de `prefers-reduced-motion`
- **Iconos:** Lucide React
- **SEO:** `lib/seo.ts` — `applySeo()` y `injectSchema()` gestionan meta tags y JSON-LD por ruta
- **Contacto:** `lib/contact.ts` — `WA_NUMBER`, `PHONE_NUMBER`, `waUrl()` son la única fuente de verdad para datos de contacto

## Estructura de Páginas

| Ruta | Propósito |
|------|-----------|
| `/` | Landing principal — hero, servicios, sobre Karen, testimonios, FAQ, ubicación |
| `/evaluacion-tdah-ninos` | Página de servicio: TDAH infantil (5–17 años) |
| `/evaluacion-tdah-adultos` | Página de servicio: TDAH adultos (+18 años) |
| `/evaluacion-autismo-cancun` | Página de servicio: autismo (TEA) |
| `/neuropsicologia-cancun` | SEO local — neuropsicología en Cancún |
| `/neuropsicologia-zona-hotelera-cancun` | SEO local — zona hotelera |
| `/para-escuelas` | Página para instituciones educativas |
| `/blog/*` | 10+ artículos SEO sobre TDAH, autismo y diagnóstico |

## Componentes Principales

| Componente | Función |
|------------|---------|
| `Hero.tsx` | Primera impresión — credenciales, CTA principal, foto de Karen |
| `ServicesSection.tsx` | 3 tarjetas de servicio con instrumentos, precio, CTA específico |
| `AboutSection.tsx` | Bio de Karen — formación, trayectoria, humaniza la especialista |
| `TestimonialsSection.tsx` | Reseñas reales con nombres — la prueba social más importante |
| `FAQSection.tsx` | Accordion — preguntas frecuentes que reducen la ansiedad de conversión |
| `SymptomChecker.tsx` | Herramienta interactiva de auto-evaluación |
| `LocationSection.tsx` | Mapa + dirección + cómo llegar |
| `FloatingButtons.tsx` | CTAs flotantes de WhatsApp y teléfono — siempre visibles |
| `Navbar.tsx` | Sticky, backdrop-blur, se opaca al hacer scroll |
| `BlogLayout.tsx` | Layout compartido para todos los artículos del blog |

## Sistema de Tipos

```typescript
// src/types/portfolio.ts
interface Service { slug, icon, label, title, age, desc, price, tests[], cta, color, borderHover }
interface Credential { icon, text }
interface Review { name, text, stars, service }
interface FaqItem { q, a }
```

## Design System (ver DESIGN.md para detalle completo)

**Paleta — regla clave:** Plum Ink (`#382f51`) es el único color saturado. Los acentos (lavender `#d0d0e7`, blush `#fbdbe0`, warm-sand `#f5dfc5`) son solo fondos de tarjeta — nunca texto sobre blanco.

**Tipografía:**
- Display/Headline: Playfair Display 700 — solo h1 y h2
- Body/UI: Montserrat — todo lo demás
- Labels/CTAs: Montserrat 700, 0.625rem, uppercase, tracking 0.12em

**Sombras:** Siempre con tinte plum `rgba(56, 47, 81, 0.X)` — nunca gris genérico. Las tarjetas son planas en reposo; la sombra solo aparece en hover.

**Border radius:** 16px máximo en tarjetas (`rounded-2xl`). `rounded-3xl`+ es error — comunica app de consumo, no consultorio.

**SEO:** Cada ruta llama a `applySeo()` e `injectSchema()` al montar. Canonical, OG tags y JSON-LD son obligatorios en cada página nueva.

## Principios de Diseño (ver PRODUCT.md para detalle)

1. **Credibilidad antes que estética** — instrumentos específicos, cédula real, reseñas con nombres propios
2. **La claridad reduce la ansiedad** — qué se evalúa, con qué prueba, cuánto cuesta, cuánto tarda
3. **Calidez a través de la especificidad** — no colores suaves, sino respuestas concretas
4. **Evidencia sobre impresión** — mostrar el ADOS-2, el WISC-V, el proceso. No depender de la estética
5. **Legibilidad primero** — layout limpio, jerarquía clara, texto de alto contraste

## Anti-referencias (nunca imitar)

- Clínicas genéricas con fotos de stock en bata blanca
- Landing pages SaaS: métricas hero, gradientes decorativos, copy de "transforma tu vida"
- Sitios hospitalarios fríos con azul corporativo
- Páginas de wellness: fondos crema, tipografía delgada, tono aspiracional vago

## Reglas de Accesibilidad

- WCAG AA como base
- `prefers-reduced-motion` debe estar cubierto en **toda** animación de Framer Motion
- Contraste mínimo de texto: Ink Secondary (`#515e71`) sobre blanco — verificar siempre antes de usar un color de texto nuevo
- Jerarquía de información clara y predecible — prioridad para familias con hijos neurodivergentes

## Guías de Código

**Antes de modificar:**
- Datos de contacto → solo editar `lib/contact.ts`
- Meta SEO → solo a través de `applySeo()` en `lib/seo.ts`
- Precios, instrumentos, servicios → datos definidos en el componente o página correspondiente; no duplicar

**Al agregar una página:**
1. Llamar `applySeo()` al montar con canonical correcto
2. Llamar `injectSchema()` con JSON-LD apropiado (LocalBusiness, FAQPage, etc.)
3. Limpiar en el return del `useEffect`

**Al agregar animaciones con Framer Motion:**
- Siempre envolver en `useReducedMotion()` o condicionar con la variante sin animación
- Duraciones entre 220–380ms; easing `ease-out` preferido

**Cambios quirúrgicos:** No refactorizar código adyacente que no sea parte de la tarea. No agregar abstracciones para uso único.

# Lessons Learned

## 1. Verificación visual sin navegador disponible - error-pattern
- **Fecha**: 2026-06-16
- **Clasificación**: error-pattern
- **Lección**: Las herramientas MCP `playwright`/`chrome-devtools` fallan en este entorno remoto (`Chromium distribution 'chrome' is not found`). No hay navegador disponible para screenshots o snapshots de accesibilidad.
- **Acción**: Verificar cambios de UI levantando `next dev`, haciendo `curl` al HTML renderizado por SSR y usando `grep` para confirmar la presencia de marcadores esperados (clases CSS, URLs de imagen, textos clave), en vez de depender de captura visual.

## 2. Conteo de ocurrencias en HTML de una sola línea - error-pattern
- **Fecha**: 2026-06-16
- **Clasificación**: error-pattern
- **Lección**: El HTML servido por Next.js SSR suele venir como una sola línea larga (sin saltos de línea). `grep -c` cuenta líneas coincidentes, no ocurrencias — con HTML de una línea, `grep -c "X"` siempre da como máximo 1 aunque "X" aparezca varias veces.
- **Acción**: Usar `grep -o "X" archivo | wc -l` para contar ocurrencias reales al verificar contenido renderizado.

## 3. `tsconfig.tsbuildinfo` está versionado en este repo - automation-pattern
- **Fecha**: 2026-06-16
- **Clasificación**: automation-pattern
- **Lección**: A diferencia de la convención usual de ignorar cachés de build, este repo versiona `tsconfig.tsbuildinfo` (confirmado con `git log --follow -- tsconfig.tsbuildinfo`, múltiples commits `chore: actualizar caché...`). El stop-hook de git marca el repo como "sucio" si este archivo queda sin commitear tras correr `tsc`/`next build`.
- **Acción**: Antes de asumir que un archivo de build es descartable, revisar su historial con `git log --follow`. Si está versionado, incluirlo en el commit junto con los cambios de código.

## 4. Delegar el mismo patrón a múltiples agentes en paralelo - automation-pattern
- **Fecha**: 2026-06-16
- **Clasificación**: automation-pattern
- **Lección**: Al aplicar un patrón idéntico de 5 partes (imagen hero, imágenes inline, compartir social, CTA oscuro, tarjetas relacionadas con imagen) a 11 artículos del blog, repartir el trabajo en 4 agentes en paralelo (2-3 archivos cada uno) funcionó bien siempre que cada agente recibiera instrucción explícita de auto-verificar con `npx tsc --noEmit -p .` y confirmar con `git status`/`git diff --stat` que solo tocó sus archivos asignados. Los agentes detectaron y corrigieron solos sus propios bugs (secciones duplicadas, tags JSX malformados, colisión de fondos del mismo color).
- **Acción**: Al repartir tareas repetitivas entre agentes en paralelo, siempre instruir verificación propia (`tsc`, diff de archivos) antes de reportar como completado.

## 5. El sitio live devuelve 403 (Cloudflare) — usar análisis de código fuente - error-pattern
- **Fecha**: 2026-06-18
- **Clasificación**: error-pattern
- **Lección**: `https://www.psicologakarentrujillo.com.mx` devuelve HTTP 403 a peticiones de servidor (curl, WebFetch, agentes). Cloudflare bloquea el acceso programático. Los intentos de crawl o análisis del sitio live siempre fallan.
- **Acción**: Para auditorías SEO, analizar directamente los archivos fuente (`src/pages/`, `public/`, `src/lib/`) en vez de hacer fetch del sitio. El análisis de código fuente es más completo: detecta schemas JSON-LD, meta tags, redirects en next.config.mjs, robots.txt — todo sin necesidad de acceso HTTP.

## 6. og:image de blog no usa la imagen hero del propio artículo - error-pattern
- **Fecha**: 2026-06-18
- **Clasificación**: error-pattern
- **Lección**: Los 11 artículos del blog tienen imágenes hero propias en `/public/blog/dark-*.svg` (1200×675) que se usan como `<img>` en el contenido, pero la meta tag `og:image` de cada artículo apunta a `KAREN_IMAGE` (foto retrato 465×533). Son dos usos distintos y no están conectados. Cuando alguien comparte un artículo del blog en redes sociales, aparece la foto de Karen en vez de la ilustración del artículo.
- **Acción**: Al escribir nuevos artículos de blog, asegurarse de que `og:image` apunte a la imagen hero del artículo (ej: `/blog/dark-*.svg`) y no a `KAREN_IMAGE`. Tarea pendiente: actualizar los 11 artículos existentes.

## 7. Todas las imágenes del sitio existen y funcionan (no hay referencias rotas) - automation-pattern
- **Fecha**: 2026-06-18
- **Clasificación**: automation-pattern
- **Lección**: La tarea T-02 (reemplazar 75 imágenes placehold.co) ya resolvió todas las referencias rotas. El sitio tiene 56 SVGs de blog + 1 foto WebP de Karen + 2 favicons = 59 archivos de imagen, todos correctamente referenciados. No hay imágenes huérfanas ni referencias rotas.
- **Acción**: El gap de imágenes pendiente es de tipo OG/social: las 8 páginas principales (homepage + 3 evaluación + 2 neuropsicología + precios + para-escuelas) usan la foto retrato de Karen (465×533) como og:image en lugar de imágenes landscape 1200×630 optimizadas para redes sociales.
