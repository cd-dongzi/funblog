import cls from 'classnames';

type Props = {
  className?: string;
  children: React.ReactNode;
};
const Card = ({ children, className }: Props) => {
  return <div className={cls('rounded-xl bg-white p-2.5', className)}>{children}</div>;
};

export default Card;
