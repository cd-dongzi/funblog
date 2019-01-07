import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './App.vue'
import {createRouter} from './router'
import {createStore} from './store'
import './directive'
import customComponents from './custom-components.js'
Vue.use(customComponents)
import * as filters from './filters'
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

export const createApp = () => {
    const store = createStore()
    const router = createRouter()
    sync(store, router)
    const app = new Vue({
	    router,
        store, 
	    render: h => h(App)
	})
    return { app, router, store }
}