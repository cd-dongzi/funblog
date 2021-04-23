import React from 'react'
import classnames from 'classnames'
import { Icon } from '@/components'
import { BlogSub } from '@root/src/models/blog'
import './style.less'

type Props = {
  item: BlogSub
  isHover?: boolean
}
interface CardSummary {
  (props: Props): JSX.Element | null
}

const CardSummary: CardSummary = ({ item, isHover = false }) => {
  return (
    <div
      className={classnames('summary-container', {
        'summary-hover': isHover
      })}
    >
      {[
        { icon: 'read', total: item.read_nums },
        { icon: 'like', total: item.like_nums },
        { icon: 'message', total: item.comment_nums }
      ].map((v) => (
        <div key={v.icon} className={classnames('summary-item df-c', `summary-item__${v.icon}`)}>
          <Icon name={v.icon} />
          <span>{v.total || 0}</span>
        </div>
      ))}
    </div>
  )
}

export default CardSummary
