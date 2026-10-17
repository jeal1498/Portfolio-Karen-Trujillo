# Plan de desarrollo — Agente WhatsApp Karen Trujillo

## Arquitectura general

```
Usuario (WhatsApp / Messenger)
           │
           ▼
  WhatsApp Cloud API (Meta)
           │
           ▼
  Webhook → /api/whatsapp/webhook   (Next.js)
           │
           ▼
  ┌────────────────────────────────┐
  │       Motor de decisión        │
  │                                │
  │  ¿Es info/FAQ?    → Claude API responde con base de conocimiento
  │  ¿Quiere agendar? → Cal.com reserva cita automáticamente
  │  ¿No sabe?        → Guarda en Supabase + escala a Karen
  │  ¿Crisis/urgencia?→ Plantilla de escalado inmediato
  └────────────────────────────────┘
```

---

## Stack técnico

| Herramienta | Rol | Costo |
|-------------|-----|-------|
| WhatsApp Cloud API | Canal entrada/salida | $0–15 USD/mes |
| Claude API | Respuestas conversacionales | $5–20 USD/mes |
| Supabase | Base de conocimiento + logs | Gratis |
| Cal.com | Agendamiento automático | Gratis |
| Next.js API Routes | Webhook y backend | Ya activo |
| Vercel | Hosting | Ya activo |

---

## Fase 1 — Bot conversacional

**Objetivo:** El bot responde preguntas frecuentes de forma natural y escala a Karen cuando no sabe.

### Paso 1: Configurar WhatsApp Cloud API
- Karen accede a Meta Business Manager
- Verifica el número de WhatsApp Business dedicado
- Obtener: Token de acceso permanente, Phone Number ID, Webhook Secret

### Paso 2: Webhook en Next.js
```
src/pages/api/whatsapp/
├── webhook.ts    ← GET (verificación Meta) + POST (mensajes entrantes)
└── send.ts       ← envía mensajes salientes
```
- Verificación de firma HMAC-SHA256 (seguridad obligatoria de Meta)
- Respuesta 200 inmediata antes de procesar (Meta requiere <1s)
- Procesamiento asíncrono del mensaje

### Paso 3: Base de conocimiento en Supabase
```sql
-- Tabla principal
knowledge_base (
  id, categoria, pregunta, respuesta, activa, created_at
)

-- Preguntas sin respuesta (aprendizaje)
unanswered_questions (
  id, pregunta, frecuencia, ultimo_intento, resuelta
)

-- Historial de conversaciones
conversations (
  id, phone_number, mensaje, rol, timestamp
)
```
Carga inicial: todo el contenido del system prompt (servicios, precios, FAQ, políticas).

### Paso 4: Motor de respuesta con Claude
```
src/lib/
├── chatbot.ts      ← motor de decisión principal
├── knowledge.ts    ← consultas a Supabase
├── whatsapp.ts     ← cliente WhatsApp Cloud API
└── claude.ts       ← cliente Claude API con system prompt
```
Flujo por mensaje:
1. Recibe mensaje → busca contexto relevante en `knowledge_base`
2. Construye prompt: system prompt + contexto + historial (últimos 10 mensajes) + pregunta
3. Claude responde — solo usa información de la base, no inventa
4. Si no hay contexto suficiente → guarda en `unanswered_questions` + escala a Karen

---

## Fase 2 — Agendamiento automático

**Objetivo:** El bot agenda citas directamente en el calendario de Karen sin intervención humana.

### Paso 5: Integrar Cal.com
```
src/lib/calendar.ts   ← cliente Cal.com API
```
- Karen configura disponibilidad en Cal.com (tipos de evento por servicio)
- Flujo de agendamiento:
  1. Bot detecta intención de agendar
  2. Recolecta: nombre, edad, servicio
  3. Consulta `GET /slots` → muestra horarios disponibles
  4. Usuario confirma → `POST /bookings` → cita creada
  5. Confirmación automática por WhatsApp con detalles y monto de anticipo

### Paso 6: Lógica de escalado inteligente
Escalar inmediatamente cuando:
- Menciones de crisis, autolesión, violencia, urgencia
- Solicitud explícita de hablar con Karen
- Pregunta clínica sobre síntomas o diagnóstico
- Queja o solicitud de reembolso
- Pregunta sin respuesta en la base de conocimiento

Notificación a Karen: mensaje de WhatsApp con resumen de la conversación.

---

## Fase 3 — Aprendizaje continuo

**Objetivo:** El bot mejora solo con el tiempo, Karen aprueba nuevas respuestas.

### Paso 7: Sistema de aprendizaje
- Cada pregunta sin respuesta → `unanswered_questions` con frecuencia acumulada
- Resumen semanal automático a Karen: "Estas preguntas llegaron esta semana y no supe responder"
- Karen responde con la respuesta correcta → entra a `knowledge_base` → bot la usa desde ese momento

### Paso 8: Panel de administración (opcional)
```
src/pages/admin/whatsapp/
├── index.tsx         ← conversaciones recientes + estado del bot
├── knowledge.tsx     ← gestionar base de conocimiento
└── unanswered.tsx    ← aprobar nuevas respuestas
```
Protegido con autenticación básica — solo Karen tiene acceso.

---

## Estructura de archivos final

```
src/
├── pages/
│   ├── api/
│   │   └── whatsapp/
│   │       ├── webhook.ts
│   │       └── send.ts
│   └── admin/
│       └── whatsapp/
│           ├── index.tsx
│           ├── knowledge.tsx
│           └── unanswered.tsx
└── lib/
    ├── whatsapp.ts
    ├── chatbot.ts
    ├── knowledge.ts
    ├── claude.ts
    └── calendar.ts

docs/proyectos/whatsapp-agent/           ← documentación del proyecto
├── CLAUDE.md
├── memory.md
├── PLAN.md
├── README.md
└── system-prompt.md
```

---

## Variables de entorno requeridas

```bash
# Meta / WhatsApp
META_WHATSAPP_TOKEN=
META_PHONE_NUMBER_ID=
META_WEBHOOK_SECRET=

# Anthropic
ANTHROPIC_API_KEY=

# Supabase
SUPABASE_URL=
SUPABASE_ANON_KEY=

# Cal.com
CALCOM_API_KEY=
```
