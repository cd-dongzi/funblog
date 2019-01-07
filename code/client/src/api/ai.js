import Base from './base'
export default class Ai extends Base{
    // 添加答案
    static getResult (text) {
        return this.post(`${this.baseUrl}/ai/result`, {text})
    }
}