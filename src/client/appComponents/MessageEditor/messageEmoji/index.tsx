import React, { createRef, useEffect, useState } from 'react'
import ReactDom from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import { getScrollTop } from '@/utils/dom'
import { EmojiItem } from '@/config/emoji'
import Com, { MessageEmojiProps } from './main'

interface ShowProps {
  target: Element
  onChange: (item: EmojiItem) => void
}
let container: any

const Container = (props: Omit<MessageEmojiProps, 'onClose'>) => {
  const [show, setShow] = useState(true)
  useEffect(() => {
    const fn = () => {
      setShow(false)
    }
    window.addEventListener('click', fn, false)
    return () => {
      window.removeEventListener('click', fn, false)
    }
  }, [])
  const onExited = () => {
    if (container) {
      document.body.removeChild(container)
      container = null
    }
  }
  return (
    <CSSTransition
      appear
      in={show}
      classNames="message-emoji-container"
      addEndListener={(node, done) => node.addEventListener('transitionend', done, false)}
      onExited={onExited}
    >
      <Com onClose={() => setShow(false)} {...props} />
    </CSSTransition>
  )
}

const show = ({ target, onChange }: ShowProps) => {
  if (container) {
    return
  }
  const targetRect = target.getBoundingClientRect()
  container = document.createElement('div')
  document.body.appendChild(container)
  ReactDom.render(<Container onChange={onChange} targetRect={targetRect} />, container)
}

const Emoji = {
  show
}
export default Emoji
