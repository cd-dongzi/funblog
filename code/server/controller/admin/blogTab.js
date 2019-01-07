import Mongodb from 'utils/mongodb'
import blogTabModel from 'models/blogTab'

export default {
  //获取博客标签列表
  async getBlogTabs(ctx, next) {
    log.adminTitle('获取博客标签信息列表接口')
    try {
      const res = await Mongodb.find(blogTabModel, null, null, {
        sort: {
          total: -1
        }
      })
      ctx.send(res)
    } catch (err) {
      console.log(err)
      ctx.sendError(err)
    }
  },

  async addBlogTab(ctx, next) {
    log.adminTitle('添加博客标签')
    try {
      const params = ctx.request.body
      const info = await Mongodb.findOne(blogTabModel, {
        name: params.name
      })
      if (info) {
        ctx.sendError('数据已经存在, 请重新添加!')
      } else {
        const data = await Mongodb.create(blogTabModel, params)
        ctx.send(params)
      }
    } catch (err) {
      ctx.sendError(err)
    }
  },

  // 更新博客标签信息
  async updateBlogTab(ctx, next) {
    log.adminTitle('更新博客标签')
    const _id = ctx.params.id
    const params = ctx.request.body
    try {
      params.updateTime = Date.now()
      await Mongodb.update(blogTabModel, {
        _id
      }, params)
      ctx.send()
    } catch (e) {
      if (e === '暂无数据') {
        ctx.sendError(e)
      }
    }
  },

  async delBlogTab(ctx, next) {
    log.adminTitle('删除博客标签')
    const _id = ctx.params.id
    try {
      await Mongodb.remove(blogTabModel, {
        _id
      })
      ctx.send()
    } catch (e) {
      ctx.sendError(e)
    }
  }
}
