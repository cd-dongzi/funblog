import React, { ReactNode } from 'react'
import { Button, ButtonProps, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

type Props = ButtonProps & {
  content: ReactNode
  children: any
  onOk?: () => void
  onCancel?: () => void
}
interface DelButton {
  (props: Props): JSX.Element | null
}

const DelButton: DelButton = ({ children, content, onOk, onCancel, ...props }) => {
  const handleClick = () => {
    Modal.confirm({
      title: '确认',
      icon: <ExclamationCircleOutlined />,
      content: content,
      onOk: onOk,
      onCancel: onCancel
    })
  }
  return (
    <Button {...props} onClick={handleClick}>
      {children}
    </Button>
  )
}

export default DelButton
