// Converts raw photos/videos into web-ready assets.
//
//   ../media-originals/<folder>/<original>   ->   assets/media/<folder>/<name>-640.webp, -1280.webp, ...
//                                                  assets/media/<folder>/<name>.mp4 (+ .webp poster)
//
//   npm run media            (skips files already generated)
//   npm run media -- --force (regenerates every image; videos only if missing)
//
// To add media: drop the original into ../media-originals/<folder>/, add a line
// under that folder below, run `npm run media`, then use the name in src/content.mjs.

import sharp from 'sharp';
import ffmpeg from 'ffmpeg-static';
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, '..', 'media-originals');
const OUT = join(ROOT, 'assets', 'media');
const MANIFEST = join(ROOT, 'src', 'media.json');
const FORCE = process.argv.includes('--force');

// folder -> { output name: original file }
const MEDIA = {
  'fledge': {
    'fledge-dashboard': 'fledge-dashboard.png',
    'fledge-match': 'fledge-match.png',
    'fledge-autofill': 'fledge-autofill.png',
    'fledge-tracking': 'fledge-tracking.png',
    'fledge-card': 'fledge-card.png',
    'fledge-cover': 'fledge-cover.png',
  },
  'about': {
    'portrait': 'IMG_6228.jpeg',
    'sunset': 'IMG_6247.jpeg',
    'life-desk': 'IMG_0380.jpeg',
    'life-skate': 'IMG_0931.jpeg',
    'life-suit': 'IMG_3918.jpeg',
    'life-golf': 'IMG_7580.jpeg',
    'life-cooking': 'IMG_7810.jpeg',
    'life-positano': 'IMG_8306.jpeg',
    'life-water': 'DSC00187.jpeg',
  },
  'ge-vernova': {
    'gev-brand': 'gev-brand-hd.png',
    'gev-sign': 'IMG_6320.jpeg',
    'gev-building': 'IMG_6490.jpeg',
    'gev-brackets-table': 'IMG_6572.jpeg',
    'gev-brackets-row': 'IMG_6583.jpeg',
    'gev-paint-booth': 'IMG_6671.jpeg',
    'gev-office': 'IMG_6833.jpeg',
    'gev-display': 'IMG_6835.jpeg',
    'gev-lean-day': 'IMG_7081.jpeg',
    'gev-lounge': 'IMG_6904.jpeg',
  },
  'asme-robot': {
    'asme-kickoff': 'IMG_6208.jpeg',
    'asme-team': 'IMG_6212.jpeg',
    'asme-field': 'IMG_3938.jpeg',
    'asme-chassis-cad': 'IMG_4204.jpeg',
    'asme-chassis-print': 'IMG_4722.jpeg',
    'asme-electronics': 'IMG_4822.jpeg',
    'asme-gearbox': 'IMG_5368.jpeg',
    'asme-chassis-wheels': 'IMG_4823.jpeg',
    'asme-build-session': 'IMG_5702.jpeg',
    'asme-robot': 'IMG_5839.jpeg',
    'asme-competition': 'IMG_5742.jpeg',
    'asme-iefx-team': 'IMG_5742b.jpeg',
    'asme-iefx-duo': 'IMG_5768.jpeg',
    'asme-drive-1': 'robot_video2.mov',
    'asme-drive-2': 'robot_video3.mov',
    'asme-drive-3': 'robot_video4.mov',
  },
  'heat-pipe-research': {
    'php-imaging': 'IMG_4716.jpeg',
    'php-lab': 'IMG_3318.jpeg',
    'php-apparatus': 'IMG_3320.jpeg',
    'php-data': 'IMG_3988.jpeg',
    'php-rig': 'IMG_3943.jpeg',
  },
  'cnc-putter': {
    'putter-head': 'IMG_6734.jpeg',
    'putter-machining-1': 'putter_video1.mov',
    'putter-machining-2': 'putter_video2.mov',
  },
  'robotic-arm': {
    'arm-hero': 'IMG_3758.jpeg',
    'arm-wiring': 'IMG_3613.jpeg',
    'arm-mirror-1': 'arm_video1.mov',
    'arm-mirror-2': 'arm_video3.mov',
  },
  'baja-sae': {
    'baja-mill': 'IMG_4113.jpeg',
    'baja-mill-2': 'IMG_4114.jpeg',
  },
  'rc-boat': {
    'boat-cad': 'IMG_5526.png',
    'boat-printing': 'IMG_5927.jpeg',
    'boat-hull-raw': 'IMG_5208.jpeg',
    'boat-hull-painted': 'IMG_5322.jpeg',
    'boat-electronics': 'IMG_5386.jpeg',
    'boat-transom': 'IMG_5323.jpeg',
    'boat-pool': 'IMG_5536.jpeg',
    'boat-pool-run': 'boat_video1.mov',
  },
  'plant-watering': {
    'plant-hero': 'DSC_0729.jpeg',
    'plant-tall': 'plant-tall.jpeg',
  },
  'solidworks-certification': {
    'sw-cswa': 'IMG_3357.jpeg',
    'sw-funnel': 'IMG_3363.jpeg',
    'sw-bit': 'IMG_3285.jpeg',
    'sw-bit-drawing': 'IMG_3286.jpeg',
    'sw-bottle': 'IMG_2929.jpeg',
    'sw-disc': 'IMG_3359.jpeg',
    'sw-linkage': 'IMG_3362.jpeg',
    'sw-ship': 'IMG_3018.jpeg',
  },
};

const WIDTHS = [800, 1400, 2200];
const QUALITY = 90;
// Photos of people are shown large, so they get near-lossless quality.
const HIGH_QUALITY = new Set(['gev-brand', 'portrait', 'gev-lounge', 'fledge-dashboard', 'fledge-match', 'fledge-autofill', 'fledge-tracking', 'fledge-card']);
const VIDEO_EXT = new Set(['.mov', '.mp4', '.m4v']);

const manifest = existsSync(MANIFEST) ? JSON.parse(readFileSync(MANIFEST, 'utf8')) : { images: {}, videos: {} };

// Photography folder: every image dropped in is included automatically (named photo-<file>).
{
  const pdir = join(SRC, 'photography');
  if (existsSync(pdir)) {
    const { readdirSync } = await import('node:fs');
    MEDIA.photography = Object.fromEntries(readdirSync(pdir)
      .filter((f) => /\.(jpe?g|png|heic|webp|tiff?)$/i.test(f))
      .sort()
      .map((f) => ['photo-' + f.replace(/\.[^.]+$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-'), f]));
  }
}

for (const [dir, items] of Object.entries(MEDIA)) {
  const outDir = join(OUT, dir);
  mkdirSync(outDir, { recursive: true });

  for (const [name, file] of Object.entries(items)) {
    const src = join(SRC, dir, file);
    if (!existsSync(src)) { console.warn(`missing  ${dir}/${file}`); continue; }

    if (VIDEO_EXT.has(extname(file).toLowerCase())) {
      const out = join(outDir, `${name}.mp4`);
      const poster = join(outDir, `${name}.webp`);
      if (existsSync(out) && existsSync(poster) && manifest.videos[name]) continue;
      // Long side capped at 1280, 30fps, H.264 for universal playback, tagged bt709
      // (HDR/HLG sources are flattened to SDR), faststart so playback begins before download ends.
      execFileSync(ffmpeg, [
        '-y', '-loglevel', 'error', '-i', src,
        '-map', '0:v:0', '-map', '0:a:0?',
        '-vf', "scale='if(gt(iw,ih),min(1280,iw),-2)':'if(gt(iw,ih),-2,min(1280,ih))',fps=30,format=yuv420p",
        '-c:v', 'libx264', '-preset', 'slow', '-crf', '25', '-profile:v', 'high',
        '-color_primaries', 'bt709', '-color_trc', 'bt709', '-colorspace', 'bt709',
        '-c:a', 'aac', '-b:a', '96k', '-ac', '2',
        '-movflags', '+faststart', '-map_metadata', '-1', out,
      ]);
      const frame = execFileSync(ffmpeg, ['-loglevel', 'error', '-ss', '0.4', '-i', out, '-frames:v', '1', '-f', 'image2pipe', '-c:v', 'png', '-'], { maxBuffer: 64 * 1024 * 1024 });
      const meta = await sharp(frame).metadata();
      await sharp(frame).webp({ quality: 70 }).toFile(poster);
      manifest.videos[name] = { dir, w: meta.width, h: meta.height };
      console.log(`video  ${dir}/${name}  ${meta.width}x${meta.height}`);
      continue;
    }

    if (manifest.images[name] && existsSync(join(outDir, `${name}-${WIDTHS[0]}.webp`)) && !FORCE) continue;
    // .rotate() applies EXIF orientation; sharp strips all metadata (including GPS) by default.
    const { data, info } = await sharp(src).rotate().toBuffer({ resolveWithObject: true });
    const { width: w, height: h } = info;
    const sizes = [...new Set(WIDTHS.map((x) => Math.min(x, w)))];
    for (const tw of sizes) {
      const q = HIGH_QUALITY.has(name) ? 92 : QUALITY;
      await sharp(data).resize({ width: tw, kernel: 'lanczos3' }).webp({ quality: q, smartSubsample: true, effort: 6 }).toFile(join(outDir, `${name}-${tw}.webp`));
    }
    const lqip = await sharp(data).resize({ width: 20 }).webp({ quality: 40 }).toBuffer();
    manifest.images[name] = { dir, w, h, sizes, lqip: `data:image/webp;base64,${lqip.toString('base64')}` };
    console.log(`image  ${dir}/${name}  ${w}x${h} -> ${sizes.join(', ')}`);
  }
}

writeFileSync(MANIFEST, JSON.stringify(manifest, null, 1));
console.log('media manifest written');
