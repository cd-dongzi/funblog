import React, { useState, forwardRef, useImperativeHandle, useCallback } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import Normal from './normal'
import Stack from './stack'
import { NoticeItem } from './type'
import './style.less'

type Props = {
  onEnd: () => void
}

export interface NotificationContainerRef {
  onAdd: (item: NoticeItem) => void
}

const NotificationContainer = forwardRef<NotificationContainerRef, Props>(({ onEnd }, ref) => {
  const [list, setList] = useState<NoticeItem[]>([])
  useImperativeHandle(ref, () => ({
    onAdd: (item: NoticeItem) => {
      setList((prev) => [...prev, item])
    }
  }))
  const onRemove = useCallback(
    (item: NoticeItem) => {
      setList((prev) => {
        const arr = prev.filter((v) => v.id !== item.id)
        if (arr.length === 0) {
          // 动画执行完之后关闭
          const timer = setTimeout(() => {
            clearTimeout(timer)
            onEnd()
          }, 500)
        }
        return arr
      })
    },
    [onEnd]
  )
  return (
    <div className="notification-container">
      <TransitionGroup component={null}>
        {list.map((item) => (
          <CSSTransition
            key={item.id}
            appear
            classNames={item.animateClass}
            addEndListener={(node, done) => node.addEventListener('transitionend', done, false)}
          >
            {item.mode === 'normal' ? (
              <Normal key={item.id} onRemove={onRemove} item={item} />
            ) : (
              <Stack key={item.id} onRemove={onRemove} item={item} />
            )}
            {/* {item.mode === 'stack' && <Stack key={item.id} onRemove={onRemove} item={item} />} */}
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  )
})

export default NotificationContainer
