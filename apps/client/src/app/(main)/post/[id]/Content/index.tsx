'use client';
import { Portal } from '@funblog/components';
import { useMount } from '@funblog/hooks';
import { delay, getOffsetTop } from '@funblog/utils';
import { NAVIGATION_SLOT_ID, SIDEBAR_ID } from '@/constants';
import { useStore } from '@/context';
import useAutoScrollAnchor from '@/hooks/useAutoScrollAnchor';
import usePreviewImage from '@/hooks/usePreviewImage';
import { NavigationSidebarWithContext } from '@/proComponents/NavigationSidebar';
import { getHeaderHeight } from '@/utils';
import Sidebar, { ChangeEventData } from '../Sidebar';

function Content({ children }: { children: React.ReactNode }) {
  const { pc, toggleMSidebar } = useStore();
  usePreviewImage();
  useAutoScrollAnchor();
  const mounted = useMount(true);
  if (!pc) {
    return (
      <>
        {children}
        {mounted && (
          <Portal container={document.getElementById(NAVIGATION_SLOT_ID)}>
            <Sidebar
              onChange={(data: ChangeEventData) => {
                data.event.preventDefault();
                const targetElement = document.getElementById(data.anchorId);
                const offsetTop = getOffsetTop(targetElement);
                const headerH = getHeaderHeight();
                return new Promise<void>((resolve) => {
                  toggleMSidebar(false);
                  // 动画执行完在进行滚动
                  delay(500).then(() => {
                    window.scrollTo({
                      top: offsetTop - headerH,
                      behavior: 'smooth',
                    });
                    resolve();
                  });
                });
              }}
            />
          </Portal>
        )}
      </>
    );
  }
  return (
    <NavigationSidebarWithContext
      list={[
        {
          icon: 'bookmark',
          tip: '目录',
          component: <Sidebar getSideBarContainer={() => document.getElementById(SIDEBAR_ID) as HTMLElement} />,
        },
      ]}
    >
      {children}
    </NavigationSidebarWithContext>
  );
}

export default Content;
