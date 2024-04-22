import cls from 'classnames';
import styles from './style.module.css';

export enum BadgeRibbonType {
  PRIMARY = 'primary',
  RED = 'red',
}

function BadgeRibbon({
  className,
  children,
  type = 'primary',
  placement = 'left',
}: {
  children: React.ReactNode;
  className?: string;
  type?: 'primary' | 'red';
  placement?: 'left' | 'right';
}) {
  return (
    <div className={cls(styles.badgeRibbon, styles[type], styles[placement], className)}>
      <div className={styles.content}>
        <div className={styles.wrap}>{children}</div>
      </div>
    </div>
  );
}

export default BadgeRibbon;
