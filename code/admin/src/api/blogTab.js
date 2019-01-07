import Base from './base'
export default class BlogTab extends Base{
    // 获取博客标签详情
    static getBlogTabInfo (id) {
        return this.get(`${this.baseUrl}/blog/tabs/${id}`)
    }

    // 获取博客标签列表
    static getBlogTabList (params) {
        return this.get(`${this.baseUrl}/blog/tabs`, params)
    }

    // 更新博客标签信息
    static updateBlogTab (_id, params) {
        return this.patch(`${this.baseUrl}/blog/tabs/${_id}`, params)
    }

    // 新增博客标签
    static addBlogTab (params) {
        return this.post(`${this.baseUrl}/blog/tabs`, params)
    }

    // 删除博客标签
    static delBlogTab (id) {
        return this.delete(`${this.baseUrl}/blog/tabs/${id}`)
    }
}