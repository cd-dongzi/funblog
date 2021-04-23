import { useLocation } from 'react-router'
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateNaviagtion } from '@/store/navigation/action'
import { setIsServerRender } from '@/store/app/action'

export const useRouterEach = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const ref = useRef({
    prevPathname: ''
  })
  // 记录服务端渲染
  useEffect(() => {
    dispatch(setIsServerRender(false))
  }, [dispatch])
  // 更新导航记录
  useEffect(() => {
    dispatch(
      updateNaviagtion({
        path: location.pathname,
        key: location.key || ''
      })
    )
  }, [location, dispatch])
  // 路由切换回到顶部
  useEffect(() => {
    if (ref.current.prevPathname !== location.pathname) {
      ref.current.prevPathname = location.pathname
      window.scrollTo(0, 0)
    }
  }, [location])
}
