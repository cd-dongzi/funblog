import React from 'react'
import './style.less'

type Props = {
  children: any
  widget: any
}
interface DropdownMenu {
  (props: Props): JSX.Element | null
}

const DropdownMenu: DropdownMenu = ({ children, widget }) => {
  return (
    <div className="dropdown">
      {children}
      <div className="dropdown-box">{widget}</div>
    </div>
  )
}

export default DropdownMenu
