/* ============================================================
   NAZIM RAHMAN — All Animations & Interactions
   Pure JS + CSS (no React, no framework)
   ============================================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initSplitChars();
  initSplitWords();
  initReveal();
  initCounters();
  initTrustParallax();
  initTestimonials();
  initBooking();
  initContactForm();
  initMobileNav();
  initNavSlider();
  initScrollProgress();
  initMagneticButtons();
  initSectionLines();
  initScrollStack();
  initNavActive();
  initInsightsCarousel();
});

/* ── HERO LOAD ANIMATION ──────────────────────────────── */
function initHeroLoad() {
  const eyebrow = document.querySelector('.hero-eyebrow');
  const sub     = document.querySelector('.hero-sub');
  const desc    = document.querySelector('.hero-desc');
  const actions = document.querySelector('.hero-actions');
  const stats   = document.querySelector('.hero-stats');
  const right   = document.querySelector('.hero-right');

  [eyebrow, sub, desc, actions, stats, right].forEach(el => {
    if (el) el.style.opacity = '0';
  });

  if (right) {
    right.style.transform = 'translateX(40px)';
    right.style.transition = 'opacity 1s ease, transform 1s cubic-bezier(0.22,1,0.36,1)';
  }
}

/* ── NAV SCROLL ───────────────────────────────────────── */
function initNav() {
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

/* ── SPLIT CHARS (Hero Title) ─────────────────────────── */
function initSplitChars() {
  document.querySelectorAll('[data-split-chars]').forEach(el => {
    const text = el.textContent.trim();
    const chars = [...text];
    let html = '';
    let delay = 0;

    chars.forEach((ch, i) => {
      if (ch === ' ' || ch === '\n') {
        html += `<span class="split-char is-space" style="transition-delay:${delay}ms"> </span>`;
      } else {
        html += `<span class="char-wrap"><span class="split-char" style="transition-delay:${delay}ms">${ch}</span></span>`;
        delay += 22;
      }
    });

    el.innerHTML = html;
    el.dataset.ready = 'true';

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.split-char').forEach(c => c.classList.add('visible'));
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    observer.observe(el);
  });
}

/* ── SPLIT WORDS (Section Titles) ────────────────────── */
function initSplitWords() {
  document.querySelectorAll('[data-split-words]').forEach(el => {
    const raw = el.innerHTML;
    const parts = raw.split(/(<br\s*\/?>)/gi);
    let html = '';
    let wordIdx = 0;

    parts.forEach(part => {
      if (/^<br/i.test(part)) {
        html += '<br>';
      } else {
        const words = part.split(/(\s+)/);
        words.forEach(word => {
          if (!word.trim()) {
            html += word;
          } else {
            const delay = wordIdx * 70;
            html += `<span class="word-wrap"><span class="split-word" style="transition-delay:${delay}ms">${word}</span></span>`;
            wordIdx++;
          }
        });
      }
    });

    el.innerHTML = html;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.split-word').forEach(w => w.classList.add('visible'));
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2, rootMargin: '-60px' });

    observer.observe(el);
  });
}

/* ── REVEAL ANIMATIONS ────────────────────────────────── */
function initReveal() {
  const els = document.querySelectorAll('[data-reveal]');

  els.forEach(el => {
    const delay = parseFloat(el.dataset.delay || 0);
    el.style.transitionDelay = delay + 's';
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '-40px' });

  els.forEach(el => observer.observe(el));

}

/* ── COUNTER ANIMATION ────────────────────────────────── */
function initCounters() {
  const counters = document.querySelectorAll('.stat-count');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const duration = 1800;
        const step = target / (duration / 16);
        let current = 0;

        const update = () => {
          current += step;
          if (current >= target) {
            el.textContent = target;
          } else {
            el.textContent = Math.floor(current);
            requestAnimationFrame(update);
          }
        };
        requestAnimationFrame(update);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

/* ── TRUST PARALLAX SCROLL ────────────────────────────── */
function initTrustParallax() {
  const wrap    = document.querySelector('.trust-wrap');
  const img     = document.getElementById('trustImg');
  const bar     = document.getElementById('trustBar');
  const heading = document.querySelector('.trust-heading');

  if (!wrap) return;

  let headingAnimated = false;

  const onScroll = () => {
    const rect   = wrap.getBoundingClientRect();
    const wrapH  = wrap.offsetHeight;
    const viewH  = window.innerHeight;
    const total  = wrapH - viewH;
    const scrolled = Math.max(0, -rect.top);
    const progress = Math.min(1, scrolled / total);

    if (img) {
      const scale = 1.15 - progress * 0.12;
      img.style.transform = `scale(${scale})`;
    }

    if (bar) {
      bar.style.width = (progress * 100) + '%';
    }

    if (heading && !headingAnimated && progress > 0.1) {
      heading.querySelectorAll('.split-word').forEach(w => w.classList.add('visible'));
      headingAnimated = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ── TESTIMONIALS ─────────────────────────────────────── */
function initTestimonials() {
  const slides  = document.querySelectorAll('.testi-slide');
  const imgs    = document.querySelectorAll('.testi-img');
  const dots    = document.querySelectorAll('.t-dot');
  const prevBtn = document.getElementById('tPrev');
  const nextBtn = document.getElementById('tNext');

  if (!slides.length) return;

  let current   = 0;
  const total   = slides.length;
  let autoTimer = null;

  function getPos(idx, active) {
    const diff = (idx - active + total) % total;
    if (diff === 0) return 'active';
    if (diff === 1) return 'pos-right-1';
    if (diff === 2) return 'pos-right-2';
    if (diff === total - 1) return 'pos-left-1';
    return 'pos-left-2';
  }

  function goTo(idx) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (idx + total) % total;
    slides[current].classList.add('active');
    dots[current].classList.add('active');

    imgs.forEach((img, i) => {
      img.className = 'testi-img';
      img.classList.add(getPos(i, current));
    });
  }

  function startAuto() {
    autoTimer = setInterval(() => goTo(current + 1), 5000);
  }
  function stopAuto() {
    clearInterval(autoTimer);
  }

  if (prevBtn) prevBtn.addEventListener('click', () => { stopAuto(); goTo(current - 1); startAuto(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { stopAuto(); goTo(current + 1); startAuto(); });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      stopAuto();
      goTo(parseInt(dot.dataset.idx));
      startAuto();
    });
  });

  goTo(0);
  startAuto();
}

/* ── BOOKING SYSTEM ───────────────────────────────────── */
function initBooking() {
  const state = {
    type:  'Initial Consultation',
    dur:   '30 min',
    date:  null,
    time:  null,
  };

  let calYear, calMonth;
  const now = new Date();
  calYear  = now.getFullYear();
  calMonth = now.getMonth();

  const MONTHS = ['January','February','March','April','May','June',
                  'July','August','September','October','November','December'];
  const DAYS   = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

  const TIMES = ['09:00','09:30','10:00','10:30','11:00','11:30',
                 '13:00','13:30','14:00','14:30','15:00','15:30',
                 '16:00','16:30','17:00','17:30'];

  /* ---- Step navigation ---- */
  function showPanel(n) {
    document.querySelectorAll('.bk-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.bk-step').forEach((s, i) => {
      const sn = i + 1;
      s.classList.toggle('active', sn === n);
      s.classList.toggle('done', sn < n);
    });
    const panel = document.getElementById('bkp' + n);
    if (panel) panel.classList.add('active');

    if (n === 3) renderTimeSlots();
    if (n === 4) renderSummary();
  }

  document.querySelectorAll('.bk-next').forEach(btn => {
    btn.addEventListener('click', () => {
      const next = parseInt(btn.dataset.next);
      if (!btn.disabled) showPanel(next);
    });
  });
  document.querySelectorAll('.bk-back').forEach(btn => {
    btn.addEventListener('click', () => {
      showPanel(parseInt(btn.dataset.back));
    });
  });

  /* ---- Consultation type ---- */
  document.querySelectorAll('.ctype').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.ctype').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.type = btn.dataset.type;
      state.dur  = btn.dataset.dur;
      const desc = document.getElementById('ctDesc');
      if (desc) desc.textContent = btn.dataset.desc;
    });
  });

  /* ---- Calendar ---- */
  function renderCalendar() {
    const ui = document.getElementById('calUI');
    if (!ui) return;

    const firstDay = new Date(calYear, calMonth, 1).getDay();
    const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
    const adjustedFirst = (firstDay === 0) ? 6 : firstDay - 1;
    const today = new Date(); today.setHours(0,0,0,0);

    let html = `
      <div class="cal-head">
        <button class="cal-nav-btn" id="calPrev">‹</button>
        <span class="cal-month">${MONTHS[calMonth]} ${calYear}</span>
        <button class="cal-nav-btn" id="calNext">›</button>
      </div>
      <div class="cal-grid">
        ${DAYS.map(d => `<div class="cal-day-name">${d}</div>`).join('')}
        ${Array(adjustedFirst).fill('<div class="cal-day empty"></div>').join('')}
    `;

    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(calYear, calMonth, d);
      date.setHours(0,0,0,0);
      const isToday    = date.getTime() === today.getTime();
      const isPast     = date < today;
      const isWeekend  = date.getDay() === 0 || date.getDay() === 6;
      const isSelected = state.date &&
        date.getFullYear() === state.date.getFullYear() &&
        date.getMonth()    === state.date.getMonth() &&
        date.getDate()     === state.date.getDate();

      const cls = [
        'cal-day',
        isPast || isWeekend ? 'disabled' : '',
        isToday             ? 'today'    : '',
        isSelected          ? 'selected' : '',
      ].filter(Boolean).join(' ');

      html += `<div class="${cls}" data-day="${d}">${d}</div>`;
    }

    html += '</div>';
    ui.innerHTML = html;

    document.getElementById('calPrev')?.addEventListener('click', () => {
      calMonth--;
      if (calMonth < 0) { calMonth = 11; calYear--; }
      state.date = null;
      document.getElementById('calNext').disabled = true;
      renderCalendar();
    });
    document.getElementById('calNext')?.addEventListener('click', () => {
      calMonth++;
      if (calMonth > 11) { calMonth = 0; calYear++; }
      state.date = null;
      document.getElementById('calNext').disabled = true;
      renderCalendar();
    });

    ui.querySelectorAll('.cal-day:not(.disabled):not(.empty)').forEach(day => {
      day.addEventListener('click', () => {
        const d = parseInt(day.dataset.day);
        state.date = new Date(calYear, calMonth, d);
        renderCalendar();
        const nextBtn = document.getElementById('calNext');
        if (nextBtn) nextBtn.disabled = false;
      });
    });
  }

  renderCalendar();

  /* ---- Time slots ---- */
  function renderTimeSlots() {
    const grid = document.getElementById('timeGrid');
    const label = document.getElementById('selDateLabel');
    if (!grid) return;

    if (state.date && label) {
      label.textContent = state.date.toLocaleDateString('en-GB', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
      });
    }

    grid.innerHTML = TIMES.map(t =>
      `<button class="time-slot${state.time === t ? ' selected' : ''}" data-t="${t}">${t}</button>`
    ).join('');

    grid.querySelectorAll('.time-slot').forEach(slot => {
      slot.addEventListener('click', () => {
        state.time = slot.dataset.t;
        grid.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
        slot.classList.add('selected');
        const nextBtn = document.getElementById('timeNext');
        if (nextBtn) nextBtn.disabled = false;
      });
    });
  }

  /* ---- Summary ---- */
  function renderSummary() {
    const el = document.getElementById('bkSummary');
    if (!el || !state.date) return;
    const dateStr = state.date.toLocaleDateString('en-GB', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });
    el.innerHTML = `
      <div class="bk-sum-row"><span class="bk-sum-key">Consultation Type</span><span class="bk-sum-val">${state.type}</span></div>
      <div class="bk-sum-row"><span class="bk-sum-key">Duration</span><span class="bk-sum-val">${state.dur}</span></div>
      <div class="bk-sum-row"><span class="bk-sum-key">Date</span><span class="bk-sum-val">${dateStr}</span></div>
      <div class="bk-sum-row"><span class="bk-sum-key">Time</span><span class="bk-sum-val">${state.time} GMT</span></div>
      <div class="bk-sum-row"><span class="bk-sum-key">Barrister</span><span class="bk-sum-val">Nazim Rahman</span></div>
    `;
  }

  /* ---- Confirm ---- */
  document.getElementById('bkConfirm')?.addEventListener('click', () => {
    const name  = document.getElementById('bkName')?.value.trim();
    const email = document.getElementById('bkEmail')?.value.trim();
    if (!name || !email) {
      alert('Please enter your name and email to confirm.');
      return;
    }

    const dateStr = state.date ? state.date.toLocaleDateString('en-GB', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    }) : 'Not selected';

    const waMsg = encodeURIComponent(
      `*Novo Agendamento — Nazim Rahman*\n` +
      `━━━━━━━━━━━━━━━━\n` +
      `*Cliente:* ${name}\n` +
      `*Email:* ${email}\n` +
      `*Consulta:* ${state.type}\n` +
      `*Duração:* ${state.dur}\n` +
      `*Data:* ${dateStr}\n` +
      `*Hora:* ${state.time} GMT\n` +
      `━━━━━━━━━━━━━━━━`
    );
    window.open(`https://wa.me/5595981019856?text=${waMsg}`, '_blank');

    document.querySelectorAll('.bk-panel').forEach(p => {
      p.classList.remove('active');
      p.classList.add('hidden');
    });
    const done = document.getElementById('bkDone');
    if (done) {
      done.classList.remove('hidden');
      done.classList.add('active');
    }
    document.querySelectorAll('.bk-step').forEach(s => s.classList.add('done'));
  });
}

/* ── CONTACT FORM ─────────────────────────────────────── */
function initContactForm() {
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');

  form?.addEventListener('submit', e => {
    e.preventDefault();
    form.style.opacity = '0';
    form.style.transition = 'opacity 0.4s ease';
    setTimeout(() => {
      form.style.display = 'none';
      if (success) success.classList.remove('hidden');
    }, 400);
  });
}

/* ── MOBILE NAV ───────────────────────────────────────── */
function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const closeBtn  = document.getElementById('mobileClose');

  hamburger?.addEventListener('click', () => {
    mobileNav?.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  const close = () => {
    mobileNav?.classList.remove('open');
    document.body.style.overflow = '';
  };

  closeBtn?.addEventListener('click', close);

  mobileNav?.querySelectorAll('.m-link').forEach(link => {
    link.addEventListener('click', close);
  });
}

/* ── SCROLL STACK (Core Values) ───────────────────────── */
function initScrollStack() {
  const container = document.getElementById('vstackContainer');
  if (!container) return;
  const stage = container.querySelector('.vstk-stage');
  const cards = Array.from(container.querySelectorAll('.vstk-card'));
  if (!cards.length || !stage) return;

  const n = cards.length;
  const OFFSCREEN = 480;
  const AW = (1 / n) * 0.8; // animation window per card

  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

  function update() {
    const top    = container.getBoundingClientRect().top;
    const totalH = Math.max(1, container.offsetHeight - window.innerHeight);
    const p      = clamp(-top / totalH, 0, 1);

    cards.forEach((card, i) => {
      // Card 0 is pre-arrived (arriveAt < 0) so it's fully visible at p=0
      const arriveAt = i === 0 ? -AW : (i / n) - AW * 0.5;
      const ep = clamp((p - arriveAt) / AW, 0, 1);

      // Count later cards that have started arriving
      let depth = 0;
      for (let j = i + 1; j < n; j++) {
        const jArriveAt = (j / n) - AW * 0.5;
        if (clamp((p - jArriveAt) / AW, 0, 1) > 0.1) depth++;
      }

      let ty, scale, blur, opacity;
      if (ep < 0.01) {
        ty = OFFSCREEN; scale = 0.94; blur = 0; opacity = 0;
      } else if (depth === 0) {
        ty      = OFFSCREEN * (1 - ep);
        scale   = 0.92 + 0.08 * ep;
        blur    = 0;
        opacity = ep;
      } else {
        ty      = -(depth * 14);
        scale   = Math.max(0.8, 1 - depth * 0.05);
        blur    = Math.min(6, depth * 1.8);
        opacity = Math.max(0.45, 1 - depth * 0.15);
      }

      card.style.transform = `translateY(calc(-50% + ${ty.toFixed(1)}px)) scale(${scale.toFixed(3)})`;
      card.style.filter    = blur > 0.1 ? `blur(${blur.toFixed(1)}px)` : '';
      card.style.opacity   = opacity.toFixed(3);
      card.style.zIndex    = i + 1;
    });
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* ── NAV ACTIVE SECTION TRACKING ───────────────────── */
function initNavActive() {
  const links = document.querySelectorAll('#navLinks .nav-link');
  const sections = document.querySelectorAll('section[id]');
  if (!links.length || !sections.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const match = document.querySelector(`#navLinks .nav-link[href="#${e.target.id}"]`);
        if (match) match.classList.add('active');
      }
    });
  }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });

  sections.forEach(s => obs.observe(s));
}

/* ── GALLERY CASE STUDIES CAROUSEL ────────────────── */
function initInsightsCarousel() {
  const track = document.getElementById('igcTrack');
  const prev  = document.getElementById('igcPrev');
  const next  = document.getElementById('igcNext');
  if (!track) return;

  const cards = Array.from(track.querySelectorAll('.igc-card'));
  let idx = 0;

  function getVisible() {
    return window.innerWidth >= 900 ? 3 : window.innerWidth >= 600 ? 2 : 1;
  }

  function go(dir) {
    const visible = getVisible();
    const max = Math.max(0, cards.length - visible);
    idx = Math.max(0, Math.min(max, idx + dir));
    const offset = idx > 0 && cards[idx] ? cards[idx].offsetLeft : 0;
    track.style.transform = `translateX(-${offset}px)`;
    if (prev) prev.disabled = idx === 0;
    if (next) next.disabled = idx >= max;
  }

  prev?.addEventListener('click', () => go(-1));
  next?.addEventListener('click', () => go(1));
  window.addEventListener('resize', () => go(0), { passive: true });
  go(0);
}

/* ── NAV SLIDER PILL ─────────────────────────────────── */
function initNavSlider() {
  const links = document.querySelectorAll('#navLinks .nav-link');
  const pill  = document.getElementById('navPill');
  const wrap  = document.getElementById('navLinks');
  if (!pill || !wrap || !links.length) return;

  function movePill(el) {
    const wRect = wrap.getBoundingClientRect();
    const eRect = el.getBoundingClientRect();
    pill.style.left    = (eRect.left - wRect.left - 10) + 'px';
    pill.style.width   = (eRect.width + 20) + 'px';
    pill.style.opacity = '1';
  }

  links.forEach(link => {
    link.addEventListener('mouseenter', () => movePill(link));
  });
  wrap.addEventListener('mouseleave', () => {
    pill.style.opacity = '0';
  });
}

/* ── SCROLL PROGRESS BAR ─────────────────────────────── */
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = ((window.scrollY / max) * 100) + '%';
  }, { passive: true });
}

/* ── MAGNETIC BUTTONS ────────────────────────────────── */
function initMagneticButtons() {
  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r   = btn.getBoundingClientRect();
      const cx  = r.left + r.width / 2;
      const cy  = r.top  + r.height / 2;
      const dx  = (e.clientX - cx) * 0.35;
      const dy  = (e.clientY - cy) * 0.35;
      btn.style.transform = `translate(${dx}px, ${dy}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0,0)';
    });
  });
}

/* ── SECTION TAG LINE REVEAL ─────────────────────────── */
function initSectionLines() {
  const tags = document.querySelectorAll('.section-tag');
  const obs  = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('lined'), 200);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  tags.forEach(t => obs.observe(t));
}

/* ── GSAP ENHANCEMENTS (if loaded) ───────────────────── */
window.addEventListener('load', () => {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  /* Subtle parallax on hero image */
  const heroImg = document.querySelector('.hero-img');
  if (heroImg) {
    gsap.to(heroImg, {
      yPercent: 15,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    });
  }

  /* About image parallax */
  const aboutImg = document.querySelector('.about-img');
  if (aboutImg) {
    gsap.to(aboutImg, {
      yPercent: 8,
      ease: 'none',
      scrollTrigger: {
        trigger: '.about',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    });
  }

  /* Services cards subtle depth */
  document.querySelectorAll('.srv-card').forEach((card, i) => {
    gsap.from(card, {
      opacity: 0,
      y: 30,
      duration: 0.7,
      delay: i * 0.08,
      scrollTrigger: {
        trigger: card,
        start: 'top 90%',
        once: true,
      }
    });
  });

  /* Insight cards stagger */
  gsap.from('.insight-card', {
    opacity: 0,
    y: 40,
    duration: 0.8,
    stagger: 0.12,
    scrollTrigger: {
      trigger: '.insights-grid',
      start: 'top 80%',
      once: true,
    }
  });

  ScrollTrigger.refresh();
});
