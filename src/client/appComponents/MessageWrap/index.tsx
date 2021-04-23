import React from 'react'
import { BannerTag, Icon, notification } from '@/components'
import { MessageBox } from '@/appComponents'
import classnames from 'classnames'
import { Comment } from '@root/src/models/comment'
import { checkMint } from '@/utils/html'
import './style.less'

type Props = {
  total: number
  list: Comment[]
  className?: string
  onSubmit: (val: string, replyItem?: Comment) => Promise<any>
  showFloor?: boolean
}
interface MessageWrap {
  (props: Props): JSX.Element | null
}

const MessageWrap: MessageWrap = ({ total, list, className, onSubmit, showFloor }) => {
  const handSubmit = async (val: string, replyItem?: Comment) => {
    const obj = checkMint(val)
    if (obj.pass) {
      return onSubmit(val, replyItem)
    } else {
      notification.error(`您的留言包含以下敏感词汇：${obj.words.join('、')}`)
      throw '包含敏感词汇'
    }
  }
  return (
    <div className={classnames('message-wrap', className)}>
      <BannerTag className="message-wrap-total">
        <div className="message-wrap-total__box df-c">
          <Icon name="message" />
          <div className="message-wrap-total__text">{total}条留言</div>
        </div>
      </BannerTag>
      <MessageBox list={list} onSubmit={handSubmit} showFloor={showFloor} />
    </div>
  )
}

export default MessageWrap
