'use client';
import { usePageStore, useStore } from '@/context';
import NavigationSidebar, { NavigationSidebarProps } from './main';

function NavigationSidebarWithContext(props: Omit<NavigationSidebarProps, 'pc' | 'showSidebar'>) {
  const { pc } = useStore();
  const { showSidebar } = usePageStore();
  return <NavigationSidebar {...props} pc={pc} showSidebar={showSidebar} />;
}

export default NavigationSidebarWithContext;
