/* ============================================
   Rafael Terra — Résumé Website
   JavaScript: Render, Animations, PDF Export
   ============================================ */

(function () {
  'use strict';

  /* ---- SVG Icon Map ---- */
  var icons = {
    home: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
    monitor: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
    wrench: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>',
    code: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    users: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>',
    building: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="9" y1="6" x2="9" y2="6.01"/><line x1="15" y1="6" x2="15" y2="6.01"/><line x1="9" y1="10" x2="9" y2="10.01"/><line x1="15" y1="10" x2="15" y2="10.01"/><line x1="9" y1="14" x2="9" y2="14.01"/><line x1="15" y1="14" x2="15" y2="14.01"/><path d="M9 18h6"/></svg>',
    chart: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg>',
    map: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>',
    clipboard: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>',
    calculator: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/><line x1="8" y1="18" x2="16" y2="18"/></svg>',
    camera: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>',
    ruler: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21.8 13.7C21.3 14.6 20.5 15.2 19.6 15.2c-1.1 0-2-.9-2-2s.9-2 2-2c.6 0 1.1.2 1.5.6"/><path d="M17.8 9.7c-.4.8-1.2 1.3-2.1 1.3-1.1 0-2-.9-2-2s.9-2 2-2c.7 0 1.3.3 1.7.8"/><path d="M14.8 5.7c-.3.5-.8.8-1.5.8-1.1 0-2-.9-2-2s.9-2 2-2c.5 0 1 .2 1.3.5"/><path d="M3 15V9"/><path d="M7 15V6"/><path d="M11 15V3"/><path d="M15 15v-4"/><path d="M19 15v-2"/><path d="M3 19h18"/></svg>',
    shield: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    grid: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>',
    graduation: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5"/></svg>',
    briefcase: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>',
    linkedin: '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>'
  };

  function getIcon(name) {
    return icons[name] || '';
  }

  /* ============================================
     Render Functions
     ============================================ */

  function renderHero() {
    var nameEl = document.getElementById('heroName');
    var roleEl = document.getElementById('heroRole');
    var summaryEl = document.getElementById('heroSummary');
    var linkedinBtn = document.getElementById('heroLinkedin');

    if (nameEl) nameEl.textContent = profile.name;
    if (roleEl) roleEl.textContent = profile.role;
    if (summaryEl) summaryEl.textContent = profile.summary;
    if (linkedinBtn) linkedinBtn.href = profile.linkedin;
  }

  function renderAbout() {
    var container = document.getElementById('aboutContent');
    if (!container) return;

    var html = '<div class="about__text stagger-child">' +
      'Sou <strong>' + profile.name + '</strong>, ' + profile.role + ' formado pelo <strong>Cefet/RJ</strong> — ' +
      'Centro Federal de Educação Tecnológica Celso Suckow da Fonseca. ' +
      'Minha trajetória profissional está voltada para a <strong>engenharia civil</strong> e ' +
      '<strong>infraestrutura viária</strong>, com foco em projetos de pavimentação, drenagem, ' +
      'levantamento topográfico e documentação técnica.' +
      '</div>' +
      '<div class="about__text stagger-child">' +
      'Tenho interesse em tecnologias modernas de construção, incluindo <strong>BIM</strong> ' +
      '(Building Information Modeling), fluxos de trabalho digitais e soluções inovadoras ' +
      'para infraestrutura. Acredito que a precisão técnica aliada ao domínio de ferramentas ' +
      'contemporâneas é essencial para a evolução do setor de engenharia.' +
      '</div>' +
      '<div class="about__text stagger-child">' +
      'Meu objetivo é contribuir com projetos de infraestrutura que unam ' +
      '<strong>qualidade técnica</strong>, <strong>eficiência operacional</strong> e ' +
      '<strong>responsabilidade ambiental</strong>.' +
      '</div>';

    if (profile.highlights && profile.highlights.length) {
      html += '<div class="about__highlights">';
      for (var i = 0; i < profile.highlights.length; i++) {
        var h = profile.highlights[i];
        html += '<div class="highlight-card stagger-child">' +
          '<div class="highlight-card__icon">' + getIcon(h.icon) + '</div>' +
          '<h3 class="highlight-card__title">' + h.title + '</h3>' +
          '<p class="highlight-card__text">' + h.text + '</p>' +
          '</div>';
      }
      html += '</div>';
    }

    container.innerHTML = html;
  }

  function renderEducation() {
    var container = document.getElementById('educationContent');
    if (!container) return;

    var html = '';
    for (var i = 0; i < profile.education.length; i++) {
      var edu = profile.education[i];
      html += '<div class="timeline__item stagger-child">' +
        '<div class="timeline__marker"></div>' +
        '<div class="timeline__content">' +
        '<div class="card">' +
        '<div class="card__header">' +
        '<div class="card__icon">' + icons.graduation + '</div>' +
        '<div>' +
        '<h3 class="card__title">' + edu.title + '</h3>' +
        '<p class="card__institution">' + edu.institution + '</p>' +
        '</div>' +
        '</div>' +
        '<div class="card__body">' +
        '<p class="card__description">' + edu.description + '</p>' +
        '<ul class="card__tags">';
      for (var j = 0; j < edu.tags.length; j++) {
        html += '<li class="tag">' + edu.tags[j] + '</li>';
      }
      if (edu.inProgress) {
        html += '</ul><span class="tag tag--badge tag--active">Em andamento</span>';
      } else {
        html += '</ul>';
      }
      html += '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
    }
    container.innerHTML = html;
  }

  function renderExperience() {
    var container = document.getElementById('experienceContent');
    if (!container) return;

    var html = '';
    for (var i = 0; i < profile.experience.length; i++) {
      var exp = profile.experience[i];
      html += '<div class="timeline__item stagger-child">' +
        '<div class="timeline__marker"></div>' +
        '<div class="timeline__content">' +
        '<div class="card">' +
        '<div class="card__header">' +
        '<div class="card__icon">' + icons.briefcase + '</div>' +
        '<div>' +
        '<h3 class="card__title">' + exp.title + '</h3>' +
        '<p class="card__institution">' + exp.company + '</p>' +
        '</div>' +
        '</div>' +
        '<div class="card__body">' +
        '<p class="card__description">' + exp.description + '</p>' +
        '<ul class="card__responsibilities">';
      for (var j = 0; j < exp.responsibilities.length; j++) {
        html += '<li>' + exp.responsibilities[j] + '</li>';
      }
      html += '</ul>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
    }
    container.innerHTML = html;
  }

  function renderSkills() {
    var container = document.getElementById('skillsContent');
    if (!container) return;

    var html = '';
    for (var i = 0; i < profile.skills.length; i++) {
      var cat = profile.skills[i];
      html += '<div class="skill-category stagger-child">' +
        '<h3 class="skill-category__title">' + getIcon(cat.icon) + ' ' + cat.category + '</h3>' +
        '<div class="skill-list">';
      for (var j = 0; j < cat.items.length; j++) {
        var item = cat.items[j];
        html += '<div class="skill-item">' +
          '<span class="skill-item__label">' + item.name + '</span>' +
          '<div class="skill-item__bar"><div class="skill-item__fill" data-width="' + item.level + '%"></div></div>' +
          '</div>';
      }
      html += '</div></div>';
    }
    container.innerHTML = html;
  }

  function renderTools() {
    var container = document.getElementById('toolsContent');
    if (!container) return;

    var html = '';
    for (var i = 0; i < profile.tools.length; i++) {
      var tool = profile.tools[i];
      html += '<div class="tool-card stagger-child">' +
        '<div class="tool-card__icon">' + getIcon(tool.icon) + '</div>' +
        '<h3 class="tool-card__name">' + tool.name + '</h3>' +
        '<p class="tool-card__desc">' + tool.desc + '</p>' +
        '</div>';
    }
    container.innerHTML = html;
  }

  function renderProjects() {
    var container = document.getElementById('projectsContent');
    if (!container) return;

    var html = '';
    for (var i = 0; i < profile.projects.length; i++) {
      var p = profile.projects[i];
      html += '<article class="project-card stagger-child">' +
        '<div class="project-card__accent"></div>' +
        '<div class="project-card__icon">' + getIcon(p.icon) + '</div>' +
        '<h3 class="project-card__title">' + p.title + '</h3>' +
        '<p class="project-card__desc">' + p.description + '</p>' +
        '<ul class="project-card__tags">';
      for (var j = 0; j < p.tags.length; j++) {
        html += '<li class="tag tag--sm">' + p.tags[j] + '</li>';
      }
      html += '</ul></article>';
    }
    container.innerHTML = html;
  }

  function renderContact() {
    var container = document.getElementById('contactContent');
    if (!container) return;

    var whatsappUrl = profile.phone ? 'https://wa.me/' + profile.phone.replace(/\D/g, '') : '';
    var phoneDisplay = profile.phone ? '+55 21 99361-6495' : '';

    container.innerHTML =
      '<p class="contact__text stagger-child">' +
      'Estou aberto a novas oportunidades e parcerias na área de ' +
      'engenharia civil e infraestrutura. Não hesite em entrar em contato ' +
      'através do LinkedIn ou solicitar o currículo em PDF.' +
      '</p>' +
      '<div class="contact__actions stagger-child">' +
      '<a href="' + profile.linkedin + '" target="_blank" rel="noopener noreferrer" class="btn btn--primary">' +
      '<svg class="btn__icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>' +
      'LinkedIn' +
      '</a>' +
      (whatsappUrl ? '<a href="' + whatsappUrl + '" target="_blank" rel="noopener noreferrer" class="btn btn--outline">' +
      '<svg class="btn__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h4.16"/><polyline points="22 4 12 14.01 9 11.01"/></svg>' +
      'WhatsApp' +
      '</a>' : '') +
      '<button type="button" class="btn btn--outline" id="downloadPdfBottom">' +
      '<svg class="btn__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>' +
      'Baixar Currículo' +
      '</button>' +
      '</div>';
  }

  /* ============================================
     Print CV — Dedicated A4 Résumé (1 page)
     ============================================ */

  function buildPrintCV() {
    var d = profile;
    var h = '';

    // Header — compact, inline contact
    h += '<div class="print-cv__header">' +
      '<div class="print-cv__name">' + d.name + '</div>' +
      '<div class="print-cv__role">' + d.role + '</div>';
    if (d.phone) {
      h += '<div class="print-cv__contact"><a href="https://wa.me/' + d.phone.replace(/\D/g, '') + '">' + d.phone + '</a></div>';
    }
    h += '</div>';

    // Summary — single line
    h += '<div class="print-cv__section print-cv__section--compact">' +
      '<p class="print-cv__summary">' + d.summary + '</p>' +
      '</div>';

    // Formation + Experience side by side (2 columns)
    h += '<div class="print-cv__twocol">';

    // Left: Formation
    h += '<div class="print-cv__twocol-left">' +
      '<div class="print-cv__section print-cv__section--no-margin">' +
      '<div class="print-cv__section-title">Formação Acadêmica</div>';
    for (var i = 0; i < d.education.length; i++) {
      var edu = d.education[i];
      h += '<div class="print-cv__entry">' +
        '<div class="print-cv__entry-title">' + edu.title + '</div>' +
        '<div class="print-cv__entry-subtitle">' + edu.institution + '</div>' +
        '<ul class="print-cv__tags print-cv__tags--compact">';
      for (var j = 0; j < edu.tags.length; j++) {
        h += '<li>' + edu.tags[j] + '</li>';
      }
      h += '</ul></div>';
    }
    h += '</div></div>';

    // Right: Experience
    h += '<div class="print-cv__twocol-right">' +
      '<div class="print-cv__section print-cv__section--no-margin">' +
      '<div class="print-cv__section-title">Experiência Profissional</div>';
    for (var i = 0; i < d.experience.length; i++) {
      var exp = d.experience[i];
      h += '<div class="print-cv__entry">' +
        '<div class="print-cv__entry-header-compact">' +
        '<span class="print-cv__entry-title">' + exp.title + '</span>' +
        '<span class="print-cv__entry-subtitle">' + exp.company + '</span>' +
        '</div>' +
        '<ul class="print-cv__entry-list">';
      for (var j = 0; j < exp.responsibilities.length; j++) {
        h += '<li>' + exp.responsibilities[j] + '</li>';
      }
      h += '</ul></div>';
    }
    h += '</div></div>';
    h += '</div>'; // end twocol

    // Skills — compact 3-column inline
    h += '<div class="print-cv__section print-cv__section--compact">' +
      '<div class="print-cv__section-title">Habilidades</div>' +
      '<div class="print-cv__skills-compact">';
    for (var i = 0; i < d.skills.length; i++) {
      var cat = d.skills[i];
      h += '<div class="print-cv__skill-col"><strong>' + cat.category + ':</strong> ';
      var items = [];
      for (var j = 0; j < cat.items.length; j++) {
        items.push(cat.items[j].name);
      }
      h += items.join(' • ') + '</div>';
    }
    h += '</div></div>';

    // Tools — single line, compact
    h += '<div class="print-cv__section print-cv__section--compact print-cv__section--no-bottom">' +
      '<div class="print-cv__section-title">Ferramentas</div>' +
      '<div class="print-cv__tools-compact">';
    for (var i = 0; i < d.tools.length; i++) {
      var tool = d.tools[i];
      h += '<span class="print-cv__tool-chip">' + tool.name + '</span>';
    }
    h += '</div></div>';

    // Projects — compact, inline descriptions
    h += '<div class="print-cv__section print-cv__section--no-bottom">' +
      '<div class="print-cv__section-title">Projetos de Destaque</div>' +
      '<div class="print-cv__projects-compact">';
    for (var i = 0; i < d.projects.length; i++) {
      var p = d.projects[i];
      h += '<div class="print-cv__project-row">' +
        '<strong>' + p.title + ':</strong> ' + p.description;
      h += ' <em>(' + p.tags.join(', ') + ')</em>';
      h += '</div>';
    }
    h += '</div></div>';

    return h;
  }

  function downloadPDF() {
    var printContainer = document.getElementById('print-cv');
    if (!printContainer) return;

    // Build the print CV DOM
    printContainer.innerHTML = buildPrintCV();

    // Add printing class to body so CSS hides website and shows print CV
    document.body.classList.add('printing');

    // Small delay to let DOM render, then print
    setTimeout(function () {
      window.print();

      // Cleanup after print dialog closes
      setTimeout(function () {
        document.body.classList.remove('printing');
        printContainer.innerHTML = '';
      }, 500);
    }, 150);
  }

  /* ============================================
     Typing Effect — Hero Role
     ============================================ */

  function initTypingEffect() {
    var roleEl = document.getElementById('heroRole');
    if (!roleEl || !profile.role) return;

    var text = profile.role;
    var chars = text.split('');
    roleEl.textContent = '';
    roleEl.style.opacity = '1';
    roleEl.style.transform = 'none';

    var i = 0;
    var delay = 600; // initial delay

    function typeChar() {
      if (i < chars.length) {
        roleEl.textContent += chars[i];
        i++;
        setTimeout(typeChar, 40 + Math.random() * 30);
      }
    }

    setTimeout(typeChar, delay);
  }

  /* ============================================
     Cursor Glow — Follows mouse
     ============================================ */

  function initCursorGlow() {
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    var glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);

    var mouseX = 0, mouseY = 0;
    var glowX = 0, glowY = 0;
    var rafId = null;

    function animate() {
      glowX += (mouseX - glowX) * 0.12;
      glowY += (mouseY - glowY) * 0.12;
      glow.style.left = glowX + 'px';
      glow.style.top = glowY + 'px';
      rafId = requestAnimationFrame(animate);
    }

    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!rafId) {
        rafId = requestAnimationFrame(animate);
      }
    });

    document.addEventListener('mouseenter', function () {
      glow.classList.add('active');
    });

    document.addEventListener('mouseleave', function () {
      glow.classList.remove('active');
    });

    // Start animation loop
    if (!prefersReducedMotion) {
      rafId = requestAnimationFrame(animate);
    }
  }

  /* ============================================
     Parallax — Hero background on scroll
     ============================================ */

  function initParallax() {
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    var heroBg = document.getElementById('heroBg');
    var heroSection = document.getElementById('hero');

    if (!heroBg || !heroSection) return;

    var ticking = false;

    function updateParallax() {
      var scrolled = window.pageYOffset;
      var heroHeight = heroSection.offsetHeight;
      if (scrolled < heroHeight) {
        var offset = scrolled * 0.3;
        heroBg.style.transform = 'translateY(' + offset + 'px) scale(1.05)';
      }
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          updateParallax();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ============================================
     Scroll Animations — Enhanced
     ============================================ */

  function initScrollAnimations() {
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // Show everything immediately
      document.querySelectorAll('.reveal, .stagger-child').forEach(function (el) {
        el.classList.add('visible');
      });
      animateAllSkillBars();
      return;
    }

    // Reveal on scroll — enhanced with better threshold
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(function (el) {
      revealObserver.observe(el);
    });

    // Stagger children — enhanced with better delays and spring effect
    var staggerObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var children = entry.target.querySelectorAll('.stagger-child');
          children.forEach(function (child, index) {
            var delay = index * 100;
            setTimeout(function () {
              child.classList.add('visible');
            }, delay);
          });
          staggerObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });

    // Observe section containers
    document.querySelectorAll('.section').forEach(function (section) {
      staggerObserver.observe(section);
    });

    // Also observe about highlights grid
    var highlights = document.querySelector('.about__highlights');
    if (highlights) {
      staggerObserver.observe(highlights);
    }

    // Skill bars animation — enhanced with spring easing
    var skillObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var fills = entry.target.querySelectorAll('.skill-item__fill');
          fills.forEach(function (fill, index) {
            var targetWidth = fill.getAttribute('data-width');
            if (targetWidth) {
              // Start from 0 and animate to target
              fill.style.width = '0';
              setTimeout(function () {
                fill.style.width = targetWidth;
              }, 150 + index * 120);
            }
          });
          skillObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2, rootMargin: '0px 0px -20px 0px' });

    document.querySelectorAll('.skill-category').forEach(function (cat) {
      skillObserver.observe(cat);
    });
  }

  function animateAllSkillBars() {
    document.querySelectorAll('.skill-item__fill').forEach(function (fill) {
      var targetWidth = fill.getAttribute('data-width');
      if (targetWidth) fill.style.width = targetWidth;
    });
  }

  /* ============================================
     Navigation
     ============================================ */

  function initNavigation() {
    var header = document.getElementById('header');
    var navToggle = document.getElementById('navToggle');
    var navMenu = document.getElementById('navMenu');
    var backToTop = document.getElementById('backToTop');

    // Header scroll shadow
    var onScroll = function () {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      // Back to top visibility
      if (window.scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Back to top click
    if (backToTop) {
      backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Mobile toggle
    if (navToggle && navMenu) {
      navToggle.addEventListener('click', function () {
        var isOpen = navMenu.classList.contains('open');
        navMenu.classList.toggle('open');
        navToggle.classList.toggle('active');
        navToggle.setAttribute('aria-expanded', String(!isOpen));
      });

      // Close on link click
      navMenu.querySelectorAll('.nav__link').forEach(function (link) {
        link.addEventListener('click', function () {
          navMenu.classList.remove('open');
          navToggle.classList.remove('active');
          navToggle.setAttribute('aria-expanded', 'false');
        });
      });
    }

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');
        if (!targetId || targetId === '#') return;

        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          var headerHeight = header ? header.offsetHeight : 0;
          var top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      });
    });

    // Active nav link highlight
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav__link');

    function highlightNav() {
      var scrollPos = window.scrollY + 100;

      sections.forEach(function (section) {
        var top = section.offsetTop;
        var height = section.offsetHeight;
        var id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
          navLinks.forEach(function (link) {
            link.style.color = '';
            link.style.background = '';
            if (link.getAttribute('href') === '#' + id) {
              link.style.color = 'var(--accent)';
              link.style.background = 'var(--accent-subtle)';
            }
          });
        }
      });
    }

    window.addEventListener('scroll', highlightNav, { passive: true });
    highlightNav();
  }

  /* ============================================
     Init
     ============================================ */

  function init() {
    // Year
    var yearEl = document.getElementById('currentYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Render all content
    renderHero();
    renderAbout();
    renderEducation();
    renderExperience();
    renderSkills();
    renderTools();
    renderProjects();
    renderContact();

    // Navigation
    initNavigation();

    // PDF buttons
    var pdfBtn = document.getElementById('downloadPdf');
    var pdfBtnBottom = document.getElementById('downloadPdfBottom');
    if (pdfBtn) pdfBtn.addEventListener('click', downloadPDF);
    if (pdfBtnBottom) pdfBtnBottom.addEventListener('click', downloadPDF);

    // Enhanced animations
    requestAnimationFrame(function () {
      initScrollAnimations();
      initTypingEffect();
      initCursorGlow();
      initParallax();
    });
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
