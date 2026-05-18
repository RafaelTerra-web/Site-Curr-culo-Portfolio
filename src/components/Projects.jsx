import { profile } from '../data'
import { getIcon } from '../icons'

export default function Projects() {
  return (
    <div className="projects-grid">
      {profile.projects.map((p, i) => (
        <ProjectCard key={i} {...p} />
      ))}
    </div>
  )
}

function ProjectCard({ title, description, tags, icon }) {
  const Icon = getIcon(icon)

  return (
    <article className="project-card stagger-child">
      <div className="project-card__accent" />
      <div className="project-card__icon stagger-child">
        <Icon size={22} />
      </div>
      <h3 className="project-card__title stagger-child">{title}</h3>
      <p className="project-card__desc stagger-child">{description}</p>
      <ul className="project-card__tags">
        {tags.map((tag, i) => (
          <li key={i} className="tag tag--sm stagger-child">{tag}</li>
        ))}
      </ul>
    </article>
  )
}
