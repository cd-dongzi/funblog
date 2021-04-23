import React, { useState } from 'react'
import ReactDom from 'react-dom'
import Modal, { IModal, Props } from './main'

type Params = Omit<Props, 'show'>
interface IIModal extends IModal {
  show: (props: Params) => void
  hide: () => void
}

const initState = { mode: 'wave', title: '提示' }
const modal = Modal as IIModal

let container: Element | null = null

const Wrap = ({ onClose, onConfirm, ...params }: Params) => {
  const [show, setShow] = useState(true)
  const handleClose = () => {
    setShow(false)
    modal.hide()
    onClose && onClose()
  }
  const handleConfirm = async () => {
    if (onConfirm) {
      await onConfirm()
    }
    setShow(false)
    modal.hide()
    return
  }
  return (
    <>
      <Modal show={show} {...params} onClose={handleClose} onConfirm={handleConfirm} />
    </>
  )
}
modal.hide = () => {
  if (container) {
    container.parentNode?.removeChild(container)
    container = null
  }
}
modal.show = (props) => {
  const params = {
    ...initState,
    ...(props || {})
  } as Params
  container = document.createElement('div')
  document.body.appendChild(container)
  ReactDom.render(<Wrap {...params} />, container)
}
export default modal
