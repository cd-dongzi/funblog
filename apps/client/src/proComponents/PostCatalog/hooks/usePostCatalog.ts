import { useDebounce, useSize } from '@funblog/hooks';
import { isDocument, getOffsetTop } from '@funblog/utils';
import { useEffect, useRef, useState, useMemo } from 'react';
import useScrollValue from '@/hooks/useScrollValue';
import { getHeaderHeight } from '@/utils';
import { Catalog, PostCatalogItem } from '../types';

const getPostCatalogs = (container: Element | null, tags = 'h1, h2, h3, h4'): Catalog[] => {
  if (!container) return [];
  const nodeList = Array.from(container.querySelectorAll(tags));
  return nodeList.map((node) => {
    return {
      node,
      layer: Number(node.nodeName.toLocaleLowerCase().slice(1)),
      text: (node as HTMLElement).innerText,
    };
  });
};

export const usePostCatalog = ({ id }: { id: string }) => {
  const [catalogs, setCatalogs] = useState<PostCatalogItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLElement | null>(null);
  containerRef.current = isDocument() ? document.getElementById(id) : null;
  useEffect(() => {
    const container = document.getElementById(id);
    const _catalogs = getPostCatalogs(container);
    const min = Math.min(..._catalogs.map((catalog) => catalog.layer));
    setCatalogs(
      _catalogs.map((catalog) => {
        return {
          title: catalog.text,
          gap: catalog.layer - min,
          node: catalog.node,
          selected: false,
        };
      }),
    );
  }, [id]);

  const scrollTop = useScrollValue({ debounce: true });
  const { height: _height } = useSize(containerRef);
  const height = useDebounce(_height);
  const offsetList = useMemo(() => {
    return catalogs.map((catalog) => getOffsetTop(catalog.node as HTMLElement));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catalogs, height]);
  useEffect(() => {
    const headerH = getHeaderHeight();
    let _index = 0;
    for (let index = offsetList.length - 1; index >= 0; index--) {
      if (Math.ceil(scrollTop) >= offsetList[index] - headerH) {
        _index = index;
        break;
      }
    }
    setActiveIndex(_index);
  }, [offsetList, scrollTop]);
  return {
    activeIndex,
    setActiveIndex,
    catalogs,
  };
};
