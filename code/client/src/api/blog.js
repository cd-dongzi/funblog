import Base from './base'
export default class Blog extends Base{
    // 获取博客详情
    static getBlogInfo (id) {
        return this.get(`${this.baseUrl}/blogs/${id}`)
    }

    // 获取博客列表
    static getBlogs (params) {
        return this.get(`${this.baseUrl}/blogs`, params)
    }

    static addBlogReadingNum (id) {
        return this.get(`${this.baseUrl}/reading_num/${id}`)
    }
}