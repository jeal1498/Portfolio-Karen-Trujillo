import Head from 'next/head';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, AlertTriangle, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';

const WA = 'https://wa.me/529983211547?text=Hola%20Karen%2C%20le%C3%AD%20tu%20gu%C3%ADa%20sobre%20evaluaci%C3%B3n%20de%20TDAH%20en%20Canc%C3%BAn%20y%20quisiera%20m%C3%A1s%20informaci%C3%B3n';

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
    a: 'La neuropsicóloga Karen Trujillo (cédula 11009616) realiza evaluaciones neuropsicológicas de TDAH en su consultorio ubicado en SM200 M49 L2, Hacienda de Chinconcuac, Cancún, Quintana Roo. Atiende niños de 5-17 años y adultos de 18 en adelante. El proceso toma 2-3 semanas (4-5 sesiones) y el informe tiene validez oficial ante SEP, IMSS e instituciones.',
  },
  {
    q: '¿Cuánto cuesta una evaluación de TDAH en Cancún?',
    a: 'La evaluación neuropsicológica de TDAH en el consultorio de Karen Trujillo cuesta $7,000 MXN, tanto para niños (5-17 años) como para adultos (18+). El pago se distribuye a lo largo de las sesiones del proceso. Se solicita un depósito de $1,000 MXN para apartar la primera cita.',
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
      '@id': 'https://www.psicologakarentrujillo.com.mx/blog/donde-evaluar-tdah-cancun/#article',
      headline: 'Dónde evaluar TDAH en Cancún: qué buscar (y qué evitar)',
      description: 'Guía completa para elegir dónde evaluar TDAH en Cancún. Qué instrumentos debe incluir, qué señales de alerta evitar y cómo es el proceso en el consultorio de Karen Trujillo (cédula 11009616).',
      image: 'https://www.psicologakarentrujillo.com.mx/Psicologa_Karen_Trujillo.webp',
      datePublished: '2026-06-03',
      dateModified: '2026-06-03',
      author: {
        '@type': 'Person',
        '@id': 'https://www.psicologakarentrujillo.com.mx/#physician',
        name: 'Karen Trujillo',
        jobTitle: 'Neuropsicóloga Clínica',
        url: 'https://www.psicologakarentrujillo.com.mx',
      },
      publisher: {
        '@type': 'Organization',
        '@id': 'https://www.psicologakarentrujillo.com.mx/#clinic',
        name: 'Neuropsicóloga Karen Trujillo',
        url: 'https://www.psicologakarentrujillo.com.mx',
      },
      mainEntityOfPage: 'https://www.psicologakarentrujillo.com.mx/blog/donde-evaluar-tdah-cancun',
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
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.psicologakarentrujillo.com.mx' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.psicologakarentrujillo.com.mx/blog' },
        { '@type': 'ListItem', position: 3, name: 'Dónde evaluar TDAH en Cancún', item: 'https://www.psicologakarentrujillo.com.mx/blog/donde-evaluar-tdah-cancun' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqItems.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ],
};

export default function DondeEvaluarTDAHCancun() {
  return (
    <>
      <Head>
        <title>Dónde evaluar TDAH en Cancún: guía para elegir bien | Karen Trujillo</title>
        <meta name="description" content="Guía completa para elegir dónde evaluar TDAH en Cancún. Qué instrumentos debe incluir, qué señales de alerta evitar y cómo es el proceso en el consultorio de Karen Trujillo (cédula 11009616)." />
        <link rel="canonical" href="https://www.psicologakarentrujillo.com.mx/blog/donde-evaluar-tdah-cancun" />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="es_MX" />
        <meta property="og:site_name" content="Neuropsicóloga Karen Trujillo" />
        <meta property="og:title" content="Dónde evaluar TDAH en Cancún: qué buscar (y qué evitar)" />
        <meta property="og:description" content="Ya decidiste que quieres una evaluación. Ahora la pregunta es: ¿cómo elegir bien? Criterios concretos, señales de alerta y el proceso paso a paso." />
        <meta property="og:url" content="https://www.psicologakarentrujillo.com.mx/blog/donde-evaluar-tdah-cancun" />
        <meta property="og:image" content="https://www.psicologakarentrujillo.com.mx/Psicologa_Karen_Trujillo.webp" />
        <meta property="og:image:alt" content="Karen Trujillo, neuropsicóloga en Cancún — guía evaluación TDAH" />
        <meta property="article:author" content="Karen Trujillo" />
        <meta property="article:published_time" content="2026-06-03" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Dónde evaluar TDAH en Cancún: guía para elegir bien | Karen Trujillo" />
        <meta name="twitter:description" content="Criterios concretos, señales de alerta y el proceso paso a paso para elegir bien dónde evaluar TDAH en Cancún." />
        <meta name="twitter:image" content="https://www.psicologakarentrujillo.com.mx/Psicologa_Karen_Trujillo.webp" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>

      <div className="antialiased selection:bg-accent-blue selection:text-primary w-full min-w-0 overflow-x-hidden">
        <Navbar />
        <main>

          {/* ── Hero ── */}
          <section className="relative pt-36 pb-16 px-6 overflow-hidden bg-soft-gradient">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-blue/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 animate-pulse" />
            <div className="max-w-3xl mx-auto relative z-10">
              <nav aria-label="Breadcrumb" className="mb-6">
                <ol className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
                  <li><Link href="/" className="hover:text-primary transition-colors">Inicio</Link></li>
                  <li>/</li>
                  <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
                  <li>/</li>
                  <li className="text-primary font-medium">Dónde evaluar TDAH en Cancún</li>
                </ol>
              </nav>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <span className="inline-flex items-center px-3 py-1 rounded-full border border-accent-blue/20 bg-accent-blue/10 text-[10px] font-bold uppercase tracking-widest mb-4 text-primary">
                  Guía local · Cancún
                </span>
                <h1 className="text-3xl md:text-5xl font-serif font-bold text-primary leading-[1.15] mb-4">
                  Dónde evaluar TDAH en Cancún: qué buscar (y qué evitar)
                </h1>
                <p className="text-muted-foreground text-lg font-light leading-relaxed mb-6">
                  Ya decidiste que quieres una evaluación. Ahora la pregunta es: ¿cómo elegir bien? Esta guía te da los criterios concretos.
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground border-t border-border pt-4">
                  <span>Neuropsicóloga Karen Trujillo — Cédula 11009616</span>
                  <span>Cancún, Quintana Roo</span>
                  <span>7 min de lectura</span>
                </div>
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

          {/* ── Señales de alerta ── */}
          <section className="py-16 px-6 bg-secondary">
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
                    <p className="text-xl font-bold text-primary mb-1">$7,000 MXN</p>
                    <p className="text-xs text-muted-foreground font-light">Costo total de la evaluación</p>
                  </div>
                  <div className="bg-secondary border border-border rounded-xl p-5 text-center">
                    <p className="text-xl font-bold text-primary mb-1">2-3 semanas</p>
                    <p className="text-xs text-muted-foreground font-light">Duración del proceso completo</p>
                  </div>
                  <div className="bg-secondary border border-border rounded-xl p-5 text-center">
                    <p className="text-xl font-bold text-primary mb-1">Cédula 11009616</p>
                    <p className="text-xs text-muted-foreground font-light">Habilitación federal SEP</p>
                  </div>
                </div>
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
              <div className="space-y-3">
                {faqItems.map((faq, i) => (
                  <details key={i} className="group bg-card border-2 border-border hover:border-accent-blue rounded-xl transition-all open:border-primary open:shadow-lg">
                    <summary className="p-5 font-bold text-primary cursor-pointer list-none flex justify-between items-center gap-4 text-sm">
                      <span>{faq.q}</span>
                      <span className="text-muted-foreground shrink-0 group-open:rotate-45 transition-transform text-xl leading-none">+</span>
                    </summary>
                    <p className="px-5 pb-5 text-muted-foreground text-sm font-light leading-relaxed">{faq.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* ── CTA ── */}
          <section className="py-16 px-6 bg-gradient-primary text-primary-foreground">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-serif font-bold italic mb-4">¿Listo para agendar?</h2>
              <p className="text-primary-foreground/80 font-light mb-8 max-w-xl mx-auto">
                Karen Trujillo es neuropsicóloga clínica con cédula federal 11009616, especializada en evaluación de TDAH en Cancún. Atiende niños de 5-17 años y adultos. El informe tiene validez oficial ante SEP, IMSS e instituciones.
              </p>
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
                <Link href="/evaluacion-tdah-ninos" className="p-5 bg-card border border-border rounded-xl hover:border-primary hover:shadow-md transition-all group">
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold block mb-2">Servicio</span>
                  <span className="font-bold text-primary text-sm group-hover:underline">Valoración TDAH Infantil en Cancún</span>
                  <span className="block text-xs text-muted-foreground mt-1 font-light">Niños de 5 a 17 años · $7,000 MXN</span>
                </Link>
                <Link href="/evaluacion-tdah-adultos" className="p-5 bg-card border border-border rounded-xl hover:border-primary hover:shadow-md transition-all group">
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold block mb-2">Servicio</span>
                  <span className="font-bold text-primary text-sm group-hover:underline">Valoración TDAH Adultos en Cancún</span>
                  <span className="block text-xs text-muted-foreground mt-1 font-light">Desde 18 años · $7,000 MXN</span>
                </Link>
                <Link href="/blog/cuanto-cuesta-valoracion-tdah-cancun" className="p-5 bg-card border border-border rounded-xl hover:border-primary hover:shadow-md transition-all group">
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold block mb-2">Artículo</span>
                  <span className="font-bold text-primary text-sm group-hover:underline">¿Cuánto cuesta la valoración de TDAH en Cancún?</span>
                  <span className="block text-xs text-muted-foreground mt-1 font-light">Precios, qué incluye y cómo pagarlo</span>
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
