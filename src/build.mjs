// Generates every page of the site from src/content.mjs.
//   npm run build
// Output is plain HTML committed to the repo, so GitHub Pages serves it as-is.

import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
// Cache-bust content.mjs so the dev server always sees fresh edits.
const C = await import(`${pathToFileURL(join(ROOT, 'src', 'content.mjs')).href}?t=${Date.now()}`);
const { site, home, experience, education, certifications, activities, skills, projects, filters, about, workGallery } = C;
const MEDIA = JSON.parse(readFileSync(join(ROOT, 'src', 'media.json'), 'utf8'));
const MODEL_VIEWER = 'https://cdn.jsdelivr.net/npm/@google/model-viewer@4.3.1/dist/model-viewer.min.js';
const NOW = new Date();
const V = NOW.getTime().toString(36); // asset version for cache busting

// ─── helpers ────────────────────────────────────────────────────────────────

const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const md = (s = '') =>
  esc(s)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[(.+?)\]\((.+?)\)/g, (_, t, u) => `<a href="${u}"${u.startsWith('http') ? ' target="_blank" rel="noopener"' : ''}>${t}</a>`);
const plain = (s = '') => s.replace(/\*\*(.+?)\*\*/g, '$1').replace(/\[(.+?)\]\(.+?\)/g, '$1');
const join_ = (a) => a.filter(Boolean).join('');
const bySlug = Object.fromEntries(projects.map((p) => [p.slug, p]));
const PHOTOS = Object.entries(MEDIA.images).filter(([, v]) => v.dir === 'photography').map(([k]) => k);

const I = {
  arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  back: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>',
  up: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>',
  top: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M6 11l6-6 6 6"/></svg>',
  down: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v12M6 11l6 6 6-6M5 20h14"/></svg>',
  mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/></svg>',
  copy: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="3"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></svg>',
  check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 5 5 9-10"/></svg>',
  menu: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h16M4 16h16"/></svg>',
  close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  cube: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z"/><path d="m4 7.5 8 4.5 8-4.5M12 12v9"/></svg>',
  play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5-11-6.5Z"/></svg>',
  pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true" class="fill"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.8v1.5h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1v5.45h-4v-4.83c0-1.15-.02-2.63-1.6-2.63-1.6 0-1.85 1.25-1.85 2.55v4.91h-4v-11Z"/></svg>',
  lego: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="9" width="18" height="11" rx="2"/><path d="M6 9V6.5h4V9M14 9V6.5h4V9"/></svg>',
  circuit: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="7" y="7" width="10" height="10" rx="2"/><path d="M10 7V3M14 7V3M10 21v-4M14 21v-4M7 10H3M7 14H3M21 10h-4M21 14h-4"/></svg>',
  gear: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9 7 7M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/><circle cx="12" cy="12" r="7"/></svg>',
  box: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.1-.4-.4-2.1 2.5-2.5Z"/></svg>',
  flag: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 21V4M5 4h11l-2 4 2 4H5"/></svg>',
  flask: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 3h6M10 3v6L4.5 18.5A1.7 1.7 0 0 0 6 21h12a1.7 1.7 0 0 0 1.5-2.5L14 9V3"/><path d="M7 15h10"/></svg>',
};

let SIMPLE = {};
try { SIMPLE = await import('simple-icons'); } catch { /* optional: falls back to wordmarks */ }
const brandIcon = (slug) => {
  const key = 'si' + slug.charAt(0).toUpperCase() + slug.slice(1);
  const ic = SIMPLE[key];
  return ic ? `<svg viewBox="0 0 24 24" aria-hidden="true" class="fill" style="color:#${ic.hex}"><path d="${ic.path}"/></svg>` : '';
};

// Responsive image. `fit` = 'cover' (fills its box) or 'natural' (keeps aspect ratio).
function picture(name, { alt = '', sizes = '100vw', eager = false, cls = '', attrs = '' } = {}) {
  const m = MEDIA.images[name];
  if (!m) throw new Error(`Unknown image "${name}". Add it in tools/optimize-media.mjs and run npm run media.`);
  const base = `/assets/media/${m.dir}/${name}`;
  const srcset = m.sizes.map((w) => `${base}-${w}.webp ${w}w`).join(', ');
  const src = `${base}-${m.sizes.find((w) => w >= 1280) || m.sizes.at(-1)}.webp`;
  const portrait = m.h > m.w * 1.05 ? ' is-portrait' : '';
  return `<span class="img${portrait} ${cls}" style="--ar:${m.w}/${m.h};--lqip:url(${m.lqip})"><img src="${src}" srcset="${srcset}" sizes="${sizes}" width="${m.w}" height="${m.h}" alt="${esc(alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"${attrs}></span>`;
}

function videoEl(name, cap = '') {
  const m = MEDIA.videos[name];
  if (!m) throw new Error(`Unknown video "${name}"`);
  const base = `/assets/media/${m.dir}/${name}`;
  const portrait = m.h > m.w ? ' is-portrait' : '';
  return `<span class="vid${portrait}" style="--ar:${m.w}/${m.h};--lqip:url(${base}.webp)"><video src="${base}.mp4" poster="${base}.webp" preload="none" playsinline controls width="${m.w}" height="${m.h}"${cap ? ` aria-label="${esc(cap)}"` : ''}></video></span>`;
}

function modelEl(item) {
  const poster = item.poster ? ` poster="${item.poster}"` : '';
  return `<div class="model-panel" data-reveal>
    <span class="pill-label">${I.cube}${esc(item.label)}</span>
    <model-viewer src="${item.src}"${poster} alt="${esc(item.label)}" camera-controls auto-rotate auto-rotate-delay="1500" rotation-per-second="18deg" interaction-prompt="none" shadow-intensity="0.7" shadow-softness="0.9" exposure="1.05" environment-image="neutral" touch-action="pan-y"></model-viewer>
    <span class="model-hint">Drag to rotate · scroll or pinch to zoom</span>
  </div>`;
}

const slideMedia = (m, sizes) =>
  m.type === 'video' ? videoEl(m.name, m.cap) : picture(m.name, { alt: m.cap, sizes, attrs: ' data-zoom' });

function carousel(items, { label = 'Media' } = {}) {
  const list = items.filter((m) => m.type !== 'model');
  if (!list.length) return '';
  const sizes = '(max-width: 900px) 92vw, 620px';
  const slides = list
    .map((m, i) => `<figure class="slide" aria-roledescription="slide" aria-label="${i + 1} of ${list.length}">${slideMedia(m, sizes)}${m.cap ? `<figcaption>${esc(m.cap)}</figcaption>` : ''}</figure>`)
    .join('');
  const controls = list.length > 1
    ? `<div class="carousel-ctl">
        <button class="round-btn" data-prev aria-label="Previous">${I.back}</button>
        <span class="count"><b data-index>1</b> / ${list.length}</span>
        <button class="round-btn" data-next aria-label="Next">${I.arrow}</button>
      </div>`
    : '';
  const wide = list.every((m) => m.type === 'img' && m.name.startsWith('fledge-')); // app screenshots: show whole, no crop
  return `<div class="carousel${wide ? ' is-wide' : ''}" data-carousel aria-roledescription="carousel" aria-label="${esc(label)}">
    <div class="carousel-track" tabindex="0">${slides}</div>${controls}
  </div>`;
}

const chip = (t, cls = '') => `<span class="chip ${cls}">${md(t)}</span>`;
const tile = (x) => `<span class="tile tile-logo"><img src="${x.logo}" alt="${esc(x.org)} logo" loading="lazy"></span>`;
const bullets = (list = []) => (list.length ? `<ul class="bullets">${list.map((b) => `<li>${md(b)}</li>`).join('')}</ul>` : '');
const paras = (list = []) => list.map((p) => `<p>${md(p)}</p>`).join('');

function months(start, end) {
  const [y1, m1] = start.split('-').map(Number);
  const [y2, m2] = end ? end.split('-').map(Number) : [NOW.getFullYear(), NOW.getMonth() + 1];
  return Math.max(0, (y2 - y1) * 12 + (m2 - m1) + 1);
}

// ─── layout ─────────────────────────────────────────────────────────────────

const NAV = [
  ['/work/', 'Work', 'work'],
  ['/experience/', 'Experience', 'experience'],
  ['/about/', 'About', 'about'],
];

function layout({ path, title, description = site.description, section = '', body, models = false, image = '/assets/og.jpg', jsonld = '', bare = false }) {
  const fullTitle = title ? `${title} · ${site.name}` : site.name;
  const url = site.url + path;
  const links = NAV.map(([href, label, id]) => `<a href="${href}"${section === id ? ' aria-current="page"' : ''}>${label}</a>`).join('');
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(plain(description))}">
<link rel="canonical" href="${url}">
<meta name="theme-color" content="#F2EBDF">
<meta name="color-scheme" content="light only">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(plain(description))}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${site.url}${image}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="data:,">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..700;1,9..144,400..600&family=Inter:opsz,wght@14..32,400..700&display=swap">
<link rel="stylesheet" href="/assets/css/main.css?v=${V}">
<script>(function(){var d=document.documentElement;if('onpagereveal' in window)d.classList.add('vt');d.classList.add('js')})()</script>
${models ? `<script type="module" src="${MODEL_VIEWER}"></script>\n` : ''}${jsonld}<script src="/assets/js/vt.js?v=${V}"></script>
<script src="/assets/js/motion.js?v=${V}" defer></script>
<script src="/assets/js/main.js?v=${V}" defer></script>
</head>
<body class="${bare ? 'is-home' : ''}">
<a class="skip" href="#main">Skip to content</a>
<header class="nav" data-nav>
  <div class="nav-inner">
    <a class="brand" href="/" aria-label="${esc(site.name)}, home">Dylan Thompson</a>
    <nav class="top-links" aria-label="Primary">
      <a href="/experience/"${section === 'experience' ? ' aria-current="page"' : ''}>Experience</a>
      <a href="/work/"${section === 'work' ? ' aria-current="page"' : ''}>Projects</a>
      <a href="/about/"${section === 'about' ? ' aria-current="page"' : ''}>About</a>
      <a href="/photography/"${section === 'photography' ? ' aria-current="page"' : ''}>Photography</a>
      <a class="top-resume" href="${site.resume}" target="_blank" rel="noopener">Resume</a>
    </nav>
    <button class="menu-btn" data-menu-toggle aria-label="Open menu" aria-expanded="false"><span class="menu-open">Menu</span><span class="menu-close">Close</span></button>
  </div>
  <div class="sheet" data-sheet>
    <nav aria-label="Main">
      <a href="/experience/"${section === 'experience' ? ' aria-current="page"' : ''}><span class="sheet-n">01</span>Experience</a>
      <a href="/work/"${section === 'work' ? ' aria-current="page"' : ''}><span class="sheet-n">02</span>Projects</a>
      <a href="/about/"${section === 'about' ? ' aria-current="page"' : ''}><span class="sheet-n">03</span>About</a>
      <a href="/photography/"${section === 'photography' ? ' aria-current="page"' : ''}><span class="sheet-n">04</span>Photography</a>
    </nav>
    <div class="sheet-foot">
      <a href="mailto:${esc(site.email)}">${esc(site.email)}</a>
      <a href="${site.linkedin}" target="_blank" rel="noopener">LinkedIn</a>
      <a href="${site.resume}" target="_blank" rel="noopener">Resume</a>
    </div>
  </div>
</header>
<main id="main">
${body}
</main>
${footer()}
<div class="lightbox" data-lightbox hidden>
  <button class="round-btn lb-close" data-lb-close aria-label="Close">${I.close}</button>
  <button class="round-btn lb-prev" data-lb-prev aria-label="Previous image">${I.back}</button>
  <figure class="lb-stage"><img alt=""><figcaption></figcaption></figure>
  <button class="round-btn lb-next" data-lb-next aria-label="Next image">${I.arrow}</button>
  <span class="lb-count"></span>
</div>
<div class="toast" data-toast role="status" aria-live="polite"></div>
</body>
</html>
`;
}

function footer() {
  return `<footer class="footer">
  <div class="container footer-row">
    <span>© ${NOW.getFullYear()} Dylan Thompson</span>
    <div class="footer-social">
      <a href="${site.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn">${I.linkedin}</a>
      <a href="${site.github}" target="_blank" rel="noopener" aria-label="GitHub">${brandIcon('github').replace(/ style="color:#[0-9A-Fa-f]+"/, '')}</a>
    </div>
  </div>
</footer>`;
}

// ─── shared blocks ──────────────────────────────────────────────────────────

const num = (n) => String(n).padStart(2, '0');

function sectionHead(n, label, title, link = '') {
  return `<header class="sec-head" data-reveal>
    <div class="sec-rule"><span class="mono">${num(n)}</span><span class="mono">${esc(label)}</span></div>
    <div class="sec-title"><h2 class="serif-h2">${title}</h2>${link}</div>
  </header>`;
}
const moreLink = (href, text) => `<a class="more" href="${href}">${esc(text)} ${I.arrow}</a>`;

function cta() {
  return `<section class="contact">
  <div class="container">
    <div class="contact-inner" data-reveal>
      <span class="mono">Contact</span>
      <h2 class="contact-title">Connect <em>with me.</em></h2>
      <div class="contact-row">
        <a class="contact-email" href="mailto:${esc(site.email)}">${esc(site.email)}</a>
        <button class="copy-btn" data-copy="${esc(site.email)}" aria-label="Copy email address"><span class="i-copy">${I.copy}</span><span class="i-check">${I.check}</span></button>
      </div>
      <div class="contact-links">
        <a href="${site.linkedin}" target="_blank" rel="noopener">LinkedIn ${I.up}</a>
        <a href="${site.resume}" target="_blank" rel="noopener">Resume ${I.up}</a>
        <a href="${site.github}" target="_blank" rel="noopener">GitHub ${I.up}</a>
      </div>
    </div>
  </div>
</section>`;
}

function educationBlock() {
  return `<div class="edu" data-reveal>
    <img class="edu-logo" src="${education.logo}" alt="${esc(education.school)} logo" width="117" height="157">
    <div class="edu-text">
      <span class="mono">Education</span>
      <h3 class="serif-h3">${esc(education.degree)}</h3>
      <p>${esc(education.school)} · ${esc(education.detail)}</p>
    </div>
  </div>`;
}

function certList() {
  return `<ul class="cert-list">${certifications
    .map((c) => `<li class="cert-row" data-reveal>
      <span class="cert-logo${c.wide ? ' is-wide' : ''}"><img src="${c.logo}" alt="${esc(c.issuer)} logo" loading="lazy"></span>
      <span class="cert-main"><strong>${esc(c.name)}</strong><span>${esc(c.issuer)}${c.id ? ` · ID ${esc(c.id)}` : ''}</span></span>
      <span class="mono cert-date">${esc(c.date)}</span>
      ${c.url ? `<a class="cert-link" href="${c.url}" target="_blank" rel="noopener" aria-label="View ${esc(c.name)} credential">Verify ${I.up}</a>` : '<span class="cert-link is-empty"></span>'}
    </li>`)
    .join('')}</ul>`;
}

function skillGrid() {
  return `<ul class="skill-grid">${skills
    .map((s) => {
      const art = s.logo ? `<img src="${s.logo}" alt="" loading="lazy"${s.wide ? ' class="is-wide"' : ''}>` : s.icon ? brandIcon(s.icon).replace('class="fill"', s.wide ? 'class="fill is-wide"' : 'class="fill"') : '';
      return `<li class="skill"><span class="skill-logo">${art || `<span class="wordmark">${esc(s.word || s.name)}</span>`}</span><strong>${esc(s.name)}</strong><span class="mono">${esc(s.cat)}</span></li>`;
    })
    .join('')}</ul>`;
}

function storyBlock() {
  return `<div class="ppf">${home.story
    .map((st, i) => `<div class="ppf-col" data-reveal style="--i:${i}"><span class="mono">${num(i + 1)}</span><h3 class="serif-h3">${esc(st.label)}</h3><p>${md(st.body)}</p></div>`)
    .join('')}</div>`;
}

function xpIndex() {
  return `<ol class="xp-index">${experience
    .map((x) => {
      const href = x.project ? `/work/${x.project}/` : `/experience/#${x.id}`;
      return `<li data-reveal><a class="xp-row" href="${href}">
        <span class="mono xp-date">${esc(x.dates)}</span>
        <span class="xp-org"><img class="xp-logo" src="${x.logo}" alt="" loading="lazy">${esc(x.org)}</span>
        <span class="xp-role">${esc(x.role)}</span>
        <span class="xp-go">${I.arrow}</span>
      </a></li>`;
    })
    .join('')}</ol>`;
}

function placeholder(p) {
  return `<span class="img placeholder" style="--ar:4/3"><span class="ph-inner">${I.flask}<span class="mono">${p.inProgress ? 'In progress' : 'Photos soon'}</span></span></span>`;
}

// Project card used on Home and Work: image, then caption below like a magazine.
function projCard(p, i, { sizes = '(max-width: 700px) 92vw, 33vw', cls = '' } = {}) {
  const media = p.cover ? picture(p.cover, { alt: p.title, sizes }) : placeholder(p);
  return `<a class="pcard ${cls}" href="/work/${p.slug}/" data-vt-card data-filters="${p.filters.join(' ')}" data-reveal style="--i:${i % 3}">
    <div class="pcard-media"${p.cover ? ` style="--mar:${Math.max(MEDIA.images[p.cover].w / MEDIA.images[p.cover].h, 0.78).toFixed(3)}"` : ""}>${media}</div>
    <div class="pcard-cap">
      <span class="mono">No. ${num(projects.indexOf(p) + 1)} · ${esc(p.year)}</span>
      <h3>${esc(p.title)}</h3>
      <p>${md(p.card)}</p>
    </div>
  </a>`;
}

function pageHead(kicker, title, lede = '') {
  return `<section class="page-head">
  <div class="container">
    <div class="sec-rule" data-reveal><span class="mono">${esc(kicker)}</span><span class="mono">${esc(site.name)}</span></div>
    <h1 class="masthead-sm" data-split>${title}</h1>
    ${lede ? `<p class="page-lede" data-reveal>${lede}</p>` : ''}
  </div>
</section>`;
}

// ─── pages ──────────────────────────────────────────────────────────────────

// Consecutive roles under the same organization logo are grouped, LinkedIn style.
const xpHref = (x) => (x.project ? `/work/${x.project}/` : `/experience/#${x.id}`);
function xpGroups() {
  const groups = [];
  for (const x of experience) {
    const last = groups.at(-1);
    if (last && last.logo === x.logo) last.items.push(x);
    else groups.push({ logo: x.logo, items: [x] });
  }
  return groups;
}

function galleryTile({ slug, area, size }, i) {
  const p = bySlug[slug];
  const FLEDGE_MARK = '<svg class="fl-feather" viewBox="125 30 138 308" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M194.25 36.36C198.57 38.02 204.71 46.07 208.19 49.58C219.62 61.13 234.15 72.6 238.83 88.86C240.27 93.89 241.3 99 241.41 104.25C241.5 108.64 240.69 113.8 241.75 118.03C246.75 113.51 251.75 108.98 256.75 104.45C257.94 108.77 257.13 114.25 257.13 118.75C257.12 128.58 257.11 138.42 257.13 148.25C257.13 152.58 258.31 161.89 256.89 165.65C255.72 168.75 250.59 172.15 248.25 174.49C240.9 181.81 233.68 189.27 226.37 196.62C220.14 202.89 213.87 209.12 207.69 215.44C205.57 217.6 201.51 220.23 200.3 223.03C199.5 224.86 199.76 235.26 200.75 236.62C205.61 232.69 209.69 227.77 214.17 223.42C222.78 215.06 231.41 206.63 239.72 197.98C243.33 194.21 252.56 183.81 256.75 182.01C258.45 188.35 257.12 196.66 257.13 203.25C257.16 219.79 259.87 238.64 249.61 252.86C245.3 258.83 239.42 263.8 234.24 268.99C227.42 275.83 220.71 282.8 213.83 289.59C210.3 293.07 202.29 299.35 200.35 303.61C199.3 305.9 200.03 309.75 200.03 312.25C200.03 319.03 201.01 326.69 199.75 333.34C196.25 333.34 192.75 333.34 189.25 333.34C188.07 326.64 188.97 319.07 188.98 312.25C188.98 309.72 189.69 305.89 188.69 303.55C187.19 300.02 173.74 288.08 170.22 284.54C157.24 271.49 137.72 256.4 133.09 238.22C131.28 231.14 131.94 223.52 131.94 216.25C131.93 211.14 131 204.89 132.25 199.97C151.08 218.33 169.92 236.69 188.75 255.05C189.32 251.57 190.07 244.32 188.7 241.04C187.33 237.78 177.58 229.69 174.61 226.64C164.99 216.77 155.19 207.05 145.5 197.25C142.31 194.03 134.27 187.49 132.34 183.92C131.03 181.49 131.95 166.94 131.94 163.25C131.92 149.92 131.93 136.58 131.93 123.25C131.93 117.28 130.76 109.79 132.25 104.05C137.25 108.69 142.25 113.33 147.25 117.98C148.4 114.74 147.6 110.24 147.64 106.75C147.71 100.61 148.41 94.43 150.3 88.56C154.9 74.26 166.57 63.9 176.89 53.63C182.53 48.01 187.85 41.1 194.25 36.36ZM188.96 58.21C184.93 59.28 177.1 69.24 173.85 72.61C160.34 86.6 158.88 96.12 158.91 115.25C158.91 119.48 157.74 125.68 159.05 129.69C159.63 131.46 162.38 133.27 163.68 134.56C167.61 138.47 171.5 142.42 175.41 146.34C178.62 149.56 185.04 158.01 188.96 159.25C188.96 125.57 188.96 91.89 188.96 58.21ZM200.75 58C199.11 60.01 200.04 71.02 200.04 74.25C200.05 87.75 200.03 101.25 200.04 114.75C200.04 118.09 199.1 127.38 200.75 129.68C208.14 122.72 215.12 115.23 222.24 107.98C224.28 105.91 228.9 102.9 229.75 100.07C230.76 96.73 227.67 90.91 226.41 87.83C222.93 79.38 208.2 63.66 200.75 58ZM229.75 116.19C224.35 119.59 213.13 132.55 208.04 137.78C205.77 140.11 201.79 142.65 200.34 145.58C199.48 147.31 199.79 158.31 200.75 159.65C207.77 153.96 213.97 146.49 220.25 140C223.21 136.94 227.85 133.89 229.96 130.17C230.89 128.53 230.47 117.95 229.75 116.19ZM143.75 130.42C142.44 132 143.03 135.09 143.03 137.25C143.03 142.75 143.04 148.25 143.04 153.75C143.04 158.8 141.93 175.25 143.27 179.01C144.43 182.27 151.9 188.07 154.59 190.66C163.17 198.9 171.13 207.79 179.76 215.99C182.48 218.58 185.27 223.02 188.75 224.42C190.39 215.23 188.98 200.09 188.98 190.25C188.98 186.17 190.19 179.77 188.75 175.95C187.46 172.51 178.88 165.68 175.98 162.77C165.35 152.1 155.28 140.08 143.75 130.42ZM245.75 130.75C241.45 132.14 234.02 142.1 230.33 145.57C222.72 152.72 215.29 160.29 208.1 167.86C205.97 170.11 201.34 173.02 200.23 175.92C198.94 179.32 200.04 187.83 200.04 191.75C200.04 194.81 199.18 204.58 200.75 206.51C212.32 196.99 222.55 185 233.1 174.36C235.38 172.05 244.96 163.85 245.84 161.62C246.78 159.23 246.03 155.31 246.03 152.75C246.04 145.88 247.34 137.42 245.75 130.75ZM245.75 208.23C242.28 209.39 232.09 221.3 228.82 224.59C221.86 231.62 214.77 238.52 207.9 245.64C205.7 247.93 201.52 250.5 200.26 253.47C198.76 257.03 200.04 267.48 200.04 271.75C200.04 275.1 199.11 284.3 200.75 286.66C207.88 281 214.04 273.67 220.45 267.21C228.98 258.63 241.12 250.07 244.77 238.06C246.5 232.33 246.02 226.16 246.02 220.25C246.02 216.4 246.59 211.99 245.75 208.23ZM143.75 226.6C141.17 229.93 145.7 241.93 147.99 245.29C153.05 252.71 160.35 258.72 166.65 265.08C173.67 272.17 180.42 280.36 188.25 286.55C189.33 285.25 189.45 274.45 188.84 272.36C188.58 271.46 187.59 270.48 186.97 269.79C178.48 260.5 168.95 252.09 160.22 243.04C155.09 237.71 149.83 230.81 143.75 226.6Z"/></svg>';
  const media = p.slug === 'fledge'
    ? `<span class="fl-logo" role="img" aria-label="Fledge">${FLEDGE_MARK}<span class="fl-word">Fledge</span></span>`
    : p.cover ? picture(p.cover, { alt: p.title, sizes: '(max-width: 560px) 100vw, 50vw' }) : placeholder(p);
  return `<a class="gtile ${area ? `gt-${area}` : `gs-${size}`}${p.cover === "fledge-cover" ? " is-logo" : ""}" href="/work/${p.slug}/" data-vt-card data-filters="${p.filters.join(' ')}" data-reveal style="--i:${i % 4}">
    ${media}
    <div class="gtile-cap">
      <span class="gtile-year">${esc(p.year)}</span>
      <h3>${esc(p.title)}</h3>
      <p>${md(p.card)}</p>
    </div>
  </a>`;
}

function homePage() {
  const tile = (name, pos, cls, alt = '') => `<div class="mtile ${cls}">${picture(name, { alt, sizes: '(max-width: 900px) 46vw, 24vw', eager: true }).replace('<img ', `<img style="object-position:${pos}" `)}</div>`;
  const story = home.story.map((st) => `<div class="pp"><h3>${esc(st.label)}</h3><p>${md(st.body)}</p></div>`).join('');
  const roles = experience.map((x) => `<li><a class="xcard" href="${x.project ? `/work/${x.project}/` : `/experience/#${x.id}`}">
      <span class="xcard-top"><img class="xcard-logo" src="${x.logo}" alt="" loading="lazy"><span class="xcard-date">${esc(x.dates)}</span></span>
      <span class="xcard-org">${esc(x.org)}</span>
      <span class="xcard-role">${esc(x.role)}</span>
    </a></li>`).join('');
  const cards = ['ge-vernova', 'asme-robot', 'cnc-putter'].map((s) => bySlug[s]).map((p) => `<a class="pj" href="/work/${p.slug}/" data-vt-card data-reveal>
      <div class="pj-img">${p.cover ? picture(p.cover, { alt: p.title, sizes: '(max-width: 700px) 92vw, 30vw' }) : placeholder(p)}</div>
      <span class="pj-year">${esc(p.year)}</span>
      <h3>${esc(p.title)}</h3>
    </a>`).join('');
  const shots = ['photo-img-9280', 'photo-24-07-08-2357', 'photo-img-7161', 'photo-dsc00066'].filter((k) => MEDIA.images[k])
    .map((k) => `<a class="ph" href="/photography/" data-reveal>${picture(k, { sizes: '(max-width: 700px) 46vw, 23vw' })}</a>`).join('');
  const head = (title, link) => `<div class="sx-head" data-reveal><h2>${title}</h2>${link ? `<a class="sx-link" href="${link[0]}">${esc(link[1])} &rarr;</a>` : ''}</div>`;

  const body = `
<section class="hx">
  <div class="hx-bg" aria-hidden="true">${picture('sunset', { sizes: '100vw', eager: true })}</div>
  <div class="container hx-grid">
    <div class="hx-text">
      <span class="kick">Mechanical Engineering &nbsp;·&nbsp; University of Central Florida</span>
      <h1 class="hx-title">Dylan Thompson</h1>
      <p class="hx-lead">I like building things.</p>
      <div class="hx-btns">
        <a class="b-orange" href="/work/">View Projects</a>
        <a class="b-outline" href="#contact">Get in Touch</a>
      </div>
    </div>
    <div class="mos-wrap">
      <button class="mos-toggle" data-mos-toggle aria-expanded="true" aria-label="Hide photos"><span class="mos-ico" aria-hidden="true"></span><span class="mos-label">Show photos</span></button>
      <div class="mosaic">
        <div class="mcol">${tile(home.photo, '50% 28%', 'is-tall', site.name)}${tile('arm-hero', '50% 55%', 'is-short')}</div>
        <div class="mcol">${tile('gev-lounge', '45% 45%', 'is-short')}${tile('plant-tall', '50% 70%', 'is-tall')}</div>
      </div>
    </div>
  </div>
</section>

<section class="sx sx-alt" id="experience">
  <div class="container xp2">
    <div class="xp2-side" data-reveal>
      <h2>Experience</h2>
      <p>Industry, research, and team roles. Currently with Lockheed Martin.</p>
      <a class="sx-link" href="/experience/">Full experience &rarr;</a>
    </div>
    <ol class="xp2-list" data-reveal>${xpGroups().map((g) => g.items.length === 1
      ? `<li><a class="xp2-row" href="${xpHref(g.items[0])}">
      <img class="xp2-logo" src="${g.items[0].logo}" alt="" loading="lazy">
      <span class="xp2-main"><span class="xp2-org">${esc(g.items[0].org)}</span><span class="xp2-role">${esc(g.items[0].role)}</span></span>
      <span class="xp2-date">${esc(g.items[0].dates)}</span>
    </a></li>`
      : `<li class="xp2-group">
      <div class="xp2-row xp2-head"><img class="xp2-logo" src="${g.logo}" alt="" loading="lazy"><span class="xp2-main"><span class="xp2-org">University of Central Florida</span><span class="xp2-role">${g.items.length} roles</span></span></div>
      <ol class="xp2-sub">${g.items.map((x) => `<li><a class="xp2-subrow" href="${xpHref(x)}"><span class="xp2-dot" aria-hidden="true"></span><span class="xp2-main"><span class="xp2-org">${esc(x.role)}</span><span class="xp2-role">${esc(x.org.replace(/^UCF /, ''))}</span></span><span class="xp2-date">${esc(x.dates)}</span></a></li>`).join('')}</ol>
    </li>`).join('')}</ol>
  </div>
</section>

<section class="sx" id="projects">
  <div class="container">
    ${head('Projects', ['/work/', 'All projects'])}
    <div class="gallery-grid">${home.projects.map(galleryTile).join('')}</div>
  </div>
</section>

<section class="sx" id="about">
  <div class="container">
    <a class="ab-more" href="/about/" data-reveal>More about me <span aria-hidden="true">&rarr;</span></a>
  </div>
</section>

<section class="sx pmos" id="photography">
  <div class="container pmos-grid">
    <a class="mosaic pmos-mosaic" href="/photography/" aria-label="Photography gallery">
      <div class="mcol">${tile('photo-img-7161', '50% 40%', 'is-tall')}${tile('photo-img-8310', '50% 45%', 'is-short')}</div>
      <div class="mcol">${tile('photo-img-7856', '50% 50%', 'is-short')}${tile('photo-img-7808', '50% 50%', 'is-tall')}</div>
    </a>
    <div class="pmos-text" data-reveal>
      <h2>Photography</h2>
      <p>Something I’ve gotten into recently. Mostly trips, cities, and things I notice day to day.</p>
      <a class="psplit-link" href="/photography/">View all &rarr;</a>
    </div>
  </div>
</section>

<section class="sx sx-contact" id="contact">
  <div class="container" data-reveal>
    <h2>Let’s connect.</h2>
    <p>Open to internships, co-ops, research, and conversations about engineering.</p>
    <div class="ct-row">
      <a class="ct-mail" href="mailto:${esc(site.email)}">${esc(site.email)}</a>
      <button class="copy-btn" data-copy="${esc(site.email)}" aria-label="Copy email address"><span class="i-copy">${I.copy}</span><span class="i-check">${I.check}</span></button>
    </div>
    <div class="ct-links"><a href="${site.linkedin}" target="_blank" rel="noopener">LinkedIn &rarr;</a><a href="${site.resume}" target="_blank" rel="noopener">Resume &rarr;</a></div>
  </div>
</section>`;
  const jsonld = `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org', '@type': 'Person', name: site.name, url: site.url, email: `mailto:${site.email}`,
    jobTitle: 'Mechanical Engineering Student', alumniOf: education.school, sameAs: [site.linkedin, site.github],
  })}</script>\n`;
  return layout({ path: '/', body, jsonld, bare: true });
}

function photographyPage() {
  // Interleave landscape and portrait so the wall mixes shapes.
  const land = PHOTOS.filter((k) => MEDIA.images[k].w >= MEDIA.images[k].h);
  const port = PHOTOS.filter((k) => MEDIA.images[k].w < MEDIA.images[k].h);
  const order = [];
  while (land.length || port.length) { if (port.length) order.push(port.shift()); if (land.length) order.push(land.shift()); if (port.length) order.push(port.shift()); }
  // Staggered columns: tight gaps inside each column, columns start at different heights.
  const COLS = 4;
  const cols = Array.from({ length: COLS }, () => []);
  order.forEach((k, i) => {
    const m = MEDIA.images[k];
    const land = m.w > m.h * 1.15;
    const far = land ? (i % 3 === 0 ? '16 / 10' : '3 / 2') : (i % 4 === 1 ? '1 / 1' : '4 / 5');
    cols[i % COLS].push(`<figure class="mt" style="--far:${far}">${picture(k, { sizes: '(max-width: 700px) 92vw, 30vw', attrs: ' data-zoom' })}</figure>`);
  });
  const wall = cols.map((c, i) => `<div class="mcol2" style="--off:${[2, 0, 3.4, 1][i]}rem">${c.join('')}</div>`).join('');
  const body = `
${pageHead('Photography', 'Photography', 'Something I’ve gotten into recently. Mostly trips, cities, and things I notice day to day.')}
<section class="section section-tight"><div class="container"><div class="mwall">${wall}</div></div></section>
${cta()}`;
  return layout({ path: '/photography/', title: 'Photography', section: 'photography', body, description: 'Photography by Dylan Thompson.' });
}

function workPage() {
  const tabs = filters.map(([id, label], i) => `<button class="filter${i ? '' : ' is-active'}" data-filter="${id}" aria-pressed="${i ? 'false' : 'true'}">${label}</button>`).join('');
  const body = `
${pageHead('Work', 'Projects', 'Industry work, research, robotics, and things I built because I wanted to know how.')}
<section class="section section-tight">
  <div class="container">
    <div class="filters" role="group" aria-label="Filter projects" data-reveal>${tabs}</div>
    <div class="gallery-grid is-flow" data-work-grid>${workGallery.map(([slug, size], i) => galleryTile({ slug, size }, i)).join('')}</div>
  </div>
</section>
${cta()}`;
  return layout({ path: '/work/', title: 'Projects', section: 'work', body, description: 'Projects by Dylan Thompson: GE Vernova, Fledge, ASME robotics, heat pipe research, CNC machining, and more.' });
}

function projectPage(p, idx) {
  const next = projects[(idx + 1) % projects.length];
  const models = p.sections.flatMap((s) => (s.media || []).filter((m) => m.type === 'model')).concat(p.models || []);
  const hero = p.cover
    ? picture(p.cover, { alt: p.title, sizes: '(max-width: 1240px) 94vw, 1180px', eager: true, attrs: ' data-vt-hero data-zoom' })
    : placeholder(p);
  const stats = (p.stats || []).length
    ? `<div class="stats">${p.stats
        .map((s) => `<div class="stat" data-reveal><b ${s.n != null ? `data-count="${s.n}" data-suffix="${s.suffix || ''}"` : ''}>${s.n != null ? `${s.n}${s.suffix || ''}` : esc(s.text)}</b><span>${esc(s.label)}</span></div>`)
        .join('')}</div>`
    : '';
  const sections = p.sections
    .map((s, i) => {
      const media = (s.media || []).filter((m) => m.type !== 'model');
      return `<section class="chapter${media.length ? '' : ' no-media'}" data-reveal>
        <div class="chapter-head"><span class="mono">${num(i + 1)}</span><h2 class="serif-h3">${esc(s.title)}</h2></div>
        <div class="chapter-body">${(s.bullets || []).length ? bullets(s.bullets) : paras(s.body)}</div>
        ${media.length ? `<div class="chapter-media">${carousel(media, { label: s.title })}</div>` : ''}
      </section>`;
    })
    .join('');
  const learnings = (p.learnings || []).length
    ? `<section class="block">${sectionHead(p.sections.length + 1, 'Takeaways', 'What I <em>learned.</em>')}
        <div class="learn-grid">${p.learnings.map((l, i) => `<div class="learn" data-reveal><span class="mono">${num(i + 1)}</span><h3 class="serif-h3">${esc(l.title)}</h3><p>${md(l.body)}</p></div>`).join('')}</div></section>`
    : '';
  const gallery = (p.gallery || []).length
    ? `<section class="block">${sectionHead(p.sections.length + 2, 'Gallery', 'More <em>photos.</em>')}
        <div class="gallery">${p.gallery.map((m) => `<figure class="g-item" data-reveal>${picture(m.name, { alt: m.cap, sizes: '(max-width: 700px) 46vw, 24vw', attrs: ' data-zoom' })}${m.cap ? `<figcaption class="mono">${esc(m.cap)}</figcaption>` : ''}</figure>`).join('')}</div></section>`
    : '';
  const modelBlock = models.length ? `<section class="block">${models.map(modelEl).join('')}</section>` : '';
  const body = `
<article class="article">
  <div class="container">
    <a class="back mono" href="/work/">${I.back} All projects</a>
    <header class="article-head">
      <div class="sec-rule" data-reveal><span class="mono">No. ${num(idx + 1)}</span><span class="mono">${esc(p.subtitle)}</span><span class="mono">${esc(p.year)}</span></div>
      <h1 class="masthead-sm" data-split>${esc(p.title)}</h1>
      <p class="article-lede" data-reveal>${md(p.lead)}</p>
    </header>
    ${stats}
    <div class="chapters">${sections}</div>
    ${modelBlock}
    ${gallery}
    <a class="next" href="/work/${next.slug}/" data-vt-card data-reveal>
      <span class="mono">Next project</span>
      <span class="next-title">${esc(next.title)} ${I.arrow}</span>
    </a>
  </div>
</article>
${cta()}`;
  const image = p.cover ? `/assets/media/${MEDIA.images[p.cover].dir}/${p.cover}-1280.webp` : undefined;
  return layout({ path: `/work/${p.slug}/`, title: p.title, section: 'work', body, description: plain(p.lead), models: models.length > 0, image });
}

function experiencePage() {
  const roleBlock = (x, sub) => `<div class="${sub ? 'xp-role-sub' : 'xp-entry-main'}" id="${x.id}">
        <span class="mono">${esc(sub ? x.org.replace(/^UCF /, '') : x.org)}${sub ? ` · ${esc(x.dates)}` : ''}</span>
        <h2 class="serif-h3">${esc(x.role)}</h2>
        ${x.bullets.length ? bullets(x.bullets) : `<p>${md(x.summary)}</p>`}
        ${x.project ? `<a class="read-more" href="/work/${x.project}/">Read more &rarr;</a>` : ''}
      </div>`;
  const entries = xpGroups().map((g) => g.items.length === 1
    ? `<article class="xp-entry" data-reveal>
      <div class="xp-entry-side"><img class="xp-logo-lg" src="${g.logo}" alt="${esc(g.items[0].org)} logo" loading="lazy"><span class="mono">${esc(g.items[0].dates)}</span></div>
      ${roleBlock(g.items[0], false)}
    </article>`
    : `<article class="xp-entry" data-reveal>
      <div class="xp-entry-side"><img class="xp-logo-lg" src="${g.logo}" alt="University of Central Florida logo" loading="lazy"><span class="mono">${g.items.length} roles</span></div>
      <div class="xp-entry-main">
        <h2 class="serif-h3">University of Central Florida</h2>
        <div class="xp-subs">${g.items.map((x) => roleBlock(x, true)).join('')}</div>
      </div>
    </article>`).join('');
  const body = `
${pageHead('Experience', 'Experience', `Industry, research, and team roles. The one page version is the <a href="${site.resume}" target="_blank" rel="noopener">resume</a>.`)}
<section class="section section-tight"><div class="container"><div class="xp-entries">${entries}</div></div></section>
<section class="section">
  <div class="container">
    ${sectionHead(2, 'Credentials', 'Education <em>&amp; certifications.</em>')}
    ${educationBlock()}
    ${certList()}
  </div>
</section>
${cta()}`;
  return layout({ path: '/experience/', title: 'Experience', section: 'experience', body, description: 'Experience: Lockheed Martin, GE Vernova, UCF Interfacial Transport Lab, ASME, Baja SAE, and more.' });
}

function aboutPage() {
  const [main, ...more] = about.photos;
  const body = `
${pageHead('About', 'About <em>me</em>')}
<section class="section section-tight">
  <div class="container about-grid">
    <figure class="about-photo" data-reveal>
      ${picture(main.name, { alt: site.name, sizes: '(max-width: 900px) 92vw, 40vw', eager: true })}
    </figure>
    <div class="about-text">
      <p class="article-lede" data-reveal>${md(about.lead)}</p>
      <div class="prose" data-reveal>${paras(about.body)}</div>
    </div>
  </div>
</section>
`;
  return layout({ path: '/about/', title: 'About', section: 'about', body, description: plain(about.lead) });
}

function notFoundPage() {
  const body = `
${pageHead('404', 'Not <em>found.</em>', 'This page didn’t make it off the machine. The link may be old, or the page moved.')}
<section class="section section-tight"><div class="container"><a class="btn btn-ink" href="/">Go home ${I.arrow}</a></div></section>`;
  return layout({ path: '/404.html', title: 'Page not found', body });
}

// ─── write ──────────────────────────────────────────────────────────────────

function write(rel, html) {
  const file = join(ROOT, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
}

// Remove project folders that no longer exist in content.
rmSync(join(ROOT, 'work'), { recursive: true, force: true });

write('index.html', homePage());
write('work/index.html', workPage());
projects.forEach((p, i) => write(`work/${p.slug}/index.html`, projectPage(p, i)));
write('experience/index.html', experiencePage());
write('about/index.html', aboutPage());
write('photography/index.html', photographyPage());
write('404.html', notFoundPage());

const urls = ['/', '/work/', ...projects.map((p) => `/work/${p.slug}/`), '/experience/', '/photography/', '/about/'];
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${site.url}${u}</loc></url>`).join('\n')}\n</urlset>\n`);
write('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${site.url}/sitemap.xml\n`);
write('.nojekyll', '');

// Social preview image + icons (generated once).
const og = join(ROOT, 'assets', 'og.jpg');
if (!existsSync(og) || !existsSync(join(ROOT, 'assets', 'apple-touch-icon.png'))) {
  const sharp = (await import('sharp')).default;
  const sunset = MEDIA.images.sunset;
  await sharp(join(ROOT, 'assets', 'media', sunset.dir, `sunset-${sunset.sizes.at(-1)}.webp`)).resize(1200, 630, { fit: 'cover' }).jpeg({ quality: 82 }).toFile(og);
  const svg = readFileSync(join(ROOT, 'assets', 'favicon.svg'));
  await sharp(svg, { density: 600 }).resize(180, 180).flatten({ background: '#1F4D36' }).png().toFile(join(ROOT, 'assets', 'apple-touch-icon.png'));
}

console.log(`built ${urls.length + 1} pages`);
