import Koa from 'koa'
import rootConfig from '@root/src/shared/config'
import { start } from '@root/scripts/setup'
import Paths from '@root/build/paths'
import path from 'path'
import { createBundleRenderer, Renderer } from '@root/src/shared/plugins/server-render'
import fs from 'fs'
import { addVisitor } from './utils'

let readyPromise: Promise<void>
let renderer: Renderer
const render = async (ctx: Koa.Context) => {
  const context = {
    url: ctx.href,
    ctx
  }
  process.APP_HOST = `${ctx.protocol}://${ctx.host}`
  process.APP_HREF = ctx.href
  try {
    const html = await renderer.renderToString(context)
    ctx.body = html

    // 记录游客信息
    addVisitor(ctx)
  } catch (e) {
    console.log(e)
    if (ctx.path === '/error') {
      ctx.body = '服务器出现异常，请稍后访问!'
    } else {
      ctx.redirect('/error')
    }
    throw e
  }
}

export default (app: Koa) => {
  return new Promise<void>((resolve, reject) => {
    if (!rootConfig.isProd) {
      readyPromise = start(app, ({ loadableStats, serverManifest, inputFileSystem }) => {
        renderer = createBundleRenderer({
          loadableStats,
          serverManifest,
          inputFileSystem
        })
      })
      readyPromise.then(resolve).catch(reject)
    } else {
      renderer = createBundleRenderer({
        loadableStats: JSON.parse(fs.readFileSync(path.join(Paths.buildClientPath, 'loadable-stats.json')).toString()),
        serverManifest: JSON.parse(fs.readFileSync(path.join(Paths.buildServerPath, 'react-ssr-server-manifest.json')).toString())
      })
      resolve()
    }
    app.use(render)
  })
}
