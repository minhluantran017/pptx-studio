import { addText, addTitle, M } from './shared.js';

export function addSummary(pptx, profile) {
  const slide = pptx.addSlide('CONTENT');
  addTitle(slide, profile, '01  /  Executive summary', 'Modernize around outcomes', 'A focused platform program can improve delivery speed, resilience, and cost visibility.');
  const items = [
    ['01', 'Standardize the foundation', 'Create a secure landing zone and paved paths for product teams.'],
    ['02', 'Move in measured waves', 'Prioritize services by business value, dependency, and operational risk.'],
    ['03', 'Prove value as we go', 'Track lead time, service health, and unit cost against an agreed baseline.'],
  ];
  const accents = [profile.palette.blue, profile.palette.green, profile.palette.purple];
  const tints = [profile.palette.blueSoft, profile.palette.greenSoft, profile.palette.purpleSoft];
  const cardWidth = 3.9;
  const cardGap = 0.13;
  items.forEach(([number, heading, copy], index) => {
    const x = M + index * (cardWidth + cardGap);
    slide.addShape('rect', { x, y: 2.28, w: cardWidth, h: 2.56, line: { color: accents[index], transparency: 78, width: 0.8 }, fill: { color: tints[index] } });
    addText(slide, number, { x: x + 0.22, y: 2.5, w: 0.6, h: 0.3 }, profile, { fontSize: 14, bold: true, color: accents[index] });
    addText(slide, heading, { x: x + 0.22, y: 2.91, w: cardWidth - 0.44, h: 0.64 }, profile, { fontSize: 20, bold: true, valign: 'mid', breakLine: true });
    slide.addShape('line', { x: x + 0.22, y: 3.68, w: cardWidth - 0.44, h: 0, line: { color: accents[index], transparency: 65, width: 0.7 } });
    addText(slide, copy, { x: x + 0.22, y: 3.9, w: cardWidth - 0.44, h: 0.84 }, profile, { fontSize: 16, color: profile.muted, valign: 'top', breakLine: true, lineSpacingMultiple: 1.08 });
  });
  slide.addShape('rect', { x: M, y: 5.55, w: 11.95, h: 0.72, rectRadius: 0, line: { color: profile.accentSoft, transparency: 100 }, fill: { color: profile.accentSoft } });
  addText(slide, 'Decision requested', { x: M + 0.2, y: 5.73, w: 1.7, h: 0.28 }, profile, { fontSize: 11, bold: true, color: profile.accent });
  addText(slide, 'Approve discovery and the shared platform foundation as the first investment gate.', { x: M + 2.0, y: 5.7, w: 9.45, h: 0.34 }, profile, { fontSize: 13, bold: true });
  return slide;
}
