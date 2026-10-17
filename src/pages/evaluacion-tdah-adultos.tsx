import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight, ArrowDown, Brain, FileText, CheckCircle2, Circle,
  ShieldCheck, AlertCircle, MessageCircle, Phone, Clock, Award,
  Star, Users, CalendarCheck, Stethoscope, BookOpen, ChevronDown,
  Shield, BadgeCheck, Heart, XCircle, Briefcase, TrendingUp,
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingButtons from '@/components/layout/FloatingButtons';
import { SOCIAL_PROFILES, WA_NUMBER, PHONE_NUMBER, PHONE_E164 } from '@/lib/contact';
import { SITE_URL, CEDULA, KAREN_IMAGE, REVIEWS, GEO } from '@/lib/site';

/* ═══════════════════════════════════════════════════════════════
   CONFIG — Cal.com URL (cambiar al URL real de Karen)
   ═══════════════════════════════════════════════════════════════ */
const CAL_URL = 'https://cal.com/psicologa-karen-trujillo/valoracion-tdah-adultos-hibrido';
const CANONICAL_URL = `${SITE_URL}/evaluacion-tdah-adultos`;

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */

const painPoints = [
  { icon: Briefcase, text: 'Sientes que rindes por debajo de tu potencial en el trabajo, a pesar de esforzarte más que los demás' },
  { icon: Brain, text: 'Procrastinas tareas importantes y después te invade la culpa por no haberlas hecho a tiempo' },
  { icon: Heart, text: 'Tus relaciones se tensan porque olvidas compromisos, llegas tarde o "no escuchas"' },
  { icon: TrendingUp, text: 'Sospechas que algo neurológico explica un patrón que la "falta de voluntad" no justifica' },
];

const symptoms = [
  'Dificultad para mantener la atención en reuniones, lecturas o conversaciones largas',
  'Procrastinación crónica incluso en tareas que consideras importantes',
  'Olvidos frecuentes de citas, compromisos o dónde dejaste objetos',
  'Sensación constante de inquietud interna o necesidad de estar en movimiento',
  'Dificultad para organizarte, priorizar y cumplir plazos',
  'Impulsividad en decisiones, compras o respuestas emocionales',
  'Empiezas muchos proyectos pero te cuesta terminarlos',
  'Hiperfoco en actividades que te interesan pero incapacidad de concentrarte en las demás',
];

const proceso = [
  { n: '01', titulo: 'Entrevista clínica inicial', desc: 'Historia de vida, trayectoria académica-laboral, síntomas actuales y retrospectiva de la infancia.', duracion: '60-90 min' },
  { n: '02', titulo: 'Aplicación de pruebas neuropsicológicas', desc: 'Sesiones con CAARS-2 (escalas TDAH adultos), WAIS-IV (perfil cognitivo), BRIEF-2A (funciones ejecutivas) y CPT-3 (atención sostenida).', duracion: '2-3 sesiones' },
  { n: '03', titulo: 'Cuestionarios a pareja o familiar cercano', desc: 'Escalas de conducta y funcionamiento cotidiano completadas por un observador externo.', duracion: 'Remoto' },
  { n: '04', titulo: 'Análisis e informe clínico', desc: 'Integración de datos, diagnóstico diferencial y perfil neuropsicológico completo.', duracion: '5-7 días' },
  { n: '05', titulo: 'Sesión de devolución', desc: 'Explicación del diagnóstico, recomendaciones terapéuticas y estrategias para la vida diaria.', duracion: '60 min' },
];

const instrumentos = [
  { nombre: 'DIVA 2.0', desc: 'Entrevista diagnóstica de TDAH en adultos, única validada en español. Es el punto de partida del diagnóstico.' },
  { nombre: 'CAARS-2', desc: 'Escalas de TDAH (Conners): mide inatención e hiperactividad, desde tu perspectiva y la de un observador cercano.' },
  { nombre: 'WAIS-IV', desc: 'Perfil cognitivo completo: memoria de trabajo, razonamiento y velocidad de procesamiento.' },
  { nombre: 'BRIEF-2A', desc: 'Cómo se manifiesta el TDAH en tu día a día: organización, regulación emocional, planificación.' },
  { nombre: 'CPT-3', desc: 'Medición objetiva de la atención sostenida durante 14 minutos. Los datos no dependen de lo que tú digas de ti mismo.' },
];

const informeIncludes = [
  'Diagnóstico diferencial con respaldo clínico',
  'Perfil neuropsicológico completo del adulto',
  'Recomendaciones terapéuticas específicas',
  'Estrategias para el ámbito laboral y personal',
  'Plan de intervención a corto y mediano plazo',
  'Validez oficial ante IMSS, instituciones y empleadores',
];

/* ── Diferenciador: Neuropsicología vs Psicología ── */
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
    neuropsicologia: 'Diferencia TDAH de ansiedad, depresión, burnout o trastornos del aprendizaje con datos objetivos',
  },
  {
    aspecto: 'Validez institucional',
    psicologia: 'Variable según la institución',
    neuropsicologia: 'Informe con cédula profesional federal aceptado por IMSS y dependencias oficiales',
  },
];

const faqItems = [
  {
    cat: 'Diagnóstico',
    q: '¿Se puede diagnosticar TDAH en la edad adulta?',
    a: 'Sí. Muchos adultos no fueron diagnosticados de niños porque compensaron sus síntomas con esfuerzo. La valoración evalúa tanto el funcionamiento actual como tu historia de desarrollo.',
  },
  {
    cat: 'Diagnóstico',
    q: '¿Cuál es la diferencia entre TDAH y ansiedad o burnout en adultos?',
    a: 'El TDAH es neurológico y presente desde la infancia. La ansiedad y el burnout pueden dar síntomas parecidos (dificultad para concentrarte, olvidos, inquietud) pero con causas y tratamiento distintos. Las pruebas objetivas permiten diferenciarlos.',
  },
  {
    cat: 'Diagnóstico',
    q: '¿Cuál es la diferencia entre un neuropsicólogo y un psicólogo para diagnosticar TDAH?',
    a: 'El psicólogo evalúa conducta mediante entrevista. El neuropsicólogo mide las funciones ejecutivas del cerebro con pruebas estandarizadas y cuantificables — el estándar clínico para TDAH en adultos.',
  },
  {
    cat: 'Diagnóstico',
    q: '¿Qué pasa si el resultado no indica TDAH?',
    a: 'El informe igual aporta claridad: identifica fortalezas, áreas de oportunidad y posibles diagnósticos diferenciales (ansiedad, depresión, burnout, trastorno de aprendizaje).',
  },
  {
    cat: 'Diagnóstico',
    q: '¿Necesito un diagnóstico previo de la infancia para evaluarme?',
    a: 'No. La valoración incluye una revisión retrospectiva de tu historia de desarrollo para identificar patrones de TDAH a lo largo de tu vida, incluso sin diagnóstico previo.',
  },
  {
    cat: 'Proceso y pruebas',
    q: '¿Cuánto tiempo toma una valoración de TDAH en adultos en Cancún?',
    a: 'Entre 2 y 3 semanas, en 4-5 citas presenciales: entrevista clínica, pruebas estandarizadas (2-3 sesiones), cuestionarios a un familiar cercano, análisis y sesión de devolución con informe.',
  },
  {
    cat: 'Proceso y pruebas',
    q: '¿Qué pruebas se aplican para diagnosticar TDAH en adultos?',
    a: 'Cuatro pruebas estandarizadas internacionales: CAARS-2 (síntomas TDAH), WAIS-IV (perfil cognitivo), BRIEF-2A (funciones ejecutivas) y CPT-3 (atención sostenida). Todas validadas para población adulta hispanohablante.',
  },
  {
    cat: 'Proceso y pruebas',
    q: '¿La valoración de TDAH se puede hacer en línea?',
    a: 'La entrevista inicial y la devolución sí pueden ser en línea. Las pruebas estandarizadas requieren aplicación presencial en Cancún para garantizar la validez de los resultados.',
  },
  {
    cat: 'Validez del informe',
    q: '¿El informe de TDAH tiene validez oficial?',
    a: `Sí. Está respaldado por cédula profesional federal ${CEDULA} (SEP) y tiene validez ante el IMSS, instituciones de salud, empleadores y dependencias gubernamentales en México.`,
  },
  {
    cat: 'Costo y logística',
    q: '¿Cuánto cuesta la valoración de TDAH en adultos en Cancún?',
    a: 'El costo total es de $8,300 MXN. Incluye las 4-5 sesiones, las 4 pruebas estandarizadas, el informe clínico y la sesión de devolución. Se pide un anticipo de $1,000 MXN al agendar (parte del total).',
  },
  {
    cat: 'Costo y logística',
    q: '¿El anticipo de $1,000 es adicional al costo total?',
    a: 'No, forma parte del total de $8,300 MXN. Al iniciar el proceso solo quedan $7,300 MXN por cubrir. Se pide al agendar para confirmar tu lugar.',
  },
  {
    cat: 'Costo y logística',
    q: '¿Se puede pagar la valoración en parcialidades?',
    a: 'Sí: un anticipo de $1,000 MXN al agendar y $7,300 MXN antes de la entrega del informe. Si necesitas otra estructura de pago, puedes consultarlo por WhatsApp.',
  },
  {
    cat: 'Costo y logística',
    q: '¿Puedo cancelar o reprogramar mi cita?',
    a: 'Sí, con al menos 48 horas de anticipación. El anticipo es reembolsable dentro de ese plazo; fuera de plazo, se aplica como crédito para reagendar.',
  },
];

const faqCategories = Array.from(new Set(faqItems.map((f) => f.cat)));

const reviews = [
  { name: 'Alejandro, 34 años — Ingeniero', text: 'Llevaba años pensando que era "flojo". El informe de Karen me mostró exactamente qué funciones ejecutivas estaban afectadas. Fue liberador tener una explicación real.', stars: 5 },
  { name: 'Mariana, 28 años — Diseñadora', text: 'Me diagnosticaron ansiedad dos veces antes de llegar aquí. Resultó ser TDAH inatento. Por fin entiendo por qué las estrategias anteriores no funcionaban.', stars: 5 },
  { name: 'Roberto, 41 años — Empresario', text: 'A los 41 años descubrí que tengo TDAH. Las recomendaciones han cambiado mi productividad y mis relaciones. Ojalá lo hubiera hecho antes.', stars: 5 },
];

/* ═══════════════════════════════════════════════════════════════
   SCHEMA LD+JSON — Enhanced with MedicalClinic + DiagnosticProcedure
   ═══════════════════════════════════════════════════════════════ */

/* ── Physician entity (reused across schemas) ── */
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
  sameAs: SOCIAL_PROFILES,
};

/* ── MedicalCondition entity ── */
const tdahCondition = {
  '@type': 'MedicalCondition',
  '@id': `${SITE_URL}/#tdah-adultos`,
  name: 'Trastorno por Déficit de Atención e Hiperactividad (TDAH) en adultos',
  alternateName: ['TDAH en adultos', 'ADHD adulto', 'Déficit de atención adulto', 'TDAH no diagnosticado'],
  code: [
    { '@type': 'MedicalCode', code: 'F90', codingSystem: 'ICD-10' },
    { '@type': 'MedicalCode', code: '314.01', codingSystem: 'DSM-5' },
  ],
  sameAs: 'https://www.wikidata.org/wiki/Q206811',
  associatedAnatomy: { '@type': 'AnatomicalStructure', name: 'Corteza prefrontal', sameAs: 'https://www.wikidata.org/wiki/Q80919' },
  signOrSymptom: [
    { '@type': 'MedicalSignOrSymptom', name: 'Inatención persistente en tareas cotidianas y laborales' },
    { '@type': 'MedicalSignOrSymptom', name: 'Inquietud interna o dificultad para relajarse' },
    { '@type': 'MedicalSignOrSymptom', name: 'Impulsividad en decisiones y respuestas emocionales' },
    { '@type': 'MedicalSignOrSymptom', name: 'Dificultad en funciones ejecutivas: planificación, organización y regulación' },
    { '@type': 'MedicalSignOrSymptom', name: 'Procrastinación crónica' },
    { '@type': 'MedicalSignOrSymptom', name: 'Dificultad para completar proyectos iniciados' },
  ],
  riskFactor: [
    { '@type': 'MedicalRiskFactor', name: 'Antecedentes genéticos familiares de TDAH' },
    { '@type': 'MedicalRiskFactor', name: 'Diagnóstico no realizado en la infancia' },
    { '@type': 'MedicalRiskFactor', name: 'Compensación cognitiva que enmascara síntomas durante años' },
  ],
  typicalAgeRange: '18+',
  possibleTreatment: [
    { '@type': 'MedicalTherapy', name: 'Terapia cognitivo-conductual' },
    { '@type': 'MedicalTherapy', name: 'Intervención neuropsicológica' },
    { '@type': 'MedicalTherapy', name: 'Estrategias de productividad y organización' },
    { '@type': 'MedicalTherapy', name: 'Tratamiento farmacológico (referido a psiquiatría)' },
  ],
  differentialDiagnosis: [
    { '@type': 'DDxElement', diagnosis: { '@type': 'MedicalCondition', name: 'Trastorno de ansiedad generalizada' } },
    { '@type': 'DDxElement', diagnosis: { '@type': 'MedicalCondition', name: 'Trastorno depresivo mayor' } },
    { '@type': 'DDxElement', diagnosis: { '@type': 'MedicalCondition', name: 'Síndrome de burnout' } },
    { '@type': 'DDxElement', diagnosis: { '@type': 'MedicalCondition', name: 'Trastorno específico del aprendizaje' } },
  ],
};

/* ── MedicalClinic entity (local SEO + GEO) ── */
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
  geo: {
    '@type': 'GeoCoordinates',
    latitude: GEO.latitude,
    longitude: GEO.longitude,
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
  availableService: { '@id': `${SITE_URL}/#tdah-adultos-service` },
  member: { '@id': `${SITE_URL}/#physician` },
};

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    /* ── Page ── */
    {
      '@type': 'MedicalWebPage',
      name: 'Valoración Neuropsicológica de TDAH en Adultos en Cancún',
      url: CANONICAL_URL,
      description: `Evaluación neuropsicológica de TDAH en adultos (+18 años) en Cancún. Diagnóstico con CAARS-2, WAIS-IV, BRIEF-2A y CPT-3. Informe clínico con cédula federal ${CEDULA}.`,
      inLanguage: 'es-MX',
      about: { '@id': `${SITE_URL}/#tdah-adultos` },
      mentions: [
        { '@type': 'MedicalCondition', name: 'TDAH', sameAs: 'https://www.wikidata.org/wiki/Q206811' },
        { '@type': 'MedicalCondition', name: 'Trastorno de ansiedad generalizada' },
        { '@type': 'AnatomicalStructure', name: 'Corteza prefrontal', sameAs: 'https://www.wikidata.org/wiki/Q80919' },
        { '@type': 'MedicalTest', name: 'WAIS-IV', sameAs: 'https://www.wikidata.org/wiki/Q1502276' },
      ],
      reviewedBy: { '@id': `${SITE_URL}/#physician` },
      lastReviewed: '2026-06-02',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Valoración TDAH Adultos', item: CANONICAL_URL },
        ],
      },
    },
    /* ── Physician ── */
    physicianEntity,
    /* ── Clinic (local SEO) ── */
    clinicEntity,
    /* ── Condition ── */
    tdahCondition,
    /* ── Diagnostic Procedures (GEO: helps LLMs understand each test) ── */
    {
      '@type': 'DiagnosticProcedure',
      name: 'CAARS-2',
      alternateName: 'Conners Adult ADHD Rating Scales — 2nd Edition',
      description: 'Escala de evaluación de síntomas de TDAH en adultos con formas de autorreporte y observador externo. Estándar internacional para medir inatención, hiperactividad e impulsividad en población adulta.',
      usedToDiagnose: { '@id': `${SITE_URL}/#tdah-adultos` },
    },
    {
      '@type': 'DiagnosticProcedure',
      name: 'WAIS-IV',
      alternateName: 'Escala Wechsler de Inteligencia para Adultos — 4ª edición',
      description: 'Evaluación de inteligencia y perfil cognitivo adulto que mide atención, memoria de trabajo, velocidad de procesamiento y razonamiento.',
      sameAs: 'https://www.wikidata.org/wiki/Q1502276',
      usedToDiagnose: { '@id': `${SITE_URL}/#tdah-adultos` },
    },
    {
      '@type': 'DiagnosticProcedure',
      name: 'BRIEF-2A',
      description: 'Inventario de Evaluación Conductual de la Función Ejecutiva — versión adultos. Mide regulación emocional, planificación, organización e inhibición en contextos cotidianos.',
      usedToDiagnose: { '@id': `${SITE_URL}/#tdah-adultos` },
    },
    {
      '@type': 'DiagnosticProcedure',
      name: 'CPT-3',
      alternateName: 'Conners Continuous Performance Test',
      description: 'Prueba computarizada que mide atención sostenida, vigilancia e impulsividad de forma objetiva durante 14 minutos.',
      usedToDiagnose: { '@id': `${SITE_URL}/#tdah-adultos` },
    },
    /* ── Service + Offer ── */
    {
      '@type': 'MedicalProcedure',
      '@id': `${SITE_URL}/#tdah-adultos-service`,
      name: 'Valoración Neuropsicológica de TDAH en Adultos',
      procedureType: 'Diagnostic',
      howPerformed: 'Aplicación de pruebas neuropsicológicas estandarizadas (CAARS-2, WAIS-IV, BRIEF-2A, CPT-3), entrevista clínica, cuestionarios a observador externo, elaboración de informe y sesión de devolución.',
      preparation: 'No requiere preparación especial. Se recomienda asistir descansado y haber dormido adecuadamente la noche anterior.',
      followup: 'Sesión de devolución con explicación del diagnóstico, recomendaciones terapéuticas y estrategias para la vida laboral y personal.',
      bodyLocation: 'Sistema nervioso central — funciones ejecutivas',
      status: 'EventScheduled',
      provider: { '@id': `${SITE_URL}/#physician` },
      location: { '@id': `${SITE_URL}/#clinic` },
      offers: {
        '@type': 'Offer',
        price: '8300',
        priceCurrency: 'MXN',
        description: 'Proceso completo: 4-5 sesiones, pruebas estandarizadas, informe clínico y sesión de devolución. Anticipo de $1,000 MXN al agendar.',
        availability: 'https://schema.org/InStock',
        validFrom: '2025-01-01',
        areaServed: { '@type': 'City', name: 'Cancún', sameAs: 'https://www.wikidata.org/wiki/Q8969' },
      },
    },
    /* ── Individual Reviews ── */
    ...reviews.map((r, i) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.name },
      reviewRating: { '@type': 'Rating', ratingValue: r.stars, bestRating: 5 },
      reviewBody: r.text,
      itemReviewed: { '@id': `${SITE_URL}/#physician` },
      datePublished: `2025-0${i + 1}-15`,
    })),
    /* ── AggregateRating ── */
    {
      '@type': 'AggregateRating',
      itemReviewed: { '@id': `${SITE_URL}/#physician` },
      ratingValue: REVIEWS.ratingValue,
      reviewCount: REVIEWS.reviewCount,
      bestRating: '5',
      worstRating: '1',
    },
    /* ── FAQ ── */
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
    if (count <= 2) return { label: 'Pocos indicadores por ahora', description: 'Puede ser situacional. Si persiste o te incomoda, una consulta te da claridad.', color: 'border-success bg-success/5', level: 'low' };
    if (count <= 4) return { label: 'Vale la pena explorar', description: 'Esto sugiere que una valoración formal podría aportarte información útil.', color: 'border-accent-blue bg-accent-blue/5', level: 'mid' };
    return { label: 'Una valoración es muy recomendable', description: 'Estas señales, si son frecuentes, justifican una evaluación neuropsicológica formal.', color: 'border-primary bg-primary/5', level: 'high' };
  };

  const result = getResult();

  return (
    <div className="bg-card rounded-2xl border-2 border-border overflow-hidden shadow-xl shadow-primary/5">
      {showHeader && (
        <div className="p-6 sm:p-8 border-b border-border bg-gradient-to-br from-secondary/80 to-secondary/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent-blue/10 rounded-full blur-2xl" />
          <div className="flex items-center gap-3 mb-3 relative">
            <AlertCircle className="w-5 h-5 text-accent-blue shrink-0" />
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Herramienta orientativa · No es diagnóstico
            </span>
          </div>
          <h3 className="text-2xl font-serif font-bold text-primary mb-2 relative">¿Te identificas con estas señales?</h3>
          <p className="text-muted-foreground text-sm font-light relative">Selecciona las que se presenten de forma frecuente y persistente en tu vida diaria.</p>
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
            Agendar mi valoración
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
        <p className="text-xs text-muted-foreground/50 text-center mt-4">Solo una valoración neuropsicológica formal puede establecer un diagnóstico.</p>
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE — FUNNEL (Optimized flow: Etapas 1-3 applied)
   ═══════════════════════════════════════════════════════════════ */

export default function TDAHAdultosFunnel() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [, setSymptomCount] = useState(0);
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
        <title>Valoración TDAH en Adultos en Cancún · +18 años | Karen Trujillo</title>
        <meta name="description" content={`¿Sospechas que tienes TDAH? Valoración neuropsicológica de TDAH en adultos en Cancún (+18 años). Pruebas CAARS-2, WAIS-IV. Informe oficial con cédula ${CEDULA}. $8,300 MXN. Agenda en línea.`} />
        <link rel="canonical" href={CANONICAL_URL} />

        <meta name="geo.region" content="MX-ROO" />
        <meta name="geo.placename" content="Cancún, Quintana Roo" />
        <meta name="geo.position" content={`${GEO.latitude};${GEO.longitude}`} />
        <meta name="ICBM" content={`${GEO.latitude}, ${GEO.longitude}`} />

        <meta property="og:type" content="website" />
        <meta property="og:locale" content="es_MX" />
        <meta property="og:site_name" content="Neuropsicóloga Karen Trujillo — Neuropsicología" />
        <meta property="og:title" content="Valoración TDAH en Adultos en Cancún · +18 años" />
        <meta property="og:description" content="Evaluación neuropsicológica con pruebas estandarizadas. Informe con validez oficial ante IMSS e instituciones. $8,300 MXN. Agenda en línea." />
        <meta property="og:url" content={CANONICAL_URL} />
        <meta property="og:image" content="https://www.psicologakarentrujillo.com.mx/og-tdah-adultos.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Neuropsicóloga Karen Trujillo — Especialista en TDAH y Autismo en Cancún" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Valoración TDAH en Adultos en Cancún | +18 años" />
        <meta name="twitter:description" content="Evaluación neuropsicológica de TDAH en adultos con instrumentos estandarizados. Informe oficial. Agenda en línea. Cancún, Q. Roo." />
        <meta name="twitter:image" content={KAREN_IMAGE} />

        {/* AEO: Speakable — includes diferenciador section */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: ['#definicion-tdah', '#proceso-valoracion', '#que-incluye-informe', '#diferenciador-neuropsicologia'],
          },
          url: CANONICAL_URL,
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

        {/* ── Quick-jump anchor nav — lets users skip straight to what they need instead of scrolling the whole page ── */}
        <nav aria-label="Navegación rápida de la página" className="hidden sm:block sticky top-0 z-40 bg-card/95 backdrop-blur border-b border-border">
          <div className="max-w-4xl mx-auto px-6 py-2.5 flex items-center justify-center gap-1 overflow-x-auto text-xs">
            {[
              { href: '#sintomas', label: 'Autoevaluación' },
              { href: '#proceso-valoracion', label: 'Proceso' },
              { href: '#agendar', label: 'Precio y agenda' },
              { href: '#preguntas-frecuentes', label: 'Preguntas' },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => { e.preventDefault(); document.getElementById(item.href.slice(1))?.scrollIntoView({ behavior: 'smooth' }); }}
                className="px-3 py-1.5 rounded-full font-medium text-muted-foreground hover:text-primary hover:bg-secondary whitespace-nowrap transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>

        <main className="w-full min-w-0 overflow-x-hidden">

          {/* ══════════════════════════════════════════════════════
              1 · HERO — H1 SEO + subtítulo emocional + outcome-first copy
              ══════════════════════════════════════════════════════ */}
          <section className="relative flex items-center justify-center pt-28 pb-16 px-6 overflow-hidden" style={{ background: '#2e2545' }}>
            <div aria-hidden="true" className="absolute top-0 right-0 w-[480px] h-[480px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(208,208,231,0.07) 0%, transparent 70%)' }} />
            <div aria-hidden="true" className="absolute bottom-0 left-0 w-[320px] h-[320px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(91,78,127,0.18) 0%, transparent 70%)' }} />

            <div className="max-w-4xl mx-auto relative z-10 text-center">

              <nav aria-label="Breadcrumb" className="mb-6 animate-[fadeIn_0.6s_ease-out_both]">
                <ol className="flex items-center justify-center gap-2 text-xs" style={{ color: 'rgba(208,208,231,0.6)' }}>
                  <li><Link href="/" className="hover:text-white transition-colors">Inicio</Link></li>
                  <li style={{ color: 'rgba(208,208,231,0.3)' }}>/</li>
                  <li className="text-white font-medium">Valoración TDAH Adultos</li>
                </ol>
              </nav>

              <div className="animate-[fadeInUp_0.8s_ease-out_both]">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 max-w-full" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(208,208,231,0.18)' }}>
                  <span className="w-2 h-2 rounded-full bg-success shrink-0" />
                  <span className="text-xs uppercase tracking-[0.12em] font-bold text-center leading-snug" style={{ color: 'rgba(220,220,240,0.9)' }}>Cancún · Adultos +18 años · Agenda en línea</span>
                </div>

                {/* H1 — keyword-rich for SEO */}
                <h1 className="text-[2rem] sm:text-5xl lg:text-6xl font-serif font-bold text-white leading-[1.1] mb-4 text-balance">
                  Valoración TDAH en Adultos<br className="hidden sm:block" /> en Cancún
                </h1>

                {/* Emotional hook — visually prominent subtitle */}
                <p className="text-lg sm:text-2xl font-serif italic mb-6 max-w-2xl mx-auto" style={{ color: 'rgba(222,222,240,0.88)' }}>
                  No es falta de voluntad. Puede ser tu cerebro
                </p>

                {/* Subheadline — outcome first, features second, single emphasis point */}
                <p className="text-sm sm:text-lg font-light leading-relaxed mb-4 max-w-2xl mx-auto" style={{ color: 'rgba(230,230,245,0.92)' }}>
                  Un diagnóstico formal que explica años de frustración y te da un camino concreto para funcionar mejor. Informe clínico con <strong className="text-white font-semibold">validez oficial</strong> ante IMSS, instituciones y empleadores.
                </p>

                <p className="text-xs sm:text-sm mb-8" style={{ color: 'rgba(220,220,240,0.75)' }}>
                  <strong className="text-white">Neuropsicóloga Karen Trujillo</strong> · Cédula Federal {CEDULA} · 7+ años de experiencia
                </p>
              </div>

              <div ref={heroCTARef} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-[fadeInUp_0.8s_ease-out_0.3s_both]">
                <CtaButton>Agendar mi valoración</CtaButton>
                <a href="#sintomas" onClick={(e) => { e.preventDefault(); document.getElementById('sintomas')?.scrollIntoView({ behavior: 'smooth' }); }} className="group inline-flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-wide px-6 py-4 rounded-xl border-2 border-white/25 text-white/80 hover:border-white/50 hover:text-white transition-all duration-300">
                  ¿Podría tener TDAH? Autoevaluación de 2 min
                  <ArrowDown className="w-3 h-3 transition-transform group-hover:translate-y-0.5 shrink-0" />
                </a>
              </div>

              <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs animate-[fadeIn_0.8s_ease-out_0.6s_both]" style={{ color: 'rgba(225,225,242,0.9)' }}>
                {[
                  { icon: BadgeCheck, text: `Cédula ${CEDULA}` },
                  { icon: Stethoscope, text: 'Pruebas estandarizadas internacionales' },
                  { icon: CalendarCheck, text: 'Agenda en línea' },
                ].map((badge) => (
                  <span key={badge.text} className="flex items-center gap-1.5">
                    <badge.icon className="w-3.5 h-3.5" style={{ color: 'rgba(208,208,231,0.6)' }} />
                    <span className="font-medium">{badge.text}</span>
                  </span>
                ))}
              </div>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              2 · PAIN POINTS + SYMPTOM CHECKER
              "Costo de no actuar" callout after pain cards
              ══════════════════════════════════════════════════════ */}
          <section id="sintomas" className="py-14 sm:py-20 bg-secondary scroll-mt-24">
            <div className="max-w-4xl mx-auto px-6">
              <SectionReveal>
                <p className="text-xs font-bold uppercase tracking-widest text-accent-blue mb-4 text-center">Muchos adultos llegan con esta historia</p>
                <h2 className="text-headline font-serif font-bold text-primary mb-4 text-center text-balance">¿Te suena familiar?</h2>
                <p className="text-muted-foreground font-light text-center max-w-2xl mx-auto mb-3">El TDAH en adultos suele confundirse con ansiedad, depresión o &ldquo;falta de disciplina&rdquo;.</p>
                <p className="inline-flex items-center gap-1.5 mx-auto mb-10 justify-center w-full text-sm font-semibold text-primary">
                  <Clock className="w-4 h-4 text-primary/60" /> Autoevaluación rápida: toma 2 minutos, sin registro.
                </p>
              </SectionReveal>

              {/* Checklist first — the interactive tool, right after the promise of speed */}
              <SectionReveal delay={0.1}>
                <div className="max-w-3xl mx-auto mb-12">
                  <FunnelSymptomChecker showHeader={false} onCountChange={setSymptomCount} />
                </div>
              </SectionReveal>

              {/* Supporting context — comes after the tool, not before, so it doesn't block access to it */}
              <SectionReveal>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-5 text-center">Historias comunes entre quienes se evalúan</p>
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

              {/* Calm, non-alarmist supportive note (softened from urgency framing) */}
              <SectionReveal delay={0.35}>
                <div className="relative mb-2 p-5 rounded-2xl bg-card border-l-4 border-l-primary/60 border border-border">
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">
                    Entender qué te está pasando es el primer paso para encontrar estrategias que sí funcionen para tu forma de pensar.
                  </p>
                </div>
              </SectionReveal>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              3 · AEO DEFINITION — "¿Qué es el TDAH en adultos?"
              ══════════════════════════════════════════════════════ */}
          <section id="definicion-tdah" className="py-14 sm:py-16 bg-secondary/50 border-y border-border relative overflow-hidden">
            <div className="max-w-3xl mx-auto px-6 relative">
              <SectionReveal>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-6 text-center">¿Qué es el TDAH en adultos?</h2>
                <p className="text-muted-foreground font-light leading-relaxed mb-2 text-center max-w-2xl mx-auto">
                  Es una condición neurológica que afecta la corteza prefrontal: la zona que planifica, organiza, regula emociones y sostiene la atención. <strong className="text-primary font-semibold">No es falta de voluntad ni de inteligencia.</strong>
                </p>
                <p className="text-muted-foreground font-light leading-relaxed mb-6 text-center max-w-2xl mx-auto text-sm">
                  6 de cada 10 niños con TDAH siguen con síntomas de adultos, y muchos nunca fueron diagnosticados. (Criterios DSM-5, código F90 del CIE-10.)
                </p>

                <div className="flex flex-wrap justify-center gap-3 mb-8">
                  {[
                    { label: 'Inatento', desc: 'Procrastinación, olvidos, "cabeza en otro lado"' },
                    { label: 'Hiperactivo-impulsivo', desc: 'Inquietud interna, decisiones impulsivas' },
                    { label: 'Combinado', desc: 'Ambas presentaciones' },
                  ].map((tipo) => (
                    <div key={tipo.label} className="flex flex-col gap-0.5 px-4 py-3 bg-card border border-border rounded-2xl text-center min-w-[140px]">
                      <span className="text-xs font-bold text-primary">{tipo.label}</span>
                      <span className="text-xs text-muted-foreground font-light">{tipo.desc}</span>
                    </div>
                  ))}
                </div>

                <div className="p-5 bg-card rounded-2xl border border-border shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-accent-blue/60 to-primary/40 rounded-l-2xl" />
                  <p className="text-sm text-muted-foreground font-light leading-relaxed pl-2">
                    <strong className="text-primary font-semibold">En Cancún, Quintana Roo</strong>, la neuropsicóloga Karen Trujillo (cédula {CEDULA}) aplica pruebas como <strong className="text-primary font-semibold">CAARS-2, WAIS-IV, BRIEF-2A y CPT-3</strong> para emitir un informe clínico con validez oficial ante el IMSS, instituciones de salud y empleadores.
                  </p>
                </div>
              </SectionReveal>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              4 · PROCESO — 5 phases
              Direct answer phrase + temporal reframe
              ══════════════════════════════════════════════════════ */}
          <section id="proceso-valoracion" className="py-14 sm:py-20 bg-card">
            <div className="max-w-4xl mx-auto px-6">
              <SectionReveal>
                <p className="text-xs font-bold uppercase tracking-widest text-accent-blue mb-4 text-center">Proceso clínico estructurado</p>
                <h2 className="text-headline font-serif font-bold text-primary mb-4 text-center">¿Cómo funciona la valoración de TDAH en adultos?</h2>
                <p className="text-muted-foreground font-light mb-4 text-center max-w-2xl mx-auto">
                  <strong className="text-primary font-semibold">$8,300 MXN</strong> · 4-5 sesiones presenciales · 2 a 3 semanas en total.
                </p>
                <p className="text-sm text-primary/70 font-medium text-center mb-10">5 pasos claros, no un proceso abierto e incierto.</p>
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
              5 · INFORME + INSTRUMENTOS — Value building
              ══════════════════════════════════════════════════════ */}
          <section className="py-14 sm:py-20 bg-gradient-primary text-primary-foreground w-full">
            <div className="max-w-4xl mx-auto px-6">
              <SectionReveal>
                <div id="que-incluye-informe" className="text-center mb-10">
                  <FileText className="w-10 h-10 text-accent-blue mx-auto mb-5" />
                  <h2 className="text-3xl sm:text-4xl font-serif font-bold italic mb-4">¿Qué incluye el informe de valoración TDAH?</h2>
                  <p className="text-primary-foreground/70 font-light max-w-xl mx-auto">Documento clínico con validez oficial ante IMSS, instituciones de salud y empleadores en todo México. Incluye diagnóstico, perfil cognitivo y recomendaciones accionables.</p>
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
                  <p className="text-xs font-bold uppercase tracking-widest text-primary-foreground/50 mb-6">Pruebas estandarizadas utilizadas</p>
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
              AEO + objection resolution
              ══════════════════════════════════════════════════════ */}
          <section id="diferenciador-neuropsicologia" className="py-14 sm:py-20 bg-card border-t border-border">
            <div className="max-w-4xl mx-auto px-6">
              <SectionReveal>
                <p className="text-xs font-bold uppercase tracking-widest text-accent-blue mb-4 text-center">La diferencia importa</p>
                <h2 className="text-headline font-serif font-bold text-primary mb-6 text-center text-balance">¿Por qué neuropsicología y no solo psicología?</h2>

                <div className="max-w-2xl mx-auto space-y-3 mb-10">
                  <p className="text-muted-foreground font-light leading-relaxed text-center">
                    La psicología evalúa conducta a través de entrevista. La neuropsicología va más allá: <strong className="text-primary font-semibold">mide las funciones ejecutivas del cerebro</strong> con pruebas estandarizadas.
                  </p>
                  <p className="text-muted-foreground font-light leading-relaxed text-center">
                    Esto importa porque el TDAH se confunde fácilmente con ansiedad, depresión o burnout. Las pruebas permiten <strong className="text-primary font-semibold">diferenciarlos con precisión</strong> y evitar un tratamiento equivocado.
                  </p>
                  <p className="text-muted-foreground font-light leading-relaxed text-center">
                    El resultado no es solo &ldquo;tienes TDAH&rdquo; o &ldquo;no&rdquo;: te dice <strong className="text-primary font-semibold">qué funciones están afectadas</strong> y qué hacer al respecto.
                  </p>
                </div>
              </SectionReveal>

              {/* Comparative table — stacked cards on mobile (readable), 2-col grid from sm+ */}
              <SectionReveal delay={0.15}>
                <div className="max-w-3xl mx-auto bg-secondary/50 rounded-2xl border border-border overflow-hidden">
                  {/* Column headers — hidden on mobile since each row labels itself */}
                  <div className="hidden sm:grid grid-cols-2">
                    <div className="p-4 bg-secondary/80 border-b border-r border-border text-center">
                      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Psicología clínica</p>
                    </div>
                    <div className="p-4 bg-primary/8 border-b border-border text-center">
                      <p className="text-xs font-bold uppercase tracking-widest text-primary">Neuropsicología</p>
                    </div>
                  </div>

                  {comparativaItems.map((item, i) => (
                    <div key={item.aspecto} className={i !== comparativaItems.length - 1 ? 'border-b border-border' : ''}>
                      {/* Aspect label — full-width spanning row */}
                      <div className="px-4 pt-3 pb-2 bg-secondary/40 border-b border-border/50">
                        <p className="text-sm font-bold text-primary">{item.aspecto}</p>
                      </div>
                      {/* Stacked on mobile, side-by-side from sm+ */}
                      <div className="grid grid-cols-1 sm:grid-cols-2">
                        <div className="sm:border-r border-border p-4 flex items-start gap-2">
                          <XCircle className="w-3.5 h-3.5 text-muted-foreground/40 shrink-0 mt-0.5" />
                          <p className="text-sm text-muted-foreground font-light leading-relaxed">
                            <span className="sm:hidden font-semibold text-muted-foreground/70">Psicología: </span>{item.psicologia}
                          </p>
                        </div>
                        <div className="p-4 bg-primary/3 flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary/60 shrink-0 mt-0.5" />
                          <p className="text-sm text-foreground font-medium leading-relaxed">
                            <span className="sm:hidden font-semibold text-primary/70">Neuropsicología: </span>{item.neuropsicologia}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </SectionReveal>

              <SectionReveal delay={0.3}>
                <div className="mt-10 text-center">
                  <CtaButton>Agendar mi valoración</CtaButton>
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
                <p className="text-xs font-bold uppercase tracking-widest text-accent-blue mb-4 text-center">Lo que dicen quienes ya se evaluaron</p>
                <h2 className="text-headline font-serif font-bold text-primary mb-4 text-center">Adultos que por fin tienen una respuesta</h2>
                <p className="text-muted-foreground font-light text-center max-w-xl mx-auto mb-10">Destacan la claridad del diagnóstico y el impacto concreto en su vida laboral y personal.</p>
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
                  <CtaButton>Agendar mi valoración</CtaButton>
                </div>
              </SectionReveal>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              8 · QUIÉN ES KAREN
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
                          alt="Neuropsicóloga Karen Trujillo — especialista en TDAH en adultos en Cancún"
                          width={256}
                          height={256}
                          className="w-full h-full object-cover object-top"
                          loading="lazy"
                          unoptimized
                        />
                      </div>
                      <div className="absolute -bottom-4 -right-4 bg-gradient-primary text-primary-foreground rounded-2xl px-4 py-2 shadow-xl shadow-primary/25">
                        <p className="text-[11px] font-bold uppercase tracking-widest text-primary-foreground/70">Cédula Federal</p>
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
                      <p><strong className="text-primary font-semibold">Karen Trujillo</strong> es neuropsicóloga clínica con más de 7 años de experiencia evaluando TDAH, autismo y dificultades de aprendizaje en Cancún, Quintana Roo.</p>
                      <p>Aplica instrumentos estandarizados de clase mundial (CAARS-2, WAIS-IV, BRIEF-2A, CPT-3) siguiendo un protocolo clínico riguroso.</p>
                      <p>No solo entregas un diagnóstico: te llevas una <strong className="text-primary font-semibold">hoja de ruta concreta</strong> para funcionar mejor en tu trabajo, relaciones y vida diaria.</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3 pt-2">
                      {[
                        { icon: Award, label: 'Especialista en TDAH y Autismo' },
                        { icon: ShieldCheck, label: 'Informe válido ante IMSS e instituciones' },
                        { icon: Users, label: 'Atención a adultos desde 18 años' },
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
                <p className="text-xs font-bold uppercase tracking-widest text-accent-blue mb-4 text-center">Después de la valoración</p>
                <h2 className="text-headline font-serif font-bold text-primary mb-4 text-center">¿Qué pasa con los resultados?</h2>
                <p className="text-muted-foreground font-light text-center max-w-2xl mx-auto mb-10">Sin importar el resultado, siempre obtienes información valiosa sobre ti. Estos son los tres escenarios posibles:</p>
              </SectionReveal>

              <div className="space-y-4">
                {[
                  { titulo: 'TDAH confirmado', desc: 'Recibes un plan de acción concreto: recomendaciones terapéuticas, estrategias de organización y, si aplica, orientación para referencia a psiquiatría. El informe tiene validez oficial.', color: 'border-primary/30 bg-primary/5', iconColor: 'text-primary bg-primary/10 border-primary/20' },
                  { titulo: 'No es TDAH: diagnóstico diferencial', desc: 'El informe te dice qué sí está pasando (ansiedad, depresión, burnout u otra condición) y te dirige a la intervención correcta.', color: 'border-accent-blue/30 bg-accent-blue/5', iconColor: 'text-accent-blue bg-accent-blue/10 border-accent-blue/20' },
                  { titulo: 'Perfil mixto o subclínico', desc: 'Si muestras rasgos sin cumplir todos los criterios, recibes orientación sobre qué fortalecer y cuándo revaluar.', color: 'border-success/30 bg-success/5', iconColor: 'text-success bg-success/10 border-success/20' },
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
                <div className="mt-10 text-center"><CtaButton>Agendar mi valoración</CtaButton></div>
              </SectionReveal>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              10 · FAQ — 13 items
              A11Y: aria-expanded + aria-controls
              ══════════════════════════════════════════════════════ */}
          <section id="preguntas-frecuentes" className="py-14 sm:py-20 bg-card scroll-mt-24">
            <div className="max-w-3xl mx-auto px-6">
              <SectionReveal>
                <h2 className="text-headline font-serif font-bold text-primary mb-3 text-center">Preguntas frecuentes</h2>
                <p className="text-muted-foreground font-light text-center text-sm mb-10">Agrupadas por tema — busca la que te interese, no hace falta leerlas todas.</p>
              </SectionReveal>

              {faqCategories.map((cat, catIdx) => {
                const itemsInCat = faqItems.filter((f) => f.cat === cat);
                return (
                  <SectionReveal key={cat} delay={catIdx * 0.05} className={catIdx > 0 ? 'mt-8' : ''}>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-accent-blue mb-2">{cat}</h3>
                    <div role="list">
                      {itemsInCat.map((faq) => {
                        const i = faqItems.indexOf(faq);
                        return (
                          <div key={i} role="listitem" style={{ borderBottom: '1px solid rgba(67,56,96,0.09)' }}>
                            <button
                              id={`faq-btn-${i}`}
                              onClick={() => setOpenFaq(openFaq === i ? null : i)}
                              aria-expanded={openFaq === i}
                              aria-controls={`faq-answer-${i}`}
                              className="w-full flex items-center justify-between gap-4 py-4 text-left transition-colors"
                              style={{ background: 'none', border: 'none', cursor: 'pointer', color: openFaq === i ? '#6b5f8a' : '#433860' }}
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
                              style={{ gridTemplateRows: openFaq === i ? '1fr' : '0fr', opacity: openFaq === i ? 1 : 0, transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
                            >
                              <div className="overflow-hidden">
                                <p className="text-sm leading-relaxed pb-4" style={{ color: '#515e71', lineHeight: '1.75', maxWidth: '70ch' }}>
                                  {faq.a}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </SectionReveal>
                );
              })}
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              11 · PRICING + CAL.COM BOOKING
              Risk reversal strip inside pricing card
              ══════════════════════════════════════════════════════ */}
          <section id="agendar" className="py-14 sm:py-20 bg-secondary scroll-mt-20">
            <div className="max-w-4xl mx-auto px-6">
              <SectionReveal>
                <div className="text-center mb-10">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-success/10 rounded-full border border-success/20 mb-6">
                    <CalendarCheck className="w-4 h-4 text-success" />
                    <span className="text-xs uppercase tracking-widest font-bold text-success">Agenda en línea · Confirma en minutos</span>
                  </div>
                  <h2 className="text-headline font-serif font-bold text-primary mb-4">Reserva tu valoración ahora</h2>
                  <p className="text-muted-foreground font-light max-w-2xl mx-auto">Elige el horario que mejor te funcione. Tu lugar queda confirmado al completar el anticipo.</p>
                </div>
              </SectionReveal>

              <SectionReveal delay={0.1}>
                <div className="mb-8 max-w-2xl mx-auto">
                  <div className="rounded-2xl overflow-hidden shadow-2xl shadow-primary/12 border border-primary/20">
                    <div className="bg-gradient-primary px-8 py-5 flex items-center justify-between">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary-foreground/50 mb-0.5">Servicio</p>
                        <p className="text-sm font-bold text-primary-foreground">Valoración TDAH Adultos · Proceso completo</p>
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-success/20 border border-success/30 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                        <span className="text-[11px] font-bold uppercase tracking-wider text-success">Disponible</span>
                      </div>
                    </div>

                    <div className="bg-card px-8 py-10 text-center relative overflow-hidden">
                      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 39px, currentColor 39px, currentColor 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, currentColor 39px, currentColor 40px)', backgroundSize: '40px 40px' }} />
                      <p className="text-xs uppercase tracking-[0.25em] font-bold text-muted-foreground/50 mb-4 relative">Inversión total</p>
                      <div className="flex items-end justify-center gap-3 mb-4 relative">
                        <span className="text-[80px] sm:text-[96px] font-serif font-bold text-primary leading-none tracking-tight">$8,300</span>
                        <span className="text-lg font-semibold text-muted-foreground/60 pb-3 tracking-widest">MXN</span>
                      </div>
                      <div className="flex flex-wrap justify-center gap-2 relative">
                        {['4-5 sesiones', 'CAARS-2 · WAIS-IV · BRIEF-2A · CPT-3', 'Informe oficial', 'Sesión de devolución'].map((chip) => (
                          <span key={chip} className="inline-flex items-center gap-1.5 px-3 py-1 bg-secondary border border-border rounded-full text-xs text-muted-foreground font-medium">
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
                            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground/60 mb-0.5">Anticipo al reservar</p>
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

                  <p className="text-center text-xs text-muted-foreground/50 mt-4">Tu anticipo se descuenta del costo total. Sin costos ocultos.</p>
                </div>
              </SectionReveal>

              <SectionReveal delay={0.2}>
                <div className="bg-card border-2 border-border rounded-2xl overflow-hidden shadow-lg shadow-primary/5">
                  <div className="p-5 border-b border-border flex items-center justify-between bg-secondary/30">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center">
                        <CalendarCheck className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-bold text-primary text-sm">Selecciona fecha y hora</p>
                        <p className="text-xs text-muted-foreground">Cancún, Quintana Roo · Horario local</p>
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
                        title="Agendar valoración TDAH adultos — Neuropsicóloga Karen Trujillo"
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
                  <span className="flex items-center gap-2 px-3 py-1.5 bg-card rounded-full border border-border"><BadgeCheck className="w-3.5 h-3.5 text-primary/50" /> Cédula {CEDULA}</span>
                </div>
              </SectionReveal>

              <SectionReveal delay={0.4}>
                <div className="mt-10 pt-8 border-t border-border">
                  <p className="text-center text-sm text-muted-foreground font-light mb-5">¿Prefieres hablar antes de agendar?</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hola Karen, vi tu página de valoración TDAH en adultos y tengo algunas dudas antes de agendar. ¿Podrías orientarme?')}`} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center gap-2 px-6 py-3.5 bg-whatsapp hover:opacity-90 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all active:scale-[0.98]">
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
              <div className="grid sm:grid-cols-3 gap-3">
                <Link href="/blog/tdah-adultos-diagnostico-tardio" className="flex items-start gap-3 p-4 bg-card border border-border rounded-2xl hover:border-primary/50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group">
                  <BookOpen className="w-4 h-4 text-primary/50 shrink-0 mt-0.5 transition-transform group-hover:scale-110" />
                  <div>
                    <span className="text-sm font-bold text-primary block leading-snug">TDAH en adultos: diagnóstico tardío</span>
                    <span className="text-xs text-muted-foreground font-light">Por qué miles lo descubren después de los 30</span>
                  </div>
                </Link>
                <Link href="/blog/burnout-o-tdah-diferencias" className="flex items-start gap-3 p-4 bg-card border border-border rounded-2xl hover:border-primary/50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group">
                  <BookOpen className="w-4 h-4 text-primary/50 shrink-0 mt-0.5 transition-transform group-hover:scale-110" />
                  <div>
                    <span className="text-sm font-bold text-primary block leading-snug">Burnout vs. TDAH</span>
                    <span className="text-xs text-muted-foreground font-light">Cómo diferenciarlos</span>
                  </div>
                </Link>
                <Link href="/blog/tdah-vs-ansiedad-diferencias" className="flex items-start gap-3 p-4 bg-card border border-border rounded-2xl hover:border-primary/50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group">
                  <BookOpen className="w-4 h-4 text-primary/50 shrink-0 mt-0.5 transition-transform group-hover:scale-110" />
                  <div>
                    <span className="text-sm font-bold text-primary block leading-snug">¿TDAH o ansiedad?</span>
                    <span className="text-xs text-muted-foreground font-light">Diferencias clave</span>
                  </div>
                </Link>
              </div>
            </div>
          </section>

          {/* ── Internal linking for topical authority ── */}
          <section className="py-10 sm:py-12 bg-card border-t border-border">
            <div className="max-w-2xl mx-auto px-6">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-5 text-center">Otros servicios disponibles en Cancún</p>
              <div className="grid sm:grid-cols-3 gap-3">
                <Link href="/evaluacion-tdah-ninos" className="flex items-center gap-3 p-4 bg-secondary border border-border rounded-2xl hover:border-primary/50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group">
                  <ArrowRight className="w-4 h-4 text-primary/50 shrink-0 transition-transform group-hover:translate-x-1" />
                  <div>
                    <span className="text-sm font-bold text-primary block">TDAH en Niños</span>
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
                <Link href="/evaluacion-ci-wisc-v-cancun" className="flex items-center gap-3 p-4 bg-secondary border border-border rounded-2xl hover:border-primary/50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group">
                  <ArrowRight className="w-4 h-4 text-primary/50 shrink-0 transition-transform group-hover:translate-x-1" />
                  <div>
                    <span className="text-sm font-bold text-primary block">Evaluación de CI (WISC-V)</span>
                    <span className="text-xs text-muted-foreground font-light">Perfil cognitivo, sin diagnóstico de TDAH</span>
                  </div>
                </Link>
              </div>
            </div>
          </section>

        </main>

        <FloatingButtons />
        <Footer />

        {/* ── Mobile sticky CTA — CSS transitions instead of Framer Motion ── */}
        <div
          data-sticky-cta="" className={`fixed bottom-0 left-0 right-0 z-[100] px-4 pb-5 lg:hidden bg-gradient-to-t from-background via-background/95 to-transparent pt-8 transition-all duration-350 ${
            heroCTAInView ? 'opacity-0 translate-y-12 pointer-events-none' : 'opacity-100 translate-y-0'
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
        >
          <a href="#agendar" onClick={scrollToBooking} className="flex items-center justify-center w-full bg-gradient-primary text-primary-foreground py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest shadow-2xl shadow-primary/35 active:scale-[0.98] transition-transform">
            Agendar mi valoración
          </a>
        </div>
      </div>
    </>
  );
}
