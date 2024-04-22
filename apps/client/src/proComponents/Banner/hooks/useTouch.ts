import React, { useEffect } from 'react';

const MAX_Y = 50;
const MIN_X = 50;
const DURATION = 500;

interface useTouchOptions {
  onPanLeft: () => void;
  onPanRight: () => void;
}
export default function useTouch(
  ref: React.MutableRefObject<HTMLDivElement | null>,
  { onPanLeft, onPanRight }: useTouchOptions,
) {
  useEffect(() => {
    let startX = 0;
    let startY = 0;
    let distX = 0;
    let distY = 0;
    let startTime = 0;
    let elapsedTime = 0;

    const handleStart = (obj: { x: number; y: number }) => {
      startX = obj.x;
      startY = obj.y;
      startTime = new Date().getTime(); // 记录触摸开始的时间
    };
    const handleEnd = (obj: { x: number; y: number }) => {
      distX = obj.x - startX;
      distY = obj.y - startY;
      elapsedTime = new Date().getTime() - startTime;
      // 检查滑动是否符合条件：纵向不超过50px，横向超过50px，且持续时间不超过500ms
      if (Math.abs(distY) <= MAX_Y && Math.abs(distX) >= MIN_X && elapsedTime <= DURATION) {
        if (distX > 0) {
          onPanRight();
        } else {
          onPanLeft();
        }
      }
    };

    ref.current?.addEventListener(
      'touchstart',
      (e) => {
        const touchObj = e.changedTouches[0];
        handleStart({
          x: touchObj.pageX,
          y: touchObj.pageY,
        });
        e.preventDefault();
      },
      { passive: false, capture: false },
    );

    ref.current?.addEventListener(
      'touchend',
      (e) => {
        const touchObj = e.changedTouches[0];
        handleEnd({
          x: touchObj.pageX,
          y: touchObj.pageY,
        });
        e.preventDefault();
      },
      { passive: false, capture: false },
    );
    ref.current?.addEventListener(
      'mousedown',
      (e) => {
        handleStart({
          x: e.pageX,
          y: e.pageY,
        });
        e.preventDefault();
      },
      { passive: false, capture: false },
    );

    ref.current?.addEventListener(
      'mouseup',
      (e) => {
        handleEnd({
          x: e.pageX,
          y: e.pageY,
        });
        e.preventDefault();
      },
      { passive: false, capture: false },
    );
  }, [ref, onPanRight, onPanLeft]);
}
