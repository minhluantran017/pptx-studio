import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createPresentation } from './core/presentation.js';
import { profiles } from './profiles/index.js';
import { addCover } from './layouts/cover.js';
import { addSummary } from './layouts/summary.js';
import { addArchitecture } from './layouts/architecture.js';
import { addRoadmap } from './layouts/roadmap.js';
import { addKpis } from './layouts/kpi.js';
import { addRecommendations } from './layouts/recommendations.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'output');
const destination = path.join(outDir, 'sample-modernization.pptx');
const profile = profiles.technical;
const pptx = createPresentation(profile);

addCover(pptx, profile);
addSummary(pptx, profile);
addArchitecture(pptx, profile);
addRoadmap(pptx, profile);
addKpis(pptx, profile);
addRecommendations(pptx, profile);

await fs.mkdir(outDir, { recursive: true });
await pptx.writeFile({ fileName: destination });
console.log(`Wrote ${path.relative(root, destination)} (${pptx._slides.length} slides)`);
