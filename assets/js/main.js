/* Dylan Thompson — portfolio interactions. No dependencies. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── nav: fixed in place, always visible ──────────────────────────── */
  const nav = $('[data-nav]');

  const menuBtn = $('[data-menu-toggle]');
  const setMenu = (open) => {
    nav.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  menuBtn?.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
  addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
  document.addEventListener('click', (e) => { if (nav.classList.contains('is-open') && !nav.contains(e.target)) setMenu(false); });

  /* ── split headlines into words for the mask reveal ────────────────── */
  $$('[data-split]').forEach((el) => {
    let wi = 0;
    const walk = (node) => {
      [...node.childNodes].forEach((n) => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) return frag.append(document.createTextNode(' '));
            const w = document.createElement('span');
            w.className = 'w';
            const inner = document.createElement('span');
            inner.style.setProperty('--wi', wi++);
            inner.textContent = part;
            w.append(inner);
            frag.append(w);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1) walk(n);
      });
    };
    el.setAttribute('aria-label', el.textContent.trim());
    walk(el);
    el.classList.add('is-split');
  });

  /* ── images fade in once decoded ───────────────────────────────────── */
  $$('.img img').forEach((img) => {
    const done = () => img.parentElement.classList.add('is-loaded');
    if (img.complete && img.naturalWidth) done();
    else { img.addEventListener('load', done, { once: true }); img.addEventListener('error', done, { once: true }); }
  });

  /* ── reveal on scroll ──────────────────────────────────────────────── */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in');
      io.unobserve(e.target);
    });
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
      const dur = 1400;
      const tick = (t) => {
        const p = Math.min((t - t0) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 4);
        el.textContent = Math.round(end * eased) + suffix;
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

  /* ── skills rail arrows ────────────────────────────────────────────── */
  $$('[data-rail]').forEach((rail) => {
    const sec = rail.closest('section');
    const step = () => Math.max(rail.clientWidth * 0.7, 200);
    $('[data-rail-prev]', sec)?.addEventListener('click', () => rail.scrollBy({ left: -step(), behavior: 'smooth' }));
    $('[data-rail-next]', sec)?.addEventListener('click', () => rail.scrollBy({ left: step(), behavior: 'smooth' }));
  });

  /* ── work filters ──────────────────────────────────────────────────── */
  const grid = $('[data-work-grid]');
  if (grid) {
    const btns = $$('[data-filter]');
    const cards = $$('[data-filters]', grid);
    btns.forEach((b) => b.addEventListener('click', () => {
      const f = b.dataset.filter;
      btns.forEach((x) => { x.classList.toggle('is-active', x === b); x.setAttribute('aria-pressed', String(x === b)); });
      const run = () => { grid.classList.toggle('is-filtering', f !== 'all'); cards.forEach((c) => c.classList.toggle('is-filtered', f !== 'all' && !c.dataset.filters.split(' ').includes(f))); };
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
      const best = img.srcset.split(',').map((s) => s.trim().split(' ')[0]).pop();
      lbImg.src = best;
      lbImg.alt = img.alt;
      lbCap.textContent = img.closest('figure')?.querySelector('figcaption')?.textContent || img.alt || '';
      lbCount.textContent = group.length > 1 ? `${idx + 1} / ${group.length}` : '';
      $('[data-lb-prev]', lb).hidden = $('[data-lb-next]', lb).hidden = group.length < 2;
      lbImg.style.animation = 'none'; void lbImg.offsetWidth; lbImg.style.animation = '';
    };
    const open = (img) => {
      const scope = img.closest('.carousel, .gallery, .p-hero') || document;
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
      say('Email copied to clipboard');
      setTimeout(() => b.classList.remove('is-copied'), 2200);
    } catch (e) {
      location.href = `mailto:${b.dataset.copy}`;
    }
  }));

  /* ── footer: back to top + Orlando local time ──────────────────────── */
  $('[data-to-top]')?.addEventListener('click', () => scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' }));
  const clock = $('[data-clock]');
  if (clock) {
    const fmt = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', timeZone: 'America/New_York' });
    const tick = () => { clock.textContent = `Orlando · ${fmt.format(new Date())}`; };
    tick();
    setInterval(tick, 30000);
  }

  /* ── only one video plays at a time ────────────────────────────────── */
  document.addEventListener('play', (e) => {
    $$('video').forEach((v) => { if (v !== e.target) v.pause(); });
  }, true);
})();
