# Karen Trujillo — Neuropsicóloga en Cancún · Claude Instructions

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
