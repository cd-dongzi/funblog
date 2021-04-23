import React, { forwardRef, useState, useRef, useEffect, useImperativeHandle } from 'react'
import ReactDom from 'react-dom'
import { Comment } from '@root/src/models/comment'
import MessageEditor, { MessageEditorRef } from '../MessageEditor'
import MessageList from '../MessageList'

interface RenderEditorRef {
  focus: (val: boolean) => void
}
const RenderEditor = forwardRef<
  RenderEditorRef,
  { replyItem: Comment; container: HTMLDivElement; onCancel: () => void; onSubmit: (val: string, replyItem?: Comment) => Promise<any> }
>(({ container, replyItem, onCancel, onSubmit }, ref) => {
  const [isFocus, setIsFocus] = useState(false)
  const [hasCancel, setHasCancel] = useState(false)
  const messageEditorRef = useRef<MessageEditorRef>(null)
  useImperativeHandle(ref, () => ({
    focus: (val) => {
      setIsFocus(true)
      setHasCancel(true)
    }
  }))
  useEffect(() => {
    if (isFocus) {
      messageEditorRef.current?.focus()
      setIsFocus(false)
    }
  }, [isFocus])
  // 取消回复
  const handleCancel = () => {
    setHasCancel(false)
    onCancel()
  }
  const handleReplySubmit = async (val: string, replyItem?: Comment) => {
    await onSubmit(val, replyItem)
    handleCancel()
    return
  }
  if (!container) {
    return <MessageEditor replyItem={replyItem} ref={messageEditorRef} onSubmit={onSubmit} />
  }
  return ReactDom.createPortal(
    <MessageEditor
      replyItem={replyItem}
      ref={messageEditorRef}
      hasCancel={hasCancel}
      onCancel={handleCancel}
      onSubmit={handleReplySubmit}
    />,
    container
  )
})

type Props = {
  list: Comment[]
  onSubmit: (val: string, replyItem?: Comment) => Promise<any>
  showFloor?: boolean
}
interface MessageBox {
  (props: Props): JSX.Element | null
}
const MessageBox: MessageBox = ({ list, onSubmit, showFloor }) => {
  const outsideRef = useRef<HTMLDivElement>(null)
  const [replyItem, setReplyItem] = useState<Comment | null>(null)
  const messageEditorRef = useRef<RenderEditorRef>(null)
  const [container, setContainer] = useState<HTMLDivElement>()
  const onReply = (dom: HTMLDivElement, item: Comment) => {
    setReplyItem(item)
    setContainer(dom)
    messageEditorRef.current?.focus(true)
  }
  useEffect(() => {
    setContainer(outsideRef.current as HTMLDivElement)
  }, [])
  const onCancel = () => {
    setReplyItem(null)
    setContainer(outsideRef.current as HTMLDivElement)
  }
  return (
    <>
      <div className="message-box">
        <RenderEditor
          container={container as HTMLDivElement}
          replyItem={replyItem as Comment}
          ref={messageEditorRef}
          onCancel={onCancel}
          onSubmit={onSubmit}
        />
        <div ref={outsideRef}></div>
        <MessageList onReply={onReply} list={list} showFloor={showFloor} />
      </div>
    </>
  )
}

export default MessageBox
