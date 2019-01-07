import Base from './base'
export default class Barrage extends Base{
    // 添加弹幕
    static addBarrage (params) {
        return this.post(`${this.baseUrl}/barrages`, params)
    }

    // 获取弹幕列表
    static getBarrages (params) {
        return this.get(`${this.baseUrl}/barrages`, params)
    }
}