import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { resumeData } from '../../data/resume';
import { SectionHeader } from './About';

const DOT_COLORS = ['#38bdf8', '#818cf8', '#34d399'];

export default function Experience() {
  return (
    <section id="experience" className="relative py-28 px-6">
      <div className="max-w-4xl mx-auto z-10 relative">
        <SectionHeader label="Work History" title="Experience" />

        <div className="mt-16 relative">
          <div
            className="absolute left-6 md:left-8 top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(180deg,rgba(56,189,248,0.7) 0%,rgba(129,140,248,0.5) 50%,transparent 100%)' }}
          />

          <div className="space-y-10">
            {resumeData.experience.map((job, i) => {
              const color = DOT_COLORS[i % DOT_COLORS.length];
              return (
                <div key={i} className="relative pl-16 md:pl-20">
                  <div
                    className="absolute left-[18px] md:left-[26px] top-1.5 w-5 h-5 rounded-full border-2 border-[#020617] flex items-center justify-center"
                    style={{ background: color, boxShadow: `0 0 14px ${color}` }}
                  >
                    <div className="w-2 h-2 rounded-full bg-white/80" />
                  </div>

                  <div
                    className="shimmer-card group p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(12px)' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = `${color}44`; (e.currentTarget as HTMLDivElement).style.boxShadow = `0 20px 50px rgba(0,0,0,0.4)`; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.07)'; (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; }}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">{job.title}</h3>
                        <div className="flex items-center gap-1.5">
                          <Briefcase size={13} style={{ color }} />
                          <span className="font-semibold text-sm" style={{ color }}>{job.company}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1.5">
                        <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                          <Calendar size={11} /><span>{job.period}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                          <MapPin size={11} /><span>{job.location}</span>
                        </div>
                      </div>
                    </div>

                    <ul className="space-y-2.5">
                      {job.bullets.map((bullet, j) => (
                        <li key={j} className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed">
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
