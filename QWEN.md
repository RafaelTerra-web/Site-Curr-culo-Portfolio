# QWEN.md — Site Curriculo

## Stack
- **Framework**: Vite + React 19
- **Ícones**: lucide-react
- **PDF Export**: jsPDF (direto, sem html2pdf.js)
- **Fonte**: Inter (Google Fonts)
- **Build**: `npm run build` → `dist/`

## Estrutura de Arquivos
```
src/
├── main.jsx            # Entry — importa App.css
├── App.jsx             # Layout principal + scroll tracking + nav
├── App.css             # ~1200 linhas: BEM, dark mode, animações, responsive
├── data.js             # profile object (única fonte de dados)
├── pdf.js              # downloadPDF() → jsPDF (single-page A4)
└── components/
    ├── CursorGlow.jsx
    ├── ThemeToggle.jsx
    ├── Hero.jsx
    ├── About.jsx
    ├── Education.jsx
    ├── Experience.jsx
    ├── Skills.jsx
    ├── Tools.jsx
    ├── Projects.jsx
    └── Contact.jsx
```

## Regras de Arquitetura

### CSS (App.css)
- Metodologia **BEM** (`block__element--modifier`)
- **CSS Variables** com `:root` e `.dark` para theming
- Animações via **IntersectionObserver** (`.reveal`, `.stagger-child`)
- Responsive: breakpoints em `768px` e `480px`
- Respeita `prefers-reduced-motion`

### Dark Mode
- Classe `.dark` no `<html>` (gerenciada por `App.jsx`)
- Persistido em `localStorage` como `'theme'`
- `ThemeToggle` recebe `dark` + `onToggle` (callback para o parent)
- **Nunca** altera o DOM diretamente — o estado vive no parent

### Scroll Animations
- `.reveal` → fade-in + translateY (elementos individuais)
- `.stagger-child` → animação sequencial (filhos de containers)
- IntersectionObserver com `threshold: 0.1` e `rootMargin: '0px 0px -60px 0px'`

### Dados
- `data.js` exporta `profile` como named export
- Único ponto de edição — todo o site consome esse objeto
- Seções: education, experience, skills, tools, projects, highlights

## PDF Export — Lições Aprendidas

### ❌ O que NÃO funciona
1. **`html2pdf.js` com container escondido** — `html2canvas` não renderiza elementos com `visibility:hidden`, `opacity:0`, `display:none` ou `top:-9999px`. Resultado: PDF em branco.
2. **`window.print()` com nova janela** — funciona mas abre popup indesejado e quebra de página imprevisível (transborda para página 2).

### ✅ O que funciona
- **jsPDF puro** — gera o PDF manipulando texto diretamente, sem HTML/canvas
- Download silencioso e direto (sem popup, sem diálogo)
- Layout single-page A4 com fontes 7-10pt, barras coloridas nos headings
- ~30KB de bundle vs ~400KB do html2pdf.js

### Regras do PDF
- Uma única página A4, sem transbordar
- Fontes entre 7-10pt (títulos: 9-24pt, corpo: 7-8.5pt)
- Colunas: Formação (38%) | Experiência (58%)
- Barra azul nos headings das seções
- `jsPDF.splitTextToSize()` para wrap de texto

## Componentes

### ThemeToggle.jsx
- Recebe `dark` (boolean) + `onToggle` (function)
- **Nunca** gerencia estado interno — delega ao parent
- `mounted` state apenas para evitar flash de conteúdo

### CursorGlow.jsx
- Segue o mouse com gradiente radial
- Desativado em touch via `matchMedia('pointer: coarse')`

### Hero.jsx
- Typing effect no subtitle (simula digitação)
- Parallax no background (gradientes animados)

## Build & Deploy
- `npm run dev` → dev server (Vite)
- `npm run build` → production em `dist/`
- Bundle final: ~223KB (gzipped: ~69KB)
- Sem server-side — deploy estático (Vercel, Netlify, GitHub Pages)
