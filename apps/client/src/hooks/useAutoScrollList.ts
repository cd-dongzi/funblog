import { ScrollProps } from '@funblog/hooks/types/src/useScroll';
import { useEffect, useMemo, useState } from 'react';
import useScrollValue from '@/hooks/useScrollValue';

export default function useAutoScrollList(
  { list, gap = 0, ...props } = {} as Omit<ScrollProps, 'callback'> & {
    list: { name: string; getNode: () => HTMLElement | null | undefined }[];
    gap?: number;
  },
) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollTop = useScrollValue(props);
  const offsetList = useMemo(() => {
    return list.map((item) => {
      const node = item.getNode();
      return {
        name: item.name,
        offsetTop: node ? node.offsetTop - gap : 0,
      };
    });
  }, [list, gap]);
  useEffect(() => {
    for (let i = offsetList.length - 1; i >= 0; i--) {
      if (scrollTop >= offsetList[i].offsetTop) {
        setActiveIndex(i);
        break;
      }
    }
  }, [gap, scrollTop, offsetList]);

  const onActive = (name: string) => {
    const index = list.findIndex((item) => item.name === name);
    setActiveIndex(index);
    props.getContainer?.()?.scrollTo({
      top: offsetList[index].offsetTop,
    });
  };
  return {
    activeIndex,
    onActive,
  };
}
