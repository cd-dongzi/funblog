import fs from 'fs'
import path from 'path'
import koaRouter from 'koa-router'
const router = koaRouter()

router.get('/admin_view', async (ctx, next) => {
    ctx.type = 'text/html'
    ctx.body = fs.createReadStream(path.join($publicPath, 'admin/index.html'))
})
export default router