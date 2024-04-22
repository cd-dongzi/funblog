import { useScroll } from '@funblog/hooks';
import { ScrollProps } from '@funblog/hooks/types/src/useScroll';
import { isWindow } from '@funblog/utils';
import { useState, useCallback, useRef } from 'react';

function _getScrollY(container: HTMLElement | Window) {
  if (container === window) {
    return window.scrollY;
  } else {
    return (container as HTMLElement).scrollTop;
  }
}
function _getScrollX(container: HTMLElement | Window) {
  if (container === window) {
    return window.scrollX;
  } else {
    return (container as HTMLElement).scrollLeft;
  }
}
const getScrollY = (container: HTMLElement | Window) => {
  return isWindow() ? _getScrollY(container) : 0;
};
const getScrollX = (container: HTMLElement | Window) => {
  return isWindow() ? _getScrollX(container) : 0;
};

export default function useScrollValue(
  props = {} as Omit<ScrollProps, 'callback'> & {
    x?: boolean;
  },
) {
  const [value, setValue] = useState(0);
  const _getContainer = useRef(props.getContainer);
  _getContainer.current = props.getContainer;
  const callback = useCallback(() => {
    const container = _getContainer.current ? _getContainer.current() || window : window;
    const fn = props.x ? getScrollX : getScrollY;
    setValue(fn(container));
  }, [props.x]);
  useScroll({
    ...props,
    callback,
  });
  return value;
}
