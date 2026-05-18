import { Briefcase } from 'lucide-react'
import { profile } from '../data'

export default function Experience() {
  return (
    <div className="timeline">
      {profile.experience.map((exp, i) => (
        <TimelineItem key={i} icon={Briefcase} {...exp} />
      ))}
    </div>
  )
}

function TimelineItem({ icon: Icon, title, company, description, responsibilities }) {
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
              <p className="card__institution stagger-child">{company}</p>
            </div>
          </div>
          <div className="card__body">
            <p className="card__description stagger-child">{description}</p>
            <ul className="card__responsibilities">
              {responsibilities.map((r, i) => (
                <li key={i} className="stagger-child">{r}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
