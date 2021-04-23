export interface NotificationProps {
  type: 'error' | 'info'
  mode: 'normal' | 'stack'
  message: string
  duration?: number
  animateClass?: string
}

export interface NoticeItem extends NotificationProps {
  id: string
}
