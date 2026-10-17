# Memory — Preferencias y Aprendizajes

## Tono y Comunicación

- Tono preferido: directo, eficiente, sin introducciones innecesarias.
- No usar frases de relleno ni preámbulos antes de responder o actuar.

## Protocolo de Memoria

- Usar este archivo (`memory.md`) para registrar preferencias, correcciones y aprendizajes clave.
- Actualizar de forma proactiva sin pedir permiso; confirmar en el chat cuando se guarde nueva información.
- Si una preferencia cambia, reescribir la entrada anterior con la nueva versión.

## Flujo de Trabajo — Propuestas

- Los cambios aprobados se suben **directo a `main`** (pedido el 14 oct 2026), sin ramas intermedias.

- Antes de implementar cualquier cambio propuesto (nuevo o corregido), explicar el enfoque primero y esperar confirmación explícita del usuario.
- No ejecutar ediciones de código hasta recibir aprobación.

## Videos de Karen

- Se movieron al repo privado `jeal1498/videos-karen-trujillo` (17 oct 2026), con su skill, `CLAUDE.md` y `memory.md`. No editar videos desde este repo.

## Impeccable Skill

- Si context.mjs reporta UPDATE_AVAILABLE, actualizar siempre sin preguntar: `npx impeccable skills update`.
- Confirmar en el chat que se actualizó (o que ya estaba en la versión más reciente).

---

## Dónde está el detalle de cada proyecto

- Campaña Chetumal → `docs/proyectos/campana-chetumal.md`
- App clínica PsychoCore → `docs/proyectos/psychocore.md`
- CRO / WhatsApp → `docs/cro/estado-cro-whatsapp.md`
- Auditoría de marketing y skills de marketing → `docs/seo/estado-auditoria-marketing.md`
- Agente WhatsApp → `docs/proyectos/whatsapp-agent/`
- Google Ads → `docs/google-ads/PLAN.md`

Leer solo el que corresponda a la tarea; no cargarlos todos.

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

---

## Medición + Google Ads — Estado (14 oct 2026)

- Si el usuario dice **«empecemos con el plan»**: leer `docs/google-ads/PLAN.md` y `REPARTO.md`, recapitular en corto qué está hecho y cuál es el siguiente paso (normalmente C1 → B1).

Plan completo y estado en **`docs/google-ads/PLAN.md`** (leer primero); reparto de tareas en `docs/google-ads/REPARTO.md`. Guía de cuentas para Karen en `docs/google-ads/GUIA-KAREN.md`.
- ✅ Fase 1 en código: GA4 con Consent Mode v2 + aviso de cookies + eventos `contacto_whatsapp`, `contacto_llamada`, `contacto_correo`, `agendar_cita`, `cita_agendada`. Se activa con `NEXT_PUBLIC_GA_ID` en Vercel.
- ⏳ Falta: Karen crea GA4 / Search Console / Google Ads y pone el ID en Vercel.
- ✅ Fase 2 en borrador: PALABRAS-CLAVE.md, ANUNCIOS.md, REVISION-PAGINAS.md + evento `clic_agendar`. Falta confirmar volumen/CPC con las cuentas.
- Regla: pagar por búsquedas con intención de agendar, no por las más buscadas (esas van al blog).
