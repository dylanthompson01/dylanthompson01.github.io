/* Dylan Thompson — portfolio interactions. No dependencies. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ── mobile menu (unused while the header is just initials) ───────── */
  const today = $('[data-today]');
  if (today) today.textContent = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const nav = $('[data-nav]');
  const menuBtn = $('[data-menu-toggle]');
  const setMenu = (open) => {
    nav.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  menuBtn?.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && nav?.classList.contains('is-open')) setMenu(false); });
  document.addEventListener('click', (e) => { if (nav?.classList.contains('is-open') && !nav.contains(e.target)) setMenu(false); });

  /* ── paper: dot field with halftone patches that answer the pointer ── */
  const cv = $('[data-dots]');
  if (cv && cv.getContext) {
    const ctx = cv.getContext('2d');
    const GAP = 12;
    let w = 0, h = 0, dpr = 1, px = -999, py = -999, pending = false;
    // cheap value noise for the patchy halftone areas
    const hash = (x, y) => { const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453; return s - Math.floor(s); };
    const smooth = (t) => t * t * (3 - 2 * t);
    const noise = (x, y) => {
      const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
      const a = hash(xi, yi), b = hash(xi + 1, yi), c = hash(xi, yi + 1), d = hash(xi + 1, yi + 1);
      const u = smooth(xf), v = smooth(yf);
      return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
    };
    const draw = () => {
      pending = false;
      ctx.clearRect(0, 0, w, h);
      const off = reduced ? 0 : (scrollY * 0.25) % (GAP * 4000);
      const r2 = 120 * 120;
      for (let y = (-(off % GAP)); y < h; y += GAP) {
        const gy = (y + off) / GAP;
        for (let x = GAP / 2; x < w; x += GAP) {
          const n = noise(x / GAP / 9, gy / 9);
          let a = n > 0.62 ? 0.06 + (n - 0.62) * 0.55 : 0.035;
          let rad = 0.75;
          let tint = 0;
          if (finePointer && !reduced) {
            const dx = x - px, dy = y - py, d2 = dx * dx + dy * dy;
            if (d2 < r2) { const k = 1 - d2 / r2; const e = k * k; a += e * 0.09; rad += e * 0.35; tint = e; }
          }
          ctx.fillStyle = tint > 0.2 ? `rgba(30,90,60,${a})` : `rgba(31,34,38,${a})`;
          ctx.fillRect(x - rad, y - rad, rad * 2, rad * 2);
        }
      }
    };
    const queue = () => { if (!pending) { pending = true; requestAnimationFrame(draw); } };
    const size = () => {
      dpr = Math.min(devicePixelRatio || 1, 2);
      w = innerWidth; h = innerHeight;
      cv.width = w * dpr; cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      queue();
    };
    size();
    cv.classList.add('is-live');
    addEventListener('resize', size);
    if (!reduced) {
      addEventListener('scroll', queue, { passive: true });
      if (finePointer) {
        addEventListener('pointermove', (e) => { px = e.clientX; py = e.clientY; queue(); }, { passive: true });
        document.addEventListener('pointerleave', () => { px = py = -999; queue(); });
      }
    }
  }

  /* ── hero: the name writes itself once the script font is ready ────── */
  const hero = $('[data-hero]');
  if (hero) {
    const go = () => requestAnimationFrame(() => requestAnimationFrame(() => hero.classList.add('is-ready')));
    const fontReady = document.fonts && document.fonts.load ? document.fonts.load('400 1em "Great Vibes"') : Promise.resolve();
    Promise.race([fontReady, new Promise((r) => setTimeout(r, 1200))]).then(go);
  }

  /* ── intro: leader lines draw from each callout to the photo ───────── */
  const intro = $('.intro');
  const leaders = $('[data-leaders]');
  const drawLeaders = (animate) => {
    if (!leaders) return;
    $$('.ld', leaders).forEach((n) => n.remove());
    const box = leaders.parentElement;
    const photo = $('.s0', box);
    if (!photo || getComputedStyle(leaders).display === 'none') return;
    const br = box.getBoundingClientRect();
    const pr = photo.getBoundingClientRect();
    $$('.co', box).forEach((co, i) => {
      const r = co.getBoundingClientRect();
      const left = r.right < pr.left + pr.width / 2;   // callout sits left of the photo
      const y1 = r.top - br.top + r.height / 2;
      const x1 = (left ? r.right + 10 : r.left - 10) - br.left;
      const knee = x1 + (left ? 22 : -22);
      const ty = Math.min(Math.max(r.top + r.height / 2, pr.top + pr.height * 0.14), pr.bottom - pr.height * 0.14);
      const x2 = (left ? pr.left + pr.width * 0.02 : pr.right - pr.width * 0.02) - br.left;
      const y2 = ty - br.top + (i - 1) * 6;
      const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      p.setAttribute('class', 'ld');
      p.setAttribute('d', `M${x1} ${y1}H${knee}L${x2} ${y2}`);
      p.setAttribute('marker-end', 'url(#ah)');
      leaders.append(p);
      if (animate && !reduced) {
        const len = p.getTotalLength();
        p.style.strokeDasharray = len;
        p.style.strokeDashoffset = len;
        p.style.transition = `stroke-dashoffset .8s cubic-bezier(.2,.8,.2,1) ${0.35 + i * 0.15}s`;
        p.setAttribute('marker-end', '');
        p.getBoundingClientRect();
        requestAnimationFrame(() => { p.style.strokeDashoffset = 0; });
        setTimeout(() => p.setAttribute('marker-end', 'url(#ah)'), (1.1 + i * 0.15) * 1000);
      }
    });
  };
  if (intro) {
    new IntersectionObserver((es, o) => {
      if (!es[0].isIntersecting) return;
      intro.classList.add('is-in');
      drawLeaders(true);
      o.disconnect();
    }, { threshold: 0.35 }).observe(intro);
    let rz;
    addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(() => intro.classList.contains('is-in') && drawLeaders(false), 120); });
    $('[data-stack]')?.addEventListener('transitionend', () => intro.classList.contains('is-in') && drawLeaders(false));
  }

  /* ── highlighter marks sweep in when read ──────────────────────────── */
  const hlIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const marks = $$('mark.hl', e.target.closest('p, .hero-lead') || e.target);
      marks.forEach((m, i) => { m.style.setProperty('--d', `${(hero && hero.contains(m) ? 0.7 : 0.15) + i * 0.25}s`); m.classList.add('is-on'); hlIO.unobserve(m); });
    });
  }, { rootMargin: '0px 0px -15% 0px', threshold: 1 });
  $$('mark.hl').forEach((m) => hlIO.observe(m));

  /* ── project viewer: hover or focus a build to preview it ──────────── */
  const bench = $('[data-bench]');
  if (bench) {
    const rows = $$('.br', bench);
    const items = $$('.vp-item', bench);
    const fileEl = $('[data-vp-file]', bench);
    const titleEl = $('[data-vp-title]', bench);
    const subEl = $('[data-vp-sub]', bench);
    const stage = $('[data-vp-stage]', bench);
    const xy = $('[data-vp-xy]', bench);
    const cross = $('[data-vp-cross]', bench);
    const wide = () => getComputedStyle($('.vp', bench)).display !== 'none';
    const show = (row) => {
      const key = row.dataset.key;
      rows.forEach((r) => r.classList.toggle('is-on', r === row));
      items.forEach((it) => {
        const on = it.dataset.key === key;
        it.classList.toggle('is-on', on);
        const v = $('video', it);
        if (!v) return;
        if (on && wide()) { v.preload = 'auto'; v.play().catch(() => {}); } else v.pause();
      });
      fileEl.textContent = row.dataset.file;
      titleEl.textContent = $('.br-title', row).textContent;
      subEl.textContent = $('.br-tags', row).textContent;
    };
    rows.forEach((r) => { r.addEventListener('pointerenter', () => show(r)); r.addEventListener('focus', () => show(r)); });
    // start the first clip once the viewer scrolls into view
    new IntersectionObserver((es, o) => { if (es[0].isIntersecting && wide()) { show(rows.find((r) => r.classList.contains('is-on')) || rows[0]); o.disconnect(); } }, { threshold: 0.3 }).observe(stage);
    stage.addEventListener('pointermove', (e) => {
      const r = stage.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      cross.style.transform = `translate(${x}px, ${y}px)`;
      const fx = ((x / r.width) * 2 - 1) * 100, fy = (1 - (y / r.height) * 2) * 100;
      const f = (n) => `${n < 0 ? '-' : ' '}${Math.abs(n).toFixed(2).padStart(6, '0')}`;
      xy.textContent = `x${f(fx)}  y${f(fy)}`;
    });
  }

  /* ── reveal hook used by older templates ───────────────────────────── */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  $$('[data-reveal]').forEach((el) => io.observe(el));

  /* ── count-up numbers ──────────────────────────────────────────────── */
  const countIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      countIO.unobserve(e.target);
      const el = e.target;
      const end = Number(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      if (reduced) return;
      const t0 = performance.now();
      const tick = (t) => {
        const p = Math.min((t - t0) / 1400, 1);
        el.textContent = Math.round(end * (1 - Math.pow(1 - p, 4))) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.6 });
  $$('[data-count]').forEach((el) => countIO.observe(el));

  /* ── carousels ─────────────────────────────────────────────────────── */
  $$('[data-carousel]').forEach((car) => {
    const track = $('.carousel-track', car);
    const slides = $$('.slide', track);
    const indexEl = $('[data-index]', car);
    const prev = $('[data-prev]', car);
    const next = $('[data-next]', car);
    let current = 0;
    const go = (i) => {
      i = Math.max(0, Math.min(slides.length - 1, i));
      track.scrollTo({ left: slides[i].offsetLeft - track.offsetLeft, behavior: reduced ? 'auto' : 'smooth' });
    };
    const update = () => {
      const i = Math.round(track.scrollLeft / track.clientWidth);
      if (i === current) return;
      $$('video', slides[current]).forEach((v) => v.pause());
      current = i;
      if (indexEl) indexEl.textContent = i + 1;
      if (prev) prev.disabled = i === 0;
      if (next) next.disabled = i === slides.length - 1;
    };
    if (prev) prev.disabled = true;
    prev?.addEventListener('click', () => go(current - 1));
    next?.addEventListener('click', () => go(current + 1));
    track.addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });
    track.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(current + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(current - 1); }
    });
    addEventListener('resize', () => go(current));
  });

  /* ── work filters ──────────────────────────────────────────────────── */
  const grid = $('[data-work-grid]');
  if (grid) {
    const btns = $$('[data-filter]');
    const cards = $$('[data-filters]', grid);
    btns.forEach((b) => b.addEventListener('click', () => {
      const f = b.dataset.filter;
      btns.forEach((x) => { x.classList.toggle('is-active', x === b); x.setAttribute('aria-pressed', String(x === b)); });
      const run = () => cards.forEach((c) => c.classList.toggle('is-filtered', f !== 'all' && !c.dataset.filters.split(' ').includes(f)));
      if (document.startViewTransition && !reduced) {
        cards.forEach((c, i) => { c.style.viewTransitionName = `wc-${i}`; });
        document.startViewTransition(run).finished.finally(() => cards.forEach((c) => { c.style.viewTransitionName = ''; }));
      } else run();
    }));
  }

  /* ── lightbox for zoomable images ──────────────────────────────────── */
  const lb = $('[data-lightbox]');
  if (lb) {
    const lbImg = $('img', lb);
    const lbCap = $('figcaption', lb);
    const lbCount = $('.lb-count', lb);
    let group = [], idx = 0, lastFocus = null;
    const show = () => {
      const img = group[idx];
      lbImg.src = img.srcset.split(',').map((s) => s.trim().split(' ')[0]).pop();
      lbImg.alt = img.alt;
      lbCap.textContent = img.closest('figure')?.querySelector('figcaption')?.textContent || img.alt || '';
      lbCount.textContent = group.length > 1 ? `${idx + 1} / ${group.length}` : '';
      $('[data-lb-prev]', lb).hidden = $('[data-lb-next]', lb).hidden = group.length < 2;
      lbImg.style.animation = 'none'; void lbImg.offsetWidth; lbImg.style.animation = '';
    };
    const open = (img) => {
      const scope = img.closest('[data-gallery], .carousel') || document;
      group = $$('img[data-zoom]', scope);
      idx = Math.max(0, group.indexOf(img));
      lastFocus = document.activeElement;
      lb.hidden = false;
      document.body.style.overflow = 'hidden';
      show();
      $('[data-lb-close]', lb).focus();
    };
    const close = () => { lb.hidden = true; document.body.style.overflow = ''; lastFocus?.focus?.(); };
    const step = (d) => { idx = (idx + d + group.length) % group.length; show(); };
    document.addEventListener('click', (e) => {
      const img = e.target.closest('img[data-zoom]');
      if (img) { e.preventDefault(); open(img); }
    });
    $('[data-lb-close]', lb).addEventListener('click', close);
    $('[data-lb-prev]', lb).addEventListener('click', () => step(-1));
    $('[data-lb-next]', lb).addEventListener('click', () => step(1));
    lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
    addEventListener('keydown', (e) => {
      if (lb.hidden) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    });
    let tx = 0;
    lb.addEventListener('touchstart', (e) => { tx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', (e) => { const d = e.changedTouches[0].clientX - tx; if (Math.abs(d) > 50) step(d < 0 ? 1 : -1); });
  }

  /* ── copy email ────────────────────────────────────────────────────── */
  const toast = $('[data-toast]');
  let toastTimer;
  const say = (msg) => {
    toast.textContent = msg;
    toast.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-on'), 2200);
  };
  $$('[data-copy]').forEach((b) => b.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(b.dataset.copy);
      b.classList.add('is-copied');
      say('Email copied');
      setTimeout(() => b.classList.remove('is-copied'), 2200);
    } catch (e) {
      location.href = `mailto:${b.dataset.copy}`;
    }
  }));

  /* ── only one video with sound plays at a time ─────────────────────── */
  document.addEventListener('play', (e) => {
    if (e.target.hasAttribute('data-loop')) return;
    $$('video:not([data-loop])').forEach((v) => { if (v !== e.target) v.pause(); });
  }, true);
})();
