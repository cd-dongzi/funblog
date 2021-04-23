import React, { useEffect, useState, useRef, ReactNode } from 'react'
import classnames from 'classnames'
import { CSSTransition } from 'react-transition-group'
import { Portal } from '@/components'
import { useDisabledScrollByMask } from '@/hooks'
// import Wave from './wave'
// import Alert from './alert'
import Prompt from './prompt'
import './style.less'

export type Props = {
  show: boolean
  title?: ReactNode
  content?: ReactNode
  children?: any
  mode?: 'wave' | 'alert' | 'custom'
  maskClosable?: boolean
  onClose?: () => void
  onConfirm?: () => void
  backgroundColor?: string
  rootName?: string
  className?: string
}
export interface IModal {
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

const Modal: IModal = ({
  show,
  title,
  content,
  children,
  mode = 'alert',
  maskClosable = true,
  onClose,
  onConfirm,
  backgroundColor,
  rootName,
  className
}) => {
  const maskRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [showPortal, setShowPortal] = useState(show)
  useDisabledScrollByMask({
    show: showPortal,
    maskEl: maskRef.current,
    contentEl: contentRef.current
  })
  useEffect(() => {
    if (show) {
      setShowPortal(show)
    }
  }, [show])
  const handleClose = () => {
    if (maskClosable) {
      onClose && onClose()
    }
  }
  const onExited = () => {
    setShowPortal(false)
  }
  const onContentExited = (node: HTMLElement) => {
    node.style.display = 'none'
  }
  if (!showPortal) {
    return null
  }

  const com = title ? <Prompt title={title} content={content} onClose={onClose} onCancel={onClose} onConfirm={onConfirm} /> : children
  return (
    <Portal>
      <div className={classnames('modal-root df-c', rootName, mode)}>
        <CssAnimate show={show} classNames="modal-mask" onExited={onExited}>
          <div className="modal-mask" onClick={handleClose} style={{ backgroundColor }} ref={maskRef}></div>
        </CssAnimate>
        <CssAnimate show={show} classNames="modal-content" onExited={onContentExited}>
          <div className={classnames('modal-content', className)} ref={contentRef}>
            {/* {mode === 'wave' && <Wave>{com}</Wave>}
            {mode === 'alert' && <Alert>{com}</Alert>}
            {mode === 'custom' && children} */}
            {com}
          </div>
        </CssAnimate>
      </div>
    </Portal>
  )
}

export default Modal
