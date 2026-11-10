import pptxgen from 'pptxgenjs';

export function createPresentation(profile) {
  const pptx = new pptxgen();
  pptx.layout = 'LAYOUT_WIDE';
  pptx.author = 'Pptx Studio';
  pptx.subject = 'Illustrative cloud modernization proposal';
  pptx.title = 'Cloud Platform Modernization';
  pptx.company = 'Pptx Studio';
  pptx.lang = 'en-US';
  pptx.theme = {
    headFontFace: 'Aptos',
    bodyFontFace: 'Aptos',
    lang: 'en-US',
  };
  pptx.defineSlideMaster({
    title: 'CONTENT',
    background: { color: profile.background },
    objects: [
      { line: { x: 0.62, y: 7.08, w: 12.08, h: 0, line: { color: profile.line, width: 0.7 } } },
      { text: { text: 'CLOUD PLATFORM MODERNIZATION  /  ILLUSTRATIVE', options: { x: 0.64, y: 7.17, w: 8.5, h: 0.14, fontFace: 'Aptos', fontSize: 7, color: profile.muted, margin: 0, breakLine: false } } },
    ],
    slideNumber: { x: 12.25, y: 7.14, w: 0.4, h: 0.2, color: profile.muted, fontFace: 'Aptos', fontSize: 8, align: 'right', margin: 0 },
  });
  return pptx;
}
