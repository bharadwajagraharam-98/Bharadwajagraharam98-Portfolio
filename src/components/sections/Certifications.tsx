import { Award, ExternalLink } from 'lucide-react';
import { resumeData } from '../../data/resume';
import { SectionHeader } from './About';

export default function Certifications() {
  return (
    <section id="certifications" className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto z-10 relative">
        <SectionHeader label="Credentials" title="Certifications" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-16">
          {resumeData.certifications.map((cert, i) => (
            <div
              key={i}
              className="shimmer-card group relative p-6 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                backdropFilter: 'blur(14px)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 20px 50px rgba(0,0,0,0.45)';
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(56,189,248,0.25)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.07)';
              }}
            >
              {/* Top gradient bar */}
              <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${cert.color}`} />

              {/* Watermark number */}
              <div className="absolute top-4 right-4 text-4xl font-bold select-none" style={{ color: 'rgba(255,255,255,0.03)' }}>
                {String(i + 1).padStart(2, '0')}
              </div>

              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br ${cert.color} flex items-center justify-center shadow-lg`}>
                  <Award size={19} className="text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm leading-snug mb-1.5 group-hover:text-sky-100 transition-colors">
                    {cert.name}
                  </h3>
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-400 text-xs">{cert.issuer}</span>
                    <ExternalLink size={10} className="text-slate-600 group-hover:text-slate-400 transition-colors" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
