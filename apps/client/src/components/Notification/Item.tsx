import { Icon } from '@funblog/components';
import cls from 'classnames';
import React, { useEffect } from 'react';
import styles from './style.module.css';

type Props<T> = {
  item: T;
  onRemove: (item: T) => void;
};

const Item = function <T extends Record<string, any>>({ item, onRemove }: Props<T>) {
  useEffect(() => {
    const timer = setTimeout(() => {
      clearTimeout(timer);
      onRemove(item);
    }, item.duration);
  }, [onRemove, item]);
  return (
    <div className={cls(styles.box, styles[item.type])}>
      {item.message}
      <div className={styles.tip}>
        <Icon name={item.type === 'error' ? 'point' : 'info'} />
      </div>
    </div>
  );
};

export default Item;
