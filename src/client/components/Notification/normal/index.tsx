import React, { useEffect } from 'react'
import classnames from 'classnames'
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
    <div className={classnames('notification-normal df-c', item.type)}>
      {item.message}
      <div className="notification-normal__tip df-c">
        <Icon name={item.type === 'error' ? 'point' : 'Info'} />
      </div>
    </div>
  )
}

export default NotificationNormal
