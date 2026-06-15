import { useState, useEffect } from 'react';
import { Menu, Phone, X, ChevronDown, ChevronRight, Brain, User, Puzzle, CalendarDays } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { PHONE_NUMBER, waUrl } from '@/lib/contact';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showValoraciones, setShowValoraciones] = useState(false);
  const router = useRouter();
  const isHome = router.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsMenuOpen(false); }, [router.pathname]);

  const sectionLinks = [
    { href: '#sobre-mi', label: 'Sobre mí' },
    { href: '#testimonios', label: 'Testimonios' },
    { href: '#faq', label: 'FAQ' },
  ];

  const valoraciones = [
    { href: '/evaluacion-tdah-ninos',    label: 'TDAH Infantil', sub: 'Niños 5-17 años',  icon: Brain },
    { href: '/evaluacion-tdah-adultos',  label: 'TDAH Adultos',  sub: 'Desde 18 años',    icon: User  },
    { href: '/evaluacion-autismo-cancun',label: 'Autismo (TEA)', sub: 'Desde 2 años',     icon: Puzzle},
  ];

  const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (isHome) {
      e.preventDefault();
      const el = document.querySelector(hash);
      el?.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const sectionHref = (hash: string) => isHome ? hash : `/${hash}`;

  const isDarkHero = isHome && !isScrolled;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-4 transition-all duration-300">
      <nav className={`max-w-6xl mx-auto rounded-2xl px-6 py-4 flex justify-between items-center transition-all duration-500 ${
        isDarkHero ? 'bg-transparent' : `glass ${isScrolled ? 'shadow-lg' : 'shadow-soft'}`
      }`}>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-serif font-bold italic text-lg transition-transform group-hover:scale-110 group-hover:rotate-6 ${
            isDarkHero ? 'bg-white/15 text-white border border-white/25' : 'bg-gradient-primary text-primary-foreground'
          }`}>
            K
          </div>
          <div className="flex flex-col">
            <span className={`font-bold text-sm uppercase tracking-widest leading-none transition-colors ${isDarkHero ? 'text-white' : 'text-primary'}`}>Karen Trujillo</span>
            <span className={`text-[9px] font-medium uppercase tracking-[0.2em] mt-1 transition-colors ${isDarkHero ? 'text-white/60' : 'text-muted-foreground'}`}>Neuropsicología · TDAH · Autismo</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          <div
            className="relative"
            onMouseEnter={() => setShowValoraciones(true)}
            onMouseLeave={() => setShowValoraciones(false)}
          >
            <button
              className={`flex items-center gap-1 px-5 py-2 text-xs font-bold uppercase tracking-widest rounded-lg transition-all ${
                isDarkHero ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-primary/70 hover:text-primary hover:bg-secondary'
              }`}
              aria-haspopup="true"
              aria-expanded={showValoraciones}
            >
              Valoraciones <ChevronDown className={`w-3 h-3 transition-transform ${showValoraciones ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {showValoraciones && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 pt-2 w-56"
                >
                  <div className="bg-card rounded-xl shadow-2xl border border-border p-2">
                    {valoraciones.map((v) => (
                      <Link
                        key={v.href}
                        href={v.href}
                        className="flex flex-col px-4 py-3 rounded-lg hover:bg-secondary transition-colors"
                      >
                        <span className="text-xs font-bold text-primary">{v.label}</span>
                        <span className="text-xs text-muted-foreground">{v.sub}</span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {sectionLinks.map((link) => (
            <a
              key={link.href}
              href={sectionHref(link.href)}
              onClick={(e) => handleSectionClick(e, link.href)}
              className={`px-5 py-2 text-xs font-bold uppercase tracking-widest rounded-lg transition-all ${
                isDarkHero ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-primary/70 hover:text-primary hover:bg-secondary'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a
            href={`tel:${PHONE_NUMBER}`}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${
              isDarkHero ? 'text-white/70 hover:text-white hover:bg-white/10' : 'text-primary hover:bg-secondary'
            }`}
          >
            <Phone className="w-4 h-4" />
            Llamar
          </a>
          <a
            href={waUrl('Hola Karen, me interesa agendar una valoración')}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-[11px] font-bold px-6 py-3 rounded-lg transition-all uppercase tracking-widest shadow-lg transform hover:-translate-y-0.5 ${
              isDarkHero
                ? 'bg-white/15 hover:bg-white/25 text-white border border-white/30'
                : 'bg-gradient-primary hover:opacity-90 text-primary-foreground shadow-primary/20'
            }`}
          >
            Agendar Valoración
          </a>
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-primary p-2 hover:bg-secondary rounded-lg transition-colors"
          aria-label="Menú"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu — clean clinical panel */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute top-20 left-4 right-4 rounded-2xl bg-card border border-border shadow-[0_20px_60px_-10px_rgba(56,47,81,0.18)] overflow-hidden"
          >
            <div className="p-5 flex flex-col gap-4">

              {/* Header: Karen's photo + name + credential + close */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border-2 border-border shadow-sm">
                    <img
                      src="/Psicologa_Karen_Trujillo.webp"
                      alt="Neuropsicóloga Karen Trujillo"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-primary text-sm leading-none">Karen Trujillo</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Cédula 11009616 · 7+ años</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary transition-colors"
                  aria-label="Cerrar menú"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="h-px bg-border" />

              {/* Valoraciones — color-differentiated rows */}
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-2 px-1">
                  Valoraciones
                </p>
                <div className="flex flex-col gap-1.5">
                  {valoraciones.map((v, i) => {
                    const Icon = v.icon;
                    const rowStyle = [
                      'bg-accent-blue/10 border-l-2 border-accent-blue/60',
                      'bg-accent-sand/25 border-l-2 border-accent-sand',
                      'bg-accent-pink/10 border-l-2 border-accent-pink/50',
                    ][i];
                    return (
                      <Link
                        key={v.href}
                        href={v.href}
                        aria-label={`${v.label} — ${v.sub}`}
                        className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all active:scale-[0.98] ${rowStyle}`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-4 h-4 text-primary/50 shrink-0" aria-hidden="true" />
                          <div>
                            <span className="text-sm font-bold text-primary block leading-none">{v.label}</span>
                            <span className="text-xs text-muted-foreground mt-0.5 block">{v.sub}</span>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" aria-hidden="true" />
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Section links */}
              <div className="flex flex-col gap-0.5">
                {sectionLinks.map((link) => (
                  <a
                    key={link.href}
                    href={sectionHref(link.href)}
                    onClick={(e) => handleSectionClick(e, link.href)}
                    className="flex items-center justify-between px-4 py-2.5 rounded-xl hover:bg-secondary transition-colors active:scale-[0.98]"
                  >
                    <span className="text-sm font-medium text-primary/70">{link.label}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" aria-hidden="true" />
                  </a>
                ))}
              </div>

              {/* CTAs — primary button + secondary text link */}
              <div className="flex flex-col gap-1 pt-1">
                <a
                  href={waUrl('Hola Karen, quiero agendar una valoración')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-primary text-primary-foreground font-bold text-xs uppercase tracking-widest transition-all active:scale-[0.98] shadow-lg shadow-primary/20"
                >
                  <CalendarDays className="w-4 h-4" aria-hidden="true" />
                  Agendar Valoración
                </a>
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="flex items-center justify-center gap-1.5 py-2.5 text-primary/50 hover:text-primary font-bold text-xs uppercase tracking-widest transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                  Llamar
                </a>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
