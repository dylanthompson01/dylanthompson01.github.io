/* Loaded before first paint so pagereveal is caught. */
/* ── shared-element page transitions: project card image ⇄ project hero ─ */
(() => {
  const isList = (path) => path === '/' || path === '/work/';
  const cardImgFor = (path) => document.querySelector(`a[data-vt-card][href="${path}"] .img img, a[data-vt-card][href="${path}"] .placeholder`);
  const inView = (el) => { const r = el.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight; };
  const setName = (el, t) => { if (!el) return; el.style.viewTransitionName = 'hero-img'; t.finished.finally(() => { el.style.viewTransitionName = ''; }); };

  addEventListener('pageswap', (e) => {
    if (!e.viewTransition || !e.activation) return;
    const to = new URL(e.activation.entry.url).pathname;
    const card = cardImgFor(to);
    if (card && inView(card)) return setName(card, e.viewTransition);
    const hero = document.querySelector('[data-vt-hero]');
    if (hero && isList(to) && inView(hero)) setName(hero, e.viewTransition);
  });

  addEventListener('pagereveal', (e) => {
    if (!e.viewTransition || !window.navigation?.activation?.from) return;
    const from = new URL(navigation.activation.from.url).pathname;
    const hero = document.querySelector('[data-vt-hero]');
    if (hero && (isList(from) || document.querySelector(`[data-vt-card][href="${from}"]`) === null)) return setName(hero, e.viewTransition);
    const card = cardImgFor(from);
    if (card && inView(card)) setName(card, e.viewTransition);
  });
})();
