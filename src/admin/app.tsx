import React, { Suspense } from 'react'
import { ErrorBoundary, LoadingPage } from '@/components'
import { Switch, Route, Redirect } from 'react-router-dom'
import { AuthRoute } from '@/appComponents'
import Layout from '@/pages/layout'
import { Spin } from 'antd'
import { staticRoutes, layoutRoutes } from './router'

type Props = unknown
interface App {
  (props: Props): JSX.Element | null
}

const RouteWrap = (route: App.Route) => {
  return (
    <Route
      key={route.name}
      exact
      path={route.path}
      render={(props) => {
        if (route.disabledAuth) {
          return <route.component {...props} />
        }
        return <AuthRoute Component={route.component} {...props} />
      }}
    />
  )
}

const FallbackDom = () => {
  return (
    <div
      className="layout-loading df-c"
      style={{
        height: `calc(100vh - 50px)`
      }}
    >
      <Spin />
    </div>
  )
}

const App: App = () => {
  const routes = [...layoutRoutes.filter((route) => !route.redirect), ...layoutRoutes.filter((route) => route.redirect)]
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingPage />}>
        <Switch>
          {staticRoutes.map((route) => {
            return RouteWrap(route)
          })}
          <Route
            render={() => {
              return (
                <Layout>
                  <Suspense fallback={<FallbackDom />}>
                    <Switch>
                      {routes.map((route) => {
                        if (route.redirect) {
                          return <Redirect exact key={route.redirect} to={route.redirect} />
                        }
                        if (route.children) {
                          return route.children.map((r) => RouteWrap(r))
                        }
                        return RouteWrap(route)
                      })}
                    </Switch>
                  </Suspense>
                </Layout>
              )
            }}
          />
        </Switch>
      </Suspense>
    </ErrorBoundary>
  )
}

export default App
