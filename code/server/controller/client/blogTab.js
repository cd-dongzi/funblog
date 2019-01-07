import Mongodb from 'utils/mongodb'
import blogTabModel from 'models/blogTab'

export default {
  //获取博客标签列表
  async getBlogTabs(ctx, next) {
    log.clientTitle('获取博客标签信息列表接口')
    try {
      const res = await Mongodb.find(blogTabModel, null, {
        total: 1,
        name: 1,
        color: 1,
        _id: 0
      }, {
        sort: {
          total: -1
        }
      })
      ctx.send(res)
    } catch (err) {
      console.log(err)
      ctx.sendError(e)
    }
  }
}
