import { useMemo, useState } from 'react'
import { BrainCircuit, Gauge, Sparkles } from 'lucide-react'
import { profile } from '../data'
import { getIcon } from '../icons'

const skillScenarios = [
  {
    id: 'infra',
    label: 'Obra viária',
    title: 'Infraestrutura de ponta a ponta',
    description: 'Combina campo, projeto e controle para transformar dados de obra em decisão técnica.',
    focus: ['Pavimentação', 'Drenagem', 'Terraplenagem', 'Levantamento Topográfico', 'Controle de Qualidade'],
    outputs: ['dimensionamento', 'medições', 'memorial técnico'],
  },
  {
    id: 'bim',
    label: 'BIM e documentação',
    title: 'Modelo técnico bem documentado',
    description: 'Une modelagem, desenho e memoriais para entregar projetos legíveis e rastreáveis.',
    focus: ['BIM / Modelagem 3D', 'Documentação Técnica', 'Desenho Técnico', 'Memorial Descritivo', 'Medições & Orçamentos'],
    outputs: ['modelo coordenado', 'desenhos', 'quantitativos'],
  },
  {
    id: 'automation',
    label: 'Automação e dados',
    title: 'Fluxos digitais para engenharia',
    description: 'Aplica desenvolvimento web, APIs e automação para reduzir trabalho manual em rotinas técnicas.',
    focus: ['React / Next.js', 'Node.js', 'HTML, CSS, JavaScript', 'API Integration', 'LLMs & Automation'],
    outputs: ['dashboards', 'integrações', 'relatórios dinâmicos'],
  },
]

export default function Skills() {
  const [activeScenario, setActiveScenario] = useState(skillScenarios[0].id)
  const currentScenario = skillScenarios.find((scenario) => scenario.id === activeScenario) || skillScenarios[0]

  const skillIndex = useMemo(() => {
    return profile.skills
      .flatMap((cat) => cat.items.map((item) => ({ ...item, category: cat.category })))
      .reduce((acc, item) => {
        acc[item.name] = item
        return acc
      }, {})
  }, [])

  const matchedSkills = currentScenario.focus
    .map((name) => skillIndex[name])
    .filter(Boolean)

  const matchScore = matchedSkills.length
    ? Math.round(matchedSkills.reduce((sum, item) => sum + item.level, 0) / matchedSkills.length)
    : 0

  return (
    <>
      <div className="skill-showcase reveal" aria-label="Radar inteligente de habilidades">
        <div className="skill-showcase__intro">
          <span className="skill-showcase__kicker">
            <BrainCircuit size={16} />
            Radar de habilidades
          </span>
          <h3 className="skill-showcase__title">{currentScenario.title}</h3>
          <p className="skill-showcase__text">{currentScenario.description}</p>
          <div className="skill-showcase__tabs" role="list" aria-label="Cenários de habilidade">
            {skillScenarios.map((scenario) => (
              <button
                key={scenario.id}
                type="button"
                className={`skill-showcase__tab ${scenario.id === activeScenario ? 'skill-showcase__tab--active' : ''}`}
                aria-pressed={scenario.id === activeScenario}
                onClick={() => setActiveScenario(scenario.id)}
              >
                {scenario.label}
              </button>
            ))}
          </div>
        </div>

        <div className="skill-showcase__panel">
          <div className="skill-showcase__score" aria-label={`Aderência calculada: ${matchScore}%`}>
            <Gauge size={22} />
            <strong>{matchScore}%</strong>
            <span>aderência</span>
          </div>
          <div className="skill-showcase__matches">
            {matchedSkills.map((item) => (
              <div className="skill-showcase__match" key={item.name}>
                <div className="skill-showcase__match-label">
                  <span>{item.name}</span>
                  <strong>{item.level}%</strong>
                </div>
                <div className="skill-showcase__bar">
                  <span style={{ width: `${item.level}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="skill-showcase__outputs" aria-label="Entregáveis relacionados">
            <Sparkles size={16} />
            {currentScenario.outputs.map((output) => (
              <span key={output}>{output}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="skills-grid">
        {profile.skills.map((cat, i) => (
          <SkillCategory key={i} {...cat} />
        ))}
      </div>
    </>
  )
}

function SkillCategory({ category, icon, items }) {
  const Icon = getIcon(icon)

  return (
    <div className="skill-category stagger-child">
      <h3 className="skill-category__title stagger-child">
        <Icon size={18} /> {category}
      </h3>
      <div className="skill-list">
        {items.map((item, i) => (
          <SkillItem key={i} {...item} />
        ))}
      </div>
    </div>
  )
}

function SkillItem({ name, level }) {
  return (
    <div className="skill-item stagger-child">
      <span className="skill-item__label">{name}</span>
      <div className="skill-item__bar">
        <div className="skill-item__fill" style={{ width: `${level}%` }} />
      </div>
    </div>
  )
}
