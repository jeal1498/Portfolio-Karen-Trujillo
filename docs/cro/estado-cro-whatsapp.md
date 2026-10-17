# Estado CRO — WhatsApp y plan por bloques

> Movido desde `memory.md` (17 oct 2026) para que ese archivo quede solo con preferencias.

## Optimización CRO — WhatsApp (2026-06-28)

### Mensajes optimizados en componentes compartidos

| Componente | Problema | Fix |
|---|---|---|
| `FloatingButtons.tsx` | "sesión"/"consulta" — terminología de terapia | "valoración neuropsicológica. ¿Cuál es la disponibilidad?" + migrado a `waUrl()` |
| `Hero.tsx` | Genérico sin siguiente paso | Añade "¿Podrías orientarme sobre el proceso y la disponibilidad?" + migrado a `waUrl()` |
| `Navbar.tsx` (x2) | Sin llamada a acción | Añade "¿Cuál es la disponibilidad?" |
| `Footer.tsx` | Genérico | Añade "¿Cuál es la disponibilidad?" |
| `FAQSection.tsx` | URL hardcodeada con encoding manual | `waUrl()` + contexto "acabo de leer las preguntas frecuentes" |
| `ServicesSection.tsx` | Sin contexto de paciente, encoding inconsistente | TDAH niños → "para mi hijo/a", TDAH adultos → "para mí", todo a `waUrl()` |
| `BlogLayout.tsx` | Encoding incompleto en default | `encodeURIComponent()` completo + "¿Cuál es la disponibilidad?" |

### FloatingButtons añadido a 9 páginas que no lo tenían

`index.tsx` · `evaluacion-tdah-ninos.tsx` · `evaluacion-tdah-adultos.tsx` · `evaluacion-autismo-cancun.tsx` · `neuropsicologia-cancun.tsx` · `neuropsicologia-zona-hotelera-cancun.tsx` · `blog/tdah-adultos-diagnostico-tardio.tsx` · `blog/que-es-ados-2-autismo.tsx` · `blog/senales-tdah-ninos.tsx`

### Patrón de mensaje correcto (respetar en futuros CTAs)

```
"Hola Karen, [contexto de dónde vienen o qué leyeron]. [Qué quieren + para quién]. ¿Cuál es la disponibilidad?"
```

- Siempre usar `waUrl()` de `@/lib/contact` — nunca URLs hardcodeadas con `%20`
- Nunca usar "sesión" o "consulta" para las evaluaciones neuropsicológicas
- Incluir contexto de paciente cuando se conoce (hijo/a vs adulto vs TEA)

## Sesión CRO — Plan por Bloques (2026-06-30)

**Branch:** `claude/plan-goal-loop-execution-8ovtcv`  
**PR:** #27 mergeado a main

### Cambios implementados

#### Bloque A — Quick wins de fricción

| Item | Archivo | Cambio |
|------|---------|--------|
| A1 Contraste footer | `Footer.tsx` | `text-[#c6bce2]/50` → `/75` en `FooterCol` (WCAG AA) |
| A2 CTA doble Hero | `index.tsx` | Eliminado botón "Ver servicios" — solo queda WhatsApp |
| A3 Micro-CTA footer | `Footer.tsx` | Nuevo bloque `¿Lista para dar el primer paso? / Agendar por WhatsApp →` antes del copyright |

#### Bloque B — SymptomChecker contextual

| Item | Archivo | Cambio |
|------|---------|--------|
| B1 WA personalizado | `SymptomCheckerHome.tsx` | `buildWaMsg()` genera mensaje dinámico según cantidad de síntomas seleccionados (0→genérico, 1+→personalizado con conteo y área) |

#### Bloque C — Reordenamiento de secciones

| Item | Archivo | Cambio |
|------|---------|--------|
| C1 Homepage | `index.tsx` | Eliminadas: Stats Bar + "Por qué Neuropsicología". Nuevo orden: Hero → SymptomChecker → Servicios → **Testimonios** → About → Proceso → FAQ → Blog → Ubicación |
| C2 TDAH niños | `evaluacion-tdah-ninos.tsx` | Tabla comparativa "Diferenciador" movida de sección 6 (mid-page) a posición 10b (post-FAQ, pre-Pricing) |

#### Bloque D — Copy emocional blog

| Item | Archivo | Cambio |
|------|---------|--------|
| D1 Señales TDAH | `blog/senales-tdah-ninos.tsx` | 14→12 señales (removidas 2 de inatención); h2 actualizado; párrafo puente emocional antes del CTA; botón "¿Reconoces esto? Hablemos →" |

#### Bloque E — No implementado (requiere infraestructura o decisión de Karen)

- E1: FloatingButtons contextual por sección visible (IntersectionObserver)
- E2: Lead magnet PDF (requiere email integration)

### PageSpeed Insights — Baseline (2026-06-30)

URL: `https://pagespeed.web.dev/analysis/https-www-psicologakarentrujillo-com-mx/olmi4k7r7m?form_factor=mobile`  
Resultado: **Sin datos suficientes** — Chrome UX Report no tiene datos reales para esta página al 30-jun-2026.  
Acción: Re-verificar en 30 días cuando haya más tráfico acumulado.
