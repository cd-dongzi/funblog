'use client';
import { Portal } from '@funblog/components';
import { Button, Drawer, DrawerProps } from 'antd';
import cls from 'classnames';
import { useState } from 'react';
import Main from '@/components/Main';
import { PAGE_HEADER_EXTRA } from '@/constants';
import useScreen from '@/hooks/useScreen';
import styles from './style.module.css';

function PageSetting({
  children,
  renderSidebar,
  className,
  drawerProps,
  extra,
}: {
  children: React.ReactNode;
  renderSidebar?: ({ isLarge }: { isLarge: boolean }) => React.ReactNode;
  drawerProps?: Partial<DrawerProps>;
  className?: string;
  extra?: React.ReactNode;
}) {
  const { size } = useScreen();
  const [open, setOpen] = useState(false);
  const isLarge = size === 'large';
  const sidebar = renderSidebar?.({ isLarge });
  return (
    <>
      {!isLarge && (
        <Portal container={document.getElementById(PAGE_HEADER_EXTRA)}>
          {extra || (
            <Button type="link" onClick={() => setOpen(true)}>
              添加
            </Button>
          )}
        </Portal>
      )}
      <Main className={cls('flex bg-white', className)}>
        <div className="flex-1">{children}</div>
        {isLarge && sidebar}
      </Main>
      {!isLarge && (
        <Drawer
          autoFocus
          forceRender
          open={open}
          closable={false}
          onClose={() => setOpen(false)}
          {...drawerProps}
          className={cls(styles.drawer, drawerProps?.className)}
        >
          {sidebar}
        </Drawer>
      )}
    </>
  );
}

export default PageSetting;
