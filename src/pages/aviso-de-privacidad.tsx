import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { EMAIL, PHONE_E164 } from '@/lib/contact';
import { SITE_URL, CEDULA, ADDRESS } from '@/lib/site';

const CANONICAL_URL = `${SITE_URL}/aviso-de-privacidad`;

const AvisoDePrivacidad = () => (
  <div className="antialiased selection:bg-accent-blue selection:text-primary">
    <Head>
      <title>Aviso de Privacidad | Karen Trujillo</title>
      <meta name="description" content="Aviso de privacidad de Karen Amayrani Gómez Trujillo, Neuropsicóloga en Cancún, sobre el tratamiento de datos personales." />
      <link rel="canonical" href={CANONICAL_URL} />
      <meta name="robots" content="noindex, follow" />
    </Head>

    <Navbar />

    <main className="max-w-3xl mx-auto px-6 pt-32 pb-24">
      <h1 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-2">
        Aviso de Privacidad
      </h1>
      <p className="text-sm text-primary/50 mb-10">Última actualización: agosto de 2026</p>

      <div className="prose prose-neutral max-w-none space-y-6 text-primary/80 text-[0.95rem] leading-relaxed">
        <p>
          En cumplimiento con la Ley Federal de Protección de Datos Personales en Posesión de los
          Particulares (LFPDPPP), <strong>Karen Amayrani Gómez Trujillo</strong>, con Cédula Profesional
          Federal {CEDULA}, con domicilio en {ADDRESS.streetAddress}, {ADDRESS.addressLocality},{' '}
          {ADDRESS.addressRegion}, C.P. {ADDRESS.postalCode}, México (en adelante &quot;el Responsable&quot;),
          es responsable del tratamiento de los datos personales que usted proporcione a través de este
          sitio web.
        </p>

        <h2 className="text-xl font-serif font-bold text-primary pt-4">1. Datos personales que recabamos</h2>
        <p>
          Este sitio web no cuenta con formularios que recaben datos personales de forma directa. El
          único medio de contacto disponible es a través de los botones de WhatsApp y llamada telefónica,
          que lo redirigen a dichas plataformas externas. En consecuencia, cualquier dato personal que
          usted comparta (nombre, número telefónico, motivo de consulta, etc.) es tratado directamente por
          usted a través de WhatsApp/Meta o de su compañía telefónica, y está sujeto a las políticas de
          privacidad de dichas plataformas, no a las de este sitio.
        </p>

        <h2 className="text-xl font-serif font-bold text-primary pt-4">2. Finalidades del tratamiento</h2>
        <p>
          Cuando usted nos contacta voluntariamente por WhatsApp o teléfono, los datos que comparte en
          esa conversación son utilizados por el Responsable únicamente para:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Responder sus dudas y darle seguimiento a su solicitud de contacto.</li>
          <li>Agendar y confirmar citas de valoración neuropsicológica.</li>
        </ul>
        <p>No utilizamos sus datos para fines de mercadotecnia, publicidad o prospección comercial no solicitada, ni los compartimos con terceros.</p>

        <h2 className="text-xl font-serif font-bold text-primary pt-4">3. Transferencia de datos</h2>
        <p>
          El Responsable no transfiere sus datos personales a terceros. El uso de WhatsApp como canal de
          contacto implica que la plataforma (Meta) procesa dicha comunicación conforme a sus propias
          políticas de privacidad, ajenas a este sitio web.
        </p>

        <h2 className="text-xl font-serif font-bold text-primary pt-4">4. Derechos ARCO</h2>
        <p>
          Usted tiene derecho a Acceder, Rectificar y Cancelar sus datos personales, así como a Oponerse
          al tratamiento de los mismos (derechos ARCO), o a revocar el consentimiento que nos haya
          otorgado. Para ejercer cualquiera de estos derechos, envíe su solicitud a:
        </p>
        <p className="font-bold">{EMAIL}</p>
        <p>Su solicitud deberá incluir su nombre completo, una descripción clara del derecho que desea ejercer y cualquier documento que facilite la localización de sus datos. Responderemos en un plazo máximo de 20 días hábiles.</p>

        <h2 className="text-xl font-serif font-bold text-primary pt-4">5. Medidas de seguridad</h2>
        <p>
          Implementamos medidas administrativas y técnicas razonables para proteger sus datos personales
          contra daño, pérdida, alteración, destrucción o uso, acceso o tratamiento no autorizado.
        </p>

        <h2 className="text-xl font-serif font-bold text-primary pt-4">6. Uso de cookies</h2>
        <p>
          Este sitio utiliza Google Analytics y, en su caso, la medición de Google Ads, solo si usted lo
          acepta en el aviso de cookies. Sirven para conocer de forma estadística qué páginas se visitan,
          desde qué tipo de dispositivo y qué botones de contacto (WhatsApp, llamada, agenda) se utilizan.
          No se recopilan datos clínicos ni el contenido de sus mensajes. Si elige «Solo necesarias», no se
          guardan cookies de analítica. Puede cambiar su elección borrando los datos de este sitio en su
          navegador.
        </p>

        <h2 className="text-xl font-serif font-bold text-primary pt-4">7. Cambios al aviso de privacidad</h2>
        <p>
          Nos reservamos el derecho de modificar este aviso de privacidad en cualquier momento. Cualquier
          cambio será publicado en esta misma página.
        </p>

        <h2 className="text-xl font-serif font-bold text-primary pt-4">8. Contacto</h2>
        <p>
          Para dudas relacionadas con este aviso de privacidad, puede contactarnos en {EMAIL} o al
          teléfono {PHONE_E164}.
        </p>
      </div>
    </main>

    <Footer />
  </div>
);

export default AvisoDePrivacidad;
