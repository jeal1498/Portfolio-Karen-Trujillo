import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Osiris Pinetta',
    initials: 'OP',
    service: 'Psicoterapia individual',
    rating: 5,
    review: 'Desde la primera sesión me sentí escuchado y a las actividades semana tras semana sentía una mejora continua, Karen me ha ayudado mucho a mejorar mi estado de ánimo sin duda es una de las mejores psicólogas que pueden haber, te escucha, te alienta a seguir adelante, con la ayuda de ella en poco tiempo pude retomar actividades que sentía que nunca más iba a poder realizar otra vez y todo gracias a ella.',
    accentClass: 'border-lavender-mist/30',
  },
  {
    name: 'Jenny Arzat',
    initials: 'JA',
    service: 'Valoración infantil',
    rating: 5,
    review: 'Recomiendo a la psicóloga Karen muy amable, muy profesional desde el primer día mi hija se sintió muy cómoda y le ha ayudado mucho acudir a sus terapias.',
    accentClass: 'border-warm-sand/30',
  },
  {
    name: 'Lek Monter',
    initials: 'LM',
    service: 'Sesión psicológica',
    rating: 5,
    review: 'Es muy amable, me sentí cómodo al hablar con ella, es muy fácil entablar conversación, muy comprensiva, y no te sientes juzgado el ambiente es muy acogedor.',
    accentClass: 'border-blush/30',
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonios" className="py-16 md:py-24 lg:py-32 bg-primary px-6 relative overflow-hidden">
      {/* Decorative large quote mark */}
      <div aria-hidden="true" className="absolute top-8 left-1/2 -translate-x-1/2 text-[18rem] font-serif leading-none text-primary-foreground/[0.04] select-none pointer-events-none">
        &ldquo;
      </div>
      <div aria-hidden="true" className="absolute -top-20 -right-20 w-96 h-96 bg-accent-blue/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-10 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary-foreground mb-6">
            Diagnósticos que<br />
            <span className="italic font-normal text-primary-foreground/70">cambian trayectorias</span>
          </h2>

          {/* Aggregate Rating */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <span role="img" aria-label="5 estrellas" className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-warning fill-warning" aria-hidden="true" />
              ))}
            </span>
            <span className="text-2xl font-bold text-primary-foreground">5.0</span>
            <span className="text-sm text-primary-foreground/60 font-medium">(47 pacientes en Google)</span>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.name}
              className={`relative bg-primary-foreground/[0.06] border ${testimonial.accentClass} rounded-2xl p-8 hover:bg-primary-foreground/10 transition-all duration-300`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Large decorative quote */}
              <div aria-hidden="true" className="text-6xl font-serif leading-none text-primary-foreground/20 mb-3 select-none">
                &ldquo;
              </div>

              <p className="text-primary-foreground/85 text-base leading-relaxed mb-6">
                {testimonial.review}
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-primary-foreground/10">
                <div className="w-10 h-10 rounded-full bg-primary-foreground/15 flex items-center justify-center font-bold text-xs text-primary-foreground shrink-0">
                  {testimonial.initials}
                </div>
                <div>
                  <p className="font-bold text-primary-foreground text-sm">{testimonial.name}</p>
                  <p className="text-xs text-primary-foreground/55">{testimonial.service}</p>
                </div>
                <span role="img" aria-label={`${testimonial.rating} estrellas`} className="ml-auto flex gap-0.5">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-warning fill-warning" aria-hidden="true" />
                  ))}
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
