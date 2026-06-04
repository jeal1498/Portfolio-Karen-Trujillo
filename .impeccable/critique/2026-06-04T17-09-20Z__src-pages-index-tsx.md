---
target: src/pages/index.tsx
total_score: 28
p0_count: 0
p1_count: 3
timestamp: 2026-06-04T17-09-20Z
slug: src-pages-index-tsx
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Active nav y sticky CTA manejados correctamente. No hay ops async que necesiten feedback en esta página de marketing. |
| 2 | Match System / Real World | 4 | Lenguaje clínico en español excelente. FAQ usa exactamente el vocabulario que buscan los padres ansiosos. Los nombres de instrumentos (ADOS-2, WISC-V) dan credibilidad. |
| 3 | User Control and Freedom | 3 | Nav clara, anchor links, escape hatches de WhatsApp en cada paso del funnel. |
| 4 | Consistency and Standards | 2 | Seis valores distintos de border-radius entre componentes similares. Eyebrow text varía entre 9px y 10px. Pesos de borde inconsistentes (border vs border-2). Sistema de sombras sin patrón claro (primary/5 vs primary/15 vs primary/25 en tarjetas similares). |
| 5 | Error Prevention | 3 | Mensajes de WhatsApp pre-completados. Escape hatches "¿No estás seguro?" previenen selección incorrecta de servicio. |
| 6 | Recognition Rather Than Recall | 4 | Servicios, precios e instrumentos visibles sin hacer clic. FAQ completo. La sección "¿Cuál es tu situación?" elimina ambigüedad. |
| 7 | Flexibility and Efficiency | 2 | Sticky CTA bar es buen acelerador. Pero los links de blog (Recursos) van a 404. Sin skip-to-content para teclado. |
| 8 | Aesthetic and Minimalist Design | 2 | 9 eyebrows de sección, 3 blobs animados en hero, numeración 01/02/03, ghost-card en fotos, y SectionReveal opacidad gateada acumulan ruido visual que compite con el contenido clínico de calidad. |
| 9 | Error Recovery | 2 | Sin formularios = sin errores de formulario. Pero SectionReveal deja contenido invisible si JS falla. Links de blog apuntan a páginas inexistentes. |
| 10 | Help and Documentation | 3 | FAQ excelente: 8 preguntas específicas, precios transparentes, timeline completo. Escape hatches de WhatsApp en cada paso. |
| **Total** | | **28/40** | **Good — bases sólidas, eliminar ruido visual antes de hacer ship** |

## Anti-Patterns Verdict

**LLM assessment:**

La página NO grita "esto lo hizo IA" de inmediato — la estrategia de contenido la salva. Testimonios específicos con nombres reales, códigos de instrumentos (ADOS-2, WISC-V, CAARS-2), precios transparentes y un FAQ comprehensivo señalan expertise genuino del dominio. La sección "¿Cuál es tu situación?" es UX inteligente y bien ejecutado.

Pero el tratamiento visual tiene 5 tells claros de generación IA:

1. **Eyebrows en cada sección.** Nueve instancias de `text-[9px]/[10px] font-bold uppercase tracking-widest` a lo largo de la página (badge de Hero, Segmentador, Services, Mini-proceso, Why Neuropsychology, About, Social Proof, Recursos, Ubicación). El ban absoluto es claro: un eyebrow deliberado es voz de marca; nueve es andamiaje.

2. **Blob orbs animados en hero.** Tres círculos de blur grandes (`blur-[140px]`, `blur-[120px]`, `blur-[100px]`) más un patrón de puntos radial más una línea gradiente horizontal. Esta combinación específica es el patrón de hero de 2025 más reconocible de generación IA.

3. **Ghost-card en contenedores de foto.** La foto de Karen en el hero tiene tanto `border-2 border-border` como `shadow-2xl shadow-primary/15`. El ban absoluto: elige border O shadow, nunca ambos como decoración.

4. **SectionReveal gatea la visibilidad del contenido.** Cada sección empieza `opacity-0` y solo se vuelve visible cuando IntersectionObserver dispara. En renderers headless (el crawler de Google), conexiones lentas o cuando la pestaña está en segundo plano, el observer nunca dispara. La sección se sirve en blanco.

5. **Em-dash overuse: 23 instancias.** El detector confirmó 23 em-dashes en body text. Guía impeccable: "No em dashes. Usa comas, dos puntos, punto y coma, puntos o paréntesis."

**Deterministic scan:**

El detector CLI encontró 2 findings en `src/pages/index.tsx`:

- **`em-dash-overuse`** (warning): 23 em-dashes en body text. AI cadence tell.
- **`numbered-section-markers`** (advisory): Secuencia 01, 02, 03, 06, 09, 10. Los 01/02/03 aparecen en la sección "3 pasos" y son **borderline defensibles** (pasos secuenciales reales). Los 06/09/10 probablemente vienen de comentarios JSX no renderizados — falso positivo parcial. Aun así, el display visual 01/02/03 puede reemplazarse con íconos sin perder significado.

Sin browser visualization disponible en esta sesión. El detector CLI fue la fuente de evidencia principal.

## Overall Impression

La estrategia de contenido es genuinamente fuerte: este es uno de los mejores textos de servicio clínico para el público objetivo. El FAQ solo ya haría incómodos a la mayoría de los competidores. Pero la capa visual se construyó con un reflejo de template que socava activamente la credibilidad que el contenido establishes. Una madre ansiosa en Cancún distingue entre el sitio de un consultor y el de una profesional. Los blobs animados y la pared de labels en mayúsculas empujan esto hacia territorio de template. La corrección es sustractiva, no aditiva — quitando el andamiaje quedan unos huesos excelentes debajo.

## What's Working

1. **La especificidad del contenido es excepcional.** Nombres de instrumentos (ADOS-2, WISC-V, CAARS-2, CONNERS-3), precios explícitos ($7,000 / $8,500 MXN), timelines (2–4 semanas) y testimonios específicos con tipo de servicio ("Mamá de Sofía, 7 años — TDAH Infantil") son exactamente lo que convierte a una madre ansiosa. Esto es lo más difícil de hacer bien y está bien hecho.

2. **La sección de routing "¿Cuál es tu situación?"** Colocar un path-finder explícito justo debajo del hero reduce la ansiedad de decisión en el momento de mayor incertidumbre. UX reflexivo y de alto valor.

3. **Mensajes de WhatsApp pre-completados a lo largo del funnel.** Pre-poblar el mensaje con contexto ("Hola Karen, vi tu página...") baja la barrera de compromiso y evita contactos en blanco. Los múltiples escape hatches ("¿No estás seguro? Escríbeme sin costo") abordan la ansiedad de no saber qué evaluación elegir.

## Priority Issues

**[P1] Eyebrows en cada sección — ban absoluto violado**
- **Por qué importa:** El kicker uppercase tracked de 2023 aparece en el 55–95% de las páginas generadas por IA independientemente del brief. Nueve instancias en una página es la definición de andamiaje IA; borra la distintividad que la credibilidad clínica requiere.
- **Fix:** Mantener exactamente un eyebrow en toda la página — o ninguno. FAQ, About y Ubicación no necesitan label para entenderse. El badge de credencial en el hero y la sección de Servicios son los dos candidatos que vale conservar; elegir uno. Reemplazar los demás con nada, una línea separadora, o un dispositivo visual específico de esta marca.
- **Suggested command:** `$impeccable quieter src/pages/index.tsx`

**[P1] `SectionReveal` gatea la visibilidad del contenido**
- **Por qué importa:** Cada sección empieza `opacity-0`. IntersectionObserver dispara solo cuando el elemento entra al viewport con `-80px` de rootMargin. En headless renderers (crawler de Google), conexiones lentas o con la pestaña en segundo plano, el observer nunca dispara. La sección se sirve en blanco. Google no puede indexar lo que no puede ver.
- **Fix:** Invertir el patrón: los componentes son visibles por defecto, las animaciones son progressive enhancement. Reemplazar `opacity-0` default con `opacity-100`; aplicar la animación solo cuando IntersectionObserver dispara (agregar la clase animada en lugar de remover la clase hidden). Agregar `@media (prefers-reduced-motion: reduce) { transition: none; }`.
- **Suggested command:** `$impeccable animate src/pages/index.tsx`

**[P1] Sin soporte de `prefers-reduced-motion`**
- **Por qué importa:** El público objetivo del sitio incluye familias con hijos neurodivergentes — quienes más frecuentemente tienen `prefers-reduced-motion` activado. WCAG 2.1 SC 2.3.3 requiere que el movimiento pueda desactivarse. Actualmente: transiciones de `SectionReveal`, blobs `animate-pulse` (2 instancias), `animate-[fadeInUp]`, `animate-[fadeIn]`, hover `scale-110` en íconos — ninguno tiene alternativa reduced-motion.
- **Fix:** Agregar `@media (prefers-reduced-motion: reduce) { * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }` como baseline, luego override por componente con alternativas intencionales (crossfade en lugar de translate-y).
- **Suggested command:** `$impeccable animate src/pages/index.tsx`

**[P2] Hero background: blob orbs animados**
- **Por qué importa:** Tres círculos blur (700px, 500px, 400px) + patrón de puntos radial + línea gradiente header = ruido visual en el real estate más importante de la página. Esta combinación específica es el patrón de hero 2025 más reconocible de generación IA. También agrega capas de paint innecesarias.
- **Fix:** Eliminar los tres blur orbs. Conservar o reemplazar con un único tono sutil (el `bg-soft-gradient` ya hace esto). El patrón de puntos es borderline; si se conserva, reducir a 2–3% de opacidad máximo.
- **Suggested command:** `$impeccable quieter src/pages/index.tsx`

**[P2] Ghost-card en contenedores de fotos**
- **Por qué importa:** La foto de Karen en el hero y en la sección About tiene `border-2 border-border` + `shadow-2xl shadow-primary/15`. El ban absoluto: border O shadow, no ambos. El mismo patrón aparece en el contenedor del mapa de Google.
- **Fix:** Elegir uno: quitar el borde y conservar la sombra suave, o quitar la sombra y conservar el borde en color de marca (`border-primary/20`). La versión solo-sombra (`0 20px 60px -15px rgba(56,47,81,0.12)` del DESIGN.md) es la correcta para marcos de foto.
- **Suggested command:** `$impeccable polish src/pages/index.tsx`

## Persona Red Flags

**Jordan (Primera Visita Confundida — Mamá de Cancún):**
- Llega a la página y ve 9 labels en uppercase diferentes antes de llegar al FAQ. Los eyebrows fueron diseñados para organizar secciones, pero nueve producen jerarquía cero.
- Las tarjetas de servicio muestran "Ver más" como CTA — no le dice a Jordan qué significa "más" ni qué ocurrirá al hacer clic.
- Los links de la sección Recursos van a 404 hasta que haya contenido de blog publicado. Jordan hace clic en "¿Tu hijo no pone atención? Señales reales de TDAH..." y llega a un callejón sin salida. Daño de confianza en un momento de construcción de confianza.

**Casey (Mamá Agotada con Celular — Mobile Distraída):**
- `SectionReveal` con `rootMargin: '-80px'` significa que algunas secciones necesitan 80px de scroll extra para disparar su animación de visibilidad. En un iPhone SE de 568px de alto, esto es un % significativo del viewport.
- Las tarjetas de routing en el Segmentador usan `p-6 sm:p-7` de padding interno en mobile — debería sentirse cómodo, pero los touch targets necesitan testing a 375px de ancho.

**Ana (Mamá con Diagnóstico Previo Incorrecto — persona del proyecto):**
- Le han dicho que su hijo "solo es tímido" o "solo es inquieto" antes. Ahora es escéptica y busca prueba de que esta especialista es diferente de las anteriores.
- El "47+ reseñas · 5 estrellas" en el hero badge es una afirmación flotante. El botón de reseñas de Google en la sección 5 sí linkea a Google — bien. Pero el badge del hero no linkea a ningún lugar, haciéndolo sentir como un claim de marketing más que como evidencia verificable.
- El número de cédula `11009616` se menciona varias veces pero nunca linkea al verificador oficial de la SEP. Para Ana, la verificación lo es todo.

## Minor Observations

- **"Ver más" en service cards** no sigue la regla verb+objeto de DESIGN.md. Debería ser "Ver evaluación TDAH" o "Conocer servicio".
- **"Diagnósticos claros que transforman vidas"** en el hero es copy near-banned. "Transforman vidas" aterriza muy cerca del tropo de transformación que PRODUCT.md prohíbe explícitamente. Alternativa: "Respuestas donde antes había incertidumbre."
- **`rounded-3xl` en service cards y contenedores de foto** excede el máximo de 16px del DESIGN.md. `rounded-2xl` (16px) es el tope.
- **El eyebrow label dentro de cada service card** (`text-[10px] text-primary/50 uppercase tracking-widest`) suma una 10.ª y 11.ª instancia del patrón eyebrow en internals de componentes.
- **La sección Recursos** linkea a blog posts que no existen. Considerar quitar la sección hasta que el blog esté vivo, o reemplazar los links con un WhatsApp link.

## Questions to Consider

- "Si todos los labels de sección (eyebrows) se eliminaran mañana, ¿un visitante entendería qué es cada sección? Casi con certeza sí — lo que significa que los eyebrows están sumando ruido, no estructura."
- "El hero tiene dos CTAs primarios ('Ver servicios' y 'WhatsApp'). La sección de routing justo debajo también tiene tres caminos. Y el sticky CTA repite las opciones de nuevo. ¿Tres lugares para empezar es uno de más?"
- "¿Qué confiaría más una madre: una página que afirma '47+ reseñas 5 estrellas' en un badge, o una página que linkea ese número directamente al Google Business donde puede leer las reseñas reales?"
