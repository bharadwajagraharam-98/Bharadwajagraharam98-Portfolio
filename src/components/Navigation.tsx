import { useState, useEffect } from 'react';
import { Download, X, Menu } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'certifications', label: 'Certs' },
  { id: 'contact', label: 'Contact' },
];

function BALogo() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="baGrad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
        <filter id="baGlow">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <path d="M18 2 L32 9.5 L32 26.5 L18 34 L4 26.5 L4 9.5 Z" fill="url(#baGrad)" opacity="0.15" />
      <path d="M18 2 L32 9.5 L32 26.5 L18 34 L4 26.5 L4 9.5 Z" fill="none" stroke="url(#baGrad)" strokeWidth="1.2" opacity="0.8" />
      <text x="18" y="22" textAnchor="middle" fontSize="13" fontWeight="700"
        fontFamily="'Space Grotesk', 'Inter', sans-serif" fill="url(#baGrad)"
        filter="url(#baGlow)" letterSpacing="0.5">BA</text>
    </svg>
  );
}

export default function Navigation() {
  const [active, setActive] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = NAV_ITEMS.map((i) => document.getElementById(i.id));
      let current = 'hero';
      for (const s of sections) {
        if (s && window.scrollY >= s.offsetTop - 130) current = s.id;
      }
      setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={
          scrolled
            ? {
                background: 'rgba(2,6,23,0.92)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(56,189,248,0.15)',
                boxShadow: '0 4px 32px rgba(0,0,0,0.5)',
              }
            : {}
        }
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => scrollTo('hero')} className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="transition-transform duration-200 group-hover:scale-110">
              <BALogo />
            </div>
            <span
              className="hidden sm:block font-bold text-sm tracking-widest"
              style={{
                background: 'linear-gradient(135deg,#38bdf8,#818cf8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              BHARADWAJ
            </span>
          </button>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-0.5">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollTo(item.id)}
                  className={`relative px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    active === item.id ? 'text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                  }`}
                  style={
                    active === item.id
                      ? {
                          background: 'linear-gradient(135deg,rgba(14,165,233,0.18),rgba(99,102,241,0.18))',
                          border: '1px solid rgba(56,189,248,0.28)',
                        }
                      : {}
                  }
                >
                  {active === item.id && (
                    <span
                      className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full"
                      style={{ background: 'linear-gradient(90deg,#38bdf8,#818cf8)' }}
                    />
                  )}
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Right side: Download CV (desktop) + hamburger (mobile) */}
          <div className="flex items-center gap-3">
            <a
              href="/Bharadwaj_Agraharam_Resume.pdf"
              download="Bharadwaj_Agraharam_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: 'linear-gradient(135deg,rgba(14,165,233,0.15),rgba(99,102,241,0.15))',
                border: '1px solid rgba(56,189,248,0.3)',
                color: '#38bdf8',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  'linear-gradient(135deg,rgba(14,165,233,0.25),rgba(99,102,241,0.25))';
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 20px rgba(56,189,248,0.2)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  'linear-gradient(135deg,rgba(14,165,233,0.15),rgba(99,102,241,0.15))';
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none';
              }}
            >
              <Download size={14} />
              Resume
            </a>

            {/* Hamburger — visible on < lg */}
            <button
              className="lg:hidden w-11 h-11 flex items-center justify-center rounded-xl transition-colors"
              style={{ background: menuOpen ? 'rgba(56,189,248,0.1)' : 'transparent' }}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen
                ? <X size={20} className="text-sky-400" />
                : <Menu size={20} className="text-slate-300" />
              }
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        className="fixed top-0 right-0 bottom-0 z-50 lg:hidden flex flex-col transition-transform duration-300 ease-in-out"
        style={{
          width: 'min(280px, 85vw)',
          background: 'rgba(2,6,23,0.98)',
          backdropFilter: 'blur(24px)',
          borderLeft: '1px solid rgba(56,189,248,0.15)',
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
        }}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 h-14 sm:h-16 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <span className="font-bold text-sm tracking-widest"
            style={{ background: 'linear-gradient(135deg,#38bdf8,#818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            MENU
          </span>
          <button
            className="w-9 h-9 flex items-center justify-center rounded-lg"
            style={{ background: 'rgba(255,255,255,0.05)' }}
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={18} className="text-slate-400" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto px-4 py-4">
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollTo(item.id)}
                  className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all active:scale-95"
                  style={
                    active === item.id
                      ? {
                          background: 'linear-gradient(135deg,rgba(14,165,233,0.2),rgba(99,102,241,0.2))',
                          border: '1px solid rgba(56,189,248,0.25)',
                          color: '#fff',
                        }
                      : { color: '#94a3b8' }
                  }
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Drawer footer — resume download */}
        <div className="px-4 pb-6 pt-2 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <a
            href="/Bharadwaj_Agraharam_Resume.pdf"
            download="Bharadwaj_Agraharam_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-semibold transition-all active:scale-95"
            style={{
              background: 'linear-gradient(135deg,rgba(14,165,233,0.15),rgba(99,102,241,0.15))',
              border: '1px solid rgba(56,189,248,0.3)',
              color: '#38bdf8',
            }}
          >
            <Download size={14} />
            Download Resume
          </a>
        </div>
      </div>
    </>
  );
}
