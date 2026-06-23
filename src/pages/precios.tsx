import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {
  CheckCircle2, ChevronDown, MessageCircle, ArrowRight,
  Shield, BadgeCheck, Clock, CreditCard,
  Brain, Puzzle, Users, Briefcase, FileText,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import { waUrl } from '@/lib/contact';
import { SITE_URL, CEDULA, KAREN_IMAGE } from '@/lib/site';

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */

const CANONICAL_URL = `${SITE_URL}/precios`;

const evaluaciones = [
  {
    id: 'tdah-ninos',
    icon: Users,
    badge: 'TDAH Infantil',
    badgeColor: 'bg-accent-blue/20 text-primary',
    title: 'Valoración TDAH en Niños',
    edad: 'Niños de 5 a 17 años',
    precio: '$8,300 MXN',
    duracion: '2–3 semanas · 4 sesiones',
    href: '/evaluacion-tdah-ninos',
    instrumentos: ['CONNERS-3', 'WISC-V', 'BRIEF-2', 'CPT-3', 'Escalas de comportamiento'],
    incluye: [
      'Entrevista clínica con padres y/o tutores',
      'Evaluación directa con el niño (múltiples sesiones)',
      'Cuestionarios para padres y maestros',
      'Informe clínico completo con perfil neuropsicológico',
      'Sesión de devolución con recomendaciones escolares',
      'Validez oficial ante SEP, IMSS e instituciones educativas',
    ],
  },
  {
    id: 'tdah-adultos',
    icon: Briefcase,
    badge: 'TDAH Adultos',
    badgeColor: 'bg-accent-sand text-primary',
    title: 'Valoración TDAH en Adultos',
    edad: 'Desde 18 años',
    precio: '$8,300 MXN',
    duracion: '2–3 semanas · 4 sesiones',
    href: '/evaluacion-tdah-adultos',
    instrumentos: ['CAARS-2', 'WAIS-IV', 'BRIEF-2A', 'CPT-3', 'DIVA 2.0'],
    incluye: [
      'Entrevista clínica estructurada (historia de vida y síntomas)',
      'Aplicación de batería de pruebas neuropsicológicas',
      'Diagnóstico diferencial (TDAH vs ansiedad, depresión, burnout)',
      'Informe clínico con perfil cognitivo y ejecutivo detallado',
      'Sesión de devolución con plan de intervención concreto',
      'Validez oficial ante empleadores e instituciones',
    ],
  },
  {
    id: 'tea',
    icon: Puzzle,
    badge: 'Autismo (TEA)',
    badgeColor: 'bg-accent-pink/25 text-primary',
    title: 'Evaluación de Autismo (TEA)',
    edad: 'Niños y adolescentes',
    precio: '$8,500 MXN',
    duracion: '3–4 semanas · 5–6 sesiones',
    href: '/evaluacion-autismo-cancun',
    instrumentos: ['ADOS-2', 'ADI-R', 'M-CHAT-R/F', 'WISC-V', 'Vineland-3', 'SRS-2'],
    incluye: [
      'Observación estructurada directa (ADOS-2 — estándar de oro)',
      'Entrevista diagnóstica a padres/tutores (ADI-R)',
      'Evaluación de funcionamiento cognitivo (WISC-V)',
      'Evaluación de conducta adaptativa (Vineland-3)',
      'Informe con nivel de apoyo según criterios DSM-5',
      'Sesión de devolución con plan de acompañamiento familiar',
      'Validez ante SEP, IMSS e instituciones de apoyo',
    ],
  },
];

const politicasPago = [
  {
    icon: CreditCard,
    title: 'Anticipo al agendar',
    desc: 'Anticipo de $1,000 MXN (TDAH) o $1,500 MXN (TEA) al confirmar la cita. Forma parte del costo total — no es un cargo adicional.',
  },
  {
    icon: FileText,
    title: 'Saldo al entregar',
    desc: 'El saldo restante se liquida al entregar el informe en la sesión de devolución.',
  },
  {
    icon: Shield,
    title: 'Métodos de pago',
    desc: 'Efectivo y transferencia bancaria (SPEI). No se acepta tarjeta de crédito/débito en consultorio.',
  },
  {
    icon: Clock,
    title: 'Cancelaciones',
    desc: 'El anticipo es 100% reembolsable si cancelas con 48 horas de anticipación. Fuera de plazo se aplica como crédito para reagendar.',
  },
  {
    icon: BadgeCheck,
    title: 'Entrega del informe',
    desc: 'El informe clínico se entrega en mano durante la sesión de devolución. Se puede emitir copia digital adicional sin costo.',
  },
  {
    icon: MessageCircle,
    title: 'Preguntas sobre costos',
    desc: 'Escríbeme directamente por WhatsApp para confirmar disponibilidad, costos actualizados y forma de pago.',
  },
];

const faqPrecios = [
  {
    q: '¿El precio incluye todas las sesiones?',
    a: 'Sí. El precio cubre la totalidad del proceso: entrevista inicial, todas las sesiones de aplicación de pruebas, el análisis de resultados, la redacción del informe clínico y la sesión de devolución. No hay costos adicionales ocultos.',
  },
  {
    q: '¿Se puede pagar en parcialidades?',
    a: 'El esquema es dos pagos: un anticipo de $1,000 MXN (TDAH) o $1,500 MXN (TEA) al agendar, y el saldo restante al entregar el informe. No se ofrecen más parcialidades. Este esquema está diseñado para proteger tanto al paciente como el proceso clínico.',
  },
  {
    q: '¿El informe tiene vigencia para usarse?',
    a: 'Los informes neuropsicológicos no tienen fecha de caducidad oficial, aunque la mayoría de instituciones los consideran válidos por 2-3 años. Para propósitos de adecuaciones curriculares anuales, puede requerirse actualización.',
  },
  {
    q: '¿Puedo deducir el costo en impuestos?',
    a: 'Sí. Se puede emitir recibo de honorarios (comprobante fiscal) a nombre de quien corresponda. Consulta con tu contador la aplicabilidad en tu caso particular.',
  },
  {
    q: '¿Existe algún descuento o beca?',
    a: 'En casos de vulnerabilidad económica comprobable, puedo evaluar opciones. Escríbeme directamente por WhatsApp para hablar sobre tu situación. El proceso de selección es personal y limitado.',
  },
  {
    q: '¿Por qué cuesta más la evaluación de autismo?',
    a: 'La evaluación de TEA requiere el ADOS-2 (instrumento de observación directa de alta complejidad), más sesiones de aplicación (5-6 vs. 4) y mayor tiempo de análisis e integración clínica. El ADOS-2 es el estándar de oro para diagnóstico de autismo y su aplicación requiere formación especializada certificada.',
  },
];

/* ═══════════════════════════════════════════════════════════════
   SCHEMA
   ═══════════════════════════════════════════════════════════════ */
const schema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Precios de Evaluaciones Neuropsicológicas — Karen Trujillo Cancún',
  url: CANONICAL_URL,
  itemListElement: evaluaciones.map((ev, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Offer',
      name: ev.title,
      price: ev.precio.replace(/[^0-9]/g, ''),
      priceCurrency: 'MXN',
      url: `${SITE_URL}${ev.href}`,
      seller: {
        '@type': 'Person',
        name: 'Karen Trujillo',
        identifier: `Cédula Federal ${CEDULA}`,
      },
    },
  })),
};

/* ═══════════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════════ */

export default function Precios() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <Head>
        <title>Precios de Evaluaciones Neuropsicológicas en Cancún | Karen Trujillo</title>
        <meta name="description" content={`Costos de valoración de TDAH y diagnóstico de autismo (TEA) en Cancún. TDAH $8,300 MXN · TEA $8,500 MXN. Incluye todas las sesiones, pruebas e informe clínico. Cédula ${CEDULA}.`} />
        <link rel="canonical" href={CANONICAL_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Precios — Neuropsicóloga Karen Trujillo Cancún" />
        <meta property="og:description" content="Valoración TDAH $8,300 MXN · Evaluación TEA $8,500 MXN. Precio todo incluido: sesiones, pruebas e informe oficial." />
        <meta property="og:url" content={CANONICAL_URL} />
        <meta property="og:image" content={KAREN_IMAGE} />
        <meta property="og:image:width" content="465" />
        <meta property="og:image:height" content="533" />
        <meta property="og:image:alt" content="Neuropsicóloga Karen Trujillo — Especialista en TDAH y Autismo en Cancún" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={KAREN_IMAGE} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>

      <div className="antialiased selection:bg-accent-blue selection:text-primary">
        <Navbar />
        <main>

          {/* ── Header ── */}
          <section className="pt-32 pb-16 px-6" style={{ backgroundColor: '#2b1f47' }}>
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] mb-4" style={{ color: 'rgba(208,208,231,0.65)' }}>
                Neuropsicóloga Karen Trujillo · Cancún · Cédula {CEDULA}
              </p>
              <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-4">
                Inversión en el{' '}<br />diagnóstico correcto
              </h1>
              <p className="text-lg font-light mb-10 max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.7)' }}>
                Precio todo incluido: entrevista, pruebas estandarizadas, informe clínico con validez oficial y sesión de devolución.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  'Sin cobros ocultos',
                  'Informe con cédula federal',
                  'Validez ante SEP e IMSS',
                  'Reembolso si cancelas con 48 hrs',
                ].map((item) => (
                  <span key={item} className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full" style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(208,208,231,0.9)', border: '1px solid rgba(208,208,231,0.2)' }}>
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* ── Pricing cards ── */}
          <section className="py-16 sm:py-20 px-6 bg-secondary">
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-3 gap-6">
                {evaluaciones.map((ev) => (
                  <div key={ev.id} className="bg-card rounded-2xl border border-border overflow-hidden flex flex-col shadow-sm hover:shadow-[0_16px_48px_-12px_rgba(56,47,81,0.14)] hover:-translate-y-1 transition-all duration-300">
                    {/* Card header */}
                    <div className="p-7 border-b border-border">
                      <span className={`inline-block text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 ${ev.badgeColor}`}>{ev.badge}</span>
                      <h2 className="text-xl font-serif font-bold text-primary mb-1">{ev.title}</h2>
                      <p className="text-xs text-muted-foreground font-medium mb-5">{ev.edad}</p>
                      <p className="text-3xl font-serif font-bold text-primary">{ev.precio}</p>
                      <p className="text-xs text-muted-foreground mt-1">{ev.duracion}</p>
                    </div>

                    {/* Instrumentos */}
                    <div className="px-7 py-5 border-b border-border bg-secondary/30">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-3">Instrumentos</p>
                      <div className="flex flex-wrap gap-1.5">
                        {ev.instrumentos.map((inst) => (
                          <span key={inst} className="text-[10px] font-bold px-2.5 py-1 rounded-md border border-border bg-card text-primary/70">
                            {inst}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Incluye */}
                    <div className="px-7 py-5 flex-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-3">Incluye</p>
                      <ul className="space-y-2">
                        {ev.incluye.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-xs text-muted-foreground font-light leading-relaxed">
                            <CheckCircle2 className="w-3.5 h-3.5 text-success shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTAs */}
                    <div className="px-7 py-5 border-t border-border space-y-2">
                      <a
                        href={waUrl(`Hola Karen, me interesa la ${ev.title}. ¿Podrías darme más información?`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-primary text-primary-foreground font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-all"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        Agendar por WhatsApp
                      </a>
                      <Link
                        href={ev.href}
                        className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl border border-border text-primary font-bold text-xs uppercase tracking-widest hover:bg-secondary transition-all"
                      >
                        Ver proceso completo
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-center text-xs text-muted-foreground/60 mt-8">
                Los precios son en pesos mexicanos (MXN) e incluyen IVA cuando aplica.{' '}
                <a href={waUrl('Hola Karen, ¿podrías confirmarme el precio actualizado de la valoración?')} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">Confirmar precio actualizado por WhatsApp.</a>
              </p>
            </div>
          </section>

          {/* ── Política de pago ── */}
          <section className="py-16 sm:py-20 px-6 bg-card border-t border-border">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-3 text-center">Política de pago</h2>
              <p className="text-muted-foreground font-light text-center mb-12">Sin sorpresas. Sin letra pequeña.</p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {politicasPago.map((pol) => (
                  <div key={pol.title} className="p-6 rounded-2xl border border-border bg-secondary/30 hover:border-primary/30 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-primary/8 border border-primary/10 flex items-center justify-center mb-4">
                      <pol.icon className="w-5 h-5 text-primary/60" />
                    </div>
                    <h3 className="font-bold text-primary mb-2 text-sm">{pol.title}</h3>
                    <p className="text-xs text-muted-foreground font-light leading-relaxed">{pol.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── FAQ precios ── */}
          <section className="py-16 sm:py-20 px-6 bg-secondary border-t border-border">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-10 text-center">Preguntas sobre el costo</h2>

              <div role="list">
                {faqPrecios.map((faq, i) => (
                  <div key={i} role="listitem" style={{ borderBottom: i < faqPrecios.length - 1 ? '1px solid rgba(56,47,81,0.09)' : 'none' }}>
                    <button
                      id={`faq-btn-${i}`}
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      aria-expanded={openFaq === i}
                      aria-controls={`faq-answer-${i}`}
                      className="w-full flex items-center justify-between gap-4 py-5 text-left transition-colors"
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: openFaq === i ? '#5b4e7f' : '#382f51' }}
                    >
                      <span className="font-semibold text-sm sm:text-base">{faq.q}</span>
                      <ChevronDown
                        className="w-5 h-5 shrink-0 transition-transform duration-250"
                        style={{ color: '#5b4e7f', transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)' }}
                        aria-hidden="true"
                      />
                    </button>
                    <div
                      role="region"
                      aria-labelledby={`faq-btn-${i}`}
                      className="grid transition-all duration-300"
                      style={{
                        gridTemplateRows: openFaq === i ? '1fr' : '0fr',
                        opacity: openFaq === i ? 1 : 0,
                        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                      }}
                    >
                      <div className="overflow-hidden">
                        <p className="text-sm leading-relaxed pb-5" style={{ color: '#515e71', lineHeight: '1.75', maxWidth: '70ch' }}>
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── CTA final ── */}
          <section className="py-16 px-6 bg-gradient-primary text-primary-foreground">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-primary-foreground/60 mb-3">
                Neuropsicóloga Karen Trujillo · Cancún
              </p>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-4">¿Lista para dar el primer paso?</h2>
              <p className="text-primary-foreground/75 font-light mb-8 max-w-lg mx-auto">
                Escríbeme por WhatsApp para confirmar disponibilidad, costos actualizados y agendar tu primera cita.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={waUrl('Hola Karen, vi la página de precios y quiero agendar una valoración. ¿Cuál es la disponibilidad?')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-primary-foreground text-primary font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-xl hover:opacity-90 transition-all shadow-lg"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp — Agendar
                </a>
                <Link
                  href="/#servicios"
                  className="inline-flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-xl transition-all"
                  style={{ color: 'rgba(255,255,255,0.8)', border: '1.5px solid rgba(255,255,255,0.3)' }}
                >
                  Ver servicios
                  <ArrowRight className="w-4 h-4" />
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
