export const WA_NUMBER = '529983211547';
export const PHONE_NUMBER = '529983211547';
/** Teléfono en formato E.164, para `telephone` en JSON-LD. */
export const PHONE_E164 = '+529983211547';

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

/**
 * URLs de directorios clínicos (T-12).
 * Añade la URL del perfil aquí una vez que Karen lo cree en cada plataforma.
 * Propagará automáticamente a sameAs en todos los schemas JSON-LD del sitio.
 *
 * Doctoralia:      https://www.doctoralia.com.mx/psicologos/...
 * Psychology Today: https://www.psychologytoday.com/mx/therapists/...
 * Top Doctors:     https://www.topdoctors.mx/...
 * Google Business: https://maps.google.com/?cid=4630406520710891531
 */
export const DIRECTORY_PROFILES: string[] = [
  // Descomentar y reemplazar con URL real al crear cada perfil:
  // 'https://www.doctoralia.com.mx/psicologos/karen-trujillo',
  // 'https://www.psychologytoday.com/mx/therapists/karen-trujillo',
  // 'https://www.topdoctors.mx/doctor/karen-trujillo',
  'https://maps.google.com/?cid=4630406520710891531',
];

/** Todos los perfiles para `sameAs` en JSON-LD (redes sociales + directorios). */
export const SOCIAL_PROFILES: string[] = [
  SOCIAL.facebook,
  SOCIAL.instagram,
  SOCIAL.tiktok,
  ...DIRECTORY_PROFILES,
];
