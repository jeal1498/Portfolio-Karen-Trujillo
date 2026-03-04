import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {
  CheckCircle2, MessageCircle, Phone, Clock,
  CalendarCheck, Shield, BadgeCheck, ShieldCheck,
  ArrowRight, Star,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

/* ══════════════════════════════════════════
   CONFIG
══════════════════════════════════════════ */
const CAL_URL   = 'https://cal.com/psicologa-karen-trujillo/evaluacion-tdah-infantil';
const WA_NUMBER = '529983211547';
const WA_MSG    = encodeURIComponent('Hola Karen, leí tu artículo sobre TDAH y quiero saber más antes de agendar.');
const TEL       = '529983211547';

/* ══════════════════════════════════════════
   DATA — mínima, solo lo que cierra
══════════════════════════════════════════ */

/* Lo que incluye — una línea por ítem, sin adjetivos */
const includes = [
  'Primera cita solo contigo — Karen escucha todo, sin el niño todavía',
  'Pruebas estandarizadas internacionales (CONNERS-3, WISC-V, BRIEF-2, CPT-3)',
  'Cuestionarios a maestros incluidos',
  'Informe clínico con diagnóstico diferencial y plan de acción',
  'Sesión de devolución: qué encontramos y qué sigue',
  'Validez oficial ante SEP, IMSS y escuelas en todo México',
];

/* 3 micro-objeciones que aparecen justo antes del clic */
const lastMileObjections = [
  { label: 'Sin compromiso adicional', sub: 'Solo apartas tu lugar. La primera cita es una conversación.' },
  { label: 'Reembolso si cancelas', sub: 'Con 48 hrs de anticipación te devolvemos el anticipo completo.' },
  { label: '$1,000 MXN al agendar', sub: 'Ya incluido en el total de $7,000 MXN. Sin costos ocultos.' },
];

/* Una sola review — la que tiene el outcome más concreto */
const review = {
  outcome: 'La escuela implementó adecuaciones en dos semanas',
  text: 'Llevábamos un año yendo de médico en médico sin un papel concreto. El informe de Karen fue tan claro que la directora llamó ella misma para coordinar el apoyo.',
  who: 'Mamá de Sofía, 7 años',
};

/* ══════════════════════════════════════════
   HELPERS
══════════════════════════════════════════ */
function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setOn(true); obs.unobserve(el); } },
      { rootMargin: '-20px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: on ? 1 : 0,
        transform: on ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity .55s cubic-bezier(.22,1,.36,1) ${delay}s, transform .55s cubic-bezier(.22,1,.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ══════════════════════════════════════════
   PAGE
══════════════════════════════════════════ */
export default function PruebaTDAH() {
  const [calVisible, setCalVisible] = useState(false);
  const [calLoaded, setCalLoaded]   = useState(false);
  const calRef     = useRef<HTMLDivElement>(null);
  const heroCTARef = useRef<HTMLDivElement>(null);
  const [heroVisible, setHeroVisible] = useState(true);

  useEffect(() => {
    const el = heroCTARef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setHeroVisible(e.isIntersecting),
      { rootMargin: '0px 0px -80px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const el = calRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setCalVisible(true); obs.unobserve(el); } },
      { rootMargin: '600px' }   // pre-carga agresiva
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <Head>
        <title>Agenda tu valoración TDAH infantil · Karen Trujillo Cancún</title>
        <meta name="description" content="Reserva tu primera cita con la neuropsicóloga Karen Trujillo en Cancún. Valoración TDAH infantil con informe oficial. $1,000 MXN al agendar, reembolsable." />
        <link rel="canonical" href="https://psicologakarentrujillo.com.mx/evaluacion-tdah-ninos" />
        <meta name="robots" content="noindex" />
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes fadeInUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:none; } }
          @keyframes fadeIn   { from { opacity:0; } to { opacity:1; } }
        ` }} />
      </Head>

      <div className="antialiased w-full min-w-0 overflow-x-hidden">
        <Navbar />

        <main className="w-full min-w-0 overflow-x-hidden">

          {/* ══════════════════════════════════════════════
              HERO — confirmar decisión, no volver a vender
              El usuario ya sabe por qué está aquí.
              Solo necesita sentir que está en el lugar correcto.
          ══════════════════════════════════════════════ */}
          <section className="relative flex items-center justify-center pt-28 pb-14 px-6 overflow-hidden bg-soft-gradient">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-blue/15 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-accent-pink/15 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />
            <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

            <div className="max-w-xl mx-auto relative z-10 text-center">

              {/* Breadcrumb de progreso — "ya casi" */}
              <div
                className="inline-flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border shadow-md mb-8"
                style={{ animation: 'fadeIn .5s ease-out both' }}
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-success shrink-0" />
                <span className="text-[9px] uppercase tracking-[.12em] font-bold text-muted-foreground">
                  Leíste el artículo · Ahora elige tu fecha
                </span>
              </div>

              {/* H1 — confirmación, no persuasión */}
              <h1
                className="text-[2rem] sm:text-4xl font-serif font-bold text-primary leading-[1.15] mb-4 text-balance"
                style={{ animation: 'fadeInUp .65s ease-out .1s both' }}
              >
                Ya tienes toda la información.<br />
                <span className="italic text-primary/65">Ahora es tu turno.</span>
              </h1>

              <p
                className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed mb-8 max-w-md mx-auto"
                style={{ animation: 'fadeInUp .65s ease-out .2s both' }}
              >
                Elige una fecha y Karen se sienta contigo en la primera cita —
                a escucharte, sin pruebas todavía y sin compromisos adicionales.
              </p>

              {/* CTA + micro-copy anti-ansiedad */}
              <div
                ref={heroCTARef}
                className="flex flex-col items-center gap-2 mb-8"
                style={{ animation: 'fadeInUp .65s ease-out .3s both' }}
              >
                <a
                  href="#agendar"
                  onClick={(e) => { e.preventDefault(); document.getElementById('agendar')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="group inline-flex items-center gap-2.5 bg-gradient-primary text-primary-foreground font-bold text-[11px] uppercase tracking-widest px-8 py-4 rounded-xl shadow-xl shadow-primary/30 hover:shadow-primary/40 hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-300"
                >
                  <CalendarCheck className="w-4 h-4 shrink-0" />
                  Ver fechas disponibles
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </a>
                {/* Una sola línea — la objeción más común */}
                <p className="text-[11px] text-muted-foreground/50 font-light">
                  Solo $1,000 MXN para apartar · Reembolsable con 48 hrs de anticipación
                </p>
              </div>

              {/* Trust — mínimo, solo lo esencial */}
              <div
                className="flex flex-wrap justify-center gap-x-6 gap-y-2.5 text-xs text-muted-foreground"
                style={{ animation: 'fadeIn .7s ease-out .45s both' }}
              >
                <span className="flex items-center gap-1.5"><BadgeCheck className="w-3.5 h-3.5 text-primary/40" /><span className="font-medium">Cédula 11009616</span></span>
                <span className="flex items-center gap-1.5"><Shield       className="w-3.5 h-3.5 text-primary/40" /><span className="font-medium">Válido ante SEP e IMSS</span></span>
                <span className="flex items-center gap-1.5"><Clock        className="w-3.5 h-3.5 text-primary/40" /><span className="font-medium">7+ años de experiencia</span></span>
              </div>
            </div>
          </section>


          {/* ══════════════════════════════════════════════
              CIERRE DE OBJECIONES — solo 3
              La última fricción antes del calendario
          ══════════════════════════════════════════════ */}
          <section className="py-8 bg-secondary border-t border-border">
            <div className="max-w-xl mx-auto px-6">
              <div className="grid sm:grid-cols-3 gap-3">
                {lastMileObjections.map((obj, i) => (
                  <Reveal key={i} delay={i * 0.07}>
                    <div className="flex flex-col gap-1 p-4 bg-card rounded-2xl border border-border text-center">
                      <CheckCircle2 className="w-4 h-4 text-success mx-auto mb-1" />
                      <p className="text-xs font-bold text-primary">{obj.label}</p>
                      <p className="text-[11px] text-muted-foreground font-light leading-snug">{obj.sub}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>


          {/* ══════════════════════════════════════════════
              BOOKING — el núcleo de la página
              Todo lo demás existe para llegar aquí
          ══════════════════════════════════════════════ */}
          <section id="agendar" className="py-14 sm:py-20 bg-card border-t border-border scroll-mt-20">
            <div className="max-w-2xl mx-auto px-6">

              {/* Precio + lo que incluye — en el mismo bloque que el CTA */}
              <Reveal>
                <div className="bg-card border-2 border-border rounded-3xl overflow-hidden shadow-xl shadow-primary/5 mb-5">

                  {/* Header del card */}
                  <div className="px-6 sm:px-8 pt-7 pb-5 border-b border-border">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Valoración completa</p>
                        <p className="text-4xl font-serif font-bold text-primary">$7,000 <span className="text-base font-light text-muted-foreground">MXN</span></p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Para apartar hoy</p>
                        <p className="text-2xl font-serif font-bold text-primary">$1,000 <span className="text-sm font-light text-muted-foreground">MXN</span></p>
                        <p className="text-[10px] text-muted-foreground/50">ya incluido en el total</p>
                      </div>
                    </div>
                  </div>

                  {/* Includes — compacto */}
                  <div className="px-6 sm:px-8 py-5 border-b border-border">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Incluye</p>
                    <div className="space-y-2">
                      {includes.map((item) => (
                        <div key={item} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary/50 shrink-0 mt-0.5" />
                          <p className="text-xs text-foreground font-light leading-snug">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="px-6 sm:px-8 py-6">
                    <a
                      href={CAL_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-center gap-2.5 w-full bg-gradient-primary text-primary-foreground font-bold text-[11px] uppercase tracking-widest py-4 rounded-xl shadow-xl shadow-primary/30 hover:shadow-primary/40 hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-300"
                    >
                      <CalendarCheck className="w-4 h-4 shrink-0" />
                      Elegir mi fecha — es gratis hasta confirmar
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </a>
                    <p className="text-[10px] text-muted-foreground/50 text-center mt-3">
                      Solo pagas al confirmar · Cancelación con reembolso hasta 48 hrs antes
                    </p>
                  </div>

                  {/* Risk reversal */}
                  <div className="border-t border-border bg-success/5 px-6 sm:px-8 py-3 flex items-center justify-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-success shrink-0" />
                    <p className="text-xs text-success font-medium">Reserva sin riesgo — reembolso total si cancelas con 48 hrs de anticipación</p>
                  </div>
                </div>
              </Reveal>

              {/* Cal.com iframe — carga agresiva */}
              <Reveal delay={0.1}>
                <div className="bg-card border-2 border-border rounded-3xl overflow-hidden shadow-lg shadow-primary/5">
                  <div className="p-4 border-b border-border bg-secondary/30 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center">
                        <CalendarCheck className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-bold text-primary text-sm">Selecciona tu fecha</p>
                        <p className="text-[10px] text-muted-foreground">Cancún · Horario local</p>
                      </div>
                    </div>
                    {!calLoaded && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className="w-3 h-3 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                        Cargando...
                      </div>
                    )}
                  </div>
                  <div ref={calRef} style={{ minHeight: '620px' }}>
                    {calVisible ? (
                      <iframe
                        src={`${CAL_URL}?embed=true&layout=month_view&theme=light`}
                        className="w-full border-0"
                        style={{ height: '620px' }}
                        loading="eager"          // eager — usuario de alta temperatura
                        onLoad={() => setCalLoaded(true)}
                        title="Agendar valoración TDAH infantil — Neuropsicóloga Karen Trujillo"
                        allow="payment"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-[620px]">
                        <div className="text-center">
                          <CalendarCheck className="w-8 h-8 text-primary/20 mx-auto mb-3" />
                          <p className="text-sm text-muted-foreground font-light">Cargando calendario...</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>

              {/* Trust row */}
              <Reveal delay={0.15}>
                <div className="mt-5 flex flex-wrap justify-center gap-3 text-xs text-muted-foreground">
                  {[
                    { icon: Shield,     label: 'Pago seguro' },
                    { icon: Clock,      label: 'Cancelación 48 hrs' },
                    { icon: BadgeCheck, label: 'Cédula 11009616' },
                  ].map(({ icon: Icon, label }) => (
                    <span key={label} className="flex items-center gap-2 px-3 py-1.5 bg-card rounded-full border border-border">
                      <Icon className="w-3.5 h-3.5 text-primary/40" />
                      {label}
                    </span>
                  ))}
                </div>
              </Reveal>


              {/* ── Una sola review — la más concreta ── */}
              <Reveal delay={0.2}>
                <div className="mt-8 bg-secondary rounded-2xl border border-border p-5">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/8 border border-primary/10 rounded-lg mb-3">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                    <p className="text-xs font-bold text-primary">{review.outcome}</p>
                  </div>
                  <p className="text-sm text-muted-foreground font-light italic leading-relaxed mb-3">"{review.text}"</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-primary/50">{review.who}</p>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-warning text-warning" />
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>


              {/* ── Alternativas de contacto — sin presión ── */}
              <Reveal delay={0.25}>
                <div className="mt-10 pt-8 border-t border-border text-center">
                  <p className="text-sm text-muted-foreground font-light mb-1">¿Tienes una duda de último momento?</p>
                  <p className="text-xs text-muted-foreground/40 mb-5">Respondemos en minutos</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href={`https://wa.me/${WA_NUMBER}?text=${WA_MSG}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-6 py-3.5 bg-whatsapp hover:opacity-90 text-white font-bold text-[10px] uppercase tracking-widest rounded-xl transition-all active:scale-[0.98]"
                    >
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp
                    </a>
                    <a
                      href={`tel:${TEL}`}
                      className="flex items-center justify-center gap-2 px-6 py-3.5 bg-card border-2 border-border hover:border-primary/40 text-primary font-bold text-[10px] uppercase tracking-widest rounded-xl transition-all active:scale-[0.98]"
                    >
                      <Phone className="w-4 h-4" />
                      Llamar
                    </a>
                  </div>
                  <p className="text-[10px] text-muted-foreground/40 mt-4">Lun–Vie 9:00–7:00 PM · Sáb 9:00–2:00 PM</p>
                </div>
              </Reveal>
            </div>
          </section>


          {/* ── Internal linking — al fondo, sin distraer ── */}
          <section className="py-8 bg-card border-t border-border">
            <div className="max-w-xl mx-auto px-6">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4 text-center">Otros servicios en Cancún</p>
              <div className="grid sm:grid-cols-2 gap-3">
                <Link href="/evaluacion-tdah-adultos" className="flex items-center gap-3 p-4 bg-secondary border border-border rounded-2xl hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-300 group">
                  <ArrowRight className="w-4 h-4 text-primary/40 shrink-0 group-hover:translate-x-1 transition-transform" />
                  <div>
                    <span className="text-sm font-bold text-primary block">TDAH en Adultos</span>
                    <span className="text-[10px] text-muted-foreground font-light">Valoración +18 años</span>
                  </div>
                </Link>
                <Link href="/evaluacion-autismo-cancun" className="flex items-center gap-3 p-4 bg-secondary border border-border rounded-2xl hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-300 group">
                  <ArrowRight className="w-4 h-4 text-primary/40 shrink-0 group-hover:translate-x-1 transition-transform" />
                  <div>
                    <span className="text-sm font-bold text-primary block">Autismo (TEA)</span>
                    <span className="text-[10px] text-muted-foreground font-light">Diagnóstico con ADOS-2</span>
                  </div>
                </Link>
              </div>
            </div>
          </section>

        </main>

        <Footer />

        {/* ── Mobile sticky CTA ── */}
        <div
          className={`fixed bottom-0 left-0 right-0 z-[100] px-4 pb-5 lg:hidden bg-gradient-to-t from-background via-background/95 to-transparent pt-6 transition-all duration-300 ${
            heroVisible ? 'opacity-0 translate-y-10 pointer-events-none' : 'opacity-100 translate-y-0'
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)' }}
        >
          <a
            href="#agendar"
            onClick={(e) => { e.preventDefault(); document.getElementById('agendar')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="flex flex-col items-center justify-center w-full bg-gradient-primary text-primary-foreground py-3.5 rounded-xl font-bold shadow-2xl shadow-primary/35 active:scale-[0.98] transition-transform"
          >
            <span className="text-[11px] uppercase tracking-widest">Ver fechas disponibles</span>
            <span className="text-[9px] text-primary-foreground/60 font-light mt-0.5">$1,000 MXN · Reembolsable · Sin compromisos</span>
          </a>
        </div>
      </div>
    </>
  );
}
