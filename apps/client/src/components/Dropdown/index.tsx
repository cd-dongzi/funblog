import cls from 'classnames';
import React, { HTMLAttributeAnchorTarget } from 'react';
import Link from '@/components/Link';
import Tooltip, { TooltipProps } from '@/components/Tooltip';

type DropdownMenu<T> = {
  key: string | number;
  label: React.ReactNode;
  onClick?: (data: DropdownMenu<T>) => void;
  data?: T;
  render?: (props: { data: DropdownMenu<T>; className: string; dom: React.ReactNode }) => React.ReactNode;
  href?: string;
  target?: HTMLAttributeAnchorTarget;
  active?: boolean;
};
type DropdownProps<T> = {
  menu?: DropdownMenu<T>[];
  renderPopup?: () => React.ReactNode;
} & Omit<TooltipProps, 'content'>;

function Menu<T>({ menu }: Pick<DropdownProps<T>, 'menu'>) {
  return (
    <div>
      {menu?.map((item) => {
        const className = cls(
          'block transition-all-3 cursor-pointer rounded-sm px-6 py-2 hover:bg-gray9 hover:text-text',
          {
            '!bg-primary !text-white': item.active,
          },
        );
        const dom = item.href ? (
          <Link key={item.key} href={item.href} target={item.target} className={className}>
            {item.label}
          </Link>
        ) : (
          <div key={item.key} className={className} onClick={() => item.onClick?.(item)}>
            {item.label}
          </div>
        );
        if (item.render) {
          return item.render({
            data: item,
            className,
            dom,
          });
        }
        return dom;
      })}
    </div>
  );
}

function Dropdown<T extends Record<string, any>>({ children, menu, renderPopup, ...props }: DropdownProps<T>) {
  return (
    <Tooltip
      {...props}
      className={cls('!px-0.5 !py-1', props.className)}
      content={renderPopup ? renderPopup() : menu ? <Menu menu={menu} /> : null}
    >
      {children}
    </Tooltip>
  );
}

export default Dropdown;
