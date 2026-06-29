import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowRight, Heart, Users, BookOpen, Home, CheckCircle2, ChevronDown, Facebook, Link2, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import { WA_NUMBER } from '@/lib/contact';
import { SITE_URL, CEDULA, KAREN_IMAGE } from '@/lib/site';

const CANONICAL_URL = `${SITE_URL}/blog/resultado-positivo-autismo-que-sigue`;
const ARTICLE_HEADLINE = 'Mi hijo tiene autismo: ¿qué sigue después del diagnóstico TEA?';

const faqItems = [
  {
    q: '¿El autismo tiene cura?',
    a: 'No. El autismo (TEA) es una condición del neurodesarrollo, no una enfermedad que se cure. Lo que sí existe es intervención terapéutica que puede mejorar significativamente la calidad de vida, la comunicación y las habilidades de autonomía. La investigación muestra que la intervención temprana e intensiva produce los mejores resultados — no porque "cure" el autismo, sino porque el cerebro en desarrollo tiene mayor plasticidad para aprender nuevas formas de funcionar.',
  },
  {
    q: '¿A qué edad es mejor empezar la terapia?',
    a: 'Cuanto antes, mejor. Las intervenciones más eficaces se inician entre los 18 meses y los 5 años, cuando la plasticidad cerebral es mayor. Sin embargo, "tarde" no existe: los niños mayores, adolescentes y adultos también se benefician de intervención. Si tu hijo acaba de ser diagnosticado a los 8, 10 o 14 años, la terapia sigue siendo valiosa. El momento ideal para empezar es ahora.',
  },
  {
    q: '¿Qué pasa si la escuela no acepta las adecuaciones curriculares?',
    a: 'Las adecuaciones curriculares para alumnos con discapacidad o condición de salud están respaldadas por la Ley General de Educación y el marco de educación inclusiva de la SEP en México. Si la escuela se niega, puedes presentar el informe neuropsicológico formal a la Supervisión Escolar de la zona o a la Unidad de Servicios de Apoyo a la Educación Regular (USAER) asignada a la escuela. Un informe con cédula profesional federal tiene fuerza legal. Si persiste la negativa, puedes acudir a la Comisión Nacional para la Mejora Continua de la Educación (MEJOREDU) o a la autoridad educativa estatal.',
  },
  {
    q: '¿El nivel de apoyo puede cambiar?',
    a: 'Sí. Los niveles de apoyo (1, 2 y 3) describen las necesidades de soporte en un momento dado, no una característica fija de por vida. Con intervención terapéutica y educativa consistente, muchas personas reducen sus necesidades de apoyo con el tiempo. También puede ocurrir lo contrario en etapas de mayor exigencia (como la transición a secundaria o preparatoria). Por eso se recomienda re-evaluar periódicamente — generalmente cada 2 a 3 años.',
  },
  {
    q: '¿Hay grupos de apoyo para familias en Cancún?',
    a: 'Sí. Puedes consultar grupos de Facebook locales como "Padres de niños con autismo Cancún" o buscar a través de la Asociación Mexicana de Autismo (AUTISMO A.C.). El DIF municipal de Cancún también tiene programas de atención para personas con discapacidad. Pedir el número a Karen Trujillo en la sesión de devolución — ella puede orientarte sobre recursos específicos actualizados en Cancún y la Riviera Maya.',
  },
];

const nivelesApoyo = [
  {
    nivel: 'Nivel 1',
    antes: '"Asperger" o autismo de alto funcionamiento',
    desc: 'Necesita apoyo. La persona puede comunicarse con frases completas y funcionar en muchos contextos, pero enfrenta dificultades en situaciones sociales no estructuradas, cambios de rutina o transiciones. Los apoyos son más sutiles pero igualmente necesarios.',
    color: '#c6bce2',
  },
  {
    nivel: 'Nivel 2',
    antes: 'Autismo moderado',
    desc: 'Necesita apoyo sustancial. Las dificultades en comunicación e interacción social son evidentes incluso con apoyos. Los comportamientos repetitivos o la resistencia al cambio afectan el funcionamiento en varios contextos. Requiere intervención más estructurada.',
    color: '#f9dee3',
  },
  {
    nivel: 'Nivel 3',
    antes: 'Autismo severo',
    desc: 'Necesita apoyo muy sustancial. Las dificultades en comunicación son marcadas y los comportamientos inflexibles interfieren significativamente con el funcionamiento en todos los contextos. Puede requerir apoyo intensivo y sistemas de comunicación aumentativa.',
    color: '#f5e7d6',
  },
];

const tiposTerapia = [
  {
    nombre: 'ABA (Análisis Conductual Aplicado)',
    icon: CheckCircle2,
    cuandoUsar: 'Especialmente útil para enseñar habilidades específicas paso a paso y reducir conductas que interfieren con el aprendizaje. Es la intervención con más investigación detrás.',
    nota: 'El ABA moderno es naturalista y centrado en la motivación del niño — muy diferente de los enfoques más rígidos del pasado.',
  },
  {
    nombre: 'Denver (ESDM)',
    icon: Heart,
    cuandoUsar: 'Diseñado específicamente para niños pequeños (12 meses a 5 años). Combina principios ABA con desarrollo natural en contextos de juego. Es menos estructurado que el ABA clásico.',
    nota: 'Uno de los modelos con mayor evidencia para intervención temprana intensiva.',
  },
  {
    nombre: 'DIR/Floortime',
    icon: Users,
    cuandoUsar: 'Centrado en la relación y el afecto. El terapeuta (o el padre) sigue la iniciativa del niño para construir conexión y ampliar la comunicación desde el interés espontáneo.',
    nota: 'Muy complementario con otros enfoques. Excelente para trabajar la reciprocidad emocional y el vínculo.',
  },
  {
    nombre: 'Habilidades sociales',
    icon: BookOpen,
    cuandoUsar: 'Para niños mayores y adolescentes con Nivel 1. Trabaja en grupo la lectura de señales sociales, turnos de conversación, manejo del lenguaje figurado y navegación de situaciones sociales complejas.',
    nota: 'Más efectivo cuando se combina con práctica en contextos reales.',
  },
];

const accionesEnCasa = [
  {
    numero: '1',
    titulo: 'Establecer rutinas visuales',
    desc: 'Los niños con autismo procesan mejor la información cuando pueden anticipar lo que viene. Un tablero de pictogramas con la rutina del día (despertarse, desayuno, terapia, escuela, comida, tiempo libre, baño, dormir) reduce la ansiedad y los conflictos en transiciones.',
  },
  {
    numero: '2',
    titulo: 'Seguir los intereses del niño',
    desc: 'Los intereses intensos de un niño con autismo no son "obsesiones" que hay que corregir — son la puerta de entrada al aprendizaje y la conexión. Juega con él en su tema favorito. Usa su interés para introducir lenguaje nuevo, turnos de conversación y habilidades sociales.',
  },
  {
    numero: '3',
    titulo: 'Comunicarte con el equipo terapéutico',
    desc: 'Lo que pasa en casa importa tanto como lo que pasa en terapia. Comparte con el terapeuta las conductas que ves, los avances y los momentos difíciles. La consistencia entre el hogar y la terapia acelera el progreso.',
  },
];

const howToSteps = [
  { name: 'Leer y entender el informe', text: 'Revisar el diagnóstico, el nivel de apoyo y las recomendaciones específicas del neuropsicólogo.' },
  { name: 'Iniciar el proceso terapéutico', text: 'Contactar un terapeuta certificado en ABA, ESDM o DIR/Floortime según las necesidades del niño.' },
  { name: 'Informar a la escuela', text: 'Entregar el informe neuropsicológico a la dirección y solicitar reunión con el orientador para diseñar adecuaciones curriculares.' },
  { name: 'Hablar con tu hijo', text: 'Explicar el diagnóstico de forma adaptada a su edad y comprensión.' },
  { name: 'Implementar apoyos en casa', text: 'Establecer rutinas visuales, seguir sus intereses y coordinarse con el equipo terapéutico.' },
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Article', 'BlogPosting'],
      '@id': `${CANONICAL_URL}/#article`,
      headline: ARTICLE_HEADLINE,
      description: 'Recibir el diagnóstico de autismo puede generar alivio y angustia al mismo tiempo. Conoce los pasos concretos que siguen: qué significa el nivel de apoyo, qué terapias existen y cómo explicárselo a tu hijo.',
      image: `${SITE_URL}/blog/dark-despues-del-diagnostico-autismo-1200x675.png`,
      datePublished: '2026-08-11',
      dateModified: '2026-08-11',
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
        name: 'Trastorno del espectro autista',
        sameAs: 'https://www.wikidata.org/wiki/Q38404',
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
        { '@type': 'ListItem', position: 3, name: ARTICLE_HEADLINE, item: CANONICAL_URL },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqItems.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
    {
      '@type': 'HowTo',
      name: 'Qué hacer después del diagnóstico de autismo',
      description: 'Pasos concretos para familias que acaban de recibir el diagnóstico TEA de su hijo.',
      step: howToSteps.map((s, i) => ({
        '@type': 'HowToStep',
        position: i + 1,
        name: s.name,
        text: s.text,
      })),
    },
  ],
};

export default function ResultadoPositivoAutismoQueSigue() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [linkCopied, setLinkCopied] = useState(false);

  return (
    <>
      <Head>
        <title>Mi hijo tiene autismo: ¿qué sigue después del diagnóstico TEA? | Karen Trujillo</title>
        <meta name="description" content="Recibir el diagnóstico de autismo puede generar alivio y angustia al mismo tiempo. Conoce los pasos concretos que siguen: qué significa el nivel de apoyo, qué terapias existen y cómo explicárselo a tu hijo. Karen Trujillo, Cancún." />
        <link rel="canonical" href={CANONICAL_URL} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="es_MX" />
        <meta property="og:site_name" content="Neuropsicóloga Karen Trujillo" />
        <meta property="og:title" content="Mi hijo tiene autismo: ¿qué sigue después del diagnóstico TEA?" />
        <meta property="og:description" content="Recibir el diagnóstico de autismo puede generar alivio y angustia al mismo tiempo. Conoce los pasos concretos que siguen: niveles de apoyo, terapias, escuela y cómo hablar con tu hijo." />
        <meta property="og:url" content={CANONICAL_URL} />
        <meta property="og:image" content={`${SITE_URL}/blog/dark-despues-del-diagnostico-autismo-1200x675.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="675" />
        <meta property="og:image:alt" content="Karen Trujillo, neuropsicóloga en Cancún — qué sigue después del diagnóstico de autismo" />
        <meta property="article:author" content="Karen Trujillo" />
        <meta property="article:published_time" content="2026-08-11" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Mi hijo tiene autismo: ¿qué sigue después del diagnóstico TEA? | Karen Trujillo" />
        <meta name="twitter:description" content="Diagnóstico de autismo: qué significan los niveles de apoyo, qué terapias existen y cómo hablar con tu hijo. Guía práctica de Karen Trujillo, Cancún." />
        <meta name="twitter:image" content={`${SITE_URL}/blog/dark-despues-del-diagnostico-autismo-1200x675.png`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>
      <div className="antialiased selection:bg-accent-blue selection:text-primary pb-24 lg:pb-0">
        <Navbar />
        <main>
          {/* ── Hero ── */}
          <section className="relative pt-36 pb-16 px-6 overflow-hidden" style={{ background: '#2e2545' }}>
            <div aria-hidden="true" className="absolute top-0 right-0 w-[480px] h-[480px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(208,208,231,0.07) 0%, transparent 70%)' }} />
            <div aria-hidden="true" className="absolute bottom-0 left-0 w-[320px] h-[320px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(91,78,127,0.18) 0%, transparent 70%)' }} />
            <div className="max-w-3xl mx-auto relative z-10">
              <nav aria-label="Breadcrumb" className="mb-6">
                <ol className="flex items-center gap-2 text-xs flex-wrap" style={{ color: 'rgba(208,208,231,0.7)' }}>
                  <li><Link href="/" className="hover:text-[#c6bce2] transition-colors" style={{ color: 'rgba(208,208,231,0.7)' }}>Inicio</Link></li>
                  <li>/</li>
                  <li><Link href="/blog" className="hover:text-[#c6bce2] transition-colors" style={{ color: 'rgba(208,208,231,0.7)' }}>Blog</Link></li>
                  <li>/</li>
                  <li className="font-medium" style={{ color: '#c6bce2' }}>Después del diagnóstico de autismo</li>
                </ol>
              </nav>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <span className="inline-flex items-center px-3 py-1 rounded-full mb-4 text-xs font-bold uppercase tracking-widest" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#c6bce2' }}>
                  Guía Post-Diagnóstico
                </span>
                <h1 className="text-3xl md:text-5xl font-serif font-bold text-white leading-[1.15] mb-4">
                  Mi hijo tiene autismo: ¿qué sigue después del diagnóstico TEA?
                </h1>
                <p className="text-lg font-light leading-relaxed mb-6" style={{ color: 'rgba(208,208,231,0.82)' }}>
                  Recibir el diagnóstico puede sentirse como alivio y angustia al mismo tiempo. Es completamente normal. Este artículo explica qué viene ahora.
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs pt-4" style={{ color: 'rgba(208,208,231,0.75)', borderTop: '1px solid rgba(255,255,255,0.12)' }}>
                  <span style={{ color: 'rgba(208,208,231,0.95)' }}>Revisado por Karen Trujillo, Neuropsicóloga · Cédula {CEDULA}</span>
                  <time dateTime="2026-08-11">11 ago 2026</time>
                  <span>Cancún, Quintana Roo</span>
                </div>
              </motion.div>
            </div>
          </section>

          {/* ── Imagen destacada ── */}
          <section className="px-6 -mt-8 relative z-10">
            <div className="max-w-3xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <figure className="rounded-2xl overflow-hidden border border-border shadow-[0_20px_60px_-15px_rgba(67,56,96,0.25)]">
                  <img
                    src="/blog/dark-despues-del-diagnostico-autismo-1200x675.png"
                    alt="Qué sigue después del diagnóstico de autismo — imagen ilustrativa"
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

          {/* ── Cuerpo del artículo ── */}
          <section className="py-16 px-6 bg-card">
            <div className="max-w-3xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>

                {/* Las primeras 24 horas */}
                <h2 className="text-2xl font-serif font-bold text-primary mb-4">Las primeras 24 horas: es normal no saber cómo sentirse</h2>
                <p className="text-foreground font-light leading-relaxed mb-4">
                  Muchos padres describen el momento en que reciben el diagnóstico de autismo de su hijo como una mezcla de emociones que no encajan bien entre sí: alivio de que finalmente hay una explicación para lo que habían visto durante años, tristeza por lo que imaginaban para el futuro, incertidumbre sobre qué hacer ahora, y a veces culpa, aunque no hayan hecho nada mal.
                </p>
                <p className="text-foreground font-light leading-relaxed mb-8">
                  Todo eso es válido. El duelo frente a un diagnóstico — incluso cuando ese diagnóstico es una respuesta, no una sentencia — es una reacción humana normal. Date permiso de procesarlo. Lo que viene ahora no es urgente para las próximas horas; sí lo es para las próximas semanas.
                </p>

                {/* Entender el informe */}
                <h2 className="text-2xl font-serif font-bold text-primary mb-6">Entender el informe: qué significa el nivel de apoyo</h2>
                <p className="text-foreground font-light leading-relaxed mb-6">
                  El DSM-5 — el manual diagnóstico internacional — clasifica el TEA en tres niveles según las necesidades de apoyo de la persona. Es importante entender que el nivel describe el apoyo necesario hoy, no el potencial del niño ni su futuro.
                </p>
                <div className="grid gap-4 mb-8">
                  {nivelesApoyo.map((nivel) => (
                    <div key={nivel.nivel} className="p-5 rounded-xl border border-border" style={{ background: `${nivel.color}20` }}>
                      <div className="flex items-start gap-3 mb-2">
                        <span className="font-bold text-primary text-sm">{nivel.nivel}</span>
                        <span className="text-xs text-muted-foreground font-light italic">(antes llamado: {nivel.antes})</span>
                      </div>
                      <p className="text-sm text-foreground font-light leading-relaxed">{nivel.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="text-foreground font-light leading-relaxed mb-8">
                  El nivel de apoyo puede cambiar con el tiempo. La intervención terapéutica y educativa consistente produce diferencias reales en cómo una persona con autismo puede funcionar en el mundo.
                </p>

                {/* Qué hace la terapia */}
                <h2 className="text-2xl font-serif font-bold text-primary mb-6">Qué hace la terapia: diferencia entre enfoques</h2>
                <p className="text-foreground font-light leading-relaxed mb-6">
                  Hay varias líneas de intervención con evidencia para el TEA. No son mutuamente excluyentes — muchas familias combinan más de una. La elección depende de la edad del niño, su nivel de apoyo, sus áreas de mayor dificultad y la disponibilidad en tu zona.
                </p>
                <div className="grid gap-4 mb-8">
                  {tiposTerapia.map((terapia) => (
                    <div key={terapia.nombre} className="flex gap-4 p-5 bg-secondary rounded-xl border border-border">
                      <terapia.icon className="w-5 h-5 text-accent-blue shrink-0 mt-1" />
                      <div>
                        <p className="font-bold text-primary text-sm mb-1">{terapia.nombre}</p>
                        <p className="text-xs text-muted-foreground font-light leading-relaxed mb-2">{terapia.cuandoUsar}</p>
                        <p className="text-xs text-foreground/60 font-light italic">{terapia.nota}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* La escuela */}
                <h2 className="text-2xl font-serif font-bold text-primary mb-4">La escuela: cómo usar el informe para pedir adecuaciones</h2>
                <p className="text-foreground font-light leading-relaxed mb-4">
                  El informe neuropsicológico con diagnóstico formal de TEA es el documento que habilita a la escuela para implementar adecuaciones curriculares. En México, la Ley General de Educación reconoce el derecho a la educación inclusiva — pero es la familia quien debe activarlo presentando el informe.
                </p>
                <p className="text-foreground font-light leading-relaxed mb-4">
                  El proceso recomendado:
                </p>
                <ol className="space-y-3 mb-8">
                  {[
                    'Solicitar una reunión con la directora y la orientadora escolar — no solo con la maestra de grupo.',
                    'Entregar una copia del informe neuropsicológico y quedarse con el acuse de recibido.',
                    'Pedir que la escuela elabore un Plan Individual de Aprendizaje (PIA) o documento equivalente.',
                    'Preguntar si la escuela tiene USAER asignada (Unidad de Servicios de Apoyo a la Educación Regular) — si la tiene, solicitar evaluación por ese equipo.',
                    'Seguimiento por escrito (correo o WhatsApp documentado) cada mes.',
                  ].map((paso, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-foreground font-light leading-relaxed">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
                      {paso}
                    </li>
                  ))}
                </ol>

                {/* Cómo hablar con tu hijo */}
                <h2 className="text-2xl font-serif font-bold text-primary mb-4">Cómo hablar con tu hijo sobre el diagnóstico</h2>
                <p className="text-foreground font-light leading-relaxed mb-4">
                  No existe una única forma correcta, pero sí hay principios que funcionan: honestidad a la medida de su desarrollo, lenguaje positivo y enfocado en las diferencias (no en los defectos), y apertura a las preguntas.
                </p>
                <div className="grid gap-4 mb-8">
                  {[
                    { edad: '3 a 6 años', texto: 'A esta edad no se explica el "diagnóstico" — se trabaja en la terapia sin necesidad de ponerle nombre. Si el niño pregunta por qué va al terapeuta, "para aprender cosas nuevas" es suficiente. El trabajo en esta etapa es principalmente a través de los padres y los terapeutas.' },
                    { edad: '7 a 12 años', texto: '"Tu cerebro funciona de forma diferente a la de algunos niños, y eso tiene un nombre: autismo. Significa que aprendes de manera distinta, que algunas cosas son más difíciles para ti — como hacer amigos — y otras son más fáciles, como recordar detalles. Todos tenemos diferencias. Las tuyas tienen nombre, y hay personas que nos ayudan con ellas."' },
                    { edad: 'Adolescentes', texto: 'Los adolescentes merecen información más completa. Explica el diagnóstico, lo que significa y lo que no significa. Valida su experiencia pasada ("tiene sentido que las situaciones sociales se sintieran tan difíciles"). Comparte recursos: hay muchos adultos con autismo que escriben sobre su experiencia y pueden ser una fuente importante de identificación.' },
                  ].map((item) => (
                    <div key={item.edad} className="p-5 bg-secondary rounded-xl border border-border">
                      <p className="font-bold text-primary text-xs uppercase tracking-widest mb-2">{item.edad}</p>
                      <p className="text-sm text-foreground font-light leading-relaxed">{item.texto}</p>
                    </div>
                  ))}
                </div>

                {/* Qué hacer en casa */}
                <h2 className="text-2xl font-serif font-bold text-primary mb-6">Qué puede hacer la familia en casa desde hoy</h2>
                <div className="grid gap-4 mb-8">
                  {accionesEnCasa.map((accion) => (
                    <div key={accion.numero} className="flex gap-4 p-5 bg-secondary rounded-xl border border-border">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">{accion.numero}</span>
                      <div>
                        <p className="font-bold text-primary text-sm mb-1">{accion.titulo}</p>
                        <p className="text-xs text-muted-foreground font-light leading-relaxed">{accion.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* El diagnóstico no define */}
                <div className="bg-gradient-primary text-primary-foreground rounded-2xl p-8 mb-10 text-center">
                  <Home className="w-8 h-8 mx-auto mb-4 opacity-70" />
                  <h2 className="text-xl font-serif font-bold mb-3">El diagnóstico no define el futuro</h2>
                  <p className="text-primary-foreground/80 font-light leading-relaxed max-w-xl mx-auto text-sm">
                    El autismo no tiene un único destino. Lo que sí tiene son necesidades específicas — y cuando esas necesidades se atienden con intervención adecuada, apoyo familiar y un entorno educativo inclusivo, el margen de desarrollo es mucho más amplio de lo que muchas familias imaginan al principio.
                  </p>
                  <p className="text-primary-foreground/80 font-light leading-relaxed max-w-xl mx-auto text-sm mt-3">
                    Lo que importa ahora no es predecir el futuro, sino construir el plan.
                  </p>
                </div>

                {/* FAQ */}
                <h2 className="text-2xl font-serif font-bold text-primary mb-6">Preguntas frecuentes</h2>
                <div role="list" className="mb-10">
                  {faqItems.map((faq, i) => (
                    <div key={i} role="listitem" style={{ borderBottom: i < faqItems.length - 1 ? '1px solid rgba(91,78,127,0.15)' : 'none' }}>
                      <button
                        id={`faq-btn-${i}`}
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        aria-expanded={openFaq === i}
                        aria-controls={`faq-answer-${i}`}
                        className="w-full py-5 sm:py-6 flex justify-between items-center gap-4 text-left cursor-pointer"
                        style={{ background: 'none', border: 'none' }}
                      >
                        <span className="font-bold text-primary text-sm sm:text-base">{faq.q}</span>
                        <ChevronDown
                          className="w-5 h-5 shrink-0 text-muted-foreground"
                          style={{ transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}
                          aria-hidden="true"
                        />
                      </button>
                      <div
                        id={`faq-answer-${i}`}
                        role="region"
                        aria-labelledby={`faq-btn-${i}`}
                        className="grid transition-all duration-300"
                        style={{
                          gridTemplateRows: openFaq === i ? '1fr' : '0fr',
                          opacity: openFaq === i ? 1 : 0,
                        }}
                      >
                        <div className="overflow-hidden">
                          <p className="text-muted-foreground text-sm font-light leading-relaxed pb-5 sm:pb-6">{faq.a}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </motion.div>
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
              <h2 className="text-2xl md:text-3xl font-serif font-bold italic mb-4">¿Tienes preguntas sobre el diagnóstico de tu hijo?</h2>
              <p className="text-primary-foreground/80 font-light mb-8 max-w-xl mx-auto">
                La Neuropsicóloga Karen Trujillo realiza evaluaciones diagnósticas de TEA en Cancún y acompaña a las familias en el proceso completo — desde la evaluación hasta las recomendaciones post-diagnóstico.
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
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/evaluacion-autismo-cancun"
                  className="inline-flex items-center gap-2 bg-primary-foreground text-primary font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-lg hover:opacity-90 transition-all shadow-lg"
                >
                  Evaluación autismo en Cancún <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={`https://wa.me/${WA_NUMBER}?text=Hola%20Karen%2C%20le%C3%AD%20tu%20gu%C3%ADa%20sobre%20el%20diagn%C3%B3stico%20de%20autismo%20y%20tengo%20preguntas`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/10 text-primary-foreground font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-lg hover:bg-white/20 transition-all border border-white/20"
                >
                  Consultar por WhatsApp <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </section>

          {/* ── Artículos relacionados ── */}
          <section className="py-16 px-6 bg-secondary border-t border-border">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-xl font-serif font-bold text-primary mb-8 text-center">También puede interesarte</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                <Link href="/evaluacion-autismo-cancun" className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary hover:shadow-md transition-all group">
                  <img
                    src="/blog/blush-diagnostico-autismo-tea-640x400.svg"
                    alt="Diagnóstico Autismo (TEA) en Cancún"
                    width={640}
                    height={400}
                    className="w-full h-auto aspect-video object-cover rounded-t-xl"
                    loading="lazy"
                  />
                  <div className="p-5">
                    <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold block mb-2">Servicio</span>
                    <span className="font-bold text-primary text-sm group-hover:underline">Diagnóstico Autismo (TEA) en Cancún</span>
                    <span className="block text-xs text-muted-foreground mt-1 font-light">Evaluación con ADOS-2 y ADI-R</span>
                  </div>
                </Link>
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
                    <span className="block text-xs text-muted-foreground mt-1 font-light">Niños de 5 a 17 años</span>
                  </div>
                </Link>
                <Link href="/para-escuelas" className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary hover:shadow-md transition-all group">
                  <img
                    src="/blog/lavender-servicio-640x400.svg"
                    alt="Información para escuelas — evaluación neuropsicológica"
                    width={640}
                    height={400}
                    className="w-full h-auto aspect-video object-cover rounded-t-xl"
                    loading="lazy"
                  />
                  <div className="p-5">
                    <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold block mb-2">Recurso</span>
                    <span className="font-bold text-primary text-sm group-hover:underline">Para escuelas y orientadores</span>
                    <span className="block text-xs text-muted-foreground mt-1 font-light">Adecuaciones curriculares e informes</span>
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
