import NetworkBackground from './components/NetworkBackground';
import Navigation from './components/Navigation';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import Education from './components/sections/Education';
import Certifications from './components/sections/Certifications';
import Contact from './components/sections/Contact';

export default function App() {
  return (
    <div className="relative min-h-screen text-white antialiased" style={{ background: '#020617' }}>
      {/* Ambient gradient base */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 20% 0%, rgba(14,165,233,0.13) 0%, transparent 60%),' +
            'radial-gradient(ellipse 60% 50% at 80% 10%, rgba(99,102,241,0.10) 0%, transparent 55%),' +
            'radial-gradient(ellipse 50% 40% at 50% 85%, rgba(52,211,153,0.08) 0%, transparent 60%),' +
            'linear-gradient(180deg,#020617 0%,#050d1f 50%,#020617 100%)',
          zIndex: 0,
        }}
      />

      <NetworkBackground />

      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1, background: 'rgba(2,6,23,0.52)' }} />

      <div className="relative" style={{ zIndex: 10 }}>
        <Navigation />
        <main>
          <Hero />
          <div className="divider-gradient mx-auto max-w-5xl" />
          <About />
          <div className="divider-gradient mx-auto max-w-5xl" />
          <Skills />
          <div className="divider-gradient mx-auto max-w-5xl" />
          <Experience />
          <div className="divider-gradient mx-auto max-w-5xl" />
          <Projects />
          <div className="divider-gradient mx-auto max-w-5xl" />
          <Education />
          <div className="divider-gradient mx-auto max-w-5xl" />
          <Certifications />
          <div className="divider-gradient mx-auto max-w-5xl" />
          <Contact />
        </main>
      </div>
    </div>
  );
}
