import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {
  ArrowRight, MapPin, Calendar, Lock, Star, CheckCircle2,
  ChevronDown, ShieldCheck, BadgeCheck, MessageCircle,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { waUrl } from '@/lib/contact';
import { SITE_URL, CEDULA, KAREN_IMAGE, REVIEWS } from '@/lib/site';

/* ═══════════════════════════════════════════════════════════════
   CONFIG ⚠️ PENDIENTE — confirmar con Karen antes de publicar
   ═══════════════════════════════════════════════════════════════ */
const CAMPAIGN_START = '21 de julio';
const CAMPAIGN_END = '3 de agosto';
const CHETUMAL_ADDRESS = '[DIRECCIÓN — pendiente]';
const CANONICAL_URL = `${SITE_URL}/valoracion-chetumal`;
const MAX_SLOTS = 10;

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */

type TierKey = 'tdahNinos' | 'tdahAdultos' | 'tea';

const TABS: { key: TierKey; label: string }[] = [
  { key: 'tdahNinos', label: 'TDAH Niños' },
  { key: 'tdahAdultos', label: 'TDAH Adultos' },
  { key: 'tea', label: 'Autismo / TEA' },
];

interface Tier {
  name: string;
  price: number;
  sessions: string;
  devolucion: string;
  instruments: string[];
  report: string;
  recommended?: boolean;
  waMessage: string;
}

const TIERS: Record<TierKey, Tier[]> = {
  tdahNinos: [
    {
      name: 'Estándar',
      price: 3900,
      sessions: '3 sesiones (3 presenciales)',
      devolucion: 'Devolución presencial en Chetumal · 1.5 h',
      instruments: ['CONNERS', 'EDAH', 'CDI'],
      report: 'Informe completo con recomendaciones',
      recommended: true,
      waMessage: 'Hola Karen, vi la campaña de valoraciones en Chetumal. Me interesa reservar una valoración de TDAH infantil nivel Estándar ($3,900 MXN). ¿Cuál es la disponibilidad?',
    },
    {
      name: 'Completo',
      price: 5000,
      sessions: '4 sesiones (4 presenciales)',
      devolucion: 'Devolución presencial en Chetumal · 1.5 h',
      instruments: ['CONNERS', 'EDAH', 'CDI', 'CUMANES', 'Masking', 'IDARE'],
      report: 'Informe neuropsicológico + perfil cognitivo',
      waMessage: 'Hola Karen, vi la campaña de valoraciones en Chetumal. Me interesa reservar una valoración de TDAH infantil nivel Completo ($5,000 MXN). ¿Cuál es la disponibilidad?',
    },
  ],
  tdahAdultos: [
    {
      name: 'Estándar',
      price: 3900,
      sessions: '3 sesiones (3 presenciales)',
      devolucion: 'Devolución presencial en Chetumal · 1.5 h',
      instruments: ['DIVA 2.0', 'CONNERS Adultos', 'IDARE'],
      report: 'Informe con diagnóstico diferencial',
      recommended: true,
      waMessage: 'Hola Karen, vi la campaña de valoraciones en Chetumal. Me interesa reservar una valoración de TDAH adultos nivel Estándar ($3,900 MXN). ¿Cuál es la disponibilidad?',
    },
    {
      name: 'Completo',
      price: 5000,
      sessions: '4 sesiones (3 presenciales · 1 virtual)',
      devolucion: 'Presencial · 1.5 h + seguimiento virtual 2 semanas después',
      instruments: ['DIVA 2.0', 'CONNERS Adultos', 'IDARE', 'Inv. Depresión'],
      report: 'Informe neuropsicológico + perfil ejecutivo',
      waMessage: 'Hola Karen, vi la campaña de valoraciones en Chetumal. Me interesa reservar una valoración de TDAH adultos nivel Completo ($5,000 MXN). ¿Cuál es la disponibilidad?',
    },
  ],
  tea: [
    {
      name: 'Estándar',
      price: 4500,
      sessions: '3 sesiones (3 presenciales)',
      devolucion: 'Devolución presencial + orientación familiar · 1.5 h',
      instruments: ['ADOS-2', 'ADI-R'],
      report: 'Informe diagnóstico DSM-5 con nivel de apoyo',
      recommended: true,
      waMessage: 'Hola Karen, vi la campaña de valoraciones en Chetumal. Me interesa reservar una valoración de Autismo/TEA nivel Estándar ($4,500 MXN). ¿Cuál es la disponibilidad?',
    },
    {
      name: 'Completo',
      price: 5800,
      sessions: '4 sesiones (4 presenciales)',
      devolucion: 'Presencial + plan de acompañamiento · 1.5 h',
      instruments: ['ADOS-2', 'ADI-R', 'CUMANES'],
      report: 'Informe neuropsicológico integrado',
      waMessage: 'Hola Karen, vi la campaña de valoraciones en Chetumal. Me interesa reservar una valoración de Autismo/TEA nivel Completo ($5,800 MXN). ¿Cuál es la disponibilidad?',
    },
  ],
};

const faqItems = [
  {
    q: '¿Es la misma calidad que en el consultorio de Cancún?',
    a: `Sí. Misma especialista, mismos instrumentos estandarizados, mismo informe con cédula federal ${CEDULA}. La diferencia está en el número de sesiones (3–4 en Chetumal vs. 5 en Cancún), adaptado al formato de campaña temporal.`,
  },
  {
    q: '¿El informe tiene validez oficial?',
    a: `Sí. El informe lleva la cédula profesional federal ${CEDULA}, emitida por la SEP. Tiene validez ante instituciones educativas, IMSS y dependencias gubernamentales en todo México.`,
  },
  {
    q: '¿Por qué Básico y Estándar tienen el mismo número de sesiones pero diferente precio?',
    a: 'Una valoración clínica responsable requiere mínimo 3 sesiones: historia clínica, pruebas y devolución. La diferencia entre Básico y Estándar no es el número de sesiones sino el tipo de devolución (virtual vs. presencial) y la batería de instrumentos aplicados.',
  },
  {
    q: '¿Qué pasa si mis sesiones no terminan antes de que Karen se vaya?',
    a: 'Las sesiones se agendan desde el primer día para garantizar que el proceso completo ocurra dentro del periodo de la campaña. Al reservar se te confirma un calendario con las 3 o 4 citas.',
  },
  {
    q: '¿Cómo funciona el anticipo?',
    a: 'Al reservar se paga el 50% del nivel elegido — forma parte del precio total, no es adicional. El 50% restante se liquida en la primera sesión. El anticipo es reembolsable si cancelas con al menos 48 horas de anticipación.',
  },
  {
    q: '¿Puedo cambiar de nivel después de reservar?',
    a: 'Sí, hasta 48 horas antes de la primera sesión y sujeto a disponibilidad de agenda.',
  },
];

const testimonials = [
  {
    name: 'Jenny Arzat',
    initials: 'JA',
    service: 'Valoración infantil',
    text: 'Recomiendo a la psicóloga Karen — muy amable, muy profesional. Desde el primer día mi hija se sintió muy cómoda y le ha ayudado mucho acudir a sus terapias.',
  },
  {
    name: 'Osiris Pinetta',
    initials: 'OP',
    service: 'Psicoterapia individual',
    text: 'Desde la primera sesión me sentí escuchado. Karen me ha ayudado mucho — te escucha, te alienta a seguir adelante. Sin duda una de las mejores psicólogas.',
  },
  {
    name: 'Lek Monter',
    initials: 'LM',
    service: 'Sesión psicológica',
    text: 'Es muy amable. Me sentí cómodo al hablar con ella, muy fácil entablar conversación, muy comprensiva. No te sientes juzgado — el ambiente es muy acogedor.',
  },
];

/* ═══════════════════════════════════════════════════════════════
   JSON-LD SCHEMA
   ═══════════════════════════════════════════════════════════════ */
const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'MedicalWebPage',
      name: 'Valoración TDAH y Autismo en Chetumal — Campaña Temporal',
      url: CANONICAL_URL,
      description: `Campaña temporal de valoraciones neuropsicológicas de TDAH y Autismo en Chetumal. Karen Trujillo · Cédula ${CEDULA}. Desde $3,900 MXN.`,
      inLanguage: 'es-MX',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Valoración en Chetumal', item: CANONICAL_URL },
        ],
      },
    },
    {
      '@type': 'Event',
      name: 'Campaña de Valoraciones TDAH y Autismo en Chetumal',
      description: 'La neuropsicóloga Karen Trujillo realiza valoraciones de TDAH y Autismo en Chetumal por tiempo limitado. Cupos disponibles para niños, adolescentes y adultos.',
      eventStatus: 'https://schema.org/EventScheduled',
      startDate: '2026-07-21',
      endDate: '2026-08-03',
      location: {
        '@type': 'Place',
        name: 'Consultorio temporal Chetumal',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Chetumal',
          addressRegion: 'Quintana Roo',
          addressCountry: 'MX',
        },
      },
      organizer: {
        '@type': 'Person',
        name: 'Karen Trujillo',
        jobTitle: 'Neuropsicóloga Clínica',
        hasCredential: {
          '@type': 'EducationalOccupationalCredential',
          credentialId: CEDULA,
          issuedBy: { '@type': 'Organization', name: 'Secretaría de Educación Pública, México' },
        },
      },
      offers: [
        { '@type': 'Offer', name: 'TDAH Estándar', price: '3900', priceCurrency: 'MXN', availability: 'https://schema.org/InStock' },
        { '@type': 'Offer', name: 'TDAH Completo', price: '5000', priceCurrency: 'MXN', availability: 'https://schema.org/InStock' },
        { '@type': 'Offer', name: 'TEA Estándar', price: '4500', priceCurrency: 'MXN', availability: 'https://schema.org/InStock' },
        { '@type': 'Offer', name: 'TEA Completo', price: '5800', priceCurrency: 'MXN', availability: 'https://schema.org/InStock' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqItems.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ],
};

/* ═══════════════════════════════════════════════════════════════
   UTILITY COMPONENT
   ═══════════════════════════════════════════════════════════════ */

function SectionReveal({ children, className = '', delay = 0 }: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { rootMargin: '-60px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${className}`}
      style={{ transitionDelay: `${delay}s`, transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════ */

export default function ValoracionChetumal() {
  const [activeTab, setActiveTab] = useState<TierKey>('tdahNinos');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <Head>
        <title>Valoración TDAH y Autismo en Chetumal · Karen Trujillo</title>
        <meta
          name="description"
          content={`Campaña temporal de valoraciones neuropsicológicas de TDAH y Autismo en Chetumal. Neuropsicóloga Karen Trujillo (Cédula ${CEDULA}) · ${MAX_SLOTS} cupos · desde $3,900 MXN.`}
        />
        <link rel="canonical" href={CANONICAL_URL} />
        <meta name="geo.region" content="MX-ROO" />
        <meta name="geo.placename" content="Chetumal, Quintana Roo" />

        <meta property="og:type" content="website" />
        <meta property="og:locale" content="es_MX" />
        <meta property="og:site_name" content="Neuropsicóloga Karen Trujillo" />
        <meta property="og:title" content="Valoración TDAH y Autismo en Chetumal · Campaña Temporal" />
        <meta property="og:description" content={`${MAX_SLOTS} cupos. La neuropsicóloga Karen Trujillo estará en Chetumal. Desde $3,900 MXN. Cédula ${CEDULA}.`} />
        <meta property="og:url" content={CANONICAL_URL} />
        <meta property="og:image" content={KAREN_IMAGE} />
        <meta property="og:image:width" content="465" />
        <meta property="og:image:height" content="533" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Valoración TDAH y Autismo en Chetumal · Campaña Temporal" />
        <meta name="twitter:description" content={`${MAX_SLOTS} cupos · Karen Trujillo · Cédula ${CEDULA} · desde $3,900 MXN`} />
        <meta name="twitter:image" content={KAREN_IMAGE} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />

        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes fadeIn  { from { opacity: 0; } to { opacity: 1; } }
          @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        ` }} />
      </Head>

      <div className="antialiased w-full min-w-0 overflow-x-hidden">
        <Navbar />

        <main className="w-full min-w-0 overflow-x-hidden">

          {/* ── HERO ── */}
          <section
            className="relative flex items-center justify-center pt-28 pb-16 px-6 overflow-hidden"
            style={{ background: '#2b1f47' }}
          >
            <div aria-hidden="true" className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(208,208,231,0.08) 0%, transparent 70%)' }} />
            <div aria-hidden="true" className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(91,78,127,0.15) 0%, transparent 70%)' }} />

            <div className="max-w-3xl mx-auto relative z-10 text-center">

              <nav aria-label="Breadcrumb" className="mb-6 animate-[fadeIn_0.6s_ease-out_both]">
                <ol className="flex items-center justify-center gap-2 text-xs" style={{ color: 'rgba(208,208,231,0.6)' }}>
                  <li><Link href="/" className="hover:text-white transition-colors">Inicio</Link></li>
                  <li style={{ color: 'rgba(208,208,231,0.3)' }} aria-hidden="true">/</li>
                  <li className="text-white font-medium">Valoración en Chetumal</li>
                </ol>
              </nav>

              <div className="animate-[fadeInUp_0.8s_ease-out_both]">
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(208,208,231,0.18)' }}
                >
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shrink-0" aria-hidden="true" />
                  <span className="text-[9px] uppercase tracking-[0.12em] font-bold" style={{ color: 'rgba(208,208,231,0.8)' }}>
                    Disponible solo del {CAMPAIGN_START} al {CAMPAIGN_END}
                  </span>
                </div>

                <h1 className="text-[2rem] sm:text-5xl font-serif font-bold text-white leading-[1.1] mb-4 text-balance">
                  Valoración TDAH y Autismo<br className="hidden sm:block" /> en Chetumal
                </h1>

                <p className="text-sm sm:text-base font-light leading-relaxed mb-4 max-w-2xl mx-auto" style={{ color: 'rgba(208,208,231,0.82)' }}>
                  La neuropsicóloga Karen Trujillo estará en Chetumal por tiempo limitado. El mismo diagnóstico neuropsicológico con instrumentos estandarizados internacionales que en su consultorio de Cancún.
                </p>

                <p className="text-xs mb-8" style={{ color: 'rgba(208,208,231,0.6)' }}>
                  <strong className="text-white">Karen Trujillo</strong> · Cédula Federal {CEDULA} · ★ {REVIEWS.ratingValue} · {REVIEWS.reviewCount} reseñas Google · 7+ años de experiencia
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-[fadeInUp_0.8s_ease-out_0.3s_both]">
                <a
                  href={waUrl('Hola Karen, vi la campaña de valoraciones en Chetumal y me interesa reservar un lugar. ¿Cuál es la disponibilidad?')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-2xl bg-white text-primary hover:bg-white/90 hover:-translate-y-1 transition-all duration-300 shadow-xl shadow-black/20"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  Reservar por WhatsApp
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </a>
                <a
                  href="#paquetes"
                  onClick={(e) => { e.preventDefault(); document.getElementById('paquetes')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="inline-flex items-center justify-center gap-2 font-bold text-[9px] uppercase tracking-widest px-6 py-4 rounded-xl border-2 border-white/25 text-white/80 hover:border-white/50 hover:text-white transition-all duration-300"
                >
                  Ver paquetes y precios
                  <ChevronDown className="w-3 h-3" aria-hidden="true" />
                </a>
              </div>
            </div>
          </section>


          {/* ── POR QUÉ AHORA ── */}
          <section className="py-12 bg-card border-b border-border">
            <div className="max-w-3xl mx-auto px-6">
              <SectionReveal>
                <div className="grid sm:grid-cols-3 gap-5">
                  {[
                    { Icon: MapPin, title: 'Consultorio en Chetumal', body: CHETUMAL_ADDRESS },
                    { Icon: Calendar, title: 'Periodo de campaña', body: `Del ${CAMPAIGN_START} al ${CAMPAIGN_END}` },
                    { Icon: Lock, title: 'Cupos limitados', body: `Solo ${MAX_SLOTS} cupos disponibles — se asignan por orden de reserva.` },
                  ].map(({ Icon, title, body }) => (
                    <div key={title} className="flex flex-col items-center text-center gap-3 p-6 rounded-2xl bg-secondary/50 border border-border">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary/70" aria-hidden="true" />
                      </div>
                      <p className="font-bold text-primary text-sm">{title}</p>
                      <p className="text-xs text-muted-foreground font-light leading-relaxed">{body}</p>
                    </div>
                  ))}
                </div>
              </SectionReveal>
            </div>
          </section>


          {/* ── PAQUETES Y PRECIOS ── */}
          <section id="paquetes" className="py-16 sm:py-24 bg-secondary scroll-mt-20">
            <div className="max-w-4xl mx-auto px-6">
              <SectionReveal>
                <p className="text-xs font-bold uppercase tracking-widest text-accent-blue mb-4 text-center">Precios de campaña</p>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-3 text-center">¿Qué nivel necesitas?</h2>
                <p className="text-muted-foreground font-light text-center max-w-xl mx-auto mb-10">
                  Los tres niveles incluyen la misma especialista y el mismo rigor clínico. Se diferencian por los instrumentos aplicados, el tipo de informe y el formato de devolución.
                </p>

                {/* Tabs */}
                <div className="flex gap-2 justify-center mb-8 flex-wrap" role="tablist" aria-label="Tipo de valoración">
                  {TABS.map((tab) => (
                    <button
                      key={tab.key}
                      role="tab"
                      aria-selected={activeTab === tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-200 ${
                        activeTab === tab.key
                          ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                          : 'bg-card text-muted-foreground border border-border hover:border-primary/40 hover:text-primary'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Tier cards */}
                <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto" role="tabpanel">
                  {TIERS[activeTab].map((tier) => (
                    <div
                      key={tier.name}
                      className={`relative rounded-2xl border-2 p-6 flex flex-col transition-all duration-300 ${
                        tier.recommended
                          ? 'border-primary bg-primary/5 shadow-xl shadow-primary/10'
                          : 'border-border bg-card hover:border-primary/30 hover:shadow-md'
                      }`}
                    >
                      {tier.recommended && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-[9px] font-bold uppercase tracking-widest rounded-full shadow-md whitespace-nowrap">
                          Recomendado ★
                        </div>
                      )}

                      <p className="font-bold text-primary uppercase tracking-wider text-xs mb-2">{tier.name}</p>
                      <p className="text-3xl font-serif font-bold text-primary mb-1">
                        ${tier.price.toLocaleString('es-MX')}
                      </p>
                      <p className="text-xs text-muted-foreground font-light mb-5">MXN · Anticipo 50% al reservar</p>

                      <div className="space-y-3 mb-6 flex-1">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary/60 shrink-0 mt-0.5" aria-hidden="true" />
                          <span className="text-xs text-foreground font-medium leading-snug">{tier.sessions}</span>
                        </div>
                        <p className="text-xs text-muted-foreground font-light leading-snug pl-5">{tier.devolucion}</p>

                        <div className="border-t border-border/50 pt-3">
                          <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Instrumentos</p>
                          <div className="flex flex-wrap gap-1.5">
                            {tier.instruments.map((inst) => (
                              <span
                                key={inst}
                                className="px-2 py-0.5 bg-secondary border border-border rounded-full text-[9px] font-bold text-primary/70"
                              >
                                {inst}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="border-t border-border/50 pt-3">
                          <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Informe</p>
                          <p className="text-xs text-foreground font-medium leading-snug">{tier.report}</p>
                        </div>
                      </div>

                      <a
                        href={waUrl(tier.waMessage)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full inline-flex items-center justify-center gap-2 font-bold text-[9px] uppercase tracking-widest py-3 rounded-xl transition-all duration-200 ${
                          tier.recommended
                            ? 'bg-primary text-primary-foreground hover:opacity-90 shadow-md shadow-primary/20'
                            : 'border-2 border-primary/30 text-primary hover:border-primary hover:bg-primary/5'
                        }`}
                      >
                        <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                        Reservar este nivel
                      </a>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-muted-foreground/60 text-center mt-6">
                  Sin costos ocultos. El anticipo (50% del total) se paga al reservar — el 50% restante en la primera sesión.
                </p>
              </SectionReveal>
            </div>
          </section>


          {/* ── TESTIMONIOS ── */}
          <section className="py-16 bg-primary">
            <div className="max-w-4xl mx-auto px-6">
              <SectionReveal>
                <p className="text-xs font-bold uppercase tracking-widest mb-4 text-center" style={{ color: 'rgba(208,208,231,0.6)' }}>
                  La misma especialista · Pacientes atendidos en Cancún
                </p>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary-foreground text-center mb-3">
                  Esto dicen quienes<br />
                  <span className="italic font-normal text-primary-foreground/70">ya la conocen</span>
                </h2>
                <div className="flex items-center justify-center gap-2 mb-10">
                  <div className="flex gap-1" aria-label={`${REVIEWS.ratingValue} de 5 estrellas`}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-warning fill-warning" aria-hidden="true" />
                    ))}
                  </div>
                  <span className="text-primary-foreground font-bold">{REVIEWS.ratingValue}</span>
                  <span className="text-primary-foreground/50 text-sm">({REVIEWS.reviewCount} reseñas en Google)</span>
                </div>
              </SectionReveal>

              <div className="grid sm:grid-cols-3 gap-5">
                {testimonials.map((t, i) => (
                  <SectionReveal key={t.name} delay={i * 0.1}>
                    <article className="bg-primary-foreground/[0.07] border border-primary-foreground/[0.12] rounded-2xl p-6 h-full flex flex-col">
                      <div className="text-4xl font-serif text-primary-foreground/20 leading-none mb-3 select-none" aria-hidden="true">&ldquo;</div>
                      <p className="text-primary-foreground/85 text-sm leading-relaxed flex-1 mb-5">{t.text}</p>
                      <div className="flex items-center gap-3 pt-4 border-t border-primary-foreground/10">
                        <div className="w-8 h-8 rounded-full bg-primary-foreground/15 flex items-center justify-center font-bold text-xs text-primary-foreground shrink-0" aria-hidden="true">
                          {t.initials}
                        </div>
                        <div>
                          <p className="font-bold text-primary-foreground text-xs">{t.name}</p>
                          <p className="text-[10px] text-primary-foreground/50">{t.service} · Cancún</p>
                        </div>
                      </div>
                    </article>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </section>


          {/* ── FAQ ── */}
          <section className="py-16 sm:py-20 bg-card border-t border-border">
            <div className="max-w-3xl mx-auto px-6">
              <SectionReveal>
                <p className="text-xs font-bold uppercase tracking-widest text-accent-blue mb-4 text-center">Preguntas frecuentes</p>
                <h2 className="text-3xl font-serif font-bold text-primary text-center mb-10">Lo que más preguntan</h2>
              </SectionReveal>

              <div className="space-y-3">
                {faqItems.map((item, i) => (
                  <SectionReveal key={i} delay={i * 0.05}>
                    <div className="rounded-2xl border border-border bg-card overflow-hidden">
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left hover:bg-secondary/50 transition-colors"
                        aria-expanded={openFaq === i}
                      >
                        <span className="font-medium text-primary text-sm leading-snug">{item.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`}
                          aria-hidden="true"
                        />
                      </button>
                      {openFaq === i && (
                        <div className="px-6 pb-5 pt-4 text-sm text-muted-foreground font-light leading-relaxed border-t border-border/50">
                          {item.a}
                        </div>
                      )}
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </section>


          {/* ── CTA FINAL ── */}
          <section className="py-16 sm:py-24 bg-gradient-primary text-primary-foreground">
            <div className="max-w-3xl mx-auto px-6 text-center">
              <SectionReveal>
                <ShieldCheck className="w-12 h-12 text-primary-foreground/30 mx-auto mb-6" aria-hidden="true" />
                <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4">
                  Los cupos se asignan<br />
                  <span className="italic font-normal text-primary-foreground/70">por orden de reserva</span>
                </h2>
                <p className="text-primary-foreground/70 font-light mb-8 max-w-lg mx-auto">
                  Del {CAMPAIGN_START} al {CAMPAIGN_END} en Chetumal. Una vez terminada la campaña, la siguiente disponibilidad es en Cancún.
                </p>

                <a
                  href={waUrl('Hola Karen, vi la campaña de valoraciones en Chetumal y quiero reservar mi lugar. ¿Cuáles son los próximos pasos?')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-3 font-bold text-xs uppercase tracking-widest px-10 py-5 rounded-2xl bg-white text-primary hover:bg-white/90 hover:-translate-y-1 transition-all duration-300 shadow-2xl shadow-black/20"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  Reservar por WhatsApp ahora
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </a>

                <p className="text-xs text-primary-foreground/40 mt-6">
                  Anticipo del 50% reembolsable si cancelas con 48 horas de anticipación.
                </p>

                <div className="flex items-center justify-center gap-2 mt-8">
                  <BadgeCheck className="w-4 h-4 text-primary-foreground/40" aria-hidden="true" />
                  <span className="text-xs text-primary-foreground/50">
                    Cédula Federal {CEDULA} · ★ {REVIEWS.ratingValue} · {REVIEWS.reviewCount} reseñas verificadas en Google
                  </span>
                </div>
              </SectionReveal>
            </div>
          </section>

        </main>

        <Footer />
      </div>
    </>
  );
}
