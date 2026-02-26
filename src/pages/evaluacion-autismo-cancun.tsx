import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight, ArrowDown, Brain, FileText, CheckCircle2, Circle,
  ShieldCheck, AlertCircle, MessageCircle, Phone, Clock, Award,
  Star, Users, CalendarCheck, Stethoscope, BookOpen, ChevronDown,
  Shield, BadgeCheck, Heart, XCircle, Puzzle, Eye,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

/* ═══════════════════════════════════════════════════════════════
   CONFIG — Cal.com URL (cambiar al URL real de Karen)
   ═══════════════════════════════════════════════════════════════ */
const CAL_URL = 'https://cal.com/karentrujillo/valoracion-autismo';
const WA_NUMBER = '529983211547';
const PHONE_NUMBER = '529983211547';

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */

const painPoints = [
  { icon: Users, text: 'Su manera de relacionarse es diferente y te preocupa que no logre conectar con otros niños' },
  { icon: BookOpen, text: 'La escuela te dice que "algo pasa" pero nadie te da un nombre claro ni un camino a seguir' },
  { icon: Puzzle, text: 'Tiene intereses muy intensos, rutinas rígidas o reacciones que otros no entienden' },
  { icon: Heart, text: 'Quieres entenderlo, no etiquetarlo — pero necesitas una respuesta profesional para poder ayudarlo' },
];

const symptoms = [
  'Dificultad para hacer o mantener contacto visual de forma natural',
  'No responde consistentemente a su nombre o parece "no escuchar"',
  'Le cuesta entender emociones ajenas o compartir las suyas',
  'Movimientos repetitivos: aleteo, balanceo, girar objetos',
  'Intereses muy intensos y focalizados en temas específicos',
  'Se angustia mucho ante cambios de rutina o situaciones inesperadas',
  'Sensibilidad inusual a sonidos, texturas, luces u olores',
  'Prefiere jugar solo o interactúa de manera atípica con otros niños',
];

const proceso = [
  { n: '01', titulo: 'Entrevista clínica con padres (ADI-R)', desc: 'Historia del desarrollo, hitos comunicativos, patrones de conducta y contexto familiar. Entrevista estructurada ADI-R.', duracion: '90-120 min' },
  { n: '02', titulo: 'Observación clínica estructurada (ADOS-2)', desc: 'Sesión de juego y tareas semiestructuradas con el niño. Evaluación directa de comunicación, interacción social y conducta.', duracion: '60-90 min' },
  { n: '03', titulo: 'Pruebas complementarias', desc: 'Evaluación cognitiva (WISC-V), conducta adaptativa (Vineland-3) y cuestionarios a padres y maestros (SRS-2).', duracion: '2-3 sesiones' },
  { n: '04', titulo: 'Análisis e informe clínico', desc: 'Integración de datos, diagnóstico diferencial, nivel de apoyo y perfil de fortalezas y necesidades.', duracion: '5-7 días' },
  { n: '05', titulo: 'Sesión de devolución', desc: 'Explicación del diagnóstico, recomendaciones terapéuticas, adecuaciones escolares y orientación familiar.', duracion: '60-90 min' },
];

const instrumentos = [
  { nombre: 'ADOS-2', desc: 'Escala de observación diagnóstica del autismo — estándar de oro internacional' },
  { nombre: 'ADI-R', desc: 'Entrevista diagnóstica revisada para autismo — con padres o cuidadores' },
  { nombre: 'WISC-V', desc: 'Perfil cognitivo: inteligencia, atención, memoria de trabajo' },
  { nombre: 'Vineland-3', desc: 'Conducta adaptativa: comunicación, socialización, autonomía' },
  { nombre: 'SRS-2', desc: 'Escala de responsividad social — padres y maestros' },
];

const informeIncludes = [
  'Diagnóstico diferencial con respaldo clínico (DSM-5)',
  'Nivel de apoyo especificado (nivel 1, 2 o 3)',
  'Perfil de fortalezas y áreas de necesidad',
  'Recomendaciones terapéuticas específicas',
  'Adecuaciones curriculares para la escuela',
  'Validez oficial ante SEP, IMSS e instituciones educativas',
];

/* ── Diferenciador: Neuropsicología vs Psicología para TEA ── */
const comparativaItems = [
  {
    aspecto: 'Método diagnóstico',
    psicologia: 'Observación clínica no estandarizada',
    neuropsicologia: 'ADOS-2 + ADI-R: protocolo estandarizado con normas internacionales',
  },
  {
    aspecto: 'Qué evalúa',
    psicologia: 'Conducta general y emociones',
    neuropsicologia: 'Comunicación social, patrones restringidos, perfil cognitivo y conducta adaptativa',
  },
  {
    aspecto: 'Resultado',
    psicologia: 'Impresión diagnóstica cualitativa',
    neuropsicologia: 'Perfil cuantificable con nivel de apoyo, percentiles y comparación normativa',
  },
  {
    aspecto: 'Diagnóstico diferencial',
    psicologia: 'Limitado a observación',
    neuropsicologia: 'Diferencia TEA de TDAH, ansiedad social, trastorno del lenguaje o retraso del desarrollo con datos objetivos',
  },
  {
    aspecto: 'Validez escolar',
    psicologia: 'Variable según la institución',
    neuropsicologia: 'Informe con cédula profesional federal aceptado por SEP e IMSS',
  },
];

const faqItems = [
  {
    q: '¿A qué edad se puede diagnosticar el autismo?',
    a: 'El autismo puede diagnosticarse con fiabilidad a partir de los 18-24 meses con herramientas como el M-CHAT-R/F. Sin embargo, la evaluación completa con ADOS-2 y ADI-R es más precisa a partir de los 2-3 años. Muchos niños reciben el diagnóstico entre los 3 y 6 años, cuando las demandas sociales aumentan. También se puede diagnosticar en adolescentes y adultos que no fueron evaluados en la infancia.',
  },
  {
    q: '¿Cuánto tiempo toma una evaluación de autismo en Cancún?',
    a: 'La evaluación completa de autismo toma entre 3 y 4 semanas, repartidas en 5-6 citas presenciales en Cancún. El proceso incluye entrevista ADI-R con padres (90-120 min), observación ADOS-2 con el niño (60-90 min), pruebas cognitivas y de conducta adaptativa (2-3 sesiones), análisis de resultados y sesión de devolución con informe.',
  },
  {
    q: '¿Cuánto cuesta la evaluación de autismo en Cancún?',
    a: 'La evaluación neuropsicológica de autismo tiene un costo total de $8,500 MXN. Incluye todas las sesiones (5-6 citas), pruebas estandarizadas (ADOS-2, ADI-R, WISC-V, Vineland-3, SRS-2), informe clínico completo y sesión de devolución con recomendaciones. Se solicita un anticipo de $1,500 MXN al agendar, que forma parte del costo total.',
  },
  {
    q: '¿Qué pruebas se aplican para diagnosticar autismo?',
    a: 'Se aplican cinco instrumentos estandarizados internacionales: ADOS-2 (observación directa del niño — estándar de oro para autismo), ADI-R (entrevista estructurada con padres), WISC-V (perfil cognitivo), Vineland-3 (conducta adaptativa) y SRS-2 (escala de responsividad social con formas para padres y maestros). Todos los instrumentos están validados para población hispanohablante.',
  },
  {
    q: '¿El informe de autismo tiene validez oficial ante la escuela?',
    a: 'Sí. El informe clínico está respaldado por cédula profesional federal 11009616 emitida por la SEP y tiene validez oficial ante instituciones educativas, la Secretaría de Educación Pública, IMSS y dependencias gubernamentales en todo México. Incluye nivel de apoyo, recomendaciones de adecuaciones curriculares y orientación para el equipo escolar.',
  },
  {
    q: '¿Cuál es la diferencia entre autismo y TDAH?',
    a: 'El autismo (TEA) afecta principalmente la comunicación social y se caracteriza por patrones restringidos de conducta e intereses. El TDAH afecta la atención, el control de impulsos y las funciones ejecutivas. Aunque comparten algunos síntomas (dificultad social, inquietud), sus causas y tratamientos son distintos. Un niño puede tener ambas condiciones simultáneamente. La evaluación neuropsicológica permite diferenciarlos con precisión.',
  },
  {
    q: '¿Cuál es la diferencia entre autismo nivel 1, 2 y 3?',
    a: 'El DSM-5 clasifica el autismo en tres niveles de apoyo: Nivel 1 ("necesita apoyo") presenta dificultades sociales notables pero funciona con apoyo mínimo. Nivel 2 ("necesita apoyo sustancial") muestra déficits marcados en comunicación social. Nivel 3 ("necesita apoyo muy sustancial") presenta déficits severos que limitan significativamente el funcionamiento diario. El informe especifica el nivel para orientar las intervenciones.',
  },
  {
    q: '¿Cuál es la diferencia entre un neuropsicólogo y un psicólogo para diagnosticar autismo?',
    a: 'Un psicólogo clínico evalúa conducta y emociones mediante entrevista y observación general. Un neuropsicólogo aplica instrumentos estandarizados específicos para autismo (ADOS-2, ADI-R) y evalúa el perfil cognitivo y adaptativo completo. Para autismo, la evaluación neuropsicológica con ADOS-2 es el estándar de oro internacional porque permite un diagnóstico diferencial preciso frente a TDAH, ansiedad social o trastornos del lenguaje.',
  },
  {
    q: '¿Qué pasa si el resultado no indica autismo?',
    a: 'El informe igualmente aporta claridad. Identifica fortalezas, áreas de necesidad y posibles diagnósticos alternativos como TDAH, ansiedad social, trastorno del lenguaje, trastorno de la comunicación social o retraso del desarrollo. La información siempre es valiosa para entender el perfil del niño y orientar las intervenciones adecuadas.',
  },
  {
    q: '¿Puedo cancelar o reprogramar mi cita?',
    a: 'Sí, con al menos 48 horas de anticipación. El anticipo de $1,500 MXN es reembolsable si cancelas dentro de ese plazo. Fuera de plazo, se aplica como crédito para reagendar.',
  },
  {
    q: '¿El anticipo de $1,500 es adicional al costo total?',
    a: 'No. El anticipo de $1,500 MXN forma parte del costo total de $8,500 MXN. Al iniciar el proceso, solo quedarían $7,000 MXN por cubrir. Se solicita al agendar para confirmar el compromiso con el proceso clínico y asegurar tu lugar en agenda.',
  },
  {
    q: '¿La evaluación de autismo se puede hacer en línea?',
    a: 'La entrevista ADI-R con padres y la sesión de devolución pueden realizarse en línea. Sin embargo, la observación ADOS-2, las pruebas cognitivas (WISC-V) y la evaluación de conducta adaptativa (Vineland-3) requieren aplicación presencial en el consultorio de Cancún, Quintana Roo, para garantizar la validez de los resultados.',
  },
  {
    q: '¿Se puede pagar la evaluación en parcialidades?',
    a: 'El proceso está estructurado en dos pagos: un anticipo de $1,500 MXN al agendar (que forma parte del total) y el resto de $7,000 MXN antes de la entrega del informe clínico. Si necesitas una estructura de pago diferente, puedes consultarlo directamente por WhatsApp.',
  },
];

const reviews = [
  { name: 'Mamá de Santiago, 4 años', text: 'Llevábamos meses en lista de espera en otros lados. Karen nos dio respuestas en 3 semanas. El informe fue tan detallado que la escuela supo exactamente qué implementar.', stars: 5 },
  { name: 'Mamá de Emilia, 6 años', text: 'Nos dijeron que solo era "tímida". El diagnóstico de TEA nivel 1 nos dio claridad total. Las recomendaciones han transformado cómo la acompañamos en casa y en la escuela.', stars: 5 },
  { name: 'Papá de Mateo, 3 años', text: 'El proceso fue cálido y respetuoso con nuestro hijo. Karen nos explicó todo con paciencia y nos dio un plan de acción concreto. Se nota la experiencia y el profesionalismo.', stars: 5 },
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
    { '@type': 'MedicalCondition', name: 'Trastorno del espectro autista', sameAs: 'https://www.wikidata.org/wiki/Q38404' },
    { '@type': 'MedicalCondition', name: 'TDAH', sameAs: 'https://www.wikidata.org/wiki/Q206811' },
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
const teaCondition = {
  '@type': 'MedicalCondition',
  '@id': 'https://psicologakarentrujillo.com.mx/#tea',
  name: 'Trastorno del Espectro Autista (TEA)',
  alternateName: ['Autismo', 'TEA', 'Autism Spectrum Disorder', 'Espectro autista', 'Asperger'],
  code: [
    { '@type': 'MedicalCode', code: 'F84.0', codingSystem: 'ICD-10' },
    { '@type': 'MedicalCode', code: '299.00', codingSystem: 'DSM-5' },
  ],
  sameAs: 'https://www.wikidata.org/wiki/Q38404',
  associatedAnatomy: { '@type': 'AnatomicalStructure', name: 'Sistema nervioso central', sameAs: 'https://www.wikidata.org/wiki/Q9382' },
  signOrSymptom: [
    { '@type': 'MedicalSignOrSymptom', name: 'Dificultades en la comunicación social recíproca' },
    { '@type': 'MedicalSignOrSymptom', name: 'Patrones restringidos y repetitivos de conducta' },
    { '@type': 'MedicalSignOrSymptom', name: 'Intereses intensamente focalizados' },
    { '@type': 'MedicalSignOrSymptom', name: 'Hiper o hiporreactividad sensorial' },
    { '@type': 'MedicalSignOrSymptom', name: 'Dificultad para comprender claves sociales implícitas' },
    { '@type': 'MedicalSignOrSymptom', name: 'Rigidez ante cambios de rutina' },
  ],
  riskFactor: [
    { '@type': 'MedicalRiskFactor', name: 'Antecedentes genéticos familiares de TEA' },
    { '@type': 'MedicalRiskFactor', name: 'Prematuridad o complicaciones perinatales' },
    { '@type': 'MedicalRiskFactor', name: 'Edad avanzada de los padres al momento de la concepción' },
  ],
  typicalAgeRange: '2-17',
  possibleTreatment: [
    { '@type': 'MedicalTherapy', name: 'Intervención conductual temprana (ABA)' },
    { '@type': 'MedicalTherapy', name: 'Terapia de lenguaje y comunicación' },
    { '@type': 'MedicalTherapy', name: 'Terapia ocupacional con integración sensorial' },
    { '@type': 'MedicalTherapy', name: 'Adecuaciones curriculares escolares' },
    { '@type': 'MedicalTherapy', name: 'Entrenamiento en habilidades sociales' },
  ],
  differentialDiagnosis: [
    { '@type': 'DDxElement', diagnosis: { '@type': 'MedicalCondition', name: 'TDAH', sameAs: 'https://www.wikidata.org/wiki/Q206811' } },
    { '@type': 'DDxElement', diagnosis: { '@type': 'MedicalCondition', name: 'Trastorno de ansiedad social' } },
    { '@type': 'DDxElement', diagnosis: { '@type': 'MedicalCondition', name: 'Trastorno del desarrollo del lenguaje' } },
    { '@type': 'DDxElement', diagnosis: { '@type': 'MedicalCondition', name: 'Trastorno de la comunicación social (pragmático)' } },
    { '@type': 'DDxElement', diagnosis: { '@type': 'MedicalCondition', name: 'Discapacidad intelectual' } },
  ],
};

/* ── MedicalClinic entity (local SEO + GEO) ── */
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
  availableService: { '@id': 'https://psicologakarentrujillo.com.mx/#tea-service' },
  member: { '@id': 'https://psicologakarentrujillo.com.mx/#physician' },
};

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    /* ── Page ── */
    {
      '@type': 'MedicalWebPage',
      name: 'Evaluación y Diagnóstico de Autismo (TEA) en Cancún',
      url: 'https://psicologakarentrujillo.com.mx/evaluacion-autismo-cancun',
      description: 'Evaluación neuropsicológica de Autismo (TEA) en Cancún con ADOS-2 y ADI-R. Diagnóstico con nivel de apoyo, perfil cognitivo y conducta adaptativa. Informe con cédula federal 11009616.',
      inLanguage: 'es-MX',
      about: { '@id': 'https://psicologakarentrujillo.com.mx/#tea' },
      mentions: [
        { '@type': 'MedicalCondition', name: 'Trastorno del espectro autista', sameAs: 'https://www.wikidata.org/wiki/Q38404' },
        { '@type': 'MedicalCondition', name: 'TDAH', sameAs: 'https://www.wikidata.org/wiki/Q206811' },
        { '@type': 'MedicalTest', name: 'ADOS-2' },
        { '@type': 'MedicalTest', name: 'ADI-R' },
      ],
      reviewedBy: { '@id': 'https://psicologakarentrujillo.com.mx/#physician' },
      lastReviewed: '2025-06-01',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://psicologakarentrujillo.com.mx' },
          { '@type': 'ListItem', position: 2, name: 'Evaluación Autismo (TEA)', item: 'https://psicologakarentrujillo.com.mx/evaluacion-autismo-cancun' },
        ],
      },
    },
    /* ── Physician ── */
    physicianEntity,
    /* ── Clinic (local SEO) ── */
    clinicEntity,
    /* ── Condition ── */
    teaCondition,
    /* ── Diagnostic Procedures (GEO: helps LLMs understand each test) ── */
    {
      '@type': 'DiagnosticProcedure',
      name: 'ADOS-2',
      alternateName: 'Autism Diagnostic Observation Schedule — 2nd Edition',
      description: 'Escala de observación semiestructurada considerada el estándar de oro internacional para el diagnóstico del autismo. Evalúa comunicación, interacción social y conducta directamente con el niño.',
      usedToDiagnose: { '@id': 'https://psicologakarentrujillo.com.mx/#tea' },
    },
    {
      '@type': 'DiagnosticProcedure',
      name: 'ADI-R',
      alternateName: 'Autism Diagnostic Interview — Revised',
      description: 'Entrevista diagnóstica estructurada aplicada a padres o cuidadores principales. Explora la historia del desarrollo, comunicación, interacción social y patrones de conducta restringidos y repetitivos.',
      usedToDiagnose: { '@id': 'https://psicologakarentrujillo.com.mx/#tea' },
    },
    {
      '@type': 'DiagnosticProcedure',
      name: 'WISC-V',
      alternateName: 'Escala Wechsler de Inteligencia para Niños — 5ª edición',
      description: 'Evaluación de inteligencia y perfil cognitivo que mide atención, memoria de trabajo, velocidad de procesamiento y razonamiento.',
      sameAs: 'https://www.wikidata.org/wiki/Q2551426',
      usedToDiagnose: { '@id': 'https://psicologakarentrujillo.com.mx/#tea' },
    },
    {
      '@type': 'DiagnosticProcedure',
      name: 'Vineland-3',
      alternateName: 'Vineland Adaptive Behavior Scales — 3rd Edition',
      description: 'Evaluación de conducta adaptativa que mide comunicación, socialización, habilidades de la vida diaria y habilidades motoras.',
      usedToDiagnose: { '@id': 'https://psicologakarentrujillo.com.mx/#tea' },
    },
    {
      '@type': 'DiagnosticProcedure',
      name: 'SRS-2',
      alternateName: 'Social Responsiveness Scale — 2nd Edition',
      description: 'Escala que mide la severidad de los déficits en interacción social recíproca asociados al autismo, con formas para padres y maestros.',
      usedToDiagnose: { '@id': 'https://psicologakarentrujillo.com.mx/#tea' },
    },
    /* ── Service + Offer ── */
    {
      '@type': 'MedicalProcedure',
      '@id': 'https://psicologakarentrujillo.com.mx/#tea-service',
      name: 'Evaluación Neuropsicológica de Autismo (TEA)',
      procedureType: 'Diagnostic',
      howPerformed: 'Aplicación de ADOS-2 (observación directa), ADI-R (entrevista con padres), WISC-V (perfil cognitivo), Vineland-3 (conducta adaptativa) y SRS-2 (responsividad social). Elaboración de informe y sesión de devolución.',
      preparation: 'No requiere preparación especial. Se recomienda que el niño asista descansado y en su estado habitual. No es necesario restringir actividades previas.',
      followup: 'Sesión de devolución con explicación del diagnóstico, nivel de apoyo, recomendaciones terapéuticas y adecuaciones escolares.',
      bodyLocation: 'Sistema nervioso central — comunicación social y conducta',
      status: 'EventScheduled',
      provider: { '@id': 'https://psicologakarentrujillo.com.mx/#physician' },
      location: { '@id': 'https://psicologakarentrujillo.com.mx/#clinic' },
      offers: {
        '@type': 'Offer',
        price: '8500',
        priceCurrency: 'MXN',
        description: 'Proceso completo: 5-6 sesiones, pruebas estandarizadas (ADOS-2, ADI-R, WISC-V, Vineland-3, SRS-2), informe clínico y sesión de devolución. Anticipo de $1,500 MXN al agendar.',
        availability: 'https://schema.org/InStock',
        validFrom: '2025-01-01',
        areaServed: { '@type': 'City', name: 'Cancún', sameAs: 'https://www.wikidata.org/wiki/Q8969' },
      },
    },
    /* ── HowTo ── */
    {
      '@type': 'HowTo',
      name: 'Proceso de evaluación neuropsicológica de autismo (TEA) en Cancún',
      description: 'Protocolo clínico de 5 fases para diagnosticar autismo con ADOS-2 y ADI-R. Duración total: 3 a 4 semanas.',
      totalTime: 'P4W',
      estimatedCost: { '@type': 'MonetaryAmount', currency: 'MXN', value: '8500' },
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
    if (count <= 2) return { label: 'Pocas señales por ahora', description: 'Marcaste pocas señales. Puede ser parte del desarrollo típico, pero si persisten o te preocupan, una consulta puede darte orientación.', color: 'border-success bg-success/5', level: 'low' };
    if (count <= 4) return { label: 'Vale la pena explorar', description: 'Varias de estas señales de forma consistente sugieren que una evaluación formal aportaría claridad real. No es diagnóstico, es información.', color: 'border-accent-blue bg-accent-blue/5', level: 'mid' };
    return { label: 'Una evaluación es muy recomendable', description: 'Muchas de estas señales presentes de forma persistente justifican una evaluación neuropsicológica con ADOS-2. Es el paso correcto para entender a tu hijo.', color: 'border-primary bg-primary/5', level: 'high' };
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
        <p className="text-[10px] text-muted-foreground/50 text-center mt-4">Solo una evaluación neuropsicológica formal con ADOS-2 puede establecer un diagnóstico de autismo.</p>
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE — FUNNEL (Optimized flow)
   ═══════════════════════════════════════════════════════════════ */

export default function AutismoCancunFunnel() {
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
        <title>Evaluación Autismo (TEA) en Cancún · ADOS-2 | Karen Trujillo</title>
        <meta name="description" content="¿Tu hijo muestra señales de autismo? Evaluación neuropsicológica de TEA en Cancún con ADOS-2 y ADI-R. Diagnóstico con nivel de apoyo. Informe oficial con cédula 11009616. $8,500 MXN. Agenda en línea." />
        <link rel="canonical" href="https://psicologakarentrujillo.com.mx/evaluacion-autismo-cancun" />

        <meta name="geo.region" content="MX-ROO" />
        <meta name="geo.placename" content="Cancún, Quintana Roo" />
        <meta name="geo.position" content="21.1619;-86.8515" />
        <meta name="ICBM" content="21.1619, -86.8515" />

        <meta property="og:type" content="website" />
        <meta property="og:locale" content="es_MX" />
        <meta property="og:site_name" content="Neuropsicóloga Karen Trujillo — Neuropsicología" />
        <meta property="og:title" content="Evaluación Autismo (TEA) en Cancún · ADOS-2 y ADI-R" />
        <meta property="og:description" content="Evaluación neuropsicológica de autismo con ADOS-2 — estándar de oro internacional. Informe con validez oficial. $8,500 MXN. Agenda en línea." />
        <meta property="og:url" content="https://psicologakarentrujillo.com.mx/evaluacion-autismo-cancun" />
        <meta property="og:image" content="https://psicologakarentrujillo.com.mx/Psicologa_Karen_Trujillo.webp" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Evaluación Autismo (TEA) en Cancún | ADOS-2 y ADI-R" />
        <meta name="twitter:description" content="Evaluación neuropsicológica de autismo con instrumentos estandarizados. Informe oficial. Agenda en línea. Cancún, Q. Roo." />

        {/* AEO: Speakable */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: ['#definicion-tea', '#proceso-evaluacion', '#que-incluye-informe', '#diferenciador-neuropsicologia'],
          },
          url: 'https://psicologakarentrujillo.com.mx/evaluacion-autismo-cancun',
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
                  <li className="text-primary font-medium">Evaluación Autismo (TEA)</li>
                </ol>
              </nav>

              <div className="animate-[fadeInUp_0.8s_ease-out_both]">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border shadow-lg shadow-primary/5 mb-6 ring-1 ring-primary/10 max-w-full">
                  <span className="w-2 h-2 rounded-full bg-warning animate-pulse shadow-sm shadow-warning shrink-0" />
                  <span className="text-[9px] uppercase tracking-[0.12em] font-bold text-muted-foreground text-center leading-snug">Disponibilidad limitada · Cancún · Diagnóstico con ADOS-2</span>
                </div>

                {/* H1 — keyword-rich for SEO */}
                <h1 className="text-[2rem] sm:text-5xl lg:text-6xl font-serif font-bold text-primary leading-[1.1] mb-4 text-balance">
                  Evaluación de Autismo<br className="hidden sm:block" /> en Cancún
                </h1>

                {/* Emotional hook */}
                <p className="text-lg sm:text-2xl font-serif text-primary/80 italic mb-6 max-w-2xl mx-auto">
                  Entender cómo ve el mundo tu hijo cambia todo
                </p>

                {/* Subheadline — outcome first, features second */}
                <p className="text-muted-foreground text-sm sm:text-lg font-light leading-relaxed mb-4 max-w-2xl mx-auto">
                  Un diagnóstico formal con el <strong className="text-primary font-semibold">estándar de oro internacional (ADOS-2)</strong> que te da claridad, un nivel de apoyo específico y un camino concreto para acompañarlo. Evaluación con pruebas estandarizadas (ADOS-2, ADI-R, WISC-V, Vineland-3) e informe clínico con <strong className="text-primary font-semibold">validez oficial</strong> ante escuelas, SEP e IMSS.
                </p>

                <p className="text-xs sm:text-sm text-muted-foreground/70 mb-8">
                  <strong className="text-primary">Neuropsicóloga Karen Trujillo</strong> · Cédula Federal 11009616 · 7+ años de experiencia
                </p>
              </div>

              <div ref={heroCTARef} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-[fadeInUp_0.8s_ease-out_0.3s_both]">
                <CtaButton>Agendar evaluación</CtaButton>
                <a href="#sintomas" onClick={(e) => { e.preventDefault(); document.getElementById('sintomas')?.scrollIntoView({ behavior: 'smooth' }); }} className="group inline-flex items-center justify-center gap-2 font-bold text-[9px] uppercase tracking-wide px-6 py-4 rounded-xl border-2 border-primary/15 text-primary/70 hover:border-primary/30 hover:text-primary transition-all duration-300">
                  ¿Mi hijo podría tener autismo?
                  <ArrowDown className="w-3 h-3 transition-transform group-hover:translate-y-0.5 shrink-0" />
                </a>
              </div>

              <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs text-muted-foreground animate-[fadeIn_0.8s_ease-out_0.6s_both]">
                {[
                  { icon: BadgeCheck, text: 'Cédula 11009616' },
                  { icon: Stethoscope, text: 'ADOS-2 · Estándar de oro' },
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
              ══════════════════════════════════════════════════════ */}
          <section id="sintomas" className="py-14 sm:py-20 bg-secondary scroll-mt-24">
            <div className="max-w-4xl mx-auto px-6">
              <SectionReveal>
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent-blue mb-4 text-center">Muchas familias llegan con esta historia</p>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-4 text-center text-balance">¿Te suena familiar?</h2>
                <p className="text-muted-foreground font-light text-center max-w-2xl mx-auto mb-10">Las señales de autismo pueden ser sutiles o confundirse con timidez, TDAH o &ldquo;cada niño tiene su ritmo&rdquo;. Selecciona las que reconoces en tu hijo para saber si una evaluación es recomendable.</p>
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
                    <strong className="text-primary font-semibold not-italic">La intervención temprana es el mayor predictor de resultados positivos en autismo.</strong> Cada mes sin diagnóstico es un mes de terapias que no inician y de un entorno que no se adapta a sus necesidades reales. Actuar hoy le da a tu hijo la ventaja que necesita.
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
              3 · AEO DEFINITION — "¿Qué es el autismo (TEA)?"
              ══════════════════════════════════════════════════════ */}
          <section id="definicion-tea" className="py-14 sm:py-16 bg-secondary/50 border-y border-border relative overflow-hidden">
            <div className="max-w-3xl mx-auto px-6 relative">
              <SectionReveal>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-6 text-center">¿Qué es el Trastorno del Espectro Autista (TEA)?</h2>
                <p className="text-muted-foreground font-light leading-relaxed mb-6 text-center max-w-2xl mx-auto">
                  El <strong className="text-primary font-semibold">Trastorno del Espectro Autista (TEA)</strong> es una condición del neurodesarrollo que afecta la <strong className="text-primary font-semibold">comunicación social</strong> y se acompaña de <strong className="text-primary font-semibold">patrones restringidos y repetitivos de conducta, intereses o actividades</strong>. <strong className="text-primary font-semibold">No es una enfermedad ni un problema de crianza.</strong> Es una forma diferente de procesar el mundo. El diagnóstico requiere que los síntomas estén presentes desde la primera infancia (criterios <strong className="text-primary font-semibold">DSM-5</strong>, código F84.0 del CIE-10).
                </p>

                <div className="flex flex-wrap justify-center gap-3 mb-8">
                  {[
                    { label: 'Nivel 1', desc: '"Necesita apoyo" — antes llamado Asperger' },
                    { label: 'Nivel 2', desc: '"Necesita apoyo sustancial"' },
                    { label: 'Nivel 3', desc: '"Necesita apoyo muy sustancial"' },
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
                    <strong className="text-primary font-semibold">En Cancún, Quintana Roo</strong>, la neuropsicóloga Karen Trujillo (cédula 11009616) aplica el <strong className="text-primary font-semibold">ADOS-2</strong> — estándar de oro internacional para el diagnóstico de autismo — junto con ADI-R, WISC-V, Vineland-3 y SRS-2 para emitir un informe clínico con validez oficial ante la SEP, IMSS e instituciones educativas.
                  </p>
                </div>
              </SectionReveal>
            </div>
          </section>


          {/* ══════════════════════════════════════════════════════
              4 · PROCESO — 5 phases
              ══════════════════════════════════════════════════════ */}
          <section id="proceso-evaluacion" className="py-14 sm:py-20 bg-card">
            <div className="max-w-4xl mx-auto px-6">
              <SectionReveal>
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent-blue mb-4 text-center">Proceso clínico estructurado</p>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-4 text-center">¿Cómo funciona la evaluación de autismo?</h2>
                {/* AEO: Direct answer */}
                <p className="text-muted-foreground font-light mb-4 text-center max-w-2xl mx-auto">
                  La evaluación neuropsicológica de autismo en Cancún tiene un costo de <strong className="text-primary font-semibold">$8,500 MXN</strong> e incluye 5-6 sesiones presenciales distribuidas en 3 a 4 semanas. El proceso combina observación directa con ADOS-2, entrevista ADI-R con padres, pruebas cognitivas, evaluación adaptativa y sesión de devolución.
                </p>
                <p className="text-sm text-primary/70 font-medium text-center mb-10">No es un proceso largo — son 5 pasos que te dan claridad para acompañarlo toda la vida.</p>
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
                  <h2 className="text-3xl sm:text-4xl font-serif font-bold italic mb-4">¿Qué incluye el informe de evaluación de autismo?</h2>
                  <p className="text-primary-foreground/70 font-light max-w-xl mx-auto">Documento clínico con validez oficial ante escuelas, SEP e IMSS en todo México. Incluye diagnóstico, nivel de apoyo, perfil de fortalezas y recomendaciones accionables.</p>
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
              6 · DIFERENCIADOR — ¿Por qué neuropsicología para autismo?
              ══════════════════════════════════════════════════════ */}
          <section id="diferenciador-neuropsicologia" className="py-14 sm:py-20 bg-card border-t border-border">
            <div className="max-w-4xl mx-auto px-6">
              <SectionReveal>
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent-blue mb-4 text-center">La diferencia importa</p>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-6 text-center text-balance">¿Por qué ADOS-2 y no solo observación clínica?</h2>

                <div className="max-w-2xl mx-auto space-y-4 mb-10">
                  <p className="text-muted-foreground font-light leading-relaxed text-center">
                    Una consulta psicológica puede sugerir rasgos de autismo a partir de observación general. La evaluación neuropsicológica con <strong className="text-primary font-semibold">ADOS-2</strong> va más allá: es un <strong className="text-primary font-semibold">protocolo estandarizado de observación directa</strong> diseñado específicamente para evaluar comunicación social, juego simbólico, interacción recíproca y patrones restringidos de conducta, con puntos de corte validados internacionalmente.
                  </p>
                  <p className="text-muted-foreground font-light leading-relaxed text-center">
                    Para el autismo, esta diferencia es crucial. Las señales del TEA se solapan con TDAH, ansiedad social, trastornos del lenguaje y retraso del desarrollo. <strong className="text-primary font-semibold">Solo una evaluación con ADOS-2 + ADI-R + perfil cognitivo y adaptativo permite un diagnóstico diferencial preciso</strong> con nivel de apoyo especificado.
                  </p>
                  <p className="text-muted-foreground font-light leading-relaxed text-center">
                    En la práctica, esto significa que el informe no dice solo &ldquo;tiene autismo&rdquo; o &ldquo;no tiene autismo&rdquo;. Revela exactamente <strong className="text-primary font-semibold">qué áreas de comunicación social están comprometidas, qué nivel de apoyo necesita y qué intervenciones específicas</strong> son prioritarias — tanto en terapia como en la escuela y en casa.
                  </p>
                </div>
              </SectionReveal>

              {/* Comparative table */}
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
                  <CtaButton>Agendar evaluación</CtaButton>
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
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-4 text-center">Familias que por fin entienden a su hijo</h2>
                <p className="text-muted-foreground font-light text-center max-w-xl mx-auto mb-10">Destacan la claridad del diagnóstico y las recomendaciones concretas para la escuela y el hogar.</p>
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
                          src="https://psicologakarentrujillo.com.mx/Psicologa_Karen_Trujillo.webp"
                          alt="Neuropsicóloga Karen Trujillo — especialista en autismo y TDAH en Cancún"
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
                      <p className="text-xs text-accent-blue font-medium mt-1">Especialista en Autismo · TDAH · TEA</p>
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
                      <p>La <strong className="text-primary font-semibold">neuropsicóloga Karen Trujillo</strong> es especialista clínica con más de 7 años de experiencia en la evaluación y diagnóstico de Trastorno del Espectro Autista, TDAH y dificultades del aprendizaje en niños, adolescentes y adultos en Cancún, Quintana Roo.</p>
                      <p>Su formación incluye especialización en neuropsicología clínica y certificación en la aplicación del <strong className="text-primary font-semibold">ADOS-2 y ADI-R</strong> — los instrumentos considerados estándar de oro mundial para el diagnóstico del autismo. Complementa cada evaluación con WISC-V, Vineland-3 y SRS-2 para ofrecer un perfil integral.</p>
                      <p>Lo que distingue su práctica es la combinación de rigor clínico con calidez humana: las familias no solo reciben un diagnóstico, sino una <strong className="text-primary font-semibold">hoja de ruta concreta</strong> para entender a su hijo y acompañarlo de forma efectiva en casa, en la escuela y en la terapia.</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3 pt-2">
                      {[
                        { icon: Award, label: 'Especialista en Autismo y TDAH' },
                        { icon: ShieldCheck, label: 'Informe válido ante SEP e IMSS' },
                        { icon: Eye, label: 'ADOS-2 certificada' },
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
                  { titulo: 'TEA confirmado', desc: 'Recibes un diagnóstico formal con nivel de apoyo especificado (1, 2 o 3), recomendaciones terapéuticas prioritarias (terapia de lenguaje, ocupacional, habilidades sociales), adecuaciones curriculares para la escuela y orientación familiar. El informe tiene validez oficial.', color: 'border-primary/30 bg-primary/5', iconColor: 'text-primary bg-primary/10 border-primary/20' },
                  { titulo: 'No es TEA — diagnóstico diferencial', desc: 'El informe identifica qué sí está pasando: TDAH, ansiedad social, trastorno del lenguaje, trastorno de la comunicación social u otra condición. Saber qué no es autismo es igual de valioso porque evita intervenciones equivocadas y dirige al tratamiento correcto.', color: 'border-accent-blue/30 bg-accent-blue/5', iconColor: 'text-accent-blue bg-accent-blue/10 border-accent-blue/20' },
                  { titulo: 'Rasgos subclínicos o perfil mixto', desc: 'Algunos niños muestran rasgos del espectro sin cumplir todos los criterios. En ese caso, recibes orientación sobre qué áreas fortalecer, qué terapias preventivas iniciar y cuándo revaluar si las señales se intensifican.', color: 'border-success/30 bg-success/5', iconColor: 'text-success bg-success/10 border-success/20' },
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
              10 · FAQ — 13 items
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
                        <p className="text-sm font-bold text-primary-foreground">Evaluación Autismo (TEA) · Proceso completo</p>
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
                        <span className="text-[80px] sm:text-[96px] font-serif font-bold text-primary leading-none tracking-tight">$8,500</span>
                        <span className="text-lg font-semibold text-muted-foreground/60 pb-3 tracking-widest">MXN</span>
                      </div>
                      <div className="flex flex-wrap justify-center gap-2 relative">
                        {['5-6 sesiones', 'ADOS-2 · ADI-R · WISC-V · Vineland-3 · SRS-2', 'Informe oficial', 'Sesión de devolución'].map((chip) => (
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
                              <span className="text-2xl font-serif font-bold text-primary">$1,500</span>
                              <span className="text-xs text-muted-foreground/60 font-light">MXN · descontado del total</span>
                            </div>
                          </div>
                        </div>
                        <div className="sm:ml-auto">
                          <p className="text-xs text-muted-foreground font-light leading-relaxed sm:text-right max-w-[200px] sm:max-w-none">Confirma tu lugar y formaliza el inicio del proceso clínico.</p>
                        </div>
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
                        title="Agendar evaluación autismo (TEA) — Neuropsicóloga Karen Trujillo"
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
                    <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hola Karen, vi tu página de evaluación de autismo y tengo algunas dudas antes de agendar. ¿Podrías orientarme?')}`} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center gap-2 px-6 py-3.5 bg-whatsapp hover:opacity-90 text-white font-bold text-[10px] uppercase tracking-widest rounded-xl transition-all active:scale-[0.98]">
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
                <Link href="/evaluacion-tdah-adultos" className="flex items-center gap-3 p-4 bg-secondary border border-border rounded-2xl hover:border-primary/50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group">
                  <ArrowRight className="w-4 h-4 text-primary/50 shrink-0 transition-transform group-hover:translate-x-1" />
                  <div>
                    <span className="text-sm font-bold text-primary block">TDAH en Adultos</span>
                    <span className="text-[10px] text-muted-foreground font-light">Valoración neuropsicológica +18 años</span>
                  </div>
                </Link>
              </div>
            </div>
          </section>

        </main>

        <Footer />

        {/* ── Mobile sticky CTA — CSS transitions ── */}
        <div
          className={`fixed bottom-0 left-0 right-0 z-[100] px-4 pb-5 lg:hidden bg-gradient-to-t from-background via-background/95 to-transparent pt-8 transition-all duration-350 ${
            heroCTAInView ? 'opacity-0 translate-y-12 pointer-events-none' : 'opacity-100 translate-y-0'
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
        >
          <a href="#agendar" onClick={scrollToBooking} className="flex items-center justify-center w-full bg-gradient-primary text-primary-foreground py-3.5 rounded-xl font-bold text-[11px] uppercase tracking-widest shadow-2xl shadow-primary/35 active:scale-[0.98] transition-transform">
            {symptomCount > 4 ? 'Muchas señales — Agendar evaluación' : 'Agendar evaluación'}
          </a>
        </div>
      </div>
    </>
  );
}
