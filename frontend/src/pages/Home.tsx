import Nav from '../components/Nav'
import About from '../components/About'
import Experience from '../components/Experience'
import Projects from '../components/Projects'
import Skills from '../components/Skills'
import Contact from '../components/Contact'

export default function Home() {
  return (
    <>
      <Nav />
      <div style={{ marginLeft: 220 }} className="page-content">
        <main style={{ maxWidth: 780, margin: '0 auto', padding: '0 3rem' }}>
          <About />
          <div style={{ height: 1, background: 'var(--border)', margin: '2rem 0' }} />
          <Experience />
          <div style={{ height: 1, background: 'var(--border)', margin: '2rem 0' }} />
          <Projects />
          <div style={{ height: 1, background: 'var(--border)', margin: '2rem 0' }} />
          <Skills />
          <div style={{ height: 1, background: 'var(--border)', margin: '2rem 0' }} />
          <Contact />
        </main>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .page-content { margin-left: 0 !important; padding-top: 57px; }
          main { padding: 0 1.25rem !important; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  )
}
