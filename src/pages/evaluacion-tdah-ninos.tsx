import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight, ArrowDown, Brain, FileText, CheckCircle2, Circle,
  ShieldCheck, AlertCircle, MessageCircle, Phone, Clock, Award,
  Star, Users, CalendarCheck, Stethoscope, BookOpen, ChevronDown,
  Shield, BadgeCheck, Heart, XCircle,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

/* ═══════════════════════════════════════════════════════════════
   CONFIG — Cal.com URL (cambiar al URL real de Karen)
   ═══════════════════════════════════════════════════════════════ */
const CAL_URL = 'https://cal.com/karentrujillo/valoracion-tdah-infantil';
const WA_NUMBER = '529983211547';
const PHONE_NUMBER = '529983211547';

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */

const painPoints = [
  { icon: BookOpen, text: 'La escuela te dice que "no pone atención" pero nadie te da una solución concreta' },
  { icon: Users, text: 'Cada tarea se convierte en una lucha diaria que agota a toda la familia' },
  { icon: Brain, text: 'Sabes que tu hijo es inteligente, pero sus calificaciones no lo reflejan' },
  { icon: Heart, text: 'Te preocupa que las etiquetas informales lo marquen sin un diagnóstico real' },
];

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

const proceso = [
  { n: '01', titulo: 'Entrevista inicial con padres', desc: 'Anamnesis clínica, historial de desarrollo, contexto escolar y familiar.', duracion: '60-90 min' },
  { n: '02', titulo: 'Aplicación de pruebas al niño', desc: 'Sesiones con CONNERS-3, WISC-V, BRIEF-2 y CPT-3.', duracion: '2-3 sesiones' },
  { n: '03', titulo: 'Cuestionarios a maestros', desc: 'Escalas de conducta y atención completadas por docentes.', duracion: 'Remoto' },
  { n: '04', titulo: 'Análisis e informe clínico', desc: 'Integración de datos, diagnóstico diferencial y perfil neuropsicológico.', duracion: '5-7 días' },
  { n: '05', titulo: 'Sesión de devolución', desc: 'Explicación del diagnóstico, recomendaciones terapéuticas y adecuaciones.', duracion: '60 min' },
];

const instrumentos = [
  { nombre: 'CONNERS-3', desc: 'Escala de síntomas TDAH — padres, maestros y el propio niño' },
  { nombre: 'WISC-V', desc: 'Inteligencia y perfil cognitivo: atención, memoria de trabajo' },
  { nombre: 'BRIEF-2', desc: 'Funciones ejecutivas en contexto cotidiano' },
  { nombre: 'CPT-3', desc: 'Prueba computarizada de atención sostenida' },
];

const informeIncludes = [
  'Diagnóstico diferencial con respaldo clínico',
  'Perfil neuropsicológico completo del niño',
  'Recomendaciones terapéuticas específicas',
  'Adecuaciones curriculares para la escuela',
  'Plan de intervención a corto y mediano plazo',
  'Validez oficial ante SEP, IMSS e instituciones educativas',
];

/* ── Diferenciador: Neuropsicología vs Psicología (NEW) ── */
const comparativaItems = [
  {
    aspecto: 'Método',
    psicologia: 'Entrevista clínica y observación conductual',
    neuropsicologia: 'Pruebas estandarizadas con normas internacionales',
  },
  {
    aspecto: 'Qué mide',
    psicologia: 'Conducta, emociones y relaciones',
    neuropsicologia: 'Funciones ejecutivas: atención, memoria de trabajo, velocidad de procesamiento',
  },
  {
    aspecto: 'Resultado',
    psicologia: 'Impresión diagnóstica cualitativa',
    neuropsicologia: 'Perfil cognitivo cuantificable con percentiles',
  },
  {
    aspecto: 'Diagnóstico diferencial',
    psicologia: 'Limitado a observación',
    neuropsicologia: 'Diferencia TDAH de ansiedad, TEA o trastornos del aprendizaje con datos objetivos',
  },
  {
    aspecto: 'Validez escolar',
    psicologia: 'Variable según la institución',
    neuropsicologia: 'Informe con cédula profesional federal aceptado por SEP e IMSS',
  },
];

const faqItems = [
  {
    q: '¿A qué edad se puede diagnosticar el TDAH en un niño?',
    a: 'El TDAH puede diagnosticarse con rigor clínico a partir de los 5 años. Antes de esa edad, los síntomas son difíciles de diferenciar del desarrollo típico. La valoración es especialmente importante en la transición a primaria, cuando las demandas de atención y autorregulación aumentan significativamente.',
  },
  {
    q: '¿Cuánto tiempo toma una valoración de TDAH infantil en Cancún?',
    a: 'La valoración completa de TDAH infantil toma entre 2 y 3 semanas, repartidas en 4-5 citas presenciales en Cancún. El proceso incluye entrevista con padres (60-90 min), aplicación de pruebas estandarizadas al niño (2-3 sesiones de 60 min), cuestionarios a maestros, análisis de resultados y sesión de devolución con informe.',
  },
  {
    q: '¿Cuánto cuesta la valoración de TDAH infantil en Cancún?',
    a: 'La valoración neuropsicológica de TDAH infantil tiene un costo total de $7,000 MXN. Incluye todas las sesiones (4-5 citas), pruebas estandarizadas (CONNERS-3, WISC-V, BRIEF-2, CPT-3), informe clínico completo y sesión de devolución con recomendaciones. Se solicita un anticipo de $1,000 MXN al agendar, que forma parte del costo total.',
  },
  {
    q: '¿Qué pruebas se aplican para diagnosticar TDAH en niños?',
    a: 'En la valoración de TDAH infantil se aplican cuatro pruebas estandarizadas internacionales: CONNERS-3 (escala de síntomas con formas para padres, maestros y el niño), WISC-V (evaluación de inteligencia y perfil cognitivo), BRIEF-2 (inventario de funciones ejecutivas) y CPT-3 (prueba computarizada de atención sostenida). Todos los instrumentos están validados para población hispanohablante.',
  },
  {
    q: '¿El informe de TDAH tiene validez oficial ante la escuela?',
    a: 'Sí. El informe clínico está respaldado por cédula profesional federal 11009616 emitida por la SEP y tiene validez oficial ante instituciones educativas, la Secretaría de Educación Pública, IMSS y dependencias gubernamentales en todo México. Incluye recomendaciones específicas de adecuaciones curriculares.',
  },
  {
    q: '¿Cuál es la diferencia entre TDAH y problemas de conducta?',
    a: 'El TDAH es una condición neurológica con base genética que afecta las funciones ejecutivas del cerebro (atención, planificación, regulación emocional). Los problemas de conducta pueden tener causas ambientales, emocionales o situacionales. La valoración neuropsicológica permite diferenciar entre ambos mediante pruebas objetivas y estandarizadas, evitando etiquetas incorrectas.',
  },
  {
    q: '¿Cuál es la diferencia entre un neuropsicólogo y un psicólogo para diagnosticar TDAH?',
    a: 'Un psicólogo clínico evalúa conducta y emociones mediante entrevista y observación. Un neuropsicólogo aplica pruebas estandarizadas que miden funciones ejecutivas del cerebro (atención, memoria de trabajo, planificación) de forma cuantificable. Para TDAH, la valoración neuropsicológica es el estándar clínico porque permite diagnóstico diferencial objetivo frente a ansiedad, TEA o trastornos del aprendizaje.',
  },
  {
    q: '¿Qué pasa si el resultado no indica TDAH?',
    a: 'El informe igualmente aporta claridad. Identifica fortalezas cognitivas, áreas de oportunidad y posibles diagnósticos diferenciales como ansiedad, trastornos del aprendizaje o altas capacidades. La información siempre es valiosa para entender el perfil neuropsicológico de tu hijo y orientar las intervenciones adecuadas.',
  },
  {
    q: '¿Puedo cancelar o reprogramar mi cita?',
    a: 'Sí, con al menos 48 horas de anticipación. El anticipo de $1,000 MXN es reembolsable si cancelas dentro de ese plazo. Fuera de plazo, se aplica como crédito para reagendar.',
  },
  {
    q: '¿El anticipo de $1,000 es adicional al costo total?',
    a: 'No. El anticipo de $1,000 MXN forma parte del costo total de $7,000 MXN. Al iniciar el proceso, solo quedarían $6,000 MXN por cubrir. Se solicita al agendar para confirmar el compromiso con el proceso clínico y asegurar tu lugar en agenda.',
  },
  {
    q: '¿La valoración de TDAH se puede hacer en línea?',
    a: 'La entrevista inicial con padres y la sesión de devolución pueden realizarse en línea. Sin embargo, las pruebas neuropsicológicas estandarizadas (CONNERS-3, WISC-V, BRIEF-2, CPT-3) requieren aplicación presencial en el consultorio de Cancún, Quintana Roo, para garantizar la validez de los resultados.',
  },
  {
    q: '¿Se puede pagar la valoración en parcialidades?',
    a: 'El proceso está estructurado en dos pagos: un anticipo de $1,000 MXN al agendar (que forma parte del total) y el resto de $6,000 MXN antes de la entrega del informe clínico. Si necesitas una estructura de pago diferente, puedes consultarlo directamente por WhatsApp.',
  },
];

const reviews = [
  { name: 'Mamá de Sofía, 7 años', text: 'Por fin alguien nos explicó qué pasaba con nuestra hija. El informe fue tan claro que la escuela implementó las adecuaciones de inmediato.', stars: 5 },
  { name: 'Papá de Diego, 10 años', text: 'Llevábamos dos años con dudas. Karen fue profesional, cálida y el proceso fue mucho más claro de lo que esperábamos.', stars: 5 },
  { name: 'Mamá de Valentina, 6 años', text: 'Me dio tranquilidad tener un diagnóstico formal. Las recomendaciones han transformado la dinámica en casa y en la escuela.', stars: 5 },
];

/* ═══════════════════════════════════════════════════════════════
   SCHEMA LD+JSON — Enhanced with MedicalClinic + DiagnosticProcedure
   ═══════════════════════════════════════════════════════════════ */

/* ── Physician entity (reused across schemas) ── */
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

/* ── MedicalCondition entity ── */
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
  associatedAnatomy: { '@type': 'AnatomicalStructure', name: 'Corteza prefrontal', sameAs: 'https://www.wikidata.org/wiki/Q80919' },
  signOrSymptom: [
    { '@type': 'MedicalSignOrSymptom', name: 'Inatención persistente' },
    { '@type': 'MedicalSignOrSymptom', name: 'Hiperactividad motora' },
    { '@type': 'MedicalSignOrSymptom', name: 'Impulsividad' },
    { '@type': 'MedicalSignOrSymptom', name: 'Dificultad en funciones ejecutivas' },
    { '@type': 'MedicalSignOrSymptom', name: 'Dificultad para seguir instrucciones de varios pasos' },
  ],
  riskFactor: [
    { '@type': 'MedicalRiskFactor', name: 'Antecedentes genéticos familiares de TDAH' },
    { '@type': 'MedicalRiskFactor', name: 'Prematuridad o bajo peso al nacer' },
    { '@type': 'MedicalRiskFactor', name: 'Exposición prenatal a tabaco o alcohol' },
  ],
  typicalAgeRange: '5-17',
  possibleTreatment: [
    { '@type': 'MedicalTherapy', name: 'Terapia cognitivo-conductual' },
    { '@type': 'MedicalTherapy', name: 'Intervención neuropsicológica' },
    { '@type': 'MedicalTherapy', name: 'Adecuaciones curriculares escolares' },
  ],
  differentialDiagnosis: [
    { '@type': 'DDxElement', diagnosis: { '@type': 'MedicalCondition', name: 'Trastorno de ansiedad infantil' } },
    { '@type': 'DDxElement', diagnosis: { '@type': 'MedicalCondition', name: 'Trastorno del espectro autista (TEA)', sameAs: 'https://www.wikidata.org/wiki/Q38404' } },
    { '@type': 'DDxElement', diagnosis: { '@type': 'MedicalCondition', name: 'Trastorno específico del aprendizaje' } },
  ],
};

/* ── MedicalClinic entity (NEW — local SEO + GEO) ── */
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
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 21.1619,
    longitude: -86.8515,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '19:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '09:00',
      closes: '14:00',
    },
  ],
  medicalSpecialty: 'Neuropsychiatry',
  availableService: { '@id': 'https://psicologakarentrujillo.com.mx/#tdah-infantil-service' },
  member: { '@id': 'https://psicologakarentrujillo.com.mx/#physician' },
};

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    /* ── Page ── */
    {
      '@type': 'MedicalWebPage',
      name: 'Valoración Neuropsicológica de TDAH Infantil en Cancún',
      url: 'https://psicologakarentrujillo.com.mx/evaluacion-tdah-ninos',
      description: 'Evaluación neuropsicológica de TDAH en niños y adolescentes (5-17 años) en Cancún. Diagnóstico con CONNERS-3, WISC-V, BRIEF-2 y CPT-3. Informe clínico con cédula federal 11009616.',
      inLanguage: 'es-MX',
      about: { '@id': 'https://psicologakarentrujillo.com.mx/#tdah-infantil' },
      mentions: [
        { '@type': 'MedicalCondition', name: 'TDAH', sameAs: 'https://www.wikidata.org/wiki/Q206811' },
        { '@type': 'MedicalCondition', name: 'Autismo', sameAs: 'https://www.wikidata.org/wiki/Q38404' },
        { '@type': 'AnatomicalStructure', name: 'Corteza prefrontal', sameAs: 'https://www.wikidata.org/wiki/Q80919' },
        { '@type': 'MedicalTest', name: 'WISC-V', sameAs: 'https://www.wikidata.org/wiki/Q2551426' },
      ],
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
    /* ── Physician ── */
    physicianEntity,
    /* ── Clinic (NEW — enables local SEO) ── */
    clinicEntity,
    /* ── Condition ── */
    tdahCondition,
    /* ── Diagnostic Procedures (NEW — GEO: helps LLMs understand each test) ── */
    {
      '@type': 'DiagnosticProcedure',
      name: 'CONNERS-3',
      description: 'Escala de evaluación de síntomas de TDAH con formas para padres, maestros y el propio niño. Estándar internacional para medir inatención, hiperactividad e impulsividad.',
      usedToDiagnose: { '@id': 'https://psicologakarentrujillo.com.mx/#tdah-infantil' },
    },
    {
      '@type': 'DiagnosticProcedure',
      name: 'WISC-V',
      alternateName: 'Escala Wechsler de Inteligencia para Niños — 5ª edición',
      description: 'Evaluación de inteligencia y perfil cognitivo que mide atención, memoria de trabajo, velocidad de procesamiento y razonamiento.',
      sameAs: 'https://www.wikidata.org/wiki/Q2551426',
      usedToDiagnose: { '@id': 'https://psicologakarentrujillo.com.mx/#tdah-infantil' },
    },
    {
      '@type': 'DiagnosticProcedure',
      name: 'BRIEF-2',
      description: 'Inventario de Evaluación Conductual de la Función Ejecutiva. Mide regulación emocional, planificación, organización e inhibición en contextos cotidianos.',
      usedToDiagnose: { '@id': 'https://psicologakarentrujillo.com.mx/#tdah-infantil' },
    },
    {
      '@type': 'DiagnosticProcedure',
      name: 'CPT-3',
      alternateName: 'Conners Continuous Performance Test',
      description: 'Prueba computarizada que mide atención sostenida, vigilancia e impulsividad de forma objetiva durante 14 minutos.',
      usedToDiagnose: { '@id': 'https://psicologakarentrujillo.com.mx/#tdah-infantil' },
    },
    /* ── Service + Offer ── */
    {
      '@type': 'MedicalProcedure',
      '@id': 'https://psicologakarentrujillo.com.mx/#tdah-infantil-service',
      name: 'Valoración Neuropsicológica de TDAH Infantil',
      procedureType: 'Diagnostic',
      howPerformed: 'Aplicación de pruebas neuropsicológicas estandarizadas (CONNERS-3, WISC-V, BRIEF-2, CPT-3), entrevista clínica con padres, cuestionarios a maestros, elaboración de informe y sesión de devolución.',
      preparation: 'No requiere preparación especial. Se recomienda que el niño asista descansado y desayunado.',
      followup: 'Sesión de devolución con explicación del diagnóstico, recomendaciones terapéuticas y adecuaciones escolares.',
      bodyLocation: 'Sistema nervioso central — funciones ejecutivas',
      status: 'EventScheduled',
      provider: { '@id': 'https://psicologakarentrujillo.com.mx/#physician' },
      location: { '@id': 'https://psicologakarentrujillo.com.mx/#clinic' },
      offers: {
        '@type': 'Offer',
        price: '7000',
        priceCurrency: 'MXN',
        description: 'Proceso completo: 4-5 sesiones, pruebas estandarizadas, informe clínico y sesión de devolución. Anticipo de $1,000 MXN al agendar.',
        availability: 'https://schema.org/InStock',
        validFrom: '2025-01-01',
        areaServed: { '@type': 'City', name: 'Cancún', sameAs: 'https://www.wikidata.org/wiki/Q8969' },
      },
    },
    /* ── HowTo ── */
    {
      '@type': 'HowTo',
      name: 'Proceso de valoración neuropsicológica de TDAH infantil en Cancún',
      description: 'Protocolo clínico de 5 fases para diagnosticar TDAH en niños de 5 a 17 años. Duración total: 2 a 3 semanas.',
      totalTime: 'P3W',
      estimatedCost: { '@type': 'MonetaryAmount', currency: 'MXN', value: '7000' },
      step: proceso.map((p, i) => ({ '@type': 'HowToStep', name: p.titulo, text: p.desc, position: i + 1 })),
    },
    /* ── Individual Reviews ── */
    ...reviews.map((r, i) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.name },
      reviewRating: { '@type': 'Rating', ratingValue: r.stars, bestRating: 5 },
      reviewBody: r.text,
      itemReviewed: { '@id': 'https://psicologakarentrujillo.com.mx/#physician' },
      datePublished: `2025-0${i + 1}-15`,
    })),
    /* ── AggregateRating ── */
    {
      '@type': 'AggregateRating',
      itemReviewed: { '@id': 'https://psicologakarentrujillo.com.mx/#physician' },
      ratingValue: '5.0',
      reviewCount: '47',
      bestRating: '5',
      worstRating: '1',
    },
    /* ── FAQ (12 items — includes 2 new: neuropsicólogo vs psicólogo + parcialidades) ── */
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

/* ── Symptom Checker (funnel version — CTA scrolls to booking) ── */
function FunnelSymptomChecker({ showHeader = true, onCountChange }: { showHeader?: boolean; onCountChange?: (count: number) => void }) {
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const count = selected.size;

  useEffect(() => {
    onCountChange?.(count);
  }, [count, onCountChange]);

  const toggle = (i: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  const getResult = () => {
    if (count <= 2) return { label: 'Pocos indicadores por ahora', description: 'Marcaste pocas señales. Puede ser algo puntual, pero si persisten, una consulta puede darte claridad.', color: 'border-success bg-success/5', level: 'low' };
    if (count <= 4) return { label: 'Vale la pena explorar', description: 'Varias de estas señales de forma consistente sugieren que una valoración formal aportaría claridad real. No es diagnóstico, es información.', color: 'border-accent-blue bg-accent-blue/5', level: 'mid' };
    return { label: 'Una valoración es muy recomendable', description: 'Muchas señales presentes en más de un contexto (casa, escuela) justifican una evaluación neuropsicológica formal. Es el paso correcto.', color: 'border-primary bg-primary/5', level: 'high' };
  };

  const result = getResult();

  return (
    <div className="bg-card rounded-3xl border-2 border-border overflow-hidden shadow-xl shadow-primary/5">
      {showHeader && (
        <div className="p-6 sm:p-8 border-b border-border bg-gradient-to-br from-secondary/80 to-secondary/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent-blue/10 rounded-full blur-2xl" />
          <div className="flex items-center gap-3 mb-3 relative">
            <AlertCircle className="w-5 h-5 text-accent-blue shrink-0" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Herramienta orientativa · No es diagnóstico
            </span>
          </div>
          <h3 className="text-2xl font-serif font-bold text-primary mb-2 relative">¿Reconoces estas señales en tu hijo?</h3>
          <p className="text-muted-foreground text-sm font-light relative">Selecciona las que se presenten de forma frecuente y persistente.</p>
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
                className={`flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer w-full active:scale-[0.97]
                  ${isSelected
                    ? 'border-primary bg-primary/8 shadow-md shadow-primary/10'
                    : 'border-border bg-card hover:border-accent-blue/50 hover:bg-accent-blue/5 hover:shadow-sm'
                  }`}
              >
                <span className="shrink-0 mt-0.5">
                  {isSelected ? <CheckCircle2 className="w-4 h-4 text-primary" /> : <Circle className="w-4 h-4 text-muted-foreground/30" />}
                </span>
                <span className={`text-sm leading-snug ${isSelected ? 'text-primary font-medium' : 'text-foreground font-light'}`}>
                  {s}
                </span>
              </button>
            );
          })}
        </div>

        {/* Result with grid-based transition (no fixed max-height — adapts to content) */}
        <div
          className="grid transition-all duration-300"
          style={{
            gridTemplateRows: count > 0 ? '1fr' : '0fr',
            opacity: count > 0 ? 1 : 0,
            marginBottom: count > 0 ? '1.5rem' : 0,
            transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
          }}
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
            {count > 4 ? 'Tu hijo merece claridad — Agendar' : 'Reservar mi lugar'}
          </CtaButton>
          {count > 0 && (
            <button
              onClick={() => setSelected(new Set())}
              className="px-6 py-4 rounded-xl border-2 border-border text-xs font-bold uppercase tracking-widest text-muted-foreground hover:border-primary hover:text-primary transition-all"
            >
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
   MAIN PAGE — FUNNEL (Optimized flow: Etapas 1-3 applied)
   ═══════════════════════════════════════════════════════════════ */

export default function TDAHNinosFunnel() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [symptomCount, setSymptomCount] = useState(0);
  const [calLoaded, setCalLoaded] = useState(false);
  const [calVisible, setCalVisible] = useState(false);
  const heroCTARef = useRef<HTMLDivElement>(null);
  const [heroCTAInView, setHeroCTAInView] = useState(true);
  const calSectionRef = useRef<HTMLDivElement>(null);

  /* Native IntersectionObserver for sticky CTA visibility */
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

  /* Lazy load Cal.com iframe — only when booking section enters viewport */
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
        <meta property="og:site_name" content="Neuropsicóloga Karen Trujillo — Neuropsicología" />
        <meta property="og:title" content="Valoración TDAH Infantil en Cancún · Niños 5-17 años" />
        <meta property="og:description" content="Evaluación neuropsicológica con pruebas estandarizadas. Informe con validez oficial ante SEP e IMSS. $7,000 MXN. Agenda en línea." />
        <meta property="og:url" content="https://psicologakarentrujillo.com.mx/evaluacion-tdah-ninos" />
        <meta property="og:image" content="https://psicologakarentrujillo.com.mx/Psicologa_Karen_Trujillo.webp" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Valoración TDAH Infantil en Cancún | Niños 5-17 años" />
        <meta name="twitter:description" content="Evaluación neuropsicológica de TDAH infantil con instrumentos estandarizados. Informe oficial. Agenda en línea. Cancún, Q. Roo." />

        {/* AEO: Speakable — includes new diferenciador section */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: ['#definicion-tdah', '#proceso-valoracion', '#que-incluye-informe', '#diferenciador-neuropsicologia'],
          },
          url: 'https://psicologakarentrujillo.com.mx/evaluacion-tdah-ninos',
        }) }} />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

        {/* Performance: CSS keyframes for hero animations (replaces Framer Motion) */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        `}} />
      </Head>

      <div className="antialiased selection:bg-accent-blue selection:text-primary w-full min-w-0 overflow-x-hidden">
        <Navbar />

        <main className="w-full min-w-0 overflow-x-hidden">

          {/* ══════════════════════════════════════════════════════
              1 · HERO — H1 SEO + subtítulo emocional + outcome-first copy
              ══════════════════════════════════════════════════════ */}
          <section className="relative flex items-center justify-center pt-28 pb-16 px-6 overflow-hidden bg-soft-gradient">
            <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-accent-blue/20 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/3 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-pink/25 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4 animate-pulse" style={{ animationDelay: '1.5s' }} />
            <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
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
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border shadow-lg shadow-primary/5 mb-6 ring-1 ring-primary/10 max-w-full">
                  <span className="w-2 h-2 rounded-full bg-warning animate-pulse shadow-sm shadow-warning shrink-0" />
                  <span className="text-[9px] uppercase tracking-[0.12em] font-bold text-muted-foreground text-center leading-snug">Disponibilidad limitada · Cancún · Niños 5-17 años</span>
                </div>

                {/* H1 — keyword-rich for SEO */}
                <h1 className="text-[2rem] sm:text-5xl lg:text-6xl font-serif font-bold text-primary leading-[1.1] mb-4 text-balance">
                  Valoración TDAH Infantil<br className="hidden sm:block" /> en Cancún
                </h1>

                {/* Emotional hook — visually prominent subtitle */}
                <p className="text-lg sm:text-2xl font-serif text-primary/80 italic mb-6 max-w-2xl mx-auto">
                  Por fin, claridad sobre lo que le pasa a tu hijo
                </p>

                {/* Subheadline — outcome first, features second */}
                <p className="text-muted-foreground text-sm sm:text-lg font-light leading-relaxed mb-4 max-w-2xl mx-auto">
                  Un diagnóstico formal que la escuela respeta y que te da un camino concreto para ayudarlo. Evaluación con pruebas estandarizadas internacionales (CONNERS-3, WISC-V, BRIEF-2, CPT-3) e informe clínico con <strong className="text-primary font-semibold">validez oficial</strong> ante escuelas, SEP e IMSS.
                </p>

                <p className="text-xs sm:text-sm text-muted-foreground/70 mb-8">
                  <strong className="text-primary">Neuropsicóloga Karen Trujillo</strong> · Cédula Federal 11009616 · 7+ años de experiencia
                </p>
              </div>

              <div ref={heroCTARef} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-[fadeInUp_0.8s_ease-out_0.3s_both]">
                <CtaButton>Agendar valoración</CtaButton>
                <a href="#sintomas" onClick={(e) => { e.preventDefault(); document.getElementById('sintomas')?.scrollIntoView({ behavior: 'smooth' }); }} className="group inline-flex items-center justify-center gap-2 font-bold text-[9px] uppercase tracking-wide px-6 py-4 rounded-xl border-2 border-primary/15 text-primary/70 hover:border-primary/30 hover:text-primary transition-all duration-300">
                  ¿Mi hijo podría tener TDAH?
                  <ArrowDown className="w-3 h-3 transition-transform group-hover:translate-y-0.5 shrink-0" />
                </a>
              </div>

              <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs text-muted-foreground animate-[fadeIn_0.8s_ease-out_0.6s_both]">
                {[
                  { icon: BadgeCheck, text: 'Cédula 11009616' },
                  { icon: Stethoscope, text: 'Pruebas estandarizadas internacionales' },
                  { icon: CalendarCheck, text: 'Agenda en línea' },
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
              2 · PAIN POINTS + SYMPTOM CHECKER
              NEW: "Costo de no actuar" callout after pain cards
              ══════════════════════════════════════════════════════ */}
          <section id="sintomas" className="py-14 sm:py-20 bg-secondary scroll-mt-24">
            <div className="max-w-4xl mx-auto px-6">
              <SectionReveal>
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent-blue mb-4 text-center">Muchos padres llegan con esta historia</p>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-4 text-center text-balance">¿Te suena familiar?</h2>
                <p className="text-muted-foreground font-light text-center max-w-2xl mx-auto mb-10">Los síntomas del TDAH suelen confundirse con problemas de conducta. Selecciona las señales que reconoces en tu hijo para saber si una valoración es recomendable.</p>
              </SectionReveal>

              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                {painPoints.map((point, i) => (
                  <SectionReveal key={i} delay={i * 0.08}>
                    <div className="flex items-start gap-4 p-5 rounded-2xl bg-card border border-border hover:border-accent-blue/50 hover:shadow-md transition-all duration-300 group relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/0 to-accent-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-blue/15 to-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                        <point.icon className="w-4 h-4 text-primary/70" />
                      </div>
                      <p className="text-foreground font-light leading-relaxed text-sm relative z-10">{point.text}</p>
                    </div>
                  </SectionReveal>
                ))}
              </div>

              {/* CRO: "Costo de no actuar" — empathetic urgency */}
              <SectionReveal delay={0.35}>
                <div className="relative mb-10 p-5 rounded-2xl bg-card border-l-4 border-l-primary/60 border border-border">
                  <p className="text-sm text-muted-foreground font-light leading-relaxed italic">
                    <strong className="text-primary font-semibold not-italic">Cada semestre sin diagnóstico</strong> es un semestre de frustración acumulada, etiquetas informales que se adhieren y oportunidades de intervención que se pierden. Actuar hoy le da a tu hijo la ventaja que necesita.
                  </p>
                </div>
              </SectionReveal>

              <SectionReveal>
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex-1 h-px bg-border" />
                  <div className="flex items-center gap-2 px-4 py-1.5 bg-card border border-border rounded-full min-w-0 shrink">
                    <AlertCircle className="w-3.5 h-3.5 text-accent-blue shrink-0" />
                    <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground text-center">Herramienta orientativa · No es diagnóstico</span>
                  </div>
                  <div className="flex-1 h-px bg-border" />
                </div>
              </SectionReveal>

              <SectionReveal delay={0.1}>
                <div className="max-w-3xl mx-auto">
                  <FunnelSymptomChecker showHeader={false} onCountChange={setSymptomCount} />
                </div>
              </SectionReveal>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              3 · AEO DEFINITION — "¿Qué es el TDAH infantil?"
              MOVED: Now before Proceso (logical: What → How)
              ══════════════════════════════════════════════════════ */}
          <section id="definicion-tdah" className="py-14 sm:py-16 bg-secondary/50 border-y border-border relative overflow-hidden">
            <div className="max-w-3xl mx-auto px-6 relative">
              <SectionReveal>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-6 text-center">¿Qué es el TDAH infantil?</h2>
                <p className="text-muted-foreground font-light leading-relaxed mb-6 text-center max-w-2xl mx-auto">
                  El <strong className="text-primary font-semibold">Trastorno por Déficit de Atención e Hiperactividad (TDAH)</strong> es una condición neurológica que afecta la <strong className="text-primary font-semibold">corteza prefrontal</strong> — la zona responsable de planificar, organizarse y regular emociones. <strong className="text-primary font-semibold">No es falta de inteligencia ni de disciplina.</strong> El diagnóstico requiere síntomas persistentes en casa y escuela por más de 6 meses (criterios <strong className="text-primary font-semibold">DSM-5</strong>, código F90 del CIE-10).
                </p>

                <div className="flex flex-wrap justify-center gap-3 mb-8">
                  {[
                    { label: 'Inatento', desc: 'El niño que "está en las nubes"' },
                    { label: 'Hiperactivo-impulsivo', desc: 'El que no puede quedarse quieto' },
                    { label: 'Combinado', desc: 'Ambas presentaciones' },
                  ].map((tipo) => (
                    <div key={tipo.label} className="flex flex-col gap-0.5 px-4 py-3 bg-card border border-border rounded-2xl text-center min-w-[140px]">
                      <span className="text-xs font-bold text-primary">{tipo.label}</span>
                      <span className="text-[10px] text-muted-foreground font-light">{tipo.desc}</span>
                    </div>
                  ))}
                </div>

                <div className="p-5 bg-card rounded-2xl border border-border shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-accent-blue/60 to-primary/40 rounded-l-2xl" />
                  <p className="text-sm text-muted-foreground font-light leading-relaxed pl-2">
                    <strong className="text-primary font-semibold">En Cancún, Quintana Roo</strong>, la neuropsicóloga Karen Trujillo (cédula 11009616) aplica pruebas como <strong className="text-primary font-semibold">CONNERS-3, WISC-V, BRIEF-2 y CPT-3</strong> para emitir un informe clínico con validez oficial ante la SEP, IMSS e instituciones educativas.
                  </p>
                </div>
              </SectionReveal>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              4 · PROCESO — 5 phases
              NEW: Direct answer phrase + temporal reframe
              ══════════════════════════════════════════════════════ */}
          <section id="proceso-valoracion" className="py-14 sm:py-20 bg-card">
            <div className="max-w-4xl mx-auto px-6">
              <SectionReveal>
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent-blue mb-4 text-center">Proceso clínico estructurado</p>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-4 text-center">¿Cómo funciona la valoración de TDAH infantil?</h2>
                {/* AEO: Direct answer for "cuánto dura/cuesta valoración TDAH infantil cancún" */}
                <p className="text-muted-foreground font-light mb-4 text-center max-w-2xl mx-auto">
                  La valoración neuropsicológica de TDAH infantil en Cancún tiene un costo de <strong className="text-primary font-semibold">$7,000 MXN</strong> e incluye 4-5 sesiones presenciales distribuidas en 2 a 3 semanas. El proceso completo abarca entrevista con padres, pruebas estandarizadas al niño, cuestionarios a maestros, análisis clínico y sesión de devolución.
                </p>
                <p className="text-sm text-primary/70 font-medium text-center mb-10">No es un proceso largo — son 5 pasos que te dan años de claridad.</p>
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
                          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 shrink-0 bg-secondary px-2 py-1 rounded-full">{p.duracion}</span>
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
              5 · INFORME + INSTRUMENTOS — Value building
              ══════════════════════════════════════════════════════ */}
          <section className="py-14 sm:py-20 bg-gradient-primary text-primary-foreground w-full">
            <div className="max-w-4xl mx-auto px-6">
              <SectionReveal>
                <div id="que-incluye-informe" className="text-center mb-10">
                  <FileText className="w-10 h-10 text-accent-blue mx-auto mb-5" />
                  <h2 className="text-3xl sm:text-4xl font-serif font-bold italic mb-4">¿Qué incluye el informe de valoración TDAH?</h2>
                  <p className="text-primary-foreground/70 font-light max-w-xl mx-auto">Documento clínico con validez oficial ante escuelas, SEP e IMSS en todo México. Incluye diagnóstico, perfil cognitivo y recomendaciones accionables.</p>
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
                  <p className="text-[10px] font-bold uppercase tracking-widest text-primary-foreground/50 mb-6">Pruebas estandarizadas utilizadas</p>
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
              6 · DIFERENCIADOR — ¿Por qué neuropsicología?
              NEW SECTION — AEO + objection resolution
              ══════════════════════════════════════════════════════ */}
          <section id="diferenciador-neuropsicologia" className="py-14 sm:py-20 bg-card border-t border-border">
            <div className="max-w-4xl mx-auto px-6">
              <SectionReveal>
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent-blue mb-4 text-center">La diferencia importa</p>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-6 text-center text-balance">¿Por qué neuropsicología y no solo psicología?</h2>

                <div className="max-w-2xl mx-auto space-y-4 mb-10">
                  <p className="text-muted-foreground font-light leading-relaxed text-center">
                    Una consulta psicológica evalúa conducta y emociones a través de entrevista clínica. La valoración neuropsicológica va más allá: <strong className="text-primary font-semibold">mide las funciones ejecutivas del cerebro</strong> — atención sostenida, memoria de trabajo, velocidad de procesamiento y control inhibitorio — mediante pruebas estandarizadas con normas internacionales.
                  </p>
                  <p className="text-muted-foreground font-light leading-relaxed text-center">
                    Para el TDAH, esta diferencia es crucial. Los síntomas del TDAH se solapan con ansiedad, trastornos del aprendizaje y altas capacidades. <strong className="text-primary font-semibold">Solo un perfil neuropsicológico completo permite un diagnóstico diferencial preciso</strong> que descarte condiciones similares y evite intervenciones equivocadas.
                  </p>
                  <p className="text-muted-foreground font-light leading-relaxed text-center">
                    En la práctica, esto significa que el informe no dice solo &ldquo;tiene TDAH&rdquo; o &ldquo;no tiene TDAH&rdquo;. Revela exactamente <strong className="text-primary font-semibold">qué funciones están comprometidas, en qué grado y qué intervenciones específicas</strong> necesita tu hijo — tanto en terapia como en la escuela.
                  </p>
                </div>
              </SectionReveal>

              {/* Comparative table — unified 2-column layout for all screens */}
              <SectionReveal delay={0.15}>
                <div className="max-w-3xl mx-auto bg-secondary/50 rounded-3xl border border-border overflow-hidden">
                  {/* Column headers — always 2 cols */}
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
                      {/* Aspect label — full-width spanning row */}
                      <div className="px-3 sm:px-4 pt-3 pb-2 bg-secondary/40 border-b border-border/50">
                        <p className="text-[11px] sm:text-xs font-bold text-primary">{item.aspecto}</p>
                      </div>
                      {/* Side-by-side comparison — always 2 columns */}
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
                  <CtaButton>Agendar valoración</CtaButton>
                </div>
              </SectionReveal>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              7 · SOCIAL PROOF — Reviews
              ══════════════════════════════════════════════════════ */}
          <section className="py-14 sm:py-20 bg-secondary">
            <div className="max-w-4xl mx-auto px-6">
              <SectionReveal>
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent-blue mb-4 text-center">Lo que dicen las familias</p>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-4 text-center">47+ familias en Cancún ya tienen claridad</h2>
                <p className="text-muted-foreground font-light text-center max-w-xl mx-auto mb-10">Las familias destacan la claridad del informe y las recomendaciones concretas para la escuela.</p>
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
                          <span className="text-[10px] font-bold text-primary/60">{review.name.charAt(0)}</span>
                        </div>
                        <p className="text-xs font-bold text-primary">{review.name}</p>
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>

              <SectionReveal delay={0.3}>
                <div className="mt-10 text-center">
                  <CtaButton>Reservar mi valoración</CtaButton>
                </div>
              </SectionReveal>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              8 · QUIÉN ES KAREN
              FIX: Stats clarified (500+ valoraciones, 47+ reseñas)
              ══════════════════════════════════════════════════════ */}
          <section className="py-14 sm:py-20 bg-card border-t border-border relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-6 relative">
              <SectionReveal>
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent-blue mb-4 text-center">La especialista detrás del proceso</p>
                <h2 className="font-serif font-bold text-primary mb-14 text-center">
                  <span className="block text-sm sm:text-base font-normal text-muted-foreground/70 uppercase tracking-[0.2em] mb-2">Conoce a</span>
                  <span className="block text-5xl sm:text-6xl lg:text-7xl">Karen Trujillo</span>
                </h2>
              </SectionReveal>

              <div className="grid md:grid-cols-[280px_1fr] gap-10 md:gap-14 items-start">
                <SectionReveal>
                  <div className="flex flex-col items-center md:items-start gap-5">
                    <div className="relative">
                      <div className="w-48 h-48 md:w-64 md:h-64 rounded-3xl overflow-hidden border-2 border-border shadow-2xl shadow-primary/10">
                        <Image
                          src="https://psicologakarentrujillo.com.mx/Psicologa_Karen_Trujillo.webp"
                          alt="Neuropsicóloga Karen Trujillo — especialista en TDAH infantil en Cancún"
                          width={256}
                          height={256}
                          className="w-full h-full object-cover object-top"
                          loading="lazy"
                          unoptimized
                        />
                      </div>
                      <div className="absolute -bottom-4 -right-4 bg-gradient-primary text-primary-foreground rounded-2xl px-4 py-2 shadow-xl shadow-primary/25">
                        <p className="text-[9px] font-bold uppercase tracking-widest text-primary-foreground/70">Cédula Federal</p>
                        <p className="text-sm font-bold font-mono">11009616</p>
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
                          <p className="text-[10px] text-muted-foreground font-light leading-tight mt-0.5">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </SectionReveal>

                <SectionReveal delay={0.15}>
                  <div className="space-y-6">
                    <div className="space-y-4 text-muted-foreground font-light leading-relaxed">
                      <p>La <strong className="text-primary font-semibold">neuropsicóloga Karen Trujillo</strong> es especialista clínica con más de 7 años de experiencia en la evaluación y diagnóstico de TDAH, Trastorno del Espectro Autista y dificultades del aprendizaje en niños, adolescentes y adultos en Cancún, Quintana Roo.</p>
                      <p>Su formación incluye especialización en neuropsicología clínica y el dominio de instrumentos estandarizados de clase mundial: <strong className="text-primary font-semibold">CONNERS-3, WISC-V, BRIEF-2 y CPT-3</strong>. Cada valoración sigue un protocolo clínico riguroso que garantiza diagnósticos confiables y accionables.</p>
                      <p>Lo que distingue su práctica es la combinación de rigor clínico con calidez humana: las familias no solo reciben un diagnóstico, sino una <strong className="text-primary font-semibold">hoja de ruta concreta</strong> para entender a su hijo y acompañarlo de forma efectiva en casa y en la escuela.</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3 pt-2">
                      {[
                        { icon: Award, label: 'Especialista en TDAH y Autismo' },
                        { icon: ShieldCheck, label: 'Informe válido ante SEP e IMSS' },
                        { icon: Users, label: 'Atención a niños desde los 5 años' },
                        { icon: Stethoscope, label: 'Pruebas estandarizadas internacionales' },
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
              9 · ¿QUÉ PASA DESPUÉS DE LA VALORACIÓN?
              ══════════════════════════════════════════════════════ */}
          <section className="py-14 sm:py-20 bg-secondary border-t border-border">
            <div className="max-w-3xl mx-auto px-6">
              <SectionReveal>
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent-blue mb-4 text-center">Después de la valoración</p>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-4 text-center">¿Qué pasa con los resultados?</h2>
                <p className="text-muted-foreground font-light text-center max-w-2xl mx-auto mb-10">Sin importar el resultado, siempre obtienes información valiosa sobre tu hijo. Estos son los tres escenarios posibles:</p>
              </SectionReveal>

              <div className="space-y-4">
                {[
                  { titulo: 'TDAH confirmado', desc: 'Recibes un plan de acción concreto: recomendaciones terapéuticas, adecuaciones curriculares para la escuela y estrategias específicas para casa. El informe tiene validez oficial para que la escuela implemente los cambios.', color: 'border-primary/30 bg-primary/5', iconColor: 'text-primary bg-primary/10 border-primary/20' },
                  { titulo: 'No es TDAH — diagnóstico diferencial', desc: 'El informe identifica qué sí está pasando: ansiedad, trastorno del aprendizaje, altas capacidades u otra condición. Saber qué no es TDAH es igual de valioso porque evita intervenciones equivocadas.', color: 'border-accent-blue/30 bg-accent-blue/5', iconColor: 'text-accent-blue bg-accent-blue/10 border-accent-blue/20' },
                  { titulo: 'Perfil mixto o subclínico', desc: 'Algunos niños muestran rasgos de TDAH sin cumplir todos los criterios. En ese caso, recibes orientación sobre qué monitorear, cuándo revaluar y qué apoyos preventivos implementar desde ahora.', color: 'border-success/30 bg-success/5', iconColor: 'text-success bg-success/10 border-success/20' },
                ].map((item, i) => (
                  <SectionReveal key={item.titulo} delay={i * 0.1}>
                    <div className={`flex gap-5 p-6 rounded-2xl border-2 ${item.color} transition-all duration-300`}>
                      <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${item.iconColor}`}>
                        <span className="text-sm font-serif font-bold">{String(i + 1).padStart(2, '0')}</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-primary mb-1">{item.titulo}</h3>
                        <p className="text-sm text-muted-foreground font-light leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>

              <SectionReveal delay={0.3}>
                <div className="mt-10 text-center"><CtaButton>Dar el primer paso</CtaButton></div>
              </SectionReveal>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              10 · FAQ — 12 items (2 new: neuropsicólogo vs psicólogo, parcialidades)
              A11Y: aria-expanded + aria-controls
              ══════════════════════════════════════════════════════ */}
          <section className="py-14 sm:py-20 bg-card">
            <div className="max-w-3xl mx-auto px-6">
              <SectionReveal>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-10 text-center">Preguntas frecuentes</h2>
              </SectionReveal>

              <div className="space-y-2">
                {faqItems.map((faq, i) => (
                  <SectionReveal key={i} delay={i * 0.05}>
                    <div className={`bg-secondary/50 border-2 rounded-2xl transition-all duration-300 overflow-hidden ${openFaq === i ? 'border-primary/50 shadow-lg shadow-primary/8' : 'border-border hover:border-accent-blue/30 hover:shadow-sm'}`}>
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
              11 · PRICING + CAL.COM BOOKING
              NEW: Risk reversal strip inside pricing card
              ══════════════════════════════════════════════════════ */}
          <section id="agendar" className="py-14 sm:py-20 bg-secondary scroll-mt-20">
            <div className="max-w-4xl mx-auto px-6">
              <SectionReveal>
                <div className="text-center mb-10">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-success/10 rounded-full border border-success/20 mb-6">
                    <CalendarCheck className="w-4 h-4 text-success" />
                    <span className="text-[10px] uppercase tracking-widest font-bold text-success">Agenda en línea · Confirma en minutos</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-4">Reserva tu valoración ahora</h2>
                  <p className="text-muted-foreground font-light max-w-2xl mx-auto">Elige el horario que mejor te funcione. Tu lugar queda confirmado al completar el anticipo.</p>
                </div>
              </SectionReveal>

              <SectionReveal delay={0.1}>
                <div className="mb-8 max-w-2xl mx-auto">
                  <div className="rounded-3xl overflow-hidden shadow-2xl shadow-primary/12 border border-primary/20">
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

                    <div className="bg-card px-8 py-10 text-center relative overflow-hidden">
                      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 39px, currentColor 39px, currentColor 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, currentColor 39px, currentColor 40px)', backgroundSize: '40px 40px' }} />
                      <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-muted-foreground/50 mb-4 relative">Inversión total</p>
                      <div className="flex items-end justify-center gap-3 mb-4 relative">
                        <span className="text-[80px] sm:text-[96px] font-serif font-bold text-primary leading-none tracking-tight">$7,000</span>
                        <span className="text-lg font-semibold text-muted-foreground/60 pb-3 tracking-widest">MXN</span>
                      </div>
                      <div className="flex flex-wrap justify-center gap-2 relative">
                        {['4-5 sesiones', 'CONNERS-3 · WISC-V · BRIEF-2 · CPT-3', 'Informe oficial', 'Sesión de devolución'].map((chip) => (
                          <span key={chip} className="inline-flex items-center gap-1.5 px-3 py-1 bg-secondary border border-border rounded-full text-[10px] text-muted-foreground font-medium">
                            <CheckCircle2 className="w-3 h-3 text-primary/50 shrink-0" />
                            {chip}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-dashed border-primary/20 bg-secondary/40 px-8 py-5">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-11 h-11 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                            <Shield className="w-5 h-5 text-primary/70" />
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
                          <p className="text-xs text-muted-foreground font-light leading-relaxed sm:text-right max-w-[200px] sm:max-w-none">Confirma tu lugar y formaliza el inicio del proceso clínico.</p>
                        </div>
                      </div>
                    </div>

                    {/* CRO: Risk reversal — prominent guarantee */}
                    <div className="border-t border-border bg-success/5 px-8 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-success shrink-0" />
                        <p className="text-sm text-success font-medium">Cancelación con reembolso completo hasta 48 hrs antes de la primera cita</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-center text-[10px] text-muted-foreground/50 mt-4">Tu anticipo se descuenta del costo total. Sin costos ocultos.</p>
                </div>
              </SectionReveal>

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

              <SectionReveal delay={0.3}>
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-xs text-muted-foreground">
                  <span className="flex items-center gap-2 px-3 py-1.5 bg-card rounded-full border border-border"><Shield className="w-3.5 h-3.5 text-primary/50" /> Pago seguro</span>
                  <span className="flex items-center gap-2 px-3 py-1.5 bg-card rounded-full border border-border"><Clock className="w-3.5 h-3.5 text-primary/50" /> Cancelación con 48 hrs de anticipación</span>
                  <span className="flex items-center gap-2 px-3 py-1.5 bg-card rounded-full border border-border"><BadgeCheck className="w-3.5 h-3.5 text-primary/50" /> Cédula 11009616</span>
                </div>
              </SectionReveal>

              <SectionReveal delay={0.4}>
                <div className="mt-10 pt-8 border-t border-border">
                  <p className="text-center text-sm text-muted-foreground font-light mb-5">¿Prefieres hablar antes de agendar?</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hola Karen, vi tu página de valoración TDAH infantil y tengo algunas dudas antes de agendar. ¿Podrías orientarme?')}`} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center gap-2 px-6 py-3.5 bg-whatsapp hover:opacity-90 text-white font-bold text-[10px] uppercase tracking-widest rounded-xl transition-all active:scale-[0.98]">
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp
                    </a>
                    <a href={`tel:${PHONE_NUMBER}`} className="group flex items-center justify-center gap-2 px-6 py-3.5 bg-card border-2 border-border hover:border-primary/50 text-primary font-bold text-[10px] uppercase tracking-widest rounded-xl transition-all active:scale-[0.98]">
                      <Phone className="w-4 h-4" />
                      Llamar
                    </a>
                  </div>
                  <p className="text-[10px] text-muted-foreground/50 text-center mt-4">Lunes a Viernes 9:00–7:00 PM · Sábados 9:00–2:00 PM</p>
                </div>
              </SectionReveal>
            </div>
          </section>


          {/* ── Internal linking for topical authority ── */}
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

        {/* ── Mobile sticky CTA — CSS transitions instead of Framer Motion ── */}
        <div
          className={`fixed bottom-0 left-0 right-0 z-[100] px-4 pb-5 lg:hidden bg-gradient-to-t from-background via-background/95 to-transparent pt-8 transition-all duration-350 ${
            heroCTAInView ? 'opacity-0 translate-y-12 pointer-events-none' : 'opacity-100 translate-y-0'
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
        >
          <a href="#agendar" onClick={scrollToBooking} className="flex items-center justify-center w-full bg-gradient-primary text-primary-foreground py-3.5 rounded-xl font-bold text-[11px] uppercase tracking-widest shadow-2xl shadow-primary/35 active:scale-[0.98] transition-transform">
            {symptomCount > 4 ? 'Tu hijo muestra señales — Agendar' : 'Agendar valoración'}
          </a>
        </div>
      </div>
    </>
  );
}
