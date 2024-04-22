import { delay } from '@funblog/utils';
import cls from 'classnames';
import { motion, AnimatePresence, MotionProps } from 'framer-motion';
import React, { useState, useCallback, useEffect, useRef } from 'react';

type Item<T> = {
  _id: number;
} & T;

function useAnimateList<T>(
  { onUnmount, unmountDelay = 500 } = {} as { onUnmount?: () => void; unmountDelay?: number },
) {
  const [list, setList] = useState([] as Item<T>[]);
  const onAdd = useCallback((item: T) => {
    const _id = Date.now();
    setList((prev) => [...prev, { ...item, _id }]);
  }, []);
  const onRemove = useCallback(
    (item: Item<T>) => {
      setList((prev) => {
        const arr = prev.filter((v) => v._id !== item._id);
        if (arr.length === 0) {
          // 动画执行完之后关闭
          delay(unmountDelay).then(() => onUnmount?.());
        }
        return arr;
      });
    },
    [onUnmount, unmountDelay],
  );

  return {
    onAdd,
    onRemove,
    list,
  };
}

type Props<T> = {
  onMount?: () => void;
  list: T[];
  className?: string;
  itemClassName?: string;
  motionProps?: MotionProps;
  children: (item: T) => React.ReactNode;
};

const AnimateQueue = function <T>({ className, itemClassName, list, motionProps, onMount, children }: Props<Item<T>>) {
  const _ref = useRef({
    onMount,
  });
  _ref.current.onMount = onMount;
  useEffect(() => {
    _ref.current.onMount?.();
  }, []);
  return (
    <div className={cls(className)}>
      <AnimatePresence>
        {list.map((item) => (
          <motion.div key={item._id} layout {...motionProps} className={itemClassName}>
            {children(item)}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export { AnimateQueue, useAnimateList };
