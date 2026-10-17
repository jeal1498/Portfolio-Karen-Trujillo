# Integración Resend — Lead Magnets

## Archivos creados

| Archivo | Función |
|---------|---------|
| `src/pages/api/lead-magnet.ts` | API route — valida input, lee PDF, envía email con adjunto |
| `src/components/LeadMagnetForm.tsx` | Formulario React reutilizable (nombre + email + botón) |
| `public/downloads/` | Carpeta donde van los PDFs generados |
| `.env.example` | Plantilla de variables de entorno |

---

## Pasos para activar

### 1. Crear cuenta en Resend

Ir a [resend.com](https://resend.com) → crear cuenta gratuita.
Plan gratuito: **3,000 emails/mes** — suficiente para empezar.

### 2. Verificar el dominio

En Resend → Domains → Add Domain → ingresar `psicologakarentrujillo.com.mx`.
Resend entregará 3 registros DNS (TXT + MX o CNAME). Agregarlos en el panel de DNS del dominio.
La verificación tarda 10–30 minutos.

> Si no se puede verificar el dominio todavía, usar `onboarding@resend.dev` como remitente
> (solo funciona para emails a tu propia cuenta — solo para pruebas).

### 3. Crear API Key

Resend → API Keys → Create API Key.
Permiso mínimo necesario: **Sending access**.
Copiar la clave (empieza con `re_`).

### 4. Configurar variables de entorno

**Local:**
```bash
# Crear .env.local (no commitear — está en .gitignore)
cp .env.example .env.local
# Editar .env.local y pegar la API key real
```

**Vercel (producción):**
Dashboard de Vercel → proyecto → Settings → Environment Variables → agregar:
```
RESEND_API_KEY = re_tu_clave_real
```

### 5. Colocar los PDFs generados

Una vez generados los PDFs (ver `docs/lead-magnets/pdf-brief.md`):
```
public/downloads/checklist-tdah-ninos.pdf
public/downloads/checklist-tdah-adultos.pdf
```
Commitear ambos archivos al repo.

### 6. Usar el componente en una página

```tsx
import LeadMagnetForm from '@/components/LeadMagnetForm';

// En un artículo de blog sobre TDAH en niños:
<LeadMagnetForm
  lead="tdah-ninos"
  headline="Descarga el checklist gratuito"
  description="Para llevar a la próxima consulta con el médico de tu hijo."
/>

// En un artículo sobre TDAH adultos:
<LeadMagnetForm
  lead="tdah-adultos"
  headline="¿Reconoces estos patrones?"
  description="Descarga el checklist y llévalo a tu próxima consulta."
/>
```

---

## Cómo probar localmente

```bash
# 1. Asegurarse de tener .env.local con RESEND_API_KEY real
# 2. Colocar un PDF de prueba en public/downloads/
cp any.pdf public/downloads/checklist-tdah-ninos.pdf

# 3. Levantar el servidor
npm run dev

# 4. Probar el endpoint directamente
curl -X POST http://localhost:3000/api/lead-magnet \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"tu@email.com","lead":"tdah-ninos"}'

# Respuesta esperada: {"ok":true}
```

---

## Errores comunes

| Error | Causa | Solución |
|-------|-------|----------|
| `RESEND_API_KEY no configurada` | Falta la env var | Agregar en `.env.local` o Vercel |
| `PDF no disponible aún` (503) | PDF no existe en `public/downloads/` | Generar y commitear el PDF |
| `validation_error` de Resend | Dominio no verificado | Verificar dominio o usar `onboarding@resend.dev` para pruebas |
| Email llega a spam | Dominio no verificado o sin SPF/DKIM | Completar verificación DNS en Resend |

---

## Flujo completo

```
Usuario llena formulario
      ↓
POST /api/lead-magnet
      ↓
Validación (nombre, email, tipo)
      ↓
Lee PDF de /public/downloads/
      ↓
Resend.emails.send() con adjunto
      ↓
{ ok: true } → componente muestra pantalla de éxito
      ↓
Usuario recibe email con PDF adjunto + link WhatsApp
```
