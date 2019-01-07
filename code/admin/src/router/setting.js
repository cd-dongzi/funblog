import store from 'store'
import { getToken } from 'src/utils/auth';
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import config from '@/config'

const routerEach = router => {
    router.beforeEach(async (to, from, next) => {
        NProgress.start()
        const token = getToken()
        if (token) { //存在token
            if (to.path === '/login') { //当前页是登录直接跳过进入主页
                next('/');
            } else {
                if (!store.state.user.userInfo) {
                    //拉取用户信息
                    const userInfo = await store.dispatch('getUserInfo', token)
                    // 根据权限获取动态路由
                    const routes = await store.dispatch('setRoutes', {
                        roles: userInfo.roles
                    })
                    // 设置动态路由
                    router.addRoutes(store.state.router.addRouters)
                    next({ ...to })
                } else {
                    next()
                }
            }
        } else {
            if (config.whiteList.indexOf(to.path) >= 0) { //是否在白名单内,不在的话直接跳转登录页
                next()
            } else {
                next('/login')
            }

        }

    })
    router.afterEach((to, from) => {
        document.title = to.name;
        NProgress.done();
    })
}

export default routerEach