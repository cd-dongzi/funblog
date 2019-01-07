import Mongodb from 'utils/mongodb'
import blogCommentModel from 'models/client/blog_comment'
import {
  get_client_ip
} from 'utils/system'
import {
  formatMessage
} from 'utils/format'
import {
  sendArticleSMS
} from 'utils/sms/sms_ali.js'

export default {
  //获取博客评论列表
  async getBlogComments(ctx, next) {
    log.clientTitle('获取博客评论信息列表接口')
    let {
      articleid,
      pageindex = 1,
      pagesize = 10
    } = ctx.request.query
    console.log('articleid:' + articleid + ',pageindex:' + pageindex + ',pagesize:' + pagesize)

    try {
      let data = await Mongodb.findPage(blogCommentModel, {
        articleid
      }, {
        _id: 1,
        name: 1,
        msg: 1,
        url: 1,
        avatar: 1,
        isAuthor: 1,
        reply_list: 1,
        createTime: 1
      }, {
        limit: pagesize * 1,
        skip: (pageindex - 1) * pagesize
      })
      data.list = formatMessage(data.list)
      data.list = data.list.map(item => {
        let {
          _id,
          name,
          msg,
          url,
          avatar,
          isAuthor,
          reply_list,
          createTime
        } = item
        let obj = {
          _id,
          name,
          msg,
          url,
          avatar,
          isAuthor,
          reply_list,
          createTime
        }
        if (isAuthor) {
          delete obj.name
        }
        return obj
      })
      return ctx.send(data)
    } catch (err) {
      return ctx.sendError(err)
    }

  },

  // 添加博客评论
  async addBlogComment(ctx, next) {
    log.clientTitle('添加博客评论')
    const userAgent = ctx.request.headers['user-agent'],
      ip = get_client_ip(ctx),
      params = ctx.request.body
    const data = Object.assign({}, {
      userAgent,
      ip
    }, params)
    sendArticleSMS(JSON.stringify({
      title: `文章：${data.title}`,
      type: 'blog',
      name: data.name,
      msg: `${data.msg}`
    }))
    try {
      await Mongodb.create(blogCommentModel, data)
      return ctx.send()
    } catch (err) {
      return ctx.sendError(err)
    }
  },

  // 更新博客评论
  async updateBlogComment(ctx, next) {
    log.clientTitle('更新博客评论')
    const params = ctx.request.body
    const _id = ctx.params.id
    try {
      const res = await Mongodb.findOne(blogCommentModel, {
        _id
      })
      res.reply_list.push(params)
      await Mongodb.update(blogCommentModel, {
        _id
      }, res)
      ctx.send()
    } catch (err) {
      return ctx.sendError(err)
    }
  }
}
