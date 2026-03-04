import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight, ArrowDown, Brain, FileText, CheckCircle2, Circle,
  ShieldCheck, AlertCircle, MessageCircle, Phone, Clock, Award,
  Star, Users, CalendarCheck, Stethoscope, BookOpen, ChevronDown,
  Shield, BadgeCheck, Heart, XCircle, Sparkles, TrendingDown, AlertTriangle,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

/* ═══════════════════════════════════════════════════════════════
   CONFIG
   ═══════════════════════════════════════════════════════════════ */
const CAL_URL = 'https://cal.com/psicologa-karen-trujillo/evaluacion-tdah-infantil';
const WA_NUMBER = '529983211547';
const PHONE_NUMBER = '529983211547';

/* ═══════════════════════════════════════════════════════════════
   COPY DATA — REESCRITO CON ARQUITECTURA PAS
   ═══════════════════════════════════════════════════════════════ */

/* ── P: PROBLEMA — Reconocimiento inmediato ── */
const painPoints = [
  {
    icon: BookOpen,
    headline: '"No pone atención"',
    text: 'La maestra lo dice en cada junta. Tú sabes que es listo. Pero nadie te dice qué hacer con esa información.',
  },
  {
    icon: Users,
    headline: 'La tarea es una batalla diaria',
    text: 'Una hora de trabajo que debería tomar 15 minutos. Llanto, evasión, tensión. Y al final, la noche de todos arruinada.',
  },
  {
    icon: Brain,
    headline: 'Lo que sabes no coincide con lo que ves',
    text: 'Habla como adulto, razona bien, pero no puede terminar un ejercicio de matemáticas. La inconsistencia te desconcierta.',
  },
  {
    icon: Heart,
    headline: 'El miedo a la etiqueta equivocada',
    text: 'No quieres que lo marquen sin razón. Pero tampoco puedes seguir esperando a que "se le pase" solo.',
  },
];

/* ── A: AGITACIÓN — Costo de no actuar ── */
const costOfWaiting = [
  { stat: '2-3 años', label: 'promedio que una familia espera antes de buscar una evaluación formal', icon: Clock },
  { stat: 'Cada mes', label: 'sin diagnóstico es un mes donde la escuela no puede adaptar su plan de aprendizaje', icon: TrendingDown },
  { stat: 'Sin informe', label: 'el maestro actúa por intuición — y no siempre acierta', icon: AlertTriangle },
];

/* ── S: SOLUCIÓN — Síntomas ── */
const symptoms = [
  'No termina las tareas aunque sabe hacerlas',
  'Se distrae con cualquier estímulo externo',
  'Pierde útiles, ropa o juguetes con frecuencia',
  'Interrumpe constantemente a adultos o compañeros',
  'En clase parece "estar en las nubes"',
  'Reacciona de forma exagerada ante frustraciones',
  'Le cuesta esperar su turno en juegos o actividades',
  'Los maestros lo describen como "distraído" o "impulsivo"',
];

/* ── S: SOLUCIÓN — Proceso simplificado ── */
const proceso = [
  {
    n: '01',
    titulo: 'Escuchamos tu historia',
    desc: 'Karen se sienta contigo (sin el niño). Escucha todo: la escuela, la casa, el historial, tus preocupaciones. Tú hablas, ella toma nota.',
    duracion: '60-90 min',
    etiqueta: 'Primera cita — solo padres',
  },
  {
    n: '02',
    titulo: 'Tu hijo juega con pruebas clínicas',
    desc: 'Sesiones diseñadas para que sean amigables. El niño no siente que lo están "evaluando" — está resolviendo retos interesantes.',
    duracion: '2-3 sesiones',
    etiqueta: 'Proceso con el niño',
  },
  {
    n: '03',
    titulo: 'La escuela también aporta su perspectiva',
    desc: 'Los maestros completan cuestionarios estandarizados. Así el diagnóstico refleja cómo se comporta en todos los contextos.',
    duracion: 'Remoto',
    etiqueta: 'Input escolar',
  },
  {
    n: '04',
    titulo: 'Karen analiza todo el cuadro clínico',
    desc: 'Integra los datos de padres, niño y escuela. Redacta el informe con diagnóstico diferencial — no solo TDAH vs no-TDAH.',
    duracion: '5-7 días',
    etiqueta: 'Análisis clínico',
  },
  {
    n: '05',
    titulo: 'Te explicamos qué encontramos — y qué sigue',
    desc: 'Una sesión para que entiendas el diagnóstico en lenguaje humano, qué necesita tu hijo y cómo pedirle a la escuela que actúe.',
    duracion: '60 min',
    etiqueta: 'Sesión de devolución',
  },
];

const instrumentos = [
  { nombre: 'CONNERS-3', desc: 'Escala de síntomas TDAH — perspectiva de padres, maestros y el propio niño' },
  { nombre: 'WISC-V', desc: 'Perfil cognitivo completo: qué sabe, cómo procesa, dónde se bloquea' },
  { nombre: 'BRIEF-2', desc: 'Funciones ejecutivas en contexto cotidiano — la escuela y el hogar' },
  { nombre: 'CPT-3', desc: 'Prueba computarizada que mide atención real, no solo lo que el niño reporta' },
];

const informeIncludes = [
  'Diagnóstico diferencial claro — no una "impresión"',
  'Perfil neuropsicológico de tu hijo con percentiles',
  'Qué tipo de apoyo necesita (terapéutico y escolar)',
  'Adecuaciones curriculares listas para entregar al colegio',
  'Plan de acción a corto y mediano plazo',
  'Validez oficial ante SEP, IMSS y cualquier institución educativa en México',
];

/* ── ANTES / DESPUÉS — CRO clásico ── */
const beforeAfter = [
  {
    before: 'La maestra dice "es problema de conducta" y no hay plan',
    after: 'La escuela implementa adecuaciones curriculares basadas en el informe',
  },
  {
    before: 'Tu intuición contra la del médico o el maestro',
    after: 'Un perfil neuropsicológico que explica exactamente qué pasa y por qué',
  },
  {
    before: 'Estrategias genéricas de internet que no funcionan con él',
    after: 'Intervenciones diseñadas para el perfil específico de tu hijo',
  },
  {
    before: 'Culpa, incertidumbre, desgaste emocional en casa',
    after: 'Claridad. Un plan. Y la tranquilidad de saber que hiciste lo correcto',
  },
];

/* ── COMPARATIVA ── */
const comparativaItems = [
  {
    aspecto: 'Qué mide',
    psicologia: 'Conducta, emociones y relaciones — por observación',
    neuropsicologia: 'Funciones ejecutivas: atención, memoria de trabajo, velocidad de procesamiento',
  },
  {
    aspecto: 'Resultado',
    psicologia: 'Impresión diagnóstica cualitativa — subjetiva',
    neuropsicologia: 'Perfil cognitivo cuantificable con percentiles internacionales',
  },
  {
    aspecto: 'Diagnóstico diferencial',
    psicologia: 'Limitado a lo que el clínico observa en consulta',
    neuropsicologia: 'Diferencia TDAH de ansiedad, TEA o dificultades de aprendizaje con datos objetivos',
  },
  {
    aspecto: 'Validez escolar',
    psicologia: 'Variable — muchas escuelas no lo aceptan formalmente',
    neuropsicologia: 'Informe con cédula federal aceptado por SEP, IMSS y colegios privados',
  },
];

/* ── SOCIAL PROOF — Reviews con outcome explícito ── */
const reviews = [
  {
    name: 'Mamá de Sofía, 7 años',
    outcome: 'La escuela implementó adecuaciones en dos semanas',
    text: 'Llevábamos un año yendo de un médico a otro sin un papel concreto. El informe de Karen fue tan claro que la directora llamó ella misma para coordinar el apoyo.',
    stars: 5,
  },
  {
    name: 'Papá de Diego, 10 años',
    outcome: 'Por fin entendimos por qué las estrategias no funcionaban',
    text: 'Pensábamos que era flojera. El informe mostró que tiene memoria de trabajo muy baja — eso cambia todo. Ahora aplicamos estrategias que sí funcionan para él.',
    stars: 5,
  },
  {
    name: 'Mamá de Valentina, 6 años',
    outcome: 'De la culpa a un plan claro',
    text: 'Me quitó un peso enorme de encima. No era que yo lo estuviera haciendo mal — era que nadie nos había dado el mapa correcto. Ahora lo tenemos.',
    stars: 5,
  },
];

/* ── FAQ — Enfocado en eliminar objeciones de compra ── */
const faqItems = [
  {
    q: '¿En qué consiste esta "primera cita"? ¿A qué me comprometo?',
    a: 'La primera cita es solo una conversación con Karen — sin el niño. Ella escucha el historial, tus preocupaciones y el contexto escolar. No hay pruebas todavía. El anticipo de $1,000 MXN solo aparta tu lugar en la agenda y forma parte del total de $7,000 MXN. Si decides no continuar, se reembolsa con 48 horas de anticipación.',
  },
  {
    q: '¿Cuánto cuesta la valoración completa?',
    a: 'El costo total es $7,000 MXN, que incluye todas las citas (4-5), las pruebas estandarizadas (CONNERS-3, WISC-V, BRIEF-2, CPT-3), el informe clínico completo y la sesión de devolución. Al agendar, solo se solicita un anticipo de $1,000 MXN que ya forma parte del total — no es un costo adicional.',
  },
  {
    q: '¿Cuánto tiempo toma todo el proceso?',
    a: 'Entre 2 y 3 semanas, distribuidas en 4-5 citas presenciales en Cancún. La primera cita es solo con los padres (60-90 min). Las sesiones con el niño son 2-3 sesiones de 60 min cada una, diseñadas para que sean amigables y no generen ansiedad. El informe se entrega 5-7 días después de la última sesión.',
  },
  {
    q: '¿Qué pasa si el resultado NO indica TDAH?',
    a: 'El informe sigue siendo completamente valioso. El proceso identifica el perfil cognitivo real de tu hijo — puede revelar ansiedad, dificultades de aprendizaje, altas capacidades o simplemente cómo aprende mejor. "No tiene TDAH" no es una respuesta vacía: es el inicio de intervenciones correctas.',
  },
  {
    q: '¿El informe sirve para la escuela y el IMSS?',
    a: 'Sí. El informe clínico está respaldado por la Cédula Profesional Federal 11009616, emitida por la SEP. Tiene validez ante instituciones educativas públicas y privadas, la Secretaría de Educación Pública, IMSS y dependencias gubernamentales en todo México.',
  },
  {
    q: '¿Puedo cancelar si cambio de opinión?',
    a: 'Sí. El anticipo de $1,000 MXN es reembolsable si cancelas con al menos 48 horas antes de la primera cita. Fuera de ese plazo, se aplica como crédito para reagendar. Sin costos ocultos.',
  },
  {
    q: '¿Puedo hablar con Karen antes de agendar?',
    a: 'Sí. Si tienes dudas antes de reservar, puedes escribir directamente por WhatsApp. Karen responde preguntas sobre el proceso para que tomes la decisión con información completa.',
  },
  {
    q: '¿Se puede pagar en parcialidades?',
    a: 'El proceso se estructura en dos momentos: anticipo de $1,000 MXN al agendar y el resto ($6,000 MXN) antes de la sesión de devolución. Si necesitas otra estructura, consúltalo por WhatsApp.',
  },
];

/* ═══════════════════════════════════════════════════════════════
   SCHEMA — sin cambios funcionales
   ═══════════════════════════════════════════════════════════════ */
const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'MedicalWebPage',
      name: 'Valoración Neuropsicológica de TDAH Infantil en Cancún',
      url: 'https://psicologakarentrujillo.com.mx/evaluacion-tdah-ninos',
      description: 'Evaluación neuropsicológica de TDAH en niños y adolescentes (5-17 años) en Cancún. Diagnóstico con CONNERS-3, WISC-V, BRIEF-2 y CPT-3. Informe clínico con cédula federal 11009616.',
      inLanguage: 'es-MX',
    },
  ],
};

/* ═══════════════════════════════════════════════════════════════
   COMPONENTES UI
   ═══════════════════════════════════════════════════════════════ */

function scrollToBooking(e: React.MouseEvent) {
  e.preventDefault();
  document.getElementById('agendar')?.scrollIntoView({ behavior: 'smooth' });
}

function CtaButton({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <a
      href="#agendar"
      onClick={scrollToBooking}
      className={`group inline-flex items-center gap-2.5 bg-gradient-primary text-primary-foreground font-bold text-[11px] uppercase tracking-widest px-7 py-4 rounded-xl shadow-xl shadow-primary/30 hover:shadow-primary/40 hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-300 ${className}`}
    >
      {children}
      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
    </a>
  );
}

function SectionReveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.unobserve(el); } }, { rootMargin: '-40px' });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transitionDelay: `${delay}s`,
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      {children}
    </div>
  );
}

function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-3.5 h-3.5 fill-warning text-warning" />
      ))}
    </div>
  );
}

/* ── Symptom Checker ── */
function SymptomChecker({ onCountChange }: { onCountChange?: (n: number) => void }) {
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const count = selected.size;

  useEffect(() => { onCountChange?.(count); }, [count, onCountChange]);

  const toggle = (i: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  const getResult = () => {
    if (count === 0) return null;
    if (count <= 2) return {
      label: 'Pocas señales por ahora',
      description: 'Si persisten en múltiples contextos, una consulta orientativa puede darte claridad sin necesidad de una valoración completa.',
      color: 'border-success bg-success/5 text-success',
    };
    if (count <= 4) return {
      label: 'Vale la pena explorar',
      description: 'Varias señales de forma consistente sugieren que una valoración aportaría información concreta y útil.',
      color: 'border-accent-blue bg-accent-blue/5 text-accent-blue',
    };
    return {
      label: 'Una valoración es muy recomendable',
      description: 'Muchas señales presentes en más de un contexto (casa y escuela) justifican un proceso formal. No sigas operando sin esta información.',
      color: 'border-primary bg-primary/5 text-primary',
    };
  };

  const result = getResult();

  return (
    <div className="bg-card rounded-3xl border-2 border-border overflow-hidden shadow-xl shadow-primary/5">
      <div className="p-6 sm:p-8 border-b border-border bg-gradient-to-br from-secondary/80 to-secondary/30">
        <div className="flex items-center gap-3 mb-3">
          <AlertCircle className="w-5 h-5 text-accent-blue shrink-0" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Herramienta orientativa · No reemplaza el diagnóstico clínico</span>
        </div>
        <h3 className="text-2xl font-serif font-bold text-primary mb-2">¿Cuántas de estas señales reconoces?</h3>
        <p className="text-muted-foreground text-sm font-light">Selecciona las que se presentan de forma frecuente y en más de un contexto.</p>
      </div>

      <div className="p-6 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-5">
          {count > 0 ? `${count} señal${count !== 1 ? 'es' : ''} marcada${count !== 1 ? 's' : ''}` : 'Toca para seleccionar'}
        </p>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {symptoms.map((s, i) => {
            const isSelected = selected.has(i);
            return (
              <button
                key={i}
                onClick={() => toggle(i)}
                aria-pressed={isSelected}
                className={`flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer w-full active:scale-[0.97]
                  ${isSelected ? 'border-primary bg-primary/8 shadow-md shadow-primary/10' : 'border-border bg-card hover:border-accent-blue/50 hover:bg-accent-blue/5 hover:shadow-sm'}`}
              >
                <span className="shrink-0 mt-0.5">
                  {isSelected ? <CheckCircle2 className="w-4 h-4 text-primary" /> : <Circle className="w-4 h-4 text-muted-foreground/30" />}
                </span>
                <span className={`text-sm leading-snug ${isSelected ? 'text-primary font-medium' : 'text-foreground font-light'}`}>{s}</span>
              </button>
            );
          })}
        </div>

        {/* Result */}
        <div
          className="grid transition-all duration-300"
          style={{ gridTemplateRows: result ? '1fr' : '0fr', opacity: result ? 1 : 0, marginBottom: result ? '1.5rem' : 0, transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
        >
          <div className="overflow-hidden">
            {result && (
              <div className={`rounded-xl border-2 p-5 ${result.color}`}>
                <p className="font-bold mb-1">{result.label}</p>
                <p className="text-sm font-light leading-relaxed opacity-80">{result.description}</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <CtaButton className="flex-1 justify-center">
            {count > 4 ? 'Reservar mi primera consulta' : 'Ver fechas disponibles'}
          </CtaButton>
          {count > 0 && (
            <button onClick={() => setSelected(new Set())} className="px-6 py-4 rounded-xl border-2 border-border text-xs font-bold uppercase tracking-widest text-muted-foreground hover:border-primary hover:text-primary transition-all">
              Reiniciar
            </button>
          )}
        </div>
        <p className="text-[10px] text-muted-foreground/50 text-center mt-4">Solo una valoración neuropsicológica formal puede establecer un diagnóstico.</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE — FUNNEL PAS → SOCIAL PROOF → FAQ → CTA
   ═══════════════════════════════════════════════════════════════ */
export default function TDAHNinosFunnel() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [symptomCount, setSymptomCount] = useState(0);
  const [calLoaded, setCalLoaded] = useState(false);
  const [calVisible, setCalVisible] = useState(false);
  const heroCTARef = useRef<HTMLDivElement>(null);
  const [heroCTAInView, setHeroCTAInView] = useState(true);
  const calSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroCTARef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => setHeroCTAInView(entry.isIntersecting), { rootMargin: '0px 0px -80px 0px' });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const el = calSectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setCalVisible(true); obs.unobserve(el); } }, { rootMargin: '400px' });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <Head>
        <title>Valoración TDAH Infantil en Cancún · Niños 5-17 | Karen Trujillo</title>
        <meta name="description" content="¿Tu hijo no pone atención en la escuela? Valoración neuropsicológica de TDAH infantil en Cancún (5-17 años). Informe oficial con cédula 11009616. Agenda tu primera cita hoy." />
        <link rel="canonical" href="https://psicologakarentrujillo.com.mx/evaluacion-tdah-ninos" />
        <meta name="geo.region" content="MX-ROO" />
        <meta name="geo.placename" content="Cancún, Quintana Roo" />
        <meta name="geo.position" content="21.1619;-86.8515" />
        <meta name="ICBM" content="21.1619, -86.8515" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Valoración TDAH Infantil en Cancún · Niños 5-17 | Karen Trujillo" />
        <meta property="og:description" content="Deja de adivinar. Entiende a tu hijo. Valoración neuropsicológica formal en Cancún con informe oficial." />
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
              1 · HERO — BENEFICIO PRIMERO, NO EL PROCESO
              Headline magnético: resultado emocional
              CTA: "primer paso", no "compra la terapia"
              ══════════════════════════════════════════════════════ */}
          <section className="relative flex items-center justify-center pt-28 pb-16 px-6 overflow-hidden bg-soft-gradient">
            {/* Atmospheric blobs */}
            <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-accent-blue/20 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/3 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-pink/25 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4 animate-pulse" style={{ animationDelay: '1.5s' }} />
            <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

            <div className="max-w-4xl mx-auto relative z-10 text-center">

              <nav aria-label="Breadcrumb" className="mb-6 animate-[fadeIn_0.6s_ease-out_both]">
                <ol className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <li><Link href="/" className="hover:text-primary transition-colors">Inicio</Link></li>
                  <li className="text-border">/</li>
                  <li className="text-primary font-medium">Valoración TDAH Infantil</li>
                </ol>
              </nav>

              <div className="animate-[fadeInUp_0.8s_ease-out_both]">

                {/* Urgencia suave — sin presión artificial */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border shadow-lg shadow-primary/5 mb-8 ring-1 ring-primary/10 max-w-full">
                  <span className="w-2 h-2 rounded-full bg-warning animate-pulse shadow-sm shadow-warning shrink-0" />
                  <span className="text-[9px] uppercase tracking-[0.12em] font-bold text-muted-foreground text-center leading-snug">Lugares limitados · Cancún · Niños 5–17 años</span>
                </div>

                {/*
                  ╔══════════════════════════════════════════════════════╗
                  ║  HEADLINE MAGNÉTICO                                   ║
                  ║  → Beneficio emocional central: claridad / paz mental ║
                  ║  → No menciona "evaluación", "pruebas" ni "proceso"  ║
                  ║  → Habla del HIJO, no del servicio                    ║
                  ╚══════════════════════════════════════════════════════╝
                */}
                <h1 className="text-[2.1rem] sm:text-5xl lg:text-[3.5rem] font-serif font-bold text-primary leading-[1.1] mb-5 text-balance">
                  Tu hijo no es difícil.<br className="hidden sm:block" />
                  <span className="text-primary/70 italic">Merece ser entendido.</span>
                </h1>

                {/*
                  SUBTÍTULO — Puente entre el dolor y la solución
                  Agita levemente, luego promete el outcome concreto
                */}
                <p className="text-base sm:text-xl font-light text-muted-foreground leading-relaxed mb-3 max-w-2xl mx-auto">
                  Llevas meses escuchando que "no pone atención" — sin un plan, sin respuestas concretas.
                  <strong className="text-primary font-semibold"> Una sola valoración neuropsicológica</strong> puede explicar todo lo que ves
                  y darte un camino claro para este año escolar.
                </p>

                <p className="text-xs sm:text-sm text-muted-foreground/70 mb-10">
                  <strong className="text-primary">Neuropsicóloga Karen Trujillo</strong> · Cédula Federal 11009616 · Cancún, Quintana Roo
                </p>
              </div>

              {/*
                ╔══════════════════════════════════════════════════════╗
                ║  CTA PRINCIPAL — "PRIMER PASO", NO "COMPRA LA TERAPIA" ║
                ║  → Vendemos la cita de descubrimiento                 ║
                ║  → Micro-copy elimina ansiedad del clic               ║
                ╚══════════════════════════════════════════════════════╝
              */}
              <div ref={heroCTARef} className="flex flex-col items-center gap-3 mb-4 animate-[fadeInUp_0.8s_ease-out_0.3s_both]">
                <CtaButton className="text-sm px-8 py-5">
                  Reservar mi primera consulta
                </CtaButton>

                {/* Micro-copy anti-ansiedad — debajo del botón, no encima */}
                <p className="text-[11px] text-muted-foreground/60 font-light">
                  Sin compromiso · Solo eliges fecha y hora · Cancelación gratis hasta 48 hrs antes
                </p>
              </div>

              {/* Secondary CTA — para los indecisos */}
              <div className="mb-12 animate-[fadeInUp_0.8s_ease-out_0.4s_both]">
                <a
                  href="#sintomas"
                  onClick={(e) => { e.preventDefault(); document.getElementById('sintomas')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="group inline-flex items-center justify-center gap-2 font-bold text-[9px] uppercase tracking-wide px-6 py-3 rounded-xl border-2 border-primary/15 text-primary/60 hover:border-primary/30 hover:text-primary transition-all duration-300"
                >
                  ¿Cómo sé si mi hijo necesita esto?
                  <ArrowDown className="w-3 h-3 transition-transform group-hover:translate-y-0.5 shrink-0" />
                </a>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs text-muted-foreground animate-[fadeIn_0.8s_ease-out_0.6s_both]">
                {[
                  { icon: BadgeCheck, text: 'Cédula Federal 11009616' },
                  { icon: Stethoscope, text: 'Pruebas estandarizadas internacionales' },
                  { icon: Shield, text: 'Informe válido ante SEP e IMSS' },
                ].map((badge) => (
                  <span key={badge.text} className="flex items-center gap-1.5">
                    <badge.icon className="w-3.5 h-3.5 text-primary/50" />
                    <span className="font-medium">{badge.text}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
          </section>


          {/* ══════════════════════════════════════════════════════
              2 · P (PROBLEMA) — Reconocimiento inmediato
              El padre debe sentir: "esto soy yo"
              ══════════════════════════════════════════════════════ */}
          <section id="sintomas" className="py-14 sm:py-20 bg-secondary scroll-mt-24">
            <div className="max-w-4xl mx-auto px-6">
              <SectionReveal>
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent-blue mb-4 text-center">Muchos padres llegan aquí después de meses de incertidumbre</p>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-4 text-center text-balance">¿Te suena familiar?</h2>
                <p className="text-muted-foreground font-light text-center max-w-2xl mx-auto mb-10">
                  No es que seas mal padre. Es que nadie te ha dado información suficiente para entender lo que le pasa a tu hijo.
                </p>
              </SectionReveal>

              <div className="grid sm:grid-cols-2 gap-4 mb-10">
                {painPoints.map((point, i) => (
                  <SectionReveal key={i} delay={i * 0.08}>
                    <div className="flex items-start gap-4 p-5 rounded-2xl bg-card border border-border hover:border-accent-blue/50 hover:shadow-md transition-all duration-300 group relative overflow-hidden h-full">
                      <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/0 to-accent-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-blue/15 to-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                        <point.icon className="w-4 h-4 text-primary/70" />
                      </div>
                      <div className="relative">
                        <p className="font-bold text-primary text-sm mb-1">{point.headline}</p>
                        <p className="text-muted-foreground text-sm font-light leading-relaxed">{point.text}</p>
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>

              {/* Symptom checker */}
              <SectionReveal delay={0.2}>
                <SymptomChecker onCountChange={setSymptomCount} />
              </SectionReveal>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              3 · A (AGITACIÓN) — Costo de no actuar
              No asustamos: informamos con datos concretos
              ══════════════════════════════════════════════════════ */}
          <section className="py-14 sm:py-20 bg-card border-t border-border">
            <div className="max-w-4xl mx-auto px-6">
              <SectionReveal>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4 text-center">Lo que pasa mientras se espera</p>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-4 text-center text-balance">
                  Cada ciclo escolar sin diagnóstico<br className="hidden sm:block" /> tiene un costo real
                </h2>
                <p className="text-muted-foreground font-light text-center max-w-xl mx-auto mb-12">
                  No en términos económicos. En oportunidades perdidas de aprendizaje, autoestima erosionada y estrategias escolares que simplemente no están diseñadas para él.
                </p>
              </SectionReveal>

              <div className="grid sm:grid-cols-3 gap-5 mb-12">
                {costOfWaiting.map((item, i) => (
                  <SectionReveal key={i} delay={i * 0.1}>
                    <div className="bg-secondary rounded-2xl border border-border p-6 text-center hover:border-primary/30 hover:shadow-md transition-all duration-300">
                      <item.icon className="w-7 h-7 text-primary/40 mx-auto mb-4" />
                      <p className="text-3xl font-serif font-bold text-primary mb-2">{item.stat}</p>
                      <p className="text-sm text-muted-foreground font-light leading-snug">{item.label}</p>
                    </div>
                  </SectionReveal>
                ))}
              </div>

              {/* Antes / Después — el argumento más poderoso */}
              <SectionReveal delay={0.2}>
                <div className="bg-secondary rounded-3xl border border-border overflow-hidden">
                  <div className="grid grid-cols-2">
                    <div className="p-4 bg-secondary/80 border-b border-r border-border text-center">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Sin diagnóstico</p>
                    </div>
                    <div className="p-4 bg-primary/8 border-b border-border text-center">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Con diagnóstico formal</p>
                    </div>
                  </div>
                  {beforeAfter.map((item, i) => (
                    <div key={i} className={i !== beforeAfter.length - 1 ? 'border-b border-border' : ''}>
                      <div className="grid grid-cols-2">
                        <div className="border-r border-border p-4 flex items-start gap-2">
                          <XCircle className="w-3.5 h-3.5 text-muted-foreground/40 shrink-0 mt-0.5" />
                          <p className="text-xs text-muted-foreground font-light leading-relaxed">{item.before}</p>
                        </div>
                        <div className="p-4 bg-primary/3 flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary/60 shrink-0 mt-0.5" />
                          <p className="text-xs text-foreground font-medium leading-relaxed">{item.after}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </SectionReveal>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              4 · S (SOLUCIÓN) — Proceso humanizado
              Vendemos claridad, no "aplicación de pruebas"
              ══════════════════════════════════════════════════════ */}
          <section className="py-14 sm:py-20 bg-secondary border-t border-border">
            <div className="max-w-4xl mx-auto px-6">
              <SectionReveal>
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent-blue mb-4 text-center">Cómo funciona</p>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-4 text-center text-balance">
                  El proceso es más simple<br className="hidden sm:block" /> de lo que imaginas
                </h2>
                <p className="text-muted-foreground font-light text-center max-w-xl mx-auto mb-12">
                  No es un interrogatorio. No es intimidante para el niño. Es un proceso diseñado para obtener la imagen más precisa posible de cómo funciona su cerebro.
                </p>
              </SectionReveal>

              <div className="space-y-4">
                {proceso.map((paso, i) => (
                  <SectionReveal key={paso.n} delay={i * 0.08}>
                    <div className="flex gap-5 p-5 sm:p-6 bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300 group">
                      <div className="flex flex-col items-center gap-2 shrink-0">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                          <span className="text-[11px] font-black text-primary/60">{paso.n}</span>
                        </div>
                        {i < proceso.length - 1 && <div className="w-px h-full bg-border min-h-[16px]" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                          <h3 className="text-base font-bold text-primary">{paso.titulo}</h3>
                          <div className="flex items-center gap-3 shrink-0">
                            <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/50 bg-secondary px-2 py-1 rounded-md border border-border">{paso.etiqueta}</span>
                            <span className="flex items-center gap-1 text-[10px] text-muted-foreground/60">
                              <Clock className="w-3 h-3 shrink-0" /> {paso.duracion}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground font-light leading-relaxed">{paso.desc}</p>
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              5 · QUÉ INCLUYE EL INFORME
              El producto tangible que justifica la inversión
              ══════════════════════════════════════════════════════ */}
          <section className="py-14 sm:py-20 bg-gradient-primary text-primary-foreground w-full">
            <div className="max-w-4xl mx-auto px-6">
              <SectionReveal>
                <div className="text-center mb-10">
                  <FileText className="w-10 h-10 text-accent-blue mx-auto mb-5" />
                  <h2 className="text-3xl sm:text-4xl font-serif font-bold italic mb-4">Lo que recibes al final del proceso</h2>
                  <p className="text-primary-foreground/70 font-light max-w-xl mx-auto">
                    No es una carta de opinión. Es un documento clínico formal que la escuela debe respetar, y que te da un mapa concreto para ayudar a tu hijo.
                  </p>
                </div>
              </SectionReveal>

              <div className="grid sm:grid-cols-2 gap-3 mb-8">
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

              <SectionReveal delay={0.3}>
                <div className="bg-white/8 border border-white/15 rounded-2xl p-5 sm:p-8">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-primary-foreground/50 mb-6">Pruebas que se aplican durante el proceso</p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {instrumentos.map((inst) => (
                      <div key={inst.nombre} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10 w-full">
                        <div className="w-8 h-8 rounded-lg bg-accent-blue/20 border border-accent-blue/20 flex items-center justify-center shrink-0 mt-0.5">
                          <Brain className="w-3.5 h-3.5 text-accent-blue" />
                        </div>
                        <div>
                          <p className="font-bold text-primary-foreground text-sm mb-0.5">{inst.nombre}</p>
                          <p className="text-xs text-primary-foreground/55 font-light leading-relaxed">{inst.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </SectionReveal>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              6 · DIFERENCIADOR — Por qué neuropsicología
              ══════════════════════════════════════════════════════ */}
          <section className="py-14 sm:py-20 bg-card border-t border-border">
            <div className="max-w-4xl mx-auto px-6">
              <SectionReveal>
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent-blue mb-4 text-center">Por qué no es lo mismo que ir con cualquier psicólogo</p>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-6 text-center text-balance">
                  La diferencia entre una impresión<br className="hidden sm:block" /> y un perfil cognitivo real
                </h2>
                <p className="text-muted-foreground font-light text-center max-w-2xl mx-auto mb-10">
                  Un psicólogo clínico evalúa conducta a través de observación y entrevista. Un neuropsicólogo aplica pruebas estandarizadas que <strong className="text-primary font-semibold">miden las funciones del cerebro con números</strong> — no con impresiones.
                  Esa diferencia importa cuando necesitas convencer a la escuela, al IMSS o a un especialista médico.
                </p>
              </SectionReveal>

              <SectionReveal delay={0.15}>
                <div className="max-w-3xl mx-auto bg-secondary/50 rounded-3xl border border-border overflow-hidden">
                  <div className="grid grid-cols-2">
                    <div className="p-3 sm:p-4 bg-secondary/80 border-b border-r border-border text-center">
                      <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Psicología clínica</p>
                    </div>
                    <div className="p-3 sm:p-4 bg-primary/8 border-b border-border text-center">
                      <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-primary">Neuropsicología</p>
                    </div>
                  </div>
                  {comparativaItems.map((item, i) => (
                    <div key={item.aspecto} className={i !== comparativaItems.length - 1 ? 'border-b border-border' : ''}>
                      <div className="px-3 sm:px-4 pt-3 pb-2 bg-secondary/40 border-b border-border/50">
                        <p className="text-[11px] sm:text-xs font-bold text-primary">{item.aspecto}</p>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="border-r border-border p-3 sm:p-4 flex items-start gap-1.5 sm:gap-2">
                          <XCircle className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-muted-foreground/40 shrink-0 mt-0.5" />
                          <p className="text-[11px] sm:text-xs text-muted-foreground font-light leading-relaxed">{item.psicologia}</p>
                        </div>
                        <div className="p-3 sm:p-4 bg-primary/3 flex items-start gap-1.5 sm:gap-2">
                          <CheckCircle2 className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-primary/60 shrink-0 mt-0.5" />
                          <p className="text-[11px] sm:text-xs text-foreground font-medium leading-relaxed">{item.neuropsicologia}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </SectionReveal>

              <SectionReveal delay={0.3}>
                <div className="mt-10 text-center">
                  <CtaButton>Reservar mi primera consulta</CtaButton>
                </div>
              </SectionReveal>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              7 · SOCIAL PROOF — Reviews con OUTCOME explícito
              No es "me fue bien". Es "esto cambió después".
              ══════════════════════════════════════════════════════ */}
          <section className="py-14 sm:py-20 bg-secondary border-t border-border">
            <div className="max-w-4xl mx-auto px-6">
              <SectionReveal>
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent-blue mb-4 text-center">Lo que dicen los padres</p>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-4 text-center text-balance">
                  Lo que cambió después<br className="hidden sm:block" /> de la valoración
                </h2>
                <p className="text-muted-foreground font-light text-center max-w-xl mx-auto mb-12">
                  No vendemos paz mental en abstracto. Esto es lo que los padres reportan después de recibir el informe.
                </p>
              </SectionReveal>

              <div className="grid sm:grid-cols-3 gap-5">
                {reviews.map((review, i) => (
                  <SectionReveal key={i} delay={i * 0.1}>
                    <div className="bg-card rounded-2xl border border-border p-6 flex flex-col gap-4 hover:border-primary/30 hover:shadow-md transition-all duration-300 h-full">
                      {/* Outcome badge — lo más importante primero */}
                      <div className="flex items-start gap-2 p-3 rounded-xl bg-primary/5 border border-primary/10">
                        <Sparkles className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                        <p className="text-xs font-bold text-primary leading-snug">{review.outcome}</p>
                      </div>
                      <StarRating count={review.stars} />
                      <p className="text-sm text-muted-foreground font-light leading-relaxed flex-1 italic">"{review.text}"</p>
                      <p className="text-xs font-bold text-primary/60">{review.name}</p>
                    </div>
                  </SectionReveal>
                ))}
              </div>

              {/* Credenciales — refuerzo de autoridad */}
              <SectionReveal delay={0.3}>
                <div className="mt-10 flex flex-wrap justify-center gap-4 sm:gap-8">
                  {[
                    { icon: BadgeCheck, text: 'Cédula Federal 11009616' },
                    { icon: Award, text: '7+ años de experiencia' },
                    { icon: Users, text: 'Más de 100 familias atendidas' },
                    { icon: ShieldCheck, text: 'Pruebas con normas internacionales' },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-2 px-4 py-2.5 bg-card rounded-full border border-border shadow-sm">
                      <item.icon className="w-4 h-4 text-primary/50 shrink-0" />
                      <span className="text-xs font-medium text-muted-foreground">{item.text}</span>
                    </div>
                  ))}
                </div>
              </SectionReveal>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              8 · FAQ — Elimina objeciones antes del clic
              Orden: precio → proceso → riesgos → logística
              ══════════════════════════════════════════════════════ */}
          <section className="py-14 sm:py-20 bg-card border-t border-border">
            <div className="max-w-2xl mx-auto px-6">
              <SectionReveal>
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent-blue mb-4 text-center">Antes de que preguntes</p>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-4 text-center text-balance">
                  Respuestas directas<br className="hidden sm:block" /> a las dudas más comunes
                </h2>
                <p className="text-muted-foreground font-light text-center mb-10">
                  No encontrarás respuestas vagas aquí. Si tienes una duda específica, escríbenos por WhatsApp.
                </p>
              </SectionReveal>

              <div className="space-y-3">
                {faqItems.map((faq, i) => (
                  <SectionReveal key={i} delay={i * 0.04}>
                    <div className="bg-secondary rounded-2xl border border-border overflow-hidden">
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        aria-expanded={openFaq === i}
                        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-secondary/80 transition-colors duration-200"
                      >
                        <span className="text-sm font-bold text-primary leading-snug">{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-primary/40 shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}
                        />
                      </button>
                      <div
                        className="grid transition-all duration-300"
                        style={{ gridTemplateRows: openFaq === i ? '1fr' : '0fr', transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
                      >
                        <div className="overflow-hidden">
                          <div className="px-5 pb-5 pt-1 border-t border-border">
                            <p className="text-sm text-muted-foreground font-light leading-relaxed">{faq.a}</p>
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
              9 · BOOKING — "El primer paso es esto"
              Reframe: no es comprar terapia, es agendar 15 minutos
              Micro-copy elimina cada punto de fricción
              ══════════════════════════════════════════════════════ */}
          <section id="agendar" className="py-16 sm:py-24 bg-soft-gradient border-t border-border scroll-mt-20">
            <div className="max-w-3xl mx-auto px-6">

              <SectionReveal>
                <div className="text-center mb-10">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border shadow-md mb-6">
                    <CalendarCheck className="w-3.5 h-3.5 text-primary" />
                    <span className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">Paso 1 de 5 — Solo eliges fecha y hora</span>
                  </div>

                  {/*
                    HEADLINE DE BOOKING — Vende el primer paso, no la valoración completa
                    La transformación ya ocurrió en la mente del lector.
                    Aquí solo necesitamos reducir la fricción del clic.
                  */}
                  <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-4 text-balance">
                    El primer paso es<br className="hidden sm:block" /> más simple de lo que parece
                  </h2>
                  <p className="text-muted-foreground font-light max-w-xl mx-auto mb-2">
                    Reservas tu lugar. Karen se sienta contigo a escuchar todo lo que has vivido con tu hijo.
                    <strong className="text-primary font-semibold"> Sin pruebas todavía. Sin compromisos adicionales.</strong>
                  </p>
                  <p className="text-sm text-muted-foreground/60 font-light">
                    Solo una conversación — y por primera vez, alguien que sabe lo que buscar.
                  </p>
                </div>
              </SectionReveal>

              {/* Pricing card — claro, sin sorpresas */}
              <SectionReveal delay={0.1}>
                <div className="bg-card border-2 border-border rounded-3xl overflow-hidden shadow-xl shadow-primary/5 mb-6">
                  <div className="p-6 sm:p-8">
                    {/* What you get */}
                    <div className="mb-6">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">Qué incluye la valoración completa</p>
                      <div className="space-y-3">
                        {[
                          '5 citas presenciales en Cancún (padres + niño)',
                          'Pruebas CONNERS-3, WISC-V, BRIEF-2 y CPT-3',
                          'Cuestionarios a maestros incluidos',
                          'Informe clínico con diagnóstico diferencial',
                          'Sesión de devolución + plan de acción',
                          'Validez ante SEP, IMSS y escuelas privadas',
                        ].map((item) => (
                          <div key={item} className="flex items-center gap-3">
                            <CheckCircle2 className="w-4 h-4 text-primary/60 shrink-0" />
                            <span className="text-sm text-foreground font-light">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Price — transparencia total */}
                    <div className="border-t border-border pt-6">
                      <div className="flex items-end justify-between mb-2">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Inversión total</p>
                          <p className="text-4xl font-serif font-bold text-primary">$7,000 <span className="text-lg font-light text-muted-foreground">MXN</span></p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Para apartar tu lugar</p>
                          <p className="text-2xl font-serif font-bold text-primary">$1,000 <span className="text-sm font-light text-muted-foreground">MXN</span></p>
                          <p className="text-[10px] text-muted-foreground/60">ya incluido en el total</p>
                        </div>
                      </div>

                      {/* CTA principal dentro del card */}
                      <a
                        href={CAL_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-center gap-2.5 w-full bg-gradient-primary text-primary-foreground font-bold text-[11px] uppercase tracking-widest py-4 rounded-xl shadow-xl shadow-primary/30 hover:shadow-primary/40 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 mt-4"
                      >
                        <CalendarCheck className="w-4 h-4" />
                        Elegir mi fecha — es gratis hasta confirmar
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                      </a>

                      {/*
                        MICRO-COPY ANTI-ANSIEDAD — debajo del CTA
                        Cada línea elimina una objeción específica
                      */}
                      <div className="mt-3 space-y-1.5 text-center">
                        <p className="text-[11px] text-muted-foreground/70">
                          🔒 Solo pagas $1,000 MXN al confirmar · El resto al final del proceso
                        </p>
                        <p className="text-[11px] text-muted-foreground/60">
                          Cancelación con reembolso completo hasta 48 hrs antes de la primera cita
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </SectionReveal>

              {/* Cal.com iframe */}
              <SectionReveal delay={0.2}>
                <div className="bg-card border-2 border-border rounded-3xl overflow-hidden shadow-lg shadow-primary/5">
                  <div className="p-5 border-b border-border flex items-center justify-between bg-secondary/30">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center">
                        <CalendarCheck className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-bold text-primary text-sm">Selecciona tu fecha</p>
                        <p className="text-[10px] text-muted-foreground">Cancún, Quintana Roo · Horario local</p>
                      </div>
                    </div>
                    {!calLoaded && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className="w-3 h-3 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                        Cargando...
                      </div>
                    )}
                  </div>
                  <div ref={calSectionRef} className="relative" style={{ minHeight: '650px' }}>
                    {calVisible ? (
                      <iframe
                        src={`${CAL_URL}?embed=true&layout=month_view&theme=light`}
                        className="w-full border-0"
                        style={{ height: '650px', minHeight: '600px' }}
                        loading="lazy"
                        onLoad={() => setCalLoaded(true)}
                        title="Agendar valoración TDAH infantil — Neuropsicóloga Karen Trujillo"
                        allow="payment"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-[650px] text-muted-foreground">
                        <div className="text-center">
                          <CalendarCheck className="w-8 h-8 text-primary/30 mx-auto mb-3" />
                          <p className="text-sm font-light">Cargando calendario...</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </SectionReveal>

              {/* Trust signals finales */}
              <SectionReveal delay={0.3}>
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-xs text-muted-foreground">
                  <span className="flex items-center gap-2 px-3 py-1.5 bg-card rounded-full border border-border">
                    <Shield className="w-3.5 h-3.5 text-primary/50" /> Pago seguro
                  </span>
                  <span className="flex items-center gap-2 px-3 py-1.5 bg-card rounded-full border border-border">
                    <Clock className="w-3.5 h-3.5 text-primary/50" /> Cancelación con 48 hrs de anticipación
                  </span>
                  <span className="flex items-center gap-2 px-3 py-1.5 bg-card rounded-full border border-border">
                    <BadgeCheck className="w-3.5 h-3.5 text-primary/50" /> Cédula 11009616
                  </span>
                </div>
              </SectionReveal>

              {/* Alternativa para los que no están listos */}
              <SectionReveal delay={0.4}>
                <div className="mt-10 pt-8 border-t border-border">
                  <p className="text-center text-sm text-muted-foreground font-light mb-2">¿Tienes una duda específica antes de agendar?</p>
                  <p className="text-center text-xs text-muted-foreground/60 font-light mb-5">Escríbenos directamente — sin presión de ventas.</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hola Karen, vi tu página de valoración TDAH infantil y tengo una duda antes de agendar. ¿Me puedes orientar?')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-center gap-2 px-6 py-3.5 bg-whatsapp hover:opacity-90 text-white font-bold text-[10px] uppercase tracking-widest rounded-xl transition-all active:scale-[0.98]"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Preguntar por WhatsApp
                    </a>
                    <a
                      href={`tel:${PHONE_NUMBER}`}
                      className="group flex items-center justify-center gap-2 px-6 py-3.5 bg-card border-2 border-border hover:border-primary/50 text-primary font-bold text-[10px] uppercase tracking-widest rounded-xl transition-all active:scale-[0.98]"
                    >
                      <Phone className="w-4 h-4" />
                      Llamar
                    </a>
                  </div>
                  <p className="text-[10px] text-muted-foreground/50 text-center mt-4">Lunes a Viernes 9:00–7:00 PM · Sábados 9:00–2:00 PM</p>
                </div>
              </SectionReveal>
            </div>
          </section>


          {/* ── Internal linking ── */}
          <section className="py-10 sm:py-12 bg-card border-t border-border">
            <div className="max-w-2xl mx-auto px-6">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-5 text-center">Otros servicios disponibles en Cancún</p>
              <div className="grid sm:grid-cols-2 gap-3">
                <Link href="/evaluacion-tdah-adultos" className="flex items-center gap-3 p-4 bg-secondary border border-border rounded-2xl hover:border-primary/50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group">
                  <ArrowRight className="w-4 h-4 text-primary/50 shrink-0 transition-transform group-hover:translate-x-1" />
                  <div>
                    <span className="text-sm font-bold text-primary block">TDAH en Adultos</span>
                    <span className="text-[10px] text-muted-foreground font-light">Valoración neuropsicológica +18 años</span>
                  </div>
                </Link>
                <Link href="/evaluacion-autismo-cancun" className="flex items-center gap-3 p-4 bg-secondary border border-border rounded-2xl hover:border-primary/50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group">
                  <ArrowRight className="w-4 h-4 text-primary/50 shrink-0 transition-transform group-hover:translate-x-1" />
                  <div>
                    <span className="text-sm font-bold text-primary block">Autismo (TEA)</span>
                    <span className="text-[10px] text-muted-foreground font-light">Diagnóstico con ADOS-2 y M-CHAT</span>
                  </div>
                </Link>
              </div>
            </div>
          </section>

        </main>

        <Footer />

        {/* ── Mobile sticky CTA ── */}
        <div
          className={`fixed bottom-0 left-0 right-0 z-[100] px-4 pb-5 lg:hidden bg-gradient-to-t from-background via-background/95 to-transparent pt-8 transition-all duration-350 ${
            heroCTAInView ? 'opacity-0 translate-y-12 pointer-events-none' : 'opacity-100 translate-y-0'
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
        >
          <a
            href="#agendar"
            onClick={scrollToBooking}
            className="flex flex-col items-center justify-center w-full bg-gradient-primary text-primary-foreground py-3.5 rounded-xl shadow-2xl shadow-primary/35 active:scale-[0.98] transition-transform"
          >
            <span className="font-bold text-[11px] uppercase tracking-widest">
              {symptomCount > 4 ? 'Tu hijo lo necesita — Reservar lugar' : 'Reservar primera consulta'}
            </span>
            <span className="text-[9px] text-primary-foreground/70 font-light mt-0.5">Sin compromiso · Cancelable hasta 48 hrs antes</span>
          </a>
        </div>
      </div>
    </>
  );
}
