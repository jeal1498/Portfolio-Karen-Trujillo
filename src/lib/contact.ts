export const WA_NUMBER = '529983211547';
export const PHONE_NUMBER = '529983211547';

export function waUrl(message: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

/* ───────────────────────────────────────────────
   Redes sociales — única fuente de verdad
   ─────────────────────────────────────────────── */
export const SOCIAL = {
  instagram: 'https://www.instagram.com/psicologakarentrujillo',
  facebook: 'https://www.facebook.com/share/1Bs93MjeKt/',
  tiktok: 'https://www.tiktok.com/@psic.karentrujillo',
} as const;

/** Handle público de Instagram, para mostrar como texto visible. */
export const INSTAGRAM_HANDLE = '@psicologakarentrujillo';

/** Perfiles para el `sameAs` de JSON-LD (orden: Facebook, Instagram, TikTok). */
export const SOCIAL_PROFILES: string[] = [SOCIAL.facebook, SOCIAL.instagram, SOCIAL.tiktok];
