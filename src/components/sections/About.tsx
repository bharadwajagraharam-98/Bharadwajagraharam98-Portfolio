import { MapPin, Mail, Phone, Shield, Eye, BookOpen } from 'lucide-react';
import { resumeData } from '../../data/resume';

const highlights = [
  {
    icon: Shield,
    label: 'SOC Monitoring',
    desc: 'High-volume alert triage and incident analysis within SLA-driven environments',
    color: 'rgba(14,165,233,0.15)',
    border: 'rgba(14,165,233,0.3)',
    iconBg: 'rgba(14,165,233,0.15)',
    iconColor: '#38bdf8',
  },
  {
    icon: Eye,
    label: 'Incident Response',
    desc: 'Root cause analysis, structured reporting, and escalation to management',
    color: 'rgba(99,102,241,0.12)',
    border: 'rgba(99,102,241,0.28)',
    iconBg: 'rgba(99,102,241,0.15)',
    iconColor: '#a5b4fc',
  },
  {
    icon: BookOpen,
    label: 'Security Governance',
    desc: 'Risk assessment, digital forensics, ISO 27001 & GDPR compliance',
    color: 'rgba(52,211,153,0.10)',
    border: 'rgba(52,211,153,0.25)',
    iconBg: 'rgba(52,211,153,0.15)',
    iconColor: '#34d399',
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto z-10 relative">
        <SectionHeader label="About Me" title="Who I Am" />

        <div className="grid md:grid-cols-2 gap-14 items-start mt-16">
          <div>
            <p className="text-slate-300 text-lg leading-relaxed mb-8">{resumeData.summary}</p>
            <div className="space-y-3">
              {[
                { icon: <MapPin size={15} />, text: resumeData.location, color: '#38bdf8' },
                { icon: <Phone size={15} />, text: resumeData.phone, color: '#38bdf8' },
                { icon: <Mail size={15} />, text: resumeData.email, color: '#38bdf8' },
              ].map(({ icon, text, color }) => (
                <div key={text} className="flex items-center gap-3">
                  <span style={{ color }}>{icon}</span>
                  <span className="text-slate-300 text-sm">{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {highlights.map((h) => (
              <div
                key={h.label}
                className="shimmer-card flex items-start gap-4 p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1"
                style={{ background: h.color, border: `1px solid ${h.border}`, backdropFilter: 'blur(12px)' }}
              >
                <div className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: h.iconBg }}>
                  <h.icon size={20} style={{ color: h.iconColor }} />
                </div>
                <div>
                  <p className="text-white font-semibold mb-1">{h.label}</p>
                  <p className="text-slate-400 text-sm leading-relaxed">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <div className="text-center">
      <p className="text-xs font-bold tracking-[0.35em] uppercase mb-3"
        style={{ background: 'linear-gradient(135deg,#38bdf8,#818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
        {label}
      </p>
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">{title}</h2>
      <div className="flex items-center justify-center gap-3">
        <div className="h-px w-20 opacity-70" style={{ background: 'linear-gradient(90deg,transparent,#38bdf8)' }} />
        <div className="w-2 h-2 rounded-full" style={{ background: 'linear-gradient(135deg,#38bdf8,#818cf8)', boxShadow: '0 0 10px rgba(56,189,248,0.8)' }} />
        <div className="h-px w-20 opacity-70" style={{ background: 'linear-gradient(90deg,#818cf8,transparent)' }} />
      </div>
    </div>
  );
}
