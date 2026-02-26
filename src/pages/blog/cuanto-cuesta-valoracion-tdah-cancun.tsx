import Head from 'next/head';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, DollarSign, Calendar, FileText, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';

const faqItems = [
  { q: '¿Cuánto cuesta una valoración de TDAH en Cancún?', a: 'La valoración neuropsicológica de TDAH en Cancún con la Neuropsicóloga Karen Trujillo tiene un costo de $7,000 pesos mexicanos (MXN). Este precio incluye todas las sesiones del proceso (4 a 5 citas), la aplicación de instrumentos estandarizados internacionales, el análisis clínico y el informe final con cédula federal 11009616.' },
  { q: '¿Se puede pagar la valoración de TDAH en parcialidades?', a: 'Sí. El pago se puede distribuir a lo largo de las sesiones del proceso de valoración, que se extienden entre 2 y 3 semanas.' },
  { q: '¿Por qué una valoración de TDAH cuesta $7,000 pesos?', a: 'El costo refleja el uso de instrumentos estandarizados internacionales (como CONNERS-3, WISC-V y BRIEF-2 para niños, o CAARS y DIVA 2.0 para adultos), que tienen un costo de aplicación y de actualización clínica. Además incluye 4 a 5 sesiones de trabajo directo con el paciente y la familia, análisis de resultados y elaboración del informe clínico con validez oficial.' },
  { q: '¿El informe de valoración de TDAH tiene validez ante la escuela o el IMSS?', a: 'Sí. El informe emitido por la Neuropsicóloga Karen Trujillo está respaldado por cédula profesional federal 11009616 y tiene validez ante instituciones educativas, SEP, IMSS y dependencias gubernamentales.' },
  { q: '¿Qué pasa si solo quiero una opinión rápida sobre si mi hijo tiene TDAH?', a: 'Una valoración neuropsicológica no es una opinión: es un diagnóstico clínico fundamentado en datos objetivos. No existe un atajo confiable al proceso completo. Diagnósticos rápidos sin instrumentos estandarizados no tienen validez oficial.' },
  { q: '¿La valoración de TDAH en Cancún es presencial o puede ser online?', a: 'La valoración de TDAH requiere sesiones presenciales en Cancún, Quintana Roo, ya que implica la aplicación directa de pruebas estandarizadas que no pueden realizarse de forma remota con la misma validez clínica.' },
];

const loQueIncluye = [
  { icon: Calendar, label: '4 a 5 sesiones clínicas', desc: 'Entrevista inicial, aplicación de pruebas, cuestionarios y sesión de devolución.' },
  { icon: FileText, label: 'Informe clínico completo', desc: 'Diagnóstico diferencial, perfil neuropsicológico y plan de intervención.' },
  { icon: Shield, label: 'Validez oficial (cédula 11009616)', desc: 'Reconocido ante SEP, IMSS, escuelas e instituciones gubernamentales.' },
  { icon: CheckCircle2, label: 'Instrumentos estandarizados', desc: 'CONNERS-3, WISC-V, BRIEF-2 (niños) / CAARS, DIVA 2.0, CPT-3 (adultos).' },
  { icon: ArrowRight, label: 'Sesión de devolución a padres', desc: 'Explicación detallada del diagnóstico y recomendaciones concretas de acción.' },
  { icon: DollarSign, label: 'Pago distribuido en sesiones', desc: 'El costo total se puede repartir a lo largo del proceso de 2 a 3 semanas.' },
];

const comparativa = [
  { aspecto: 'Instrumentos utilizados', barato: 'Escalas de síntomas no estandarizadas o entrevista clínica informal', karen: 'CONNERS-3, WISC-V, BRIEF-2, CPT-3 — estandarizados internacionalmente' },
  { aspecto: 'Validez del informe', barato: 'Sin cédula federal o con cédula estatal solamente', karen: 'Informe con cédula federal 11009616 — válido ante SEP, IMSS e instituciones' },
  { aspecto: 'Diagnóstico diferencial', barato: 'Difícil distinguir TDAH de ansiedad, dificultades de aprendizaje u otros cuadros', karen: 'Perfil neuropsicológico completo que descarta o confirma otras condiciones' },
  { aspecto: 'Recomendaciones escolares', barato: 'Genéricas o inexistentes', karen: 'Adecuaciones curriculares específicas para solicitar ante la escuela' },
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      headline: '¿Cuánto cuesta una valoración de TDAH en Cancún?',
      url: 'https://psicologakarentrujillo.com.mx/blog/cuanto-cuesta-valoracion-tdah-cancun',
      datePublished: '2025-01-01',
      author: { '@type': 'Person', name: 'Karen Trujillo', jobTitle: 'Neuropsicóloga', hasCredential: { '@type': 'EducationalOccupationalCredential', credentialId: '11009616' } },
      mainEntity: { '@type': 'Offer', name: 'Valoración Neuropsicológica de TDAH en Cancún', price: '7000', priceCurrency: 'MXN' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqItems.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ],
};

export default function CuantoCuestaValoracionTDAH() {
  return (
    <>
      <Head>
        <title>¿Cuánto cuesta una valoración de TDAH en Cancún? | Neuropsicóloga Karen Trujillo</title>
        <meta name="description" content="La valoración neuropsicológica de TDAH en Cancún cuesta $7,000 MXN. Incluye 4-5 sesiones, instrumentos estandarizados (CONNERS-3, WISC-V) e informe con cédula federal 11009616 válido ante SEP e IMSS." />
        <link rel="canonical" href="https://psicologakarentrujillo.com.mx/blog/cuanto-cuesta-valoracion-tdah-cancun" />
        <meta property="og:title" content="¿Cuánto cuesta una valoración de TDAH en Cancún? | Karen Trujillo" />
        <meta property="og:description" content="Precio de la valoración de TDAH en Cancún: $7,000 MXN. Pago distribuido en sesiones. Informe con cédula 11009616 válido ante SEP e IMSS." />
        <meta property="og:url" content="https://psicologakarentrujillo.com.mx/blog/cuanto-cuesta-valoracion-tdah-cancun" />
        <meta property="og:image" content="https://psicologakarentrujillo.com.mx/Psicologa_Karen_Trujillo.webp" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>
      <div className="antialiased selection:bg-accent-blue selection:text-primary pb-24 lg:pb-0">
        <Navbar />
        <main>
          {/* ── Hero ── */}
          <section className="relative pt-36 pb-16 px-6 overflow-hidden bg-soft-gradient">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-sand/30 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 animate-pulse" />
            <div className="max-w-3xl mx-auto relative z-10">
              <nav aria-label="Breadcrumb" className="mb-6">
                <ol className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
                  <li><Link href="/" className="hover:text-primary transition-colors">Inicio</Link></li>
                  <li>/</li>
                  <li className="text-primary font-medium">¿Cuánto cuesta una valoración de TDAH en Cancún?</li>
                </ol>
              </nav>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <span className="inline-flex items-center px-3 py-1 rounded-full border border-accent-blue/20 bg-accent-blue/10 text-[10px] font-bold uppercase tracking-widest mb-4 text-primary">
                  Información & Precios
                </span>
                <h1 className="text-3xl md:text-5xl font-serif font-bold text-primary leading-[1.15] mb-4">
                  ¿Cuánto cuesta una valoración de TDAH en Cancún?
                </h1>
                <p className="text-muted-foreground text-lg font-light leading-relaxed mb-6">
                  Guía completa sobre el costo, qué incluye y por qué importa la calidad del diagnóstico.
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground border-t border-border pt-4">
                  <span>Neuropsicóloga Karen Trujillo — Cédula 11009616</span>
                  <span>Cancún, Quintana Roo</span>
                </div>
              </motion.div>
            </div>
          </section>

          {/* ── Precio destacado ── */}
          <section className="py-16 px-6 bg-card">
            <div className="max-w-3xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
                <div className="bg-gradient-primary text-primary-foreground rounded-2xl p-8 text-center mb-10">
                  <p className="text-[10px] uppercase tracking-widest text-primary-foreground/60 mb-2">Costo total de la valoración</p>
                  <div className="text-6xl font-serif font-bold mb-2">$7,000</div>
                  <p className="text-primary-foreground/80 text-sm mb-4">pesos mexicanos (MXN) · Pago distribuido en sesiones</p>
                  <a
                    href="https://wa.me/529983211547?text=Hola%20Karen,%20leí%20tu%20artículo%20y%20quiero%20información%20sobre%20la%20valoración"
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

                <h2 className="text-2xl font-serif font-bold text-primary mb-6">Preguntas frecuentes sobre el costo</h2>
                <div className="space-y-4 mb-10">
                  {faqItems.map((faq, i) => (
                    <details key={i} className="group bg-card border-2 border-border hover:border-accent-blue rounded-xl transition-all open:border-primary open:shadow-lg">
                      <summary className="p-6 font-bold text-primary cursor-pointer list-none flex justify-between items-center gap-4">
                        <span>{faq.q}</span>
                        <span className="text-muted-foreground shrink-0 group-open:rotate-45 transition-transform text-xl leading-none">+</span>
                      </summary>
                      <p className="px-6 pb-6 text-muted-foreground text-sm font-light leading-relaxed">{faq.a}</p>
                    </details>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* ── CTA ── */}
          <section className="py-16 px-6 bg-gradient-primary text-primary-foreground">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-serif font-bold italic mb-4">¿Quieres dar el primer paso?</h2>
              <p className="text-primary-foreground/80 font-light mb-8 max-w-xl mx-auto">
                La Neuropsicóloga Karen Trujillo atiende en Cancún con cédula federal 11009616. Agenda una consulta inicial por WhatsApp sin compromiso.
              </p>
              <a
                href="https://wa.me/529983211547?text=Hola%20Karen,%20leí%20tu%20artículo%20y%20quiero%20información%20sobre%20la%20valoración"
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
                <Link href="/evaluacion-tdah-ninos" className="p-5 bg-card border border-border rounded-xl hover:border-primary hover:shadow-md transition-all group">
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold block mb-2">Servicio</span>
                  <span className="font-bold text-primary text-sm group-hover:underline">Valoración TDAH Infantil en Cancún</span>
                  <span className="block text-xs text-muted-foreground mt-1 font-light">Niños de 5 a 17 años</span>
                </Link>
                <Link href="/evaluacion-tdah-adultos" className="p-5 bg-card border border-border rounded-xl hover:border-primary hover:shadow-md transition-all group">
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold block mb-2">Servicio</span>
                  <span className="font-bold text-primary text-sm group-hover:underline">Valoración TDAH Adultos en Cancún</span>
                  <span className="block text-xs text-muted-foreground mt-1 font-light">Desde 18 años</span>
                </Link>
                <Link href="/evaluacion-autismo-cancun" className="p-5 bg-card border border-border rounded-xl hover:border-primary hover:shadow-md transition-all group">
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold block mb-2">Servicio</span>
                  <span className="font-bold text-primary text-sm group-hover:underline">Diagnóstico Autismo (TEA) en Cancún</span>
                  <span className="block text-xs text-muted-foreground mt-1 font-light">Desde 2 años</span>
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
