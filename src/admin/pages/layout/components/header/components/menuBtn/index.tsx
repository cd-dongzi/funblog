import React from 'react'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import './style.less'
type Props = {
  collapsed: boolean
  onClick: () => void
}
interface LayoutMenuBtn {
  (props: Props): JSX.Element | null
}

const LayoutMenuBtn: LayoutMenuBtn = ({ collapsed, onClick }) => {
  return (
    <div className="layout-menu-btn df-c" onClick={onClick}>
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'icon df-c'
      })}
    </div>
  )
}

export default LayoutMenuBtn
