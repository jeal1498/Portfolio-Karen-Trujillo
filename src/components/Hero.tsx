import { ArrowRight, Brain, ShieldCheck, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-6 overflow-hidden bg-soft-gradient">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-blue/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-pink/40 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4 animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Content */}
        <motion.header
          className="lg:col-span-7 text-center lg:text-left space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-card rounded-full border border-border shadow-sm mb-2 mx-auto lg:mx-0">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Agenda Abierta — Cancún &amp; Online</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-serif font-bold text-primary leading-[1.1] text-balance">
            Valoración TDAH<br />
            <span className="gradient-text font-normal italic">y Autismo</span><br />
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

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
            <a
              href="https://wa.me/529983211547?text=Hola%20Karen,%20me%20interesa%20agendar%20una%20valoración"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-primary hover:opacity-90 text-primary-foreground py-4 px-10 rounded-lg font-bold text-xs shadow-xl shadow-primary/25 hover:shadow-2xl hover:-translate-y-1 transition-all uppercase tracking-widest flex items-center justify-center gap-2"
            >
              Agendar Valoración <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#servicios"
              onClick={(e) => scrollToSection(e, '#servicios')}
              className="bg-card text-primary border-2 border-primary py-4 px-10 rounded-lg font-bold text-xs hover:bg-primary hover:text-primary-foreground transition-all uppercase tracking-widest shadow-sm"
            >
              Ver Servicios
            </a>
          </div>

          {/* Trust signals */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
            <div className="flex -space-x-3">
              <div className="w-10 h-10 rounded-full bg-accent-sand border-2 border-card flex items-center justify-center text-[10px] font-bold text-primary shadow-md">KT</div>
              <div className="w-10 h-10 rounded-full bg-accent-blue border-2 border-card flex items-center justify-center shadow-md">
                <Brain className="w-4 h-4 text-primary-foreground" aria-hidden="true" />
              </div>
              <div className="w-10 h-10 rounded-full bg-accent-pink border-2 border-card flex items-center justify-center shadow-md">
                <ShieldCheck className="w-4 h-4 text-primary-foreground" aria-hidden="true" />
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">7+ años · Neuropsicología Clínica</p>
              <p className="text-xs text-muted-foreground/70">Instrumentos: CONNERS · WISC-V · ADOS-2 · BRIEF-2</p>
            </div>
          </div>
        </motion.header>

        {/* Hero Image */}
        <motion.div
          className="lg:col-span-5 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative z-10 w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-[8px] border-card float-animation">
            <img
              src="/images/psicologa-karen-trujillo.webp"
              alt="Neuropsicóloga Karen Trujillo, neuropsicóloga especialista en valoración de TDAH y Autismo en Cancún, Quintana Roo"
              className="w-full h-full object-cover object-top"
              loading="eager"
            />

            <div className="absolute bottom-6 right-6 glass p-5 rounded-2xl shadow-lg max-w-[230px] backdrop-blur-xl">
              <div className="flex items-start gap-2 mb-3">
                <FileText className="w-4 h-4 text-accent-blue shrink-0 mt-0.5" />
                <span className="text-xs font-bold text-primary">Informe Clínico Oficial</span>
              </div>
              <p className="text-xs font-serif italic text-primary leading-relaxed">Diagnóstico con validez ante SEP, IMSS e instituciones educativas.</p>
              <p className="text-[10px] font-bold text-primary/60 mt-3 uppercase tracking-wider">Cédula Federal 11009616</p>
            </div>
          </div>

          <div className="absolute inset-0 bg-accent-sand rounded-2xl rotate-6 scale-95 -z-10 opacity-40" />
          <div className="absolute inset-0 bg-accent-pink rounded-2xl rotate-3 scale-90 -z-10 opacity-20" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
