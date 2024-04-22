import { Icon } from '@funblog/components';
import cls from 'classnames';
import styles from '../styles.module.css';

function Button({ className, onClick }: { className: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cls(
        styles.button,
        'pc:group-hover:opacity-50 pc:group-hover:[transform:translate(0,-50%)]',
        className,
      )}
    >
      <Icon name="right-arrow" className="text-lg" />
    </button>
  );
}

export default Button;
