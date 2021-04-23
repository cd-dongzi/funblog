import fs from 'fs'
import path from 'path'
import buildUtils from '@root/build/utils'
import { DefaultState, Context } from 'koa'
import KoaRouter from 'koa-router'
const router = new KoaRouter<DefaultState, Context>()

router.get('/page/third-party', async (ctx, next) => {
  ctx.type = 'text/html'
  ctx.body = fs.createReadStream(buildUtils.resolve('private/third-party-login.html'))
})

router.get('/backstage-management', async (ctx, next) => {
  ctx.type = 'text/html'
  ctx.body = fs.createReadStream(buildUtils.resolve('private/admin/index.html'))
})

export default router
