import React from 'react'
import { Comment } from '@root/src/models/comment'
import Item, { onReply } from './item'
import './style.less'

type Props = {
  list: Comment[]
  onReply: onReply
  showFloor?: boolean
}
interface MessageList {
  (props: Props): JSX.Element | null
}

const MessageList: MessageList = ({ list, onReply, showFloor = false }) => {
  return (
    <div className="message-list">
      {list.map((item) => (
        <Item onReply={onReply} item={item} key={item._id} showFloor={showFloor} />
      ))}
    </div>
  )
}

export default MessageList
