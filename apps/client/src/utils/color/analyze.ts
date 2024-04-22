import { getImageData, getCounts } from './helpers';

interface Opts {
  ignore?: string[];
  scale?: number;
  skipTransparentPixels?: boolean;
}

const defaultOpts: Opts = {
  ignore: [],
  scale: 1,
};

interface Color {
  color: string;
  count: number;
}

export async function analyze(
  src: string,
  opts: Opts = defaultOpts,
): Promise<{
  palette: Color[];
  primary: Color;
  secondary: Color;
}> {
  opts = { ...defaultOpts, ...opts };

  const {
    ignore = [], // for example, to ignore white and black:  [ 'rgb(0,0,0)', 'rgb(255,255,255)' ]
    scale = 1, // 0 = best performance, lowest fidelity
    // 1 = best fidelity, worst performance
  } = opts;

  if (scale > 1 || scale <= 0) {
    console.warn(`You set scale to ${scale}, which isn't between 0-1. This is either pointless (> 1) or a no-op (≤ 0)`);
  }

  const data = await getImageData(src, scale);
  const palette = getCounts(data, ignore) as Color[];
  return { palette, primary: palette[0], secondary: palette[1] };
}
