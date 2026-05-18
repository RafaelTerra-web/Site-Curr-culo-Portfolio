import { GraduationCap } from 'lucide-react'
import { profile } from '../data'

export default function Education() {
  return (
    <div className="timeline">
      {profile.education.map((edu, i) => (
        <TimelineItem key={i} icon={GraduationCap} {...edu} />
      ))}
    </div>
  )
}

function TimelineItem({ icon: Icon, title, institution, description, tags, inProgress }) {
  return (
    <div className="timeline__item stagger-child">
      <div className="timeline__marker" />
      <div className="timeline__content">
        <div className="card stagger-child">
          <div className="card__header">
            <div className="card__icon stagger-child">
              <Icon size={20} />
            </div>
            <div>
              <h3 className="card__title stagger-child">{title}</h3>
              <p className="card__institution stagger-child">{institution}</p>
            </div>
          </div>
          <div className="card__body">
            <p className="card__description stagger-child">{description}</p>
            <ul className="card__tags">
              {tags.map((tag, i) => (
                <li key={i} className="tag stagger-child">{tag}</li>
              ))}
            </ul>
            {inProgress && <span className="tag tag--badge tag--active stagger-child">Em andamento</span>}
          </div>
        </div>
      </div>
    </div>
  )
}
