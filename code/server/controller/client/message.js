import Mongodb from 'utils/mongodb'
import messageModel from 'models/client/message'
import {
  get_client_ip
} from 'utils/system'
export default {
  //获取留言板列表
  async getMessages(ctx, next) {
    log.clientTitle('获取留言板信息列表接口')
    let {
      pagesize = 10
    } = ctx.request.query
    console.log(pagesize)
    try {
      let data = await Mongodb.random(messageModel, {}, {
        size: pagesize,
        $project: {
          name: 1,
          msg: 1,
          city: 1,
          url: 1,
          avatar: 1,
          createTime: 1,
          _id: 0
        }
      })
      return ctx.send(data)
    } catch (err) {
      return ctx.sendError(err)
    }

  },

  // 添加留言板
  async addMessage(ctx, next) {
    log.clientTitle('添加留言板')
    const userAgent = ctx.request.headers['user-agent'],
      ip = get_client_ip(ctx),
      params = ctx.request.body
    const data = Object.assign({}, {
      userAgent,
      ip
    }, params)
    console.log(data)
    try {
      await Mongodb.create(messageModel, data)
      return ctx.send()
    } catch (err) {
      return ctx.sendError(e)
    }
  }
}
