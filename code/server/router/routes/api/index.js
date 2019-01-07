import koaRouter from 'koa-router'
import authMiddleware from 'middleware/auth'
// import proxyMiddleware from 'middleware/proxy'
import clientApi from './client'
import adminApi from './admin'
import commonApi from './common'
import errorApi from './error'
import aiApi from './ai'
import live2dApi from './live2d'
import utilsApi from './utils'
const router = koaRouter()

router.use('', clientApi.routes(), clientApi.allowedMethods())
router.use('/admin', authMiddleware(), adminApi.routes(), adminApi.allowedMethods())
router.use('/common', commonApi.routes(), commonApi.allowedMethods())
router.use('/error', errorApi.routes(), errorApi.allowedMethods())
router.use('/live2d', live2dApi.routes(), live2dApi.allowedMethods())
router.use('/ai', aiApi.routes(), aiApi.allowedMethods())
router.use('/utils', utilsApi.routes(), utilsApi.allowedMethods())
export default router