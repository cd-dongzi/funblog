import { RefObject, useEffect, useState } from 'react';

export default function useSize<T extends Element>(ref: RefObject<T>) {
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newWidth = entry.contentRect.width;
        const newHeight = entry.contentRect.height;
        setSize((prev) => ({
          ...prev,
          width: newWidth,
          height: newHeight,
        }));
      }
    });

    resizeObserver.observe(ref.current);
  }, [ref]);
  return size;
}
