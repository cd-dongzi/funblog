import Base from './base'
export default class Blog extends Base{
    static captureGlobal (params) {
        return this.post(`${this.baseUrl}/global`, params)
    }
}