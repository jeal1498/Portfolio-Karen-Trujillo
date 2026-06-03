import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {
  ArrowRight, CheckCircle2, MessageCircle,
  Award, BadgeCheck, ChevronDown,
  ShieldCheck, FileText, ClipboardList,
  Users, GraduationCap,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

/* ═══════════════════════════════════════════════════════════════
   CONFIG
   ═══════════════════════════════════════════════════════════════ */
const WA = 'https://wa.me/529983211547?text=Hola%20Karen%2C%20soy%20docente%2Forientador%20y%20quisiera%20referir%20a%20un%20alumno%20para%20evaluaci%C3%B3n%20neuropsicol%C3%B3gica';

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */

const queIncluye = [
  {
    titulo: 'Diagnóstico formal según DSM-5',
    descripcion:
      'Diagnóstico clínico preciso (TDAH, TEA, trastorno del aprendizaje) con el código diagnóstico internacional correspondiente. El documento que la escuela necesita para justificar las adecuaciones.',
  },
  {
    titulo: 'Perfil cognitivo detallado',
    descripcion:
      'Resultados del WISC-V o WAIS-IV: comprensión verbal, razonamiento fluido, memoria de trabajo y velocidad de procesamiento. El perfil explica cómo aprende el alumno — no solo qué le cuesta.',
  },
  {
    titulo: 'Evaluación de funciones ejecutivas',
    descripcion:
      'BRIEF-2: planificación, iniciación, flexibilidad cognitiva, memoria de trabajo conductual. La información que maestros y orientadores necesitan para adaptar la metodología en aula.',
  },
  {
    titulo: 'Recomendaciones pedagógicas específicas',
    descripcion:
      'No genéricas: recomendaciones diseñadas para el perfil exacto del alumno. Tipo de retroalimentación, estrategias de organización, adaptaciones de tiempo, modificaciones de examen.',
  },
  {
    titulo: 'Validez oficial SEP',
    descripcion:
      'El informe está emitido por la psic. Karen Trujillo (cédula federal 11009616), miembro del Colegio de Psicólogos de Quintana Roo. Tiene plena validez ante la SEP y es suficiente para implementar adecuaciones curriculares.',
  },
  {
    titulo: 'Sesión de orientación disponible',
    descripcion:
      'Opcionalmente, Karen puede coordinar una sesión informativa breve con el equipo de orientación escolar para explicar los resultados y responder preguntas sobre la implementación.',
  },
];

const condicionesEvalua = [
  {
    condicion: 'TDAH (Trastorno por Déficit de Atención)',
    detalle:
      'Infantil (5-17 años) y adultos (18+). Evaluación con CONNERS-3/CAARS-2, WISC-V/WAIS-IV, BRIEF-2 y CPT-3.',
    href: '/evaluacion-tdah-ninos',
  },
  {
    condicion: 'Autismo / TEA',
    detalle:
      'Diagnóstico con ADOS-2 (estándar de oro), ADI-R, WISC-V, Vineland-3 y SRS-2. Incluye nivel de apoyo requerido (1, 2 o 3).',
    href: '/evaluacion-autismo-cancun',
  },
  {
    condicion: 'Dislexia y trastornos del aprendizaje',
    detalle:
      'PROLEC-R, TOMAL-2, WISC-V, BRIEF-2 y CELF-5. Diagnóstico diferencial con TDAH cuando es necesario.',
    href: '/evaluacion-dislexia-cancun',
  },
  {
    condicion: 'Perfiles cognitivos complejos',
    detalle:
      'Alumnos con múltiples dificultades o diagnósticos previos inconclusos que requieren un perfil neuropsicológico integrado.',
    href: '#contacto',
  },
];

const procesoReferencia = [
  {
    paso: 'El orientador o maestro contacta a Karen',
    detalle:
      'Por WhatsApp o teléfono. Se describe brevemente la situación del alumno y el motivo de la derivación.',
  },
  {
    paso: 'Karen orienta a la familia',
    detalle:
      'Karen contacta o recibe a los padres, explica el proceso y confirma si la evaluación es adecuada para el caso.',
  },
  {
    paso: 'Evaluación completa',
    detalle:
      '2-4 semanas de proceso presencial. Los cuestionarios para maestros se envían por correo electrónico.',
  },
  {
    paso: 'Informe entregado a la familia',
    detalle:
      'El informe va a los padres — que lo comparten con la escuela. Karen puede coordinar una sesión con el equipo de orientación si se solicita.',
  },
];

const faqItems = [
  {
    q: '¿Cómo hacemos una referencia como escuela?',
    a: 'El proceso más directo es que el orientador o maestro contacte a Karen por WhatsApp (+52 998 321 1547) describiendo brevemente la situación del alumno. Karen orienta al orientador sobre si la evaluación neuropsicológica es adecuada, y luego contacta a la familia para explicar el proceso. También pueden los padres contactar directamente a Karen mencionando que vienen referidos por la escuela.',
  },
  {
    q: '¿El informe sirve para implementar adecuaciones curriculares?',
    a: 'Sí. El informe neuropsicológico de Karen Trujillo (cédula federal 11009616) tiene validez oficial ante la SEP y es el documento que permite a las escuelas implementar adecuaciones curriculares formales. Incluye diagnóstico DSM-5, perfil cognitivo completo y recomendaciones pedagógicas específicas — no genéricas.',
  },
  {
    q: '¿Cuánto tiempo tarda el proceso de evaluación?',
    a: 'Entre 2 y 4 semanas dependiendo del tipo de evaluación: TDAH en 2-3 semanas (4-5 sesiones), autismo en 3-4 semanas (5-6 sesiones). Los cuestionarios para maestros se completan de forma remota por correo electrónico, sin necesidad de sesión adicional.',
  },
  {
    q: '¿Karen puede venir a la escuela a hacer la evaluación?',
    a: 'La evaluación se realiza en el consultorio (SM200, Cancún) porque requiere condiciones controladas y materiales estandarizados. Sin embargo, Karen puede participar en reuniones con el equipo de orientación escolar por videollamada para explicar los resultados e implementar las recomendaciones.',
  },
  {
    q: '¿Qué pasa si el alumno ya tiene un diagnóstico previo?',
    a: 'Es frecuente recibir alumnos con diagnósticos anteriores basados solo en entrevistas o cuestionarios sin pruebas estandarizadas. Una evaluación neuropsicológica completa puede confirmar, matizar o corregir el diagnóstico previo con evidencia objetiva — lo que permite diseñar intervenciones más precisas.',
  },
  {
    q: '¿Evalúa alumnos de todos los niveles escolares?',
    a: 'Sí. Karen evalúa desde primaria (5 años en adelante) hasta preparatoria y universidad. Para cada nivel hay instrumentos específicos adaptados a la edad. Para universitarios, la evaluación de TDAH adulto (CAARS-2, WAIS-IV) es la más apropiada.',
  },
];

/* ═══════════════════════════════════════════════════════════════
   SCHEMA LD+JSON
   ═══════════════════════════════════════════════════════════════ */
const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.psicologakarentrujillo.com.mx/para-escuelas/#page',
      name: 'Evaluaciones Neuropsicológicas para Escuelas en Cancún',
      description:
        'Karen Trujillo ofrece evaluaciones de TDAH, autismo y dislexia para alumnos en Cancún con informe válido ante SEP. Referidos desde escuelas bienvenidos.',
      url: 'https://www.psicologakarentrujillo.com.mx/para-escuelas',
      inLanguage: 'es-MX',
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['#que-incluye-informe', '#condiciones', '#proceso-referencia'],
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Inicio',
          item: 'https://www.psicologakarentrujillo.com.mx',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Para Escuelas',
          item: 'https://www.psicologakarentrujillo.com.mx/para-escuelas',
        },
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

export default function ParaEscuelas() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <Head>
        <title>Evaluaciones Neuropsicológicas para Escuelas en Cancún | Karen Trujillo</title>
        <meta
          name="description"
          content="Evaluaciones de TDAH, autismo y dislexia para alumnos en Cancún. Informe con validez SEP, cuestionarios para maestros incluidos y recomendaciones pedagógicas específicas. Cédula 11009616."
        />
        <link rel="canonical" href="https://www.psicologakarentrujillo.com.mx/para-escuelas" />

        <meta name="geo.region" content="MX-ROO" />
        <meta name="geo.placename" content="Cancún, Quintana Roo" />
        <meta name="geo.position" content="21.1619;-86.8515" />
        <meta name="ICBM" content="21.1619, -86.8515" />

        <meta property="og:type" content="website" />
        <meta property="og:locale" content="es_MX" />
        <meta property="og:site_name" content="Neuropsicóloga Karen Trujillo" />
        <meta
          property="og:title"
          content="Evaluaciones Neuropsicológicas para Escuelas en Cancún | Karen Trujillo"
        />
        <meta
          property="og:description"
          content="Evaluaciones de TDAH, autismo y dislexia para alumnos en Cancún. Informe con validez SEP, cuestionarios para maestros incluidos y recomendaciones pedagógicas específicas."
        />
        <meta property="og:url" content="https://www.psicologakarentrujillo.com.mx/para-escuelas" />
        <meta property="og:image" content="https://www.psicologakarentrujillo.com.mx/Psicologa_Karen_Trujillo.webp" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Evaluaciones Neuropsicológicas para Escuelas en Cancún | Karen Trujillo"
        />
        <meta
          name="twitter:description"
          content="Informe neuropsicológico con validez SEP, cuestionarios para maestros y recomendaciones pedagógicas específicas. Cédula 11009616."
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
                  <li className="text-primary font-medium">Para Escuelas</li>
                </ol>
              </nav>

              <div className="animate-[fadeInUp_0.8s_ease-out_both]">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border shadow-lg shadow-primary/5 mb-6 ring-1 ring-primary/10 max-w-full">
                  <span className="w-2 h-2 rounded-full bg-success animate-pulse shadow-sm shadow-success shrink-0" />
                  <span className="text-[9px] uppercase tracking-[0.12em] font-bold text-muted-foreground text-center leading-snug">
                    Para docentes y orientadores · Cancún
                  </span>
                </div>

                <h1 className="text-[2rem] sm:text-5xl lg:text-6xl font-serif font-bold text-primary leading-[1.1] mb-6 text-balance">
                  Evaluaciones neuropsicológicas<br className="hidden sm:block" /> para escuelas en Cancún
                </h1>

                <p className="text-muted-foreground text-sm sm:text-lg font-light leading-relaxed mb-8 max-w-2xl mx-auto">
                  Informes con diagnóstico formal, perfil cognitivo y recomendaciones pedagógicas específicas.{' '}
                  <strong className="text-primary font-semibold">Validez oficial SEP.</strong>{' '}
                  Referidos bienvenidos.
                </p>
              </div>

              {/* Trust stat chips */}
              <div className="animate-[fadeInUp_0.8s_ease-out_0.2s_both] flex flex-wrap justify-center gap-3 mb-10">
                {[
                  { icon: BadgeCheck, text: 'Cédula 11009616' },
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
                  Referir a un alumno
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="#que-incluye-informe"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('que-incluye-informe')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="group inline-flex items-center justify-center gap-2 font-bold text-[9px] uppercase tracking-wide px-6 py-4 rounded-xl border-2 border-primary/15 text-primary/70 hover:border-primary/30 hover:text-primary transition-all duration-300"
                >
                  Ver qué incluye el informe
                  <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5 shrink-0" />
                </a>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
          </section>


          {/* ══════════════════════════════════════════════════════
              2 · POR QUÉ LAS ESCUELAS NOS RECOMIENDAN
              ══════════════════════════════════════════════════════ */}
          <section className="py-14 sm:py-20 bg-card scroll-mt-24">
            <div className="max-w-3xl mx-auto px-6">
              <SectionReveal>
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent-blue mb-4 text-center">
                  Confianza institucional
                </p>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-10 text-center text-balance">
                  ¿Por qué las escuelas de Cancún nos recomiendan?
                </h2>
              </SectionReveal>

              <div className="space-y-4">
                {[
                  {
                    icon: ShieldCheck,
                    title: 'Informe con validez SEP',
                    desc: 'El informe neuropsicológico lleva la cédula federal 11009616 y es suficiente para que la escuela implemente adecuaciones curriculares formales sin trámites adicionales.',
                  },
                  {
                    icon: ClipboardList,
                    title: 'Cuestionarios para maestros incluidos',
                    desc: 'Los cuestionarios CONNERS-3 para maestros, BRIEF-2 y otros instrumentos de observación en aula se envían por correo electrónico. No se requiere visita adicional al consultorio.',
                  },
                  {
                    icon: Users,
                    title: 'Disponible para sesión con el equipo de orientación',
                    desc: 'Karen puede participar por videollamada en reuniones con el equipo de orientación escolar para explicar los resultados y orientar la implementación de las recomendaciones.',
                  },
                ].map((item, i) => (
                  <SectionReveal key={item.title} delay={i * 0.1}>
                    <div className="flex gap-4 p-6 bg-secondary rounded-2xl border border-border hover:border-accent-blue/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/0 to-accent-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-accent-blue/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 border border-primary/10">
                        <item.icon className="w-5 h-5 text-primary/70" />
                      </div>
                      <div className="relative z-10">
                        <h3 className="font-bold text-primary mb-1.5 leading-snug">{item.title}</h3>
                        <p className="text-sm text-muted-foreground font-light leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              3 · QUÉ INCLUYE EL INFORME
              ══════════════════════════════════════════════════════ */}
          <section id="que-incluye-informe" className="py-14 sm:py-20 bg-secondary scroll-mt-24">
            <div className="max-w-4xl mx-auto px-6">
              <SectionReveal>
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent-blue mb-4 text-center">
                  El informe
                </p>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-4 text-center text-balance">
                  Qué incluye el informe para la escuela
                </h2>
                <p className="text-muted-foreground font-light text-center max-w-2xl mx-auto mb-10">
                  Cada sección del informe tiene un propósito concreto para el equipo docente y de orientación.
                </p>
              </SectionReveal>

              <div className="grid sm:grid-cols-2 gap-5">
                {queIncluye.map((item, i) => (
                  <SectionReveal key={item.titulo} delay={i * 0.08}>
                    <div className="flex gap-4 p-6 bg-card rounded-2xl border border-border hover:border-accent-blue/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group relative overflow-hidden h-full">
                      <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/0 to-accent-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-accent-blue/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 border border-primary/10">
                        <FileText className="w-5 h-5 text-primary/70" />
                      </div>
                      <div className="relative z-10">
                        <h3 className="font-bold text-primary mb-2 leading-snug">{item.titulo}</h3>
                        <p className="text-sm text-muted-foreground font-light leading-relaxed">{item.descripcion}</p>
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              4 · CONDICIONES QUE EVALUAMOS
              ══════════════════════════════════════════════════════ */}
          <section id="condiciones" className="py-14 sm:py-20 bg-card border-t border-border scroll-mt-24">
            <div className="max-w-4xl mx-auto px-6">
              <SectionReveal>
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent-blue mb-4 text-center">
                  Especialidades
                </p>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-4 text-center text-balance">
                  Condiciones que evaluamos
                </h2>
                <p className="text-muted-foreground font-light text-center max-w-2xl mx-auto mb-10">
                  Protocolos rigurosos con instrumentos estandarizados para las condiciones más frecuentes
                  en el entorno escolar de Cancún y Riviera Maya.
                </p>
              </SectionReveal>

              <div className="grid sm:grid-cols-2 gap-4">
                {condicionesEvalua.map((item, i) => (
                  <SectionReveal key={item.condicion} delay={i * 0.08}>
                    <Link
                      href={item.href}
                      className="flex flex-col gap-3 p-5 bg-secondary rounded-2xl border border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 group h-full"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-bold text-primary text-sm leading-snug flex-1">{item.condicion}</h3>
                        <ArrowRight className="w-4 h-4 text-muted-foreground/40 shrink-0 mt-0.5 transition-transform group-hover:translate-x-1 group-hover:text-primary/60" />
                      </div>
                      <p className="text-xs text-muted-foreground font-light leading-relaxed flex-1">{item.detalle}</p>
                    </Link>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              5 · PROCESO DE REFERENCIA
              ══════════════════════════════════════════════════════ */}
          <section id="proceso-referencia" className="py-14 sm:py-20 bg-secondary border-t border-border scroll-mt-24">
            <div className="max-w-3xl mx-auto px-6">
              <SectionReveal>
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent-blue mb-4 text-center">
                  Derivación escolar
                </p>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-4 text-center text-balance">
                  Cómo hacer una referencia
                </h2>
                <p className="text-muted-foreground font-light text-center max-w-xl mx-auto mb-10">
                  El proceso está diseñado para ser sencillo para el equipo docente y claro para la familia.
                </p>
              </SectionReveal>

              <div className="space-y-4 relative">
                {/* Connecting line */}
                <div className="absolute left-[1.4375rem] top-10 bottom-10 w-px bg-gradient-to-b from-primary/30 via-accent-blue/20 to-transparent hidden sm:block" aria-hidden="true" />

                {procesoReferencia.map((item, i) => (
                  <SectionReveal key={i} delay={i * 0.1}>
                    <div className="flex gap-5 p-6 bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300 relative">
                      <div className="w-7 h-7 rounded-full bg-gradient-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0 shadow-md shadow-primary/20 relative z-10">
                        {i + 1}
                      </div>
                      <div>
                        <h3 className="font-bold text-primary mb-1.5 leading-snug">{item.paso}</h3>
                        <p className="text-sm text-muted-foreground font-light leading-relaxed">{item.detalle}</p>
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>

              {/* Callout */}
              <SectionReveal delay={0.4}>
                <div className="mt-8 relative p-6 rounded-2xl bg-card border-2 border-primary/15 overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary/60 to-accent-blue/40 rounded-l-2xl" />
                  <div className="absolute top-3 right-4 opacity-5">
                    <GraduationCap className="w-20 h-20 text-primary" />
                  </div>
                  <div className="flex gap-3 items-start pl-2 relative z-10">
                    <CheckCircle2 className="w-5 h-5 text-primary/70 shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground font-light leading-relaxed">
                      <strong className="text-primary font-semibold">Los cuestionarios para maestros son parte del proceso</strong>{' '}
                      — se envían por correo electrónico sin necesidad de visita adicional al consultorio.
                    </p>
                  </div>
                </div>
              </SectionReveal>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              6 · FAQ
              ══════════════════════════════════════════════════════ */}
          <section className="py-14 sm:py-20 bg-card border-t border-border scroll-mt-24">
            <div className="max-w-3xl mx-auto px-6">
              <SectionReveal>
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent-blue mb-4 text-center">
                  Preguntas frecuentes
                </p>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-10 text-center">
                  Dudas habituales de orientadores y docentes
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
                    Referidos escolares bienvenidos · Cancún, Q.Roo
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold italic mb-6 text-balance">
                  ¿Tienes un alumno que necesita evaluación?
                </h2>

                <p className="text-primary-foreground/75 font-light leading-relaxed max-w-xl mx-auto mb-10">
                  Escribe por WhatsApp para describir el caso. La psic. Karen Trujillo (cédula federal 11009616),
                  miembro del Colegio de Psicólogos de Quintana Roo, responde directamente y orienta
                  sobre si la evaluación neuropsicológica es adecuada para el alumno. La referencia desde
                  la escuela es bienvenida — el proceso continúa con la familia.
                </p>

                <a
                  href={WA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-3 font-bold text-[10px] uppercase tracking-widest px-8 py-5 rounded-2xl bg-white text-primary shadow-2xl shadow-black/20 hover:shadow-black/30 hover:-translate-y-1 active:translate-y-0 transition-all duration-300"
                >
                  <MessageCircle className="w-5 h-5" />
                  Referir a un alumno por WhatsApp
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>

                <p className="mt-6 text-[10px] text-primary-foreground/45 font-light">
                  Lunes a Viernes 9:00 – 7:00 PM · Sábados 9:00 – 2:00 PM
                </p>
              </SectionReveal>
            </div>
          </section>

        </main>

        <Footer />
      </div>
    </>
  );
}
