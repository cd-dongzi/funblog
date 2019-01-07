import path from 'path'
import fs from 'fs'
import koaRouter from 'koa-router'
import LRU from 'lru-cache'
import {createBundleRenderer} from 'vue-server-renderer'

const router = koaRouter()
const isProd = process.env.NODE_ENV === 'production'
const resolve = file => path.resolve(__dirname, file)
const createRenderer = (bundle, options) => {
    return createBundleRenderer(bundle, Object.assign({}, options, {
        runInNewContext: true,
        cache: LRU({
            max: 1000,
            maxAge: 1000 * 60 * 15
        })
    }))
}
const renderData = (ctx, renderer) => {
    const context = {
        url: ctx.url
    }
    console.log('renderData => ')
    console.log(context)
    return new Promise( (resolve, reject) => {
        renderer.renderToString(context, (err, html) => {
            if (err) {
                return reject(err)
            }
            resolve({html, context})
        })
    })
}
// 转换html标签
const transformMetaTagOfHtml = (html, context) => {
    const articleInfo = context.state.blog.currentArticle
    const musicInfo = context.state.music.currentMusic
    if (Object.keys(articleInfo).length > 0) {
        console.log('article - html')
        const keywordRe = /(<meta name="keywords" content=").*(">)/
        const descriptionRe = /(<meta name="description" content=").*(">)/
        const titleRe = /(<title>).*(<\/title>)/
        if (!articleInfo.title) {
            return html
        }
        console.log('articleInfo title =>', articleInfo.title)
        return html.replace(keywordRe, `$1${`${articleInfo.title},${articleInfo.type.join(',')}`}$2`).replace(descriptionRe, `$1${articleInfo.title}$2`).replace(titleRe, `$1${articleInfo.title}$2`)
    }else {
        if (Object.keys(musicInfo).length > 0) {
            console.log('music - html')
            if (!musicInfo.name) {
                return html
            }
            const titleRe = /(<title>).*(<\/title>)/
            console.log('musicInfo name =>', musicInfo.name)
            return html.replace(titleRe, `$1${musicInfo.name}$2`)
        }else{
            return html
        }
    }
    
}

export default app => {
    let renderer
    if (isProd) { // 生产环境直接获取
        console.log('生产环境')
        const bundle = require('../../../public/client/vue-ssr-server-bundle.json')
        const template = fs.readFileSync(resolve('../../../public/client/index.html'), 'utf-8')
        // const clientManifest = require('../../../public/client/vue-ssr-client-manifest.json')
        renderer = createRenderer(bundle, {
            template,
            // clientManifest
        })

    }else{ // 开发环境
        console.log('开发环境')
        require('../../../build/server/setup-dev-server.js')(app, (bundle, options) => {
            console.log('bundle callback..')
            renderer = createRenderer(bundle, options)
        })
    }


    router.get('*', async (ctx, next) => {
        // 提示webpack还在工作
        if (!renderer) {
            ctx.type = 'html'
            return ctx.body = 'waiting for compilation... refresh in a moment.';
        }
        const s = Date.now()
        let html,status,context
        try {
            const data = await renderData(ctx, renderer)
            html = data.html
            context = data.context
        }catch(e) {
            console.log(e)
            if (e.code === 404) {
                status = 404
                html = '404 | Not Found'
            }else{
                status = 500
                html = '500 | Internal Server Error'
                console.error(`error during render : ${ctx.url}`)
            }
        }
        ctx.type = 'html'
        ctx.status = status ? status : ctx.status
        // head头修改
        html = transformMetaTagOfHtml(html, context)
        ctx.body = html
        if (!isProd) {
            console.log(`whole request: ${Date.now() - s}ms`)
        }
    })

    app.use(router.routes()).use(router.allowedMethods());
}