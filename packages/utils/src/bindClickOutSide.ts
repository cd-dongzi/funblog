export default function bindClickOutSide<T extends Event = Event>(
  target: Element | (() => Element | null),
  callback: (event: T) => void,
) {
  const _target = typeof target === 'function' ? target() : target;
  const _callback = callback;
  const handleClick = (e: any) => {
    if (_target && !_target.contains(e.target)) {
      _callback(e);
    }
  };
  document.addEventListener('click', handleClick);

  return () => {
    document.removeEventListener('click', handleClick);
  };
}
