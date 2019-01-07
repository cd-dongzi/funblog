import Base from './base'
export default class Example extends Base{
    // 获取示例列表
    static getExamples (params) {
        return this.get(`${this.baseUrl}/examples`, params)
    }

    // 下载示例
    static downloadExamole (id) {
        // return this.get(`${this.baseUrl}/download_example/${id}`)
        return `${this.baseUrl}/download_example/${id}`
    }
}