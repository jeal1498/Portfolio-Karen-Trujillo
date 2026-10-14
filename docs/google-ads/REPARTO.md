# Quién hace qué · Plan de Google Ads

Tres partes: **A · Claude Code** (esta app, código y análisis), **B · Claude en Chrome** (navegador con las sesiones de Karen abiertas) y **C · Ustedes** (Eduardo / Karen en persona).
Orden sugerido: C1 → B1 → C2 → B2 → A1 → B3 → C3.

---

## A · Claude Code (lo hago yo)
- [x] Medición en el sitio: GA4 + aviso de cookies + eventos (Fase 1).
- [x] Borradores: palabras clave, negativas, anuncios y revisión de páginas (Fase 2).
- [ ] **A1 · Ajustar con datos reales:** con el CSV del Planificador y de Search Console, dejar la lista final de palabras clave y presupuesto por grupo.
- [ ] **A2 · Cambios en páginas** (si se aprueban): precio total arriba, botón de 9 px más grande.
- [ ] **A3 · Si `cita_agendada` no llega** en la prueba: conectar Cal.com por webhook o `embed.js`.
- [ ] **A4 · Semanal, ya con anuncios:** leer los reportes exportados y decir qué apagar y dónde mover dinero.
- [ ] **A5 · Panel de Looker Studio:** diseño y lista de gráficas (lo arma B).

## B · Claude en Chrome (copiar y pegar cada instrucción)
Requisito: que Karen ya haya iniciado sesión en Google (karentrujillopsic@gmail.com) y en Vercel en ese Chrome.

**B1 · Google Analytics + Vercel**
> En analytics.google.com crea una cuenta «Karen Trujillo» con una propiedad «Sitio web» (zona horaria México – Cancún, moneda MXN) y un flujo web para https://www.psicologakarentrujillo.com.mx con la medición mejorada activada. Dame el ID de medición (G-…). Luego en vercel.com abre el proyecto del sitio → Settings → Environment Variables y agrega `NEXT_PUBLIC_GA_ID` con ese ID solo en Production. Después ve a Deployments y haz «Redeploy» del último despliegue de producción. Si algo pide pago, contraseña o código de verificación, detente y avísame.

**B2 · Search Console + vinculaciones** (un día después de B1)
> 1) En search.google.com/search-console agrega la propiedad con «Prefijo de URL» https://www.psicologakarentrujillo.com.mx, método «Etiqueta HTML». Copia solo el valor de content="…", agrégalo en Vercel como `NEXT_PUBLIC_GSC_VERIFICATION` (Production), haz Redeploy, espera a que termine y pulsa «Verificar».
> 2) En Google Analytics → Administrar → Vinculaciones de Search Console, vincula esa propiedad.
> 3) En Google Analytics → Administrar → Eventos, marca como evento clave `contacto_whatsapp` y `contacto_llamada` (y `cita_agendada` si ya aparece).
> 4) En ads.google.com (la cuenta ya creada por Karen) → Herramientas → Cuentas vinculadas → Google Analytics: vincula la propiedad. Luego Objetivos → Conversiones → Importar → Google Analytics 4: importa `contacto_whatsapp`, `contacto_llamada` y `cita_agendada`.
> No cambies métodos de pago ni crees campañas. Dime al final qué quedó hecho y qué no.

**B3 · Datos para ajustar** (cuando Ads ya esté creada)
> 1) En Google Ads → Herramientas → Planificador de palabras clave → «Obtener volumen de búsqueda y previsiones». Pega la lista de palabras de `docs/google-ads/PALABRAS-CLAVE.md` (te la pego abajo), ubicación Cancún, Quintana Roo, idioma español, últimos 12 meses. Descarga el CSV.
> 2) En Search Console → Rendimiento → últimos 3 meses → Exportar → CSV.
> 3) En pagespeed.web.dev mide en Móvil estas 3 URLs y dime el puntaje y el LCP de cada una: /evaluacion-tdah-ninos, /evaluacion-tdah-adultos, /evaluacion-autismo-cancun.
> Al final dame los dos CSV.
→ Los CSV se pasan a Claude Code (A1).

**B4 · Armar la campaña EN PAUSA** (después de A1)
> En Google Ads crea una campaña nueva de **Búsqueda** (sin Display ni socios de búsqueda, sin Performance Max), objetivo «Clientes potenciales», ubicación Cancún (presencia, no interés), idioma español, presupuesto diario $[monto] MXN, puja «Maximizar clics» con CPC máximo $[monto]. Crea 3 grupos de anuncios con las palabras clave y los anuncios del archivo que te pego, más las palabras negativas a nivel campaña y las extensiones. **Deja la campaña en PAUSA**, no la actives. Dime el resumen al final.

**B5 · Panel Looker Studio** (2–4 semanas después de lanzar)
> En lookerstudio.google.com crea un informe con fuentes Google Ads, Google Analytics 4 y Search Console del sitio, con las gráficas que te paso (diseño de A5).

## C · Ustedes en persona
- [ ] **C1 · Iniciar sesión** en Chrome con la cuenta de Google de Karen y en Vercel (y Cloudflare si se usa).
- [ ] **C2 · Crear la cuenta de Google Ads** en ads.google.com: elegir **«Cambiar al modo experto»**, crear **sin campaña**, país México, zona Cancún, **moneda MXN** (no se cambia después), aceptar términos y **poner la tarjeta de pago**.
- [ ] **C3 · Revisar y activar la campaña** que dejó B4 en pausa. Aquí empieza el gasto.
- [ ] Probar: abrir el sitio en el celular, «Aceptar» cookies, tocar WhatsApp (sirve para comprobar B1).
- [ ] Hacer **1 reserva de prueba en Cal.com** y cancelarla (para confirmar `cita_agendada`).
- [ ] **Confirmar precios** vigentes: $8,300 / $8,300 / $8,500 / $10,500.
- [ ] **Decidir:** presupuesto (sugerido $150–200 MXN/día por 4 semanas), fecha de arranque, y si se aplican los cambios de A2.
- [ ] Contestar códigos de verificación (2FA) cuando Claude en Chrome los pida.
- [ ] Ya con anuncios: preguntar a cada paciente «¿cómo nos encontraste?».
