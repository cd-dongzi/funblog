import axios from 'src/utils/fetch'
import {
    getToken
} from 'src/utils/auth'
import md5 from 'js-md5'
import User from '@/api/user'
const user = {
    state: {
        userInfo: null
    },
    mutations: {
        SET_USERINFO(state, payload) {
            state.userInfo = payload
        }
    },
    actions: {
        getUserInfo({
            state,
            commit
        }, token) {
            return new Promise(async (resolve, reject) => {
                try {
                    const res = await User.getUserInfo(token)
                    const userInfo = res.data
                    commit('SET_USERINFO', userInfo)
                    resolve(userInfo)
                } catch (err) {
                    reject(err)
                }
            })

        }
    }
}

export default user