import { SKILLS } from '../data'
import { SectionLabel } from './Experience'

export default function Skills() {
  // Group by category
  const grouped = SKILLS.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = []
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, typeof SKILLS>)

  return (
    <section id="skills" style={{ padding: '6rem 0' }}>
      <SectionLabel text="Skills" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '2.5rem' }}>
        {Object.entries(grouped).map(([category, skills]) => (
          <div key={category}>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--accent)',
              letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem',
            }}>
              {category}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {skills.map(skill => (
                <div key={skill.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                    <span style={{ fontSize: 13, color: 'var(--text)' }}>{skill.name}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)' }}>
                      {'█'.repeat(skill.level)}{'░'.repeat(5 - skill.level)}
                    </span>
                  </div>
                  <div style={{ height: 1, background: 'var(--border)', position: 'relative' }}>
                    <div style={{
                      position: 'absolute', left: 0, top: 0, height: '100%',
                      width: `${(skill.level / 5) * 100}%`,
                      background: 'var(--accent)', opacity: 0.6,
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
