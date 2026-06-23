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

2. BUYER PERSONA — quién llega al sitio y desde dónde
   - ¿Quién es el cliente/paciente típico? (perfil: edad, situación, rol — ej: "mamá de niño de 8 años")
   - ¿Qué lo hace llegar al especialista? (el detonador: evento, síntoma, recomendación)
   - ¿Qué lleva intentando antes de llegar? (qué ha hecho sin resultado: otro médico, internet, ignorarlo)
   - ¿Cuál es su mayor miedo o duda antes de agendar? (la objeción real)
   - ¿Cuál es la pregunta real que el sitio debe responder? (ej: "¿puedo confiarle la evaluación de mi hijo?")
   - ¿Hay más de un perfil de cliente? (ej: niños + adultos, empresas + personas, etc.)

3. PRODUCTO / SERVICIO EN PROFUNDIDAD (para cada servicio core, 2–4)
   - Nombre corto del servicio (ej: "Evaluación TDAH niños")
   - ¿Qué problema concreto resuelve? (en palabras del cliente, no del especialista)
   - ¿Qué transformación vive el cliente? (estado antes → estado después del servicio)
   - ¿Qué hace diferente a este especialista vs. cualquier otro que ofrezca lo mismo?
   - ¿Cómo es el proceso completo, paso a paso, desde que el cliente agenda hasta que termina?
   - ¿Qué entrega concreta recibe al final? (ej: informe clínico con cédula, plan de tratamiento, contrato firmado)
   - Instrumentos o metodologías usados (nombres propios: CONNERS-3, WISC-V, etc.)
   - Precio aproximado (o rango) y duración total
   - Población objetivo / edad (si aplica)
   - CTA específico (ej: "Agenda tu evaluación")

4. UBICACIÓN
   - Ciudad y estado/provincia
   - Dirección del consultorio
   - Coordenadas GPS (si las tiene)
   - Horarios de atención

5. CONTACTO
   - Número de WhatsApp (con código de país)
   - Teléfono de contacto
   - Redes sociales relevantes (Instagram, Facebook, TikTok, LinkedIn)
   - Sitio web canónico (dominio planeado)

6. CREDENCIALES Y TRUST
   - Formación académica relevante (2–3 puntos)
   - Experiencia/años en la especialidad
   - Afiliaciones o certificaciones (ej: "Miembro de APA")
   - ¿Tiene testimonios/reseñas? ¿Cuántas reseñas en Google? ¿Rating?
   - 3–5 testimonios con nombre y texto (si ya existen)

7. SEO LOCAL
   - Ciudad(es) donde opera o quiere posicionarse
   - ¿Hay zonas/colonias específicas que quiera destacar?
   - 3–5 temas de blog que más le preguntan sus pacientes/clientes

8. DISEÑO
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
**Todo el copy del sitio debe ser consistente con este documento.**

```markdown
# [Nombre] — [Especialidad] en [Ciudad] · Briefing de producto

## Contexto del Producto
[Propósito del sitio en una oración. A quién convierte y en qué acción.]

## Buyer Persona
**Perfil principal:** [Quién es — edad, rol, situación]
**Detonador:** [Qué lo hace llegar — el evento o síntoma que lo movió a buscar]
**Historia previa:** [Qué ha intentado sin resultado]
**Miedo principal:** [La objeción real antes de agendar]
**La pregunta real del sitio:** "[Frase exacta que el visitante se hace al llegar]"
**Perfiles secundarios (si existen):** [Describir brevemente]

## Producto / Servicio
Para cada servicio:

### [Nombre del servicio]
- **Problema que resuelve:** [En palabras del cliente]
- **Transformación:** [Antes] → [Después]
- **Diferenciador:** [Por qué este especialista y no otro]
- **Proceso:** Paso 1 → Paso 2 → Paso 3 → [Entregable final]
- **Entregable concreto:** [Qué recibe al terminar]
- **Instrumentos:** [Lista]
- **Precio / Duración:** [Datos]

## La respuesta correcta a la pregunta real
[Cómo el sitio responde esa pregunta: credenciales específicas, instrumentos con nombre,
proceso explicado, reseñas con nombres propios, entregable concreto]

## Stack Técnico
[Confirmar stack o ajustar si el proyecto difiere]

## Estructura de Páginas
| Ruta | Propósito |
|------|-----------|
[Listar todas las rutas planeadas]

## Paleta de Color
[Color principal → derivados → reglas de uso]

## Principios de Diseño
[3–5 principios específicos de ESTE especialista, derivados del buyer persona]

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
Agregar los campos de producto/transformación que el intake ahora captura:

```typescript
export interface Service {
  slug: string;
  icon: LucideIcon;
  label: string;           // nombre corto para nav/tabs
  title: string;           // título completo de la página de servicio
  age?: string;            // población objetivo (puede omitirse si no es clínico)
  problem: string;         // problema que resuelve, en lenguaje del cliente
  transformation: {
    before: string;        // estado antes del servicio
    after: string;         // estado después del servicio
  };
  differentiator: string;  // por qué este especialista y no otro
  process: string[];       // pasos del proceso de principio a fin
  deliverable: string;     // qué entrega concreta recibe el cliente al terminar
  desc: string;            // descripción corta para tarjeta (derivada de problem + transformation)
  price: string;           // precio o "Consultar"
  tests: string[];         // instrumentos, metodologías, fases del proceso
  cta: string;             // texto del botón CTA
  color: string;           // clase Tailwind de fondo claro (tarjeta)
  borderHover: string;     // clase Tailwind de borde en hover
}

export interface BuyerPersona {
  profile: string;         // quién es — edad, rol, situación
  trigger: string;         // qué lo hace llegar
  history: string;         // qué ha intentado antes sin resultado
  mainFear: string;        // su mayor duda antes de agendar
  realQuestion: string;    // la pregunta que el sitio debe responder
}

export interface Credential {
  icon: LucideIcon;
  text: string;
}

export interface Review {
  name: string;
  text: string;
  stars: number;
  service: string;
}

export interface FaqItem {
  q: string;
  a: string;
}
```

---

## Fase 5 — Páginas

### 5.1 Landing principal (`src/pages/index.tsx`)

El copy de cada sección debe derivarse directamente del `BuyerPersona` y del `Service`
del intake — no del punto de vista del especialista sino del cliente.

Generar con esta estructura de secciones (mismo orden que Karen):

1. `<Hero>` — Responde la `realQuestion` del buyer persona. Credenciales visibles.
   CTA principal con mensaje de WhatsApp predefinido en lenguaje del cliente.
2. `<ServicesSection>` — Tarjetas construidas desde `problem` + `transformation` de cada servicio.
   No listar características: listar el antes/después.
3. `<AboutSection>` — Bio + formación + humaniza al especialista.
   Conectar su historia con el `trigger` y el `mainFear` del buyer persona.
4. `<SymptomCheckerHome>` — Herramienta interactiva. Preguntas basadas en los síntomas/señales
   del `trigger` del buyer persona.
5. `<TestimonialsSection>` — Reseñas con nombres propios. Priorizar las que mencionen
   el `mainFear` resuelto o la `transformation` vivida.
6. `<FAQSection>` — 6–10 preguntas. Las primeras 3 deben responder el `mainFear`
   y la `realQuestion`. Las restantes: operativas (precio, duración, proceso).
7. `<LocationSection>` — Mapa + dirección + cómo llegar.

Cada sección llama a los datos de `lib/site.ts` y `lib/contact.ts`. No duplicar datos.

### 5.2 Páginas de servicio

Por cada servicio, generar `/[slug].tsx` con copy construido desde el intake de producto:

- `<Head>`: `applySeo()` con canonical, OG y `injectSchema()` con `MedicalClinic`/
  `LegalService`/`ProfessionalService` según el caso
- H1: título del servicio + ciudad (para SEO)
- Párrafo de apertura: el `problem` del servicio en palabras del cliente
- Sección de transformación: antes → después (del campo `transformation`)
- Por qué este especialista: el `differentiator`
- Proceso paso a paso: el array `process` convertido en timeline visual
- Entregable concreto: el campo `deliverable` destacado visualmente
- Instrumentos/metodologías: el array `tests` con descripción breve de cada uno
- Precio y duración
- CTA hacia WhatsApp con mensaje predefinido que mencione el servicio específico
- FAQ específica del servicio (3–5 preguntas derivadas del `mainFear` del buyer persona)

### 5.3 Páginas SEO local

Por cada ciudad/zona de posicionamiento, generar `/[especialidad]-[ciudad].tsx`:

- Mismo schema + canonical correcto
- H1 y primeros párrafos: mencionar ciudad + especialidad
- Párrafo de contexto local: por qué la especialidad es relevante en esa ciudad
  (usar datos reales si el especialista los tiene, no inventar estadísticas)
- Reutilizar las secciones existentes — no duplicar componentes

Ejemplo de rutas para un especialista en Mérida:
```
/psicologia-merida
/psicologia-zona-norte-merida
/evaluacion-tdah-merida
```

### 5.4 Página para instituciones (si aplica)

Si el especialista trabaja con escuelas, empresas u hospitales:
- `/para-escuelas` o `/para-empresas`
- Buyer persona diferente: director, HR, coordinador — adaptar copy
- Tono más formal / B2B
- CTA a email o formulario en lugar de WhatsApp directo

---

## Fase 6 — Blog

Generar **3–5 artículos** relevantes para la especialidad. Cada artículo en
`src/pages/blog/[slug].tsx` siguiendo el patrón de `BlogLayout.tsx`.

### Criterios para seleccionar temas

Los temas del blog deben responder las preguntas que el buyer persona busca en Google
**antes** de llegar al sitio — no después. Fuente: los temas del intake (bloque 7: SEO LOCAL).

Patrones probados del proyecto Karen:

| Tipo | Ejemplo Karen | Adaptar a nuevo especialista |
|------|-------------|------------------------------|
| "¿Cuánto cuesta X en [ciudad]?" | `cuanto-cuesta-valoracion-tdah-cancun` | Precio local + factores que lo afectan |
| "¿Dónde hago X en [ciudad]?" | `donde-evaluar-tdah-cancun` | Criterios para elegir especialista |
| "Señales de que necesito X" | `senales-tdah-ninos` | Los síntomas del `trigger` del buyer persona |
| "Diferencias entre X e Y" | `burnout-o-tdah-diferencias` | Confusiones frecuentes del buyer persona |
| "¿Qué es el instrumento/prueba X?" | `que-es-ados-2-autismo` | Explicar el `deliverable` o metodología principal |

El copy interno de cada artículo debe hablar directamente al `profile` y al `mainFear`
del buyer persona — no a un lector genérico.

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

### Checklist de copy (buyer persona)

- [ ] El H1 del hero responde la `realQuestion` del buyer persona
- [ ] Las tarjetas de servicio hablan del `problem` y la `transformation`, no de características
- [ ] El FAQ cubre el `mainFear` en las primeras 3 preguntas
- [ ] Los artículos de blog están escritos para el `profile` del buyer persona
- [ ] Los CTAs de WhatsApp incluyen un mensaje predefinido en lenguaje del cliente

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

**Regla invariante:** Independientemente del color, los acentos son SOLO fondos de
tarjeta — nunca texto sobre blanco.

---

## Patrones de copywriting probados

Todo el copy se escribe desde el punto de vista del buyer persona, no del especialista.

### Hero

```
[La respuesta a la realQuestion del buyer persona]
en [Ciudad]

[Credencial clave #1] · [Credencial clave #2] · [Credencial clave #3]

[CTA: texto que suena a lo que el cliente diría, no a lo que el especialista ofrece]
```

Ejemplo Karen: "¿Puedo confiarle la evaluación de mi hijo?" → hero dice:
"Diagnóstico TDAH y Autismo con instrumentos estandarizados en Cancún"
(responde la pregunta implícita con evidencia, no con promesas)

### Tarjeta de servicio

```
[Nombre del servicio]
[Población objetivo si aplica]

[El `problem` del servicio en palabras del cliente]
[La `transformation`: antes → después, en una línea]

[`differentiator` en una línea]
[`deliverable` concreto]

Duración: [X]  ·  Inversión: $[precio]

[CTA específico por WhatsApp]
```

### Testimonio

```
"[Texto que refleja la `transformation` vivida — antes / después]"
— [Nombre completo o inicial], [servicio recibido]
```

Priorizar testimonios que mencionen el `mainFear` resuelto. Son los más convincentes.

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
