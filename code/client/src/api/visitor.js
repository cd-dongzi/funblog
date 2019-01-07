import Base from './base'
export default class Visitor extends Base{
    // 添加游客
    static addVisitor (params) {
        return this.post(`${this.baseUrl}/visitors`)
    }
    // 获取游客数量
    static getVisitors (params) {
        return this.get(`${this.baseUrl}/visitors`)
    }
}