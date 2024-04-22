import { Direction } from './types';

export const randomInterval = (min: number, max: number, decimal?: number) => {
  if (decimal) {
    return Number((Math.random() * (max - min) + min).toFixed(decimal));
  }
  return Number(Math.random() * (max - min) + min);
};

export const createBubble = ({
  width,
  height,
  direction,
  interval,
}: {
  width: number;
  height: number;
  direction: Direction;
  interval?: number[];
}) => {
  const r = randomInterval(6, 12);
  let x;
  let y;
  const isBottom = direction === Direction.BOTTOM;
  if (isBottom) {
    const start = interval ? interval[0] : r;
    const end = interval ? interval[1] : width - r;
    x = randomInterval(start, end);
    y = randomInterval(height + r, height * 2 - r);
  } else {
    const start = interval ? interval[0] : r;
    const end = interval ? interval[1] : height - r;
    x = -randomInterval(r, 400);
    y = randomInterval(start, end);
  }
  return {
    r,
    x,
    y,
    ySpeed: randomInterval(0.2, 0.6),
    xSpeed: randomInterval(0.2, 0.6),
    alpha: randomInterval(0.1, 0.4),
    alphaSpeed: isBottom ? randomInterval(0.0002, 0.0007) : randomInterval(0.0001, 0.0004),
  };
};
