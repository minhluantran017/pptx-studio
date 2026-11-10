import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const slidesDir = path.join(root, 'output', 'slides');
const files = (await fs.readdir(slidesDir)).filter(name => /^slide-\d+\.png$/.test(name)).sort((a, b) => Number(a.match(/\d+/)[0]) - Number(b.match(/\d+/)[0]));
if (files.length === 0) throw new Error('No rendered slide PNGs found. Run `npm run render` first.');

const columns = 2;
const cellWidth = 640;
const cellHeight = 360;
const gutter = 24;
const rows = Math.ceil(files.length / columns);
const composites = await Promise.all(files.map(async (file, index) => ({
  input: await sharp(path.join(slidesDir, file)).resize(cellWidth, cellHeight, { fit: 'contain', background: '#FFFFFF' }).png().toBuffer(),
  left: gutter + (index % columns) * (cellWidth + gutter),
  top: gutter + Math.floor(index / columns) * (cellHeight + gutter),
})));

const output = path.join(root, 'output', 'contact-sheet.png');
await sharp({
  create: {
    width: gutter + columns * (cellWidth + gutter),
    height: gutter + rows * (cellHeight + gutter),
    channels: 3,
    background: '#E8EDF3',
  },
}).composite(composites).png().toFile(output);
console.log(`Wrote ${path.relative(root, output)} (${files.length} slides)`);
