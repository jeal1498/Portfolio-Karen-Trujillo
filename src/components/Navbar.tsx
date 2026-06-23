import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { waUrl } from '@/lib/contact';

const NAV_LINKS = [
  { href: '#servicios', label: 'Servicios' },
  { href: '/precios', label: 'Precios' },
  { href: '#proceso', label: 'Proceso' },
  { href: '#sobre-mi', label: 'Sobre mí' },
  { href: '#testimonios', label: 'Testimonios' },
  { href: '/blog', label: 'Blog' },
  { href: '#contacto', label: 'Contacto' },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const isHome = router.pathname === '/';
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 48);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setIsMenuOpen(false); }, [router.pathname]);

  const resolveHref = (href: string) =>
    href.startsWith('#') && !isHome ? `/${href}` : href;

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#') && isHome) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const dark = !isScrolled;

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div
        className={`transition-all duration-300 ${
          isScrolled
            ? 'bg-white/96 backdrop-blur-md shadow-[0_1px_16px_rgba(56,47,81,0.09)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none" style={{ textDecoration: 'none' }}>
            <span className={`font-serif text-xl leading-none transition-colors duration-300 ${dark ? 'text-white' : 'text-[#382f51]'}`}>
              Karen Trujillo
            </span>
            <span className={`font-sans text-[0.625rem] font-bold tracking-[0.12em] uppercase mt-0.5 transition-colors duration-300 ${dark ? 'text-white/65' : 'text-[#515e71]'}`}>
              Neuropsicóloga
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-5" aria-label="Navegación principal">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={resolveHref(link.href)}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className={`font-sans font-medium text-sm transition-colors duration-200 ${
                  dark
                    ? 'text-white/88 hover:text-[#d0d0e7]'
                    : 'text-[#382f51] hover:text-[#5b4e7f]'
                }`}
                style={{ textDecoration: 'none' }}
              >
                {link.label}
              </a>
            ))}
            <a
              href={waUrl('Hola Karen, me interesa agendar una valoración')}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Agendar cita por WhatsApp"
              className={`font-sans text-[0.8rem] font-bold tracking-[0.08em] uppercase px-5 py-2 rounded-lg border transition-all duration-200 ${
                dark
                  ? 'bg-white/15 text-white border-white/40 hover:bg-white hover:text-[#382f51] hover:border-white'
                  : 'bg-[#382f51] text-white border-[#382f51] hover:bg-[#5b4e7f] hover:border-[#5b4e7f]'
              }`}
              style={{ textDecoration: 'none' }}
            >
              Agendar cita
            </a>
          </nav>

          {/* Hamburger */}
          <button
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            className={`md:hidden p-2.5 rounded-xl border-0 cursor-pointer transition-colors ${
              dark ? 'bg-white/10' : 'bg-[#382f51]/10'
            }`}
          >
            {isMenuOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={dark ? 'white' : '#382f51'} strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={dark ? 'white' : '#382f51'} strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            role="menu"
            aria-label="Menú móvil"
            initial={{ opacity: prefersReduced ? 1 : 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: prefersReduced ? 1 : 0 }}
            transition={{ duration: 0.18 }}
            className="md:hidden border-t border-[#d0d0e7] bg-white/[0.98]"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={resolveHref(link.href)}
                role="menuitem"
                onClick={(e) => handleAnchorClick(e, link.href)}
                className="block px-6 py-4 font-sans font-medium text-[0.9rem] text-[#382f51] border-b border-[#382f51]/[0.06] hover:bg-[#f8f7fc] transition-colors"
                style={{ textDecoration: 'none' }}
              >
                {link.label}
              </a>
            ))}
            <a
              href={waUrl('Hola Karen, me interesa agendar una valoración')}
              target="_blank"
              rel="noopener noreferrer"
              role="menuitem"
              onClick={() => setIsMenuOpen(false)}
              className="block px-6 py-4 font-sans font-bold text-[0.9rem] text-[#25d366]"
              style={{ textDecoration: 'none' }}
            >
              Agendar cita →
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
