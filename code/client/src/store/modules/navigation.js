import config from '@/config/index'
import {Session} from '@/utils/storage'
const navigationKey = config.keys.navigationKey
const navigation = {
    state: {
        isLoading: false,
        routerDirection: '',
        navigations: Session.get(navigationKey) || []
    },
    mutations: {
        UPDATE_LOADING_STATUS (state, payload) {
            state.isLoading = payload.isLoading
        },
        UPDATE_ROUTER_DIRECTION (state, payload) {
            state.routerDirection = payload.routerDirection
        },
        UPDATE_NAVIGATIONS (state, payload) {
            state.navigations.push(payload.path)
            Session.set(navigationKey, state.navigations)
        },
        DELETE_NAVIGATION (state, payload) {
            let index = payload.index
            state.navigations = state.navigations.slice(0, index+1)
            Session.set(navigationKey, state.navigations)
        },
        CLEAR_NAVIGATIONS (state, payload) {
            Session.clear()
            state.navigations = []
        }
    }
}
export default navigation