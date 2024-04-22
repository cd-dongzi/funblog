'use client';
import { useSize } from '@funblog/hooks';
import { getOffsetTop } from '@funblog/utils';
import cls from 'classnames';
import { useEffect, useRef, useState } from 'react';

function Main({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const size = useSize(ref);
  const [height, setHeight] = useState('auto');
  useEffect(() => {
    // 24px 是外部容器的padding
    const height = window.innerHeight - getOffsetTop(ref.current!) - 24;
    setHeight(`${height}px`);
  }, [size]);
  return (
    <div
      ref={ref}
      style={{
        minHeight: height,
      }}
      className={cls('rounded-xl', className)}
    >
      {children}
    </div>
  );
}

export default Main;
