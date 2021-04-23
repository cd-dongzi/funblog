import React from 'react'
import MenuBtn from './components/menuBtn'
import RouterBreadcrumb from './components/routerBreadcrumb'
import TagViews from './components/tagViews'
import SignOut from './components/signOut'
import './style.less'
type Props = {
  collapsed: boolean
  onToggle: () => void
}
const LayoutHeader = ({ onToggle, collapsed }: Props) => {
  return (
    <div className="layout-header df-sb">
      <div className="layout-header__controls df-c">
        <div className="df-fixed df-c layout-header__controls-l">
          <MenuBtn onClick={onToggle} collapsed={collapsed} />
          <RouterBreadcrumb />
        </div>
        <TagViews />
      </div>
      <div className="df-fixed layout-header__menu">
        <SignOut />
      </div>
    </div>
  )
}

export default LayoutHeader
