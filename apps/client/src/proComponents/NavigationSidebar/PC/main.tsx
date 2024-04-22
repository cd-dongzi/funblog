'use client';
import { usePrevious, useMount, useResize } from '@funblog/hooks';
import cls from 'classnames';
import { motion } from 'framer-motion';
import { useState, useMemo, useRef } from 'react';
import { SIDEBAR_ID } from '@/constants';
import Menu, { MenuItem } from './Menu';
import Sidebar from './Sidebar';

export interface NavigationItem extends MenuItem {
  component?: JSX.Element;
}

export interface NavigationSidebarProps {
  children: any;
  list?: NavigationItem[];
  sliderClassName?: string;
  defaultMenuIndex?: number;
  pc?: boolean;
  showSidebar?: boolean;
}

const SCALE = 1 / 4;
const SIDEBAR_W = `${SCALE * 100}%`;
const MIN = 230;
const MAX = 350;
function NavigationSidebar({
  children,
  list = [],
  pc,
  showSidebar,
  sliderClassName,
  defaultMenuIndex = 0,
}: NavigationSidebarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [sidebarW, setSidebarW] = useState<number | string>();
  const mounted = useMount();
  const [menuIndex, setMenuIndex] = useState(defaultMenuIndex);
  const prevIndex = usePrevious(menuIndex) || 0;
  const _list = useMemo(
    () => [...list, { icon: 'user', tip: '关于我', component: <Sidebar /> }] as NavigationItem[],
    [list],
  );
  const item = _list[menuIndex];
  useResize({
    callback: () => {
      if (showSidebar) {
        const _w = ref.current?.clientWidth || 0;
        const w = Math.min(Math.max(_w * SCALE, MIN), MAX);
        setSidebarW(`${w}px`);
      }
    },
  });

  if (!pc) {
    return children;
  }
  return (
    <div className={cls('flex')} ref={ref}>
      <div
        className={cls('transition-all-5 pc:z-[1] pc:pt-3 mobile:!w-full ', {
          '!w-full': !showSidebar,
        })}
        style={{
          width: `calc(100% - ${sidebarW || SIDEBAR_W})`,
        }}
      >
        {children}
      </div>
      <aside
        id={SIDEBAR_ID}
        className={cls(
          'mask-scroll transition-all-5 sticky top-headerH hidden max-h-[calc(100vh-theme(spacing.headerH))] shrink-0 overflow-auto',
          'pc:block',
          sliderClassName,
          {
            '!w-0 opacity-0': !showSidebar,
          },
        )}
        style={{
          width: sidebarW || SIDEBAR_W,
        }}
      >
        <div
          className="pl-4 pt-3"
          style={{
            width: sidebarW || '100%',
          }}
        >
          {_list.length > 1 && (
            <div className="mb-4 pr-1.5 text-right">
              <Menu list={_list} menuIndex={menuIndex} onChange={setMenuIndex} />
            </div>
          )}
          <motion.div
            key={item.icon}
            className="relative"
            initial={mounted ? { x: `${menuIndex < prevIndex ? '-' : ''}100`, opacity: 0 } : {}}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {item.component}
          </motion.div>
        </div>
      </aside>
    </div>
  );
}

export default NavigationSidebar;
