/* ───────────────────────────────────────────────
   Analítica (GA4) — única fuente de verdad
   Se activa solo si existe NEXT_PUBLIC_GA_ID (Vercel → Environment Variables).
   Consent Mode v2: todo empieza en "denied"; el banner lo cambia a "granted".
   ─────────────────────────────────────────────── */

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? '';
export const CONSENT_KEY = 'kt-consent'; // 'granted' | 'denied'

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: Gtag;
    dataLayer?: unknown[];
  }
}

export type Consent = 'granted' | 'denied';

export function readConsent(): Consent | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === 'granted' || v === 'denied' ? v : null;
  } catch {
    return null;
  }
}

export function setConsent(value: Consent): void {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* modo privado: la elección dura solo esta visita */
  }
  window.gtag?.('consent', 'update', {
    analytics_storage: value,
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
  });
}

/** Envía un evento a GA4. No hace nada si GA no está configurado. */
export function track(event: string, params: Record<string, string> = {}): void {
  if (!GA_ID) return;
  window.gtag?.('event', event, params);
}

/**
 * Clasifica un enlace de contacto. Los nombres de evento son los que se marcan
 * como "eventos clave" en GA4 y se importan como conversiones en Google Ads.
 */
export function contactEvent(href: string): { event: string; servicio?: string } | null {
  // Botón principal de las páginas de servicio: baja al calendario de Cal.com.
  if (href === '#agendar' || href.endsWith('#agendar')) return { event: 'clic_agendar' };
  if (href.includes('wa.me/') || href.includes('api.whatsapp.com')) return { event: 'contacto_whatsapp' };
  if (href.startsWith('tel:')) return { event: 'contacto_llamada' };
  if (href.startsWith('mailto:')) return { event: 'contacto_correo' };
  if (href.includes('cal.com/')) {
    const servicio = href.split('?')[0].split('/').filter(Boolean).pop() ?? '';
    return { event: 'agendar_cita', servicio };
  }
  return null;
}
