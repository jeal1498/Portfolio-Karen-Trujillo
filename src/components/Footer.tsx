import React from "react";
import { PHONE_NUMBER } from '@/lib/contact';

const Footer: React.FC = () => {
  return (
    <footer id="contacto" className="bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background decorations */}
      <div aria-hidden="true" className="absolute top-0 right-0 w-[560px] h-[560px] bg-accent-blue/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div aria-hidden="true" className="absolute bottom-0 left-[40%] w-[400px] h-[400px] bg-accent-pink/[0.07] rounded-full blur-3xl pointer-events-none" />

      {/* TOP EYEBROW */}
      <div className="border-b border-primary-foreground/10 px-6 lg:px-14 py-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-1.5">
        <span className="text-xs uppercase tracking-[.2em] text-primary-foreground/40 font-medium">Cancún, Quintana Roo · México</span>
        <div aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-accent-blue/60 hidden sm:block" />
        <span className="text-xs uppercase tracking-[.2em] text-primary-foreground/40 font-medium">Cédula Federal: 11009616</span>
        <div aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-accent-blue/60 hidden sm:block" />
        <span className="text-xs uppercase tracking-[.2em] text-primary-foreground/40 font-medium">Neuropsicología Clínica Especializada</span>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 px-6 lg:px-14 py-14 lg:py-16 relative z-10">

        {/* ① Brand */}
        <div className="pb-10 sm:pb-0 border-b sm:border-b-0 border-primary-foreground/10 sm:pr-8 lg:pr-12">
          {/* Monogram */}
          <div className="w-14 h-14 bg-primary-foreground rounded-xl flex items-center justify-center font-serif text-[30px] italic font-semibold text-primary mb-7">K</div>

          <p className="font-serif text-xl text-primary-foreground mb-1 tracking-wide">Karen Trujillo</p>
          <p className="text-xs uppercase tracking-[.18em] text-accent-blue mb-5">Neuropsicóloga</p>
          <p className="text-sm leading-relaxed text-primary-foreground/50 font-light mb-8 max-w-[240px]">
            Especialista en valoración de TDAH y Autismo en Cancún. Diagnóstico preciso con instrumentos estandarizados internacionales.
          </p>

          {/* Social buttons */}
          <div className="flex gap-2.5">
            <a
              href="https://www.facebook.com/share/1Bs93MjeKt/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook de Karen Trujillo"
              title="Facebook"
              className="w-10 h-10 rounded-xl bg-primary-foreground/10 flex items-center justify-center text-primary-foreground hover:bg-accent-blue/30 hover:-translate-y-0.5 transition-all"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/psicologakarentrujillo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de Karen Trujillo"
              title="Instagram"
              className="w-10 h-10 rounded-xl bg-primary-foreground/10 flex items-center justify-center text-primary-foreground hover:bg-accent-pink/30 hover:-translate-y-0.5 transition-all"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a
              href="https://www.tiktok.com/@psic.karentrujillo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok de Karen Trujillo"
              title="TikTok"
              className="w-10 h-10 rounded-xl bg-primary-foreground/10 flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/20 hover:-translate-y-0.5 transition-all"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
              </svg>
            </a>
          </div>
        </div>

        {/* ② Valoraciones */}
        <div className="pt-10 sm:pt-0 sm:pl-8 lg:pl-12 lg:border-l border-primary-foreground/10">
          <p className="text-xs uppercase tracking-[.22em] font-medium text-accent-blue mb-7">Valoraciones</p>
          <ul className="space-y-3.5">
            {[
              { href: '/evaluacion-tdah-ninos', label: 'Valoración TDAH Infantil' },
              { href: '/evaluacion-tdah-adultos', label: 'Valoración TDAH Adultos' },
              { href: '/evaluacion-autismo-cancun', label: 'Diagnóstico Autismo (TEA)' },
            ].map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group text-sm font-light text-primary-foreground/60 hover:text-primary-foreground transition-colors flex items-center gap-2"
                >
                  <span className="text-accent-sand/60 opacity-0 group-hover:opacity-100 transition-opacity text-xs" aria-hidden="true">—</span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ③ Blog */}
        <div className="pt-10 lg:pt-0 lg:pl-12 lg:border-l border-primary-foreground/10">
          <p className="text-xs uppercase tracking-[.22em] font-medium text-accent-pink mb-7">Blog</p>
          <ul className="space-y-3.5">
            {[
              { href: '/blog/senales-tdah-ninos', label: '¿Tu hijo no pone atención? Señales reales de TDAH' },
              { href: '/blog/tdah-adultos-diagnostico-tardio', label: 'TDAH en adultos: diagnóstico después de los 30' },
              { href: '/blog/que-es-ados-2-autismo', label: 'ADOS-2: el estándar de oro para diagnosticar autismo' },
            ].map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group text-sm font-light text-primary-foreground/60 hover:text-primary-foreground transition-colors flex items-center gap-2 leading-snug"
                >
                  <span className="text-accent-sand/60 opacity-0 group-hover:opacity-100 transition-opacity text-xs shrink-0" aria-hidden="true">—</span>
                  <span>{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ④ Contact */}
        <div className="pt-10 lg:pt-0 lg:pl-12 lg:border-l border-primary-foreground/10">
          <p className="text-xs uppercase tracking-[.22em] font-medium text-accent-blue mb-7">Contacto Directo</p>

          <a
            href={`tel:${PHONE_NUMBER}`}
            className="group flex items-center gap-4 p-4 rounded-xl bg-primary-foreground/[0.05] border border-primary-foreground/10 hover:bg-accent-blue/[0.15] hover:translate-x-1 transition-all mb-3"
          >
            <div className="w-9 h-9 rounded-lg bg-primary-foreground/10 flex items-center justify-center text-accent-blue shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.89 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.81 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <div>
              <span className="text-xs uppercase tracking-[.16em] text-primary-foreground/40 block mb-0.5">Llamar</span>
              <span className="text-sm font-medium text-primary-foreground">+52 998 321 1547</span>
            </div>
          </a>

          <a
            href="mailto:karentrujillopsic@gmail.com"
            className="group flex items-center gap-4 p-4 rounded-xl bg-primary-foreground/[0.05] border border-primary-foreground/10 hover:bg-accent-pink/[0.15] hover:translate-x-1 transition-all mb-4"
          >
            <div className="w-9 h-9 rounded-lg bg-primary-foreground/10 flex items-center justify-center text-accent-pink shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <div>
              <span className="text-xs uppercase tracking-[.16em] text-primary-foreground/40 block mb-0.5">Email</span>
              <span className="text-sm font-medium text-primary-foreground">karentrujillopsic@gmail.com</span>
            </div>
          </a>

          {/* Hours block */}
          <div className="p-4 rounded-xl bg-primary-foreground/[0.05] border-l-2 border-accent-sand/50">
            <p className="text-xs uppercase tracking-[.2em] text-accent-sand/70 mb-3 flex items-center gap-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              Horario de atención
            </p>
            <div className="flex justify-between text-xs mb-1.5">
              <strong className="font-medium text-primary-foreground/70">Lun – Vie</strong>
              <span className="text-primary-foreground/50">9:00 AM – 7:00 PM</span>
            </div>
            <div className="flex justify-between text-xs">
              <strong className="font-medium text-primary-foreground/70">Sábado</strong>
              <span className="text-primary-foreground/50">9:00 AM – 2:00 PM</span>
            </div>
          </div>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-primary-foreground/10 px-6 lg:px-14 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 relative z-10">
        <p className="text-xs uppercase tracking-[.12em] text-primary-foreground/30">© 2025 Karen Trujillo · Todos los derechos reservados</p>
        <div className="flex items-center gap-2 text-xs uppercase tracking-[.1em] text-primary-foreground/30">
          <div aria-hidden="true" className="w-1 h-1 rounded-full bg-accent-sand/50" />
          <span>Cancún, Quintana Roo · México</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
