import Base from './base'
export default class BlogComment extends Base{
    // 添加博客评论
    static addBlogComment (params) {
        return this.post(`${this.baseUrl}/blog_comments`, params)
    }

    // 更新博客评论
    static updateBlogComment (params) {
        return this.patch(`${this.baseUrl}/blog_comments/${params._id}`, params)
    }

    // 获取博客评论列表
    static getBlogComments (params) {
        return this.get(`${this.baseUrl}/blog_comments`, params)
    }
}