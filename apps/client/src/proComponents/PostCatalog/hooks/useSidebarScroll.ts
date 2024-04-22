import { getOffsetTop } from '@funblog/utils';
import { useEffect, useRef } from 'react';
import { PostCatalogItem } from '../types';

export const useSidebarScroll = ({
  activeIndex,
  containerRef,
  list,
  getSideBarContainer,
}: {
  activeIndex: number;
  containerRef: React.RefObject<HTMLElement>;
  list: PostCatalogItem[];
  getSideBarContainer?: () => HTMLElement;
}) => {
  const ref = useRef({
    container: containerRef.current,
    getSideBarContainer,
  });
  ref.current.container = containerRef.current;
  ref.current.getSideBarContainer = getSideBarContainer;

  useEffect(() => {
    const container = ref.current.container;
    const sideBarContainer = ref.current.getSideBarContainer?.();
    if (!container || !sideBarContainer) return;

    const liList = Array.from(container.querySelectorAll('li') || []);
    const { height = 0 } = sideBarContainer?.getBoundingClientRect() || {};
    const h = height / 2;
    const t = getOffsetTop(liList[activeIndex], sideBarContainer);
    let d = t - h;
    d = d > 0 ? d : 0;
    if (sideBarContainer) {
      sideBarContainer.scrollTop = d;
    }
  }, [list, activeIndex]);
};
