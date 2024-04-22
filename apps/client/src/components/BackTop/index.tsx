'use client';
import { Icon } from '@funblog/components';
import cls from 'classnames';
import React, { useEffect, useState } from 'react';
import useScrollValue from '@/hooks/useScrollValue';
import styles from './style.module.css';

type Props = unknown;
interface BackTopProps {
  (props: Props): JSX.Element | null;
}

const BackTop: BackTopProps = () => {
  const [show, setShow] = useState(false);
  const scrollTop = useScrollValue({ debounce: true, delay: 100 });
  useEffect(() => {
    const winH = document.documentElement.clientHeight || document.body.clientHeight;
    if (scrollTop > winH / 2) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [scrollTop]);
  const onClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <div
      className={cls(styles.backTop, {
        [styles.show]: show,
      })}
      onClick={onClick}
    >
      <Icon name="back-top" />
    </div>
  );
};

export default BackTop;
