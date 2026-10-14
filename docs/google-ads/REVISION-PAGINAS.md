# Revisión de páginas de destino · Fase 2

Revisadas en código (14 oct 2026): `/evaluacion-tdah-ninos`, `/evaluacion-tdah-adultos`, `/evaluacion-autismo-cancun`, `/evaluacion-ci-wisc-v-cancun`.

## Lo que está bien
- **El título coincide con la búsqueda:** H1 «Valoración TDAH Infantil en Cancún», «Valoración TDAH en Adultos en Cancún», «Evaluación de Autismo en Cancún». Ideal para el «nivel de calidad» de Google Ads.
- **Credenciales arriba:** cédula, años de experiencia y pruebas en el hero.
- **Botón principal claro** («Agendar valoración») que baja al calendario de Cal.com, y botón flotante de WhatsApp siempre visible.
- **Peso razonable:** ~190 kB de JS en la primera carga por página.

## Cambios hechos ahora
- Nuevo evento **`clic_agendar`**: mide el botón principal («Agendar…», `#agendar`). Antes solo se medía WhatsApp/llamada y el botón principal quedaba invisible para GA4. Es una micro-conversión (intención), **no** se importa a Google Ads como conversión principal.

## Recomendaciones (no aplicadas, decidir antes de lanzar)
1. **La conversión principal real es la reserva en Cal.com** (iframe). `cita_agendada` depende de que Cal.com mande el aviso por postMessage: **confirmar con una reserva de prueba**. Si no llega, usar webhooks de Cal.com o pasar a su `embed.js` oficial, que sí manda eventos.
2. **Precio total visible en el hero** de cada página de servicio (hoy se ve el anticipo; el total está más abajo y en `/precios`). Quien llega por anuncio compara precios: verlo pronto filtra clics que no van a comprar.
3. **Botón secundario del hero con letra de 9 px** (`text-[9px]`) en TDAH niños, autismo y WISC-V: difícil de leer en celular. Subir a `text-xs` como ya está en TDAH adultos.
4. **Velocidad en celular:** medir con PageSpeed Insights (pagespeed.web.dev) las 3 páginas antes de lanzar; meta LCP < 2.5 s.
5. **URL con UTM**: no hace falta (Google Ads usa auto-etiquetado `gclid` con GA4 vinculado).
