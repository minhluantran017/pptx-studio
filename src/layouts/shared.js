export const SW = 13.333;
export const SH = 7.5;
export const M = 0.68;

export function addTitle(slide, profile, eyebrow, title, subtitle = '') {
  slide.addText(eyebrow.toUpperCase(), {
    x: M, y: 0.42, w: 11.9, h: 0.22, fontFace: 'Aptos', fontSize: 9,
    bold: true, charSpacing: 1.2, color: profile.accent, margin: 0,
  });
  slide.addText(title, {
    x: M, y: 0.77, w: 12.0, h: 0.58, fontFace: 'Aptos', fontSize: 27,
    bold: true, color: profile.foreground, margin: 0, breakLine: false,
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: M, y: 1.42, w: 11.85, h: 0.38, fontFace: 'Aptos', fontSize: 12,
      color: profile.muted, margin: 0, breakLine: false,
    });
  }
}

export function addText(slide, text, box, profile, options = {}) {
  slide.addText(text, {
    ...box, fontFace: 'Aptos', fontSize: 13, color: profile.foreground,
    margin: 0, breakLine: false, valign: 'mid', ...options,
  });
}

export function addRule(slide, profile, x, y, w, color = profile.line) {
  slide.addShape('line', { x, y, w, h: 0, line: { color, width: 0.8 } });
}
