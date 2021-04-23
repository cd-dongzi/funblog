import React from 'react'
import { Icon } from '@/components'
import './style.less'

type Props = {
  children: any
}
interface ModalWave {
  (props: Props): JSX.Element | null
}

const ModalWave: ModalWave = ({ children }) => {
  return <div className="modal-wave">{children}</div>
}

export default ModalWave
