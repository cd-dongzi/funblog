import cls from 'classnames';
import React from 'react';
import styles from '../../styles/index.module.css';
import { ICON_PREFIX } from '../constants';

type Props = {
  name: string;
  mode?: 'symbol' | 'fontClass';
  color?: string;
  className?: string;
  onClick?: () => void;
};

const Icon = React.forwardRef<SVGSVGElement, Props>(({ name, color, className, onClick, ...props }, ref) => {
  return (
    <svg
      {...props}
      ref={ref}
      className={cls(styles.icon, className)}
      aria-hidden="true"
      style={{ color }}
      onClick={onClick}
    >
      <use xlinkHref={`#${ICON_PREFIX}-${name}`}></use>
    </svg>
  );
});

export default Icon;
