import { useEffect, useState, useRef } from 'react'

const ROLES = [
  'Software Engineer',
  'Backend Developer',
  'Full Stack Engineer',
]

function useTypewriter(text: string, speed = 55) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    setDisplayed('')
    setDone(false)
    if (!text) return
    let i = 0
    const interval = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) {
        clearInterval(interval)
        setDone(true)
      }
    }, speed)
    return () => clearInterval(interval)
  }, [text, speed])

  return { displayed, done }
}

function TypewriterRole() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [phase, setPhase] = useState<'typing' | 'pause' | 'deleting'>('typing')
  const [displayed, setDisplayed] = useState('')
  const frameRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    const current = ROLES[roleIndex]

    if (phase === 'typing') {
      if (displayed.length < current.length) {
        frameRef.current = setTimeout(() => {
          setDisplayed(current.slice(0, displayed.length + 1))
        }, 60)
      } else {
        frameRef.current = setTimeout(() => setPhase('pause'), 1800)
      }
    }

    if (phase === 'pause') {
      frameRef.current = setTimeout(() => setPhase('deleting'), 0)
    }

    if (phase === 'deleting') {
      if (displayed.length > 0) {
        frameRef.current = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1))
        }, 30)
      } else {
        setRoleIndex(i => (i + 1) % ROLES.length)
        setPhase('typing')
      }
    }

    return () => clearTimeout(frameRef.current)
  }, [phase, displayed, roleIndex])

  return (
    <h2 style={{
      fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 400,
      fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', color: 'var(--muted)',
      marginBottom: '2.5rem', minHeight: '2.2rem',
      display: 'flex', alignItems: 'center', gap: 2,
    }}>
      {displayed}
      <span style={{
        display: 'inline-block', width: 2, height: '0.9em',
        background: 'var(--accent)', marginLeft: 3,
        animation: 'blink 1s step-end infinite',
        flexShrink: 0, borderRadius: 1,
      }} />
    </h2>
  )
}

function AnimatedName() {
  const name = 'Rohan Shukla'
  const { displayed, done } = useTypewriter(name, 80)

  return (
    <h1 style={{
      fontFamily: 'var(--font-display)', fontWeight: 400,
      fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 1.05,
      color: 'var(--text)', marginBottom: '1rem',
      minHeight: 'clamp(3.5rem, 9vw, 7rem)',
    }}>
      {displayed}
      {!done && (
        <span style={{
          display: 'inline-block', width: '0.06em', height: '0.85em',
          background: 'var(--text)', marginLeft: 4,
          animation: 'blink 1s step-end infinite',
          verticalAlign: 'middle', borderRadius: 1,
        }} />
      )}
    </h1>
  )
}

export default function About() {
  const [showRest, setShowRest] = useState(false)

  // Reveal bio + links after name finishes typing
  useEffect(() => {
    // name is 9 chars at 80ms each = ~720ms + small buffer
    const t = setTimeout(() => setShowRest(true), 900)
    return () => clearTimeout(t)
  }, [])

  return (
    <section id="about" style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      justifyContent: 'center', padding: '6rem 0',
    }}>
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--accent)',
        letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.5rem',
        opacity: showRest ? 1 : 0, transition: 'opacity 0.6s',
      }}>
        Hello, I'm
      </div>

      <AnimatedName />

      {/* Role cycles through options with typewriter + delete effect */}
      <TypewriterRole />

      <p style={{
        fontSize: 16, color: 'var(--muted)', lineHeight: 1.8,
        maxWidth: 520, marginBottom: '1.5rem',
        opacity: showRest ? 1 : 0,
        transform: showRest ? 'translateY(0)' : 'translateY(12px)',
        transition: 'opacity 0.6s 0.1s, transform 0.6s 0.1s',
      }}>
        build intelligent software at the intersection of machine learning and full-stack engineering. 
        From computer vision models to user-facing applications, I enjoy creating systems that are practical, scalable, and impactful.
      </p>

      <p style={{
        fontSize: 16, color: 'var(--muted)', lineHeight: 1.8,
        maxWidth: 520, marginBottom: '3rem',
        opacity: showRest ? 1 : 0,
        transform: showRest ? 'translateY(0)' : 'translateY(12px)',
        transition: 'opacity 0.6s 0.2s, transform 0.6s 0.2s',
      }}>
        I’m driven by curiosity, ownership, and the challenge of using technology to 
        improve everyday experiences through thoughtful engineering.
      </p>

      <div style={{
        display: 'flex', gap: '1.5rem', flexWrap: 'wrap',
        opacity: showRest ? 1 : 0,
        transform: showRest ? 'translateY(0)' : 'translateY(12px)',
        transition: 'opacity 0.6s 0.3s, transform 0.6s 0.3s',
      }}>
        {[
          { label: 'GitHub',   href: 'https://github.com' },
          { label: 'LinkedIn', href: 'https://linkedin.com' },
          { label: 'CV',       href: '/cv.pdf' },
        ].map(({ label, href }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{
            fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.08em',
            textTransform: 'uppercase', color: 'var(--text)', textDecoration: 'none',
            borderBottom: '1px solid var(--accent)', paddingBottom: 2, transition: 'color 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text)')}
          >
            {label} ↗
          </a>
        ))}
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </section>
  )
}
