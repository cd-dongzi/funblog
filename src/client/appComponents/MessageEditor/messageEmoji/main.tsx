import React, { useEffect, useRef, useState } from 'react'
import classnames from 'classnames'
import { emojiList, EmojiItem } from '@/config/emoji'
import { getScrollTop } from '@/utils/dom'
import './style.less'

export type MessageEmojiProps = {
  onChange: (item: EmojiItem) => void
  // left: number
  // top: number
  targetRect: {
    width: number
    height: number
    top: number
    left: number
  }
  onClose?: () => void
}
interface MessageEmoji {
  (props: MessageEmojiProps): JSX.Element | null
}

const MessageEmoji: MessageEmoji = ({ onClose, onChange, targetRect }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const arrowRef = useRef<HTMLDivElement>(null)
  const currentRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState<EmojiItem>()
  const [arrowMode, setArrowMode] = useState('bottom')
  const [containerStyle, setContainerStyle] = useState({
    left: '0px',
    top: '0px'
  })
  const [arrowStyle, setArrowStyle] = useState<any>({})
  const [currentStyle, setCurrentStyle] = useState({
    left: '0px',
    top: '0px'
  })
  // hover
  const onMouseOver = (item: EmojiItem) => {
    setCurrent(item)
  }
  const onMouseOut = () => {
    setCurrent(undefined)
  }
  // select
  const onClick = (item: EmojiItem, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    onChange(item)
    onClose && onClose()
  }

  useEffect(() => {
    if (!current) {
      return
    }
    const index = emojiList.findIndex((item) => item.name === current?.name)
    const target = contentRef.current?.children[index] as HTMLDivElement
    if (!target) return
    const { offsetLeft, offsetTop } = target
    const { width: tW } = target.getBoundingClientRect()
    const { width: bW, height: bH } = (currentRef.current as HTMLDivElement).getBoundingClientRect()
    setCurrentStyle({
      left: `${offsetLeft - bW / 2 + tW / 2}px`,
      top: `${offsetTop - bH - 20}px`
    })
  }, [current])

  useEffect(() => {
    if (containerRef.current && arrowRef.current) {
      const top = getScrollTop() + targetRect.top
      const left = targetRect.left + targetRect.width / 2
      const containerRect = containerRef.current.getBoundingClientRect()
      const carrowRect = arrowRef.current.getBoundingClientRect()
      let x, y, ax, ay
      if (containerRect.width / 2 <= left) {
        x = left - containerRect.width / 2
        ax = `${containerRect.width / 2 - carrowRect.width / 2}px`
      } else {
        x = 0
        ax = `${left - carrowRect.width / 2}px`
      }
      const h = containerRect.height + 10
      if (h <= targetRect.top) {
        y = top - h
        ay = '100%'
        setArrowMode('bottom')
      } else {
        y = top + targetRect.height + 10
        ay = `-${carrowRect.height}px`
        setArrowMode('top')
      }
      setContainerStyle({
        left: `${x}px`,
        top: `${y}px`
      })
      setArrowStyle({
        left: ax,
        top: ay
      })
    }
  }, [targetRect])

  return (
    <div ref={containerRef} className="message-emoji" onClick={(e) => e.stopPropagation()} onMouseOut={onMouseOut} style={containerStyle}>
      <div className={classnames('message-emoji__arrow', arrowMode)} ref={arrowRef} style={arrowStyle}></div>
      <div className="message-emoji__content" ref={contentRef}>
        {emojiList.map((item) => (
          <div className="emoji" key={item.name} onMouseOver={() => onMouseOver(item)} onClick={(e) => onClick(item, e)}>
            <img src={item.url} alt={item.cn} />
          </div>
        ))}
      </div>
      {current && (
        <div className="message-emoji__current" style={currentStyle} ref={currentRef}>
          <span className="message-emoji__current-tip">{current.cn}</span>
          <div className="message-emoji__current-icon">
            <img src={current.url} alt={current.cn} />
          </div>
        </div>
      )}
    </div>
  )
}

export default MessageEmoji
