import { addText, addTitle, M } from './shared.js';

export function addKpis(pptx, profile) {
  const slide = pptx.addSlide('CONTENT');
  addTitle(slide, profile, '04  /  Success measures', 'Set targets, then track the trend', 'Illustrative planning targets — replace with an agreed baseline during discovery.');
  const metrics = [
    ['2×', 'Deployment frequency'],
    ['−30%', 'Change lead time'],
    ['99.9%', 'Critical service SLO'],
  ];
  metrics.forEach(([value, label], index) => {
    const columnWidth = 3.5;
    const columnGap = 0.72;
    const x = M + index * (columnWidth + columnGap);
    addText(slide, value, { x, y: 2.18, w: columnWidth, h: 0.55 }, profile, { fontSize: 29, bold: true, color: profile.accent });
    addText(slide, label, { x, y: 2.82, w: columnWidth, h: 0.3 }, profile, { fontSize: 10, color: profile.muted });
  });
  slide.addChart(pptx.ChartType.bar, [{ name: 'Baseline index', labels: ['Release lead time', 'Deployments / month', 'Critical incidents'], values: [100, 100, 100] }, { name: 'Target index', labels: ['Release lead time', 'Deployments / month', 'Critical incidents'], values: [70, 200, 75] }], {
    x: 0.85, y: 3.55, w: 11.75, h: 2.35, catAxisLabelFontFace: 'Aptos', catAxisLabelFontSize: 10,
    valAxisLabelFontFace: 'Aptos', valAxisLabelFontSize: 9, valAxisMinVal: 0, valAxisMaxVal: 200,
    valAxisMajorUnit: 50, showLegend: true, legendPos: 'b', legendFontFace: 'Aptos', legendFontSize: 9,
    showTitle: false, showValue: false, showCatName: false, showValAxisTitle: false,
    showCatAxisTitle: false, showBorder: false,
    chartColors: [profile.line, profile.accent],
    showValAxis: true, showCatAxis: true,
    valGridLine: { color: profile.line, width: 0.5 },
    showDataLabel: false,
    layout: { x: 0.18, y: 0.05, w: 0.78, h: 0.73 },
  });
  return slide;
}
