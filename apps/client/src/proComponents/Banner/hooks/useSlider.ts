import { Post } from '@funblog/types';
import { delay } from '@funblog/utils';
import { useState, useRef } from 'react';

enum SliderDirection {
  LEFT = 'left',
  RIGHT = 'right',
}
export default function useSlider(posts: Post[]) {
  const [current, setCurrent] = useState(0);
  const [sliding, setSliding] = useState<SliderDirection>();
  const ref = useRef({
    disabled: false,
  });
  const onSlider = (fn: () => void, direction: SliderDirection) => {
    return () => {
      if (ref.current.disabled) return;
      ref.current.disabled = true;
      setSliding(direction);
      fn();
      delay(800).then(() => {
        ref.current.disabled = false;
      });
    };
  };
  const onPrev = onSlider(() => {
    setCurrent((index) => {
      index--;
      if (index < 0) {
        return posts.length - 1;
      }
      return index;
    });
  }, SliderDirection.RIGHT);
  const onNext = onSlider(() => {
    setCurrent((index) => {
      index++;
      if (index > posts.length - 1) {
        return 0;
      }
      return index;
    });
  }, SliderDirection.LEFT);

  return {
    current,
    sliding,
    onPrev,
    onNext,
  };
}
