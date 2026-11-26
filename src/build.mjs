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
    .replace(/==(.+?)==/g, '<mark class="hl">$1</mark>')
    .replace(/\^\^(.+?)\^\^/g, '<span class="blue">$1</span>')
    .replace(/\[(.+?)\]\((.+?)\)/g, (_, t, u) => `<a href="${u}"${u.startsWith('http') ? ' target="_blank" rel="noopener"' : ''}>${t}</a>`);
const plain = (s = '') => s.replace(/==(.+?)==/g, '$1').replace(/\^\^(.+?)\^\^/g, '$1').replace(/\*\*(.+?)\*\*/g, '$1').replace(/\[(.+?)\]\(.+?\)/g, '$1');
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

const bullets = (list = []) => (list.length ? `<ul class="bullets">${list.map((b) => `<li>${md(b)}</li>`).join('')}</ul>` : '');
const paras = (list = []) => list.map((p) => `<p>${md(p)}</p>`).join('');

function months(start, end) {
  const [y1, m1] = start.split('-').map(Number);
  const [y2, m2] = end ? end.split('-').map(Number) : [NOW.getFullYear(), NOW.getMonth() + 1];
  return Math.max(0, (y2 - y1) * 12 + (m2 - m1) + 1);
}

// ─── layout ─────────────────────────────────────────────────────────────────

const NAV = [
  ['/work/', 'Projects', 'work'],
  ['/experience/', 'Experience', 'experience'],
  ['/about/', 'About', 'about'],
  ['/photography/', 'Photography', 'photography'],
];

// The only header: initials in script, top left. It scrolls away with the page.
const masthead = () => `<header class="mast"><a class="mast-mark" href="/" aria-label="${esc(site.name)}, home">dt</a></header>`;

function layout({ path, title, description = site.description, section = 'home', body, models = false, image = '/assets/og.jpg', jsonld = '' }) {
  const fullTitle = title ? `${title} · ${site.name}` : site.name;
  const url = site.url + path;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(plain(description))}">
<link rel="canonical" href="${url}">
<meta name="theme-color" content="#F3F2EC">
<meta name="color-scheme" content="light only">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(plain(description))}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${site.url}${image}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/assets/favicon-dt.svg?v=${V}" type="image/svg+xml">
<link rel="icon" href="/favicon.ico?v=${V}" sizes="48x48">
<link rel="apple-touch-icon" href="/assets/apple-touch-icon-dt.png?v=${V}">
<link rel="preload" href="/assets/fonts/Geist-Variable.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/Gloock.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/Parisienne.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/main.css?v=${V}">
<script>document.documentElement.classList.add('js');if('onpagereveal' in window)document.documentElement.classList.add('vt')</script>
${models ? `<script type="module" src="${MODEL_VIEWER}"></script>\n` : ''}${jsonld}<script src="/assets/js/vt.js?v=${V}"></script>
<script src="/assets/js/main.js?v=${V}" defer></script>
</head>
<body data-section="${section}">
<canvas class="dots" data-dots aria-hidden="true"></canvas>
<a class="skip" href="#main">Skip to content</a>
${masthead()}
<main id="main">
${body}
</main>
${footer(section)}
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

const socialLinks = () => (site.social || [])
  .map((s) => `<a href="${s.url}" target="_blank" rel="noopener" aria-label="${esc(s.label)}">${brandIcon(s.id).replace(/ style="color:#[0-9A-Fa-f]+"/, '') || esc(s.label)}</a>`)
  .join('');

function footer(section) {
  return `<footer class="foot">
  <div class="wrap"><div class="foot-row">
    <nav class="foot-nav" aria-label="Site">${NAV.map(([href, label, id]) => `<a href="${href}"${section === id ? ' aria-current="page"' : ''}>${label}</a>`).join('')}<a href="${site.resume}" target="_blank" rel="noopener">Resume</a></nav>
    <span class="foot-copy">© ${NOW.getFullYear()} Dylan Thompson</span>
    <div class="foot-links">
      <a href="${site.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn">${I.linkedin}</a>
      <a href="${site.github}" target="_blank" rel="noopener" aria-label="GitHub">${brandIcon('github').replace(/ style="color:#[0-9A-Fa-f]+"/, '')}</a>
      ${socialLinks()}
    </div>
  </div></div>
</footer>`;
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

// ─── new shared pieces ──────────────────────────────────────────────────────

// Section header: a small number, the title, a hairline, and an optional link.
// Callers pass a letter (A, B, C...) or a number; it shows as 01, 02, 03...
function sheetHead(key, title, link = '') {
  const n = typeof key === 'number' ? key : 'ABCDEFGHIJKLMNOP'.indexOf(key) + 1;
  return `<header class="sh">
    <span class="sh-n" aria-hidden="true">${String(n).padStart(2, '0')}</span>
    <h2>${title}</h2>
    <span class="sh-rule" aria-hidden="true"></span>
    ${link}
  </header>`;
}
const shLink = (href, text) => `<a class="sh-link" href="${href}">${esc(text)}</a>`;

// Muted, looping clip for previews (no controls). Loads only when shown.
function loopVideo(name) {
  const m = MEDIA.videos[name];
  const base = `/assets/media/${m.dir}/${name}`;
  return `<video data-loop muted loop playsinline preload="none" poster="${base}.webp" width="${m.w}" height="${m.h}"><source src="${base}.mp4" type="video/mp4"></video>`;
}

function mediaFor(name, sizes) {
  if (!name) return '';
  if (MEDIA.videos[name]) return loopVideo(name);
  return picture(name, { sizes });
}

// A small schematic for builds without photos yet (the liquid cooling loop).
const LOOP_SCHEMATIC = `<svg class="schematic" viewBox="0 0 320 240" aria-hidden="true">
  <g class="sch-parts">
    <rect x="28" y="30" width="96" height="52" rx="6"/><text x="76" y="61">Reservoir</text>
    <rect x="196" y="30" width="96" height="52" rx="6"/><text x="244" y="61">Pump</text>
    <rect x="196" y="158" width="96" height="52" rx="6"/><text x="244" y="189">Water block</text>
    <rect x="28" y="158" width="96" height="52" rx="6"/><text x="76" y="189">Radiator</text>
  </g>
  <g class="sch-flow">
    <path d="M124 56H196"/><path d="M244 82V158"/><path d="M196 184H124"/><path d="M76 158V82"/>
  </g>
  <g class="sch-arrows">
    <path d="M154 50l8 6-8 6"/><path d="M238 114l6 8 6-8"/><path d="M166 178l-8 6 8 6"/><path d="M70 126l6-8 6 8"/>
  </g>
  <text class="sch-heat" x="244" y="228">Peltier heat source</text>
</svg>`;

function xpCard(x) {
  const p = x.project ? bySlug[x.project] : null;
  const media = x.youtube
    ? `<span class="yt" data-yt="${x.youtube}" data-start="${x.ytStart || 0}">${x.ytPoster === false ? '' : `<img src="https://i.ytimg.com/vi/${x.youtube}/maxresdefault.jpg" onerror="this.onerror=null;this.src='https://i.ytimg.com/vi/${x.youtube}/hqdefault.jpg'" alt="" loading="lazy">`}</span>`
    : p && p.cover
    ? picture(p.cover, { alt: '', sizes: '(max-width: 760px) 92vw, 560px' })
    : `<span class="logo-panel"><img src="${x.logo}" alt="" loading="lazy"></span>`;
  const tools = p ? (p.meta.find(([k]) => k === 'Tools') || [])[1] : '';
  return `<a class="xc" href="${xpHref(x)}">
    <div class="xc-media">${media}${x.overlay ? `<span class="yt-badge"><img src="${x.overlay}" alt="${esc(x.org)}"></span>` : ''}</div>
    <div class="xc-body">
      <div class="xc-top"><h3>${esc(x.org)}</h3><span class="xc-date">${esc(x.dates)}</span></div>
      <div class="xc-role">${esc(x.role)}<span class="chip">${esc(x.kind)}</span></div>
      <p class="xc-sum">${md(x.summary)}</p>
      <p class="xc-foot">${esc(tools || x.tag || '')}</p>
    </div>
  </a>`;
}

function involvementRows() {
  const rest = experience.filter((x) => !home.featured.includes(x.id))
    .map((x) => ({ org: x.org, role: x.role, dates: x.dates, href: xpHref(x) }));
  const rows = [...rest, ...activities.map((a) => ({ org: a.org, role: a.role, dates: a.dates, href: a.href || '/about/' }))];
  return `<ul class="inv">${rows.map((r) => `<li><a class="inv-row" href="${r.href}">
      <span class="inv-main"><strong>${esc(r.org)}</strong><span>${esc(r.role)}</span></span>
      <span class="inv-date">${esc(r.dates)}</span>
      <span class="inv-go" aria-hidden="true">${I.up}</span>
    </a></li>`).join('')}</ul>`;
}

// The project viewer: a list of builds beside a CAD-style viewport that previews the hovered one.
function bench() {
  const items = home.builds.map((b) => ({ ...b, p: bySlug[b.slug] }));
  const fileOf = (b) => (b.media ? `${b.slug}/${b.media}.${MEDIA.videos[b.media] ? 'mp4' : 'webp'}` : `${b.slug}/schematic.svg`);
  const list = items.map((b, i) => `<li><a class="br${i === 0 ? ' is-on' : ''}" href="/work/${b.slug}/" data-key="${b.slug}" data-file="${esc(b.p.year)}">
      <span class="br-title">${esc(b.p.title)}</span>
      <span class="br-tags">${esc(b.p.tags.slice(0, 3).join(' · '))}</span>
      <span class="br-thumb" aria-hidden="true">${b.media ? (MEDIA.videos[b.media] ? `<img src="/assets/media/${MEDIA.videos[b.media].dir}/${b.media}.webp" alt="" loading="lazy">` : picture(b.media, { sizes: '96px' })) : LOOP_SCHEMATIC}</span>
      <span class="br-go" aria-hidden="true">${I.up}</span>
    </a></li>`).join('');
  const stage = items.map((b, i) => {
    const m = b.media ? (MEDIA.videos[b.media] || MEDIA.images[b.media]) : null;
    const fit = m && m.w / m.h > 1.25 ? ' is-contain' : '';
    return `<div class="vp-item${fit}${i === 0 ? ' is-on' : ''}" data-key="${b.slug}">${b.media ? mediaFor(b.media, '(max-width: 900px) 1px, 440px') : LOOP_SCHEMATIC}</div>`;
  }).join('');
  const first = items[0];
  return `<div class="bench" data-bench>
    <ol class="bench-list">${list}</ol>
    <div class="vp" aria-hidden="true">
      
      <div class="vp-stage" data-vp-stage>
        ${stage}
      </div>
      <div class="vp-foot"><span data-vp-title>${esc(first.p.title)}</span><span data-vp-sub>${esc(first.p.subtitle)}</span></div>
    </div>
  </div>`;
}

// Bill of materials: tools, what each is for, and how many projects use it.
// The main tools: logo, name, what it's for.
const MAIN_TOOLS = ['SolidWorks', 'ANSYS Fluent', 'MATLAB', 'Python', 'Arduino', 'Bambu Lab', 'ProtoTRAK', 'Excel Power Query'];
function bom() {
  const rows = MAIN_TOOLS.map((n) => skills.find((s) => s.name === n)).filter(Boolean).map((s) => {
    const art = s.logo ? `<img src="${s.logo}" alt="" loading="lazy">` : s.icon ? brandIcon(s.icon) : `<span class="bom-word">${esc(s.word || '')}</span>`;
    return `<li class="tool"><span class="bom-logo${s.wide ? ' is-wide' : ''}">${art}</span><span class="tool-name">${esc(s.name === 'Excel Power Query' ? 'Excel' : s.name)}</span><span class="tool-use">${esc(s.cat)}</span></li>`;
  }).join('');
  return `<ul class="tools">${rows}</ul>`;
}

function homePage() {
  const body = `
<section class="hero" data-hero>
  <div class="wrap hero-c">
    <h1 class="sig" data-sig>Dylan Thompson</h1>
    <p class="hero-tag">${md(home.tagline)}</p>
  </div>
  <a class="scroll-hint" href="#intro" data-scroll-hint aria-label="Scroll down"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M6 13l6 6 6-6"/></svg></a>
</section>

<section class="intro" id="intro">
  <div class="wrap intro-grid">
    <figure class="intro-fig">
      <button class="stack" data-stack aria-label="Show the next photo of Dylan">
        ${home.photos.map((name, i) => `<span class="stack-card ${i === 0 ? 'is-front' : 'is-back'}">${picture(name, { alt: site.name, sizes: '(max-width: 760px) 74vw, 360px', eager: i === 1 })}</span>`).join('')}
      </button>
    </figure>
    <div class="intro-copy">
      ${home.about.map((t) => `<p>${md(t)}</p>`).join('')}
      <div class="hero-actions">
        <a class="btn btn-ink" href="${site.resume}" target="_blank" rel="noopener">${I.down}<span>Resume</span></a>
        <button class="btn btn-line" data-copy="${esc(site.email)}"><span class="i-copy">${I.copy}</span><span class="i-check">${I.check}</span><span>${esc(site.email)}</span></button>
      </div>
    </div>
  </div>
</section>

<section class="sec" id="experience">
  <div class="wrap">
    ${sheetHead('A', 'Work experience', shLink('/experience/', 'Full experience'))}
    <div class="xgrid">${home.featured.map((id) => experience.find((x) => x.id === id)).map(xpCard).join('')}</div>
  </div>
</section>

<section class="sec" id="builds">
  <div class="wrap">
    ${sheetHead('B', 'Projects', shLink('/work/', 'All projects'))}
    ${bench()}
  </div>
</section>

<section class="sec" id="tools">
  <div class="wrap">
    ${sheetHead('C', 'Tools')}
    ${bom()}
  </div>
</section>

<section class="sec" id="ai">
  <div class="wrap">
    ${sheetHead('D', 'AI')}
    <div class="ai">${home.ai.map((t) => `<p>${md(t)}</p>`).join('')}</div>
  </div>
</section>

<section class="sec" id="photography">
  <div class="wrap">
    ${sheetHead('E', 'Photography', shLink('/photography/', 'See all'))}
    <div class="prow" data-gallery>
      ${['photo-img-9280', 'photo-24-07-08-2357', 'photo-img-7161', 'photo-img-7856', 'photo-img-8310'].filter((k) => MEDIA.images[k]).map((k) => `<figure>${picture(k, { alt: 'Photo by Dylan Thompson', sizes: '(max-width: 760px) 46vw, 200px', attrs: ' data-zoom' })}</figure>`).join('')}
    </div>
  </div>
</section>

${contactBlock()}`;
  const jsonld = `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org', '@type': 'Person', name: site.name, url: site.url, email: `mailto:${site.email}`,
    jobTitle: 'Mechanical Engineering Student', alumniOf: education.school, sameAs: [site.linkedin, site.github],
  })}</script>\n`;
  return layout({ path: '/', body, jsonld, section: 'home' });
}

// ─── inner pages ────────────────────────────────────────────────────────────

const LETTERS = 'ABCDEFGHIJKLMNOP';

function pageHead(title, lede = '') {
  return `<section class="ph">
  <div class="wrap">
    <h1 class="ph-title">${title}</h1>
    ${lede ? `<p class="ph-lede">${lede}</p>` : ''}
  </div>
</section>`;
}

function contactBlock() {
  return `<section class="sec sec-contact" id="contact">
  <div class="wrap">
    <div class="contact">
      <h2>Let’s talk</h2>
      <p>Open to internships, co-ops, research, and conversations about engineering.</p>
      <div class="contact-row">
        <a class="contact-mail" href="mailto:${esc(site.email)}">${esc(site.email)}</a>
        <button class="copy-btn" data-copy="${esc(site.email)}" aria-label="Copy email address"><span class="i-copy">${I.copy}</span><span class="i-check">${I.check}</span></button>
        <span class="contact-links">
          <a href="${site.linkedin}" target="_blank" rel="noopener">LinkedIn</a>
          <a href="${site.github}" target="_blank" rel="noopener">GitHub</a>
          <a href="${site.resume}" target="_blank" rel="noopener">Resume</a>
          ${(site.social || []).map((x) => `<a href="${x.url}" target="_blank" rel="noopener">${esc(x.label)}</a>`).join('')}
        </span>
      </div>
    </div>
  </div>
</section>`;
}

const projMedia = (p, sizes) => (p.cover ? picture(p.cover, { alt: '', sizes }) : `<span class="sch-panel">${LOOP_SCHEMATIC}</span>`);

function workCard(slug, size) {
  const p = bySlug[slug];
  const big = size === 'L';
  return `<a class="wc${big ? ' is-big' : ''}" href="/work/${p.slug}/" data-vt-card data-filters="${p.filters.join(' ')}">
    <div class="wc-media">${projMedia(p, big ? '(max-width: 760px) 92vw, 760px' : '(max-width: 760px) 92vw, 380px')}<span class="pill">${esc(p.year)}</span></div>
    <div class="wc-body">
      <h3>${esc(p.title)}</h3>
      <p class="wc-sub">${esc(p.subtitle)}</p>
      <p class="wc-card">${md(p.card)}</p>
      <p class="wc-tags">${esc(p.tags.slice(0, 4).join(' · '))}</p>
    </div>
  </a>`;
}

function workPage() {
  const rows = projects.map((p) => `<li><a class="pl-row" href="/work/${p.slug}/" data-vt-card>
      <span class="pl-thumb">${projMedia(p, '120px')}</span>
      <span class="pl-main"><span class="pl-title">${esc(p.title)}</span><span class="pl-sub">${esc(p.subtitle)}</span></span>
      <span class="pl-year">${esc(p.year)}</span>
      <span class="pl-go" aria-hidden="true">${I.arrow}</span>
    </a></li>`).join('');
  const body = `
${pageHead('Projects')}
<section class="sec sec-tight">
  <div class="wrap"><ol class="plist">${rows}</ol></div>
</section>
${contactBlock()}`;
  return layout({ path: '/work/', title: 'Projects', section: 'work', body, description: 'Projects by Dylan Thompson: GE Vernova, ASME robotics, heat pipe research, CNC machining, and more.' });
}

function projectPage(p, idx) {
  const next = projects[(idx + 1) % projects.length];
  const models = p.sections.flatMap((s) => (s.media || []).filter((m) => m.type === 'model')).concat(p.models || []);
  const hero = p.cover
    ? `<figure class="proj-hero" data-gallery>${picture(p.cover, { alt: p.title, sizes: '(max-width: 1240px) 94vw, 1200px', eager: true, attrs: ' data-vt-hero data-zoom' })}</figure>`
    : `<figure class="proj-hero is-schematic">${LOOP_SCHEMATIC}<figcaption>Planned loop. Photos coming as the build progresses.</figcaption></figure>`;
  const spec = `<dl class="spec">${p.meta.map(([k, v]) => `<div class="spec-cell"><dt>${esc(k)}</dt><dd>${md(v)}</dd></div>`).join('')}</dl>`;
  const stats = (p.stats || []).length
    ? `<div class="stats">${p.stats.map((s) => `<div class="stat"><b ${s.n != null ? `data-count="${s.n}" data-suffix="${s.suffix || ''}"` : ''}>${s.n != null ? `${s.n}${s.suffix || ''}` : esc(s.text)}</b><span>${esc(s.label)}</span></div>`).join('')}</div>`
    : '';
  const kicker = (k = '') => k.replace(/^\d+\s*·\s*/, '');
  const chapters = p.sections.map((s, i) => {
    const media = (s.media || []).filter((m) => m.type !== 'model');
    return `<section class="ch${media.length ? '' : ' no-media'}">
      <div class="ch-text">
        <div class="ch-kick">${esc(kicker(s.kicker))}</div>
        <h2>${esc(s.title)}</h2>
        <div class="ch-body">${paras(s.body)}${bullets(s.bullets)}</div>
      </div>
      ${media.length ? `<div class="ch-media">${carousel(media, { label: s.title })}</div>` : ''}
    </section>`;
  }).join('');
  const n = p.sections.length;
  const learnings = (p.learnings || []).length
    ? `<section class="proj-block">${sheetHead(LETTERS[n], 'What I learned')}
        <div class="learn">${p.learnings.map((l) => `<div class="learn-card"><h3>${esc(l.title)}</h3><p>${md(l.body)}</p></div>`).join('')}</div></section>`
    : '';
  const gallery = (p.gallery || []).length
    ? `<section class="proj-block">${sheetHead(LETTERS[n + (learnings ? 1 : 0)], 'More photos')}
        <div class="pgal" data-gallery>${p.gallery.map((m) => `<figure>${picture(m.name, { alt: m.cap, sizes: '(max-width: 760px) 46vw, 290px', attrs: ' data-zoom' })}${m.cap ? `<figcaption>${esc(m.cap)}</figcaption>` : ''}</figure>`).join('')}</div></section>`
    : '';
  const modelBlock = models.length ? `<section class="proj-block">${models.map(modelEl).join('')}</section>` : '';
  const body = `
<article class="proj">
  <div class="wrap">
    <a class="back" href="/work/">${I.back}<span>All projects</span></a>
    <header class="proj-head">
      <p class="proj-sub">${esc(p.subtitle)}</p>
      <h1>${esc(p.title)}</h1>
      <p class="proj-lede">${md(p.lead)}</p>
    </header>
    ${spec}
    ${hero}
    ${stats}
    <div class="chapters">${chapters}</div>
    ${learnings}
    ${gallery}
    ${modelBlock}
    <a class="next" href="/work/${next.slug}/" data-vt-card>
      <span class="next-k">Next project</span>
      <span class="next-t">${esc(next.title)}</span>
      <span class="next-go" aria-hidden="true">${I.arrow}</span>
    </a>
  </div>
</article>
${contactBlock()}`;
  const image = p.cover ? `/assets/media/${MEDIA.images[p.cover].dir}/${p.cover}-1280.webp` : undefined;
  return layout({ path: `/work/${p.slug}/`, title: p.title, section: 'work', body, description: plain(p.lead), models: models.length > 0, image });
}

function experiencePage() {
  const role = (x, sub) => `<div class="${sub ? 'xl-sub' : 'xl-one'}" id="${x.id}">
      ${sub ? `<div class="xl-subhead"><h3>${esc(x.role)}</h3><span class="xl-date">${esc(x.dates)}</span></div><p class="xl-org">${esc(x.org.replace(/^UCF /, ''))}<span class="chip">${esc(x.kind)}</span></p>`
            : `<p class="xl-role">${esc(x.role)}<span class="chip">${esc(x.kind)}</span></p>`}
      ${x.bullets.length ? bullets(x.bullets) : `<p>${md(x.summary)}</p>`}
      ${x.project ? `<a class="xl-more" href="/work/${x.project}/">See the project ${I.up}</a>` : ''}
    </div>`;
  const entries = xpGroups().map((g) => g.items.length === 1
    ? `<li class="xl-item">
      <div class="xl-side"><img class="xl-logo" src="${g.logo}" alt="${esc(g.items[0].org)} logo" loading="lazy"><span class="xl-date">${esc(g.items[0].dates)}</span></div>
      <div class="xl-main"><h2>${esc(g.items[0].org)}</h2>${role(g.items[0], false)}</div>
    </li>`
    : `<li class="xl-item">
      <div class="xl-side"><img class="xl-logo" src="${g.logo}" alt="University of Central Florida logo" loading="lazy"><span class="xl-date">${g.items.length} roles</span></div>
      <div class="xl-main"><h2>University of Central Florida</h2><div class="xl-subs">${g.items.map((x) => role(x, true)).join('')}</div></div>
    </li>`).join('');
  const certRows = certifications.map((c) => `<tr>
      <td class="bom-tool"><span class="bom-logo${c.wide ? ' is-wide' : ''}">${c.icon ? brandIcon(c.icon) : `<img src="${c.logo}" alt="" loading="lazy">`}</span>${esc(c.name)}</td>
      <td class="bom-cat">${esc(c.issuer)}${c.id ? `<span class="cert-id">ID ${esc(c.id)}</span>` : ''}</td>
      <td class="cert-date">${esc(c.date)}</td>
      <td class="cert-go">${c.url ? `<a href="${c.url}" target="_blank" rel="noopener" aria-label="Verify ${esc(c.name)}">Verify ${I.up}</a>` : ''}</td>
    </tr>`).join('');
  const body = `
${pageHead('Experience', `Industry, research, and team roles. The one-page version is my <a href="${site.resume}" target="_blank" rel="noopener">resume</a>.`)}
<section class="sec sec-tight">
  <div class="wrap">
    ${sheetHead('A', 'Roles')}
    <ol class="xl">${entries}</ol>
  </div>
</section>
<section class="sec">
  <div class="wrap">
    ${sheetHead('B', 'Education')}
    <div class="edu">
      <img class="edu-logo" src="${education.logo}" alt="${esc(education.school)} logo" width="117" height="157">
      <div><h3>${esc(education.degree)}</h3><p>${esc(education.school)} · ${esc(education.detail)}</p></div>
    </div>
  </div>
</section>
<section class="sec">
  <div class="wrap">
    ${sheetHead('C', 'Certifications')}
    <div class="bom-wrap"><table class="bom certs">
      <thead><tr><th>Certification</th><th class="bom-cat">Issuer</th><th>Date</th><th><span class="sr">Link</span></th></tr></thead>
      <tbody>${certRows}</tbody>
    </table></div>
  </div>
</section>
${contactBlock()}`;
  return layout({ path: '/experience/', title: 'Experience', section: 'experience', body, description: 'Experience: Lockheed Martin, GE Vernova, UCF Interfacial Transport Lab, ASME, Baja SAE, and more.' });
}

function aboutPage() {
  const [main, back] = about.photos;
  const body = `
${pageHead('About')}
<section class="sec sec-tight">
  <div class="wrap about-row about-page">
    <figure class="about-fig">
      <span class="about-back" aria-hidden="true"></span>
      ${picture(main.name, { alt: site.name, sizes: '(max-width: 760px) 80vw, 380px', eager: true })}
    </figure>
    <div class="about-copy">
      <p class="about-lead">${md(about.lead)}</p>
      ${paras(about.body)}
      <ul class="hobbies" aria-label="Outside of work">${about.hobbies.map((h) => `<li>${esc(h)}</li>`).join('')}</ul>
    </div>
  </div>
</section>
<section class="sec">
  <div class="wrap">
    ${sheetHead('A', 'Outside of engineering', shLink('/photography/', 'Photography'))}
    <div class="life" data-gallery>${about.life.map((m, i) => `<figure class="life-${i}">${picture(m.name, { alt: m.cap, sizes: '(max-width: 760px) 46vw, 300px', attrs: ' data-zoom' })}<figcaption>${esc(m.cap)}</figcaption></figure>`).join('')}</div>
  </div>
</section>
${contactBlock()}`;
  return layout({ path: '/about/', title: 'About', section: 'about', body, description: plain(about.lead) });
}

function photographyPage() {
  // Interleave landscape and portrait so the wall mixes shapes.
  const land = PHOTOS.filter((k) => MEDIA.images[k].w >= MEDIA.images[k].h);
  const port = PHOTOS.filter((k) => MEDIA.images[k].w < MEDIA.images[k].h);
  const order = [];
  while (land.length || port.length) { if (port.length) order.push(port.shift()); if (land.length) order.push(land.shift()); if (port.length) order.push(port.shift()); }
  const body = `
${pageHead('Photography', 'Something I’ve gotten into recently. Mostly trips, cities, and things I notice day to day.')}
<section class="sec sec-tight">
  <div class="wrap">
    <div class="pwall" data-gallery>${order.map((k) => `<figure>${picture(k, { sizes: '(max-width: 560px) 92vw, (max-width: 1000px) 46vw, 400px', attrs: ' data-zoom' })}</figure>`).join('')}</div>
  </div>
</section>
${contactBlock()}`;
  return layout({ path: '/photography/', title: 'Photography', section: 'photography', body, description: 'Photography by Dylan Thompson.' });
}

function notFoundPage() {
  const body = `
${pageHead('Not found', 'This page didn’t make it off the machine. The link may be old, or the page moved.')}
<section class="sec sec-tight"><div class="wrap"><a class="btn btn-ink" href="/">${I.back}<span>Go to the homepage</span></a></div></section>`;
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
if (!existsSync(og)) {
  const sharp = (await import('sharp')).default;
  const sunset = MEDIA.images.sunset;
  await sharp(join(ROOT, 'assets', 'media', sunset.dir, `sunset-${sunset.sizes.at(-1)}.webp`)).resize(1200, 630, { fit: 'cover' }).jpeg({ quality: 82 }).toFile(og);
}
// Favicon files (assets/favicon-dt.svg, apple-touch-icon-dt.png, favicon.ico) are generated
// from the script initials; see the commit that added them.

console.log(`built ${urls.length + 1} pages`);
