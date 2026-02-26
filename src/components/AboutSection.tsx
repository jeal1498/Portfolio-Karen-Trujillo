import { GraduationCap, Brain, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const instrumentos = [
  { grupo: 'TDAH Infantil', items: 'CONNERS-3, WISC-V, BRIEF-2' },
  { grupo: 'TDAH Adultos', items: 'CAARS, DIVA 2.0, CPT-3' },
  { grupo: 'Autismo (TEA)', items: 'ADOS-2, M-CHAT-R/F, ADI-R, Vineland-3' },
];

const AboutSection = () => {
  return (
    <section id="sobre-mi" className="py-32 px-6 bg-card relative overflow-hidden">
      <div className="absolute top-20 right-0 w-96 h-96 bg-accent-blue/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            className="order-2 lg:order-1 relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute -top-10 -left-10 text-[12rem] font-serif leading-none text-accent-sand/40 select-none opacity-50">"</div>

            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-8 relative z-10">
              Neuropsicología<br />
              <span className="italic text-primary-light">con rigor clínico.</span>
            </h2>

            <div className="p-6 bg-accent-blue/10 border-l-4 border-accent-blue rounded-lg text-base leading-relaxed text-foreground font-medium mb-6">
              <p>
                Soy <strong>Neuropsicóloga Karen Trujillo</strong> (Cédula Federal: 11009616), neuropsicóloga especializada
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
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3">Instrumentos que utilizo</p>
              {instrumentos.map((i) => (
                <div key={i.grupo} className="flex gap-3 items-start">
                  <span className="shrink-0 mt-1 w-2 h-2 rounded-full bg-accent-blue" />
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
                <p className="text-[10px] font-bold text-success uppercase tracking-wider mb-1">Cédula Federal</p>
                <p className="text-sm font-bold text-primary">11009616</p>
              </div>
              <div className="px-4 py-3 rounded-lg bg-primary/10 border border-primary/20">
                <p className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1">Experiencia</p>
                <p className="text-sm font-bold">7+ años</p>
              </div>
              <div className="px-4 py-3 rounded-lg bg-accent-blue/10 border border-accent-blue/20">
                <p className="text-[10px] font-bold text-accent-blue uppercase tracking-wider mb-1">Formación</p>
                <p className="text-sm font-bold text-primary">Univ. Modelo</p>
              </div>
            </div>
          </motion.div>

          {/* Achievement Cards */}
          <motion.div
            className="order-1 lg:order-2 grid grid-cols-2 gap-4"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-4 mt-8">
              <div className="bg-gradient-to-br from-accent-blue/20 to-accent-blue/5 p-8 rounded-2xl h-40 flex flex-col justify-end border border-accent-blue/10 hover:shadow-lg transition-all">
                <span className="text-4xl font-serif font-bold text-primary">+7</span>
                <span className="text-xs uppercase tracking-widest text-primary/70 mt-2">Años de Experiencia</span>
              </div>
              <div className="bg-gradient-to-br from-accent-sand to-accent-sand/50 p-8 rounded-2xl h-56 flex flex-col justify-end hover:shadow-lg transition-all">
                <GraduationCap className="w-8 h-8 text-primary mb-3" />
                <span className="text-sm font-bold text-primary">Licenciada en Psicología</span>
                <span className="text-[10px] text-primary/60 uppercase">Universidad Modelo, QRoo</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-accent-pink/30 to-accent-pink/10 p-8 rounded-2xl h-56 flex flex-col justify-end hover:shadow-lg transition-all">
                <Brain className="w-8 h-8 text-primary mb-3" />
                <span className="text-sm font-bold text-primary">Neuropsicología Clínica</span>
                <span className="text-[10px] text-primary/60 uppercase">Especialidad Certificada</span>
              </div>
              <div className="bg-gradient-primary p-8 rounded-2xl h-40 flex flex-col justify-end text-primary-foreground hover:shadow-lg transition-all">
                <ShieldCheck className="w-6 h-6 mb-3 text-accent-blue" />
                <span className="font-serif italic text-lg">Diagnóstico oficial</span>
                <span className="text-xs opacity-80 mt-1">Validez SEP · IMSS · Escuelas</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
