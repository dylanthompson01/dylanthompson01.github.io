# dylanthompson01.github.io

Personal portfolio. Plain HTML/CSS/JS generated from one content file and served by GitHub Pages. There's no framework and no build step on the server.

## Run it locally

```bash
npm install     # first time only
npm run dev     # http://localhost:4321, rebuilds and reloads as you edit
```

## Where things live

| Path | What it is |
| --- | --- |
| `src/content.mjs` | **All text**: experience, projects, skills, about. Edit this. |
| `src/build.mjs` | Page templates. Turns content into the HTML files. |
| `assets/css/main.css` | All styling (colors and fonts are tokens at the top). |
| `assets/js/main.js` | Interactions: deck, carousels, lightbox, filters, reveals. |
| `assets/media/<project>/` | Web-ready photos (`.webp`) and videos (`.mp4`), one folder per project. |
| `assets/models/` | 3D models (`.glb`) for the interactive viewer. |
| `tools/optimize-media.mjs` | Converts raw photos/videos into `assets/media`. |
| `index.html`, `work/`, `about/`, `experience/`, `404.html` | **Generated.** Don't edit by hand. Run `npm run build`. |

Raw, full-size originals live **outside** the repo in `../media-originals/<project>/`.

## Common updates

**Change text / add a job:** edit `src/content.mjs`. The dev server rebuilds automatically (or run `npm run build`).

**Add photos or videos**
1. Drop the originals into `../media-originals/<project>/`.
2. Add a line for each under that folder in `tools/optimize-media.mjs`, e.g. `'gev-new-part': 'IMG_1234.jpeg'`.
3. `npm run media`. This resizes, converts to WebP/MP4, and strips GPS data.
4. Use it in `src/content.mjs`: `img('gev-new-part', 'Caption')` or `video('name', 'Caption')`.

**Add a 3D model (drag to rotate)**
1. In SolidWorks: *File → Save As → Extended Reality (\*.glb)*. For big assemblies, reduce the mesh detail in the export options (keep files under ~10 MB).
2. Put the file in `assets/models/`, e.g. `assets/models/lift-bracket.glb`.
3. In that project's section in `src/content.mjs`, add to `media`: `model('/assets/models/lift-bracket.glb', 'interactive lift bracket')`.

## Publish

```bash
npm run build
git add -A && git commit -m "Update portfolio" && git push
```
GitHub Pages serves the `main` branch root.
