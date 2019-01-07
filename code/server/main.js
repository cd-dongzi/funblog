import Koa from 'koa'
import ip from 'ip'
import router from './router/index'
import middleware from './middleware'
import conf from './config'
import SSR from './ssr'
import path from 'path'
import globalFun from './utils/global'
// 定时任务
import timerFun from './timer'
// mongodb
import './database/mongodb'
const app = new Koa()

// 全局方法
globalFun(app)

timerFun()

//使用中间件
middleware(app)

// 接口
router(app)

// vue-ssr
SSR(app)


app.listen(conf.app.port, '0.0.0.0', () => {
  console.log(`server is running at http://${ip.address()}:${conf.app.port}`);
})