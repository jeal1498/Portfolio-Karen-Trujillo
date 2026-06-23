import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, DollarSign, Calendar, FileText, Shield, ChevronDown, Facebook, Link2, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import { WA_NUMBER } from '@/lib/contact';
import { SITE_URL, CEDULA, KAREN_IMAGE } from '@/lib/site';

const CANONICAL_URL = `${SITE_URL}/blog/cuanto-cuesta-valoracion-tdah-cancun`;
const ARTICLE_HEADLINE = '¿Cuánto cuesta una valoración de TDAH en Cancún?';

const faqItems = [
  { q: '¿Cuánto cuesta una valoración de TDAH en Cancún?', a: `La valoración neuropsicológica de TDAH en Cancún con la Neuropsicóloga Karen Trujillo tiene un costo de $8,300 pesos mexicanos (MXN). Este precio incluye todas las sesiones del proceso (4 a 5 citas), la aplicación de instrumentos estandarizados internacionales, el análisis clínico y el informe final con cédula federal ${CEDULA}.` },
  { q: '¿Se puede pagar la valoración de TDAH en parcialidades?', a: 'Sí. El pago se puede distribuir a lo largo de las sesiones del proceso de valoración, que se extienden entre 2 y 3 semanas.' },
  { q: '¿Por qué una valoración de TDAH cuesta $8,300 pesos?', a: 'El costo refleja el uso de instrumentos estandarizados internacionales (como CONNERS-3, WISC-V y BRIEF-2 para niños, o CAARS y DIVA 2.0 para adultos), que tienen un costo de aplicación y de actualización clínica. Además incluye 4 a 5 sesiones de trabajo directo con el paciente y la familia, análisis de resultados y elaboración del informe clínico con validez oficial.' },
  { q: '¿El informe de valoración de TDAH tiene validez ante la escuela o el IMSS?', a: `Sí. El informe emitido por la Neuropsicóloga Karen Trujillo está respaldado por cédula profesional federal ${CEDULA} y tiene validez ante instituciones educativas, SEP, IMSS y dependencias gubernamentales.` },
  { q: '¿Qué pasa si solo quiero una opinión rápida sobre si mi hijo tiene TDAH?', a: 'Una valoración neuropsicológica no es una opinión: es un diagnóstico clínico fundamentado en datos objetivos. No existe un atajo confiable al proceso completo. Diagnósticos rápidos sin instrumentos estandarizados no tienen validez oficial.' },
  { q: '¿La valoración de TDAH en Cancún es presencial o puede ser online?', a: 'La valoración de TDAH requiere sesiones presenciales en Cancún, Quintana Roo, ya que implica la aplicación directa de pruebas estandarizadas que no pueden realizarse de forma remota con la misma validez clínica.' },
];

const loQueIncluye = [
  { icon: Calendar, label: '4 a 5 sesiones clínicas', desc: 'Entrevista inicial, aplicación de pruebas, cuestionarios y sesión de devolución.' },
  { icon: FileText, label: 'Informe clínico completo', desc: 'Diagnóstico diferencial, perfil neuropsicológico y plan de intervención.' },
  { icon: Shield, label: `Validez oficial (cédula ${CEDULA})`, desc: 'Reconocido ante SEP, IMSS, escuelas e instituciones gubernamentales.' },
  { icon: CheckCircle2, label: 'Instrumentos estandarizados', desc: 'CONNERS-3, WISC-V, BRIEF-2 (niños) / CAARS, DIVA 2.0, CPT-3 (adultos).' },
  { icon: ArrowRight, label: 'Sesión de devolución a padres', desc: 'Explicación detallada del diagnóstico y recomendaciones concretas de acción.' },
  { icon: DollarSign, label: 'Pago distribuido en sesiones', desc: 'El costo total se puede repartir a lo largo del proceso de 2 a 3 semanas.' },
];

const comparativa = [
  { aspecto: 'Instrumentos utilizados', barato: 'Escalas de síntomas no estandarizadas o entrevista clínica informal', karen: 'CONNERS-3, WISC-V, BRIEF-2, CPT-3 — estandarizados internacionalmente' },
  { aspecto: 'Validez del informe', barato: 'Sin cédula federal o con cédula estatal solamente', karen: `Informe con cédula federal ${CEDULA} — válido ante SEP, IMSS e instituciones` },
  { aspecto: 'Diagnóstico diferencial', barato: 'Difícil distinguir TDAH de ansiedad, dificultades de aprendizaje u otros cuadros', karen: 'Perfil neuropsicológico completo que descarta o confirma otras condiciones' },
  { aspecto: 'Recomendaciones escolares', barato: 'Genéricas o inexistentes', karen: 'Adecuaciones curriculares específicas para solicitar ante la escuela' },
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Article', 'BlogPosting'],
      '@id': `${CANONICAL_URL}/#article`,
      headline: '¿Cuánto cuesta una valoración de TDAH en Cancún?',
      description: `La valoración neuropsicológica de TDAH en Cancún cuesta $8,300 MXN. Incluye 4-5 sesiones, instrumentos estandarizados e informe con cédula federal ${CEDULA} válido ante SEP e IMSS.`,
      image: KAREN_IMAGE,
      datePublished: '2025-06-01',
      dateModified: '2026-06-02',
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
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
        { '@type': 'ListItem', position: 3, name: '¿Cuánto cuesta una valoración de TDAH en Cancún?', item: CANONICAL_URL },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqItems.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ],
};

export default function CuantoCuestaValoracionTDAH() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [linkCopied, setLinkCopied] = useState(false);
  return (
    <>
      <Head>
        <title>¿Cuánto cuesta una valoración de TDAH en Cancún?</title>
        <meta name="description" content={`La valoración neuropsicológica de TDAH en Cancún cuesta $8,300 MXN. Incluye 4-5 sesiones, instrumentos estandarizados (CONNERS-3, WISC-V) e informe con cédula federal ${CEDULA} válido ante SEP e IMSS.`} />
        <link rel="canonical" href={CANONICAL_URL} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="es_MX" />
        <meta property="og:site_name" content="Neuropsicóloga Karen Trujillo" />
        <meta property="og:title" content="¿Cuánto cuesta una valoración de TDAH en Cancún?" />
        <meta property="og:description" content={`Precio de la valoración de TDAH en Cancún: $8,300 MXN. Pago distribuido en sesiones. Informe con cédula ${CEDULA} válido ante SEP e IMSS.`} />
        <meta property="og:url" content={CANONICAL_URL} />
        <meta property="og:image" content={`${SITE_URL}/blog/dark-costo-de-la-valoracion-de-tdah-1200x675.svg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="675" />
        <meta property="og:image:alt" content="Karen Trujillo, neuropsicóloga en Cancún — costo evaluación TDAH" />
        <meta property="article:author" content="Karen Trujillo" />
        <meta property="article:published_time" content="2025-06-01" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="¿Cuánto cuesta una valoración de TDAH en Cancún? | Karen Trujillo" />
        <meta name="twitter:description" content="La valoración de TDAH en Cancún cuesta $8,300 MXN. Incluye instrumentos estandarizados e informe con validez oficial ante SEP e IMSS." />
        <meta name="twitter:image" content={`${SITE_URL}/blog/dark-costo-de-la-valoracion-de-tdah-1200x675.svg`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>
      <div className="antialiased selection:bg-accent-blue selection:text-primary pb-24 lg:pb-0">
        <Navbar />
        <main>
          {/* ── Hero ── */}
          <section className="relative pt-36 pb-16 px-6 overflow-hidden" style={{ background: '#2b1f47' }}>
            <div aria-hidden="true" className="absolute top-0 right-0 w-[480px] h-[480px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(208,208,231,0.07) 0%, transparent 70%)' }} />
            <div aria-hidden="true" className="absolute bottom-0 left-0 w-[320px] h-[320px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(91,78,127,0.18) 0%, transparent 70%)' }} />
            <div className="max-w-3xl mx-auto relative z-10">
              <nav aria-label="Breadcrumb" className="mb-6">
                <ol className="flex items-center gap-2 text-xs flex-wrap" style={{ color: 'rgba(208,208,231,0.7)' }}>
                  <li><Link href="/" className="hover:text-[#d0d0e7] transition-colors" style={{ color: 'rgba(208,208,231,0.7)' }}>Inicio</Link></li>
                  <li>/</li>
                  <li className="font-medium" style={{ color: '#d0d0e7' }}>¿Cuánto cuesta una valoración de TDAH en Cancún?</li>
                </ol>
              </nav>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <span className="inline-flex items-center px-3 py-1 rounded-full mb-4 text-xs font-bold uppercase tracking-widest" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#d0d0e7' }}>
                  Información & Precios
                </span>
                <h1 className="text-3xl md:text-5xl font-serif font-bold text-white leading-[1.15] mb-4">
                  ¿Cuánto cuesta una valoración de TDAH en Cancún?
                </h1>
                <p className="text-lg font-light leading-relaxed mb-6" style={{ color: 'rgba(208,208,231,0.82)' }}>
                  Guía completa sobre el costo, qué incluye y por qué importa la calidad del diagnóstico.
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs pt-4" style={{ color: 'rgba(208,208,231,0.75)', borderTop: '1px solid rgba(255,255,255,0.12)' }}>
                  <span style={{ color: 'rgba(208,208,231,0.95)' }}>Revisado por Karen Trujillo, Neuropsicóloga · Cédula {CEDULA}</span>
                  <time dateTime="2025-06-01">1 jun 2025</time>
                  <span>Cancún, Quintana Roo</span>
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
                    src="/blog/dark-costo-de-la-valoracion-de-tdah-1200x675.svg"
                    alt="¿Cuánto cuesta una valoración de TDAH en Cancún? — imagen ilustrativa"
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

          {/* ── Precio destacado ── */}
          <section className="py-16 px-6 bg-card">
            <div className="max-w-3xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
                <div className="bg-gradient-primary text-primary-foreground rounded-2xl p-8 text-center mb-10">
                  <p className="text-xs uppercase tracking-widest text-primary-foreground/60 mb-2">Costo total de la valoración</p>
                  <div className="text-6xl font-serif font-bold mb-2">$8,300</div>
                  <p className="text-primary-foreground/80 text-sm mb-4">pesos mexicanos (MXN) · Pago distribuido en sesiones</p>
                  <a
                    href={`https://wa.me/${WA_NUMBER}?text=Hola%20Karen,%20leí%20tu%20artículo%20y%20quiero%20información%20sobre%20la%20valoración`}
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-primary-foreground text-primary font-bold text-xs uppercase tracking-widest px-8 py-3 rounded-lg hover:opacity-90 transition-all"
                  >
                    Consultar disponibilidad <ArrowRight className="w-4 h-4" />
                  </a>
                </div>

                <h2 className="text-2xl font-serif font-bold text-primary mb-6">¿Qué incluye el precio de la valoración?</h2>
                <div className="grid sm:grid-cols-2 gap-4 mb-12">
                  {loQueIncluye.map((item) => (
                    <div key={item.label} className="flex gap-4 p-4 bg-secondary rounded-xl border border-border">
                      <item.icon className="w-5 h-5 text-accent-blue shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-primary text-sm mb-1">{item.label}</p>
                        <p className="text-xs text-muted-foreground font-light leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mb-12">
                  <figure className="rounded-2xl overflow-hidden border border-border shadow-[0_8px_24px_-6px_rgba(56,47,81,0.12)]">
                    <img
                      src="/blog/sand-que-incluye-la-valoracion-960x540.svg"
                      alt="Qué incluye el precio de la valoración de TDAH — imagen ilustrativa"
                      width={960}
                      height={540}
                      className="w-full h-auto aspect-video object-cover"
                      loading="lazy"
                    />
                  </figure>
                  <p className="text-[10px] text-muted-foreground/60 font-light italic mt-2 text-center">Foto ilustrativa — pendiente de fotografía real.</p>
                </div>

                <h2 className="text-2xl font-serif font-bold text-primary mb-6">Valoración completa vs. diagnóstico de bajo costo</h2>
                <div className="overflow-x-auto rounded-xl border border-border mb-12">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-secondary">
                        <th className="p-4 text-left font-bold text-primary text-xs uppercase tracking-wider">Aspecto</th>
                        <th className="p-4 text-left font-bold text-red-400 text-xs uppercase tracking-wider">Diagnóstico de bajo costo</th>
                        <th className="p-4 text-left font-bold text-success text-xs uppercase tracking-wider">Psic. Karen Trujillo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparativa.map((row, i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-card' : 'bg-secondary'}>
                          <td className="p-4 font-bold text-primary text-xs">{row.aspecto}</td>
                          <td className="p-4 text-muted-foreground text-xs font-light">{row.barato}</td>
                          <td className="p-4 text-foreground text-xs font-medium">{row.karen}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mb-12">
                  <figure className="rounded-2xl overflow-hidden border border-border shadow-[0_8px_24px_-6px_rgba(56,47,81,0.12)]">
                    <img
                      src="/blog/lavender-diagnostico-confiable-vs-economico-960x540.svg"
                      alt="Comparación entre una valoración completa y un diagnóstico de bajo costo — imagen ilustrativa"
                      width={960}
                      height={540}
                      className="w-full h-auto aspect-video object-cover"
                      loading="lazy"
                    />
                  </figure>
                  <p className="text-[10px] text-muted-foreground/60 font-light italic mt-2 text-center">Foto ilustrativa — pendiente de fotografía real.</p>
                </div>

                <h2 className="text-2xl font-serif font-bold text-primary mb-6">Preguntas frecuentes sobre el costo</h2>
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
              <h2 className="text-2xl md:text-3xl font-serif font-bold italic mb-4">¿Quieres dar el primer paso?</h2>
              <p className="text-primary-foreground/80 font-light mb-8 max-w-xl mx-auto">
                La Neuropsicóloga Karen Trujillo atiende en Cancún con cédula federal {CEDULA}. Agenda una consulta inicial por WhatsApp sin compromiso.
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
              <a
                href={`https://wa.me/${WA_NUMBER}?text=Hola%20Karen,%20leí%20tu%20artículo%20y%20quiero%20información%20sobre%20la%20valoración`}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary-foreground text-primary font-bold text-xs uppercase tracking-widest px-10 py-4 rounded-lg hover:opacity-90 transition-all shadow-lg"
              >
                Agendar Valoración <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </section>

          {/* ── Artículos relacionados ── */}
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
                    <span className="block text-xs text-muted-foreground mt-1 font-light">Niños de 5 a 17 años</span>
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
                    <span className="block text-xs text-muted-foreground mt-1 font-light">Desde 18 años</span>
                  </div>
                </Link>
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
                    <span className="block text-xs text-muted-foreground mt-1 font-light">Desde 2 años</span>
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
