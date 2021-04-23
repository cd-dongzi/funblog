import React from 'react'
import ReactDom from 'react-dom'
import config from '@/config'
import Container, { NotificationContainerRef } from './container'
import { NotificationProps } from './type'

let container: Element | null
const containerRef = React.createRef<NotificationContainerRef>()

const defualtProps: Partial<NotificationProps> = {
  type: 'info',
  animateClass: 'notification-animate',
  duration: 2000
}

const onEnd = () => {
  if (container) {
    container.parentNode?.removeChild(container)
    container = null
  }
}

const show = (props: NotificationProps) => {
  if (!config.isClient) return
  if (!container) {
    container = document.createElement('div')
    document.body.appendChild(container)
  }
  ReactDom.render(<Container ref={containerRef} onEnd={onEnd} />, container)
  containerRef.current?.onAdd({
    id: new Date().getTime().toString(),
    ...defualtProps,
    ...props
  })
}

const error = (props: Omit<NotificationProps, 'type' | 'mode'> | string) => {
  if (typeof props === 'string') {
    show({
      type: 'error',
      mode: 'normal',
      message: props
    })
  } else {
    show({
      type: 'error',
      mode: 'normal',
      ...(props || {})
    })
  }
}
const info = (props: Omit<NotificationProps, 'type' | 'mode'> | string) => {
  if (typeof props === 'string') {
    show({
      type: 'info',
      mode: 'normal',
      message: props
    })
  } else {
    show({
      type: 'info',
      mode: 'normal',
      ...(props || {})
    })
  }
}

const stack = {
  show: (message: string) => {
    show({
      type: 'info',
      mode: 'stack',
      animateClass: 'notification-animate-stack',
      message
    })
  }
}

export default {
  show,
  error,
  info,
  stack
}
