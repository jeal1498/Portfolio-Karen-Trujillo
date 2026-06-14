import { Zap, Network, FileCheck, ArrowRight, CheckCircle2, UserCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const evaluaciones = [
  {
    icon: Zap,
    title: 'Valoración TDAH Infantil',
    slug: '/evaluacion-tdah-ninos',
    edad: 'Niños de 5 a 17 años',
    description: 'Evaluación de atención, hiperactividad, impulsividad y funciones ejecutivas mediante pruebas estandarizadas. Detecta TDAH con o sin comorbilidades y orienta el tratamiento escolar y clínico.',
    instruments: ['CONNERS-3', 'WISC-V', 'BRIEF-2', 'Escalas de comportamiento'],
    bgColor: 'bg-accent-blue/20',
    accentBar: 'bg-accent-blue/50',
    message: 'Hola%20Karen,%20me%20interesa%20la%20valoración%20de%20TDAH%20infantil',
  },
  {
    icon: UserCheck,
    title: 'Valoración TDAH Adultos',
    slug: '/evaluacion-tdah-adultos',
    edad: 'Adultos desde 18 años',
    description: 'Diagnóstico de TDAH en adultos que sospechan tener el trastorno no diagnosticado o buscan confirmación clínica. Evaluación de funciones ejecutivas, memoria de trabajo y autorregulación.',
    instruments: ['CAARS', 'DIVA 2.0', 'CPT-3', 'Entrevista estructurada'],
    bgColor: 'bg-accent-sand',
    accentBar: 'bg-accent-sand',
    message: 'Hola%20Karen,%20me%20interesa%20la%20valoración%20de%20TDAH%20en%20adultos',
  },
  {
    icon: Network,
    title: 'Diagnóstico Autismo (TEA)',
    slug: '/evaluacion-autismo-cancun',
    edad: 'Niños desde 2 años',
    description: 'Evaluación diferencial del Trastorno del Espectro Autista mediante observación estructurada y pruebas validadas. El informe tiene validez ante SEP, IMSS e instituciones de apoyo.',
    instruments: ['ADOS-2', 'M-CHAT-R/F', 'ADI-R', 'Vineland-3'],
    bgColor: 'bg-accent-pink/30',
    accentBar: 'bg-accent-pink/60',
    message: 'Hola%20Karen,%20me%20interesa%20el%20diagnóstico%20de%20Autismo%20TEA',
  },
];

const proceso = [
  { n: '01', label: 'Entrevista inicial', desc: 'Anamnesis clínica y antecedentes familiares' },
  { n: '02', label: 'Aplicación de pruebas', desc: 'Instrumentos estandarizados y validados internacionalmente' },
  { n: '03', label: 'Análisis de resultados', desc: 'Interpretación clínica integrada de todos los datos' },
  { n: '04', label: 'Informe y devolución', desc: 'Sesión de devolución con recomendaciones y plan de acción' },
];

const ServicesSection = () => {
  return (
    <section id="servicios" className="py-16 md:py-24 lg:py-32 bg-secondary px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div aria-hidden="true" className="absolute bottom-0 right-0 w-96 h-96 bg-accent-pink/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-10 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-headline font-serif font-bold text-primary">Valoraciones Neuropsicológicas</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto font-light">
            Diagnóstico de TDAH y Autismo con instrumentos estandarizados internacionales. Informe clínico con cédula federal válido ante escuelas, IMSS y organismos oficiales.
          </p>
        </motion.div>

        {/* Evaluation Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 md:mb-20">
          {evaluaciones.map((ev, index) => (
            <motion.article
              key={ev.title}
              className="group bg-card rounded-2xl shadow-sm hover:shadow-[0_20px_60px_-15px_rgba(56,47,81,0.15)] transition-all duration-300 hover:-translate-y-2 border border-border overflow-hidden flex flex-col h-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Colored category header — replaces thin accent bar */}
              <div className={`${ev.bgColor} px-8 py-5 flex items-center gap-4 shrink-0`}>
                <div className="w-11 h-11 rounded-xl bg-white/50 flex items-center justify-center text-primary shrink-0">
                  <ev.icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-primary/70">{ev.edad}</span>
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <h3 className="font-bold text-xl mb-3 text-primary">{ev.title}</h3>
                <p className="text-muted-foreground text-sm font-light leading-relaxed mb-5 flex-grow">{ev.description}</p>

                <ul className="space-y-1 mb-6">
                  {ev.instruments.map((inst) => (
                    <li key={inst} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 className="w-3 h-3 text-success shrink-0" aria-hidden="true" />
                      {inst}
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-border space-y-2">
                  <Link
                    href={ev.slug}
                    className="block w-full py-3 rounded-2xl bg-secondary text-primary font-bold text-xs uppercase tracking-widest hover:bg-primary/10 transition-all text-center"
                  >
                    Ver proceso completo
                  </Link>
                  <a
                    href={`https://wa.me/529983211547?text=${ev.message}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-3 rounded-2xl bg-gradient-primary text-primary-foreground font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-all text-center"
                  >
                    Agendar ahora
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Process Timeline */}
        <motion.div
          className="relative rounded-2xl overflow-hidden bg-gradient-primary text-primary-foreground shadow-2xl shadow-primary/30"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div aria-hidden="true" className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-20" />
          <div aria-hidden="true" className="absolute -right-20 -top-20 w-96 h-96 bg-accent-blue/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 p-8 md:p-16">
            <div className="max-w-3xl mx-auto mb-10 md:mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-serif font-bold italic mb-4">¿Cómo es el proceso de valoración?</h2>
              <p className="text-primary-foreground/80 font-light">Todas las evaluaciones siguen el mismo protocolo clínico de 4 fases. Duración total: 2 a 3 semanas.</p>
            </div>

            <ol className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {proceso.map((paso) => (
                <li key={paso.n} className="glass-dark border border-primary-foreground/10 p-5 md:p-6 rounded-xl">
                  <span className="text-4xl font-serif font-bold text-accent-blue/60 block mb-3">{paso.n}</span>
                  <h3 className="text-sm md:text-base font-bold text-primary-foreground mb-2">{paso.label}</h3>
                  <p className="text-primary-foreground/60 text-xs md:text-sm font-light">{paso.desc}</p>
                </li>
              ))}
            </ol>

            <div className="text-center mt-10">
              <a
                href="https://wa.me/529983211547?text=Hola%20Karen,%20quiero%20información%20sobre%20el%20proceso%20de%20valoración"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary-foreground text-primary font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-2xl hover:opacity-90 transition-all shadow-lg"
              >
                Solicitar información <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Certificados — servicio secundario */}
        <motion.div
          className="mt-8 p-6 md:p-8 bg-card rounded-xl border border-border flex flex-col md:flex-row items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex-shrink-0">
            <div className="w-14 h-14 rounded-xl bg-success/10 flex items-center justify-center">
              <FileCheck className="w-6 h-6 text-success" aria-hidden="true" />
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="font-bold text-lg text-primary mb-1">Certificados Clínicos</h3>
            <p className="text-muted-foreground text-sm font-light">Valoraciones clínicas con cédula federal 11009616 para trámites escolares, laborales, legales e institucionales. Requieren evaluación previa.</p>
          </div>
          <a
            href="https://wa.me/529983211547?text=Hola%20Karen,%20necesito%20un%20certificado%20clínico"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary hover:text-primary-dark transition-colors"
          >
            Consultar <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
