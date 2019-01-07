import Mongodb from 'utils/mongodb'
import visitorModel from 'models/client/visitor'
import {
  get_client_ip
} from 'utils/system'
export default {
  //获取游客数量
  async getVisitors(ctx, next) {
    log.clientTitle('获取游客数量')
    try {
      const num = await Mongodb.getCount(visitorModel)
      ctx.send({
        num
      })
    } catch (err) {
      return ctx.sendError(err)
    }
  },

  // 添加游客
  async addVisitor(ctx, next) {
    log.clientTitle('添加游客')
    const userAgent = ctx.request.headers['user-agent'],
      ip = get_client_ip(ctx)
    try {
      const res = await Mongodb.findOne(visitorModel, {
        ip
      })
      if (!res) {
        await Mongodb.create(visitorModel, {
          userAgent,
          ip
        })
        return ctx.send()
      } else {
        console.log('存在该游客')
        return ctx.send({}, '存在该游客')
      }
    } catch (err) {
      return ctx.sendError(err)
    }
  }
}