import React, { useRef, useState } from 'react'
import { Icon } from '@/components'
import { Comment } from '@root/src/models/comment'
import { formatDate } from '@/utils/date'
import { formatEmoji, filterMint } from '@/utils/html'
import { formartMd } from '@root/src/shared/utils'
import { filterXSS } from '@root/src/shared/utils/xss'
import './style.less'

export type onReply = (dom: HTMLDivElement, item: Comment) => void

type Props = {
  item: Comment
  onReply: onReply
  showFloor?: boolean
}
interface MessageListItem {
  (props: Props): JSX.Element | null
}

const Name = ({ url, children }: { url?: string; children: any }) => {
  if (url) {
    return (
      <a target="_blank" className="name" href={url}>
        {children}
      </a>
    )
  }
  return <span className="name">{children}</span>
}

const Item = ({ item, onReply, showFloor = false }: { item: Comment; onReply: onReply; showFloor: boolean }) => {
  const editorRef = useRef<HTMLDivElement>(null)
  const handleReply = (obj: Comment) => {
    onReply(editorRef.current as HTMLDivElement, obj as any)
  }
  return (
    <>
      <div className="wrapper">
        <div className="side">
          <div className="avatar">
            <div
              className="bg-cover"
              style={{
                backgroundImage: `url(${item.avatar})`
              }}
            ></div>
          </div>
        </div>
        <div className="main">
          <div className="meta df-sb">
            <div className="name-wrapper">
              <Name url={item.url}>
                {item.name}
                {item.role.some((v) => v === 'admin') ? `（作者）` : ''}
                {typeof item.floor === 'number' && showFloor ? `（${item.floor}楼）` : ''}
              </Name>
              {item.questioner && (
                <>
                  <span className="tip">回复</span>
                  <Name url={item.questioner.url}>{item.questioner.name}</Name>
                </>
              )}
            </div>
            <time className="time">{formatDate(item.createTime)}</time>
            <div className="reply df-c" onClick={() => handleReply(item)}>
              <Icon name="reply" />
            </div>
          </div>
          <div className="content">
            <div
              className="intro md-container"
              dangerouslySetInnerHTML={{ __html: formatEmoji(filterXSS(filterMint(formartMd(item.content)))) }}
            ></div>
          </div>
        </div>
      </div>
      <div className="editor-box" ref={editorRef}></div>
    </>
  )
}

const MessageListItem: MessageListItem = ({ item, onReply, showFloor = false }) => {
  return (
    <div className="message-list-item">
      <Item item={item as any} onReply={onReply} showFloor={showFloor} />
      <div className="children">
        <ul>
          {item.replyList.map((v, i) => (
            <li key={`${v.createTime}-${i}`}>
              <Item item={v as Comment} onReply={onReply} showFloor={showFloor} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default MessageListItem
