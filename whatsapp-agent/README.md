# Agente WhatsApp — Consultorio Karen Trujillo

Asistente virtual conversacional con IA para el consultorio neuropsicológico de Karen Trujillo. Atiende WhatsApp y Facebook Messenger respondiendo preguntas frecuentes, agendando citas automáticamente y escalando a Karen solo cuando es necesario.

## Qué hace

- Responde preguntas sobre servicios, precios, proceso y logística de forma natural
- Agenda citas automáticamente consultando el calendario real de Karen (Cal.com)
- Aprende con el tiempo: guarda preguntas sin respuesta para que Karen las apruebe
- Escala a Karen en casos de crisis, preguntas clínicas o solicitudes especiales

## Stack

- **WhatsApp Cloud API** — canal de mensajería oficial de Meta
- **Claude API** — motor de respuestas conversacionales
- **Supabase** — base de conocimiento y logs de conversaciones
- **Cal.com** — agendamiento automático
- **Next.js API Routes** — webhook y backend (integrado al sitio principal)

## Estructura de documentación

```
whatsapp-agent/
├── CLAUDE.md          ← instrucciones para Claude sobre este proyecto
├── memory.md          ← decisiones tomadas, estado y pendientes
├── PLAN.md            ← arquitectura completa y fases de desarrollo
├── README.md          ← este archivo
└── system-prompt.md   ← system prompt del agente listo para producción
```

El código del agente vive en el proyecto Next.js principal:
```
src/pages/api/whatsapp/   ← webhook y endpoints
src/lib/                  ← clientes de WhatsApp, Claude, Supabase y Cal.com
```

## Requisitos previos

Antes de iniciar el desarrollo se necesitan estas cuentas y credenciales:

| Servicio | Dónde obtener | Para qué |
|----------|--------------|---------|
| Meta Business Manager | business.facebook.com | Conectar WhatsApp Cloud API |
| Anthropic Console | console.anthropic.com | API key de Claude |
| Supabase | supabase.com | Base de conocimiento y logs |
| Cal.com | cal.com | Calendario de Karen |

## Variables de entorno

Crear `.env.local` en la raíz del proyecto con:

```bash
META_WHATSAPP_TOKEN=
META_PHONE_NUMBER_ID=
META_WEBHOOK_SECRET=
ANTHROPIC_API_KEY=
SUPABASE_URL=
SUPABASE_ANON_KEY=
CALCOM_API_KEY=
```

## Fases de desarrollo

Ver `PLAN.md` para el detalle completo.

- **Fase 1** — Bot conversacional con base de conocimiento y escalado
- **Fase 2** — Agendamiento automático con Cal.com
- **Fase 3** — Aprendizaje continuo con aprobación de Karen
