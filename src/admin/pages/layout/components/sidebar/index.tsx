import React from 'react'
import { Menu } from 'antd'
import { layoutRoutes } from '@/router'
import { Icon } from '@/components'
import { setAppState, setAppTagViews } from '@/store/app/action'
import { IStoreState } from '@/store'
import { useHistory, useLocation } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import './style.less'

const routes = layoutRoutes.filter((route) => route.title && !route.hiddenLayout)

const SubMenu = Menu.SubMenu
const MenuItem = Menu.Item

const rootSubmenuKeys = routes.filter((route) => route.children).map((route) => route.name)

const getNameByRoute = (pathname: string) => {
  const obj = routes.find((route) => {
    if (route.children) {
      return route.children.some((r) => r.path === pathname)
    }
    return route.path === pathname
  })
  let selectedKey = ''
  if (obj) {
    if (obj.children) {
      const o = obj.children.find((route) => route.path === pathname)
      selectedKey = (o && o.name) as string
    } else {
      selectedKey = obj.name as string
    }
  }
  return {
    key: obj ? obj.name || '' : '',
    selectedKey
  }
}

type Props = {
  collapsed: boolean
}
interface Sidebar {
  (props: Props): JSX.Element | null
}

const Sidebar: Sidebar = ({ collapsed }) => {
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()
  const app = useSelector((state: IStoreState) => state.app)
  const defaultKey = getNameByRoute(location.pathname)
  const [openKeys, setOpenKeys] = React.useState<string[]>([defaultKey.key])
  const [defaultSelectedKeys] = React.useState<string[]>([defaultKey.selectedKey])

  const onOpenChange = (keys: React.Key[]) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key as string) === -1) as string
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys as string[])
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
  }

  const onClick = (route: App.Route) => {
    if (app.layoutSize === 'small') {
      dispatch(
        setAppState({
          collapsed: true
        })
      )
    }
    history.push(route.path as string)
  }
  return (
    <div className="layout-sidebar" id="layout-sidebar">
      <Menu
        theme="dark"
        mode="inline"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        defaultSelectedKeys={defaultSelectedKeys}
        inlineCollapsed={collapsed}
      >
        {routes.map((route) => {
          if (route.children) {
            return (
              <SubMenu key={route.name} icon={<Icon name={route.icon as string} />} title={route.title}>
                {route.children
                  .filter((r) => r.title && !r.hiddenLayout)
                  .map((r) => {
                    return (
                      <MenuItem key={r.name} icon={<Icon name={r.icon as string} />} onClick={() => onClick(r)}>
                        {r.title}
                      </MenuItem>
                    )
                  })}
              </SubMenu>
            )
          }
          return (
            <MenuItem key={route.name} icon={<Icon name={route.icon as string} />} onClick={() => onClick(route)}>
              {route.title}
            </MenuItem>
          )
        })}
      </Menu>
    </div>
  )
}

export default Sidebar
