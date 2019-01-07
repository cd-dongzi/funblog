import Base from './base'
// import {getToken} from '@/utils/token'
export default class User extends Base{
    // 登陆
    static login (params) {
        return this.post(`${this.baseUrl}/login`, params)
    }

    // 获取用户详情
    static getUserInfo (token) {
        return this.get(`${this.baseUrl}/users/${token}`)
    }

    // 获取用户列表
    static getUserList () {
        return this.get(`${this.baseUrl}/users`)
    }

    // 更新用户信息
    static updateUser ({_id, ...params}) {
        return this.patch(`${this.baseUrl}/users/${_id}`, params)
    }

    // 新增用户
    static addUser (params) {
        return this.post(`${this.baseUrl}/users`, params)
    }

    // 删除用户
    static delUser (id) {
        return this.delete(`${this.baseUrl}/users/${id}`)
    }
}