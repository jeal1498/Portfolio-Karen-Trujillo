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
      <meta name="description" content="Aviso de privacidad de Karen Amairani Gómez Trujillo, Neuropsicóloga en Cancún, sobre el tratamiento de datos personales." />
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
          Particulares (LFPDPPP), <strong>Karen Amairani Gómez Trujillo</strong>, con Cédula Profesional
          Federal {CEDULA}, con domicilio en {ADDRESS.streetAddress}, {ADDRESS.addressLocality},{' '}
          {ADDRESS.addressRegion}, C.P. {ADDRESS.postalCode}, México (en adelante &quot;el Responsable&quot;),
          es responsable del tratamiento de los datos personales que usted proporcione a través de este
          sitio web.
        </p>

        <h2 className="text-xl font-serif font-bold text-primary pt-4">1. Datos personales que recabamos</h2>
        <p>
          A través del formulario de descarga de materiales gratuitos (checklists), recabamos los
          siguientes datos personales:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Nombre</li>
          <li>Correo electrónico</li>
        </ul>
        <p>
          Si usted nos contacta por WhatsApp o teléfono, el tratamiento de esos datos está sujeto
          adicionalmente a las políticas de privacidad de la plataforma correspondiente (WhatsApp/Meta).
        </p>

        <h2 className="text-xl font-serif font-bold text-primary pt-4">2. Finalidades del tratamiento</h2>
        <p>Sus datos personales serán utilizados para las siguientes finalidades:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Enviarle el material informativo (checklist) que solicitó.</li>
          <li>Responder sus dudas y darle seguimiento a su solicitud de contacto.</li>
          <li>Agendar y confirmar citas de valoración neuropsicológica.</li>
        </ul>
        <p>No utilizamos sus datos para fines de mercadotecnia, publicidad o prospección comercial no solicitada, ni los compartimos con terceros.</p>

        <h2 className="text-xl font-serif font-bold text-primary pt-4">3. Transferencia de datos</h2>
        <p>
          Sus datos no serán transferidos a terceros, salvo a los proveedores de servicios estrictamente
          necesarios para operar este sitio (por ejemplo, el proveedor de envío de correo electrónico que
          entrega el material solicitado), quienes están obligados a resguardar su confidencialidad.
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
          Este sitio no utiliza cookies de rastreo, píxeles de seguimiento ni servicios de analítica de
          terceros.
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
