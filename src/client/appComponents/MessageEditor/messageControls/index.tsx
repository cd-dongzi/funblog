import React, { useEffect, useState } from 'react'
import { Icon, Tooltip } from '@/components'
import { useSelector } from 'react-redux'
import { IStoreState } from '@/store'
import classnames from 'classnames'
import { useMounted } from '@/hooks'
import './style.less'

type Props = {
  hasCancel: boolean
  onCancel?: () => void
  onFill: () => void
  onEmoji: (e: React.MouseEvent) => void
  onPreview: () => void
  onSubmit: () => Promise<any>
}
interface MessageControls {
  (props: Props): JSX.Element | null
}

type ListItem = {
  icon: string
  tip: string
  onClick: any
  text?: string
}

const MessageControls: MessageControls = ({ hasCancel, onCancel, onFill, onEmoji, onPreview, onSubmit }) => {
  const app = useSelector((state: IStoreState) => state.app)
  const [loading, setLoading] = useState(false)
  const [list, setList] = useState<ListItem[]>([
    { icon: 'biaoqing', tip: '表情', onClick: onEmoji },
    { icon: 'editor-preview', tip: '预览', onClick: onPreview }
  ])
  const mounted = useMounted()
  const handleSubmit = async () => {
    setLoading(true)
    try {
      await onSubmit()
    } finally {
      if (mounted()) {
        setLoading(false)
      }
    }
  }
  return (
    <div className="message-controls df-sb">
      <ul>
        {list.map((item) => (
          <li
            key={item.icon}
            className="message-controls__item"
            onClick={(e) => {
              item.onClick && item.onClick(e)
            }}
          >
            <Tooltip content={item.tip}>
              <Icon name={item.icon} />
              {item.text && <span>{item.text}</span>}
            </Tooltip>
          </li>
        ))}
      </ul>
      <div className="message-controls__box df-c">
        {app.layoutSize === 'large' && (
          <div className="message-controls__tip df-c">
            <Icon name="info"></Icon>
            <span>可使用部分markdown语法</span>
          </div>
        )}
        {hasCancel && (
          <button className="btn-clear message-controls__cancel" onClick={onCancel}>
            取消回复
          </button>
        )}
        <button
          className={classnames('btn-clear message-controls__submit', {
            loading
          })}
          onClick={handleSubmit}
        >
          <Icon name={loading ? 'loading' : 'fabu'} />
          <span>{loading ? '发布中' : '发布评论'}</span>
        </button>
      </div>
    </div>
  )
}

export default MessageControls
