import Base from './base'
export default class Markdown extends Base{
    // 添加图片
    static addImg (formData) {
        return this.post(`${this.baseUrl}/markdown/img`, formData, true)
    }
}