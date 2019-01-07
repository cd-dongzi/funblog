import Base from './base'
export default class Example extends Base{
    // 获取演示详情
    static getExampleInfo (id) {
        return this.get(`${this.baseUrl}/examples/${id}`)
    }

    // 获取演示列表
    static getExampleList (params) {
        return this.get(`${this.baseUrl}/examples`, params)
    }

    // 更新演示信息
    static updateExample (type, _id, formData) {
        return this.patch(`${this.baseUrl}/examples/${type}/${_id}`, formData)
    }

    // 新增演示
    static addExample (type, formData) {
        return this.post(`${this.baseUrl}/examples/${type}`, formData, true)
    }

    // 删除演示
    static delExample (id) {
        return this.delete(`${this.baseUrl}/examples/${id}`)
    }
}