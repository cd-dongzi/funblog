import React, { useEffect } from 'react'
import { Icon } from '@/components'
import { NoticeItem } from '../type'
import './style.less'

type Props = {
  item: NoticeItem
  onRemove: (item: NoticeItem) => void
}
interface NotificationNormal {
  (props: Props): JSX.Element | null
}

const NotificationNormal: NotificationNormal = ({ item, onRemove }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      clearTimeout(timer)
      onRemove(item)
    }, item.duration)
  }, [onRemove, item])
  return (
    <div className="notification-stack" onClick={() => onRemove(item)}>
      <div className="title">
        <Icon name="ring"></Icon>
        <span>New Notification</span>
      </div>
      <div className="info">
        <div className="msg">{item.message}</div>
      </div>
    </div>
  )
}

export default NotificationNormal
