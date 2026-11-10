import { addText, addTitle, M } from './shared.js';

export function addRoadmap(pptx, profile) {
  const slide = pptx.addSlide('CONTENT');
  addTitle(slide, profile, '03  /  Delivery plan', 'Sequence change in four value-led waves', 'Each phase ends with an evidence-based gate before the next commitment.');
  const phases = [
    ['Q1', 'Discover & prepare', 'Baseline services\nLanding zone\nMigration factory'],
    ['Q2', 'Prove the path', 'Pilot 2–3 services\nCI/CD templates\nOperational readiness'],
    ['Q3', 'Scale migration', 'Wave 1 workloads\nData modernization\nService ownership'],
    ['Q4', 'Optimize & transfer', 'Cost tuning\nResilience exercises\nTeam handover'],
  ];
  const start = M;
  const gap = 0.22;
  const width = (11.95 - gap * 3) / 4;
  slide.addShape('line', { x: start + 0.13, y: 2.52, w: 11.6, h: 0, line: { color: profile.line, width: 1 } });
  phases.forEach(([quarter, title, details], index) => {
    const x = start + index * (width + gap);
    const cx = x + 0.18;
    slide.addShape('ellipse', { x: cx, y: 2.4, w: 0.24, h: 0.24, line: { color: profile.accent, width: 1 }, fill: { color: profile.background } });
    addText(slide, quarter, { x, y: 2.93, w: width, h: 0.28 }, profile, { fontSize: 10, bold: true, color: profile.accent });
    addText(slide, title, { x, y: 3.34, w: width, h: 0.5 }, profile, { fontSize: 16, bold: true, valign: 'top', breakLine: true });
    addText(slide, details, { x, y: 4.12, w: width, h: 1.15 }, profile, { fontSize: 11, color: profile.muted, valign: 'top', breakLine: true, paraSpaceAfterPt: 7 });
  });
  addText(slide, 'Gates', { x: M, y: 5.78, w: 0.8, h: 0.25 }, profile, { fontSize: 10, bold: true });
  addText(slide, 'Architecture baseline   →   Pilot outcomes   →   Wave readiness   →   Benefits review', { x: 1.65, y: 5.78, w: 10.5, h: 0.25 }, profile, { fontSize: 10, color: profile.muted });
  return slide;
}
