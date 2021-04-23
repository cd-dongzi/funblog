import React from 'react'
import { Icon } from '@/components'
import './style.less'

type Props = {
  text?: string
}
interface Empty {
  (props: Props): JSX.Element | null
}

const Empty: Empty = ({ text = '此处空空如也~' }) => {
  return (
    <div className="empty-container">
      {/* <Icon name="empty" /> */}
      <Icon name="shangxin" />
      <p>{text}</p>
    </div>
  )
}

export default Empty
