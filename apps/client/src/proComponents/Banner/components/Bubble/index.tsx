'use client';
import { useSize } from '@funblog/hooks';
import cls from 'classnames';
import { useEffect, useMemo, useRef, useState } from 'react';
import Bubble from './bubble';
import { Direction } from './types';

export interface BubbleProps {
  className?: string;
  direction?: Direction;
  interval?: number[];
}
function IBubble({ direction = Direction.BOTTOM, interval, className }: BubbleProps) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const size = useSize(ref);
  const total = useMemo(() => Math.ceil(size.width * 0.04), [size.width]);

  // 计算bubble总数
  useEffect(() => {
    if (total <= 0) return;
    const arr: Bubble[] = [];
    for (let i = 0; i < total; i++) {
      const b = new Bubble({
        width: size.width,
        height: size.height,
        direction,
        interval,
      });
      arr.push(b);
    }
    setBubbles(arr);
  }, [size, total, direction, interval]);
  // 渲染
  useEffect(() => {
    const ctx = ref.current?.getContext('2d');
    const render = () => {
      if (bubbles.length === 0 || !ctx) {
        return;
      }
      ctx.clearRect(0, 0, size.width, size.height);
      bubbles.forEach((bubble) => {
        bubble.draw(ctx);
      });
      requestAnimationFrame(render);
    };
    render();
  }, [size, bubbles]);
  return <canvas ref={ref} className={cls('h-full w-full', className)} width={size.width} height={size.height} />;
}

export default IBubble;
