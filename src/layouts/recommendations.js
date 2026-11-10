import { addRule, addText, addTitle, M } from './shared.js';

export function addRecommendations(pptx, profile) {
  const slide = pptx.addSlide('CONTENT');
  addTitle(slide, profile, '05  /  Recommendation', 'Fund the foundation. Prove the case. Scale with evidence.', 'Three decisions keep the program focused and give leadership clear control points.');
  const rows = [
    ['01', 'Authorize discovery', 'Name service owners and agree the business outcomes and baseline measures.'],
    ['02', 'Stand up the platform team', 'Start the secure landing zone, delivery templates, and operating model in parallel.'],
    ['03', 'Release migration funding by gate', 'Commit the next workload wave only when pilot reliability and value targets are met.'],
  ];
  rows.forEach(([number, heading, copy], index) => {
    const y = 2.22 + index * 1.08;
    addRule(slide, profile, M, y, 11.95);
    addText(slide, number, { x: M, y: y + 0.25, w: 0.48, h: 0.25 }, profile, { fontSize: 10, bold: true, color: profile.accent });
    addText(slide, heading, { x: 1.48, y: y + 0.19, w: 3.2, h: 0.35 }, profile, { fontSize: 15, bold: true });
    addText(slide, copy, { x: 4.9, y: y + 0.17, w: 7.35, h: 0.5 }, profile, { fontSize: 11, color: profile.muted, breakLine: true });
  });
  addRule(slide, profile, M, 5.46, 11.95);
  slide.addShape('rect', { x: M, y: 5.8, w: 11.95, h: 0.58, line: { color: profile.foreground, transparency: 100 }, fill: { color: profile.foreground } });
  addText(slide, 'Next step', { x: M + 0.2, y: 5.95, w: 1.2, h: 0.22 }, profile, { fontSize: 10, bold: true, color: profile.accentSoft });
  addText(slide, 'Sponsor a 4-week discovery and return with a costed, sequenced migration plan.', { x: 2.1, y: 5.93, w: 9.9, h: 0.24 }, profile, { fontSize: 12, bold: true, color: profile.white });
  return slide;
}
