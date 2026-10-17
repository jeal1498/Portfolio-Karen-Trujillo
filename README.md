# psicologakarentrujillo.com.mx

Sitio web clínico de Karen Trujillo, neuropsicóloga especializada en diagnóstico de TDAH y autismo en Cancún. Convierte familias con dudas en consultas agendadas estableciendo credibilidad clínica y calidez humana.

**Sitio live:** [www.psicologakarentrujillo.com.mx](https://www.psicologakarentrujillo.com.mx)

---

## Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 14 (Pages Router) + React 18 + TypeScript |
| Estilos | Tailwind CSS v3 + CSS custom properties |
| UI | shadcn/ui (Radix primitives) + `class-variance-authority` + `tailwind-merge` |
| Animaciones | Framer Motion 12 (con soporte `prefers-reduced-motion`) |
| Iconos | Lucide React |
| Despliegue | Vercel |

---

## Estructura del proyecto

```
src/
├── pages/
│   ├── index.tsx                          # Landing principal
│   ├── evaluacion-tdah-ninos.tsx
│   ├── evaluacion-tdah-adultos.tsx
│   ├── evaluacion-autismo-cancun.tsx
│   ├── neuropsicologia-cancun.tsx
│   ├── neuropsicologia-zona-hotelera-cancun.tsx
│   ├── para-escuelas.tsx
│   ├── precios.tsx
│   ├── valoracion-chetumal.tsx
│   └── blog/                              # 14+ artículos SEO
├── components/                            # Componentes de UI
└── lib/
    ├── contact.ts                         # SSOT de datos de contacto
    ├── site.ts                            # SSOT de identidad del sitio
    └── seo.ts                             # applySeo() + injectSchema()
public/
├── blog/                                  # Hero images 1200×675 y OG images
└── Psicologa_Karen_Trujillo.webp
```

---

## Páginas del sitio

| Ruta | Propósito |
|------|-----------|
| `/` | Landing principal — hero, servicios, sobre Karen, testimonios, FAQ, ubicación |
| `/evaluacion-tdah-ninos` | Servicio: TDAH infantil (5–17 años) |
| `/evaluacion-tdah-adultos` | Servicio: TDAH adultos (+18 años) |
| `/evaluacion-autismo-cancun` | Servicio: autismo (TEA) |
| `/neuropsicologia-cancun` | SEO local — neuropsicología en Cancún |
| `/neuropsicologia-zona-hotelera-cancun` | SEO local — zona hotelera |
| `/para-escuelas` | Dirigida a instituciones educativas |
| `/precios` | Precios de evaluaciones |
| `/valoracion-chetumal` | Landing campaña pop-up Chetumal |
| `/blog/*` | 14+ artículos SEO sobre TDAH, autismo y diagnóstico |

---

## Componentes principales

Organizados en `src/components/{layout,blog,tools,ui}`. Las secciones de cada página viven dentro de su archivo en `src/pages/`.

| Componente | Función |
|------------|---------|
| `layout/Navbar.tsx` | Sticky, backdrop-blur, se opaca al hacer scroll |
| `layout/Footer.tsx` | Pie de página compartido |
| `layout/FloatingButtons.tsx` | CTAs flotantes de WhatsApp y teléfono — siempre visibles |
| `layout/CookieBanner.tsx` · `layout/Analytics.tsx` | Consentimiento de cookies y GA4 (Consent Mode v2) |
| `blog/ReadingProgressBar.tsx` · `blog/TableOfContents.tsx` | Utilidades de los artículos del blog |
| `tools/SymptomCheckerHome.tsx` | Herramienta interactiva de auto-evaluación del home |

---

## Cómo correr en local

```bash
npm install
npm run dev
# Abrir http://localhost:3000
```

Para producción:

```bash
npm run build
npm run start
```

---

## Variables de entorno

Este proyecto no requiere variables de entorno en tiempo de ejecución. Todos los datos de contacto, URL canónica y cédula profesional están centralizados en:

- `src/lib/contact.ts` — `WA_NUMBER`, `PHONE_NUMBER`, `EMAIL`, `waUrl()`
- `src/lib/site.ts` — `SITE_URL`, `CEDULA`, `KAREN_IMAGE`, `ADDRESS`

Para añadir perfiles de directorios clínicos (`sameAs` en schema.org), descomentar las URLs en `DIRECTORY_PROFILES` dentro de `src/lib/contact.ts`.

---

## Guías de contribución

### Reglas críticas

- **Datos de contacto** → editar solo `src/lib/contact.ts`. Nunca hardcodear URLs de WhatsApp.
- **Meta SEO** → solo a través de `applySeo()` en `src/lib/seo.ts`.
- **Precios e instrumentos** → definidos en el componente o página correspondiente; no duplicar.
- **Cambios quirúrgicos** → no refactorizar código adyacente fuera del alcance de la tarea.

### Al agregar una página nueva

```ts
useEffect(() => {
  const cleanup = applySeo({
    title: '...',
    description: '...',
    canonical: `${SITE_URL}/nueva-ruta`,
  });
  injectSchema({ /* JSON-LD apropiado */ });
  return cleanup;
}, []);
```

### Al agregar animaciones con Framer Motion

```tsx
const shouldReduce = useReducedMotion();

const variants = {
  hidden: { opacity: 0, y: shouldReduce ? 0 : 20 },
  visible: { opacity: 1, y: 0 },
};
```

Duraciones entre 220–380 ms; easing `ease-out` preferido.

### Convención de commits

```
feat: descripción breve
fix:  descripción breve
docs: descripción breve
chore: descripción breve
```

---

## Design System

Ver [`DESIGN.md`](./DESIGN.md) para la referencia completa.

### Paleta de colores

| Token | Hex | Uso |
|-------|-----|-----|
| Plum Ink | `#382f51` | Único color saturado — textos principales, botones primarios |
| Ink Secondary | `#515e71` | Textos secundarios — verificar contraste AA antes de usar |
| Lavender | `#d0d0e7` | Solo fondos de tarjeta, nunca texto sobre blanco |
| Blush | `#fbdbe0` | Solo fondos de tarjeta |
| Warm Sand | `#f5dfc5` | Solo fondos de tarjeta |

### Tipografía

| Rol | Fuente | Peso |
|-----|--------|------|
| Display / Headline | Playfair Display | 700 — solo `h1` y `h2` |
| Body / UI | Montserrat | 400–600 — todo lo demás |
| Labels / CTAs | Montserrat | 700, 0.625rem, uppercase, tracking 0.12em |

**Border radius:** 16 px máximo en tarjetas (`rounded-2xl`). `rounded-3xl`+ comunica app de consumo, no consultorio.

**Sombras:** siempre con tinte plum `rgba(56, 47, 81, 0.X)` — nunca gris genérico.

---

## SEO

Cada ruta llama a `applySeo()` e `injectSchema()` al montar. Canonical, OG tags y JSON-LD son obligatorios en cada página nueva.

Los schemas implementados incluyen `MedicalBusiness`, `Physician`, `FAQPage`, `Article`, `Event` y `LocalBusiness` según la ruta. La configuración de bots en `public/robots.txt` y `public/llms.txt` permite explícitamente GPTBot, ClaudeBot y PerplexityBot para visibilidad en respuestas de IA.

---

## Documentos relacionados

- [`CLAUDE.md`](./CLAUDE.md) — instrucciones para agentes de IA trabajando en este repo
- [`DESIGN.md`](./DESIGN.md) — design system completo: paleta, tipografía, sombras, spacing
- [`PRODUCT.md`](./PRODUCT.md) — principios de producto, usuario objetivo y anti-referencias
- [`memory.md`](./memory.md) — preferencias del usuario y estado de tareas en curso
