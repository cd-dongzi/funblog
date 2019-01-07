const system = {
    state: {
        screen: {
            width: 0,
            height: 0
        },
        screenSize: '',
        browserType: '',
        mobileType: '',
        isPC: ''
    },
    mutations: {
        SET_SCREEN (state, payload) {
            state.screen = Object.assign({}, state.screen, payload)
        },
        SET_SCREEN_SIZE (state, payload) {
            state.screenSize = payload.size
        },
        SET_BROWSER_TYPE (state, payload) {
            state.browserType = payload.type
        },
        SET_MOBILE_TYPE (state, payload) {
            state.mobileType = payload.type
        },
        SET_ISPC(state, payload) {
            state.isPC = payload.value
        }    
    }
}
export default system
