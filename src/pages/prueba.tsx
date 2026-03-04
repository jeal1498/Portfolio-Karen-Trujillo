import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight, Brain, FileText, CheckCircle2, Circle,
  ShieldCheck, AlertCircle, MessageCircle, Phone, Clock, Award,
  Star, Users, CalendarCheck, Stethoscope, ChevronDown,
  Shield, BadgeCheck, Heart, Zap, Lock,
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
   DATA — Funnel optimized (informational bloat removed)
   ═══════════════════════════════════════════════════════════════ */

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

/* proceso — kept for schema HowTo only */
const proceso = [
  { n: '01', titulo: 'Entrevista inicial con padres', desc: 'Anamnesis clínica, historial de desarrollo, contexto escolar y familiar.', duracion: '60-90 min' },
  { n: '02', titulo: 'Aplicación de pruebas al niño', desc: 'Sesiones con CONNERS-3, WISC-V, BRIEF-2 y CPT-3.', duracion: '2-3 sesiones' },
  { n: '03', titulo: 'Cuestionarios a maestros', desc: 'Escalas de conducta y atención completadas por docentes.', duracion: 'Remoto' },
  { n: '04', titulo: 'Análisis e informe clínico', desc: 'Integración de datos, diagnóstico diferencial y perfil neuropsicológico.', duracion: '5-7 días' },
  { n: '05', titulo: 'Sesión de devolución', desc: 'Explicación del diagnóstico, recomendaciones terapéuticas y adecuaciones.', duracion: '60 min' },
];

/* Outcome-first benefits — replaces process/instruments sections */
const funnelBenefits = [
  {
    icon: FileText,
    title: 'Diagnóstico con nombre y apellido',
    desc: 'Informe clínico completo con validez oficial ante SEP, IMSS y escuelas privadas en todo México.',
  },
  {
    icon: Brain,
    title: 'Perfil cognitivo exacto de tu hijo',
    desc: 'Sabes exactamente qué funciones están comprometidas, en qué grado y qué intervenciones necesita — no intuiciones, datos.',
  },
  {
    icon: Award,
    title: 'Adecuaciones para la escuela listas para usar',
    desc: 'El informe incluye recomendaciones curriculares específicas que los maestros pueden implementar desde el día siguiente.',
  },
  {
    icon: Shield,
    title: 'Diagnóstico diferencial que descarta errores',
    desc: 'Diferenciamos TDAH de ansiedad, TEA y trastornos del aprendizaje. Sin etiquetas equivocadas, sin tratamientos innecesarios.',
  },
  {
    icon: Heart,
    title: 'Plan concreto para casa',
    desc: 'Estrategias específicas para que las tareas, la hora de dormir y las rutinas dejen de ser una batalla diaria.',
  },
  {
    icon: Zap,
    title: 'Respuesta en 2-3 semanas',
    desc: 'Proceso estructurado en 4-5 sesiones. En menos de un mes tienes claridad total — no más meses de incertidumbre.',
  },
];

const reviews = [
  {
    name: 'Mamá de Sofía, 7 años',
    text: 'Por fin alguien nos explicó qué pasaba con nuestra hija. El informe fue tan claro que la escuela implementó las adecuaciones de inmediato.',
    stars: 5,
    outcome: 'Adecuaciones en la escuela al primer día',
  },
  {
    name: 'Papá de Diego, 10 años',
    text: 'Llevábamos dos años con dudas. Karen fue profesional, cálida y el proceso fue mucho más claro de lo que esperábamos.',
    stars: 5,
    outcome: 'Claridad después de 2 años de incertidumbre',
  },
  {
    name: 'Mamá de Valentina, 6 años',
    text: 'Me dio tranquilidad tener un diagnóstico formal. Las recomendaciones han transformado la dinámica en casa y en la escuela.',
    stars: 5,
    outcome: 'Dinámica familiar transformada',
  },
];

/* Only conversion-objection FAQs — educational content removed */
const faqItems = [
  {
    q: '¿Cuánto cuesta la valoración y qué incluye?',
    a: 'La valoración neuropsicológica completa tiene un costo de $7,000 MXN. Incluye todas las sesiones (4-5 citas), pruebas estandarizadas internacionales (CONNERS-3, WISC-V, BRIEF-2, CPT-3), informe clínico completo con validez oficial y sesión de devolución con recomendaciones. El anticipo de $1,000 MXN forma parte del total — no es un cargo adicional.',
  },
  {
    q: '¿El informe realmente tiene validez ante la escuela y el IMSS?',
    a: 'Sí, sin excepciones. El informe está respaldado por cédula profesional federal 11009616 emitida por la SEP. Tiene validez oficial ante escuelas públicas y privadas, la Secretaría de Educación Pública, IMSS y cualquier dependencia gubernamental en México. Incluye recomendaciones de adecuaciones curriculares listas para presentar.',
  },
  {
    q: '¿Puedo cancelar o reprogramar si algo cambia?',
    a: 'Sí, con al menos 48 horas de anticipación. El anticipo de $1,000 MXN es completamente reembolsable si cancelas dentro de ese plazo. Si cancelas fuera del plazo, se aplica como crédito para reagendar — no lo pierdes.',
  },
  {
    q: '¿Se puede pagar en dos partes?',
    a: 'Sí. El proceso está estructurado en dos pagos: un anticipo de $1,000 MXN al reservar (que confirma tu lugar) y los $6,000 MXN restantes antes de la entrega del informe. Si necesitas una estructura diferente, puedes hablarlo directamente por WhatsApp.',
  },
  {
    q: '¿Las pruebas tienen que ser presenciales?',
    a: 'Las pruebas neuropsicológicas (CONNERS-3, WISC-V, BRIEF-2, CPT-3) requieren aplicación presencial en el consultorio de Cancún para garantizar la validez clínica. La entrevista inicial con padres y la sesión de devolución pueden hacerse en línea si lo prefieres.',
  },
];

/* ═══════════════════════════════════════════════════════════════
   SCHEMA — Unchanged (full SEO/GEO/AEO value preserved)
   ═══════════════════════════════════════════════════════════════ */

const physicianEntity = {
  '@type': 'Physician',
  '@id': 'https://psicologakarentrujillo.com.mx/#physician',
  name: 'Karen Trujillo',
  jobTitle: 'Neuropsicóloga Clínica — Especialista en TDAH y Autismo',
  url: 'https://psicologakarentrujillo.com.mx',
  image: 'https://psicologakarentrujillo.com.mx/Psicologa_Karen_Trujillo.webp',
  telephone: '+529983211547',
  hasCredential: {
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'Cédula Profesional Federal',
    credentialId: '11009616',
    issuedBy: { '@type': 'Organization', name: 'Secretaría de Educación Pública, México' },
  },
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
  sameAs: [
    'https://www.facebook.com/share/1Bs93MjeKt/',
    'https://www.instagram.com/psicologakarentrujillo',
    'https://www.tiktok.com/@psic.karentrujillo',
  ],
};

const tdahCondition = {
  '@type': 'MedicalCondition',
  '@id': 'https://psicologakarentrujillo.com.mx/#tdah-infantil',
  name: 'Trastorno por Déficit de Atención e Hiperactividad (TDAH) en niños',
  alternateName: ['TDAH infantil', 'ADHD en niños', 'Déficit de atención infantil'],
  code: [
    { '@type': 'MedicalCode', code: 'F90', codingSystem: 'ICD-10' },
    { '@type': 'MedicalCode', code: '314.01', codingSystem: 'DSM-5' },
  ],
  sameAs: 'https://www.wikidata.org/wiki/Q206811',
};

const clinicEntity = {
  '@type': 'MedicalClinic',
  '@id': 'https://psicologakarentrujillo.com.mx/#clinic',
  name: 'Consultorio Neuropsicóloga Karen Trujillo',
  url: 'https://psicologakarentrujillo.com.mx',
  telephone: '+529983211547',
  image: 'https://psicologakarentrujillo.com.mx/Psicologa_Karen_Trujillo.webp',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'SM200 M49 L2, Hacienda de Chinconcuac Supermanzana Circuito casa 1587B',
    addressLocality: 'Cancún',
    addressRegion: 'Quintana Roo',
    postalCode: '77539',
    addressCountry: 'MX',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 21.1619, longitude: -86.8515 },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '19:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '09:00', closes: '14:00' },
  ],
  medicalSpecialty: 'Neuropsychiatry',
  availableService: { '@id': 'https://psicologakarentrujillo.com.mx/#tdah-infantil-service' },
  member: { '@id': 'https://psicologakarentrujillo.com.mx/#physician' },
};

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'MedicalWebPage',
      name: 'Valoración Neuropsicológica de TDAH Infantil en Cancún',
      url: 'https://psicologakarentrujillo.com.mx/evaluacion-tdah-ninos',
      description: 'Evaluación neuropsicológica de TDAH en niños y adolescentes (5-17 años) en Cancún. Diagnóstico con CONNERS-3, WISC-V, BRIEF-2 y CPT-3. Informe clínico con cédula federal 11009616.',
      inLanguage: 'es-MX',
      about: { '@id': 'https://psicologakarentrujillo.com.mx/#tdah-infantil' },
      reviewedBy: { '@id': 'https://psicologakarentrujillo.com.mx/#physician' },
      lastReviewed: '2025-06-01',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://psicologakarentrujillo.com.mx' },
          { '@type': 'ListItem', position: 2, name: 'Valoración TDAH Infantil', item: 'https://psicologakarentrujillo.com.mx/evaluacion-tdah-ninos' },
        ],
      },
    },
    physicianEntity,
    clinicEntity,
    tdahCondition,
    {
      '@type': 'MedicalProcedure',
      '@id': 'https://psicologakarentrujillo.com.mx/#tdah-infantil-service',
      name: 'Valoración Neuropsicológica de TDAH Infantil',
      procedureType: 'Diagnostic',
      howPerformed: 'Aplicación de pruebas neuropsicológicas estandarizadas (CONNERS-3, WISC-V, BRIEF-2, CPT-3), entrevista clínica con padres, cuestionarios a maestros, elaboración de informe y sesión de devolución.',
      status: 'EventScheduled',
      provider: { '@id': 'https://psicologakarentrujillo.com.mx/#physician' },
      location: { '@id': 'https://psicologakarentrujillo.com.mx/#clinic' },
      offers: {
        '@type': 'Offer',
        price: '7000',
        priceCurrency: 'MXN',
        availability: 'https://schema.org/InStock',
        validFrom: '2025-01-01',
        areaServed: { '@type': 'City', name: 'Cancún', sameAs: 'https://www.wikidata.org/wiki/Q8969' },
      },
    },
    {
      '@type': 'HowTo',
      name: 'Proceso de valoración neuropsicológica de TDAH infantil en Cancún',
      totalTime: 'P3W',
      estimatedCost: { '@type': 'MonetaryAmount', currency: 'MXN', value: '7000' },
      step: proceso.map((p, i) => ({ '@type': 'HowToStep', name: p.titulo, text: p.desc, position: i + 1 })),
    },
    ...reviews.map((r, i) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.name },
      reviewRating: { '@type': 'Rating', ratingValue: r.stars, bestRating: 5 },
      reviewBody: r.text,
      itemReviewed: { '@id': 'https://psicologakarentrujillo.com.mx/#physician' },
      datePublished: `2025-0${i + 1}-15`,
    })),
    {
      '@type': 'AggregateRating',
      itemReviewed: { '@id': 'https://psicologakarentrujillo.com.mx/#physician' },
      ratingValue: '5.0',
      reviewCount: '47',
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
   UTILITY COMPONENTS — Unchanged
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
      className={`group inline-flex items-center justify-center gap-2 font-bold text-[10px] uppercase tracking-widest px-7 py-4 rounded-2xl transition-all duration-300 text-center ${
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

function FunnelSymptomChecker({ showHeader = true, onCountChange }: { showHeader?: boolean; onCountChange?: (count: number) => void }) {
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
    if (count <= 2) return { label: 'Pocos indicadores por ahora', description: 'Si persisten en más de un contexto, una consulta puede darte claridad antes de que se acumulen más semestres.', color: 'border-success bg-success/5', level: 'low' };
    if (count <= 4) return { label: 'Vale la pena explorar', description: 'Varias señales presentes de forma consistente. Una valoración formal te da la respuesta que la escuela no puede darte.', color: 'border-accent-blue bg-accent-blue/5', level: 'mid' };
    return { label: 'Una valoración es muy recomendable', description: 'Muchas señales en más de un contexto. Este es exactamente el perfil que necesita diagnóstico diferencial — no más esperar.', color: 'border-primary bg-primary/5', level: 'high' };
  };
  const result = getResult();
  return (
    <div className="bg-card rounded-3xl border-2 border-border overflow-hidden shadow-xl shadow-primary/5">
      {showHeader && (
        <div className="p-6 sm:p-8 border-b border-border bg-gradient-to-br from-secondary/80 to-secondary/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent-blue/10 rounded-full blur-2xl" />
          <div className="flex items-center gap-3 mb-3 relative">
            <AlertCircle className="w-5 h-5 text-accent-blue shrink-0" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Herramienta orientativa · No es diagnóstico</span>
          </div>
          <h3 className="text-2xl font-serif font-bold text-primary mb-2 relative">¿Cuántas de estas señales reconoces en tu hijo?</h3>
          <p className="text-muted-foreground text-sm font-light relative">Selecciona las que aparecen de forma frecuente y en más de un contexto.</p>
        </div>
      )}
      <div className="p-6 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-5">
          {count > 0 ? `${count} señal${count !== 1 ? 'es' : ''} seleccionada${count !== 1 ? 's' : ''}` : 'Toca para seleccionar'}
        </p>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {symptoms.map((s, i) => {
            const isSelected = selected.has(i);
            return (
              <button
                key={i}
                onClick={() => toggle(i)}
                aria-pressed={isSelected}
                className={`flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer w-full active:scale-[0.97] ${
                  isSelected ? 'border-primary bg-primary/8 shadow-md shadow-primary/10' : 'border-border bg-card hover:border-accent-blue/50 hover:bg-accent-blue/5 hover:shadow-sm'
                }`}
              >
                <span className="shrink-0 mt-0.5">
                  {isSelected ? <CheckCircle2 className="w-4 h-4 text-primary" /> : <Circle className="w-4 h-4 text-muted-foreground/30" />}
                </span>
                <span className={`text-sm leading-snug ${isSelected ? 'text-primary font-medium' : 'text-foreground font-light'}`}>{s}</span>
              </button>
            );
          })}
        </div>
        <div
          className="grid transition-all duration-300"
          style={{ gridTemplateRows: count > 0 ? '1fr' : '0fr', opacity: count > 0 ? 1 : 0, marginBottom: count > 0 ? '1.5rem' : 0, transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
        >
          <div className="overflow-hidden">
            <div className={`rounded-xl border-2 p-6 ${result.color}`}>
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-primary mb-1">{result.label}</p>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">{result.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <CtaButton className="flex-1 justify-center">
            {count > 4 ? 'Mi hijo necesita esto — Agendar ahora' : count > 2 ? 'Quiero claridad — Reservar lugar' : 'Ver disponibilidad'}
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
   MAIN PAGE — AGGRESSIVE SALES FUNNEL
   Order: Hero → Trust bar → Social proof → Qualifier → Karen → Benefits → Price/Booking → FAQ
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
    const observer = new IntersectionObserver(([entry]) => setHeroCTAInView(entry.isIntersecting), { rootMargin: '0px 0px -80px 0px' });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = calSectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setCalVisible(true); observer.unobserve(el); } },
      { rootMargin: '400px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Head>
        <title>Valoración TDAH Infantil en Cancún · Niños 5-17 | Karen Trujillo</title>
        <meta name="description" content="¿Tu hijo no pone atención en la escuela? Valoración neuropsicológica de TDAH infantil en Cancún (5-17 años). Pruebas CONNERS-3, WISC-V. Informe oficial con cédula 11009616. $7,000 MXN. Agenda en línea." />
        <link rel="canonical" href="https://psicologakarentrujillo.com.mx/evaluacion-tdah-ninos" />
        <meta name="geo.region" content="MX-ROO" />
        <meta name="geo.placename" content="Cancún, Quintana Roo" />
        <meta name="geo.position" content="21.1619;-86.8515" />
        <meta name="ICBM" content="21.1619, -86.8515" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="es_MX" />
        <meta property="og:site_name" content="Neuropsicóloga Karen Trujillo" />
        <meta property="og:title" content="Valoración TDAH Infantil en Cancún · Niños 5-17 años" />
        <meta property="og:description" content="Evaluación neuropsicológica con pruebas estandarizadas. Informe con validez oficial ante SEP e IMSS. $7,000 MXN. Agenda en línea." />
        <meta property="og:url" content="https://psicologakarentrujillo.com.mx/evaluacion-tdah-ninos" />
        <meta property="og:image" content="https://psicologakarentrujillo.com.mx/Psicologa_Karen_Trujillo.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Valoración TDAH Infantil en Cancún | Niños 5-17 años" />
        <meta name="twitter:description" content="Evaluación neuropsicológica de TDAH infantil con instrumentos estandarizados. Informe oficial. Agenda en línea. Cancún, Q. Roo." />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes pulse-ring { 0%, 100% { box-shadow: 0 0 0 0 rgba(var(--primary-rgb, 79,70,229), 0.3); } 50% { box-shadow: 0 0 0 8px rgba(var(--primary-rgb, 79,70,229), 0); } }
        `}} />
      </Head>

      <div className="antialiased selection:bg-accent-blue selection:text-primary w-full min-w-0 overflow-x-hidden">
        <Navbar />

        <main className="w-full min-w-0 overflow-x-hidden">

          {/* ══════════════════════════════════════════════════════
              1 · HERO — Single CTA, zero friction, maximum clarity
              ══════════════════════════════════════════════════════ */}
          <section className="relative flex items-center justify-center pt-28 pb-12 px-6 overflow-hidden bg-soft-gradient">
            {/* Ambient glows */}
            <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-accent-blue/20 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/3 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-pink/25 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4 animate-pulse" style={{ animationDelay: '1.5s' }} />
            <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

            <div className="max-w-3xl mx-auto relative z-10 text-center">

              {/* Urgency badge */}
              <div className="animate-[fadeIn_0.6s_ease-out_both] mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border shadow-lg shadow-primary/5 ring-1 ring-primary/10">
                  <span className="w-2 h-2 rounded-full bg-warning animate-pulse shadow-sm shadow-warning shrink-0" />
                  <span className="text-[9px] uppercase tracking-[0.12em] font-bold text-muted-foreground">Disponibilidad limitada · Cancún · Niños 5-17 años</span>
                </div>
              </div>

              {/* H1 */}
              <div className="animate-[fadeInUp_0.8s_ease-out_both]">
                <h1 className="text-[2.1rem] sm:text-5xl lg:text-6xl font-serif font-bold text-primary leading-[1.08] mb-5 text-balance">
                  Tu hijo merece un diagnóstico<br className="hidden sm:block" /> que cambie las cosas
                </h1>

                {/* Benefit-first subheadline — no theory */}
                <p className="text-muted-foreground text-base sm:text-xl font-light leading-relaxed mb-3 max-w-2xl mx-auto">
                  Informe neuropsicológico con <strong className="text-primary font-semibold">validez oficial ante la escuela, SEP e IMSS</strong>. Un camino concreto — no más "hay que ver" ni etiquetas informales.
                </p>

                <p className="text-xs text-muted-foreground/70 mb-8">
                  <strong className="text-primary">Neuropsicóloga Karen Trujillo</strong> · Cédula Federal 11009616 · 7+ años · 500+ valoraciones
                </p>
              </div>

              {/* Single primary CTA */}
              <div ref={heroCTARef} className="animate-[fadeInUp_0.8s_ease-out_0.3s_both] mb-8">
                <CtaButton className="text-sm px-10 py-5">
                  Reservar mi valoración — $1,000 anticipo
                </CtaButton>
                <p className="text-[10px] text-muted-foreground/60 mt-3">
                  Cancelación con reembolso completo hasta 48 hrs antes · Sin costos ocultos
                </p>
              </div>

              {/* Social proof micro-bar */}
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground animate-[fadeIn_0.8s_ease-out_0.6s_both]">
                {[
                  { icon: Star, text: '47+ reseñas 5 estrellas' },
                  { icon: BadgeCheck, text: 'Cédula 11009616' },
                  { icon: CalendarCheck, text: 'Agenda en línea' },
                ].map((badge) => (
                  <span key={badge.text} className="flex items-center gap-1.5">
                    <badge.icon className="w-3.5 h-3.5 text-primary/50" />
                    <span className="font-medium">{badge.text}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
          </section>


          {/* ══════════════════════════════════════════════════════
              2 · SOCIAL PROOF — Moved to position 2 (before everything)
              47 familias + 3 testimonials with outcome callouts
              ══════════════════════════════════════════════════════ */}
          <section className="py-12 sm:py-16 bg-secondary">
            <div className="max-w-4xl mx-auto px-6">

              {/* Headline + aggregate trust */}
              <SectionReveal>
                <div className="text-center mb-10">
                  <div className="flex items-center justify-center gap-1.5 mb-3">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-warning fill-warning" />)}
                    <span className="ml-2 text-sm font-bold text-primary">5.0</span>
                    <span className="text-sm text-muted-foreground font-light">· 47 reseñas verificadas</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-2">
                    47 familias en Cancún ya tienen la respuesta que buscaban
                  </h2>
                  <p className="text-muted-foreground font-light text-sm">Lo que más valoran: claridad, rapidez y un informe que la escuela realmente usa.</p>
                </div>
              </SectionReveal>

              <div className="grid md:grid-cols-3 gap-5">
                {reviews.map((review, i) => (
                  <SectionReveal key={i} delay={i * 0.1}>
                    <div className="bg-card border border-border rounded-2xl p-6 hover:border-accent-blue/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 h-full flex flex-col relative overflow-hidden group">
                      {/* Outcome pill */}
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary/8 border border-primary/15 rounded-full mb-4 self-start">
                        <CheckCircle2 className="w-3 h-3 text-primary/70 shrink-0" />
                        <span className="text-[9px] font-bold uppercase tracking-widest text-primary/70">{review.outcome}</span>
                      </div>

                      <div className="flex gap-0.5 mb-3">
                        {Array.from({ length: review.stars }).map((_, j) => <Star key={j} className="w-4 h-4 text-warning fill-warning" />)}
                      </div>
                      <p className="text-sm text-muted-foreground font-light leading-relaxed mb-6 flex-1">&ldquo;{review.text}&rdquo;</p>
                      <div className="flex items-center gap-2 pt-4 border-t border-border">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-accent-blue/20 to-primary/15 flex items-center justify-center shrink-0">
                          <span className="text-[10px] font-bold text-primary/60">{review.name.charAt(0)}</span>
                        </div>
                        <p className="text-xs font-bold text-primary">{review.name}</p>
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>

              <SectionReveal delay={0.3}>
                <div className="mt-8 text-center">
                  <CtaButton>Unirme a estas familias — Reservar</CtaButton>
                </div>
              </SectionReveal>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              3 · SYMPTOM QUALIFIER — Interactive → CTA directo
              Pain intro comprimida, checker primero
              ══════════════════════════════════════════════════════ */}
          <section id="sintomas" className="py-12 sm:py-16 bg-card scroll-mt-24">
            <div className="max-w-4xl mx-auto px-6">
              <SectionReveal>
                <div className="text-center mb-8">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-accent-blue mb-3">Herramienta orientativa</p>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-3 text-balance">¿Reconoces estas señales en tu hijo?</h2>
                  <p className="text-muted-foreground font-light text-sm max-w-xl mx-auto">
                    Selecciona las que aparecen de forma consistente. El resultado te orientará — aunque ya sabes que estás aquí por algo.
                  </p>
                </div>
              </SectionReveal>

              {/* Cost of inaction — before checker */}
              <SectionReveal delay={0.1}>
                <div className="relative mb-8 p-5 rounded-2xl bg-secondary border-l-4 border-l-primary/60 border border-border">
                  <p className="text-sm text-muted-foreground font-light leading-relaxed italic">
                    <strong className="text-primary font-semibold not-italic">Cada semestre sin diagnóstico</strong> es un semestre de frustración acumulada, etiquetas informales que se adhieren y oportunidades de intervención que se pierden.
                  </p>
                </div>
              </SectionReveal>

              <SectionReveal delay={0.15}>
                <FunnelSymptomChecker showHeader={false} onCountChange={setSymptomCount} />
              </SectionReveal>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              4 · KAREN — Authority block (compressed, credential-first)
              No biography. Stats + cédula + pruebas. Done.
              ══════════════════════════════════════════════════════ */}
          <section className="py-12 sm:py-16 bg-secondary border-t border-border">
            <div className="max-w-4xl mx-auto px-6">
              <SectionReveal>
                <div className="grid md:grid-cols-[auto_1fr] gap-8 md:gap-12 items-center">

                  {/* Photo + badge */}
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                      <div className="w-36 h-36 md:w-44 md:h-44 rounded-3xl overflow-hidden border-2 border-border shadow-xl shadow-primary/10">
                        <Image
                          src="https://psicologakarentrujillo.com.mx/Psicologa_Karen_Trujillo.webp"
                          alt="Neuropsicóloga Karen Trujillo — especialista en TDAH infantil en Cancún"
                          width={176}
                          height={176}
                          className="w-full h-full object-cover object-top"
                          loading="lazy"
                          unoptimized
                        />
                      </div>
                      <div className="absolute -bottom-3 -right-3 bg-gradient-primary text-primary-foreground rounded-xl px-3 py-1.5 shadow-lg shadow-primary/25">
                        <p className="text-[8px] font-bold uppercase tracking-widest text-primary-foreground/70">Cédula</p>
                        <p className="text-xs font-bold font-mono">11009616</p>
                      </div>
                    </div>

                    {/* Stats grid */}
                    <div className="grid grid-cols-2 gap-2 w-full max-w-[200px]">
                      {[
                        { valor: '7+', label: 'años experiencia' },
                        { valor: '500+', label: 'valoraciones' },
                        { valor: '47+', label: 'reseñas ⭐' },
                        { valor: 'SEP', label: 'cédula federal' },
                      ].map((stat) => (
                        <div key={stat.label} className="bg-card border border-border rounded-xl p-2.5 text-center">
                          <p className="text-sm font-serif font-bold text-primary">{stat.valor}</p>
                          <p className="text-[9px] text-muted-foreground font-light leading-tight mt-0.5">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Credentials + copy */}
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-accent-blue mb-2">La especialista detrás del diagnóstico</p>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-4">Karen Trujillo</h2>

                    <p className="text-muted-foreground font-light leading-relaxed text-sm mb-5">
                      Neuropsicóloga clínica con 7+ años de experiencia en TDAH, TEA y dificultades del aprendizaje en Cancún. Maneja los instrumentos de evaluación de mayor rigor internacional: <strong className="text-primary font-semibold">CONNERS-3, WISC-V, BRIEF-2 y CPT-3</strong>. Las familias no solo reciben un diagnóstico — reciben una hoja de ruta concreta.
                    </p>

                    <div className="grid sm:grid-cols-2 gap-2.5">
                      {[
                        { icon: Award, label: 'Especialista TDAH · Autismo · TEA' },
                        { icon: ShieldCheck, label: 'Informe válido ante SEP e IMSS' },
                        { icon: Users, label: 'Niños desde los 5 años' },
                        { icon: Stethoscope, label: 'Pruebas estandarizadas internacionales' },
                        { icon: Star, label: '47+ reseñas verificadas 5 estrellas' },
                        { icon: BadgeCheck, label: 'Cédula federal 11009616' },
                      ].map((cred) => (
                        <div key={cred.label} className="flex items-center gap-2.5 p-3 bg-card border border-border rounded-xl">
                          <cred.icon className="w-4 h-4 text-primary/60 shrink-0" />
                          <span className="text-xs text-foreground font-medium leading-snug">{cred.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </SectionReveal>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              5 · BENEFITS — Outcome-first, no process theory
              "Qué obtienes" — not "cómo funciona"
              ══════════════════════════════════════════════════════ */}
          <section className="py-12 sm:py-16 bg-card border-t border-border">
            <div className="max-w-4xl mx-auto px-6">
              <SectionReveal>
                <div className="text-center mb-10">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-accent-blue mb-3">Lo que obtienes</p>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-3">Todo lo que necesitas — en 2-3 semanas</h2>
                  <p className="text-muted-foreground font-light text-sm max-w-lg mx-auto">Un proceso completo (4-5 sesiones) que termina con certeza — no con más preguntas.</p>
                </div>
              </SectionReveal>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {funnelBenefits.map((benefit, i) => (
                  <SectionReveal key={i} delay={i * 0.08}>
                    <div className="group flex flex-col gap-3 p-5 rounded-2xl bg-secondary border border-border hover:border-accent-blue/50 hover:shadow-md hover:shadow-primary/5 transition-all duration-300 h-full relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/0 to-accent-blue/4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                      <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <benefit.icon className="w-4 h-4 text-primary/70" />
                      </div>
                      <div className="relative z-10">
                        <p className="text-sm font-bold text-primary mb-1">{benefit.title}</p>
                        <p className="text-xs text-muted-foreground font-light leading-relaxed">{benefit.desc}</p>
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>

              <SectionReveal delay={0.3}>
                <div className="mt-10 text-center">
                  <CtaButton>Quiero esto para mi hijo — Agendar</CtaButton>
                </div>
              </SectionReveal>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              6 · PRICING + CAL.COM BOOKING
              Price prominent · Urgency · Risk reversal · Booking
              ══════════════════════════════════════════════════════ */}
          <section id="agendar" className="py-12 sm:py-20 bg-secondary scroll-mt-20 border-t border-border">
            <div className="max-w-4xl mx-auto px-6">

              {/* Section header */}
              <SectionReveal>
                <div className="text-center mb-10">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-success/10 rounded-full border border-success/20 mb-5">
                    <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                    <span className="text-[10px] uppercase tracking-widest font-bold text-success">Agenda en línea · Confirma en minutos</span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-serif font-bold text-primary mb-3">Reserva tu lugar ahora</h2>
                  <p className="text-muted-foreground font-light text-sm max-w-lg mx-auto">
                    Selecciona fecha y hora. Tu lugar queda confirmado al completar el anticipo de <strong className="text-primary">$1,000 MXN</strong> — parte del total, no adicional.
                  </p>
                </div>
              </SectionReveal>

              {/* Price card */}
              <SectionReveal delay={0.1}>
                <div className="mb-6 max-w-2xl mx-auto">
                  <div className="rounded-3xl overflow-hidden shadow-2xl shadow-primary/12 border border-primary/20">

                    {/* Header */}
                    <div className="bg-gradient-primary px-8 py-5 flex items-center justify-between">
                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-primary-foreground/50 mb-0.5">Servicio</p>
                        <p className="text-sm font-bold text-primary-foreground">Valoración TDAH Infantil · Proceso completo</p>
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-success/20 border border-success/30 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                        <span className="text-[9px] font-bold uppercase tracking-wider text-success">Disponible</span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="bg-card px-8 py-8 text-center relative overflow-hidden">
                      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 39px, currentColor 39px, currentColor 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, currentColor 39px, currentColor 40px)', backgroundSize: '40px 40px' }} />
                      <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-muted-foreground/50 mb-4 relative">Inversión total</p>
                      <div className="flex items-end justify-center gap-3 mb-5 relative">
                        <span className="text-[72px] sm:text-[88px] font-serif font-bold text-primary leading-none tracking-tight">$7,000</span>
                        <span className="text-lg font-semibold text-muted-foreground/60 pb-3 tracking-widest">MXN</span>
                      </div>
                      {/* What's included — outcome labels */}
                      <div className="flex flex-wrap justify-center gap-2 relative">
                        {[
                          'Informe clínico oficial',
                          'CONNERS-3 · WISC-V · BRIEF-2 · CPT-3',
                          'Adecuaciones para la escuela',
                          'Sesión de devolución',
                          'Válido ante SEP e IMSS',
                        ].map((chip) => (
                          <span key={chip} className="inline-flex items-center gap-1.5 px-3 py-1 bg-secondary border border-border rounded-full text-[10px] text-muted-foreground font-medium">
                            <CheckCircle2 className="w-3 h-3 text-primary/50 shrink-0" />
                            {chip}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Anticipo */}
                    <div className="border-t border-dashed border-primary/20 bg-secondary/40 px-8 py-5">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-11 h-11 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                            <Lock className="w-5 h-5 text-primary/70" />
                          </div>
                          <div>
                            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-muted-foreground/60 mb-0.5">Anticipo al reservar</p>
                            <div className="flex items-baseline gap-2">
                              <span className="text-2xl font-serif font-bold text-primary">$1,000</span>
                              <span className="text-xs text-muted-foreground/60 font-light">MXN · descontado del total</span>
                            </div>
                          </div>
                        </div>
                        <div className="sm:ml-auto">
                          <p className="text-xs text-muted-foreground font-light sm:text-right max-w-[200px] sm:max-w-none leading-relaxed">Asegura tu lugar y formaliza el inicio del proceso clínico.</p>
                        </div>
                      </div>
                    </div>

                    {/* Risk reversal — prominent */}
                    <div className="border-t border-border bg-success/5 px-8 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-success shrink-0" />
                        <p className="text-sm text-success font-medium">Reembolso completo si cancelas con 48 hrs de anticipación</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-center text-[10px] text-muted-foreground/50 mt-3">Tu anticipo se descuenta del costo total. Sin costos ocultos.</p>
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
                        <p className="font-bold text-primary text-sm">Selecciona fecha y hora</p>
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

              {/* Trust micro-badges */}
              <SectionReveal delay={0.3}>
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-xs text-muted-foreground">
                  <span className="flex items-center gap-2 px-3 py-1.5 bg-card rounded-full border border-border"><Shield className="w-3.5 h-3.5 text-primary/50" /> Pago seguro</span>
                  <span className="flex items-center gap-2 px-3 py-1.5 bg-card rounded-full border border-border"><Clock className="w-3.5 h-3.5 text-primary/50" /> Cancelación con 48 hrs</span>
                  <span className="flex items-center gap-2 px-3 py-1.5 bg-card rounded-full border border-border"><BadgeCheck className="w-3.5 h-3.5 text-primary/50" /> Cédula 11009616</span>
                </div>
              </SectionReveal>

              {/* WhatsApp fallback */}
              <SectionReveal delay={0.4}>
                <div className="mt-10 pt-8 border-t border-border">
                  <p className="text-center text-sm text-muted-foreground font-light mb-5">¿Tienes una duda puntual antes de agendar?</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hola Karen, vi tu página de valoración TDAH infantil y tengo algunas dudas antes de agendar. ¿Podrías orientarme?')}`}
                      target="_blank" rel="noopener noreferrer"
                      className="group flex items-center justify-center gap-2 px-6 py-3.5 bg-whatsapp hover:opacity-90 text-white font-bold text-[10px] uppercase tracking-widest rounded-xl transition-all active:scale-[0.98]"
                    >
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp
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


          {/* ══════════════════════════════════════════════════════
              7 · FAQ — Objections only (5 items)
              No educational content. Only "¿y si...?" de compra.
              ══════════════════════════════════════════════════════ */}
          <section className="py-12 sm:py-16 bg-card border-t border-border">
            <div className="max-w-3xl mx-auto px-6">
              <SectionReveal>
                <div className="text-center mb-8">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-accent-blue mb-3">Preguntas antes de reservar</p>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary">Lo que más nos preguntan</h2>
                </div>
              </SectionReveal>

              <div className="space-y-3">
                {faqItems.map((faq, i) => (
                  <SectionReveal key={i} delay={i * 0.05}>
                    <div className="bg-secondary border border-border rounded-2xl overflow-hidden hover:border-accent-blue/30 transition-colors duration-200">
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        aria-expanded={openFaq === i}
                        aria-controls={`faq-answer-${i}`}
                        className="w-full p-5 sm:p-6 flex justify-between items-center gap-4 text-left cursor-pointer"
                      >
                        <span className="font-bold text-primary text-sm sm:text-base">{faq.q}</span>
                        <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-300 ${openFaq === i ? 'border-primary bg-primary/10' : 'border-border'}`}>
                          <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-300 ${openFaq === i ? 'rotate-180 text-primary' : ''}`} />
                        </div>
                      </button>
                      <div
                        id={`faq-answer-${i}`}
                        role="region"
                        className="grid transition-all duration-300"
                        style={{ gridTemplateRows: openFaq === i ? '1fr' : '0fr', opacity: openFaq === i ? 1 : 0, transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
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

              <SectionReveal delay={0.3}>
                <div className="mt-8 text-center">
                  <CtaButton>Reservar mi valoración ahora</CtaButton>
                </div>
              </SectionReveal>
            </div>
          </section>


          {/* ── Internal linking — minimal, at-the-bottom ── */}
          <section className="py-8 sm:py-10 bg-card border-t border-border">
            <div className="max-w-2xl mx-auto px-6">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4 text-center">Otros servicios disponibles en Cancún</p>
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

        {/* ── Mobile sticky CTA — appears after hero CTA leaves viewport ── */}
        <div
          className={`fixed bottom-0 left-0 right-0 z-[100] px-4 pb-5 lg:hidden bg-gradient-to-t from-background via-background/95 to-transparent pt-8 transition-all duration-350 ${
            heroCTAInView ? 'opacity-0 translate-y-12 pointer-events-none' : 'opacity-100 translate-y-0'
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
        >
          <a
            href="#agendar"
            onClick={scrollToBooking}
            className="flex items-center justify-center w-full bg-gradient-primary text-primary-foreground py-3.5 rounded-xl font-bold text-[11px] uppercase tracking-widest shadow-2xl shadow-primary/35 active:scale-[0.98] transition-transform"
          >
            {symptomCount > 4 ? 'Tu hijo muestra señales — Agendar ahora' : 'Reservar valoración · $1,000 anticipo'}
          </a>
        </div>
      </div>
    </>
  );
}
