import { GraduationCap, Brain, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const instrumentos = [
  { grupo: 'TDAH Infantil', items: 'CONNERS-3, WISC-V, BRIEF-2' },
  { grupo: 'TDAH Adultos', items: 'CAARS, DIVA 2.0, CPT-3' },
  { grupo: 'Autismo (TEA)', items: 'ADOS-2, M-CHAT-R/F, ADI-R, Vineland-3' },
];

const AboutSection = () => {
  return (
    <section id="sobre-mi" className="py-16 md:py-24 lg:py-32 px-6 bg-card relative overflow-hidden">
      <div aria-hidden="true" className="absolute top-20 right-0 w-96 h-96 bg-accent-blue/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* Left col: Bio text — second on mobile, first on desktop */}
          <motion.div
            className="order-2 lg:order-1 relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div aria-hidden="true" className="absolute -top-10 -left-10 text-[12rem] font-serif leading-none text-accent-sand/40 select-none opacity-50">"</div>

            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-8 relative z-10">
              Neuropsicología<br />
              <span className="italic text-primary-light">con rigor clínico.</span>
            </h2>

            <div className="p-6 bg-accent-blue/10 border-l-4 border-accent-blue rounded-lg text-base leading-relaxed text-foreground font-medium mb-6">
              <p>
                Soy <strong>Neuropsicóloga Karen Trujillo</strong> (Cédula Federal: 11009616), especializada
                en valoración de TDAH y Autismo, egresada de la Universidad Modelo de Quintana Roo. Con más de 7 años
                de experiencia en Cancún, mis diagnósticos combinan rigor científico con instrumentos estandarizados internacionales.
              </p>
            </div>

            <div className="space-y-4 text-muted-foreground font-light leading-relaxed text-base text-justify mb-8">
              <p>
                Me especializo exclusivamente en evaluación neuropsicológica porque creo que un diagnóstico preciso
                cambia trayectorias de vida. Un niño con TDAH no diagnosticado es etiquetado como "flojo" o "difícil";
                un adulto sin diagnóstico lleva décadas creyendo que el problema es su carácter.{' '}
                <strong className="text-primary">El diagnóstico correcto es el primer paso del tratamiento correcto.</strong>
              </p>
              <p>
                Todos mis informes tienen validez ante <strong className="text-primary">SEP, IMSS, instituciones educativas y organismos gubernamentales</strong>,
                e incluyen recomendaciones de adecuaciones curriculares y plan terapéutico.
              </p>
            </div>

            {/* Instruments by evaluation type */}
            <div className="space-y-3 mb-8">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">Instrumentos que utilizo</p>
              {instrumentos.map((i) => (
                <div key={i.grupo} className="flex gap-3 items-start">
                  <span className="shrink-0 mt-1 w-2 h-2 rounded-full bg-accent-blue" aria-hidden="true" />
                  <div>
                    <span className="text-xs font-bold text-primary">{i.grupo}: </span>
                    <span className="text-xs text-muted-foreground">{i.items}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Credentials */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="px-4 py-3 rounded-lg bg-success/10 border border-success/20">
                <p className="text-xs font-bold text-success uppercase tracking-wider mb-1">Cédula Federal</p>
                <p className="text-sm font-bold text-primary">11009616</p>
              </div>
              <div className="px-4 py-3 rounded-lg bg-primary/10 border border-primary/20">
                <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Experiencia</p>
                <p className="text-sm font-bold">7+ años</p>
              </div>
              <div className="px-4 py-3 rounded-lg bg-accent-blue/10 border border-accent-blue/20">
                <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Formación</p>
                <p className="text-sm font-bold text-primary">Univ. Modelo</p>
              </div>
            </div>
          </motion.div>

          {/* Right col: Karen's photo — first on mobile, second on desktop */}
          <motion.div
            className="order-1 lg:order-2 relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Photo container */}
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl max-h-[520px] aspect-[3/4]">
              <img
                src="/Psicologa_Karen_Trujillo.webp"
                alt="Neuropsicóloga Karen Trujillo — especialista en TDAH y autismo en Cancún, Quintana Roo"
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
            </div>

            {/* Credential overlay — bottom left */}
            <div className="absolute -bottom-4 -left-4 z-20 glass p-4 rounded-xl shadow-lg hidden md:block">
              <p className="text-xs font-bold text-primary uppercase tracking-wide mb-1">Cédula Federal</p>
              <p className="text-xl font-bold text-primary">11009616</p>
              <p className="text-xs text-muted-foreground">Neuropsicóloga Clínica</p>
            </div>

            {/* Years badge — top right */}
            <div className="absolute -top-4 -right-4 z-20 bg-gradient-primary p-5 rounded-2xl shadow-lg text-primary-foreground hidden md:flex flex-col items-center">
              <span className="text-3xl font-serif font-bold leading-none">7+</span>
              <span className="text-xs opacity-80 uppercase tracking-wider mt-1">años</span>
            </div>

            {/* Specialties cards row */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="bg-gradient-to-br from-accent-blue/20 to-accent-blue/5 p-4 rounded-xl flex items-center gap-3 border border-accent-blue/10">
                <Brain className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-xs font-bold text-primary">Neuropsicología</p>
                  <p className="text-xs text-muted-foreground">Clínica</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-accent-pink/20 to-accent-pink/5 p-4 rounded-xl flex items-center gap-3 border border-accent-pink/10">
                <ShieldCheck className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-xs font-bold text-primary">Diagnóstico</p>
                  <p className="text-xs text-muted-foreground">SEP · IMSS</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-accent-sand to-accent-sand/50 p-4 rounded-xl flex items-center gap-3 col-span-2">
                <GraduationCap className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-xs font-bold text-primary">Licenciada en Psicología</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Universidad Modelo, Q. Roo</p>
                </div>
              </div>
            </div>

            {/* Background decoration */}
            <div aria-hidden="true" className="absolute inset-0 bg-accent-sand/25 rounded-3xl -z-10 rotate-2 scale-[1.03]" />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
