import cls from 'classnames';
import React, { ReactNode } from 'react';
import styles from './style.module.css';

type Props = {
  title: string;
  children: ReactNode;
  className?: string;
};
const PanelArrow = ({ children, title, className }: Props) => {
  return (
    <section className={cls('mb-8', className)}>
      <div className={styles.meta}>
        <h2 className={styles.title}>{title}</h2>
      </div>
      <div className="px-2 pt-8 pc:px-10">{children}</div>
    </section>
  );
};

export default PanelArrow;
