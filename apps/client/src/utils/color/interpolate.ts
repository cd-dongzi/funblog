function parseRGBString(rgbString: string) {
  const match = rgbString.match(/rgb\((\d+),(\d+),(\d+)\)/);
  if (match) {
    return [parseInt(match[1], 10), parseInt(match[2], 10), parseInt(match[3], 10)];
  }
  return null;
}

export function colorGradient(rgbString1: string, rgbString2: string, steps = 10) {
  const rgb1 = parseRGBString(rgbString1);
  const rgb2 = parseRGBString(rgbString2);
  if (!rgb1 || !rgb2) {
    throw new Error('Invalid input color format');
  }

  const r1 = rgb1[0];
  const g1 = rgb1[1];
  const b1 = rgb1[2];

  const r2 = rgb2[0];
  const g2 = rgb2[1];
  const b2 = rgb2[2];

  const interpolatedColors = [];

  for (let i = 0; i <= steps; i++) {
    const factor = i / steps;
    const interpolatedR = Math.round(r1 + (r2 - r1) * factor);
    const interpolatedG = Math.round(g1 + (g2 - g1) * factor);
    const interpolatedB = Math.round(b1 + (b2 - b1) * factor);
    interpolatedColors.push(`rgba(${interpolatedR}, ${interpolatedG}, ${interpolatedB})`);
  }

  return interpolatedColors;
}

export function colorGradientToDark(rgbString: string, steps?: number) {
  return colorGradient(rgbString, 'rgb(0,0,0)', steps);
}
