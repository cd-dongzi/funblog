import { Icon } from '@funblog/components';
import { useScroll } from '@funblog/hooks';
import cls from 'classnames';
import React, { useEffect, useRef, useState, useImperativeHandle } from 'react';
import styles from './style.module.css';

interface ScrollViewProps {
  children: React.ReactNode;
  className?: string;
  hasScroll?: boolean;
  hasArrow?: boolean;
}
export interface ScrollViewRef {
  scrollTo: (num: number) => void;
  getContentNode: () => HTMLDivElement | null;
}
function ScrollView(
  { className, hasScroll = true, hasArrow = false, children }: ScrollViewProps,
  cRef: React.ForwardedRef<ScrollViewRef>,
) {
  const ref = useRef<HTMLDivElement>(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(false);
  useImperativeHandle(cRef, () => ({
    scrollTo: (num: number) => {
      ref.current?.scrollTo({
        left: num,
      });
    },
    getContentNode: () => ref.current,
  }));
  useScroll({
    debounce: true,
    getContainer: () => ref.current,
    callback: (e) => {
      setScrollLeft((e?.target as HTMLDivElement)?.scrollLeft || 0);
    },
  });
  useEffect(() => {
    const getChildWidth = () => {
      return ref.current?.children?.[0]?.clientWidth || 0;
    };
    setShowPrev(scrollLeft > 0);
    setShowNext(scrollLeft < getChildWidth() - (ref.current?.clientWidth || 0));
  }, [scrollLeft]);
  return (
    <div className={styles.container}>
      {hasArrow && (
        <button className={cls('btn-clear', styles.btn, styles.prev, { [styles.show]: showPrev })}>
          <Icon name="back" className={styles.icon} />
        </button>
      )}
      <div
        className={cls(
          styles.content,
          {
            [styles.hasScroll]: hasScroll,
          },
          className,
        )}
        ref={ref}
      >
        {children}
      </div>
      {hasArrow && (
        <button className={cls('btn-clear', styles.btn, styles.next, { [styles.show]: showNext })}>
          <Icon name="back" className={styles.icon} />
        </button>
      )}
    </div>
  );
}

export default React.forwardRef<ScrollViewRef, ScrollViewProps>(ScrollView);
