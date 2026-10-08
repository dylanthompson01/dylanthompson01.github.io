// Local dev server with live reload.
//   npm run dev   ->  http://localhost:4321
// Rebuilds the pages when src/ changes and refreshes the browser when anything changes.

import { createServer } from 'node:http';
import { createReadStream, existsSync, statSync, watch } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PORT = Number(process.env.PORT) || 4321;
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.mp4': 'video/mp4', '.pdf': 'application/pdf',
  '.glb': 'model/gltf-binary', '.gltf': 'model/gltf+json', '.xml': 'application/xml', '.txt': 'text/plain', '.ico': 'image/x-icon',
};
const RELOAD = `<script>new EventSource('/__reload').onmessage=()=>location.reload()</script>`;
const clients = new Set();

function build() {
  const r = spawnSync(process.execPath, [join(ROOT, 'src', 'build.mjs')], { encoding: 'utf8' });
  process.stdout.write(r.stdout || '');
  if (r.status !== 0) process.stderr.write(r.stderr);
}

function resolve(urlPath) {
  let p = normalize(join(ROOT, decodeURIComponent(urlPath.split('?')[0])));
  if (!p.startsWith(ROOT)) return null;
  if (existsSync(p) && statSync(p).isDirectory()) p = join(p, 'index.html');
  return existsSync(p) ? p : null;
}

createServer((req, res) => {
  if (req.url === '/__reload') {
    res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' });
    res.write('\n');
    clients.add(res);
    req.on('close', () => clients.delete(res));
    return;
  }
  const file = resolve(req.url) || null;
  const status = file ? 200 : 404;
  const path = file || join(ROOT, '404.html');
  if (!existsSync(path)) { res.writeHead(404); return res.end('Not found'); }
  const type = TYPES[extname(path).toLowerCase()] || 'application/octet-stream';

  if (type.startsWith('text/html')) {
    import('node:fs').then(({ readFileSync }) => {
      const html = readFileSync(path, 'utf8').replace('</body>', `${RELOAD}</body>`);
      res.writeHead(status, { 'Content-Type': type, 'Cache-Control': 'no-store' });
      res.end(html);
    });
    return;
  }

  // Range support so <video> can seek.
  const size = statSync(path).size;
  const range = req.headers.range && /bytes=(\d*)-(\d*)/.exec(req.headers.range);
  if (range) {
    const start = range[1] ? Number(range[1]) : 0;
    const end = range[2] ? Number(range[2]) : size - 1;
    res.writeHead(206, { 'Content-Type': type, 'Content-Range': `bytes ${start}-${end}/${size}`, 'Accept-Ranges': 'bytes', 'Content-Length': end - start + 1 });
    return createReadStream(path, { start, end }).pipe(res);
  }
  res.writeHead(status, { 'Content-Type': type, 'Content-Length': size, 'Accept-Ranges': 'bytes', 'Cache-Control': 'no-store' });
  createReadStream(path).pipe(res);
}).listen(PORT, () => console.log(`\n  Portfolio running at http://localhost:${PORT}\n`));

let timer;
const onChange = (rebuild) => () => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    if (rebuild) build();
    for (const c of clients) c.write('data: reload\n\n');
  }, 120);
};
build();
watch(join(ROOT, 'src'), { recursive: true }, onChange(true));
watch(join(ROOT, 'assets', 'css'), { recursive: true }, onChange(false));
watch(join(ROOT, 'assets', 'js'), { recursive: true }, onChange(false));
