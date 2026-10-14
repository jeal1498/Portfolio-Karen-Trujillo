# Guía para Karen · Activar la medición (≈15 min)

Hazlo con tu cuenta de Google (karentrujillopsic@gmail.com). Desde la computadora es más fácil.

## 1. Google Analytics (GA4)
1. Entra a **analytics.google.com** → «Empezar a medir».
2. Cuenta: `Karen Trujillo` · Propiedad: `Sitio web` · Zona horaria **México (Cancún)** · Moneda **MXN**.
3. Plataforma **Web** → URL `https://www.psicologakarentrujillo.com.mx` → nombre `Sitio`. Deja activada la «medición mejorada».
4. Copia el **ID de medición** (empieza con `G-`), por ejemplo `G-AB12CD34EF`.
5. En **Vercel** → proyecto del sitio → Settings → Environment Variables → agrega:
   - Nombre: `NEXT_PUBLIC_GA_ID` · Valor: tu `G-…` · Entorno: **Production**
   - Luego Deployments → último → «Redeploy».
   (Si no tienes acceso a Vercel, pásale el `G-…` a Eduardo.)
6. Abre el sitio, toca «Aceptar» en el aviso y luego el botón de WhatsApp. En GA4 → Informes → **Tiempo real** debe aparecer `contacto_whatsapp`.

## 2. Marcar las conversiones (al día siguiente)
GA4 → Administrar → **Eventos** → activa la estrella / «Marcar como evento clave» en:
- `contacto_whatsapp`
- `contacto_llamada`
- `cita_agendada` (aparece después de la primera reserva en Cal.com)

## 3. Google Search Console
1. Entra a **search.google.com/search-console** → «Agregar propiedad».
2. Elige **Dominio** → `psicologakarentrujillo.com.mx` → copia el registro TXT y agrégalo en el DNS (Cloudflare). Si es complicado, elige **Prefijo de URL** → método «Etiqueta HTML» → copia solo el valor de `content="…"` y ponlo en Vercel como `NEXT_PUBLIC_GSC_VERIFICATION` (+ Redeploy).
3. En GA4 → Administrar → Vinculaciones de Search Console → vincular.

## 4. Google Ads (todavía sin gastar)
1. Entra a **ads.google.com**. Cuando ofrezca una «campaña inteligente», busca **«Cambiar al modo experto»** y crea la cuenta **sin campaña**.
2. País México, zona horaria Cancún, moneda **MXN** (no se puede cambiar después).
3. Herramientas → Cuentas vinculadas → **Google Analytics (GA4)** → vincular.
4. Objetivos → Conversiones → Importar → GA4 → selecciona `contacto_whatsapp`, `contacto_llamada` y `cita_agendada`.

Listo: con eso seguimos con la Fase 2 (elegir búsquedas).
