import React, { ReactNode, useState } from 'react'
import { Icon } from '@/components'
import classnames from 'classnames'
import './style.less'

type Props = {
  title?: ReactNode
  content?: ReactNode
  onClose?: () => void
  onCancel?: () => void
  onConfirm?: () => void
}
interface ModalPrompt {
  (props: Props): JSX.Element | null
}

const ModalPrompt: ModalPrompt = ({ title, content, onClose, onCancel, onConfirm }) => {
  const [loading, setLoading] = useState(false)
  const handleConfirm = async () => {
    setLoading(true)
    if (onConfirm) {
      await onConfirm()
    }
    setLoading(false)
  }
  return (
    <div className="modal-prompt">
      <div className="moddal-wave__header df-sb">
        <div className="moddal-wave__name">{title}</div>
        <Icon name="close" className="modal-prompt__close" onClick={onClose} />
      </div>
      <div className="modal-prompt__content">{content}</div>
      <div className="modal-prompt__footer">
        <button className="btn-clear modal-prompt__btn modal-prompt__btn-cancel" onClick={onCancel}>
          取消
        </button>
        <button
          className={classnames('btn-clear modal-prompt__btn modal-prompt__btn-confirm', {
            loading
          })}
          onClick={handleConfirm}
        >
          {loading ? <Icon name="loading" /> : '确定'}
        </button>
      </div>
    </div>
  )
}

export default ModalPrompt
