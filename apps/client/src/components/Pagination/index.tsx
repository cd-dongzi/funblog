'use client';
import { Icon } from '@funblog/components';
import { typeUtil } from '@funblog/utils';
import cls from 'classnames';
import React, { useEffect, useState, useRef, useCallback, ReactNode } from 'react';
import styles from './style.module.css';

const DotItem = ({ className, onClick }: { className?: string; onClick: () => void }) => {
  const [showArrow, setShowArrow] = useState(false);
  return (
    <li
      className={cls(styles.item)}
      onClick={onClick}
      onMouseOver={() => setShowArrow(true)}
      onMouseOut={() => setShowArrow(false)}
    >
      {!showArrow && <Icon name="dot" />}
      {showArrow && <Icon name="left" className={className} />}
    </li>
  );
};

type Props = {
  total?: number;
  pageCount?: number;
  currentPage?: number;
  onChange?: (page: number) => void;
  pageSize?: number;
  className?: string;
  current?: number;
  pagerCount?: number;
  renderPage?: (page: number) => ReactNode;
};
interface PaginationProps {
  (props: Props): JSX.Element | null;
}

const Pagination: PaginationProps = ({
  total = 0,
  pageSize = 10,
  pageCount = Math.ceil(total / pageSize),
  currentPage = 1,
  onChange,
  className,
  renderPage,
  pagerCount = 5,
}) => {
  const state = useRef<{
    cardWidth: number;
  }>({
    cardWidth: 38,
  });
  const [pagers, setPagers] = useState<number[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [showPrevMore, setShowPrevMore] = useState(false);
  const [showNextMore, setShowNextMore] = useState(false);
  const [current, setCurrent] = useState(currentPage);
  const ulRef = useRef<HTMLUListElement>(null);
  const [offsetIndex, setOffsetIndex] = useState(0);

  // 移入
  const onMouseEnter = (e: any) => {
    let val;
    let target = e.target;
    while (!val && target) {
      val = target?.getAttribute('data-index');
      target = target?.offsetParent;
    }
    if (typeUtil.isNum(val)) {
      setOffsetIndex(Number(val));
    }
  };
  const onFocusByCurrent = useCallback(() => {
    if (!loaded) {
      return null;
    }
    const o = ulRef.current?.querySelector(`.${styles.item}[data-page="${current}"]`);
    if (o) {
      const index = o.getAttribute('data-index');
      if (typeUtil.isNum(index)) {
        setOffsetIndex(Number(index));
      }
    } else {
      setOffsetIndex(0);
    }
  }, [current, loaded]);
  // 换页码
  const onActive = (page: number) => {
    if (page === current) return;
    onChange?.(page);
    setCurrent(page);
  };
  // 翻页
  const onMore = (direction: string) => {
    let page = current;
    const pagerCountOffset = pagerCount - 2;
    if (direction === 'prev') {
      page = current - pagerCountOffset;
    } else if (direction === 'next') {
      page = current + pagerCountOffset;
    }
    if (page < 1) {
      page = 1;
    }
    if (page > pageCount) {
      page = pageCount;
    }
    if (page !== current) {
      onActive(page);
    }
  };
  // 上一页
  const onPrev = () => {
    let page = current - 1;
    page = page < 1 ? 1 : page;
    onActive(page);
  };
  // 下一页
  const onNext = () => {
    let page = current + 1;
    page = page > pageCount ? pageCount : page;
    onActive(page);
  };
  // 设置当前的页码
  useEffect(() => {
    setCurrent(currentPage);
  }, [currentPage]);
  // 设置pager
  useEffect(() => {
    const halfPagerCount = (pagerCount - 1) / 2;
    let showPrevMore = false;
    let showNextMore = false;
    if (pageCount > pagerCount) {
      if (current > pagerCount - halfPagerCount) {
        showPrevMore = true;
      }
      if (current < pageCount - halfPagerCount) {
        showNextMore = true;
      }
    }
    const arr = [];
    if (showPrevMore && !showNextMore) {
      const startPage = pageCount - (pagerCount - 2);
      for (let i = startPage; i < pageCount; i++) {
        arr.push(i);
      }
    } else if (!showPrevMore && showNextMore) {
      for (let i = 2; i < pagerCount; i++) {
        arr.push(i);
      }
    } else if (showPrevMore && showNextMore) {
      const offset = Math.floor(pagerCount / 2) - 1;
      for (let i = current - offset; i <= current + offset; i++) {
        arr.push(i);
      }
    } else {
      for (let i = 2; i < pageCount; i++) {
        arr.push(i);
      }
    }
    setShowPrevMore(showPrevMore);
    setShowNextMore(showNextMore);
    setPagers(arr);
    setLoaded(true);
  }, [pagerCount, pageCount, current]);
  // 设置瞄点偏移量
  useEffect(() => {
    if (ulRef.current) {
      ulRef.current.querySelectorAll(`.${styles.item}`).forEach((ref, index) => {
        ref.setAttribute('data-index', String(index));
      });
    }
  }, [current, pagers]);
  // 当前页偏移位置
  useEffect(() => {
    onFocusByCurrent();
  }, [onFocusByCurrent]);
  if (!loaded || pageCount < 2) {
    return null;
  }

  const _renderPage = (_page: number) => (renderPage ? renderPage(_page) : _page);
  const offsetX = state.current.cardWidth * offsetIndex;
  const noMore = !showPrevMore && !showNextMore;
  return (
    <div className={cls(styles.pagination, className)}>
      <ul
        ref={ulRef}
        style={
          {
            '--menu_transform_left': `${offsetX}px`,
          } as any
        }
      >
        {current > 1 && !noMore && (
          <li
            className={cls(styles.item, styles.prev)}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onFocusByCurrent}
            onClick={onPrev}
          >
            <Icon name="left" />
          </li>
        )}
        {pageCount > 0 && (
          <li
            data-page={1}
            className={styles.item}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onFocusByCurrent}
            onClick={() => onActive(1)}
          >
            {_renderPage(1)}
          </li>
        )}
        {showPrevMore && <DotItem onClick={() => onMore('prev')} />}
        {pagers.map((page) => (
          <li
            key={page}
            data-page={page}
            className={styles.item}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onFocusByCurrent}
            onClick={() => onActive(page)}
          >
            {_renderPage(page)}
          </li>
        ))}
        {showNextMore && <DotItem className={styles.next} onClick={() => onMore('next')} />}
        {pageCount > 1 && (
          <li
            data-page={pageCount}
            className={styles.item}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onFocusByCurrent}
            onClick={() => onActive(pageCount)}
          >
            {_renderPage(pageCount)}
          </li>
        )}
        {current < pageCount && !noMore && (
          <li className={styles.item} onMouseEnter={onMouseEnter} onMouseLeave={onFocusByCurrent} onClick={onNext}>
            <Icon name="left" className={styles.next} />
          </li>
        )}
        <li className={styles.anchor}></li>
      </ul>
    </div>
  );
};

export default Pagination;
