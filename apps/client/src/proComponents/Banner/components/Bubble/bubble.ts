import { Direction } from './types';
import { createBubble } from './utils';

export interface Option {
  x: number;
  y: number;
  r: number;
  alpha: number;
  ySpeed: number;
  xSpeed: number;
  alphaSpeed: number;
}

export interface Base {
  width: number;
  height: number;
  direction?: Direction;
  interval?: number[];
}

export default class Bubble {
  maxWidth: number;
  maxHeight: number;
  x = 0;
  y = 0;
  r = 0;
  alpha = 0;
  ySpeed = 0;
  xSpeed = 0;
  alphaSpeed = 0;
  direction: Direction;
  interval?: number[];
  constructor({ width, height, direction = Direction.BOTTOM, interval }: Base) {
    this.maxWidth = width;
    this.maxHeight = height;
    this.direction = direction;
    this.interval = interval;
    this.init(
      createBubble({
        width: this.maxWidth,
        height: this.maxHeight,
        direction,
        interval,
      }),
    );
  }

  init({ x, y, r, alpha, ySpeed, xSpeed, alphaSpeed }: Option) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.alpha = alpha;
    this.ySpeed = ySpeed;
    this.xSpeed = xSpeed;
    this.alphaSpeed = alphaSpeed;
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
    ctx.fill();
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.alpha <= 0) {
      this.init(
        createBubble({
          width: this.maxWidth,
          height: this.maxHeight,
          direction: this.direction,
          interval: this.interval,
        }),
      );
    }
    if (this.direction === 'bottom') {
      this.y -= this.ySpeed;
    }
    if (this.direction === 'left') {
      this.x += this.xSpeed;
    }
    this.alpha -= this.alphaSpeed;
    this.render(ctx);
  }
}
