import { useEffect, useState } from 'react'

const SECTIONS = [
  { id: 'about',      label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects',   label: 'Projects' },
  { id: 'contact',    label: 'Contact' },
]

export default function Nav() {
  const [active, setActive] = useState('about')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { rootMargin: '-40% 0px -55% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <>
      <nav style={{
        position: 'fixed', left: 0, top: 0, bottom: 0, width: 220,
        padding: '3rem 2rem', display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between', borderRight: '1px solid var(--border)', zIndex: 100,
      }} className="nav-desktop">
        <div>
          <button onClick={() => scrollTo('about')} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            textAlign: 'left', padding: 0, marginBottom: '3rem',
          }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--text)', lineHeight: 1.2 }}>
              Your Name
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--accent)', marginTop: 4, letterSpacing: '0.08em' }}>
              SOFTWARE ENGINEER
            </div>
          </button>

          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>
            {SECTIONS.map(({ id, label }) => (
              <li key={id}>
                <button onClick={() => scrollTo(id)} style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontFamily: 'var(--font-mono)', fontSize: 12,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: active === id ? 'var(--accent)' : 'var(--muted)',
                  padding: '6px 0', display: 'flex', alignItems: 'center', gap: 10,
                  transition: 'color 0.2s', width: '100%', textAlign: 'left',
                }}>
                  <span style={{
                    width: active === id ? 28 : 14, height: 1,
                    background: active === id ? 'var(--accent)' : 'var(--border)',
                    transition: 'all 0.3s', flexShrink: 0,
                  }} />
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', letterSpacing: '0.06em' }}>
          © {new Date().getFullYear()}
        </div>
      </nav>

      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, padding: '1rem 1.5rem',
        background: 'var(--bg)', borderBottom: '1px solid var(--border)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100,
      }} className="nav-mobile">
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: 'var(--text)' }}>Your Name</span>
        <button onClick={() => setMenuOpen(o => !o)} style={{
          background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text)', fontSize: 20, padding: 4,
        }}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {menuOpen && (
        <div style={{
          position: 'fixed', top: 57, left: 0, right: 0,
          background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border)',
          zIndex: 99, padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column',
        }}>
          {SECTIONS.map(({ id, label }) => (
            <button key={id} onClick={() => scrollTo(id)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.1em',
              textTransform: 'uppercase', color: active === id ? 'var(--accent)' : 'var(--muted)',
              padding: '12px 0', textAlign: 'left', borderBottom: '1px solid var(--border)',
            }}>
              {label}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @media (min-width: 768px) { .nav-mobile { display: none !important; } }
        @media (max-width: 767px) { .nav-desktop { display: none !important; } }
      `}</style>
    </>
  )
}
