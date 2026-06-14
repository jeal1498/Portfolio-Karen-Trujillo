import Head from 'next/head';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, HelpCircle, DollarSign, Clock, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';

const WA = 'https://wa.me/529983211547?text=Hola%20Karen%2C%20le%C3%AD%20tu%20art%C3%ADculo%20sobre%20el%20costo%20de%20la%20evaluaci%C3%B3n%20de%20autismo%20y%20quisiera%20m%C3%A1s%20informaci%C3%B3n';

const detallesCosto = [
  {
    titulo: 'Entrevista clínica inicial (60-90 min)',
    descripcion: 'Con los padres o cuidadores para historial detallado del desarrollo',
  },
  {
    titulo: 'ADOS-2 (Autism Diagnostic Observation Schedule, 2ª ed.)',
    descripcion: 'El estándar de oro mundial para evaluar autismo — requiere formación certificada y materiales especializados',
  },
  {
    titulo: 'ADI-R (Autism Diagnostic Interview-Revised)',
    descripcion: 'Entrevista estructurada con cuidadores de 90-120 minutos',
  },
  {
    titulo: 'WISC-V',
    descripcion: 'Perfil cognitivo completo: 5 índices de inteligencia',
  },
  {
    titulo: 'Vineland-3 y SRS-2',
    descripcion: 'Evaluación de conducta adaptativa y habilidades sociales',
  },
  {
    titulo: 'Sesión de devolución con informe completo',
    descripcion: 'Explicación del diagnóstico, nivel de apoyo (1/2/3) y plan de intervención',
  },
];

const comparativa = [
  {
    opcion: 'Cuestionarios online o apps',
    precio: 'Gratuito – $500 MXN',
    ados: false as boolean | string,
    validez: false as boolean | string,
    nota: 'No son diagnóstico. Son herramientas de tamizaje sin validez clínica.',
  },
  {
    opcion: 'Consulta psiquiátrica básica',
    precio: '$800 – $2,000 MXN',
    ados: false as boolean | string,
    validez: 'Parcial' as boolean | string,
    nota: 'Puede orientar pero generalmente no incluye ADOS-2 ni instrumentos estandarizados completos.',
  },
  {
    opcion: 'Hospital público (IMSS/ISSSTE)',
    precio: 'Gratuito (con seguro)',
    ados: 'Variable' as boolean | string,
    validez: 'Sí' as boolean | string,
    nota: 'Lista de espera de meses a años. Cobertura geográfica limitada en Quintana Roo.',
  },
  {
    opcion: 'Evaluación neuropsicológica completa con ADOS-2 (Karen Trujillo)',
    precio: '$8,500 MXN',
    ados: true as boolean | string,
    validez: true as boolean | string,
    nota: 'ADOS-2 + ADI-R + WISC-V + Vineland-3 + SRS-2. Informe con validez SEP, IMSS, instituciones.',
  },
];

const faqItems = [
  {
    q: '¿Cuánto cuesta el diagnóstico de autismo en Cancún?',
    a: 'La evaluación neuropsicológica completa de Autismo/TEA en el consultorio de Karen Trujillo en Cancún cuesta $8,500 MXN. Incluye todas las sesiones del proceso (5-6 citas), los instrumentos estandarizados internacionales (ADOS-2, ADI-R, WISC-V, Vineland-3, SRS-2), el informe clínico completo y la sesión de devolución con los padres o cuidadores.',
  },
  {
    q: '¿Por qué la evaluación de autismo cuesta más que la de TDAH?',
    a: 'La evaluación de TEA incluye más instrumentos especializados — principalmente el ADOS-2, cuya aplicación requiere formación certificada específica, materiales propietarios y entre 45 y 60 minutos de aplicación por sí solo. También incluye el ADI-R, una entrevista estructurada de 90-120 minutos. En total, el proceso de autismo requiere 5-6 sesiones (vs. 4-5 para TDAH), lo que justifica la diferencia de $1,500 MXN.',
  },
  {
    q: '¿Se puede pagar en parcialidades?',
    a: 'Sí. El costo total de $8,500 MXN se distribuye a lo largo de las sesiones del proceso. Al inicio se solicita un depósito de $1,500 MXN para apartar la cita. El resto se divide en los pagos durante las sesiones. Karen lo explica con detalle al hacer el primer contacto.',
  },
  {
    q: '¿El informe tiene validez oficial?',
    a: 'Sí. El informe de evaluación de TEA emitido por la neuropsicóloga Karen Trujillo (cédula federal 11009616) tiene validez oficial ante escuelas, SEP, IMSS, ISSSTE y empleadores. Incluye diagnóstico formal según DSM-5, nivel de apoyo requerido (1, 2 o 3), perfil cognitivo y recomendaciones de intervención.',
  },
  {
    q: '¿Qué pasa si no hacemos la evaluación?',
    a: 'Sin un diagnóstico formal, los niños con TEA pierden acceso a adecuaciones curriculares, apoyos escolares y terapias especializadas que podrían marcar una diferencia significativa en su desarrollo. Los adultos con TEA no diagnosticado frecuentemente acumulan años de incomprensión, diagnósticos erróneos y estrategias de afrontamiento que no abordan la causa real.',
  },
  {
    q: '¿A partir de qué edad se puede evaluar?',
    a: 'La evaluación de TEA con ADOS-2 y los instrumentos que utilizamos está diseñada principalmente para niños mayores de 4 años y adolescentes. Para niños más pequeños (2-4 años) existen evaluaciones específicas del desarrollo temprano. Karen aclara el proceso adecuado para cada edad al hacer el primer contacto.',
  },
  {
    q: '¿En cuánto tiempo están los resultados?',
    a: 'El proceso completo toma entre 3 y 4 semanas desde la primera cita, repartidas en 5-6 sesiones. Después de la última sesión de evaluación, Karen toma 5-7 días hábiles para el análisis clínico y la elaboración del informe. La sesión de devolución donde se presentan los resultados se agenda al finalizar ese período.',
  },
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Article', 'BlogPosting'],
      '@id': 'https://www.psicologakarentrujillo.com.mx/blog/cuanto-cuesta-evaluacion-autismo-mexico/#article',
      headline: '¿Cuánto cuesta una evaluación de autismo en México?',
      description: 'La evaluación de autismo (TEA) con ADOS-2 en Cancún cuesta $8,500 MXN e incluye 5-6 sesiones, informe clínico completo y validez ante SEP e IMSS. Precio transparente, sin letra chica.',
      image: 'https://www.psicologakarentrujillo.com.mx/Psicologa_Karen_Trujillo.webp',
      datePublished: '2026-06-02',
      dateModified: '2026-06-02',
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
      mainEntityOfPage: 'https://www.psicologakarentrujillo.com.mx/blog/cuanto-cuesta-evaluacion-autismo-mexico',
      inLanguage: 'es-MX',
      about: {
        '@type': 'MedicalCondition',
        name: 'Trastorno del espectro autista',
        sameAs: 'https://www.wikidata.org/wiki/Q38404',
      },
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['#precio-directo', '#que-incluye', '#comparativa'],
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.psicologakarentrujillo.com.mx' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.psicologakarentrujillo.com.mx/blog' },
        { '@type': 'ListItem', position: 3, name: '¿Cuánto cuesta una evaluación de autismo en México?', item: 'https://www.psicologakarentrujillo.com.mx/blog/cuanto-cuesta-evaluacion-autismo-mexico' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqItems.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ],
};

export default function CuantoCuestaEvaluacionAutismo() {
  return (
    <>
      <Head>
        <title>¿Cuánto cuesta una evaluación de autismo en México? | Karen Trujillo Cancún</title>
        <meta name="description" content="La evaluación de autismo (TEA) con ADOS-2 en Cancún cuesta $8,500 MXN e incluye 5-6 sesiones, informe clínico completo y validez ante SEP e IMSS. Precio transparente, sin letra chica." />
        <link rel="canonical" href="https://www.psicologakarentrujillo.com.mx/blog/cuanto-cuesta-evaluacion-autismo-mexico" />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="es_MX" />
        <meta property="og:site_name" content="Neuropsicóloga Karen Trujillo" />
        <meta property="og:title" content="¿Cuánto cuesta el diagnóstico de autismo en México?" />
        <meta property="og:description" content="La evaluación de autismo (TEA) con ADOS-2 en Cancún cuesta $8,500 MXN e incluye 5-6 sesiones, informe clínico completo y validez ante SEP e IMSS. Precio transparente, sin letra chica." />
        <meta property="og:url" content="https://www.psicologakarentrujillo.com.mx/blog/cuanto-cuesta-evaluacion-autismo-mexico" />
        <meta property="og:image" content="https://www.psicologakarentrujillo.com.mx/Psicologa_Karen_Trujillo.webp" />
        <meta property="og:image:alt" content="Karen Trujillo, neuropsicóloga en Cancún — evaluación de autismo TEA" />
        <meta property="article:author" content="Karen Trujillo" />
        <meta property="article:published_time" content="2026-06-02" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="¿Cuánto cuesta el diagnóstico de autismo en México? | Karen Trujillo" />
        <meta name="twitter:description" content="Evaluación TEA con ADOS-2 en Cancún: $8,500 MXN. Todo incluido, sin letra chica. Informe con validez SEP e IMSS." />
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
                  <li className="text-primary font-medium">Costo evaluación autismo</li>
                </ol>
              </nav>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <span className="inline-flex items-center px-3 py-1 rounded-full border border-accent-blue/20 bg-accent-blue/10 text-xs font-bold uppercase tracking-widest mb-4 text-primary">
                  Autismo / TEA — Precios y proceso
                </span>
                <h1 className="text-3xl md:text-5xl font-serif font-bold text-primary leading-[1.15] mb-4">
                  ¿Cuánto cuesta una evaluación de autismo en México?
                </h1>
                <p className="text-muted-foreground text-lg font-light leading-relaxed mb-6">
                  Precio real, sin letra chica. Lo que incluye, cuántas sesiones son y por qué cuesta lo que cuesta. Porque tomar esta decisión merece información completa.
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground border-t border-border pt-4">
                  <span>Neuropsicóloga Karen Trujillo — Cédula 11009616</span>
                  <span>Cancún, Quintana Roo</span>
                  <span>8 min de lectura</span>
                </div>
              </motion.div>
            </div>
          </section>

          {/* ── Precio directo ── */}
          <section id="precio-directo" className="py-16 px-6 bg-card">
            <div className="max-w-3xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <h2 className="text-2xl font-serif font-bold text-primary mb-4">El precio de la evaluación de autismo en Cancún</h2>
                <p className="text-muted-foreground font-light leading-relaxed mb-8">
                  La evaluación de Trastorno del Espectro Autista (TEA) es un proceso más extenso que otras valoraciones neuropsicológicas porque requiere instrumentos especializados —principalmente el ADOS-2— que demandan formación certificada, materiales propietarios y un tiempo de aplicación considerable. Aquí está el precio completo, sin sorpresas.
                </p>

                {/* Price highlight box */}
                <div className="bg-secondary border-2 border-primary rounded-2xl p-8 text-center mb-8">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-2">Costo total de la evaluación TEA</p>
                  <p className="text-5xl md:text-6xl font-serif font-bold text-primary mb-2">$8,500 MXN</p>
                  <p className="text-sm text-muted-foreground font-light">Todo incluido — sin cargos adicionales por sesión o informe</p>
                </div>

                {/* Stats cards */}
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="bg-secondary border border-border rounded-xl p-5 text-center">
                    <Clock className="w-6 h-6 text-accent-blue mx-auto mb-2" />
                    <p className="font-bold text-primary text-sm">5-6 sesiones presenciales</p>
                    <p className="text-xs text-muted-foreground font-light mt-1">Distribuidas a lo largo del proceso</p>
                  </div>
                  <div className="bg-secondary border border-border rounded-xl p-5 text-center">
                    <DollarSign className="w-6 h-6 text-accent-blue mx-auto mb-2" />
                    <p className="font-bold text-primary text-sm">3-4 semanas de proceso</p>
                    <p className="text-xs text-muted-foreground font-light mt-1">Desde la primera cita hasta los resultados</p>
                  </div>
                  <div className="bg-secondary border border-border rounded-xl p-5 text-center">
                    <FileText className="w-6 h-6 text-accent-blue mx-auto mb-2" />
                    <p className="font-bold text-primary text-sm">Informe con validez oficial</p>
                    <p className="text-xs text-muted-foreground font-light mt-1">Válido ante SEP, IMSS e instituciones</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* ── Qué incluye ── */}
          <section id="que-incluye" className="py-16 px-6 bg-secondary">
            <div className="max-w-3xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <h2 className="text-2xl font-serif font-bold text-primary mb-4">¿Qué incluye el costo?</h2>
                <p className="text-muted-foreground font-light leading-relaxed mb-8">
                  Los $8,500 MXN cubren todo el proceso de evaluación de principio a fin. No hay cargos adicionales por sesión, por la aplicación de instrumentos ni por el informe. Esto es lo que está incluido:
                </p>
                <div className="space-y-4">
                  {detallesCosto.map((item, i) => (
                    <div key={i} className="bg-card border border-border rounded-xl p-5">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-primary text-sm mb-1">{item.titulo}</p>
                          <p className="text-xs text-muted-foreground font-light leading-relaxed">{item.descripcion}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* ── Por qué el ADOS-2 importa ── */}
          <section className="py-16 px-6 bg-card">
            <div className="max-w-3xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <h2 className="text-2xl font-serif font-bold text-primary mb-4">Por qué el ADOS-2 cambia el resultado</h2>
                <p className="text-muted-foreground font-light leading-relaxed mb-4">
                  El ADOS-2 (Autism Diagnostic Observation Schedule, Segunda Edición) es el instrumento de referencia internacional para el diagnóstico de autismo. No es un cuestionario: es una observación estructurada y semiestructurada donde el evaluador crea situaciones específicas para observar directamente las habilidades de comunicación social, el juego, el lenguaje y los comportamientos repetitivos.
                </p>
                <p className="text-muted-foreground font-light leading-relaxed mb-4">
                  A diferencia de las escalas que se basan únicamente en el reporte de los padres, el ADOS-2 aporta datos observacionales directos del niño o adolescente. Esta combinación —lo que los cuidadores reportan y lo que el evaluador observa— es la que permite un diagnóstico con la mayor solidez clínica disponible hoy.
                </p>
                <div className="bg-secondary border border-border rounded-xl p-6 mt-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent-blue shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground leading-relaxed">
                      <strong>Importante:</strong> Un diagnóstico de TEA basado únicamente en cuestionarios o en entrevista clínica sin ADOS-2 puede tener limitaciones para ser reconocido por escuelas, instituciones de salud o apoyos especializados. El ADOS-2 es lo que hace que el informe tenga el peso clínico que la familia necesita.
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground font-light leading-relaxed mt-6">
                  La aplicación del ADOS-2 requiere formación certificada específica y materiales propietarios que tienen un costo de adquisición significativo. Esto explica en parte por qué la evaluación de TEA es más costosa que otras valoraciones neuropsicológicas — y por qué vale la pena ese costo cuando el diagnóstico es lo que una familia necesita para acceder a los apoyos correctos.
                </p>
              </motion.div>
            </div>
          </section>

          {/* ── Comparativa ── */}
          <section id="comparativa" className="py-16 px-6 bg-secondary">
            <div className="max-w-3xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <h2 className="text-2xl font-serif font-bold text-primary mb-4">¿Hay opciones más baratas? Una comparativa honesta</h2>
                <p className="text-muted-foreground font-light leading-relaxed mb-8">
                  Es una pregunta válida. Antes de elegir, conviene entender qué ofrece cada opción — y qué no ofrece. Esta tabla resume las alternativas disponibles en México con honestidad.
                </p>
                <div className="overflow-x-auto rounded-xl border border-border">
                  <table className="w-full text-sm">
                    <thead className="bg-card border-b border-border">
                      <tr>
                        <th className="text-left p-4 font-bold text-primary text-xs">Opción</th>
                        <th className="text-left p-4 font-bold text-primary text-xs">Precio</th>
                        <th className="text-left p-4 font-bold text-primary text-xs">ADOS-2</th>
                        <th className="text-left p-4 font-bold text-primary text-xs">Validez oficial</th>
                        <th className="text-left p-4 font-bold text-primary text-xs hidden sm:table-cell">Nota</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparativa.map((row, i) => (
                        <tr key={i} className={`border-b border-border last:border-0 ${i === comparativa.length - 1 ? 'bg-accent-blue/5' : 'bg-card'}`}>
                          <td className="p-4 font-medium text-primary text-xs leading-snug">{row.opcion}</td>
                          <td className="p-4 text-muted-foreground text-xs font-light">{row.precio}</td>
                          <td className="p-4 text-xs">
                            {row.ados === true && <span className="text-success font-bold">Sí</span>}
                            {row.ados === false && <span className="text-rose-500 font-bold">No</span>}
                            {typeof row.ados === 'string' && <span className="text-muted-foreground font-light">{row.ados}</span>}
                          </td>
                          <td className="p-4 text-xs">
                            {row.validez === true && <span className="text-success font-bold">Sí</span>}
                            {row.validez === false && <span className="text-rose-500 font-bold">No</span>}
                            {typeof row.validez === 'string' && <span className="text-muted-foreground font-light">{row.validez}</span>}
                          </td>
                          <td className="p-4 text-xs text-muted-foreground font-light leading-snug hidden sm:table-cell">{row.nota}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-muted-foreground font-light mt-4 leading-relaxed">
                  Las opciones públicas son válidas cuando están disponibles. Si el tiempo de espera es largo o la cobertura geográfica no alcanza, la evaluación privada puede ser la vía más directa hacia los apoyos que la persona necesita.
                </p>
              </motion.div>
            </div>
          </section>

          {/* ── Pago ── */}
          <section className="py-16 px-6 bg-card">
            <div className="max-w-3xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <h2 className="text-2xl font-serif font-bold text-primary mb-4">¿Cómo se paga?</h2>
                <p className="text-muted-foreground font-light leading-relaxed mb-6">
                  El pago no es de golpe. Los $8,500 MXN se distribuyen a lo largo de las sesiones del proceso de evaluación. Para apartar la primera cita se solicita un depósito inicial de <strong className="text-primary">$1,500 MXN</strong>. El resto se divide en los pagos correspondientes a cada sesión.
                </p>
                <div className="bg-secondary border border-border rounded-xl p-6 mb-8">
                  <p className="text-sm text-foreground leading-relaxed mb-3">
                    Si tienes preguntas sobre la forma de pago, los métodos aceptados o quieres entender el proceso antes de comprometerte, puedes escribirle directamente a Karen. No hay presión — la primera conversación es para que tengas la información que necesitas.
                  </p>
                  <a
                    href={WA}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-lg hover:opacity-90 transition-all"
                  >
                    Preguntar sobre el proceso y el pago <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            </div>
          </section>

          {/* ── FAQ ── */}
          <section className="py-16 px-6 bg-secondary">
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
              <h2 className="text-2xl md:text-3xl font-serif font-bold italic mb-4">¿Quieres saber si es el momento de evaluar?</h2>
              <p className="text-primary-foreground/80 font-light mb-8 max-w-xl mx-auto">
                No tienes que decidir solo. Karen Trujillo (cédula federal 11009616) puede orientarte sobre si la evaluación es el paso adecuado para tu hijo o familiar, sin compromiso.
              </p>
              <a
                href={WA}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-primary-foreground text-primary font-bold text-xs uppercase tracking-widest px-8 py-3.5 rounded-lg hover:opacity-90 transition-all"
              >
                Escribir a Karen por WhatsApp <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </section>

          {/* ── Relacionados ── */}
          <section className="py-16 px-6 bg-secondary border-t border-border">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-xl font-serif font-bold text-primary mb-8 text-center">También puede interesarte</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                <Link href="/evaluacion-autismo-cancun" className="p-5 bg-card border border-border rounded-xl hover:border-primary hover:shadow-md transition-all group">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold block mb-2">Servicio</span>
                  <span className="font-bold text-primary text-sm group-hover:underline">Evaluación de Autismo en Cancún</span>
                  <span className="block text-xs text-muted-foreground mt-1 font-light">ADOS-2 + informe clínico completo · $8,500 MXN</span>
                </Link>
                <Link href="/blog/que-es-ados-2-autismo" className="p-5 bg-card border border-border rounded-xl hover:border-primary hover:shadow-md transition-all group">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold block mb-2">Artículo</span>
                  <span className="font-bold text-primary text-sm group-hover:underline">¿Qué es el ADOS-2 y para qué sirve?</span>
                  <span className="block text-xs text-muted-foreground mt-1 font-light">El estándar de oro en diagnóstico de autismo</span>
                </Link>
                <Link href="/blog/tdah-vs-ansiedad-diferencias" className="p-5 bg-card border border-border rounded-xl hover:border-primary hover:shadow-md transition-all group">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold block mb-2">Artículo</span>
                  <span className="font-bold text-primary text-sm group-hover:underline">TDAH vs. ansiedad: cómo diferenciarlos</span>
                  <span className="block text-xs text-muted-foreground mt-1 font-light">Síntomas que se parecen pero tienen origen diferente</span>
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
