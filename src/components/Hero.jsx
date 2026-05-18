import { useEffect, useState } from 'react'
import { Linkedin, Download } from 'lucide-react'
import { profile } from '../data'

export default function Hero() {
  const [role, setRole] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    const text = profile.role
    let i = 0
    setTimeout(() => {
      const interval = setInterval(() => {
        if (i < text.length) {
          setRole(text.slice(0, ++i))
        } else {
          setDone(true)
          clearInterval(interval)
        }
      }, 40)
    }, 600)
  }, [])

  return (
    <section className="hero" id="hero">
      <div className="hero__bg" />
      <div className="container hero__content">
        <h1 className="hero__name">{profile.name}</h1>
        <p className="hero__role">{role}<span className="typing-cursor" />{done ? ' ' : ''}</p>
        <p className="hero__summary">{profile.summary}</p>
        <div className="hero__actions">
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn--primary">
            <Linkedin size={18} />
            LinkedIn
          </a>
          <button type="button" className="btn btn--ghost" onClick={() => window.downloadPDF?.()}>
            <Download size={18} />
            Baixar PDF
          </button>
        </div>
      </div>
      <div className="hero__fade" />
    </section>
  )
}
