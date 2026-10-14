# Plan de medición y Google Ads

> Leer esto primero para continuar en una conversación nueva.
> Creado: 14 oct 2026. Estado actual: **Fase 1 hecha en código, falta que Karen cree sus cuentas** (ver `GUIA-KAREN.md`).

## Objetivo
Antes de invertir en Google Ads, medir qué trae pacientes. La métrica que importa es el **costo por mensaje de WhatsApp** y luego el **costo por paciente que agenda**, no los clics.

## Regla clave para elegir búsquedas
No pagar por las búsquedas que **más** se hacen, sino por las de **más intención de agendar**.
- ❌ «qué es el TDAH», «síntomas autismo» → informativas: se ganan gratis con el blog.
- ✅ «evaluación TDAH Cancún», «neuropsicóloga Cancún», «diagnóstico autismo Cancún» → quien busca quiere cita: aquí sí se paga.

## Fases

### Fase 1 · Medir — ✅ código listo (14 oct 2026)
Hecho en el sitio:
- `src/lib/analytics.ts`: ID de GA4 desde `NEXT_PUBLIC_GA_ID`, consentimiento y `track()`. **Sin esa variable no se carga nada.**
- `src/components/Analytics.tsx`: carga gtag con **Consent Mode v2** (todo `denied` hasta que se acepte) y mide con un solo listener global:
  | Evento | Cuándo | Parámetros |
  |---|---|---|
  | `contacto_whatsapp` | clic en cualquier enlace `wa.me` | `pagina`, `boton` |
  | `contacto_llamada` | clic en `tel:` | `pagina`, `boton` |
  | `contacto_correo` | clic en `mailto:` | `pagina`, `boton` |
  | `agendar_cita` | clic en un enlace a `cal.com` (hoy Cal.com va en iframe, casi no hay enlaces) | `pagina`, `servicio` |
  | `cita_agendada` | Cal.com (iframe) avisa `bookingSuccessful…` por postMessage — **sin probar con una reserva real** | `pagina` |
- `src/components/CookieBanner.tsx`: aviso «Aceptar / Solo necesarias» (se guarda en `localStorage` `kt-consent`).
- `aviso-de-privacidad.tsx` §6 actualizado: ya menciona Google Analytics/Ads con consentimiento.
- `_document.tsx`: meta opcional de Search Console con `NEXT_PUBLIC_GSC_VERIFICATION`.
- Probado con build de producción + Chromium: banner, consentimiento (default/update, recuerda la elección) y eventos de WhatsApp y llamada en `dataLayer`.

Falta (lo hace Karen, `GUIA-KAREN.md`):
- [ ] Crear propiedad GA4 y poner `NEXT_PUBLIC_GA_ID` en Vercel → redeploy.
- [ ] Marcar como **eventos clave**: `contacto_whatsapp`, `contacto_llamada`, `cita_agendada`.
- [ ] Search Console verificado y vinculado a GA4.
- [ ] Cuenta de Google Ads en **modo experto** (no campaña inteligente), vinculada a GA4, con los eventos clave importados como conversiones.
- [ ] Confirmar `cita_agendada` con una reserva de prueba en Cal.com (si no llega, usar los webhooks de Cal.com).

### Fase 2 · Elegir búsquedas (semana 2)
- Lista de palabras clave para Cancún con volumen y CPC (Planificador de palabras clave de Google Ads, ya con la cuenta creada).
- 3 grupos de anuncios = 3 páginas de servicio: TDAH niños (`/evaluacion-tdah-ninos`), TDAH adultos (`/evaluacion-tdah-adultos`), autismo (`/evaluacion-autismo-cancun`). Posible 4º: WISC-V (`/evaluacion-ci-wisc-v-cancun`).
- Concordancia de frase/exacta. **Palabras negativas**: gratis, gratuito, test online, curso, diplomado, trabajo, empleo, vacante, qué es, síntomas, pdf, imss, seguro social (revisar), etc.
- Entregable: tabla «pagar» vs «ganar con el blog» → guardarla en esta carpeta (`PALABRAS-CLAVE.md`).

### Fase 3 · Lanzar en pequeño (semanas 3–6)
- Campaña **solo Búsqueda** (sin Display ni Performance Max), ubicación Cancún (+ radio razonable), idioma español.
- Cada anuncio lleva a **su página de servicio**, no al inicio.
- Presupuesto de prueba: **~$150–200 MXN/día por 4 semanas**.
- Puja: empezar con «Maximizar clics» con tope de CPC; pasar a «Maximizar conversiones» cuando haya ~15–30 conversiones.
- Extensiones: llamada, ubicación (Perfil de Google: `https://maps.google.com/?cid=4630406520710891531`), enlaces a servicios.

### Fase 4 · Ajustar y ver (desde semana 4)
- Panel en **Looker Studio**: gasto → clics → WhatsApp → costo por mensaje, por servicio (fuentes: Google Ads, GA4, Search Console).
- Apagar lo que no trae mensajes; mover dinero al servicio con menor costo por mensaje.
- Preguntar en WhatsApp «¿cómo nos encontraste?» para cruzar con los datos.

## Decisiones tomadas
- No se construye un dashboard propio: GA4 + Looker Studio es lo profesional y gratuito. Un panel propio (citas de Cal.com + agente de WhatsApp) solo cuando el agente esté en producción.
- Medición con consentimiento (Consent Mode v2) por privacidad de pacientes; nunca se envían datos clínicos ni el texto de los mensajes.
- Eduardo coordina este trabajo; Karen crea las cuentas de Google con su correo.
