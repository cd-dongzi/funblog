import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
Vue.use(Router)
const router = new Router({
    mode: 'history',
    routes,
    scrollBehavior (to, from, savedPosition) {
        // 异步滚动可以返回Promise
        // 导航栏按钮触发 savedPosition
        if (savedPosition) {
            return savedPosition
        }else{
            const position = {
                x: 0,
                y: 0
            }
            // hash滚动
            if (to.hash) {
                position.selector = to.hash
            }
            
            // 是否在缓存组件中获取滚动距离
            if (to.meta.savedPosition) {
                position.y = to.meta.savedPosition
            }

            // 给缓存组件记录滚动高度
            if (from.meta.keepAlive) {
                from.meta.savedPosition = document.documentElement.scrollTop || document.body.scrollTop
            }
            
            return position
        }
    }
})

if (typeof window !== "undefined") {
    //路由钩子配置
    import('./setting').then(res => res.default(router))

    // const routerEach = require('./setting').default
    // routerEach(router)
}

export const createRouter = () => router
