import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight, ArrowDown, Brain, FileText, CheckCircle2, Circle,
  ShieldCheck, AlertCircle, MessageCircle, Phone, Clock, Award,
  Star, Users, CalendarCheck, Stethoscope, BookOpen, ChevronDown,
  Shield, BadgeCheck, Heart, AlertTriangle,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

/* ═══════════════════════════════════════════════════════════════
   CONFIG
   ═══════════════════════════════════════════════════════════════ */
const CAL_URL = 'https://cal.com/psicologa-karen-trujillo/evaluacion-dislexia';
const WA = 'https://wa.me/529983211547?text=Hola%20Karen%2C%20me%20interesa%20la%20evaluaci%C3%B3n%20de%20dislexia%20para%20mi%20hijo';
const WA_NUMBER = '529983211547';
const PHONE_NUMBER = '529983211547';

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */

const dolorPuntos = [
  {
    icon: AlertTriangle,
    titulo: 'Mi hijo lee muy por debajo de su nivel y no sabemos por qué',
    desc: 'Ya tomó clases extra, cambió de maestro, probamos de todo — y sigue igual. El problema no es el esfuerzo.',
  },
  {
    icon: AlertTriangle,
    titulo: 'La maestra dice que "es descuido" pero yo sé que algo más pasa',
    desc: 'Invierte las letras, confunde palabras parecidas, lee sílaba por sílaba cuando ya debería fluir. No es falta de atención.',
  },
  {
    icon: AlertTriangle,
    titulo: 'Le diagnosticaron TDAH pero el tratamiento no mejoró la lectura',
    desc: 'El TDAH puede coexistir con dislexia — y tratarlos como si fueran lo mismo no funciona. Se necesita un perfil diferenciado.',
  },
  {
    icon: AlertTriangle,
    titulo: 'Su autoestima se está desmoronando por las dificultades en la escuela',
    desc: 'Años de sentirse "tonto" o "lento" frente a sus compañeros dejan una marca emocional que el diagnóstico correcto puede empezar a sanar.',
  },
  {
    icon: AlertTriangle,
    titulo: 'La escuela pide un informe para dar adecuaciones pero no sabemos cómo obtenerlo',
    desc: 'El informe neuropsicológico con cédula federal es el documento que permite a las escuelas implementar ajustes pedagógicos oficiales.',
  },
];

const senales = [
  {
    titulo: 'Invierte letras al leer o escribir',
    desc: 'b/d, p/q, m/n — confunde letras que son imágenes especulares. No desaparece con práctica adicional.',
  },
  {
    titulo: 'Deletrea fonéticamente pero no reconoce palabras como un todo',
    desc: 'Lee "c-a-s-a" sílaba por sílaba en lugar de reconocer "casa" como una unidad visual.',
  },
  {
    titulo: 'Lee muy lentamente y con gran esfuerzo',
    desc: 'Lo que para sus compañeros es automático, para él requiere concentración activa y esfuerzo sostenido.',
  },
  {
    titulo: 'Comprende bien cuando escucha, pero no cuando lee',
    desc: 'Es una señal importante: la inteligencia verbal está intacta. El problema es específicamente el procesamiento del código escrito.',
  },
  {
    titulo: 'Comete errores inusuales al copiar del pizarrón',
    desc: 'No es descuido — es que la memoria visual de las palabras no se consolida de la misma manera que en otros niños.',
  },
  {
    titulo: 'Evita leer en voz alta y se muestra ansioso cuando le toca',
    desc: 'La dislexia no diagnosticada genera vergüenza y ansiedad anticipatoria. El niño aprende a evitar las situaciones donde su dificultad queda expuesta.',
  },
];

const procesoSteps = [
  { n: '01', titulo: 'Entrevista inicial con los padres', desc: 'Historial del desarrollo, primeras dificultades, qué estrategias se han intentado, contexto escolar y familiar.', duracion: '60–90 minutos' },
  { n: '02', titulo: 'Aplicación de pruebas estandarizadas', desc: 'PROLEC-R, WISC-V, TOMAL-2, BRIEF-2 y otras pruebas según el perfil del niño. Se aplican en 2–3 sesiones de 60–90 min.', duracion: '2–3 sesiones' },
  { n: '03', titulo: 'Cuestionarios para padres y maestros', desc: 'Escalas de comportamiento y funciones ejecutivas completadas en casa y escuela — sin cita adicional.', duracion: 'Proceso remoto' },
  { n: '04', titulo: 'Análisis clínico e integración del informe', desc: 'Karen integra todos los datos para construir un perfil clínico completo. Diferencia dislexia de otras condiciones que pueden coexistir.', duracion: '5–7 días hábiles' },
  { n: '05', titulo: 'Sesión de devolución y entrega del informe', desc: 'Se explican los resultados en detalle, el diagnóstico diferencial, el nivel de afectación y las recomendaciones concretas para la escuela y el hogar.', duracion: '60 minutos' },
];

const instrumentos = [
  { nombre: 'PROLEC-R', desc: 'Procesos de Lectura — Revisado. Evalúa los subprocesos específicos de la lectura: identificación de letras, procesamiento fonológico, velocidad lectora y comprensión.', tipo: 'Evaluación lectora' },
  { nombre: 'TOMAL-2', desc: 'Test de Memoria y Aprendizaje. Evalúa memoria verbal y no verbal, que es fundamental para distinguir dislexia de otras dificultades de aprendizaje.', tipo: 'Memoria y aprendizaje' },
  { nombre: 'WISC-V', desc: 'Escala de Inteligencia de Wechsler para Niños. Perfil cognitivo completo: comprensión verbal, razonamiento fluido, memoria de trabajo, velocidad de procesamiento.', tipo: 'Perfil cognitivo' },
  { nombre: 'BRIEF-2', desc: 'Inventario de Evaluación del Comportamiento de las Funciones Ejecutivas. Identifica si hay dificultades ejecutivas que coexisten con la dislexia.', tipo: 'Funciones ejecutivas' },
  { nombre: 'CELF-5', desc: 'Evaluación Clínica de Fundamentos del Lenguaje. Evalúa comprensión y expresión lingüística para descartar trastornos del lenguaje asociados.', tipo: 'Lenguaje' },
  { nombre: 'D-KEFS', desc: 'Delis-Kaplan Executive Function System. Pruebas de flexibilidad cognitiva y velocidad de procesamiento que complementan el perfil neuropsicológico.', tipo: 'Procesamiento' },
];

const informeIncludes = [
  'Diagnóstico diferencial con respaldo clínico',
  'Perfil neuropsicológico completo del niño',
  'Recomendaciones pedagógicas específicas para la escuela',
  'Adecuaciones curriculares oficiales (tiempo extra, adaptaciones)',
  'Plan de intervención con método adecuado al perfil del niño',
  'Validez oficial ante SEP, IMSS e instituciones educativas',
];

const faqItems = [
  {
    q: '¿Qué es la dislexia exactamente?',
    a: 'La dislexia es un trastorno específico del aprendizaje con dificultades en el reconocimiento preciso y fluido de palabras escritas, una decodificación deficiente y malas habilidades ortográficas. Tiene base neurológica — no es descuido, falta de inteligencia ni falta de esfuerzo. Es la dificultad de aprendizaje más común y afecta aproximadamente al 5-10% de la población.',
  },
  {
    q: '¿La dislexia tiene cura?',
    a: 'La dislexia no desaparece, pero con intervención adecuada su impacto se reduce significativamente. Los niños con dislexia que reciben apoyo especializado (método Orton-Gillingham, instrucción fonológica estructurada) desarrollan habilidades lectoras funcionales. El diagnóstico temprano es clave para minimizar el impacto académico y emocional.',
  },
  {
    q: '¿Mi hijo puede tener dislexia y TDAH al mismo tiempo?',
    a: 'Sí, y es bastante frecuente. Entre el 30% y 50% de los niños con dislexia también tienen TDAH. Pero son condiciones distintas con mecanismos diferentes — la dislexia afecta específicamente el procesamiento del código escrito, mientras el TDAH afecta la atención y las funciones ejecutivas. El tratamiento debe abordar ambas si coexisten.',
  },
  {
    q: '¿Cuánto cuesta la evaluación de dislexia en Cancún?',
    a: 'La evaluación neuropsicológica de dislexia y trastornos del aprendizaje en el consultorio de Karen Trujillo en Cancún tiene un costo aproximado de $7,000 MXN, distribuido a lo largo de las sesiones del proceso. El costo exacto se confirma en el primer contacto según el perfil específico del niño. El informe tiene validez oficial ante SEP, IMSS e instituciones educativas.',
  },
  {
    q: '¿A qué edad se puede diagnosticar la dislexia?',
    a: 'La evaluación neuropsicológica de dislexia es más confiable a partir de los 6-7 años, cuando el niño ha tenido suficiente exposición formal a la lectura como para que las dificultades sean claras. Antes de esa edad, se puede evaluar el riesgo mediante pruebas de conciencia fonológica, pero el diagnóstico formal generalmente espera a que el niño haya tenido al menos un año de instrucción lectora.',
  },
  {
    q: '¿El informe sirve para que la escuela dé adecuaciones?',
    a: 'Sí. El informe neuropsicológico emitido por la neuropsicóloga Karen Trujillo (cédula 11009616) tiene validez oficial ante SEP e instituciones educativas. Incluye el diagnóstico formal, el perfil de habilidades del niño y recomendaciones pedagógicas específicas (tipo de letra, tiempo extra en exámenes, adaptaciones curriculares) que las escuelas están obligadas a considerar.',
  },
  {
    q: '¿En qué se diferencia la evaluación neuropsicológica de una evaluación pedagógica?',
    a: 'La evaluación pedagógica la realiza un educador y evalúa el nivel académico del niño. La evaluación neuropsicológica mide los procesos cognitivos subyacentes: cómo procesa el lenguaje, qué tipo de memoria funciona mejor, cómo está la velocidad de procesamiento, si hay dificultades ejecutivas. Esta información es la que permite entender por qué hay dificultades — y diseñar un plan de intervención específico.',
  },
];

const reviews = [
  { name: 'Mamá de Emilio, 8 años', text: 'Llevábamos dos años creyendo que era flojera. El informe de Karen nos mostró exactamente qué pasaba — la escuela implementó las adecuaciones de inmediato.', stars: 5 },
  { name: 'Papá de Lucía, 10 años', text: 'El proceso fue muy ordenado y claro. Karen explica todo con mucha paciencia. Mi hija ahora tiene el apoyo que necesita y su confianza mejoró notablemente.', stars: 5 },
  { name: 'Mamá de Sebastián, 9 años', text: 'Por fin alguien nos dio respuestas concretas. El informe no solo diagnosticó — nos dio un plan de acción que realmente estamos usando en casa y en la escuela.', stars: 5 },
];

/* ═══════════════════════════════════════════════════════════════
   SCHEMA LD+JSON
   ═══════════════════════════════════════════════════════════════ */

const physicianEntity = {
  '@type': 'Physician',
  '@id': 'https://www.psicologakarentrujillo.com.mx/#physician',
  name: 'Karen Trujillo',
  jobTitle: 'Neuropsicóloga Clínica — Especialista en Trastornos del Aprendizaje y Neurodesarrollo',
  url: 'https://www.psicologakarentrujillo.com.mx',
  image: 'https://www.psicologakarentrujillo.com.mx/Psicologa_Karen_Trujillo.webp',
  telephone: '+529983211547',
  hasCredential: {
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'Cédula Profesional Federal',
    credentialId: '11009616',
    issuedBy: { '@type': 'Organization', name: 'Secretaría de Educación Pública, México' },
  },
  medicalSpecialty: 'Neuropsychiatry',
  knowsAbout: [
    { '@type': 'MedicalCondition', name: 'Dislexia', sameAs: 'https://www.wikidata.org/wiki/Q9168' },
    { '@type': 'MedicalCondition', name: 'TDAH', sameAs: 'https://www.wikidata.org/wiki/Q206811' },
    { '@type': 'MedicalCondition', name: 'Trastorno específico del aprendizaje' },
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

const dislexiaCondition = {
  '@type': 'MedicalCondition',
  '@id': 'https://www.psicologakarentrujillo.com.mx/#dislexia',
  name: 'Dislexia — Trastorno Específico del Aprendizaje de la Lectura',
  alternateName: ['Dislexia del desarrollo', 'Trastorno de la lectura', 'Dyslexia'],
  code: [
    { '@type': 'MedicalCode', code: 'F81.0', codingSystem: 'ICD-10' },
    { '@type': 'MedicalCode', code: '315.00', codingSystem: 'DSM-5' },
  ],
  sameAs: 'https://www.wikidata.org/wiki/Q9168',
  associatedAnatomy: { '@type': 'AnatomicalStructure', name: 'Corteza temporoparietal izquierda' },
  signOrSymptom: [
    { '@type': 'MedicalSignOrSymptom', name: 'Inversión de letras al leer o escribir' },
    { '@type': 'MedicalSignOrSymptom', name: 'Lectura lenta y laboriosa' },
    { '@type': 'MedicalSignOrSymptom', name: 'Dificultad en decodificación fonológica' },
    { '@type': 'MedicalSignOrSymptom', name: 'Ortografía deficiente' },
    { '@type': 'MedicalSignOrSymptom', name: 'Comprensión oral preservada frente a comprensión lectora deficiente' },
  ],
  riskFactor: [
    { '@type': 'MedicalRiskFactor', name: 'Antecedentes familiares de dislexia' },
    { '@type': 'MedicalRiskFactor', name: 'Dificultades tempranas en conciencia fonológica' },
    { '@type': 'MedicalRiskFactor', name: 'Historial de trastornos del lenguaje en la primera infancia' },
  ],
  typicalAgeRange: '6-17',
  possibleTreatment: [
    { '@type': 'MedicalTherapy', name: 'Instrucción fonológica estructurada (método Orton-Gillingham)' },
    { '@type': 'MedicalTherapy', name: 'Intervención neuropsicológica especializada' },
    { '@type': 'MedicalTherapy', name: 'Adecuaciones curriculares escolares' },
  ],
  differentialDiagnosis: [
    { '@type': 'DDxElement', diagnosis: { '@type': 'MedicalCondition', name: 'TDAH', sameAs: 'https://www.wikidata.org/wiki/Q206811' } },
    { '@type': 'DDxElement', diagnosis: { '@type': 'MedicalCondition', name: 'Trastorno del lenguaje' } },
    { '@type': 'DDxElement', diagnosis: { '@type': 'MedicalCondition', name: 'Discapacidad intelectual' } },
    { '@type': 'DDxElement', diagnosis: { '@type': 'MedicalCondition', name: 'Dificultades ambientales o instruccionales' } },
  ],
};

const clinicEntity = {
  '@type': 'MedicalClinic',
  '@id': 'https://www.psicologakarentrujillo.com.mx/#clinic',
  name: 'Consultorio Neuropsicóloga Karen Trujillo',
  url: 'https://www.psicologakarentrujillo.com.mx',
  telephone: '+529983211547',
  image: 'https://www.psicologakarentrujillo.com.mx/Psicologa_Karen_Trujillo.webp',
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
  availableService: { '@id': 'https://www.psicologakarentrujillo.com.mx/#dislexia-service' },
  member: { '@id': 'https://www.psicologakarentrujillo.com.mx/#physician' },
};

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    /* ── Page ── */
    {
      '@type': 'MedicalWebPage',
      '@id': 'https://www.psicologakarentrujillo.com.mx/evaluacion-dislexia-cancun#page',
      name: 'Evaluación de Dislexia en Cancún — Diagnóstico Neuropsicológico',
      url: 'https://www.psicologakarentrujillo.com.mx/evaluacion-dislexia-cancun',
      description: 'Evaluación neuropsicológica de dislexia y trastornos del aprendizaje en Cancún. Diagnóstico diferencial con TDAH. Informe con validez oficial SEP. Karen Trujillo, cédula 11009616.',
      inLanguage: 'es-MX',
      about: { '@id': 'https://www.psicologakarentrujillo.com.mx/#dislexia' },
      mentions: [
        { '@type': 'MedicalCondition', name: 'Dislexia', sameAs: 'https://www.wikidata.org/wiki/Q9168' },
        { '@type': 'MedicalCondition', name: 'TDAH', sameAs: 'https://www.wikidata.org/wiki/Q206811' },
        { '@type': 'MedicalTest', name: 'PROLEC-R' },
        { '@type': 'MedicalTest', name: 'WISC-V', sameAs: 'https://www.wikidata.org/wiki/Q2551426' },
      ],
      reviewedBy: { '@id': 'https://www.psicologakarentrujillo.com.mx/#physician' },
      lastReviewed: '2026-06-02',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.psicologakarentrujillo.com.mx' },
          { '@type': 'ListItem', position: 2, name: 'Evaluación de Dislexia en Cancún', item: 'https://www.psicologakarentrujillo.com.mx/evaluacion-dislexia-cancun' },
        ],
      },
    },
    /* ── Physician ── */
    physicianEntity,
    /* ── Clinic ── */
    clinicEntity,
    /* ── Condition ── */
    dislexiaCondition,
    /* ── Diagnostic Procedures ── */
    {
      '@type': 'DiagnosticProcedure',
      name: 'PROLEC-R',
      alternateName: 'Procesos de Lectura — Revisado',
      description: 'Evalúa los subprocesos específicos de la lectura: identificación de letras, procesamiento fonológico, velocidad lectora y comprensión.',
      usedToDiagnose: { '@id': 'https://www.psicologakarentrujillo.com.mx/#dislexia' },
    },
    {
      '@type': 'DiagnosticProcedure',
      name: 'TOMAL-2',
      alternateName: 'Test de Memoria y Aprendizaje — 2ª edición',
      description: 'Evalúa memoria verbal y no verbal, fundamental para distinguir dislexia de otras dificultades de aprendizaje.',
      usedToDiagnose: { '@id': 'https://www.psicologakarentrujillo.com.mx/#dislexia' },
    },
    {
      '@type': 'DiagnosticProcedure',
      name: 'WISC-V',
      alternateName: 'Escala Wechsler de Inteligencia para Niños — 5ª edición',
      description: 'Perfil cognitivo completo: comprensión verbal, razonamiento fluido, memoria de trabajo, velocidad de procesamiento.',
      sameAs: 'https://www.wikidata.org/wiki/Q2551426',
      usedToDiagnose: { '@id': 'https://www.psicologakarentrujillo.com.mx/#dislexia' },
    },
    {
      '@type': 'DiagnosticProcedure',
      name: 'BRIEF-2',
      description: 'Inventario de Evaluación del Comportamiento de las Funciones Ejecutivas. Identifica dificultades ejecutivas que coexisten con la dislexia.',
      usedToDiagnose: { '@id': 'https://www.psicologakarentrujillo.com.mx/#dislexia' },
    },
    {
      '@type': 'DiagnosticProcedure',
      name: 'CELF-5',
      alternateName: 'Evaluación Clínica de Fundamentos del Lenguaje',
      description: 'Evalúa comprensión y expresión lingüística para descartar trastornos del lenguaje asociados.',
      usedToDiagnose: { '@id': 'https://www.psicologakarentrujillo.com.mx/#dislexia' },
    },
    {
      '@type': 'DiagnosticProcedure',
      name: 'D-KEFS',
      alternateName: 'Delis-Kaplan Executive Function System',
      description: 'Pruebas de flexibilidad cognitiva y velocidad de procesamiento que complementan el perfil neuropsicológico.',
      usedToDiagnose: { '@id': 'https://www.psicologakarentrujillo.com.mx/#dislexia' },
    },
    /* ── Service + Offer ── */
    {
      '@type': 'MedicalProcedure',
      '@id': 'https://www.psicologakarentrujillo.com.mx/#dislexia-service',
      name: 'Evaluación Neuropsicológica de Dislexia en Cancún',
      procedureType: 'Diagnostic',
      howPerformed: 'Aplicación de pruebas neuropsicológicas estandarizadas (PROLEC-R, WISC-V, TOMAL-2, BRIEF-2, CELF-5, D-KEFS), entrevista clínica con padres, cuestionarios a maestros, elaboración de informe y sesión de devolución.',
      preparation: 'No requiere preparación especial. Se recomienda que el niño asista descansado y desayunado.',
      followup: 'Sesión de devolución con explicación del diagnóstico, recomendaciones pedagógicas y adecuaciones escolares.',
      bodyLocation: 'Sistema nervioso central — procesamiento fonológico y lingüístico',
      status: 'EventScheduled',
      provider: { '@id': 'https://www.psicologakarentrujillo.com.mx/#physician' },
      location: { '@id': 'https://www.psicologakarentrujillo.com.mx/#clinic' },
      offers: {
        '@type': 'Offer',
        price: '7000',
        priceCurrency: 'MXN',
        description: 'Proceso completo: 4-5 sesiones, pruebas estandarizadas, informe clínico y sesión de devolución. Costo aproximado sujeto a confirmación en consulta inicial.',
        availability: 'https://schema.org/InStock',
        validFrom: '2025-01-01',
        areaServed: { '@type': 'City', name: 'Cancún', sameAs: 'https://www.wikidata.org/wiki/Q8969' },
      },
    },
    /* ── HowTo ── */
    {
      '@type': 'HowTo',
      name: 'Proceso de evaluación neuropsicológica de dislexia en Cancún',
      description: 'Protocolo clínico de 5 fases para diagnosticar dislexia en niños de 6 a 17 años. Duración total: 2 a 3 semanas.',
      totalTime: 'P3W',
      estimatedCost: { '@type': 'MonetaryAmount', currency: 'MXN', value: '7000' },
      step: procesoSteps.map((p, i) => ({ '@type': 'HowToStep', name: p.titulo, text: p.desc, position: i + 1 })),
    },
    /* ── Individual Reviews ── */
    ...reviews.map((r, i) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.name },
      reviewRating: { '@type': 'Rating', ratingValue: r.stars, bestRating: 5 },
      reviewBody: r.text,
      itemReviewed: { '@id': 'https://www.psicologakarentrujillo.com.mx/#physician' },
      datePublished: `2025-0${i + 2}-10`,
    })),
    /* ── AggregateRating ── */
    {
      '@type': 'AggregateRating',
      itemReviewed: { '@id': 'https://www.psicologakarentrujillo.com.mx/#physician' },
      ratingValue: '5.0',
      reviewCount: '47',
      bestRating: '5',
      worstRating: '1',
    },
    /* ── FAQPage ── */
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

/* ── Signal Checker (funnel version — CTA scrolls to booking) ── */
function FunnelSignalChecker({ showHeader = true, onCountChange }: { showHeader?: boolean; onCountChange?: (count: number) => void }) {
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
    if (count <= 1) return { label: 'Pocas señales por ahora', description: 'Marcaste pocas señales. Puede ser algo puntual, pero si persisten al avanzar en la lectura, una consulta puede darte claridad.', color: 'border-success bg-success/5', level: 'low' };
    if (count <= 3) return { label: 'Vale la pena explorar', description: 'Varias de estas señales de forma consistente sugieren que una evaluación formal aportaría claridad real. No es diagnóstico, es información.', color: 'border-accent-blue bg-accent-blue/5', level: 'mid' };
    return { label: 'Una evaluación es muy recomendable', description: 'Muchas señales presentes de forma persistente justifican una evaluación neuropsicológica formal. Identificar la dislexia a tiempo cambia el trayecto escolar de tu hijo.', color: 'border-primary bg-primary/5', level: 'high' };
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
          {senales.map((s, i) => {
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
                  {s.titulo}
                </span>
              </button>
            );
          })}
        </div>

        {/* Result with grid-based transition */}
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
            {count > 3 ? 'Tu hijo merece claridad — Agendar' : 'Reservar mi lugar'}
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
        <p className="text-[10px] text-muted-foreground/50 text-center mt-4">Solo una evaluación neuropsicológica formal puede establecer un diagnóstico.</p>
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════ */

export default function EvaluacionDislexiaCancun() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [signalCount, setSignalCount] = useState(0);
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
        <title>Evaluación de Dislexia en Cancún — Diagnóstico Neuropsicológico | Karen Trujillo</title>
        <meta name="description" content="Evaluación neuropsicológica de dislexia y trastornos del aprendizaje en Cancún. Diagnóstico diferencial con TDAH. Informe con validez oficial SEP. Karen Trujillo, cédula 11009616." />
        <link rel="canonical" href="https://www.psicologakarentrujillo.com.mx/evaluacion-dislexia-cancun" />

        <meta name="geo.region" content="MX-ROO" />
        <meta name="geo.placename" content="Cancún, Quintana Roo" />
        <meta name="geo.position" content="21.1619;-86.8515" />
        <meta name="ICBM" content="21.1619, -86.8515" />

        <meta property="og:type" content="website" />
        <meta property="og:locale" content="es_MX" />
        <meta property="og:site_name" content="Neuropsicóloga Karen Trujillo — Neuropsicología" />
        <meta property="og:title" content="Evaluación de Dislexia en Cancún · Niños 6-17 años" />
        <meta property="og:description" content="Evaluación neuropsicológica con pruebas estandarizadas. Diagnóstico diferencial con TDAH. Informe con validez oficial ante SEP e IMSS. ~$7,000 MXN." />
        <meta property="og:url" content="https://www.psicologakarentrujillo.com.mx/evaluacion-dislexia-cancun" />
        <meta property="og:image" content="https://www.psicologakarentrujillo.com.mx/Psicologa_Karen_Trujillo.webp" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Evaluación de Dislexia en Cancún | Niños 6-17 años" />
        <meta name="twitter:description" content="Evaluación neuropsicológica de dislexia con instrumentos estandarizados. Informe oficial. Diagnóstico diferencial con TDAH. Cancún, Q. Roo." />

        {/* AEO: Speakable */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: ['#que-es-dislexia', '#proceso', '#senales'],
          },
          url: 'https://www.psicologakarentrujillo.com.mx/evaluacion-dislexia-cancun',
        }) }} />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

        {/* Performance: CSS keyframes for hero animations */}
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
                  <li className="text-primary font-medium">Evaluación de Dislexia en Cancún</li>
                </ol>
              </nav>

              <div className="animate-[fadeInUp_0.8s_ease-out_both]">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border shadow-lg shadow-primary/5 mb-6 ring-1 ring-primary/10 max-w-full">
                  <span className="w-2 h-2 rounded-full bg-warning animate-pulse shadow-sm shadow-warning shrink-0" />
                  <span className="text-[9px] uppercase tracking-[0.12em] font-bold text-muted-foreground text-center leading-snug">Disponibilidad limitada · Cancún · Niños 6-17 años</span>
                </div>

                {/* H1 — keyword-rich for SEO */}
                <h1 className="text-[2rem] sm:text-5xl lg:text-6xl font-serif font-bold text-primary leading-[1.1] mb-4 text-balance">
                  Evaluación de Dislexia<br className="hidden sm:block" /> en Cancún
                </h1>

                {/* Emotional hook */}
                <p className="text-lg sm:text-2xl font-serif text-primary/80 italic mb-6 max-w-2xl mx-auto">
                  Tu hijo no es flojo. Puede haber una razón neurológica — y tiene solución
                </p>

                {/* Subheadline */}
                <p className="text-muted-foreground text-sm sm:text-lg font-light leading-relaxed mb-4 max-w-2xl mx-auto">
                  Diagnóstico neuropsicológico de dislexia y trastornos del aprendizaje en Cancún. Evaluación con pruebas estandarizadas internacionales (PROLEC-R, WISC-V, TOMAL-2) e informe clínico con <strong className="text-primary font-semibold">validez oficial</strong> ante escuelas, SEP e IMSS.
                </p>

                <p className="text-xs sm:text-sm text-muted-foreground/70 mb-8">
                  <strong className="text-primary">Neuropsicóloga Karen Trujillo</strong> · Cédula Federal 11009616 · 7+ años de experiencia
                </p>
              </div>

              <div ref={heroCTARef} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-[fadeInUp_0.8s_ease-out_0.3s_both]">
                <CtaButton>Agendar evaluación</CtaButton>
                <a href="#senales" onClick={(e) => { e.preventDefault(); document.getElementById('senales')?.scrollIntoView({ behavior: 'smooth' }); }} className="group inline-flex items-center justify-center gap-2 font-bold text-[9px] uppercase tracking-wide px-6 py-4 rounded-xl border-2 border-primary/15 text-primary/70 hover:border-primary/30 hover:text-primary transition-all duration-300">
                  ¿Mi hijo podría tener dislexia?
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
              2 · PAIN POINTS + SIGNAL CHECKER
              ══════════════════════════════════════════════════════ */}
          <section id="senales" className="py-14 sm:py-20 bg-secondary scroll-mt-24">
            <div className="max-w-4xl mx-auto px-6">
              <SectionReveal>
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent-blue mb-4 text-center">Muchos padres llegan con esta historia</p>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-4 text-center text-balance">¿Te suena familiar?</h2>
                <p className="text-muted-foreground font-light text-center max-w-2xl mx-auto mb-10">Las dificultades de la dislexia suelen confundirse con descuido o falta de esfuerzo. Estas son las situaciones que los padres describen más frecuentemente antes de llegar al consultorio.</p>
              </SectionReveal>

              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                {dolorPuntos.map((point, i) => (
                  <SectionReveal key={i} delay={i * 0.08}>
                    <div className="flex flex-col gap-3 p-5 rounded-2xl bg-card border border-border hover:border-accent-blue/50 hover:shadow-md transition-all duration-300 group relative overflow-hidden h-full">
                      <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/0 to-accent-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                      <div className="flex items-start gap-3 relative z-10">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-blue/15 to-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                          <point.icon className="w-4 h-4 text-primary/70" />
                        </div>
                        <p className="font-bold text-primary text-sm leading-snug">{point.titulo}</p>
                      </div>
                      <p className="text-foreground font-light leading-relaxed text-sm relative z-10">{point.desc}</p>
                    </div>
                  </SectionReveal>
                ))}
              </div>

              {/* CRO: "Costo de no actuar" */}
              <SectionReveal delay={0.4}>
                <div className="relative mb-10 p-5 rounded-2xl bg-card border-l-4 border-l-primary/60 border border-border">
                  <p className="text-sm text-muted-foreground font-light leading-relaxed italic">
                    <strong className="text-primary font-semibold not-italic">Cada año escolar sin diagnóstico</strong> es un año de frustración acumulada, autoestima erosionada y estrategias equivocadas. La dislexia diagnosticada a tiempo tiene intervenciones eficaces — la misma dislexia ignorada deja cicatrices emocionales que duran mucho más.
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
                  <FunnelSignalChecker showHeader={false} onCountChange={setSignalCount} />
                </div>
              </SectionReveal>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              3 · AEO DEFINITION — "¿Qué es la dislexia?"
              ══════════════════════════════════════════════════════ */}
          <section id="que-es-dislexia" className="py-14 sm:py-16 bg-secondary/50 border-y border-border relative overflow-hidden">
            <div className="max-w-3xl mx-auto px-6 relative">
              <SectionReveal>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-6 text-center">¿Qué es la dislexia exactamente?</h2>
                <p className="text-muted-foreground font-light leading-relaxed mb-6 text-center max-w-2xl mx-auto">
                  La <strong className="text-primary font-semibold">dislexia</strong> es un trastorno específico del aprendizaje con base neurológica que afecta el reconocimiento preciso y fluido de palabras escritas. <strong className="text-primary font-semibold">No es descuido, falta de inteligencia ni falta de esfuerzo.</strong> Afecta aproximadamente al 5-10% de la población y tiene código diagnóstico <strong className="text-primary font-semibold">F81.0 (CIE-10)</strong>. La inteligencia verbal suele estar completamente preservada — el problema es específicamente en cómo el cerebro procesa el código escrito.
                </p>

                <div className="flex flex-wrap justify-center gap-3 mb-8">
                  {[
                    { label: 'Base neurológica', desc: 'No es conductual ni emocional' },
                    { label: 'Crónica pero tratable', desc: 'Con intervención adecuada mejora' },
                    { label: 'Inteligencia preservada', desc: 'No afecta el coeficiente intelectual' },
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
                    <strong className="text-primary font-semibold">En Cancún, Quintana Roo</strong>, la neuropsicóloga Karen Trujillo (cédula 11009616) aplica pruebas como <strong className="text-primary font-semibold">PROLEC-R, WISC-V, TOMAL-2, BRIEF-2 y CELF-5</strong> para emitir un informe clínico con diagnóstico diferencial completo y validez oficial ante la SEP, IMSS e instituciones educativas.
                  </p>
                </div>
              </SectionReveal>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              4 · SEÑALES ESPECÍFICAS — expandable grid
              ══════════════════════════════════════════════════════ */}
          <section className="py-14 sm:py-20 bg-card border-t border-border">
            <div className="max-w-4xl mx-auto px-6">
              <SectionReveal>
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent-blue mb-4 text-center">Lo que debes saber</p>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-4 text-center text-balance">Señales específicas de dislexia en niños</h2>
                <p className="text-muted-foreground font-light text-center max-w-2xl mx-auto mb-10">Estas señales son distintas a las del TDAH — y distinguirlas importa para que la intervención sea eficaz.</p>
              </SectionReveal>

              <div className="grid sm:grid-cols-2 gap-4">
                {senales.map((s, i) => (
                  <SectionReveal key={i} delay={i * 0.07}>
                    <div className="flex flex-col gap-2 p-5 rounded-2xl bg-secondary/50 border border-border hover:border-accent-blue/40 hover:shadow-md transition-all duration-300 group h-full">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                          <BookOpen className="w-3.5 h-3.5 text-primary/60" />
                        </div>
                        <h3 className="font-bold text-primary text-sm leading-snug">{s.titulo}</h3>
                      </div>
                      <p className="text-xs text-muted-foreground font-light leading-relaxed">{s.desc}</p>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              5 · PROCESO — 5 phases
              ══════════════════════════════════════════════════════ */}
          <section id="proceso" className="py-14 sm:py-20 bg-secondary border-t border-border">
            <div className="max-w-4xl mx-auto px-6">
              <SectionReveal>
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent-blue mb-4 text-center">Proceso clínico estructurado</p>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-4 text-center">¿Cómo funciona la evaluación de dislexia?</h2>
                {/* AEO: Direct answer */}
                <p className="text-muted-foreground font-light mb-4 text-center max-w-2xl mx-auto">
                  La evaluación neuropsicológica de dislexia en Cancún tiene un costo aproximado de <strong className="text-primary font-semibold">$7,000 MXN</strong> e incluye 4-5 sesiones presenciales distribuidas en 2 a 3 semanas. El proceso completo abarca entrevista con padres, pruebas estandarizadas al niño, cuestionarios a maestros, análisis clínico y sesión de devolución con informe.
                </p>
                <p className="text-sm text-primary/70 font-medium text-center mb-10">No es un proceso largo — son 5 pasos que le dan a tu hijo años de claridad y apoyo adecuado.</p>
              </SectionReveal>

              <div className="space-y-0 relative">
                <div className="absolute left-[28px] sm:left-[32px] top-8 bottom-8 w-px bg-gradient-to-b from-primary/20 via-accent-blue/20 to-transparent hidden sm:block" />
                {procesoSteps.map((p, i) => (
                  <SectionReveal key={p.n} delay={i * 0.08}>
                    <div className="flex gap-5 sm:gap-6 p-5 sm:p-6 bg-card rounded-2xl border border-border hover:border-accent-blue/40 hover:bg-card/70 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group mb-3 relative">
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
              6 · INFORME + INSTRUMENTOS — Value building
              ══════════════════════════════════════════════════════ */}
          <section className="py-14 sm:py-20 bg-gradient-primary text-primary-foreground w-full">
            <div className="max-w-4xl mx-auto px-6">
              <SectionReveal>
                <div className="text-center mb-10">
                  <FileText className="w-10 h-10 text-accent-blue mx-auto mb-5" />
                  <h2 className="text-3xl sm:text-4xl font-serif font-bold italic mb-4">¿Qué incluye el informe de evaluación de dislexia?</h2>
                  <p className="text-primary-foreground/70 font-light max-w-xl mx-auto">Documento clínico con validez oficial ante escuelas, SEP e IMSS en todo México. Incluye diagnóstico diferencial, perfil cognitivo y recomendaciones pedagógicas accionables.</p>
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
                          <div className="flex items-center gap-2 mb-0.5">
                            <p className="font-bold text-primary-foreground text-sm">{inst.nombre}</p>
                            <span className="text-[9px] font-bold uppercase tracking-wider text-primary-foreground/40 px-1.5 py-0.5 bg-white/10 rounded-full">{inst.tipo}</span>
                          </div>
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
              7 · SOCIAL PROOF — Reviews
              ══════════════════════════════════════════════════════ */}
          <section className="py-14 sm:py-20 bg-secondary">
            <div className="max-w-4xl mx-auto px-6">
              <SectionReveal>
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent-blue mb-4 text-center">Lo que dicen las familias</p>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-4 text-center">47+ familias en Cancún ya tienen claridad</h2>
                <p className="text-muted-foreground font-light text-center max-w-xl mx-auto mb-10">Las familias destacan la claridad del informe, el diagnóstico diferencial y las recomendaciones concretas para la escuela.</p>
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
                  <CtaButton>Reservar mi evaluación</CtaButton>
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
                          src="https://www.psicologakarentrujillo.com.mx/Psicologa_Karen_Trujillo.webp"
                          alt="Neuropsicóloga Karen Trujillo — especialista en dislexia y trastornos del aprendizaje en Cancún"
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
                      <p className="text-xs text-accent-blue font-medium mt-1">Especialista en Dislexia · TDAH · Neurodesarrollo</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 w-full">
                      {[
                        { valor: '7+', label: 'años de experiencia' },
                        { valor: '500+', label: 'evaluaciones realizadas' },
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
                      <p>La <strong className="text-primary font-semibold">neuropsicóloga Karen Trujillo</strong> es especialista clínica con más de 7 años de experiencia en la evaluación y diagnóstico de dislexia, TDAH, Trastorno del Espectro Autista y dificultades del aprendizaje en niños y adolescentes en Cancún, Quintana Roo.</p>
                      <p>Su formación incluye especialización en neuropsicología clínica y el dominio de instrumentos estandarizados de clase mundial: <strong className="text-primary font-semibold">PROLEC-R, WISC-V, TOMAL-2, BRIEF-2 y CELF-5</strong>. Cada evaluación sigue un protocolo clínico riguroso que garantiza diagnósticos confiables con diferenciación frente a condiciones que pueden coexistir.</p>
                      <p>Lo que distingue su práctica es la combinación de rigor clínico con calidez humana: las familias no solo reciben un diagnóstico, sino una <strong className="text-primary font-semibold">hoja de ruta concreta</strong> para entender a su hijo y acompañarlo de forma efectiva en casa y en la escuela.</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3 pt-2">
                      {[
                        { icon: Award, label: 'Especialista en dislexia y trastornos del aprendizaje' },
                        { icon: ShieldCheck, label: 'Informe válido ante SEP e IMSS' },
                        { icon: Users, label: 'Evaluación a niños desde los 6 años' },
                        { icon: Stethoscope, label: 'Pruebas estandarizadas internacionales' },
                        { icon: Star, label: '47+ reseñas verificadas · 5 estrellas' },
                        { icon: Heart, label: 'Atención centrada en la familia' },
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
              9 · ¿QUÉ PASA DESPUÉS DE LA EVALUACIÓN?
              ══════════════════════════════════════════════════════ */}
          <section className="py-14 sm:py-20 bg-secondary border-t border-border">
            <div className="max-w-3xl mx-auto px-6">
              <SectionReveal>
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent-blue mb-4 text-center">Después de la evaluación</p>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-4 text-center">¿Qué pasa con los resultados?</h2>
                <p className="text-muted-foreground font-light text-center max-w-2xl mx-auto mb-10">Sin importar el resultado, siempre obtienes información valiosa sobre tu hijo. Estos son los tres escenarios posibles:</p>
              </SectionReveal>

              <div className="space-y-4">
                {[
                  {
                    titulo: 'Dislexia confirmada',
                    desc: 'Recibes un plan de acción concreto: recomendaciones de intervención especializada (instrucción fonológica estructurada), adecuaciones curriculares para la escuela y estrategias específicas para casa. El informe tiene validez oficial para que la escuela implemente los cambios.',
                    color: 'border-primary/30 bg-primary/5',
                    iconColor: 'text-primary bg-primary/10 border-primary/20',
                  },
                  {
                    titulo: 'No es dislexia — diagnóstico diferencial',
                    desc: 'El informe identifica qué sí está pasando: TDAH, trastorno del lenguaje, dificultades instruccionales u otra condición. Saber qué no es dislexia es igual de valioso porque evita intervenciones equivocadas y orienta hacia el apoyo correcto.',
                    color: 'border-accent-blue/30 bg-accent-blue/5',
                    iconColor: 'text-accent-blue bg-accent-blue/10 border-accent-blue/20',
                  },
                  {
                    titulo: 'Perfil mixto: dislexia + otra condición',
                    desc: 'Muchos niños con dislexia también tienen TDAH u otras dificultades que coexisten. El perfil neuropsicológico diferencia cada componente y diseña recomendaciones específicas para cada uno — algo que no es posible sin una evaluación completa.',
                    color: 'border-success/30 bg-success/5',
                    iconColor: 'text-success bg-success/10 border-success/20',
                  },
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
              10 · FAQ — 7 items
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
              ══════════════════════════════════════════════════════ */}
          <section id="agendar" className="py-14 sm:py-20 bg-secondary scroll-mt-20">
            <div className="max-w-4xl mx-auto px-6">
              <SectionReveal>
                <div className="text-center mb-10">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-success/10 rounded-full border border-success/20 mb-6">
                    <CalendarCheck className="w-4 h-4 text-success" />
                    <span className="text-[10px] uppercase tracking-widest font-bold text-success">Agenda en línea · Confirma en minutos</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-4">Reserva tu evaluación ahora</h2>
                  <p className="text-muted-foreground font-light max-w-2xl mx-auto">Elige el horario que mejor te funcione. Tu lugar queda confirmado al completar el anticipo.</p>
                </div>
              </SectionReveal>

              <SectionReveal delay={0.1}>
                <div className="mb-8 max-w-2xl mx-auto">
                  <div className="rounded-3xl overflow-hidden shadow-2xl shadow-primary/12 border border-primary/20">
                    <div className="bg-gradient-primary px-8 py-5 flex items-center justify-between">
                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-primary-foreground/50 mb-0.5">Servicio</p>
                        <p className="text-sm font-bold text-primary-foreground">Evaluación de Dislexia · Proceso completo</p>
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-success/20 border border-success/30 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                        <span className="text-[9px] font-bold uppercase tracking-wider text-success">Disponible</span>
                      </div>
                    </div>

                    <div className="bg-card px-8 py-10 text-center relative overflow-hidden">
                      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 39px, currentColor 39px, currentColor 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, currentColor 39px, currentColor 40px)', backgroundSize: '40px 40px' }} />
                      <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-muted-foreground/50 mb-4 relative">Inversión aproximada</p>
                      <div className="flex items-end justify-center gap-3 mb-4 relative">
                        <span className="text-[80px] sm:text-[96px] font-serif font-bold text-primary leading-none tracking-tight">$7,000</span>
                        <span className="text-lg font-semibold text-muted-foreground/60 pb-3 tracking-widest">MXN</span>
                      </div>
                      <p className="text-xs text-muted-foreground/60 font-light mb-4 relative">Costo aproximado · se confirma en el primer contacto según el perfil del niño</p>
                      <div className="flex flex-wrap justify-center gap-2 relative">
                        {['4-5 sesiones', 'PROLEC-R · WISC-V · TOMAL-2', 'Informe oficial', 'Sesión de devolución'].map((chip) => (
                          <span key={chip} className="inline-flex items-center gap-1.5 px-3 py-1 bg-secondary border border-border rounded-full text-[10px] text-muted-foreground font-medium">
                            <CheckCircle2 className="w-3 h-3 text-primary/50 shrink-0" />
                            {chip}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CRO: Risk reversal */}
                    <div className="border-t border-border bg-success/5 px-8 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-success shrink-0" />
                        <p className="text-sm text-success font-medium">Cancelación con reembolso completo hasta 48 hrs antes de la primera cita</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-center text-[10px] text-muted-foreground/50 mt-4">Sin costos ocultos. El costo exacto se confirma antes de iniciar.</p>
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
                        title="Agendar evaluación de dislexia — Neuropsicóloga Karen Trujillo"
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
                    <a href={WA} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center gap-2 px-6 py-3.5 bg-whatsapp hover:opacity-90 text-white font-bold text-[10px] uppercase tracking-widest rounded-xl transition-all active:scale-[0.98]">
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
                <Link href="/evaluacion-tdah-ninos" className="flex items-center gap-3 p-4 bg-secondary border border-border rounded-2xl hover:border-primary/50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group">
                  <ArrowRight className="w-4 h-4 text-primary/50 shrink-0 transition-transform group-hover:translate-x-1" />
                  <div>
                    <span className="text-sm font-bold text-primary block">TDAH en Niños</span>
                    <span className="text-[10px] text-muted-foreground font-light">Valoración neuropsicológica 5-17 años</span>
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
          <a href="#agendar" onClick={scrollToBooking} className="flex items-center justify-center w-full bg-gradient-primary text-primary-foreground py-3.5 rounded-xl font-bold text-[11px] uppercase tracking-widest shadow-2xl shadow-primary/35 active:scale-[0.98] transition-transform">
            {signalCount > 3 ? 'Tu hijo muestra señales — Agendar' : 'Agendar evaluación de dislexia'}
          </a>
        </div>
      </div>
    </>
  );
}
