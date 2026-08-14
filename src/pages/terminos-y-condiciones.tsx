import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { EMAIL, PHONE_E164 } from '@/lib/contact';
import { SITE_URL, CEDULA, ADDRESS } from '@/lib/site';

const CANONICAL_URL = `${SITE_URL}/terminos-y-condiciones`;

const TerminosYCondiciones = () => (
  <div className="antialiased selection:bg-accent-blue selection:text-primary">
    <Head>
      <title>Términos y Condiciones | Karen Trujillo</title>
      <meta name="description" content="Términos y condiciones de uso del sitio web de Karen Amairani Gómez Trujillo, Neuropsicóloga en Cancún." />
      <link rel="canonical" href={CANONICAL_URL} />
      <meta name="robots" content="noindex, follow" />
    </Head>

    <Navbar />

    <main className="max-w-3xl mx-auto px-6 pt-32 pb-24">
      <h1 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-2">
        Términos y Condiciones
      </h1>
      <p className="text-sm text-primary/50 mb-10">Última actualización: agosto de 2026</p>

      <div className="prose prose-neutral max-w-none space-y-6 text-primary/80 text-[0.95rem] leading-relaxed">
        <p>
          El presente documento establece los términos y condiciones de uso del sitio web{' '}
          {SITE_URL}, operado por <strong>Karen Amairani Gómez Trujillo</strong>, Neuropsicóloga con
          Cédula Profesional Federal {CEDULA}, con domicilio en {ADDRESS.streetAddress},{' '}
          {ADDRESS.addressLocality}, {ADDRESS.addressRegion}, México (en adelante &quot;el Sitio&quot;).
          Al utilizar este Sitio, usted acepta los siguientes términos.
        </p>

        <h2 className="text-xl font-serif font-bold text-primary pt-4">1. Naturaleza del contenido</h2>
        <p>
          El contenido publicado en este Sitio, incluyendo artículos del blog, checklists descargables y
          material informativo, tiene fines exclusivamente informativos y de divulgación. No sustituye una
          consulta, evaluación o diagnóstico neuropsicológico realizado de forma directa y personalizada.
        </p>

        <h2 className="text-xl font-serif font-bold text-primary pt-4">2. Servicios ofrecidos</h2>
        <p>
          Las valoraciones neuropsicológicas y demás servicios clínicos anunciados en este Sitio se
          prestan de forma presencial, previa cita, y están sujetos a la evaluación profesional
          correspondiente. Los precios publicados son referenciales y pueden estar sujetos a cambios sin
          previo aviso.
        </p>

        <h2 className="text-xl font-serif font-bold text-primary pt-4">3. Uso del material descargable</h2>
        <p>
          Los checklists y demás materiales descargables se proporcionan de forma gratuita a cambio de
          datos de contacto (nombre y correo electrónico) y son de uso personal. Queda prohibida su
          reproducción, distribución o comercialización sin autorización previa.
        </p>

        <h2 className="text-xl font-serif font-bold text-primary pt-4">4. Propiedad intelectual</h2>
        <p>
          Todo el contenido del Sitio (textos, imágenes, logotipos y materiales descargables) es propiedad
          de Karen Amairani Gómez Trujillo o se utiliza con la debida autorización, y está protegido por
          las leyes de propiedad intelectual aplicables. Queda prohibida su reproducción total o parcial
          sin autorización previa y por escrito.
        </p>

        <h2 className="text-xl font-serif font-bold text-primary pt-4">5. Agendamiento por WhatsApp</h2>
        <p>
          El agendamiento de citas a través de WhatsApp es un canal de contacto directo y no constituye
          una cita confirmada hasta que sea validada por el consultorio. El uso de WhatsApp está sujeto,
          adicionalmente, a los términos y políticas de privacidad de dicha plataforma (Meta).
        </p>

        <h2 className="text-xl font-serif font-bold text-primary pt-4">6. Limitación de responsabilidad</h2>
        <p>
          El Sitio y su contenido se ofrecen &quot;tal cual&quot;. No se garantiza que la información
          publicada esté libre de errores u omisiones. El uso de la información contenida en el Sitio es
          responsabilidad exclusiva del usuario.
        </p>

        <h2 className="text-xl font-serif font-bold text-primary pt-4">7. Enlaces a terceros</h2>
        <p>
          Este Sitio puede contener enlaces a sitios de terceros (redes sociales, WhatsApp, Google Maps).
          No nos hacemos responsables por el contenido o las políticas de privacidad de dichos sitios.
        </p>

        <h2 className="text-xl font-serif font-bold text-primary pt-4">8. Modificaciones</h2>
        <p>
          Nos reservamos el derecho de modificar estos Términos y Condiciones en cualquier momento. Los
          cambios entrarán en vigor a partir de su publicación en esta misma página.
        </p>

        <h2 className="text-xl font-serif font-bold text-primary pt-4">9. Legislación aplicable</h2>
        <p>
          Estos términos se rigen por las leyes vigentes en los Estados Unidos Mexicanos. Cualquier
          controversia se someterá a los tribunales competentes del estado de Quintana Roo.
        </p>

        <h2 className="text-xl font-serif font-bold text-primary pt-4">10. Contacto</h2>
        <p>
          Para dudas relacionadas con estos Términos y Condiciones, puede contactarnos en {EMAIL} o al
          teléfono {PHONE_E164}.
        </p>
      </div>
    </main>

    <Footer />
  </div>
);

export default TerminosYCondiciones;
