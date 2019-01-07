import {Local} from '@/utils/storage'
import config from '@/config'
const {userInfoKey} = config.keys

function getUserInfo () {
    let userInfo = Local.get(userInfoKey) || {}
    if (userInfo.isAuthor) {
        userInfo.name = 'DongZi-Author'
    }
    return userInfo
}
const app = {
    state: {
        info: getUserInfo()
    },
    actions: {
    },
    mutations: {
        SET_USERINFO(state, payload) {
            const {name, city, email, qq, avatar, url, isAuthor} = payload
            state.info = Object.assign({}, state.info, {name, city, email, qq, avatar, url, isAuthor})
            let {name: newName, ...baseInfo} = state.info
            if (newName === 'DongZi-Author') {
                Local.set(userInfoKey, baseInfo)
            }else{
                Local.set(userInfoKey, state.info)
            }
        }
    }
}
export default app