# Campaña Pop-Up Chetumal

> Movido desde `memory.md` (17 oct 2026) para que ese archivo quede solo con preferencias.

## Campaña Pop-Up Chetumal — Estado actual

**Archivo de propuesta:** `propuesta-campana-chetumal.md` (en la raíz del repo)  
**Estado:** ✅ Landing lista — solo falta la dirección del consultorio en Chetumal

### Implementación completada (2026-06-27)

- ✅ `src/pages/valoracion-chetumal.tsx` — landing page completa con precios, instrumentos y fechas
- ✅ Tiers: solo Estándar + Completo (Básico eliminado)
- ✅ Precios actualizados y confirmados por Karen
- ✅ Batería de instrumentos corregida (CUMANES, Masking, IDARE en lugar de WISC-V)
- ✅ Anticipo: 50% al reservar + 50% en primera sesión
- ✅ Cupos: 10 (constante `MAX_SLOTS`)
- ✅ Fechas: 21 de julio al 3 de agosto (tentativas, fácil cambiar)
- ✅ Copy hero: versión A clínica
- ✅ 3 scripts de video para Facebook (sección 5 del doc) — listos para grabar
- ✅ Brief visual de campaña (sección 6 del doc) — paleta, tipografía, estructura visual

### Auditoría completa aplicada (2026-06-28)

Todos los issues P0 de la campaña fueron corregidos y pusheados a `main`:

- ✅ FAQ item 3 reescrito — eliminada mención a tier Básico (el schema FAQPage también quedó limpio)
- ✅ "Los tres niveles" → "Ambos niveles" en intro de pricing
- ✅ Subtítulo hero menciona fecha y "sin necesidad de hacer el viaje"
- ✅ Anticipo en tarjeta: "50% al reservar · 50% en la primera sesión"
- ✅ Badge de urgencia más visible (text-[9px] → text-[10px] sm:text-xs)
- ✅ CTA secundario hero legible (text-[9px] → text-xs)
- ✅ Dirección placeholder ya no se expone al usuario — muestra "Se confirma al reservar vía WhatsApp"
- ✅ Label "Máximo alcance diagnóstico" en tarjetas Completo de los 3 tabs
- ✅ Nueva FAQ: "¿Cuándo recibo el informe?" (total: 7 items)
- ✅ Schema: organizer tipado como ['Person','Physician'] + medicalSpecialty
- ✅ Schema: offers con url, validFrom, validThrough
- ✅ Meta tags geo.position e ICBM para localidad Chetumal
- ✅ propuesta-campana-chetumal.md: Script 2 corregido (WISC-V → CUMANES), carrusel slide 5 ($2,800 → $3,900), Script 3 con apertura de contexto para Facebook

### Para publicar la landing solo falta 1 dato

```typescript
// src/pages/valoracion-chetumal.tsx — línea 18
const CHETUMAL_ADDRESS = '[DIRECCIÓN — pendiente]';  // → dirección real del consultorio
```

### Canal de redes sociales recomendado

- **Facebook** — canal principal. Padres 30–50 años que toman la decisión están en Facebook, no en TikTok. Grupos locales de Chetumal son canal orgánico de alto impacto.
- **TikTok** — canal secundario. Para adultos 25–35 con TDAH no diagnosticado.
- **Formato:** Video vertical (Reels) > imagen estática. Karen a cámara, sin setup elaborado.

### Precios confirmados por Karen (2026-06-27)

| Tier | TDAH Niños/Adultos | Autismo/TEA |
|---|---|---|
| ~~Básico~~ | ~~eliminado~~ | ~~eliminado~~ |
| Estándar ★ ancla | $3,900 MXN | $4,500 MXN |
| Completo | $5,000 MXN | $5,800 MXN |

### Estructura de tiers — DECISIÓN FINAL

**Solo Estándar + Completo** (Básico eliminado de la campaña). Decisión tomada por el equipo técnico a solicitud de Karen: con 10 cupos en formato pop-up, 2 opciones convierten mejor y la diferencia de precio entre Básico y Estándar ($400) no justifica la complejidad.

### Batería de instrumentos — CONFIRMADA

| Tipo | Estándar | Completo |
|---|---|---|
| TDAH Niños | CONNERS, EDAH, CDI | CONNERS, EDAH, CDI, **CUMANES**, **Masking**, **IDARE** |
| TDAH Adultos | DIVA 2.0, CONNERS Adultos, IDARE | DIVA 2.0, CONNERS Adultos, IDARE, Inv. Depresión |
| TEA | ADOS-2, ADI-R | ADOS-2, ADI-R, **CUMANES** |

**Notas clínicas:**
- CONNERS y EDAH son escalas para padres y maestros (no aplicadas directamente al niño)
- WISC-V **eliminado** de todos los tiers (era para inteligencia — no aplica en este formato)
- CUMANES aplica tanto en TDAH como en TEA: mide función ejecutiva, flexibilidad mental, inhibición de respuestas y focalización de la atención (marcador neuropsicológico del TDAH)
- AQ-10 ya no aparece en la landing (estaba en el Básico TEA, que fue eliminado)

### Decisiones de Karen — RESPONDIDAS

| # | Pregunta | Respuesta |
|---|---|---|
| P1 | Precios | Confirmados (con ajustes en P2) |
| P2 | Instrumentos/sesiones | Quita WISC-V, agrega CUMANES (TDAH+TEA) + Masking + IDARE (TDAH Niños). AQ-10 correcto. |
| P3 | Anticipo | 50% al reservar + 50% en la primera sesión |
| P4 | Tiers | Delegado al equipo → Estándar + Completo (sin Básico) |
| P5 | Fechas | **21 de julio al 3 de agosto** (tentativo) — implementado en código |
| P6 | Dirección | Sin confirmar — **placeholder activo en código** |
| P7 | Cupos | 10 máximo → `MAX_SLOTS = 10` en código |
| P8 | Flujo de reserva | Solo WhatsApp |
| P9 | Copy hero | Versión A (clínica) — italic emocional eliminado |
