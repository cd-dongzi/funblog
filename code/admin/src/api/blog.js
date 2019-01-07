import Base from './base'
export default class Blog extends Base{
    // 获取博客详情
    static getBlogInfo (id) {
        return this.get(`${this.baseUrl}/blogs/${id}`)
    }

    // 获取博客列表
    static getBlogList (params) {
        return this.get(`${this.baseUrl}/blogs`, params)
    }

    // 更新博客信息
    static updateBlog (_id, params) {
        return this.patch(`${this.baseUrl}/blogs/${_id}`, params)
    }

    // 新增博客
    static addBlog (params) {
        return this.post(`${this.baseUrl}/blogs`, params)
    }

    // 删除博客
    static delBlog (id) {
        return this.delete(`${this.baseUrl}/blogs/${id}`)
    }
}