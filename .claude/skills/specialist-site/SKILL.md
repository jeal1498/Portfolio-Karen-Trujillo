---
name: specialist-site
description: >
  Replica el proceso completo de construcción del sitio de Karen Trujillo para cualquier
  especialista clínico o profesional independiente. Genera la config de contacto, las páginas
  de servicio, el blog y el sistema de diseño adaptado. Usa cuando el usuario diga "nuevo
  especialista", "replicar Karen", "nuevo cliente profesional", "armar sitio para doctor/dentista/psicólogo/abogado/etc."
---

# Specialist Site — Skill de replicación

Codifica el proceso completo que se usó para construir el sitio de Karen Trujillo
(neuropsicóloga, Cancún) y lo aplica a cualquier nuevo especialista.

**Stack asumido:** Next.js 14 (Pages Router) · TypeScript · Tailwind CSS v3 · shadcn/ui ·
Framer Motion · Lucide React · `lib/contact.ts` + `lib/site.ts` + `lib/seo.ts` como SSOT.

---

## Checklist de fases

Crea este to-do al inicio y táchalo conforme avanzas:

- [ ] Fase 1 — Intake: recopilar todos los datos del especialista
- [ ] Fase 2 — Briefing: generar `SPECIALIST.md` (product brief)
- [ ] Fase 3 — Config: actualizar `lib/site.ts` y `lib/contact.ts`
- [ ] Fase 4 — Tipos: adaptar `src/types/portfolio.ts`
- [ ] Fase 5 — Páginas: generar `index.tsx` + páginas de servicio + páginas SEO local
- [ ] Fase 6 — Blog: generar 3–5 artículos SEO relevantes
- [ ] Fase 7 — Assets estáticos: `sitemap.xml`, `robots.txt`, `nap.json`, `llms.txt`
- [ ] Fase 8 — Verificar: `npx tsc --noEmit` sin errores + checklist SEO

---

## Fase 1 — Intake

Antes de generar nada, recopila estos datos. Si el usuario ya los dio en el mensaje inicial,
extráelos directamente. Si faltan, pregunta de una vez (una sola ronda, no hagas ping-pong).

### Preguntas obligatorias

```
1. IDENTIDAD
   - Nombre completo del especialista
   - Especialidad / título profesional (ej: "Neuropsicóloga", "Abogado familiar", "Endocrinólogo")
   - Cédula profesional (u otro número de registro oficial)
   - Foto del especialista (¿ya existe o hay que indicar ruta placeholder?)

2. SERVICIOS (pedir 2–4 servicios core)
   Para cada servicio:
   - Nombre corto (ej: "Evaluación TDAH niños")
   - Población objetivo / edad (ej: "5–17 años")
   - Instrumentos o metodologías usados (ej: CONNERS-3, WISC-V)
   - Precio aproximado (o rango)
   - Duración del proceso
   - CTA específico (ej: "Agenda tu evaluación")

3. UBICACIÓN
   - Ciudad y estado/provincia
   - Dirección del consultorio
   - Coordenadas GPS (si las tiene)
   - Horarios de atención

4. CONTACTO
   - Número de WhatsApp (con código de país)
   - Teléfono de contacto
   - Redes sociales relevantes (Instagram, Facebook, TikTok, LinkedIn)
   - Sitio web canónico (dominio planeado)

5. CREDENCIALES Y TRUST
   - Formación académica relevante (2–3 puntos)
   - Experiencia/años en la especialidad
   - Afiliaciones o certificaciones (ej: "Miembro de APA")
   - ¿Tiene testimonios/reseñas? ¿Cuántas reseñas en Google? ¿Rating?
   - 3–5 testimonios con nombre y texto (si ya existen)

6. SEO LOCAL
   - Ciudad(es) donde opera o quiere posicionarse
   - ¿Hay zonas/colonias específicas que quiera destacar?
   - 3–5 temas de blog que más le preguntan sus pacientes/clientes

7. DISEÑO
   - Color de marca principal (o pedir que elija una dirección: "profesional/frío",
     "cálido/cercano", "moderno/tech")
   - ¿Tiene logo o nombre de marca?
   - Tono de voz: ¿más técnico o más cercano?
```

### Datos opcionales pero útiles

- FAQ frecuentes de sus pacientes (5–10 preguntas)
- Herramienta interactiva deseada (ej: "checklist de síntomas de TDAH")
- Páginas para instituciones (ej: "para escuelas", "para empresas")
- Blog ya existente a migrar

---

## Fase 2 — Briefing: generar `SPECIALIST.md`

Con los datos del intake, genera `SPECIALIST.md` en la raíz del proyecto.
Este archivo es el SSOT del proyecto — equivalente al `CLAUDE.md` contextual de Karen.

```markdown
# [Nombre] — [Especialidad] en [Ciudad] · Briefing de producto

## Contexto del Producto
[Propósito, usuario objetivo, la pregunta real que responde el sitio]

## La respuesta correcta a esa pregunta
[Credenciales específicas, instrumentos/metodologías, prueba social]

## Stack Técnico
[Confirmar stack o ajustar si el proyecto difiere]

## Estructura de Páginas
| Ruta | Propósito |
|------|-----------|
[Listar todas las rutas planeadas]

## Sistema de Tipos (src/types/portfolio.ts)
[Adaptar o confirmar las interfaces según los servicios]

## Paleta de Color
[Color principal → derivados → reglas de uso]

## Principios de Diseño
[3–5 principios específicos de ESTE especialista]

## Anti-referencias
[Qué NO imitar para este perfil]
```

---

## Fase 3 — Config: actualizar `lib/site.ts` y `lib/contact.ts`

### `lib/site.ts` — Adaptar completamente

Reemplazar todos los valores de Karen con los del nuevo especialista:

```typescript
/** Datos de identidad del negocio — única fuente de verdad. */

export const SITE_URL = 'https://www.[dominio].com.mx'; // confirmar TLD

export const CEDULA = '[número]';  // o REGISTRO_PROFESIONAL, BAR_NUMBER, etc.

export const SPECIALIST_IMAGE_PATH = '/[nombre-archivo].webp';
export const SPECIALIST_IMAGE = `${SITE_URL}${SPECIALIST_IMAGE_PATH}`;

export const SPECIALIST_NAME = '[Nombre Completo]';
export const SPECIALIST_TITLE = '[Título Profesional]'; // "Dra.", "Lic.", "Mtro.", etc.

export const ADDRESS = {
  streetAddress: '[dirección]',
  addressLocality: '[Ciudad]',
  addressRegion: '[Estado]',
  postalCode: '[CP]',
  addressCountry: 'MX', // ajustar si no es México
} as const;

export const GEO = { latitude: [lat], longitude: [lng] } as const;

export const HOURS = {
  weekdays: { opens: '09:00', closes: '19:00', display: '9:00 AM – 7:00 PM' },
  saturday: { opens: '09:00', closes: '14:00', display: '9:00 AM – 2:00 PM' },
} as const;

export const REVIEWS = {
  ratingValue: '[X.X]',
  reviewCount: '[N]',
} as const;
```

### `lib/contact.ts` — Adaptar completamente

```typescript
export const WA_NUMBER = '[código_país][número]'; // ej: '521XXXXXXXXXX'
export const PHONE_NUMBER = '[código_país][número]';
export const PHONE_E164 = '+[código_país][número]';

export function waUrl(message: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const SOCIAL = {
  instagram: '[url]',   // omitir si no tiene
  facebook:  '[url]',
  // linkedin, tiktok, youtube — agregar solo los que tenga
} as const;

export const INSTAGRAM_HANDLE = '@[handle]'; // si aplica

export const DIRECTORY_PROFILES: string[] = [
  // Agregar cuando estén disponibles:
  // '[url-doctoralia]',
  // '[url-psychology-today]',
  '[url-google-business]',
];
```

---

## Fase 4 — Tipos: adaptar `src/types/portfolio.ts`

La estructura de `Service` del proyecto Karen funciona para la mayoría de especialistas.
Ajustar campos según el caso:

```typescript
export interface Service {
  slug: string;
  icon: LucideIcon;
  label: string;        // nombre corto para nav/tabs
  title: string;        // título completo de la página de servicio
  age?: string;         // población objetivo (puede omitirse si no es clínico)
  desc: string;         // descripción del servicio
  price: string;        // precio o "Consultar"
  tests: string[];      // instrumentos, metodologías, fases del proceso
  cta: string;          // texto del botón CTA
  color: string;        // clase Tailwind de fondo claro (tarjeta)
  borderHover: string;  // clase Tailwind de borde en hover
}

// Agregar interfaces adicionales si el especialista las necesita:
// export interface CaseType { ... }   // abogados: tipos de casos
// export interface Procedure { ... }  // médicos: procedimientos
```

---

## Fase 5 — Páginas

### 5.1 Landing principal (`src/pages/index.tsx`)

Generar con esta estructura de secciones (mismo orden que Karen):

1. `<Hero>` — Primer impresión: credencial, CTA principal, foto del especialista
2. `<ServicesSection>` — Tarjetas de servicio (2–4 servicios)
3. `<AboutSection>` — Bio + formación + humaniza al especialista
4. `<SymptomCheckerHome>` — Herramienta interactiva (adaptar preguntas al dominio)
5. `<TestimonialsSection>` — Reseñas con nombres propios
6. `<FAQSection>` — 6–10 preguntas frecuentes
7. `<LocationSection>` — Mapa + dirección + cómo llegar

Cada sección llama a los datos de `lib/site.ts` y `lib/contact.ts`. No duplicar datos.

### 5.2 Páginas de servicio

Por cada servicio en `SERVICES`, generar una página `/[slug].tsx` con:

- `<Head>`: `applySeo()` con canonical, OG y `injectSchema()` con `MedicalClinic`/
  `LegalService`/`ProfessionalService` según el caso
- H1: título del servicio
- Descripción larga (por qué es importante, señales de alerta)
- Proceso de evaluación/consulta explicado en pasos
- Instrumentos/metodologías con descripción breve
- Precio y duración
- CTA hacia WhatsApp con mensaje predefinido
- FAQ específica del servicio (3–5 preguntas)

### 5.3 Páginas SEO local

Por cada ciudad/zona de posicionamiento, generar `/[especialidad]-[ciudad].tsx`:

- Mismo schema + canonical correcto
- Mencionar la ciudad explícitamente en H1, primeros párrafos y meta description
- Párrafo de contexto local (por qué la especialidad es relevante en esa ciudad)
- Reutilizar las secciones existentes (no duplicar componentes)

Ejemplo de rutas para un especialista en Mérida:
```
/psicologia-merida
/psicologia-zona-norte-merida
/evaluacion-tdah-merida
```

### 5.4 Página para instituciones (si aplica)

Si el especialista trabaja con escuelas, empresas u hospitales:
- `/para-escuelas` o `/para-empresas`
- Tono más formal / B2B
- CTA a email o formulario en lugar de WhatsApp directo

---

## Fase 6 — Blog

Generar **3–5 artículos** relevantes para la especialidad. Cada artículo en
`src/pages/blog/[slug].tsx` siguiendo el patrón de `BlogLayout.tsx`:

### Criterios para seleccionar temas

Priorizar las preguntas que el especialista más escucha de sus pacientes/clientes.
Patrones probados del proyecto Karen:

| Tipo | Ejemplo Karen | Adaptar a nuevo especialista |
|------|-------------|------------------------------|
| "¿Cuánto cuesta X en [ciudad]?" | `cuanto-cuesta-valoracion-tdah-cancun` | Precio local + factores que lo afectan |
| "¿Dónde hago X en [ciudad]?" | `donde-evaluar-tdah-cancun` | Criterios para elegir especialista |
| "Señales de que necesito X" | `senales-tdah-ninos` | Síntomas/señales de alerta |
| "Diferencias entre X e Y" | `burnout-o-tdah-diferencias` | Confusiones frecuentes |
| "¿Qué es el instrumento/prueba X?" | `que-es-ados-2-autismo` | Explicar su metodología principal |

### Estructura de cada artículo

```tsx
// src/pages/blog/[slug].tsx
export default function ArticuloEjemplo() {
  useEffect(() => {
    applySeo({
      title: '[Título SEO — incluir ciudad + keyword]',
      description: '[Meta description 150–160 chars]',
      canonical: `${SITE_URL}/blog/[slug]`,
      ogTitle: '[og:title]',
      ogDescription: '[og:description]',
    });
    injectSchema({/* FAQPage o Article schema */});
    return () => { /* cleanup */ };
  }, []);

  return (
    <BlogLayout
      title="[H1 del artículo]"
      date="[Fecha ISO]"
      heroImage="/blog/[slug]-1200x675.svg"   // imagen a generar después
      heroAlt="[descripción de la imagen]"
    >
      {/* Contenido */}
    </BlogLayout>
  );
}
```

### og:image de los artículos

**IMPORTANTE (Lección #6 del proyecto Karen):** El `og:image` de cada artículo debe
apuntar a la imagen hero del artículo (`/blog/[slug]-1200x675.svg`), **no** a la foto
del especialista. Esto es lo que aparece cuando alguien comparte en redes sociales.

---

## Fase 7 — Assets estáticos

### `public/sitemap.xml`

Incluir todas las URLs en este orden:
1. Homepage (`/`)
2. Páginas de servicio (una por servicio)
3. Páginas SEO local
4. Página de precios (si existe)
5. Para instituciones (si existe)
6. Blog index (`/blog`)
7. Artículos de blog (uno por artículo)

Usar `lastmod` con la fecha de generación. `changefreq: monthly` para todo.

### `public/robots.txt`

```
User-agent: *
Allow: /

Sitemap: https://www.[dominio]/sitemap.xml
```

### `public/nap.json`

NAP (Name, Address, Phone) para consistencia de citas locales:

```json
{
  "name": "[Nombre del especialista o clínica]",
  "telephone": "+[código][número]",
  "address": {
    "streetAddress": "[dirección]",
    "addressLocality": "[Ciudad]",
    "addressRegion": "[Estado]",
    "postalCode": "[CP]",
    "addressCountry": "MX"
  },
  "geo": {
    "latitude": [lat],
    "longitude": [lng]
  },
  "url": "https://www.[dominio]",
  "openingHours": ["Mo-Fr 09:00-19:00", "Sa 09:00-14:00"]
}
```

### `public/llms.txt`

```
# [Nombre] — [Especialidad]

[Nombre completo] es [título] especializada/o en [especialidades] en [Ciudad].

## Servicios
[Lista de servicios con precios]

## Contacto
- WhatsApp: https://wa.me/[número]
- Dirección: [dirección]

## Registro profesional
Cédula/registro: [número]
```

---

## Fase 8 — Verificar

### TypeScript

```bash
npx tsc --noEmit -p .
```

Debe retornar 0 errores. Si hay errores, corregir antes de reportar como completo.

### Checklist SEO por página

Para cada página generada, confirmar:

- [ ] `applySeo()` llamado con canonical correcto
- [ ] `injectSchema()` llamado con JSON-LD apropiado
- [ ] H1 único y descriptivo
- [ ] Meta description entre 150–160 caracteres
- [ ] `og:image` apunta a imagen landscape (1200×630+), no a foto retrato
- [ ] Cleanup en el `return` del `useEffect`
- [ ] No hay rutas duplicadas en `sitemap.xml`

### Checklist de contacto

- [ ] `lib/contact.ts` es la única fuente de datos de contacto
- [ ] `lib/site.ts` es la única fuente de dirección, coordenadas y horarios
- [ ] No hay números de WhatsApp o teléfonos hardcodeados en componentes

### Checklist de diseño

- [ ] El color principal aplica el rol de "Plum Ink" de Karen (único color saturado)
- [ ] Sombras con tinte del color principal, nunca gris genérico
- [ ] Border radius máximo: `rounded-2xl` en tarjetas
- [ ] Todas las animaciones de Framer Motion tienen `prefers-reduced-motion`
- [ ] Contraste de texto: mínimo AA (verificar colores nuevos)

---

## Reglas de diseño a adaptar

El sistema de diseño de Karen usa Plum Ink (`#382f51`) como único color saturado.
Para el nuevo especialista, elige UN color base que refleje su dominio:

| Especialidad | Color sugerido | Justificación |
|-------------|---------------|---------------|
| Neuropsicología / Salud mental | Plum (`#382f51`) | Introspección, profundidad |
| Medicina / Endocrinología | Teal oscuro (`#1e4a4a`) | Confianza clínica |
| Derecho / Legal | Navy (`#1c2d4f`) | Autoridad, seriedad |
| Nutrición / Bienestar | Olive (`#3a4a2e`) | Naturaleza, equilibrio |
| Odontología | Steel blue (`#2e3d5f`) | Limpieza, precisión |
| Pediatría | Slate verde (`#2d4a3e`) | Calidez, crecimiento |
| Fisioterapia | Rust oscuro (`#4a2e1e`) | Movimiento, energía |

**Regla invariante:** Independientemente del color, los acentos (lavender, blush, warm-sand
o sus equivalentes) son SOLO fondos de tarjeta — nunca texto sobre blanco.

---

## Patrones de copywriting probados

Del proyecto Karen, estos patrones de copy convirtieron bien:

### Hero
```
[Especialidad] para [población objetivo]
en [Ciudad]

[Credencial clave #1] · [Credencial clave #2] · [Credencial clave #3]

[CTA principal: "Agenda tu consulta" o similar]
```

### Tarjeta de servicio
```
[Servicio]
[Población: "Para niños 5–17 años" / "Para adultos"]

[Descripción del problema que resuelve, en lenguaje del paciente/cliente]

Instrumentos: [lista con nombres propios]
Duración: [X sesiones / X horas]
Inversión: $[precio] MXN

[CTA específico por WhatsApp]
```

### Testimonio
```
"[Texto en primera persona, específico, con resultado concreto]"
— [Nombre completo o inicial], [servicio recibido]
```

---

## Lecciones del proyecto Karen (aplicar siempre)

1. **No hay navegador disponible** en entorno remoto. Verificar con `curl` + `grep` al HTML
   renderizado, no con screenshots. (`Lesson #1`)

2. **El HTML de Next.js SSR viene en una sola línea.** Usar `grep -o "X" archivo | wc -l`
   para contar ocurrencias reales. (`Lesson #2`)

3. **Revisar `git log --follow` antes de asumir que un archivo es descartable.**
   `tsconfig.tsbuildinfo` puede estar versionado. (`Lesson #3`)

4. **Agentes en paralelo:** al aplicar el mismo patrón a múltiples archivos, repartir en
   agentes con instrucción explícita de auto-verificar con `tsc` y `git diff --stat`. (`Lesson #4`)

5. **El sitio live puede devolver 403 (Cloudflare).** Analizar archivos fuente directamente
   en vez de hacer fetch del sitio producción. (`Lesson #5`)

6. **`og:image` de blog ≠ foto del especialista.** Cada artículo necesita su propia imagen
   landscape 1200×675 como og:image. (`Lesson #6`)

7. **Verificar que no haya referencias rotas** antes de reportar como completo.
   Usar `Glob` + `Grep` para cruzar `src/` references con archivos en `public/`. (`Lesson #7`)
