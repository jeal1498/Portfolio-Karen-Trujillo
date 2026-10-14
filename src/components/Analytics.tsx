import { useEffect } from 'react';
import Script from 'next/script';
import { CONSENT_KEY, GA_ID, contactEvent, track } from '@/lib/analytics';

/**
 * Carga GA4 con Consent Mode v2 y mide los clics de contacto
 * (WhatsApp, llamada, correo, Cal.com) con un solo listener global,
 * así no hay que tocar cada botón del sitio.
 */
const Analytics = () => {
  useEffect(() => {
    if (!GA_ID) return;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a');
      const href = a?.getAttribute('href');
      if (!a || !href) return;
      const hit = contactEvent(href);
      if (!hit) return;
      const etiqueta = (a.getAttribute('aria-label') || a.textContent || '').trim().slice(0, 80);
      track(hit.event, {
        pagina: window.location.pathname,
        boton: etiqueta,
        ...(hit.servicio ? { servicio: hit.servicio } : {}),
      });
    };
    // Cal.com va embebido en un iframe: avisa la reserva con postMessage.
    const onMessage = (e: MessageEvent) => {
      if (!/^https:\/\/([a-z0-9-]+\.)*cal\.com$/.test(e.origin)) return;
      const tipo = (e.data as { type?: unknown } | null)?.type;
      if (typeof tipo === 'string' && tipo.startsWith('bookingSuccessful')) track('cita_agendada', { pagina: window.location.pathname });
    };
    document.addEventListener('click', onClick, { capture: true });
    window.addEventListener('message', onMessage);
    return () => {
      document.removeEventListener('click', onClick, { capture: true });
      window.removeEventListener('message', onMessage);
    };
  }, []);

  if (!GA_ID) return null;

  return (
    <>
      <Script id="ga-consent" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;
var c='denied';try{if(localStorage.getItem('${CONSENT_KEY}')==='granted')c='granted';}catch(e){}
gtag('consent','default',{analytics_storage:c,ad_storage:c,ad_user_data:c,ad_personalization:c,wait_for_update:500});
gtag('js',new Date());gtag('config','${GA_ID}');`}
      </Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
    </>
  );
};

export default Analytics;
