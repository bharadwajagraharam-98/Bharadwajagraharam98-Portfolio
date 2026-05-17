import { GraduationCap, Calendar, Award, BookOpen } from 'lucide-react';
import { resumeData } from '../../data/resume';
import { SectionHeader } from './About';

const EDU_ACCENTS = [
  { border: 'rgba(14,165,233,0.3)', bg: 'rgba(14,165,233,0.06)', icon: '#38bdf8', badge: 'rgba(14,165,233,0.15)', badgeText: '#7dd3fc' },
  { border: 'rgba(99,102,241,0.28)', bg: 'rgba(99,102,241,0.05)', icon: '#818cf8', badge: 'rgba(99,102,241,0.15)', badgeText: '#c7d2fe' },
];

export default function Education() {
  return (
    <section id="education" className="relative py-16 sm:py-28 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto z-10 relative">
        <SectionHeader label="Academic Background" title="Education" />

        <div className="mt-12 sm:mt-16 space-y-5 sm:space-y-6">
          {resumeData.education.map((edu, i) => {
            const a = EDU_ACCENTS[i % EDU_ACCENTS.length];
            return (
              <div
                key={i}
                className="shimmer-card group flex flex-col sm:flex-row items-start gap-4 sm:gap-6 p-5 sm:p-7 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                style={{ background: a.bg, border: `1px solid ${a.border}`, backdropFilter: 'blur(16px)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = `0 20px 50px rgba(0,0,0,0.4), 0 0 30px ${a.border}`; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; }}
              >
                <div
                  className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center"
                  style={{ background: `${a.badge}`, border: `1px solid ${a.border}` }}
                >
                  <GraduationCap size={24} style={{ color: a.icon }} />
                </div>
                <div className="flex-grow min-w-0">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-1 leading-snug">{edu.degree}</h3>
                  <p className="font-semibold mb-3 text-sm sm:text-base" style={{ color: a.icon }}>{edu.school}</p>
                  <div className="flex flex-wrap gap-3 sm:gap-4 mb-3">
                    <div className="flex items-center gap-1.5 text-slate-400 text-sm">
                      <Calendar size={13} /><span>{edu.period}</span>
                    </div>
                    <div
                      className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold"
                      style={{ background: a.badge, color: a.badgeText, border: `1px solid ${a.border}` }}
                    >
                      <Award size={11} /><span>{edu.grade}</span>
                    </div>
                  </div>
                  {edu.modules && (
                    <div className="flex items-start gap-2 text-slate-400 text-sm">
                      <BookOpen size={14} className="mt-0.5 flex-shrink-0" />
                      <span className="leading-relaxed">{edu.modules}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
