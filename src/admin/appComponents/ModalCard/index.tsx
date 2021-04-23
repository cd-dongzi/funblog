import React, { ReactNode } from 'react'
import { Modal, ModalProps, Button, Spin } from 'antd'

type Props = ModalProps & {
  loading?: boolean
  children: ReactNode
}
interface ModalCard {
  (props: Props): JSX.Element | null
}

const ModalCard: ModalCard = ({ centered = true, footer, loading = false, onCancel, onOk, children, ...props }) => {
  return (
    <Modal
      {...props}
      centered={centered}
      onCancel={onCancel}
      footer={
        <div className="modal-card__footer">
          <Button key="back" onClick={onCancel}>
            取消
          </Button>
          <Button key="submit" type="primary" onClick={onOk}>
            确认
          </Button>
        </div>
      }
    >
      <Spin spinning={loading} tip="Loading">
        {children}
      </Spin>
    </Modal>
  )
}

export default ModalCard
