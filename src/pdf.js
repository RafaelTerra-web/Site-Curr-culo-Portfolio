/* ============================================
   PDF Export — jsPDF (full A4, recruiter-optimized)
   ============================================
   Layout: single-page A4, fonts 9-14pt, generous spacing
   Fills the full page vertically and horizontally.
   ============================================ */

import { jsPDF } from 'jspdf'

export function createResumePdf(profile) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  const W = 210, H = 297
  const M = 16 // margin
  const CW = W - M * 2 // content width = 178mm
  let y = M // start at 16mm

  // Colours
  const DARK    = [11, 15, 25]
  const ACCENT  = [30, 58, 95]
  const BODY    = [55, 65, 81]
  const MUTE    = [107, 114, 128]
  const WHITE   = [255, 255, 255]
  const linkedinUrl = profile.linkedin || ''
  const linkedinLabel = linkedinUrl
    ? linkedinUrl.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')
    : ''

  // ---- helpers ----
  function sectionBar(text) {
    doc.setFillColor(...ACCENT)
    doc.rect(M - 3, y - 3, CW + 6, 5.5, 'F')
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    doc.setTextColor(...WHITE)
    doc.text(text.toUpperCase(), M - 1, y + 0.8)
    y += 7
  }

  function addWrappedText(text, x, width, options = {}) {
    const {
      size = 8.5,
      color = BODY,
      style = 'normal',
      leading = 3.2,
      maxLines,
    } = options

    doc.setFont('helvetica', style)
    doc.setFontSize(size)
    doc.setTextColor(...color)
    const lines = doc.splitTextToSize(text, width)
    const visibleLines = maxLines ? lines.slice(0, maxLines) : lines
    visibleLines.forEach((line) => {
      doc.text(line, x, y)
      y += leading
    })
    return visibleLines.length
  }

  function addBullet(text, x, width, options = {}) {
    const oldY = y
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(options.size || 8.3)
    doc.setTextColor(...(options.color || BODY))
    doc.text('•', x, y)
    const lines = doc.splitTextToSize(text, width - 4)
    lines.forEach((line, index) => {
      doc.text(line, x + 4, index === 0 ? oldY : y)
      if (index < lines.length - 1) y += options.leading || 3.15
    })
    y += (options.leading || 3.15) + 1.1
  }

  // =======================
  //  HEADER
  // =======================
  y += 6
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(26)
  doc.setTextColor(...DARK)
  doc.text(profile.name, W / 2, y, { align: 'center' })
  y += 10

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(12)
  doc.setTextColor(...ACCENT)
  doc.text(profile.role, W / 2, y, { align: 'center' })
  y += 5

  // contact line
  doc.setFontSize(9)
  doc.setTextColor(...MUTE)
  const contactParts = []
  if (profile.phone) contactParts.push(profile.phone)
  if (linkedinLabel) contactParts.push(linkedinLabel)
  const contactLine = contactParts.join('    •    ')
  doc.text(contactLine, W / 2, y, { align: 'center' })
  if (linkedinUrl && linkedinLabel) {
    const linkX = W / 2 + doc.getTextWidth(contactLine) / 2 - doc.getTextWidth(linkedinLabel)
    doc.link(linkX, y - 3.2, doc.getTextWidth(linkedinLabel), 4, { url: linkedinUrl })
  }
  y += 5

  // thick divider
  doc.setDrawColor(...ACCENT)
  doc.setLineWidth(1.5)
  doc.line(M, y, M + CW, y)
  y += 6

  // =======================
  //  RESUMO
  // =======================
  sectionBar('Resumo Profissional')
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9.5)
  doc.setTextColor(...BODY)
  const summaryLines = doc.splitTextToSize(profile.summary, CW)
  summaryLines.forEach((l) => { doc.text(l, M, y); y += 4.2 })
  y += 6

  // =======================
  //  FORMAÇÃO
  // =======================
  sectionBar('Formação')
  const eduColGap = 7
  const eduColW = (CW - eduColGap) / 2
  const eduY = y
  profile.education.forEach((e, index) => {
    const x = M + index * (eduColW + eduColGap)
    const startY = eduY
    y = startY

    addWrappedText(e.title, x, eduColW, { size: 9.2, color: DARK, style: 'bold', leading: 3.4 })
    addWrappedText(e.institution, x, eduColW, { size: 8, color: MUTE, leading: 3 })
    addWrappedText(e.description, x, eduColW, { size: 8, color: BODY, leading: 3, maxLines: 3 })

    if (e.tags && e.tags.length) {
      addWrappedText(`[${e.tags.join(' • ')}]`, x, eduColW, { size: 7.8, color: MUTE, style: 'italic', leading: 3, maxLines: 1 })
    }
  })
  y = eduY + 27

  // =======================
  //  EXPERIÊNCIA
  // =======================
  sectionBar('Experiência Profissional')
  profile.experience.forEach((exp) => {
    addWrappedText(exp.title, M, CW, { size: 9.6, color: DARK, style: 'bold', leading: 3.6 })
    addWrappedText(exp.company, M, CW, { size: 8.2, color: MUTE, leading: 3 })
    addWrappedText(exp.description, M, CW, { size: 8.4, color: BODY, leading: 3.1, maxLines: 2 })
    y += 1

    const bulletGap = 7
    const bulletW = (CW - bulletGap) / 2
    const leftBullets = exp.responsibilities.slice(0, 3)
    const rightBullets = exp.responsibilities.slice(3, 6)
    const bulletStartY = y
    let yLeft = bulletStartY
    let yRight = bulletStartY

    leftBullets.forEach((item) => {
      y = yLeft
      addBullet(item, M, bulletW, { size: 8, leading: 2.9 })
      yLeft = y
    })
    rightBullets.forEach((item) => {
      y = yRight
      addBullet(item, M + bulletW + bulletGap, bulletW, { size: 8, leading: 2.9 })
      yRight = y
    })
    y = Math.max(yLeft, yRight) + 3
  })

  // =======================
  //  HABILIDADES
  // =======================
  sectionBar('Habilidades')
  doc.setFontSize(9)

  profile.skills.forEach((cat) => {
    const label = cat.category.toUpperCase()
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9)
    doc.setTextColor(...DARK)
    const labelW = doc.getTextWidth(label + ' ')
    doc.text(label, M, y)

    doc.setFont('helvetica', 'normal')
    doc.setTextColor(...BODY)
    const items = cat.items.map((i) => i.name).join('   •   ')
    const remainW = CW - labelW - 2
    if (remainW > 30) {
      const iLines = doc.splitTextToSize(items, remainW)
      doc.text(iLines[0] || '', M + labelW + 1, y)
      y += 3.8
      for (let i = 1; i < iLines.length; i++) {
        doc.text(iLines[i], M, y)
        y += 3.5
      }
    } else {
      doc.text(items, M + labelW + 1, y)
      y += 3.8
    }
  })
  y += 4

  // =======================
  //  FERRAMENTAS
  // =======================
  sectionBar('Ferramentas')
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(...BODY)
  const allTools = profile.tools.map((t) => t.name).join('   •   ')
  const toolLines = doc.splitTextToSize(allTools, CW)
  toolLines.forEach((l) => { doc.text(l, M, y); y += 3.8 })
  y += 5

  // =======================
  //  PROJETOS
  // =======================
  sectionBar('Projetos')

  profile.projects.forEach((p, idx) => {
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9)
    doc.setTextColor(...DARK)
    const tLines = doc.splitTextToSize(p.title, CW - 2)
    tLines.forEach((l) => { doc.text(l, M, y); y += 3.2 })

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.setTextColor(...BODY)
    const projectText = p.impact || p.description
    const dLines = doc.splitTextToSize(projectText, CW - 2)
    dLines.slice(0, 2).forEach((l) => { doc.text(l, M + 1, y); y += 3 })

    doc.setFont('helvetica', 'italic')
    doc.setFontSize(7.6)
    doc.setTextColor(...MUTE)
    const projectMeta = [p.metric, p.role, p.tags.join(' • ')].filter(Boolean).join(' | ')
    doc.text(`[${projectMeta}]`, M + 1, y)
    y += 4.4

    if (idx < profile.projects.length - 1) {
      // thin separator between projects
      doc.setDrawColor(...MUTE)
      doc.setLineWidth(0.3)
      doc.line(M + 5, y - 2, M + CW - 5, y - 2)
      y += 2.5
    }
  })

  return doc
}

export function downloadPDF(profile) {
  const doc = createResumePdf(profile)
  doc.save(`curriculo-${profile.name.toLowerCase().replace(/\s+/g, '-')}.pdf`)
}
