import fs from 'node:fs/promises';
import path from 'node:path';
import JSZip from 'jszip';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const input = path.resolve(process.argv[2] ?? path.join(root, 'output', 'sample-modernization.pptx'));
const bytes = await fs.readFile(input);
const zip = await JSZip.loadAsync(bytes, { checkCRC32: true });
const entries = Object.keys(zip.files);
const slideFiles = entries.filter(name => /^ppt\/slides\/slide\d+\.xml$/.test(name));
const slideXml = await Promise.all(slideFiles.map(name => zip.file(name).async('string')));
const textCount = slideXml.reduce((count, xml) => count + (xml.match(/<a:t>/g) ?? []).length, 0);
const shapeCount = slideXml.reduce((count, xml) => count + (xml.match(/<p:sp>/g) ?? []).length, 0);
const chartCount = entries.filter(name => /^ppt\/charts\/chart\d+\.xml$/.test(name)).length;
const required = ['[Content_Types].xml', 'ppt/presentation.xml', 'ppt/_rels/presentation.xml.rels'];
const missing = required.filter(name => !entries.includes(name));

if (missing.length || slideFiles.length !== 6 || textCount < 40 || shapeCount < 40 || chartCount < 1) {
  throw new Error(`Invalid deck: missing=${missing.join(',') || 'none'}, slides=${slideFiles.length}, text=${textCount}, shapes=${shapeCount}, charts=${chartCount}`);
}
console.log(`Valid PPTX package: ${slideFiles.length} slides, ${shapeCount} editable shapes, ${textCount} text runs, ${chartCount} editable chart.`);
console.log(`File: ${input} (${bytes.length.toLocaleString()} bytes)`);
