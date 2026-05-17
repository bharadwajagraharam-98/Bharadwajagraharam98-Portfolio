import { Terminal, Calendar, Building, Code2 } from 'lucide-react';
import { resumeData } from '../../data/resume';
import { SectionHeader } from './About';

const PROJECT_ACCENTS = [
  { border: 'rgba(14,165,233,0.3)',  glow: 'rgba(14,165,233,0.12)', bar: 'linear-gradient(90deg,#0ea5e9,#6366f1)', icon: '#38bdf8' },
  { border: 'rgba(52,211,153,0.3)',  glow: 'rgba(52,211,153,0.10)', bar: 'linear-gradient(90deg,#34d399,#0ea5e9)', icon: '#34d399' },
];

export default function Projects() {
  return (
    <section id="projects" className="relative py-16 sm:py-24 lg:py-28 px-5 sm:px-8">
      <div className="max-w-4xl mx-auto">
        <SectionHeader label="Personal & Academic Work" title="Projects" />

        <div className="mt-12 sm:mt-16 space-y-6 sm:space-y-8">
          {resumeData.projects.map((project, i) => {
            const a = PROJECT_ACCENTS[i % PROJECT_ACCENTS.length];
            return (
              <div
                key={i}
                className="shimmer-card group relative p-5 sm:p-8 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2"
                style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${a.border}`, backdropFilter: 'blur(16px)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = `0 24px 64px rgba(0,0,0,0.5), 0 0 40px ${a.glow}`; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; }}
              >
                <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: a.bar }} />

                <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-5">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center"
                    style={{ background: a.glow, border: `1px solid ${a.border}` }}>
                    {i === 0 ? <Code2 size={20} style={{ color: a.icon }} /> : <Terminal size={20} style={{ color: a.icon }} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-white mb-1 leading-snug" style={{ fontSize: 'clamp(1rem, 3vw, 1.2rem)' }}>
                      {project.name}
                    </h3>
                    <div className="flex flex-wrap gap-2 sm:gap-4">
                      <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                        <Building size={11} className="flex-shrink-0" /><span>{project.org}</span>
                      </div>
                      {project.period && (
                        <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                          <Calendar size={11} className="flex-shrink-0" /><span>{project.period}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <ul className="space-y-2 sm:space-y-2.5 mb-5">
                  {project.description.split('. ').filter(Boolean).map((point, j) => (
                    <li key={j} className="flex items-start gap-2.5 sm:gap-3 text-slate-300 text-sm leading-relaxed">
                      <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full" style={{ background: a.icon, opacity: 0.8 }} />
                      {point.endsWith('.') ? point : point + '.'}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-lg text-xs font-medium"
                      style={{ background: a.glow, color: a.icon, border: `1px solid ${a.border}` }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
