import React, { forwardRef, useRef, useState, useImperativeHandle } from 'react'
import { Modal, notification } from '@/components'
import { ModalLogin } from '@/appComponents'
import { Comment } from '@root/src/models/comment'
import MessageInput, { MessageInputRef } from './messageInput'
import MessageControls from './messageControls'
import Emoji from './messageEmoji'
import PreviewStyle from './previewStyle'
import './style.less'

type Props = {
  hasCancel?: boolean
  replyItem?: Comment
  onCancel?: () => void
  onSubmit: (val: string, replyItem?: Comment) => Promise<any>
}
export interface MessageEditorRef {
  focus: () => void
}

const MessageEditor = forwardRef<MessageEditorRef, Props>(({ replyItem, hasCancel = false, onCancel, onSubmit }, ref) => {
  const [showPreview, setShowPreview] = useState(false)
  const [showIdentityFill, setShowIdentityFill] = useState(false)
  const [text, setText] = useState('')
  const inputRef = useRef<MessageInputRef>({} as MessageInputRef)
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus()
    }
  }))
  // 表情
  const onEmoji = (e: React.MouseEvent) => {
    Emoji.show({
      target: e.currentTarget,
      onChange: (item) => {
        inputRef.current.insertAtCursor(`[emoji=${item.name}]`)
      }
    })
    e.stopPropagation()
  }
  // 信息填写
  const onFill = () => {
    setShowIdentityFill(true)
  }
  // 预览
  const onPreview = () => {
    const val = inputRef.current.getVal()
    if (!val) {
      return notification.error('随便写写吧~')
    }
    setText(val)
    setShowPreview(true)
  }
  // 提交
  const handleSubmit = async () => {
    await onSubmit(inputRef.current.getVal(), replyItem)
    inputRef.current && inputRef.current.clear()
    return
  }
  return (
    <div className="message-editor">
      <MessageInput ref={inputRef} />
      <MessageControls
        hasCancel={hasCancel}
        onEmoji={onEmoji}
        onPreview={onPreview}
        onFill={onFill}
        onCancel={onCancel}
        onSubmit={handleSubmit}
      />
      <Modal show={showPreview} onClose={() => setShowPreview(false)}>
        <PreviewStyle text={text} />
      </Modal>
      <ModalLogin onClose={() => setShowIdentityFill(false)} show={showIdentityFill} />
    </div>
  )
})

export default MessageEditor
