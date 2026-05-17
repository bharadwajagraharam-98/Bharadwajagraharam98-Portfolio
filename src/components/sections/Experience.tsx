import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { resumeData } from '../../data/resume';
import { SectionHeader } from './About';

const DOT_COLORS = ['#38bdf8', '#818cf8', '#34d399'];

export default function Experience() {
  return (
    <section id="experience" className="relative py-16 sm:py-24 lg:py-28 px-5 sm:px-8">
      <div className="max-w-4xl mx-auto">
        <SectionHeader label="Work History" title="Experience" />

        <div className="mt-12 sm:mt-16 relative">
          {/* Timeline line */}
          <div
            className="absolute top-0 bottom-0 w-px"
            style={{
              left: '10px',
              background: 'linear-gradient(180deg,rgba(56,189,248,0.7) 0%,rgba(129,140,248,0.5) 50%,transparent 100%)',
            }}
          />

          <div className="space-y-7 sm:space-y-10">
            {resumeData.experience.map((job, i) => {
              const color = DOT_COLORS[i % DOT_COLORS.length];
              return (
                <div key={i} className="relative pl-9 sm:pl-12">
                  {/* Timeline dot */}
                  <div
                    className="absolute top-4 w-5 h-5 rounded-full border-2 border-[#020617] flex items-center justify-center"
                    style={{ left: '1px', background: color, boxShadow: `0 0 12px ${color}` }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
                  </div>

                  <div
                    className="shimmer-card group p-4 sm:p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(12px)' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = `${color}44`; (e.currentTarget as HTMLDivElement).style.boxShadow = `0 20px 50px rgba(0,0,0,0.4)`; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.07)'; (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; }}
                  >
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1.5 sm:gap-3 mb-4">
                      <div>
                        <h3 className="font-bold text-white mb-1" style={{ fontSize: 'clamp(1rem, 3vw, 1.2rem)' }}>{job.title}</h3>
                        <div className="flex items-center gap-1.5">
                          <Briefcase size={12} style={{ color }} />
                          <span className="font-semibold text-sm" style={{ color }}>{job.company}</span>
                        </div>
                      </div>
                      <div className="flex flex-row sm:flex-col items-center sm:items-end gap-3 sm:gap-1.5 flex-wrap">
                        <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                          <Calendar size={11} className="flex-shrink-0" /><span>{job.period}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                          <MapPin size={11} className="flex-shrink-0" /><span>{job.location}</span>
                        </div>
                      </div>
                    </div>

                    <ul className="space-y-2.5">
                      {job.bullets.map((bullet, j) => (
                        <li key={j} className="flex items-start gap-2.5 sm:gap-3 text-slate-300 text-sm leading-relaxed">
                          <span className="flex-shrink-0 mt-2 w-1.5 h-1.5 rounded-full" style={{ background: color, opacity: 0.8 }} />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
