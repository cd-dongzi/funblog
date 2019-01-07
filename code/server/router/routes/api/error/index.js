import koaRouter from 'koa-router'
import clientApi from './client'
const router = koaRouter()
clientApi(router)
export default router