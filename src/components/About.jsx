import { profile } from '../data'
import { getIcon } from '../icons'

export default function About() {
  return (
    <>
      <div className="about__text stagger-child">
        Sou <strong>{profile.name}</strong>, {profile.role} formado pelo{' '}
        <strong>Cefet/RJ</strong> — Centro Federal de Educação Tecnológica Celso Suckow da Fonseca.
        Minha trajetória profissional está voltada para a <strong>engenharia civil</strong> e{' '}
        <strong>infraestrutura viária</strong>, com foco em projetos de pavimentação, drenagem,{' '}
        levantamento topográfico e documentação técnica.
      </div>
      <div className="about__text stagger-child">
        Tenho interesse em tecnologias modernas de construção, incluindo <strong>BIM</strong>{' '}
        (Building Information Modeling), fluxos de trabalho digitais e soluções inovadoras{' '}
        para infraestrutura. Acredito que a precisão técnica aliada ao domínio de ferramentas{' '}
        contemporâneas é essencial para a evolução do setor de engenharia.
      </div>
      <div className="about__text stagger-child">
        Meu objetivo é contribuir com projetos de infraestrutura que unam{' '}
        <strong>qualidade técnica</strong>, <strong>eficiência operacional</strong> e{' '}
        <strong>responsabilidade ambiental</strong>.
      </div>

      {profile.highlights && profile.highlights.length > 0 && (
        <div className="about__highlights">
          {profile.highlights.map((h, i) => (
            <HighlightCard key={i} {...h} />
          ))}
        </div>
      )}
    </>
  )
}

function HighlightCard({ title, text, icon }) {
  const Icon = getIcon(icon)

  return (
    <div className="highlight-card stagger-child">
      <div className="highlight-card__icon stagger-child">
        <Icon size={22} />
      </div>
      <h3 className="highlight-card__title stagger-child">{title}</h3>
      <p className="highlight-card__text stagger-child">{text}</p>
    </div>
  )
}
