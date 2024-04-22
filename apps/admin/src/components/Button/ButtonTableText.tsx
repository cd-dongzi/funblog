import cls from 'classnames';
import { ReactNode } from 'react';
function ButtonTableText({
  onClick,
  className,
  children,
}: {
  onClick?: () => void;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a className={cls(className)} onClick={onClick}>
      {children}
    </a>
  );
}

export default ButtonTableText;
