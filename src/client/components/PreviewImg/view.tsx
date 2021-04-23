import React, { useRef, useState } from 'react'
import { Dialog } from '@/components'
import './style.less'

type Props = {
  src: string
  onClose?: () => void
}
interface PreviewImg {
  (props: Props): JSX.Element | null
}

const PreviewImg: PreviewImg = ({ src, onClose }) => {
  const ref = useRef()
  const [show, setShow] = useState(true)
  const handleClose = () => {
    setShow(false)
    onClose && onClose()
  }
  return (
    <Dialog show={show} onClose={handleClose} contentClassName="df-c">
      <div className="preview-img-container" onClick={handleClose}>
        <img src={src} onClick={(e) => e.stopPropagation()} />
      </div>
    </Dialog>
  )
}

export default PreviewImg
