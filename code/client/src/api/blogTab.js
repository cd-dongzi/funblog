import Base from './base'
export default class BlogTab extends Base{
    // 获取博客标签列表
    static getBlogTabs (params) {
        return this.get(`${this.baseUrl}/blog/tabs`)
    }
}