import React, { useImperativeHandle } from 'react';
import { AnimateQueue, useAnimateList } from '@/components/AnimateQueue';
import { mountElement } from '@/utils/mountElement';
import Item from './Item';
import styles from './style.module.css';

interface IProps {
  type: 'info';
  message: string;
  duration?: number;
}

interface Ref<T> {
  onAdd: (item: T) => void;
}

const defaultProps: Partial<IProps> = {
  type: 'info',
  duration: 2000,
};

const containerRef = React.createRef<Ref<IProps>>();
const { data, mount, unmount } = mountElement();
const handleAdd = (props: IProps) => {
  containerRef.current?.onAdd({
    ...defaultProps,
    ...props,
  });
};

const Container = React.forwardRef(function <T extends IProps>({ data }: { data: T }, ref: React.ForwardedRef<Ref<T>>) {
  const { list, onAdd, onRemove } = useAnimateList<T>({ onUnmount: unmount });
  useImperativeHandle(ref, () => ({
    onAdd,
  }));
  return (
    <AnimateQueue
      list={list}
      onMount={() => handleAdd(data)}
      itemClassName={styles.item}
      motionProps={{
        initial: { y: '100%', opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: '100%', opacity: 0 },
        transition: {
          type: 'spring',
          duration: 0.5,
          ease: 'easeInOut',
        },
      }}
    >
      {(item) => <Item onRemove={onRemove} item={item} />}
    </AnimateQueue>
  );
});
Container.displayName = 'MessageContainer';

const show = (props: IProps) => {
  if (data.container && data.root) {
    return handleAdd(props);
  }
  mount();
  data.root?.render(<Container data={props} ref={containerRef} />);
};

const info = (props: Omit<IProps, 'type'> | string) => {
  if (typeof props === 'string') {
    show({
      type: 'info',
      message: props,
    });
  } else {
    show({
      type: 'info',
      ...(props || {}),
    });
  }
};

const Message = {
  show,
  info,
};

export default Message;
