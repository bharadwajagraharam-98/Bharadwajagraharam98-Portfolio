import { useState, useEffect } from 'react';
import { Download } from 'lucide-react';

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
      {/* Hexagon background */}
      <path
        d="M18 2 L32 9.5 L32 26.5 L18 34 L4 26.5 L4 9.5 Z"
        fill="url(#baGrad)"
        opacity="0.15"
      />
      <path
        d="M18 2 L32 9.5 L32 26.5 L18 34 L4 26.5 L4 9.5 Z"
        fill="none"
        stroke="url(#baGrad)"
        strokeWidth="1.2"
        opacity="0.8"
      />
      {/* BA letters */}
      <text
        x="18"
        y="22"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fontFamily="'Space Grotesk', 'Inter', sans-serif"
        fill="url(#baGrad)"
        filter="url(#baGlow)"
        letterSpacing="0.5"
      >
        BA
      </text>
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

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={
        scrolled
          ? {
              background: 'rgba(2,6,23,0.90)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(56,189,248,0.15)',
              boxShadow: '0 4px 32px rgba(0,0,0,0.5)',
            }
          : {}
      }
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* BA Logo */}
        <button onClick={() => scrollTo('hero')} className="flex items-center gap-2.5 group">
          <div className="transition-transform duration-200 group-hover:scale-110">
            <BALogo />
          </div>
          <span
            className="hidden sm:block font-bold text-base tracking-widest"
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
        <ul className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollTo(item.id)}
                className={`relative px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
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

        {/* Right side: Download CV */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="/Bharadwaj_Agraharam_CV.pdf"
            download
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
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
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block w-5 h-0.5 rounded-full transition-all duration-300"
              style={{
                background: 'linear-gradient(90deg,#38bdf8,#818cf8)',
                transform:
                  menuOpen && i === 0
                    ? 'rotate(45deg) translate(5px,5px)'
                    : menuOpen && i === 2
                    ? 'rotate(-45deg) translate(5px,-5px)'
                    : 'none',
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: menuOpen ? '500px' : '0',
          background: 'rgba(2,6,23,0.97)',
          backdropFilter: 'blur(20px)',
          borderTop: menuOpen ? '1px solid rgba(56,189,248,0.15)' : 'none',
        }}
      >
        <ul className="px-6 py-4 flex flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollTo(item.id)}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  active === item.id ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
                style={
                  active === item.id
                    ? {
                        background:
                          'linear-gradient(135deg,rgba(14,165,233,0.2),rgba(99,102,241,0.2))',
                        border: '1px solid rgba(56,189,248,0.25)',
                      }
                    : {}
                }
              >
                {item.label}
              </button>
            </li>
          ))}
          <li className="mt-2">
            <a
              href="/Bharadwaj_Agraharam_CV.pdf"
              download
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold"
              style={{
                background: 'linear-gradient(135deg,rgba(14,165,233,0.15),rgba(99,102,241,0.15))',
                border: '1px solid rgba(56,189,248,0.3)',
                color: '#38bdf8',
              }}
            >
              <Download size={14} />
              Download Resume
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
