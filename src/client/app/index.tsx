import React, { useEffect, useRef, useState } from 'react'
// 提前引入样式，降低样式权重
import 'normalize.css'
import '@/styles/index.less'
import { Switch, Route, useHistory, useLocation, Redirect, useParams } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { staticRoutes, layoutRoutes } from '@/router'
import { ErrorBoundary, ViewLoading, AppearLoading } from '@/components'
import { useQuery } from '@/hooks'
import Layout from '@/pages/layout'
import { useSelector, useStore } from 'react-redux'
import { getRouterDirection } from './utils'
import { useRouterEach } from './useRouterEach'
import { IStore, IStoreState } from '@/store'

// 路由拦截
const RouterGuard = ({ Com, children, ...props }: any) => {
  const store = useStore() as IStore
  const routeParams = useRef({
    query: {},
    params: {}
  })
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const query = useQuery()
  routeParams.current.query = query
  routeParams.current.params = params

  const history = useHistory()
  useEffect(() => {
    const isServerRender = store.getState().app.isServerRender
    const options = {
      disabled: false
    }
    async function load() {
      if (!isServerRender && Com._init && history.action !== 'POP') {
        setLoading(true)
        await Com._init(store, routeParams.current, options)
        !options.disabled && setLoading(false)
      }
    }
    load()
    return () => {
      options.disabled = true
    }
  }, [Com, store, history])
  return (
    <div className="page-view">
      <Com
        {...props}
        store={store}
        fallback={
          // 添加div用来布局flex，让footer位于底部
          <div>
            <ViewLoading isBox />
          </div>
        }
      />
      {children}
      {loading && <ViewLoading isBox={store.getState().app.layoutSize === 'small'} className="page-view-loading" />}
    </div>
  )
}

let isPageTransition = false
let classNames = ''
const RenderLayout = ({ children }: any) => {
  useRouterEach()
  const store = useStore<IStoreState>()
  const location = useLocation()
  const history = useHistory()
  const routerDirection = getRouterDirection(store, location)
  if (!isPageTransition) {
    // 手动或者Link触发push操作
    if (history.action === 'PUSH') {
      classNames = 'router-forward'
    }
    // 浏览器按钮触发，或主动pop操作
    if (history.action === 'POP') {
      classNames = `router-${routerDirection}`
    }
    if (history.action === 'REPLACE') {
      classNames = 'router-fade'
    }
  }
  return (
    <TransitionGroup appear enter exit component={null} childFactory={(child) => React.cloneElement(child, { classNames })}>
      <CSSTransition
        key={location.pathname}
        timeout={500}
        onExit={() => (isPageTransition = true)}
        onExited={() => (isPageTransition = false)}
      >
        <Switch location={location}>
          {layoutRoutes.map((route, index) => {
            return (
              <Route
                key={`${index} + ${route.path}`}
                path={route.path}
                render={(props) => {
                  return (
                    <RouterGuard Com={route.component} {...props}>
                      {children}
                    </RouterGuard>
                  )
                }}
                exact={route.exact}
              />
            )
          })}
          <Redirect to="/404" />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  )
}

const App = () => {
  return (
    <>
      <ErrorBoundary>
        <Switch>
          {staticRoutes.map((route, index) => {
            return (
              <Route
                key={`${index} + ${route.path}`}
                path={route.path}
                render={(props) => {
                  return <route.component {...props} fallback={<ViewLoading isBg />} />
                }}
                exact={route.exact}
              />
            )
          })}
          <Route
            render={() => {
              return (
                <Layout>
                  <RenderLayout />
                </Layout>
              )
            }}
          />
        </Switch>
      </ErrorBoundary>
    </>
  )
}

export default App
