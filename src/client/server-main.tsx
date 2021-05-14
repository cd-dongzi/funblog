import React from 'react'
import url from 'url'
import qs from 'qs'
import { renderToString } from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router-dom'
import { ChunkExtractor } from '@loadable/server'
import { Provider } from 'react-redux'
import { HelmetProvider, FilledContext } from 'react-helmet-async'
import { routes } from '@client/router'
import { getStore } from '@client/store'
import { setServerRenderPageName } from '@client/store/app/action'
import loadInitData from '@client/loadInitData'
import { setSystemState } from '@client/store/system/action'
import { setAppState } from '@client/store/app/action'
import rootConfig from '@root/src/shared/config'
import { isPC, mobileType, browserType } from '@root/src/shared/utils'
import { IContext, RendererOptions } from '@root/src/shared/plugins/server-render/type'
import App from '@client/app'
import HTML from './HTML'

const createTemplate = (html: string) => {
  return `
    <!DOCTYPE html>
    ${html}
  `
}

const matchRoutes = (
  routes: App.Routes,
  url: string,
  isRedirect = false
): {
  route: any
  url: string
} => {
  for (const route of routes) {
    const matchRoute = matchPath(url, route)
    if (matchRoute) {
      if (route.redirect) {
        return matchRoutes(routes, route.redirect, true)
      }
      const base = {
        route
      }
      if (isRedirect) {
        return {
          ...base,
          url: route.path as string
        }
      }
      return {
        ...base,
        url
      }
    }
  }
  return {
    route: null,
    url
  }
}

export default async (context: IContext, options: RendererOptions = {}) => {
  const extractor = new ChunkExtractor({ stats: context.loadableStats, inputFileSystem: context.inputFileSystem })
  const helmetContext: FilledContext = {} as FilledContext
  const store = getStore()

  // 在此处引入request, 给他添加token属性,这个时候每次请求都可以在header中放入token了，就解决了SSR token的问题
  const request = require('@client/utils/request').default
  request[rootConfig.loginTokenKey] = context.ctx?.cookies.get(rootConfig.loginTokenKey) || ''

  // 设置初始store
  const userAgent = context.ctx?.headers[`user-agent`] as string
  const isPc = isPC(userAgent)
  // 设置系统默认值
  store.dispatch(
    setSystemState({
      browserType: browserType(userAgent),
      mobileType: mobileType(userAgent),
      isPC: isPc,
      appHost: `${context.ctx?.protocol}://${context.ctx?.host}`
    })
  )
  // 设置client app默认属性
  store.dispatch(
    setAppState({
      screenSize: isPc ? 'xl' : 'xs',
      layoutSize: isPc ? 'large' : 'small'
    })
  )

  options.beforeRender?.(store)

  // 获取Route数据
  const URL = new url.URL(context.url)
  const { route } = matchRoutes(routes, URL.pathname)
  if (route) {
    const match = matchPath(decodeURI(URL.pathname), route)
    const routeParams = {
      params: match?.params,
      query: qs.parse(URL.searchParams.toString())
    }
    store.dispatch(setServerRenderPageName(route.name as string))
    if (!route.noLayout) {
      await loadInitData(store)
    }
    const component = route.component
    if (component.load) {
      const c = (await component.load()).default
      c._init && (await c._init(store, routeParams))
    }
  }
  const currUrl = URL.href.replace(URL.origin, '')
  const appHtml = renderToString(
    extractor.collectChunks(
      <Provider store={store}>
        <StaticRouter location={currUrl} context={context as any}>
          <HelmetProvider context={helmetContext}>
            <App />
          </HelmetProvider>
        </StaticRouter>
      </Provider>
    )
  )

  // 渲染模板
  const html = createTemplate(
    renderToString(
      <HTML
        helmetContext={helmetContext}
        scripts={extractor.getScriptElements()}
        inlineStyle={await extractor.getInlineStyleElements()}
        links={extractor.getLinkElements()}
        favicon={'/static/client_favicon.ico'}
        state={store.getState()}
      >
        {appHtml}
      </HTML>
    )
  )
  context.store = store
  return html
}
