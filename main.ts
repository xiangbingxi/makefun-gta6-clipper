// gta6-clipper-01 entry program (Node 22, standard library only).
//
// All this program does is carry VIDEO.json from the repository into the
// output directory, where the house reads it. The video itself is the entry:
// the house reads its views straight from YouTube, so nothing this program
// writes about the video is scored.
//
// Run the way the grader does:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const src = join(botDir, 'VIDEO.json');
const dst = join(outDir, 'VIDEO.json');

const text = readFileSync(src, 'utf8');
const doc = JSON.parse(text);
if (typeof doc !== 'object' || doc === null || typeof doc.url !== 'string') {
  console.error('VIDEO.json must be an object with a url string');
  process.exit(1);
}
if (!/youtu\.?be/.test(doc.url)) {
  console.error('VIDEO.json url must point at a YouTube video');
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(dst, text);
