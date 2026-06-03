import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight, Brain, CheckCircle2, MessageCircle,
  Award, Star, Users, Stethoscope, ChevronDown,
  ShieldCheck, BadgeCheck, MapPin, Clock, Instagram,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

/* ═══════════════════════════════════════════════════════════════
   CONFIG
   ═══════════════════════════════════════════════════════════════ */
const WA = 'https://wa.me/529983211547?text=Hola%20Karen%2C%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20la%20evaluaci%C3%B3n%20neuropsicol%C3%B3gica';

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */

const diferenciadores = [
  {
    title: 'Pruebas objetivas, no solo impresiones',
    desc: 'La neuropsicología mide. Utiliza instrumentos estandarizados internacionalmente validados (WISC-V, CONNERS-3, ADOS-2, BRIEF-2) que cuantifican atención, memoria, funciones ejecutivas e inteligencia. El diagnóstico no es una opinión — es un perfil con datos.',
  },
  {
    title: 'Diagnóstico diferencial preciso',
    desc: 'Distingue TDAH de ansiedad, autismo de timidez, dificultades de aprendizaje de falta de esfuerzo. No con impresiones — con evidencia. Esto importa porque el tratamiento equivocado puede empeorar lo que busca resolver.',
  },
  {
    title: 'Informe con validez oficial',
    desc: 'El informe neuropsicológico emitido con cédula federal (11009616) tiene validez ante escuelas, SEP, IMSS, ISSSTE y empleadores. Es el documento que abre puertas a adecuaciones curriculares, apoyos escolares y planes de intervención.',
  },
  {
    title: 'Recomendaciones concretas y accionables',
    desc: 'El diagnóstico no es el final — es el punto de partida. El informe incluye un plan de intervención específico para la escuela, el hogar y la vida diaria. No solo "qué tiene" sino "qué hacer con eso".',
  },
];

const condicionesEvalua = [
  {
    name: 'TDAH Infantil (5-17 años)',
    desc: 'Inatención, hiperactividad e impulsividad que afectan el rendimiento escolar y la vida familiar.',
    href: '/evaluacion-tdah-ninos',
  },
  {
    name: 'TDAH en Adultos (18+)',
    desc: 'TDAH no diagnosticado en la infancia que genera dificultades ejecutivas, laborales y relacionales.',
    href: '/evaluacion-tdah-adultos',
  },
  {
    name: 'Autismo / TEA',
    desc: 'Trastorno del espectro autista en niños y adolescentes, incluyendo TEA nivel 1 (antes Asperger).',
    href: '/evaluacion-autismo-cancun',
  },
  {
    name: 'Dificultades de aprendizaje',
    desc: 'Evaluación de dislexia, discalculia y otros trastornos específicos del aprendizaje.',
    href: '#contacto',
  },
  {
    name: 'Diagnóstico diferencial',
    desc: 'Distinción entre TDAH y ansiedad, TEA y timidez social, dificultades de aprendizaje y bajo esfuerzo.',
    href: '/blog/tdah-vs-ansiedad-diferencias',
  },
  {
    name: 'Perfil cognitivo completo',
    desc: 'Evaluación de inteligencia, memoria, atención y funciones ejecutivas sin diagnóstico específico previo.',
    href: '#contacto',
  },
];

const faqItems = [
  {
    q: '¿Qué hace exactamente un neuropsicólogo?',
    a: 'Un neuropsicólogo clínico evalúa cómo funciona el cerebro en la práctica diaria: cómo una persona atiende, recuerda, organiza, planifica y procesa información. Utiliza pruebas estandarizadas internacionalmente que van más allá de una entrevista o cuestionario. El resultado es un perfil cognitivo detallado que permite diagnósticos diferenciales precisos y planes de intervención concretos.',
  },
  {
    q: '¿Cuál es la diferencia entre neuropsicólogo y psicólogo clínico?',
    a: 'El psicólogo clínico trabaja principalmente con salud mental, emociones y conducta. El neuropsicólogo clínico se especializa en la relación entre el funcionamiento cerebral y el comportamiento, y utiliza pruebas neuropsicológicas estandarizadas para evaluar procesos cognitivos específicos. Para diagnósticos como TDAH, autismo o trastornos del aprendizaje, la evaluación neuropsicológica proporciona mayor precisión que una evaluación clínica general.',
  },
  {
    q: '¿Cuándo se recomienda una evaluación neuropsicológica?',
    a: 'Se recomienda cuando hay sospechas de TDAH, autismo, dificultades de aprendizaje o cuando se necesita un diagnóstico diferencial entre condiciones que comparten síntomas (como TDAH y ansiedad). También cuando un niño no rinde lo que podría en la escuela sin una causa aparente, o cuando un adulto siente que algo no funciona bien cognitivamente y quiere entender qué.',
  },
  {
    q: '¿Es Karen Trujillo neuropsicóloga certificada?',
    a: 'Sí. Karen Trujillo es neuropsicóloga clínica con cédula federal 11009616, egresada de la Universidad Modelo (Mérida, Yucatán), con más de 7 años de experiencia y 500+ evaluaciones realizadas. Es miembro activa del Colegio de Psicólogos de Quintana Roo. Su consultorio está ubicado en Cancún, Quintana Roo.',
  },
  {
    q: '¿Dónde está el consultorio en Cancún?',
    a: 'El consultorio de la neuropsicóloga Karen Trujillo está ubicado en SM200 M49 L2, Hacienda de Chinconcuac, Cancún, Quintana Roo (CP 77539). Atiende de lunes a viernes de 9:00 AM a 7:00 PM y sábados de 9:00 AM a 2:00 PM. También atiende pacientes de Playa del Carmen, Tulum y Mérida que viajan a Cancún.',
  },
  {
    q: '¿Se puede hacer la evaluación en línea?',
    a: 'El proceso de evaluación neuropsicológica es presencial — las pruebas estandarizadas requieren aplicación en persona para garantizar la validez de los resultados. Algunos pasos administrativos como la entrevista inicial preliminar o los cuestionarios para padres y maestros pueden realizarse de forma remota. Karen lo explica con detalle al hacer el primer contacto.',
  },
];

/* ═══════════════════════════════════════════════════════════════
   SCHEMA LD+JSON
   ═══════════════════════════════════════════════════════════════ */
const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AboutPage',
      '@id': 'https://www.psicologakarentrujillo.com.mx/neuropsicologia-cancun/#page',
      name: 'Neuropsicóloga en Cancún — Karen Trujillo',
      description:
        'Conoce a Karen Trujillo, neuropsicóloga clínica en Cancún con cédula 11009616, especializada en evaluación de TDAH y autismo. Miembro del Colegio de Psicólogos de Quintana Roo.',
      url: 'https://www.psicologakarentrujillo.com.mx/neuropsicologia-cancun',
      inLanguage: 'es-MX',
      about: { '@id': 'https://www.psicologakarentrujillo.com.mx/#physician' },
      mainEntity: { '@id': 'https://www.psicologakarentrujillo.com.mx/#physician' },
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['#que-es-neuropsicologia', '#diferenciadores', '#karen-perfil', '#preguntas-frecuentes'],
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.psicologakarentrujillo.com.mx' },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Neuropsicóloga en Cancún',
          item: 'https://www.psicologakarentrujillo.com.mx/neuropsicologia-cancun',
        },
      ],
    },
    {
      '@type': 'Physician',
      '@id': 'https://www.psicologakarentrujillo.com.mx/#physician',
      name: 'Karen Trujillo',
      jobTitle: 'Neuropsicóloga Clínica — Especialista en TDAH y Autismo',
      url: 'https://www.psicologakarentrujillo.com.mx',
      image: 'https://www.psicologakarentrujillo.com.mx/Psicologa_Karen_Trujillo.webp',
      telephone: '+529983211547',
      hasCredential: {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'Cédula Profesional Federal',
        credentialId: '11009616',
        issuedBy: { '@type': 'Organization', name: 'Secretaría de Educación Pública, México' },
      },
      alumniOf: { '@type': 'EducationalOrganization', name: 'Universidad Modelo', addressLocality: 'Mérida', addressRegion: 'Yucatán' },
      memberOf: { '@type': 'Organization', name: 'Colegio de Psicólogos de Quintana Roo' },
      medicalSpecialty: 'Neuropsychiatry',
      knowsAbout: [
        { '@type': 'MedicalCondition', name: 'TDAH', sameAs: 'https://www.wikidata.org/wiki/Q206811' },
        { '@type': 'MedicalCondition', name: 'Trastorno del espectro autista', sameAs: 'https://www.wikidata.org/wiki/Q38404' },
      ],
      areaServed: {
        '@type': 'City',
        name: 'Cancún',
        sameAs: 'https://www.wikidata.org/wiki/Q8969',
        containedInPlace: { '@type': 'State', name: 'Quintana Roo', sameAs: 'https://www.wikidata.org/wiki/Q10507' },
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5.0',
        reviewCount: '47',
        bestRating: '5',
        worstRating: '1',
      },
      sameAs: [
        'https://www.facebook.com/share/1Bs93MjeKt/',
        'https://www.instagram.com/psicologakarentrujillo',
        'https://www.tiktok.com/@psic.karentrujillo',
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqItems.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ],
};

/* ═══════════════════════════════════════════════════════════════
   UTILITY COMPONENTS
   ═══════════════════════════════════════════════════════════════ */

function SectionReveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { rootMargin: '-80px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
      style={{
        transitionDelay: `${delay}s`,
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════ */

export default function NeuropsicologiaCancun() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <Head>
        <title>Neuropsicóloga en Cancún — Karen Trujillo | Cédula 11009616</title>
        <meta
          name="description"
          content="Karen Trujillo es neuropsicóloga clínica en Cancún con cédula federal 11009616. Evaluaciones de TDAH y autismo con pruebas estandarizadas internacionales. Miembro del Colegio de Psicólogos de Quintana Roo."
        />
        <link rel="canonical" href="https://www.psicologakarentrujillo.com.mx/neuropsicologia-cancun" />

        <meta name="geo.region" content="MX-ROO" />
        <meta name="geo.placename" content="Cancún, Quintana Roo" />
        <meta name="geo.position" content="21.1619;-86.8515" />
        <meta name="ICBM" content="21.1619, -86.8515" />

        <meta property="og:type" content="website" />
        <meta property="og:locale" content="es_MX" />
        <meta property="og:site_name" content="Neuropsicóloga Karen Trujillo" />
        <meta property="og:title" content="Neuropsicóloga en Cancún — Karen Trujillo | Especialista TDAH y TEA" />
        <meta
          property="og:description"
          content="Karen Trujillo es neuropsicóloga clínica en Cancún con cédula federal 11009616. Evaluaciones de TDAH y autismo con pruebas estandarizadas internacionales."
        />
        <meta property="og:url" content="https://www.psicologakarentrujillo.com.mx/neuropsicologia-cancun" />
        <meta property="og:image" content="https://www.psicologakarentrujillo.com.mx/Psicologa_Karen_Trujillo.webp" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Neuropsicóloga en Cancún — Karen Trujillo | Cédula 11009616" />
        <meta
          name="twitter:description"
          content="Neuropsicóloga clínica en Cancún especializada en TDAH y autismo. Evaluaciones con pruebas estandarizadas internacionales. Cédula federal 11009616."
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />

        <style
          dangerouslySetInnerHTML={{
            __html: `
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        `,
          }}
        />
      </Head>

      <div className="antialiased selection:bg-accent-blue selection:text-primary w-full min-w-0 overflow-x-hidden">
        <Navbar />

        <main className="w-full min-w-0 overflow-x-hidden">

          {/* ══════════════════════════════════════════════════════
              1 · HERO
              ══════════════════════════════════════════════════════ */}
          <section className="relative flex items-center justify-center pt-36 pb-16 px-6 overflow-hidden bg-soft-gradient">
            <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-accent-blue/20 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/3 animate-pulse" />
            <div
              className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-pink/25 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4 animate-pulse"
              style={{ animationDelay: '1.5s' }}
            />
            <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
            <div
              className="absolute inset-0 opacity-[0.025]"
              style={{
                backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
            />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

            <div className="max-w-4xl mx-auto relative z-10 text-center">

              <nav aria-label="Breadcrumb" className="mb-6 animate-[fadeIn_0.6s_ease-out_both]">
                <ol className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <li>
                    <Link href="/" className="hover:text-primary transition-colors">
                      Inicio
                    </Link>
                  </li>
                  <li className="text-border">/</li>
                  <li className="text-primary font-medium">Neuropsicóloga en Cancún</li>
                </ol>
              </nav>

              <div className="animate-[fadeInUp_0.8s_ease-out_both]">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border shadow-lg shadow-primary/5 mb-6 ring-1 ring-primary/10 max-w-full">
                  <span className="w-2 h-2 rounded-full bg-success animate-pulse shadow-sm shadow-success shrink-0" />
                  <span className="text-[9px] uppercase tracking-[0.12em] font-bold text-muted-foreground text-center leading-snug">
                    Cancún · Quintana Roo
                  </span>
                </div>

                <h1 className="text-[2rem] sm:text-5xl lg:text-6xl font-serif font-bold text-primary leading-[1.1] mb-6 text-balance">
                  Neuropsicóloga en Cancún<br className="hidden sm:block" /> — Karen Trujillo
                </h1>

                <p className="text-muted-foreground text-sm sm:text-lg font-light leading-relaxed mb-8 max-w-2xl mx-auto">
                  Neuropsicóloga clínica especializada en la evaluación objetiva de TDAH, autismo y dificultades del
                  aprendizaje mediante pruebas estandarizadas internacionales. Diagnósticos precisos con{' '}
                  <strong className="text-primary font-semibold">validez oficial</strong> ante escuelas, SEP e IMSS.
                </p>
              </div>

              {/* Trust stat chips */}
              <div className="animate-[fadeInUp_0.8s_ease-out_0.2s_both] flex flex-wrap justify-center gap-3 mb-10">
                {[
                  { icon: BadgeCheck, text: 'Cédula 11009616' },
                  { icon: Clock, text: '7+ años de experiencia' },
                  { icon: Users, text: '500+ evaluaciones' },
                  { icon: Award, text: 'Colegio de Psicólogos de Q.Roo' },
                ].map((chip) => (
                  <span
                    key={chip.text}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-card border border-border rounded-full text-xs font-medium text-foreground shadow-sm"
                  >
                    <chip.icon className="w-3.5 h-3.5 text-primary/60 shrink-0" />
                    {chip.text}
                  </span>
                ))}
              </div>

              <div className="animate-[fadeInUp_0.8s_ease-out_0.35s_both] flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href={WA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 font-bold text-[10px] uppercase tracking-widest px-7 py-4 rounded-2xl bg-gradient-primary text-primary-foreground shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/35 hover:-translate-y-1 active:translate-y-0 transition-all duration-300"
                >
                  <MessageCircle className="w-4 h-4" />
                  Agendar por WhatsApp
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="#que-es-neuropsicologia"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('que-es-neuropsicologia')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="group inline-flex items-center justify-center gap-2 font-bold text-[9px] uppercase tracking-wide px-6 py-4 rounded-xl border-2 border-primary/15 text-primary/70 hover:border-primary/30 hover:text-primary transition-all duration-300"
                >
                  ¿Qué hace una neuropsicóloga?
                  <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5 shrink-0" />
                </a>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
          </section>


          {/* ══════════════════════════════════════════════════════
              2 · ¿QUÉ HACE UNA NEUROPSICÓLOGA?
              ══════════════════════════════════════════════════════ */}
          <section id="que-es-neuropsicologia" className="py-14 sm:py-20 bg-card scroll-mt-24">
            <div className="max-w-3xl mx-auto px-6">
              <SectionReveal>
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent-blue mb-4 text-center">
                  Neuropsicología clínica
                </p>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-8 text-center text-balance">
                  ¿Qué hace una neuropsicóloga?
                </h2>

                <div className="space-y-4 text-muted-foreground font-light leading-relaxed mb-8">
                  <p>
                    Una neuropsicóloga clínica evalúa cómo funciona el cerebro en la práctica diaria: cómo una persona
                    atiende, recuerda, organiza, planifica y procesa información. No se trata de intuición clínica ni de
                    entrevistas informales — se trata de{' '}
                    <strong className="text-primary font-semibold">medir con instrumentos validados internacionalmente</strong>{' '}
                    que producen un perfil cognitivo preciso y accionable.
                  </p>
                  <p>
                    El resultado es un diagnóstico diferencial que distingue entre condiciones que comparten síntomas
                    superficiales — TDAH vs. ansiedad, autismo vs. timidez, dificultades de aprendizaje vs. bajo
                    esfuerzo — con la precisión necesaria para que el tratamiento funcione. Un diagnóstico equivocado
                    no solo es inútil: puede empeorar lo que busca resolver.
                  </p>
                </div>
              </SectionReveal>

              <SectionReveal delay={0.15}>
                <div className="relative p-6 rounded-2xl bg-secondary border-2 border-primary/15 overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary/60 to-accent-blue/40 rounded-l-2xl" />
                  <div className="absolute top-3 right-4 opacity-5">
                    <Brain className="w-20 h-20 text-primary" />
                  </div>
                  <p className="text-sm text-foreground leading-relaxed font-light pl-2 relative z-10">
                    <strong className="text-primary font-semibold">
                      Mientras la consulta clínica general se basa en entrevistas y observación,
                    </strong>{' '}
                    la evaluación neuropsicológica mide objetivamente las funciones ejecutivas del cerebro — atención
                    sostenida, memoria de trabajo, velocidad de procesamiento, control inhibitorio — mediante pruebas
                    estandarizadas con normas para población hispanohablante. El diagnóstico no es una opinión: es un
                    perfil con datos y percentiles.
                  </p>
                </div>
              </SectionReveal>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              3 · POR QUÉ EVALUACIÓN NEUROPSICOLÓGICA — Diferenciadores
              ══════════════════════════════════════════════════════ */}
          <section id="diferenciadores" className="py-14 sm:py-20 bg-secondary scroll-mt-24">
            <div className="max-w-4xl mx-auto px-6">
              <SectionReveal>
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent-blue mb-4 text-center">
                  La diferencia importa
                </p>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-4 text-center text-balance">
                  ¿Por qué elegir evaluación neuropsicológica?
                </h2>
                <p className="text-muted-foreground font-light text-center max-w-2xl mx-auto mb-10">
                  Cuatro razones concretas por las que la neuropsicología proporciona diagnósticos más precisos y planes
                  de intervención más efectivos.
                </p>
              </SectionReveal>

              <div className="grid sm:grid-cols-2 gap-5">
                {diferenciadores.map((item, i) => (
                  <SectionReveal key={item.title} delay={i * 0.08}>
                    <div className="flex gap-4 p-6 bg-card rounded-2xl border border-border hover:border-accent-blue/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group relative overflow-hidden h-full">
                      <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/0 to-accent-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-accent-blue/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 border border-primary/10">
                        <CheckCircle2 className="w-5 h-5 text-primary/70" />
                      </div>
                      <div className="relative z-10">
                        <h3 className="font-bold text-primary mb-2 leading-snug">{item.title}</h3>
                        <p className="text-sm text-muted-foreground font-light leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              4 · PERFIL DE KAREN
              ══════════════════════════════════════════════════════ */}
          <section id="karen-perfil" className="py-14 sm:py-20 bg-card border-t border-border relative overflow-hidden scroll-mt-24">
            <div className="max-w-4xl mx-auto px-6 relative">
              <SectionReveal>
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent-blue mb-4 text-center">
                  La especialista
                </p>
                <h2 className="font-serif font-bold text-primary mb-14 text-center">
                  <span className="block text-sm sm:text-base font-normal text-muted-foreground/70 uppercase tracking-[0.2em] mb-2">
                    Conoce a
                  </span>
                  <span className="block text-4xl sm:text-5xl lg:text-6xl">Karen Trujillo</span>
                  <span className="block text-base sm:text-lg font-normal text-muted-foreground mt-2">
                    Neuropsicóloga Clínica en Cancún
                  </span>
                </h2>
              </SectionReveal>

              <div className="grid md:grid-cols-[280px_1fr] gap-10 md:gap-14 items-start">

                {/* Left: photo + stats */}
                <SectionReveal>
                  <div className="flex flex-col items-center md:items-start gap-5">
                    <div className="relative">
                      <div className="w-48 h-48 md:w-64 md:h-64 rounded-3xl overflow-hidden border-2 border-border shadow-2xl shadow-primary/10">
                        <Image
                          src="https://www.psicologakarentrujillo.com.mx/Psicologa_Karen_Trujillo.webp"
                          alt="Neuropsicóloga Karen Trujillo en Cancún — especialista en TDAH y autismo"
                          width={256}
                          height={256}
                          className="w-full h-full object-cover object-top"
                          loading="lazy"
                          unoptimized
                        />
                      </div>
                      <div className="absolute -bottom-4 -right-4 bg-gradient-primary text-primary-foreground rounded-2xl px-4 py-2 shadow-xl shadow-primary/25">
                        <p className="text-[9px] font-bold uppercase tracking-widest text-primary-foreground/70">
                          Cédula Federal
                        </p>
                        <p className="text-sm font-bold font-mono">11009616</p>
                      </div>
                    </div>

                    {/* Stats grid */}
                    <div className="grid grid-cols-2 gap-3 w-full mt-2">
                      {[
                        { valor: '7+', label: 'años de experiencia' },
                        { valor: '500+', label: 'evaluaciones' },
                        { valor: '47+', label: 'reseñas 5 estrellas' },
                        { valor: '5.0', label: 'calificación promedio' },
                      ].map((stat) => (
                        <div
                          key={stat.label}
                          className="bg-secondary/60 border border-border rounded-xl p-3 text-center"
                        >
                          <p className="text-base font-serif font-bold text-primary">{stat.valor}</p>
                          <p className="text-[10px] text-muted-foreground font-light leading-tight mt-0.5">
                            {stat.label}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Aggregate rating display */}
                    <div className="w-full p-4 bg-secondary border border-border rounded-2xl flex items-center gap-3">
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-warning fill-warning" />
                        ))}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-primary">5.0 · 47 reseñas</p>
                        <p className="text-[10px] text-muted-foreground font-light">Verificadas en Google</p>
                      </div>
                    </div>

                    {/* Instagram */}
                    <a
                      href="https://www.instagram.com/psicologakarentrujillo"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Instagram className="w-4 h-4 shrink-0" />
                      @psicologakarentrujillo
                    </a>
                  </div>
                </SectionReveal>

                {/* Right: bio + credentials */}
                <SectionReveal delay={0.15}>
                  <div className="space-y-6">
                    <div className="space-y-4 text-muted-foreground font-light leading-relaxed">
                      <p>
                        <strong className="text-primary font-semibold">Karen Trujillo</strong> es neuropsicóloga
                        clínica egresada de la{' '}
                        <strong className="text-primary font-semibold">
                          Universidad Modelo (Mérida, Yucatán)
                        </strong>
                        , con cédula profesional federal{' '}
                        <strong className="text-primary font-semibold">11009616</strong> emitida por la SEP.
                        Cuenta con más de 7 años de experiencia clínica y más de 500 evaluaciones realizadas en
                        Cancún, Quintana Roo.
                      </p>
                      <p>
                        Se especializa en la evaluación neuropsicológica de TDAH en niños, adolescentes y adultos;
                        Trastorno del Espectro Autista (TEA); y dificultades específicas del aprendizaje. Domina
                        instrumentos de clase mundial:{' '}
                        <strong className="text-primary font-semibold">
                          WISC-V, CONNERS-3, ADOS-2, BRIEF-2 y CPT-3
                        </strong>
                        .
                      </p>
                      <p>
                        Su práctica combina rigor clínico con calidez humana: las familias y adultos que acuden a
                        su consultorio no solo reciben un diagnóstico, sino una{' '}
                        <strong className="text-primary font-semibold">hoja de ruta concreta</strong> sobre qué
                        hacer con esa información — en terapia, en la escuela, en el trabajo y en casa.
                      </p>
                    </div>

                    {/* Credentials list */}
                    <div className="space-y-2">
                      {[
                        { icon: BadgeCheck, label: 'Cédula Federal 11009616 — SEP' },
                        { icon: Award, label: 'Universidad Modelo, Mérida, Yucatán' },
                        { icon: Stethoscope, label: '7+ años de experiencia clínica' },
                        { icon: Users, label: '500+ evaluaciones realizadas' },
                        { icon: ShieldCheck, label: 'Miembro del Colegio de Psicólogos de Quintana Roo' },
                        { icon: Star, label: '47+ reseñas verificadas · 5 estrellas' },
                      ].map((cred) => (
                        <div
                          key={cred.label}
                          className="flex items-center gap-3 p-3 bg-secondary/50 border border-border rounded-xl"
                        >
                          <cred.icon className="w-4 h-4 text-primary/60 shrink-0" />
                          <span className="text-xs text-foreground font-medium leading-snug">{cred.label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Quote card */}
                    <div className="relative p-6 bg-gradient-to-br from-primary/5 to-accent-blue/5 border border-primary/15 rounded-2xl overflow-hidden">
                      <div className="absolute top-2 right-4 text-6xl font-serif text-primary/8 leading-none select-none">
                        &ldquo;
                      </div>
                      <p className="text-sm text-muted-foreground font-light leading-relaxed italic relative z-10">
                        &ldquo;Un diagnóstico no es una etiqueta — es información. Con la información correcta, los
                        padres, maestros y el propio paciente pueden tomar decisiones que sí funcionan.&rdquo;
                      </p>
                      <p className="mt-3 text-xs font-bold text-primary">Karen Trujillo — Neuropsicóloga Clínica</p>
                    </div>
                  </div>
                </SectionReveal>
              </div>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              5 · CONDICIONES QUE EVALUAMOS
              ══════════════════════════════════════════════════════ */}
          <section className="py-14 sm:py-20 bg-secondary border-t border-border">
            <div className="max-w-4xl mx-auto px-6">
              <SectionReveal>
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent-blue mb-4 text-center">
                  Especialidades
                </p>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-4 text-center text-balance">
                  Condiciones que evaluamos en Cancún
                </h2>
                <p className="text-muted-foreground font-light text-center max-w-2xl mx-auto mb-10">
                  Cada evaluación sigue un protocolo clínico riguroso con instrumentos estandarizados
                  internacionalmente y produce un informe con validez oficial.
                </p>
              </SectionReveal>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {condicionesEvalua.map((item, i) => (
                  <SectionReveal key={item.name} delay={i * 0.07}>
                    <Link
                      href={item.href}
                      className="flex flex-col gap-3 p-5 bg-card rounded-2xl border border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 group h-full"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-bold text-primary text-sm leading-snug flex-1">{item.name}</h3>
                        <ArrowRight className="w-4 h-4 text-muted-foreground/40 shrink-0 mt-0.5 transition-transform group-hover:translate-x-1 group-hover:text-primary/60" />
                      </div>
                      <p className="text-xs text-muted-foreground font-light leading-relaxed flex-1">{item.desc}</p>
                    </Link>
                  </SectionReveal>
                ))}
              </div>

              <SectionReveal delay={0.35}>
                <div className="mt-10 text-center">
                  <a
                    href={WA}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center gap-2 font-bold text-[10px] uppercase tracking-widest px-7 py-4 rounded-2xl bg-gradient-primary text-primary-foreground shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/35 hover:-translate-y-1 active:translate-y-0 transition-all duration-300"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Consultar por mi caso
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </SectionReveal>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              6 · FAQ
              ══════════════════════════════════════════════════════ */}
          <section id="preguntas-frecuentes" className="py-14 sm:py-20 bg-card border-t border-border scroll-mt-24">
            <div className="max-w-3xl mx-auto px-6">
              <SectionReveal>
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent-blue mb-4 text-center">
                  Preguntas frecuentes
                </p>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-10 text-center">
                  Todo lo que quieres saber
                </h2>
              </SectionReveal>

              <div className="space-y-2">
                {faqItems.map((faq, i) => (
                  <SectionReveal key={i} delay={i * 0.05}>
                    <div
                      className={`bg-secondary/50 border-2 rounded-2xl transition-all duration-300 overflow-hidden ${
                        openFaq === i
                          ? 'border-primary/50 shadow-lg shadow-primary/8'
                          : 'border-border hover:border-accent-blue/30 hover:shadow-sm'
                      }`}
                    >
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        aria-expanded={openFaq === i}
                        aria-controls={`faq-answer-${i}`}
                        className="w-full p-5 sm:p-6 flex justify-between items-center gap-4 text-left cursor-pointer"
                      >
                        <span className="font-bold text-primary text-sm sm:text-base">{faq.q}</span>
                        <div
                          className={`w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-300 ${
                            openFaq === i ? 'border-primary bg-primary/10' : 'border-border'
                          }`}
                        >
                          <ChevronDown
                            className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-300 ${
                              openFaq === i ? 'rotate-180 text-primary' : ''
                            }`}
                          />
                        </div>
                      </button>
                      <div
                        id={`faq-answer-${i}`}
                        role="region"
                        className="grid transition-all duration-300"
                        style={{
                          gridTemplateRows: openFaq === i ? '1fr' : '0fr',
                          opacity: openFaq === i ? 1 : 0,
                          transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                        }}
                      >
                        <div className="overflow-hidden">
                          <div className="px-5 sm:px-6 pb-5 sm:pb-6 border-t border-border/50 pt-4">
                            <p className="text-muted-foreground text-sm font-light leading-relaxed">{faq.a}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              7 · CTA FINAL
              ══════════════════════════════════════════════════════ */}
          <section id="contacto" className="py-16 sm:py-24 bg-gradient-primary text-primary-foreground scroll-mt-20">
            <div className="max-w-3xl mx-auto px-6 text-center">
              <SectionReveal>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20 mb-8">
                  <span className="w-2 h-2 rounded-full bg-success animate-pulse shrink-0" />
                  <span className="text-[9px] uppercase tracking-[0.14em] font-bold text-primary-foreground/70">
                    Consultas disponibles · Cancún, Q.Roo
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold italic mb-6 text-balance">
                  ¿Quieres agendar una evaluación?
                </h2>

                <p className="text-primary-foreground/75 font-light leading-relaxed max-w-xl mx-auto mb-4">
                  Escribe por WhatsApp para conocer disponibilidad, resolver dudas o iniciar el proceso de
                  evaluación. Karen responde directamente.
                </p>

                <div className="flex items-center justify-center gap-2 mb-10 text-sm text-primary-foreground/60">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span>SM200 M49 L2, Hacienda de Chinconcuac, Cancún, Q.Roo (CP 77539)</span>
                </div>

                <a
                  href={WA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-3 font-bold text-[10px] uppercase tracking-widest px-8 py-5 rounded-2xl bg-white text-primary shadow-2xl shadow-black/20 hover:shadow-black/30 hover:-translate-y-1 active:translate-y-0 transition-all duration-300"
                >
                  <MessageCircle className="w-5 h-5" />
                  Escribir por WhatsApp
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>

                <p className="mt-6 text-[10px] text-primary-foreground/45 font-light">
                  Lunes a Viernes 9:00 – 7:00 PM · Sábados 9:00 – 2:00 PM
                </p>
              </SectionReveal>
            </div>
          </section>


          {/* ── Internal linking for topical authority ── */}
          <section className="py-10 sm:py-12 bg-card border-t border-border">
            <div className="max-w-2xl mx-auto px-6">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-5 text-center">
                Evaluaciones disponibles en Cancún
              </p>
              <div className="grid sm:grid-cols-3 gap-3">
                <Link
                  href="/evaluacion-tdah-ninos"
                  className="flex items-center gap-3 p-4 bg-secondary border border-border rounded-2xl hover:border-primary/50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group"
                >
                  <ArrowRight className="w-4 h-4 text-primary/50 shrink-0 transition-transform group-hover:translate-x-1" />
                  <div>
                    <span className="text-sm font-bold text-primary block">TDAH Infantil</span>
                    <span className="text-[10px] text-muted-foreground font-light">5-17 años</span>
                  </div>
                </Link>
                <Link
                  href="/evaluacion-tdah-adultos"
                  className="flex items-center gap-3 p-4 bg-secondary border border-border rounded-2xl hover:border-primary/50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group"
                >
                  <ArrowRight className="w-4 h-4 text-primary/50 shrink-0 transition-transform group-hover:translate-x-1" />
                  <div>
                    <span className="text-sm font-bold text-primary block">TDAH Adultos</span>
                    <span className="text-[10px] text-muted-foreground font-light">18+ años</span>
                  </div>
                </Link>
                <Link
                  href="/evaluacion-autismo-cancun"
                  className="flex items-center gap-3 p-4 bg-secondary border border-border rounded-2xl hover:border-primary/50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group"
                >
                  <ArrowRight className="w-4 h-4 text-primary/50 shrink-0 transition-transform group-hover:translate-x-1" />
                  <div>
                    <span className="text-sm font-bold text-primary block">Autismo (TEA)</span>
                    <span className="text-[10px] text-muted-foreground font-light">Diagnóstico ADOS-2</span>
                  </div>
                </Link>
              </div>
            </div>
          </section>

        </main>

        <Footer />
      </div>
    </>
  );
}
