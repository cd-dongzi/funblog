import { Icon } from '@funblog/components';
import cls from 'classnames';

function Button({ children, icon, className }: { children: React.ReactNode; icon?: string; className?: string }) {
  let child = <span>{children}</span>;
  if (icon) {
    child = (
      <>
        <Icon name="icon" />
        {child}
      </>
    );
  }
  return (
    <button
      className={cls(
        'transition-all-3 hover:shadow-primary-sm rounded-lg bg-white px-2.5 py-2 text-xs text-text shadow-black hover:translate-y-[3px] hover:bg-primary hover:text-white',
        className,
      )}
    >
      {child}
    </button>
  );
}

export default Button;
