import React from 'react'
import path from 'path'
import Koa from 'koa'
import https from 'https'
import { renderToString } from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router-dom'
import { ChunkExtractor } from '@loadable/server'
import { Provider } from 'react-redux'
import { HelmetProvider, FilledContext } from 'react-helmet-async'
import axios from 'axios'
import { matchRoutes } from '@server/utils/router'
import { routes } from '@client/router'
import scriptsConfig from '@root/scripts/config'
import rootConfig from '@root/src/shared/config'
import { isPC, mobileType, browserType } from '@root/src/shared/utils'
import serverConfig from '@server/config'
import { getStore, IStore } from '@client/store'
import { setServerRenderPageName } from '@client/store/app/action'
import { setSystemState } from '@client/store/system/action'
import { setAppState } from '@client/store/app/action'
import paths from '@root/build/paths'
import HTML from './HTML'
import { addVisitor } from './utils'

const createTemplate = (html: string) => {
  return `
    <!DOCTYPE html>
    ${html}
  `
}

const loadInitData = (store: IStore) => {
  return new Promise<void>((resolve, reject) => {
    import('@root/src/shared/loadInitData')
      .then(async ({ default: load }) => {
        await load(store)
        resolve()
      })
      .catch((err) => {
        reject(err)
      })
  })
}

const getStatsFile = async () => {
  let extractor: ChunkExtractor
  // 正式环境
  if (serverConfig.isProd) {
    const statsFile = path.join(paths.buildClientPath, 'loadable-stats.json')
    extractor = new ChunkExtractor({ statsFile })
    return extractor
  } else {
    const { __WEBPACK_HOST__, __WEBPACK_PORT__ } = scriptsConfig
    const request = rootConfig.isHttps
      ? axios.create({
          httpsAgent: new https.Agent({
            rejectUnauthorized: false
          })
        })
      : axios
    const res = await request.get(`${__WEBPACK_HOST__}:${__WEBPACK_PORT__}/loadable-stats.json`)
    extractor = new ChunkExtractor({ stats: res.data })
    return extractor
  }
}
export default (app: Koa) => {
  return new Promise<void>(async (resolve) => {
    app.use(async (ctx: Koa.Context) => {
      try {
        const store = getStore()
        const helmetContext: FilledContext = {} as FilledContext
        const clientExtractor = await getStatsFile()
        const context = {}
        const appHost = `${ctx.protocol}://${ctx.host}`
        // 系统类型赋值
        const userAgent = ctx.headers[`user-agent`] as string
        const isPc = isPC(userAgent)
        // 设置系统默认值
        store.dispatch(
          setSystemState({
            browserType: browserType(userAgent),
            mobileType: mobileType(userAgent),
            isPC: isPc,
            appHost
          })
        )
        // 设置client app默认属性
        store.dispatch(
          setAppState({
            screenSize: isPc ? 'xl' : 'xs',
            layoutSize: isPc ? 'large' : 'small'
          })
        )
        process.APP_HOST = appHost
        process.APP_HREF = ctx.href

        // 获取当前路由, 通过path匹配, 不通过url
        const { route } = matchRoutes(routes, ctx.path)
        if (route) {
          // 设置token到store
          const match = matchPath(decodeURI(ctx.path), route)
          const routeParams = {
            params: match?.params,
            query: ctx.query
          }
          store.dispatch(setServerRenderPageName(route.name as string))
          const request = require('@client/utils/request').default
          request[rootConfig.loginTokenKey] = ctx.cookies.get(rootConfig.loginTokenKey) || ''
          if (!route.noLayout) {
            await loadInitData(store)
          }
          const component = route.component
          if (component.load) {
            const c = (await component.load()).default
            c._init && (await c._init(store, routeParams))
          }
        }
        const { default: App } = require('@client/app')
        const appHtml = renderToString(
          clientExtractor.collectChunks(
            <Provider store={store}>
              <StaticRouter location={ctx.url} context={context}>
                <HelmetProvider context={helmetContext}>
                  <App />
                </HelmetProvider>
              </StaticRouter>
            </Provider>
          )
        )

        let inlineStyle
        if (serverConfig.isProd) {
          inlineStyle = await clientExtractor.getInlineStyleElements()
        }
        const html = createTemplate(
          renderToString(
            <HTML
              helmetContext={helmetContext}
              scripts={clientExtractor.getScriptElements()}
              styles={clientExtractor.getStyleElements()}
              inlineStyle={inlineStyle}
              links={clientExtractor.getLinkElements()}
              favicon={`${
                serverConfig.isProd ? '/' : `${scriptsConfig.__WEBPACK_HOST__}:${scriptsConfig.__WEBPACK_PORT__}/`
              }static/client_favicon.ico`}
              state={store.getState()}
            >
              {appHtml}
            </HTML>
          )
        )
        ctx.type = 'html'
        ctx.body = html

        // 记录游客信息
        addVisitor(ctx)
      } catch (e) {
        if (ctx.path === '/error') {
          ctx.body = '服务器出现异常，请稍后访问!'
        } else {
          ctx.redirect('/error')
        }
        throw e
      }
    })
    resolve()
  })
}
