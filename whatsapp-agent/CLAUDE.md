# WhatsApp Agent — Instrucciones para Claude

> Leer `memory.md` al inicio de cada sesión de trabajo en este proyecto.

## Contexto del proyecto

Sistema de agente conversacional con IA para el consultorio de **Karen Trujillo**, Neuropsicóloga (Cédula 11009616), Cancún. El agente atiende WhatsApp y Facebook Messenger respondiendo preguntas frecuentes, agendando citas automáticamente vía Cal.com, y escalando a Karen solo cuando es necesario.

Este sistema vive dentro del repositorio del sitio web principal (`Portfolio-Karen-Trujillo`) pero es un proyecto independiente. El código irá en `src/pages/api/whatsapp/` y `src/lib/` cuando inicie la Fase 1 de desarrollo.

## Stack técnico

| Herramienta | Rol | Por qué |
|-------------|-----|---------|
| WhatsApp Cloud API (Meta) | Canal de entrada/salida | Oficial, gratis hasta 1k conversaciones/mes |
| Claude API (Anthropic) | Cerebro conversacional | Respuestas naturales, respeta límites del system prompt |
| Supabase | Base de conocimiento + logs | Gratuito, guarda FAQ aprendidas e historial |
| Cal.com | Agendamiento automático | Gratuito, Karen controla su disponibilidad |
| Next.js API Routes | Webhook y backend | Ya existe en el proyecto, sin infraestructura nueva |
| Vercel | Hosting del webhook | Ya desplegado, recibe eventos de Meta |

## Fases del proyecto

- [ ] **Fase 1** — Bot conversacional: webhook, base de conocimiento inicial, respuestas con Claude
- [ ] **Fase 2** — Agendamiento automático con Cal.com
- [ ] **Fase 3** — Aprendizaje continuo: preguntas sin respuesta → Karen aprueba → bot aprende

Ver detalle completo en `PLAN.md`.

## Reglas específicas de este proyecto

1. **Nunca hardcodear secretos** — tokens de Meta, Anthropic, Supabase y Cal.com solo en `.env.local`
2. **El system prompt vive en `system-prompt.md`** — no duplicarlo inline en el código; cargarlo desde archivo o variable de entorno
3. **Cambios a precios, horarios o políticas** → actualizar `system-prompt.md` primero, luego el código
4. **Respetar los límites del bot** definidos en el system prompt: nunca diagnosticar, nunca inventar datos, nunca prometer descuentos no listados
5. **Actualizar `memory.md`** al tomar decisiones importantes o completar una fase

## Archivos clave

| Archivo | Propósito |
|---------|-----------|
| `memory.md` | Decisiones tomadas, estado actual, pendientes |
| `PLAN.md` | Arquitectura completa y fases de desarrollo |
| `system-prompt.md` | System prompt del agente listo para producción |
| `README.md` | Descripción general y requisitos |

## Variables de entorno necesarias (aún no configuradas)

```
META_WHATSAPP_TOKEN=
META_PHONE_NUMBER_ID=
META_WEBHOOK_SECRET=
ANTHROPIC_API_KEY=
SUPABASE_URL=
SUPABASE_ANON_KEY=
CALCOM_API_KEY=
```
