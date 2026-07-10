import { useExperience } from '../hooks/usePortfolio'
import type { Experience as ExperienceType } from '../api/client'

function formatDate(dateStr: string | null | undefined) {
  if (!dateStr) return 'Present'
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })
}

export function SectionLabel({ text }: { text: string }) {
  return (
    <div style={{ marginBottom: '3rem' }}>
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--accent)',
        letterSpacing: '0.12em', textTransform: 'uppercase',
      }}>
        {text}
      </span>
      <div style={{ width: 40, height: 1, background: 'var(--accent)', marginTop: 8, opacity: 0.4 }} />
    </div>
  )
}

export function Skeleton() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {[1, 2, 3].map(i => (
        <div key={i} style={{ opacity: 0.3 }}>
          <div style={{ height: 22, width: '40%', background: 'var(--bg-raised)', borderRadius: 2, marginBottom: 8 }} />
          <div style={{ height: 14, width: '25%', background: 'var(--bg-raised)', borderRadius: 2 }} />
        </div>
      ))}
    </div>
  )
}

function ExperienceItem({ exp, index }: { exp: ExperienceType; index: number }) {
  return (
    <div style={{
      paddingBottom: '3rem', marginBottom: '3rem',
      borderBottom: '1px solid var(--border)',
      animation: 'fadeUp 0.5s ease both',
      animationDelay: `${index * 0.08}s`,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8, marginBottom: '0.75rem' }}>
        <div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 22, color: 'var(--text)', lineHeight: 1.2 }}>
            {exp.role}
          </h3>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent)', letterSpacing: '0.06em', marginTop: 4 }}>
            {exp.company}{exp.location ? ` · ${exp.location}` : ''}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>
            {formatDate(exp.start_date)} — {formatDate(exp.end_date)}
          </span>
          {!exp.end_date && (
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em',
              textTransform: 'uppercase', color: 'var(--accent)',
              background: 'rgba(201,168,76,0.1)', padding: '2px 8px', borderRadius: 2,
            }}>
              Current
            </span>
          )}
        </div>
      </div>

      {exp.description && (
        <div style={{ marginTop: '0.75rem', marginBottom: '1rem' }}>
          {exp.description.split('\n').filter(Boolean).map((line, i) => (
            <div key={i} style={{
              fontSize: 14, color: 'var(--muted)', lineHeight: 1.7,
              paddingLeft: '1rem', position: 'relative', marginBottom: 4,
            }}>
              <span style={{ position: 'absolute', left: 0, color: 'var(--accent)' }}>—</span>
              {line.replace(/^[-–—]\s*/, '')}
            </div>
          ))}
        </div>
      )}

      {exp.technologies?.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: '0.5rem' }}>
          {exp.technologies.map(tech => (
            <span key={tech} style={{
              fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)',
              letterSpacing: '0.04em', border: '1px solid var(--border)',
              padding: '2px 8px', borderRadius: 2,
            }}>
              {tech}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Experience() {
  const { data: experience, isLoading } = useExperience()

  return (
    <section id="experience" style={{ padding: '6rem 0', minHeight: '80vh' }}>
      <SectionLabel text="Experience" />
      {isLoading && <Skeleton />}
      {experience?.map((exp, i) => (
        <ExperienceItem key={exp.id} exp={exp} index={i} />
      ))}
    </section>
  )
}
