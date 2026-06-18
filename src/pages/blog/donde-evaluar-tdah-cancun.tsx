import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, AlertTriangle, HelpCircle, ChevronDown, Facebook, Link2, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import { WA_NUMBER } from '@/lib/contact';
import { SITE_URL, CEDULA, KAREN_IMAGE } from '@/lib/site';

const WA = `https://wa.me/${WA_NUMBER}?text=Hola%20Karen%2C%20le%C3%AD%20tu%20gu%C3%ADa%20sobre%20evaluaci%C3%B3n%20de%20TDAH%20en%20Canc%C3%BAn%20y%20quisiera%20m%C3%A1s%20informaci%C3%B3n`;
const CANONICAL_URL = `${SITE_URL}/blog/donde-evaluar-tdah-cancun`;
const ARTICLE_HEADLINE = 'Dónde evaluar TDAH en Cancún: qué buscar (y qué evitar)';

const criteriosCalidad = [
  {
    senal: 'Utiliza instrumentos estandarizados internacionales',
    explicacion: 'Una evaluación válida de TDAH incluye pruebas como el CONNERS-3 (niños) o CAARS-2 (adultos), junto con pruebas de inteligencia (WISC-V o WAIS-IV) y funciones ejecutivas (BRIEF-2). Si la evaluación se basa solo en una entrevista o cuestionario aislado, no tiene suficiente respaldo clínico.',
  },
  {
    senal: 'El profesional tiene cédula federal',
    explicacion: 'La cédula profesional federal emitida por la SEP es el documento que acredita la formación y habilita legalmente para ejercer en México. Verificar la cédula en el sistema SIIP de la SEP toma menos de 2 minutos — y es la diferencia entre un informe con validez oficial y uno que no sirve en la escuela.',
  },
  {
    senal: 'El informe tiene validez ante SEP e IMSS',
    explicacion: 'El documento que necesitas no es solo un "reporte" — es un informe clínico con diagnóstico formal, perfil cognitivo y recomendaciones de intervención. Sin esos elementos, la escuela no puede implementar adecuaciones curriculares.',
  },
  {
    senal: 'El proceso toma más de una sesión',
    explicacion: 'Una evaluación neuropsicológica completa de TDAH requiere entre 4 y 5 sesiones de 60-90 minutos. Si te ofrecen un diagnóstico en una sola consulta, la evaluación no es lo suficientemente rigurosa para ser confiable.',
  },
  {
    senal: 'Hay sesión de devolución con explicación detallada',
    explicacion: 'Al finalizar, deberías entender qué encontraron, qué significa para la vida diaria de tu hijo o para tu vida, y qué hacer ahora. Si solo recibes un papel con un diagnóstico sin explicación, algo falta.',
  },
];

const senalesAlerta = [
  {
    alerta: '"Te damos el diagnóstico en una sola sesión"',
    razon: 'Una evaluación neuropsicológica completa requiere mínimo 4 sesiones. Un diagnóstico en una consulta no tiene suficiente respaldo.',
  },
  {
    alerta: '"No necesitas pruebas, con la entrevista es suficiente"',
    razon: 'Las pruebas estandarizadas son lo que diferencia la neuropsicología clínica de una opinión. Sin ellas, el diagnóstico no es diferencial ni objetivamente respaldado.',
  },
  {
    alerta: 'El informe no incluye cédula profesional ni número de instrumento',
    razon: 'Un informe válido siempre incluye la cédula del evaluador, los instrumentos utilizados con sus ediciones y los resultados específicos.',
  },
  {
    alerta: 'No pueden explicar qué mide cada prueba',
    razon: 'Un evaluador certificado debe poder explicarte para qué sirve cada prueba que aplica, qué mide y por qué es relevante para el perfil de tu hijo o tuyo.',
  },
];

const procesoKaren = [
  {
    paso: 'Contacto inicial',
    desc: 'Describes la situación por WhatsApp o teléfono. Karen evalúa si la evaluación neuropsicológica es adecuada para el caso y responde tus preguntas antes de agendar.',
  },
  {
    paso: 'Primera sesión — entrevista',
    desc: '60-90 minutos con los padres (en caso de niños) o directamente con el adulto. Historial del desarrollo, motivo de consulta, contexto escolar o laboral.',
  },
  {
    paso: 'Sesiones de pruebas',
    desc: '2-3 sesiones de 60-90 minutos aplicando los instrumentos estandarizados. Para niños: CONNERS-3, WISC-V, BRIEF-2, CPT-3. Para adultos: CAARS-2, WAIS-IV, BRIEF-2A, CPT-3.',
  },
  {
    paso: 'Análisis y elaboración del informe',
    desc: 'Karen integra todos los datos. 5-7 días hábiles. Se completan cuestionarios para maestros o empleadores de forma remota.',
  },
  {
    paso: 'Sesión de devolución',
    desc: 'Se presentan y explican los resultados, el diagnóstico diferencial y las recomendaciones concretas. Se entrega el informe con validez oficial.',
  },
];

const faqItems = [
  {
    q: '¿Dónde se puede evaluar TDAH en Cancún?',
    a: `La neuropsicóloga Karen Trujillo (cédula ${CEDULA}) realiza evaluaciones neuropsicológicas de TDAH en su consultorio ubicado en SM200 M49 L2, Hacienda de Chinconcuac, Cancún, Quintana Roo. Atiende niños de 5-17 años y adultos de 18 en adelante. El proceso toma 2-3 semanas (4-5 sesiones) y el informe tiene validez oficial ante SEP, IMSS e instituciones.`,
  },
  {
    q: '¿Cuánto cuesta una evaluación de TDAH en Cancún?',
    a: 'La evaluación neuropsicológica de TDAH en el consultorio de Karen Trujillo cuesta $8,300 MXN, tanto para niños (5-17 años) como para adultos (18+). El pago se distribuye a lo largo de las sesiones del proceso. Se solicita un depósito de $1,000 MXN para apartar la primera cita.',
  },
  {
    q: '¿Cuál es la diferencia entre un neuropsicólogo y un psiquiatra para evaluar TDAH?',
    a: 'El neuropsicólogo realiza la evaluación diagnóstica: aplica instrumentos estandarizados, elabora el perfil cognitivo y emite el diagnóstico diferencial. El psiquiatra evalúa la pertinencia de tratamiento farmacológico. En muchos casos se trabaja en equipo: la evaluación neuropsicológica primero, y luego el psiquiatra tiene un perfil detallado para tomar decisiones de medicación si aplica.',
  },
  {
    q: '¿El diagnóstico de TDAH sirve para que la escuela dé adecuaciones?',
    a: 'Sí, pero solo si el informe está emitido por un profesional con cédula federal y contiene los elementos requeridos: diagnóstico formal, instrumentos utilizados, perfil de funciones ejecutivas y recomendaciones pedagógicas específicas. El informe de Karen Trujillo cumple todos estos requisitos y tiene validez oficial ante la SEP.',
  },
  {
    q: '¿Puedo hacer la evaluación si ya tengo un diagnóstico previo?',
    a: 'Sí. Muchos pacientes llegan con diagnósticos previos basados en entrevistas o cuestionarios sin pruebas estandarizadas. Una evaluación neuropsicológica completa confirma, matiza o corrige el diagnóstico anterior con evidencia objetiva — lo que permite diseñar un plan de intervención más preciso.',
  },
  {
    q: '¿Atiende a pacientes de Playa del Carmen, Tulum o fuera de Cancún?',
    a: 'Sí. El consultorio está en Cancún, pero Karen atiende pacientes de toda la Riviera Maya que viajan para la evaluación. El proceso se organiza para que los viajes sean eficientes — generalmente 4-5 visitas en 2-3 semanas. La entrevista inicial y la sesión de devolución pueden hacerse por videollamada.',
  },
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Article', 'BlogPosting'],
      '@id': `${CANONICAL_URL}/#article`,
      headline: 'Dónde evaluar TDAH en Cancún: qué buscar (y qué evitar)',
      description: `Guía completa para elegir dónde evaluar TDAH en Cancún. Qué instrumentos debe incluir, qué señales de alerta evitar y cómo es el proceso en el consultorio de Karen Trujillo (cédula ${CEDULA}).`,
      image: KAREN_IMAGE,
      datePublished: '2026-06-03',
      dateModified: '2026-06-03',
      author: {
        '@type': 'Person',
        '@id': `${SITE_URL}/#physician`,
        name: 'Karen Trujillo',
        jobTitle: 'Neuropsicóloga Clínica',
        url: SITE_URL,
      },
      publisher: {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#clinic`,
        name: 'Neuropsicóloga Karen Trujillo',
        url: SITE_URL,
      },
      mainEntityOfPage: CANONICAL_URL,
      inLanguage: 'es-MX',
      about: {
        '@type': 'MedicalCondition',
        name: 'TDAH',
        sameAs: 'https://www.wikidata.org/wiki/Q206811',
      },
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['#criterios-calidad', '#proceso-karen', '#preguntas-frecuentes'],
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
        { '@type': 'ListItem', position: 3, name: 'Dónde evaluar TDAH en Cancún', item: CANONICAL_URL },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqItems.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ],
};

export default function DondeEvaluarTDAHCancun() {
  const [linkCopied, setLinkCopied] = useState(false);
  return (
    <>
      <Head>
        <title>Dónde evaluar TDAH en Cancún: guía para elegir bien</title>
        <meta name="description" content={`Guía completa para elegir dónde evaluar TDAH en Cancún. Qué instrumentos debe incluir, qué señales de alerta evitar y cómo es el proceso en el consultorio de Karen Trujillo (cédula ${CEDULA}).`} />
        <link rel="canonical" href={CANONICAL_URL} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="es_MX" />
        <meta property="og:site_name" content="Neuropsicóloga Karen Trujillo" />
        <meta property="og:title" content="Dónde evaluar TDAH en Cancún: guía para elegir bien" />
        <meta property="og:description" content="Ya decidiste que quieres una evaluación. Ahora la pregunta es: ¿cómo elegir bien? Criterios concretos, señales de alerta y el proceso paso a paso." />
        <meta property="og:url" content={CANONICAL_URL} />
        <meta property="og:image" content={`${SITE_URL}/blog/dark-donde-evaluar-tdah-en-cancun-1200x675.svg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="675" />
        <meta property="og:image:alt" content="Karen Trujillo, neuropsicóloga en Cancún — guía evaluación TDAH" />
        <meta property="article:author" content="Karen Trujillo" />
        <meta property="article:published_time" content="2026-06-03" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Dónde evaluar TDAH en Cancún: guía para elegir bien | Karen Trujillo" />
        <meta name="twitter:description" content="Criterios concretos, señales de alerta y el proceso paso a paso para elegir bien dónde evaluar TDAH en Cancún." />
        <meta name="twitter:image" content={`${SITE_URL}/blog/dark-donde-evaluar-tdah-en-cancun-1200x675.svg`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>

      <div className="antialiased selection:bg-accent-blue selection:text-primary w-full min-w-0 overflow-x-hidden">
        <Navbar />
        <main>

          {/* ── Hero ── */}
          <section className="relative pt-36 pb-16 px-6 overflow-hidden" style={{ background: '#2b1f47' }}>
            <div aria-hidden="true" className="absolute top-0 right-0 w-[480px] h-[480px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(208,208,231,0.07) 0%, transparent 70%)' }} />
            <div aria-hidden="true" className="absolute bottom-0 left-0 w-[320px] h-[320px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(91,78,127,0.18) 0%, transparent 70%)' }} />
            <div className="max-w-3xl mx-auto relative z-10">
              <nav aria-label="Breadcrumb" className="mb-6">
                <ol className="flex items-center gap-2 text-xs flex-wrap" style={{ color: 'rgba(208,208,231,0.7)' }}>
                  <li><Link href="/" className="hover:text-[#d0d0e7] transition-colors">Inicio</Link></li>
                  <li>/</li>
                  <li><Link href="/blog" className="hover:text-[#d0d0e7] transition-colors">Blog</Link></li>
                  <li>/</li>
                  <li className="font-medium" style={{ color: '#d0d0e7' }}>Dónde evaluar TDAH en Cancún</li>
                </ol>
              </nav>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4" style={{ background: '#f5dfc5', color: '#382f51' }}>
                  Guía local · Cancún
                </span>
                <h1 className="text-3xl md:text-5xl font-serif font-bold text-white leading-[1.15] mb-4">
                  Dónde evaluar TDAH en Cancún: qué buscar (y qué evitar)
                </h1>
                <p className="text-lg font-light leading-relaxed mb-6" style={{ color: 'rgba(208,208,231,0.82)' }}>
                  Ya decidiste que quieres una evaluación. Ahora la pregunta es: ¿cómo elegir bien? Esta guía te da los criterios concretos.
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs pt-4" style={{ color: 'rgba(208,208,231,0.75)', borderTop: '1px solid rgba(208,208,231,0.18)' }}>
                  <span><strong style={{ color: 'rgba(208,208,231,0.95)' }}>Revisado por Karen Trujillo, Neuropsicóloga</strong> · Cédula {CEDULA}</span>
                  <time dateTime="2026-06-03">3 jun 2026</time>
                  <span>Cancún, Quintana Roo</span>
                  <span>7 min de lectura</span>
                </div>
              </motion.div>
            </div>
          </section>

          {/* ── Imagen destacada (placeholder) ── */}
          <section className="px-6 -mt-8 relative z-10">
            <div className="max-w-3xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <figure className="rounded-2xl overflow-hidden border border-border shadow-[0_20px_60px_-15px_rgba(56,47,81,0.25)]">
                  <img
                    src="/blog/dark-donde-evaluar-tdah-en-cancun-1200x675.svg"
                    alt="Dónde evaluar TDAH en Cancún: qué buscar (y qué evitar) — imagen ilustrativa"
                    width={1200}
                    height={675}
                    className="w-full h-auto aspect-video object-cover"
                    loading="eager"
                  />
                </figure>
                <p className="text-[10px] text-muted-foreground/60 font-light italic mt-2 text-center">Foto ilustrativa — pendiente de fotografía real.</p>
              </motion.div>
            </div>
          </section>

          {/* ── Criterios de calidad ── */}
          <section id="criterios-calidad" className="py-16 px-6 bg-card">
            <div className="max-w-3xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <h2 className="text-2xl font-serif font-bold text-primary mb-8">5 criterios de una evaluación de TDAH confiable</h2>
                <div className="space-y-4">
                  {criteriosCalidad.map((item, i) => (
                    <div key={i} className="bg-secondary border border-border rounded-xl p-5">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-primary text-sm mb-1">{item.senal}</p>
                          <p className="text-xs text-muted-foreground font-light leading-relaxed">{item.explicacion}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* ── Imagen inline 1 (placeholder) ── */}
          <section className="py-12 px-6 bg-secondary">
            <div className="max-w-3xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <figure className="rounded-2xl overflow-hidden border border-border shadow-[0_8px_24px_-6px_rgba(56,47,81,0.12)]">
                  <img
                    src="/blog/sand-como-elegir-bien-960x540.svg"
                    alt="Cómo elegir un consultorio confiable para evaluar TDAH en Cancún — imagen ilustrativa"
                    width={960}
                    height={540}
                    className="w-full h-auto aspect-video object-cover"
                    loading="lazy"
                  />
                </figure>
                <p className="text-[10px] text-muted-foreground/60 font-light italic mt-2 text-center">Foto ilustrativa — pendiente de fotografía real.</p>
              </motion.div>
            </div>
          </section>

          {/* ── Señales de alerta ── */}
          <section className="py-16 px-6 bg-secondary border-t border-border">
            <div className="max-w-3xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <h2 className="text-2xl font-serif font-bold text-primary mb-4">Señales de alerta: qué evitar</h2>
                <p className="text-muted-foreground font-light leading-relaxed mb-8">
                  No todas las evaluaciones son iguales. Estas son las señales que indican que algo no está bien:
                </p>
                <div className="space-y-4">
                  {senalesAlerta.map((item, i) => (
                    <div key={i} className="bg-card border border-border rounded-xl p-5">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-rose-500 text-sm italic mb-1">{item.alerta}</p>
                          <p className="text-xs text-muted-foreground font-light leading-relaxed">{item.razon}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* ── Proceso Karen ── */}
          <section id="proceso-karen" className="py-16 px-6 bg-card">
            <div className="max-w-3xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <h2 className="text-2xl font-serif font-bold text-primary mb-4">Cómo es el proceso en el consultorio de Karen Trujillo</h2>
                <p className="text-muted-foreground font-light leading-relaxed mb-8">
                  El consultorio está ubicado en SM200 M49 L2, Hacienda de Chinconcuac, Cancún, Quintana Roo. Karen atiende niños de 5-17 años y adultos de 18 en adelante. El proceso completo se organiza en 5 pasos:
                </p>
                <div className="space-y-4 mb-10">
                  {procesoKaren.map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex flex-col items-center shrink-0">
                        <div className="w-8 h-8 rounded-full bg-accent-blue/10 border border-accent-blue/30 flex items-center justify-center text-xs font-bold text-primary">
                          {i + 1}
                        </div>
                        {i < procesoKaren.length - 1 && (
                          <div className="w-px flex-1 mt-2 bg-border" />
                        )}
                      </div>
                      <div className="pb-6">
                        <p className="font-bold text-primary text-sm mb-1">{item.paso}</p>
                        <p className="text-xs text-muted-foreground font-light leading-relaxed">{item.desc}</p>
                        {i < procesoKaren.length - 1 && (
                          <ArrowRight className="w-3 h-3 text-muted-foreground mt-3" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="bg-secondary border border-border rounded-xl p-5 text-center">
                    <p className="text-xl font-bold text-primary mb-1">$8,300 MXN</p>
                    <p className="text-xs text-muted-foreground font-light">Costo total de la evaluación</p>
                  </div>
                  <div className="bg-secondary border border-border rounded-xl p-5 text-center">
                    <p className="text-xl font-bold text-primary mb-1">2-3 semanas</p>
                    <p className="text-xs text-muted-foreground font-light">Duración del proceso completo</p>
                  </div>
                  <div className="bg-secondary border border-border rounded-xl p-5 text-center">
                    <p className="text-xl font-bold text-primary mb-1">Cédula {CEDULA}</p>
                    <p className="text-xs text-muted-foreground font-light">Habilitación federal SEP</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* ── Imagen inline 2 (placeholder) ── */}
          <section className="py-12 px-6 bg-card border-t border-border">
            <div className="max-w-3xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <figure className="rounded-2xl overflow-hidden border border-border shadow-[0_8px_24px_-6px_rgba(56,47,81,0.12)]">
                  <img
                    src="/blog/lavender-consultorio-en-cancun-960x540.svg"
                    alt="Consultorio de evaluación de TDAH de Karen Trujillo en Cancún — imagen ilustrativa"
                    width={960}
                    height={540}
                    className="w-full h-auto aspect-video object-cover"
                    loading="lazy"
                  />
                </figure>
                <p className="text-[10px] text-muted-foreground/60 font-light italic mt-2 text-center">Foto ilustrativa — pendiente de fotografía real.</p>
              </motion.div>
            </div>
          </section>

          {/* ── FAQ ── */}
          <section id="preguntas-frecuentes" className="py-16 px-6 bg-secondary">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-serif font-bold text-primary mb-8 flex items-center gap-3">
                <HelpCircle className="w-6 h-6 text-accent-blue" />
                Preguntas frecuentes
              </h2>
              <div role="list">
                {faqItems.map((faq, i) => (
                  <details key={i} className="group" style={{ borderBottom: i < faqItems.length - 1 ? '1px solid rgba(91,78,127,0.15)' : 'none' }} role="listitem">
                    <summary className="w-full py-5 sm:py-6 font-bold text-primary text-sm sm:text-base cursor-pointer list-none flex justify-between items-center gap-4 text-left">
                      <span>{faq.q}</span>
                      <ChevronDown className="w-5 h-5 shrink-0 transition-transform duration-300 group-open:rotate-180" />
                    </summary>
                    <p className="pb-5 text-muted-foreground text-sm font-light leading-relaxed">{faq.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* ── Compartir ── */}
          <section className="py-8 bg-card border-t border-border">
            <div className="max-w-3xl mx-auto px-6">
              <div className="flex flex-wrap items-center justify-center gap-3">
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">Comparte esta guía</span>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(CANONICAL_URL)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Compartir en Facebook"
                  className="w-9 h-9 rounded-full bg-secondary border border-border flex items-center justify-center text-primary/60 hover:text-primary hover:border-primary/30 transition-all"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`${ARTICLE_HEADLINE} — ${CANONICAL_URL}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Compartir por WhatsApp"
                  className="w-9 h-9 rounded-full bg-secondary border border-border flex items-center justify-center text-primary/60 hover:text-primary hover:border-primary/30 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(CANONICAL_URL);
                    setLinkCopied(true);
                    setTimeout(() => setLinkCopied(false), 2000);
                  }}
                  aria-label="Copiar enlace"
                  className="w-9 h-9 rounded-full bg-secondary border border-border flex items-center justify-center text-primary/60 hover:text-primary hover:border-primary/30 transition-all"
                >
                  <Link2 className="w-4 h-4" />
                </button>
                {linkCopied && <span className="text-xs text-success font-medium">¡Enlace copiado!</span>}
              </div>
            </div>
          </section>

          {/* ── CTA ── */}
          <section className="py-16 px-6 bg-gradient-primary text-primary-foreground">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-serif font-bold italic mb-4">¿Listo para agendar?</h2>
              <p className="text-primary-foreground/80 font-light mb-8 max-w-xl mx-auto">
                Karen Trujillo es neuropsicóloga clínica con cédula federal {CEDULA}, especializada en evaluación de TDAH en Cancún. Atiende niños de 5-17 años y adultos. El informe tiene validez oficial ante SEP, IMSS e instituciones.
              </p>
              <div className="flex items-center gap-3 justify-center mb-6 text-xs text-primary-foreground/80">
                <img
                  src={KAREN_IMAGE}
                  alt="Neuropsicóloga Karen Trujillo"
                  width={36}
                  height={36}
                  className="w-9 h-9 rounded-full object-cover object-top border border-white/20"
                />
                <span>Karen Trujillo · Cédula {CEDULA}</span>
                <span>★ 47+ reseñas · 5.0</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={WA} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-primary-foreground text-primary font-bold text-xs uppercase tracking-widest px-8 py-3.5 rounded-lg hover:opacity-90 transition-all">
                  Escribir a Karen por WhatsApp <ArrowRight className="w-4 h-4" />
                </a>
                <Link href="/evaluacion-tdah-ninos"
                  className="inline-flex items-center justify-center gap-2 border border-primary-foreground/40 text-primary-foreground font-bold text-xs uppercase tracking-widest px-8 py-3.5 rounded-lg hover:bg-primary-foreground/10 transition-all">
                  Evaluación infantil (5–17) <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/evaluacion-tdah-adultos"
                  className="inline-flex items-center justify-center gap-2 border border-primary-foreground/40 text-primary-foreground font-bold text-xs uppercase tracking-widest px-8 py-3.5 rounded-lg hover:bg-primary-foreground/10 transition-all">
                  Evaluación adultos (18+) <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>

          {/* ── Relacionados ── */}
          <section className="py-16 px-6 bg-secondary border-t border-border">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-xl font-serif font-bold text-primary mb-8 text-center">También puede interesarte</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                <Link href="/evaluacion-tdah-ninos" className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary hover:shadow-md transition-all group">
                  <img
                    src="/blog/lavender-valoracion-tdah-infantil-640x400.svg"
                    alt="Valoración TDAH Infantil en Cancún"
                    width={640}
                    height={400}
                    className="w-full h-auto aspect-video object-cover rounded-t-xl"
                    loading="lazy"
                  />
                  <div className="p-5">
                    <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold block mb-2">Servicio</span>
                    <span className="font-bold text-primary text-sm group-hover:underline">Valoración TDAH Infantil en Cancún</span>
                    <span className="block text-xs text-muted-foreground mt-1 font-light">Niños de 5 a 17 años · $8,300 MXN</span>
                  </div>
                </Link>
                <Link href="/evaluacion-tdah-adultos" className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary hover:shadow-md transition-all group">
                  <img
                    src="/blog/lavender-valoracion-tdah-adultos-640x400.svg"
                    alt="Valoración TDAH Adultos en Cancún"
                    width={640}
                    height={400}
                    className="w-full h-auto aspect-video object-cover rounded-t-xl"
                    loading="lazy"
                  />
                  <div className="p-5">
                    <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold block mb-2">Servicio</span>
                    <span className="font-bold text-primary text-sm group-hover:underline">Valoración TDAH Adultos en Cancún</span>
                    <span className="block text-xs text-muted-foreground mt-1 font-light">Desde 18 años · $8,300 MXN</span>
                  </div>
                </Link>
                <Link href="/blog/cuanto-cuesta-valoracion-tdah-cancun" className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary hover:shadow-md transition-all group">
                  <img
                    src="/blog/sand-costo-de-la-valoracion-640x400.svg"
                    alt="¿Cuánto cuesta la valoración de TDAH en Cancún?"
                    width={640}
                    height={400}
                    className="w-full h-auto aspect-video object-cover rounded-t-xl"
                    loading="lazy"
                  />
                  <div className="p-5">
                    <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold block mb-2">Artículo</span>
                    <span className="font-bold text-primary text-sm group-hover:underline">¿Cuánto cuesta la valoración de TDAH en Cancún?</span>
                    <span className="block text-xs text-muted-foreground mt-1 font-light">Precios, qué incluye y cómo pagarlo</span>
                  </div>
                </Link>
              </div>
            </div>
          </section>

        </main>
        <Footer />
        <FloatingButtons />
      </div>
    </>
  );
}
