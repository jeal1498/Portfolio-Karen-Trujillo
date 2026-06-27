# Memory — Preferencias y Aprendizajes

## Tono y Comunicación

- Tono preferido: directo, eficiente, sin introducciones innecesarias.
- No usar frases de relleno ni preámbulos antes de responder o actuar.

## Protocolo de Memoria

- Usar este archivo (`memory.md`) para registrar preferencias, correcciones y aprendizajes clave.
- Actualizar de forma proactiva sin pedir permiso; confirmar en el chat cuando se guarde nueva información.
- Si una preferencia cambia, reescribir la entrada anterior con la nueva versión.

## Flujo de Trabajo — Propuestas

- Antes de implementar cualquier cambio propuesto (nuevo o corregido), explicar el enfoque primero y esperar confirmación explícita del usuario.
- No ejecutar ediciones de código hasta recibir aprobación.

## Impeccable Skill

- Si context.mjs reporta UPDATE_AVAILABLE, actualizar siempre sin preguntar: `npx impeccable skills update`.
- Confirmar en el chat que se actualizó (o que ya estaba en la versión más reciente).

---

## Campaña Pop-Up Chetumal — Estado actual

**Archivo de propuesta:** `propuesta-campana-chetumal.md` (en la raíz del repo)  
**Estado:** Implementación parcial completa — pendiente respuestas de Karen para publicar

### Lo que está listo (no bloquea respuestas de Karen)

- ✅ `src/pages/valoracion-chetumal.tsx` — landing page skeleton con placeholders para fechas y dirección
- ✅ 3 scripts de video para Facebook (sección 5 del doc) — listos para grabar
- ✅ Brief visual de campaña (sección 6 del doc) — paleta, tipografía, estructura visual
- ✅ Propuesta completa en `propuesta-campana-chetumal.md` con preguntas inline para Karen

### Para publicar la landing solo se necesita cambiar 3 líneas en el código

```typescript
// src/pages/valoracion-chetumal.tsx — líneas 16-18
const CAMPAIGN_START = '[FECHA INICIO — pendiente]';
const CAMPAIGN_END   = '[FECHA FIN — pendiente]';
const CHETUMAL_ADDRESS = '[DIRECCIÓN — pendiente]';
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

---

## Software Clínico que el usuario está construyendo para Karen

El usuario está desarrollando **dos productos separados** para la Psicóloga Karen Trujillo:

1. **Sitio web de marketing** — este repo (`Portfolio-Karen-Trujillo`). Next.js 14 + Tailwind + shadcn. Sirve para atraer pacientes y agendar consultas.
2. **App clínica PsychoCore** — repo separado (`expedientes-clinicos-neuro`). Gestión interna de expedientes: pacientes, anamnesis, evaluaciones neuropsicológicas, notas SOAP, documentos. Solo para uso de Karen, no es pública.

Ambos proyectos son independientes. Este repo (`Portfolio-Karen-Trujillo`) **no contiene código de PsychoCore**.

---

## App Clínica PsychoCore — Contexto General

Además del sitio web de marketing (este repo), Karen tiene una **app clínica separada** llamada **PsychoCore** (repo: `expedientes-clinicos-neuro`) para gestionar expedientes de pacientes. Las dos apps son independientes.

**Stack PsychoCore:**
- Next.js 14.2.15 App Router · TypeScript 5 · Node ≥20
- Supabase JS client directo (sin ORM) · PostgreSQL 17 · región us-west-2
- CSS Modules (sin Tailwind, sin shadcn) · sin Zod · sin react-hook-form
- Vercel deployment · Supabase Auth · Supabase Storage

**Patrones de código PsychoCore (respetar siempre):**
- Server Components para SELECT · Server Actions para INSERT/UPDATE
- Formularios HTML nativos: `<form action={serverAction}>` + `SubmitButton` con `useFormStatus`
- Errores vía URL query params: `redirect('...?error=' + encodeURIComponent(msg))`
- Auditoría SELECT manual con `insertAuditLog()` en cada Server Component
- Migraciones solo con `mcp__Supabase__apply_migration` (no CLI)
- Navegación con `<a href>` nativo (no `<Link>` de Next.js)
- Gráficas SVG inline en Server Components (sin librería de charts)
- Inmutabilidad NOM-004: patrón `is_locked + locked_at + hash_integridad` + trigger `prevent_locked_*_update()`

---

## App Clínica — Blueprint de Evaluaciones Neuropsicológicas

### Contexto del módulo

Se diseñó un blueprint completo para el módulo de baterías de evaluación neuropsicológica. La unidad de trabajo clínico es la **batería** (no el instrumento suelto). Los 6 instrumentos que usa Karen: CONNERS-3, BRIEF-2, ADOS-2, WISC-V, CAARS-2, CPT-3.

### Estado de implementación (verificado 2026-06-25)

| Área | Estado |
|------|--------|
| DB: tablas, ENUMs, RLS, triggers, semillas | ✅ 100% completo |
| Constantes (`src/lib/evaluaciones/constants.ts`) | ⚠️ Parcial — existe con nombre/ruta incorrecto y 6/8 exports faltantes |
| Tipos TypeScript (`database.types.ts`) | ❌ No actualizado |
| Rutas `baterias/` (8 archivos) | ❌ No implementado |
| Server Actions (crearBateria, guardarPuntajes, firmarBateria) | ❌ No implementado |
| Formularios por instrumento | ❌ No implementado |
| PDF (`@react-pdf/renderer`) | ❌ No instalado |
| Integración expediente del paciente | ❌ Enlace faltante |

### Problema concreto del archivo de constantes

- Existe: `src/lib/evaluaciones-constants.ts` (nombre plano, exports incompletos)
- Debe ser: `src/lib/evaluaciones/constants.ts` (subdirectorio, 8 exports completos)
- 3 archivos legacy ya importan de la ruta incorrecta — actualizar sus imports al corregir

### Tablas nuevas en DB (ya aplicadas)

- `instrumentos_catalogo` — catálogo de los 6 instrumentos
- `baterias_evaluacion` — con `is_locked`, `hash_integridad`, `impresion_diagnostica`, `recomendaciones`
- `evaluacion_instrumento_detalle` — una fila por instrumento × informante
- `normas_conversion` — tablas de normas (vacía, para uso futuro)

### Patrones clínicos clave

- **CONNERS-3 y BRIEF-2:** multi-informante (padre + maestro) — la app muestra gráfica comparativa SVG de ambos
- **ADOS-2:** módulos 1-4 según nivel de lenguaje; clasificación automática no_tea/tea_probable/tea según puntos de corte hardcodeados en constants.ts
- **WISC-V:** capturar puntajes escalares (1-19) por subprueba; Karen captura los índices también desde el protocolo físico
- **CPT-3:** solo importar T-scores del output — no recalcular desde ítems
- Umbral clínico CONNERS-3: T ≥ 70 · Umbral clínico BRIEF-2: T ≥ 65 (diferente)

### Flujo de firma de batería

1. Todos los instrumentos puntuados → Karen escribe impresión diagnóstica + recomendaciones
2. Generar PDF con `@react-pdf/renderer` → subir a bucket `reportes-escaneados`
3. Calcular SHA-256 del contenido clínico → UPDATE con `is_locked = true`, `estado = 'firmado'`
4. El trigger `trg_baterias_lock_guard` bloquea cualquier UPDATE posterior

---

## Protocolo para Trabajo entre Conversaciones

Cuando el usuario pide generar instrucciones para otra conversación:

1. **Antes de planear:** solicitar el estado técnico real (stack, schema, archivos, patrones) — nunca planear a ciegas
2. **Blueprint primero:** generar el diseño de alto nivel con decisiones de arquitectura
3. **Instrucción `/plan`:** texto markdown autocontenido que incluya stack, patrones a respetar, restricciones absolutas, y código de referencia concreto (no pseudocódigo cuando hay un patrón exacto disponible)
4. **Verificación:** generar prompt de verificación separado para confirmar implementación antes de dar por completado
5. **Continuación:** si la verificación revela implementación parcial, generar prompt de continuación que parta del estado real verificado

### Preguntas técnicas a solicitar antes de planear (checklist)

Para cualquier módulo nuevo en PsychoCore, pedir siempre: stack completo, DDL de tablas relevantes, rutas exactas de archivos, patrón de código real (copiar el Server Action o componente más complejo), sistema de auth, storage configurado, herramienta de PDF si existe, librería de forms/validación, patrón de errores, y si hay migraciones con tracking o aplicadas directamente.
