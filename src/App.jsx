import { useEffect, useState, useRef, useCallback } from 'react'
import { Menu, X } from 'lucide-react'
import CursorGlow from './components/CursorGlow'
import ThemeToggle from './components/ThemeToggle'
import Hero from './components/Hero'
import About from './components/About'
import Education from './components/Education'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Tools from './components/Tools'
import Projects from './components/Projects'
import Contact from './components/Contact'
import { profile } from './data'
import { downloadPDF } from './pdf'
import './App.css'

// Expose PDF export globally for button handlers
window.downloadPDF = () => downloadPDF(profile)

const navLinks = [
  { href: '#hero', label: 'Início' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#formacao', label: 'Formação' },
  { href: '#experiencia', label: 'Experiência' },
  { href: '#habilidades', label: 'Habilidades' },
  { href: '#ferramentas', label: 'Ferramentas' },
  { href: '#projetos', label: 'Projetos' },
  { href: '#contato', label: 'Contato' },
]

export default function App() {
  const [dark, setDark] = useState(() => {
    try { return localStorage.getItem('theme') === 'dark' } catch { return false }
  })
  const [menuOpen, setMenuOpen] = useState(false)
  const [headerScrolled, setHeaderScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [showBackToTop, setShowBackToTop] = useState(false)

  // ---- Dark mode ----
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  const handleThemeToggle = () => {
    const next = !dark
    setDark(next)
    try { localStorage.setItem('theme', next ? 'dark' : 'light') } catch {}
  }

  // ---- Scroll listeners ----
  useEffect(() => {
    const onScroll = () => {
      setHeaderScrolled(window.scrollY > 20)
      setShowBackToTop(window.scrollY > 400)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ---- Active section tracking ----
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-20% 0px -60% 0px' }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  // ---- Scroll animations (IntersectionObserver) ----
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal')
    const staggerChildren = document.querySelectorAll('.stagger-child')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )

    revealElements.forEach((el) => observer.observe(el))
    staggerChildren.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  // ---- Back to top ----
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  // ---- Nav click handler ----
  const handleNavClick = (e, href) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      const headerHeight = document.querySelector('.header')?.offsetHeight || 60
      const top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight
      window.scrollTo({ top, behavior: 'smooth' })
      setMenuOpen(false)
    }
  }

  return (
    <>
      <CursorGlow />
      <ThemeToggle dark={dark} onToggle={handleThemeToggle} />

      {/* Header */}
      <header className={`header ${headerScrolled ? 'scrolled' : ''}`}>
        <nav className="nav container" aria-label="Navegação principal">
          <a href="#hero" className="nav__logo" aria-label="Ir para o início" onClick={(e) => handleNavClick(e, '#hero')}>
            <span className="nav__logo-icon">RT</span>
            <span className="nav__logo-text">Rafael Terra</span>
          </a>
          <button
            className={`nav__toggle ${menuOpen ? 'active' : ''}`}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="nav__toggle-box">
              <span className="nav__toggle-line" />
              <span className="nav__toggle-line" />
              <span className="nav__toggle-line" />
            </span>
          </button>
          <ul className={`nav__menu ${menuOpen ? 'open' : ''}`}>
            {navLinks.map((l) => {
              const isActive = activeSection === l.href.slice(1)
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className={`nav__link ${isActive ? 'nav__link--active' : ''}`}
                    onClick={(e) => handleNavClick(e, l.href)}
                  >
                    {l.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      </header>

      <main id="main">
        <Hero />

        <section className="section" id="sobre">
          <div className="container">
            <div className="section__header reveal">
              <span className="section__label">Conheça</span>
              <h2 className="section__title">Sobre</h2>
            </div>
            <About />
          </div>
        </section>

        <section className="section section--alt" id="formacao">
          <div className="container">
            <div className="section__header reveal">
              <span className="section__label">Acadêmico</span>
              <h2 className="section__title">Formação</h2>
            </div>
            <Education />
          </div>
        </section>

        <section className="section" id="experiencia">
          <div className="container">
            <div className="section__header reveal">
              <span className="section__label">Profissional</span>
              <h2 className="section__title">Experiência</h2>
            </div>
            <Experience />
          </div>
        </section>

        <section className="section section--alt" id="habilidades">
          <div className="container">
            <div className="section__header reveal">
              <span className="section__label">Competências</span>
              <h2 className="section__title">Habilidades</h2>
            </div>
            <Skills />
          </div>
        </section>

        <section className="section" id="ferramentas">
          <div className="container">
            <div className="section__header reveal">
              <span className="section__label">Tecnologia</span>
              <h2 className="section__title">Ferramentas</h2>
            </div>
            <Tools />
          </div>
        </section>

        <section className="section section--alt" id="projetos">
          <div className="container">
            <div className="section__header reveal">
              <span className="section__label">Destaques</span>
              <h2 className="section__title">Projetos</h2>
            </div>
            <Projects />
          </div>
        </section>

        <section className="section" id="contato">
          <div className="container">
            <div className="section__header reveal">
              <span className="section__label">Contato</span>
              <h2 className="section__title">Fale Comigo</h2>
            </div>
            <Contact />
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <p className="footer__text">
            &copy; {new Date().getFullYear()} Rafael Terra — Técnico em Estradas &amp; Desenvolvedor
          </p>
        </div>
      </footer>

      {/* Back to top */}
      <button
        className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
        aria-label="Voltar ao topo"
        onClick={scrollToTop}
      >
        ↑
      </button>
    </>
  )
}
