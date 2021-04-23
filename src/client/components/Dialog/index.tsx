import React, { useEffect, useRef, useState } from 'react'
import classnames from 'classnames'
import { CSSTransition } from 'react-transition-group'
import { Portal } from '@/components'
import { useDisabledScrollByMask } from '@/hooks'
import './style.less'

type Props = {
  show: boolean
  maskClosable?: boolean
  children?: any
  className?: string
  contentClassName?: string
  backgroundColor?: string
  onMask?: () => void
  onClose?: () => void
  onAfterClose?: () => void
}
interface Dialog {
  (props: Props): JSX.Element | null
}

const CssAnimate = ({
  show,
  classNames,
  onExited,
  children
}: {
  show: boolean
  classNames: string
  onExited?: (node: HTMLElement) => void
  children: any
}) => {
  return (
    <CSSTransition
      in={show}
      appear
      classNames={classNames}
      addEndListener={(node, done) => node.addEventListener('transitionend', done, false)}
      onExited={onExited}
    >
      {children}
    </CSSTransition>
  )
}

const Dialog: Dialog = ({
  show,
  maskClosable = true,
  children,
  className,
  contentClassName,
  backgroundColor = 'rgba(0, 0, 0, 0.5)',
  onMask,
  onClose,
  onAfterClose
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(show)
  useDisabledScrollByMask({
    show: visible,
    maskEl: ref.current,
    contentEl: contentRef.current
  })
  useEffect(() => {
    if (show) {
      setVisible(show)
    }
  }, [show])
  // 点击遮罩层
  const onContentClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === contentRef.current) {
      if (maskClosable) {
        onClose && onClose()
      }
      onMask && onMask()
    }
  }
  // 动画完毕退出
  const onExited = () => {
    setVisible(false)
    onAfterClose && onAfterClose()
  }
  if (!visible) {
    return null
  }
  return (
    <Portal>
      <div className={classnames('dialog-container', className)}>
        <CssAnimate show={show} classNames="dialog-mask-animate" onExited={onExited}>
          <div
            className="dialog-mask"
            style={{
              backgroundColor
            }}
            ref={ref}
          ></div>
        </CssAnimate>
        <CssAnimate show={show} classNames="dialog-content-animate">
          <div className={classnames('dialog-content', contentClassName)} ref={contentRef} onClick={onContentClick}>
            {children}
          </div>
        </CssAnimate>
      </div>
    </Portal>
  )
}

export default Dialog
