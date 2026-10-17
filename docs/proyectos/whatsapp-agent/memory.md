# Memory — Agente WhatsApp Karen Trujillo

> Archivo vivo. Actualizar cada vez que se tomen decisiones importantes o se complete una fase.

## Estado actual

**Fecha de inicio:** 2026-07-01
**Fase activa:** Pre-desarrollo (documentación y planeación)
**Próximo paso:** Obtener acceso a Meta Business Manager para conectar WhatsApp Cloud API

---

## Decisiones tomadas

### 2026-07-01

- **Bot conversacional, no de botones** — Karen quiere respuestas naturales tipo asistente, no menús de opciones
- **Sistema que aprende** — las preguntas sin respuesta se guardan, Karen las aprueba y el bot las incorpora automáticamente
- **Backend en el mismo repo** — se extiende el Next.js existente con API routes; evita mantener dos proyectos separados
- **Stack elegido:** WhatsApp Cloud API + Claude API + Supabase + Cal.com + Next.js
- **Presupuesto estimado:** $5–35 USD/mes (sin desarrollo adicional)
- **System prompt** creado en conversación con Claude y ajustado con 3 mejoras:
  1. Agendamiento automático con Cal.com (antes era handoff manual)
  2. Instrucción de memoria de conversación
  3. Variante para Facebook Messenger

---

## Pendientes

### Accesos y cuentas (bloqueantes para Fase 1)

- [ ] Karen dar acceso a Meta Business Manager (necesario para WhatsApp Cloud API)
- [ ] Crear cuenta en Anthropic Console y obtener API key
- [ ] Crear proyecto en Supabase (cuenta gratuita)
- [ ] Karen crear cuenta en Cal.com y configurar su disponibilidad

### Técnicos

- [ ] Definir lógica exacta de escalado (qué keywords o patrones transfieren a Karen)
- [ ] Decidir cómo notificar a Karen cuando el bot escala (WhatsApp personal, email, o Supabase dashboard)
- [ ] Confirmar si Facebook Messenger también se integra en Fase 1 o se deja para después

---

## Costos estimados mensuales

| Servicio | Plan | Costo |
|----------|------|-------|
| WhatsApp Cloud API | Primeras 1,000 conversaciones gratis | $0–15 USD |
| Claude API | Pay-per-use (~volumen bajo inicial) | $5–20 USD |
| Supabase | Free tier | $0 |
| Cal.com | Free tier | $0 |
| Vercel | Ya activo | $0 |
| **Total estimado** | | **$5–35 USD/mes** |

---

## Preguntas abiertas

- ¿Facebook Messenger en Fase 1 o Fase 2?
- ¿Panel de administración para Karen (ver conversaciones, aprobar respuestas) o solo notificaciones por WhatsApp?
- ¿Notificación de escalado a Karen por WhatsApp personal o por email?
