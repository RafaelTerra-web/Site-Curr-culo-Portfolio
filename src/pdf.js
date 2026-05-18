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
  //  FORMAÇÃO + EXPERIÊNCIA (side by side)
  // =======================
  sectionBar('Formação & Experiência')

  const split = M + CW * 0.42 // left col ~42%
  const leftW = split - M
  const rightW = W - split - M + 2
  let yL = y, yR = y

  // --- Left: Education ---
  profile.education.forEach((e) => {
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9.5)
    doc.setTextColor(...DARK)
    const tLines = doc.splitTextToSize(e.title, leftW - 2)
    tLines.forEach((l) => { doc.text(l, M + 1, yL); yL += 3.5 })

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8.5)
    doc.setTextColor(...MUTE)
    const iLines = doc.splitTextToSize(e.institution, leftW - 2)
    iLines.forEach((l) => { doc.text(l, M + 1, yL); yL += 3.2 })

    doc.setFontSize(8.5)
    doc.setTextColor(...BODY)
    const dLines = doc.splitTextToSize(e.description, leftW - 2)
    dLines.forEach((l) => { doc.text(l, M + 1, yL); yL += 3.2 })

    // tags
    if (e.tags && e.tags.length) {
      doc.setFont('helvetica', 'italic')
      doc.setFontSize(8)
      doc.setTextColor(...MUTE)
      doc.text(`[${e.tags.join(' • ')}]`, M + 1, yL)
      yL += 5
    } else {
      yL += 4
    }
  })

  // --- Right: Experience ---
  profile.experience.forEach((exp) => {
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9.5)
    doc.setTextColor(...DARK)
    const tLines = doc.splitTextToSize(exp.title, rightW - 2)
    tLines.forEach((l) => { doc.text(l, split + 2, yR); yR += 3.5 })

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8.5)
    doc.setTextColor(...MUTE)
    const cLines = doc.splitTextToSize(exp.company, rightW - 2)
    cLines.forEach((l) => { doc.text(l, split + 2, yR); yR += 3.2 })

    // description
    if (exp.description) {
      doc.setFontSize(8.5)
      doc.setTextColor(...BODY)
      const descLines = doc.splitTextToSize(exp.description, rightW - 4)
      descLines.forEach((l) => { doc.text(l, split + 2, yR); yR += 3.2 })
      yR += 1.5
    }

    doc.setFontSize(8.5)
    doc.setTextColor(...BODY)
    exp.responsibilities.slice(0, 6).forEach((r) => {
      const bLines = doc.splitTextToSize(`• ${r}`, rightW - 4)
      bLines.forEach((l) => { doc.text(l, split + 2, yR); yR += 3.2 })
    })
    yR += 4
  })

  y = Math.max(yL, yR) + 5

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
    doc.setFontSize(9.5)
    doc.setTextColor(...DARK)
    const tLines = doc.splitTextToSize(p.title, CW - 2)
    tLines.forEach((l) => { doc.text(l, M, y); y += 3.5 })

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8.5)
    doc.setTextColor(...BODY)
    const dLines = doc.splitTextToSize(p.description, CW - 2)
    dLines.forEach((l) => { doc.text(l, M + 1, y); y += 3.2 })

    doc.setFont('helvetica', 'italic')
    doc.setFontSize(8)
    doc.setTextColor(...MUTE)
    doc.text(`[${p.tags.join(' • ')}]`, M + 1, y)
    y += 5

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
