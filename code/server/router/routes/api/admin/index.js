import koaRouter from 'koa-router'
import userApi from './user'
import musicApi from './music'
import musicTabApi from './musicTab'
import blogApi from './blog'
import blogTabApi from './blogTab'
import exampleApi from './example'
import markdownApi from './markdown'
const router = koaRouter()
userApi(router)
musicApi(router)
musicTabApi(router)
blogApi(router)
blogTabApi(router)
exampleApi(router)
markdownApi(router)
export default router