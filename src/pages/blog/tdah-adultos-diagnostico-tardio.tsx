import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight, Brain, FileText, CheckCircle2,
  ShieldCheck, MessageCircle, Clock,
  Star, Users, BadgeCheck, Puzzle, Briefcase,
  ChevronDown, AlertTriangle, Eye,
  BookOpen, ArrowLeft, ListChecks, HelpCircle,
  Lightbulb, XCircle, Stethoscope, Coffee,
  Heart, Repeat,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

/* ═══════════════════════════════════════════════════════════════
   CONFIG
   ═══════════════════════════════════════════════════════════════ */
const WA_NUMBER = '529983211547';

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */

const signals = [
  {
    category: 'En el trabajo',
    icon: Briefcase,
    accent: 'text-primary bg-primary/10 border-primary/20',
    items: [
      { signal: 'Procrastinas tareas importantes hasta el último momento', example: 'Sabes que tienes un entregable desde hace 2 semanas, pero no lo empiezas hasta la noche anterior. No es pereza — es una dificultad real para iniciar tareas sin urgencia.' },
      { signal: 'Empiezas muchos proyectos y terminas pocos', example: 'Te entusiasmas con una idea, la arrancas con energía y a los días la abandonas por otra. Tu disco duro está lleno de carpetas de "proyectos" a medias.' },
      { signal: 'Te cuesta organizar tareas con varios pasos', example: 'Un proyecto que requiere planificar, ejecutar y dar seguimiento te paraliza. No sabes por dónde empezar ni cómo secuenciar.' },
      { signal: 'Olvidas reuniones, compromisos o fechas límite', example: 'No importa cuántas alarmas pongas — algo se te escapa. Has llegado tarde a juntas, olvidado enviar correos o confundido horarios.' },
      { signal: 'Te aburres rápido en trabajos repetitivos o rutinarios', example: 'Los primeros meses de un empleo eres brillante. Después, la monotonía te drena la motivación y empiezas a buscar "algo nuevo".' },
    ],
  },
  {
    category: 'En la vida diaria',
    icon: Coffee,
    accent: 'text-accent-blue bg-accent-blue/10 border-accent-blue/20',
    items: [
      { signal: 'Pierdes llaves, cartera, celular constantemente', example: 'Gastas 10-15 minutos diarios buscando cosas que acabas de tener en la mano. Es un patrón, no un descuido aislado.' },
      { signal: 'Dificultad para mantener orden en tu espacio', example: 'Tu escritorio, tu carro o tu cuarto acumulan desorden rápido. No es que no te importe — es que tu cerebro no automatiza el orden.' },
      { signal: 'Cambias de un tema o actividad a otra sin terminar', example: 'Vas a la cocina por agua, ves el correo, contestas un mensaje, regresas a tu computadora y se te olvidó el agua.' },
      { signal: 'Sensación constante de que "el tiempo no te alcanza"', example: 'Te sorprende que ya pasaron 2 horas. Subestimas cuánto toma cada cosa. Llegas tarde aunque te prepares con tiempo.' },
      { signal: 'Hiperfoco: te absorbes horas en algo que te interesa', example: 'Puedes pasar 6 horas sin parar en un tema que te fascina, pero no logras sostener 20 minutos en algo que no. No es falta de atención — es atención desregulada.' },
    ],
  },
  {
    category: 'En las relaciones',
    icon: Heart,
    accent: 'text-rose-500 bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/20',
    items: [
      { signal: 'Tu pareja dice que "nunca escuchas"', example: 'Estás físicamente presente pero mentalmente en otro lado. Olvidas cosas que te dijeron y la otra persona siente que no le importas.' },
      { signal: 'Reacciones emocionales desproporcionadas', example: 'Un comentario menor te irrita intensamente, o pasas de estar bien a estar frustrado en segundos. Después te arrepientes.' },
      { signal: 'Dificultad para cumplir acuerdos o compromisos', example: 'Prometes que vas a hacer algo y genuinamente quieres hacerlo — pero se te olvida o lo pospones. No es falta de interés.' },
      { signal: 'Interrumpes a otros en conversaciones', example: 'No lo haces por grosería — la idea aparece en tu mente y si no la dices ahora, la pierdes. Pero la otra persona se siente ignorada.' },
    ],
  },
];

const confusions = [
  {
    condition: 'Ansiedad',
    overlap: 'Dificultad para concentrarse, inquietud, problemas de sueño',
    difference: 'En ansiedad, la falta de concentración viene de preocupaciones. En TDAH, viene de una desregulación atencional que existe desde la infancia — con o sin estrés.',
  },
  {
    condition: 'Depresión',
    overlap: 'Falta de motivación, cansancio, dificultad para iniciar actividades',
    difference: 'La depresión es episódica y afecta el estado de ánimo. El TDAH es crónico (desde la infancia) y afecta funciones ejecutivas. Muchos adultos con TDAH desarrollan depresión por años de frustración no explicada.',
  },
  {
    condition: 'Burnout',
    overlap: 'Agotamiento, desorganización, bajo rendimiento, errores frecuentes',
    difference: 'El burnout es temporal y mejora con descanso. Si siempre has tenido estas dificultades — en la escuela, en distintos trabajos, en tu vida personal — probablemente no es burnout.',
  },
  {
    condition: 'Trastorno bipolar',
    overlap: 'Impulsividad, cambios de energía, ideas aceleradas',
    difference: 'El bipolar tiene episodios de manía/depresión claramente definidos. El TDAH es constante y estable — la desregulación emocional es reactiva (responde a eventos), no cíclica.',
  },
];

const whyLate = [
  {
    title: 'Compensaste con inteligencia',
    desc: 'Si tienes un CI alto, pudiste pasar la escuela con buenas notas a base de esfuerzo extra. El TDAH estaba ahí, pero nunca se hizo visible porque lograbas compensar — hasta que la exigencia superó tu capacidad de compensación.',
    icon: Brain,
  },
  {
    title: 'Eras "inatento", no "hiperactivo"',
    desc: 'El TDAH inatento no hace ruido. No interrumpes en clase, no te mandan a la dirección. Simplemente "estás en la luna". Maestros y padres no lo detectan porque no molesta — pero afecta igual.',
    icon: Eye,
  },
  {
    title: 'Eras mujer',
    desc: 'Las niñas con TDAH son subdiagnosticadas a tasas alarmantes. La presentación es más interna (inatención, ansiedad, perfeccionismo) que externa (hiperactividad, impulsividad). Muchas mujeres llegan al diagnóstico cuando llevan a sus hijos a evaluarse.',
    icon: Users,
  },
  {
    title: 'Te diagnosticaron otra cosa primero',
    desc: 'Ansiedad, depresión, trastorno de adaptación, burnout… El TDAH se camufla detrás de condiciones que son consecuencia, no causa. Si los tratamientos anteriores no funcionaron, el problema base puede ser TDAH.',
    icon: Repeat,
  },
  {
    title: 'Los criterios eran diferentes',
    desc: 'Hasta hace poco, se pensaba que el TDAH era solo de niños hiperactivos. Los criterios diagnósticos del DSM-5 reconocen presentaciones inatencionales y mixtas que antes se ignoraban.',
    icon: FileText,
  },
];

const lifeImpact = [
  { area: 'Laboral', stat: '2-3x', desc: 'más probabilidad de despidos o cambios frecuentes de empleo' },
  { area: 'Financiero', stat: '60%', desc: 'reportan dificultad con manejo de dinero, deudas impulsivas o descontrol' },
  { area: 'Relaciones', stat: '2x', desc: 'mayor tasa de divorcios cuando el TDAH no está diagnosticado ni tratado' },
  { area: 'Autoestima', stat: '80%', desc: 'de adultos diagnosticados tardíamente reportan años de autocrítica y "sentirse diferentes"' },
];

const myths = [
  { myth: '"Si no lo diagnosticaron de niño, no puede ser TDAH"', reality: 'Millones de adultos vivieron sin diagnóstico porque los criterios eran más restrictivos, la presentación inatenta se ignoraba y los sistemas educativos no lo detectaban. El TDAH no aparece en la adultez — pero sí se descubre.' },
  { myth: '"Si puedes hiperfocalizarte, no tienes TDAH"', reality: 'El hiperfoco es un síntoma clásico de TDAH, no una prueba de que no lo tienes. Es atención desregulada: el cerebro no modula bien cuánta atención asigna. Puede darte 6 horas de concentración en algo que te estimula y cero en algo que no.' },
  { myth: '"Es solo falta de disciplina o madurez"', reality: 'El TDAH es una condición neurológica con base en funciones ejecutivas (corteza prefrontal). No es un problema de carácter, educación o voluntad. Las personas con TDAH trabajan más duro para lograr lo mismo — no menos.' },
  { myth: '"Los adultos no pueden tener TDAH"', reality: 'Según estudios epidemiológicos, el TDAH persiste en la adultez en el 60-70% de los casos. La hiperactividad motora disminuye, pero la inatención, la impulsividad y la desregulación emocional pueden intensificarse.' },
  { myth: '"El metilfenidato es una droga que te vuelve adicto"', reality: 'El metilfenidato es uno de los medicamentos más estudiados en neurociencia. En la dosis terapéutica correcta, no genera adicción — al contrario, los adultos con TDAH tratado tienen menor riesgo de abuso de sustancias que los no tratados.' },
];

const faqItems = [
  {
    q: '¿A qué edad se puede diagnosticar TDAH en adultos?',
    a: 'No hay límite de edad. El TDAH se puede diagnosticar en cualquier momento de la vida adulta mediante una evaluación neuropsicológica que incluya pruebas estandarizadas (CAARS-2, WAIS-IV, BRIEF-2A, CPT-3) y una historia clínica retrospectiva de la infancia. Lo que se evalúa es la presencia crónica de síntomas, no cuándo aparecieron.',
  },
  {
    q: '¿Qué diferencia hay entre evaluación neuropsicológica y un test online?',
    a: 'Los tests online son cuestionarios de tamizaje: pueden sugerir riesgo, pero no diagnostican. Una evaluación neuropsicológica aplica pruebas estandarizadas con normas internacionales que miden funciones ejecutivas (atención sostenida, memoria de trabajo, velocidad de procesamiento, inhibición) de forma objetiva y cuantificable. Es la diferencia entre "posiblemente tienes TDAH" y un diagnóstico diferencial completo.',
  },
  {
    q: '¿El diagnóstico de TDAH en adultos tiene validez oficial?',
    a: 'Sí. El informe clínico está respaldado por cédula profesional federal 11009616 emitida por la SEP. Tiene validez ante empleadores, universidades, IMSS y dependencias gubernamentales. Incluye diagnóstico con código CIE-10, perfil de funciones ejecutivas y recomendaciones.',
  },
  {
    q: '¿Si me diagnostican TDAH, estoy obligado a tomar medicamento?',
    a: 'No. El informe neuropsicológico genera un diagnóstico y recomendaciones personalizadas. La decisión sobre medicación es independiente y la toma un psiquiatra o neurólogo. Muchos adultos manejan el TDAH con estrategias conductuales, coaching ejecutivo y ajustes ambientales — con o sin medicación.',
  },
  {
    q: '¿Cuánto cuesta una evaluación de TDAH en adultos en Cancún?',
    a: 'La valoración de TDAH adulto tiene un costo de $7,000 MXN. Incluye todas las sesiones (4-5 citas presenciales en 2-3 semanas), batería completa de pruebas estandarizadas (CAARS-2, WAIS-IV, BRIEF-2A, CPT-3), informe clínico detallado y sesión de devolución de resultados.',
  },
  {
    q: '¿Me pueden diagnosticar TDAH si ya me diagnosticaron ansiedad o depresión?',
    a: 'Sí, y es más común de lo que se cree. TDAH, ansiedad y depresión pueden coexistir (comorbilidad). La evaluación neuropsicológica realiza diagnóstico diferencial: determina si la ansiedad/depresión es la causa primaria o si es consecuencia de un TDAH no tratado. Esto cambia radicalmente la estrategia de tratamiento.',
  },
];

const relatedResources = [
  {
    href: '/blog/senales-tdah-ninos',
    icon: Users,
    category: 'TDAH Infantil',
    title: '¿Tu hijo no pone atención? Señales reales de TDAH vs. comportamiento típico',
    color: 'from-accent-blue/10 to-accent-blue/5',
  },
  {
    href: '/blog/que-es-ados-2-autismo',
    icon: Puzzle,
    category: 'Autismo (TEA)',
    title: '¿Qué es el ADOS-2 y por qué es el estándar de oro para diagnosticar autismo?',
    color: 'from-accent-pink/10 to-accent-pink/5',
  },
];

/* ═══════════════════════════════════════════════════════════════
   SCHEMA LD+JSON — Article + BreadcrumbList + FAQPage
   ═══════════════════════════════════════════════════════════════ */

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      '@id': 'https://psicologakarentrujillo.com.mx/blog/tdah-adultos-diagnostico-tardio/#article',
      headline: 'TDAH en adultos: por qué miles de personas llegan al diagnóstico después de los 30',
      description: 'Guía completa sobre TDAH en adultos no diagnosticados. Señales en el trabajo, relaciones y vida diaria. Diagnóstico diferencial con ansiedad, depresión y burnout.',
      image: 'https://psicologakarentrujillo.com.mx/Psicologa_Karen_Trujillo.webp',
      datePublished: '2025-06-22',
      dateModified: '2025-06-22',
      author: {
        '@type': 'Person',
        '@id': 'https://psicologakarentrujillo.com.mx/#physician',
        name: 'Karen Trujillo',
        jobTitle: 'Neuropsicóloga Clínica',
        url: 'https://psicologakarentrujillo.com.mx',
      },
      publisher: {
        '@type': 'Organization',
        '@id': 'https://psicologakarentrujillo.com.mx/#clinic',
        name: 'Neuropsicóloga Karen Trujillo',
        url: 'https://psicologakarentrujillo.com.mx',
      },
      mainEntityOfPage: 'https://psicologakarentrujillo.com.mx/blog/tdah-adultos-diagnostico-tardio',
      inLanguage: 'es-MX',
      about: {
        '@type': 'MedicalCondition',
        name: 'TDAH en adultos',
        sameAs: 'https://www.wikidata.org/wiki/Q206811',
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://psicologakarentrujillo.com.mx' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://psicologakarentrujillo.com.mx/blog' },
        { '@type': 'ListItem', position: 3, name: 'TDAH en adultos', item: 'https://psicologakarentrujillo.com.mx/blog/tdah-adultos-diagnostico-tardio' },
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


/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE — BLOG: TDAH en Adultos — Diagnóstico Tardío
   ═══════════════════════════════════════════════════════════════ */

export default function TDAHAdultosDiagnosticoTardio() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [expandedSignal, setExpandedSignal] = useState<string | null>(null);
  const [showStickyCta, setShowStickyCta] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = 500;
      const ctaFinal = document.getElementById('cta-evaluacion');
      const ctaTop = ctaFinal?.getBoundingClientRect().top ?? Infinity;
      const pastHero = window.scrollY > heroHeight;
      const beforeCta = ctaTop > window.innerHeight;
      setShowStickyCta(pastHero && beforeCta);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Head>
        <title>TDAH en adultos: por qué miles llegan al diagnóstico después de los 30 | Neuropsicóloga Karen Trujillo</title>
        <meta name="description" content="¿Procrastinas, pierdes cosas y sientes que el tiempo no te alcanza? Podrías tener TDAH no diagnosticado. Guía basada en evidencia para adultos. Neuropsicóloga con cédula 11009616 en Cancún." />
        <link rel="canonical" href="https://psicologakarentrujillo.com.mx/blog/tdah-adultos-diagnostico-tardio" />

        <meta property="og:type" content="article" />
        <meta property="og:locale" content="es_MX" />
        <meta property="og:site_name" content="Neuropsicóloga Karen Trujillo" />
        <meta property="og:title" content="TDAH en adultos: por qué miles llegan al diagnóstico después de los 30" />
        <meta property="og:description" content="Guía completa sobre TDAH en adultos no diagnosticados. Señales en el trabajo, relaciones y vida diaria. Diagnóstico diferencial con ansiedad y burnout." />
        <meta property="og:url" content="https://psicologakarentrujillo.com.mx/blog/tdah-adultos-diagnostico-tardio" />
        <meta property="og:image" content="https://psicologakarentrujillo.com.mx/Psicologa_Karen_Trujillo.webp" />
        <meta property="article:author" content="Karen Trujillo" />
        <meta property="article:published_time" content="2025-06-22" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TDAH en adultos: diagnóstico después de los 30 | Karen Trujillo" />
        <meta name="twitter:description" content="¿Procrastinas, pierdes cosas y sientes que el tiempo no alcanza? Guía de TDAH en adultos basada en evidencia." />

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
              HERO — Article header
              ══════════════════════════════════════════════════════ */}
          <section className="relative pt-28 pb-14 sm:pb-20 px-6 overflow-hidden bg-soft-gradient">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/3 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-blue/20 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4 animate-pulse" style={{ animationDelay: '1.5s' }} />
            <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

            <div className="max-w-3xl mx-auto relative z-10">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-8 animate-[fadeIn_0.8s_ease-out_both]" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
                  <ArrowLeft className="w-3 h-3" />
                  Inicio
                </Link>
                <span className="text-muted-foreground/40">/</span>
                <span className="text-muted-foreground/40">Blog</span>
                <span className="text-muted-foreground/40">/</span>
                <span className="text-primary font-medium">TDAH Adultos</span>
              </nav>

              <div className="animate-[fadeInUp_0.8s_ease-out_both]">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border shadow-lg shadow-primary/5 mb-6 ring-1 ring-primary/15">
                  <BookOpen className="w-3.5 h-3.5 text-primary" />
                  <span className="text-[9px] uppercase tracking-[0.12em] font-bold text-muted-foreground">Guía para adultos · Basada en evidencia</span>
                </div>

                <h1 className="text-[1.75rem] sm:text-4xl lg:text-5xl font-serif font-bold text-primary leading-[1.15] mb-5 text-balance">
                  TDAH en adultos:<br />
                  <span className="text-primary/60">por qué miles llegan al diagnóstico después de los 30</span>
                </h1>

                <p className="text-muted-foreground text-sm sm:text-lg font-light leading-relaxed mb-8 max-w-2xl">
                  Si toda la vida has sentido que &ldquo;puedes más pero no rindes&rdquo;, que te cuesta lo que a otros parece fácil, o que ningún diagnóstico previo explica del todo lo que te pasa — esta guía es para ti.
                </p>

                {/* Author card */}
                <div className="flex items-center gap-4 animate-[fadeInUp_0.8s_ease-out_0.2s_both]">
                  <div className="w-12 h-12 rounded-2xl overflow-hidden border border-border shadow-md">
                    <Image
                      src="https://psicologakarentrujillo.com.mx/Psicologa_Karen_Trujillo.webp"
                      alt="Neuropsicóloga Karen Trujillo"
                      width={48}
                      height={48}
                      className="w-full h-full object-cover object-top"
                      priority
                      unoptimized
                    />
                  </div>
                  <div>
                    <p className="font-bold text-primary text-sm">Neuropsicóloga Karen Trujillo</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><BadgeCheck className="w-3 h-3 text-primary/40" /> Cédula 11009616</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-primary/40" /> 14 min de lectura</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              TABLE OF CONTENTS
              ══════════════════════════════════════════════════════ */}
          <section className="py-8 bg-card border-b border-border">
            <div className="max-w-3xl mx-auto px-6">
              <SectionReveal>
                <details className="group">
                  <summary className="flex items-center justify-between cursor-pointer py-2">
                    <span className="flex items-center gap-2 text-sm font-bold text-primary">
                      <ListChecks className="w-4 h-4 text-accent-blue" />
                      Contenido de esta guía
                    </span>
                    <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform group-open:rotate-180" />
                  </summary>
                  <nav className="pt-3 pb-1 space-y-1.5">
                    {[
                      { href: '#senales', label: '14 señales de TDAH en adultos' },
                      { href: '#por-que-tarde', label: '¿Por qué no te lo diagnosticaron antes?' },
                      { href: '#confusiones', label: 'TDAH vs. ansiedad, depresión y burnout' },
                      { href: '#impacto', label: 'El costo de no saber' },
                      { href: '#mitos', label: '5 mitos sobre TDAH en adultos' },
                      { href: '#que-hacer', label: '¿Qué hacer si te identificas?' },
                      { href: '#faq-blog', label: 'Preguntas frecuentes' },
                    ].map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={(e) => { e.preventDefault(); document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
                        className="block pl-6 py-1.5 text-sm text-muted-foreground hover:text-primary font-light border-l-2 border-border hover:border-accent-blue transition-all"
                      >
                        {item.label}
                      </a>
                    ))}
                  </nav>
                </details>
              </SectionReveal>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              INTRO — Context paragraph
              ══════════════════════════════════════════════════════ */}
          <section className="py-12 sm:py-16 bg-card">
            <div className="max-w-3xl mx-auto px-6">
              <SectionReveal>
                <div className="prose-custom">
                  <p className="text-muted-foreground font-light leading-relaxed text-base sm:text-lg mb-6">
                    En mi consultorio en Cancún, cada vez más adultos entre 25 y 45 años llegan con una sospecha que llevan cargando años: <em className="text-primary font-medium">&ldquo;Creo que tengo TDAH, pero nadie me lo dijo de niño.&rdquo;</em>
                  </p>
                  <p className="text-muted-foreground font-light leading-relaxed text-sm sm:text-base mb-6">
                    Y en la gran mayoría de los casos, tienen razón. El TDAH no aparece en la adultez — <strong className="text-primary font-semibold">se descubre</strong>. Estaba ahí desde la infancia, pero fue invisible porque compensaste con inteligencia, desarrollaste estrategias para sobrevivir, o simplemente nadie supo buscarlo.
                  </p>
                  <p className="text-muted-foreground font-light leading-relaxed text-sm sm:text-base">
                    Esta guía te va a ayudar a entender por qué el diagnóstico llega tarde, cómo se ve el TDAH adulto en la vida real, y por qué confundirlo con ansiedad o burnout puede costarte años de tratamientos que no funcionan.
                  </p>
                </div>
              </SectionReveal>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              SEÑALES — 14 signals by life area
              ══════════════════════════════════════════════════════ */}
          <section id="senales" className="py-14 sm:py-20 bg-secondary scroll-mt-20">
            <div className="max-w-4xl mx-auto px-6">
              <SectionReveal>
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent-blue mb-3 text-center">Señales en la vida real</p>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-4 text-center text-balance">14 señales de TDAH en adultos que se confunden con &ldquo;defectos de carácter&rdquo;</h2>
                <p className="text-muted-foreground font-light text-center max-w-2xl mx-auto mb-12">No son vicios, no es flojera, no es falta de interés. Así se ve el TDAH cuando nadie te lo explicó.</p>
              </SectionReveal>

              <div className="space-y-8">
                {signals.map((group, gi) => (
                  <SectionReveal key={group.category} delay={gi * 0.1}>
                    <div className="bg-card border border-border rounded-3xl overflow-hidden">
                      {/* Category header */}
                      <div className="px-6 py-5 border-b border-border flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl border-2 ${group.accent} flex items-center justify-center`}>
                          <group.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-bold text-primary text-lg">{group.category}</h3>
                          <p className="text-xs text-muted-foreground font-light">{group.items.length} señales principales</p>
                        </div>
                      </div>

                      {/* Signals list */}
                      <div className="divide-y divide-border">
                        {group.items.map((item, ii) => {
                          const key = `${gi}-${ii}`;
                          const isOpen = expandedSignal === key;
                          return (
                            <button
                              key={key}
                              onClick={() => setExpandedSignal(isOpen ? null : key)}
                              className="w-full text-left px-6 py-4 hover:bg-secondary/50 transition-colors cursor-pointer"
                            >
                              <div className="flex items-start gap-3">
                                <CheckCircle2 className="w-4 h-4 text-primary/40 mt-0.5 shrink-0" />
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-primary leading-snug">{item.signal}</p>
                                  <div
                                    className="grid transition-all duration-300"
                                    style={{
                                      gridTemplateRows: isOpen ? '1fr' : '0fr',
                                      opacity: isOpen ? 1 : 0,
                                      transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                                    }}
                                  >
                                    <div className="overflow-hidden">
                                      <p className="text-xs text-muted-foreground font-light leading-relaxed mt-2 bg-secondary/50 p-3 rounded-xl border border-border/50">
                                        <span className="font-bold text-primary/60 text-[10px] uppercase tracking-widest">¿Te suena? </span>
                                        {item.example}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground/50 mt-0.5 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              POR QUÉ TARDE — 5 reasons for late diagnosis
              ══════════════════════════════════════════════════════ */}
          <section id="por-que-tarde" className="py-14 sm:py-20 bg-card scroll-mt-20">
            <div className="max-w-4xl mx-auto px-6">
              <SectionReveal>
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent-blue mb-3 text-center">El diagnóstico invisible</p>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-4 text-center text-balance">¿Por qué no te lo diagnosticaron de niño?</h2>
                <p className="text-muted-foreground font-light text-center max-w-2xl mx-auto mb-12">No es que no lo tuvieras. Es que nadie supo verlo. Estas son las 5 razones más comunes del diagnóstico tardío.</p>
              </SectionReveal>

              <div className="space-y-4">
                {whyLate.map((item, i) => (
                  <SectionReveal key={item.title} delay={i * 0.08}>
                    <div className="flex gap-4 p-5 sm:p-6 bg-secondary/50 rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/15 to-accent-blue/10 border border-primary/15 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <item.icon className="w-5 h-5 text-primary/60" />
                      </div>
                      <div>
                        <h3 className="font-bold text-primary mb-1.5">{item.title}</h3>
                        <p className="text-sm text-muted-foreground font-light leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              CONFUSIONES — Differential diagnosis table
              ══════════════════════════════════════════════════════ */}
          <section id="confusiones" className="py-14 sm:py-20 bg-secondary scroll-mt-20">
            <div className="max-w-4xl mx-auto px-6">
              <SectionReveal>
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent-blue mb-3 text-center">Diagnóstico diferencial</p>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-4 text-center text-balance">¿Es TDAH, ansiedad, depresión o burnout?</h2>
                <p className="text-muted-foreground font-light text-center max-w-2xl mx-auto mb-12">El TDAH adulto se confunde frecuentemente con otras condiciones. Por eso se necesitan pruebas estandarizadas — no solo una entrevista.</p>
              </SectionReveal>

              <div className="space-y-4">
                {confusions.map((item, i) => (
                  <SectionReveal key={item.condition} delay={i * 0.08}>
                    <div className="bg-card border border-border rounded-2xl overflow-hidden hover:border-accent-blue/30 hover:shadow-lg transition-all duration-300">
                      <div className="px-5 sm:px-6 py-4 border-b border-border flex items-center justify-between">
                        <h3 className="font-bold text-primary text-base">TDAH vs. {item.condition}</h3>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/50 bg-secondary px-3 py-1 rounded-full border border-border">Diferencial</span>
                      </div>
                      <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border">
                        <div className="px-5 sm:px-6 py-4">
                          <p className="text-[9px] font-bold uppercase tracking-widest text-warning mb-2">Síntomas que se solapan</p>
                          <p className="text-sm text-muted-foreground font-light leading-relaxed">{item.overlap}</p>
                        </div>
                        <div className="px-5 sm:px-6 py-4 bg-accent-blue/3">
                          <p className="text-[9px] font-bold uppercase tracking-widest text-accent-blue mb-2">La diferencia clave</p>
                          <p className="text-sm text-muted-foreground font-light leading-relaxed">{item.difference}</p>
                        </div>
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>

              <SectionReveal delay={0.4}>
                <div className="mt-8 bg-primary/5 border border-primary/15 rounded-2xl p-5 sm:p-6">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-primary/50 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-primary text-sm mb-2">¿La clave para diferenciarlo?</p>
                      <p className="text-sm text-muted-foreground font-light leading-relaxed">
                        El TDAH es <strong className="text-primary font-semibold">crónico</strong> (presente desde la infancia), <strong className="text-primary font-semibold">transversal</strong> (afecta trabajo, relaciones y vida diaria) y <strong className="text-primary font-semibold">consistente</strong> (no depende de un evento o temporada). Si estas dificultades te han acompañado toda la vida — no solo desde el último año — el TDAH es una hipótesis que vale la pena evaluar.
                      </p>
                    </div>
                  </div>
                </div>
              </SectionReveal>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              IMPACTO — Cost of not knowing
              ══════════════════════════════════════════════════════ */}
          <section id="impacto" className="py-14 sm:py-20 bg-card scroll-mt-20">
            <div className="max-w-3xl mx-auto px-6">
              <SectionReveal>
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent-blue mb-3 text-center">El costo silencioso</p>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-4 text-center text-balance">Lo que el TDAH no diagnosticado le cuesta a tu vida</h2>
                <p className="text-muted-foreground font-light text-center max-w-xl mx-auto mb-12">Cuando no sabes que tienes TDAH, asumes que el problema eres tú. Estos son los costos acumulados del no-diagnóstico.</p>
              </SectionReveal>

              <div className="grid sm:grid-cols-2 gap-4">
                {lifeImpact.map((item, i) => (
                  <SectionReveal key={item.area} delay={i * 0.08}>
                    <div className="bg-secondary/50 border border-border rounded-2xl p-5 sm:p-6 hover:border-primary/30 hover:shadow-md transition-all duration-300 text-center">
                      <p className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-1">{item.stat}</p>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-accent-blue mb-2">{item.area}</p>
                      <p className="text-sm text-muted-foreground font-light leading-relaxed">{item.desc}</p>
                    </div>
                  </SectionReveal>
                ))}
              </div>

              <SectionReveal delay={0.4}>
                <div className="mt-8 bg-warning/5 border border-warning/15 rounded-2xl p-5 sm:p-6">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-warning shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground font-light leading-relaxed">
                      <strong className="text-primary font-medium">La buena noticia:</strong> el diagnóstico tardío sigue siendo transformador. La mayoría de mis pacientes adultos reportan que entender su TDAH fue <em>&ldquo;el antes y después&rdquo;</em> de su vida — porque por fin dejaron de culparse por algo que no era su culpa.
                    </p>
                  </div>
                </div>
              </SectionReveal>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              MITOS — 5 myths debunked
              ══════════════════════════════════════════════════════ */}
          <section id="mitos" className="py-14 sm:py-20 bg-secondary scroll-mt-20">
            <div className="max-w-3xl mx-auto px-6">
              <SectionReveal>
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent-blue mb-3 text-center">Derribando mitos</p>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-4 text-center">5 mitos sobre TDAH en adultos</h2>
                <p className="text-muted-foreground font-light text-center max-w-xl mx-auto mb-12">Creencias que perpetúan el subdiagnóstico y el sufrimiento innecesario.</p>
              </SectionReveal>

              <div className="space-y-4">
                {myths.map((item, i) => (
                  <SectionReveal key={i} delay={i * 0.08}>
                    <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 hover:border-accent-blue/30 hover:shadow-md transition-all duration-300">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-7 h-7 rounded-full bg-rose-100 dark:bg-rose-500/15 border border-rose-200 dark:border-rose-500/25 flex items-center justify-center shrink-0">
                          <XCircle className="w-3.5 h-3.5 text-rose-500" />
                        </div>
                        <p className="font-bold text-primary text-sm leading-snug pt-1">{item.myth}</p>
                      </div>
                      <div className="pl-10">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-success shrink-0 mt-0.5" />
                          <p className="text-sm text-muted-foreground font-light leading-relaxed"><strong className="text-primary font-medium">Realidad:</strong> {item.reality}</p>
                        </div>
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              QUÉ HACER — Actionable next steps
              ══════════════════════════════════════════════════════ */}
          <section id="que-hacer" className="py-14 sm:py-20 bg-gradient-primary text-primary-foreground scroll-mt-20">
            <div className="max-w-3xl mx-auto px-6">
              <SectionReveal>
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary-foreground/50 mb-3 text-center">El siguiente paso</p>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-4 text-center">¿Te identificaste con lo que leíste?</h2>
                <p className="text-primary-foreground/70 font-light text-center max-w-xl mx-auto mb-10">No necesitas tener certeza. Necesitas una evaluación que mida lo que tu cerebro hace — no lo que tú crees que debería hacer.</p>
              </SectionReveal>

              <SectionReveal delay={0.1}>
                <div className="space-y-4 mb-10">
                  {[
                    { step: '1', text: 'Revisa si estas dificultades han estado presentes desde antes de los 12 años — en la escuela, en casa o con amigos.' },
                    { step: '2', text: 'Identifica si afectan más de un área de tu vida: trabajo, relaciones, finanzas, autoestima.' },
                    { step: '3', text: 'Agenda una evaluación neuropsicológica de TDAH adulto. Es el único método que mide objetivamente tus funciones ejecutivas con pruebas estandarizadas.' },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-4 bg-white/8 border border-white/12 rounded-xl p-4">
                      <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                        <span className="text-sm font-bold text-primary-foreground">{item.step}</span>
                      </div>
                      <p className="text-sm text-primary-foreground/80 font-light leading-relaxed pt-1">{item.text}</p>
                    </div>
                  ))}
                </div>
              </SectionReveal>

              <SectionReveal delay={0.2}>
                <div className="text-center">
                  <Link
                    href="/evaluacion-tdah-adultos"
                    className="group inline-flex items-center justify-center gap-2 font-bold text-[10px] uppercase tracking-widest px-8 py-4 rounded-2xl bg-white text-primary shadow-xl hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 transition-all duration-300"
                  >
                    Ver evaluación TDAH adultos
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <p className="text-primary-foreground/50 text-xs font-light mt-4">$7,000 MXN · 4-5 sesiones · Informe con validez oficial</p>
                </div>
              </SectionReveal>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              FAQ — Blog-specific
              ══════════════════════════════════════════════════════ */}
          <section id="faq-blog" className="py-14 sm:py-20 bg-card scroll-mt-20">
            <div className="max-w-3xl mx-auto px-6">
              <SectionReveal>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-10 text-center">Preguntas frecuentes</h2>
              </SectionReveal>

              <div className="space-y-2">
                {faqItems.map((faq, i) => (
                  <SectionReveal key={i} delay={i * 0.05}>
                    <div className={`bg-secondary/50 border-2 rounded-2xl transition-all duration-300 overflow-hidden ${openFaq === i ? 'border-primary/50 shadow-lg shadow-primary/8' : 'border-border hover:border-accent-blue/30 hover:shadow-sm'}`}>
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        aria-expanded={openFaq === i}
                        aria-controls={`faq-blog-${i}`}
                        className="w-full p-5 sm:p-6 flex justify-between items-center gap-4 text-left cursor-pointer"
                      >
                        <span className="font-bold text-primary text-sm sm:text-base">{faq.q}</span>
                        <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-300 ${openFaq === i ? 'border-primary bg-primary/10' : 'border-border'}`}>
                          <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-300 ${openFaq === i ? 'rotate-180 text-primary' : ''}`} />
                        </div>
                      </button>
                      <div
                        id={`faq-blog-${i}`}
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
              RELATED — Internal linking
              ══════════════════════════════════════════════════════ */}
          <section className="py-12 sm:py-16 bg-secondary/50 border-t border-border">
            <div className="max-w-3xl mx-auto px-6">
              <SectionReveal>
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent-blue mb-3 text-center">Sigue aprendiendo</p>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-primary mb-8 text-center">Recursos relacionados</h2>
              </SectionReveal>

              <div className="grid sm:grid-cols-2 gap-4">
                {relatedResources.map((resource, i) => (
                  <SectionReveal key={resource.href} delay={i * 0.08}>
                    <Link href={resource.href} className="group block bg-card border border-border rounded-2xl overflow-hidden hover:border-accent-blue/40 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 h-full">
                      <div className={`h-1.5 bg-gradient-to-r ${resource.color}`} />
                      <div className="p-5 sm:p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <resource.icon className="w-3.5 h-3.5 text-primary/40" />
                          <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60">{resource.category}</span>
                        </div>
                        <h3 className="font-bold text-primary text-sm leading-snug mb-3 group-hover:text-primary/80 transition-colors">{resource.title}</h3>
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-primary/40 group-hover:text-primary group-hover:gap-2 transition-all">
                          Leer más <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </Link>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              CTA FINAL — Conversion bridge to funnel
              ══════════════════════════════════════════════════════ */}
          <section id="cta-evaluacion" className="py-14 sm:py-20 bg-card border-t border-border">
            <div className="max-w-3xl mx-auto px-6">
              <SectionReveal>
                <div className="text-center mb-8">
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-4">Dejar de preguntarte es más fácil que seguir con la duda</h2>
                  <p className="text-muted-foreground font-light max-w-xl mx-auto">Una evaluación neuropsicológica te da respuestas en semanas. Si llegaste hasta aquí, probablemente ya sabes lo que necesitas.</p>
                </div>
              </SectionReveal>

              <SectionReveal delay={0.1}>
                <div className="bg-secondary/50 border-2 border-border rounded-2xl p-6 sm:p-8 mb-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl overflow-hidden border border-border shadow-md shrink-0">
                      <Image
                        src="https://psicologakarentrujillo.com.mx/Psicologa_Karen_Trujillo.webp"
                        alt="Neuropsicóloga Karen Trujillo"
                        width={48}
                        height={48}
                        className="w-full h-full object-cover object-top"
                        loading="lazy"
                        unoptimized
                      />
                    </div>
                    <div>
                      <p className="font-bold text-primary">Neuropsicóloga Karen Trujillo</p>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mt-1">
                        <span className="flex items-center gap-1"><BadgeCheck className="w-3 h-3 text-primary/40" /> Cédula 11009616</span>
                        <span className="flex items-center gap-1"><Star className="w-3 h-3 text-warning fill-warning" /> 47+ reseñas · 5.0</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-3 mb-6">
                    {[
                      { label: 'Pruebas', value: 'CAARS-2, WAIS-IV, BRIEF-2A, CPT-3' },
                      { label: 'Duración', value: '4-5 sesiones · 2-3 semanas' },
                      { label: 'Inversión', value: '$7,000 MXN todo incluido' },
                    ].map((item) => (
                      <div key={item.label} className="bg-card border border-border rounded-xl p-3 text-center">
                        <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/50 mb-1">{item.label}</p>
                        <p className="text-xs font-medium text-primary">{item.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      href="/evaluacion-tdah-adultos"
                      className="group flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-primary text-primary-foreground font-bold text-[10px] uppercase tracking-widest rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-[0.98]"
                    >
                      <Stethoscope className="w-4 h-4" />
                      Ver evaluación completa
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <a
                      href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hola Karen, leí tu guía sobre TDAH en adultos y me gustaría agendar una evaluación.')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-whatsapp hover:opacity-90 text-white font-bold text-[10px] uppercase tracking-widest rounded-xl transition-all active:scale-[0.98]"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Agendar por WhatsApp
                    </a>
                  </div>
                </div>
              </SectionReveal>

              <SectionReveal delay={0.2}>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-xs text-muted-foreground">
                  <span className="flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-full border border-border"><ShieldCheck className="w-3.5 h-3.5 text-primary/50" /> Cancelación con 48 hrs</span>
                  <span className="flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-full border border-border"><ShieldCheck className="w-3.5 h-3.5 text-primary/50" /> Reembolso del anticipo</span>
                  <span className="flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-full border border-border"><BadgeCheck className="w-3.5 h-3.5 text-primary/50" /> Validez oficial SEP e IMSS</span>
                </div>
              </SectionReveal>
            </div>
          </section>

        </main>

        <Footer />

        {/* ══════════════════════════════════════════════════════
            STICKY CTA — Mobile only
            ══════════════════════════════════════════════════════ */}
        <div
          className={`fixed bottom-0 left-0 right-0 z-50 md:hidden transition-all duration-300 ${showStickyCta ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
        >
          <div className="bg-card/95 backdrop-blur-lg border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-4 py-3">
            <div className="flex gap-2.5 max-w-lg mx-auto">
              <Link
                href="/evaluacion-tdah-adultos"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-primary text-primary-foreground font-bold text-[10px] uppercase tracking-widest rounded-xl shadow-md active:scale-[0.97] transition-all"
              >
                <Brain className="w-4 h-4" />
                Evaluarme
              </Link>
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hola Karen, leí tu guía sobre TDAH en adultos y me gustaría orientación.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-whatsapp text-white font-bold text-[10px] uppercase tracking-widest rounded-xl hover:opacity-90 transition-all active:scale-[0.97]"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
