import { useEffect, useRef } from 'react';
import { debounceFn } from './utils';

export interface ScrollProps {
  debounce?: boolean;
  delay?: number;
  callback: (e?: Event) => void;
  getContainer?: () => HTMLElement | null | undefined;
}
export default function useScroll({ debounce, delay, callback, getContainer }: ScrollProps) {
  const ref = useRef(callback);
  const _getContainer = useRef(getContainer);
  ref.current = callback;
  _getContainer.current = getContainer;
  useEffect(() => {
    const _fn = (e?: Event) => {
      ref.current(e);
    };
    const fn = debounce ? debounceFn(_fn, delay) : _fn;
    fn();
    const _container = _getContainer.current ? _getContainer.current() || window : window;
    _container.addEventListener('scroll', fn);
    return () => {
      _container.removeEventListener('scroll', fn);
    };
  }, [debounce, delay]);
}
