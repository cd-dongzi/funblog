import cls from 'classnames';

function LayoutContainer({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cls(
        'grid grid-cols-2 gap-x-6 gap-y-14',
        'xxs:gap-x-4 xxs:gap-y-8',
        'xs:grid-cols-3',
        'md:grid-cols-3',
        'xl:grid-cols-4',
        className,
      )}
    >
      {children}
    </div>
  );
}

export default LayoutContainer;
