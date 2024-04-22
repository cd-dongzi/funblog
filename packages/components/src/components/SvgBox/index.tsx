import cls from 'classnames';
import React from 'react';
import styles from '../../styles/index.module.css';

function SvgBox({ className, content }: { className?: string; content: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1024 1024"
      className={cls(styles.icon, className)}
      dangerouslySetInnerHTML={{
        __html: content,
      }}
    ></svg>
  );
}

export default SvgBox;
