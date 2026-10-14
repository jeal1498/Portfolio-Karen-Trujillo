import { useEffect, useState } from 'react';
import Link from 'next/link';
import { GA_ID, readConsent, setConsent, type Consent } from '@/lib/analytics';

/** Aviso de cookies de analítica. Solo aparece si GA está configurado y no hay elección guardada. */
const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (GA_ID && readConsent() === null) setVisible(true);
  }, []);

  if (!visible) return null;

  const elegir = (v: Consent) => {
    setConsent(v);
    setVisible(false);
  };

  return (
    <div
      role="region"
      aria-label="Aviso de cookies"
      className="fixed inset-x-3 bottom-3 z-[70] mx-auto max-w-xl rounded-2xl border bg-white p-4 text-sm sm:inset-x-6 sm:bottom-6"
      style={{ borderColor: 'rgba(56,47,81,0.15)', boxShadow: '0 8px 30px rgba(56,47,81,0.18)', color: '#382f51' }}
    >
      <p className="leading-relaxed">
        Usamos cookies de Google Analytics para saber qué páginas ayudan a las familias y mejorar el sitio.
        No recopilamos datos clínicos.{' '}
        <Link href="/aviso-de-privacidad" className="underline underline-offset-2">
          Aviso de privacidad
        </Link>
      </p>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => elegir('granted')}
          className="min-h-[44px] flex-1 rounded-xl px-4 font-bold text-xs uppercase tracking-widest text-white hover:brightness-110"
          style={{ background: '#382f51' }}
        >
          Aceptar
        </button>
        <button
          type="button"
          onClick={() => elegir('denied')}
          className="min-h-[44px] flex-1 rounded-xl border px-4 font-bold text-xs uppercase tracking-widest hover:bg-black/5"
          style={{ borderColor: 'rgba(56,47,81,0.25)' }}
        >
          Solo necesarias
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;
