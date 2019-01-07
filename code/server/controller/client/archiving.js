import Mongodb from 'utils/mongodb'
import archivingModel from 'models/archiving'
export default {
  //获取弹幕列表
  async getArchiving(ctx, next) {
    log.clientTitle('获取归档列表接口')
    let {
      pagesize = 10
    } = ctx.request.query
    console.log(pagesize)
    try {
      let data = await Mongodb.find(archivingModel, null, {
        createTime: 1,
        id: 1,
        title: 1,
        type: 1,
        _id: 0
      }, {
        sort: {
          createTime: -1
        }
      })
      return ctx.send(data)
    } catch (err) {
      return ctx.sendError(err)
    }
  }
}
