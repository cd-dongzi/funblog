import { Icon } from '@funblog/components';
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
    <div className={styles.box} onClick={() => onRemove(item)}>
      <div className={styles.title}>
        <Icon name="ring" />
        <span>New Notification</span>
      </div>
      <div className={styles.info}>
        <div className={styles.msg}>{item.message}</div>
      </div>
    </div>
  );
};

export default Item;
