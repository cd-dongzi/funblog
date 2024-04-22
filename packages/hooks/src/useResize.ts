import { useEffect, useRef } from 'react';
import { debounceFn } from './utils';

export default function useResize({
  debounce,
  delay,
  callback,
}: {
  debounce?: boolean;
  delay?: number;
  callback: (e?: UIEvent) => void;
}) {
  const ref = useRef(callback);
  ref.current = callback;
  useEffect(() => {
    const _fn = (e?: UIEvent) => {
      ref.current(e);
    };
    const fn = debounce ? debounceFn(_fn, delay) : _fn;
    fn();
    window.addEventListener('resize', fn);
    return () => {
      window.removeEventListener('resize', fn);
    };
  }, [debounce, delay]);
}
