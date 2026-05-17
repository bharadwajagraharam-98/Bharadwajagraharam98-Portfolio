import { ChevronDown, Mail, MapPin, Phone, ArrowRight, Download } from 'lucide-react';
import { resumeData } from '../../data/resume';

export default function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Ambient orbs — contained so they never overflow horizontally */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="orb-1 absolute rounded-full" style={{
          width: 'clamp(260px, 60vw, 700px)', height: 'clamp(260px, 60vw, 700px)',
          top: '-120px', left: '-80px',
          background: 'radial-gradient(circle, rgba(14,165,233,0.5) 0%, transparent 70%)',
          filter: 'blur(80px)', opacity: 0.18,
        }} />
        <div className="orb-2 absolute rounded-full" style={{
          width: 'clamp(220px, 50vw, 600px)', height: 'clamp(220px, 50vw, 600px)',
          top: '-60px', right: '-80px',
          background: 'radial-gradient(circle, rgba(99,102,241,0.5) 0%, transparent 70%)',
          filter: 'blur(80px)', opacity: 0.14,
        }} />
        <div className="orb-3 absolute rounded-full" style={{
          width: 'clamp(160px, 40vw, 400px)', height: 'clamp(160px, 40vw, 400px)',
          bottom: 0, left: '40%',
          background: 'radial-gradient(circle, rgba(52,211,153,0.5) 0%, transparent 70%)',
          filter: 'blur(70px)', opacity: 0.1,
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-3xl mx-auto px-5 sm:px-8 text-center fade-up" style={{ paddingTop: '80px', paddingBottom: '80px' }}>

        {/* Status pill */}
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full mb-6 sm:mb-8 text-xs font-semibold tracking-widest uppercase"
          style={{ background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.3)', color: '#34d399' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
          Available for Opportunities
        </div>

        {/* Profile photo */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="relative">
            <div className="absolute inset-0 rounded-full pulse-ring" style={{ border: '2px solid rgba(56,189,248,0.35)', margin: '-12px' }} />
            <div className="absolute inset-0 rounded-full pulse-ring" style={{ border: '1px solid rgba(99,102,241,0.22)', margin: '-24px', animationDelay: '0.7s' }} />
            <div className="p-[3px] rounded-full" style={{
              background: 'linear-gradient(135deg, #0ea5e9, #6366f1, #34d399)',
              boxShadow: '0 0 50px rgba(14,165,233,0.5), 0 0 100px rgba(99,102,241,0.2)',
            }}>
              <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full overflow-hidden" style={{ border: '3px solid #020617' }}>
                <img src="/avatar.jpg" alt={resumeData.name} className="w-full h-full object-cover object-top" />
              </div>
            </div>
            <div className="absolute bottom-1 right-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center"
              style={{ background: '#10b981', borderColor: '#020617' }}>
              <div className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Name */}
        <h1 className="font-bold mb-2 sm:mb-3 leading-tight" style={{ fontSize: 'clamp(1.75rem, 5.5vw, 4rem)' }}>
          <span style={{
            background: 'linear-gradient(135deg, #f1f5f9 25%, #94a3b8 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            {resumeData.name}
          </span>
        </h1>

        {/* Title */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4">
          <div className="h-px w-8 sm:w-10 opacity-60" style={{ background: 'linear-gradient(90deg,transparent,#38bdf8)' }} />
          <h2 className="font-semibold" style={{
            fontSize: 'clamp(0.9rem, 2.5vw, 1.4rem)',
            background: 'linear-gradient(135deg,#38bdf8,#818cf8)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            {resumeData.title}
          </h2>
          <div className="h-px w-8 sm:w-10 opacity-60" style={{ background: 'linear-gradient(90deg,#818cf8,transparent)' }} />
        </div>

        {/* Contact row */}
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-slate-400 mb-4" style={{ fontSize: 'clamp(0.7rem, 2vw, 0.875rem)' }}>
          <span className="flex items-center gap-1.5">
            <MapPin size={12} className="text-sky-400 flex-shrink-0" />
            <span className="truncate max-w-[160px] sm:max-w-none">{resumeData.location}</span>
          </span>
          <span className="hidden sm:block w-1 h-1 rounded-full bg-slate-600" />
          <a href={`tel:${resumeData.phone.replace(/\s/g, '')}`} className="flex items-center gap-1.5 hover:text-sky-300 transition-colors">
            <Phone size={12} className="text-sky-400 flex-shrink-0" />{resumeData.phone}
          </a>
          <span className="hidden sm:block w-1 h-1 rounded-full bg-slate-600" />
          <a href={`mailto:${resumeData.email}`} className="flex items-center gap-1.5 hover:text-sky-300 transition-colors">
            <Mail size={12} className="text-sky-400 flex-shrink-0" />
            <span className="truncate max-w-[180px] sm:max-w-none">{resumeData.email}</span>
          </a>
        </div>

        {/* Extras badges */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-5 sm:mb-6 px-2">
          {resumeData.extras.map((extra) => (
            <span key={extra} className="px-2.5 py-1 rounded-full text-xs font-medium"
              style={{ background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.22)', color: '#7dd3fc' }}>
              {extra}
            </span>
          ))}
        </div>

        {/* Summary */}
        <p className="text-slate-400 leading-relaxed mx-auto mb-7 sm:mb-9 max-w-xl"
          style={{ fontSize: 'clamp(0.85rem, 2vw, 1.05rem)' }}>
          {resumeData.summary}
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
          <button
            onClick={() => scrollTo('contact')}
            className="group flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-white transition-all duration-300 hover:-translate-y-1 active:scale-95"
            style={{ background: 'linear-gradient(135deg,#0ea5e9,#6366f1)', boxShadow: '0 8px 32px rgba(14,165,233,0.35)' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 12px 48px rgba(14,165,233,0.55)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 32px rgba(14,165,233,0.35)'; }}
          >
            <Mail size={16} />
            Get in Touch
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href="/Bharadwaj_Agraharam_Resume.pdf"
            download="Bharadwaj_Agraharam_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-slate-200 transition-all duration-300 hover:-translate-y-1 hover:text-white active:scale-95"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)' }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(56,189,248,0.45)';
              (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(56,189,248,0.08)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.12)';
              (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.05)';
            }}
          >
            <Download size={16} />
            Download Resume
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollTo('about')}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-slate-500 hover:text-sky-400 transition-colors"
      >
        <span className="text-xs tracking-widest uppercase font-medium">Scroll</span>
        <ChevronDown size={18} className="animate-bounce" />
      </button>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#020617] pointer-events-none" style={{ zIndex: 6 }} />
    </section>
  );
}
