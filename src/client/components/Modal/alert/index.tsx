import React from 'react'
import './style.less'

type Props = {
  children: any
}
interface ModalAlert {
  (props: Props): JSX.Element | null
}

const ModalAlert: ModalAlert = ({ children }) => {
  return <div className="modal-alert">{children}</div>
}

export default ModalAlert
