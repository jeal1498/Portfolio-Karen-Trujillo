# Plan de Implementación SEO — psicologakarentrujillo.com.mx

> **Para Claude Code (sesión nueva):** Este documento es un handoff autocontenido. Léelo completo, confirma con el usuario los puntos marcados **🔒 REQUIERE CONFIRMACIÓN DEL DUEÑO** antes de tocarlos, y ejecuta las tareas por fases, una a una, verificando cada cambio. Marca cada tarea como hecha conforme avances.
>
> Origen: auditoría SEO del 2026-06-17 (HTML en vivo + código fuente + sub-agents de la herramienta `claude-seo` ya instalada en `.claude/skills/seo*`). Health Score inicial: **78/100**. Evidencia detallada y hallazgos por categoría en [`docs/seo-audit-report.md`](./seo-audit-report.md).

---

## 0. Contexto del proyecto (imprescindible)

- **Sitio:** Karen Trujillo, neuropsicóloga en Cancún (México). Diagnóstico de TDAH (niños 5–17, adultos) y autismo (TEA). Negocio **local de salud (YMYL)** — la credibilidad clínica es el eje. Cédula profesional **11009616**.
- **Stack:** Next.js 14 (Pages Router) + React 18 + TypeScript + Tailwind v3 + Framer Motion 12. SEO centralizado en `src/lib/seo.ts` (`applySeo`, `injectSchema`); constantes en `src/lib/site.ts` (`SITE_URL`, `CEDULA`, `ADDRESS`, `KAREN_IMAGE`, rating/reviewCount); contacto en `src/lib/contact.ts` (única fuente de NAP telefónico).
- **Rutas:** `/`, `/evaluacion-tdah-ninos`, `/evaluacion-tdah-adultos`, `/evaluacion-autismo-cancun`, `/neuropsicologia-cancun`, `/neuropsicologia-zona-hotelera-cancun`, `/para-escuelas`, `/precios`, `/blog` + 11 artículos en `/blog/*`.
- **Lee también:** `CLAUDE.md`, `DESIGN.md`, `PRODUCT.md` en la raíz antes de editar UI. Respeta el sistema de diseño (Plum Ink único color saturado, `rounded-2xl` máx, sombras con tinte plum).

### Reglas de trabajo (de las preferencias del usuario)
- **Cambios quirúrgicos:** modifica solo lo que cada tarea pide; no refactorices código adyacente.
- **Rama:** trabaja en una rama de feature; **no** hagas push a `main` sin permiso. Commits en formato `tipo: descripción` (feat/fix/docs/chore…).
- **Verificación basada en evidencia:** no declares nada "hecho" sin correr la verificación de esa tarea en el mismo turno.

### ⚠️ Entorno (lecciones de `CLAUDE.md`)
- **No hay navegador headless** (Playwright/chrome-devtools fallan en remoto). Verifica con `next dev` + `curl` al HTML SSR + `grep`.
- El HTML SSR viene en **una sola línea**: para contar ocurrencias usa `grep -o "X" archivo | wc -l` (no `grep -c`).
- `tsconfig.tsbuildinfo` **está versionado** en este repo: si corres `tsc`/`next build`, inclúyelo en el commit.
- Tras instalar deps SEO opcionales (no necesarias para casi todas estas tareas): `pip install -r .claude/skills/seo/requirements.txt`.

### Setup inicial (contenedor/clon nuevo) — córrelo una vez
```bash
git checkout claude/exciting-newton-lfn2v8   # rama de trabajo (o crea una rama de feature desde aquí)
npm install                                  # gestor: npm (hay package-lock.json). Instala dependencias
npm run dev                                  # servidor de desarrollo en http://localhost:3000
```
> En algunos entornos remotos un hook de SessionStart ya corre `npm install`; ejecútalo igual si `node_modules` no existe.

### Verificación por tarea
```bash
npx tsc --noEmit        # 0 errores de tipos (hay tsconfig; recuerda: tsconfig.tsbuildinfo va versionado)
npm run build           # build verde — si cambia tsconfig.tsbuildinfo, inclúyelo en el commit
# Verificación SSR en vivo de una ruta (con `npm run dev` corriendo en :3000):
curl -sL http://localhost:3000/<ruta> | grep -o '<patrón>'
```
> **Scripts disponibles:** `dev`, `build`, `start`. **No hay** `lint` ni `test` ni ESLint en el proyecto → usa `npx tsc --noEmit` como verificación de calidad.

---

## 🔒 Bloqueadores — confirmar con el dueño ANTES de codear

Pregunta esto al usuario al inicio (afecta a T-03, T-04, T-05, T-12):

1. **Ubicación real del consultorio:** ¿las coordenadas correctas son las del pin de Google Maps `21.1530418, -86.8958544` (las que ya usa el embed y el enlace "cómo llegar"), o las del schema `21.1619, -86.8515`? Difieren ~4.7 km. **No edites coordenadas sin confirmar.**
2. **Horario de cierre real entre semana:** ¿7:00 PM (lo que dice el schema y el resto del sitio) u 8:00 PM (lo que muestra `LocationSection`)?
3. **Dirección postal canónica completa** (con número de circuito): hoy hay 4 variantes. Necesitamos UNA oficial para centralizar en `site.ts`.
4. **Imágenes reales del blog/servicios:** ¿el dueño puede aportar fotos (consultorio, materiales de evaluación) o autorizamos generación de imágenes? Hoy hay 75 `placehold.co` en producción.

---

## FASE 1 — Críticos (quick wins de código + bloqueadores)

### T-01 · `<title>` de la HOME vacío en SSR — **High** ✅ código directo
- **Problema:** `src/pages/index.tsx:342` usa `<title>…Cédula {CEDULA}</title>`. El `<title>` con hijos mixtos (texto + interpolación) no lo serializa `next/head` y emite `<title></title>` en el SSR (verificado: `curl -sL https://www.psicologakarentrujillo.com.mx/ | grep -o '<title>[^<]*</title>'` → vacío). La home es la página más importante.
- **Fix (1 línea):**
  ```tsx
  // antes
  <title>Neuropsicóloga en Cancún — TDAH y Autismo | Karen Trujillo · Cédula {CEDULA}</title>
  // después
  <title>{`Neuropsicóloga en Cancún — TDAH y Autismo | Karen Trujillo · Cédula ${CEDULA}`}</title>
  ```
- **Revisa de paso:** que ninguna otra ruta tenga `<title>` con hijos mixtos: `grep -rn "<title>.*{" src/pages`.
- **Verificación:** `npm run dev` + `curl -s http://localhost:3000/ | grep -o '<title>[^<]*</title>'` → debe mostrar el título con la cédula.
- **Commit:** `fix: corregir título SSR vacío en home (interpolación en <title>)`

### T-02 · Imágenes placeholder en producción — **Critical** 🔒 (depende de bloqueador 4)
- **Problema:** 75 referencias a `placehold.co` en los 10 artículos de `src/pages/blog/*` y en las tarjetas de blog de la home (`src/pages/index.tsx` ~líneas 1010-1012). Además, todas las `og:image` de artículos apuntan a `KAREN_IMAGE` genérico en vez de una imagen del artículo.
- **Listar todo:** `grep -rn "placehold.co" src/`
- **Fix:** sustituir cada placeholder por una imagen real (WebP, servida desde `/public`, vía `next/image`). Mínimo: 1 hero por artículo + 1 `og:image` por servicio. Empezar por la home y los 3 artículos más visitados.
- **Opciones de assets:** (a) fotos que aporte el dueño; (b) `/seo image-gen` (requiere extensión banana + API key); (c) ilustraciones clínicas. **Confirmar con el dueño antes.**
- **Verificación:** `grep -rc "placehold.co" src/ | grep -v ':0'` → vacío al terminar; `curl` de un artículo y confirmar `og:image` específico.
- **Commit:** `fix: reemplazar imágenes placeholder por activos reales (blog + home)`

### T-03 · Coordenadas geo desalineadas — **Critical** 🔒 (bloqueador 1)
- **Problema:** schema y meta usan `21.1619, -86.8515` (`src/pages/index.tsx:149` `GeoCoordinates`, `:348` `geo.position`, `:349` `ICBM`) pero el embed del GBP (`:1066`) y el enlace de direcciones (`:1129`) usan `21.1530418, -86.8958544`. Posible exclusión del área de búsqueda local correcta. Revisa también si las páginas de ubicación repiten coords.
- **Fix (tras confirmar la coordenada correcta):** centralizar en `src/lib/site.ts` (p. ej. `export const GEO = { latitude: …, longitude: … }`) y referenciarla en `index.tsx:149/348/349` y en cualquier otra página que emita geo. Eliminar el valor hardcodeado duplicado.
- **Verificación:** `grep -rn "21.16\|21.15\|GeoCoordinates\|geo.position" src/` → un único par de coordenadas en todo el repo.
- **Commit:** `fix: unificar coordenadas geo (schema/meta) con la ubicación real del consultorio`

### T-04 · Horario inconsistente (8 PM vs 19:00) — **Critical** 🔒 (bloqueador 2)
- **Problema:** `src/components/LocationSection.tsx:45` muestra "9:00 AM - 8:00 PM"; el `OpeningHoursSpecification` del schema (en `index.tsx`) dice `closes 19:00`; las páginas `/neuropsicologia-*` dicen 7 PM.
- **Fix (tras confirmar el horario real):** definir el horario en `site.ts` (p. ej. `export const HOURS = { weekdays: { opens: '09:00', closes: '19:00' }, saturday: {…} }`) y consumirlo tanto en `LocationSection.tsx` como en el schema. Unificar valor único.
- **Verificación:** `grep -rn "8:00 PM\|20:00\|19:00\|7:00 PM" src/` → coherente en todas las fuentes.
- **Commit:** `fix: unificar horario de atención entre UI visible y schema`

---

## FASE 2 — Alto impacto

### T-05 · NAP: dirección y nombre canónicos — **High** 🔒 (bloqueador 3)
- **Problema:** dirección en 4 variantes (`site.ts:21` `streetAddress`, `LocationSection.tsx:32`, y los schemas que interpolan "Supermanzana"); nombre del negocio en ~4 variantes entre schemas y GBP. Teléfono SÍ es consistente (`+529983211547`).
- **Fix:** dejar la dirección canónica completa en `site.ts` (`ADDRESS`) y un `BUSINESS_NAME` único (idealmente igual al del GBP). Que `LocationSection.tsx` y todos los `injectSchema` importen de `site.ts`; eliminar literales y la interpolación de "Supermanzana".
- **Verificación:** `grep -rn "Chinconcuac\|Supermanzana" src/` → solo en `site.ts`.
- **Commit:** `fix: centralizar NAP (dirección y nombre de negocio) en site.ts`

### T-06 · `/precios` es página huérfana — **High** ✅ código directo
- **Problema:** `/precios` (HTTP 200, alta intención transaccional) no está en el navbar ni enlazada desde la home; solo aparece en el sitemap → no recibe enlaces internos.
- **Fix:** añadir a `src/components/Navbar.tsx:7` (`NAV_LINKS`) `{ href: '/precios', label: 'Precios' }` (después de "Servicios"); añadir un enlace contextual "Ver precios →" en cada tarjeta de `ServicesSection`; enlazar `/precios` desde el artículo `blog/cuanto-cuesta-valoracion-tdah-cancun`.
- **Verificación:** `curl -s http://localhost:3000/ | grep -o '/precios'` → ≥1; revisar que el navbar renderice "Precios".
- **Commit:** `feat: enlazar /precios desde navbar, servicios y blog (eliminar página huérfana)`

### T-07 · Typo en H1 de `/precios` — **Low** ✅ código directo
- **Problema:** `src/pages/precios.tsx:202` `Inversión en el<br />diagnóstico correcto` → el texto se extrae como "Inversión en el​diagnóstico" (sin espacio). 
- **Fix:** asegurar el espacio, p. ej. `Inversión en el{' '}<br />diagnóstico correcto` o reestructurar para que el contenido accesible diga "Inversión en el diagnóstico correcto".
- **Verificación:** `curl -s http://localhost:3000/precios | grep -o '<h1[^>]*>[^<]*'` (texto correcto).
- **Commit:** `fix: corregir espaciado en H1 de /precios`

### T-08 · `og:image` faltante + `lang=es-MX` — **Medium** ✅ código directo
- **Problema A:** `src/pages/precios.tsx` (Head desde `:180`) y `/blog` (índice) no incluyen `<meta property="og:image">` (verificado: og:image vacío en vivo). 
- **Problema B:** `src/pages/_document.tsx:72` usa `<Html lang="es">` → debería ser `es-MX` (mercado mexicano).
- **Fix:** añadir `<meta property="og:image" content={KAREN_IMAGE} />` (o imagen específica de la página) en los Head de `/precios` y `/blog`; cambiar `lang="es"` → `lang="es-MX"`.
- **Verificación:** `curl -s .../precios | grep -o 'og:image'` y `curl -s .../ | grep -o 'lang="es-MX"'`.
- **Commit:** `fix: añadir og:image en /precios y /blog; lang es-MX`

### T-09 · CTA de reseñas + `Review` en home — **Medium** ✅ código directo
- **Problema:** el sitio declara `ratingValue 5.0` / `reviewCount 47` (`site.ts:30-31`) pero no hay enlace para dejar reseña ni nodos `Review` individuales en la home (sí existen en páginas de servicio). El CID del GBP ya está disponible en el embed (`0x8f4c2b10d813a9c7:0x4042823298a0080b`).
- **Fix:** (a) botón "Deja tu reseña en Google" en `LocationSection`/footer apuntando a `https://search.google.com/local/writereview?placeid=…` (o `g.page/r/<CID>/review`); (b) añadir un bloque JSON-LD con los `testimonials` de `src/components/TestimonialsSection.tsx:4` como nodos `Review` con `itemReviewed` → `/#clinic`.
- **Verificación:** `curl -s http://localhost:3000/ | grep -o '"@type":"Review"' | wc -l` ≥ 1.
- **Commit:** `feat: enlace para reseñas de Google y nodos Review en home`

---

## FASE 3 — Contenido, schema y autoridad

### T-10 · Quitar `HowTo` deprecado del schema — **Medium** ✅ código directo
- **Problema:** `HowTo`/`HowToStep` presentes en `src/pages/evaluacion-tdah-ninos.tsx`, `evaluacion-tdah-adultos.tsx`, `evaluacion-autismo-cancun.tsx`. Google retiró los rich results de HowTo (sept-2023): es markup muerto.
- **Fix:** eliminar los nodos `HowTo`/`HowToStep` de esos `injectSchema`. El proceso puede quedar como contenido normal de la página. (Verifica con `.claude/skills/seo-schema` la lista de tipos vigentes.)
- **Verificación:** `grep -rn "HowTo" src/pages` → vacío.
- **Commit:** `fix: eliminar schema HowTo deprecado de páginas de servicio`

### T-11 · Fecha visible + autoría en artículos — **Medium** ✅ código directo
- **Problema:** los artículos tienen `datePublished`/`dateModified` en JSON-LD pero no fecha visible para el lector (señal E-E-A-T / freshness en salud).
- **Fix:** en `src/components/BlogLayout.tsx`, mostrar una línea: `Actualizado <mes año> · Revisado por Karen Trujillo, Neuropsicóloga (Cédula 11009616)`, alimentada por la fecha del artículo.
- **Verificación:** `curl -s .../blog/que-es-ados-2-autismo | grep -o 'Revisado por Karen'`.
- **Commit:** `feat: fecha de actualización y autoría visibles en artículos del blog`

### T-12 · Autoridad off-site (directorios) — **Medium** 🔒 acción del dueño
- **Problema:** para la consulta genérica "neuropsicólogo Cancún" el SERP lo dominan directorios (Doctoralia, Psychology Today, Top Doctors); una landing individual no compite ahí. Sin perfiles tier-1 verificados.
- **Acción (fuera de código):** crear/optimizar perfiles en **Doctoralia.mx**, **Psychology Today MX**, **Top Doctors**, con NAP idéntico al de `site.ts` (post T-05) y los instrumentos (ADOS-2, WISC-V, CAARS-2) como diferenciador. Documentar los enlaces resultantes.
- **Commit:** N/A (tarea operativa; opcional documentar en este archivo).

---

## FASE 4 — Técnico fino, performance y monitoreo

### T-13 · `prefers-reduced-motion` en animaciones — **Medium** ✅ código directo
- **Problema:** `CLAUDE.md` exige cubrir `prefers-reduced-motion` en TODA animación Framer Motion. 9 componentes no lo hacen: `Hero`, `AboutSection`, `ServicesSection`, `FAQSection`, `TestimonialsSection`, `LocationSection`, `SymptomChecker`, `FloatingButtons`, `BlogLayout` (3 ya lo cubren). Impacta INP y accesibilidad WCAG.
- **Fix:** en cada uno, `const reduce = useReducedMotion()` y condicionar variantes/`initial`/`animate` (sin desplazamientos ni opacidades animadas cuando `reduce` es true). Seguir el patrón de los componentes que ya lo implementan.
- **Verificación:** `for f in $(grep -rl framer-motion src/components); do grep -q useReducedMotion "$f" || echo "FALTA $f"; done` → vacío.
- **Commit:** `fix: cubrir prefers-reduced-motion en animaciones restantes`

### T-14 · Security headers — **Low/Medium** ✅ código directo
- **Problema:** solo hay HSTS. Faltan `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options` (y opcional CSP).
- **Fix:** añadir `headers()` en `next.config.js` (o `vercel.json`) para esas cabeceras en todas las rutas.
- **Verificación:** `curl -sI .../ | grep -iE "x-content-type|referrer-policy|x-frame"`.
- **Commit:** `chore: añadir cabeceras de seguridad (X-Content-Type-Options, Referrer-Policy, X-Frame-Options)`

### T-15 · `sitemap.xml` con `lastmod` reales — **Low** ✅ código directo
- **Problema:** `public/sitemap.xml` es estático con `lastmod` uniforme `2026-04-22`.
- **Fix:** generar el sitemap por build con fechas reales por ruta (p. ej. `next-sitemap`, o un script en `prebuild`). Mantener las 19 URLs.
- **Verificación:** `curl -s .../sitemap.xml | grep -c "<lastmod>"` y fechas variadas.
- **Commit:** `chore: generar sitemap con lastmod por página`

### T-16 · `llms.txt` (opcional) — **Low**
- **Nota (basada en evidencia):** `llms.txt` **no** es hoy una palanca de citación demostrada. Implementar solo si se quiere por completitud; no es prioritario. Si se hace: `public/llms.txt` con descripción del consultorio, servicios y enlaces clave.

### T-17 · Datos de campo (Core Web Vitals) — monitoreo
- La auditoría no pudo medir LCP/INP/CLS reales (sin credenciales). Ejecutar `/seo google setup` (Tier 0 con una API key da PageSpeed + CrUX) y luego `/seo google` para CWV de campo. Establecer baseline con `/seo drift baseline https://www.psicologakarentrujillo.com.mx` para detectar regresiones entre despliegues.

---

## Orden de ejecución sugerido

1. **Confirmar los 4 bloqueadores 🔒 con el dueño.**
2. **Fase 1** quick-wins de código sin bloqueador: **T-01**, luego T-06/T-07/T-08 (Fase 2) si se quiere avanzar rápido.
3. **Fase 1 bloqueados:** T-03, T-04 (tras confirmar), T-02 (cuando haya imágenes).
4. **Fase 2:** T-05, T-09.
5. **Fase 3:** T-10, T-11, (T-12 operativo).
6. **Fase 4:** T-13, T-14, T-15, (T-16), T-17 monitoreo.

Commitea cada tarea por separado (commits atómicos). Al cerrar bloques, valida el schema con la skill `/seo schema https://www.psicologakarentrujillo.com.mx` y re-corre `/seo audit` para confirmar la mejora del Health Score (78 → objetivo 90+).

## Definition of Done (global)
- `npx tsc --noEmit` y `npm run build` verdes (incluir `tsconfig.tsbuildinfo` en el commit).
- 0 `placehold.co` en `src/`.
- Coordenadas, horario, dirección y nombre **únicos** y centralizados en `site.ts`.
- `curl` de la home muestra `<title>` no vacío; `/precios` enlazada; `og:image` en todas las rutas.
- `grep` de `HowTo` vacío; `prefers-reduced-motion` cubierto en todos los componentes con Framer Motion.

## Herramientas disponibles en el repo
Las skills `/seo*` de `claude-seo` están vendorizadas en `.claude/skills/`. Útiles aquí: `/seo schema`, `/seo local`, `/seo content`, `/seo technical`, `/seo google` (tras setup), `/seo drift`. Scripts Python opcionales: `pip install -r .claude/skills/seo/requirements.txt` (Python 3.10+).
