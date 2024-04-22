import { Popconfirm } from 'antd';
import cls from 'classnames';
import { ReactNode } from 'react';
function ButtonTableConfirm({
  onClick,
  onConfirm,
  className,
  children,
  title,
  type = 'error',
  disabled,
}: {
  onClick?: () => void;
  onConfirm?: () => void;
  className?: string;
  children: ReactNode;
  title?: string;
  type?: 'error' | 'info';
  disabled?: boolean;
}) {
  const dom = (
    <a
      className={cls(className)}
      style={{
        color: type === 'error' ? 'var(--ant-color-error)' : 'var(--ant-color-primary)',
      }}
      onClick={onClick}
    >
      {children}
    </a>
  );
  if (title) {
    return (
      <Popconfirm disabled={disabled} title={title} onConfirm={onConfirm}>
        {dom}
      </Popconfirm>
    );
  }
  return dom;
}

export default ButtonTableConfirm;
