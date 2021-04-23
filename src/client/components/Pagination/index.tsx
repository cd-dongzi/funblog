import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Icon } from '@/components'
import classnames from 'classnames'
import Type from '@root/src/shared/type'
import './style.less'

const DotItem = ({ className, onClick }: { className: string; onClick: () => void }) => {
  const [showArrow, setShowArrow] = useState(false)
  return (
    <li
      className={`pagination-item ${className}`}
      onClick={onClick}
      onMouseOver={() => setShowArrow(true)}
      onMouseOut={() => setShowArrow(false)}
    >
      {!showArrow && <Icon name="dot" />}
      {showArrow && <Icon name="left" />}
    </li>
  )
}

type Props = {
  total?: number
  pageCount?: number
  currentPage?: number
  onChange: (page: number) => void
  pageSize?: number
  className?: string
  current?: number
  pagerCount?: number
}
interface Pagination {
  (props: Props): JSX.Element | null
}
type MenuReact = {
  width: number
  left: number
}

const Pagination: Pagination = ({
  total = 0,
  pageSize = 10,
  pageCount = Math.ceil(total / pageSize),
  currentPage = 1,
  onChange,
  className,
  pagerCount = 5
}) => {
  const state = useRef<{
    cardWidth: number
  }>({
    cardWidth: 38
  })
  const [pagers, setPagers] = useState<number[]>([])
  const [loaded, setLoaded] = useState(false)
  const [showPrevMore, setShowPrevMore] = useState(false)
  const [showNextMore, setShowNextMore] = useState(false)
  const [current, setCurrent] = useState(currentPage)
  const ulRef = useRef<HTMLUListElement>(null)
  const [offsetIndex, setOffsetIndex] = useState(0)

  // 移入
  const onMouseEnter = (e: any) => {
    const index = e.target.getAttribute('data-index')
    if (Type.isNum(index)) {
      setOffsetIndex(Number(index))
    }
  }
  const onFocusByCurrent = useCallback(() => {
    const o = ulRef.current?.querySelector(`.pagination-item[data-page="${current}"]`)
    if (o) {
      const index = o.getAttribute('data-index')
      if (Type.isNum(index)) {
        setOffsetIndex(Number(index))
      }
    } else {
      setOffsetIndex(0)
    }
  }, [current])
  // 换页码
  const onActive = (page: number) => {
    if (page === current) return
    onChange(page)
    setCurrent(page)
  }
  // 翻页
  const onMore = (direction: string) => {
    let page = current
    const pagerCountOffset = pagerCount - 2
    if (direction === 'prev') {
      page = current - pagerCountOffset
    } else if (direction === 'next') {
      page = current + pagerCountOffset
    }
    if (page < 1) {
      page = 1
    }
    if (page > pageCount) {
      page = pageCount
    }
    if (page !== current) {
      onActive(page)
    }
  }
  // 上一页
  const onPrev = () => {
    let page = current - 1
    page = page < 1 ? 1 : page
    onActive(page)
  }
  // 下一页
  const onNext = () => {
    let page = current + 1
    page = page > pageCount ? pageCount : page
    onActive(page)
  }
  // 设置当前的页码
  useEffect(() => {
    setCurrent(currentPage)
  }, [currentPage])
  // 设置pager
  useEffect(() => {
    const halfPagerCount = (pagerCount - 1) / 2
    let showPrevMore = false
    let showNextMore = false
    if (pageCount > pagerCount) {
      if (current > pagerCount - halfPagerCount) {
        showPrevMore = true
      }
      if (current < pageCount - halfPagerCount) {
        showNextMore = true
      }
    }
    const arr = []
    if (showPrevMore && !showNextMore) {
      const startPage = pageCount - (pagerCount - 2)
      for (let i = startPage; i < pageCount; i++) {
        arr.push(i)
      }
    } else if (!showPrevMore && showNextMore) {
      for (let i = 2; i < pagerCount; i++) {
        arr.push(i)
      }
    } else if (showPrevMore && showNextMore) {
      const offset = Math.floor(pagerCount / 2) - 1
      for (let i = current - offset; i <= current + offset; i++) {
        arr.push(i)
      }
    } else {
      for (let i = 2; i < pageCount; i++) {
        arr.push(i)
      }
    }
    setShowPrevMore(showPrevMore)
    setShowNextMore(showNextMore)
    setPagers(arr)
    setLoaded(true)
  }, [pagerCount, pageCount, current])
  // 设置瞄点偏移量
  useEffect(() => {
    if (ulRef.current) {
      ulRef.current.querySelectorAll('.pagination-item').forEach((ref, index) => {
        ref.setAttribute('data-index', String(index))
      })
    }
  }, [current, pagers])
  // 当前页偏移位置
  useEffect(() => {
    onFocusByCurrent()
  }, [onFocusByCurrent])
  if (!loaded || pageCount < 2) {
    return null
  }
  const offsetX = state.current.cardWidth * offsetIndex
  const noMore = !showPrevMore && !showNextMore
  return (
    <div className={classnames('pagination', className)}>
      <ul
        ref={ulRef}
        style={{
          '--menu_transform_left': `${offsetX}px`
        }}
      >
        {current > 1 && !noMore && (
          <li className="pagination-item prev" onMouseEnter={onMouseEnter} onMouseLeave={onFocusByCurrent} onClick={onPrev}>
            <Icon name="left" />
          </li>
        )}
        {pageCount > 0 && (
          <li
            data-page={1}
            className="pagination-item"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onFocusByCurrent}
            onClick={() => onActive(1)}
          >
            1
          </li>
        )}
        {showPrevMore && <DotItem className="dot-prev" onClick={() => onMore('prev')} />}
        {pagers.map((page) => (
          <li
            key={page}
            data-page={page}
            className="pagination-item"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onFocusByCurrent}
            onClick={() => onActive(page)}
          >
            {page}
          </li>
        ))}
        {showNextMore && <DotItem className="dot-next" onClick={() => onMore('next')} />}
        {pageCount > 1 && (
          <li
            data-page={pageCount}
            className="pagination-item"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onFocusByCurrent}
            onClick={() => onActive(pageCount)}
          >
            {pageCount}
          </li>
        )}
        {current < pageCount && !noMore && (
          <li className="pagination-item next" onMouseEnter={onMouseEnter} onMouseLeave={onFocusByCurrent} onClick={onNext}>
            <Icon name="left" />
          </li>
        )}
        <li className="pagination-anchor"></li>
      </ul>
    </div>
  )
}

export default Pagination
