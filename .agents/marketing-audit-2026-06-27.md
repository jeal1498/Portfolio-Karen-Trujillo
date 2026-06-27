# Auditoría de Marketing — Karen Trujillo Neuropsicóloga
> Fecha: 2026-06-27  
> Analista: Claude Sonnet 4.6  
> Método: Análisis de archivos fuente (sitio live devuelve 403 Cloudflare — ver CLAUDE.md Lección 5)  
> Alcance: 21 URLs en sitemap.xml, 11 artículos de blog, componentes CRO, configuración técnica SEO

---

## ENTREGABLE 1 — Lista SEO Priorizada (P0 / P1 / P2)

### P0 — Crítico: corregir antes de cualquier campaña

**P0-01: Inconsistencia de precio TEA en precios.tsx**
- **Problema:** `src/pages/precios.tsx` muestra el diagnóstico TEA en $8,300 MXN. Todas las demás fuentes (evaluacion-autismo-cancun.tsx, llms.txt, que-es-ados-2 FAQ, neuropsicologia-zona-hotelera-cancun.tsx) dicen $8,500 MXN.
- **Riesgo:** Un usuario que llega a /precios tras leer la página de autismo ve un precio diferente. Destruye confianza en el momento de conversión. También contamina el JSON-LD Article del blog con precio erróneo.
- **Acción:** En `src/pages/precios.tsx`, cambiar el precio de TEA de `$8,300` a `$8,500 MXN`. Verificar también que el JSON-LD de esa página (si tiene Offer) use el precio correcto.

**P0-02: Instrumentos TDAH adultos — contradicción interna**
- **Problema:** `src/pages/evaluacion-tdah-adultos.tsx`, en el array `proceso` (sección visual del proceso), lista: DIVA 2.0, Conners Adultos, Cribado TDAH, IDARE, Inventario Depresión, 16 Factores. Sin embargo, el FAQ de la misma página (pregunta sobre qué pruebas se usan) menciona CAARS-2, WAIS-IV, BRIEF-2A, CPT-3. CLAUDE.md y la homepage listan CAARS-2 como instrumento canónico para adultos.
- **Riesgo:** Un lector perspicaz detecta la inconsistencia y duda de la credibilidad. Los crawlers de AI leen ambas listas y no saben cuál creer (daña GEO).
- **Acción:** Alinear el array `proceso` en evaluacion-tdah-adultos.tsx con los instrumentos canónicos: CAARS-2, WAIS-IV, BRIEF-2A, CPT-3. Revisar si DIVA 2.0 se sigue usando (es un instrumento legítimo de entrevista TDAH adulto) y, si se mantiene, integrar ambos conjuntos con roles diferenciados ("entrevista diagnóstica: DIVA 2.0 + pruebas cognitivas: CAARS-2, WAIS-IV, BRIEF-2A, CPT-3").

**P0-03: JSON-LD `injectSchema()` en homepage e índice de blog — invisible para crawlers**
- **Problema:** `src/pages/index.tsx` usa `injectSchema()` de `lib/seo.ts` para añadir el schema @graph completo. Esta función opera via `document.createElement('script')` en `useEffect` (cliente). Google Bot puede ejecutar JS pero el tiempo de procesamiento es mayor; los crawlers de AI (GPTBot, ClaudeBot) con frecuencia no ejecutan JS y jamás ven el schema.
- **Riesgo:** El schema más importante del sitio (MedicalBusiness, AggregateRating con 47 reseñas, FAQPage) puede ser invisible para todos los crawlers que no ejecutan JS.
- **Acción:** Migrar el schema de `index.tsx` a `dangerouslySetInnerHTML` en `<Head>` (patrón ya usado en neuropsicologia-cancun.tsx, evaluacion-tdah-ninos.tsx, etc.). Cambiar la llamada a `injectSchema()` por:
  ```tsx
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
  />
  ```
  Mismo cambio para `src/pages/blog/index.tsx` si usa `injectSchema()`.

**P0-04: Título de homepage demasiado largo (68 caracteres)**
- **Problema:** `"Neuropsicóloga en Cancún — TDAH y Autismo | Karen Trujillo · Cédula 11009616"` — 68 caracteres. Google trunca alrededor de 60 caracteres en móvil. La cédula aparece cortada o se pierde.
- **Acción (opción A — 57 chars):** `"Neuropsicóloga en Cancún — TDAH y Autismo | Karen Trujillo"`  
  **Opción B — 59 chars con cédula:** `"Neuropsicóloga Cancún — TDAH y Autismo · Cédula 11009616"` — mantiene diferenciador de credibilidad.  
  Recomendación: Opción B si la cédula es el diferenciador principal; Opción A si el nombre es el brand anchor.

---

### P1 — Importante: implementar en el próximo sprint

**P1-01: og:image en páginas de servicio y homepage — formato incorrecto para redes sociales**
- **Problema:** Homepage, `/evaluacion-tdah-ninos`, `/evaluacion-tdah-adultos`, `/evaluacion-autismo-cancun`, `/neuropsicologia-cancun`, `/neuropsicologia-zona-hotelera-cancun`, `/para-escuelas`, `/precios` usan `KAREN_IMAGE` como og:image. Esa imagen es un retrato de 465×533 px. Las plataformas sociales (Facebook, LinkedIn, WhatsApp preview) esperan 1200×630 px en formato landscape. El retrato aparece recortado o con bandas negras.
- **Acción:** Crear una imagen OG landscape de 1200×630 px para cada servicio (o una genérica de marca). Hasta que existan las imágenes, al menos actualizar las dimensiones declaradas en `<meta property="og:image:width">` y `og:image:height` con los valores reales (465 y 533, no 1200 y 630 que es lo que se declara actualmente en algunas páginas).
- **Prioridad dentro de P1:** Homepage primero (más compartida), luego evaluacion-autismo (TEA tiene alto share por familias).

**P1-02: Article schema `image` en artículos de blog sigue apuntando a KAREN_IMAGE**
- **Problema:** El JSON-LD `Article` en varios artículos de blog incluye `image: KAREN_IMAGE`. Las metaetiquetas `<meta property="og:image">` ya fueron corregidas y apuntan al hero SVG 1200×675 de cada artículo (confirmado en código). Pero el campo `image` dentro del objeto Article en el schema JSON-LD todavía usa `KAREN_IMAGE` (portrait 465×533).
- **Riesgo:** Google Rich Results usa el campo `image` del Article schema para el thumbnail en Discover y en resultados de búsqueda de artículos. Una imagen portrait no califica para many rich result features.
- **Acción:** Ver Entregable 2 — JSON-LD corregido para los 11 artículos.

**P1-03: Página `valoracion-chetumal` en sitemap pero sin enlace interno rastreable**
- **Problema:** `public/sitemap.xml` incluye la URL `/valoracion-chetumal`. No aparece en el menú de navegación (Navbar.tsx) ni en las routing cards del homepage. Es una página potencialmente huérfana.
- **Riesgo:** Sin enlaces entrantes internos, Google no la indexará bien aunque esté en el sitemap. Además, si la página existe y tiene contenido local de Chetumal, es oportunidad perdida de tráfico local.
- **Acción:** (a) Verificar si la página tiene contenido real o es un stub. (b) Si tiene contenido, agregar un enlace desde `/neuropsicologia-zona-hotelera-cancun` o desde una nueva sección de "ciudades que atendemos". (c) Si es stub vacío, eliminar del sitemap hasta que esté lista.

**P1-04: Speakable schema en neuropsicologia-cancun.tsx usa CSS selectors que pueden no existir**
- **Problema:** El schema en neuropsicologia-cancun.tsx incluye `speakable: { '@type': 'SpeakableSpecification', cssSelector: ['#que-es-neuropsicologia', '#diferenciadores', '#karen-perfil', '#preguntas-frecuentes'] }`. Si alguno de esos IDs no existe en el HTML renderizado, Google ignora el speakable spec completo.
- **Acción:** Verificar que cada ID listado existe como atributo `id` en el JSX de la página. Si alguno falta, agregarlo o removerlo del array.

**P1-05: AggregateRating — 47 reseñas deben ser verificables**
- **Problema:** El schema del homepage y de las páginas de servicio declara `reviewCount: '47'` y `ratingValue: '5.0'`. Si Google verifica y el perfil de Google Maps muestra un número diferente, puede penalizar el schema.
- **Acción:** Verificar mensualmente que `REVIEWS.reviewCount` en `lib/site.ts` coincida con el conteo real en Google Business Profile. Actualizar cuando cambien.

**P1-06: `dateModified` en Article schema desactualizado**
- **Problema:** Varios artículos tienen `dateModified` igual a `datePublished` (ej. que-es-ados-2: ambos '2025-06-29'). Si el contenido fue actualizado (se sabe que los artículos fueron tocados en junio 2026 por el batch de imágenes), el `dateModified` debería reflejar la última modificación real.
- **Acción:** Actualizar `dateModified` a '2026-06-17' (fecha del sitemap lastmod) para artículos que recibieron el batch de imágenes hero. Mantener `datePublished` original.

**P1-07: Falta `sameAs` de ORCID o perfiles académicos en Physician schema**
- **Problema:** El Physician schema de Karen incluye `sameAs: SOCIAL_PROFILES` (Instagram, Facebook, TikTok). Para autoridad E-E-A-T médica, Google valora también: Doctoralia, PsychologyToday, LinkedIn profesional, colegio de psicólogos.
- **Acción:** En `lib/contact.ts`, las entradas de Doctoralia y PsychologyToday están comentadas. Si Karen tiene perfiles activos en esas plataformas, descomentar y añadir al `SOCIAL_PROFILES` array para que el Physician schema los recoja automáticamente.

---

### P2 — Mejoras de mediano plazo

**P2-01: Heading H1 de homepage no incluye keywords TDAH/Autismo**
- **Problema:** H1 visible es `"Neuropsicóloga en Cancún"`. Las keywords más valiosas (TDAH, Autismo) aparecen solo en el subtítulo y en la meta title.
- **Acción:** Modificar H1 a algo como `"Neuropsicóloga en Cancún · TDAH y Autismo"` o añadir un subtítulo H2 visible que incluya ambas keywords. Verificar contraste y diseño antes de implementar.

**P2-02: Blog index sin schema JSON-LD optimizado**
- **Problema:** `src/pages/blog/index.tsx` — no se leyó completo, pero dado el patrón del sitio probablemente usa `injectSchema()` (cliente). El índice del blog es la segunda URL más importante para autoridad de contenido.
- **Acción:** Revisar y migrar a `<script dangerouslySetInnerHTML>` con CollectionPage schema.

**P2-03: FloatingButtons sin soporte `prefers-reduced-motion`**
- **Problema:** El componente `FloatingButtons.tsx` usa `motion.div` de Framer Motion con `animate={{ opacity: 1, y: 0 }}` y `initial={{ opacity: 0, y: 50 }}` sin condición `useReducedMotion()`. Esto viola WCAG 2.1 criterio 2.3.3 (Animation from Interactions).
- **Acción:**
  ```tsx
  import { useReducedMotion } from 'framer-motion';
  const shouldReduce = useReducedMotion();
  // En motion.div:
  animate={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
  initial={shouldReduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
  ```

**P2-04: Canonical de neuropsicologia-zona-hotelera-cancun — verificar vs. neuropsicologia-cancun**
- **Problema:** Dos páginas SEO locales con contenido superpuesto pueden generar señal de contenido duplicado. La zona hotelera es un barrio de Cancún, no otra ciudad.
- **Acción:** Revisar el contenido de ambas páginas para asegurar diferenciación suficiente. Añadir enlace interno explícito de la página zona hotelera → página principal de Cancún para establecer jerarquía.

**P2-05: Falta `priceRange` en MedicalBusiness/MedicalClinic schema del homepage**
- **Problema:** El schema @graph del homepage tiene el tipo MedicalBusiness pero no incluye el campo `priceRange`. Google usa este campo para mostrar rango de precios en Knowledge Panel.
- **Acción:** Añadir `priceRange: "$$$"` (convención de 1-4 signos para indicar precio) o mejor `"$8,300–$8,500 MXN"` al objeto MedicalBusiness/MedicalClinic en el schema del homepage.

**P2-06: Artículos de blog sin internal linking estructurado**
- **Problema:** Los artículos de blog tienen `relatedResources` con 2-3 artículos relacionados, pero no hay estructura de internal linking hacia las páginas de conversión (evaluacion-tdah-ninos, evaluacion-autismo-cancun).
- **Acción:** Cada artículo debe tener al menos 1 enlace contextual (en el cuerpo del texto, no solo en las tarjetas de recursos relacionados) hacia la página de servicio relevante. Ejemplo: en "señales de TDAH en niños" → enlace contextual a "/evaluacion-tdah-ninos".

**P2-07: `valoracion-chetumal` — si contiene contenido local, optimizar para búsquedas de Chetumal**
- Ver P1-03. Si la página existe con contenido, añadir schema LocalBusiness con `addressLocality: 'Chetumal'` y copy orientado a familias que viajan desde Chetumal a Cancún.

---

## ENTREGABLE 2 — JSON-LD Corregido para los 11 Artículos de Blog

El único campo que debe corregirse en el JSON-LD `Article` de todos los artículos de blog es el campo `image`. Actualmente usa `KAREN_IMAGE` (portrait 465×533). Debe apuntar al hero SVG de cada artículo.

**Patrón de corrección (aplicar en los 11 archivos):**

En cada archivo de blog, dentro del objeto `Article` del schema:
```typescript
// ANTES (incorrecto):
image: KAREN_IMAGE,

// DESPUÉS (correcto):
image: `${SITE_URL}/blog/<NOMBRE-DEL-HERO>.svg`,
```

**Mapa de correcciones por archivo:**

| Archivo | Imagen actual (incorrecta) | Imagen correcta |
|---------|---------------------------|-----------------|
| `cuanto-cuesta-valoracion-tdah-cancun.tsx` | `KAREN_IMAGE` | `${SITE_URL}/blog/dark-costo-de-la-valoracion-de-tdah-1200x675.svg` |
| `tdah-en-ninas-sintomas.tsx` | `KAREN_IMAGE` | `${SITE_URL}/blog/dark-tdah-en-ninas-1200x675.svg` |
| `senales-tdah-ninos.tsx` | `KAREN_IMAGE` | `${SITE_URL}/blog/dark-senales-de-tdah-en-ninos-1200x675.svg` |
| `tdah-adultos-diagnostico-tardio.tsx` | `KAREN_IMAGE` | `${SITE_URL}/blog/dark-tdah-en-adultos-1200x675.svg` |
| `que-es-ados-2-autismo.tsx` | `KAREN_IMAGE` | `${SITE_URL}/blog/dark-que-es-el-ados-2-1200x675.svg` |
| `autismo-nivel-1-sintomas-adultos.tsx` | `KAREN_IMAGE` | `${SITE_URL}/blog/dark-autismo-nivel-1-en-adultos-1200x675.svg` |
| `cuanto-cuesta-evaluacion-autismo-mexico.tsx` | `KAREN_IMAGE` | `${SITE_URL}/blog/dark-costo-evaluacion-de-autismo-1200x675.svg` |
| `tdah-inatento-sintomas.tsx` | `KAREN_IMAGE` | `${SITE_URL}/blog/dark-tdah-inatento-1200x675.svg` |
| `tdah-vs-ansiedad-diferencias.tsx` | `KAREN_IMAGE` | `${SITE_URL}/blog/dark-tdah-o-ansiedad-1200x675.svg` |
| `burnout-o-tdah-diferencias.tsx` | `KAREN_IMAGE` | `${SITE_URL}/blog/dark-burnout-vs-tdah-1200x675.svg` |
| `donde-evaluar-tdah-cancun.tsx` | `KAREN_IMAGE` | `${SITE_URL}/blog/dark-donde-evaluar-tdah-en-cancun-1200x675.svg` |

**Instrucciones de implementación por archivo:**

En cada `.tsx` de blog, localizar el bloque schema y reemplazar:
```typescript
// En el objeto Article dentro de @graph:
image: KAREN_IMAGE,
// Por:
image: `${SITE_URL}/blog/dark-[nombre-archivo]-1200x675.svg`,
```

También actualizar `dateModified` para los artículos con fecha de publicación 2025:
```typescript
// cuanto-cuesta-valoracion-tdah-cancun.tsx
dateModified: '2026-06-17',  // era '2026-06-02' ✓ ya correcto

// tdah-en-ninas-sintomas.tsx
dateModified: '2026-06-17',  // si fue tocado en el batch de imágenes

// senales-tdah-ninos.tsx
dateModified: '2026-06-17',

// tdah-adultos-diagnostico-tardio.tsx
dateModified: '2026-06-17',

// que-es-ados-2-autismo.tsx
dateModified: '2026-06-17',  // era igual a datePublished '2025-06-29' — inconsistente
```

**Schema Article completo de referencia (cuanto-cuesta-valoracion-tdah-cancun.tsx):**
```typescript
{
  '@type': ['Article', 'BlogPosting'],
  '@id': `${CANONICAL_URL}/#article`,
  headline: '¿Cuánto cuesta una valoración de TDAH en Cancún?',
  description: `La valoración neuropsicológica de TDAH en Cancún cuesta $8,300 MXN. Incluye 4-5 sesiones, instrumentos estandarizados e informe con cédula federal ${CEDULA} válido ante SEP e IMSS.`,
  // CAMBIO AQUÍ:
  image: `${SITE_URL}/blog/dark-costo-de-la-valoracion-de-tdah-1200x675.svg`,
  datePublished: '2025-06-01',
  dateModified: '2026-06-17',  // actualizado
  // ... resto igual
}
```

---

## ENTREGABLE 3 — Recomendaciones CRO (con referencia componente:línea)

### CRO-01: Agregar tiempo estimado de respuesta en CTA WhatsApp — ALTO IMPACTO

**Problema:** Los CTAs de WhatsApp en todas las páginas ("Agendar por WhatsApp", "WhatsApp") no dan señal de cuánto tarda Karen en responder. La incertidumbre post-clic reduce el ratio de conversión: el usuario envía el mensaje y no sabe si recibirá respuesta en 5 minutos o en 3 días.

**Implementación:**
- Archivo: `src/pages/index.tsx`, líneas ~461-465 (CTA hero)
- Cambio: Agregar micro-copy bajo el botón:
  ```tsx
  <a href={waUrl(...)}>Agendar por WhatsApp</a>
  <p className="text-xs text-muted-foreground mt-1">
    Respuesta habitual en menos de 2 horas · Lun–Sáb
  </p>
  ```
- Aplicar también en: `src/components/FloatingButtons.tsx` (tooltip al hover), secciones CTA-final de páginas de servicio.

### CRO-02: Symptom Checker sin CTA post-resultado — ALTO IMPACTO

**Problema:** El `SymptomChecker.tsx` concluye el cuestionario y muestra un resultado (alta/baja probabilidad de TDAH) pero no tiene un CTA inline inmediato después del resultado. El usuario llega al peak de motivación —acaba de ver "perfil compatible con TDAH"— y tiene que hacer scroll para encontrar el botón de contacto.

**Implementación:**
- Archivo: `src/components/SymptomChecker.tsx`
- Localizar el bloque de resultado final (probable en la sección condicional `{submitted && ...}`)
- Añadir inmediatamente después del texto de resultado:
  ```tsx
  <a
    href={waUrl('Hola Karen, acabo de completar el cuestionario y me gustaría saber más sobre la evaluación')}
    className="mt-4 inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-bold"
  >
    <MessageCircle className="w-5 h-5" />
    Hablar con Karen sobre los resultados
  </a>
  ```

### CRO-03: FloatingButtons solo en mobile — considerar versión desktop más sutil

**Problema:** `src/components/FloatingButtons.tsx`, línea 8: `className="fixed bottom-6 left-4 right-4 z-[100] flex gap-3 lg:hidden"`. En desktop el usuario no tiene CTA fijo visible (excepto Navbar y secciones de contacto). En páginas largas (blog, preguntas frecuentes), el usuario puede perder de vista el punto de contacto.

**Implementación para desktop:**
- Agregar en desktop (solo) un botón de WhatsApp flotante en la esquina inferior derecha:
  ```tsx
  <a
    href={waUrl(...)}
    className="hidden lg:flex fixed bottom-8 right-8 z-[100] w-14 h-14 bg-whatsapp rounded-full items-center justify-center shadow-xl hover:scale-110 transition-transform"
    aria-label="Contactar por WhatsApp"
  >
    <MessageCircle className="w-7 h-7 text-white" />
  </a>
  ```
- Este elemento NO necesita el texto "WhatsApp" — el ícono es suficientemente reconocible.

### CRO-04: `/para-escuelas` carece de FloatingButtons y sticky CTA — MEDIO IMPACTO

**Problema:** La página `/para-escuelas` no importa ni renderiza `FloatingButtons`. El segmento B2B (orientadores, directivos) también usa WhatsApp en México para contacto profesional. No hay CTA fijo en pantalla.

**Implementación:**
- Archivo: `src/pages/para-escuelas.tsx`
- Líneas de imports (aprox. líneas 1-13): añadir `import FloatingButtons from '@/components/FloatingButtons';`
- Antes del cierre del JSX principal, añadir `<FloatingButtons />`.

### CRO-05: Routing cards del hero deberían incluir precio como ancla de decisión

**Problema:** Las 3 routing cards en el hero de homepage (líneas ~436-453 de `src/pages/index.tsx`) muestran el nombre del servicio y la edad objetivo, pero no el precio. En Google, los snippets de precios aumentan CTR entre un 15–25%. En el sitio, mostrar el precio en el punto de selección reduce el abandono posterior cuando el usuario llega a la página de servicio y ve el precio por primera vez.

**Implementación:**
- En cada routing card, añadir una línea de precio debajo de la edad:
  ```tsx
  <span className="text-xs text-muted-foreground mt-1 block">Desde $8,300 MXN</span>
  ```
- Esto aplica específicamente a las cards de TDAH niños ($8,300), TDAH adultos ($8,300) y TEA ($8,500).

### CRO-06: Trust badge de reseñas debería ser clickeable hacia Google Maps

**Problema:** Los 47 reseñas / 5.0 estrellas aparecen como elementos de prueba social pero no son enlaces hacia la fuente (Google Maps). El usuario no puede verificar la afirmación en un clic — reduce la credibilidad percibida vs. si el número fuera verificable al instante.

**Implementación:**
- Localizar el bloque de stars/reviews en index.tsx (probable en sección AboutSection o CTA-final)
- Envolver en `<a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer">` donde `GOOGLE_MAPS_URL` se extrae del `DIRECTORY_PROFILES` en `lib/contact.ts`

### CRO-07: "Costo de no actuar" callouts — agregar timeframe específico

**Problema:** La frase `"Cada semestre sin diagnóstico es un semestre de frustración"` en evaluacion-tdah-ninos.tsx (líneas 724-732) es poderosa pero abstracta. El riesgo de no actuar gana fuerza cuando incluye un timeframe concreto.

**Implementación (copy sugerido):**
```
Cada año sin diagnóstico es un año de trabajo escolar más difícil, 
más tensión familiar, más estrategias de compensación que desgastan. 
La evaluación tarda 3-4 semanas. La claridad dura toda la vida.
```

---

## ENTREGABLE 4 — Copy Mejorado para 3 Páginas Prioritarias

### Página 1: `/evaluacion-tdah-adultos` — Mejorar hero y sección de instrumentos

**Problema identificado:** El copy del hero es excelente ("No es falta de voluntad. Puede ser tu cerebro") pero la sección de instrumentos lista herramientas de la versión anterior (DIVA 2.0, Conners Adultos genérico, IDARE, 16PF) que son inconsistentes con lo prometido en el FAQ de la misma página y en el resto del sitio.

**Copy original de la intro de instrumentos (array `proceso`):**  
Lista informal con 6 instrumentos mezclados sin rol claro.

**Copy mejorado — nueva estructura de instrumentos TDAH adultos:**

```
La evaluación neuropsicológica de TDAH en adultos utiliza instrumentos internacionales 
estandarizados que miden lo que el TDAH realmente afecta: atención sostenida, memoria 
de trabajo, funciones ejecutivas e impulsividad.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ENTREVISTA DIAGNÓSTICA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DIVA 2.0 — Entrevista diagnóstica de TDAH en adultos
Única entrevista validada en español diseñada específicamente para TDAH adulto. 
Rastrea síntomas actuales e infancia. Es el punto de partida del diagnóstico diferencial.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PRUEBAS COGNITIVAS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CAARS-2 — Escalas de TDAH para Adultos (Conners)
Mide la severidad de síntomas de inatención e hiperactividad/impulsividad según la perspectiva 
del propio paciente y de un informante externo (pareja, familiar, jefe). 
Diferencia TDAH de ansiedad y depresión con alta precisión.

WAIS-IV — Escala de Inteligencia de Wechsler para Adultos
Perfil cognitivo completo: comprensión verbal, razonamiento perceptivo, memoria de trabajo 
y velocidad de procesamiento. Identifica si hay discrepancias que explican el rendimiento inconsistente.

BRIEF-2A — Inventario de Evaluación Conductual de Funciones Ejecutivas (Adultos)
Evalúa cómo se manifiesta el TDAH en la vida real: organización del tiempo, regulación 
emocional, flexibilidad cognitiva, planificación. Es el vínculo entre el diagnóstico y 
las recomendaciones concretas.

CPT-3 — Test de Ejecución Continua
Medición objetiva de la atención sostenida durante 14 minutos. Detecta inatención, 
impulsividad y variabilidad de respuesta. Los datos son independientes del autoinforme: 
el cerebro no puede "fingir" atención.
```

**Copy mejorado para el badge de urgencia (actualmente ausente en adultos):**
```
El diagnóstico tardío de TDAH en adultos tarda en promedio 10–15 años desde los 
primeros síntomas. No porque sea difícil de detectar — sino porque nadie buscó.
```

---

### Página 2: `/` (Homepage) — Mejorar H1, subtítulo y primer CTA del hero

**Copy actual:**
```
H1: Neuropsicóloga en Cancún
Subtítulo: Por fin, una respuesta clara.
CTA: Agendar por WhatsApp
```

**Problemas:**
- H1 sin keywords TDAH/Autismo
- Subtítulo genérico — no habla al pain point específico del visitante
- CTA sin reducción de fricción (no indica tiempo de respuesta ni qué va a pasar)

**Copy mejorado:**
```
H1: Neuropsicóloga en Cancún
    Especialista en TDAH y Autismo

Subtítulo: Llegan con años de incertidumbre. 
           Se van con un diagnóstico claro, un informe válido y un plan concreto.

Micro-credencial (badge bajo H1): 
   Cédula 11009616 · 7 años de experiencia · ADOS-2, WISC-V, CONNERS-3

CTA principal:
   [Agendar por WhatsApp]
   Respuesta en menos de 2 horas · Lun–Sáb 9–19 h

CTA secundario (enlace, no botón):
   Ver precios y qué incluye →
```

**Routing cards — copy mejorado:**

```
Card 1 — TDAH en niños (5–17 años)
Actual: "Valoración TDAH Infantil"
Mejorado:
  "¿Tu hijo no puede quedarse quieto o concentrarse?"
  Valoración TDAH · 5–17 años · $8,300 MXN
  CONNERS-3, WISC-V, BRIEF-2, CPT-3
  [Ver evaluación →]

Card 2 — TDAH en adultos (18+ años)
Actual: "Valoración TDAH Adultos"
Mejorado:
  "¿Siempre fue así y nadie te lo diagnosticó?"
  Valoración TDAH · 18+ años · $8,300 MXN
  CAARS-2, WAIS-IV, BRIEF-2A, CPT-3
  [Ver evaluación →]

Card 3 — Autismo / TEA
Actual: "Evaluación Autismo / TEA"
Mejorado:
  "¿Tu hijo es diferente pero no sabes exactamente cómo?"
  Diagnóstico TEA · ADOS-2 disponible en Cancún · $8,500 MXN
  ADOS-2, ADI-R, WISC-V, Vineland-3, SRS-2
  [Ver evaluación →]
```

---

### Página 3: `/evaluacion-autismo-cancun` — Mejorar sección "¿Por qué el ADOS-2?"

**Problema:** La página explica qué es el ADOS-2 pero no usa el argumento de escasez regional de forma explícita en el copy principal. El ADOS-2 no está disponible en todas las ciudades de la Riviera Maya — ese es el argumento de conversión más fuerte para familias que llegan desde Playa del Carmen, Tulum o Mérida.

**Sección actual (parafraseo del contenido existente):**  
Lista de pruebas, descripción técnica del ADOS-2, FAQ.

**Sección mejorada — insertar bloque "¿Por qué Cancún?" antes del proceso:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
¿POR QUÉ MUCHAS FAMILIAS VIAJAN A CANCÚN PARA ESTA EVALUACIÓN?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

El ADOS-2 —el instrumento de mayor precisión diagnóstica para autismo en el mundo— 
requiere entrenamiento certificado específico y materiales propietarios de alto costo. 

No está disponible en todas las clínicas ni con todos los psicólogos. En la Riviera Maya 
y la Península de Yucatán, la oferta es muy limitada.

Karen Trujillo es una de las pocas neuropsicólogas de la región con formación específica 
en la aplicación del ADOS-2. Familias de Playa del Carmen, Tulum, Mérida y otras 
ciudades coordinan sus visitas a Cancún para acceder a esta evaluación.

El diagnóstico obtenido aquí tiene la misma validez clínica que el de cualquier 
clínica especializada de CDMX o Monterrey.

   [Consultar disponibilidad →]  |  Respuesta por WhatsApp en < 2 horas
```

**Callout mejorado de intervención temprana:**

```
Actual:
"La intervención temprana es el mayor predictor de calidad de vida en autismo."

Mejorado:
"Los estudios muestran que la intervención iniciada antes de los 5 años produce 
resultados significativamente mejores que la misma intervención comenzada a los 7. 
No porque el autismo se 'cure' — sino porque el cerebro en desarrollo responde 
diferente a los apoyos correctos.

El primer paso es saber exactamente con qué estamos trabajando."
```

---

## ENTREGABLE 5 — Calendario Editorial: 5 Artículos Nuevos

### Marco de selección de temas

Criterios usados: (1) Volumen de búsqueda estimado alto para la región, (2) Gap temático en el blog actual, (3) Alta intención de conversión (usuario cercano a contratar), (4) Potencial de ranking para búsquedas de IA/GEO.

---

### Artículo 1 — Julio 2026

**Slug propuesto:** `/blog/como-es-una-evaluacion-neuropsicologica-ninos`  
**Título SEO:** `¿Cómo es una evaluación neuropsicológica para niños? Paso a paso`  
**Meta description:** `Descubre exactamente cómo es una evaluación neuropsicológica infantil: cuántas sesiones, qué hacen en cada cita, qué sienten los niños y qué reciben los padres al final. Karen Trujillo, neuropsicóloga en Cancún.`

**Por qué es prioritario:**  
El mayor obstáculo para agendar no es el precio — es el miedo a lo desconocido. "¿Qué le van a hacer a mi hijo?" es la pregunta no respondida que más detiene conversiones. Este artículo la responde en detalle.

**Estructura recomendada:**
1. Antes de la primera cita: qué preparar, qué decirle al niño
2. Primera sesión: entrevista con padres (sin el niño)
3. Sesiones 2-4: las pruebas. Qué ve el niño, cómo se sienten (juegos, tabletas, preguntas)
4. Última sesión: devolución de resultados a padres
5. El informe: qué incluye, quién lo recibe, cómo usarlo
6. FAQ: ¿duele?, ¿es largo?, ¿puede fallar?
7. CTA: "Tienes dudas sobre el proceso → pregúntame por WhatsApp"

**Palabra clave primaria:** "cómo es una evaluación neuropsicológica niños"  
**Keywords secundarias:** "qué pasa en una evaluación psicológica infantil", "evaluación TDAH niños proceso", "cuántas sesiones evaluación psicológica"  
**Schema recomendado:** Article + FAQPage + HowTo  
**og:image:** Crear SVG hero oscuro 1200×675: "dark-proceso-evaluacion-neuropsicologica-1200x675.svg"

---

### Artículo 2 — Julio 2026

**Slug propuesto:** `/blog/tdah-ninas-diagnostico-tardio-cancun`  
**Título SEO:** `TDAH en niñas: por qué se diagnostica tarde y cómo reconocerlo`  
**Meta description:** `Las niñas con TDAH suelen pasar desapercibidas porque sus síntomas son diferentes. Aprende a reconocer el TDAH inatento en niñas y por qué el diagnóstico temprano cambia su trayectoria. Neuropsicóloga Karen Trujillo, Cancún.`

**Por qué es prioritario:**  
El blog ya tiene "TDAH en niñas síntomas" pero la URL sugiere que puede ser un artículo corto. La búsqueda "TDAH niñas" tiene alta demanda y el tema tiene potencial de viralidad en comunidades de padres (especialmente madres que se reconocen en el perfil de sus hijas). El ángulo de "diagnóstico tardío" conecta con el Segmento 2 (adultos) también.

**Estructura recomendada:**
1. Por qué las niñas con TDAH pasan desapercibidas (masking, perfeccionismo)
2. Síntomas más comunes en niñas vs. en niños — la diferencia que importa
3. El TDAH inatento: la presentación más común en niñas y la que más se confunde con ansiedad
4. Qué pasa si no se diagnostica a tiempo: adolescencia, autoestima, rendimiento
5. Cómo es la evaluación de TDAH en niñas (incluye CONNERS-3, perspectiva de maestras)
6. Señales de alerta en tu hija — lista checkeable
7. CTA directo a /evaluacion-tdah-ninos

**Palabra clave primaria:** "TDAH niñas diagnóstico"  
**Keywords secundarias:** "TDAH inatento niñas síntomas", "cómo se ve el TDAH en niñas", "evaluación TDAH niñas Cancún"  
**Schema:** Article + FAQPage  
**og:image:** Crear "dark-tdah-en-ninas-diagnostico-tardio-1200x675.svg"

---

### Artículo 3 — Agosto 2026

**Slug propuesto:** `/blog/diferencia-tdah-trastorno-aprendizaje`  
**Título SEO:** `TDAH vs. trastorno del aprendizaje: ¿cómo saber cuál es?`  
**Meta description:** `Un niño con TDAH y uno con dislexia pueden verse igual en el aula: no termina el trabajo, se distrae, rinde por debajo de su potencial. La neuropsicología los distingue con evidencia. Karen Trujillo, Cancún.`

**Por qué es prioritario:**  
Gap claro en el blog actual: no hay artículo sobre trastornos del aprendizaje. Es un tema de alto volumen de búsqueda para maestros y orientadores (segmento B2B) y también para padres. Conecta directamente con /para-escuelas como página de conversión.

**Estructura recomendada:**
1. Por qué la confusión es común (síntomas solapados en el aula)
2. TDAH: qué es y cómo se ve en el rendimiento escolar
3. Trastornos del aprendizaje (dislexia, disgrafia, discalculia): qué son y síntomas
4. TDAH + trastorno del aprendizaje juntos: más común de lo que se cree (comorbilidad ~30-40%)
5. Cómo los distingue la evaluación neuropsicológica (WISC-V, BRIEF-2, pruebas de lectura/escritura)
6. Por qué importa el diagnóstico diferencial: el tratamiento es diferente
7. CTA: /para-escuelas para derivaciones escolares, /evaluacion-tdah-ninos para padres

**Palabra clave primaria:** "diferencia TDAH trastorno aprendizaje"  
**Keywords secundarias:** "TDAH vs dislexia", "evaluación trastorno aprendizaje Cancún", "diagnóstico diferencial TDAH"  
**Schema:** Article + FAQPage  
**og:image:** Crear "dark-tdah-vs-trastorno-aprendizaje-1200x675.svg"

---

### Artículo 4 — Agosto 2026

**Slug propuesto:** `/blog/resultado-positivo-autismo-que-sigue`  
**Título SEO:** `Mi hijo tiene autismo: ¿qué sigue después del diagnóstico TEA?`  
**Meta description:** `Recibir el diagnóstico de autismo puede generar alivio y angustia al mismo tiempo. Conoce los pasos concretos que siguen: qué significa el nivel de apoyo, qué terapias existen y cómo explicárselo a tu hijo. Karen Trujillo, Cancún.`

**Por qué es prioritario:**  
Es el artículo más pedido por familias post-diagnóstico. Alta intención: el usuario ya tiene diagnóstico (posiblemente de Karen) o está a punto de recibirlo. El artículo construye la relación de largo plazo con la familia y establece a Karen como referencia continua, no solo diagnóstica. Alto potencial de referral (familias comparten con otras familias en grupos de WhatsApp).

**Estructura recomendada:**
1. Las primeras 24 horas: es normal no saber cómo sentirse
2. Entender el informe: qué significa el nivel de apoyo 1, 2, 3
3. Qué hace la terapia y cuál es la diferencia entre tipos (ABA, Denver, DIR/Floortime, social skills)
4. La escuela: cómo usar el informe para pedir adecuaciones curriculares
5. Cómo hablar con tu hijo sobre el diagnóstico (por edad)
6. Qué puede hacer la familia en casa desde hoy
7. El diagnóstico no define el futuro — lo que sí importa es el plan
8. CTA: grupos de apoyo en Cancún / siguiente consulta con Karen

**Palabra clave primaria:** "qué sigue después diagnóstico autismo"  
**Keywords secundarias:** "diagnóstico TEA niños México qué hacer", "nivel de apoyo autismo qué significa", "terapia autismo Cancún"  
**Schema:** Article + FAQPage + HowTo  
**og:image:** Crear "dark-despues-del-diagnostico-autismo-1200x675.svg"

---

### Artículo 5 — Septiembre 2026

**Slug propuesto:** `/blog/evaluacion-neuropsicologica-adultos-cancun`  
**Título SEO:** `Evaluación neuropsicológica para adultos en Cancún: qué incluye y cómo agendarla`  
**Meta description:** `Si crees que puedes tener TDAH, autismo o simplemente quieres entender mejor cómo funciona tu cerebro, una evaluación neuropsicológica para adultos te da respuestas con evidencia. Karen Trujillo, Cancún.`

**Por qué es prioritario:**  
Actualmente no hay artículo de blog orientado específicamente a adultos que buscan evaluación. El Segmento 2 (adultos 25–45 con TDAH no diagnosticado) llega en su mayoría por blog o redes sociales. Este artículo llena el gap de contenido TOFU para ese segmento.

**Estructura recomendada:**
1. ¿Para qué sirve una evaluación neuropsicológica en adultos?
2. Cuándo considerar una evaluación (señales que lo sugieren)
3. Diferencia entre evaluación de TDAH adulto y evaluación cognitiva general
4. Proceso completo: cuántas sesiones, qué hacen, cuánto tiempo
5. El informe: para qué sirve a nivel laboral, de salud, personal
6. Precios y qué incluye en Cancún
7. Preguntas frecuentes (¿hay lista de espera?, ¿se puede hacer en línea?, ¿lo cubre el seguro?)
8. CTA directo a /evaluacion-tdah-adultos

**Palabra clave primaria:** "evaluación neuropsicológica adultos Cancún"  
**Keywords secundarias:** "evaluación TDAH adultos proceso", "diagnóstico neuropsicológico adultos México", "evaluación cognitiva adultos Cancún"  
**Schema:** Article + FAQPage  
**og:image:** Crear "dark-evaluacion-neuropsicologica-adultos-1200x675.svg"

---

## Resumen Ejecutivo de Hallazgos

### Fortalezas del sitio (mantener y amplificar)

1. **Schema JSON-LD más completo de la categoría local.** MedicalBusiness + Physician + MedicalCondition + DiagnosticProcedures + Reviews + FAQPage en cada página — muy por encima del estándar.
2. **robots.txt correctamente configurado para IA.** GPTBot, ClaudeBot, PerplexityBot, Google-Extended todos permitidos. llms.txt existente.
3. **Copy de hero con alta carga emocional específica.** "No es falta de voluntad. Puede ser tu cerebro" y "Por fin, claridad sobre lo que le pasa a tu hijo" son mensajes de alta conversión.
4. **Prueba social verificable.** 47 reseñas con nombres propios y servicio específico. Pocas clínicas locales lo tienen.
5. **Precios publicados.** Reduce abandono por miedo al precio desconocido; es diferenciador de transparencia.
6. **Arquitectura de contenido blog bien fundamentada.** 11 artículos con hero images propias 1200×675, og:image correctas, FAQPage schema en cada uno.

### Top 3 riesgos activos

1. **Schema de homepage potencialmente invisible para AI crawlers** (P0-03) — el schema más valioso del sitio puede no ser indexado por GPTBot/ClaudeBot si no ejecutan JS.
2. **Inconsistencia de precio TEA** (P0-01) — cualquier usuario que compare /precios vs /evaluacion-autismo-cancun detecta la diferencia. Destruye confianza en el momento de compra.
3. **og:image incorrecta para social sharing** (P1-01) — cada vez que alguien comparte las páginas de servicio en WhatsApp/Facebook, la imagen aparece recortada o con bandas negras.

### Inversión de tiempo estimada por entregable

| Entregable | Esfuerzo estimado | Impacto |
|------------|------------------|---------|
| P0-01: Precio TEA en precios.tsx | 15 min | Alto |
| P0-02: Instrumentos adultos | 30 min | Alto |
| P0-03: Schema homepage a static | 45 min | Muy alto |
| P0-04: Título homepage | 10 min | Medio |
| P1-01: og:image landscape 1200×630 | 2–4 h (diseño) | Alto |
| Entregable 2: image en Article schema (11 archivos) | 1 h | Alto |
| Entregable 3: CRO-01 a CRO-07 | 3–5 h | Alto |
| Entregable 4: Copy 3 páginas | 2 h | Medio |
| Entregable 5: 5 artículos blog | 8–12 h (producción) | Alto (largo plazo) |

---

*Auditoría basada en análisis de archivos fuente. Las páginas analizadas: index.tsx, evaluacion-tdah-ninos.tsx, evaluacion-tdah-adultos.tsx, evaluacion-autismo-cancun.tsx, precios.tsx, neuropsicologia-cancun.tsx, neuropsicologia-zona-hotelera-cancun.tsx, para-escuelas.tsx, los 11 artículos del blog, FloatingButtons.tsx, lib/seo.ts, lib/site.ts, lib/contact.ts, public/robots.txt, public/llms.txt, public/sitemap.xml.*
