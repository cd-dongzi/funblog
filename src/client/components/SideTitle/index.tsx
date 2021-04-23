import React, { useEffect, useState } from 'react'
import classnames from 'classnames'
import './style.less'

export interface SideTitleItem {
  id: string
  title: string
  isSub: boolean
  selected?: boolean
}

type Props = {
  list: SideTitleItem[]
  onChange?: (item: SideTitleItem) => void
  activeIndex?: number
}

interface SideTitle {
  (props: Props): JSX.Element | null
}

export const SideTitle: SideTitle = ({ list, onChange, activeIndex }) => {
  const [index, setIndex] = useState(activeIndex)
  useEffect(() => {
    setIndex(activeIndex)
  }, [activeIndex])
  const onClick = (i: number, item: SideTitleItem) => {
    setIndex(i)
    onChange && onChange(item)
  }
  if (list.length === 0) {
    return null
  }
  return (
    <section className="side-title-container">
      <ul>
        {list.map((item, i) => (
          <li
            key={item.title + i}
            className={classnames('side-title__item', {
              'side-title__item-sub': item.isSub,
              'side-title__item-parent': !item.isSub,
              'side-title__item-active': i === index
            })}
            onClick={() => onClick(i, item)}
          >
            <div className="side-title__item-wrapper">
              <span className="side-title__item-text">{item.title}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
