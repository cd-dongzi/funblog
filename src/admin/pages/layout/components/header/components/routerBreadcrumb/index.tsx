import React, { useState, useEffect } from 'react'
import { Breadcrumb } from 'antd'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import { getRouteByRoutes } from '@/utils/router'
import './style.less'

type Props = unknown
interface RouterBreadcrumb {
  (props: Props): JSX.Element | null
}

type R = { path: string; title: string }
const RouterBreadcrumb: RouterBreadcrumb = () => {
  const [list, setList] = useState<R[]>([])
  const location = useLocation()
  useEffect(() => {
    const route = getRouteByRoutes(location.pathname, { isGroup: true })
    const arr = [{ path: '/dashboard', title: '首页' }]
    if (route && route.title !== '首页') {
      arr.push({ title: route.title || '', path: route.path || '' })
      if (route.child) {
        arr.push({ title: route.child.title || '', path: route.child.path || '' })
      }
      setList(arr)
    } else {
      setList(arr)
    }
  }, [location])
  return (
    <div className="router-breadcrumb">
      <Breadcrumb>
        {list.map((item, index) => {
          return (
            <Breadcrumb.Item key={item.title}>
              {index === list.length - 1 ? item.title : <Link to={item.path}>{item.title}</Link>}
            </Breadcrumb.Item>
          )
        })}
      </Breadcrumb>
    </div>
  )
}

export default RouterBreadcrumb
