import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import user from './modules/user'
import router from './modules/router'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        app,
        user,
        router
    },
    getters
})

export default store
