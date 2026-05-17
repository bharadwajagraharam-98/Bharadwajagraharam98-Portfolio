import { Award, ExternalLink } from 'lucide-react';
import { resumeData } from '../../data/resume';
import { SectionHeader } from './About';

export default function Certifications() {
  return (
    <section id="certifications" className="relative py-16 sm:py-24 lg:py-28 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionHeader label="Credentials" title="Certifications" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mt-12 sm:mt-16">
          {resumeData.certifications.map((cert, i) => (
            <div
              key={i}
              className="shimmer-card group relative p-5 sm:p-6 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2"
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
              <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${cert.color}`} />
              <div className="absolute top-4 right-4 text-3xl font-bold select-none pointer-events-none"
                style={{ color: 'rgba(255,255,255,0.03)' }}>
                {String(i + 1).padStart(2, '0')}
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <div className={`flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br ${cert.color} flex items-center justify-center shadow-lg`}>
                  <Award size={18} className="text-white" />
                </div>
                <div className="flex-1 min-w-0 pr-4">
                  <h3 className="text-white font-semibold text-sm leading-snug mb-1.5 group-hover:text-sky-100 transition-colors">
                    {cert.name}
                  </h3>
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-400 text-xs">{cert.issuer}</span>
                    <ExternalLink size={10} className="text-slate-600 group-hover:text-slate-400 transition-colors flex-shrink-0" />
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
