import React, { useEffect, useState } from 'react'
import { Icon } from '@/components'
import animate from '@/utils/animate'
import classnames from 'classnames'
import { getScrollTop, setScrollTop } from '@/utils/dom'
import './style.less'

type Props = unknown
interface BackTop {
  (props: Props): JSX.Element | null
}

const BackTop: BackTop = () => {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = getScrollTop()
      const winH = document.documentElement.clientHeight || document.body.clientHeight
      if (scrollTop > winH / 2) {
        setShow(true)
      } else {
        setShow(false)
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', () => null)
    }
  }, [])
  const onClick = () => {
    const top = getScrollTop()
    animate<{
      scrollTop: number
    }>({
      start: {
        scrollTop: top
      },
      end: {
        scrollTop: 0
      },
      onUpdate: ({ scrollTop }) => {
        setScrollTop(scrollTop)
      }
    })
  }
  return (
    <div
      className={classnames('back-top', {
        show
      })}
      onClick={onClick}
    >
      <Icon name="huidaodingbu" />
    </div>
  )
}

export default BackTop
