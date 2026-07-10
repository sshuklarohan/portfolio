import { useState } from 'react'
import { useProjects } from '../hooks/usePortfolio'
import type { Project } from '../api/client'
import { SectionLabel, Skeleton } from './Experience'

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '2rem', border: '1px solid',
        borderColor: hovered ? 'var(--accent-dim)' : 'var(--border)',
        borderRadius: 2, transition: 'border-color 0.25s, background 0.25s',
        background: hovered ? 'var(--bg-subtle)' : 'transparent',
        animation: 'fadeUp 0.5s ease both',
        animationDelay: `${index * 0.08}s`,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: '1rem' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 20, color: 'var(--text)', lineHeight: 1.2 }}>
          {project.title}
        </h3>
        <div style={{ display: 'flex', gap: 12, flexShrink: 0 }}>
          {project.repo_url && (
            <a href={project.repo_url} target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', textDecoration: 'none', letterSpacing: '0.06em' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
            >Repo ↗</a>
          )}
          {project.live_url && (
            <a href={project.live_url} target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', textDecoration: 'none', letterSpacing: '0.06em' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
            >Live ↗</a>
          )}
        </div>
      </div>

      {project.summary && (
        <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
          {project.summary}
        </p>
      )}

      {project.tags?.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {project.tags.map(tag => (
            <span key={tag} style={{
              fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)',
              letterSpacing: '0.04em', border: '1px solid var(--border)',
              padding: '2px 8px', borderRadius: 2,
            }}>
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Projects() {
  const { data: projects, isLoading } = useProjects()

  return (
    <section id="projects" style={{ padding: '6rem 0', minHeight: '80vh' }}>
      <SectionLabel text="Projects" />
      {isLoading && <Skeleton />}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 420px), 1fr))', gap: '1.5rem' }}>
        {projects?.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}
