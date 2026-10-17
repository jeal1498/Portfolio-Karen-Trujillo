import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight, ArrowDown, Brain, FileText, CheckCircle2,
  ShieldCheck, MessageCircle, Phone, Clock, Award,
  Star, Users, CalendarCheck, Stethoscope, BookOpen, ChevronDown,
  BadgeCheck, GraduationCap, Sparkles, Target, Puzzle,
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingButtons from '@/components/layout/FloatingButtons';
import { SOCIAL_PROFILES, WA_NUMBER, PHONE_NUMBER, PHONE_E164 } from '@/lib/contact';
import { SITE_URL, CEDULA, KAREN_IMAGE, GEO, REVIEWS } from '@/lib/site';

/* ═══════════════════════════════════════════════════════════════
   CONFIG
   ═══════════════════════════════════════════════════════════════ */
const CANONICAL_URL = `${SITE_URL}/evaluacion-ci-wisc-v-cancun`;
const PRECIO = '12,000';
const WA_MESSAGE = 'Hola Karen, vi tu página de evaluación de Coeficiente Intelectual con WISC-V y me gustaría agendar una cita.';
const WA_MESSAGE_DUDAS = 'Hola Karen, vi tu página de evaluación de CI con WISC-V y tengo algunas dudas antes de agendar. ¿Podrías orientarme?';

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */

const motivos = [
  { icon: GraduationCap, titulo: 'Admisión o cambio de escuela', text: 'Algunas instituciones piden un perfil de CI actualizado como parte del proceso de admisión o para definir el grado adecuado.' },
  { icon: Sparkles, titulo: 'Sospecha de aptitudes sobresalientes', text: 'Tu hijo aprende rápido, se aburre en clase o hace preguntas muy avanzadas para su edad y quieres confirmarlo con datos objetivos.' },
  { icon: Target, titulo: 'Entender fortalezas y áreas de oportunidad', text: 'Quieres un perfil cognitivo claro: en qué destaca, dónde necesita apoyo, y cómo aprovechar mejor su forma de aprender.' },
  { icon: Puzzle, titulo: 'Complemento de otro diagnóstico', text: 'Un pediatra, psicólogo o la escuela sugirió medir el CI como parte de un estudio más amplio (aprendizaje, atención u otra condición).' },
];

const proceso = [
  { n: '01', titulo: 'Entrevista breve con padres', desc: 'Motivo de la evaluación, contexto escolar y antecedentes de desarrollo relevantes.', duracion: '30-45 min' },
  { n: '02', titulo: 'Aplicación del WISC-V', desc: 'Prueba individual, aplicada en un ambiente tranquilo y sin distracciones. Incluye descansos según la edad del niño.', duracion: '1-2 sesiones' },
  { n: '03', titulo: 'Calificación e interpretación', desc: 'Análisis de los 5 índices y el CI Total, con normas estandarizadas para población hispanohablante.', duracion: '5-7 días' },
  { n: '04', titulo: 'Sesión de devolución', desc: 'Explicación de resultados en lenguaje claro, con recomendaciones prácticas para casa y escuela.', duracion: '45-60 min' },
];

const indices = [
  { nombre: 'Comprensión Verbal', desc: 'Vocabulario, razonamiento verbal y conocimiento adquirido' },
  { nombre: 'Visoespacial', desc: 'Organización y razonamiento con información visual' },
  { nombre: 'Razonamiento Fluido', desc: 'Resolución de problemas nuevos, más allá de lo memorizado' },
  { nombre: 'Memoria de Trabajo', desc: 'Capacidad de retener y manipular información mentalmente' },
  { nombre: 'Velocidad de Procesamiento', desc: 'Rapidez y precisión al resolver tareas visuales simples' },
];

const informeIncludes = [
  'CI Total y los 5 índices del WISC-V con percentiles',
  'Perfil de fortalezas y áreas de oportunidad cognitivas',
  'Interpretación en lenguaje claro, sin tecnicismos',
  'Recomendaciones prácticas para casa y escuela',
  'Documento con validez oficial para instituciones educativas',
  'Sesión de devolución para resolver todas tus dudas',
];

const faqItems = [
  {
    q: '¿Qué es el WISC-V y qué mide exactamente?',
    a: 'El WISC-V (Escala Wechsler de Inteligencia para Niños, 5ª edición) es la prueba de coeficiente intelectual más utilizada a nivel mundial para niños y adolescentes. Mide 5 índices cognitivos —Comprensión Verbal, Visoespacial, Razonamiento Fluido, Memoria de Trabajo y Velocidad de Procesamiento— y los integra en un CI Total, comparando el desempeño del niño con normas de su misma edad.',
  },
  {
    q: '¿A qué edad se puede aplicar el WISC-V?',
    a: 'El WISC-V está validado para niños y adolescentes de 6 a 16 años y 11 meses. Fuera de ese rango se utilizan otros instrumentos: el WPPSI-IV para menores de 6 años y el WAIS-IV para mayores de 17.',
  },
  {
    q: '¿Cuánto cuesta la evaluación de CI con WISC-V en Cancún?',
    a: `La evaluación tiene un costo de $${PRECIO} MXN e incluye la entrevista inicial, la aplicación de la prueba, la calificación e interpretación de resultados, el informe clínico y la sesión de devolución.`,
  },
  {
    q: '¿Cuánto tiempo toma el proceso completo?',
    a: 'De inicio a fin, el proceso toma entre 1 y 2 semanas. La aplicación del WISC-V requiere 1 a 2 sesiones presenciales (según el ritmo del niño), seguidas de 5-7 días para la calificación y elaboración del informe, y una sesión de devolución final.',
  },
  {
    q: '¿El informe tiene validez para presentarlo en la escuela?',
    a: `Sí. El informe está respaldado por la cédula profesional federal ${CEDULA} emitida por la SEP y tiene validez oficial ante instituciones educativas en todo México.`,
  },
  {
    q: '¿Esta evaluación sirve para saber si mi hijo tiene aptitudes sobresalientes?',
    a: 'Sí, el WISC-V es el instrumento estándar para identificar aptitudes sobresalientes (CI significativamente por encima del promedio). El informe indica en qué percentil se ubica el CI Total y cada índice, y orienta sobre los siguientes pasos si el resultado lo sugiere.',
  },
  {
    q: '¿En qué se diferencia esta evaluación de la valoración de TDAH o autismo?',
    a: 'Esta evaluación aplica únicamente el WISC-V para obtener un perfil de coeficiente intelectual. Las valoraciones de TDAH y autismo son procesos más amplios que combinan el WISC-V con otras pruebas específicas (como CONNERS-3, BRIEF-2 o ADOS-2) para llegar a un diagnóstico clínico. Si además de conocer el CI necesitas descartar una condición, es mejor agendar directamente la valoración correspondiente.',
  },
  {
    q: '¿Cómo se agenda la cita?',
    a: 'El proceso se agenda directamente por WhatsApp. Escríbele a Karen con el motivo de la evaluación y ella te confirmará disponibilidad y los siguientes pasos.',
  },
  {
    q: '¿Qué pasa si el resultado no es el que esperaba?',
    a: 'El informe siempre aporta información valiosa, sin importar el resultado. Si el CI está dentro del promedio, tienes claridad de que esa no es la explicación de una dificultad puntual. Si hay áreas de oportunidad específicas, el informe te da una guía concreta para apoyarlas.',
  },
];

const reviews = [
  { name: 'Mamá de Emiliano, 9 años', text: 'La escuela nos pidió el estudio de CI para el cambio de grado. El proceso fue rápido y el informe muy claro.', stars: 5 },
  { name: 'Papá de Regina, 8 años', text: 'Sospechábamos que Regina tenía aptitudes sobresalientes y el WISC-V lo confirmó. Karen nos explicó todo con mucha paciencia.', stars: 5 },
  { name: 'Mamá de Santiago, 11 años', text: 'Necesitábamos entender por qué le costaba tanto en algunas materias. El perfil de fortalezas nos ayudó a apoyarlo mejor en casa.', stars: 5 },
];

/* ═══════════════════════════════════════════════════════════════
   SCHEMA LD+JSON
   ═══════════════════════════════════════════════════════════════ */

const physicianEntity = {
  '@type': 'Physician',
  '@id': `${SITE_URL}/#physician`,
  name: 'Karen Trujillo',
  jobTitle: 'Neuropsicóloga Clínica — Especialista en TDAH y Autismo',
  url: SITE_URL,
  image: KAREN_IMAGE,
  telephone: PHONE_E164,
  hasCredential: {
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'Cédula Profesional Federal',
    credentialId: CEDULA,
    issuedBy: { '@type': 'Organization', name: 'Secretaría de Educación Pública, México' },
  },
  medicalSpecialty: 'Neuropsychiatry',
  areaServed: {
    '@type': 'City',
    name: 'Cancún',
    sameAs: 'https://www.wikidata.org/wiki/Q8969',
    containedInPlace: { '@type': 'State', name: 'Quintana Roo', sameAs: 'https://www.wikidata.org/wiki/Q10507' },
  },
  sameAs: SOCIAL_PROFILES,
};

const clinicEntity = {
  '@type': 'MedicalClinic',
  '@id': `${SITE_URL}/#clinic`,
  name: 'Consultorio Neuropsicóloga Karen Trujillo',
  url: SITE_URL,
  telephone: PHONE_E164,
  image: KAREN_IMAGE,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'SM200 M49 L2, Hacienda de Chinconcuac Supermanzana Circuito casa 1587B',
    addressLocality: 'Cancún',
    addressRegion: 'Quintana Roo',
    postalCode: '77539',
    addressCountry: 'MX',
  },
  geo: { '@type': 'GeoCoordinates', latitude: GEO.latitude, longitude: GEO.longitude },
  medicalSpecialty: 'Neuropsychiatry',
  availableService: { '@id': `${SITE_URL}/#ci-wisc-v-service` },
  member: { '@id': `${SITE_URL}/#physician` },
};

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'MedicalWebPage',
      name: 'Evaluación de Coeficiente Intelectual (CI) con WISC-V en Cancún',
      url: CANONICAL_URL,
      description: `Evaluación de coeficiente intelectual con WISC-V para niños y adolescentes (6-16 años) en Cancún. Perfil cognitivo completo con informe oficial. Cédula federal ${CEDULA}.`,
      inLanguage: 'es-MX',
      reviewedBy: { '@id': `${SITE_URL}/#physician` },
      lastReviewed: '2026-08-22',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Evaluación de CI con WISC-V', item: CANONICAL_URL },
        ],
      },
    },
    physicianEntity,
    clinicEntity,
    {
      '@type': 'MedicalTest',
      '@id': `${SITE_URL}/#wisc-v`,
      name: 'WISC-V',
      alternateName: 'Escala Wechsler de Inteligencia para Niños — 5ª edición',
      description: 'Prueba estandarizada de coeficiente intelectual que mide Comprensión Verbal, Visoespacial, Razonamiento Fluido, Memoria de Trabajo y Velocidad de Procesamiento en niños y adolescentes de 6 a 16 años.',
      sameAs: 'https://www.wikidata.org/wiki/Q2551426',
      usesDevice: 'WISC-V Kit',
      normalRange: 'CI Total 90-109 (promedio)',
    },
    {
      '@type': 'MedicalProcedure',
      '@id': `${SITE_URL}/#ci-wisc-v-service`,
      name: 'Evaluación de Coeficiente Intelectual (CI) con WISC-V',
      procedureType: 'Diagnostic',
      howPerformed: 'Entrevista breve con padres, aplicación individual del WISC-V, calificación e interpretación de resultados, elaboración de informe y sesión de devolución.',
      preparation: 'No requiere preparación especial. Se recomienda que el niño asista descansado y desayunado.',
      followup: 'Sesión de devolución con explicación de resultados y recomendaciones prácticas.',
      status: 'EventScheduled',
      provider: { '@id': `${SITE_URL}/#physician` },
      location: { '@id': `${SITE_URL}/#clinic` },
      offers: {
        '@type': 'Offer',
        price: '12000',
        priceCurrency: 'MXN',
        description: 'Proceso completo: entrevista, aplicación del WISC-V, informe clínico y sesión de devolución.',
        availability: 'https://schema.org/InStock',
        validFrom: '2026-08-01',
        areaServed: { '@type': 'City', name: 'Cancún', sameAs: 'https://www.wikidata.org/wiki/Q8969' },
      },
    },
    ...reviews.map((r, i) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.name },
      reviewRating: { '@type': 'Rating', ratingValue: r.stars, bestRating: 5 },
      reviewBody: r.text,
      itemReviewed: { '@id': `${SITE_URL}/#physician` },
      datePublished: `2026-0${i + 1}-15`,
    })),
    {
      '@type': 'AggregateRating',
      itemReviewed: { '@id': `${SITE_URL}/#physician` },
      ratingValue: REVIEWS.ratingValue,
      reviewCount: REVIEWS.reviewCount,
      bestRating: '5',
      worstRating: '1',
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqItems.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ],
};

/* ═══════════════════════════════════════════════════════════════
   UTILITY COMPONENTS
   ═══════════════════════════════════════════════════════════════ */

function SectionReveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(el); } },
      { rootMargin: '-80px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
      style={{ transitionDelay: `${delay}s`, transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
    >
      {children}
    </div>
  );
}

function scrollToBooking(e: React.MouseEvent) {
  e.preventDefault();
  document.getElementById('agendar')?.scrollIntoView({ behavior: 'smooth' });
}

function CtaButton({ variant = 'primary', children, className = '' }: { variant?: 'primary' | 'outline'; children: React.ReactNode; className?: string }) {
  return (
    <a
      href="#agendar"
      onClick={scrollToBooking}
      className={`group inline-flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-widest px-7 py-4 rounded-2xl transition-all duration-300 text-center ${
        variant === 'primary'
          ? 'bg-gradient-primary text-primary-foreground shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/35 hover:-translate-y-1 active:translate-y-0'
          : 'border-2 border-primary/25 text-primary hover:border-primary/60 hover:bg-primary/5 hover:-translate-y-0.5'
      } ${className}`}
    >
      {children}
      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
    </a>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════ */

export default function EvaluacionCIWiscV() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [heroCTAInView, setHeroCTAInView] = useState(true);
  const heroCTARef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroCTARef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHeroCTAInView(entry.isIntersecting),
      { rootMargin: '0px 0px -80px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Head>
        <title>Evaluación de CI con WISC-V en Cancún · Niños 6-16 | Karen Trujillo</title>
        <meta name="description" content={`Evaluación de coeficiente intelectual con WISC-V en Cancún (niños y adolescentes 6-16 años). Perfil cognitivo completo, informe oficial con cédula ${CEDULA}. $${PRECIO} MXN. Agenda por WhatsApp.`} />
        <link rel="canonical" href={CANONICAL_URL} />

        <meta name="geo.region" content="MX-ROO" />
        <meta name="geo.placename" content="Cancún, Quintana Roo" />
        <meta name="geo.position" content={`${GEO.latitude};${GEO.longitude}`} />
        <meta name="ICBM" content={`${GEO.latitude}, ${GEO.longitude}`} />

        <meta property="og:type" content="website" />
        <meta property="og:locale" content="es_MX" />
        <meta property="og:site_name" content="Neuropsicóloga Karen Trujillo — Neuropsicología" />
        <meta property="og:title" content="Evaluación de CI con WISC-V en Cancún · Niños 6-16 años" />
        <meta property="og:description" content={`Perfil cognitivo completo con la prueba WISC-V. Informe con validez oficial. $${PRECIO} MXN. Agenda por WhatsApp.`} />
        <meta property="og:url" content={CANONICAL_URL} />
        <meta property="og:image" content={KAREN_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Neuropsicóloga Karen Trujillo — Especialista en TDAH y Autismo en Cancún" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Evaluación de CI con WISC-V en Cancún" />
        <meta name="twitter:description" content="Perfil cognitivo completo con la prueba WISC-V. Informe oficial. Agenda por WhatsApp. Cancún, Q. Roo." />
        <meta name="twitter:image" content={KAREN_IMAGE} />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          speakable: { '@type': 'SpeakableSpecification', cssSelector: ['#que-es-wisc-v', '#proceso-wisc-v', '#que-incluye-informe'] },
          url: CANONICAL_URL,
        }) }} />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        `}} />
      </Head>

      <div className="antialiased selection:bg-accent-blue selection:text-primary w-full min-w-0 overflow-x-hidden">
        <Navbar />

        <main className="w-full min-w-0 overflow-x-hidden">

          {/* ══════════════════════════════════════════════════════
              1 · HERO
              ══════════════════════════════════════════════════════ */}
          <section className="relative flex items-center justify-center pt-28 pb-16 px-6 overflow-hidden" style={{ background: '#2e2545' }}>
            <div aria-hidden="true" className="absolute top-0 right-0 w-[480px] h-[480px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(208,208,231,0.07) 0%, transparent 70%)' }} />
            <div aria-hidden="true" className="absolute bottom-0 left-0 w-[320px] h-[320px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(91,78,127,0.18) 0%, transparent 70%)' }} />

            <div className="max-w-4xl mx-auto relative z-10 text-center">
              <nav aria-label="Breadcrumb" className="mb-6 animate-[fadeIn_0.6s_ease-out_both]">
                <ol className="flex items-center justify-center gap-2 text-xs" style={{ color: 'rgba(208,208,231,0.6)' }}>
                  <li><Link href="/" className="hover:text-white transition-colors">Inicio</Link></li>
                  <li style={{ color: 'rgba(208,208,231,0.3)' }}>/</li>
                  <li className="text-white font-medium">Evaluación de CI con WISC-V</li>
                </ol>
              </nav>

              <div className="animate-[fadeInUp_0.8s_ease-out_both]">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 max-w-full" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(208,208,231,0.18)' }}>
                  <span className="w-2 h-2 rounded-full bg-warning animate-pulse shadow-sm shadow-warning shrink-0" />
                  <span className="text-[9px] uppercase tracking-[0.12em] font-bold text-center leading-snug" style={{ color: 'rgba(208,208,231,0.8)' }}>Cancún · Niños y adolescentes 6-16 años</span>
                </div>

                <h1 className="text-[2rem] sm:text-5xl lg:text-6xl font-serif font-bold text-white leading-[1.1] mb-4 text-balance">
                  Evaluación de Coeficiente<br className="hidden sm:block" /> Intelectual con WISC-V
                </h1>

                <p className="text-lg sm:text-2xl font-serif italic mb-6 max-w-2xl mx-auto" style={{ color: 'rgba(208,208,231,0.72)' }}>
                  Un perfil cognitivo claro, con datos objetivos
                </p>

                <p className="text-sm sm:text-lg font-light leading-relaxed mb-4 max-w-2xl mx-auto" style={{ color: 'rgba(208,208,231,0.82)' }}>
                  Ya sea por admisión escolar, sospecha de aptitudes sobresalientes o para entender cómo aprende tu hijo, el <strong className="text-white font-semibold">WISC-V</strong> es la prueba de inteligencia más utilizada a nivel mundial. Informe con <strong className="text-white font-semibold">validez oficial</strong> ante instituciones educativas.
                </p>

                <p className="text-xs sm:text-sm mb-8" style={{ color: 'rgba(208,208,231,0.6)' }}>
                  <strong className="text-white">Neuropsicóloga Karen Trujillo</strong> · Cédula Federal {CEDULA} · 7+ años de experiencia
                </p>
              </div>

              <div ref={heroCTARef} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-[fadeInUp_0.8s_ease-out_0.3s_both]">
                <CtaButton>Agendar evaluación</CtaButton>
                <a href="#para-quien" onClick={(e) => { e.preventDefault(); document.getElementById('para-quien')?.scrollIntoView({ behavior: 'smooth' }); }} className="group inline-flex items-center justify-center gap-2 font-bold text-[9px] uppercase tracking-wide px-6 py-4 rounded-xl border-2 border-white/25 text-white/80 hover:border-white/50 hover:text-white transition-all duration-300">
                  ¿Es para mi hijo?
                  <ArrowDown className="w-3 h-3 transition-transform group-hover:translate-y-0.5 shrink-0" />
                </a>
              </div>

              <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs animate-[fadeIn_0.8s_ease-out_0.6s_both]">
                {[
                  { icon: BadgeCheck, text: `Cédula ${CEDULA}` },
                  { icon: Stethoscope, text: 'Prueba estandarizada internacional' },
                  { icon: MessageCircle, text: 'Agenda por WhatsApp' },
                ].map((badge) => (
                  <span key={badge.text} className="flex items-center gap-1.5" style={{ color: 'rgba(208,208,231,0.85)' }}>
                    <badge.icon className="w-3.5 h-3.5" style={{ color: 'rgba(208,208,231,0.6)' }} />
                    <span className="font-medium">{badge.text}</span>
                  </span>
                ))}
              </div>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              2 · PARA QUIÉN ES ESTE SERVICIO
              ══════════════════════════════════════════════════════ */}
          <section id="para-quien" className="py-14 sm:py-20 bg-secondary scroll-mt-24">
            <div className="max-w-4xl mx-auto px-6">
              <SectionReveal>
                <p className="text-xs font-bold uppercase tracking-widest text-accent-blue mb-4 text-center">Motivos comunes para evaluar el CI</p>
                <h2 className="text-headline font-serif font-bold text-primary mb-4 text-center text-balance">¿Para qué sirve esta evaluación?</h2>
                <p className="text-muted-foreground font-light text-center max-w-2xl mx-auto mb-10">Familias en Cancún solicitan la evaluación de CI con WISC-V por distintas razones. Estas son las más frecuentes.</p>
              </SectionReveal>

              <div className="grid sm:grid-cols-2 gap-4">
                {motivos.map((m, i) => (
                  <SectionReveal key={m.titulo} delay={i * 0.08}>
                    <div className="flex items-start gap-4 p-5 rounded-2xl bg-card border border-border hover:border-accent-blue/50 hover:shadow-md transition-all duration-300 group relative overflow-hidden h-full">
                      <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/0 to-accent-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-blue/15 to-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                        <m.icon className="w-4 h-4 text-primary/70" />
                      </div>
                      <div className="relative z-10">
                        <h3 className="font-bold text-primary text-sm mb-1">{m.titulo}</h3>
                        <p className="text-foreground/80 font-light leading-relaxed text-sm">{m.text}</p>
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>

              <SectionReveal delay={0.3}>
                <div className="mt-10 text-center"><CtaButton>Agendar evaluación</CtaButton></div>
              </SectionReveal>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              3 · AEO DEFINITION — "¿Qué es el WISC-V?"
              ══════════════════════════════════════════════════════ */}
          <section id="que-es-wisc-v" className="py-14 sm:py-16 bg-secondary/50 border-y border-border relative overflow-hidden">
            <div className="max-w-3xl mx-auto px-6 relative">
              <SectionReveal>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-6 text-center">¿Qué es el WISC-V?</h2>
                <p className="text-muted-foreground font-light leading-relaxed mb-6 text-center max-w-2xl mx-auto">
                  El <strong className="text-primary font-semibold">WISC-V (Escala Wechsler de Inteligencia para Niños, 5ª edición)</strong> es la prueba de coeficiente intelectual más utilizada a nivel mundial para niños y adolescentes de <strong className="text-primary font-semibold">6 a 16 años y 11 meses</strong>. A diferencia de una impresión general, mide de forma objetiva cinco áreas cognitivas específicas y las integra en un <strong className="text-primary font-semibold">CI Total</strong>, comparando el desempeño del niño con normas estandarizadas de su misma edad.
                </p>

                <div className="grid sm:grid-cols-2 gap-3 mb-8">
                  {indices.map((idx) => (
                    <div key={idx.nombre} className="flex flex-col gap-0.5 px-4 py-3 bg-card border border-border rounded-2xl">
                      <span className="text-xs font-bold text-primary">{idx.nombre}</span>
                      <span className="text-xs text-muted-foreground font-light">{idx.desc}</span>
                    </div>
                  ))}
                </div>

                <div className="p-5 bg-card rounded-2xl border border-border shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-accent-blue/60 to-primary/40 rounded-l-2xl" />
                  <p className="text-sm text-muted-foreground font-light leading-relaxed pl-2">
                    <strong className="text-primary font-semibold">En Cancún, Quintana Roo</strong>, la neuropsicóloga Karen Trujillo (cédula {CEDULA}) aplica el WISC-V de forma individual y emite un informe clínico con validez oficial ante instituciones educativas.
                  </p>
                </div>
              </SectionReveal>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              4 · PROCESO
              ══════════════════════════════════════════════════════ */}
          <section id="proceso-wisc-v" className="py-14 sm:py-20 bg-card">
            <div className="max-w-4xl mx-auto px-6">
              <SectionReveal>
                <p className="text-xs font-bold uppercase tracking-widest text-accent-blue mb-4 text-center">Proceso claro y sin vueltas</p>
                <h2 className="text-headline font-serif font-bold text-primary mb-4 text-center">¿Cómo funciona la evaluación?</h2>
                <p className="text-muted-foreground font-light mb-10 text-center max-w-2xl mx-auto">
                  La evaluación de CI con WISC-V en Cancún tiene un costo de <strong className="text-primary font-semibold">${PRECIO} MXN</strong> e incluye entrevista, aplicación de la prueba, informe y sesión de devolución, en un proceso de 1 a 2 semanas.
                </p>
              </SectionReveal>

              <div className="space-y-0 relative">
                <div className="absolute left-[28px] sm:left-[32px] top-8 bottom-8 w-px bg-gradient-to-b from-primary/20 via-accent-blue/20 to-transparent hidden sm:block" />
                {proceso.map((p, i) => (
                  <SectionReveal key={p.n} delay={i * 0.08}>
                    <div className="flex gap-5 sm:gap-6 p-5 sm:p-6 bg-secondary/40 rounded-2xl border border-border hover:border-accent-blue/40 hover:bg-secondary/70 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group mb-3 relative">
                      <div className="relative shrink-0">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent-blue/10 border border-primary/15 flex items-center justify-center group-hover:border-primary/30 group-hover:scale-105 transition-all duration-300">
                          <span className="text-sm font-serif font-bold text-primary/60 group-hover:text-primary/80 transition-colors">{p.n}</span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 mb-1">
                          <h3 className="font-bold text-primary">{p.titulo}</h3>
                          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60 shrink-0 bg-secondary px-2 py-1 rounded-full">{p.duracion}</span>
                        </div>
                        <p className="text-sm text-muted-foreground font-light leading-relaxed">{p.desc}</p>
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              5 · INFORME
              ══════════════════════════════════════════════════════ */}
          <section className="py-14 sm:py-20 bg-gradient-primary text-primary-foreground w-full">
            <div className="max-w-4xl mx-auto px-6">
              <SectionReveal>
                <div id="que-incluye-informe" className="text-center mb-10">
                  <FileText className="w-10 h-10 text-accent-blue mx-auto mb-5" />
                  <h2 className="text-3xl sm:text-4xl font-serif font-bold italic mb-4">¿Qué incluye el informe?</h2>
                  <p className="text-primary-foreground/70 font-light max-w-xl mx-auto">Documento clínico con validez oficial ante instituciones educativas en todo México.</p>
                </div>
              </SectionReveal>

              <div className="grid sm:grid-cols-2 gap-3">
                {informeIncludes.map((item, i) => (
                  <SectionReveal key={item} delay={i * 0.06}>
                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/10 border border-white/15 hover:bg-white/15 transition-all duration-200">
                      <div className="w-7 h-7 rounded-full bg-accent-blue/25 border border-accent-blue/40 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-accent-blue" />
                      </div>
                      <span className="text-sm text-primary-foreground/90 font-medium leading-snug">{item}</span>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              6 · SOCIAL PROOF
              ══════════════════════════════════════════════════════ */}
          <section className="py-14 sm:py-20 bg-secondary">
            <div className="max-w-4xl mx-auto px-6">
              <SectionReveal>
                <p className="text-xs font-bold uppercase tracking-widest text-accent-blue mb-4 text-center">Lo que dicen las familias</p>
                <h2 className="text-headline font-serif font-bold text-primary mb-4 text-center">Familias en Cancún ya tienen claridad</h2>
              </SectionReveal>

              <div className="grid md:grid-cols-3 gap-5">
                {reviews.map((review, i) => (
                  <SectionReveal key={i} delay={i * 0.1}>
                    <div className="bg-card border border-border rounded-2xl p-6 hover:border-accent-blue/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 h-full flex flex-col relative overflow-hidden group">
                      <div className="absolute top-3 right-4 text-6xl font-serif text-primary/5 group-hover:text-primary/10 transition-colors leading-none select-none">&ldquo;</div>
                      <div className="flex gap-0.5 mb-4">
                        {Array.from({ length: review.stars }).map((_, j) => (
                          <Star key={j} className="w-4 h-4 text-warning fill-warning" />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground font-light leading-relaxed mb-6 flex-1 relative z-10">&ldquo;{review.text}&rdquo;</p>
                      <div className="flex items-center gap-2 pt-4 border-t border-border">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-accent-blue/20 to-primary/15 flex items-center justify-center shrink-0">
                          <span className="text-xs font-bold text-primary/60">{review.name.charAt(0)}</span>
                        </div>
                        <p className="text-xs font-bold text-primary">{review.name}</p>
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>

              <SectionReveal delay={0.3}>
                <div className="mt-10 text-center">
                  <CtaButton>Agendar mi evaluación</CtaButton>
                </div>
              </SectionReveal>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              7 · QUIÉN ES KAREN
              ══════════════════════════════════════════════════════ */}
          <section className="py-14 sm:py-20 bg-card border-t border-border relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-6 relative">
              <SectionReveal>
                <p className="text-xs font-bold uppercase tracking-widest text-accent-blue mb-4 text-center">La especialista detrás del proceso</p>
                <h2 className="font-serif font-bold text-primary mb-14 text-center">
                  <span className="block text-sm sm:text-base font-normal text-muted-foreground/70 uppercase tracking-[0.2em] mb-2">Conoce a</span>
                  <span className="block text-5xl sm:text-6xl lg:text-7xl">Karen Trujillo</span>
                </h2>
              </SectionReveal>

              <div className="grid md:grid-cols-[280px_1fr] gap-10 md:gap-14 items-start">
                <SectionReveal>
                  <div className="flex flex-col items-center md:items-start gap-5">
                    <div className="relative">
                      <div className="w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden border-2 border-border shadow-2xl shadow-primary/10">
                        <Image
                          src={KAREN_IMAGE}
                          alt="Neuropsicóloga Karen Trujillo — especialista en evaluación de CI en Cancún"
                          width={256}
                          height={256}
                          className="w-full h-full object-cover object-top"
                          loading="lazy"
                          unoptimized
                        />
                      </div>
                      <div className="absolute -bottom-4 -right-4 bg-gradient-primary text-primary-foreground rounded-2xl px-4 py-2 shadow-xl shadow-primary/25">
                        <p className="text-[9px] font-bold uppercase tracking-widest text-primary-foreground/70">Cédula Federal</p>
                        <p className="text-sm font-bold font-mono">{CEDULA}</p>
                      </div>
                    </div>

                    <div className="text-center md:text-left">
                      <h3 className="text-xl font-serif font-bold text-primary mb-1">Karen Trujillo</h3>
                      <p className="text-sm text-muted-foreground font-light">Neuropsicóloga Clínica</p>
                      <p className="text-xs text-accent-blue font-medium mt-1">Especialista en TDAH · Autismo · TEA</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 w-full">
                      {[
                        { valor: '7+', label: 'años de experiencia' },
                        { valor: '500+', label: 'valoraciones realizadas' },
                        { valor: '47+', label: 'reseñas 5 estrellas' },
                        { valor: 'SEP', label: 'cédula validada' },
                      ].map((stat) => (
                        <div key={stat.label} className="bg-secondary/60 border border-border rounded-xl p-3 text-center">
                          <p className="text-base font-serif font-bold text-primary">{stat.valor}</p>
                          <p className="text-xs text-muted-foreground font-light leading-tight mt-0.5">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </SectionReveal>

                <SectionReveal delay={0.15}>
                  <div className="space-y-6">
                    <div className="space-y-4 text-muted-foreground font-light leading-relaxed">
                      <p>La <strong className="text-primary font-semibold">neuropsicóloga Karen Trujillo</strong> es especialista clínica con más de 7 años de experiencia aplicando pruebas cognitivas estandarizadas, incluyendo el WISC-V, a niños y adolescentes en Cancún, Quintana Roo.</p>
                      <p>Cada evaluación de CI sigue un protocolo riguroso: entrevista para entender el motivo de la consulta, aplicación individual de la prueba en un ambiente cómodo para el niño, y una interpretación de resultados que va más allá del número.</p>
                      <p>Lo que distingue su práctica es explicar los resultados en <strong className="text-primary font-semibold">lenguaje claro</strong>, con recomendaciones concretas que puedes aplicar en casa y compartir con la escuela.</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3 pt-2">
                      {[
                        { icon: Award, label: 'Especialista en evaluación cognitiva' },
                        { icon: ShieldCheck, label: 'Informe con validez oficial' },
                        { icon: Users, label: 'Atención a niños desde los 6 años' },
                        { icon: Stethoscope, label: 'Instrumento estandarizado internacional' },
                        { icon: Star, label: '47+ reseñas verificadas · 5 estrellas' },
                      ].map((cred) => (
                        <div key={cred.label} className="flex items-center gap-3 p-3 bg-secondary/50 border border-border rounded-xl">
                          <cred.icon className="w-4 h-4 text-primary/60 shrink-0" />
                          <span className="text-xs text-foreground font-medium leading-snug">{cred.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </SectionReveal>
              </div>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              8 · FAQ
              ══════════════════════════════════════════════════════ */}
          <section className="py-14 sm:py-20 bg-secondary">
            <div className="max-w-3xl mx-auto px-6">
              <SectionReveal>
                <h2 className="text-headline font-serif font-bold text-primary mb-10 text-center">Preguntas frecuentes</h2>
              </SectionReveal>

              <div role="list">
                {faqItems.map((faq, i) => (
                  <SectionReveal key={i} delay={i * 0.05}>
                    <div role="listitem" style={{ borderBottom: i < faqItems.length - 1 ? '1px solid rgba(67,56,96,0.09)' : 'none' }}>
                      <button
                        id={`faq-btn-${i}`}
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        aria-expanded={openFaq === i}
                        aria-controls={`faq-answer-${i}`}
                        className="w-full flex items-center justify-between gap-4 py-5 text-left transition-colors"
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: openFaq === i ? '#6b5f8a' : '#433860' }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#6b5f8a')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = openFaq === i ? '#6b5f8a' : '#433860')}
                      >
                        <span className="font-semibold text-sm sm:text-base">{faq.q}</span>
                        <ChevronDown
                          className="w-5 h-5 shrink-0 transition-transform duration-250"
                          style={{ color: '#6b5f8a', transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)' }}
                          aria-hidden="true"
                        />
                      </button>
                      <div
                        id={`faq-answer-${i}`}
                        role="region"
                        aria-labelledby={`faq-btn-${i}`}
                        className="grid transition-all duration-300"
                        style={{
                          gridTemplateRows: openFaq === i ? '1fr' : '0fr',
                          opacity: openFaq === i ? 1 : 0,
                          transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                        }}
                      >
                        <div className="overflow-hidden">
                          <p className="text-sm leading-relaxed pb-5" style={{ color: '#515e71', lineHeight: '1.75', maxWidth: '70ch' }}>
                            {faq.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              9 · PRECIO + AGENDAR POR WHATSAPP
              ══════════════════════════════════════════════════════ */}
          <section id="agendar" className="py-14 sm:py-20 bg-card scroll-mt-20">
            <div className="max-w-4xl mx-auto px-6">
              <SectionReveal>
                <div className="text-center mb-10">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-success/10 rounded-full border border-success/20 mb-6">
                    <CalendarCheck className="w-4 h-4 text-success" />
                    <span className="text-xs uppercase tracking-widest font-bold text-success">Agenda directo por WhatsApp</span>
                  </div>
                  <h2 className="text-headline font-serif font-bold text-primary mb-4">Agenda tu evaluación de CI</h2>
                  <p className="text-muted-foreground font-light max-w-2xl mx-auto">Escríbele a Karen por WhatsApp y te confirmará disponibilidad en poco tiempo.</p>
                </div>
              </SectionReveal>

              <SectionReveal delay={0.1}>
                <div className="mb-8 max-w-2xl mx-auto">
                  <div className="rounded-2xl overflow-hidden shadow-2xl shadow-primary/12 border border-primary/20">
                    <div className="bg-gradient-primary px-8 py-5 flex items-center justify-between">
                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-primary-foreground/50 mb-0.5">Servicio</p>
                        <p className="text-sm font-bold text-primary-foreground">Evaluación de CI con WISC-V</p>
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-success/20 border border-success/30 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                        <span className="text-[9px] font-bold uppercase tracking-wider text-success">Disponible</span>
                      </div>
                    </div>

                    <div className="bg-card px-8 py-10 text-center relative overflow-hidden">
                      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 39px, currentColor 39px, currentColor 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, currentColor 39px, currentColor 40px)', backgroundSize: '40px 40px' }} />
                      <p className="text-xs uppercase tracking-[0.25em] font-bold text-muted-foreground/50 mb-4 relative">Inversión total</p>
                      <div className="flex items-end justify-center gap-3 mb-4 relative">
                        <span className="text-[80px] sm:text-[96px] font-serif font-bold text-primary leading-none tracking-tight">${PRECIO}</span>
                        <span className="text-lg font-semibold text-muted-foreground/60 pb-3 tracking-widest">MXN</span>
                      </div>
                      <div className="flex flex-wrap justify-center gap-2 relative">
                        {['Entrevista inicial', 'Aplicación del WISC-V', 'Informe oficial', 'Sesión de devolución'].map((chip) => (
                          <span key={chip} className="inline-flex items-center gap-1.5 px-3 py-1 bg-secondary border border-border rounded-full text-xs text-muted-foreground font-medium">
                            <CheckCircle2 className="w-3 h-3 text-primary/50 shrink-0" />
                            {chip}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-border bg-secondary/40 px-8 py-6">
                      <a
                        href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-center gap-2 w-full px-6 py-4 bg-whatsapp hover:opacity-90 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all active:scale-[0.98]"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Agendar por WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </SectionReveal>

              <SectionReveal delay={0.2}>
                <div className="pt-6 border-t border-border">
                  <p className="text-center text-sm text-muted-foreground font-light mb-5">¿Prefieres hablar antes de agendar?</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE_DUDAS)}`} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center gap-2 px-6 py-3.5 bg-whatsapp hover:opacity-90 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all active:scale-[0.98]">
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp
                    </a>
                    <a href={`tel:${PHONE_E164}`} className="group flex items-center justify-center gap-2 px-6 py-3.5 bg-card border-2 border-border hover:border-primary/50 text-primary font-bold text-xs uppercase tracking-widest rounded-xl transition-all active:scale-[0.98]">
                      <Phone className="w-4 h-4" />
                      Llamar
                    </a>
                  </div>
                  <p className="text-xs text-muted-foreground/50 text-center mt-4">Lunes a Viernes 9:00–7:00 PM · Sábados 9:00–2:00 PM</p>
                </div>
              </SectionReveal>
            </div>
          </section>


          {/* ── Blog hub-and-spoke ── */}
          <section className="py-10 sm:py-12 border-t border-border">
            <div className="max-w-2xl mx-auto px-6">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-5 text-center">Artículos relacionados</p>
              <div className="grid sm:grid-cols-2 gap-3">
                <Link href="/blog/como-es-una-evaluacion-neuropsicologica-ninos" className="flex items-start gap-3 p-4 bg-card border border-border rounded-2xl hover:border-primary/50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group">
                  <BookOpen className="w-4 h-4 text-primary/50 shrink-0 mt-0.5 transition-transform group-hover:scale-110" />
                  <div>
                    <span className="text-sm font-bold text-primary block leading-snug">Cómo es una evaluación neuropsicológica</span>
                    <span className="text-xs text-muted-foreground font-light">Guía paso a paso para padres</span>
                  </div>
                </Link>
                <Link href="/blog/diferencia-tdah-trastorno-aprendizaje" className="flex items-start gap-3 p-4 bg-card border border-border rounded-2xl hover:border-primary/50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group">
                  <BookOpen className="w-4 h-4 text-primary/50 shrink-0 mt-0.5 transition-transform group-hover:scale-110" />
                  <div>
                    <span className="text-sm font-bold text-primary block leading-snug">TDAH vs. trastorno de aprendizaje</span>
                    <span className="text-xs text-muted-foreground font-light">Cómo diferenciarlos</span>
                  </div>
                </Link>
              </div>
            </div>
          </section>

          {/* ── Internal linking for topical authority ── */}
          <section className="py-10 sm:py-12 bg-card border-t border-border">
            <div className="max-w-2xl mx-auto px-6">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-5 text-center">Otros servicios disponibles en Cancún</p>
              <div className="grid sm:grid-cols-2 gap-3">
                <Link href="/evaluacion-tdah-ninos" className="flex items-center gap-3 p-4 bg-secondary border border-border rounded-2xl hover:border-primary/50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group">
                  <ArrowRight className="w-4 h-4 text-primary/50 shrink-0 transition-transform group-hover:translate-x-1" />
                  <div>
                    <span className="text-sm font-bold text-primary block">TDAH Infantil</span>
                    <span className="text-xs text-muted-foreground font-light">Valoración neuropsicológica 5-17 años</span>
                  </div>
                </Link>
                <Link href="/evaluacion-autismo-cancun" className="flex items-center gap-3 p-4 bg-secondary border border-border rounded-2xl hover:border-primary/50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group">
                  <ArrowRight className="w-4 h-4 text-primary/50 shrink-0 transition-transform group-hover:translate-x-1" />
                  <div>
                    <span className="text-sm font-bold text-primary block">Autismo (TEA)</span>
                    <span className="text-xs text-muted-foreground font-light">Diagnóstico con ADOS-2 y M-CHAT</span>
                  </div>
                </Link>
              </div>
            </div>
          </section>

        </main>

        <FloatingButtons />
        <Footer />

        {/* ── Mobile sticky CTA ── */}
        <div
          data-sticky-cta="" className={`fixed bottom-0 left-0 right-0 z-[100] px-4 pb-5 lg:hidden bg-gradient-to-t from-background via-background/95 to-transparent pt-8 transition-all duration-350 ${
            heroCTAInView ? 'opacity-0 translate-y-12 pointer-events-none' : 'opacity-100 translate-y-0'
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
        >
          <a href="#agendar" onClick={scrollToBooking} className="flex items-center justify-center w-full bg-gradient-primary text-primary-foreground py-3.5 rounded-xl font-bold text-[11px] uppercase tracking-widest shadow-2xl shadow-primary/35 active:scale-[0.98] transition-transform">
            Agendar evaluación
          </a>
        </div>
      </div>
    </>
  );
}
