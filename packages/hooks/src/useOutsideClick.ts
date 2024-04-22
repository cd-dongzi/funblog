import { bindClickOutSide } from '@funblog/utils';
import { useEffect, useRef } from 'react';

export default function useOutsideClick<T extends Event = Event>(
  target: Element | (() => Element | null),
  callback: (event: T) => void,
) {
  const ref = useRef({
    target,
    callback,
  });
  ref.current.target = target;
  ref.current.callback = callback;

  useEffect(() => {
    const destroy = bindClickOutSide(ref.current.target, ref.current.callback);
    return destroy;
    // const _target = typeof ref.current.target === 'function' ? ref.current.target() : ref.current.target;
    // const _callback = ref.current.callback;
    // const handleClick = (e: any) => {
    //   if (_target && !_target.contains(e.target)) {
    //     _callback(e);
    //   }
    // };
    // document.addEventListener('click', handleClick);

    // return () => {
    //   document.removeEventListener('click', handleClick);
    // };
  }, []);
}
