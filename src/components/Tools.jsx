import { profile } from '../data'
import { getIcon } from '../icons'

export default function Tools() {
  return (
    <div className="tools-grid">
      {profile.tools.map((tool, i) => (
        <ToolCard key={i} {...tool} />
      ))}
    </div>
  )
}

function ToolCard({ name, desc, icon }) {
  const Icon = getIcon(icon)

  return (
    <div className="tool-card stagger-child">
      <div className="tool-card__icon stagger-child">
        <Icon size={20} />
      </div>
      <h3 className="tool-card__name stagger-child">{name}</h3>
      <p className="tool-card__desc stagger-child">{desc}</p>
    </div>
  )
}
