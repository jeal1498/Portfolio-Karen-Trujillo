# Plan de Acción SEO — psicologakarentrujillo.com.mx
**Fecha:** 2026-06-18 | **Score actual:** 74/100 | **Score estimado post-fix:** 86/100

---

## Fase 1 — Fixes Críticos (Esta semana, <2h total)

### 1.1 Desbloquear Google-Extended en robots.txt
**Archivo:** `public/robots.txt`
**Tiempo:** 2 min | **Impacto:** 🔴 Máximo — habilita Google AI Overviews
```
# Cambiar de:
User-agent: Google-Extended
Disallow: /

# A:
User-agent: Google-Extended
Allow: /

User-agent: GoogleOther-Extended
Allow: /
```

### 1.2 Corregir precio en Schema
**Archivos:** `src/pages/evaluacion-tdah-ninos.tsx`, `src/pages/evaluacion-tdah-adultos.tsx`, `src/pages/index.tsx`
**Tiempo:** 5 min | **Impacto:** 🔴 Elimina dato erróneo en rich results
Buscar `"price": "7000"` → reemplazar con `"price": "8300"`

### 1.3 Estandarizar anticipo entre páginas
**Archivos:** `src/pages/precios.tsx`, `src/pages/evaluacion-tdah-ninos.tsx`, `src/pages/evaluacion-tdah-adultos.tsx`, `src/pages/evaluacion-autismo-cancun.tsx`
**Tiempo:** 20 min | **Impacto:** 🔴 Elimina contradicción de precios
Texto estándar: "Anticipo de $1,000 MXN para TDAH / $1,500 MXN para TEA, parte del total de $8,300–$8,500 MXN"

### 1.4 Corregir tel: href con PHONE_E164
**Archivos:** `src/components/FloatingButtons.tsx`, `src/pages/evaluacion-tdah-ninos.tsx`, `src/pages/evaluacion-tdah-adultos.tsx`, `src/pages/evaluacion-autismo-cancun.tsx`, `src/pages/index.tsx`
**Tiempo:** 15 min | **Impacto:** 🟡 Click-to-call correcto
Reemplazar `` `tel:${PHONE_NUMBER}` `` → `` `tel:${PHONE_E164}` ``

### 1.5 Fix schema zona-hotelera
**Archivo:** `src/pages/neuropsicologia-zona-hotelera-cancun.tsx`
**Tiempo:** 10 min | **Impacto:** 🟡 Tipo de entidad correcto para local pack
- Cambiar `@type: 'LocalBusiness'` → `@type: ['MedicalBusiness', 'MedicalClinic']`
- Añadir nodo `geo` con coordenadas: `{"@type":"GeoCoordinates","latitude":21.1530418,"longitude":-86.8958544}`
- Añadir `"hasMap": "https://maps.google.com/?cid=4630406520710891531"`

### 1.6 Corregir bugs de sintaxis en rutas de imagen
**Archivos:** `src/pages/blog/senales-tdah-ninos.tsx` (línea 134), `src/pages/blog/tdah-adultos-diagnostico-tardio.tsx` (línea 172), `src/pages/blog/cuanto-cuesta-valoracion-tdah-cancun.tsx` (línea 391)
**Tiempo:** 5 min | **Impacto:** 🟡 Imágenes de "Recursos relacionados" cargando
Buscar `'.svg)'` → reemplazar con `'.svg'` (remover `)` extra)

---

## Fase 2 — Alto Impacto (Semanas 2–3)

### 2.1 og:image de artículos del blog
**Archivos:** los 11 `src/pages/blog/*.tsx`
**Tiempo:** 30 min | **Impacto:** 🔴 Social previews correctos en Facebook/WhatsApp/Twitter
Apuntar `og:image` de cada artículo a su SVG hero existente:
```
/blog/senales-tdah-ninos → /blog/dark-senales-de-tdah-en-ninos-1200x675.svg
/blog/cuanto-cuesta-valoracion-tdah-cancun → /blog/dark-costo-de-la-valoracion-de-tdah-1200x675.svg
/blog/tdah-adultos-diagnostico-tardio → /blog/dark-tdah-en-adultos-1200x675.svg
/blog/tdah-en-ninas-sintomas → /blog/dark-tdah-en-ninas-1200x675.svg
/blog/que-es-ados-2-autismo → /blog/dark-que-es-el-ados-2-1200x675.svg
/blog/cuanto-cuesta-evaluacion-autismo-mexico → /blog/dark-costo-evaluacion-de-autismo-1200x675.svg
/blog/autismo-nivel-1-sintomas-adultos → /blog/dark-autismo-nivel-1-en-adultos-1200x675.svg
/blog/tdah-inatento-sintomas → /blog/dark-tdah-inatento-1200x675.svg
/blog/tdah-vs-ansiedad-diferencias → /blog/dark-tdah-o-ansiedad-1200x675.svg
/blog/burnout-o-tdah-diferencias → /blog/dark-burnout-vs-tdah-1200x675.svg
/blog/donde-evaluar-tdah-cancun → /blog/dark-donde-evaluar-tdah-en-cancun-1200x675.svg
```
También actualizar `image` en JSON-LD de cada artículo a `{"@type":"ImageObject","url":"...","width":1200,"height":675}`.

### 2.2 og:image de páginas principales (requiere imágenes nuevas)
**Pendiente de:** generar 9 imágenes 1200×630 con Gemini (prompts disponibles en el plan de imágenes)
**Archivos:** `src/pages/index.tsx`, `evaluacion-tdah-ninos.tsx`, `evaluacion-tdah-adultos.tsx`, `evaluacion-autismo-cancun.tsx`, `neuropsicologia-cancun.tsx`, `neuropsicologia-zona-hotelera-cancun.tsx`, `para-escuelas.tsx`, `precios.tsx`, `blog/index.tsx`

### 2.3 Hub-and-spoke: enlazar pillar → blog
**Archivos:** `src/pages/evaluacion-tdah-ninos.tsx`, `evaluacion-tdah-adultos.tsx`, `evaluacion-autismo-cancun.tsx`
**Tiempo:** 60 min | **Impacto:** 🔴 Completa el circuito de PageRank
Añadir sección "Artículos relacionados" antes del widget de cita:
- `/evaluacion-tdah-ninos` → senales-tdah-ninos, tdah-en-ninas-sintomas, tdah-inatento-sintomas, cuanto-cuesta-valoracion-tdah-cancun
- `/evaluacion-tdah-adultos` → tdah-adultos-diagnostico-tardio, tdah-vs-ansiedad-diferencias, burnout-o-tdah-diferencias, cuanto-cuesta-valoracion-tdah-cancun
- `/evaluacion-autismo-cancun` → que-es-ados-2-autismo, autismo-nivel-1-sintomas-adultos, cuanto-cuesta-evaluacion-autismo-mexico

### 2.4 Añadir byline visible en artículos del blog
**Archivo:** `src/components/BlogLayout.tsx` (o equivalente)
**Tiempo:** 20 min | **Impacto:** 🟡 E-E-A-T / YMYL compliance
```html
<p>Por <strong>Karen Trujillo</strong>, Neuropsicóloga · Cédula 11009616
<time dateTime="YYYY-MM-DD">18 de junio de 2026</time></p>
```

### 2.5 Añadir Google Maps a páginas de neuropsicología
**Archivos:** `src/pages/neuropsicologia-cancun.tsx`, `neuropsicologia-zona-hotelera-cancun.tsx`
**Tiempo:** 15 min | **Impacto:** 🟡 Señal geográfica en páginas de ranking local
Copiar el iframe embed de `src/components/LocationSection.tsx`

### 2.6 Acortar títulos de artículos del blog
**Archivos:** los 11 `src/pages/blog/*.tsx`
**Tiempo:** 30 min | **Impacto:** 🟡 Brand recognition en SERP
Priorizar los dos más largos primero:
- `tdah-adultos-diagnostico-tardio`: reducir de 102 a <60 chars
- `que-es-ados-2-autismo`: reducir de 92 a <60 chars
Regla: `[Keyword principal] | Karen Trujillo Neuropsicóloga`

### 2.7 Enlace desde que-es-ados-2 a sus pares TEA
**Archivo:** `src/pages/blog/que-es-ados-2-autismo.tsx`
**Tiempo:** 10 min | **Impacto:** 🟡 Distribuye autoridad dentro del cluster TEA
Añadir en relatedResources: `autismo-nivel-1-sintomas-adultos` y `cuanto-cuesta-evaluacion-autismo-mexico`

---

## Fase 3 — Contenido y Autoridad (Mes 2)

### 3.1 Crear perfiles en directorios médicos
**Plataformas:** Doctoralia MX, Psychology Today MX, Top Doctors MX
**Tiempo:** 2h c/u | **Impacto:** 🟡 Corroboration para AI + autoridad de citas
Tras crear, añadir URL a `DIRECTORY_PROFILES` en `src/lib/contact.ts` — se propagará a todos los `sameAs` del schema automáticamente.

### 3.2 Reclamar Bing Places y Apple Business Connect
**Tiempo:** 30 min c/u | **Impacto:** 🟡 ChatGPT local + iPhone Maps (27% de browser share)

### 3.3 Añadir SpeakableSpecification a artículos del blog
**Tiempo:** 45 min | **Impacto:** 🟡 AI Overview citability en artículos

### 3.4 Añadir Service schema a páginas de servicio
**Tiempo:** 30 min | **Impacto:** 🟢 Feature "Servicios" en SERP local

### 3.5 Actualizar lastmod en sitemap.xml con fechas reales
**Tiempo:** 30 min | **Impacto:** 🟡 Google prioriza crawl correctamente
```bash
# Obtener fecha real de cada página:
git log --follow -1 --format="%ad" --date=short -- src/pages/FILENAME.tsx
```

### 3.6 Añadir image sitemap
**Tiempo:** 45 min | **Impacto:** 🟡 Indexación de 57 assets en Google Image Search
Añadir `xmlns:image` al sitemap y bloques `<image:image>` por página.

### 3.7 Añadir Privacy Policy
**Tiempo:** 2h | **Impacto:** 🟡 Compliance YMYL + confianza
Requerido: captura de datos via WhatsApp, consentimiento para agendar citas.

### 3.8 Crear canal YouTube
**Tiempo:** Ongoing | **Impacto:** 🟡 Correlación 0.737 con citabilidad en ChatGPT
5–10 videos cortos educativos sobre TDAH/autismo en español.

---

## Fase 4 — Monitoreo y Contenido Nuevo (Continuo)

### 4.1 Nuevos artículos por prioridad
1. "Neuropsicólogo vs psicólogo vs psiquiatra: diferencias para diagnóstico TDAH" (cross-cluster)
2. "Señales de autismo en niños pequeños (2–5 años)" (cluster TEA)
3. "TDAH adultos en mujeres: síntomas que se confunden con ansiedad" (cluster adultos)
4. "Cómo hablarle a la escuela sobre el TDAH de tu hijo" (cluster infantil)
5. "TDAH adulto y trabajo: estrategias de productividad" (cluster adultos)

### 4.2 Conectar Google Search Console
- Verificar dominio → habilitar datos CrUX reales
- Monitorear Core Web Vitals (INP es el más crítico en Next.js 14)
- Revisar cobertura de índice semanalmente

### 4.3 Verificar GBP
- Categoría principal: debe ser "Neuropsicólogo" (no "Psicólogo")
- Publicar posts en GBP semanalmente
- Activar alertas de reseña para responder en < 24h

---

## Resumen de esfuerzo estimado

| Fase | Esfuerzo | Score esperado |
|------|---------|----------------|
| Fase 1 (fixes críticos) | 1–2h dev | 74 → 80 |
| Fase 2 (alto impacto) | 4–6h dev | 80 → 84 |
| Fase 3 (autoridad) | 10h dev + 10h Karen | 84 → 87 |
| Fase 4 (ongoing) | Continuo | 87 → 90+ |
