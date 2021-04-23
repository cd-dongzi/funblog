import React, { ReactNode, useCallback, useEffect, useState } from 'react'
import classnames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import config from '@/config'
import { setAppState } from '@/store/app/action'
import { IStoreState } from '@/store'
import { useDisabledScrollByMask } from '@/hooks'
import LayoutSidebar from './components/sidebar'
import LayoutHeader from './components/header'
import LayoutMain from './components/main'
import './style.less'

type Props = {
  children: ReactNode
}
interface Layout {
  (props: Props): JSX.Element | null
}

const Layout: Layout = ({ children }) => {
  const app = useSelector((state: IStoreState) => state.app)
  const dispatch = useDispatch()

  useDisabledScrollByMask({
    show: !app.collapsed && app.layoutSize === 'small'
  })

  const toggle = (bol?: boolean) => {
    let val = !app.collapsed
    if (typeof bol === 'boolean') {
      val = bol
    }
    dispatch(
      setAppState({
        collapsed: val
      })
    )
  }
  // 检测屏幕变化
  useEffect(() => {
    const init = () => {
      const doc = document.documentElement || document.body
      const width = doc.clientWidth
      const layoutSize = config.screenSizes.find((item) => width >= item.width)?.layout || 'large'
      dispatch(
        setAppState({
          layoutSize
        })
      )
    }
    init()
    window.addEventListener('resize', init, false)
    return () => {
      window.removeEventListener('resize', () => null)
    }
  }, [dispatch])
  // 屏幕变化设置
  useEffect(() => {
    dispatch(
      setAppState({
        collapsed: app.layoutSize === 'small'
      })
    )
  }, [dispatch, app.layoutSize])
  return (
    <div
      className={classnames('layout', `layout-${app.layoutSize}`, {
        collapsed: app.collapsed
      })}
    >
      <LayoutSidebar collapsed={app.collapsed} />
      <div className="layout-sidebar-mask" onClick={() => toggle(true)}></div>
      <LayoutMain>
        <LayoutHeader onToggle={toggle} collapsed={app.collapsed} />
        {children}
      </LayoutMain>
    </div>
  )
}

export default Layout
