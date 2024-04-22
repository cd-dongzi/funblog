import cls from 'classnames';
function Panel({
  title,
  children,
  className,
  titleClassName,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
}) {
  return (
    <div className={cls('group/panel my-5 pl-1', className)}>
      <h3 className={cls('shadow-header-line', titleClassName)}>
        <div className="relative inline-block pb-2 group-hover/panel:text-primary">
          {title}
          <span className="line-tick w-1/2 transition-[width] group-hover/panel:w-full"></span>
        </div>
      </h3>
      <div className="pt-2">{children}</div>
    </div>
  );
}

export default Panel;
