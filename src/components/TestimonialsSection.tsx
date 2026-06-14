import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'María G.',
    initials: 'MG',
    service: 'Paciente por 6 meses',
    rating: 5,
    review: 'Con Karen no solo hablé de mis problemas, aprendí herramientas prácticas para manejar la ansiedad. Su profesionalismo combinado con empatía genuina cambió mi vida. Muy recomendada.',
    accentClass: 'border-lavender-mist/30',
  },
  {
    name: 'Carlos L.',
    initials: 'CL',
    service: 'Evaluación TDAH Adultos',
    rating: 5,
    review: 'La evaluación neuropsicológica fue muy completa y profesional. Por fin entendí mi diagnóstico de TDAH y qué pasos seguir. Karen es excelente en su trato y conocimiento.',
    accentClass: 'border-warm-sand/30',
  },
  {
    name: 'Sofía M.',
    initials: 'SM',
    service: 'Valoración TDAH Infantil',
    rating: 5,
    review: 'Por fin entendí por qué mi hijo tenía tantas dificultades en la escuela. Karen nos explicó todo con claridad y el informe nos abrió las puertas a los apoyos que necesitaba. Muy profesional y cercana.',
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
            <div className="flex gap-1" aria-label="5 estrellas">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-warning fill-warning" aria-hidden="true" />
              ))}
            </div>
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
                <div className="ml-auto flex gap-0.5" aria-label={`${testimonial.rating} estrellas`}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-warning fill-warning" aria-hidden="true" />
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
