import { Icon } from '@funblog/components';
import cls from 'classnames';
import React, { ReactNode, useState } from 'react';
import styles from './style.module.css';

type Props = {
  title?: ReactNode;
  children?: ReactNode;
  className?: string;
  onClose?: () => void;
  onCancel?: () => void;
  onConfirm?: (done?: () => void) => Promise<any> | void;
};
const ModalPrompt = ({ title = '提示', children, className, onClose, onCancel, onConfirm }: Props) => {
  const [loading, setLoading] = useState(false);
  const done = () => {
    onClose?.();
  };
  const handleConfirm = async () => {
    setLoading(true);
    if (onConfirm) {
      const bol = await onConfirm(done);
      bol && done();
    }
    setLoading(false);
  };
  return (
    <div className={cls(styles.prompt, className)}>
      <div className={styles.header}>
        <div className={styles.name}>{title}</div>
        <Icon name="close" className={styles.close} onClick={onClose} />
      </div>
      <div className={styles.content}>{children}</div>
      <div className={styles.footer}>
        <button className={cls(styles.btn, styles.cancel)} onClick={onCancel}>
          取消
        </button>
        <button
          className={cls(styles.btn, styles.confirm, {
            loading,
          })}
          onClick={handleConfirm}
        >
          {loading ? <Icon name="loading" /> : '确定'}
        </button>
      </div>
    </div>
  );
};

export default ModalPrompt;
