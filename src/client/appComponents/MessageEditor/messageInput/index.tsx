import React, { forwardRef, useImperativeHandle, useRef } from 'react'

type Props = unknown

export type MessageInputRef = {
  insertAtCursor: (val: string) => void
  getVal: () => string
  focus: () => void
  clear: () => void
}
const MessageInput = forwardRef<MessageInputRef, Props>((props, ref) => {
  const inputRef = useRef<HTMLTextAreaElement>(null)
  useImperativeHandle(ref, () => ({
    insertAtCursor: (val: string) => {
      const dom = inputRef.current as HTMLTextAreaElement
      // 光标所在位置插入字符
      if ((document as any).selection) {
        dom.focus()
        const sel = (document as any).selection.createRange()
        sel.text = val
        sel.select()
      } else if (dom.selectionStart || dom.selectionStart === 0) {
        const startPos = dom.selectionStart
        const endPos = dom.selectionEnd
        const restoreTop = dom.scrollTop
        dom.value = dom.value.substring(0, startPos) + val + dom.value.substring(endPos, dom.value.length)
        if (restoreTop > 0) {
          dom.scrollTop = restoreTop
        }
        dom.focus()
        dom.selectionStart = startPos + val.length
        dom.selectionEnd = startPos + val.length
      } else {
        dom.value += val
        dom.focus()
      }
    },
    getVal() {
      const dom = inputRef.current as HTMLTextAreaElement
      return dom && dom.value
    },
    focus() {
      const dom = inputRef.current as HTMLTextAreaElement
      dom && dom.focus()
    },
    clear() {
      const dom = inputRef.current as HTMLTextAreaElement
      dom && (dom.value = '')
    }
  }))
  return <textarea ref={inputRef} className="message-input" rows={5} placeholder="同道中人，理性留言..." />
})

export default MessageInput
