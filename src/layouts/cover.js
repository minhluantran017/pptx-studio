import { M } from './shared.js';

export function addCover(pptx, profile) {
  const slide = pptx.addSlide();
  slide.background = { color: profile.background };
  slide.addShape(pptx.ShapeType.rect, {
    x: 9.72, y: 0, w: 3.613, h: 7.5,
    line: { color: profile.accentSoft, transparency: 100 },
    fill: { color: profile.accentSoft },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 10.45, y: 1.22, w: 1.8, h: 1.8,
    line: { color: profile.accent, transparency: 100 },
    fill: { color: profile.accent },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 11.06, y: 3.18, w: 1.19, h: 1.19,
    line: { color: profile.foreground, transparency: 100 },
    fill: { color: profile.foreground },
  });
  slide.addText('FIELDNOTE  /  01', {
    x: M, y: 0.7, w: 3.4, h: 0.25, fontFace: 'Aptos', fontSize: 9,
    bold: true, charSpacing: 1.4, color: profile.accent, margin: 0,
  });
  slide.addText('A resilient cloud\nplatform, built to\nscale with the business', {
    x: M, y: 1.78, w: 8.5, h: 2.35, fontFace: 'Aptos', fontSize: 34,
    bold: true, breakLine: false, color: profile.foreground, margin: 0,
    valign: 'mid', lineSpacingMultiple: 0.92,
  });
  slide.addText('A 12-month modernization proposal', {
    x: M, y: 4.42, w: 7.8, h: 0.4, fontFace: 'Aptos', fontSize: 17,
    color: profile.muted, margin: 0,
  });
  slide.addText('Illustrative scenario  ·  October 2026', {
    x: M, y: 6.55, w: 6.4, h: 0.25, fontFace: 'Aptos', fontSize: 10,
    color: profile.muted, margin: 0,
  });
  return slide;
}
