import React, { useEffect, useState } from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter, useLocation } from 'react-router-dom'
import { Provider } from 'react-redux'
import { HelmetProvider } from 'react-helmet-async'
import { loadableReady } from '@loadable/component'
import loadInitData from '@root/src/shared/loadInitData'
import { staticRoutes } from '@/router'
import { getStore } from './store'
import { setAppState } from './store/app/action'
import App from './app'
import { globalFn, globalFnByStore } from './global'
const store = getStore(window.__PRELOADED_STATE__, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const Entry = () => {
  const location = useLocation()
  // loading加载完毕
  useEffect(() => {
    globalFn()
    globalFnByStore(store)
    store.dispatch(
      setAppState({
        pageLoaded: true
      })
    )
  }, [])
  // 加载初始数据
  useEffect(() => {
    if (!store.getState().app.loadedInitData && staticRoutes.every((item) => item.path !== location.pathname)) {
      loadInitData(store)
    }
  }, [location])
  return (
    <>
      <App />
    </>
  )
}

loadableReady(() => {
  ReactDom.hydrate(
    <Provider store={store}>
      <BrowserRouter>
        <HelmetProvider>
          <Entry />
        </HelmetProvider>
      </BrowserRouter>
    </Provider>,
    document.getElementById('app')
  )
})

if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    module.hot.accept()
  }
}
// import VConsole from 'vconsole'
// new VConsole()
