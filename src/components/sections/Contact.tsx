import { useState } from 'react';
import { Mail, Phone, MapPin, Send, ArrowRight, CheckCircle, AlertCircle, Loader, Linkedin, Github } from 'lucide-react';
import { resumeData } from '../../data/resume';
import { SectionHeader } from './About';

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setStatus('sending');
    setErrorMsg('');
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-contact-email`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim() }),
        }
      );
      if (!res.ok) throw new Error(await res.text());
      setStatus('success');
      setName(''); setEmail(''); setMessage('');
    } catch {
      setStatus('error');
      setErrorMsg('Failed to send. Please email me directly at ' + resumeData.email);
    }
  };

  // font-size 16px prevents iOS auto-zoom on input focus
  const inputStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    fontSize: '16px',
  };
  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = 'rgba(56,189,248,0.45)';
    e.target.style.boxShadow = '0 0 0 3px rgba(56,189,248,0.09)';
  };
  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = 'rgba(255,255,255,0.08)';
    e.target.style.boxShadow = 'none';
  };

  const contactItems = [
    { icon: <Mail size={18} />, label: 'Email', value: resumeData.email, href: `mailto:${resumeData.email}`, color: '#38bdf8' },
    { icon: <Phone size={18} />, label: 'Phone', value: resumeData.phone, href: `tel:${resumeData.phone.replace(/\s/g, '')}`, color: '#818cf8' },
    { icon: <Linkedin size={18} />, label: 'LinkedIn', value: 'bharadwaj-agraharam', href: resumeData.linkedin, color: '#0ea5e9' },
    { icon: <Github size={18} />, label: 'GitHub', value: 'bharadwajagraharam-98', href: resumeData.github, color: '#34d399' },
    { icon: <MapPin size={18} />, label: 'Location', value: resumeData.location, href: undefined, color: '#94a3b8' },
  ];

  return (
    <section id="contact" className="relative py-16 sm:py-24 lg:py-28 px-5 sm:px-8">
      <div className="max-w-4xl mx-auto">
        <SectionHeader label="Get in Touch" title="Contact" />

        <p className="text-slate-400 text-center text-base sm:text-lg max-w-xl mx-auto mt-4 mb-10 sm:mb-14 leading-relaxed">
          Open to entry-level SOC Analyst roles and cybersecurity opportunities. Feel free to reach out.
        </p>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {/* Contact cards */}
          <div className="space-y-3">
            {contactItems.map(({ icon, label, value, href, color }) => {
              const inner = (
                <div
                  className="shimmer-card group flex items-center gap-3 p-4 rounded-2xl transition-all duration-300 active:scale-[0.98]"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(12px)' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = `${color}55`; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 36px rgba(0,0,0,0.35)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.07)'; (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; }}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${color}18`, border: `1px solid ${color}33` }}>
                    <span style={{ color }}>{icon}</span>
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="text-slate-500 text-xs uppercase tracking-wide font-medium">{label}</p>
                    <p className="text-slate-200 text-sm mt-0.5 truncate">{value}</p>
                  </div>
                  {href && <ArrowRight size={13} className="text-slate-600 group-hover:text-slate-400 transition-colors flex-shrink-0" />}
                </div>
              );
              return href
                ? <a key={label} href={href} target="_blank" rel="noopener noreferrer">{inner}</a>
                : <div key={label}>{inner}</div>;
            })}

            <div className="p-4 rounded-xl" style={{ background: 'rgba(56,189,248,0.06)', border: '1px solid rgba(56,189,248,0.15)' }}>
              <p className="text-sky-300 text-xs font-medium mb-1">Typical response time</p>
              <p className="text-slate-400 text-sm leading-relaxed">Messages go directly to my inbox. I usually reply within 24 hours.</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {status === 'success' && (
              <div className="flex items-start gap-3 p-4 rounded-xl"
                style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.3)' }}>
                <CheckCircle size={18} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-emerald-300 font-semibold text-sm">Message sent!</p>
                  <p className="text-slate-400 text-xs mt-0.5">Thanks for reaching out. I'll get back to you soon.</p>
                </div>
              </div>
            )}
            {status === 'error' && (
              <div className="flex items-start gap-3 p-4 rounded-xl"
                style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)' }}>
                <AlertCircle size={18} className="text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-300 font-semibold text-sm">Failed to send</p>
                  <p className="text-slate-400 text-xs mt-0.5 break-words">{errorMsg}</p>
                </div>
              </div>
            )}

            <div>
              <label className="block text-slate-400 text-xs font-semibold mb-1.5 tracking-widest uppercase">Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                placeholder="Your name" required
                className="w-full rounded-xl px-4 py-3 text-slate-200 placeholder-slate-600 outline-none transition-all"
                style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
            </div>
            <div>
              <label className="block text-slate-400 text-xs font-semibold mb-1.5 tracking-widest uppercase">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com" required
                className="w-full rounded-xl px-4 py-3 text-slate-200 placeholder-slate-600 outline-none transition-all"
                style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
            </div>
            <div>
              <label className="block text-slate-400 text-xs font-semibold mb-1.5 tracking-widest uppercase">Message</label>
              <textarea rows={4} value={message} onChange={(e) => setMessage(e.target.value)}
                placeholder="What would you like to discuss?" required
                className="w-full rounded-xl px-4 py-3 text-slate-200 placeholder-slate-600 outline-none transition-all resize-none"
                style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl font-bold text-white transition-all duration-300 hover:-translate-y-1 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              style={{ background: 'linear-gradient(135deg,#0ea5e9,#6366f1)', boxShadow: '0 8px 30px rgba(14,165,233,0.3)' }}
              onMouseEnter={(e) => { if (status !== 'sending') (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 12px 40px rgba(14,165,233,0.5)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 30px rgba(14,165,233,0.3)'; }}
            >
              {status === 'sending'
                ? <><Loader size={16} className="animate-spin" />Sending...</>
                : <><Send size={16} />Send Message</>
              }
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-14 sm:mt-20 pt-8 text-center" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <p className="text-slate-600 text-sm">
          &copy; {new Date().getFullYear()}{' '}
          <span style={{ background: 'linear-gradient(135deg,#38bdf8,#818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            {resumeData.name}
          </span>
          . All rights reserved.
        </p>
      </div>
    </section>
  );
}
