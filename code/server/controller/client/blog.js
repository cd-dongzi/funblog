import Mongodb from 'utils/mongodb'
import blogModel from 'models/blog'
export default {
  async getBlogInfo(ctx, async) {
    log.clientTitle('获取博客信息')
    const _id = ctx.params.id
    console.log(_id)
    if (!_id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.send()
    }

    const data = await Mongodb.findOne(blogModel, {
      _id
    }, {
      title: 1,
      type: 1,
      html: 1,
      total_nums: 1,
      github: 1,
      source: 1,
      updateTime: 1,
      _id: 1
    })
    ctx.send(data)
  },

  async getBlogs(ctx, next) {
    log.clientTitle('获取博客列表')
    let {
      type = '', pageindex = 1, pagesize = 5
    } = ctx.request.query
    console.log(type, pageindex, pagesize)
    try {
      const reg = new RegExp(type, 'i')
      const match = {
        isVisible: true,
        $or: [{
          type: {
            $regex: reg
          }
        }],
      }
      const lookup = {
        model: 'blog_comments',
        localField: '_id',
        foreignField: 'articleid',
        name: 'commentList'
      }
      let data = await Mongodb.lookup(blogModel, match, lookup, {
        limit: pagesize * 1,
        skip: (pageindex - 1) * pagesize,
        sort: {
          level: -1,
          updateTime: -1
        },
        $project: {
          desc: 1,
          github: 1,
          source: 1,
          title: 1,
          updateTime: 1,
          type: 1,
          _id: 1
        }
      })
      data = data.map(item => {
        item.comment_nums = item.commentList.length
        delete item.commentList
        return item
      })
      ctx.send(data)
    } catch (err) {
      ctx.sendError(err)
    }
  },
  async addBlogReadingNum(ctx, next) {
    log.clientTitle('添加博客观看数量')
    const _id = ctx.params.id
    try {
      await Mongodb.update(blogModel, {
        _id
      }, {
        $inc: {
          total_nums: 1
        }
      })
      return ctx.send()
    } catch (e) {
      return ctx.sendError(e)
    }
  }
}