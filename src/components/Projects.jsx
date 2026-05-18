import { useMemo, useState } from 'react'
import { ArrowUpRight, Layers3, Target } from 'lucide-react'
import { profile } from '../data'
import { getIcon } from '../icons'

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [activeProjectTitle, setActiveProjectTitle] = useState(profile.projects[0]?.title)

  const categories = useMemo(() => {
    return ['Todos', ...Array.from(new Set(profile.projects.map((project) => project.category).filter(Boolean)))]
  }, [])

  const filteredProjects = activeCategory === 'Todos'
    ? profile.projects
    : profile.projects.filter((project) => project.category === activeCategory)

  const activeProject = profile.projects.find((project) => project.title === activeProjectTitle)
    || filteredProjects[0]
    || profile.projects[0]

  const handleCategoryChange = (category) => {
    setActiveCategory(category)
    const nextProject = category === 'Todos'
      ? profile.projects[0]
      : profile.projects.find((project) => project.category === category)
    if (nextProject) setActiveProjectTitle(nextProject.title)
  }

  return (
    <div className="portfolio-lab">
      <div className="portfolio-lab__toolbar reveal">
        <div>
          <span className="portfolio-lab__eyebrow">
            <Layers3 size={16} />
            Portfolio Lab
          </span>
          <h3 className="portfolio-lab__title">Projetos organizados por tipo de desafio</h3>
        </div>
        <div className="portfolio-lab__filters" aria-label="Filtrar projetos por categoria">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`portfolio-lab__filter ${category === activeCategory ? 'portfolio-lab__filter--active' : ''}`}
              aria-pressed={category === activeCategory}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {activeProject && (
        <article className="portfolio-feature reveal">
          <div className="portfolio-feature__meta">
            <span>{activeProject.category}</span>
            <strong>{activeProject.metric}</strong>
          </div>
          <h3>{activeProject.title}</h3>
          <p>{activeProject.impact}</p>
          <dl className="portfolio-feature__details">
            <div>
              <dt>Papel</dt>
              <dd>{activeProject.role}</dd>
            </div>
            <div>
              <dt>Stack / base técnica</dt>
              <dd>{activeProject.tags.join(' · ')}</dd>
            </div>
          </dl>
        </article>
      )}

      <div className="projects-grid">
        {filteredProjects.map((p, i) => (
          <ProjectCard
            key={p.title}
            active={p.title === activeProject?.title}
            onSelect={() => setActiveProjectTitle(p.title)}
            {...p}
          />
        ))}
      </div>
    </div>
  )
}

function ProjectCard({ title, description, tags, icon, category, metric, active, onSelect }) {
  const Icon = getIcon(icon)

  return (
    <article className={`project-card stagger-child ${active ? 'project-card--active' : ''}`}>
      <div className="project-card__accent" />
      <div className="project-card__icon stagger-child">
        <Icon size={22} />
      </div>
      <span className="project-card__category stagger-child">
        <Target size={13} />
        {category}
      </span>
      <h3 className="project-card__title stagger-child">{title}</h3>
      <p className="project-card__desc stagger-child">{description}</p>
      <div className="project-card__metric stagger-child">{metric}</div>
      <ul className="project-card__tags">
        {tags.map((tag, i) => (
          <li key={i} className="tag tag--sm stagger-child">{tag}</li>
        ))}
      </ul>
      <button type="button" className="project-card__action stagger-child" onClick={onSelect}>
        Ver destaque
        <ArrowUpRight size={14} />
      </button>
    </article>
  )
}
