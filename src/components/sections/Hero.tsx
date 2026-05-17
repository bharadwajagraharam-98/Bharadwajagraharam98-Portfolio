import { ChevronDown, Mail, MapPin, Phone, ArrowRight, Download } from 'lucide-react';
import { resumeData } from '../../data/resume';

export default function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-6">
      {/* Ambient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="orb-1 absolute w-[700px] h-[700px] rounded-full"
          style={{
            top: '-200px', left: '-150px',
            background: 'radial-gradient(circle, rgba(14,165,233,0.5) 0%, transparent 70%)',
            filter: 'blur(90px)', opacity: 0.18,
          }}
        />
        <div
          className="orb-2 absolute w-[600px] h-[600px] rounded-full"
          style={{
            top: '-100px', right: '-200px',
            background: 'radial-gradient(circle, rgba(99,102,241,0.5) 0%, transparent 70%)',
            filter: 'blur(90px)', opacity: 0.14,
          }}
        />
        <div
          className="orb-3 absolute w-[400px] h-[400px] rounded-full"
          style={{
            bottom: '0', left: '40%',
            background: 'radial-gradient(circle, rgba(52,211,153,0.5) 0%, transparent 70%)',
            filter: 'blur(80px)', opacity: 0.1,
          }}
        />
      </div>

      {/* Content — centred column */}
      <div className="max-w-3xl mx-auto text-center z-10 fade-up" style={{ paddingTop: '96px' }}>

        {/* Status pill */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-10 text-xs font-semibold tracking-widest uppercase"
          style={{ background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.3)', color: '#34d399' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Available for Opportunities
        </div>

        {/* ── Profile photo — centred ── */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            {/* Pulse rings */}
            <div
              className="absolute inset-0 rounded-full pulse-ring"
              style={{ border: '2px solid rgba(56,189,248,0.35)', margin: '-14px' }}
            />
            <div
              className="absolute inset-0 rounded-full pulse-ring"
              style={{ border: '1px solid rgba(99,102,241,0.22)', margin: '-28px', animationDelay: '0.7s' }}
            />

            {/* Gradient ring frame */}
            <div
              className="p-[3px] rounded-full"
              style={{
                background: 'linear-gradient(135deg, #0ea5e9, #6366f1, #34d399)',
                boxShadow: '0 0 60px rgba(14,165,233,0.55), 0 0 120px rgba(99,102,241,0.25)',
              }}
            >
              <div className="w-48 h-48 rounded-full overflow-hidden"
                style={{ border: '3px solid #020617' }}>
                <img
                  src="/avatar.jpg"
                  alt={resumeData.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>

            {/* Online indicator */}
            <div
              className="absolute bottom-2 right-2 w-6 h-6 rounded-full border-2 flex items-center justify-center"
              style={{ background: '#10b981', borderColor: '#020617' }}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-300 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Name */}
        <h1 className="font-bold mb-3 leading-tight" style={{ fontSize: 'clamp(2.4rem, 6.5vw, 4.5rem)' }}>
          <span style={{
            background: 'linear-gradient(135deg, #f1f5f9 25%, #94a3b8 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            {resumeData.name}
          </span>
        </h1>

        {/* Title */}
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="h-px w-10 opacity-60" style={{ background: 'linear-gradient(90deg,transparent,#38bdf8)' }} />
          <h2
            className="text-xl md:text-2xl font-semibold"
            style={{ background: 'linear-gradient(135deg,#38bdf8,#818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
          >
            {resumeData.title}
          </h2>
          <div className="h-px w-10 opacity-60" style={{ background: 'linear-gradient(90deg,#818cf8,transparent)' }} />
        </div>

        {/* Contact row */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400 text-sm mb-5">
          <span className="flex items-center gap-1.5"><MapPin size={13} className="text-sky-400" />{resumeData.location}</span>
          <span className="hidden sm:block w-1 h-1 rounded-full bg-slate-600" />
          <span className="flex items-center gap-1.5"><Phone size={13} className="text-sky-400" />{resumeData.phone}</span>
          <span className="hidden sm:block w-1 h-1 rounded-full bg-slate-600" />
          <span className="flex items-center gap-1.5"><Mail size={13} className="text-sky-400" />{resumeData.email}</span>
        </div>

        {/* Extras badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-7">
          {resumeData.extras.map((extra) => (
            <span
              key={extra}
              className="px-3 py-1 rounded-full text-xs font-medium"
              style={{ background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.22)', color: '#7dd3fc' }}
            >
              {extra}
            </span>
          ))}
        </div>

        {/* Summary */}
        <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          {resumeData.summary}
        </p>

        {/* CTA row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => scrollTo('contact')}
            className="group flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-semibold text-white transition-all duration-300 hover:-translate-y-1"
            style={{ background: 'linear-gradient(135deg,#0ea5e9,#6366f1)', boxShadow: '0 8px 32px rgba(14,165,233,0.35)' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 12px 48px rgba(14,165,233,0.55)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 32px rgba(14,165,233,0.35)'; }}
          >
            <Mail size={17} />
            Get in Touch
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href="/Bharadwaj_Agraharam_Resume.pdf"
            download
            className="flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-semibold text-slate-200 transition-all duration-300 hover:-translate-y-1 hover:text-white"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)' }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(56,189,248,0.45)';
              (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(56,189,248,0.1)';
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 20px rgba(56,189,248,0.15)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.12)';
              (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.05)';
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none';
            }}
          >
            <Download size={17} />
            Download Resume
          </a>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={() => scrollTo('about')}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-500 hover:text-sky-400 transition-colors"
        >
          <span className="text-xs tracking-widest uppercase font-medium">Scroll</span>
          <ChevronDown size={20} className="animate-bounce" />
        </button>
      </div>

      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#020617] pointer-events-none"
        style={{ zIndex: 5 }}
      />
    </section>
  );
}
