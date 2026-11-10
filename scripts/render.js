import { spawnSync } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pptx = path.join(root, 'output', 'sample-modernization.pptx');
const pdf = path.join(root, 'output', 'sample-modernization.pdf');
const slidesDir = path.join(root, 'output', 'slides');
await fs.rm(pdf, { force: true });
await fs.rm(slidesDir, { recursive: true, force: true });
await fs.mkdir(slidesDir, { recursive: true });

function run(command, args) {
  const result = spawnSync(command, args, { stdio: 'inherit' });
  if (result.error?.code === 'ENOENT') {
    throw new Error(`${command} is required. See README.md for WSL2 installation instructions.`);
  }
  if (result.status !== 0) throw new Error(`${command} exited with status ${result.status}`);
}

await fs.access(pptx);
run('libreoffice', ['--headless', '--convert-to', 'pdf', '--outdir', path.dirname(pdf), pptx]);
run('pdftoppm', ['-png', '-r', '144', pdf, path.join(slidesDir, 'slide')]);
console.log(`Rendered PDF and slide images under ${path.relative(root, path.dirname(pdf))}`);
