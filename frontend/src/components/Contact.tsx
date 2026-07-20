import { useState, FormEvent } from 'react'
import { SectionLabel } from './Experience'

type FormState = 'idle' | 'sending' | 'sent' | 'error'

export default function Contact() {
  const [state, setState] = useState<FormState>('idle')
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setState('sending')
    // Wire to backend POST /contact when ready
    await new Promise(r => setTimeout(r, 1000))
    setState('sent')
  }

  const inputStyle = {
    width: '100%', background: 'var(--bg-raised)', border: '1px solid var(--border)',
    borderRadius: 2, padding: '12px 14px', color: 'var(--text)',
    fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 300,
    outline: 'none', transition: 'border-color 0.2s',
  }

  return (
    <section id="contact" style={{ padding: '6rem 0', minHeight: '60vh', paddingBottom: '10rem' }}>
      <SectionLabel text="Contact" />

      <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.8, maxWidth: 460, marginBottom: '3rem' }}>
        Open to interesting roles and projects. Send a message and I'll get back to you.
      </p>

      {state === 'sent' ? (
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--accent)',
          letterSpacing: '0.06em', padding: '1.5rem',
          border: '1px solid var(--accent-dim)', borderRadius: 2, maxWidth: 460,
        }}>
          Message received — I'll be in touch.
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ maxWidth: 460, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Name</label>
              <input required type="text" value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                style={inputStyle}
                onFocus={e => (e.target.style.borderColor = 'var(--accent-dim)')}
                onBlur={e => (e.target.style.borderColor = 'var(--border)')}
              />
            </div>
            <div>
              <label style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Email</label>
              <input required type="email" value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                style={inputStyle}
                onFocus={e => (e.target.style.borderColor = 'var(--accent-dim)')}
                onBlur={e => (e.target.style.borderColor = 'var(--border)')}
              />
            </div>
          </div>

          <div>
            <label style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Message</label>
            <textarea required rows={5} value={form.message}
              onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              style={{ ...inputStyle, resize: 'vertical', minHeight: 120 }}
              onFocus={e => (e.target.style.borderColor = 'var(--accent-dim)')}
              onBlur={e => (e.target.style.borderColor = 'var(--border)')}
            />
          </div>

          <button type="submit" disabled={state === 'sending'} style={{
            alignSelf: 'flex-start', background: 'none', border: '1px solid var(--accent)',
            color: state === 'sending' ? 'var(--muted)' : 'var(--accent)',
            fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.1em',
            textTransform: 'uppercase', padding: '10px 24px', borderRadius: 2,
            cursor: state === 'sending' ? 'default' : 'pointer', transition: 'all 0.2s',
          }}
          onMouseEnter={e => { if (state !== 'sending') { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = 'var(--bg)' } }}
          onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = state === 'sending' ? 'var(--muted)' : 'var(--accent)' }}
          >
            {state === 'sending' ? 'Sending...' : 'Send message'}
          </button>
        </form>
      )}
    </section>
  )
}
