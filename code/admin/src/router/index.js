import Vue from 'vue'
import Router from 'vue-router'
import {constantRouterMap} from './routes'
import routerEach from './setting'
Vue.use(Router)
const router = new Router({
    // mode: 'history',
    routes: constantRouterMap
})

routerEach(router)

export default router
