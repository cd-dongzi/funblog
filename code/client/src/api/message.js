import Base from './base'
export default class Message extends Base{
    // 添加留言
    static addMessage (params) {
        return this.post(`${this.baseUrl}/messages`, params)
    }

    // 获取留言列表
    static getMessages (params) {
        return this.get(`${this.baseUrl}/messages`, params)
    }
}