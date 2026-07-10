import { useState } from 'react'
import {
  useProjects, useCreateProject, useUpdateProject, useDeleteProject,
  useExperience, useCreateExperience, useUpdateExperience, useDeleteExperience,
  useSkills, useCreateSkill, useUpdateSkill, useDeleteSkill,
} from '../hooks/usePortfolio'
import type { Project, Experience, Skill } from '../api/client'

// ── Shared styles ─────────────────────────────────────────────────────────────
const S = {
  page: { minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', padding: '2rem' } as const,
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' } as const,
  tabs: { display: 'flex', gap: 4, marginBottom: '2rem' } as const,
  tab: (active: boolean) => ({ padding: '6px 16px', background: active ? 'var(--bg-raised)' : 'none', border: '1px solid', borderColor: active ? 'var(--border)' : 'transparent', borderRadius: 2, color: active ? 'var(--text)' : 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase' as const, cursor: 'pointer' }),
  card: { background: 'var(--bg-raised)', border: '1px solid var(--border)', borderRadius: 4, padding: '1.25rem', marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 } as const,
  btn: (variant: 'danger' | 'accent' | 'ghost') => ({
    fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase' as const,
    padding: '5px 12px', borderRadius: 2, cursor: 'pointer', border: '1px solid',
    ...(variant === 'danger' ? { background: 'none', borderColor: '#6b2020', color: '#c0392b' }
      : variant === 'accent' ? { background: 'var(--accent)', borderColor: 'var(--accent)', color: 'var(--bg)' }
      : { background: 'none', borderColor: 'var(--border)', color: 'var(--muted)' }),
  }),
  label: { fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase' as const, display: 'block', marginBottom: 5 },
  input: { width: '100%', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 2, padding: '8px 10px', color: 'var(--text)', fontFamily: 'var(--font-body)', fontSize: 13, outline: 'none', marginBottom: '0.75rem' } as const,
  grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' } as const,
  modal: { position: 'fixed' as const, inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: '1rem' },
  modalBox: { background: 'var(--bg-raised)', border: '1px solid var(--border)', borderRadius: 6, padding: '2rem', width: '100%', maxWidth: 540, maxHeight: '85vh', overflowY: 'auto' as const },
}

// ── Inline tag editor ─────────────────────────────────────────────────────────
function TagInput({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const [input, setInput] = useState('')
  const add = () => {
    const t = input.trim()
    if (t && !value.includes(t)) onChange([...value, t])
    setInput('')
  }
  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 6 }}>
        {value.map(tag => (
          <span key={tag} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, padding: '2px 8px', border: '1px solid var(--border)', borderRadius: 2, color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
            {tag}
            <button onClick={() => onChange(value.filter(t => t !== tag))} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', padding: 0, fontSize: 12 }}>×</button>
          </span>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        <input value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), add())}
          placeholder="Add tag, press Enter" style={{ ...S.input, marginBottom: 0, flex: 1 }} />
        <button onClick={add} style={S.btn('ghost')}>Add</button>
      </div>
    </div>
  )
}

// ── PROJECT CRUD ──────────────────────────────────────────────────────────────
function emptyProject(): Omit<Project, 'id'> {
  return { title: '', summary: '', description: '', tags: [], repo_url: '', live_url: '', image_url: '', featured: false, order: 0 }
}

function ProjectForm({ initial, onSave, onCancel }: { initial: Omit<Project, 'id'>; onSave: (d: Omit<Project, 'id'>) => void; onCancel: () => void }) {
  const [d, setD] = useState(initial)
  const f = (k: keyof typeof d) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setD(p => ({ ...p, [k]: e.target.value }))
  return (
    <div>
      <label style={S.label}>Title *</label>
      <input style={S.input} value={d.title} onChange={f('title')} />
      <label style={S.label}>Summary</label>
      <input style={S.input} value={d.summary ?? ''} onChange={f('summary')} />
      <label style={S.label}>Description (markdown)</label>
      <textarea style={{ ...S.input, minHeight: 80, resize: 'vertical' }} value={d.description ?? ''} onChange={f('description')} />
      <div style={S.grid2}>
        <div><label style={S.label}>Repo URL</label><input style={S.input} value={d.repo_url ?? ''} onChange={f('repo_url')} /></div>
        <div><label style={S.label}>Live URL</label><input style={S.input} value={d.live_url ?? ''} onChange={f('live_url')} /></div>
      </div>
      <div style={S.grid2}>
        <div><label style={S.label}>Order</label><input style={S.input} type="number" value={d.order} onChange={e => setD(p => ({ ...p, order: Number(e.target.value) }))} /></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingTop: 20 }}>
          <input type="checkbox" id="featured" checked={d.featured} onChange={e => setD(p => ({ ...p, featured: e.target.checked }))} />
          <label htmlFor="featured" style={{ ...S.label, marginBottom: 0 }}>Featured</label>
        </div>
      </div>
      <label style={S.label}>Tags</label>
      <TagInput value={d.tags} onChange={tags => setD(p => ({ ...p, tags }))} />
      <div style={{ display: 'flex', gap: 8, marginTop: '1.25rem', justifyContent: 'flex-end' }}>
        <button style={S.btn('ghost')} onClick={onCancel}>Cancel</button>
        <button style={S.btn('accent')} onClick={() => onSave(d)} disabled={!d.title}>Save</button>
      </div>
    </div>
  )
}

function ProjectsTab() {
  const { data: projects, isLoading } = useProjects()
  const create = useCreateProject()
  const update = useUpdateProject()
  const remove = useDeleteProject()
  const [modal, setModal] = useState<null | { mode: 'create' } | { mode: 'edit'; project: Project }>(null)

  const save = (data: Omit<Project, 'id'>) => {
    if (modal?.mode === 'edit') update.mutate({ id: modal.project.id, data }, { onSuccess: () => setModal(null) })
    else create.mutate(data, { onSuccess: () => setModal(null) })
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)' }}>{projects?.length ?? 0} entries</span>
        <button style={S.btn('accent')} onClick={() => setModal({ mode: 'create' })}>+ Add Project</button>
      </div>

      {isLoading && <p style={{ color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: 13 }}>Loading...</p>}

      {projects?.map(p => (
        <div key={p.id} style={S.card}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: 'var(--text)', marginBottom: 4 }}>{p.title}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)' }}>{p.tags?.join(', ')}</div>
          </div>
          <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
            <button style={S.btn('ghost')} onClick={() => setModal({ mode: 'edit', project: p })}>Edit</button>
            <button style={S.btn('danger')} onClick={() => { if (confirm(`Delete "${p.title}"?`)) remove.mutate(p.id) }}>Delete</button>
          </div>
        </div>
      ))}

      {modal && (
        <div style={S.modal} onClick={e => e.target === e.currentTarget && setModal(null)}>
          <div style={S.modalBox}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 20, marginBottom: '1.5rem', color: 'var(--text)' }}>
              {modal.mode === 'edit' ? 'Edit Project' : 'New Project'}
            </h3>
            <ProjectForm
              initial={modal.mode === 'edit' ? modal.project : emptyProject()}
              onSave={save} onCancel={() => setModal(null)}
            />
          </div>
        </div>
      )}
    </div>
  )
}

// ── EXPERIENCE CRUD ───────────────────────────────────────────────────────────
function emptyExp(): Omit<Experience, 'id'> {
  return { company: '', role: '', location: '', start_date: '', end_date: '', description: '', technologies: [], order: 0 }
}

function ExperienceForm({ initial, onSave, onCancel }: { initial: Omit<Experience, 'id'>; onSave: (d: Omit<Experience, 'id'>) => void; onCancel: () => void }) {
  const [d, setD] = useState(initial)
  const f = (k: keyof typeof d) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setD(p => ({ ...p, [k]: e.target.value }))
  return (
    <div>
      <div style={S.grid2}>
        <div><label style={S.label}>Company *</label><input style={S.input} value={d.company} onChange={f('company')} /></div>
        <div><label style={S.label}>Role *</label><input style={S.input} value={d.role} onChange={f('role')} /></div>
      </div>
      <label style={S.label}>Location</label>
      <input style={S.input} value={d.location ?? ''} onChange={f('location')} />
      <div style={S.grid2}>
        <div><label style={S.label}>Start Date</label><input style={S.input} type="date" value={d.start_date} onChange={f('start_date')} /></div>
        <div><label style={S.label}>End Date (blank = current)</label><input style={S.input} type="date" value={d.end_date ?? ''} onChange={f('end_date')} /></div>
      </div>
      <label style={S.label}>Description (one bullet per line)</label>
      <textarea style={{ ...S.input, minHeight: 100, resize: 'vertical' }} value={d.description ?? ''} onChange={f('description')} placeholder="- Led backend redesign&#10;- Managed team of 4" />
      <label style={S.label}>Technologies</label>
      <TagInput value={d.technologies} onChange={technologies => setD(p => ({ ...p, technologies }))} />
      <label style={{ ...S.label, marginTop: '0.75rem' }}>Order</label>
      <input style={S.input} type="number" value={d.order} onChange={e => setD(p => ({ ...p, order: Number(e.target.value) }))} />
      <div style={{ display: 'flex', gap: 8, marginTop: '1.25rem', justifyContent: 'flex-end' }}>
        <button style={S.btn('ghost')} onClick={onCancel}>Cancel</button>
        <button style={S.btn('accent')} onClick={() => onSave(d)} disabled={!d.company || !d.role}>Save</button>
      </div>
    </div>
  )
}

function ExperienceTab() {
  const { data: experience, isLoading } = useExperience()
  const create = useCreateExperience()
  const update = useUpdateExperience()
  const remove = useDeleteExperience()
  const [modal, setModal] = useState<null | { mode: 'create' } | { mode: 'edit'; exp: Experience }>(null)

  const save = (data: Omit<Experience, 'id'>) => {
    if (modal?.mode === 'edit') update.mutate({ id: modal.exp.id, data }, { onSuccess: () => setModal(null) })
    else create.mutate(data, { onSuccess: () => setModal(null) })
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)' }}>{experience?.length ?? 0} entries</span>
        <button style={S.btn('accent')} onClick={() => setModal({ mode: 'create' })}>+ Add Role</button>
      </div>

      {isLoading && <p style={{ color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: 13 }}>Loading...</p>}

      {experience?.map(exp => (
        <div key={exp.id} style={S.card}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: 'var(--text)', marginBottom: 4 }}>{exp.role}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--accent)' }}>{exp.company}{exp.location ? ` · ${exp.location}` : ''}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{exp.start_date} → {exp.end_date || 'Present'}</div>
          </div>
          <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
            <button style={S.btn('ghost')} onClick={() => setModal({ mode: 'edit', exp })}>Edit</button>
            <button style={S.btn('danger')} onClick={() => { if (confirm(`Delete "${exp.role} @ ${exp.company}"?`)) remove.mutate(exp.id) }}>Delete</button>
          </div>
        </div>
      ))}

      {modal && (
        <div style={S.modal} onClick={e => e.target === e.currentTarget && setModal(null)}>
          <div style={S.modalBox}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 20, marginBottom: '1.5rem', color: 'var(--text)' }}>
              {modal.mode === 'edit' ? 'Edit Role' : 'New Role'}
            </h3>
            <ExperienceForm
              initial={modal.mode === 'edit' ? modal.exp : emptyExp()}
              onSave={save} onCancel={() => setModal(null)}
            />
          </div>
        </div>
      )}
    </div>
  )
}

// ── SKILLS CRUD ───────────────────────────────────────────────────────────────
function SkillsTab() {
  const { data: skills, isLoading } = useSkills()
  const create = useCreateSkill()
  const update = useUpdateSkill()
  const remove = useDeleteSkill()
  const [form, setForm] = useState({ name: '', category: '', level: 3, order: 0 })
  const [editId, setEditId] = useState<number | null>(null)

  const save = () => {
    if (editId !== null) update.mutate({ id: editId, data: form }, { onSuccess: () => { setEditId(null); setForm({ name: '', category: '', level: 3, order: 0 }) } })
    else create.mutate(form, { onSuccess: () => setForm({ name: '', category: '', level: 3, order: 0 }) })
  }

  const startEdit = (s: Skill) => { setEditId(s.id); setForm({ name: s.name, category: s.category ?? '', level: s.level, order: s.order }) }

  // Group by category
  const grouped = skills?.reduce((acc, s) => {
    const cat = s.category ?? 'Other'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(s)
    return acc
  }, {} as Record<string, Skill[]>) ?? {}

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
      <div>
        <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>
          {editId !== null ? 'Edit Skill' : 'Add Skill'}
        </h3>
        <label style={S.label}>Name *</label>
        <input style={S.input} value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
        <label style={S.label}>Category</label>
        <input style={S.input} value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} placeholder="Languages, Frontend, DevOps..." />
        <div style={S.grid2}>
          <div><label style={S.label}>Level (1–5)</label><input style={S.input} type="number" min={1} max={5} value={form.level} onChange={e => setForm(p => ({ ...p, level: Number(e.target.value) }))} /></div>
          <div><label style={S.label}>Order</label><input style={S.input} type="number" value={form.order} onChange={e => setForm(p => ({ ...p, order: Number(e.target.value) }))} /></div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {editId !== null && <button style={S.btn('ghost')} onClick={() => { setEditId(null); setForm({ name: '', category: '', level: 3, order: 0 }) }}>Cancel</button>}
          <button style={S.btn('accent')} onClick={save} disabled={!form.name}>{editId !== null ? 'Update' : 'Add Skill'}</button>
        </div>
      </div>

      <div>
        {isLoading && <p style={{ color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: 13 }}>Loading...</p>}
        {Object.entries(grouped).map(([cat, items]) => (
          <div key={cat} style={{ marginBottom: '1.25rem' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>{cat}</div>
            {items.map(s => (
              <div key={s.id} style={{ ...S.card, padding: '0.75rem 1rem' }}>
                <div>
                  <span style={{ fontSize: 14, color: 'var(--text)' }}>{s.name}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', marginLeft: 8 }}>{'★'.repeat(s.level)}{'☆'.repeat(5 - s.level)}</span>
                </div>
                <div style={{ display: 'flex', gap: 4 }}>
                  <button style={S.btn('ghost')} onClick={() => startEdit(s)}>Edit</button>
                  <button style={S.btn('danger')} onClick={() => { if (confirm(`Delete "${s.name}"?`)) remove.mutate(s.id) }}>×</button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Root Admin page ───────────────────────────────────────────────────────────
type Tab = 'projects' | 'experience' | 'skills'

export default function Admin() {
  const [tab, setTab] = useState<Tab>('projects')

  return (
    <div style={S.page}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={S.header}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 24, color: 'var(--text)' }}>Admin</h1>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>
              Authenticated via X-API-Key · <a href="/" style={{ color: 'var(--accent)', textDecoration: 'none' }}>← View site</a>
            </p>
          </div>
        </div>

        <div style={S.tabs}>
          {(['projects', 'experience', 'skills'] as Tab[]).map(t => (
            <button key={t} style={S.tab(tab === t)} onClick={() => setTab(t)}>{t}</button>
          ))}
        </div>

        {tab === 'projects'   && <ProjectsTab />}
        {tab === 'experience' && <ExperienceTab />}
        {tab === 'skills'     && <SkillsTab />}
      </div>
    </div>
  )
}
