import { resumeData } from '../../data/resume';
import { SectionHeader } from './About';

const CATEGORY_STYLES: Record<string, { gradient: string; border: string; tag: string; tagText: string }> = {
  'SIEM & Security Tools':      { gradient: 'rgba(14,165,233,0.08)',  border: 'rgba(14,165,233,0.25)',  tag: 'rgba(14,165,233,0.15)',  tagText: '#7dd3fc' },
  'Networking & Infrastructure':{ gradient: 'rgba(99,102,241,0.08)',  border: 'rgba(99,102,241,0.22)',  tag: 'rgba(99,102,241,0.15)',  tagText: '#c7d2fe' },
  'Frameworks & Compliance':    { gradient: 'rgba(52,211,153,0.07)',  border: 'rgba(52,211,153,0.22)',  tag: 'rgba(52,211,153,0.12)',  tagText: '#6ee7b7' },
  'Digital Forensics':          { gradient: 'rgba(251,191,36,0.07)',  border: 'rgba(251,191,36,0.22)',  tag: 'rgba(251,191,36,0.12)',  tagText: '#fde68a' },
  'Operating Systems':          { gradient: 'rgba(248,113,113,0.07)', border: 'rgba(248,113,113,0.22)', tag: 'rgba(248,113,113,0.12)', tagText: '#fca5a5' },
};

export default function Skills() {
  return (
    <section id="skills" className="relative py-16 sm:py-28 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto z-10 relative">
        <SectionHeader label="Technical Expertise" title="Skills & Tools" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mt-12 sm:mt-16">
          {Object.entries(resumeData.skills).map(([category, items]) => {
            const s = CATEGORY_STYLES[category] ?? { gradient: 'rgba(255,255,255,0.04)', border: 'rgba(255,255,255,0.1)', tag: 'rgba(255,255,255,0.08)', tagText: '#94a3b8' };
            return (
              <div
                key={category}
                className="shimmer-card group p-5 sm:p-6 rounded-2xl transition-all duration-300 hover:-translate-y-2"
                style={{
                  background: s.gradient,
                  border: `1px solid ${s.border}`,
                  backdropFilter: 'blur(12px)',
                  boxShadow: 'none',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = `0 20px 50px rgba(0,0,0,0.4), 0 0 30px ${s.border}`; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; }}
              >
                <h3 className="text-white font-semibold text-sm mb-4 tracking-wide">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium"
                      style={{ background: s.tag, color: s.tagText, border: `1px solid ${s.border}` }}
                    >
                      {skill}
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
