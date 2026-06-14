import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'María G.',
    initials: 'MG',
    service: 'Paciente por 6 meses',
    rating: 5,
    review: '"Con Karen no solo hablé de mis problemas, aprendí herramientas prácticas para manejar la ansiedad. Su profesionalismo combinado con empatía genuina cambió mi vida. Muy recomendada."',
    avatarColor: 'bg-accent-blue/40 text-primary',
  },
  {
    name: 'Carlos L.',
    initials: 'CL',
    service: 'Evaluación TDAH Adultos',
    rating: 5,
    review: '"La evaluación neuropsicológica fue muy completa y profesional. Por fin entendí mi diagnóstico de TDAH y qué pasos seguir. Karen es excelente en su trato y conocimiento."',
    avatarColor: 'bg-accent-sand/60 text-primary',
  },
  {
    name: 'Sofía M.',
    initials: 'SM',
    service: 'Valoración TDAH Infantil',
    rating: 5,
    review: '"Por fin entendí por qué mi hijo tenía tantas dificultades en la escuela. Karen nos explicó todo con claridad y el informe nos abrió las puertas a los apoyos que necesitaba. Muy profesional y cercana."',
    avatarColor: 'bg-accent-pink/40 text-primary',
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonios" className="py-16 md:py-24 lg:py-32 bg-card px-6 relative overflow-hidden">
      <div aria-hidden="true" className="absolute top-0 left-0 w-96 h-96 bg-accent-blue/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-10 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="px-4 py-2 rounded-full border border-primary/10 bg-secondary text-primary font-bold uppercase tracking-[0.2em] text-xs mb-6 inline-block shadow-sm">
            Lo que dicen mis pacientes
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">Diagnósticos que cambian trayectorias</h2>

          {/* Aggregate Rating */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="flex gap-1" aria-label="5 estrellas">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-warning fill-warning" aria-hidden="true" />
              ))}
            </div>
            <span className="text-2xl font-bold text-primary">5.0</span>
            <span className="text-sm text-muted-foreground font-medium">(47 pacientes satisfechos en Google)</span>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.name}
              className="bg-secondary rounded-xl p-8 border border-border hover:shadow-lg transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 rounded-full ${testimonial.avatarColor} flex items-center justify-center font-bold text-sm shrink-0`}>
                  {testimonial.initials}
                </div>
                <div>
                  <p className="font-bold text-primary text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.service}</p>
                </div>
              </div>
              <div className="flex gap-1 mb-4" aria-label={`${testimonial.rating} estrellas`}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-warning fill-warning" aria-hidden="true" />
                ))}
              </div>
              <p className="text-muted-foreground text-sm font-light leading-relaxed italic">{testimonial.review}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
