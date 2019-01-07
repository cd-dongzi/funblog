import Base from './base'
export default class Archiving extends Base{
    // 获取弹幕列表
    static getArchiving () {
        return this.get(`${this.baseUrl}/archiving`)
    }
}