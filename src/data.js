/* ============================================
   Profile Data — Single source of truth
   Edit this object to update the entire site.
   ============================================ */

export const profile = {
  name: 'Rafael Terra',
  role: 'Técnico em Estradas & Desenvolvedor',
  summary:
    'Profissional da área de infraestrutura viária com formação técnica em Estradas pelo Cefet/RJ e graduação em Engenharia Civil em andamento pela UERJ. Combino conhecimento prático de engenharia civil com habilidades modernas em desenvolvimento web, automação e integração de sistemas. Busco aplicações onde a precisão técnica da engenharia se encontra com a inovação tecnológica.',

  linkedin: 'https://www.linkedin.com/in/rafael-terra-343a68376/',
  phone: '+5521993616495',

  stats: [
    { value: '4', label: 'frentes de projeto', detail: 'infraestrutura, BIM, web e automação' },
    { value: '8+', label: 'ferramentas técnicas', detail: 'campo, projeto e desenvolvimento' },
    { value: '80%', label: 'ganho em rotina digital', detail: 'referência em pipeline ETL' },
  ],

  education: [
    {
      title: 'Bacharelado em Engenharia Civil',
      institution: 'UERJ — Universidade do Estado do Rio de Janeiro',
      description:
        'Curso de graduação em andamento. Foco em infraestrutura, materiais de construção e técnicas projetuais.',
      tags: ['Desde 2026'],
      inProgress: true,
    },
    {
      title: 'Técnico em Estradas',
      institution: 'Cefet/RJ — Centro Federal de Educação Tecnológica Celso Suckow da Fonseca',
      description:
        'Formação técnica com ênfase em infraestrutura viária, abrangendo projetos de pavimentação, drenagem, terraplenagem, levantamento topográfico e gestão de obras de engenharia civil.',
      tags: ['Pavimentação', 'Drenagem', 'Terraplenagem', 'Topografia', 'Geotecnia', 'Gestão de Obras'],
    },
  ],

  experience: [
    {
      title: 'Técnico em Estradas & Analista de Projetos',
      company: 'Atuação Profissional em Projetos de Infraestrutura',
      description:
        'Atuação em projetos de infraestrutura e instalações, combinando leitura técnica, concepção de soluções e análise crítica de documentação para elevar a qualidade das entregas ao cliente.',
      responsibilities: [
        'Participação na concepção de projetos de iluminação para a Alameda, contribuindo com soluções técnicas, organização de escopo e refinamento visual da proposta',
        'Participação em projetos de telecomunicação no Condomínio Acqua, apoiando a estruturação técnica e a compatibilização das entregas',
        'Apoio em outros projetos envolvendo concepção, criatividade aplicada e desenvolvimento de alternativas para atender requisitos técnicos e operacionais',
        'Atuação como analista na revisão de documentos, desenhos e informações de projeto antes da emissão ao cliente',
        'Verificação de consistência, padronização e qualidade técnica dos materiais emitidos',
        'Interface entre demandas técnicas, documentação e controle de qualidade para reduzir retrabalho e fortalecer a confiabilidade das entregas',
      ],
    },
  ],

  skills: [
    {
      category: 'Engenharia & Construção',
      icon: 'HardHat',
      items: [
        { name: 'Pavimentação', level: 90 },
        { name: 'Drenagem', level: 85 },
        { name: 'Terraplenagem', level: 88 },
        { name: 'Levantamento Topográfico', level: 85 },
        { name: 'Controle de Qualidade', level: 80 },
      ],
    },
    {
      category: 'Projetos & Documentação',
      icon: 'FileText',
      items: [
        { name: 'BIM / Modelagem 3D', level: 75 },
        { name: 'Documentação Técnica', level: 90 },
        { name: 'Desenho Técnico', level: 85 },
        { name: 'Memorial Descritivo', level: 88 },
        { name: 'Medições & Orçamentos', level: 80 },
      ],
    },
    {
      category: 'Web Development & Data',
      icon: 'Code2',
      items: [
        { name: 'React / Next.js', level: 85 },
        { name: 'Node.js', level: 80 },
        { name: 'HTML, CSS, JavaScript', level: 90 },
        { name: 'API Integration', level: 85 },
        { name: 'LLMs & Automation', level: 90 },
        { name: 'Vercel / Deployment', level: 80 },
      ],
    },
    {
      category: 'Habilidades Interpessoais',
      icon: 'Users',
      items: [
        { name: 'Trabalho em Equipe', level: 92 },
        { name: 'Comunicação Técnica', level: 88 },
        { name: 'Resolução de Problemas', level: 85 },
        { name: 'Gestão de Tempo', level: 87 },
        { name: 'Liderança', level: 78 },
      ],
    },
  ],

  tools: [
    { name: 'AutoCAD', desc: 'Desenho técnico 2D/3D', icon: 'Ruler' },
    { name: 'Revit / BIM', desc: 'Modelagem e coordenação BIM', icon: 'Building2' },
    { name: 'Civil 3D', desc: 'Projetos de infraestrutura', icon: 'BarChart3' },
    { name: 'QGIS / Topograph', desc: 'Levantamento e SIG', icon: 'Map' },
    { name: 'VS Code', desc: 'Desenvolvimento web', icon: 'Terminal' },
    { name: 'Git / GitHub', desc: 'Controle de versão', icon: 'GitBranch' },
    { name: 'MS Project', desc: 'Planejamento e cronograma', icon: 'Calendar' },
    { name: 'Estação Total / Nível', desc: 'Equipamentos de campo', icon: 'Camera' },
  ],

  projects: [
    {
      title: 'Projeto de Pavimentação Asfáltica',
      category: 'Engenharia',
      role: 'Projeto técnico e documentação',
      impact: 'Base completa para dimensionamento, especificação e memorial de cálculo.',
      metric: 'Projeto completo',
      description:
        'Desenvolvimento de projeto técnico completo para pavimentação asfáltica, incluindo dimensionamento de camadas, especificação de materiais e memorial de cálculo estrutural.',
      tags: ['Asfalto', 'Dimensionamento', 'Memorial'],
      icon: 'Home',
    },
    {
      title: 'Sistema de Drenagem Viária',
      category: 'Engenharia',
      role: 'Dimensionamento hidráulico',
      impact: 'Organiza o escoamento superficial e subterrâneo com aderência a normas técnicas.',
      metric: 'Conformidade técnica',
      description:
        'Projeto de sistema de drenagem superficial e subterrânea para via urbana, com dimensionamento de bueiros, sarjetas e redes de escoamento, em conformidade com normas técnicas vigentes.',
      tags: ['Drenagem', 'Hidráulica', 'Normas'],
      icon: 'Droplets',
    },
    {
      title: 'Plataforma Financeira — Web App',
      category: 'Web & Dados',
      role: 'Frontend, API e modelagem de dados',
      impact: 'Transforma dados financeiros em leitura visual com filtros, categorias e relatórios.',
      metric: 'Dashboard interativo',
      description:
        'Desenvolvimento de uma aplicação web para controle financeiro pessoal, com dashboard interativo, categorização automática de transações e relatórios em gráficos dinâmicos. Stack: React, Node.js, SQLite.',
      tags: ['React', 'Node.js', 'SQLite'],
      icon: 'Wallet',
    },
    {
      title: 'Automação de Fluxo de Trabalho — ETL Pipeline',
      category: 'Automação',
      role: 'Pipeline, integração e processamento',
      impact: 'Reduz etapas manuais ao conectar coleta, transformação e carga de dados internos.',
      metric: '80% menos manual',
      description:
        'Criação de pipeline ETL para automação de coleta, transformação e carregamento de dados entre sistemas internos, reduzindo o tempo de processamento manual em 80%. Stack: Python, FastAPI, PostgreSQL.',
      tags: ['Python', 'FastAPI', 'PostgreSQL'],
      icon: 'Workflow',
    },
  ],

  highlights: [
    { title: 'Infraestrutura Viária', text: 'Pavimentação, drenagem e projetos de terraplenagem', icon: 'Road' },
    { title: 'BIM & Digital', text: 'Modelagem 3D e fluxos de trabalho digitais', icon: 'Monitor' },
    { title: 'Dev & Automação', text: 'Desenvolvimento web, APIs e fluxos automatizados', icon: 'Code2' },
  ],
};
