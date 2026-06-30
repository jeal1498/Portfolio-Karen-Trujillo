# Plan de Acción CRO — Karen Trujillo Neuropsicóloga
**Fecha:** 2026-06-30 | **Rama de trabajo:** `claude/pagespeed-analysis-review-fojnic`

---

## Criterios de ordenamiento

Cada cambio se evalúa en dos ejes:

- **Impacto CRO** — cuánto mueve la aguja de conversiones (visitante → consulta agendada)
- **Esfuerzo** — tiempo de implementación estimado

El orden sigue la lógica **máximo impacto con mínimo esfuerzo primero**.

---

## Bloque A — Cambios de texto y estilos (< 30 min total)

*Sin riesgo de regresión. Se pueden hacer en un solo commit.*

### A1 · Footer: contraste de títulos de columna
**Archivo:** `src/components/Footer.tsx` — línea 34
**Cambio:** `text-[#c6bce2]/50` → `text-[#c6bce2]/75` en `FooterCol`
**Por qué:** WCAG AA. Costo cero, cumplimiento inmediato.

---

### A2 · Hero: eliminar botón "Ver servicios" redundante
**Archivo:** `src/pages/index.tsx` — sección Hero
**Cambio:** Eliminar el CTA secundario o convertirlo en un scroll anchor sutil (`↓ Ver cómo funciona`). El CTA principal de WhatsApp no debe competir con otro botón en la primera pantalla.
**Por qué:** La parálisis de decisión en el hero es el primer punto de fuga. Un solo CTA visible aumenta la tasa de clic.

---

### A3 · Footer: agregar micro-CTA de conversión
**Archivo:** `src/components/Footer.tsx` — antes del bloque `© 2025`
**Cambio:** Agregar bloque simple:
```tsx
<div className="py-4 text-center border-t border-white/10">
  <p className="font-sans text-sm text-white/70 mb-2">¿Lista para dar el primer paso?</p>
  <a href={waUrl('Hola Karen, quiero agendar una valoración neuropsicológica.')}
     target="_blank" rel="noopener noreferrer"
     className="font-sans text-sm font-bold text-[#25d366]">
    Agendar por WhatsApp →
  </a>
</div>
```
**Por qué:** El visitante que llega al footer leyó todo el sitio. Es el segmento con mayor intención de conversión y actualmente no tiene CTA en ese punto.

---

## Bloque B — Lógica de componente (1–2 horas)

*Cambios de comportamiento que requieren modificar lógica React.*

### B1 · SymptomChecker: WA message personalizado + conteo de síntomas
**Archivo:** `src/components/SymptomCheckerHome.tsx`
**Temperatura objetivo:** Tibio → Caliente
**Cambio:**
- El CTA de WhatsApp usa `currentTab.waMsg` solo cuando `showCta === true`. Conectarlo siempre.
- Incluir el conteo de síntomas seleccionados en el mensaje, incluso con 1–2 seleccionados.
- Ejemplo de mensaje dinámico:
  ```
  "Hola Karen, identifiqué 2 señales de TDAH en niños en tu checklist y quiero saber más."
  ```
**Por qué:** El visitante que toca 1–2 síntomas ya está identificado — no debe esperar llegar a 3 para recibir un mensaje contextual. Reduce fricción en la micro-conversión más temprana.

---

### B2 · Sección "Por qué Neuropsicología" — Condensar
**Archivo:** `src/pages/index.tsx`
**Temperatura objetivo:** Frío, Tibio
**Cambio:** La sección educa sobre neuropsicología en general. El visitante llega preguntando si Karen puede diagnosticar a su hijo — no qué es la especialidad. Opciones:
1. Eliminar la sección y fusionar 1–2 frases clave en la sección "Sobre Karen"
2. Reducir a un bloque de 3 bullets máximo, sin título de sección propio

**Por qué:** Cada sección que no acerca al visitante a agendar es fricción. Esta sección retrasa la llegada a Testimonios y FAQ, que son las secciones de mayor conversión.

---

## Bloque C — Reestructuración de layout (2–4 horas)

*Cambios de orden de secciones en `index.tsx`. Requieren validar visual y mobile después.*

### C1 · Homepage: reordenar secciones
**Archivo:** `src/pages/index.tsx`
**Temperatura objetivo:** Todas

| Posición | Sección actual | Sección propuesta |
|----------|---------------|-------------------|
| 1 | Hero | Hero |
| 2 | Stats | SymptomChecker |
| 3 | SymptomChecker | Servicios |
| 4 | Servicios | Testimonios ← sube |
| 5 | Proceso | About Karen |
| 6 | Por qué Neuropsicología | Proceso |
| 7 | About Karen | FAQ |
| 8 | Testimonios | Blog |
| 9 | FAQ | Ubicación + CTA |
| 10 | Blog | — |
| 11 | Ubicación + CTA | — |

**Cambios clave:**
- **SymptomChecker sube al #2:** el visitante se auto-identifica antes de ver precios o credenciales
- **Testimonios sube al #4:** la prueba social aparece antes de la bio — genera confianza primero
- **Stats se integran en About Karen** como credenciales numéricas (47 reseñas, X años, etc.)
- **Por qué Neuropsicología se elimina** (ver B2)

**Por qué:** El orden actual prioriza credenciales y educación. El orden propuesto prioriza identificación + prueba social, que son los dos drivers de conversión para visitantes en temperatura tibio/caliente.

---

### C2 · Página de servicio TDAH Niños: mover tabla comparativa
**Archivo:** `src/pages/evaluacion-tdah-ninos.tsx`
**Temperatura objetivo:** Tibio (comparando opciones)
**Cambio:** La tabla "Neuropsicología vs Psicología" aparece actualmente a mid-page, antes del FAQ y testimonios. Moverla después del FAQ.

**Orden propuesto:**
```
Hero → Dolor/Síntomas → Instrumentos → Proceso → FAQ → [Tabla comparativa] → Testimonios → CTA final
```

**Por qué:** Cuando la tabla aparece antes de que el visitante entienda el proceso, genera fricción comparativa prematura. Después del FAQ actúa como confirmación de decisión, no como obstáculo.

---

## Bloque D — Contenido editorial (1–3 horas por artículo)

*Cambios en artículos de blog. Se pueden hacer incrementalmente, un artículo por sesión.*

### D1 · Blog: reducir cantidad de señales + agregar puente emocional
**Archivos afectados:** `src/pages/blog/senales-tdah-ninos.tsx` y artículos similares
**Temperatura objetivo:** Frío (llegó por búsqueda informacional)

**Cambios:**
1. **Agrupar señales:** máx 4 por categoría (no 13 sueltas). El exceso de ítems genera fatiga cognitiva y abandono antes del CTA.
2. **Agregar puente emocional** antes del CTA final:
   > *"Si reconoces varias de estas señales, no significa que algo está 'mal'. Significa que tu hijo merece una evaluación que le dé nombre a lo que vive — y a ti, claridad."*
3. **CTA contextual** (no genérico):
   - ❌ "Agendar valoración"
   - ✅ "¿Reconoces esto en tu hijo? Hablemos → [WhatsApp]"

**Por qué:** El visitante frío de blog está en modo de reconocimiento de problema. El puente emocional convierte ese reconocimiento en intención de acción antes de salir de la página.

---

## Bloque E — Largo plazo (8+ horas, requiere planificación separada)

### E1 · FloatingButtons: mensajes contextuales por sección visible
**Archivo:** `src/components/FloatingButtons.tsx`
**Temperatura objetivo:** Todas
**Cambio:** `IntersectionObserver` para detectar qué sección está en viewport y cambiar `WA_MSG` dinámicamente.

| Sección visible | Mensaje WA |
|----------------|------------|
| Servicios | "...me interesa el servicio de evaluación de TDAH" |
| Testimonios | "...vi las reseñas y quiero agendar" |
| FAQ | "...tengo preguntas sobre el proceso de evaluación" |
| Blog | "...leí tu artículo sobre [tema] y quiero saber más" |

**Dependencia:** Requiere estado compartido o context API para pasar la sección activa al componente flotante.

---

### E2 · Lead magnet para visitantes fríos
**Nueva página/componente**
**Temperatura objetivo:** Frío
**Cambio:** Bloque en artículos de blog:
> *"Descarga el checklist de señales TDAH en PDF — envíalo al correo de tu pediatra"*

Captura nombre + email → envía PDF automático.

**Dependencias:** Requiere integración de email (Resend, ConvertKit, o similar). No implementable con stack actual sin nueva dependencia.

---

## Resumen ejecutivo

| Bloque | Cambios | Esfuerzo total | Impacto CRO |
|--------|---------|----------------|-------------|
| **A** — Texto/estilos | A1, A2, A3 | < 30 min | Alto |
| **B** — Lógica componente | B1, B2 | 1–2 h | Alto |
| **C** — Layout / orden | C1, C2 | 2–4 h | Muy alto |
| **D** — Editorial blog | D1 (por artículo) | 1–3 h/art | Medio |
| **E** — Largo plazo | E1, E2 | 8+ h | Medio-Alto |

**Orden de implementación recomendado:** A (todo junto) → B1 → C1 → B2+C2 (en paralelo) → D1 (incremental) → E1 → E2

---

## Ya implementado (referencia)

Los siguientes cambios se completaron en PR #26 (`claude/pagespeed-analysis-review-fojnic`):

- Self-hosting de fuentes via `next/font/google` (eliminó render-blocking Google Fonts)
- Eliminación de `@import url()` en `src/index.css`
- Eliminación de `<link rel="stylesheet">` de Google Fonts en `_document.tsx`
- `fetchPriority="high"` en logo (LCP element) — `Navbar.tsx`
- Fix ARIA: `<div aria-label>` → `<span role="img" aria-label>` en `TestimonialsSection.tsx` e `index.tsx`
- Aumento de contraste en texto sobre fondos oscuros (routing cards, about section, step numbers, CTA spans)
- Fix contraste tab subtitles en `SymptomCheckerHome.tsx`
