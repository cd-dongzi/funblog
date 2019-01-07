import Mongodb from 'utils/mongodb'
import barrageModel from 'models/client/barrage'
import {
  get_client_ip
} from 'utils/system'
export default {
  //获取弹幕列表
  async getBarrages(ctx, next) {
    log.clientTitle('获取弹幕信息列表接口')
    let {
      pagesize = 10
    } = ctx.request.query
    console.log(pagesize)
    try {
      let data = await Mongodb.random(barrageModel, {}, {
        size: pagesize * 1,
        $project: {
          msg: 1,
          _id: 0
        }
      })
      return ctx.send(data)
    } catch (err) {
      return ctx.sendError(err)
    }

  },

  // 添加弹幕
  async addBarrage(ctx, next) {
    log.clientTitle('添加弹幕')
    const userAgent = ctx.request.headers['user-agent'],
      ip = get_client_ip(ctx),
      params = ctx.request.body
    const data = Object.assign({}, {
      userAgent,
      ip
    }, params)
    console.log(data)
    try {
      await Mongodb.create(barrageModel, data)
      return ctx.send()
    } catch (err) {
      return ctx.sendError(e)
    }
  }
}
