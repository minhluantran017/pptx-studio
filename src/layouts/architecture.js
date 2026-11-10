import { addText, addTitle, M } from './shared.js';

function node(slide, profile, x, y, w, h, label, detail, fill = profile.white) {
  slide.addShape('rect', { x, y, w, h, line: { color: profile.line, width: 1 }, fill: { color: fill } });
  addText(slide, label, { x: x + 0.16, y: y + 0.12, w: w - 0.32, h: 0.32 }, profile, { fontSize: 15, bold: true });
  if (detail) addText(slide, detail, { x: x + 0.16, y: y + 0.56, w: w - 0.32, h: h - 0.64 }, profile, { fontSize: 12.5, color: profile.muted, valign: 'top', breakLine: true });
}

export function addArchitecture(pptx, profile) {
  const slide = pptx.addSlide('CONTENT');
  addTitle(slide, profile, '02  /  Target architecture', 'A secure platform with clear ownership', 'Illustrative AWS pattern — managed services reduce undifferentiated operational work.');
  const y = 2.48;
  const h = 1.25;
  const xs = [0.84, 2.94, 5.29, 8.19, 10.69];
  const ws = [1.65, 1.9, 2.45, 2.05, 1.8];
  const cy = y + h / 2;
  for (let i = 0; i < xs.length - 1; i++) {
    const from = xs[i] + ws[i];
    const to = xs[i + 1];
    slide.addShape('line', { x: from + 0.04, y: cy, w: to - from - 0.08, h: 0, line: { color: profile.accent, width: 1.3, endArrowType: 'triangle' } });
  }
  node(slide, profile, xs[0], y, ws[0], h, 'Users', 'Web · mobile');
  node(slide, profile, xs[1], y, ws[1], h, 'Edge', 'Route 53 · CloudFront', profile.palette.blueSoft);
  node(slide, profile, xs[2], y, ws[2], h, 'Application', 'ECS Fargate · API Gateway', profile.palette.blueSoft);
  node(slide, profile, xs[3], y, ws[3], h, 'Data services', 'Aurora · S3 · ElastiCache', profile.palette.greenSoft);
  node(slide, profile, xs[4], y, ws[4], h, 'Analytics', 'EventBridge · lake', profile.palette.purpleSoft);

  slide.addShape('rect', { x: 3.05, y: 4.08, w: 7.23, h: 0.84, line: { color: profile.line, width: 0.8, dash: 'dash' }, fill: { color: profile.white, transparency: 100 } });
  addText(slide, 'SHARED PLATFORM CONTROLS', { x: 3.28, y: 4.2, w: 3.1, h: 0.2 }, profile, { fontSize: 8, bold: true, charSpacing: 0.8, color: profile.accent });
  addText(slide, 'IAM Identity Center  ·  Control Tower  ·  CloudTrail  ·  CloudWatch  ·  CI/CD', { x: 3.28, y: 4.52, w: 6.65, h: 0.2 }, profile, { fontSize: 10, color: profile.muted });
  addText(slide, 'Design principles', { x: M, y: 5.5, w: 1.55, h: 0.26 }, profile, { fontSize: 11, bold: true });
  addText(slide, 'Private by default   /   Observable services   /   Infrastructure as code', { x: 2.45, y: 5.5, w: 9.8, h: 0.26 }, profile, { fontSize: 11, color: profile.muted });
  return slide;
}
