export const palette = {
  blue: '2166C1',
  blueSoft: 'E4F4FE',
  green: '176D3A',
  greenSoft: 'EAF8ED',
  purple: '6B51CF',
  purpleSoft: 'F0ECFD',
};

const shared = {
  background: 'FFFFFF',
  foreground: '0B1F3A',
  muted: '3F475E',
  line: 'DDE3EB',
  surface: 'F5F7F9',
  white: 'FFFFFF',
  palette,
};

export const profiles = {
  technical: { ...shared, accent: palette.blue, accentSoft: palette.blueSoft, label: 'TECHNICAL' },
  executive: { ...shared, accent: palette.green, accentSoft: palette.greenSoft, label: 'EXECUTIVE' },
  sales: { ...shared, accent: palette.purple, accentSoft: palette.purpleSoft, label: 'SALES' },
};
