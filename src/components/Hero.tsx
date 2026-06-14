import { ArrowRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center pt-28 pb-20 px-6 overflow-hidden bg-soft-gradient">
      {/* Background decorations — decorative only */}
      <div aria-hidden="true" className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-blue/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div aria-hidden="true" className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-pink/40 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">

        {/* Hero Image — shows above text on mobile, right column on desktop */}
        <motion.div
          className="lg:col-span-5 relative order-first lg:order-last"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Mobile: compact circular crop */}
          <div className="mx-auto w-44 h-44 rounded-full overflow-hidden shadow-[0_12px_40px_-8px_rgba(56,47,81,0.25)] md:hidden">
            <img
              src="/Psicologa_Karen_Trujillo.webp"
              alt="Neuropsicóloga Karen Trujillo, especialista en TDAH y autismo en Cancún"
              className="w-full h-full object-cover object-top"
              loading="eager"
            />
          </div>

          {/* Desktop: full photo with credential overlay card */}
          <div className="hidden md:block relative z-10 w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_30px_80px_-15px_rgba(56,47,81,0.30)]">
            <img
              src="/Psicologa_Karen_Trujillo.webp"
              alt="Neuropsicóloga Karen Trujillo, especialista en valoración de TDAH y Autismo en Cancún, Quintana Roo"
              className="w-full h-full object-cover object-top"
              loading="eager"
            />
            <div className="absolute bottom-6 right-6 glass p-5 rounded-2xl shadow-lg max-w-[230px] backdrop-blur-xl">
              <span className="text-xs font-bold text-primary block mb-2">Informe Clínico Oficial</span>
              <p className="text-xs font-serif italic text-primary leading-relaxed">Diagnóstico con validez ante SEP, IMSS e instituciones educativas.</p>
              <p className="text-xs font-bold text-primary/80 mt-3 uppercase tracking-wider">Cédula Federal 11009616</p>
            </div>
          </div>

          <div aria-hidden="true" className="absolute inset-0 bg-accent-sand rounded-2xl rotate-6 scale-95 -z-10 opacity-40 hidden md:block" />
          <div aria-hidden="true" className="absolute inset-0 bg-accent-pink rounded-2xl rotate-3 scale-90 -z-10 opacity-20 hidden md:block" />
        </motion.div>

        {/* Content */}
        <motion.header
          className="lg:col-span-7 text-center lg:text-left space-y-6 lg:space-y-8 order-last lg:order-first"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border shadow-sm mx-auto lg:mx-0">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" aria-hidden="true" />
            <span className="text-xs uppercase tracking-widest font-bold text-muted-foreground">Agenda Abierta — Cancún &amp; Online</span>
          </div>

          <h1 className="text-display font-serif font-bold text-primary text-balance">
            Valoración TDAH<br />
            <span className="text-primary-light font-normal italic">y Autismo</span><br />
            en Cancún
          </h1>

          <p className="text-muted-foreground text-lg lg:text-xl font-light leading-relaxed max-w-2xl mx-auto lg:mx-0 text-balance">
            Diagnóstico neuropsicológico con instrumentos estandarizados internacionales. Informe clínico con validez oficial ante escuelas, IMSS e instituciones.{' '}
            <strong className="text-primary">Neuropsicóloga Karen Trujillo — Cédula Federal 11009616.</strong>
          </p>

          {/* Service pills */}
          <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
            {['TDAH Infantil (5+ años)', 'TDAH Adultos', 'Autismo / TEA (2+ años)'].map((s) => (
              <span key={s} className="px-3 py-1 rounded-full bg-accent-blue/10 border border-accent-blue/20 text-xs font-bold text-primary">
                {s}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
            <a
              href="https://wa.me/529983211547?text=Hola%20Karen,%20me%20interesa%20agendar%20una%20valoración"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-primary hover:opacity-90 text-primary-foreground py-4 px-10 rounded-2xl font-bold text-xs shadow-xl shadow-primary/25 hover:shadow-2xl hover:-translate-y-1 transition-all uppercase tracking-widest flex items-center justify-center gap-2"
            >
              Agendar Valoración <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
            <a
              href="#servicios"
              onClick={(e) => scrollToSection(e, '#servicios')}
              className="bg-card text-primary border-2 border-primary py-4 px-10 rounded-2xl font-bold text-xs hover:bg-primary hover:text-primary-foreground transition-all uppercase tracking-widest shadow-sm"
            >
              Ver Servicios
            </a>
          </div>

          {/* Trust signals — concrete and immediately verifiable */}
          <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-2">
            <div className="flex items-center gap-1.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 text-warning fill-warning" aria-hidden="true" />
              ))}
              <span className="text-sm font-bold text-primary ml-1">5.0</span>
            </div>
            <span className="text-border hidden sm:inline" aria-hidden="true">·</span>
            <span className="text-xs text-muted-foreground">47 reseñas Google</span>
            <span className="text-border hidden sm:inline" aria-hidden="true">·</span>
            <span className="text-xs text-muted-foreground"><strong className="text-primary">Cédula</strong> 11009616</span>
            <span className="text-border hidden sm:inline" aria-hidden="true">·</span>
            <span className="text-xs text-muted-foreground"><strong className="text-primary">7+</strong> años de experiencia</span>
          </div>
        </motion.header>
      </div>
    </section>
  );
};

export default Hero;
