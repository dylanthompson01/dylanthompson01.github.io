/* Motion layer: staggered reveals, image unveils, scroll progress, gentle parallax.
   Runs before main.js (both deferred), so the reveal observer picks up what this adds. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;

  /* Groups reveal their items one after another instead of all at once. */
  const groups = ['.xp2-list', '.gallery-grid', '.wall', '.mwall', '.ab-body', '.pj-grid', '.cert-list', '.skill-grid', '.xp-entries', '.chapters', '.gallery'];
  $$(groups.join(',')).forEach((g) => {
    g.removeAttribute('data-reveal');
    [...g.children].forEach((el, i) => {
      el.setAttribute('data-reveal', '');
      el.style.setProperty('--i', g.classList.contains('mwall') ? i % 12 : Math.min(i, 8));
    });
  });

  /* Photos unveil from a soft inset as they enter. */
  $$('.gtile, .print, .psplit-photo, .pj-img, .article-hero, .g-item').forEach((el) => {
    el.classList.add('rv-img');
    if (!el.hasAttribute('data-reveal')) el.setAttribute('data-reveal', '');
  });

  /* Section headings and the about statement get the soft blur rise. */
  $$('.sx-head, .xp2-side, .ab-statement, .psplit-text, .sx-contact .container').forEach((el) => el.setAttribute('data-reveal', ''));

  /* Hero plays an entrance sequence on load. */
  const hero = $('.hx');
  if (hero) requestAnimationFrame(() => requestAnimationFrame(() => hero.classList.add('is-ready')));

  /* Safety net: anything already scrolled past (fast scroll, anchor jumps) is revealed too. */
  const sweep = () => $$('[data-reveal]:not(.is-in)').forEach((el) => { if (el.getBoundingClientRect().top < innerHeight * 0.92) el.classList.add('is-in'); });
  addEventListener('scroll', () => requestAnimationFrame(sweep), { passive: true });
  addEventListener('load', sweep);

  if (reduced) return;

  const nav = $('[data-nav]');

  /* Gentle parallax on the photography panel image (scroll only, never the pointer). */
  const par = $$('.psplit-photo .img');

  let ticking = false;
  const frame = () => {
    ticking = false;
    const y = scrollY;
    nav?.classList.toggle('is-scrolled', y > 12);
    par.forEach((img) => {
      const r = img.parentElement.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) return;
      const p = (r.top + r.height / 2 - innerHeight / 2) / innerHeight; // -1..1
      img.style.transform = `translate3d(0, ${(p * -1.5).toFixed(2)}%, 0) scale(1.03)`;
    });
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }, { passive: true });
  addEventListener('resize', frame);
  frame();
})();

/* Hero name types itself out once on load. */
(() => {
  const el = document.querySelector('.hx-title');
  if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const text = el.textContent.trim();
  el.setAttribute('aria-label', text);
  el.textContent = '';
  const typed = document.createElement('span');
  const caret = document.createElement('span');
  caret.className = 'type-caret';
  caret.setAttribute('aria-hidden', 'true');
  el.append(typed, caret);
  let i = 0;
  setTimeout(function tick() {
    typed.textContent = text.slice(0, ++i);
    if (i < text.length) setTimeout(tick, 70 + Math.random() * 50);
    else setTimeout(() => caret.classList.add('is-done'), 900);
  }, 450);
})();

/* Hero photos can be minimized; a refresh brings them back. */
(() => {
  const btn = document.querySelector('[data-mos-toggle]');
  const hero = document.querySelector('.hx');
  if (!btn || !hero) return;
  try { localStorage.removeItem('heroPhotosMin'); } catch (e) { /* storage blocked */ }
  btn.addEventListener('click', () => hero.classList.add('is-min'));
})();
