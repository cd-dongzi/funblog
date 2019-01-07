import Base from './base'
export default class LeaveMessage extends Base{
    // 添加留言评论
    static addLeaveMessage (params) {
        return this.post(`${this.baseUrl}/leave_messages`, params)
    }

    // 更新留言评论
    static updateLeaveMessage (params) {
        return this.patch(`${this.baseUrl}/leave_messages/${params._id}`, params)
    }

    // 获取留言评论列表
    static getLeaveMessages (params) {
        return this.get(`${this.baseUrl}/leave_messages`, params)
    }
}