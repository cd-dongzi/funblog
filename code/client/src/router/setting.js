import config from '@/config/index'
import {store} from '@/entry-client'
import {Session} from '@/utils/storage'

let touchEndTime = Date.now(),
    isVuePush = false,
    isVuePushType = '',
    isChooseDirection = false

const {pathKey} = config.keys

// 监听手指离开屏幕的时间， 用来判断IOS滑动切换
window.addEventListener('touchend', () => {
    touchEndTime = Date.now()
})

//router方法重置
const routerMethodReset = router => {
    const methods = ['push', 'go', 'replace', 'forward', 'back']
    methods.forEach(key => {
        let method = router[key].bind(router)
        router[key] = (...args) => {
            isVuePush = true
            if (!isVuePushType) isVuePushType = key
            method.apply(null, args)
        }
    })
    // 返回指定路径
    router._goBack = (path, query = {}) => {
        store.commit('UPDATE_ROUTER_DIRECTION', { routerDirection: 'back' })
        isChooseDirection = true
        if (!path) {
            router.back()
        }else{
            router.push({path, query})
        }
    }
    // 跳转指定路径
    router._skip = (path, query = {}) => {
        router.push({path, query})
    }
}

// next设置戳
const nextReset = (next, to) => {
    if (store.state.system.isPC) {
        return next()
    }
    const query = { ...to.query }
    const hash = to.hash
    if (!query[pathKey]) {
        query[pathKey] = Math.random().toString(16).substring(2)
        next({ path: to.path, query, hash})
    }else{
        next()
    }
}

// 记录当前路径
const updateNavigations = (to) => {
    if (to.query[pathKey]) {
        if (!store.state.navigation.navigations.some(path => path === to.fullPath)) {
            store.commit('UPDATE_NAVIGATIONS', {path: to.fullPath})
        }
    }
}
const routerEach = (router) => {
    routerMethodReset(router)
    router.beforeEach((to, from, next) => {
        // 是否需要loading动画
        if (to.meta.loading !== false) {
            store.commit('UPDATE_LOADING_STATUS', { isLoading: true })
        } 
        // 没有提前选择转场动画
        if (!isChooseDirection) { 
            let navigations = store.state.navigation.navigations
            let toIndex = navigations.findIndex(path => path === to.fullPath)
            if (toIndex >= 0) { // 存在该路径
                if (isVuePush) { // vue内置history跳转
                    if (isVuePushType === 'back') {
                        store.commit('UPDATE_ROUTER_DIRECTION', { routerDirection: 'back' })
                        store.commit('DELETE_NAVIGATION', { index: toIndex })
                    }else if (to.meta.slide) {
                        store.commit('UPDATE_ROUTER_DIRECTION', { routerDirection: 'forward' })
                    }else{
                        store.commit('UPDATE_ROUTER_DIRECTION', { routerDirection: '' })
                    }
                }else{ // 系统导航
                    if ((Date.now() - touchEndTime) < 377) { // ios滑动切换
                        store.commit('UPDATE_ROUTER_DIRECTION', { routerDirection: '' })
                    }else{
                        let len = navigations.length-1
                        if (toIndex < 0) { // 前进
                            store.commit('UPDATE_ROUTER_DIRECTION', { routerDirection: 'forward' })
                        } else if (toIndex === len) {
                            console.log('refresh') // 刷新
                        } else { // 返回
                            store.commit('UPDATE_ROUTER_DIRECTION', { routerDirection: 'back' })
                            store.commit('DELETE_NAVIGATION', { index: toIndex })
                        }
                    }
                }  
            }else{ // 不存在该路径, 直接forward跳转
                store.commit('UPDATE_ROUTER_DIRECTION', { routerDirection: 'forward' })
            }
        }
        // 是否需要授权
        nextReset(next, to) 
    })

    router.afterEach((to, from) => {
        if (to.name) {
            document.title = to.name   
        }
        isVuePush = false
        isVuePushType = ''
        isChooseDirection = false
        store.commit('UPDATE_LOADING_STATUS', { isLoading: false })
        updateNavigations(to)
    })
}
export default routerEach

